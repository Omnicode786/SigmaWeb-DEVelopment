// session id and cookeis remember

// kch data ham frontend pr store kr wskte hen phir jab bhi backend pr request jayegi wo stored info bhi sath chlejayega backend me 
// example login ingo

// login se logout tak ka session 

// jab ham user se data lekr bhejte hen to wo data hamen in a blob format as in stream me milta he which is not 
// directly readble


// in simpler terms to explain how we send form data etc

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));