import express from 'express';
import employeesRouter from './routes/employees.js';

const app = express();

// parse JSON from requests (needed for POST/PUT/PATCH)
app.use(express.json());

// home route
app.get('/', (req, res) => {
    res.send("Server running 🚀");
});

// mount all employee routes under /api/v1/employees
app.use('/api/v1/employees', employeesRouter);

// start server
app.listen(3001, () => console.log("Server running on port 3001"));
