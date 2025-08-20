
require("dotenv").config();
const express = require('express');
const port = process.env.PORT


const app = express();

app.get('/',(req,res)=>{
    res.send('Hello this is episode 1 of chai or code backend series');
})

app.listen(port,()=>{
   console.log(`Server is running on port ${port}`);

})