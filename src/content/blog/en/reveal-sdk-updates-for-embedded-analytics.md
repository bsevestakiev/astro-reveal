---
title: "Reveal SDK Updates for Embedded Analytics"
description: "New features include additional flexibility in how to use Tooltips in visualizations, and theme updates to better match your application's look and feel."
date: "2020-05-11"
author: "Casey Ciniello"
cover: "/images/2020/10/business_2D00_intelligence_2D00_reveal_2D00_dashboards_2D00_tooltips.jpg"
summary: "We are excited to announce a few new updates to the Reveal embedded analytics SDK in order to provide more customization. Showing Tooltips  We have added a new event that will give you more flexibility with how you show Tooltips in your visualizations. The event is called revealView.TooltipShowing in WPF and .onTooltipShowing in Web and is triggered whenever the end-user [&hellip;]"
categories:
  - "Product Updates"
seo:
  title: "Reveal SDK Updates For Embedded Analytics Reveal Embedded Analytics"
  description: "New features include additional flexibility in how to use Tooltips in visualizations, and theme updates to better match your application's look and feel."
  ogTitle: "Reveal SDK Updates For Embedded Analytics Reveal Embedded Analytics"
  ogDescription: "New features include additional flexibility in how to use Tooltips in visualizations, and theme updates to better match your application's look and feel."
  ogType: "article"
  twitterTitle: "Reveal SDK Updates For Embedded Analytics Reveal Embedded Analytics"
  twitterDescription: "New features include additional flexibility in how to use Tooltips in visualizations, and theme updates to better match your application's look and feel."
  ogImage: "/images/2020/10/business_2D00_intelligence_2D00_reveal_2D00_dashboards_2D00_tooltips.jpg"
---

We are excited to announce a few new updates to the [Reveal embedded analytics](/embedded-analytics) [SDK](/blog/reveal-sdk-updates-for-embedded-analytics) in order to provide more customization.

## Showing Tooltips

We have added a new event that will give you more flexibility with how you show Tooltips in your visualizations. The event is called *revealView.TooltipShowing* in WPF and .*onTooltipShowing* in Web and is triggered whenever the end-user hovers over a series in a visualization or clicks on the series (as shown below).

**![Reveal tooltip](/images/2020/10/reveal_2D00_tooltip.jpg)**

You can choose to either cancel the Tooltip event or modify what is shown. Some examples include:

1. You want to disable Tooltips altogether or only show them for specific visualizations.
2. You want to display data in the Tooltip that is outside of the RevealView component that might be more valuable to your viewers.

Please note that this event will not be triggered for visualizations that do not support Tooltips, such as grids, gauges, and others.

## Code Snippets for WPF and Web

In the following code snippets, we will show you how to disable Tooltips for a visualization and still get additional information from the event arguments when the end-user hovers over or clicks on this visualization. The event arguments include information about the visualization that is being hovered over or clicked on, the exact cell of data hovered over or clicked, the whole row of this cell (in case you need information from other columns), and, of course, the Cancel boolean.

**WPF****Code****Snippet:**

```
>private void RevealView_TooltipShowing(object sender, TooltipShowingEventArgs e) { if (e.Visualization.Title == "NoNeedForTooltips") { e.Cancel = true; } Debug.WriteLine($"TooltipShowing: Visualization: {e.Visualization.Title}, Cell: {e.Cell}, Row: {e.Row}"); }
```

**Web Code Snippet:**

```
revealView.onTooltipShowing = function (args) { if (args.visualization.title == "NoNeedForTooltips") { args.Cancel = true; } console.log("onTooltipShowing: visualization: " + args.visualization.title() + ",cell: " + args.cell.value + ", row:" + args.row.length); };
```

## RevealTheme Update

We have added support to change the corners of visualizations and buttons within Reveal to match the look and feel of your existing application. To do this, we’ve added the UseRoundedCorners boolean property to the RevealTheme class. When it is set to true (the default value), the corners of visualization containers are slightly rounded. If you want sharper edges, set this property to false to disable it.

![Reveal dashboard - Theme Update](/images/2020/10/reveal_2D00_dashboard.jpg)

<div class="text-left banner banner--embedded text-white">
      <p class="banner__headline">Harness the Power of Data</p>
      <p class="banner__msg">Grow your business with real-time, contextual data.</p>
      <a href="https://www.revealbi.io/request-demo" class="btn btn-secondary trackCTA" data-xd-ga-action="CTA Banner" data-xd-ga-label="embedded analytics" target="_blank" rel="noopener">Request a Demo</a>
    </div>
