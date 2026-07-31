import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./styles/globals.css"

import studio from './libs/theatre.js'
import extension from '@theatre/r3f/dist/extension'

if (import.meta.env.DEV) {
  if (studio && typeof studio.initialize === 'function') {
    studio.initialize()
    studio.extend(extension)
  }
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)