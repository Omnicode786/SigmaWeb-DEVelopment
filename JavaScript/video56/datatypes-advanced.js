// datatypes_advanced.js

// --- 1. Primitive vs Reference ---

let name = "Muzammil"; // primitive
let user1 = { name: "Muzammil" }; // reference
let user2 = user1;
user2.name = "Alam";
console.log(user1.name); // "Alam" — same reference

// --- 2. Type Coercion ---

console.log("5" + 1); // "51" (string + number = string)
console.log("5" - 1); // 4 (string converted to number)

// --- 3. Equality Check ---
console.log(5 == "5"); // true (loose equality)
console.log(5 === "5"); // false (strict equality)

// --- 4. typeof Quirks ---
console.log(typeof null); // "object" ❌ weird JS legacy bug

// --- 5. BigInt and Symbol ---
const big = 1234567890123456789012345678901234567890n;
const sym = Symbol("id");
console.log(big, sym);

// --- 6. Shallow vs Deep Copy ---
const obj = { name: "Ali", nested: { age: 22 } };
const shallow = { ...obj };
shallow.nested.age = 50;
console.log(obj.nested.age); // 50 (shallow copy shares nested object)

// Deep copy (manual or using JSON methods, lodash, etc.)
const deep = JSON.parse(JSON.stringify(obj));
deep.nested.age = 50;
console.log(obj.nested.age); // 22 (deep copy does not share nested object)
// --- 7. Object vs Array ---
const arr = [1, 2, 3];
const objFromArr = { ...arr };
console.log(objFromArr); // { '0': 1, '1': 2, '2': 3 } — array converted to object
// --- 8. Array vs Object Methods ---
const numbers = [1, 2, 3];
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6]
const person = { name: "Muzammil", age: 20 };
const entries = Object.entries(person);
console.log(entries); // [['name', 'Muzammil'], ['age', 20]]    
// --- 9. Object Iteration ---
for (const [key, value] of Object.entries(person)) {
    console.log(`${key}: ${value}`);
}