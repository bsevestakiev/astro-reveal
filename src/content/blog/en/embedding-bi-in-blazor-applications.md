---
title: "Embedding Self-Service BI in Blazor Applications"
description: "As more organizations begin offering analytical capabilities as part of their apps, embedding analytics into your Blazor applications is no longer optional. Learn how to do it"
date: "2023-06-13"
author: "Bilyana Petrova"
cover: "/images/2023/06/reveal-embed-BI-in-blazor-header-1.png"
heroImage: "/images/2023/06/reveal-embed-BI-in-blazor-internal-header.svg"
summary: "As more organizations begin offering analytical capabilities as part of their apps, embedding analytics into your Blazor applications is no longer optional."
categories:
  - "Technical Insights"
seo:
  title: "Embedding Powerful BI Into Your Blazor Apps - Reveal BI"
  description: "As more organizations begin offering analytical capabilities as part of their apps, embedding analytics into your Blazor applications is no longer optional. Learn how to do it"
  ogTitle: "Embedding Powerful BI Into Your Blazor Apps - Reveal BI"
  ogDescription: "As more organizations begin offering analytical capabilities as part of their apps, embedding analytics into your Blazor applications is no longer optional. Learn how to do it"
  ogType: "article"
  twitterTitle: "Embedding Powerful BI Into Your Blazor Apps - Reveal BI"
  twitterDescription: "As more organizations begin offering analytical capabilities as part of their apps, embedding analytics into your Blazor applications is no longer optional. Learn how to do it"
  ogImage: "/images/2023/06/reveal-embed-BI-in-blazor-header-1.png"
---

With abundant data, users have shifted to a data-first approach to guide their [decision-making process](/blog/reveal-data-driven-decision-making).

And it's easy to see why.

Integrating powerful BI with fully interactive visuals and reports into your Blazor applications makes data analytics accessible to all your end-users. With in-context, accessible data, your users can quickly extract relevant insights when needed - free from disruptions and chaos caused by switching applications or shuffling data.

As an [embedded analytics](/embedded-analytics) solution, Reveal can help you achieve that.

Reveal helps you easily and quickly embed interactive dashboards and reports in your [Blazor applications](https://www.infragistics.com/products/ignite-ui-blazor) with self-service [analytics features](/blog/embedded-analytics-features) like in-context editing, data blending, dashboard linking, calculated fields, and more.

In this article, we'll explore how you can successfully integrate embedded analytics in your Blazor apps with Reveal.

If you’re new to Reveal, you can learn more about our product by taking a tour of our website or by watching our [Reveal Product Overview video](https://www.youtube.com/watch?v=lkWA2DJsLtE).

## **Why Should You Embed Analytics in Your Blazor Apps?**

Embedding analytics in your Blazor apps allows you to view key business data in your natural workflow. It lets you easily spot trends and patterns in data that would've otherwise been missed. With access to real-time insights, you (and all your users) can make better-informed decision[s](/blog/reveal-data-driven-decision-making) that can guide your business success.

Data analytics also helps businesses to streamline workflows, manage resources and optimize processes and performance for maximum profitability. With the right data, you can also identify new product/service opportunities to increase your revenue.

<div class="alert alert-download icon--download d-block ig-show-modal my-5" data-targetid="downloadPDF1-modal"><strong>PDF:</strong> Get our FREE ‘’End-to-End Embedded BI Deployment Guide’’, which details the strategic planning, selection, development, and continuous improvement phases necessary for successful implementation. <strong><a href="https://static.infragistics.com/marketing/reveal/whitepapers/reveal-end-to-end-BI-deployment-guide.pdf" target="_blank" rel="noopener">Download the PDF here!</a></strong></div>

## **Embedding Self-Service Analytics in Your Blazor Apps with Reveal BI**

The following 7 steps will show you how easy it is to get started with enabling rich data visualizations and dashboards in your Blazor application. There are both client and server configurations that need to happen. To get started, [download the SDK](/download-sdk)

Once you've done that, let's create and enable embedded, self-service BI in your Blazor app in 7 easy steps!

### **Step 1: Create a Blazor Server App**

Since this is a Blazor Server app, open Visual Studio and create a new Blazor Server app with the defaults. Once completed, the application is created; right-click on your project, select Manage Nuget Packages, and search nuget.org for the **Reveal.Sdk.AspNetCore** nuget package, and install it to your project.

### **Step 2: Set Up Folders / Add Dashboards**

To test the Reveal SDK client, we ship sample dashboards that you can use to ensure your configuration is correct. Reveal uses a known folder structure to automatically load and save dashboards - if you use a folder named Dashboards in the root of your project, you are not required to write any additional Load / Save code.

1. Create a folder named **Dashboards**

2. Unzip and copy the sample dashboards (Marketing, Sales, Campaigns, Manufacturing) to the newly created Dashboard folder from this zip file: [https://users.infragistics.com/Reveal/sample-dashboards.zip](https://users.infragistics.com/Reveal/sample-dashboards.zip)

### **Step 3: Update Program.cs**

In **Program.cs:**

1. Add to the top of the code window:

**using Reveal.Sdk;**

2. Tell your app to use the Reveal SDK with this code and place it before the **builder.build** statement.

**builder.Services.AddControllers().AddReveal();**

### **Step 4: Add Client SDK Dependencies**

To enable Reveal client JavaScript dependencies, the **Pages\\\_layout.cshtml** file needs to be updated. Add the following code before the end of the closing **</Body>** tag.

```generic
<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>

<script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script>

<script src="https://dl.revealbi.io/reveal/libs/1.5.0/infragistics.reveal.js"></script> 
 
<script type="module"> 
    import "./js/revealview.js"; 
</script>
```

### **Step 5: Add Reveal Client Configuration JavaScript**

The Reveal SDK Client uses is configured through the RevealView. To load the RevealView, you need to add a JavaScript function on the client. This is also where you would configure any properties that should be enabled when a dashboard renders.

1. Add **js** folder in the **\\wwwroot\\** folder

2. In the **js** folder, add a JavaScript file named **revealview.js** with the following code:

```generic
window.loadRevealView = function (viewId, dashboardName) {

$.ig.RevealSdkSettings.setBaseUrl('https://samples.revealbi.io/upmedia-backend/reveal-api/');

$.ig.RVDashboard.loadDashboard(dashboardName, (dashboard) => {

var revealView = new $.ig.RevealView("#" + viewId);

revealView.dashboard = dashboard;

});

}
```

### **Step 6: Load Dashboards**

In this Blazor application, you are going to load the dashboards into a **<div>** named **revealView**. Follow these steps to load the sample dashboards from the **Dashboards** folder in your application.

1. In **Pages\\Index.Razor**, add this using statement:

```generic
@inject IJSRuntime JSRuntime
```

2. Add the code for the dropdown that you’ll use to select the dashboard to load:

```generic
<select @onchange="selectedDashboardChanged"> 
    <option>Campaigns</option> 
    <option>Healthcare</option> 
    <option>Manufacturing</option> 
    <option>Marketing</option> 
    <option>Sales</option> 
</select> 
```

3. Add the revealView div:

```generic
<div id="revealView" style="width:100%; height:750px"></div> 
```

4. Add code that loads the Campaigns dashboard on the first load

```generic
@code { 
    protected override async Task OnAfterRenderAsync(bool firstRender) 
    { 
        if (firstRender) 
        { 
            await JSRuntime.InvokeVoidAsync("loadRevealView", "revealView", "Campaigns"); 
        } 
    }
} 
```

5. Watch for changes in the Select to load the correct dashboard:

```generic
async void selectedDashboardChanged(ChangeEventArgs e) 
    { 
        await JSRuntime.InvokeVoidAsync("loadRevealView", "revealView", e.Value!.ToString()); 
    } 
} 
```

### **Step 7: Run Your Application**

At this point, all the steps are completed to enable powerful BI features in your Blazor application. Run your application to see the results!

![](/images/2023/06/image-1024x704.png)

For the full tutorial, watch this video that walks you through the steps of embedding analytics in your Blazor apps with Reveal.

https://www.youtube.com/watch?v=OMddgybtDi8

Make sure to watch our other videos, on [our YouTube channel](https://www.youtube.com/@RevealBI), for more in-depth information on embedded analytics and business intelligence and the importance of data for businesses. We cover topics like [embedding analytics in Angular](/blog/embedding-bi-in-angular-apps), [React apps with Node.js,](/blog/embedding-self-service-bi-in-react-apps-with-node-js) and JavaScript HTMP apps, creating embedded BI dashboards, and more. Remember to subscribe so you can see all future videos from our experts.

And if you're trying to embed analytics in your Blazor apps with Reveal but are facing any issues on your way, get in touch with our product team via [our Discord channel](https://discord.com/invite/Ped3sSK5Xw).

You can also learn more about Reveal and how it works by [scheduling a free product tour](/request-demo). Alternatively, you can also [download our SDK](/download-sdk) to try it yourself.

<div class="text-left banner banner--embedded text-white">
      <p class="banner__headline">Start Making Data-Driven Decisions</p>
      <p class="banner__msg">Bring the power of BI to all your business users starting today.</p>
      <a href="https://www.revealbi.io/request-demo" class="btn btn-secondary trackCTA" data-xd-ga-action="CTA Banner" data-xd-ga-label="default" target="_blank" rel="noopener">LEARN MORE</a>
    </div>
