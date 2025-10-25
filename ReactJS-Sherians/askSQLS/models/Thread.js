// models/Thread.js
const { pool } = require('../db');

async function createThread({ title, content, authorId }) {
  const [result] = await pool.execute(
    `INSERT INTO threads (title, content, author_id, created_at) VALUES (?, ?, ?, NOW())`,
    [title, content, authorId]
  );
  const insertId = result.insertId;
  return getThreadById(insertId);
}

async function getAllThreads() {
  const [rows] = await pool.execute(
    `SELECT t.id AS _id, t.title, t.content, t.created_at AS createdAt,
            u.id AS author_id, u.username
     FROM threads t
     LEFT JOIN users u ON u.id = t.author_id
     ORDER BY t.created_at DESC`
  );
  return rows.map(r => ({
    _id: r._id,
    title: r.title,
    content: r.content,
    createdAt: r.createdAt,
    author: r.author_id ? { username: r.username } : null
  }));
}

async function getThreadById(id) {
  const [rows] = await pool.execute(
    `SELECT t.id AS _id, t.title, t.content, t.created_at AS createdAt,
            u.id AS author_id, u.username, u.role
     FROM threads t
     LEFT JOIN users u ON u.id = t.author_id
     WHERE t.id = ? LIMIT 1`,
    [id]
  );
  if (!rows[0]) return null;
  const r = rows[0];
  return {
    _id: r._id,
    title: r.title,
    content: r.content,
    createdAt: r.createdAt,
    author: r.author_id ? { username: r.username, role: r.role } : null
  };
}

module.exports = { createThread, getAllThreads, getThreadById };
