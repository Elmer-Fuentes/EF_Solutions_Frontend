// Autor: Elmer Fuentes. Verifica el contrato HTTP consumido por Admin.
import assert from 'node:assert/strict'
import test from 'node:test'
import { consultarEstadoPlataforma } from '../src/services/estadoPlataforma.ts'

test('presenta el estado que devuelve la API', async ({ mock }) => {
  const estado = { sistema: 'EF Solutions', estado: 'disponible' }
  const fetch = mock.method(globalThis, 'fetch', async () => Response.json(estado))

  assert.deepEqual(await consultarEstadoPlataforma(), estado)
  assert.equal(fetch.mock.calls[0].arguments[0], '/api/v1/plataforma/estado')
})

test('rechaza una respuesta que incumple el contrato', async ({ mock }) => {
  mock.method(globalThis, 'fetch', async () => Response.json({ estado: true }))
  await assert.rejects(consultarEstadoPlataforma, /estado inesperado/)
})

test('rechaza un fallo HTTP para permitir reintentar', async ({ mock }) => {
  mock.method(globalThis, 'fetch', async () => new Response(null, { status: 503 }))
  await assert.rejects(consultarEstadoPlataforma, /No se pudo consultar/)
})
