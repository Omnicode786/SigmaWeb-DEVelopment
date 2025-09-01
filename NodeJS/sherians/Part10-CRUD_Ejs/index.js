const express = require('express');
const path = require('path');
const app = express();
const userModel = require('./models/user')


app.set(express.json());


app.set(express.urlencoded({extended:true}));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req,res)=>{
    res.render("index");
})

app.get('/read', (req,res)=>{
    res.render("read");
})


app.post('/create', async (req,res)=>{
    
    let {name,email, image} = req.body;
   let user = await userModel.create({
        name:name,
        email:email,
        image:image
    })
    res.send(user);

})


app.listen(3000);