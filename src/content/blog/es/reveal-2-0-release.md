---
title: 'Reveal 2.0: Construido para cómo construyes hoy en día'
description: >-
  Reveal 2.0 es una modernización completa del Reveal Web SDK: sin dependencia
  de jQuery, TypeScript-first, compilaciones ESM e IIFE, instalación npm o CDN,
  nuevos conectores CosmosDB y ClickHouse, mejor accesibilidad y paridad de SDK
  en Node y Java en Preview.
date: '2026-06-04'
author: Casey Ciniello
cover: >-
  https://static.infragistics.com/marketing/reveal/blogs/launch/2026/may/reveal-new-release-2-0-header.jpg
heroImage: >-
  https://static.infragistics.com/marketing/reveal/blogs/what-is-self-service-bi/reveal-what-is-self-service-bi-header.svg
summary: >-
  Reveal 2.0 moderniza el Reveal Web SDK para pilas de desarrollo actuales con
  arquitectura TypeScript-first, soporte de módulos moderno, accesibilidad
  mejorada y paridad de tiempo de ejecución ampliada en Node y Java en Preview.
takeaways:
  - Reveal 2.0 elimina la dependencia de jQuery y moderniza el Web SDK
  - >-
    El soporte de TypeScript es de primera clase con definiciones de tipos
    completas
  - >-
    Tanto las compilaciones ESM como las IIFE están disponibles para sistemas de
    módulos modernos y heredados
  - >-
    Los equipos pueden instalar a través de npm o usar un CDN para prototipos
    rápidos
  - Se incluyen nuevos conectores nativos para Azure CosmosDB y ClickHouse
  - >-
    Los SDK de Node y Java ahora alcanzan la paridad de características de API
    con ASP.NET en Preview
categories:
  - Actualizaciones del producto
tags:
  - Reveal 2.0
  - Web SDK
  - Analítica integrada
  - TypeScript
  - Experiencia del desarrollador
seo:
  title: 'Reveal 2.0: Construido para cómo construyes hoy en día'
  description: >-
    Reveal 2.0 es una modernización completa del Reveal Web SDK: sin dependencia
    de jQuery, TypeScript-first, compilaciones ESM e IIFE, instalación npm o
    CDN, nuevos conectores CosmosDB y ClickHouse, mejor accesibilidad y paridad
    de SDK en Node y Java en Preview.
  ogTitle: 'Reveal 2.0: Construido para cómo construyes hoy en día'
  ogDescription: >-
    Reveal 2.0 es una modernización completa del Reveal Web SDK: sin dependencia
    de jQuery, TypeScript-first, compilaciones ESM e IIFE, instalación npm o
    CDN, nuevos conectores CosmosDB y ClickHouse, mejor accesibilidad y paridad
    de SDK en Node y Java en Preview.
  ogType: article
  twitterTitle: 'Reveal 2.0: Construido para cómo construyes hoy en día'
  twitterDescription: >-
    Reveal 2.0 es una modernización completa del Reveal Web SDK: sin dependencia
    de jQuery, TypeScript-first, compilaciones ESM e IIFE, instalación npm o
    CDN, nuevos conectores CosmosDB y ClickHouse, mejor accesibilidad y paridad
    de SDK en Node y Java en Preview.
  ogImage: >-
    https://static.infragistics.com/marketing/reveal/blogs/launch/2026/may/reveal-new-release-2-0-header.jpg
source_hash: e7089db5
source_locale: en
---
La forma en que los equipos construyen aplicaciones web ha cambiado. Los módulos reemplazaron las etiquetas de script. TypeScript se convirtió en el predeterminado. npm y los bundlers modernos se encargaron de la instalación y el empaquetado. La mayoría de los SDKs que los desarrolladores utilizan fueron reescritos para mantenerse al día.

La mayoría de ellos.

Hoy estamos lanzando Reveal 2.0, una modernización completa del Reveal Web SDK. Sin dependencia de jQuery. Escrito en TypeScript. Funciona con compilaciones IIFE y ESM. Instalable desde CDN o vía npm. Los mismos paneles, la misma experiencia de usuario final, sobre una base que encaja limpiamente en un flujo de trabajo de desarrollo de 2026.

![Reveal 2.0 manufacturing dashboard](https://static.infragistics.com/marketing/reveal/blogs/launch/2026/may/reveal-launch-2-0-manufacturing-dashboard-body-1.webp)

<h2 style="margin-bottom: 1rem;">Qué hay de nuevo en Reveal 2.0</h2>

- Un Web SDK moderno sin dependencia de jQuery.
- TypeScript-first, con definiciones de tipos completas listas para usar.
- Compilaciones IIFE y ESM. Agrega Reveal a cualquier sistema de módulos que use tu aplicación.
- Instala vía CDN para prototipos rápidos, o vía npm para producción.
- Nuevo conector para Azure CosmosDB.
- Nuevo conector para ClickHouse.
- Accesibilidad mejorada en todo el SDK.
- SDKs de Node y Java ahora con paridad de características API con el SDK de ASP.NET, disponibles en Preview.

<h2 style="margin-bottom: 1rem;">Por qué lo reconstruimos</h2>

Reveal 1.x funcionó. Todavía funciona. Pero cualquiera que haya pasado los últimos años dentro de un proyecto moderno de Vite, webpack o esbuild sabe la fricción que introduce un SDK basado en jQuery y solo con etiquetas de script. No realiza el *tree-shake* de manera limpia. Complica el renderizado del lado del servidor. Se siente anticuado en las mismas evaluaciones donde los clientes están decidiendo sobre qué plataforma de analítica integrada apostar su producto.

Tuvimos dos opciones: seguir parcheando las costuras, o reconstruir sobre la base en la que nuestros clientes realmente implementan. Elegimos lo segundo.

Reveal 2.0 sigue haciendo todo lo que Reveal siempre ha hecho: paneles rápidos, hermosos y personalizables que incrustas dentro de tu producto. Pero ahora se integra de la manera que se supone que deben hacer los SDKs modernos.

<h2 style="margin-bottom: 1rem;">Qué significa esto para usted</h2>

Si eres un cliente existente de Reveal, tu ruta de actualización es sencilla. Las mismas APIs que utilizas hoy siguen aquí. Hemos publicado una guía de migración de 1.x a 2.0 que explica qué ha cambiado y cómo actualizar tu integración. La mayoría de los equipos se mudarán en una tarde.

Si evaluaste Reveal hace uno o dos años y el SDK se sentía por detrás de tu pila tecnológica, échale un vistazo de nuevo. Las razones que estaban en el lado de los contras de tu hoja de evaluación ahora están en el lado de los pros.

Si eres un líder de ingeniería que está viendo la analítica integrada por primera vez, Reveal 2.0 te da un SDK que puedes agregar a un proyecto Next.js, React, Vue o Angular, instalar con las mismas herramientas con las que instalas todo lo demás, y enviar a producción sin lastre heredado.

<h2 style="margin-bottom: 1rem;">Multi-Runtime: Node y Java en Vista Previa</h2>

Reveal siempre ha sido .NET-first. Con Reveal 2.0, nuestros SDKs de Node y Java ahora tienen paridad de características API con el SDK de ASP.NET, ambos disponibles en Preview. El SDK de Java es un SDK completamente nuevo con una API totalmente moderna, una ruptura limpia con el antiguo SDK de Java que enviamos previamente.

Si tu producto funciona con Node o Java y anteriormente tuviste que descartarnos porque no encajábamos en tu pila, ese ya no es el caso. Regístrate para acceso en Preview y dinos qué deberíamos mejorar antes de GA.

<h2 style="margin-bottom: 1rem;">Más datos, más acceso</h2>

Conector Azure CosmosDB: lleva datos de CosmosDB a los paneles de Reveal directamente, sin ETL manual ni almacenes intermedios.

Conector ClickHouse: para equipos que han trasladado la analítica a una pila columnar moderna, tus paneles integrados pueden hacerlo.

Mejoras de accesibilidad: Reveal 2.0 facilita el envío de paneles en entornos donde el cumplimiento WCAG no es negociable. Háblanos de los requisitos de adquisición específicos con los que estás trabajando. Podemos ayudarte a mapear nuestra cobertura con tu lista de verificación.

Reveal 2.0 es la versión que querríamos usar si estuviéramos construyendo un producto de analítica integrada para nuestro propio SaaS hoy. Creemos que tú sentirás lo mismo.
