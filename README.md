# Frontend — espacio de trabajo independiente

**Autor:** Elmer Fuentes.

Workspace npm independiente del backend, preparado para React + TypeScript + Bootstrap + Bootstrap Icons:

- `ef-solutions-admin/`: administracion de la plataforma, tenants, permisos, entidades dinamicas, flujos, anuncios y licencias.
- `ef-personal/`: producto de finanzas y organizacion personal, con futuro proyecto `android/` de Capacitor.
- `ef-public-web/`: web comercial publica y publicaciones administrables.

**Estado:** carpetas y manifiestos iniciales; aun no hay una aplicacion React ejecutable. Codex creara codigo por modulo sin mezclar proyectos. Cada cliente consume la API de `Backend/EF.Solutions.Web` y nunca conecta directamente a MySQL ni almacena secretos.
