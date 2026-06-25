---
title: Integración de BI de autoservicio en aplicaciones React con Node.js
description: >-
  Integrar analítica en sus aplicaciones React aporta información relevante y
  oportuna directamente en el flujo de trabajo de su usuario.
date: '2023-05-16'
author: Bilyana Petrova
cover: /images/2023/05/embedding-analytics-in-react-apps-with-nodejs.png
heroImage: /images/2023/05/reveal-embed-BI-in-nodejs-react-internal-header.svg
summary: >-
  Integrar analítica en sus aplicaciones React aporta información relevante y
  oportuna directamente en el flujo de trabajo de su usuario, promoviendo una
  cultura basada en datos y fomentando un pensamiento más analítico.
categories:
  - Perspectivas Técnicas
seo:
  title: Integración de BI de autoservicio en aplicaciones React con Node.js
  description: >-
    Integrar analítica en sus aplicaciones React aporta información relevante y
    oportuna directamente en el flujo de trabajo de su usuario.
  ogTitle: Integración de BI de autoservicio en aplicaciones React con Node.js
  ogDescription: >-
    Integrar analítica en sus aplicaciones React aporta información relevante y
    oportuna directamente en el flujo de trabajo de su usuario.
  ogType: article
  twitterTitle: Integración de BI de autoservicio en aplicaciones React con Node.js
  twitterDescription: >-
    Integrar analítica en sus aplicaciones React aporta información relevante y
    oportuna directamente en el flujo de trabajo de su usuario.
  ogImage: /images/2023/05/embedding-analytics-in-react-apps-with-nodejs.png
source_hash: 045f1edb
source_locale: en
---
En el mundo actual impulsado por datos, [integrar paneles y capacidades de análisis directamente en aplicaciones SaaS](/blog/embedded-analytics-for-saas-companies) es imprescindible. Hay muchos [beneficios de incrustar analítica](/blog/benefits-of-embedded-analytics), incluido un tiempo de comercialización más rápido, una mayor productividad y rendimiento, y el crecimiento de las ganancias.

Incrustar analítica en sus aplicaciones React aporta información relevante y oportuna directamente en el flujo de trabajo de su usuario, promoviendo una [cultura impulsada por datos](/whitepapers/creating-data-driven-culture) y fomentando un pensamiento más analítico.

Como solución de [analítica integrada](/embedded-analytics), Reveal puede ayudarle a lograrlo.

Reveal le ayuda a incrustar de forma fácil y rápida paneles e informes interactivos en sus aplicaciones React con [funciones de análisis](/blog/embedded-analytics-features) como edición en contexto, combinación de datos, vinculación de paneles, campos calculados y mucho más.

En este artículo, veremos cómo puede implementar Reveal en sus aplicaciones basadas en React con Node.js.

**Obtenga su copia GRATUITA en PDF**

Rellene el formulario para obtener acceso.

Lo sentimos, parece que hemos encontrado un problema con el formulario. [Por favor, inténtelo de nuevo](/blog/embedding-self-service-bi-in-react-apps-with-node-js#) en unos minutos. Si aún experimenta problemas, comuníquese con nosotros en [support@revealbi.io](mailto:support@revealbi.io) para notificarnos el problema.

Requerido

Desafortunadamente, Google lo ha considerado un bot. No dude en ponerse en contacto con [support@revealbi.io](mailto:support@revealbi.io) para obtener el recurso que estaba buscando o elegir programar una demostración de nuestros productos.
Acepte los términos del formulario para enviar con éxito.
Esta dirección de correo electrónico no parece válida. Por favor, actualice e inténtelo de nuevo.
Por favor, utilice una dirección de correo electrónico empresarial.

País

Correo electrónico empresarial

Nombre

Apellido

Entiendo y acepto los [Términos de Uso](/terms-of-use) y la [Política de Privacidad](/privacy-policy) de Infragistics.

Este sitio está protegido por reCAPTCHA y se aplican la Política de Privacidad y los Términos de Uso de Google.

Descargar PDF

![Incrustar BI de autoservicio en aplicaciones React con Node.js](https://static.infragistics.com/marketing/slingshot/checkmark.svg)

### ¡Su PDF se está descargando!

Disfrute de la lectura y el aprendizaje.

**PDF:** Obtenga nuestra "Guía de implementación de BI incrustado de extremo a extremo" GRATUITA, que detalla las fases de planificación estratégica, selección, desarrollo y mejora continua necesarias para una implementación exitosa. **[¡Descargue el PDF aquí!](https://static.infragistics.com/marketing/reveal/whitepapers/reveal-end-to-end-BI-deployment-guide.pdf)**

## ¿Por qué debe incrustar BI en sus aplicaciones React?

Independientemente del propósito de su aplicación React, las capacidades de analítica integrada le proporcionarán enormes oportunidades para optimizar flujos de trabajo, gestionar recursos y optimizar el rendimiento. Las herramientas de BI como [gráficos, diagramas y paneles](/chart-types) también tienen la capacidad de mejorar la alfabetización de datos en toda una organización. La alfabetización de datos, que es la capacidad de leer, comprender, crear y [comunicar datos como información](/glossary/data-driven-storytelling), ayuda aún más a los usuarios a tomar mejores y más inteligentes decisiones. [La toma de decisiones basada en datos](/blog/reveal-data-driven-decision-making) es muy importante ya que se basa en hechos en lugar de suposaciones e intuiciones. Con acceso a la analítica, todos pueden tomar decisiones más inteligentes con confianza y en el momento del impacto.

## Incrustar analítica en sus aplicaciones React de Reveal con Node.js

[Analítica integrada de Reveal](/embedded-analytics) le ayuda a incrustar fácilmente informes, paneles y más interactivos en sus aplicaciones React. Con funciones como [aprendizaje automático](/glossary/machine-learning), vinculación de paneles, funciones estadísticas, campos calculados, análisis de datos enriquecidos, autoservicio, [marca blanca](/blog/white-label-analytics), combinación de datos y más, Reveal puede añadir un enorme valor a cualquier aplicación basada en React.

Más aún, integrar BI en sus aplicaciones React es muy fácil con el SDK nativo de Reveal, lo que le permite incrustar analítica en sus aplicaciones sin requisitos adicionales. La arquitectura flexible y las ricas API de Reveal le dan control sobre las funciones en su aplicación, lo que lo convierte en una parte perfecta de la experiencia del usuario.

Así que, vamos a incrustar analítica en su aplicación React con el [SDK de Reveal](/download-sdk).

En este tutorial, utilizaremos un servidor Node.js.

\*Ya tenemos un servidor Node.js. Para aprender a crear uno por sí mismo, consulte este tutorial paso a paso sobre cómo [configurar el servidor SDK de Reveal con Node.js](https://help.revealbi.io/web/getting-started-server-node).

**1. Agregue las referencias de script necesarias a index.html**

```generic
<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" type="text/css">

<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script> 
<script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script> 
<script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script> 
<script src="https://dl.revealbi.io/reveal/libs/1.3.1/infragistics.reveal.js"></script>
```

**2. Agregue un <div> en app.tsx que se utilizará para renderizar el RevealView**

```generic
function App() {

return (

<div id="revealView" style={{height: "100vh", width: "100%"}}></div>

);

}
```

**3. Inicialice el objeto RevealView en app.tsx y cargue un Panel**

```generic
useEffect(() => {

$.ig.RVDashboard.loadDashboard(dashboardId).then((dashboard: any) => {

var revealView = new $.ig.RevealView("#revealView");

revealView.dashboard = dashboard;

});

}, [dashboardId]);
```

En solo 3 pasos sencillos, tiene lo básico para cargar un panel en Reveal. Para el tutorial completo, vea este video con nuestro Vicepresidente Sénior de Herramientas de Desarrollador, Jason Beres, guiándolo paso a paso sobre cómo cargar y recuperar paneles desde una aplicación React.

[https://www.youtube.com/watch?v=o1XoppSfX8E\&t=2s](https://www.youtube.com/watch?v=o1XoppSfX8E&t=2s)

Asegúrese de ver nuestros otros videos, en [nuestro canal de YouTube](https://www.youtube.com/@RevealBI), para obtener más información sobre analítica integrada y inteligencia de negocios, y la importancia de los datos para las empresas. Cubrimos temas como [incrustar analítica en Angular](/blog/embedding-bi-in-angular-apps), [Blazor](/blog/embedding-bi-in-blazor-applications) y aplicaciones HTML de JavaScript, cómo crear un panel de BI incrustado, y más. No olvide suscribirse para no perderse ningún video futuro de nuestros expertos.

Y si está intentando incrustar analítica en sus aplicaciones React de Reveal con Node.js pero se encuentra con algún problema en el camino, póngase en contacto con nuestro equipo de productos a través de [nuestro canal de Discord](https://discord.com/invite/Ped3sSK5Xw).

También puede obtener más información sobre Reveal y cómo funciona [programando un recorrido gratuito por el producto](/request-demo). Alternativamente, también puede [descargar nuestro SDK](/download-sdk) para probarlo usted mismo.

\[cta\_banner type='{TYPE}' headline='Empiece a tomar decisiones basadas en datos' msg= 'Lleve el poder del BI a todos sus usuarios empresariales desde hoy.' button\_text= 'MÁS INFORMACIÓN' button\_link='[https://www.revealbi.io/request-demo](https://www.revealbi.io/request-demo)' class='banner--embedded']
