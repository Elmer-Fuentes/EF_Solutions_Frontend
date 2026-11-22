# Frontend — espacio de trabajo independiente

**Autor:** Elmer Fuentes.

Workspace npm independiente del backend, preparado para React + TypeScript + Bootstrap + Bootstrap Icons:

- `ef-solutions-admin/`: administracion de la plataforma, tenants, permisos, entidades dinamicas, flujos, anuncios y licencias.
- `ef-personal/`: producto de finanzas y organizacion personal, con futuro proyecto `android/` de Capacitor.
- `ef-public-web/`: web comercial publica y publicaciones administrables.

Cada aplicación tiene una pantalla inicial en React y un puerto local propio. Admin puede consultar el estado de la API de desarrollo.

## Desarrollo local

Desde la raíz de `Frontend/`, instala las versiones del lockfile con los scripts de instalación deshabilitados:

```powershell
npm.cmd ci --ignore-scripts
```

Abre una terminal por aplicación y ejecuta el comando correspondiente desde `Frontend/`.

| Aplicación | Comando | URL |
| --- | --- | --- |
| Admin | `npm.cmd run dev` | http://127.0.0.1:5173 |
| EF Personal | `npm.cmd run dev --workspace=ef-personal` | http://127.0.0.1:5174 |
| Web Pública | `npm.cmd run dev --workspace=ef-public-web` | http://127.0.0.1:5175 |

Para comprobar TypeScript y compilar las tres apps, usa `npm.cmd run build`. Para consultar vulnerabilidades conocidas del lockfile, usa `npm.cmd audit`.

Con la API en el puerto 5257, abre Admin, selecciona **Estado de la API** y pulsa **Consultar estado**. Vite reenvía la ruta al backend durante el desarrollo.

En **EF Personal**, completa **Crea tu cuenta** para registrar tu identidad y tu espacio en DEV. Usa el Backend de la rama `feature/s02-identidad-local` con los scripts de registro aplicados. Si arrancas esa API en otro puerto, define `EF_PERSONAL_DEV_API` con su URL local antes de ejecutar Vite.
