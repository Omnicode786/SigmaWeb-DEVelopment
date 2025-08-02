let array = [1,2,3,4,5];


console.log(array.length);
console.log(array[0]);
console.log(array);

// type of array ko javascript object bnatqa he

console.log(typeof array); // "object"

console.log(Array.isArray(array)); // true
// kuch methods jo array ke sath kaam karti hain
console.log(array.includes(3));
console.log(array.indexOf(3)); // 2
console.log(array.lastIndexOf(3)); // 2
console.log(array.join(", ")); // "1, 2, 3, 4, 5"
//  .join array me elements ko string me convert karta hai
console.log(array.toString()); // "1,2,3,4,5"
//  .toString bhi array ko string me convert karta hai
console.log(array.reverse()); // [5, 4, 3, 2, 1] — reverses the array
console.log(array.sort()); // [1, 2, 3, 4, 5] — sorts the array in place
//  .sort sorts the array in place, but for numbers, you need to provide a compare function
console.log(array.slice(1, 3));

// parameter if slice function is start and end index
//  .slice returns a shallow copy of a portion of an array into a new array object
console.log(array.splice(1, 2, 100, 200)); // [2, 3] — removes 2 elements starting from index 1 and adds 100, 200
console.log(array); // [1, 100, 200, 4, 5] — original array is modified
// difference between shallow copy and deep copy is 