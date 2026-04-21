# EcoPanel

Calculadora energética web orientada a centros educativos, diseñada para analizar el consumo de recursos de un instituto tecnológico y simular un plan de reducción sostenible a 3 años.

Este proyecto combina desarrollo front-end, visualización de datos y una lógica de proyección enfocada en sostenibilidad, eficiencia operativa y comunicación clara de resultados.

## Autores

- Daniel Roblas
- Adam Rkaini

## Qué hace este proyecto

EcoPanel permite introducir datos reales de consumo del centro y generar una proyección de:

- Consumo eléctrico del próximo año
- Consumo eléctrico en un periodo personalizado
- Consumo de agua del próximo año
- Consumo de agua en un periodo personalizado
- Consumo de consumibles de oficina del próximo año
- Consumo de consumibles en un periodo personalizado
- Consumo de productos de limpieza del próximo año
- Consumo de productos de limpieza en un periodo personalizado

Además, incorpora:

- Estacionalidad por tipo de recurso
- Variabilidad operativa configurable
- Selección de meses lectivos activos
- Dashboard responsive con tarjetas y gráficas
- Simulación de ahorro aplicando un plan de mejora a 3 años
- Mensajes dinámicos para interpretar si se alcanza el objetivo del 30% de ahorro

## Enfoque del proyecto

La idea del proyecto es ir más allá de una calculadora básica. No solo muestra cifras, sino que transforma datos de entrada en una lectura visual y estratégica del consumo del centro.

Esto lo hace útil en dos contextos:

- Académico: demuestra organización del código, lógica de negocio, diseño responsive y uso de visualización de datos.
- Portfolio: presenta una solución digital con aplicación real en sostenibilidad y gestión de recursos.

## Características destacadas

- Interfaz moderna tipo dashboard
- HTML, CSS y JavaScript separados
- Gráficas con Chart.js
- Lógica modular en JavaScript
- Resultados interpretables, no solo numéricos
- Plan de reducción por fases:
  Año 1: acciones básicas
  Año 2: optimización
  Año 3: automatización y eficiencia máxima

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- Chart.js
- Google Fonts

## Estructura del proyecto

```text
index.html
project/
├── assets/
├── data/
│   └── fase-f3-resultats.json
├── f3.html
├── index.html
├── styles.css
└── script.js
README.md
```

## Cómo ejecutar el proyecto

Al ser una aplicación estática, no necesita instalación de dependencias.

1. Clona este repositorio.
2. Abre la carpeta del proyecto.
3. Ejecuta `project/index.html` en tu navegador.

Si prefieres levantarlo con un servidor local, puedes usar por ejemplo:

```bash
cd project
python3 -m http.server 8000
```

Después abre `http://localhost:8000`.

## Publicación de datos y fase F3

Para cumplir el requisito de publicar los datos generados por la aplicación en formato web, el proyecto incluye una página específica de resultados:

- `project/f3.html`: página pública con los resultados extraídos de la fase F3.
- `project/data/fase-f3-resultats.json`: archivo estructurado con los datos publicados.
- `project/assets/`: directorio reservado para recursos como imágenes u otros elementos visuales.

Si publicas el repositorio con GitHub Pages, la URL pública de la fase F3 quedará con esta estructura:

```text
https://TU-USUARIO.github.io/TU-REPOSITORIO/project/f3.html
```

De este modo, la web no solo muestra la calculadora interactiva, sino también una publicación web de resultados generados, separando claramente:

- HTML
- CSS
- lógica JavaScript
- datos publicados
- recursos estáticos

## Qué se evalúa o demuestra

Este proyecto refleja especialmente:

- Capacidad de modelar una lógica de cálculo con criterios realistas
- Diseño de interfaces claras y visualmente cuidadas
- Organización de un proyecto front-end sin frameworks
- Sensibilidad por temas de sostenibilidad y eficiencia
- Pensamiento orientado a producto: cálculo, interpretación y propuesta de mejora

## Posibles mejoras futuras

- Exportación de resultados a PDF
- Persistencia de datos con `localStorage`
- Comparación entre varios escenarios
- Integración con una API o base de datos real del centro
- Generación automática de informes ejecutivos

## Vista profesional del proyecto

Si has llegado aquí desde LinkedIn o GitHub, este proyecto representa una combinación de:

- Desarrollo front-end
- Visualización de datos
- UX enfocada en claridad
- Sostenibilidad aplicada a entornos educativos

La intención no era solo construir una web funcional, sino crear una herramienta que pudiera explicarse fácilmente a profesorado, alumnado o cualquier persona interesada en la reducción del consumo de recursos.
## Enlace de la página

- https://itb2526-danielroblas.github.io/Calculadora-Energetica/project/index.html


## Licencia

Este repositorio se comparte con fines académicos y de portfolio.
