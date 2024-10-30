import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import MonFormulaire from './component/Formulaire.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
    <MonFormulaire/>
  </StrictMode>,
)
