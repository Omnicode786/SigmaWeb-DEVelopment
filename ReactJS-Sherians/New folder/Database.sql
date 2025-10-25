CREATE DATABASE jauntforums;

USE jauntforums;

--  USERS TABLE
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user'
);

-- . THREADS TABLE
CREATE TABLE threads (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author_id INT REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--  COMMENTS TABLE
--  si n ce comments are part of threads so cascade delete if thread deeleted similar to all
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  thread_id INT NOT NULL REFERENCES threads(id) ON DELETE CASCADE,
  author_id INT REFERENCES users(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  upvotes INT DEFAULT 0
);
SELECT * from users
-- REPLIES TABLE
CREATE TABLE replies (
  id SERIAL PRIMARY KEY,
  comment_id INT NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
  author_id INT REFERENCES users(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  upvotes INT DEFAULT 0
);

-- 👍 5. COMMENT_UPVOTERS TABLE
CREATE TABLE comment_upvoters (
  comment_id INT REFERENCES comments(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY (comment_id, user_id)
);

--  REPLY_UPVOTERS TABLE
CREATE TABLE reply_upvoters (
  reply_id INT REFERENCES replies(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY (reply_id, user_id)
);

--   INDEXES FOR PERFORMANCE
-- These make lookups and joins much faster
CREATE INDEX idx_threads_author ON threads(author_id);
CREATE INDEX idx_comments_thread ON comments(thread_id);
CREATE INDEX idx_replies_comment ON replies(comment_id);



-- inserting the data

INSERT INTO users (username, password_hash, role)
VALUES ('Muzammil Alam', 'kilogramgaming123', 'user');

INSERT INTO threads (title, content, author_id)
VALUES ('Welcome to the Forum', 'This is the very first post!', 1);


INSERT INTO comments (thread_id, author_id, content)
VALUES (1, 1, 'Glad to be here!');


INSERT INTO replies (comment_id, author_id, content)
VALUES (1, 1, 'Thanks for joining!');

INSERT INTO comment_upvoters (comment_id, user_id)
VALUES (1, 1);

UPDATE comments SET upvotes = upvotes + 1 WHERE id = 1;

-- view all
SELECT 
  t.title AS thread_title,
  c.content AS comment_text,
  r.content AS reply_text,
  u.username AS user_name
FROM threads t
JOIN comments c ON c.thread_id = t.id
JOIN replies r ON r.comment_id = c.id
JOIN users u ON u.id = c.author_id;

INSERT INTO users (username, password_hash, role)
VALUES ('Sumam', 'helo', 'user');

INSERT INTO comments (thread_id, author_id, content)
VALUES (1, 2, 'Hi Muzammil! Excited to join the discussion.');

INSERT INTO replies (comment_id, author_id, content)
VALUES (1, 2, 'Thank you Muzammil');

SELECT 
  t.title AS thread_title,
  u1.username AS thread_author,
  c.content AS comment_text,
  u2.username AS comment_author,
  r.content AS reply_text,
  u3.username AS reply_author
FROM threads t
LEFT JOIN comments c ON c.thread_id = t.id
LEFT JOIN users u1 ON u1.id = t.author_id
LEFT JOIN users u2 ON u2.id = c.author_id
LEFT JOIN replies r ON r.comment_id = c.id
LEFT JOIN users u3 ON u3.id = r.author_id
WHERE t.id = 1;