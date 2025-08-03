// ✅ Function Declaration vs Expression
// Function declaration: Yeh top-level pe likha jata hai, hoist ho jata hai (yaani pehle se JS isko upar le jata hai).
function sayHi() {
    console.log("Hi!");
}

sayBye(); // ✅ also works, but only after definition
// this will not work if sayBye is called before its definitio
// Function expression: Isko variable me store karte hain. Yeh hoist nahi hota.
const sayBye = function() {
    console.log("Bye!");
}

sayHi();  // ✅ works
sayBye(); // ✅ also works, but only after definition
// what does it mean after definition? It means you cannot call sayBye before this line, otherwise you'll get an error.
// Yeh dono alag tarike se likhe gaye hain, lekin dono kaam same karte hain.
// isko ham is treke se ni use kr skte hain:
// sayBye(); // ❌ Error: sayBye is not defined (if called before the definition)




dsd