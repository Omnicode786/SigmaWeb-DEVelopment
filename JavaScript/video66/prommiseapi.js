let c = Math.random();
console.log(c);
let prom1 = new Promise ((resolve,reject) => {
if (c < 0.4) {
    
    reject("The number came to be less than 0.9");
}
else{
    
    setTimeout(() => {
        console.log("I am done 1");
        resolve("Resolve id 11");

    }, 1000);}
})


let prom2 = new Promise ((resolve,reject) => {
if (c < 0.6) {
    
    reject("The number came to be less than 0.6");
}
else{
    
    setTimeout(() => {
        console.log("I am done 2");
        resolve("Resolve id 12");

    }, 500);}
})


let prom3 = new Promise ((resolve,reject) => {
if (c < 0.9) {
    
    reject("The number came to be less than 0.9");
}
else{
    
    setTimeout(() => {
        console.log("I am done 3");
        resolve("Resolve id 13");

    }, 2000);}
})

let p4 = Promise.all([prom1,prom2,prom3]);
// ye srf wab tak chalega jab tak koi aik prommise error ni dedeta am i right chat gpt?

// then tabhi kam krega jab sari prommisse resolve hongi
p4.then((a) => {
//  again a wil hold all the resolved things
console.log("All promisses ran successfully");    
console.log(a);

}).catch((err) => {
    console.log(err);
    console.log("error andeling samjh ni arhi promise .all me chat gpt btao mjhe");
    console.log("jo code sabse pehle run krna bnd hua uska error show hoga err me")
})

//  in .catch() of Promise.all([...]), the error you get is the first one that caused any of the promises to reject. Here's how it work

// ✅ Promise.all only succeeds if *all* promises resolve.
// ❌ If *any one* of the promises reject, the whole Promise.all fails immediately.
// 🧠 Useful when you want to wait for multiple async tasks to finish before continuing.
// In this case, if prom1, prom2, and prom3 all resolve, then the .then block runs.
// If even one fails (like if c < 0.9, 0.6, or 0.4), the .catch block will run instead.

//  Promise.all([]):
// Waits for all promises to resolve

// If any one promise rejects, it immediately:

// Stops waiting

// Goes to .catch() with the first error it encounters

// Other promises may still continue to log things, but the .then() block will NOT run.

// isi treke se primise.Allsetled ho kuch bhi apko status or value mil jayegi


let p5 = Promise.allSettled([prom1,prom2,prom3]);


p5.then((a)=>{
    console.log(a);
    console.log("ye scne he");
}).catch((err) => {
    console.log(err);
    console.log("What is this err though?");
    console.log(".allsettled me catch lagane ki zrort he kia");
    console.log("not necessary");
})

// promisses ki race

p6 = Promise.race([prom1,prom2,prom3]);
// waits for the first prommise to fulfil and its result resolve/reject is the output
// Whoever settles first, wins — doesn’t matter if it's a reject or resolve. The rest are ignored. 
p6.then((a) => {
    // jo sabse pehle ayi wo dikhayega
    console.log(a);
    console.log("hello paoa")
}).catch((err) => {
    console.log(err);
    console.log("lets see");
})


// so basically if promise 2 rejects first and the promise 1 rejects and then if promise 3 resolves the fastest what wil happen

// Promise2 wins the race — because it settles first (even though it's a rejection).