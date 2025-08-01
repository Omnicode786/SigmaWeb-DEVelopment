// ✅ Arrow Functions
// ES6 me introduce hua tha. Yeh concise syntax provide karta hai 
// aur 'this' ko lexical (surrounding scope) se inherit karta hai.

const add = (a, b) => a + b;
console.log(add(2, 3)); // 5

// Agar ek hi parameter ho, toh parentheses bhi optional hain
const square = x => x * x;
console.log(square(4)); // 16

// Aur agar koi statement block ho, toh curly braces aur return zaroori hoga
const multiply = (a, b) => {
    return a * b;
};
