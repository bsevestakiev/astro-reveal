---
title: "Embedding Self-Service BI in React Apps with Node.js"
description: "Embedding analytics into your React applications brings relevant and timely insights right within your user's workflow."
date: "2023-05-16"
author: "Bilyana Petrova"
cover: "/images/2023/05/embedding-analytics-in-react-apps-with-nodejs.png"
heroImage: "/images/2023/05/reveal-embed-BI-in-nodejs-react-internal-header.svg"
summary: "Embedding analytics into your React applications brings relevant and timely insights right within your user's workflow, promoting a data-driven culture and encouraging more analytical thinking."
categories:
  - "Technical Insights"
seo:
  title: "Embedding Self-Service BI In React Apps With Node.js"
  description: "Embedding analytics into your React applications brings relevant and timely insights right within your user's workflow."
  ogTitle: "Embedding Self-Service BI In React Apps With Node.js"
  ogDescription: "Embedding analytics into your React applications brings relevant and timely insights right within your user's workflow."
  ogType: "article"
  twitterTitle: "Embedding Self-Service BI In React Apps With Node.js"
  twitterDescription: "Embedding analytics into your React applications brings relevant and timely insights right within your user's workflow."
  ogImage: "/images/2023/05/embedding-analytics-in-react-apps-with-nodejs.png"
---

In today’s data-driven world, [integrating dashboards and analytics capabilities directly within SaaS applications](/blog/embedded-analytics-for-saas-companies) is a must. There are many [benefits to embedding analytics](/blog/benefits-of-embedded-analytics), including quicker time to market, increased productivity and performance, and growth of profits.

Embedding analytics into your React applications brings relevant and timely insights right within your user's workflow, promoting a [data-driven culture](/whitepapers/creating-data-driven-culture) and encouraging more analytical thinking.

As an [embedded analytics](/embedded-analytics) solution, Reveal can help you achieve that.

Reveal helps you to easily and quickly embed interactive dashboards and reports in your React applications with [analytics features](/blog/embedded-analytics-features) like in-context editing, data blending, dashboard linking, calculated fields, and much more.

In this article, we’ll go through how you can implement Reveal in your React-based apps with Node.js.

<div class="alert alert-download icon--download d-block ig-show-modal my-5" data-targetid="downloadPDF1-modal"><strong>PDF:</strong> Get our FREE ‘’End-to-End Embedded BI Deployment Guide’’, which details the strategic planning, selection, development, and continuous improvement phases necessary for successful implementation. <strong><a href="https://static.infragistics.com/marketing/reveal/whitepapers/reveal-end-to-end-BI-deployment-guide.pdf" target="_blank" rel="noopener">Download the PDF here!</a></strong></div>

## Why Should You Embed BI in Your React Apps?

No matter the purpose of your React app, embedded analytics capabilities will provide you with tremendous opportunities to streamline workflows, manage resources and optimize performance. BI tools such as [graphs, charts, and dashboards](/chart-types) also have the ability to improve data literacy across an organization. Data literacy, which is the ability to read, understand, create, and [communicate data as information](/glossary/data-driven-storytelling) further helps users make better and smarter decisions. [Data-driven decision-making](/blog/reveal-data-driven-decision-making) is very important as it is based on facts rather than guesses and gut feelings. With access to analytics, everyone can make more intelligent decisions confidently and at the moment of impact.

## Embedding Analytics in Your Reveal React Apps with Node.js

[Reveal embedded analytics](/embedded-analytics) helps you easily embed interactive reports, dashboards, and more into your React apps. With features like [machine learning](/glossary/machine-learning), dashboard linking, statistical functions, calculated fields, rich data analysis, self-service, [white-labeling](/blog/white-label-analytics), data blending, and more, Reveal can add a huge value to any React-based application.

More so, integrating BI into your React apps is very easy with Reveal’s native SDK, allowing you to embed analytics into your applications with no added requirements. Reveal’s flexible architecture and rich APIs give you control of the features in your app, making it a seamless part of the user experience.

So, let’s go ahead and embed analytics in your React app with the [Reveal SDK](/download-sdk).

In this tutorial, we’ll be using a Node.js server.

\*We have a Node.js server already. To learn how to create one for yourself, check out this step-by-step tutorial on how to [set up the Reveal SDK server with Node.js](https://help.revealbi.io/web/getting-started-server-node).

**1\. Add the necessary script references to index.html**

```generic
<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" type="text/css">

<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script> 
<script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script> 
<script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script> 
<script src="https://dl.revealbi.io/reveal/libs/1.3.1/infragistics.reveal.js"></script>
```

**2\. Add a <div> in app.tsx which will be used to render the RevealView**

```generic
function App() {

return (

<div id="revealView" style={{height: "100vh", width: "100%"}}></div>

);

}
```

**3\. Initialize the RevealView object in the app.tsx and load a Dashboard**

```generic
useEffect(() => {

$.ig.RVDashboard.loadDashboard(dashboardId).then((dashboard: any) => {

var revealView = new $.ig.RevealView("#revealView");

revealView.dashboard = dashboard;

});

}, [dashboardId]);
```

In just 3 easy steps, you have the basics of loading a dashboard in Reveal.  For the full tutorial, watch this video with our Sr. VP of Developer Tools, Jason Beres, walk you through step-by-step on loading and retrieving dashboards from a React app.

<iframe title="YouTube video player" src="https://www.youtube.com/embed/o1XoppSfX8E?start=2" width="635" height="355" frameborder="0" allowfullscreen="allowfullscreen"></iframe>

Make sure to watch our other videos, on [our YouTube channel](https://www.youtube.com/@RevealBI), for more in-depth information on embedded analytics and business intelligence and the importance of data for businesses. We are covering topics like [embedding analytics in Angular](/blog/embedding-bi-in-angular-apps), [Blazor](/blog/embedding-bi-in-blazor-applications), and JavaScript HTML apps, how to create an embedded BI dashboard, and more. Don’t forget to subscribe so you don’t miss any future videos from our experts.

And if you’re trying to embed analytics in your Reveal React apps with Node.js but are facing any issues on your way, get in touch with our product team via [our Discord channel](https://discord.com/invite/Ped3sSK5Xw).

You can also learn more about Reveal and how it works by [scheduling a free product tour](/request-demo). Alternatively, you can also [download our SDK](/download-sdk) to try it yourself.

<div class="text-left banner banner--embedded text-white">
      <p class="banner__headline">Start Making Data-Driven Decisions</p>
      <p class="banner__msg">Bring the power of BI to all your business users starting today.</p>
      <a href="https://www.revealbi.io/request-demo" class="btn btn-secondary trackCTA" data-xd-ga-action="CTA Banner" data-xd-ga-label="default" target="_blank" rel="noopener">LEARN MORE</a>
    </div>
