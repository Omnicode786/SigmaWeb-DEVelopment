const express = require('express');
const router = express.Router();
const prisma = require('../prisma');

function requireAuth(req, res, next){
  if (!req.session.user) return res.redirect('/login');
  next();
}
const toId = v => typeof v === 'bigint' ? v.toString() : v;

// GET /
router.get('/', async (req, res) => {
  const threadsRaw = await prisma.thread.findMany({
    orderBy: { createdAt: 'desc' },
    include: { author: { select: { id: true, username: true, role: true } } }
  });

  // add _id for EJS compatibility
  const threads = threadsRaw.map(t => ({
    ...t,
    _id: toId(t.id),
    author: t.author ? { _id: toId(t.author.id), username: t.author.username, role: t.author.role } : null
  }));

  res.render('index', { threads });
});

// POST /create_thread
router.post('/create_thread', requireAuth, async (req, res) => {
  const { title, content } = req.body;
  await prisma.thread.create({
    data: {
      title,
      content,
      authorId: BigInt(req.session.user._id)
    }
  });
  res.redirect('/');
});

// GET /thread/:id
router.get('/thread/:id', requireAuth, async (req, res) => {
  const id = Number(req.params.id);
  const threadRaw = await prisma.thread.findUnique({
    where: { id },
    include: { author: { select: { id: true, username: true, role: true } } }
  });
  if (!threadRaw) return res.redirect('/');

  const thread = {
    ...threadRaw,
    _id: toId(threadRaw.id),
    author: threadRaw.author ? { _id: toId(threadRaw.author.id), username: threadRaw.author.username, role: threadRaw.author.role } : null
  };

  const commentsRaw = await prisma.comment.findMany({
    where: { threadId: id },
    include: {
      author: { select: { id: true, username: true, role: true } },
      replies: { include: { author: { select: { id: true, username: true, role: true } } } },
      _count: { select: { upvotes: true } }
    }
  });

  // reply upvote counts in one query
  const replyIds = commentsRaw.flatMap(c => c.replies.map(r => r.id));
  const replyCounts = replyIds.length
    ? await prisma.replyUpvote.groupBy({
        by: ['replyId'],
        _count: { replyId: true },
        where: { replyId: { in: replyIds } }
      })
    : [];
  const replyCountMap = new Map(replyCounts.map(rc => [rc.replyId.toString(), rc._count.replyId]));

  const comments = commentsRaw
    .map(c => {
      const replies = c.replies
        .map(r => ({
          _id: toId(r.id),
          comment: toId(r.commentId),
          author: r.author ? { _id: toId(r.author.id), username: r.author.username, role: r.author.role } : null,
          content: r.content,
          createdAt: r.createdAt,
          upvotes: replyCountMap.get(r.id.toString()) || 0
        }));

      const admin = replies.filter(r => r.author && r.author.role === 'admin')
                           .sort((a,b) => b.upvotes - a.upvotes);
      const normal = replies.filter(r => !r.author || r.author.role !== 'admin')
                            .sort((a,b) => b.upvotes - a.upvotes);

      return {
        _id: toId(c.id),
        thread: toId(c.threadId),
        author: c.author ? { _id: toId(c.author.id), username: c.author.username, role: c.author.role } : null,
        content: c.content,
        createdAt: c.createdAt,
        upvotes: c._count.upvotes,
        replies: [...admin, ...normal]
      };
    })
    .sort((a,b) => b.upvotes - a.upvotes);

  res.render('thread', { thread, comments, user: req.session.user });
});

module.exports = router;
