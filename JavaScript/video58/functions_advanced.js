// ✅ Rest Parameters (...args)
function sumAll(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}
console.log(sumAll(1, 2, 3, 4)); // 10

// ✅ Callback Function
function processUserInput(callback) {
    const name = "Muzammil";
    callback(name);
}
processUserInput(function(name) {
    console.log("Hello, " + name);
});

// ✅ Higher Order Function (takes/returns function)
function createMultiplier(factor) {
    return function(number) {
        return number * factor;
    };
}
const double = createMultiplier(2);
console.log(double(5)); // 10

// ✅ Immediately Invoked Function Expression (IIFE)
(function() {
    console.log("This function runs instantly!");
})();

// ✅ Closures
function outer() {
    let count = 0;
    return function inner() {
        count++;
        console.log("Count: " + count);
    };
}
const counter = outer();
counter(); // 1
counter(); // 2
