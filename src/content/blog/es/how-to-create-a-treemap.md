---
title: Cómo crear una visualización de gráfico de treemap en Reveal
description: >-
  Mejores prácticas para gráficos de treemap: Aprende a crear visualizaciones de
  datos de gráficos de treemap usando Reveal Embedded BI & Analytics.
date: '2020-06-16'
author: Casey Ciniello
cover: /images/2020/10/business_2D00_intelligence_2D00_reveal_2D00_treemap.jpg
summary: >-
  Un gráfico de treemap está diseñado para escenarios de profundización
  (drill-down). Muestra el peso relativo de los puntos de datos en más de un
  nivel, permitiendo a los usuarios profundizar continuamente en el conjunto de
  datos representado por rectángulos más pequeños para un análisis más
  eficiente.
categories:
  - Analítica integrada
seo:
  title: Cómo crear una visualización de gráfico de treemap en Reveal
  description: >-
    Mejores prácticas para gráficos de treemap: Aprende a crear visualizaciones
    de datos de gráficos de treemap usando Reveal Embedded BI & Analytics.
  ogTitle: Cómo crear una visualización de gráfico de treemap en Reveal
  ogDescription: >-
    Mejores prácticas para gráficos de treemap: Aprende a crear visualizaciones
    de datos de gráficos de treemap usando Reveal Embedded BI & Analytics.
  ogType: article
  twitterTitle: Cómo crear una visualización de gráfico de treemap en Reveal
  twitterDescription: >-
    Mejores prácticas para gráficos de treemap: Aprende a crear visualizaciones
    de datos de gráficos de treemap usando Reveal Embedded BI & Analytics.
  ogImage: /images/2020/10/business_2D00_intelligence_2D00_reveal_2D00_treemap.jpg
source_hash: ccd087e1
source_locale: en
---
Un gráfico Treemap es una visualización de datos que muestra datos jerárquicos utilizando nodos anidados (rectángulos) de tamaños y colores variables, lo que facilita la detección de patrones de datos o la comparación de cantidades de datos.

Aunque un Treemap a veces se clasifica como una visualización de "distribución", yo lo veo más a menudo referido como una visualización de "parte a todo", que muestra categorías (partes) de un conjunto de datos que suman un valor total (todo).

Las categorías se muestran en proporción a otras categorías basándose en su porcentaje de valor respecto al valor total que se está analizando.

A diferencia de la visualización de parte a todo, posiblemente la más popular, el gráfico circular (Pie Chart), un gráfico Treemap está diseñado para escenarios de profundización (drill-down). Muestra el peso relativo de los puntos de datos en más de un nivel (representado como un rectángulo), lo que le permite profundizar continuamente en el conjunto de datos que está representado por rectángulos más pequeños para un análisis más eficiente.

Al mismo tiempo, los Treemaps no están diseñados para transmitir cantidades numéricas; la intención es mostrar el ranking relativo y las diferencias relativas en los valores del conjunto de datos.

[Ver Reveal en acción](/request-demo)

## Treemap Escuarificado

Originalmente diseñado para visualizar archivos en un disco duro, los Treemaps se han aplicado a una amplia variedad de dominios que van desde el análisis financiero hasta la elaboración de informes deportivos (*Ordered Treemap Layouts*, Ben Shneiderman, Martin Wattenberg, [http://www.cs.umd.edu/hcil/treemap-history/](http://www.cs.umd.edu/hcil/treemap-history/)). Para representar datos en una estructura Treemap, hay varios algoritmos para elegir, como Squarified, Slice and Dice y Stripped, siendo el más común el algoritmo Treemap Escuarificado. Reveal utiliza el algoritmo Treemap Escuarificado, que funciona bien en todos los tamaños de pantalla (escritorio, web, móvil) y dispositivos con una baja relación de aspecto.

Aquí hay un ejemplo de un Treemap Escuarificado en Reveal, que muestra las tiendas McDonald's por tipo.

![Usando un Treemap](/images/2020/10/treemap_2D00_mcdonalds.gif)

En este ejemplo, el Treemap muestra un desglose del número (conteo) de tipos de tiendas McDonald's (Independiente, Gasolinera, Centro Comercial, etc.) por Estado. Con [analítica integrada de Reveal](/embedded-analytics), puedes obtener más información en la información sobre herramientas (tooltip) para cada categoría, como Conteo por Estado, y puedes profundizar (drilldown) en cada Categoría Treemap (el Nombre del Estado) para obtener un análisis rápido de los resúmenes a nivel estatal. El número de profundizaciones solo está limitado por tus datos; por ejemplo, si agregáramos una jerarquía Treemap adicional para Ciudad o Condado, podríamos hacer un análisis y profundización adicionales.

## Mejores Prácticas para Usar una Visualización de Gráfico Treemap

Como cualquier otra visualización de datos, una visualización de gráfico Treemap debe usarse en escenarios específicos. No resuelve el mismo problema que una visualización como un gráfico de barras (Bar Chart) o un gráfico de líneas (Line Chart). Está realmente destinado a una visualización de datos más compleja y rica.

### Cuándo usar un Gráfico Treemap

- Datos jerárquicos de profundización (datos organizados como un árbol, con ramas y subramas)
- Ilustrar jerarquías de peso relativo y valores comparativos entre categorías (ramas) y subcategorías (subramas)
- Mostrar grandes conjuntos de datos que necesitan una visualización compacta y eficiente en el espacio
- Cuando deseas ofrecer un análisis de datos rápido y de un vistazo sin valores precisos. El tamaño relativo de los rectángulos ayuda a identificar patrones y/o valores atípicos muy rápidamente
- Para hacer un uso eficiente del espacio. Los Treemaps pueden mostrar legiblemente miles de elementos en la pantalla simultáneamente

### Cuándo no usar un Gráfico Treemap

- Si estás contando una historia de datos que requiere valores precisos
- Si tienes valores de datos negativos
- Si tienes datos planos y no jerárquicos (aunque todavía está bien usar un Treemap sin profundización, puede que no sea la [visualización de datos](/blog/how-to-create-a-population-pyramid-chart) más adecuada para tu historia de datos)
- Si tus datos son de tamaño similar, es decir, si el usuario verá rectángulos del mismo tamaño, esto va en contra de las mejores prácticas de Treemap enumeradas anteriormente

## Ejemplos de Datos utilizados con una Visualización Treemap

Los Treemaps son mejores para conjuntos de datos más grandes, con un valor cuantitativo altamente variable que debe mostrarse de manera compacta y eficiente en el espacio. Los escenarios de datos para un Treemap pueden incluir:

- Resultados electorales por Condado o el número de votos por Partido por Condado
- Ventas de productos por Categoría, Subcategoría por País
- Cuotas de mercado de productos por Tecnología / Regiones / etc
- Exportaciones de Categoría de Productos por País
- Ventas por División por Producto

## Uso del Gráfico Treemap en Reveal

Para saber más sobre el Gráfico Treemap de Reveal, prueba estos excelentes recursos:

- Video – [Crear una Visualización Treemap](https://youtu.be/mY8iTyy7m-U)
- Docs – [Usar el Treemap de Reveal](https://help.revealbi.io)

Para empezar con tu primer Treemap en Reveal, ve a [https://app.revealbi.io,](https://app.revealbi.io) y ¡regístrate para una prueba gratuita!

¿Hay alguna visualización que te gustaría que no esté en Reveal? ¡Envíame un correo electrónico a [casey@revrealbi.io](mailto:casey@revrealbi.io) y házmelo saber!

¡Gracias!

Casey

Gráficos para Cada Ocasión

Comprende información compleja rápidamente para tomar decisiones comerciales más inteligentes.

[RESERVAR UNA DEMO](/request-demo)
