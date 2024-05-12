
import './App.css'

function App() {
  //console.log(process.env.REACT_APP_APPWRITE_URL);    //For core REACT

  console.log(import.meta.env.VITE_APP_APPWRITE_URL);   //For VITE  

  return (
    <>
<h1>Blog app with Appwrite</h1>
    </>
  )
}

export default App
