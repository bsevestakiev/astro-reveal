---
title: Soporte de MongoDB y más en Reveal 1.6.1. Lanzamiento
description: >-
  Reveal 1.6.1 ya está aquí, ¡y se trata de ti! Descubre una experiencia de
  usuario mejorada, exportaciones más fluidas y más en nuestro último
  lanzamiento.
date: '2023-10-31'
author: Casey Ciniello
cover: /images/2023/10/reveal-new-release-1-7-0-thumbnail.jpg
heroImage: /images/2023/10/reveal-new-release-1-7-0-header.svg
summary: >-
  El último lanzamiento de Reveal, 1.6.1, está aquí, repleto de mejoras basadas
  en tus comentarios.
categories:
  - Actualizaciones del producto
seo:
  title: Soporte de MongoDB y más en el lanzamiento de octubre de 2023
  description: >-
    Reveal 1.6.1 ya está aquí, ¡y se trata de ti! Descubre una experiencia de
    usuario mejorada, exportaciones más fluidas y más en nuestro último
    lanzamiento.
  ogTitle: Soporte de MongoDB y más en el lanzamiento de octubre de 2023
  ogDescription: >-
    Reveal 1.6.1 ya está aquí, ¡y se trata de ti! Descubre una experiencia de
    usuario mejorada, exportaciones más fluidas y más en nuestro último
    lanzamiento.
  ogType: article
  twitterTitle: Soporte de MongoDB y más en el lanzamiento de octubre de 2023
  twitterDescription: >-
    Reveal 1.6.1 ya está aquí, ¡y se trata de ti! Descubre una experiencia de
    usuario mejorada, exportaciones más fluidas y más en nuestro último
    lanzamiento.
  ogImage: /images/2023/10/reveal-new-release-1-7-0-thumbnail.jpg
source_hash: e3ec0506
source_locale: en
---
Estamos emocionados de anunciar el lanzamiento de la versión 1.6.1 de nuestro SDK de [Analítica Integrada](/embedded-analytics). Como siempre, estamos dedicados a mejorar su experiencia y a que sea sencillo para que usted integre análisis en sus aplicaciones usando Reveal. Sumerjámonos en lo nuevo y actualizado en este lanzamiento.

![Soporte de MongoDB y más en Reveal 1.6.1. Lanzamiento](/images/2023/11/reveal-launch-1-7-0-dashboard-mongodb.png)

## Nuevas Funcionalidades

Su caja de herramientas acaba de hacerse un poco más grande:

**ASP.NET & Node:**

- **FUENTE DE DATOS NUEVA:** MongoDB

**Todas las Plataformas:**

- Con exportación sin cabecera (headless export), ahora puede exportar una visualización individual sin la interfaz de usuario.
- Para los preocupados por la seguridad, hemos añadido el atributo noopener a los enlaces externos de panel (dashboard).
- Ahora puede ajustar el margen entre visualizaciones usando la nueva propiedad VisualizationMargin en RevealTheme para darle más control sobre la estética de las visualizaciones.
- Hemos realizado algunas mejoras para quienes usan el modo de visualización única.
- Controle el título del panel (dashboard) y el rastro de navegación (breadcrumb) con showBreadcrumb & showBreadcrumbDashboardTitle.
- Nuevas propiedades para showTitle en RVVisualization.
- Varias propiedades nuevas en RevealView se establecen automáticamente en false cuando se está en modo de visualización única.
- Para ayudar a optimizar sus procesos SQL, los procedimientos almacenados basados en SQL ahora enviarán su consulta al registro (log) y le alertarán sobre cualquier discrepancia de tipo de datos.

## Cambios Importantes (Breaking Changes)

Aquí hay algunos cambios importantes que debe conocer:

**Todas las Plataformas:**

- Al habilitar el modo de visualización única, varias propiedades en RevealView se establecen automáticamente en false. Estas incluyen showChangeVisualization, canEdit, showMenu, showStatisticalFunctions y showFilters.
- La propiedad window\.revealDisableKeyboardManagement ahora tendrá por defecto true. Esto significa que el foco de la pestaña ya no se detendrá en RevealView a menos que lo configure específicamente.
- Nuestros gráficos de porciones (Slice Charts) (que cubren gráficos de pastel, embudo y dona) han pasado por una transformación de diseño y tienen un nuevo aspecto y sensación. Nota: siempre puede restaurar el valor predeterminado usando RevealSdkSettings.enableNewCharts=false

## Palabras Finales…

Nos esforzamos continuamente por refinar y mejorar nuestro SDK; este lanzamiento no es una excepción. Eso significa que también arreglamos muchos errores para usted, que puede encontrar en las [notas de lanzamiento completas aquí](https://help.revealbi.io/web/release-notes). Esperamos que encuentre estas actualizaciones valiosas para optimizar su flujo de trabajo de desarrollo y mejorar las capacidades de análisis de su aplicación.

Gracias por ser parte de nuestra comunidad de desarrolladores. Sus comentarios son cruciales, así que no dude en compartir sus pensamientos, sugerencias o preguntas. Si necesita asistencia con el producto o simplemente desea compartir sus comentarios sobre Reveal con nosotros, puede [contactar a nuestro equipo de producto a través de Discord](https://discord.com/invite/Ped3sSK5Xw) o enviarme un correo electrónico directamente con cualquier idea, pregunta o problema a [CaseyM@revealbi.io](mailto:CaseyM@revealbi.io).

Gracias por elegir Reveal. Esperamos ayudarle a desbloquear nuevas posibilidades con sus datos.

Pruebe Reveal GRATIS

Comience hoy mismo descargando nuestro SDK.

[DESCARGAR](/download-sdk)
