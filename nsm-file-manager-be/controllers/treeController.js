const Item = require('../models/Item');

exports.getTree = async (req, res) => {
  try {
    const items = await Item.find({}).sort({ createdAt: -1 }).lean();

  const lookup = {};
  items.forEach((item) => {
    lookup[item._id] = { ...item, children: [] };
  });

  const tree = [];
  items.forEach((item) => {
    if (item.parent) {
      lookup[item.parent]?.children.push(lookup[item._id]);
    } else {
      tree.push(lookup[item._id]);
    }
  });

  res.json({ items: tree });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch tree structure' });
  }
};
