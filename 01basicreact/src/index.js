import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

//react create it's own DOM (virtual DOM)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App /> 
    {/* jsx */}
  </React.StrictMode>
);
