// React imports for strict mode and DOM rendering
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Global styles
import './index.css'
// Main application component
import App from './App.jsx'

// Create root element and render the application
// StrictMode helps identify potential problems in development
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
