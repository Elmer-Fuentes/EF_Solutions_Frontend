interface EstadoPlataforma {
  sistema: string
  estado: string
}

/**
 * Autor: Elmer Fuentes. Consulta el estado público de la API.
 * @returns Nombre y estado informados por EstadoController.Obtener().
 * @throws Si la API falla o devuelve una respuesta inesperada.
 */
export async function consultarEstadoPlataforma(): Promise<EstadoPlataforma> {
  const respuesta = await fetch('/api/v1/plataforma/estado', {
    headers: { Accept: 'application/json' },
  })
  if (!respuesta.ok) throw new Error('No se pudo consultar el estado.')

  const datos: unknown = await respuesta.json()
  if (
    typeof datos !== 'object' ||
    datos === null ||
    !('sistema' in datos) ||
    typeof datos.sistema !== 'string' ||
    !('estado' in datos) ||
    typeof datos.estado !== 'string'
  ) {
    throw new Error('La API devolvió un estado inesperado.')
  }

  return { sistema: datos.sistema, estado: datos.estado }
}
