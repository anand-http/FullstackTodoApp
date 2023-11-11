import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Contextfun from './ContextApi.jsx'

export const server = `https://todoapp-utx2.onrender.com/api`;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Contextfun>
      <App />
    </Contextfun>
  </React.StrictMode>,
)


