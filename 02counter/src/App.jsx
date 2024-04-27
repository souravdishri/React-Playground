import { useState } from 'react'
import './App.css'

function App() {

  //"setCounter" is a method which controls "counter" variable
  const [counter, setCounter]  = useState(15) //holds default values, it can be of anything

  //let counter = 15

  const addValue = () => {
    //counter = counter + 1
    //setCounter((prevCounter) => prevCounter + 1)    //Below prevCounter is the shortcut
    setCounter(prevCounter => prevCounter + 1)
    setCounter(prevCounter => prevCounter + 1 )
    setCounter(prevCounter => prevCounter + 1)
    setCounter(prevCounter => prevCounter + 1)
    
  }

  const removeValue = () => {
    setCounter(counter - 1)
  }
  
  return (
    <>
      <h1>Hello React! | counter</h1>
      <h2>Counter value: {counter}</h2>

      <button
      onClick={addValue}
      >Add value {counter}</button> 
      <br />
      <button
      onClick={removeValue}
      >remove value {counter}</button>
      <p>footer: {counter}</p>
    </>
  )
}

export default App