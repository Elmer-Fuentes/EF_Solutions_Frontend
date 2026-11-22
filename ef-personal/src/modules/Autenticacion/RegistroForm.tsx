import { useState, type FormEvent } from 'react'
import { registrar } from '../../services/Autenticacion/registro'

/** Autor: Elmer Fuentes. Registra una identidad y muestra su espacio personal. */
export function RegistroForm() {
  const [ocupado, setOcupado] = useState(false)
  const [error, setError] = useState('')
  const [espacio, setEspacio] = useState('')

  /** Autor: Elmer Fuentes. Envía los datos a registrar y borra la clave al completar el alta. */
  async function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    if (ocupado) return
    const formulario = evento.currentTarget
    const datos = new FormData(formulario)
    setOcupado(true)
    setError('')
    try {
      const id = await registrar({
        nombre: String(datos.get('nombre') ?? ''),
        correo: String(datos.get('correo') ?? ''),
        clave: String(datos.get('clave') ?? ''),
      })
      formulario.reset()
      setEspacio(id)
    } catch (causa) {
      setError(causa instanceof TypeError || !(causa instanceof Error)
        ? 'El registro no está disponible ahora.'
        : causa.message)
    } finally {
      setOcupado(false)
    }
  }

  if (espacio) {
    return <p role="status" className="alert alert-success">Cuenta creada. Tu espacio personal es el {espacio}.</p>
  }

  return (
    <section aria-labelledby="titulo-registro">
      <h2 id="titulo-registro" className="h4">Crea tu cuenta</h2>
      <form onSubmit={enviar}>
        <fieldset disabled={ocupado} className="d-grid gap-3">
          <div>
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input id="nombre" name="nombre" className="form-control" autoComplete="name" maxLength={160} required />
          </div>
          <div>
            <label htmlFor="correo" className="form-label">Correo electrónico</label>
            <input id="correo" name="correo" type="email" className="form-control" autoComplete="email" maxLength={254} required />
          </div>
          <div>
            <label htmlFor="clave" className="form-label">Contraseña</label>
            <input id="clave" name="clave" type="password" className="form-control" autoComplete="new-password"
              aria-describedby="requisito-clave" minLength={12} maxLength={128} required />
            <p id="requisito-clave" className="form-text mb-0">Usa al menos 12 caracteres.</p>
          </div>
          <button className="btn btn-primary" type="submit">
            {ocupado ? 'Creando cuenta…' : 'Crear cuenta'}
          </button>
        </fieldset>
        {error && <p role="alert" className="alert alert-danger mt-3">{error}</p>}
      </form>
    </section>
  )
}
