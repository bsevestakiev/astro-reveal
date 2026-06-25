---
title: 'Reveal 1.7.0: Paginación del lado del servidor, líneas fijas y más'
description: >-
  Estamos emocionados de anunciar la última versión de Reveal, repleta de nuevas
  funciones potentes diseñadas para mejorar sus capacidades de análisis, al
  tiempo que lo mantenemos informado sobre cambios críticos de ruptura que
  pueden afectar sus aplicaciones.
date: '2024-09-30'
author: Casey Ciniello
cover: /images/2024/09/reveal-sept-2024-1.7-release-header.jpg
heroImage: /images/2024/10/reveal-new-release-1-7-header.svg
summary: >-
  Estamos emocionados de anunciar la última versión de Reveal, repleta de nuevas
  funciones potentes diseñadas para mejorar sus capacidades de análisis, al
  tiempo que lo mantenemos informado sobre cambios críticos de ruptura que
  pueden afectar sus aplicaciones.
categories:
  - Actualizaciones del producto
seo:
  title: >-
    Reveal 1.7.0: Paginación del lado del servidor, líneas fijas y más |
    Analítica integrada de Reveal
  description: >-
    Estamos emocionados de anunciar la última versión de Reveal, repleta de
    nuevas funciones potentes diseñadas para mejorar sus capacidades de
    análisis, al tiempo que lo mantenemos informado sobre cambios críticos de
    ruptura que pueden afectar sus aplicaciones.
  ogTitle: >-
    Reveal 1.7.0: Paginación del lado del servidor, líneas fijas y más |
    Analítica integrada de Reveal
  ogDescription: >-
    Estamos emocionados de anunciar la última versión de Reveal, repleta de
    nuevas funciones potentes diseñadas para mejorar sus capacidades de
    análisis, al tiempo que lo mantenemos informado sobre cambios críticos de
    ruptura que pueden afectar sus aplicaciones.
  ogType: article
  twitterTitle: >-
    Reveal 1.7.0: Paginación del lado del servidor, líneas fijas y más |
    Analítica integrada de Reveal
  twitterDescription: >-
    Estamos emocionados de anunciar la última versión de Reveal, repleta de
    nuevas funciones potentes diseñadas para mejorar sus capacidades de
    análisis, al tiempo que lo mantenemos informado sobre cambios críticos de
    ruptura que pueden afectar sus aplicaciones.
  ogImage: /images/2024/09/reveal-sept-2024-1.7-release-header.jpg
source_hash: 5526d06e
source_locale: en
---
## **Cambios disruptivos: Lo que necesita saber**

A medida que continuamos evolucionando y mejorando Reveal, hay algunos cambios disruptivos importantes que afectarán a plataformas específicas. Por favor, revise estos cambios detenidamente para garantizar una transición fluida y un rendimiento óptimo:

**Actualizaciones de Java y Spring Boot**

Spring Boot 2.x ya no es compatible. Para mantener la compatibilidad, deberá actualizar su aplicación para usar Spring Boot 3.x con JDK 17+ y un servidor compatible con Jakarta EE 9 para el alojamiento. Este cambio refleja nuestro compromiso de mantener altos estándares en compatibilidad y rendimiento, y de aprovechar los últimos frameworks y tecnologías para sus aplicaciones.

## **Nuevas características para todas las plataformas**

Este lanzamiento también presenta varias características nuevas y emocionantes en todas las plataformas, diseñadas para mejorar sus capacidades de visualización, gestión de datos y experiencia general en Reveal.

1. **Líneas fijas (Fixed Lines) (Beta):** Para una claridad mejorada en la presentación de datos, hemos introducido la función Fixed Lines (en beta) para gráficos de categorías. Con Fixed Lines, ahora puede marcar valores específicos en su gráfico, ya sea el más alto, el más bajo, el promedio o un valor personalizado, utilizando campos de datos o campos especializados predefinidos. Esto permite una mayor precisión al analizar sus visualizaciones. Para acceder a esta función, enabledBetaFeatures en $.ig.RevealSdkSettings.

![Fixed Lines in analytitcs dashboard](/images/2024/09/reveal-fixed-lines.png)

1. **Paginación del lado del servidor (Server-Side Paging):** Nunca fue más fácil gestionar grandes conjuntos de datos con Server-Side Paging. Ahora disponible sin necesidad de habilitar características beta, esta función admite paginación para una amplia gama de proveedores, incluidos SQL Server, MySQL, BigQuery, PostgreSQL, SyBase, Athena y Oracle. Sin embargo, tenga en cuenta que la paginación no está disponible cuando se utilizan [stored procedures](/blog/stored-procedures-embedded-analytics) o cuando el procesamiento de datos del lado del servidor está desactivado.

![Server-Side Paging in dashboard](/images/2024/09/reveal-server-side-paging.png)

1. **Filtros de comparación (Compare Filters) (Beta):** Obtenga información más profunda comparando datos filtrados directamente dentro de sus visualizaciones utilizando la nueva función Compare Filters (en beta). Disponible en múltiples tipos de gráficos, esta función le permite filtrar datos y comparar visualmente los resultados filtrados con los valores originales. Los tipos de gráficos admitidos incluyen Column, Bar, Line, Time Series, Area, Step Area, Spline, Stacked Charts, Funnel, Treemap y Gauges.

![Compare Filters in analytics dashboard](/images/2024/09/reveal-compare-filters.gif)

1. **Actualizaciones a nivel de visualización:** Hemos realizado varias actualizaciones importantes a nivel de visualización:

- Soporte para fechas en la API de visualización: Administre fácilmente filtros de fecha, como "Últimos 7 días", utilizando el objeto RVDateRange para verificar rangos de fechas.

- Descripciones de visualización: Ahora puede agregar descripciones detalladas a visualizaciones individuales, mejorando el contexto y la claridad de sus visualizaciones.

- Vinculación de paneles: Las visualizaciones ahora admiten vinculación automática de paneles, agilizando la navegación y la exploración de datos.

- Exportar a PDF: Ahora se puede exportar cada visualización a PDF a través de su desbordamiento (overflow).

Estas características son solo el comienzo. Para una lista completa de mejoras, nuevas capacidades y correcciones de errores, asegúrese de consultar las [Notas de la versión](https://help.revealbi.io/web/release-notes).

Pruebe Reveal GRATIS

Comience hoy mismo descargando nuestro SDK.

[DOWNLOAD](/download-sdk)
