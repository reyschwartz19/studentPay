import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import PayScreen from './pages/PayScreen.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PayScreen />
  </StrictMode>,
)
