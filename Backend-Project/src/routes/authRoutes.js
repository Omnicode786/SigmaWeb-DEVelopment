import { register, login, logout } from '../controllers/authController.js';

import express  from "express";



const router = express.Router();



// so we also need to create controllers

// so instead of doing req res function here we call a built function from the controllers 





router.post("/register", register);

router.post("/login", login);


router.post("/logout", logout )

export default router;
