import { register, login, logout } from '../controllers/authController.js';

import express  from "express";
import {addtoWatchList, removeFromWatchList, showAllWatchList, updateIntoWatchList} from '../controllers/watchListController.js';
import AuthMiddleware from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { addToWatchListSchema } from '../validators/watchListValidators.js';



const router = express.Router();



// so we also need to create controllers

// so instead of doing req res function here we call a built function from the controllers 




router.use(AuthMiddleware);


// when we apply a middlware to an api we need
//  to tell the middleware to continue to the request

// NOW BY DOING THE ABOVE IT APPLIES TO EVERYTHING 
// BUT IF WE WANT TO TO A SPECIFIC ROUTE IN WATCHLIST
// THEN WE CAN DO THE BELOW AS WELL
router.get("/", showAllWatchList);
router.post("/", validateRequest(addToWatchListSchema),addtoWatchList);

router.delete("/:id", removeFromWatchList);
// in put or delete we dont want to send the data through the body
// better send through params of the route


// put to update
router.put("/:id", AuthMiddleware,updateIntoWatchList);


export default router;
