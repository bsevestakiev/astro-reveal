---
title: ¡Aquí están las características de Reveal 1.6.0!
description: >-
  Presentamos visualizaciones personalizadas, filtrado interactivo de gráficos y
  una serie de otras mejoras y correcciones de errores que nos ayudan a
  brindarle la mejor solución de analítica integrada que se merece.
date: '2023-09-12'
author: Casey Ciniello
cover: /images/2023/09/reveal-sep-2023-launch-thumbnail.png
heroImage: /images/2023/09/reveal-sep-2023-launch-header_2023-09-08T14.34.47.svg
summary: >-
  Presentamos visualizaciones personalizadas, filtrado interactivo de gráficos y
  una serie de otras mejoras y correcciones de errores que nos ayudan a
  brindarle la mejor solución de analítica integrada que se merece.
categories:
  - Actualizaciones del producto
seo:
  title: >-
    Reveal 1.6.0 - Visualizaciones personalizadas y filtrado interactivo de
    gráficos
  description: >-
    Presentamos visualizaciones personalizadas, filtrado interactivo de gráficos
    y una serie de otras mejoras y correcciones de errores que nos ayudan a
    brindarle la mejor solución de analítica integrada que se merece.
  ogTitle: >-
    Reveal 1.6.0 - Visualizaciones personalizadas y filtrado interactivo de
    gráficos
  ogDescription: >-
    Presentamos visualizaciones personalizadas, filtrado interactivo de gráficos
    y una serie de otras mejoras y correcciones de errores que nos ayudan a
    brindarle la mejor solución de analítica integrada que se merece.
  ogType: article
  twitterTitle: >-
    Reveal 1.6.0 - Visualizaciones personalizadas y filtrado interactivo de
    gráficos
  twitterDescription: >-
    Presentamos visualizaciones personalizadas, filtrado interactivo de gráficos
    y una serie de otras mejoras y correcciones de errores que nos ayudan a
    brindarle la mejor solución de analítica integrada que se merece.
  ogImage: /images/2023/09/reveal-sep-2023-launch-thumbnail.png
source_hash: f0d2ca87
source_locale: en
---
¡Bienvenido a Reveal 1.6.0! Este lanzamiento trae una gran cantidad de mejoras, correcciones de errores y nuevas funciones emocionantes que refinarán la forma en que interactúas con tus datos.

En esta publicación de blog, profundizaremos en los puntos clave, con un enfoque particular en dos funciones destacadas: visualizaciones personalizadas y filtrado interactivo de gráficos.

## **Visualizaciones Personalizadas DIY con Reveal**

Con esta innovadora adición a nuestra plataforma, ahora puedes controlar los tipos de gráficos disponibles dentro de tus paneles. Adapta la experiencia para tus usuarios eliminando cualquier tipo de gráfico predeterminado que pueda no ser relevante para tus necesidades específicas. Crea grupos personalizados para organizar eficientemente los tipos de gráficos, asegurando una interfaz intuitiva y fácil de usar.

Es más, puedes incorporar instantáneamente tus visualizaciones personalizadas, repletas de nombres e iconos, con solo cuatro líneas de código, lo que trae un universo de posibilidades para mostrar tus datos de maneras nuevas y emocionantes.

1. **Actualizar Tipo de Gráfico:** [​](https://help.revealbi.io/web/chart-types.html#update-chart-type)Para actualizar un tipo de gráfico existente, encuentra el tipo de gráfico en la propiedad revealView.chartTypes . Modifica las varias propiedades del tipo de gráfico para renombrarlo, cambiar el icono o reagrupar el elemento del tipo de gráfico.

```
var barConfig = revealView.chartTypes.find(x => x.chartType == 'BarChart'); 
barConfig.title = 'My Cool Bar'; 
barConfig.icon = 'https://help.revealbi.io/img/logo.png'; 
barConfig.groups = ["Enterprise Visualizations", "HR", "Some Other Category"];
```

2. **Eliminar Tipo de Gráfico:** Elimina un tipo de gráfico encontrando el índice del elemento de tipo de gráfico que deseas eliminar y eliminándolo del array chartTypes .

```
var gridConfig = revealView.chartTypes.find(x => x.chartType == 'Grid'); 
revealView.chartTypes.splice(revealView.chartTypes.indexOf(gridConfig), 1);
```

3. **Añadir Tipo de Gráfico Personalizado:** Además de actualizar y eliminar elementos de tipos de gráficos existentes, también puedes añadir tus Visualizaciones Personalizadas como un nuevo tipo de gráfico en el menú desplegable de Tipos de Gráfico.

```
revealView.chartTypes.push({ 
    title: "Custom Viz", 
    url: "https://host/customViz.html", //provide the url to your custom visualization 
    icon: "https://help.revealbi.io/img/logo.png", 
    groups: ["Custom Visualizations"] 
});
```

## **Filtrado Interactivo de Gráficos**

El último lanzamiento 1.6.0 de Reveal presenta Filtrado Interactivo de Gráficos, una función dinámica de manipulación de datos que pone el poder de la exploración de datos en tiempo real a tu alcance. Esta experiencia fluida e intuitiva te permite filtrar todo tu panel sobre la marcha, revolucionando la forma en que interactúas con tus datos. Así es como funciona:

1. Habilita acciones de gráficos disponibles al pasar el cursor del ratón. Para activarlas, usa:

```
revealView.interactiveFilteringEnabled = true; 
$.ig.RevealSdkSettings.enableActionsOnHoverTooltip = true
```

2. Pasa el cursor y haz clic sobre cualquier punto de datos dentro de tu gráfico para filtrar dinámicamente tu panel hasta ese punto de datos específico.

3. Puedes seguir añadiendo filtros adicionales y eliminando filtros a medida que tu panel refleja tus selecciones en tiempo real.

![Reveal 1.6.0 Features Are Here!!](/images/2023/09/Tooltip-Large.gif)

Con esta función dinámica, obtendrás sin esfuerzo las ideas que necesitas para responder a tus preguntas basadas en datos, haciendo que la exploración de datos sea más atractiva e intuitiva que nunca. Dile adiós a la entrada manual de filtros y da la bienvenida a un descubrimiento de datos más dinámico y receptivo con Reveal.

## **Esto es Todo lo Nuevo en Reveal 1.6.0:**

### **Cambios Disruptivos**

**Todas las Plataformas**

- Cambios en las claves de licencia: En Reveal 1.6.0, las claves de licencia son ahora obligatorias, incluso para el modo de prueba del SDK. Este cambio garantiza una mejor seguridad y rendición de cuentas. El formato de la licencia también se ha actualizado. Comunícate con tu representante de ventas para obtener tu nueva clave de licencia o [regístrate para una clave de prueba de SDK aquí](/download-sdk).
- La propiedad availableChartTypes ha sido eliminada. Su reemplazo es la propiedad ‘chartTypes’ descrita en la sección ‘Nuevas Funciones’ a continuación.
- Se ha eliminado la dependencia de ‘libgdiplus’ para mejorar nuestro rendimiento multiplataforma.
- El SDK ya no depende de Quill.js.

**ASP.NET**

- La mayoría de las fuentes de datos han sido eliminadas del paquete principal. Ahora están disponibles como paquetes separados. Los paquetes de fuentes de datos son OBLIGATORIOS para ser [registrados](https://help.revealbi.io/web/datasources/index.html#installing-data-sources). La información sobre las fuentes de datos compatibles y los paquetes nuget de complemento correspondientes se puede encontrar [aquí](https://help.revealbi.io/web/datasources/index.html#supported-data-sources).
- Reveal ahora requiere .NET 6.0 o posterior.
- Los objetos de datos relacionados se han movido al espacio de nombres Reveal.Sdk.Data.
- Los objetos de Fuente de Datos (ej: RVSqlServerDataSource) se han movido a sus respectivos espacios de nombres (ej: Reveal.Sdk.Data.Microsoft.SqlServer).

### **Nuevas Funciones**

**Todas las Plataformas**

- Capacidad para añadir visualizaciones personalizadas como Tipos de Gráfico en el editor de visualización. La nueva propiedad ‘chartTypes’ lo permite, así como modificar el icono, el título y el agrupamiento de los tipos de gráficos existentes, o hacerlos no disponibles.

![Chart Types represent various types of charts that can be used as a dashboard visualization](/images/2023/09/reveal-edit-dashboard-chart-types.png)

- Reveal 1.6.0 introduce una función beta que añade una capa de interactividad a tus gráficos. Al habilitar ‘Chart actions on hover’ usando $.ig.RevealSdkSettings.enableActionsOnHoverTooltip = true, puedes acceder a información y funcionalidad sin necesidad de navegar por menús, haciendo que la exploración de datos sea más rápida e intuitiva.
- Los campos calculados ahora admiten decimales especificados sin un ‘0’ inicial (ej., ‘.5’ que significa ‘0.5’), ofreciendo más flexibilidad en tus cálculos de datos. Además, BigQuery data source ahora admite varias funciones de campos calculados, añadiendo versatilidad a tus análisis.
- Se ha añadido soporte en BigQuery data source para las siguientes funciones de campos calculados: YEAR, QUARTER, MONTH, DAY, HOUR, MINUTE, SECOND, REPLACE, WEEKDAY, MONTHNAME, MONTHSHORTNAME, EMPTY, RANDBETWEEN.
- La funcionalidad de copiar y pegar ahora funciona sin problemas entre pestañas del navegador y refrescos de página, asegurando que puedas trabajar de manera eficiente sin interrupciones.
- RevealView ahora se redimensiona automáticamente cuando su contenedor cambia de tamaño, mejorando la experiencia general del usuario.
- Se ha añadido soporte para procedimientos almacenados en la fuente de datos Oracle, abriendo nuevas posibilidades para el análisis de datos.
- Reveal ahora permite unir fuentes de datos Athena, facilitando la integración y el análisis de datos de múltiples fuentes.

### **Correcciones de Errores**

**Todas las Plataformas**

Reveal 1.6.0 aborda numerosos errores y problemas para proporcionar una experiencia más fluida y confiable en todas las plataformas, incluyendo:

- Hemos resuelto el problema por el cual hacer clic en múltiples elementos de menú con funciones menuItem action solo llamaba a la última función de acción, asegurando que tus elementos de menú funcionen como se espera.
- El gráfico de dona ahora muestra correctamente las leyendas para <null> valores y representa con precisión tus datos.
- La exportación a PDF ahora se adherirá al tema asignado, asegurando una marca y un estilo consistentes en tus informes exportados.
- Ahora puedes hacer clic cómodamente en el texto “X Selected” o “Show All” dentro de un filtro, haciendo que el filtrado de datos sea más intuitivo.
- El fondo de la celda en los filtros para el texto “X Selected” o “Show All” ahora abarca todo el ancho, proporcionando una interfaz visualmente agradable y consistente.
- La fuente del tema personalizado ahora afecta correctamente a la visualización KPI, asegurando un aspecto y una sensación consistentes en tus informes.
- Se ha resuelto el error “No providerid specified…” en la fuente de datos Oracle, definido en el cliente JavaScript, para una recuperación de datos ininterrumpida.
- La barra de búsqueda en la vista de selección de datos ahora se restablece correctamente en escenarios específicos, mejorando la navegación del usuario.
- Buscar tablas en el diálogo de fuente de datos ya no causará errores ni fallos, asegurando una experiencia estable.
- Una DefaultRefreshRate de 0 ya no evitará que los recursos web de imágenes y PDF se carguen como se espera.
- El formato de número ahora se aplica consistentemente en Sparkline, tooltips de medidores y otras visualizaciones relevantes, mejorando la legibilidad de los datos.
- Hemos resuelto el problema por el cual el tooltip de los medidores no mostraba el formato de número, asegurando que tus conocimientos de datos sean más precisos y fáciles de entender.
- Hemos abordado problemas relacionados con el tipo de datos “NUMERIC”, la agregación de trimestres y la función “MOD”, asegurando que BigQuery funcione sin problemas en tu análisis.
- BigQuery carecía de agregación trimestral, pero lo hemos abordado, permitiéndote agregar datos por trimestres sin problemas.
- La función “MOD” en BigQuery no te permite usar dos tipos diferentes de datos numéricos (ej., float64 e int64).
- Se ha corregido el error ‘Function does not exist’ en Postgres cuando el esquema no está establecido en el DataSourceItem.
- Las funciones estadísticas ahora se muestran correctamente al ver los datos como una cuadrícula, proporcionando conocimientos de datos más completos.
- Exportar a XLSX para visualizaciones de gráficos ahora produce resultados precisos, manteniendo la integridad de tus datos visualizados.
- Se han resueltas inconsistencias en los estados de las casillas de verificación al desplazarse por una lista grande de conjuntos de datos en la pantalla de adición de datos de BigQuery.
- El DataSourceItem de BigQuery ahora funciona correctamente cuando el ID del proyecto se establece solo en la Fuente de Datos.
- Los datos obtenidos de celdas de Excel con formatos de fecha personalizados ya no se interpretarán erróneamente como tipos de fecha.
- La visualización Treemap ahora respeta correctamente el formato de número.
- El formato de número ahora se muestra con precisión en el tooltip de los gráficos financieros, mejorando tu experiencia de análisis de datos financieros.
- El formato de número ahora se muestra con precisión en el tooltip del gráfico Radial.
- La advertencia de límite de celdas de 100k ahora se muestra correctamente para las fuentes de datos Athena y BigQuery.
- La función Math ‘Log’ ahora funciona como se espera para las fuentes de datos Athena.

**ASP.NET**

- La funcionalidad de exportación, tanto sin cabeza como interactiva, ahora funciona sin problemas en sistemas Linux, ampliando tus opciones de compatibilidad.
- Hemos corregido problemas de compatibilidad al usar Microsoft.Data.SqlClient versión 5.0.0 o superior en proyectos ASP.NET, asegurando una integración fluida con Reveal.
- Se ha resuelto el error “Verify Credentials” en la fuente de datos Oracle, permitiendo la recuperación de datos sin errores.

**Node**

- Los encabezados de solicitud ahora funcionan correctamente para RVRESTDataSource al utilizar el SDK de Node, asegurando una conectividad y control de datos sin interrupciones.

**Java**

- Los problemas de codificación en los datos leídos de BigQuery ahora se resuelven, incluso si el conjunto de caracteres predeterminado del sistema no es UTF-8.
- Ya no encontrarás problemas de null IRVUserContext en IRVDataSourceProvider.changeDataSourceItem en la API createwidget, asegurando una experiencia de proveedor de datos más fluida.

## **Palabras Finales..**

Estas correcciones de errores y mejoras reflejan nuestro compromiso de ofrecer una [solución de analítica integrada de primer nivel](/embedded-analytics) que te permite aprovechar todo el potencial de tus datos. Reveal 1.6.0 está diseñado para optimizar tu análisis de datos, haciendo más fácil que nunca obtener información valiosa de tus datos y tomar decisiones basadas en datos, y estas nuevas funciones son otro paso en esa dirección.

Tu opinión es invaluable a medida que continuamos mejorando tu experiencia con Reveal para satisfacer tus necesidades en evolución, así que sigue enviándola.

¡Gracias por elegir Reveal!

Prueba Reveal GRATIS

Empieza hoy mismo descargando nuestro SDK.

[DOWNLOAD](/download-sdk)
