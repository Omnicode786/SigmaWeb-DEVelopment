const http = require('node:http');
/*
  Check out official docs at: https://github.com/openai/openai-node
  Check out https://github.com/microsoft/generative-ai-with-javascript, for a fun free course on how to use GenAi, it has time traveling :)
*/

const fs = require('fs');


// yar ye smjho aap import kr rhe ho
// \CommonJS module system
// CommonJS require() is synchronous

const mymodule = require('../../mymodule');
mymodule.greet();
mymodule.bye();

// similarly we can deconstruct it 
const {greet} =  require('../../mymodule');

greet();
const {hello} =  require('../../mymodule');
// if ./mymodule doesnt have hello in it then it will simply ouptu undefined hello is not a function

console.log(hello());
