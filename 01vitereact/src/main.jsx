import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

//react create it's own DOM (virtual DOM)
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    {/* jsx */}
  </React.StrictMode>,
)
