interface SolicitudRegistro {
  nombre: string
  correo: string
  clave: string
}

/**
 * Autor: Elmer Fuentes. Envía el registro a RegistroController.RegistrarAsync.
 * @returns El identificador del espacio personal creado.
 * @throws Si la solicitud falla o la respuesta no contiene el identificador.
 */
export async function registrar(solicitud: SolicitudRegistro): Promise<string> {
  const respuesta = await fetch('/api/v1/autenticacion/registro', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(solicitud),
  })
  if (respuesta.status === 400) throw new Error('Revisa los datos del formulario.')
  if (respuesta.status === 409) throw new Error('No se pudo registrar ese correo.')
  if (respuesta.status === 429) throw new Error('Espera un minuto y vuelve a intentar.')
  if (respuesta.status !== 201) throw new Error('El registro no está disponible ahora.')

  const datos: unknown = await respuesta.json()
  if (typeof datos !== 'object' || datos === null || !('tenantId' in datos) ||
      typeof datos.tenantId !== 'string' || !/^\d+$/.test(datos.tenantId)) {
    throw new Error('No se pudo confirmar el espacio creado.')
  }
  return datos.tenantId
}
