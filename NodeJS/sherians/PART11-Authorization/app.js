const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');



app.use(cookieParser());





app.get('/', (req,res) => {
res.cookie("Name", "Muzammil");
bcrypt.genSalt(10,function(err,salt){
    bcrypt.hash("password",salt, function(er,hash){
        console.log(hash);
    })
})
res.send("Cookie Checker");

})

app.get('/page2', (res,req) => {
res.send("Cookie Checker for page2");

})


app.listen(3000);