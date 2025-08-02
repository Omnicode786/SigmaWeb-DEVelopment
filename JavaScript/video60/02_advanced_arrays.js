
// ADVANCED ARRAYS IN JAVASCRIPT

/*
🧠 High-level operations with arrays are widely used in:
- Functional Programming
- Data manipulation pipelines
- UI state management
- Backend processing, APIs
*/

// 🔄 Chaining methods (map-filter-reduce)
const scores = [90, 82, 100, 69, 73];
const average = scores
    .filter(score => score >= 70)
    .map(score => score * 1.1)
    .reduce((acc, val, _, arr) => acc + val / arr.length, 0);
console.log("Adjusted Average:", average);

// 🔁 Flat & flatMap
const nested = [1, [2, 3], [4, [5]]];
console.log(nested.flat(2)); // [1,2,3,4,5]

const words = ["hello", "world"];
console.log(words.flatMap(w => w.split(""))); // Flattened array of chars

// 🧠 Deep copy vs shallow copy
const arr1 = [1, 2, [3, 4]];
const arr2 = JSON.parse(JSON.stringify(arr1)); // Deep copy
arr1[2][0] = 99;
console.log(arr2); // Not affected by arr1 changes

// 🪄 Destructuring & Spread
const [first, , third] = [10, 20, 30];
const arr3 = [...arr1, ...arr2];

// 📚 Other useful methods
/*
- Array.from(iterable, mapFn)
- Array.isArray()
- arr.some(fn) / arr.every(fn)
- arr.find() / arr.findIndex()
- arr.fill()
- arr.copyWithin()
- arr.entries(), arr.keys(), arr.values() – useful for advanced iteration
*/

