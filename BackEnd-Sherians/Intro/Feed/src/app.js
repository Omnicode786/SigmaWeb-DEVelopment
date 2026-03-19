const express = require("express");
const multer = require("multer");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// agar direct req me data lekr ayenge form ka to it will be undefined for images etc
// for form we use  multer 
const upload = multer({storage: multer.memoryStorage()});

// what is this multer doing




app.post("/create-post",upload.single("image"), async (req, res) => {

// wohi same nam denge jo schema ke andar he
// for the single upload file to be coming from the form data 


// now the body although will not contain the image but req.file will

console.log(req.body);
console.log(req.file);

})






module.exports = app;