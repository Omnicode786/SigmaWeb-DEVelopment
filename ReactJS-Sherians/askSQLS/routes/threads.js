// routes/threads.js
const express = require('express');
const router = express.Router();
const Thread = require('../models/Thread');
const Comment = require('../models/Comment');
const Reply = require('../models/Reply');

function requireAuth(req, res, next){
  if (!req.session.user) return res.redirect('/login');
  next();
}

router.get('/', async (req, res) => {
  try {
    const threads = await Thread.getAllThreads();
    res.render('index', { threads });
  } catch (err) {
    console.error('Error fetching threads:', err);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/create_thread', requireAuth, async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).send('Title and content required');
    await Thread.createThread({ title, content, authorId: req.session.user._id });
    res.redirect('/');
  } catch (err) {
    console.error('Error creating thread:', err);
    res.status(500).send('Failed to create thread.');
  }
});

router.get('/thread/:id', requireAuth, async (req, res) => {
  const threadId = req.params.id;
  try {
    const thread = await Thread.getThreadById(threadId);
    if (!thread) return res.redirect('/');

    let comments = await Comment.findByThread(threadId);

    // get replies for each comment (in parallel)
    await Promise.all(comments.map(async c => {
      const replies = await Reply.findByComment(c._id);

      const adminReplies = replies.filter(r => r.author && r.author.role === 'admin').sort((a,b)=> b.upvotes - a.upvotes);
      const normalReplies = replies.filter(r => !(r.author && r.author.role === 'admin')).sort((a,b)=> b.upvotes - a.upvotes);

      c.replies = [...adminReplies, ...normalReplies];
    }));

    // sort comments by upvotes desc
    comments.sort((a,b) => b.upvotes - a.upvotes);

    res.render('thread', { thread, comments, user: req.session.user });
  } catch (err) {
    console.error('Error fetching thread details:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
