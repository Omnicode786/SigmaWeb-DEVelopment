import { register } from '../controllers/authController.js';

import express  from "express";



const router = express.Router();



// so we also need to create controllers

// so instead of doing req res function here we call a built function from the controllers 




router.post("/register", register);

export default router;
