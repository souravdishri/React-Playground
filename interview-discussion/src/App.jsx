//Note: In react when there is "change in state" the "component will rerender".  

//If useState() default value and setValue() value are same then component will not rerender 
//but if we pass an object then it will rerender everytime because it's of data type. (It's take references of it)
//(Primitive, non-primitive data type)

//While using useEffect() in then dependency pass the [value.value], 1st value is the State and 2nd value is the object's key

import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {
  console.log("App rendered", Math.random());
  const [value, setValue] = useState({
    value: 0,
  })
  
  
  //const [multipliedValue, setMultipliedValue] = useState(1)
  //let multipliedValue = value * 5

  // const multiplybyfive = () => {
  //   //setMultipliedValue(value * 5)
  //   setValue(value + 1)
  // }

  const clickMe = () => {
    setValue({
      value: 0,
    })
  }


  
  

  return (
    <>
      <h1>Main value: {value.value} </h1>
      <button
      onClick={clickMe}
      >Click to multiply by 5</button>
      {/* <h2>Multiplied value: {multipliedValue} </h2> */}
    </>
  )
}

export default App