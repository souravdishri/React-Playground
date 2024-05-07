import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className="text-black text-center my-3 rounded-xl text-xl bg-green-400 ">
        Hello React! | React Router
      </h1>
    </>
  )
}

export default App
