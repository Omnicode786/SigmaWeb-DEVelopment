

import AgentAPI from 'apminsight';
AgentAPI.config();
// the above will configure the agent that will run / configure our performance monitor apm

import 'dotenv/config';

import express from "express";
import SubjectsRouter from './routes/subjects.js';
import UsersRouter from './routes/users.js';
import classesRouter from './routes/classses.js';

import cors from 'cors';
import securityMiddleware from './middleware/security.js';


import {auth} from "./lib/auth.js";
import {toNodeHandler} from "better-auth/node";


const app = express();
const PORT = 8000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// the cors is like a middle ware
// cors = Cross-Origin Resource Sharing (CORS)
//  is a browser-based security mechanism that allows
//  a web application on one domain to access resources
//  (like APIs or images) from a different domain.


// if (!process)


if (!process.env.FRONTEND_URL) throw new Error('FrontEND_URL is not set in the env file you provided with.')
app.use(cors({
    origin: process.env.FRONTEND_URL,

    // if the above is without validation and this 
    // env file is undefined  then the origin will be undefined
    // which may result in permissive cors behavior 
    // depneding onhow  the cors lib handles it cobined with credentials - true this could create a security vulnerability

    methods: ['GET', 'POST', 'PUT', "DELETE"],
    credentials: true
    // this simply allows for cookies

}))
app.all('/api/auth/*splat', toNodeHandler(auth));

app.use(securityMiddleware);

app.use('/api/subjects', SubjectsRouter);
app.use('/api/users', UsersRouter);
app.use('/api/classes', classesRouter)

// ok great the data is coming out to be great


app.get('/', (req, res) => {
    res.send("Hello welcome to the classroom api");
})

app.listen(PORT, ()=> console.log(`Server is running at http://localhost:${PORT}`));



// i am getting the data correctly from neon also i can get the data in filters and stuff lke that

// http://localhost:8000/api/subjects?search=Data%Structures
// this we we can filter