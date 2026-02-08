// ===============================
// NODE.JS CORE HTTP SERVER
// ===============================

// Import Node's built-in http module
// This comes with Node itself (no npm install needed)
import http from 'http'


// createServer sets up a basic HTTP server
// IMPORTANT: This does NOT block the program
// Node registers this callback with the EVENT LOOP
// Whenever a request comes in → this function runs
const server = http.createServer((req, res) => {

    // writeHead sends HTTP status code + headers
    // 200 = OK
    // Content-Type tells the browser what kind of data it is
    res.writeHead(200, { 'Content-Type': 'text/plain'});

    // res.end FINALIZES the response
    // After this, Node sends data back to client
    res.end("You just built a node js server");
});


// listen tells Node:
// "Start listening on this port and register it with the OS"
server.listen(3000, () => 
    console.log("Server is running on port: 3000")
);


// =====================================================
// EXPRESS.JS (ABSTRACTION OVER NODE HTTP)
// =====================================================

// express js is really easy
// express internally uses the SAME http module
// but hides all the low-level boilerplate

import express from 'express'





// new instance of express is created
// think of app as:
// a BIG request handler with routing + middleware
const app = express()





// ---------------------------------
// ROUTES (GET)
// ---------------------------------

// app.get listens ONLY for GET requests
// '/' is the ROOT route
app.get('/', (req, res)=> {

    // res.send automatically sets headers
    // and ends the response (no res.end needed)
    res.send("We are on a server using express");
})


// another GET route
// /api/muzammil is a static route
app.get('/api/muzammil', (req, res)=> {
    res.send("Muzammil's api");
})


// ---------------------------------
// POST REQUEST
// ---------------------------------

// app.post is used when client SENDS data
// usually from forms, JSON, frontend apps
app.post('/api/muzammil', (req, res) => {

    // NOTE:
// req.body would contain data (after middleware)
// POST is generally for CREATE
    res.send('Muzammil boss')
})


// ---------------------------------
// DYNAMIC ROUTES (:id)
// ---------------------------------

// :id is a dynamic parameter
// Express extracts it and stores it in req.params

// this id param is in string format so if we need to do such 
// comparaisons then we need to convert it to a number / integer


// Example URL:
// /api/muzammil/56545
// req.params = { id: "56545" }

// GET → read data
app.get('/api/muzammil/:id', handlerSend);

// PUT → update data
app.put('/api/muzammil/:id', handlerPut);


// PUT handler
function handlerPut(req, res) {

 
// You MUST send a response
// otherwise request will hang forever
  console.log(`Muzammil new employee no is: ${req.params.id}`);

  res.send(`Employee number ${req.params.id} updated successfully`);
}


// GET handler
function handlerSend(req, res) {

  // This sends data back to client
  res.send(`Muzammil new employee no is: ${req.params.id}`);
}


// essentially what's happening is:
// 1) we get dynamic data from URL
// 2) frontend might click a button with an ID
// 3) that ID reaches backend via params
// 4) PUT updates data
// 5) GET sends data back


// ---------------------------------
// DELETE REQUEST
// ---------------------------------

// DELETE is used to remove something
// id comes from params
app.delete('/api/muzammil/delete/:id', handlerDelete)

function handlerDelete(req, res) {

  res.send(
    `Muzammil is deleting the employee with no: ${req.params.id}`
  );
}
app.get('/api/muzammil/delete/:id', (req, res) => {
  res.send(`Pretend delete employee no: ${req.params.id}`);
});

// delete will simply delete the id thing which came in params


// the above routes are so messy right? 
//  in order to fix them express has given us

// Create a new router instance
const router = express.Router();

// ---------------------------------------------
// ROUTES under /api/v1
// ---------------------------------------------

let employees = [
    {
        id:1, name:"Muzammil", empno:20
    },
    {
        id:3, name:"Suman", empno:60
    },
    {
        id:2, name:"Taga", empno:50
    }    
]

// 1️⃣ GET all employees
router.get('/employees', (req, res) => {
  // This would normally fetch from DB
  res.json(employees);
});

// 2️⃣ GET single employee by ID (dynamic route)
router.get('/employees/:id', (req, res) => {
  // Dynamic param captured in req.params
 const id = req.params.id
    const employeeFound = employees.find((employee) => employee.id == id)
    if(!employeeFound) { return res.status(404).send("Employee not Found") }
    
    res.json(employeeFound)
});

// 3️⃣ CREATE new employee (POST)
router.post('/employees', (req, res) => {
  // Data would normally come in req.body
  const { name } = req.body; // assuming { "name": "Muzammil" }
  res.send(`New employee created: ${name}`);
});

// 4️⃣ UPDATE existing employee (PUT)
router.put('/employees/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  res.send(`Employee with ID ${id} updated to name: ${name}`);
});

// 5️⃣ DELETE employee (DELETE)
router.delete('/employees/:id', (req, res) => {
   
});

// 6️⃣ PATCH example (partial update)
router.patch('/employees/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  res.send(`Employee with ID ${id} partially updated. New name: ${name}`);
});

// ---------------------------------------------
// Attach the router to app under '/api/v1'
// ---------------------------------------------
app.use('/api/v1', router);
// Now all routes are prefixed with /api/v1
// e.g. GET /api/v1/employees
// e.g. GET /api/v1/employees/123
// e.g. POST /api/v1/employees


// ---------------------------------
// START EXPRESS SERVER
// ---------------------------------

// Express also uses Node's event loop
// It does NOT create a new thread per request
app.listen(3001, ()=> 
  console.log("The app is running on port 3001")
)
