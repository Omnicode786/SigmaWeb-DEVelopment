const express = require('express');
const app = express();
const path = require('path');


// ejs me jab ham html me code likhte hen to wo calculations perform kr skte hen after telling it todo so
// so install it 
// setu ejs as a middleware for view engine


app.use(express.json());
app.use(express.urlencoded({extended:true}));
// now y this we have given the browser or our backend to handle forms

app.set('view engine', 'ejs');


    // if views folder is not in main directory or is in some other directory then
app.set('views', path.join(__dirname, 'views'));


app.get('/',function(req,res){
    // res.render("PART6-DYNMCROUTE-PROJECTSETUPS\views\index.ejs");
    // ab yahan par render me bas koi aisa page likhn ahe jo views me ho

    res.render('index')

})


app.listen(3000);