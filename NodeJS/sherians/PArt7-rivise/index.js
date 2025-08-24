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


app.get('/', (req,res) => {

    fs.readdir('./files',(error,files)=>{
        res.render('index', {files:files});

    })


})


app.listen(3000);