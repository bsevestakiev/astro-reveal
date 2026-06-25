---
title: "MongoDB Support and More in Reveal 1.6.1. Release"
description: "Reveal 1.6.1 is here, and it's all about you! Discover enhanced user experience, smoother exports, and more in our latest release."
date: "2023-10-31"
author: "Casey Ciniello"
cover: "/images/2023/10/reveal-new-release-1-7-0-thumbnail.jpg"
heroImage: "/images/2023/10/reveal-new-release-1-7-0-header.svg"
summary: "The latest Reveal release, 1.6.1, is here, packed with improvements based on your feedback."
categories:
  - "Product Updates"
seo:
  title: "MongoDB Support And More In October 2023 Release"
  description: "Reveal 1.6.1 is here, and it's all about you! Discover enhanced user experience, smoother exports, and more in our latest release."
  ogTitle: "MongoDB Support And More In October 2023 Release"
  ogDescription: "Reveal 1.6.1 is here, and it's all about you! Discover enhanced user experience, smoother exports, and more in our latest release."
  ogType: "article"
  twitterTitle: "MongoDB Support And More In October 2023 Release"
  twitterDescription: "Reveal 1.6.1 is here, and it's all about you! Discover enhanced user experience, smoother exports, and more in our latest release."
  ogImage: "/images/2023/10/reveal-new-release-1-7-0-thumbnail.jpg"
---

We’re excited to announce the release of version 1.6.1 of our [Embedded Analytics](/embedded-analytics) SDK. As always, we’re dedicated to improving your experience and making it seamless for you to integrate analytics into your applications using Reveal. Let’s dive into what’s new and updated in this release.

![MongoDB Support and More in Reveal 1.6.1. Release](/images/2023/11/reveal-launch-1-7-0-dashboard-mongodb.png)

## New Features

Your toolbox just got a little bigger:

**ASP.NET & Node:**

- **NEW DATA SOURCE:** MongoDB

**All Platforms:**

- With headless export, you can now export an individual visualization without the user interface.
- For the security-conscious, we’ve added the noopener attribute to external dashboard links.
- You can now tweak the margin between visualizations using the new VisualizationMargin property in RevealTheme to give you more control over visualization aesthetics.
- We’ve made some enhancements for those who use the single visualization mode.
- Control the dashboard title and breadcrumb with showBreadcrumb & showBreadcrumbDashboardTitle.
- New properties for showTitle in RVVisualization.
- Several new properties in RevealView are automatically set to false when in single visualization mode.
- To help streamline your SQL processes, SQL-based stored procedures will now output their query to the log and alert you of any data type mismatches.

## Breaking Changes

Here are some important changes you should be aware of:

**All Platforms:**

- When enabling single visualization mode, several properties on the RevealView are now automatically set to false. These include showChangeVisualization, canEdit, showMenu, showStatisticalFunctions, and showFilters.
- The window.revealDisableKeyboardManagement property will now default to true. This means the tab focus will no longer stop on the RevealView unless you specifically set it.
- Our Slice Charts (covering pie, funnel, and donut) have undergone a design transformation and have a new look and feel. Note: you can always restore the default using RevealSdkSettings.enableNewCharts=false

## Final Words…

We continually strive to refine and enhance our SDK; this release is no exception. That means we also fixed plenty of bugs for you, as well, that you can find in the [full release notes here](https://help.revealbi.io/web/release-notes). We hope you find these updates valuable in streamlining your development workflow and enhancing your application’s analytics capabilities.

Thanks for being a part of our developer community. Your feedback is crucial, so please don’t hesitate to share your thoughts, suggestions, or questions. If you need any product assistance or just want to share your feedback of Reveal with us, you can [contact our product team via Discord](https://discord.com/invite/Ped3sSK5Xw) or email me directly with any ideas, questions, and problems at [CaseyM@revealbi.io](mailto:CaseyM@revealbi.io).

Thank you for choosing Reveal. We look forward to helping you unlock new possibilities with your data.

<div class="text-left banner banner--embedded text-white">
      <p class="banner__headline">Try Out Reveal for FREE</p>
      <p class="banner__msg">Get started today by downloading our SDK.</p>
      <a href="https://www.revealbi.io/download-sdk" class="btn btn-secondary trackCTA" data-xd-ga-action="CTA Banner" data-xd-ga-label="default" target="_blank" rel="noopener">DOWNLOAD</a>
    </div>
