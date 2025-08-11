// ==================== ARRAY DESTRUCTURING ====================

// Basic array destructuring
let [a, b] = [10, 20];
console.log(a, b); // 10 20

// Swapping variables (common trick)
[a, b] = [b, a];
console.log(a, b); // 20 10

// Skipping values
let [first, , third] = [1, 2, 3];
console.log(first, third); // 1 3

// Default values
let [x, y = 42] = [5];
console.log(x, y); // 5 42

// Nested array destructuring
let [m, [n, o]] = [1, [2, 3]];
console.log(m, n, o); // 1 2 3

// Using rest operator to get remaining items
let [head, ...tail] = [1, 2, 3, 4];
console.log(head); // 1
console.log(tail); // [2, 3, 4]

// ==================== OBJECT DESTRUCTURING ====================

let user = { name: "Ali", age: 25, country: "PK" };

// Basic object destructuring
let { name, age } = user;
console.log(name, age); // Ali 25

// Renaming variables
let { name: fullName, country: homeCountry } = user;
console.log(fullName, homeCountry); // Ali PK

// Default values
let { role = "guest" } = user;
console.log(role); // guest

// Nested object destructuring
let employee = {
    id: 101,
    profile: {
        username: "coder123",
        location1: "Lahore"
    }
};
let { profile: { username, location1 } } = employee;
console.log(username, location1); // coder123 Lahore

// Rest properties in objects
let { name: userName, ...restInfo } = user;
console.log(userName); // Ali
console.log(restInfo); // { age: 25, country: 'PK' }

// ==================== FUNCTION PARAMETER DESTRUCTURING ====================

// Passing object directly into a function and destructuring inside parameter list
function greet({ name, country }) {
    console.log(`Hello ${name} from ${country}`);

    // we dont have accesss to the other proeprties of this object

}
greet(user); // Hello Ali from PK

// Destructuring with default values in function parameters
function createUser({ name = "Guest", role = "user" } = {}) {
    console.log(`Name: ${name}, Role: ${role}`);
}
createUser(); // Name: Guest, Role: user
createUser({ name: "Admin" }); // Name: Admin, Role: user
createUser({ name: "Admin", role:"Developer" }); // Name: Admin, Role: developer

// basically this means that if the person does not give the object the properties then it will always have default values



// ==================== REAL API-LIKE EXAMPLE ====================

let apiResponse = {
    status: 200,
    data: {

        user: {
            id: 1,
            email: "test@example.com",
            profile: { name: "Hassan", city: "Karachi" }
        },
        admin: {
            id: 202,
            email: "Muzammilalam408@gmail.com"
        }
    }
};

// Deep destructuring from API data
let { data: 
    { user:
         { profile: 
            { name: apiName, city } 
        } 
    } 
} = apiResponse;
console.log(apiName, city); // Hassan Karachi

let {data:{admin:
    {id,email}}} = apiResponse;
    console.log(id,email);