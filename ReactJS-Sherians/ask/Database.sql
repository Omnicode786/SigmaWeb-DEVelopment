CREATE DATABASE jauntforum;
USE jauntforum


-- =========================================================
-- 🧱 1. USERS TABLE
-- Stores forum users (regular and admin accounts)
-- =========================================================
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user'
);

-- =========================================================
-- 💬 2. THREADS TABLE
-- Each thread is created by a user (author_id)
-- =========================================================
CREATE TABLE threads (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author_id INT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================
-- 🗨️ 3. COMMENTS TABLE
-- Comments belong to threads and may have an author
-- =========================================================
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  thread_id INT NOT NULL REFERENCES threads(id) ON DELETE CASCADE,
  author_id INT REFERENCES users(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  upvotes INT DEFAULT 0
);

-- =========================================================
-- 💭 4. REPLIES TABLE
-- Replies belong to comments and may have an author
-- =========================================================
CREATE TABLE replies (
  id SERIAL PRIMARY KEY,
  comment_id INT NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
  author_id INT REFERENCES users(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  upvotes INT DEFAULT 0
);

-- =========================================================
-- 👍 5. COMMENT_UPVOTERS TABLE
-- Many-to-many relationship between comments and users
-- =========================================================
CREATE TABLE comment_upvoters (
  comment_id INT REFERENCES comments(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY (comment_id, user_id)
);

-- =========================================================
-- 🔼 6. REPLY_UPVOTERS TABLE
-- Many-to-many relationship between replies and users
-- =========================================================
CREATE TABLE reply_upvoters (
  reply_id INT REFERENCES replies(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY (reply_id, user_id)
);

-- =========================================================
-- ⚙️ 7. INDEXES FOR PERFORMANCE
-- These make lookups and joins much faster
-- =========================================================
CREATE INDEX idx_threads_author ON threads(author_id);
CREATE INDEX idx_comments_thread ON comments(thread_id);
CREATE INDEX idx_replies_comment ON replies(comment_id);
