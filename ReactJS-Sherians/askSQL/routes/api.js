const express = require('express');
const router = express.Router();
const prisma = require('../prisma');

function requireAuthJSON(req, res, next){
  if (!req.session.user) return res.status(401).json({ error: 'Not authenticated' });
  next();
}

const toId = v => typeof v === 'bigint' ? v.toString() : v;

// POST /threads/:id/comments
router.post('/threads/:id/comments', requireAuthJSON, async (req, res) => {
  const threadId = Number(req.params.id);
  const thread = await prisma.thread.findUnique({ where: { id: threadId }});
  if (!thread) return res.status(404).json({ error: 'Thread not found' });

  const comment = await prisma.comment.create({
    data: {
      threadId,
      authorId: BigInt(req.session.user._id),
      content: req.body.content
    },
    include: { author: { select: { id: true, username: true, role: true } } }
  });

  // shape like Mongoose populate & _id
  const shaped = {
    _id: toId(comment.id),
    thread: toId(comment.threadId),
    author: comment.author ? {
      _id: toId(comment.author.id),
      username: comment.author.username,
      role: comment.author.role
    } : null,
    content: comment.content,
    createdAt: comment.createdAt,
    upvotes: 0,
    upvoters: []
  };

  res.json({ success: true, comment: shaped });
});

// POST /comments/:id/replies
router.post('/comments/:id/replies', requireAuthJSON, async (req, res) => {
  const commentId = Number(req.params.id);
  const comment = await prisma.comment.findUnique({ where: { id: commentId }});
  if (!comment) return res.status(404).json({ error: 'Comment not found' });

  const reply = await prisma.reply.create({
    data: {
      commentId,
      authorId: BigInt(req.session.user._id),
      content: req.body.content
    },
    include: { author: { select: { id: true, username: true, role: true } } }
  });

  const shaped = {
    _id: toId(reply.id),
    comment: toId(reply.commentId),
    author: reply.author ? {
      _id: toId(reply.author.id),
      username: reply.author.username,
      role: reply.author.role
    } : null,
    content: reply.content,
    createdAt: reply.createdAt,
    upvotes: 0,
    upvoters: []
  };

  res.json({ success: true, reply: shaped });
});

// POST /comments/:id/upvote
router.post('/comments/:id/upvote', requireAuthJSON, async (req, res) => {
  const commentId = Number(req.params.id);
  const uid = BigInt(req.session.user._id);

  const existing = await prisma.commentUpvote.findUnique({
    where: { commentId_userId: { commentId, userId: uid } }
  });

  if (existing) {
    await prisma.commentUpvote.delete({
      where: { commentId_userId: { commentId, userId: uid } }
    });
  } else {
    await prisma.commentUpvote.create({ data: { commentId, userId: uid } });
  }

  const count = await prisma.commentUpvote.count({ where: { commentId } });
  res.json({ success: true, upvotes: count });
});

// POST /replies/:id/upvote
router.post('/replies/:id/upvote', requireAuthJSON, async (req, res) => {
  const replyId = Number(req.params.id);
  const uid = BigInt(req.session.user._id);

  const existing = await prisma.replyUpvote.findUnique({
    where: { replyId_userId: { replyId, userId: uid } }
  });

  if (existing) {
    await prisma.replyUpvote.delete({
      where: { replyId_userId: { replyId, userId: uid } }
    });
  } else {
    await prisma.replyUpvote.create({ data: { replyId, userId: uid } });
  }

  const count = await prisma.replyUpvote.count({ where: { replyId } });
  res.json({ success: true, upvotes: count });
});

module.exports = router;
