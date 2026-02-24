import express from "express";
import SubjectsRouter from './routes/subjects';

const app = express();
const PORT = 8000;

app.use('/api/subjects', SubjectsRouter);

// ok great the data is coming out to be great

app.use(express.json());
app.get('/', (req, res) => {
    res.send("Hello welcome to the classroom api");
})

app.listen(PORT, ()=> console.log(`Server is running at http://localhost:${PORT}`));

