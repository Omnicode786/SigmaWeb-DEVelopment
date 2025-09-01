// --- Import required modules ---
const express = require('express');     // Express framework
const mongoose = require('mongoose');   // Mongoose for MongoDB

// --- Initialize express app ---
const app = express();

// --- Import our user model from another file ---
const userModel = require("./usermodel");


// ------------------------------------------------------------
// Default route just to check server is running
// ------------------------------------------------------------
app.get('/', (req, res) => {
    res.send('Hello World, Server is Running!');
});


// ------------------------------------------------------------
// CREATE route → Insert users into the DB
// NOTE: Every time you hit this route it will insert again!
// That’s why you saw duplicates before 👀
// ------------------------------------------------------------
app.get('/create', async (req, res) => {
    let createdUsers = await userModel.create([
        {
            name: "Muzammil",
            email: "Muzammil@gmail.com",
            username: "MuzammilAlam"
        },
        {
            name: "Suman",
            email: "Suman@gmail.com",
            username: "Suman Amir"
        }
    ]);

    // send the created users back as response
    res.send(createdUsers);
});


// ------------------------------------------------------------
// UPDATE route → Find user by username and update its name
// NOTE: findOneAndUpdate only updates the *first match*
// ------------------------------------------------------------
app.get('/update', async (req, res) => {
    let updatedUser = await userModel.findOneAndUpdate(
        { username: "MuzammilAlam" },   // filter → find user by username
        { name: "BEAST" },              // update → change name to "BEAST"
        { new: true }                   // option → return updated doc instead of old
    );

    res.send(updatedUser);
});


// ------------------------------------------------------------
// READ route → Show all users currently in DB
// ------------------------------------------------------------
app.get('/read', async (req, res) => {
    let users = await userModel.find();   // find() with no filter → returns all
    res.send(users);
});


// ------------------------------------------------------------
// DELETE route → Delete user with specific username
// NOTE: findOneAndDelete deletes only the first match
// If you want to delete ALL duplicates, use deleteMany()
// ------------------------------------------------------------
app.get('/delete', async (req, res) => {
    let deletedUser = await userModel.findOneAndDelete({ username: "Suman Amir" });
    res.send(deletedUser);
});


// ------------------------------------------------------------
// Start the server on port 3000
// ------------------------------------------------------------
app.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000");
});