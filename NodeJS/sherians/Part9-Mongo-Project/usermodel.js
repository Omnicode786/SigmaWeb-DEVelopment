
const mongoose = require("mongoose");


mongoose.connect(`mongodb://127.0.0.1:27017/myDatabase`);


const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },     // email must be unique
  username: { type: String, unique: true }   // username must be unique
});

// model ke basis pr hi crud chalta he 



module.exports = mongoose.model("user", userSchema);