---
title: >-
  ¡Tus Paneles — ¡Tu Estilo! Conoce la Nueva Tematización Personalizada en
  Reveal
description: >-
  Ver cómo aplicar tematización personalizada a Reveal, el software de BI
  integrado, y crear tu propio estilo de panel y visualización para que coincida
  con el aspecto y la sensación de tu aplicación.
date: '2020-04-24'
author: Casey Ciniello
cover: >-
  /images/2020/10/3583.business_2D00_intelligence_2D00_reveal_2D00_dashboards_2D00_custom_2D00_theming.jpg
summary: >-
  Reveal se trata de proporcionarte visualizaciones de datos listas para
  integrar con analítica integrada. Una parte importante es asegurarse de que
  los elementos que estás integrando en tus aplicaciones coincidan con el
  aspecto y la sensación. Para los usuarios de nuestra aplicación, Reveal ahora
  tiene dos temas predeterminados —Mountain y Ocean— que se ven hermosos tanto
  en claro como en [&hellip;]
categories:
  - Actualizaciones del producto
seo:
  title: Tus Paneles de Analítica Integrada — ¡Tu Estilo! Reveal Embedded Analytics
  description: >-
    Ver cómo aplicar tematización personalizada a Reveal, el software de BI
    integrado, y crear tu propio estilo de panel y visualización para que
    coincida con el aspecto y la sensación de tu aplicación.
  ogTitle: Tus Paneles de Analítica Integrada — ¡Tu Estilo! Reveal Embedded Analytics
  ogDescription: >-
    Ver cómo aplicar tematización personalizada a Reveal, el software de BI
    integrado, y crear tu propio estilo de panel y visualización para que
    coincida con el aspecto y la sensación de tu aplicación.
  ogType: article
  twitterTitle: Tus Paneles de Analítica Integrada — ¡Tu Estilo! Reveal Embedded Analytics
  twitterDescription: >-
    Ver cómo aplicar tematización personalizada a Reveal, el software de BI
    integrado, y crear tu propio estilo de panel y visualización para que
    coincida con el aspecto y la sensación de tu aplicación.
  ogImage: >-
    /images/2020/10/3583.business_2D00_intelligence_2D00_reveal_2D00_dashboards_2D00_custom_2D00_theming.jpg
source_hash: '4e429180'
source_locale: en
---
Para los usuarios de nuestra aplicación, Reveal ahora tiene dos temas listos para usar: Mountain y Ocean, que se ven hermosos tanto en modo claro como en modo oscuro. ¿Buscas integrar visualizaciones que coincidan con el tema de tu aplicación? ¡No hay problema! A través del Reveal SDK ahora puedes crear tus propios temas personalizados y controlar todos los aspectos de tus paneles.

## Nuevos temas de panel en Reveal

Para proporcionar la mejor experiencia de usuario con los nuevos temas de Mountain y Ocean, desarrollamos paletas de colores que se ven hermosas, funcionan en modo claro y modo oscuro y tienen un aspecto y una sensación modernos. ![Reveal dashboard](/images/2020/10/reveal_2D00_embedded_2D00_visualizations_2D00_dashboard_2D00_color_2D00_theming.jpg)
*El tema oceánico de Reveal*

## Paletas de colores

Cada tema dentro de la aplicación Reveal tiene 10 colores diferentes en su paleta. Al editar o crear una visualización, puedes cambiar fácilmente el color inicial seleccionando de la paleta:

![ Reveal app color palette example](/images/2020/10/2047.reveal_2D00_embedded_2D00_visualizations_2D00_color_2D00_theming_2D00_color_2D00_palette.jpg)

## Tematización personalizada al integrar analítica

Cuando se trata de integrar analítica en tus aplicaciones existentes, es clave que esos paneles coincidan con el aspecto y la sensación de tu aplicación. Por eso te damos control total sobre los paneles de Reveal a través de nuestro SDK. En comparación con la aplicación, aquí están las personalizaciones clave que puedes lograr con temas personalizados:

- **Paletas de colores**: Los colores utilizados para mostrar las series en tus visualizaciones. Puedes agregar un número ilimitado de colores. Una vez que se usan todos los colores en una visualización, Reveal autogenerará nuevos tonos de estos colores. De esta manera, tus colores no se repetirán y cada valor tendrá su propio color.
- **Color de acento**: El color de acento predeterminado en Reveal es un tono de azul que puedes encontrar en el botón + Panel y otras acciones interactivas. Puedes cambiar el color para que coincida con el mismo color de acento que utilizas en tus aplicaciones.
- **Colores de formato condicional**: Cambia los colores predeterminados de los límites que puedes establecer al usar formato condicional.
- **Fuente**: Reveal utiliza tres tipos de texto en la aplicación: regular, medio y negrita. Puedes especificar los usos de la fuente para cada uno de estos grupos de texto.
- **Colores de fondo de visualización y panel**: Puedes configurar por separado el color de fondo de tu panel y el color de fondo de las visualizaciones.

## ¿Cómo crear tu tema personalizado?

Crear tu propio tema en Reveal es tan fácil como crear una instancia de la nueva clase **RevealTheme()/$.ig.RevealTheme()**. Esta clase contiene todos los ajustes personalizables que enumeramos anteriormente.

Al crear una nueva instancia de **RevealTheme/$.ig.RevealTheme**, obtendrás los valores predeterminados para cada ajuste. Ahora, puedes modificar los ajustes que necesiten ser cambiados. Finalmente, pasa la instancia del tema al método **UpdateRevealTheme(theme)/ updateRevealTheme(theme)**. Si tienes un panel u otro componente de Reveal ya mostrado en tu pantalla, deberás volver a renderizarlo para ver los cambios aplicados.

Puede que ya hayas aplicado tu propio tema, pero quieras modificar algunos de los ajustes sin perder los cambios que hiciste en los demás.

En este caso, puedes llamar al método **GetCurrentTheme()/getCurrentTheme()**. Este método te permite obtener los últimos valores que has establecido para la configuración de tu RevealTheme. A diferencia del caso en que creas una nueva instancia de RevealTheme desde cero, después de aplicar tus cambios y actualizar tu tema de nuevo, obtendrás los valores actuales para cada ajuste que no modificaste en lugar de los valores predeterminados.

Tanto los métodos **GetCurrentTheme()/getCurrentTheme()** como **UpdateRevealTheme(theme)/ updateRevealTheme(theme)** son accesibles a través de la clase **RevealView / $.ig.RevealView**.

## Ejemplo de código

En el siguiente fragmento de código ilustramos cómo obtener tu tema actual, aplicar los cambios que deseas y actualizar el tema en Reveal.

Primero, empecemos con un ejemplo de cómo se ve una captura de pantalla antes de que hagamos cambios:

![Reveal Marketing Dashboard](/images/2020/10/reveal_2D00_embedded_2D00_dashboard_2D00_original.jpg)

Ahora usa este fragmento de código para definir tus temas personalizados:

```
var regularFont = new FontFamily(new Uri("pack://application:,,,/ [Your ProjectName];component/[pathToFonts]/"), "./#Verdana Italic"); 
var boldFont = new FontFamily(new Uri("pack://application:,,,/ [Your ProjectName];component/[pathToFonts]/"), "./#Verdana Bold"); 
var mediumFont = new FontFamily(new Uri("pack://application:,,,/ [Your ProjectName];component/[pathToFonts]/"), "./#Verdana Bold Italic"); 

var customTheme = RevealView.GetCurrentTheme(); 
customTheme.ChartColors.Clear(); 
customTheme.ChartColors.Add(Color.FromRgb(192, 80, 77)); 
customTheme.ChartColors.Add(Color.FromRgb(101, 197, 235)); 
customTheme.ChartColors.Add(Color.FromRgb(232, 77, 137); 

customTheme.BoldFont = new FontFamily("Gabriola"); 
customTheme.MediumFont = new FontFamily("Comic Sans MS"); 
customTheme.FontColor = Color.FromRgb(31, 59, 84); 
customTheme.AccentColor = Color.FromRgb(192, 80, 77); 
customTheme.DashboardBackgroundColor = Color.FromRgb(232, 235, 252); 

RevealView.UpdateRevealTheme(customTheme);
```

**Nota:** Primero debes borrar los valores predeterminados de tu ***lista de colores de gráficos***&#x64; para que se añada el nuevo conjunto de colores.

El siguiente fragmento de código ilustra cómo crear una nueva instancia de la clase revealTheme, aplicar los cambios a la configuración que deseas y actualizar el tema en Reveal Web.\*\*
***Muestra de código – Reveal Web***

```
var revealTheme = new $.ig.RevealTheme(); 
revealTheme.chartColors = ["rgb(192, 80, 77)", "rgb(101, 197, 235)", "rgb(232, 77, 137)"]; 

revealTheme.mediumFont = "Gabriola"; 
revealTheme.boldFont = "Comic Sans MS"; 
revealTheme.fontColor = "rgb(31, 59, 84)"; 
revealTheme.accentColor = "rgb(192, 80, 77)"; 
revealTheme.dashboardBackgroundColor = "rgb(232, 235, 252)"; 

$.ig.RevealView.updateRevealTheme(revealTheme);
```

**Nota:** **Uso de las opciones de fuente**

Al definir los ajustes boldFont, regularFont o mediumFont de un tema Reveal, debes pasar el nombre exacto de la familia de fuentes. El peso está definido por la definición de la fuente misma y no en el nombre. Es posible que debas usar @font-face (propiedad CSS) para asegurarte de que el nombre de la fuente especificado en la configuración de fuentes de **$.ig.RevealTheme** esté disponible.

Ahora, después de implementar nuestros cambios de tema, aquí están los nuevos resultados tanto en el Editor de Panel como en el Editor de Visualización.

![Dashboard in Reveal BI](/images/2020/10/6378.reveal_2D00_embedded_2D00_visualizations_2D00_color_2D00_theming_2D00_background_2D00_color_2D00_2.jpg)
*El Editor de Panel después de aplicar los cambios de los fragmentos de código anteriores*.

![Reveal dashboard](/images/2020/10/reveal_2D00_embedded_2D00_visualizations_2D00_dashboard_2D00_editor_2D00_2.jpg)
*El Editor de Visualización después de aplicar los cambios de los fragmentos de código anteriores.*

## Fragmentos de código para cambiar propiedades del tema

La documentación para cambiar la tematización se encuentra aquí:

[https://help.revealbi.io)

Estas son las propiedades que puedes establecer en $.ig.RevealTheme:

- chartColors
- regularFont
- mediumFont
- boldFont
- fontColor
- dashboardBackgroundColor
- visualizationBackgroundColor
- accentColor
- useRoundedCorners
- conditionalFormatting.lowColor
- conditionalFormatting.midColor
- conditionalFormatting.hiColor
- conditionalFormatting.noneColor

Aquí tienes un fragmento que modifica el tema en el SDK web:

var revealTheme = new $.ig.RevealTheme();

// Setting Standard Color / Font
revealTheme.accentColor = “rgb(15,96,69)”;
revealTheme.regularFont = “Righteous”;
revealTheme.mediumFont = “Caveat”;
revealTheme.boldFont = “Domine”;
revealTheme.fontColor = “rgb(226,24,125)”;
revealTheme.dashboardBackgroundColor = “rgb(24,224,37)”;
revealTheme.visualizationBackgroundColor = “rgb(221,224,37)”;

// Setting Conditioanl Formatting
revealTheme.conditionalFormatting.hiColor = “rgb(87,0,127)”;
revealTheme.conditionalFormatting.lowColor = “rgb(158,0,232)”;
revealTheme.conditionalFormatting.midColor = “rgb(198,137,229)”;
revealTheme.conditionalFormatting.noneColor = “rgb(255,255,127)”;

// Setting Chart Colors
revealTheme.chartColors = \[“rgb(248,53,255)”, “rgb(248,53,75)”, “rgb(54,247,160)”, “rgb(130,53,244)”, “rgb(235,242,138),rgb(239,139,219),rgb(38,116,68),rgb(108,147,178)”];

// Setting Square or Rounded look
revealTheme.useRoundedCorners = false;

// Update the Dashboard
$.ig.RevealView\.updateRevealTheme(revealTheme);

Una vez que establezcas las propiedades del Tema, llama al método **updateReveal** en **RevealView**.

$.ig.RevealView\.updateRevealTheme(revealTheme);

Para la personalización de fuentes, deberás añadir estas líneas al css de la página:

Con estos ajustes de propiedades, ¡deberías poder personalizar [Reveal embedded analytics](/embedded-analytics) para que coincida con la experiencia de cliente de marca que requieres!

Si necesitas puntos de estilo adicionales, ¡por favor házmelo saber [me know](mailto:cmcguigan@infragistics.com)!

Aprovecha el poder de los datos

Haz crecer tu negocio con datos contextuales y en tiempo real.

[Request a Demo](/request-demo)
