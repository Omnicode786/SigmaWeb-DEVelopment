import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import for redirection



const Login = () => {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('')
const navigate = useNavigate();
const [user, setUser] = useState([])
const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/auth/login', {
        email,
        password
      });

      // 2. Check for success 
      if (response.status === 200) {
        console.log("Login Successful:", response.data);
        setUser(response.data.data.user)
        console.log(user)
        // 3. Optional: Save token if you're using JWT
        localStorage.setItem('token', response.data.data.token);

        // 4. Redirect to the Home page
      navigate('/')
      }
    } catch (err) {
      // Handle errors (wrong password, user not found, etc.)
      console.error("Login failed:", err.response?.data?.message || err.message);
      alert("Invalid credentials. Please try again.");
    }
  };



    return (
  <>
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050505] relative overflow-hidden ">
      {/* Background Decorative Blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]"></div>
<div 
       
        className="relative w-full max-w-md p-10 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl mx-4"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase">
            Welcome <span className="text-blue-500">Back</span>
          </h2>
          <p className="text-neutral-500 text-sm mt-2">Enter your details to continue streaming</p>
        </div>
<form onSubmit={submitHandler} className='space-y-6'>
 
    {/* email */}
    <div className='space-y-2'>
        <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest ml-1">Email Address</label>
       <input 
                onChange={(e) => setEmail(e.target.value)}
              type="email" 
              placeholder="name@example.com"
              className="w-full bg-neutral-900/50 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-blue-500/50 transition-all placeholder:text-neutral-600"
            />
    </div>
   {/* password */}
  
   <div className='space-y-2'>
        <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest ml-1">Password</label>
       <input 
              onChange={(e) => setPassword(e.target.value)}
              type="password" 
              placeholder="******"
              className="w-full bg-neutral-900/50 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-blue-500/50 transition-all placeholder:text-neutral-600"
            />
    </div>

    {/* button */}
{/* Login Button */}
          <button  type='submit' className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98] mt-4">
            Sign In
          </button>

{/* create account */}{/* Footer */}
      <div className="mt-8 text-center text-sm">
  <span className="text-neutral-500">New to the platform? </span>
  <Link 
    to="/register" 
    className="text-blue-400 font-bold hover:underline underline-offset-4 transition-all"
  >
    Create Account
  </Link>
</div>
</form>
      
    </div>

      
    </div>
  

  </>
  )
}

export default Login
