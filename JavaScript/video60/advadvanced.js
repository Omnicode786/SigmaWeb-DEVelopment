 Advanced JavaScript Arrays – Deep Dive
🧠 1. Array.prototype.map()
Purpose: Transform array elements without mutating the original array.

 
  
  
const numbers = [1, 2, 3, 4];
const squared = numbers.map((num, index, arr) => {
  return num ** 2;
});
Explanation:

num: current element

index: index of current element

arr: the full array

map() always returns a new array of the same length.

👉 Great for UI generation, data pipelines, etc.

🧠 2. Array.prototype.reduce()
Purpose: Reduce the array to a single value (accumulator-based).

 
  
  
const sum = [1, 2, 3, 4].reduce((acc, curr, index, arr) => {
  return acc + curr;
}, 0);
How it works:

acc (accumulator): stores the return value of each iteration

curr: current element

0: initial value

Can be used for:

Summing values

Flattening arrays

Chaining logic

Building objects

Example – flatten nested array:

 
  
  
const nested = [[1, 2], [3, 4], [5]];
const flat = nested.reduce((acc, val) => acc.concat(val), []);
🧠 3. Destructuring Arrays
 
  
  
const arr = [10, 20, 30, 40];
const [a, , b, ...rest] = arr;
console.log(a);    // 10
console.log(b);    // 30
console.log(rest); // [40]
Explanation:

Commas , are used to skip indexes.

...rest gathers remaining elements.

Works beautifully in function parameters too.

🧠 4. Sparse Arrays
 
  
  
const arr = [];
arr[5] = 100;
console.log(arr);       // [ <5 empty items>, 100 ]
console.log(arr.length); // 6
Sparse arrays have "holes" — they skip over undefined indices. Be careful: methods like forEach or map skip these empty slots.

🧠 5. Iterating Like a Pro
 
  
  
const arr = [1, 2, 3];

arr.forEach((value, index) => { });
arr.map(x => x * 2);
arr.filter(x => x % 2 === 0);
arr.every(x => x < 5);
arr.some(x => x === 2);
every: true only if all values satisfy the condition.

some: true if any value satisfies it.

// 🧠 6. Object.entries() + Array = 💥
// Transforming objects into arrays for iteration:

 
  
  
const obj = { a: 1, b: 2, c: 3 };
const entries = Object.entries(obj); // [['a', 1], ['b', 2], ['c', 3]]

const rebuilt = Object.fromEntries(entries);
// Used in:

// Conversions

// Dynamic table creation

// Building components from config

// 🧠 7. Array.prototype.at() – Modern Way
 
  
  
const arr = [10, 20, 30, 40];
arr.at(1);   // 20
arr.at(-1);  // 40 (last item)
// This replaces arr[arr.length - 1] with cleaner syntax.

// 🧠 8. Mutating vs Non-Mutating Methods
// Non-Mutating	Mutating
// map, filter, reduce, slice, concat	push, pop, shift, unshift, splice, sort, reverse

// Avoid mutating methods in functional code.

// splice() is destructive:

 
  
  
const a = [1, 2, 3];
a.splice(1, 1); // removes 1 element at index 1

// 🧠 9. Flattening Deep Arrays
 
  
  
const deep = [1, [2, [3, [4]]]];
const flat = deep.flat(Infinity);
You can specify a depth:

.flat(2) – two levels

.flat(Infinity) – flatten all levels

🧠 10. Custom Sorting
 
  
  
const nums = [10, 5, 20];
nums.sort((a, b) => a - b); // Ascending
nums.sort((a, b) => b - a); // Descending
Sorting strings with locale:

 
  
  
const names = ['éclair', 'apple', 'banana'];
names.sort((a, b) => a.localeCompare(b));

🧠 11. Chain Functional Methods
 
  
  
const items = [1, 2, 3, 4, 5];
const result = items
  .filter(x => x % 2 === 0)
  .map(x => x * 10)
  .reduce((acc, val) => acc + val, 0);
Clean, elegant pipelines

Each method returns a new array

🧠 12. Array.from() and .keys()
 
  
  
Array.from("hello"); // ['h', 'e', 'l', 'l', 'o']

Array.from({ length: 5 }, (_, i) => i); // [0, 1, 2, 3, 4]

const keys = [...Array(3).keys()]; // [0, 1, 2]
Perfect for generating ranges.

🧠 13. Typed Arrays (for performance)
 
  
  
const buffer = new ArrayBuffer(16);
const int32 = new Int32Array(buffer);
int32[0] = 42;
Typed arrays are used for:

WebGL

Binary data processing

Performance-heavy tasks

🧠 14.    Arrays Safely
 
  
  
const a = [1, 2, 3];
const b = [...a]; // Spread
const c = a.slice(); // Slice

// NOT: const d = a; (same reference!)
🧠 15. Filling Arrays
 
  
  
const filled = new Array(5).fill(0); // [0, 0, 0, 0, 0]