// thebetter approach is to switch to npm type module so we have import and async

// what we were doing earlier was commmon js


import http from "http"

import add, {a, c, e} from './mymodulecheck.js';
console.log(a, c, e);
// export se jo import krwate hen wo sara k sara aik object ki soorat me ata he
import {obj} from "./mymodulecheck.js";
console.log(obj);

import adder from "./mymodulecheck.js";
import { dirname } from "path";
console.log(adder(5,8));

// NOTE for Future Me 🧠:
// When we do multiple "export const ..." in mymodulecheck.js,
// behind the scenes JS packs them all into ONE big object,
// kinda like a suitcase full of variables and functions 🧳.
// 
// Then, when we do:
//     import { a, c, e } from './mymodulecheck.js';
// we're basically opening the suitcase and saying:
// "Give me only a, c, and e from inside" (this is destructuring).
//
// But if I do:
//     import obj from './mymodulecheck.js';
// this is NOT destructuring — this is asking for THE default export.
// And if I never said "export default ..." in mymodulecheck.js,
// then guess what? JS will just give me undefined and laugh silently 😒.
//
// Moral of the story:
// - Named exports → import with { curly braces }
// - Default export → import without curly braces
// - I can also do: import * as myStuff from './mymodulecheck.js'
//   to get the whole suitcase and see all my exports in one place.
//

// node js wraps our code in a function

(function(/*export*/require,module, __filename, __dirname){

// the module that we import here wil live here 
// when we use common js 

});

console.log(__filename, __dirname);
// right now htis will not work as we are in module scope


