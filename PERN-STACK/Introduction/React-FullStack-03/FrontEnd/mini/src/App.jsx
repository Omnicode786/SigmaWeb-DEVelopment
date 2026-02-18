import { useState } from 'react'

import './App.css'
import axios from 'axios'
import { useEffect } from 'react'
import Car from './components/Car'

function App() {
  const [count, setCount] = useState(0)
  const [Cars, setCars] = useState([]);
const [True, setTrue] = useState(true);

const [formData, setFormData] = useState({
  make: "",
  model: "",
  year: "",
  price: ""
});
  async function fetchData() {
  const allCars = await axios.get('/api/v1/cars');
  setCars(allCars.data)

  }
useEffect(()=> {


fetchData();


}, [])






useEffect(() => {

},[True, Cars])

const btnHAndlerForForm = () => {
  setTrue(false)
}
const btnHAndlerForShow = () => {
  setTrue(true)
}
const SubmitHandler = async (e) => {
  e.preventDefault();
  try {
const response = await axios.post('/api/v1/cars',formData )
    console.log("Car added succesfully: ", response.data);
    await fetchData();
btnHAndlerForShow();

  } catch (error) {
    console.log("Something failed due to: ", error);
    
  }
}

const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value
  }));
};

  return (
    
    <>
    <div>All Cars</div>

    <div className='gridForCards'>
      {True ? Cars.map((elem, idx) => {
        return(
        <Car key = {elem.id} {...elem}/>)
      }) : 
    <form onSubmit={SubmitHandler}>
  <input
    type="text"
    name="make"
    placeholder="Make of the car"
    value={formData.make}
    onChange={handleChange}
  />

  <input
    type="text"
    name="model"
    placeholder="Model of the car"
    value={formData.model}
    onChange={handleChange}
  />

  <input
    type="number"
    name="year"
    placeholder="Enter year"
    value={formData.year}
    onChange={handleChange}
  />

  <input
    type="number"
    name="price"
    placeholder="Price of the car"
    value={formData.price}
    onChange={handleChange}
  />

  <button type="submit">Submit</button>
</form>

      }
    </div>
    <button onClick={() => btnHAndlerForForm()}>Submit a new Car</button>
      < button onClick={() => btnHAndlerForShow()}>Show All Cars</button>
    </>
  )
}

export default App
