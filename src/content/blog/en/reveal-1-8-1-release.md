---
title: "Reveal 1.8.1 Release: Conditional Formatting and Redis Cache Provider Now Available"
description: "Reveal 1.8.1 introduces two major upgrades: Conditional Formatting and the Redis Cache Provider. These updates make embedded analytics faster, clearer, and easier to scale. Conditional Formatting lets users apply rule-based color logic directly to charts, turning data into instant visual insight. The Redis Cache Provider delivers enterprise-level performance with distributed in-memory caching for real-time workloads. Together, these enhancements help developers and SaaS leaders build smarter, high-performing dashboards while keeping Reveal the standard for customizable and scalable embedded BI that delivers insight without complexity."
date: "2025-11-05"
author: "Casey Ciniello"
cover: "/images/2025/11/reveal-new-release-1-8-1-thumbnail.jpg"
heroImage: "/blogs/launch/2025/nov/reveal-new-release-nov-2025-header.svg"
summary: "Reveal 1.8.1 introduces two major upgrades: Conditional Formatting and the Redis Cache Provider. These updates make embedded analytics faster, clearer, and easier to scale. Conditional Formatting lets users apply rule-based color logic directly to charts, turning data into instant visual insight. The Redis Cache Provider delivers enterprise-level performance with distributed in-memory caching for real-time workloads. Together, these enhancements help developers and SaaS leaders build smarter, high-performing dashboards while keeping Reveal the standard for customizable and scalable embedded BI that delivers insight without complexity."
categories:
  - "Product Updates"
seo:
  title: "Reveal 1.8.1 Release: Conditional Formatting And Redis Cache Provider Now Available | Reveal Embedded Analytics"
  description: "Reveal 1.8.1 introduces two major upgrades: Conditional Formatting and the Redis Cache Provider. These updates make embedded analytics faster, clearer, and easier to scale. Conditional Formatting lets users apply rule-based color logic directly to charts, turning data into instant visual insight. The Redis Cache Provider delivers enterprise-level performance with distributed in-memory caching for real-time workloads. Together, these enhancements help developers and SaaS leaders build smarter, high-performing dashboards while keeping Reveal the standard for customizable and scalable embedded BI that delivers insight without complexity."
  ogTitle: "Reveal 1.8.1 Release: Conditional Formatting And Redis Cache Provider Now Available | Reveal Embedded Analytics"
  ogDescription: "Reveal 1.8.1 introduces two major upgrades: Conditional Formatting and the Redis Cache Provider. These updates make embedded analytics faster, clearer, and easier to scale. Conditional Formatting lets users apply rule-based color logic directly to charts, turning data into instant visual insight. The Redis Cache Provider delivers enterprise-level performance with distributed in-memory caching for real-time workloads. Together, these enhancements help developers and SaaS leaders build smarter, high-performing dashboards while keeping Reveal the standard for customizable and scalable embedded BI that delivers insight without complexity."
  ogType: "article"
  twitterTitle: "Reveal 1.8.1 Release: Conditional Formatting And Redis Cache Provider Now Available | Reveal Embedded Analytics"
  twitterDescription: "Reveal 1.8.1 introduces two major upgrades: Conditional Formatting and the Redis Cache Provider. These updates make embedded analytics faster, clearer, and easier to scale. Conditional Formatting lets users apply rule-based color logic directly to charts, turning data into instant visual insight. The Redis Cache Provider delivers enterprise-level performance with distributed in-memory caching for real-time workloads. Together, these enhancements help developers and SaaS leaders build smarter, high-performing dashboards while keeping Reveal the standard for customizable and scalable embedded BI that delivers insight without complexity."
  ogImage: "/images/2025/11/reveal-new-release-1-8-1-thumbnail.jpg"
---

**Reveal 1.8.1** introduces two major upgrades that make building embedded analytics faster, smarter, and more scalable: **Conditional Formatting** and the **Redis Cache Provider**. These updates help developers, data teams, and enterprise users deliver clearer insights and higher performance with less complexity. Whether you are enhancing dashboards with color logic or optimizing query speeds for high traffic applications, Reveal continues to set the standard for customizable embedded BI that simply works.

## **Conditional Formatting: Let Your Data Tell the Story**

![Conditional Formatting](https://static.infragistics.com/marketing/reveal/blogs/launch/2025/nov/reveal-conditional-formatting-grids.png)

Data only matters when it is clear. With Conditional Formatting, you can now apply color logic directly to charts and dashboards, making trends and outliers instantly visible.

**Key Benefits:**
• **Flexible rule-based coloring:** Apply logic-based colors for series, categories, or labels such as >=100, <AmountField, or =’SalesPersonName’.
• **No code needed:** Match visuals with business logic directly in the dashboard.
• **Works across chart types:** Ensure consistent visual design and user experience.

This gives analysts and product managers the power to highlight what matters most. Show growth in green, risk in red, and create dashboards that tell a story at a glance. Developers can now bring logic-driven design into every visualization without adding complexity.

## **Redis Cache Provider: Enterprise Speed and Scale**

![Redis Cache Provider](https://static.infragistics.com/marketing/reveal/blogs/launch/2025/nov/reveal-redis-cache-provider.png)

For organizations managing large analytics workloads, speed is non-negotiable. The new Redis Cache Provider introduces distributed in-memory caching, replacing SQLite for enterprise use, which helps teams deliver faster and more consistent performance.

**Why Redis:**

- Lightning-fast query response with in-memory caching.
- Horizontal scalability for distributed workloads.
- Configurable retry logic, expiration policies, and secure connections.

## **Easy Integration via .NET Fluent API:**

```csharp
.AddRedisCache(options =>
{
    options.ConnectionString = "your-redis-connection-string";
    options.CacheExpiration = TimeSpan.FromSeconds(30);
    options.RetryDelayMs = 200;
})
```

**NuGet Package:** Reveal.Sdk.Caching.Redis

Redis Cache Provider ensures stability and responsiveness for multi-tenant SaaS platforms and real-time reporting systems, keeping analytics running smoothly even under heavy load.

## **What’s Next for Reveal**

Reveal 1.8.1 continues our mission to make analytics integration faster, simpler, and more powerful for developers and business teams. Both Conditional Formatting and Redis Cache were shaped by customer feedback, designed to help you ship faster, scale smarter, and deliver better insights.

## **Get Started Today**

Explore the [documentation](https://help.revealbi.io/en/developer/index.html), schedule a demo, or [review the full release notes](https://help.revealbi.io/web/release-notes) for changelogs, API references, and migration details. Reveal 1.8.1 is live as of November 5, 2025. Update your SDK today to start building more powerful analytics experiences.
