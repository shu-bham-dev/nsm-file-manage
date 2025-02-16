const express = require('express');
const router = express.Router();
const busboy = require('busboy');
const cloudinary = require('../config/cloudinary');
const Item = require('../models/Item');
const { sendEventToAll } = require('../utils/sse');

const sanitizeFileName = (fileName) => {
  if (typeof fileName !== 'string') {
    fileName = String(fileName || '');
  }
  return fileName.replace(/[^a-zA-Z0-9-_]/g, '_');
};

router.post('/', (req, res) => {
  const bb = busboy({ headers: req.headers });
  const totalBytes = parseInt(req.headers['content-length'], 10);
  let uploadedBytes = 0;
  let fileProcessed = false;
  let fields = {}; 
  let originalFilename = '';

  bb.on('field', (fieldname, val) => {
    fields[fieldname] = val;
  });

  bb.on('file', (fieldname, file, info, encoding, mimetype) => {
    originalFilename = info.filename;

    const publicId = Date.now() + '-' + sanitizeFileName(originalFilename);

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'filemanager',
        public_id: publicId,
        resource_type: 'auto',
      },
      async (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return res.status(500).json({ error: 'Cloudinary upload failed' });
        }
        try {
          const newItem = new Item({
            name: originalFilename,
            type: 'file',
            fileUrl: result.secure_url,
            parent: fields.parent || null,
            description: fields.description || '',
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          const savedItem = await newItem.save();
          sendEventToAll({ type: 'upload-complete', item: savedItem });
          res.json({ success: true, item: savedItem });
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Error saving file metadata' });
        }
      }
    );

    file.on('data', (data) => {
      uploadedBytes += data.length;
      const progress = Math.round((uploadedBytes / totalBytes) * 100);
      sendEventToAll({ type: 'upload-progress', progress });
    });

    file.pipe(uploadStream);
    fileProcessed = true;
  });

  bb.on('finish', () => {
    if (!fileProcessed) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    console.log('Finished parsing form-data with Busboy');
  });

  req.pipe(bb);
});

module.exports = router;
