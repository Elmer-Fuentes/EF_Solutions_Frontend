import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

/** Autor: Elmer Fuentes. Presenta la pantalla inicial de EF Personal. */
function App() {
  return (
    <main className="container py-5">
      <h1 className="d-flex align-items-center gap-3">
        <i className="bi bi-wallet2" aria-hidden="true" />
        EF Personal
      </h1>
    </main>
  )
}

const root = document.getElementById('root')
if (!root) throw new Error('Falta el contenedor de la aplicación.')

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
