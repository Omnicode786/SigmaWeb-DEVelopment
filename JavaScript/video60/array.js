// 🧠 DEEP DIVE: JavaScript Arrays (Advanced + Beginner Friendly)
// File by: You (the beast)
// Comment style: Chill, clear, and clever

// ------------------------------
// 1. DECLARING ARRAYS - Multiple Flavors
// ------------------------------

// Literal way (best and clean)
const arr1 = [1, 2, 3];

// Constructor (weird and old school)
const arr2 = new Array(1, 2, 3); // still works but not preferred

// Empty array with length
const arr3 = new Array(5); // Creates [ <5 empty items> ]

// From string, array-like or iterable things
const arr4 = Array.from("hello"); // ['h','e','l','l','o']

// Fill with same value
const filledArr = new Array(4).fill(0); // [0,0,0,0]


// ------------------------------
// 2. TYPES OF ITEMS - Can mix anything
// ------------------------------

const mixed = [42, "hello", true, null, undefined, [1, 2], {a: 1}, () => {}];

// Arrays in JS can hold any data types, even functions and objects


// ------------------------------
// 3. ACCESSING ITEMS
// ------------------------------

console.log(mixed[0]); // 42
console.log(mixed[5][1]); // 2 => because index 5 is [1,2], then pick index 1 of that


// ------------------------------
// 4. MUTATING METHODS
// These change the original array
// ------------------------------

let nums = [1, 2, 3];

nums.push(4); // Adds to end => [1, 2, 3, 4]
nums.pop();   // Removes last => [1, 2, 3]
nums.shift(); // Removes first => [2, 3]
nums.unshift(1); // Adds at start => [1, 2, 3]
nums.reverse(); // Reverses => [3, 2, 1]
nums.sort();    // Alphabetical sort if strings, numeric if you give compare fn

nums.splice(1, 1, 100); // Replace 1 item at index 1 with 100 => [3, 100, 1]


// ------------------------------
// 5. NON-MUTATING METHODS
// Original array stays same
// ------------------------------

const scores = [10, 20, 30];

const newScores = scores.concat([40]); // [10, 20, 30, 40]
const sliced = scores.slice(1, 3); // [20, 30] => does not include 3rd index
const mapped = scores.map(x => x * 2); // [20, 40, 60]

const filtered = scores.filter(x => x > 15); // [20, 30]

const found = scores.find(x => x > 15); // 20
const foundIndex = scores.findIndex(x => x > 15); // 1

const total = scores.reduce((acc, val) => acc + val, 0); // 60

const allAbove5 = scores.every(x => x > 5); // true
const anyAbove25 = scores.some(x => x > 25); // true


// ------------------------------
// 6. LOOPING TECHNIQUES
// ------------------------------

for (let i = 0; i < scores.length; i++) {
  console.log("index", i, "value", scores[i]);
}

for (let score of scores) {
  console.log(score); // value
}

for (let i in scores) {
  console.log(i); // index as string
}

scores.forEach((score, index) => {
  console.log(`Score at ${index} is ${score}`);
});


// ------------------------------
// 7. DESTRUCTURING ARRAYS
// ------------------------------

const [first, second, ...rest] = [10, 20, 30, 40];
console.log(first); // 10
console.log(rest);  // [30, 40]


// ------------------------------
// 8. NESTED ARRAYS / FLAT
// ------------------------------

const nested = [1, [2, [3, [4]]]];
const flat1 = nested.flat();       // [1, 2, [3, [4]]]
const flat2 = nested.flat(2);      // [1, 2, 3, [4]]
const flat3 = nested.flat(Infinity); // [1, 2, 3, 4]


// ------------------------------
// 9. ADVANCED: COPY + CLONE
// ------------------------------

const original = [1, 2, 3];
const shallowCopy = [...original];
const deepCopy = JSON.parse(JSON.stringify(original));


// ------------------------------
// 10. ADVANCED: SET / UNIQUE
// ------------------------------

const repeated = [1, 2, 2, 3, 3, 3];
const unique = [...new Set(repeated)]; // [1, 2, 3]


// ------------------------------
// 11. ADVANCED: SORTING NUMBERS
// ------------------------------

const nums2 = [5, 3, 12, 1];
nums2.sort(); // WRONG => [1, 12, 3, 5]
nums2.sort((a, b) => a - b); // RIGHT => [1, 3, 5, 12]


// ------------------------------
// 12. SPECIAL: MULTIDIMENSIONAL ARRAYS
// ------------------------------

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

console.log(matrix[1][1]); // 5 => row 1 col 1


// ------------------------------
// 13. CLEAN TRICKS
// ------------------------------

// Remove last item
let arr = [1, 2, 3];
arr.length = arr.length - 1;

// Empty entire array
arr.length = 0;

// Fill with index
Array.from({ length: 5 }, (_, i) => i); // [0,1,2,3,4]

// Convert NodeList to Array
const divs = Array.from(document.querySelectorAll("div"));


// ------------------------------
// 14. BONUS: isArray()
// ------------------------------

Array.isArray([1,2,3]); // true
Array.isArray("hello"); // false