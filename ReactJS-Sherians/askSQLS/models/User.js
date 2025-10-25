// models/User.js
const bcrypt = require('bcrypt');
const { pool } = require('../db');

async function createUser({ username, passwordHash, role = 'user' }) {
  const [result] = await pool.execute(
    `INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)`,
    [username, passwordHash, role]
  );
  const insertId = result.insertId;
  return findById(insertId);
}

async function findByUsername(username) {
  const [rows] = await pool.execute(
    `SELECT id AS _id, username, password_hash AS passwordHash, role FROM users WHERE username = ? LIMIT 1`,
    [username]
  );
  return rows[0] || null;
}

async function findById(id) {
  const [rows] = await pool.execute(
    `SELECT id AS _id, username, role FROM users WHERE id = ? LIMIT 1`,
    [id]
  );
  return rows[0] || null;
}

async function verifyPassword(userRow, plainPassword) {
  if (!userRow) return false;
  if (!userRow.passwordHash) {
    // fetch hash if not present
    const [rows] = await pool.execute(
      `SELECT password_hash AS passwordHash FROM users WHERE id = ? LIMIT 1`,
      [userRow._id]
    );
    if (!rows[0]) return false;
    userRow.passwordHash = rows[0].passwordHash;
  }
  return await bcrypt.compare(plainPassword, userRow.passwordHash);
}

module.exports = {
  createUser,
  findByUsername,
  findById,
  verifyPassword
};
