const { error } = require('console');
const express = require('express');
const fs = require('fs');
const path = require('path');

const app  = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
  fs.readdir('PArt7-rivise\\files',(error,files)=>{
        console.log(files);})

app.get('/', (req,res) => {

    fs.readdir('PArt7-rivise\\files',(error,files)=>{
        console.log(files);
        res.render('index', {files:files});

    })


})

app.post('/create',function(req,res){
console.log(req.body);
fs.writeFile(`PArt7-rivise\\files\\${req.body.title.split(" ").join("")}.txt`,req.body.details, function(err){
    res.redirect('/')
})

})


app.listen(3000);