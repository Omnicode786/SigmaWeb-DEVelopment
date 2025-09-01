const express = require('express');
const path = require('path');
const app = express();



app.set(express.json());


app.set(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req,res)=>{
    res.send("hello");
})