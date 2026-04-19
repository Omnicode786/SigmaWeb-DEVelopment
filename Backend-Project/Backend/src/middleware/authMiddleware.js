import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";


// read the token from the request
// check if token is valid
// jwt should be through the headers

const AuthMiddleware = async (req, res, next) => {

let token;

if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){

    token = req.headers.authorization.split(" ")[1]; // ["Bearer", "token"]
}
else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
    // the purpose of ? is simple
    // cas if cookies is null how can we access the jwt
    // you bitch ass nigga

}

if (!token){
    return res.status(401).json({
        error: "Not authorized, no token provided."
    });
}

try {
        // verify if the token is valid and extract user id

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await prisma.user.findUnique({
            where: {id: decoded.id},
        });
if (!user) {
    return req
    .status(401)
    .json({
        error: "User no longer exists."
    });
};

req.user = user;
// now we can access the user from this request
next();
} catch (err) {
  return res.
status(401).
json({
    error: `Not authorized,token failed. ${err}`
})
  
}



}
export default AuthMiddleware;
// standard of header sending is 
// Authorization key value = Bearer the token itself