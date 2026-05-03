# PEC2 - Desarrollo de Aplicaciones Web

**Nombre:** Tomas  
**Fecha:** [Fecha de entrega]  
**Enlace a la web:** https://sabor-venezolano.netlify.app/  
**Enlace al repositorio:** https://github.com/tomasaar/pec1-gastronomia  

## 1. Formatos de imagen utilizados

En el proyecto, se han utilizado imágenes en formatos originales JPG y PNG. Para la optimización, se evaluaron los formatos WebP y AVIF, seleccionando el que ofrecía el menor tamaño de archivo para cada imagen. AVIF demostró ser superior en la mayoría de los casos, especialmente para imágenes PNG con áreas grandes de color uniforme, logrando reducciones de hasta el 97%. WebP se utilizó en algunos casos donde AVIF no ofrecía ventajas significativas.

## 2. Tabla de imágenes optimizadas

| Nombre de la imagen | Formato antiguo | Formato nuevo | Mejora obtenida |
|---------------------|-----------------|---------------|-----------------|
| arepa-destacada.jpg | jpg | avif | 38.31% |
| arepa-principal.png | png | avif | 97.17% |
| arepa-proceso-1.png | png | avif | 97.21% |
| arepa-proceso-2.png | png | avif | 96.89% |
| arepa-proceso-3.png | png | avif | 96.43% |
| cachapa.jpg | jpg | avif | 48.66% |
| hero.jpg | jpg | avif | 61.01% |
| pabellon-destacado.png | png | avif | 97.23% |
| pabellon-ingrediente-1.png | png | avif | 97.16% |
| pabellon-ingrediente-2.png | png | avif | 97.35% |
| pabellon-ingrediente-3.png | png | avif | 97.33% |
| tequenos.jpg | jpg | avif | 65.88% |

Análisis: La optimización con Sharp permitió reducir significativamente el tamaño de las imágenes, especialmente las PNG, que pasaron de tamaños de alrededor de 2MB a menos de 60KB en promedio. Esto mejora el rendimiento de carga de la web, reduciendo el tiempo de carga y el uso de ancho de banda. Los formatos modernos como AVIF ofrecen mejor compresión que WebP y JPG/PNG tradicionales.

## 3. Utilización de las técnicas de imagen responsive

Se implementaron varias técnicas de imágenes responsive:

- **srcset con widths**: Utilizado en la imagen hero de la portada y en las tarjetas de la página de categoría. Por ejemplo: `srcset="./assets/hero-480w.avif 480w, ./assets/hero-768w.avif 768w, ./assets/hero.avif 1024w"`. Esto permite al navegador seleccionar la imagen más apropiada según el ancho de la viewport.

- **Elemento <picture> con art direction**: Aplicado en las imágenes destacadas de las páginas de detalle (det1.html y det2.html). Se utiliza `media` para diferentes breakpoints, permitiendo mostrar versiones recortadas o enfocadas para dispositivos móviles y de escritorio.

- **Imágenes en galerías**: Las imágenes en las galerías de las páginas de detalle también usan srcset para adaptarse al tamaño de pantalla.

Estas técnicas aseguran que las imágenes se adapten al dispositivo, mejorando la experiencia de usuario y el rendimiento.

## 4. Animación de elementos en CSS

Se añadieron animaciones CSS para mejorar la interactividad:

- **Animación del SVG en el header**: El logo SVG rota continuamente con `animation: rotate 5s linear infinite;`. Esto añade un elemento dinámico al header sin afectar la accesibilidad.

- **Transiciones en enlaces**: Los enlaces del menú de navegación tienen `transition: color 0.3s ease;` para un cambio suave de color al pasar el mouse.

- **Animación en clip-path**: La imagen hero tiene un clip-path que cambia al hacer hover, creando un efecto de revelación.

Estas animaciones son sutiles y no distraen del contenido principal.

## 5. Uso de clip-path

Se aplicó clip-path a la imagen hero en la portada: `clip-path: polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%);`. Esto crea una forma trapezoidal que integra la imagen de manera creativa en el diseño. Al hacer hover, el clip-path cambia a un rectángulo completo, añadiendo interactividad.

## 6. Semántica y accesibilidad

El sitio cumple con las pautas WCAG 2.0 AA:

- **Alternativas textuales**: Todas las imágenes tienen atributos `alt` descriptivos.

- **Contraste de color**: Los colores utilizados cumplen con el ratio de contraste mínimo (por ejemplo, texto sobre fondo claro).

- **Enlaces de navegación**: Incluye "Saltar al contenido principal" para usuarios de teclado.

- **Estructura semántica**: Uso correcto de `<header>`, `<main>`, `<article>`, `<section>`, `<nav>`, `<footer>`.

- **Idioma**: `lang="es"` en el HTML.

- **Títulos de página**: Cada página tiene un título único y descriptivo.

- **Etiquetas de formulario**: Aunque no hay formularios complejos, los enlaces tienen `aria-label` cuando es necesario.

- **Validación**: El HTML es válido según el validador W3C.

El sitio es responsive y funciona correctamente en dispositivos móviles, tabletas y escritorio.