import express from "express";
import { showAllMovie } from "../controllers/movieController.js";




const router = express.Router();



router.get("/", showAllMovie);


router.get("/hello", (req, res)=> {
    res.json({
        message: "Hello world",
        "devDependecies": "nodemon v21.11"
    })




});


export default router;
