import { useState } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, incrementAmount } from './store/features/counterSlice'

function App() {

// change theme
// action dispatch thorugh the event that was handled

// ye bat pta chlegi redux sotre ko
// hamne aik reducer bna kr rkha wa he
// reducers of function if somebody wants to change thetheme
// data of theme was stored in the redux store
// we sent the state of the redux store for hte theme o that reducer function now the theme has been changed to dark
// or whatever
// then redux store is now changed and now it will update the up layer
// the redux store has many reducers that are there to manage different states

// we can create either store or redux folder
const dispatch = useDispatch();
const count = useSelector((state) => state.counter.value);
const [Amount, setAmount] = useState(0)
// value ko use bhi to krna hena isillie we use use sleector
// show kelie selctor
// kaam kelie dispatch 


  return (
    <>
   <h1>{count}</h1>

   {/* we have two things use dispatch and use selector */}
{/* mene ye actinperform krdia ab jo krna he krdo dispatch */}

<button
onClick={() => {
dispatch(increment())

}}
>Increment</button>
<button
onClick={() => {
dispatch(decrement())
  
}}
>Decrement</button>
<input
onChange={(e)=>{
  // to convert the str to int we can use
  // Number()
  setAmount(Number(+e.target.value));
  // console.log(Amount)
}} type='number' min={0} value={Amount}  placeholder='Enter Amount' />

<button 
onClick={() => {

  dispatch(incrementAmount(Amount));
}}>
  Increment by amount
</button>
    </>
    
  )
}

export default App
