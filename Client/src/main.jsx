import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Contextfun from './ContextApi.jsx'

export const server = `http://localhost:5000/api`;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Contextfun>
      <App />
    </Contextfun>
  </React.StrictMode>,
)


