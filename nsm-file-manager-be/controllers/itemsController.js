const Item = require('../models/Item');
const { getItemsSchema } = require('../dtos/itemDto');
const Joi = require('joi');


exports.getItems = async (req, res) => {
  try {
    const { error, value } = getItemsSchema.validate(req.query);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { parent, page, perPage, search } = value;
    const query = parent?{ parent: parent }:{};
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const total = await Item.countDocuments(query);
    const items = await Item.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage);

    const updatedItems = await Promise.all(
      items.map(async (item) => {
        if (item.type === 'folder') {
          const count = await Item.countDocuments({ parent: item._id });
          const obj = item.toObject();
          obj.totalChildrenCount = count;
          return obj;
        }
        return item;
      })
    );

    res.json({ items: updatedItems, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
};

const updateItemSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow(''),
});

exports.updateItem = async (req, res) => {
  try {
    const { error } = updateItemSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const itemId = req.params.id;
    const { name, description } = req.body;
    const updatedItem = await Item.findByIdAndUpdate(
      itemId,
      { name, description, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedItem)
      return res.status(404).json({ error: 'Item not found' });

    res.json({ success: true, item: updatedItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update item' });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const deletedItem = await Item.findByIdAndDelete(itemId);
    if (!deletedItem)
      return res.status(404).json({ error: 'Item not found' });

    res.json({ success: true, message: 'Item deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete item' });
  }
};
