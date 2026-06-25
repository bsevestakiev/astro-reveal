---
title: Cómo usar datos multiinquilino en analítica integrada
description: >-
  Los servicios multiinquilino reducen la complejidad y las personalizaciones
  que a menudo se requieren al integrar BI en su software OEM, aplicación ERP u
  otras aplicaciones SaaS.
date: '2021-09-23'
author: Bilyana Petrova
cover: /images/2021/09/multi-tenant-data-in-embedded-analytics.png
summary: >-
  Los servicios multiinquilino reducen la complejidad y las personalizaciones
  que a menudo se requieren al integrar BI en su software OEM, aplicación ERP u
  otras aplicaciones SaaS. Sus capacidades le permiten mantener fácilmente el
  aislamiento de datos mientras admite múltiples tareas dentro de la misma
  cuenta u organización al mismo tiempo.
categories:
  - Tendencias de Analítica SaaS
seo:
  title: ¿Cómo usar datos multiinquilino en analítica integrada?
  description: >-
    Los servicios multiinquilino reducen la complejidad y las personalizaciones
    que a menudo se requieren al integrar BI en su software OEM, aplicación ERP
    u otras aplicaciones SaaS.
  ogTitle: ¿Cómo usar datos multiinquilino en analítica integrada?
  ogDescription: >-
    Los servicios multiinquilino reducen la complejidad y las personalizaciones
    que a menudo se requieren al integrar BI en su software OEM, aplicación ERP
    u otras aplicaciones SaaS.
  ogType: article
  twitterTitle: ¿Cómo usar datos multiinquilino en analítica integrada?
  twitterDescription: >-
    Los servicios multiinquilino reducen la complejidad y las personalizaciones
    que a menudo se requieren al integrar BI en su software OEM, aplicación ERP
    u otras aplicaciones SaaS.
  ogImage: /images/2021/09/multi-tenant-data-in-embedded-analytics.png
source_hash: d76aa5e8
source_locale: en
---
Con el auge y la propagación de las plataformas de computación en la nube, las organizaciones están considerando cada vez más alojar aplicaciones de analítica en infraestructura compartida. La arquitectura multiinquilino es lo que han estado buscando y lo que pesa en su decisión de realizar la transición: aprovecha recursos compartidos, ahorra tiempo y preocupaciones, y reduce los costos operativos.

Este artículo describe el significado de la arquitectura de datos multiinquilino, señala sus beneficios y le muestra cómo puede utilizar datos multiinquilinos en una [solución de analítica integrada](/embedded-analytics).

[Ver Reveal en acción](/request-demo)

## ¿Qué es la multiinquilinidad?

La multiinquilinidad es una arquitectura de software en la que una única instancia sirve a múltiples clientes llamados inquilinos. Es lo opuesto a la arquitectura de inquilinidad única, en la que la instancia de software sirve solo a un cliente.

La arquitectura multiinquilino es una característica en muchos tipos de computación en la nube pública, uno de los mejores ejemplos de lo cual son las ofertas [SaaS](/blog/embedded-analytics-for-saas-companies) (software como servicio). Los inquilinos de una arquitectura multiinquilino generalmente tienen la capacidad de personalizar algunas partes de la aplicación. Es posible que puedan [personalizar el aspecto y la sensación de la aplicación para satisfacer la experiencia del cliente de su marca](/blog/white-label-analytics) y controlar los permisos y restricciones de acceso de los usuarios. Los inquilinos no pueden personalizar el código de la aplicación.

Una forma fácil de entender exactamente qué es la multiinquilinidad es pensar en la [industria bancaria](/banking-analytics) y cómo funciona. Este ejemplo se utiliza a menudo para describir el significado de la multiinquilinidad, ya que realmente ofrece una comprensión más clara:

Los bancos son [instituciones financieras](/finance-analytics) que gestionan depósitos, otorgan préstamos y almacenan el dinero de las personas. Pueden almacenar el dinero de cientos y miles de personas de forma completamente separada, independientemente de que en realidad se almacenen en el mismo lugar. Estas personas no tienen acceso a las cuentas de otras personas y no interactúan de ninguna manera entre sí. Básicamente es lo mismo cuando se utiliza una arquitectura multiinquilino. Los clientes del proveedor de software utilizan la misma infraestructura y los mismos servidores; sin embargo, su lógica de negocio y sus datos están completamente separados y seguros.

![qué es la multiinquilinidad?](/images/2021/09/multi-tenant-architecture.png)

## ¿Cuáles son los beneficios de la multiinquilinidad?

Invertir en una aplicación SaaS multiinquilino conlleva su cuota de ventajas. Los beneficios de la arquitectura multiinquilino frente a las aplicaciones de inquilinidad única alojadas por terceros incluyen lo siguiente:

![beneficios de la arquitectura multiinquilino para aplicaciones de analítica integrada](/images/2021/09/benefits-of-multi-tenancy.png)

### Costos más bajos

Cuando múltiples clientes comparten la misma infraestructura y servidores, un proveedor de software puede ofrecer sus servicios a un precio mucho más bajo a ese grupo de personas en comparación con proporcionar su propia infraestructura dedicada a cada cliente. La arquitectura de software multiinquilino también permite consolidar y asignar recursos de manera eficiente, lo que ahorra costos operativos.

### Actualizaciones y mantenimiento continuos

Las aplicaciones SaaS a menudo realizan actualizaciones de sus servicios, añaden nuevas funciones y funcionalidades, y mantienen su software actualizado. Con una arquitectura multiinquilino, los clientes no necesitan pagar costosas tarifas de mantenimiento y mejoras, ya que generalmente están incluidas con la suscripción de software.

Todos los costos adicionales se comparten por todos los inquilinos que utilizan la misma infraestructura, lo que reduce el costo general para cada inquilino.

### Ahorra tiempo

Suscribirse a una aplicación SaaS multiinquilino significa que ya no es su hardware lo que tiene que gestionar y preocuparse. Recibe la última versión del software proporcionada por el proveedor, lo que ahorra mucho tiempo y gastos. Al liberar el tiempo de su TI, pueden centrarse en otras tareas, problemas e innovaciones importantes.

### Escalabilidad

En las aplicaciones de arquitectura multiinquilino, el espacio del servidor aumenta y disminuye según la fortaleza del inquilino, lo que significa que el proveedor no necesita construir un nuevo centro de datos para cada inquilino como en las soluciones de inquilinidad única.

Y eso no es todo. Algunos beneficios adicionales de la multiinquilinidad incluyen la ventaja de utilizar capacidades avanzadas como IoT, IA y [aprendizaje automático](/glossary/machine-learning). La calidad también está garantizada: para que el software sea viable en un entorno multiinquilino, debe cumplir con ciertos estándares de control de calidad. También puede ayudar a optimizar los procesos de flujo de trabajo adoptando las mejores prácticas de la industria integradas directamente en las soluciones.

## ¿Cómo usar datos multiinquilinos en analítica integrada?

Así que, ¿quiere proporcionar analítica a sus clientes y añadir paneles y gráficos a su aplicación? ¡Genial! [La analítica integrada tiene muchos beneficios](/blog/benefits-of-embedded-analytics), pero es importante asegurarse de que al [integrar](/blog/benefits-of-embedded-analytics) una solución de analítica en su aplicación web o software, diferentes usuarios y clientes no puedan acceder ni ver ningún dato que no sea suyo. Los proveedores de analítica integrada garantizan que los datos sean privados y protegidos al ofrecer una arquitectura multiinquilino como parte de su solución.

Vale la pena mencionar que las plataformas modernas de [BI](/glossary/business-intelligence) admiten marcos de seguridad y despliegue integrados que funcionan sin problemas en entornos de alojamiento multiinquilino. Es decir, al utilizar datos multiinquilinos en analítica integrada, obtiene una plataforma [BI integrable](/glossary/embedded-bi-business-intelligence) que encaja perfectamente en su arquitectura SaaS mientras extiende el valor de su producto/servicio principal.

Los servicios multiinquilinos reducen la complejidad y las personalizaciones que a menudo se requieren al integrar BI en su [software OEM](/glossary/oem-software), [aplicación ERP](/blog/erp-and-embedded-analytics), u otras aplicaciones SaaS. Sus capacidades le permiten mantener fácilmente el aislamiento de datos mientras admite múltiples tareas dentro de la misma cuenta u organización al mismo tiempo. Por ejemplo, si usted es un [ISV](/isv-analytics), puede asignar espacio de aislamiento dedicado a diferentes usuarios dentro de la misma cuenta de cliente. Esto permite que estos usuarios compartan contenido solo con otros que están asignados en el mismo espacio de aislamiento, eliminando la posibilidad de exponer cualquier dato a otras partes.

Aquí hay un ejemplo de dos organizaciones diferentes que utilizan el mismo proveedor de analítica integrada y comparten los mismos servidores, bases de datos y cachés de datos:

Puede notar que todo —los datos, los logotipos, las fuentes y los colores— es específico del inquilino.

![datos multiinquilinos en analítica integrada](/images/2021/09/multi-tenancy-in-embedded-analytics.png)

## ¿Son mis datos seguros con la multiinquilinidad?

Al ofrecer soluciones de analítica multiinquilino a sus clientes, debe poder proporcionar a cada inquilino una experiencia personalizada y, al mismo tiempo, mantener sus datos seguros. La seguridad multiinquilino en analítica integrada le permite conectarse a diferentes modelos de datos y mostrar datos específicos solo a los inquilinos autorizados.

Una solución en la nube verdaderamente segura viene con las mismas medidas de seguridad para cada usuario en la nube, tanto interna como externamente. Los firewalls por inquilino son imprescindibles para garantizar que cada inquilino en una arquitectura multiinquilino esté protegido y que sus datos no se vean comprometidos. Esto debe estar disponible para cada inquilino; de lo contrario, la seguridad de cada inquilino podría estar en riesgo.

Otro aspecto importante de un entorno multiinquilino seguro es su centro de datos o la seguridad física del hardware que lo alberga. Si el centro de datos que alberga su hardware no es seguro, sus datos tampoco lo son.

En otras palabras, la respuesta corta a esta pregunta es sí: generalmente, no tiene nada de qué preocuparse; sus datos están asegurados con la multiinquilinidad. Sin embargo, le recomendamos encarecidamente que investigue y conozca toda la arquitectura y seguridad antes de invertir en cualquier aplicación SaaS multiinquilino. Aunque estas aplicaciones no estarían en el mercado si no fueran confiables, vale la pena explorar sus opciones para encontrar una solución que mejor se adapte a sus necesidades.

## Reveal Analítica Integrada

Reveal es una solución de analítica integrada multiinquilino que fue construida desde cero, con su seguridad como prioridad número 1. El servidor de Reveal tiene la capacidad de separar datos y servicios según los inquilinos, por lo que puede estar seguro de que sus datos están bien protegidos.

Una organización dada, por ejemplo, podría configurarse para usar un área de almacenamiento separada, lo que significa que todos los datos (equipos, paneles e incluso datos en caché) se almacenarán en almacenamiento dedicado, e incluso los servicios en tiempo de ejecución pueden estar aislados. Esto garantiza que el rendimiento de esa organización no se verá afectado por la carga del resto del sistema.

Comience hoy mismo

Aproveche los recursos compartidos, ahorre tiempo y reduzca los costos operativos con la arquitectura multiinquilino de Reveal.

[VER CÓMO FUNCIONA](/request-demo)
