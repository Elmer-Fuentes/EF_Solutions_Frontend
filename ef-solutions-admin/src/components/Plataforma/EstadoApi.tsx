import { useState } from 'react'
import { consultarEstadoPlataforma } from '../../services/estadoPlataforma'

type Consulta =
  | { fase: 'inicial' | 'cargando' | 'error' }
  | { fase: 'listo'; mensaje: string }

/** Autor: Elmer Fuentes. Permite consultar y mostrar el estado de la API. */
export function EstadoApi() {
  const [consulta, setConsulta] = useState<Consulta>({ fase: 'inicial' })

  /** Autor: Elmer Fuentes. Actualiza el resultado mediante consultarEstadoPlataforma. */
  async function actualizar() {
    setConsulta({ fase: 'cargando' })
    try {
      const { sistema, estado } = await consultarEstadoPlataforma()
      setConsulta({ fase: 'listo', mensaje: `${sistema}: ${estado}` })
    } catch {
      setConsulta({ fase: 'error' })
    }
  }

  return (
    <section id="estado-api" aria-labelledby="titulo-estado" className="mt-4">
      <h2 id="titulo-estado" className="h4">Estado de la API</h2>
      <button type="button" className="btn btn-primary" disabled={consulta.fase === 'cargando'} onClick={actualizar}>
        Consultar estado
      </button>
      <p className="mt-3" role="status">
        {consulta.fase === 'cargando' && 'Consultando…'}
        {consulta.fase === 'listo' && consulta.mensaje}
        {consulta.fase === 'error' && 'La API no pudo responder. Puedes volver a intentar.'}
      </p>
    </section>
  )
}
