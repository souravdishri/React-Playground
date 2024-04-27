import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from "./components/Card.jsx";

function App() {
  const [count, setCount] = useState(0)
  let myObj = {
    username: "sourav",
    age: 25
  }
  let newArr = [1, 2, 3]

  return (
    <>
      <h1 className='bg-green-400 text-black p-4 rounded-xl mb-4'>Hello React! | Tailwind</h1>

      {/* <Card username="Hello React!" obj={myobj}/> //this will work */}
      {/* <Card username="Hello React!" obj={newArr}/> //this will work */}

      <Card username="Hello React!" btnText="click me" />
      <Card username="sourav" />

    </>
  )
}

export default App
