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
console.log(array.join(" and ")); // "1 and 2 and 3 and 4 and 5"
// array ke bech me har element ke bad join krdeta he specific chiz se jo bhi he

//  .join array me elements ko string me convert karta hai
console.log(array.toString()); // "1,2,3,4,5"
//  .toString bhi array ko string me convert karta hai
console.log(array.reverse()); // [5, 4, 3, 2, 1] — reverses the array
console.log(array.sort()); // [1, 2, 3, 4, 5] — sorts the array in place
//  .sort sorts the array in place, but for numbers, you need to provide a compare function
console.log(array.slice(1, 3));

// parameter if slice function is start and end index
//  .slice returns a shallow copy of a portion of an array into a new array object
console.log(array.splice(1, 2)); // [2, 3] — removes 2 elements starting from index 1 and adds 100, 200
// is array se element nikal lie jo nikala he wo return karta he or updated array me ab wo eleemnts ni he 


console.log(array); // [1, 100, 200, 4, 5] — original array is modified
// difference between shallow copy and deep copy is 



// arrays are mutable, meaning you can change their contents


array.pop(); // orignal element ke last ko array se nikaldeta he or wo jo nikala he wo return karta he

array.push(6); // adds 6 to the end of the array length be dynamically increase kr deti he
// array .push return krta he new length of the array

array.shift(); // pehle element ko array se nikal deta he or wo jo nikalta he wo return karta he

array.unshift("Muzammil") // muzammil ko array ke shuru me daal deta he or wo jo daala he wo return karta he


delete array[4] // 4th index pr jo bhi eleemtn he usko detlete krdeta he magar length still same rehti he
// or jis jga pr basically delete kia wahan pr memory to allocate ki hoti he mgr kch hota he ni he
// to wo undefined return krta he wo index jisko delete kia he

array.splice(3,2, 100, 200); // removes 2 elements starting from index 3 and adds 100, 200
// it modifies the original array and returns the removed elements
console.log(array); // [1, "Muzammil", 6, 100, 200] — original array is modified

console.log(array.slice(1,3)); // returns a shallow copy of a portion of the array from index 1 to index 2 (2nd index include ni hota wahan tak jata he but not included) ye array ko change ni krta
console.log(array); // [1, "Muzammil", 6, 100, 200] — original array is still same