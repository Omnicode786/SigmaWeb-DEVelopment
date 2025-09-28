const express = require('express');
const router = express.Router();
const Thread = require('../models/Thread');
const Comment = require('../models/Comment');
const Reply = require('../models/Reply');
const User = require('../models/User');

function requireAuth(req, res, next){
  if (!req.session.user) return res.redirect('/login');
  next();
}

router.get('/', async (req, res) => {
  const threads = await Thread.find().sort({ createdAt: -1 }).populate('author', 'username role');
  res.render('index', { threads });
});

router.post('/create_thread', requireAuth, async (req, res) => {
  const { title, content } = req.body;
  await new Thread({ title, content, author: req.session.user._id }).save();
  res.redirect('/');
});

//  single thread with comments and   replies
router.get('/thread/:id', requireAuth, async (req, res) => {
  const thread = await Thread.findById(req.params.id).populate('author', 'username role');
  if (!thread) return res.redirect('/');
  // get  comments and replies then sort by upvotes
  let comments = await Comment.find({ thread: thread._id })
    .populate('author', 'username role')
    .lean();

  // attach replies for each comment
  for (let c of comments) {
    let replies = await Reply.find({ comment: c._id }).populate('author', 'username role').lean();

    // separate admin replies and normal replies
    const adminReplies = replies.filter(r => r.author && r.author.role === 'admin').sort((a,b)=> b.upvotes - a.upvotes);
    const normalReplies = replies.filter(r => !(r.author && r.author.role === 'admin')).sort((a,b)=> b.upvotes - a.upvotes);

    // admin replies will  always on top
    c.replies = [...adminReplies, ...normalReplies];
  }

  // sort comments by upvotes desc
  comments.sort((a,b) => b.upvotes - a.upvotes);

  res.render('thread', { thread, comments, user: req.session.user });
});

module.exports = router;
