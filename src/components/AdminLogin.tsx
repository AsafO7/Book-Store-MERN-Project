import { SubmitHandler, FieldValues, useForm } from "react-hook-form"
import { useState } from "react"

import axios from "axios"
import getBaseURL from "../utils/baseURL"
import { useNavigate } from "react-router-dom"

const AdminLogin = () => {
  const [message, setMessage] = useState("")
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await axios.post(`${getBaseURL()}/api/auth/admin`, data, {
        headers: {
          "Content-Type": 'application/json'
        }
      })
      const auth = res.data
      if(auth.token) {
        localStorage.setItem('token', auth.token)
        setTimeout(() => {
          localStorage.removeItem('token')
          alert('Token has expired! Please login')
          navigate('/')
        },3600 * 1000)
      }
      alert('Admin login successful')
      navigate('/dashboard')
      
    } catch (error) {
        setMessage("Please provide a valid email and password") 
        console.error(error)
    }
  }

  return (
    <div className='h-[calc(100vh-200px)] flex justify-center items-center'>
      <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <h2 className='text-xl font-semibold mb-4'>Admin Dashboard Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="username">Username</label>
            <input 
            {...register("username", { required: true })} 
            type="text" name="username" id="username" placeholder='Username'
            className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password</label>
            <input 
            {...register("password", { required: true })} 
            type="password" name="password" id="password" placeholder='Password'
            className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
            />
          </div>
          {
            message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>
          }
          <div>
            <button className='bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none'>Login </button>
          </div>
        </form>

        <p className='mt-5 text-center text-gray-500 text-xs'>©2025 Book Store. All rights reserved.</p>
      </div>
    </div>
  )
}

export default AdminLogin