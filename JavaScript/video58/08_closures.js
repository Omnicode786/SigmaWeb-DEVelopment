// ✅ Closures
// Jab koi inner function outer function ke variables ko yaad rakhta hai, 
// even after outer function has finished execution – uss behavior ko closure kehte hain.

function outer() {
    let count = 0;
    return function inner() {
        count++;
        console.log("Count: " + count);
    }
}

const counter = outer();
counter(); // 1
counter(); // 2
counter(); // 3

// Yeh bahut powerful concept hai – yeh humein private variables banane ki ability deta hai.
