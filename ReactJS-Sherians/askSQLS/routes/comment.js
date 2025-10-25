// routes/comment.js
const express = require('express');
const db = require('../db');
const router = express.Router();

function requireAuth(req, res, next) {
  if (!req.session.user) return res.redirect('/login');
  next();
}

// form-based comment post (non-AJAX fallback)
router.post('/threads/:id/comments', requireAuth, async (req, res) => {
  const threadId = req.params.id;
  const { content } = req.body;
  try {
    await db.promise().query(
      'INSERT INTO comments (thread_id, author_id, content) VALUES (?, ?, ?)',
      [threadId, req.session.user._id, content]
    );
    res.redirect(`/thread/${threadId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving comment');
  }
});

// form-based reply post
router.post('/comments/:id/replies', requireAuth, async (req, res) => {
  const commentId = req.params.id;
  const { content } = req.body;
  try {
    // find the thread id to redirect back
    const [rows] = await db.promise().query('SELECT thread_id FROM comments WHERE id = ?', [commentId]);
    const threadId = rows[0] ? rows[0].thread_id : null;

    await db.promise().query(
      'INSERT INTO replies (comment_id, author_id, content) VALUES (?, ?, ?)',
      [commentId, req.session.user._id, content]
    );

    res.redirect(threadId ? `/thread/${threadId}` : '/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving reply');
  }
});

module.exports = router;
