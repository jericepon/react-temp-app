import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Modal from './components/Modal.tsx'
import { RouterProvider } from 'react-router'
import router from './router/index.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Modal.Provider>
      <RouterProvider router={router} />
    </Modal.Provider>
  </StrictMode>,
)
