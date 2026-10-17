# dpatrongomez.github.io

Web personal y portfolio profesional de **Daniel Patrón Gómez**, desarrollada con **[Astro](https://astro.build/)**.

## 🚀 Comandos

Todos los comandos se ejecutan desde la raíz del proyecto:

| Comando | Acción |
| :--- | :--- |
| `pnpm install` | Instala las dependencias del proyecto |
| `pnpm run dev` | Inicia el servidor de desarrollo local en `http://localhost:4321` |
| `pnpm run build` | Compila el sitio web estático en el directorio `./dist` |
| `pnpm run preview` | Previsualiza la versión de producción localmente |
| `pnpm run astro` | Ejecuta comandos CLI de Astro como `astro check` |

## 🛠️ Tecnologías

- **Framework**: [Astro](https://astro.build/)
- **Estilos**: Vanilla CSS con variables de diseño moderno, responsive y glassmorphism.
- **Iconos**: [astro-icon](https://www.astroicon.dev/) con sets de Iconify (Font Awesome 6 y Devicon) autoalojados en el build; solo se incluyen los iconos listados en `astro.config.mjs`
- **Fuentes**: Inter, Space Grotesk y Space Mono autoalojadas con [@fontsource](https://fontsource.org/)
- **Despliegue**: GitHub Pages a través de GitHub Actions (.github/workflows/astro.yml).

## 📄 Estructura del Proyecto

```text
/
├── public/
│   └── assets/images/    # Imágenes estáticas
├── src/
│   ├── components/       # Componentes de las secciones de la web
│   ├── layouts/          # Plantilla principal HTML5 y meta tags SEO
│   ├── pages/            # Páginas del sitio (index.astro)
│   └── styles/           # Estilos CSS globales y variables
├── astro.config.mjs
└── package.json
```
