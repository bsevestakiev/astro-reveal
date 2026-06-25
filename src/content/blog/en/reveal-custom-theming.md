---
title: "Your Dashboards — Your Look! Meet the New Custom Theming in Reveal"
description: "See how to apply custom theming to Reveal embedded BI software and create your own dashboard and visualization style to match your app's look and feel."
date: "2020-04-24"
author: "Casey Ciniello"
cover: "/images/2020/10/3583.business_2D00_intelligence_2D00_reveal_2D00_dashboards_2D00_custom_2D00_theming.jpg"
summary: "Reveal is all about providing you with ready-to-integrate data visualizations with embedded analytics. An important part is making sure that the elements you are embedding into your applications match the look and feel. For our application users, Reveal now has two themes provided out of the box—Mountain and Ocean—that look beautiful in both light and [&hellip;]"
categories:
  - "Product Updates"
seo:
  title: "Your Embedded Analytics Dashboards—Your Look! Reveal Embedded Analytics"
  description: "See how to apply custom theming to Reveal embedded BI software and create your own dashboard and visualization style to match your app's look and feel."
  ogTitle: "Your Embedded Analytics Dashboards—Your Look! Reveal Embedded Analytics"
  ogDescription: "See how to apply custom theming to Reveal embedded BI software and create your own dashboard and visualization style to match your app's look and feel."
  ogType: "article"
  twitterTitle: "Your Embedded Analytics Dashboards—Your Look! Reveal Embedded Analytics"
  twitterDescription: "See how to apply custom theming to Reveal embedded BI software and create your own dashboard and visualization style to match your app's look and feel."
  ogImage: "/images/2020/10/3583.business_2D00_intelligence_2D00_reveal_2D00_dashboards_2D00_custom_2D00_theming.jpg"
---

For our application users, Reveal now has two themes provided out of the box—Mountain and Ocean—that look beautiful in both light and dark theme. Looking to embed visualizations to match your application’s theme? Not a problem! Through the Reveal SDK you can now create your own custom themes and control all aspects of your dashboards.

## New Dashboard Themes in Reveal

To provide the best user experience with the new themes of Mountain and Ocean, we developed color palettes that look beautiful, work in light mode and dark mode and have a modern look and feel. ![Reveal dashboard](/images/2020/10/reveal_2D00_embedded_2D00_visualizations_2D00_dashboard_2D00_color_2D00_theming.jpg)
*Reveal’s ocean theme*

## Color Palettes

Each theme within the Reveal application has 10 different colors in its palette. When editing or creating a visualization you can change the start color easily by choosing from the palette:

![ Reveal app color palette example](/images/2020/10/2047.reveal_2D00_embedded_2D00_visualizations_2D00_color_2D00_theming_2D00_color_2D00_palette.jpg)

## Custom Theming When Embedding Analytics

When it comes to embedding analytics into your existing applications it is key that those dashboards match your app’s look and feel. That’s why we give you full control over the Reveal dashboards through our SDK. In comparison to the application, here are the key customizations you can achieve with custom themes:

- **Color palettes**: The colors used to show the series in your visualizations. You can add an unlimited number of colors. Once all colors are used in a visualization, Reveal will autogenerate new shades of these colors. This way your colors won’t repeat and each value will have its own color.
- **Accent color**: The default accent color in Reveal is a shade of Blue that you can find in the + Dashboard button and other interactive actions. You can change the color to match the same accent color you use in your applications.
- **Conditional formatting colors**: Change the default colors of the bounds you can set when using conditional formatting.
- **Font**: Reveal uses three types of text in the application: regular, medium and bold. You can specify the font uses for each of these text groups.
- **Visualization and dashboard background colors**: You can configure separately the background color of your dashboard and the background color of the visualizations.

## How Do You Create Your Custom Theme?

Creating your own theme in Reveal is as easy as creating an instance of the new **RevealTheme()/$.ig.RevealTheme()** class. This class contains all the customizable settings we listed above.

When creating a new **RevealTheme/$.ig.RevealTheme** instance, you will get the default values for each setting. Now, you can modify the settings you need to be changed. Finally, pass the theme instance to the **UpdateRevealTheme(theme)/ updateRevealTheme(theme)** method. If you have a dashboard or another Reveal component already displayed on your screen, you will need to re-render it in order to see the applied changes.

You may have already applied your own theme but want to modify some of the settings without losing the changes you made to the others.

In this case you can call the **GetCurrentTheme()/getCurrentTheme()** method. This method enables you to get the last values you have set for your RevealTheme settings. Unlike the case when you create a new instance of the RevealTheme from scratch, after applying your changes and updating your theme again, you will get the current values for each setting you didn’t modify instead of the default values.

Both the **GetCurrentTheme()/getCurrentTheme()** and the **UpdateRevealTheme(theme)/ updateRevealTheme(theme)** methods are accessible through the **RevealView / $.ig.RevealView** class.

## Code Example

In the following code snippet we illustrate how to get your current theme, apply the changes you want and update the theme in Reveal.

First, let’s start with an example of what a screenshot looks like before we make changes:

![Reveal Marketing Dashboard](/images/2020/10/reveal_2D00_embedded_2D00_dashboard_2D00_original.jpg)

Now use this code snippet to define your custom themes:

```csharp
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

**Note:** You first need to clear your ***chart colors list***default values to have the new set of colors added.

The following code snippet illustrates how to create a new instance of the revealTheme class, apply the changes to the settings you want, and update the theme in Reveal Web.**
 
***Code Sample – Reveal Web***

```javascript
var revealTheme = new $.ig.RevealTheme(); 
revealTheme.chartColors = ["rgb(192, 80, 77)", "rgb(101, 197, 235)", "rgb(232, 77, 137)"]; 

revealTheme.mediumFont = "Gabriola"; 
revealTheme.boldFont = "Comic Sans MS"; 
revealTheme.fontColor = "rgb(31, 59, 84)"; 
revealTheme.accentColor = "rgb(192, 80, 77)"; 
revealTheme.dashboardBackgroundColor = "rgb(232, 235, 252)"; 

$.ig.RevealView.updateRevealTheme(revealTheme);
```

**Note:** **Using the font options**

When defining the boldFont, regularFont or mediumFont settings of a reveal theme you need to pass the exact font family name. The weight is defined by the definition of the font itself and not in the name. You might need to use @font-face (CSS property) to make sure the font-face name specified in the **$.ig.RevealTheme** font settings are available.

Now, after implementing our theme changes, here’s the new results in both the Dashboard and Visualization Editors.

![Dashboard in Reveal BI](/images/2020/10/6378.reveal_2D00_embedded_2D00_visualizations_2D00_color_2D00_theming_2D00_background_2D00_color_2D00_2.jpg)
*The Dashboard Editor after applying the changes from the code snippets above*.

![Reveal dashboard](/images/2020/10/reveal_2D00_embedded_2D00_visualizations_2D00_dashboard_2D00_editor_2D00_2.jpg)
*The Visualization Editor after applying the changes from the code snippets above.*

## Code Snippets to Change Theme Properties

The docs for changing theming are located here:

[https://www.revealbi.io/help/developer/rvui.wpf~infragistics.sdk.revealtheme_properties](https://www.revealbi.io/help/developer/rvui.wpf~infragistics.sdk.revealtheme_properties)

These are the properties you can set in $.ig.RevealTheme:

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

Here’s a snippet modifying the theme in the web SDK:

```javascript
var revealTheme = new $.ig.RevealTheme();

// Setting Standard Color / Font
revealTheme.accentColor = "rgb(15,96,69)";
revealTheme.regularFont = "Righteous";
revealTheme.mediumFont = "Caveat";
revealTheme.boldFont = "Domine";
revealTheme.fontColor = "rgb(226,24,125)";
revealTheme.dashboardBackgroundColor = "rgb(24,224,37)";
revealTheme.visualizationBackgroundColor = "rgb(221,224,37)";

// Setting Conditional Formatting
revealTheme.conditionalFormatting.hiColor = "rgb(87,0,127)";
revealTheme.conditionalFormatting.lowColor = "rgb(158,0,232)";
revealTheme.conditionalFormatting.midColor = "rgb(198,137,229)";
revealTheme.conditionalFormatting.noneColor = "rgb(255,255,127)";

// Setting Chart Colors
revealTheme.chartColors = ["rgb(248,53,255)", "rgb(248,53,75)", "rgb(54,247,160)", "rgb(130,53,244)", "rgb(235,242,138),rgb(239,139,219),rgb(38,116,68),rgb(108,147,178)"];

// Setting Square or Rounded look
revealTheme.useRoundedCorners = false;

// Update the Dashboard
$.ig.RevealView.updateRevealTheme(revealTheme);
```

Once you set the Theme properties, call the **updateReveal** method on the **RevealView**.

```javascript
$.ig.RevealView.updateRevealTheme(revealTheme);
```

For the fonts customization you’ll need to add these lines to the css of the page:

With these property settings, you should be able to customize [Reveal embedded analytics](/embedded-analytics) to match the brand customer experience you require!

If there are additional styling points you require, please let [me know](mailto:cmcguigan@infragistics.com)!

<div class="text-left banner banner--embedded text-white">
      <p class="banner__headline">Harness the Power of Data</p>
      <p class="banner__msg">Grow your business with real-time, contextual data.</p>
      <a href="https://www.revealbi.io/request-demo" class="btn btn-secondary trackCTA" data-xd-ga-action="CTA Banner" data-xd-ga-label="embedded analytics" target="_blank" rel="noopener">Request a Demo</a>
    </div>
