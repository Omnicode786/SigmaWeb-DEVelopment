const express = require("express");
const db = require("../db");
const router = express.Router();

function requireAuth(req, res, next) {
  if (!req.session.user) return res.redirect("/login");
  next();
}

// Create Thread
router.post("/create_thread", requireAuth, async (req, res) => {
  const { title, content } = req.body;
  const authorId = req.session.user.id;

  try {
    await db
      .promise()
      .query("INSERT INTO threads (title, content, author_id) VALUES (?, ?, ?)", [
        title,
        content,
        authorId,
      ]);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating thread");
  }
});

// View Single Thread + Comments
router.get("/thread/:id", async (req, res) => {
  const threadId = req.params.id;

  try {
    const [[thread]] = await db
      .promise()
      .query(
        `SELECT t.*, u.username AS author_username 
         FROM threads t 
         LEFT JOIN users u ON t.author_id = u.id 
         WHERE t.id = ?`,
        [threadId]
      );

    const [comments] = await db
      .promise()
      .query(
        `SELECT c.*, u.username AS author_username 
         FROM comments c 
         LEFT JOIN users u ON c.author_id = u.id
         WHERE c.thread_id = ? 
         ORDER BY c.created_at ASC`,
        [threadId]
      );

    for (let comment of comments) {
      const [replies] = await db
        .promise()
        .query(
          `SELECT r.*, u.username AS author_username, u.role 
           FROM replies r 
           LEFT JOIN users u ON r.author_id = u.id 
           WHERE r.comment_id = ? 
           ORDER BY r.created_at ASC`,
          [comment.id]
        );
      comment.replies = replies;
    }

    res.render("thread", { thread, comments });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error loading thread");
  }
});

module.exports = router;
