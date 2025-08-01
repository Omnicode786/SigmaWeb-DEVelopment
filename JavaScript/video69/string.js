// Strings are sequences of characters — basically text
let name = "Muzammil"; // double quotes
let mood = 'Behtreen'; // single quotes
let template = `Hello, ${name}!`; // backticks for templates (ES6)

// typeof
console.log(typeof name); // "string"


// You can also create a string using the String object
let str = String(123); // converts number to "123"
let str2 = new String("Not recommended"); // returns a String object, not a primitive

let str1 = "Hello World";

console.log(str1.length); // 11 — total characters (including spaces)

"muzaMMil".toLowerCase(); // "muzammil"
"muzaMMil".toUpperCase(); // "MUZAMMIL"
// (All return new strings — original remains unchanged)

 "muzaMMil".toLowerCase(); // "muzammil"
"muzaMMil".toUpperCase(); // "MUZAMMIL"

//  Slice / Substring
let msg = "Hello World";

// slice(start, end)
msg.slice(0, 5); // "Hello"

// substring(start, end) — same as slice but can't do negative index
msg.substring(6); // "World"
//  Searching & Matching
let text = "JavaScript is behtreen";

text.includes("behtreen");  // true
text.startsWith("Java");    // true
text.endsWith("reen");      // true
text.indexOf("Script");     // 4
text.lastIndexOf("e");      // position of last 'e'

//  Replace Stuff
    let txt = "I like cats";

txt.replace("cats", "dogs"); // "I like dogs"
// Use regex with /g for global replacement
txt.replace(/cats/g, "dogs");
// Trim (whitespace)

"   Hello   ".trim();      // "Hello"
"   Hello   ".trimStart(); // "Hello   "
"   Hello   ".trimEnd();   // "   Hello"

// Concatenate

"Hello".concat(" ", "World"); // "Hello World"
"Hello" + " " + "World";      // "Hello World"

// Split
"apple,banana,mango".split(","); // ["apple", "banana", "mango"]

// Pad