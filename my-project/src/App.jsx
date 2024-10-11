import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Users from './User'
import CreateUser from './CreateUser'
import UpdatUser from './UpdateUser'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
   <BrowserRouter>
   <Routes>
   <Route path='/' element={<Users/>}></Route>
   <Route path='/create' element={<CreateUser/>}></Route>
   <Route path='/update/:id' element={<UpdatUser/>}></Route>
   </Routes>
   </BrowserRouter>
   </div>
  )
}

export default App
