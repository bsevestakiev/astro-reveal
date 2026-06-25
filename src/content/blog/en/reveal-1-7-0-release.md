---
title: "Reveal 1.7.0: Server-Side Paging, Fixed Lines, and More"
description: "We’re excited to announce the latest Reveal release, packed with powerful new features designed to enhance your analytics capabilities while keeping you informed of critical breaking changes that may impact your applications."
date: "2024-09-30"
author: "Casey Ciniello"
cover: "/images/2024/09/reveal-sept-2024-1.7-release-header.jpg"
heroImage: "/images/2024/10/reveal-new-release-1-7-header.svg"
summary: "We’re excited to announce the latest Reveal release, packed with powerful new features designed to enhance your analytics capabilities while keeping you informed of critical breaking changes that may impact your applications."
categories:
  - "Product Updates"
seo:
  title: "Reveal 1.7.0: Server-Side Paging, Fixed Lines, And More | Reveal Embedded Analytics"
  description: "We’re excited to announce the latest Reveal release, packed with powerful new features designed to enhance your analytics capabilities while keeping you informed of critical breaking changes that may impact your applications. "
  ogTitle: "Reveal 1.7.0: Server-Side Paging, Fixed Lines, And More | Reveal Embedded Analytics"
  ogDescription: "We’re excited to announce the latest Reveal release, packed with powerful new features designed to enhance your analytics capabilities while keeping you informed of critical breaking changes that may impact your applications. "
  ogType: "article"
  twitterTitle: "Reveal 1.7.0: Server-Side Paging, Fixed Lines, And More | Reveal Embedded Analytics"
  twitterDescription: "We’re excited to announce the latest Reveal release, packed with powerful new features designed to enhance your analytics capabilities while keeping you informed of critical breaking changes that may impact your applications. "
  ogImage: "/images/2024/09/reveal-sept-2024-1.7-release-header.jpg"
---

## **Breaking Changes: What You Need to Know**

As we continue to evolve and improve Reveal, there are some important breaking changes that will affect specific platforms. Please review these changes closely to ensure a smooth transition and optimal performance:

**Java and Spring Boot Updates**

Spring Boot 2.x is no longer supported. To stay compatible, you’ll need to update your application to use Spring Boot 3.x with JDK 17+ and a Jakarta EE 9-compliant server for hosting. This change reflects our commitment to maintaining high standards in compatibility and performance and leveraging the latest frameworks and technologies for your applications.

## **New Features for All Platforms**

This release also introduces several exciting new features across all platforms, designed to improve your visualization capabilities, data management, and overall experience in Reveal.

1. **Fixed Lines (Beta):** For enhanced clarity in data presentation, we’ve introduced the Fixed Lines feature (in beta) for category charts. With Fixed Lines, you can now mark specific values on your chart—whether it’s the highest, lowest, average, or a custom value—using data fields or predefined specialty fields. This allows for greater precision when analyzing your visualizations. To access this feature, enabledBetaFeatures in $.ig.RevealSdkSettings.

![Fixed Lines in analytitcs dashboard](/images/2024/09/reveal-fixed-lines.png)

1. **Server-Side Paging:**Managing large data sets has never been easier with Server-Side Paging. Now available without needing to enable beta features, this feature supports paging for a wide range of providers, including SQL Server, MySQL, BigQuery, PostgreSQL, SyBase, Athena, and Oracle. However, note that paging is unavailable when using [stored procedures](/blog/stored-procedures-embedded-analytics)or when server-side data processing is turned off.

![Server-Side Paging in dashboard](/images/2024/09/reveal-server-side-paging.png)

1. **Compare Filters (Beta):** Gain deeper insights by comparing filtered data directly within your visualizations using the new Compare Filters feature (in beta). Available across multiple chart types, this feature allows you to filter data and visually compare the filtered results against the original values. The supported chart types include Column, Bar, Line, Time Series, Area, Step Area, Spline, Stacked Charts, Funnel, Treemap, and Gauges.

![Compare Filters in analytics dashboard](/images/2024/09/reveal-compare-filters.gif)

1. **Visualization Level Updates:** We’ve made several important updates at the visualization level:

- Support for Dates in Visualization API: Easily manage date filters, such as “Last 7 days,” using the RVDateRange object to check date ranges.

- Visualization Descriptions: You can now add detailed descriptions to individual visualizations, improving context and clarity for your data displays.

- Dashboard Linking: Visualizations now support automatic dashboard linking, streamlining navigation and data exploration.

- Export to PDF: Each visualization can now be exported to PDF via its overflow.

These features are just the beginning. For a complete list of enhancements, new capabilities, and bug fixes, be sure to check out the full [Release Notes](https://help.revealbi.io/web/release-notes).

<div class="text-left banner banner--embedded text-white">
      <p class="banner__headline">Try Out Reveal for FREE</p>
      <p class="banner__msg">Get started today by downloading our SDK.</p>
      <a href="https://www.revealbi.io/download-sdk" class="btn btn-secondary trackCTA" data-xd-ga-action="CTA Banner" data-xd-ga-label="default" target="_blank" rel="noopener">DOWNLOAD</a>
    </div>
