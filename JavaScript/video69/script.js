// ------------------------------
// 1️⃣ BASIC CLASS BANANA
// ------------------------------

// Ek basic class jo ek blueprint banata he objects ke liye
class Animal {
    constructor(name) {
// jesei object bnta he wesei ye run hojata ghe

        this.name = name; // jo name hum pass kareinge, vo object me store hoga
        console.log(`Object created for ${this.name}`); // jab object banega tab run hoga
    }

    eats() {
        console.log(`${this.name} is eating`);
    }

    sleeps() {
        console.log(`${this.name} is sleeping`);
    }
}

// Example use:
let dog = new Animal("Tommy");
dog.eats();
dog.sleeps();


// ------------------------------
// 2️⃣ INHERITANCE (extends keyword)
// ------------------------------

// Ek subclass jo Animal se properties aur methods le raha he
class Lion extends Animal {
    constructor(name, power) {
        super(name); // super() parent ka constructor call karta he
        this.power = power; // apna extra property
    }

    // Method overriding (parent ke method ka apna version banana)
    eats() {
        super.eats(); // pehle parent ka eats() call karo
        console.log(`${this.name} is eating like a lion 🦁`);
    }
}

let sher = new Lion("Shera", "Roar Power");
sher.eats(); // dono messages ayenge
console.log(sher);


// ------------------------------
// 3️⃣ GETTERS & SETTERS
// ------------------------------

// Ye ek tarika he controlled access ka — direct property access na de ke functions ka use
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    get area() {
        // read-only property ban gaya
        return this.width * this.height;
    }

    set area(value) {
        // yaha hum custom logic likh sakte hen (ye example me just warning de rahe)
        console.log("Area cannot be set directly!");
    }
}

let rect = new Rectangle(10, 5);
console.log(rect.area); // 50
//  ham read kr skte hen but isko change ni kr skte

rect.area = 100; // warning


// ------------------------------
// 4️⃣ STATIC METHODS
// ------------------------------

// Static methods class se belong karte hen, object se nahi
class MathHelper {
    static add(a, b) {
        return a + b;
    }
}

console.log(MathHelper.add(5, 7)); // object banane ki zarurat nahi


// ------------------------------
// 5️⃣ PRIVATE PROPERTIES (# keyword se)
// ------------------------------

// Ye sirf class ke andar access hota he, bahar se nahi
class BankAccount {
    #balance; 
    // # krne se private hojata he  
    // private variable

    constructor(initialBalance) {
        this.#balance = initialBalance;
    }

    deposit(amount) {
        this.#balance += amount;
        console.log(`Deposited: ${amount}`);
    }

    getBalance() {
        return this.#balance;
    }
}

let account = new BankAccount(1000);
account.deposit(500);
console.log(account.getBalance()); // 1500
// console.log(account.#balance); // ❌ error


// ------------------------------
// 6️⃣ POLYMORPHISM
// ------------------------------

// Same method name, alag behavior in different classes
class Bird {
    sound() {
        console.log("Some generic bird sound");
    }
}

class Crow extends Bird {
    sound() {
        console.log("Caw Caw 🐦");
        // this is sort of similar to the method overriding
    }
}

class Parrot extends Bird {
    sound() {
        console.log("Hello! 🦜");
    }
}

let birds = [new Bird(), new Crow(), new Parrot()];
birds.forEach(b => b.sound());


// ------------------------------
// 7️⃣ ABSTRACTION (Concept Only in JS)
// ------------------------------

// JS me true abstract classes nahi hen (jaise Java me hota he), 
// lekin hum normal class ko sirf "blueprint" banane ke liye use karte hen aur uska object nahi banate.
class Shape {
    area() {
        throw new Error("You must implement area() in subclass");
    }
}

class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }

    area() {
        return Math.PI * this.radius ** 2;
    }
}

let c = new Circle(5);
console.log(c.area());
