import express from "express";




const router = express.Router();


router.get("/hello", (req, res)=> {
    res.json({
        message: "Hello world",
        "devDependecies": "nodemon v21.11"
    })




});


export default router;
