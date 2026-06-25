---
title: Integración de BI de autoservicio en aplicaciones Blazor
description: >-
  A medida que más organizaciones comienzan a ofrecer capacidades analíticas
  como parte de sus aplicaciones, la integración de analítica en sus
  aplicaciones Blazor ya no es opcional. Aprenda cómo hacerlo
date: '2023-06-13'
author: Bilyana Petrova
cover: /images/2023/06/reveal-embed-BI-in-blazor-header-1.png
heroImage: /images/2023/06/reveal-embed-BI-in-blazor-internal-header.svg
summary: >-
  A medida que más organizaciones comienzan a ofrecer capacidades analíticas
  como parte de sus aplicaciones, la integración de analítica en sus
  aplicaciones Blazor ya no es opcional.
categories:
  - Perspectivas Técnicas
seo:
  title: Integración de BI Potente en sus aplicaciones Blazor - Reveal BI
  description: >-
    A medida que más organizaciones comienzan a ofrecer capacidades analíticas
    como parte de sus aplicaciones, la integración de analítica en sus
    aplicaciones Blazor ya no es opcional. Aprenda cómo hacerlo
  ogTitle: Integración de BI Potente en sus aplicaciones Blazor - Reveal BI
  ogDescription: >-
    A medida que más organizaciones comienzan a ofrecer capacidades analíticas
    como parte de sus aplicaciones, la integración de analítica en sus
    aplicaciones Blazor ya no es opcional. Aprenda cómo hacerlo
  ogType: article
  twitterTitle: Integración de BI Potente en sus aplicaciones Blazor - Reveal BI
  twitterDescription: >-
    A medida que más organizaciones comienzan a ofrecer capacidades analíticas
    como parte de sus aplicaciones, la integración de analítica en sus
    aplicaciones Blazor ya no es opcional. Aprenda cómo hacerlo
  ogImage: /images/2023/06/reveal-embed-BI-in-blazor-header-1.png
source_hash: 9f275251
source_locale: en
---
Con abundantes datos, los usuarios han cambiado a un enfoque de datos primero para guiar su [proceso de toma de decisiones](/blog/reveal-data-driven-decision-making).

Y es fácil ver por qué.

Integrar BI potente con visualizaciones e informes totalmente interactivos en sus aplicaciones Blazor hace que el análisis de datos sea accesible para todos sus usuarios finales. Con datos accesibles en contexto, sus usuarios pueden extraer rápidamente información relevante cuando sea necesario, libres de interrupciones y caos causados por cambiar de aplicaciones o manipular datos.

Como solución de [analítica integrada](/embedded-analytics), Reveal puede ayudarle a lograrlo.

Reveal le ayuda a integrar fácilmente y rápidamente paneles e informes interactivos en sus [aplicaciones Blazor](https://www.infragistics.com/products/ignite-ui-blazor) con [funciones de análisis] de autoservicio (/blog/embedded-analytics-features) como edición en contexto, combinación de datos, vinculación de paneles, campos calculados y más.

En este artículo, exploraremos cómo puede integrar con éxito la analítica integrada en sus aplicaciones Blazor con Reveal.

Si es nuevo en Reveal, puede obtener más información sobre nuestro producto haciendo un recorrido por nuestro sitio web o viendo nuestro [video de descripción general del producto Reveal](https://www.youtube.com/watch?v=lkWA2DJsLtE).

## **¿Por qué debe integrar análisis en sus aplicaciones Blazor?**

Integrar análisis en sus aplicaciones Blazor le permite ver datos clave de negocio en su flujo de trabajo natural. Le permite detectar fácilmente tendencias y patrones en los datos que de otro modo se habrían pasado por alto. Con acceso a información en tiempo real, usted (y todos sus usuarios) pueden tomar decisiones mejor informadas[s](/blog/reveal-data-driven-decision-making) que pueden guiar el éxito de su negocio.

El análisis de datos también ayuda a las empresas a optimizar flujos de trabajo, gestionar recursos y optimizar procesos y rendimiento para obtener la máxima rentabilidad. Con los datos correctos, también puede identificar nuevas oportunidades de productos/servicios para aumentar sus ingresos.

**Obtenga su copia GRATUITA en PDF**

Rellene el formulario para obtener acceso.

Lo sentimos, parece que hemos encontrado un problema con el formulario. [Por favor, inténtelo de nuevo](/blog/embedding-bi-in-blazor-applications#) en unos minutos. Si aún experimenta problemas, comuníquese con nosotros en [support@revealbi.io](mailto:support@revealbi.io) para notificarle el problema.

Requerido

Desafortunadamente, Google lo ha considerado un bot. No dude en ponerse en contacto con [support@revealbi.io](mailto:support@revealbi.io) para obtener el recurso que estaba buscando o elegir programar una demostración de nuestros productos.
Acepte los términos del formulario para enviar con éxito.
Esta dirección de correo electrónico no parece válida. Por favor, actualice e inténtelo de nuevo.
Por favor, use una dirección de correo electrónico de empresa.

País

Correo electrónico de empresa

Nombre

Apellido

Entiendo y acepto los términos de [Términos de uso](/terms-of-use) y [Política de privacidad](/privacy-policy) de Infragistics.

Este sitio está protegido por reCAPTCHA y se aplican la Política de Privacidad y los Términos de Uso de Google.

Descargar PDF

![Integración de BI de Autoservicio en Aplicaciones Blazor ](https://static.infragistics.com/marketing/slingshot/checkmark.svg)

### ¡Su PDF se está descargando!

Disfrute de la lectura y el aprendizaje.

**PDF:** Obtenga nuestra ‘’Guía de implementación de BI integrado de extremo a extremo’’, que detalla las fases de planificación estratégica, selección, desarrollo y mejora continua necesarias para una implementación exitosa. **[¡Descargue el PDF aquí!](https://static.infragistics.com/marketing/reveal/whitepapers/reveal-end-to-end-BI-deployment-guide.pdf)**

## **Integración de análisis de autoservicio en sus aplicaciones Blazor con Reveal BI**

Los siguientes 7 pasos le mostrarán lo fácil que es empezar a habilitar ricas visualizaciones de datos y paneles en su aplicación Blazor. Hay configuraciones tanto del cliente como del servidor que deben realizarse. Para empezar, [descargue el SDK](/download-sdk)

Una vez que haya hecho eso, ¡creemos y habilitemos BI integrado y de autoservicio en su aplicación Blazor en 7 sencillos pasos!

### **Paso 1: Crear una aplicación Blazor Server**

Dado que esta es una aplicación Blazor Server, abra Visual Studio y cree una nueva aplicación Blazor Server con los valores predeterminados. Una vez completado, la aplicación está creada; haga clic derecho en su proyecto, seleccione Administrar paquetes NuGet y busque en nuget.org el paquete nuget **Reveal.Sdk.AspNetCore** e instálelo en su proyecto.

### **Paso 2: Configurar carpetas / Añadir paneles**

Para probar el cliente SDK de Reveal, enviamos paneles de muestra que puede usar para asegurarse de que su configuración es correcta. Reveal utiliza una estructura de carpetas conocida para cargar y guardar paneles automáticamente; si utiliza una carpeta llamada Dashboards en la raíz de su proyecto, no es necesario que escriba código adicional de Carga/Guardado.

1. Cree una carpeta llamada **Dashboards**

2. Descomprima y copie los paneles de muestra (Marketing, Ventas, Campañas, Manufactura) a la carpeta Dashboard recién creada desde este archivo zip: [https://users.infragistics.com/Reveal/sample-dashboards.zip](https://users.infragistics.com/Reveal/sample-dashboards.zip)

### **Paso 3: Actualizar Program.cs**

En **Program.cs:**

1. Agregue al principio de la ventana de código:

**using Reveal.Sdk;**

2. Indique a su aplicación que use el SDK de Reveal con este código y colóquelo antes de la declaración **builder.build**.

**builder.Services.AddControllers().AddReveal();**

### **Paso 4: Añadir dependencias del SDK del cliente**

Para habilitar las dependencias de JavaScript del cliente de Reveal, el archivo **Pages\\\_layout.cshtml** debe actualizarse. Agregue el siguiente código antes del final de la etiqueta de cierre **</Body>**.

```generic
<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>

<script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script>

<script src="https://dl.revealbi.io/reveal/libs/1.5.0/infragistics.reveal.js"></script> 
 
<script type="module"> 
    import "./js/revealview.js"; 
</script>
```

### **Paso 5: Añadir JavaScript de configuración del cliente de Reveal**

El cliente SDK de Reveal se configura a través de RevealView. Para cargar RevealView, debe agregar una función JavaScript en el cliente. Aquí también es donde configuraría cualquier propiedad que deba habilitarse cuando se renderiza un panel.

1. Agregue la carpeta **js** en la carpeta **\wwwroot\\**

2. En la carpeta **js**, agregue un archivo JavaScript llamado **revealview\.js** con el siguiente código:

```generic
window.loadRevealView = function (viewId, dashboardName) {

$.ig.RevealSdkSettings.setBaseUrl('https://samples.revealbi.io/upmedia-backend/reveal-api/');

$.ig.RVDashboard.loadDashboard(dashboardName, (dashboard) => {

var revealView = new $.ig.RevealView("#" + viewId);

revealView.dashboard = dashboard;

});

}
```

### **Paso 6: Cargar paneles**

En esta aplicación Blazor, va a cargar los paneles en un **<div>** llamado **revealView**. Siga estos pasos para cargar los paneles de muestra de la carpeta **Dashboards** en su aplicación.

1. En **Pages\Index.Razor**, agregue esta declaración using:

```generic
@inject IJSRuntime JSRuntime
```

2. Agregue el código para el menú desplegable que utilizará para seleccionar el panel a cargar:

```generic
<select @onchange="selectedDashboardChanged"> 
    <option>Campaigns</option> 
    <option>Healthcare</option> 
    <option>Manufacturing</option> 
    <option>Marketing</option> 
    <option>Sales</option> 
</select> 
```

3. Agregue la div revealView:

```generic
<div id="revealView" style="width:100%; height:750px"></div> 
```

4. Agregue código que cargue el panel de Campañas en la primera carga

```generic
@code { 
    protected override async Task OnAfterRenderAsync(bool firstRender) 
    { 
        if (firstRender) 
        { 
            await JSRuntime.InvokeVoidAsync("loadRevealView", "revealView", "Campaigns"); 
        } 
    }
} 
```

5. Observe los cambios en el Select para cargar el panel correcto:

```generic
async void selectedDashboardChanged(ChangeEventArgs e) 
    { 
        await JSRuntime.InvokeVoidAsync("loadRevealView", "revealView", e.Value!.ToString()); 
    } 
} 
```

### **Paso 7: Ejecutar su aplicación**

En este punto, todos los pasos están completados para habilitar potentes funciones de BI en su aplicación Blazor. ¡Ejecute su aplicación para ver los resultados!

![](/images/2023/06/image-1024x704.png)

Para el tutorial completo, vea este video que lo guía a través de los pasos de integración de análisis en sus aplicaciones Blazor con Reveal.

[https://www.youtube.com/watch?v=OMddgybtDi8](https://www.youtube.com/watch?v=OMddgybtDi8)

Asegúrese de ver nuestros otros videos, en [nuestro canal de YouTube](https://www.youtube.com/@RevealBI), para obtener más información detallada sobre analítica integrada y inteligencia de negocios y la importancia de los datos para las empresas. Cubrimos temas como [integración de análisis en Angular](/blog/embedding-bi-in-angular-apps), [aplicaciones React con Node.js,](/blog/embedding-self-service-bi-in-react-apps-with-node-js) y aplicaciones HTMP de JavaScript, creación de paneles de BI integrados, y más. Recuerde suscribirse para ver todos los videos futuros de nuestros expertos.

Y si está intentando integrar análisis en sus aplicaciones Blazor con Reveal pero se encuentra con algún problema en el camino, póngase en contacto con nuestro equipo de producto a través de [nuestro canal de Discord](https://discord.com/invite/Ped3sSK5Xw).

También puede obtener más información sobre Reveal y cómo funciona [programando un recorrido gratuito por el producto](/request-demo). Alternativamente, también puede [descargar nuestro SDK](/download-sdk) para probarlo usted mismo.

\[cta\_banner type='{TYPE}' headline='Start Making Data-Driven Decisions' msg= 'Bring the power of BI to all your business users starting today.' button\_text= 'LEARN MORE' button\_link='[https://www.revealbi.io/request-demo](https://www.revealbi.io/request-demo)' class='banner--embedded']
