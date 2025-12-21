import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios";

function App() {

  //const [products, error, loading] = customReactQuery('/api/products');
  const [products, setProducts] = useState([])
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');



  //we can't use async in the hooks, use IIFE
  useEffect(() => {
    const controller = new AbortController()    //cancel unnecessary request
    ;(async () => { 
      try {
        setLoading(true)
        setError(false);        //introduced edge cases
        const response = await axios.get('/api/products?search=' +search, {
          signal: controller.signal   //cancel unnecessary request but send in the catch (make packets inside controller of all the query)
        })
        console.log(response.data)
        setProducts(response.data)
        setLoading(false)
        
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request cancelled:', error.message);
          return
        }
        setError(true)
        setLoading(false)
      }
    })()
    //Cleanup 
    return () => {
      controller.abort()    //To avoid race condition
    }
  }, [search])

  // if (error) {
  //   return <h1>Something went wrong</h1>
  // }

  // if (loading) {
  //   return <h1>Loading...</h1>
  // }
  

  return (
    <>
    <h1>Hello React! | API Handling</h1>
    <input type="text" placeholder='Search'
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    {/* we can use like this also */}
    {loading && (<h1>Loading...</h1> )}
    {error && (<h1>Something went wrong</h1>) }
    <h1>Number of products: {products.length}</h1>
    </>
  )
}

export default App

// const customReactQuery = (urlPath) => {
//   const [products, setProducts] = useState([])
//   const [error, setError] = useState(false);
//   const [loading, setLoading] = useState(false);


//   //we can't use async in the hooks, use IIFE
//   useEffect(() => {
//     ;(async () => { 
//       try {
//         setLoading(true)
//         setError(false);        //introduced edge cases
//         const response = await axios.get(urlPath)
//         console.log(response.data)
//         setProducts(response.data)
//         setLoading(false)
        
//       } catch (error) {
//         setError(true)
//         setLoading(false)
//       }
//     })()
//   }, [])
//   return [products, error, loading]       //return as an array
// }
