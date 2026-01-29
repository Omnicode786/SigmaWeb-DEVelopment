import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

const [num, setNum] = useState(10)
const [num1, setNum1] = useState(10)

const btnClicked = () => {
setNum(num +1)
setNum(num +1)
setNum(num +1)


}
const btnClicked1 = () => {

  setNum1(prev => (prev + 1));
  setNum1(prev => (prev + 1));
  setNum1(prev => (prev + 1));
// this is example of batch updates


}

  return (
    <>
   
{/* states changing thing 
suppose a counter 1 is a state
then 2 is a state then the trnasition between these
states 
useState helps in that

*/}

<button onClick={() => {
setCount(count + 1)

}}>Add Count</button>
<button onClick={() => {
  if (count > 0){
setCount(count - 1)

  }

}}>Subtract Count</button>
<div>{count}</div>


<div>The value of num because of error of batch update {num}</div>

<div>The value of num because of error fixing of batch update {num1}</div>

<button onClick={btnClicked}>Batch Error</button>

<button onClick={btnClicked1}>Batch Error Fixed</button>


{/* use effect manages the side track
bari si road he 
bari si road is react
a truck is running filling everything 
side wali pe mene aik cycle le aya

basically aik function he usko mene call kia wo chal rha he
wo apni jga pr chl rhahe

side by side apka dusra process bhi chalega kia smjhe meri jan ke tote


*/}

{/* 
Think of useEffect like a helper in React:

- Your React component is a road (bari si road 🛣️).
- The main code of your component is like a truck moving down the road, doing its normal work.
- Sometimes you need a side-task to happen alongside the truck — like a bicycle riding on the side or some work happening in the background.
- That’s what useEffect does: it runs a function "on the side" while your main component keeps doing its job.

useEffect lets you:
1. Run code when the component first appears (like sending a welcome message when people enter the road).
2. Run code whenever some data changes (like updating signs on the side whenever traffic changes).
3. Clean up after itself when the component leaves (like removing barriers or signs when the road is closed).

In short: **useEffect manages side effects** — things that happen alongside the main flow of your component.
*/ }

{/* in dom document querry selector
used to select a document in the dom right
react chahta he ke sab kch uske through hokr jaye


*/}

{/* variable ko change rect krta he

use state is used to do this


use ref ksi bhi dom element ko select krna ka kam krta he

we can still use document querry selector in react
but we should not as now we are doing it directly

but we want react to do it for us 

use Ref take reference for any  thing there
mutable values hold krne keliye jo render trigger na kren


useContext 
global context ko manage krta he
suppose krlo

app se data bheja
to wo aik heirarchy se hota wa jayega
like app se page 1 page 1 se section 1 so on and so forth

// suppose dark theme / light theme can be a good examle for this
// ab agr hame aise hierarchy me ni bhejna he data
or sari chezo ko acces krna heto we can do it like that
use context

global state ko consume krna lie without prop drilling


useReducer is simply useContext but for complex things
user ne login kia ni kiya usko multiple jaga pr check krna he
reduc ka chot abhai


usecallback and use memo simply jab ham koi simple si change change horhi ho website
pr
to pura change krne ki kia zrort he srf or srf utna part change krdona

unnecesary re renders avoid krne kelie



*/}

    </>
  )
}

export default App
