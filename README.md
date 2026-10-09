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
- **Iconos**: [FontAwesome 6](https://fontawesome.com/)
- **Despliegue**: GitHub Pages a través de GitHub Actions (.github/workflows/astro.yml).

## 📊 Analítica

La web usa [GoatCounter](https://www.goatcounter.com/) para saber qué secciones y proyectos se visitan. Es una analítica ligera y sin cookies, por lo que no requiere banner de consentimiento.

- El script solo se inyecta si la variable `PUBLIC_GOATCOUNTER_CODE` está definida (ver `src/layouts/Layout.astro`). Sin ella, el sitio no carga nada de terceros por analítica.
- Las visitas a cada página se cuentan automáticamente. Los clics en el menú (`section-*`) y en los enlaces de proyectos (`project-*-web` / `project-*-code`) se registran como eventos mediante el atributo `data-goatcounter-click`.

**Pasos para activarla (autor):**

1. Crear una cuenta en [goatcounter.com](https://www.goatcounter.com/) y elegir un código (por ejemplo `dpatrongomez`). La analítica quedará en `https://<código>.goatcounter.com`.
2. En GitHub, ir a *Settings → Secrets and variables → Actions → Variables* y crear una **variable de repositorio** llamada `PUBLIC_GOATCOUNTER_CODE` con ese código. No es un secreto: el código es público en el HTML. El workflow `.github/workflows/astro.yml` la pasa al build de Astro.
3. Para probarlo en local, crear un archivo `.env` en la raíz (ignorado por git) con:

   ```text
   PUBLIC_GOATCOUNTER_CODE=<código>
   ```

4. Ejecutar `pnpm run build` (o `pnpm run dev`) y comprobar en el panel de GoatCounter que llegan visitas.

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
