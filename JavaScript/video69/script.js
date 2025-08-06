// js objects have a special prototype

// yar wohi inheritence wala scene he


// let animal = {
//     eats: true
// }

// let rabbit = {
//     jumps: true
// }

// rabbit.__proto__ = animal;

// // now rabbit also inherits the properties of animals


// we donot normally do this we make proepr classes


class Animal {
    constructor(name){
        this.name = name;
        // us ka name lelega jo us object ka he
        console.log("Object is created");
        // constructor will alway be called when a object is initiated
    }
    eats(){
        console.log("I am eating");
    }
    jumps(){
        console.log("I am jumping");
    }
}
class Lion extends Animal{
    // this will make it inherit the methods of the animal class
}

let a = new Animal("Bunny");
console.log(a);

let lion = Lion("Shera");
console.log(lion);