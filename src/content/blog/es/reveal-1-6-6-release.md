---
title: 'Reveal 1.6.6: Novedades en Analítica Integrada'
description: >-
  Estamos encantados de anunciar el lanzamiento de Reveal 1.6.6, que trae varias
  funciones y mejoras nuevas que mejorarán su experiencia de analítica
  integrada. ¡Encuentre más información!
date: '2024-05-01'
author: Casey Ciniello
cover: /images/2024/04/reveal-new-release-1-6-6-thumbnail.jpg
heroImage: /images/2024/04/reveal-new-release-1-6-6-header_2024-04-30T15.33.46.svg
summary: >-
  Estamos encantados de anunciar el lanzamiento de Reveal 1.6.6, que trae varias
  funciones y mejoras nuevas que mejorarán su experiencia de analítica
  integrada.
categories:
  - Actualizaciones del producto
seo:
  title: >-
    Reveal 1.6.6: Novedades en Analítica Integrada | Analítica Integrada de
    Reveal
  description: >-
    Estamos encantados de anunciar el lanzamiento de Reveal 1.6.6, que trae
    varias funciones y mejoras nuevas que mejorarán su experiencia de analítica
    integrada. ¡Encuentre más información!
  ogTitle: >-
    Reveal 1.6.6: Novedades en Analítica Integrada | Analítica Integrada de
    Reveal
  ogDescription: >-
    Estamos encantados de anunciar el lanzamiento de Reveal 1.6.6, que trae
    varias funciones y mejoras nuevas que mejorarán su experiencia de analítica
    integrada. ¡Encuentre más información!
  ogType: article
  twitterTitle: >-
    Reveal 1.6.6: Novedades en Analítica Integrada | Analítica Integrada de
    Reveal
  twitterDescription: >-
    Estamos encantados de anunciar el lanzamiento de Reveal 1.6.6, que trae
    varias funciones y mejoras nuevas que mejorarán su experiencia de analítica
    integrada. ¡Encuentre más información!
  ogImage: /images/2024/04/reveal-new-release-1-6-6-thumbnail.jpg
source_hash: b355143a
source_locale: en
---
## **Presentando Reveal 1.6.6: Mejorando su Experiencia de Análisis**

Nos emociona anunciar el lanzamiento de Reveal 1.6.6, que trae varias características y mejoras que mejorarán su experiencia de [analítica integrada](/embedded-analytics). Aquí están algunos de los puntos destacados de este lanzamiento:

## **Nuevas Características**

- **Paginación del lado del servidor**: La paginación del lado del servidor le permite limitar el número de filas enviadas al cliente al mostrar datos en una visualización de Cuadrícula (Grid). Esto mejora enormemente el rendimiento al tiempo que proporciona una buena experiencia de usuario al interactuar con grandes conjuntos de datos. Actualmente es una característica beta, ¡así que estamos buscando comentarios! Para habilitar la paginación del lado del servidor, simplemente establezca *$.ig.RevealSdkSettings.enableBetaFeatures=true* en su JavaScript cliente y en la pestaña Configuración de una visualización de Cuadrícula, verá las nuevas opciones de paginación.

![Reveal 1.6.6: What's New in Embedded Analytics](/images/2024/04/reveal-server-side-paging.png)

- **Cuadro de texto de descripción**: Ahora puede agregar contexto adicional a los paneles con el nuevo cuadro de texto de Descripción. Esto se encuentra a nivel de panel, directamente debajo del Título del panel. El cuadro de texto de Descripción sigue las mismas reglas establecidas en la propiedad *canEdit* en RevealView. Si se permite a los usuarios editar un panel, podrán editar la descripción del panel. Para mostrar u ocultar el cuadro de texto de Descripción, cambie la propiedad booleana *showDescription* en RevealView.

![Reveal 1.6.6: What's New in Embedded Analytics](/images/2024/04/reveal-description-text-box.png)

- **Exportación PDF mejorada**: La exportación PDF ha sido renovada para las visualizaciones de Cuadrícula (Grid) y Cuadrícula Dinámica (Pivot Grid). La nueva experiencia de exportación de Cuadrícula y Cuadrícula Dinámica incluye un mejor manejo de los anchos de columna, un mejor desbordamiento de columnas y filas, y un renderizado PDF actualizado para rastrear mejor las mismas filas a través de las páginas exportadas para mejorar la legibilidad.
- **Filtros de exportación**: Al exportar a PowerPoint, PDF o Microsoft Excel, ahora verá una página de portada que describe los filtros aplicados al panel. Esto garantiza que cuando se exporte su panel, el lector de ese formato exportado sabrá si está viendo todos los datos o un subconjunto de los datos.

![Reveal 1.6.6: What's New in Embedded Analytics](/images/2024/04/reveal-export-filters.png)

- **Mejorar el rendimiento de carga**: Para mejorar mejor la experiencia de carga de un esquema de datos al crear una nueva visualización, hemos añadido una bandera para mostrar las previsualizaciones de datos al pasar el cursor sobre los campos en la lista de campos de su fuente de datos. Por defecto, consultamos la fuente de datos para 5 filas de datos para mostrar una muestra de cada campo en una información sobre herramientas (tooltip). Si está utilizando procedimientos almacenados con grandes conjuntos de datos, esto podría afectar el rendimiento. Establezca *isPreviewDataInVisualizationEditorEnabled* en *true* para activar esta función de información sobre herramientas de datos. Está desactivado por defecto.
- **Combinación de datos del lado del servidor de MySQL**: MySQL ahora es compatible con la combinación de datos del lado del servidor, lo que significa que las tablas unidas ahora ejecutarán la consulta en el servidor, mejorando drásticamente el rendimiento para grandes conjuntos de datos.
- **Nuevos gráficos**: Hemos mejorado los gráficos radiales con un código actualizado y un nuevo aspecto y sensación (look & feel). Los gráficos antiguos todavía están en la biblioteca cliente, sin embargo, están obsoletos y se eliminarán permanentemente más tarde este año. Si desea conservar los gráficos anteriores, puede establecer *RevealSdkSettings.EnableNewCharts = false*.
- **Gráficos de barras y columnas actualizados**: Una nueva propiedad de Superposición y Brecha (Overlap and Gap) en el panel de Configuración del editor de visualización le permite controlar la cantidad de superposición entre las barras y las columnas, y la cantidad de espacio entre los grupos. Esta nueva configuración le permite 'fusionar' barras y columnas, brindándole nuevas formas de visualizar datos y etiquetas de datos.
- **Información sobre herramientas de visualización Treemap**: Continuamos mejorando la experiencia de la información sobre herramientas (tooltip) en Reveal. Con este lanzamiento, ahora obtiene una información sobre herramientas al pasar el cursor con resaltados en el nodo cuando el ratón se encuentra sobre él.
- **Filtro del diálogo de fuentes de datos**: En el servidor Node, agregamos una nueva propiedad *dataSourceItemFilter* a RevealOptions. Esto imita *IRVObjectFilter* en el servidor .NET Core, lo que permite filtrar elementos de fuentes de datos en el diálogo de fuentes de datos. Esta característica eleva su capacidad para establecer seguridad del lado del servidor, determinando en qué objetos de datos se permite al usuario ver al cliente.

## **Corrección de errores**

También hemos abordado varios errores para garantizar una experiencia de análisis más fluida y confiable en todas las plataformas, incluidos arreglos para gráficos circulares (Pie charts), fallos de Cuadrícula (Grid crashes), errores de combinación de datos y más. Aquí hay una lista completa:

- Los gráficos circulares y de dona no se muestran al exportar desde la UI.

- Eliminar una combinación de datos mientras un campo calculado depende de ella no eliminará el campo calculado.

- Llamar a una función en Redshift y Postgres podría producir un mensaje de error.

- Posicionamiento y dimensionamiento de RevealView al usar el estilo transform:scale en el contenedor o cualquier elemento ancestro.

- Establecer canAddDateFilter causó excepciones.

- save event args.isNew es false si la propiedad del panel se establece en null o undefined.

- La pantalla de parámetros de procedimientos almacenados a veces recuperará datos anteriores o nada en absoluto.

- El desplazamiento deja de funcionar en el elemento emergente al usar la barra de búsqueda.

- La región de pasar el cursor de los indicadores del Mapa de Dispersión cambia con el zoom.

- Los dígitos de fracción no se muestran en la información sobre herramientas del Mapa Coroplético.

- El valor del filtro superior a 3000+ no se conserva.

- Errores con campos pivot renombrados en la UI de campo post-calculado.

- La celda de datos de previsualización no se está reutilizando, lo que provoca que se renderice varias veces.

- Las Cuadrículas fallan en MacOS ARM64.

- La leyenda del gráfico circular desaparece cuando hay suficiente espacio para mostrarla.

- El evento de pasar el cursor no se comporta como se pretende en los gráficos de porciones (slice charts).

- Los totales generales no se muestran en las visualizaciones de Cuadrícula Dinámica.

- Se muestran valores de totales generales incorrectos al usar el proveedor de datos Analysis Services.

- Filtros de panel y visualización con totales generales incorrectos al usar el proveedor de datos Analysis Services.

- Las modificaciones del nombre del campo se pierden después de reordenar los valores en la Cuadrícula Dinámica.

- Error “…hierarchy already appears in the Axis1 axis.” en Analysis Services.

- Resultados incorrectos al aplicar el filtro 'Top N' en Analysis Services.

- La visualización basada en recursos recupera la entrada de caché incorrecta.

- Se golpea una entrada de caché incorrecta al usar combinación de datos.

- No se puede establecer el foco en la caja de búsqueda después de que el navegador pasa a segundo plano.

## **Actualizaciones de dependencias**

- Dependencia Playwright v1.27.2 actualizada a v1.42.0.

Pruebe Reveal GRATIS

Comience hoy mismo descargando nuestro SDK.

[DOWNLOAD](/download-sdk)
