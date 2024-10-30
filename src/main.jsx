import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Formulaire from './component/formulaire.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Formulaire/>
  </StrictMode>,
)
