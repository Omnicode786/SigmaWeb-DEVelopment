// models/Reply.js
const { pool } = require('../db');

async function createReply({ commentId, authorId, content }) {
  const [result] = await pool.execute(
    `INSERT INTO replies (comment_id, author_id, content, created_at, upvotes) VALUES (?, ?, ?, NOW(), 0)`,
    [commentId, authorId, content]
  );
  const insertId = result.insertId;
  return getReplyById(insertId);
}

async function getReplyById(id) {
  const [rows] = await pool.execute(
    `SELECT r.id AS _id, r.comment_id, r.author_id, r.content, r.created_at AS createdAt, r.upvotes,
            u.username, u.role
     FROM replies r
     LEFT JOIN users u ON u.id = r.author_id
     WHERE r.id = ? LIMIT 1`,
    [id]
  );
  if (!rows[0]) return null;
  const r = rows[0];
  return {
    _id: r._id,
    comment: r.comment_id,
    content: r.content,
    createdAt: r.createdAt,
    upvotes: r.upvotes || 0,
    author: r.author_id ? { _id: r.author_id, username: r.username, role: r.role } : null
  };
}

async function findByComment(commentId) {
  const [rows] = await pool.execute(
    `SELECT r.id AS _id, r.comment_id, r.author_id, r.content, r.created_at AS createdAt, r.upvotes,
            u.username, u.role
     FROM replies r
     LEFT JOIN users u ON u.id = r.author_id
     WHERE r.comment_id = ?`,
    [commentId]
  );
  return rows.map(r => ({
    _id: r._id,
    comment: r.comment_id,
    content: r.content,
    createdAt: r.createdAt,
    upvotes: r.upvotes || 0,
    author: r.author_id ? { _id: r.author_id, username: r.username, role: r.role } : null
  }));
}

async function toggleUpvote(replyId, userId) {
  const [rows] = await pool.execute(
    `SELECT * FROM reply_upvoters WHERE reply_id = ? AND user_id = ?`,
    [replyId, userId]
  );

  if (rows.length === 0) {
    await pool.execute(`INSERT INTO reply_upvoters (reply_id, user_id) VALUES (?, ?)`, [replyId, userId]);
    await pool.execute(`UPDATE replies SET upvotes = upvotes + 1 WHERE id = ?`, [replyId]);
  } else {
    await pool.execute(`DELETE FROM reply_upvoters WHERE reply_id = ? AND user_id = ?`, [replyId, userId]);
    await pool.execute(`UPDATE replies SET upvotes = upvotes - 1 WHERE id = ? AND upvotes > 0`, [replyId]);
  }

  const [r2] = await pool.execute(`SELECT upvotes FROM replies WHERE id = ? LIMIT 1`, [replyId]);
  return (r2[0] && r2[0].upvotes) || 0;
}

module.exports = { createReply, findByComment, getReplyById, toggleUpvote };
