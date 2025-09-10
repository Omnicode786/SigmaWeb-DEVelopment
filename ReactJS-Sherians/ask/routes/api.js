const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const Reply = require('../models/Reply');
const Thread = require('../models/Thread');

function requireAuthJSON(req, res, next){
  if (!req.session.user) return res.status(401).json({ error: 'Not authenticated' });
  next();
}

// add comment to a thread
router.post('/threads/:id/comments', requireAuthJSON, async (req, res) => {
  const thread = await Thread.findById(req.params.id);
  if (!thread) return res.status(404).json({ error: 'Thread not found' });
  const c = new Comment({
    thread: thread._id,
    author: req.session.user._id,
    content: req.body.content
  });
  await c.save();
  const populated = await c.populate('author', 'username role');
  res.json({ success: true, comment: populated });
});

// add reply to a comment
router.post('/comments/:id/replies', requireAuthJSON, async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) return res.status(404).json({ error: 'Comment not found' });
  const r = new Reply({
    comment: comment._id,
    author: req.session.user._id,
    content: req.body.content
  });
  await r.save();
  const populated = await r.populate('author', 'username role');
  res.json({ success: true, reply: populated });
});

// toggle upvote for comment
router.post('/comments/:id/upvote', requireAuthJSON, async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) return res.status(404).json({ error: 'Comment not found' });
  const uid = req.session.user._id;
  const idx = comment.upvoters.findIndex(id => id.equals(uid));
  if (idx === -1) {
    comment.upvotes += 1;
    comment.upvoters.push(uid);
  } else {
    comment.upvotes -= 1;
    comment.upvoters.splice(idx,1);
  }
  await comment.save();
  res.json({ success: true, upvotes: comment.upvotes });
});

// toggle upvote for reply
router.post('/replies/:id/upvote', requireAuthJSON, async (req, res) => {
  const reply = await Reply.findById(req.params.id);
  if (!reply) return res.status(404).json({ error: 'Reply not found' });
  const uid = req.session.user._id;
  const idx = reply.upvoters.findIndex(id => id.equals(uid));
  if (idx === -1) {
    reply.upvotes += 1;
    reply.upvoters.push(uid);
  } else {
    reply.upvotes -= 1;
    reply.upvoters.splice(idx,1);
  }
  await reply.save();
  res.json({ success: true, upvotes: reply.upvotes });
});

module.exports = router;
