'use client'

import { useState } from 'react'
import { login } from './actions'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function LoginForm() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)

    toast('Logging In...', {
      theme: 'dark',
      transition: Bounce,
    })

    const result = await login(formData)

    if (result.success) {
      toast.success('Login Successful!', {
        theme: 'dark',
        transition: Bounce,
      })

      // Optional: delay for user feedback
      setTimeout(() => {
        window.location.href = '/'
      }, 1000)
    } else {
      toast.error(`Login Failed: ${result.message}`, {
        theme: 'dark',
        transition: Bounce,
      })
    }

    setLoading(false)
  }

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center gap-7'>
      <ToastContainer />
      <div className='text-white'>
        <h1>For testing purposes only !!!</h1>
        <h2>Email: test@gmail.com</h2>
        <h2>Password: Test@1234</h2>
      </div>
      <h1 className='text-white text-3xl w-[40%]'>Login</h1>
      <form onSubmit={handleSubmit} className='text-white flex flex-col gap-3 w-[40%]'>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" className='border border-white p-3 focus:outline-none focus:bg-transparent' required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" className='border focus:outline-none border-white p-3 focus:bg-transparent' required />
        <button type="submit" disabled={loading} className='py-3 bg-white text-black hover:cursor-pointer w-full transition-colors border border-transparent duration-300 hover:text-white hover:bg-transparent hover:border hover:border-white text-center mt-7'>
          {loading ? 'Logging in...' : 'Log in'}
        </button>
      </form>
    </div>
  )
}

// import { login } from './actions'
// import { createClient } from '../../utils/supabase/server'
// import { redirect } from 'next/navigation'
// import { ToastContainer } from 'react-toastify'

// export default async function LoginPage() {

//     const supabase = await createClient()
    
//     const { data } = await supabase.auth.getUser()
    
//       if (data?.user) {
//         console.log(JSON.stringify(data))
//         redirect('/')
//       }

//   return (
//     <div className='w-full h-screen flex flex-col justify-center items-center gap-7'>
//       <ToastContainer />
//       <h1 className='text-white text-3xl w-[40%]'>Login</h1>
//       <form className='text-white flex flex-col gap-3 w-[40%]'>
//       <label htmlFor="email">Email:</label>
//       <input id="email" name="email" type="email" className='border border-white p-3 focus:outline-none' required />
//       <label htmlFor="password">Password:</label>
//       <input id="password" name="password" type="password" className='border border-white p-3 focus:outline-none' required />
//       <button formAction={login} className='bg-white text-black hover:cursor-pointer w-full transition-colors border border-transparent duration-300 hover:text-white hover:bg-transparent hover:border hover:border-white text-center mt-7 py-3'>Log in</button>
//       {/* <button formAction={signup} className='bg-white text-black hover:cursor-pointer'>Sign up</button> */}
//     </form>
//     </div>
//   )
// }