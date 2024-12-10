import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./output.css";
import "./pages/styles/Login.css";
import "./pages/styles/signup.css";
import "./pages/styles/tourstGroup.css";
import "./pages/styles/myPackeges.css"
import "./pages/styles/myEvents.css"
import "./pages/styles/Lanch.css"
import "./pages/styles/Report.css"
import "./pages/styles/CreateGroup.css"
import "./pages/styles/TourGuideSign.css"
import "./pages/styles/TourOperatorSign.css"

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
