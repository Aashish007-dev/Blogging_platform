import React, { useState } from 'react'

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg'>
        <div className='flex flex-col items-center justify-center'>
            <div className='w-full py-6 text-center'>
              <h1 className='text-3xl font-bold mb-6'><span className='text-primary'>Admin</span> Login</h1>
              <p className='font-light'>Enter your credentials to access the admin panel</p>
            </div>
            <form 
            className='mt-6 w-full sm:max-w-md text-gray-600'
            onSubmit={handleSubmit}>
              <div className='flex flex-col'>
                <label>Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} className='border-b-2 border-gray-300 p-2 outline-none mb-6' type="email" id="email" placeholder='Enter your email' required/>
              </div>
              <div className='flex flex-col'>
                <label>Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} className='border-b-2 border-gray-300 p-2 outline-none mb-6' type="password" id="password" placeholder='Enter your password' required/>
              </div>
              <button type="submit" className='w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all'>Login</button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Login