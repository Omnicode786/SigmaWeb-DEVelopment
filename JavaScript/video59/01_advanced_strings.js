
// ADVANCED STRINGS IN JAVASCRIPT

/*
🔥 Template Literals (Multi-line & Interpolation)
Great for building dynamic strings in UI, logs, HTML templates etc.
*/
const name = "Muzammil";
const greeting = `Hello, ${name}. Welcome to the JS World!`;
console.log(greeting);

/*
🧠 Tagged Templates
Used in libraries like styled-components (React), i18n translations, custom formatting.
*/
function highlight(strings, ...values) {
    return strings.reduce((result, str, i) => result + str + (values[i] ? `[${values[i]}]` : ""), "");
}
const user = "Muzammil";
const age = 21;
console.log(highlight`User ${user} is ${age} years old.`);

/*
📚 String.raw – useful when working with file paths or regex
*/
const filePath = String.raw`C:\Users\Muzammil\Documents`;
console.log(filePath);

/*
🧵 Manipulating individual characters
Strings are immutable – every operation returns a new string
*/
let str = "hello";
console.log(str.charAt(1));      // "e"
console.log(str.charCodeAt(1));  // 101 (ASCII code)
console.log(str.slice(-2));      // "lo"
console.log(str.repeat(3));      // "hellohellohello"

/*
🎯 Useful string use cases:
- Text formatting, localization
- Validations (form fields, emails, passwords)
- Logs and error messages
- Tokenization and parsing in compilers or interpreters
- HTML generation for SSR frameworks
*/
