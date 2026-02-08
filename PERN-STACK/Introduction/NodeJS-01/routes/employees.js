import express from 'express';

const router = express.Router();

// temporary in-memory DB (for demo)
let employees = [
    { id: 1, name: "Muzammil", empno: 20 },
    { id: 2, name: "Taga", empno: 50 },
    { id: 3, name: "Suman", empno: 60 }
];

// GET /api/v1/employees → list all employees
router.get('/', (req, res) => {
    res.json(employees);
});

// GET /api/v1/employees/:id → get single employee
router.get('/:id', (req, res) => {
    const id = req.params.id;
    const emp = employees.find(e => e.id == id);
    if(!emp) return res.status(404).send("Employee not found");
    res.json(emp);
});

// POST /api/v1/employees → create new employee
router.post('/', (req, res) => {
    const { name } = req.body;
    // simple ID generation
    const id = employees.length ? employees[employees.length-1].id + 1 : 1;
    const newEmp = { id, name, empno: Math.floor(Math.random()*100) };
    employees.push(newEmp);
    res.json(newEmp);
});

// PUT /api/v1/employees/:id → update existing employee
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const emp = employees.find(e => e.id == id);
    if(!emp) return res.status(404).send("Employee not found");
    emp.name = name;
    res.json(emp);
});

// DELETE /api/v1/employees/:id → remove employee
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const index = employees.findIndex(e => e.id == id);
    if(index === -1) return res.status(404).send("Employee not found");
    const deleted = employees.splice(index, 1);
    res.json(deleted[0]);
});

// PATCH /api/v1/employees/:id → partial update
router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const emp = employees.find(e => e.id == id);
    if(!emp) return res.status(404).send("Employee not found");
    if(name) emp.name = name;
    res.json(emp);
});

export default router;
