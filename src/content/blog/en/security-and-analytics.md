---
title: "How Reveal BI Secures Your Embedded Analytics Data"
description: "Learn how to secure your data with the Reveal embedded BI platform that includes multiple authentication methods, local caching of data, and much more."
date: "2019-07-15"
author: "Casey Ciniello"
cover: "/images/2020/10/business_2D00_intelligence_2D00_reveal_2D00_security.jpg"
summary: "The Reveal embedded business intelligence platform is based on a cloud architecture that includes multiple authentication methods, local caching of data to minimize sending of queries to servers and databases, and much more. We’ll explore these in this blog. Authentication Reveal Cloud authentication uses the OpenID Connect (OIDC) standard. The Identity Service component provides secure authentication [&hellip;]"
categories:
  - "Technical Insights"
seo:
  title: "How Reveal BI Secures Your Embedded Analytics Data - Reveal BI"
  description: "Learn how to secure your data with the Reveal embedded BI platform that includes multiple authentication methods, local caching of data, and much more."
  ogTitle: "How Reveal BI Secures Your Embedded Analytics Data - Reveal BI"
  ogDescription: "Learn how to secure your data with the Reveal embedded BI platform that includes multiple authentication methods, local caching of data, and much more."
  ogType: "article"
  twitterTitle: "How Reveal BI Secures Your Embedded Analytics Data - Reveal BI"
  twitterDescription: "Learn how to secure your data with the Reveal embedded BI platform that includes multiple authentication methods, local caching of data, and much more."
  ogImage: "/images/2020/10/business_2D00_intelligence_2D00_reveal_2D00_security.jpg"
---

The Reveal embedded business intelligence platform is based on a cloud architecture that includes multiple authentication methods, local caching of data to minimize sending of queries to servers and databases, and much more. We’ll explore these in this blog.

## Authentication

Reveal Cloud authentication uses the OpenID Connect (OIDC) standard. The Identity Service component provides secure authentication against multiple authentication sources, including Google, Office 365 and Infragistics accounts.

Reveal follows the standard flow for OIDC authentication, as you can see in the below diagram that highlights authentication using Microsoft.

![Reveal Cloud authentication ](/images/2020/10/5125.Security-Blog-Authentication-Flow.png)

Note that Reveal never has access to the user’s credentials as they are entered in a page provided by the authentication provider (Google, Microsoft or Infragistics). The authentication provider then redirects the user to Reveal with an access code (step 4). Reveal then uses this code to get user information, such as the email address that identifies the user, and tokens that will be used to access other services, including Google Drive for Google accounts or SharePoint and OneDrive for Microsoft O365 accounts.

### Data Sources Authentication

Reveal supports multiple data sources such as:

- Relational databases—MS SQL Server, MySQL, and others
- Data files—CSV, Excel, and JSON from Google Drive, Dropbox, and others
- Cloud services—Salesforce, Dynamics CRM, and more

To authenticate any of these data sources is dependent on the provider and each typically requires a different authentication method. Reveal supports four types of authentication:

1. Anonymous
2. User/password
3. NTLM: user, password and domain
4. OAuth v2

### OAuth Data Sources

For those providers supporting OAuth such as Google Drive, Dropbox, OneDrive and others Reveal will redirect users to the authentication page provided by the data provider requesting permission to access its data. You can see this below:

![ Reveal authentication with OAuth Data Sources ](/images/2020/10/OAuth-Data-Sources-Diagram-Security-BLog.png)

The process is similar to that with OIDC we discussed earlier. Once authentication is complete, Reveal will store the authentication tokens in order to access the data on behalf of the user across all supported platforms.

### Data Security

To improve performance, Reveal stores cached data locally in the device, thereby minimizing the number of queries sent to the server or database. Credentials to access data sources are also stored in the device as they are requested only when the data source is configured or used for the first time.

<div class="text-left banner banner--embedded text-white">
      <p class="banner__headline">Harness the Power of Data</p>
      <p class="banner__msg">Grow your business with real-time, contextual data.</p>
      <a href="https://www.revealbi.io/request-demo" class="btn btn-secondary trackCTA" data-xd-ga-action="CTA Banner" data-xd-ga-label="embedded analytics" target="_blank" rel="noopener">Request a Demo</a>
    </div>
