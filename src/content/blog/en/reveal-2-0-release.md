---
title: "Reveal 2.0: Built for How You Actually Build Today"
description: "Reveal 2.0 is a full modernization of the Reveal Web SDK: no jQuery dependency, TypeScript-first, ESM and IIFE builds, npm or CDN install, new CosmosDB and ClickHouse connectors, stronger accessibility, and Node/Java SDK parity in Preview."
date: "2026-06-04"
author: "Casey Ciniello"
cover: "https://static.infragistics.com/marketing/reveal/blogs/launch/2026/may/reveal-new-release-2-0-header.jpg"
heroImage: "https://static.infragistics.com/marketing/reveal/blogs/what-is-self-service-bi/reveal-what-is-self-service-bi-header.svg"
summary: "Reveal 2.0 modernizes the Reveal Web SDK for current development stacks with TypeScript-first architecture, modern module support, improved accessibility, and expanded runtime parity across Node and Java in Preview."
takeaways:
  - "Reveal 2.0 removes the jQuery dependency and modernizes the Web SDK"
  - "TypeScript support is first-class with full type definitions"
  - "Both ESM and IIFE builds are available for modern and legacy module systems"
  - "Teams can install through npm or use a CDN for quick prototyping"
  - "New native connectors for Azure CosmosDB and ClickHouse are included"
  - "Node and Java SDKs now reach API feature parity with ASP.NET in Preview"
categories:
  - "Product Updates"
tags:
  - "Reveal 2.0"
  - "Web SDK"
  - "Embedded Analytics"
  - "TypeScript"
  - "Developer Experience"
seo:
  title: "Reveal 2.0: Built for How You Actually Build Today"
  description: "Reveal 2.0 is a full modernization of the Reveal Web SDK: no jQuery dependency, TypeScript-first, ESM and IIFE builds, npm or CDN install, new CosmosDB and ClickHouse connectors, stronger accessibility, and Node and Java SDK parity in Preview."
  ogTitle: "Reveal 2.0: Built for How You Actually Build Today"
  ogDescription: "Reveal 2.0 is a full modernization of the Reveal Web SDK: no jQuery dependency, TypeScript-first, ESM and IIFE builds, npm or CDN install, new CosmosDB and ClickHouse connectors, stronger accessibility, and Node and Java SDK parity in Preview."
  ogType: "article"
  twitterTitle: "Reveal 2.0: Built for How You Actually Build Today"
  twitterDescription: "Reveal 2.0 is a full modernization of the Reveal Web SDK: no jQuery dependency, TypeScript-first, ESM and IIFE builds, npm or CDN install, new CosmosDB and ClickHouse connectors, stronger accessibility, and Node and Java SDK parity in Preview."
  ogImage: "https://static.infragistics.com/marketing/reveal/blogs/launch/2026/may/reveal-new-release-2-0-header.jpg"
---

The way teams build web applications has changed. Modules replaced script tags. TypeScript became the default. npm and modern bundlers took over installation and packaging. Most of the SDKs developers reach for were rewritten to keep up.

Most of them.

Today we are shipping Reveal 2.0, a full modernization of the Reveal Web SDK. No jQuery dependency. Written in TypeScript. Ships with both IIFE and ESM builds. Installable from CDN or via npm. The same dashboards, the same end-user experience, on a foundation that fits cleanly into a 2026 build pipeline.

![Reveal 2.0 manufacturing dashboard](https://static.infragistics.com/marketing/reveal/blogs/launch/2026/may/reveal-launch-2-0-manufacturing-dashboard-body-1.webp)

<h2 style="margin-bottom: 1rem;" id="what-is-new-in-reveal-20">What Is New in Reveal 2.0</h2>

- A modern Web SDK with no jQuery dependency.
- TypeScript-first, with full type definitions out of the box.
- Both IIFE and ESM builds. Drop Reveal into whatever module system your app already uses.
- Install via CDN for quick prototyping, or via npm for production.
- New connector for Azure CosmosDB.
- New connector for ClickHouse.
- Improved accessibility across the SDK.
- Node and Java SDKs now at API feature parity with the ASP.NET SDK, available in Preview.

<h2 style="margin-bottom: 1rem;" id="why-we-rebuilt-it">Why We Rebuilt It</h2>

Reveal 1.x worked. It still works. But anyone who has spent the last few years inside a modern Vite, webpack, or esbuild project knows the friction that a jQuery-based, script-tag-only SDK introduces. It does not tree-shake cleanly. It complicates server-side rendering. It feels old in the very evaluations where customers are deciding which embedded analytics platform to bet their product on.

We had two choices: keep papering over the seams, or rebuild on the foundation our customers actually deploy onto. We took the second one.

Reveal 2.0 still does everything Reveal has always done: fast, beautiful, customizable dashboards that you embed inside your product. But now it integrates the way modern SDKs are supposed to.

<h2 style="margin-bottom: 1rem;" id="what-this-means-for-you">What This Means for You</h2>

If you are an existing Reveal customer, your upgrade path is straightforward. The same APIs you use today are still here. We have published a 1.x to 2.0 migration guide that walks through what has changed and how to update your integration. Most teams will move over in an afternoon.

If you evaluated Reveal a year or two ago and the SDK felt behind your stack, take another look. The reasons that were on the cons side of your eval sheet are now on the pros side.

If you are an engineering leader looking at embedded analytics for the first time, Reveal 2.0 gives you an SDK you can drop into a Next.js, React, Vue, or Angular project, install with the same tools you install everything else with, and ship to production without legacy baggage.

<h2 style="margin-bottom: 1rem;" id="multi-runtime-node-and-java-in-preview">Multi-Runtime: Node and Java in Preview</h2>

Reveal has always been .NET-first. With Reveal 2.0, our Node and Java SDKs now have API feature parity with the ASP.NET SDK, both available in Preview. The Java SDK is a brand-new SDK with a completely modern API, a clean break from the legacy Java SDK we previously shipped.

If your product runs on Node or Java and you have previously had to rule us out because we did not fit your stack, that is no longer the case. Sign up for Preview access and tell us what we should sharpen before GA.

<h2 style="margin-bottom: 1rem;" id="more-data-more-access">More Data, More Access</h2>

Azure CosmosDB connector: bring CosmosDB data into Reveal dashboards directly, without manual ETL or intermediate warehouses.

ClickHouse connector: for teams that have moved analytics onto a modern columnar stack, your embedded dashboards can follow.

Accessibility improvements: Reveal 2.0 makes it easier to ship dashboards in environments where WCAG compliance is non-negotiable. Talk to us about specific procurement requirements you are working against. We can help you map our coverage to your checklist.

Reveal 2.0 is the version we would want to use if we were building an embedded analytics product into our own SaaS today. We think you will feel the same.
