const express = require('express');
const path = require('path');
const app = express();
const userModel = require('./models/user');

// --- Middleware for parsing form & JSON data ---
app.use(express.json());                              
app.use(express.urlencoded({ extended: true }));

// --- View engine setup ---
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// --- Static files (CSS, JS, Images) ---
app.use(express.static(path.join(__dirname, 'public')));

// --- Home route ---
app.get('/', (req, res) => {
    res.render("index");
});

// --- Read all users ---
app.get('/read', async (req, res) => {
    let allUsers = await userModel.find();
    res.render("read", { users: allUsers });
});

// --- Create user ---
app.post('/create', async (req, res) => {
    let { name, email, image } = req.body;  // now req.body will not be undefined
    let user = await userModel.create({
        name: name,
        email: email,
        image: image
    });
    res.redirect('/read');
});


// delete all 
app.get('/deleteAll', async (req, res) => {
    let result = await userModel.deleteMany({});  
    // deleteMany with empty {} → removes ALL documents
    res.send(result);
});

app.get('/delete/:id',async (req,res)=>{
    let deleteUser = await userModel.findOneAndDelete({_id: req.params.id});
    console.log(deleteUser);
    res.redirect('/read');

})

app.get('/edit/:userID', async(req,res) => {

    let user = await userModel.findOne({_id:req.params.userID});
    console.log(user);
    res.render('edit', {user});

})


app.post('/update/:userID', async(req,res) => {
    let {image,name,email} = req.body;
    let user = await userModel.findOneAndUpdate({_id:req.params.userID}, {image,name,email}, {new:true});
    console.log(user);
    res.redirect('/read');

})


// --- Start server ---
app.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000");
});
