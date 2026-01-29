import { useState } from 'react'

function App() {
  const [title, setTitle] = useState('');
  const [Details, setDetails] = useState('')
  const [Task, setTask] = useState([])

  const handleForm = (e) => {
    e.preventDefault();
    const copyTask = { title, Details };
    setTask([...Task, copyTask]);
    setTitle('');
    setDetails('');
  }

  const deleteTask = (index) => {
    const filteredTasks = Task.filter((_, i) => i !== index);
    setTask(filteredTasks);
  }

  return (
    <div className='min-h-screen bg-zinc-900 font-sans p-5'>
      {/* Input Section */}
      <div className='flex flex-col justify-center items-center py-10'>
        <div className='bg-amber-300 p-8 w-full max-w-md rounded-tl-3xl rounded-bl-3xl text-black border-r-[20px] border-red-600 shadow-2xl'>
          <form onSubmit={handleForm}>
            <h1 className='font-black text-3xl mb-5 uppercase tracking-tighter'>Add Note</h1>
            
            <h2 className='text-lg font-bold mb-1'>Title</h2>
            <input 
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className='w-full p-3 bg-white border-2 border-black font-medium focus:outline-none mb-4' 
              type="text" 
              placeholder='What is the title?' 
              required 
            />

            <h3 className='text-lg font-bold mb-1'>Details</h3>
            <textarea
              value={Details}
              onChange={(e) => setDetails(e.target.value)}
              className='w-full p-3 bg-white border-2 border-black font-medium focus:outline-none h-32 mb-6' 
              placeholder='Describe your note...' 
            />

            <div className='flex justify-center'>
              <button className='bg-black text-white px-10 py-3 rounded-full font-bold uppercase active:scale-90 transition-transform hover:bg-zinc-800'>
                Save Task
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Task Display Section */}
      <div className='flex flex-wrap justify-center gap-6 p-10 bg-red-600 rounded-3xl min-h-[500px] border-8 border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,0.3)]'>
        {Task.length > 0 ? Task.map((elem, idx) => {
          return (
            <div key={idx} className='w-80 h-auto min-h-[300px] bg-amber-400 border-r-[30px] border-green-500 p-6 flex flex-col shadow-xl'>
              <div className="flex justify-between items-start">
                 <h1 className='text-xs font-black uppercase bg-black text-white px-2 py-1'>Title</h1>
                 <button onClick={() => deleteTask(idx)} className="text-black font-bold hover:text-red-800">✕</button>
              </div>
              <h2 className='text-4xl font-black mb-4 mt-2 break-words leading-none uppercase'>{elem.title}</h2>
              
              <h1 className='text-xs font-black uppercase bg-black text-white px-2 py-1 w-fit'>Details</h1>
              <p className='text-black font-bold mt-2 text-lg leading-tight break-words flex-grow'>
                {elem.Details}
              </p>
            </div>
          )
        })
        // else clause
        : (
          <h2 className='text-white text-3xl font-black uppercase opacity-50 self-center'>No notes found</h2>
        )}
      </div>
    </div>
  )
}

export default App