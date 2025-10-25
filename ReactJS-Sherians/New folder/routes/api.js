const express = require('express');
const router = express.Router();
const pool = require('../db');

function requireAuthJSON(req,res,next){
  if(!req.session.user) return res.status(401).json({ error:'Not authenticated' });
  next();
}

// add comment
router.post('/threads/:id/comments', requireAuthJSON, async (req,res)=>{
  try{
    const { content } = req.body;
    const thread_id = req.params.id;
    const author_id = req.session.user.id;

    const [result] = await pool.execute(
      `INSERT INTO comments (thread_id, author_id, content) VALUES (?, ?, ?)`,
      [thread_id, author_id, content]
    );

    res.json({ success:true, comment:{ id: result.insertId, thread_id, author_id, content, upvotes:0 } });
  }catch(err){
    console.error(err);
    res.status(500).json({ success:false, error:'Error adding comment' });
  }
});

// add reply
router.post('/comments/:id/replies', requireAuthJSON, async (req,res)=>{
  try{
    const { content } = req.body;
    const comment_id = req.params.id;
    const author_id = req.session.user.id;

    const [result] = await pool.execute(
      `INSERT INTO replies (comment_id, author_id, content) VALUES (?, ?, ?)`,
      [comment_id, author_id, content]
    );

    res.json({ success:true, reply:{ id: result.insertId, comment_id, author_id, content, upvotes:0 } });
  }catch(err){
    console.error(err);
    res.status(500).json({ success:false, error:'Error adding reply' });
  }
});

// upvote comment
router.post('/comments/:id/upvote', requireAuthJSON, async (req,res)=>{
  try{
    const comment_id = req.params.id;
    const user_id = req.session.user.id;

    const [rows] = await pool.execute(
      `SELECT * FROM comment_upvoters WHERE comment_id=? AND user_id=?`,
      [comment_id, user_id]
    );

    if(rows.length===0){
      await pool.execute(`UPDATE comments SET upvotes = upvotes + 1 WHERE id=?`, [comment_id]);
      await pool.execute(`INSERT INTO comment_upvoters (comment_id, user_id) VALUES (?, ?)`, [comment_id, user_id]);
    }else{
      await pool.execute(`UPDATE comments SET upvotes = upvotes - 1 WHERE id=?`, [comment_id]);
      await pool.execute(`DELETE FROM comment_upvoters WHERE comment_id=? AND user_id=?`, [comment_id, user_id]);
    }

    const [updated] = await pool.execute(`SELECT upvotes FROM comments WHERE id=?`, [comment_id]);
    res.json({ success:true, upvotes: updated[0].upvotes });
  }catch(err){
    console.error(err);
    res.status(500).json({ success:false, error:'Error upvoting comment' });
  }
});

// upvote reply
router.post('/replies/:id/upvote', requireAuthJSON, async (req,res)=>{
  try{
    const reply_id = req.params.id;
    const user_id = req.session.user.id;

    const [rows] = await pool.execute(
      `SELECT * FROM reply_upvoters WHERE reply_id=? AND user_id=?`,
      [reply_id, user_id]
    );

    if(rows.length===0){
      await pool.execute(`UPDATE replies SET upvotes = upvotes + 1 WHERE id=?`, [reply_id]);
      await pool.execute(`INSERT INTO reply_upvoters (reply_id, user_id) VALUES (?, ?)`, [reply_id, user_id]);
    }else{
      await pool.execute(`UPDATE replies SET upvotes = upvotes - 1 WHERE id=?`, [reply_id]);
      await pool.execute(`DELETE FROM reply_upvoters WHERE reply_id=? AND user_id=?`, [reply_id, user_id]);
    }

    const [updated] = await pool.execute(`SELECT upvotes FROM replies WHERE id=?`, [reply_id]);
    res.json({ success:true, upvotes: updated[0].upvotes });
  }catch(err){
    console.error(err);
    res.status(500).json({ success:false, error:'Error upvoting reply' });
  }
});

module.exports = router;
