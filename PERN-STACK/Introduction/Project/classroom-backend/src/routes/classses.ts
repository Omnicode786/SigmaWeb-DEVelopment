import express from "express";
import { db } from "../db/index.js";
import {classes} from "../db/schema/index.js";

const router  = express.Router();


router.post('/', async(req, res) => {

    try {

        // const { name, teacherId, subjectId, capacity, descrption, } = req.body;
        const [createdClass] = await db.insert(classes)
        .values({...req.body, inviteCode: Math.random( ).toString(36).substring(2,9),
        schedules: []}
        
    )
    .returning({id: classes.id});

    if (!createdClass){
        throw  Error;
    }
    else{
        // 201 means created
        res.status(201).json({data: createdClass});
    }



    // we also have to parse the request using libs like zod this above is a simple post request format
    
// we can also send them through the fronend but of someone exposes our api endpoints
// then they can abuse it by sending wrong data ids
// our database and frontend will fail



    } catch (e) {
        console.error(`POST /classes error ${e}`);
        res.status(500).json({error: e});
    }

})


export default router;
