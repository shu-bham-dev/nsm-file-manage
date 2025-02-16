const Item = require('../models/Item');

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const { parent, description } = req.body;
    const fileItem = new Item({
      name: req.file.originalname,
      type: 'file',
      fileUrl: req.file.path,
      parent: parent || null,
      description: description || '',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedFile = await fileItem.save();
    res.json({ success: true, item: savedFile });
  } catch (err) {
    console.error(err,"<<<");
    res.status(500).json({ error: 'File upload failed' });
  }
};
