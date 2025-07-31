
// ==============================
//      JavaScript Data Types
// ==============================

// JS mein mainly 2 types ke data types hotay hain:
// 1. Primitive types
// 2. Reference types (Non-primitive)

// === Primitive Types ===

// String - text ya characters ka group
let myName = "Muzammil";       // double ya single quotes dono chalein gey

// Number - koi bhi number (integer ya floating point)
let age = 19;
let height = 5.9;

// Boolean - true ya false
let isStudent = true;

// Undefined - jab value assign nahi ki jati
let test;
console.log(test); // output: undefined

// Null - khaali value (intentional)
let marks = null;

// Symbol (unique values for objects' keys)
// Advanced topics mein use hota hai

// BigInt - badi numbers ke liye (like 2^53 se zyada)
// let bigNum = 1234567890123456789012345678901234567890n;

// === Reference Types ===
// Array - ek collection of items (ordered list)
let hobbies = ["coding", "reading", "gaming"];

// Object - key-value pairs
let student = {
    name: "Muzammil",
    age: 19,
    enrolled: true
};

// Function - ek block of code jo hum bar bar chala sakte hain
function greet() {
    console.log("Hello!");
}

// typeof operator se kisi bhi variable ka data type check kar sakte ho
console.log(typeof myName);  // string
console.log(typeof age);     // number
console.log(typeof isStudent); // boolean
