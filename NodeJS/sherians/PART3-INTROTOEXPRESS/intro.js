// FRAMEWORK APKO AIK FLOW DETA HE

// import {application } from "express"

// intro to express js
// express js aik npm package he

// setting up a basic Express application
// routing



const express = require('express');
// thsi is basically importing express package



const app = express();
// express js ka function jesei chalta as soon as it runs now the app hold all the functionalities of express js 
// we can also do express().get however that is redundant


app.use(function (req,res,next) {
    console.log("middleware was executed");
    // but here we will face a problem
    // hame iski request ko forward to krni hogi na so use next
    next();
});



// ye upar wala aik middleware he jitni bhi requests ayengi sabse pehle ye chlega
// asa aparameter this will always expect a function whic further will aceept request response and next

// we can use them  as many times as we want



app.get('/', function(req,response){
// we are creating a route
// default route / hota he 
// domain ke ilawa wala part sara route he 

// get parameters = first is the route 2nd is requestr handler

    response.send('Hello World');
})
// ham different routes bna skte hen
app.get("/username", function(request,response){
    response.send("Now this is another route created on the server now // nodemon is also installed and this was a change");
})

app.get("/profile", function(request,response){
    response.send("Now this is another route created on the server now // nodemon is also installed and this was a change");
})

app.get("/about", function(request,response){
    response.send("Now this is another route created on the server now // nodemon is also installed and this was a change");
})

app.get("/error", function(request,response, next){
return next(new Error("Something went wrong"));
// this will console 
})
app.use((err,req,res,next) => {
    console.log(err.stack);
    res.status(500).send("Something broke!");
    // this will go to the frontend
}) 

app.listen(5000);

// jab ham is server ko chla denge do wo khud bakhud restart n hoga se ham restart krna prta he
// or chnages hamesha restart hone ke bad ati he


// isko counter krne kelie ham ye kam kr skte hen ke nodeman -g install krlen
// -g simply means this will be installed locally on our computer

// now instead of node run your file with nodemon if nodemon gives you error
// then simply use npx nodemon


// Middleware

// sever jab bhi request accept krta he wahan se route ke bech me phocne tak agar aap us request ko bech me rokte ho 
// and you perform something on it then that element is known as middlware inmost casses

// lets suppose a request is coming now if we dont put a middleware then maybe we as admin wont get the user data if we want that what we can do is add 
// a middleware that will parse and format that request and attain the needed dataf from that request and store it as we need




// requet and response handeling
// error handeling
