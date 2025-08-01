// ✅ Function Context and 'this'
// Normal functions me 'this' uss object ko refer karta hai jisse function call hua
const person = {
    name: "Muzammil",
    greet: function() {
        console.log("Hello, " + this.name);
    }
};

person.greet(); // this.name => Muzammil

// Arrow function me 'this' lexical hota hai (jo scope surrounding hota hai usko refer karta hai)
const obj = {
    name: "TKO",
    greet: () => {
        console.log("Arrow says: Hello " + this.name); // undefined
    }
};

obj.greet(); // this.name is undefined
