import { useState, useCallback, useEffect, useRef } from 'react'

function App() {

  // STATES (React remembers these between re-renders)
  const [length, setLength] = useState(8);          // slider length of password
  const [numberAllowed, setNumberAllowed] = useState(false); // include numbers?
  const [charAllowed, setCharAllowed] = useState(false);     // include special chars?
  const [Password, setPassword] = useState("");     // the final password


// ref hook 

const passwordRef = useRef(null); 

// 3.use ref : used to give reference of selected components in our page so that functions can be performed on referenced values

// 1. useCallback hook mainly uski dependencies ke memoisation ke liye responsible hai mainly ye methods ke refrence ko apni memory me cache krke rakhta hai taaki component rerender hone par kahi method ka refrence change na ho jae or wo ek new method ki tarah hi treat ho warna uspar depend baaki component bhi fhir se rerender honge kyuki method ka refrence (means address in the memory) change ho gya hai 
// 2. Wahi useEffect sirf apni dependencies ke behalf par us callback function ko run karwaata agar dependencies change hui to wo useEffect ka callback bhi run hoga jisse uske ander hue task jaise yahan passwordGenerator function ko call krwaana wo invoke ho jaega. Thnk u so much sir ye sab clear krne ke liye.


  // 🔹 PASSWORD GENERATOR FUNCTION
  // Wrapped in useCallback → means React will "remember" this function and
  // not re-create a new copy of it every single render.
  // Without useCallback, React still works, but:
  // - Every re-render = new photocopy of passwordGen in memory
  // - If we use this in useEffect or pass to children, React thinks: "new function!"
  //   → might cause extra/unwanted runs
  const passwordGen = useCallback(() => {
// // if we dont use callback 
// o “rebuilding” = React gives you a brand-new function object in memory every render.
// It’s like you re-bought the same toy, instead of reusing the one you already had. Looks identical, but memory says: “Nope, different

    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    // If numbers are allowed, add digits
    if (numberAllowed) {
      str += "0123456789";
    }

    // If special chars are allowed, add symbols
    if (charAllowed) {
      str += "!@#$%^&*-_+=[]{}~`";
    }

    // Loop → pick random chars up to 'length'

    // when length cjhanges this length also changes
    for (let index = 0; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    // Update the password in state
    setPassword(pass);

  }, [length, numberAllowed, charAllowed, setPassword]) 
  // ⬆️ Dependencies:
  // Only rebuild this function if any of these change.
  // If nothing changes → React reuses old function copy (saves memory/avoids confusion).
  // NOTE: setPassword never actually changes, so that one is safe to drop.


  // 🔹 USE EFFECT
  // Runs AFTER render → "extra step"
  // Here it says: whenever length, numberAllowed, or charAllowed change,
  // call passwordGen immediately so the password updates live.
  useEffect(() => passwordGen(), [length, numberAllowed, charAllowed, passwordGen])
  // Without passwordGen in deps, React will complain (because it sees you're using it).
  // With useCallback, passwordGen only changes when its inputs change,
  // so this effect runs only when truly needed.

const copytoClip = useCallback(() => {
  passwordRef.current?.select()

 
  window.navigator.clipboard.writeText( passwordRef.current?.setSelectionRange(0,4))

})
  return (
    <>

      {/* Main container */}
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">

        <h1 className='text-white text-center m-2 '>Password Generator</h1>
   
        {/* Display password + copy button */}
        <div className='flex shadow rounded-lg overflow-hidden mb-4 bg-white'>
          <input 
            type="text"
            value={Password} 
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly  
            ref={passwordRef}
          />
          <button 
          onClick={copytoClip}
          className='outline-none py-0.5 shrink-0 px-3 bg-blue-700 text-white'>
            Copy
          </button>
        </div>

        {/* Options area */}
        <div className='flex text-sm gap-x-2'>
          
          {/* Password length slider */}
          <div className='flex items-center gap-x-1'>
            <input 
              type="range" 
              min={8}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e)=> {setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>

          {/* Checkbox: Numbers */}
          <div className='flex items-center gap-x-1'>
            <input 
              type="checkbox" 
              className='cursor-pointer'
              onChange={() => {
                setNumberAllowed((prev) => !prev)
                console.log(charAllowed); // just debugging
              }}
            />
            <label>Numbers</label>
          </div>

          {/* Checkbox: Special Characters */}
          <div className='flex items-center gap-x-1'>
            <input 
              type="checkbox" 
              className='cursor-pointer'
              onChange={() => {
                setCharAllowed((prev) => !prev) 
                console.log(charAllowed); // just debugging
              }}
            />
            <label>Characters</label>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
