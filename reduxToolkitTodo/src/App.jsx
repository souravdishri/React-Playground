import './App.css'
import AddTodo from './components/AddTodo'
import Todos from './components/Todos'

function App() {
  
  return (
    <>
      <h1 className='text-white text-center my-3 rounded-xl text-xl'>Hello React! | Redux Toolkit</h1>
      <AddTodo />
      <Todos />
    </>
  )
}

export default App