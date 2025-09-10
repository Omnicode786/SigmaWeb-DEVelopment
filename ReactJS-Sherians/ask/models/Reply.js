const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const replySchema = new Schema({
  comment: { type: Schema.Types.ObjectId, ref: 'Comment', required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  upvotes: { type: Number, default: 0 },
  upvoters: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Reply', replySchema);
