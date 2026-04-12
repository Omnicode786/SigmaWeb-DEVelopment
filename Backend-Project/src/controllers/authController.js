import { prisma } from "../config/db.js";

import bcrypt from "bcryptjs";

const register = async (req, res) => {

    // a body is from the req is basically a json that can be send from the
    // frontend to the backend
    const {name, email, password} = req.body;


    const userExists = await prisma.user.findUnique({
        where: {email: email},
    });

    if (userExists){
        return  res.status(400).json({
            error: "User already exists with this email"
        
        });


    }

// hash the password

// basically hwo hash to i want like how many grains of salt

const salt = await bcrypt.genSalt(10);

const hashedPassword = await bcrypt.hash(password, salt);


// create the user

const user = await prisma.user.create({
    data: {
        name,
        email,
        password: hashedPassword
    }
});


// when prisma creates a user it also returns that user with its id and other generated attributes


    res.status(201).json({
        status: "success",
        data: {
            user: {
                id: user.id,
                name: name,
                email: email
            }
        }
    });
    // now normally if you dont use the app.use json middleware
    // then it will nto be able to handle the json body that is coming from the front end




}

 export {register}