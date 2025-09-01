const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/Anydatabase");

const userSchema = mongoose.Schema({
    image: {type:String,unique:true},
    email:{type:String,unique:true},
    name:String
})

module.exports = mongoose.model('user', userSchema);