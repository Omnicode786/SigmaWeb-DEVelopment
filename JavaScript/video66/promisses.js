

// promisses simply means promiss of code execution


console.log("I am a promiss");
let c = Math.random();
console.log(c);
let prom1 = new Promise ((resolve,reject) => {
if (c < 0.8) {
    
    reject("The number came to be less than 0.5");
}
else{
    
    setTimeout(() => {
        console.log("I am done");
        resolve("Resolve id 786");

    }, 1000);}
})

let body = document.querySelector("body")

prom1.then((a)=>{
    console.log(a);
    // ye a wo value he jis dekho prommise chala ab usme tha resolve or reject ye resolve or reject koi bhi funciton ho skte hen
    // do se ziada bhi ho skte hen?
    // to ji sbhi value se wo resolve ya reject hua hoga ye wo value he or usko print krdega

}).catch((err) => {
   body.innerHTML = "The browser was seriosly not supporting you"
   console.log(err);
})

// this err in this catch function is i think the error that was sent to us by the reject function 

// now i do not understand how is thsi linked with callback functions but lets role with it for now


// we can chain the promiises like this


// i dont know you tell me explain as well