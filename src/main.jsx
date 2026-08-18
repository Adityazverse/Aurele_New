/* Remove StrictMode to prevent double-mount issues with Lenis/GSAP in dev */
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <App />
)
