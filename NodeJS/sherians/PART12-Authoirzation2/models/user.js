const  mongoose = require('mongoose');
//Set up default mongoose connection
const  mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB);
 //Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)



const UserSchema = mongoose.Schema({
    username:String,
 
    email:String,
    password:String,
       age:Number
})

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


module.exports = mongoose.model("user",UserSchema);

