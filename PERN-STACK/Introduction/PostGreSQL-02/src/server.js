
import express from 'express'
import { db } from './db.js'
import { cars } from './schema.js'
const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())



app.get('/', (req, res) => {
res.send(`
    <h2>Add a Car</h2>
    <form method="POST" action="/add-car">
      <input name="make" placeholder="Make" required />
      <br/><br/>
      <input name="model" placeholder="Model" required />
      <br/><br/>
      <input name="year" type="number" placeholder="Year" required />
      <br/><br/>
      <input name="price" type="number" step="0.01" placeholder="Price" required />
      <br/><br/>
      <button type="submit">Add Car</button>
    </form>
    <h2>Show existing cars</h2>

      <a href="/show-cars">Show All Cars</a>

  `

)})


app.post('/add-car', async (req, res) => {
    const {make, model, year, price} = req.body

    await db.insert(cars).values({
        make,
        model,
        year: Number(year),
        price
    })
      res.send(`
      <h3>Car Added Successfully 🚗</h3>
      <a href="/">Add Another</a>
      <a href="/show-cars">Show All Cars</a>

    `)
})

app.get('/show-cars' ,async (req, res) => {
    const allCars = await db.select().from(cars);
    res.json(allCars) // sends JSON

})

app.listen(3000, () => {
      console.log('Server running on http://localhost:3000')

})