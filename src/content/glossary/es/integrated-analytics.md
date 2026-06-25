---
title: 'Analítica Integrada: Qué Es y Cómo Funciona'
heading: Analítica Integrada
description: >-
  ¿Qué es la analítica integrada? Aprende cómo las plataformas de analítica
  integrada incrustan paneles, conocimientos de IA y analítica segura en
  aplicaciones SaaS.
seo:
  title: 'Analítica Integrada: Qué Es y Cómo Funciona'
  description: >-
    ¿Qué es la analítica integrada? Aprende cómo las plataformas de analítica
    integrada incrustan paneles, conocimientos de IA y analítica segura en
    aplicaciones SaaS.
  ogTitle: 'Analítica Integrada: Qué Es y Cómo Funciona'
  ogDescription: >-
    ¿Qué es la analítica integrada? Aprende cómo las plataformas de analítica
    integrada incrustan paneles, conocimientos de IA y analítica segura en
    aplicaciones SaaS.
  ogType: article
  twitterTitle: 'Analítica Integrada: Qué Es y Cómo Funciona'
  twitterDescription: >-
    ¿Qué es la analítica integrada? Aprende cómo las plataformas de analítica
    integrada incrustan paneles, conocimientos de IA y analítica segura en
    aplicaciones SaaS.
  ogImage: /images/2023/05/what-is-contextual-analytics.png
source_hash: eb32890a
source_locale: en
---
## ¿Qué es la analítica integrada?

La analítica integrada se refiere a la práctica de integrar capacidades analíticas, como paneles, informes, exploración de datos e información impulsada por IA, directamente dentro de aplicaciones y flujos de trabajo empresariales. En lugar de dirigir a los usuarios a herramientas de BI separadas, la analítica integrada proporciona información contextual dentro del software que ya utilizan. Mantiene los datos, las decisiones y los flujos de trabajo en un entorno gobernado único.

El término a menudo se superpone con [analítica integrada](/embedded-analytics), aunque el énfasis puede variar según el proveedor o la arquitectura. Ambos enfoques se centran en proporcionar información contextual dentro de las aplicaciones en lugar de a través de herramientas de BI independientes. Para comprender completamente su impacto, es útil examinar cómo la analítica integrada remodela los productos SaaS.

## Cómo la analítica integrada cambia los productos SaaS modernos

Los productos SaaS modernos compiten en experiencia de usuario y velocidad de información. La analítica integrada cambia la forma en que los equipos diseñan esa experiencia. En lugar de añadir informes como una ocurrencia tardía, los equipos de producto integran la información en los flujos de trabajo centrales. La analítica se convierte en parte de cómo los usuarios completan tareas, no en un destino separado.

La analítica integrada afecta el rendimiento del producto de maneras medibles:

![Integrated analytics interactions with your app and data](/images/2023/05/what-is-contextual-analytics.png)

- **Reducción del cambio de contexto** >Los usuarios acceden a información sin salir de la aplicación.
- **Mayor participación en el producto** Los datos se convierten en parte de los flujos de trabajo diarios en lugar de informes ocasionales.
- **Mejora de la retención de clientes** Los productos que muestran información relevante crean una dependencia más fuerte a largo plazo, como se explora en [retención de clientes con analítica integrada](/blog/customer-retention-with-embedded-analytics).
- **Toma de decisiones más rápida** La información aparece en el punto de acción, no después de exportar datos.

Este cambio apoya un modelo a menudo descrito como [analítica contextual](/glossary/contextual-analytics), donde la información se alinea con acciones y permisos específicos del usuario. Cuando la analítica se integra directamente con la lógica del producto, refleja roles, límites de datos y contexto de flujo de trabajo. Comprender este cambio requiere examinar cómo opera una plataforma de analítica integrada a nivel arquitectónico.

## Cómo funciona una plataforma de analítica integrada

Una plataforma de analítica integrada funciona como un sistema en capas que conecta datos, lógica e interfaces de usuario dentro de una aplicación. No funciona como un portal de informes separado. En cambio, se integra directamente en la arquitectura del producto anfitrión. Esta estructura permite que la analítica se alinee con los permisos de la aplicación, los flujos de trabajo y los roles de usuario.

Los componentes principales suelen incluir:

- **Capa de ingesta y preparación de datos** Se conecta a bases de datos, servicios en la nube y sistemas internos.
- **Capa API y SDK** Expone la funcionalidad de analítica a la aplicación anfitriona.
- **Motor de visualización** Renderiza paneles, gráficos y componentes interactivos.
- **Marco de control de acceso** Hace cumplir los permisos basados en roles y las restricciones a nivel de usuario.
- **Lógica de aislamiento multiinquilino** >Asegura que cada cliente acceda solo a datos autorizados.

La capa de integración a menudo se basa en un [SDK integrado](/glossary/embedded-sdk) que conecta las capacidades analíticas con la interfaz del producto. Las API gestionan la autenticación, las consultas de datos y la lógica de renderizado. Cuando estas capas trabajan juntas, la plataforma de analítica integrada se convierte en parte de la infraestructura del producto en lugar de un complemento externo. Diferentes modelos arquitectónicos implementan estas capas de diferentes maneras, lo que da forma a la flexibilidad, el control y la seguridad.

## Modelos de arquitectura de analítica integrada explicados

Las elecciones arquitectónicas determinan cómo funciona la analítica integrada dentro de un producto. Los diferentes modelos ofrecen distintos niveles de control, personalización y seguridad. Algunos enfoques priorizan la velocidad de implementación. Otros priorizan la propiedad y la escalabilidad a largo plazo. Comprender estos modelos ayuda a los equipos a evaluar las compensaciones antes de seleccionar una plataforma de analítica integrada.

![Pros and cons of integrated analytics via iFrame vs Native SDK](/images/2023/03/best-analytics-integration-option-1.png)

### Integración basada en iFrame

La integración basada en iFrame carga la analítica dentro de un contenedor enmarcado dentro de la aplicación. Este modelo separa el motor de analítica del producto anfitrión. A menudo permite una implementación inicial más rápida. Sin embargo, la personalización, el control de la interfaz de usuario (UI) y los límites de seguridad pueden seguir siendo limitados. Los equipos comparan frecuentemente este enfoque en discusiones sobre [analítica integrada vs iFrames](/blog/embedded-analytics-vs-iframes).

### Integración basada en SDK

La integración basada en SDK integra la analítica directamente en la base de código de la aplicación. Este modelo permite un control más profundo sobre la interfaz de usuario, la autenticación y los permisos de datos. Los desarrolladores pueden alinear el comportamiento de la analítica con la lógica del producto y las definiciones de roles. Por lo general, admite una aplicación más sólida de multiinquilino y control de marca.

### Modelo de portal de BI externo

El modelo de portal de BI externo enlaza a los usuarios a un entorno de informes separado. La analítica opera fuera de la experiencia central de la aplicación. Este enfoque a menudo refleja flujos de trabajo de informes tradicionales. Si bien puede centralizar los informes, reduce la alineación contextual con las acciones dentro del producto.
