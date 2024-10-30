import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// import MonFormulaire from './component/Formulaire.jsx'
import Form from './Form.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Form/>
    {/* <MonFormulaire/> */}
  </StrictMode>,
)
