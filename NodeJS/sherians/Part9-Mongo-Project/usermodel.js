
const mongoose = require('mongoose');


mongoose.connect(`mongoose://127.0.0.1:27017/mongopractice`);

const userSchema = mongoose.Schema({
    // user ke pas kia kia dena chahte hen
    name:String,
    username:String,
    email:String
})

// model ke basis pr hi crud chalta he 

mongoose.model("user", userSchema);

