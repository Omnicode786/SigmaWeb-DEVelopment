// --- 1. Destructuring ---
const person = { name: "Muzammil", age: 20 };
const { name, age } = person;
console.log(name, age);

// --- 2. Spread and Rest ---
const newPerson = { ...person, city: "Karachi" };
console.log(newPerson);

// --- 3. Optional Chaining ---
const student = { contact: { email: "x@gmail.com" } };
console.log(student?.contact?.email);

// --- 4. Dynamic Keys ---
const key = "level";
const player = { [key]: 99 };
console.log(player.level);

// --- 5. Object Utilities ---
console.log(Object.keys(person)); // ['name', 'age']
console.log(Object.entries(person)); // [['name', 'Muzammil'], ['age', 20]]

// --- 6. this Keyword ---
const user = {
  name: "Zaid",
  greet() {
    console.log("Hi " + this.name);
  }
};
user.greet(); // "Hi Zaid"

// --- 7. Constructor vs Literal ---
function Car(model) {
  this.model = model;
}
const c1 = new Car("Civic");
console.log(c1.model);

// --- 8. Prototypes ---
Car.prototype.start = function () {
  console.log(this.model + " started");
};
c1.start(); // "Civic started"