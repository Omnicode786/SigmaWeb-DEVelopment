// models/Comment.js
const { pool } = require('../db');

async function createComment({ threadId, authorId, content }) {
  const [result] = await pool.execute(
    `INSERT INTO comments (thread_id, author_id, content, created_at, upvotes) VALUES (?, ?, ?, NOW(), 0)`,
    [threadId, authorId, content]
  );
  const insertId = result.insertId;
  return getCommentById(insertId);
}

async function getCommentById(id) {
  const [rows] = await pool.execute(
    `SELECT c.id AS _id, c.thread_id, c.author_id, c.content, c.created_at AS createdAt, c.upvotes,
            u.username, u.role
     FROM comments c
     LEFT JOIN users u ON u.id = c.author_id
     WHERE c.id = ? LIMIT 1`,
    [id]
  );
  if (!rows[0]) return null;
  const r = rows[0];
  return {
    _id: r._id,
    thread: r.thread_id,
    content: r.content,
    createdAt: r.createdAt,
    upvotes: r.upvotes || 0,
    author: r.author_id ? { _id: r.author_id, username: r.username, role: r.role } : null
  };
}

async function findByThread(threadId) {
  const [rows] = await pool.execute(
    `SELECT c.id AS _id, c.thread_id, c.author_id, c.content, c.created_at AS createdAt, c.upvotes,
            u.username, u.role
     FROM comments c
     LEFT JOIN users u ON u.id = c.author_id
     WHERE c.thread_id = ?`,
    [threadId]
  );
  return rows.map(r => ({
    _id: r._id,
    thread: r.thread_id,
    content: r.content,
    createdAt: r.createdAt,
    upvotes: r.upvotes || 0,
    author: r.author_id ? { _id: r.author_id, username: r.username, role: r.role } : null
  }));
}

async function toggleUpvote(commentId, userId) {
  // check existence
  const [rows] = await pool.execute(
    `SELECT * FROM comment_upvoters WHERE comment_id = ? AND user_id = ?`,
    [commentId, userId]
  );

  if (rows.length === 0) {
    await pool.execute(
      `INSERT INTO comment_upvoters (comment_id, user_id) VALUES (?, ?)`,
      [commentId, userId]
    );
    await pool.execute(`UPDATE comments SET upvotes = upvotes + 1 WHERE id = ?`, [commentId]);
  } else {
    await pool.execute(
      `DELETE FROM comment_upvoters WHERE comment_id = ? AND user_id = ?`,
      [commentId, userId]
    );
    await pool.execute(`UPDATE comments SET upvotes = upvotes - 1 WHERE id = ? AND upvotes > 0`, [commentId]);
  }

  const [r2] = await pool.execute(`SELECT upvotes FROM comments WHERE id = ? LIMIT 1`, [commentId]);
  return (r2[0] && r2[0].upvotes) || 0;
}

module.exports = { createComment, findByThread, getCommentById, toggleUpvote };
