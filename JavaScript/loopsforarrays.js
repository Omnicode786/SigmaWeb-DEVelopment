let array = [1,2,3,"Muzammil",4,5];

array.forEach((value,index,array) => {
    console.log(`Value: ${value}, Index: ${index}, Array: ${array}`);
    
});

// for fo or for in jo he wo objects ke context me uyse hota he


let obj = {
    a: 1,
    b: 2,
    c: 3
}

for (let key in obj) {
    console.log(`Key: ${key}, Value: ${obj[key]}`);

// object me kch properties hoti hen jo wo added hoti hen kuch built in objects me lkch properties inherit krti hen
}

// for of loop direct arrays kelie hotahe
 
for (let iterator of array){
    console.log(iterator);
}


// meri own practice

const square = x => x*x
console.log(square(5)); // 25
// orignal elemet ka use krke new array bnao and least lines me

let newarr = [];
for (let iterator of array){
    newarr.push(iterator**2);
}
console.log(newarr); // [1, 4, 9, "Muzammil", 16, 25]

// isi trah simple krne kelie

let newarr1 = []

newarr1 = array.map((e)=>{
    return e**2;
})
//  this can simply be reduced to 
newarr1 = array.map((e, index,array) => e**2); // is func me ye bhi milta he
// map function har element pr apply hota he and new array return karta he


// filter() is a higher-order array method.
// higher order array methods are functions that can take a function as an argument or return a function as a result.


let newarr2 =  array.filter(greaterthan2 = (e) => {
    return e > 2 ? true : false;
})

console.log(newarr2); // [3, 4, 5] — filters elements greater than 2
// this could also be written as
newarr2 = array.filter(e => e > 2); // filters elements greater than 2

// (e => e > 2)
// This is a callback function, written in concise arrow function syntax.


// Real-World Use Case
// In frontend, you might filter search results:

let searchResults = [
    { name: "Laptop", price: 1500 },
    { name: "Phone", price: 800 },
    { name: "Tablet", price: 300 }
];

let filterresults = searchResults.filter(product => product.price > 1000);

// In backend (Node.js), you might filter user records:

let users = [
    { id: 1, name: "Alice", isActive: true, age: 25 },
    { id: 2, name: "Bob", isActive: false, age: 30 },
    { id: 3, name: "Charlie", isActive: true, age: 17 }
];

let filterusers = users.filter(user => user.isActive && user.age > 18);
console.log(filterusers); // [{ id: 1, name: "Alice", isActive: true, age: 25 }]
// In data processing, you might filter out invalid readings:

let sensorData = [100, 200, "invalid", 300, 0, 400];

let filterdata = sensorData.filter(value => typeof value === "number" && value !== 0);

console.log(filterdata); // [100, 200, 300, 400] — filters out non-numeric and zero values

// Callback Function	Function passed to another function to be executed later


// kisi bhi object ko agr array me convert krna ho to
let objToArray = Object.entries(obj);
console.log(objToArray); // [['a', 1], ['b', 2], ['c', 3]] — converts object to array of key-value pairs
// Object.entries(obj) returns an array of the object's own [key, value] pairs.



// we can also do it like

let objarray = Array.from(obj);
console.log(objarray); // [['a', 1], ['b', 2], ['c', 3]] — converts object to array of key-value pairs

// Instead, Array.from(obj) will throw a TypeError, because Array.from() expects an iterable (like an array, string, Map, Set, etc.) — and plain objects are not iterable.

