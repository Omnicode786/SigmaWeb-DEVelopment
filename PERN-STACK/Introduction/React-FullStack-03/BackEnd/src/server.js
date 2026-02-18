import express from 'express';
import { db } from './db.js'
import { cars } from './schema.js'

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', (req, res) => {
res.send("So we are here huh")

})



app.get('/api/v1/cars', async (req, res) => {
    const allCars = await db.select().from(cars);
    res.send(allCars);
})



app.post('/api/v1/cars', async (req, res) => {
    const {make, model, year, price} = req.body

    await db.insert(cars).values({
        make,
        model,
        year: Number(year),
        price
    })
      res.send(`
 Succesfull response
    `)
})



app.listen(3000, () => console.log("Server is running"));