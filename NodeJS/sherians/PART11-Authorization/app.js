const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');



app.use(cookieParser());





app.get('/', (req,res) => {


let token =  jwt.sign({email:"example@gmail.com"}, "secret")
res.cookie("token", token, {
  httpOnly: true,   // JS on frontend can’t access
  secure: false     // set to true if using HTTPS
});






bcrypt.genSalt(10,function(err,salt){
    bcrypt.hash("password",salt, function(er,hash){
        console.log("Hashed password", hash);
    })
})


res.send("Cookie Checker");

})

app.get('/page2', (req,res) => {
console.log("cookies token that backend has now",req.cookies.token);

console.log(jwt.verify(req.cookies.token, "secret"));

res.send("Cookie Checker for page2");

})


app.listen(3000);