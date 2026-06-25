---
title: "How to Use Multi-Tenancy Data in Embedded Analytics"
description: "The multi-tenancy services reduce the complexity and customizations that are often required when embedding BI into your OEM software, ERP application, or other SaaS applications."
date: "2021-09-23"
author: "Bilyana Petrova"
cover: "/images/2021/09/multi-tenant-data-in-embedded-analytics.png"
summary: "The multi-tenancy services reduce the complexity and customizations that are often required when embedding BI into your OEM software, ERP application, or other SaaS applications. Its capabilities allow you to easily maintain data isolation while supporting multiple tasks within the same account or organization at the same time."
categories:
  - "SaaS Analytics Trends"
seo:
  title: "How To Use Multi-Tenancy Data In Embedded Analytics?"
  description: "The multi-tenancy services reduce the complexity and customizations that are often required when embedding BI into your OEM software, ERP application, or other SaaS applications."
  ogTitle: "How To Use Multi-Tenancy Data In Embedded Analytics?"
  ogDescription: "The multi-tenancy services reduce the complexity and customizations that are often required when embedding BI into your OEM software, ERP application, or other SaaS applications."
  ogType: "article"
  twitterTitle: "How To Use Multi-Tenancy Data In Embedded Analytics?"
  twitterDescription: "The multi-tenancy services reduce the complexity and customizations that are often required when embedding BI into your OEM software, ERP application, or other SaaS applications."
  ogImage: "/images/2021/09/multi-tenant-data-in-embedded-analytics.png"
---

With the rise and spread of cloud computing platforms, organizations are increasingly considering hosting analytics applications on shared infrastructure. Multi-tenant architecture is what they have been seeking and what weighs their decision to make the move – it leverages shared resources, saves time and worries, and lowers operational costs.

This article describes the meaning of multi-tenant data architecture, points out its benefits, and walks you through how you can use multi-tenancy data in an [embedded analytics solution](/embedded-analytics).

<p class="text-center"><a class="btn btn-primary trackCTA" href="https://www.revealbi.io/request-demo" data-xd-ga-label="Reveal Demo" data-xd-ga-action="Request Demo" target="_blank" rel="noopener">See Reveal in Action</a></p>

## What Is Multi-Tenancy?

Multi-tenancy is a software architecture in which a single instance serves multiple clients called tenants. It is the opposite of single-tenancy architecture in which the software instance serves only one client.

Multi-tenant architecture is a feature in many types of public cloud computing, one of the best examples of which is the [SaaS](/blog/embedded-analytics-for-saas-companies) (software as a service) offerings. The tenants of a multi-tenant architecture typically have the ability to customize some parts of the application. They might be able to [customize the look and feel of the application to meet their brand customer experience](/blog/white-label-analytics) and control the access permissions and restrictions of users. Tenants cannot customize the application’s code.

One easy way to understand exactly what a multi-tenancy is is to think of the [banking industry](/banking-analytics) and how it works. This example is often used to describe the meaning of multi-tenancy as it really gives a clearer understanding of it:

Banks are [financial institutions](/finance-analytics) that manage deposits, make loans, and store people’s money. They can store the money of hundreds and thousands of people completely separately, regardless of the fact that they’re actually stored in the same place. These people don’t have access to other people’s accounts and don’t interact in any way with one another. It is basically the same when using a multi-tenant architecture. Customers of the software vendor use the same infrastructure and the same servers; however, their business logic and data are entirely separated and secure.

![what is multi-tenancy?](/images/2021/09/multi-tenant-architecture.png)

## What Are the Benefits of Multi-Tenancy?

Investing in a multi-tenant SaaS application comes with its fair share of advantages. The benefits of multi-tenant architecture vs third-party hosted, single-tenant applications include the following:

![multi-tenancy architecture benefits for embedded analytics applications](/images/2021/09/benefits-of-multi-tenancy.png)

### Lower Costs

When multiple customers share the same infrastructure and servers, a software vendor can offer its services at a much lower price to that group of people compared to providing its own dedicated infrastructure to each customer. The multi-tenant software architecture also allows resources to be efficiently consolidated and allocated, saving operational costs.

### Ongoing Updates & Maintainance

SaaS applications often make updates to their services, add new features and functionalities, and maintain their software up to date. With a multi-tenant architecture, customers don’t need to pay costly fees for maintenance and upgrades, as those are usually included with the software subscription.

All additional costs get shared by all tenants using the same infrastructure, which reduces the overall cost for each tenant.

### It Saves Time

Signing up for a multi-tenant SaaS application means that it’s not your hardware to manage and worry about anymore. You get the latest software version pushed to you by the provider, saving a lot of time and expenses. By freeing your IT’s time, they can focus on other important tasks, issues, and innovations.

### Scalability

In multi-tenant architecture applications, the server space scales up and down based on the tenant’s strength meaning that the vendor does not need to build a new data center for each tenant like in the single-tenant solutions.

And that’s not all. Some additional multi-tenancy benefits include the advantage of using advanced capabilities such as IoT, AI, and [machine learning](/glossary/machine-learning). Quality is guaranteed as well – for the software to be viable in a multi-tenant environment, it has to meet certain quality control standards. It can also help streamline workflow processes by adopting industry best practices built right into the solutions.

## How to Use Multi-Tenancy Data in Embedded Analytics?

So, you want to provide analytics to your customers and add dashboards and charts into your app – great! [Embedded analytics has many benefits](/blog/benefits-of-embedded-analytics), but it’s important to make sure that when embedding an analytics solution to your web application or software, different users and customers shouldn’t be able to access and see any data that isn’t theirs. Embedded analytics vendors ensure data is private and protected by offering a multi-tenant architecture as a part of their solution.

It’s worth mentioning that modern [BI](/glossary/business-intelligence) platforms support integrated security and deployment frameworks that work seamlessly in multi-tenant host environments. That is to say that by using multi-tenancy data in embedded analytics, you get an [embeddable BI](/glossary/embedded-bi-business-intelligence) platform that perfectly fits into your SaaS architecture all while extending the value of your core product/service.

The multi-tenancy services reduce the complexity and customizations that are often required when embedding BI into your [OEM software](/glossary/oem-software), [ERP application](/blog/erp-and-embedded-analytics), or other SaaS applications. Its capabilities allow you to easily maintain data isolation while supporting multiple tasks within the same account or organization at the same time. For example, if you’re an [ISV](/isv-analytics), you can assign dedicated isolation space to different users within the same customer account. This allows these users to share content only with others that are assigned in the same isolation space, eliminating the possibility of exposing any data to other parties.

Here’s an example of two different organizations using the same embedded analytics vendor and sharing the same servers, databases, and data caches:

You can notice that everything – the data, the logos, the fonts, and the colors, is tenant-specific.

![multi tenancy data in embedded analytics](/images/2021/09/multi-tenancy-in-embedded-analytics.png)

## Is My Data Secure With Multi-Tenancy?

When delivering multi-tenant analytics solutions to your customers, you need to be able to provide each tenant with a personalized experience while at the same time keeping his data secure. Multi-tenant security in embedded analytics allows you to connect to different data models and show specific data only to authorized tenants.

A truly secure cloud solution comes with the same security measures for each user on the cloud – both internally and externally. Per-tenant firewalls are a must to ensure that every tenant in a multi-tenant architecture is protected and his data won’t be compromised. This has to be available for each tenant; otherwise, the security of each tenant could be at risk.

Another important aspect of a secure multi-tenant environment is its data center or the physical security of the hardware that houses it. If the data center that houses your hardware isn’t secure, neither is your data.

In other words, the short answer to this question is yes – typically, you don’t have anything to worry about; your data is secured with multi-tenancy. However, we strongly encourage you to do your research and get to know all architecture and security before investing in any multi-tenant SaaS application. Although these applications wouldn’t be on the market if they weren’t trustworthy, it is worth exploring your options to find a solution that best fits your needs.

## Reveal Embedded Analytics

Reveal is a multi-tenant embedded analytics solution that was built from the ground up, with your security as the #1 priority. Reveal’s server has the ability to separate data and services based on tenants, so you can rest assured that your data is well protected.

A given organization, for example, might be configured to use a separate storage area, which means all data (teams, dashboards, and even cached data) will be stored on dedicated storage, and even services at runtime might be isolated. This ensures that the performance of that organization will not be affected by the load of the rest of the system.

<div class="text-left banner banner--embedded text-white">
      <p class="banner__headline">Get Started Today</p>
      <p class="banner__msg">Leverage shared resources, save time, and lower operational costs with Reveal multi-tenancy architecture.</p>
      <a href="https://www.revealbi.io/request-demo" class="btn btn-secondary trackCTA" data-xd-ga-action="CTA Banner" data-xd-ga-label="default" target="_blank" rel="noopener">SEE HOW IT WORKS</a>
    </div>
