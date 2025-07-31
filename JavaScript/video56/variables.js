
// ==============================
//      JavaScript Variables
// ==============================

// Yeh line variable declare kar rahi hai jisme hum apna naam store kar rahe hain.
// JavaScript mein variable banane ke liye hum 'var', 'let', ya 'const' use karte hain.
// Pehle 'var' ka use hota tha, lekin modern JS mein 'let' aur 'const' prefer kiya jata hai.

var name = "Muzammil";   // old method (can be re-declared and re-assigned)
// var allows hoisting, jo kabhi kabhi problems create kar sakta hai.

let age = 19;           // block-scoped, re-assignable but NOT re-declarable in same scope
const country = "Pakistan";  // constant hai, iski value change nahi ki ja sakti

console.log(name);      // output: Muzammil
console.log(age);       // output: 19
console.log(country);   // output: Pakistan

// Use-case:
// - 'let' jab variable ki value future mein change ho sakti ho.
// - 'const' jab ek bar value set kar ke change nahi karni ho.
// - 'var' ko avoid karo unless specifically required.

// Note: Variable names can't start with numbers, aur special characters (except _ and $) nahi hone chahiye.

