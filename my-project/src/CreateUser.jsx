import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function CreateUser() {
    const [name,setName] = useState()
    const [email, setEmail] =useState()
    const [age , setAge] =useState()
    const navigate =useNavigate()

    const  submit =(e) =>{
        e.preventDefault();
        axios.post("http://localhost:3000/createuser",{name,email,age})
         .then(result=>console.log(result))
         .catch(err=>console.log(err))
         navigate('/')
    }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <form className="bg-white p-6 rounded-lg shadow-md w-96" onSubmit={submit}>

        <h2 className="text-lg font-bold mb-4">User Information</h2>
        <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input 
                type="text" 
                id="name" 
                name="name" 
                className="mt-1 p-2 border border-gray-300 rounded w-full" 
                required 
                onChange={(e)=> setName(e.target.value)}
            />
        </div>
        <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input 
                type="email" 
                id="email" 
                name="email" 
                className="mt-1 p-2 border border-gray-300 rounded w-full" 
                required 
                onChange={(e)=> setEmail(e.target.value)}
            />
        </div>
        <div className="mb-4">
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
            <input 
                type="number" 
                id="age" 
                name="age" 
                className="mt-1 p-2 border border-gray-300 rounded w-full" 
                required 
                onChange={(e)=> setAge(e.target.value)}
            />
        </div>
        <button 
            type="submit" 
            className="w-full bg-blue-500 text-white rounded py-2 hover:bg-blue-600 transition duration-300"
        >
            Submit
        </button>
    </form>
</div>
  )
}

export default CreateUser;