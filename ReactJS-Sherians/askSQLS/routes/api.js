// routes/api.js
const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const Reply = require('../models/Reply');
const Thread = require('../models/Thread');

function requireAuthJSON(req, res, next){
  if (!req.session.user) return res.status(401).json({ error: 'Not authenticated' });
  next();
}

router.post('/threads/:id/comments', requireAuthJSON, async (req, res) => {
  const thread = await Thread.getThreadById(req.params.id);
  if (!thread) return res.status(404).json({ error: 'Thread not found' });
  const c = await Comment.createComment({
    threadId: thread._id,
    authorId: req.session.user._id,
    content: req.body.content
  });
  res.json({ success: true, comment: c });
});

router.post('/comments/:id/replies', requireAuthJSON, async (req, res) => {
  const comment = await Comment.getCommentById(req.params.id);
  if (!comment) return res.status(404).json({ error: 'Comment not found' });
  const r = await Reply.createReply({
    commentId: comment._id,
    authorId: req.session.user._id,
    content: req.body.content
  });
  res.json({ success: true, reply: r });
});

router.post('/comments/:id/upvote', requireAuthJSON, async (req, res) => {
  const comment = await Comment.getCommentById(req.params.id);
  if (!comment) return res.status(404).json({ error: 'Comment not found' });
  const uid = req.session.user._id;
  const upvotes = await Comment.toggleUpvote(comment._id, uid);
  res.json({ success: true, upvotes });
});

router.post('/replies/:id/upvote', requireAuthJSON, async (req, res) => {
  const reply = await Reply.getReplyById(req.params.id);
  if (!reply) return res.status(404).json({ error: 'Reply not found' });
  const uid = req.session.user._id;
  const upvotes = await Reply.toggleUpvote(reply._id, uid);
  res.json({ success: true, upvotes });
});

module.exports = router;
