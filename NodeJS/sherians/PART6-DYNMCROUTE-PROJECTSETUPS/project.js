const express = require('express');
const app = express();
const path = require('path');


// ejs me jab ham html me code likhte hen to wo calculations perform kr skte hen after telling it todo so
// so install it 
// setu ejs as a middleware for view engine


app.use(express.json());
app.use(express.urlencoded({extended:true}));
// now y this we have given the browser or our backend to handle forms


app.use(express.static(path.join(__dirname,'public')))

app.set('view engine', 'ejs');


    // if views folder is not in main directory or is in some other directory then
app.set('views', path.join(__dirname, 'views'));


app.get('/',function(req,res){
    // res.render("PART6-DYNMCROUTE-PROJECTSETUPS\views\index.ejs");
    // ab yahan par render me bas koi aisa page likhn ahe jo views me ho

    res.render('index')

})

app.get('/jokes',(req,res) => {
    const jokes = [{
        id:1,
        content:"Your mama is bald"
    },
    {
        id:2,
        content:"Your mama is bald"
    },
    {
        id:3,
        content:"Your mama is bald"
    },
    {
        id:4,
    content:"Your mama is bald"
    }
];

res.send(jokes);
        
})



// now we will learn about dynamic routing

app.get('/profile/:username', (req,res) => {
    // whenever we use : after a path that thng after it becomes a variable and is available in req.params


        // req.params is an Object 
    const user = req.params.username;
    res.send(`This is ${user} profile page`);

})
app.get('/author/:username/:age', (req,res) => {
    const user = req.params.username;
    const age = req.params.age;
    res.send(`This is ${user} author page who is ${age} years old`);

})

app.listen(3000);