import { prisma } from "../config/db.js";

import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

const register = async (req, res) => {

    // a body is from the req is basically a json that can be send from the
    // frontend to the backend
    const { name, email, password } = req.body;


    const userExists = await prisma.user.findUnique({
        where: { email: email },
    });

    if (userExists) {
        return res.status(400).json({
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


    // create the jwt token for both reg and login as we need to sign in the user as soon as he registers as well

    const token = generateToken(user.id, res)




    // when prisma creates a user it also returns that user with its id and other generated attributes


    res.status(201).json({
        status: "success",
        data: {
            user: {
                id: user.id,
                name: name,
                email: email
            },
            token
        }
    });
    // now normally if you dont use the app.use json middleware
    // then it will nto be able to handle the json body that is coming from the front end




};

const login = async (req, res) => {
    const { email, password } = req.body;


    const userExists = await prisma.user.findUnique({
        where: { email: email },
    });
    if (!userExists) {
        return res.status(400).json({

            error: "Invalid email or password",

        });
    }

    // now by here this means the user exists
    // now lets verify the password

    const isPasswordValid = await bcrypt.compare(password, userExists.password);

    if (!isPasswordValid) return res.status(401).json({ email: "Invalid username or password" });

    // now at this point both the email and the password is valid


    // before this we need to create a json web token to create the session
    // you have already done this my nigga

    const token = generateToken(userExists.id, res)


    res.status(200).json({
        status: "success",
        data: {
            user: {
                id: userExists.id,
                email: userExists.email,
            },
            token,

        },
    });


}

const logout = async (req, res) => {

    res.cookie("jwt", "nothing", {
        httpOnly: true,
        expires: new Date(0)
    });

    res.status(200).json({
        status: "success",
        message: "Logged out successfully",



    });
}

export { register, login , logout}