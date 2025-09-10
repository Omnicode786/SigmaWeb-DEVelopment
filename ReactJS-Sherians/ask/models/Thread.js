const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const threadSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Thread', threadSchema);
