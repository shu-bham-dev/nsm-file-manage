const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['folder', 'file'], required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', default: null },
  fileUrl: { type: String },
});

module.exports = mongoose.model('Item', itemSchema);
