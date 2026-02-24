import express from "express";
import SubjectsRouter from './routes/subjects';
// import cors from 'cors';
const app = express();
const PORT = 8000;

// if (!process)

app.use('/api/subjects', SubjectsRouter);

// ok great the data is coming out to be great

app.use(express.json());
app.get('/', (req, res) => {
    res.send("Hello welcome to the classroom api");
})

app.listen(PORT, ()=> console.log(`Server is running at http://localhost:${PORT}`));



// i am getting the data correctly from neon also i can get the data in filters and stuff lke that

// http://localhost:8000/api/subjects?search=Data%Structures
// this we we can filter