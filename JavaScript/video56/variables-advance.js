// variables_advanced.js

// --- 1. var, let, const Differences ---

// var is function-scoped and can be redeclared
var x = 5;
var x = 10; // Allowed

// let is block-scoped and can't be redeclared in same scope
let y = 5;
// let y = 10; // ❌ Error: Identifier 'y' has already been declared

// const is block-scoped and also must be initialized
const z = 100;
// z = 200; // ❌ Error: Assignment to constant variable

// --- 2. Hoisting ---

console.log(a); // undefined (due to hoisting)
var a = 20;

// console.log(b); // ❌ ReferenceError (TDZ)
// let b = 30;

// --- 3. Best Practices ---
/*
    ✅ Use const by default.
    ✅ Use let only when you know the variable will change.
    🚫 Avoid var in modern JS (confusing scope).
*/
// --- 4. Template Literals ---
const name = "Muzammil";
const age = 19;
console.log(`My name is ${name} and I am ${age} years old.`); // "My name is Muzammil and I am 19 years old."
// --- 5. Destructuring Assignment ---
const person = { name: "Muzammil", age: 19, city: "Karachi" };
const { name: personName, age: personAge } = person;
console.log(personName, personAge); // "Muzammil", 19
// --- 6. Default Parameters ---
function greet(name = "Guest") {
    console.log(`Hello, ${name}!`);
}
greet(); // "Hello, Guest!"
greet("Muzammil"); // "Hello, Muzammil!"    
// --- 7. Arrow Functions ---
const add = (a, b) => a + b;
console.log(add(5, 10)); // 15
// --- 8. IIFE (Immediately Invoked Function Expression) ---
(function() {
    console.log("This is an IIFE!");
})();
// --- 9. Global vs Local Scope ---
let globalVar = "I am global";
function localScopeExample() {
    let localVar = "I am local";
    console.log(globalVar); // "I am global"
    console.log(localVar); // "I am local"
}   
localScopeExample();
// console.log(localVar); // ❌ ReferenceError: localVar is not defined
// --- 10. Block Scope with let and const ---