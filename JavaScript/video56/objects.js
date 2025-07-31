
// ==============================
//      JavaScript Objects
// ==============================

// Object ek aise structure hota hai jisme key-value pairs hotay hain.
// C++ ya other languages mein jese struct hota hai, waise JS mein object hota hai.

// Object creation using curly braces {}
let student = {
    name: "Muzammil",
    age: 19,
    course: "Electrical Engineering",
    isEnrolled: true,
    skills: ["C", "C++", "HTML", "CSS", "JS"],
    greet: function() {
        console.log("Assalamu Alaikum, " + this.name);
    }
};

// Object ke andar values ko access karne ke 2 tareeqay hain:
// 1. Dot notation (preferred)
console.log(student.name);      // Muzammil

// 2. Bracket notation (jab key string form mein ho ya dynamic ho)
console.log(student["course"]); // Electrical Engineering

// Object ke andar function bhi rakh sakte ho jise 'method' kehte hain
student.greet();  // Assalamu Alaikum, Muzammil

// Updating values
student.age = 20;

// Naye property add karna
student.city = "Karachi";

// Object ko loop karna using for...in
for (let key in student) {
    console.log(key + ": " + student[key]);
}

// Yeh structure JS mein har tarah ke data organize karne mein help karta hai
