// Step 1: Simple function
function greet(name) {
    console.log("Hello, " + name);
}

greet("Muzammil");

// Step 2: Now using a callback (function inside function)

// Let's define a function that accepts a function as a parameter
function processUserInput(callback) {
    const name = "Muzammil";
    // callback ko bula liya
    callback(name);
}

// Yahan hum function pass kar rahe hain (callback ki form mein)
processUserInput(function(name) {
    console.log("Hello from callback, " + name);
});

/*
👉 Callback ka matlab hota hai:
   - Ek function ko doosre function ke parameter ke tor pe pass karna
   - Baad mein usse call karna
   - Yeh async bhi ho sakta hai (like in setTimeout)
*/

// Step 3: Realistic example with delay
function fetchData(callback) {
    console.log("Fetching data...");
    setTimeout(() => {
        const data = [1, 2, 3];
        console.log("Data fetched.");
        callback(data);
    }, 2000);
}

fetchData(function(data) {
    console.log("Processing data:", data);
});
