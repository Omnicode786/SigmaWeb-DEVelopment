// we create helper functions which we need to cuse along the go 
// this can also be done using the reducers
// but this way is easy but not as secure maybe as reducers i dont know man


import jwt from "jsonwebtoken";


const generateToken = (userId, res) => {
// between every single request 
// we pass this token so no other can just
// replicate a token and login to the user's account

const payload = {id: userId};

const token = jwt.sign(payload,
process.env.JWT_SECRET,
{expiresIn: process.env.JWT_EXPIRES_IN || "7d"


}


 )
// Security:
// httpOnly → JS can't access cookie (protects against XSS stealing tokens)
// secure → sent only over HTTPS in production (prevents interception); off in dev (no HTTPS)
// sameSite: "strict" → cookie sent only for same-site requests (helps prevent CSRF)

 res.cookie("jwt", token, {
     httpOnly: true,
     secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: (1000*60*60*24)*7
    
});
 return token

    
}

export default generateToken;

// Cookie security settings:
//
// httpOnly: true
// → Prevents JavaScript (e.g., via XSS attacks) from accessing the cookie.
// → This protects sensitive data like JWTs from being stolen using document.cookie.
//
// secure: process.env.NODE_ENV === "production"
// → Cookie is only sent over HTTPS when in production.
// → This prevents attackers from intercepting the cookie over insecure HTTP (MITM attacks).
// → In development, we keep it false because localhost usually runs on HTTP, not HTTPS.
//
// sameSite: "strict"
// → Protects against CSRF (Cross-Site Request Forgery) attacks.
// → The browser will ONLY send this cookie if the request originates from the same site.
// → So if a malicious website tries to make a request on behalf of the user,
//   the cookie (and therefore authentication) will NOT be included.
//
// In short:
// - httpOnly → protects from XSS stealing cookies
// - secure → protects from network interception (HTTPS only)
// - sameSite → protects from CSRF attacks

