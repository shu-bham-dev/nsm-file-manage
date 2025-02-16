const Item = require('../models/Item');
const { createFolderSchema } = require('../dtos/itemDto');

exports.createFolder = async (req, res) => {
  try {
    const { error } = createFolderSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { name, description, parent } = req.body;
    const folder = new Item({
      name,
      type: 'folder',
      description: description || '',
      parent: parent || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedFolder = await folder.save();
    const { sendEventToAll } = require('../utils/sse');
    sendEventToAll({ type: 'createFolder', item: savedFolder });
    res.json({ success: true, folder: savedFolder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create folder' });
  }
};
