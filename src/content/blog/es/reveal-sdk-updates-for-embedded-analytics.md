---
title: Actualizaciones del SDK de Reveal para Analítica Integrada
description: >-
  Las nuevas funciones incluyen mayor flexibilidad en cómo usar las herramientas
  de información sobre herramientas (Tooltips) en las visualizaciones, y
  actualizaciones de temas para que coincidan mejor con el aspecto y la
  sensación de su aplicación.
date: '2020-05-11'
author: Casey Ciniello
cover: >-
  /images/2020/10/business_2D00_intelligence_2D00_reveal_2D00_dashboards_2D00_tooltips.jpg
summary: >-
  Estamos emocionados de anunciar algunas nuevas actualizaciones para el SDK de
  analítica integrada de Reveal con el fin de proporcionar más personalización.
  Mostrar Tooltips Hemos añadido un nuevo evento que le dará más flexibilidad
  sobre cómo mostrar las herramientas de información sobre herramientas
  (Tooltips) en sus visualizaciones. El evento se llama
  revealView.TooltipShowing en WPF y .onTooltipShowing en Web, y se activa cada
  vez que el usuario final [&hellip;]
categories:
  - Actualizaciones del producto
seo:
  title: >-
    Actualizaciones del SDK de Reveal para Analítica Integrada Revelar Analítica
    Integrada
  description: >-
    Las nuevas funciones incluyen mayor flexibilidad en cómo usar las
    herramientas de información sobre herramientas (Tooltips) en las
    visualizaciones, y actualizaciones de temas para que coincidan mejor con el
    aspecto y la sensación de su aplicación.
  ogTitle: >-
    Actualizaciones del SDK de Reveal para Analítica Integrada Revelar Analítica
    Integrada
  ogDescription: >-
    Las nuevas funciones incluyen mayor flexibilidad en cómo usar las
    herramientas de información sobre herramientas (Tooltips) en las
    visualizaciones, y actualizaciones de temas para que coincidan mejor con el
    aspecto y la sensación de su aplicación.
  ogType: article
  twitterTitle: >-
    Actualizaciones del SDK de Reveal para Analítica Integrada Revelar Analítica
    Integrada
  twitterDescription: >-
    Las nuevas funciones incluyen mayor flexibilidad en cómo usar las
    herramientas de información sobre herramientas (Tooltips) en las
    visualizaciones, y actualizaciones de temas para que coincidan mejor con el
    aspecto y la sensación de su aplicación.
  ogImage: >-
    /images/2020/10/business_2D00_intelligence_2D00_reveal_2D00_dashboards_2D00_tooltips.jpg
source_hash: fa18fab8
source_locale: en
---
Nos emociona anunciar varias actualizaciones para el [Reveal embedded analytics](/embedded-analytics) [SDK](/blog/reveal-sdk-updates-for-embedded-analytics) con el fin de proporcionar más personalización.

## Mostrar Tooltips

Hemos añadido un nuevo evento que le dará más flexibilidad sobre cómo mostrar Tooltips en sus visualizaciones. El evento se llama *revealView\.TooltipShowing* en WPF y .*onTooltipShowing* en Web, y se activa cada vez que el usuario final pasa el cursor sobre una serie en una visualización o hace clic en la serie (como se muestra a continuación).

**![Reveal tooltip](/images/2020/10/reveal_2D00_tooltip.jpg)**

Puede elegir cancelar el evento Tooltip o modificar lo que se muestra. Algunos ejemplos incluyen:

1. Desea deshabilitar los Tooltips por completo o solo mostrarlos para visualizaciones específicas.
2. Desea mostrar datos en el Tooltip que están fuera del componente RevealView y que podrían ser más valiosos para sus espectadores.

Tenga en cuenta que este evento no se activará para visualizaciones que no admiten Tooltips, como cuadrículas, indicadores y otros.

## Fragmentos de Código para WPF y Web

En los siguientes fragmentos de código, le mostraremos cómo deshabilitar los Tooltips para una visualización y aun así obtener información adicional de los argumentos del evento cuando el usuario final pasa el cursor o hace clic en esta visualización. Los argumentos del evento incluyen información sobre la visualización que se está pasando el cursor o haciendo clic, la celda de datos exacta sobre la que se pasa el cursor o se hace clic, la fila completa de esta celda (en caso de que necesite información de otras columnas) y, por supuesto, el booleano Cancel.

**WP&#x46;****Code****&#x53;nippet:**

```
>private void RevealView_TooltipShowing(object sender, TooltipShowingEventArgs e) { if (e.Visualization.Title == "NoNeedForTooltips") { e.Cancel = true; } Debug.WriteLine($"TooltipShowing: Visualization: {e.Visualization.Title}, Cell: {e.Cell}, Row: {e.Row}"); }
```

**Fragmento de Código Web:**

```
revealView.onTooltipShowing = function (args) { if (args.visualization.title == "NoNeedForTooltips") { args.Cancel = true; } console.log("onTooltipShowing: visualization: " + args.visualization.title() + ",cell: " + args.cell.value + ", row:" + args.row.length); };
```

## Actualización de RevealTheme

Hemos añadido soporte para cambiar las esquinas de las visualizaciones y botones dentro de Reveal para que coincidan con el aspecto y la sensación de su aplicación existente. Para hacer esto, hemos añadido la propiedad booleana UseRoundedCorners a la clase RevealTheme. Cuando se establece en true (el valor predeterminado), las esquinas de los contenedores de visualización están ligeramente redondeadas. Si desea bordes más nítidos, establezca esta propiedad en false para deshabilitarla.

![Reveal dashboard - Theme Update](/images/2020/10/reveal_2D00_dashboard.jpg)

Aproveche el poder de los datos

Haga crecer su negocio con datos contextuales y en tiempo real.

[Solicitar una Demo](/request-demo)
