const express = require("express");
const db = require("../db");
const router = express.Router();

function requireAuth(req, res, next) {
  if (!req.session.user) return res.redirect("/login");
  next();
}

// Add Comment
router.post("/threads/:id/comments", requireAuth, async (req, res) => {
  const threadId = req.params.id;
  const { content } = req.body;
  const authorId = req.session.user.id;

  try {
    await db
      .promise()
      .query(
        "INSERT INTO comments (thread_id, author_id, content) VALUES (?, ?, ?)",
        [threadId, authorId, content]
      );
    res.redirect(`/thread/${threadId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding comment");
  }
});

// Add Reply
router.post("/comments/:id/replies", requireAuth, async (req, res) => {
  const commentId = req.params.id;
  const { content } = req.body;
  const authorId = req.session.user.id;

  try {
    await db
      .promise()
      .query("INSERT INTO replies (comment_id, author_id, content) VALUES (?, ?, ?)", [
        commentId,
        authorId,
        content,
      ]);
    res.redirect("back");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding reply");
  }
});

module.exports = router;
