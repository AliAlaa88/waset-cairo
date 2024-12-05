import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./output.css";
import "./pages/styles/Login.css";
import "./pages/styles/signup.css";
import "./pages/styles/tourstGroup.css";

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
