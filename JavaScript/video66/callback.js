console.log("m name is muzammil");
console.log("m name is Taha");

setTimeout(()=>{
    console.log("My name is suman");
},2000);
console.log("We are all friends");
// ye c++ ni he javascript jo he wo async he us wja se pehle sare console chlenge ge uske bas js bolega bhai tjhe 2 sec rukna hena tu rukja bad me dekhen ge tjhe

// scitp pehle complete hogi

// callback function dena koi mushkil ni he but bhot issues ate hen bhot bar isme pyramid of doom bn jata he


// example of call back functions

// const first = () =>{
//     console.log("I am the first function in this callback tree");
// }

// const doomer = (arg,first) => {
//     console.log(arg);
//     first();

// //  it's also being told:
// // “After printing this, go ahead and call another function.”

// // This gives you control over the sequence. You could swap out first() with any other function, and doomer wouldn't care — it's flexible like that

// }

// const loadScript = (src,doomer) => {
//     let sc = document.createElement("script");
//     sc.src = src;
//     sc.onload = doomer("I am the  second function in the callback tree");
//     document.head.append(sc);
// }

// loadScript("https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/prism.min.js" ,doomer);
// 🌟 First function in the callback chain — plain, direct, and ceremonial
const first = () => {
    console.log("I am the first function in this callback tree");
    // 🚩 Think of this like the final flag waving after the chain completes
};

// 🔁 Second function — receives a message + a callback, logs the message, THEN calls the callback
const doomer = (arg, callback) => {
    console.log(arg);        // 🗣️ Displaying the second-level message, showing we’ve reached this part
    callback();              // 🧭 This executes whatever function was passed in as a callback (here: 'first')
    // 🧠 You're not hard-coding 'first' here — you're allowing flexibility. Could be 'first', 'third', anything.
};

// 🚀 Master function to dynamically load external JS scripts
const loadScript = (src, callback2) => {
    let sc = document.createElement("script");  // 📦 Create a real <script> HTML element
    sc.src = src;                               // 📡 Assign the source URL of the external JS file

    // ⏳ Wait until the script finishes loading successfully
    sc.onload = () => {
        // ✅ Trigger the callback function ONLY once the script is fully loaded
        console.log("I am the third function in the callback tree");
        // 🧩 We're passing the message + the 'first' function to 'doomer' here
        callback2("I am the second function in the callback tree", first);
        // 🧠 You could swap 'first' with any other function — this modularity is what makes callbacks powerful
    };

    // 🧱 Actually place the <script> tag into the <head> of your document so the browser loads it
    document.head.appendChild(sc);
};

// 🕹️ Run the entire callback tree by starting with this master trigger function
loadScript("https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/prism.min.js", doomer);
// 🎬 This kicks off the load → then runs 'doomer' → then calls 'first'


// another good example 

function bakePizza(toppings, whenReady) {
    console.log("Baking with:", toppings);
    setTimeout(() => {
        console.log("Pizza is ready!");
        whenReady(); // callback after baking
    }, 2000);
}

function eatPizza() {
    console.log("Nom nom 🍕");
}

bakePizza(["cheese", "olives"], eatPizza);

//because of this pyramicd of doom we use promisses


//  best example

function fetchData(url, callback) {
    console.log("🔄 Requesting data from", url);
    setTimeout(() => {
        console.log("✅ Data received!");
        callback({ user: "Muzammil", age: 22 }); // Sample data
    }, 1000);
}

function processData(data) {
    console.log("📦 Processing:", data);
}

fetchData("https://api.example.com/user", processData);

// ✨ Concept: This is what happens in every website login — backend se data aya, then process kara
// 🧠 Callback here = "Bhai jab data ajaye, mujhe bula lena"

