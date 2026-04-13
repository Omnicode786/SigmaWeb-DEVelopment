import { register, login, logout } from '../controllers/authController.js';

import express  from "express";
import addtoWatchList from '../controllers/watchListController.js';
import AuthMiddleware from '../middleware/authMiddleware.js';



const router = express.Router();



// so we also need to create controllers

// so instead of doing req res function here we call a built function from the controllers 




// router.use(AuthMiddleware);


// when we apply a middlware to an api we need
//  to tell the middleware to continue to the request

// NOW BY DOING THE ABOVE IT APPLIES TO EVERYTHING 
// BUT IF WE WANT TO TO A SPECIFIC ROUTE IN WATCHLIST
// THEN WE CAN DO THE BELOW AS WELL
router.post("/", AuthMiddleware,addtoWatchList);

router.delete("/:id", removeFromWatchList)
// in put or delete we dont want to send the data through the body
// better send through params of the route



export default router;
