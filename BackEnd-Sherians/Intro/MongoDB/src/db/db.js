


var mongoose = require('mongoose');
//Set up default mongoose connection


async function mongoDB() {
    var mongoDBs = 'mongodb://127.0.0.1/SheriansNewCourse';
   await mongoose.connect(mongoDBs);
//  this connect will simply create a new database if it doesnot find the name of the dtabase if it dosesnot exist

console.log("connected to db");


   

}
 //Get the default connection

 module.exports = mongoDB