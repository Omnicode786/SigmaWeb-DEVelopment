// ✅ Function Constructor
// JS me function bhi object hai – aur aap Function() constructor ka use karke 
// dynamically function create kar sakte ho (rarely used, but interesting).

const sum = new Function("a", "b", "return a + b");
console.log(sum(5, 10)); // 15

// Yeh waise safe nahi hota, kyunki yeh runtime pe eval jaise hota hai
