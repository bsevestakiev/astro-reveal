---
title: "How to Integrate Embedded Analytics in Angular Apps with .NET Core"
description: "Find out how to integrate embedded analytics into Angular applications with a .NET Core backend, for better decision-making capabilities that drive engagement and ROI."
date: "2025-01-20"
author: "Casey Ciniello"
cover: "/images/2025/01/reveal-embedded-analytics-in-angular-app-with-net-core-thumbnail.png"
heroImage: "/images/2025/01/reveal-embedded-analytics-in-angular-app-with-net-core-header-1.svg"
summary: "With Reveal, embedding analytics into your Angular app using .NET Core delivers real-time insights directly within your app’s workflows, eliminating the need for external tools or context switching. This guide makes it simple, cutting through the complexity to show you how to deliver analytics that are natural, fast, and seamless."
categories:
  - "Technical Insights"
seo:
  title: "How To Integrate Embedded Analytics On Angular Apps With .NET Core"
  description: "Find out how to integrate embedded analytics into Angular applications with a .NET Core backend, for better decision-making capabilities that drive engagement and ROI."
  ogTitle: "How To Integrate Embedded Analytics On Angular Apps With .NET Core"
  ogDescription: "Find out how to integrate embedded analytics into Angular applications with a .NET Core backend, for better decision-making capabilities that drive engagement and ROI."
  ogType: "article"
  twitterTitle: "How To Integrate Embedded Analytics On Angular Apps With .NET Core"
  twitterDescription: "Find out how to integrate embedded analytics into Angular applications with a .NET Core backend, for better decision-making capabilities that drive engagement and ROI."
  ogImage: "/images/2025/01/reveal-embedded-analytics-in-angular-app-with-net-core-thumbnail.png"
---

## Introduction to Embedded Analytics in Angular and .NET Core

Embedded analytics is no longer an optional feature—it’s a necessity for modern applications. In 2025, users demand seamless access to real-time insights directly within the tools they use daily. By integrating embedded analytics into Angular applications with a .NET Core backend, businesses can elevate their products with data-driven decision-making capabilities that drive engagement and ROI.

This guide provides a comprehensive walkthrough of embedding analytics into your software products using [Reveal Embedded Analytics](/embedded-analytics).  Whether you’re a developer integrating analytics or a product manager planning feature enhancements, this step-by-step guide provides the insights you need.

## Understanding Embedded Analytics

Embedded analytics refers to the integration of data visualization and business intelligence (BI) tools directly into software applications. Unlike standalone BI solutions, embedded analytics allows users to access insights in context without switching between platforms.

### **Why is Embedded Analytics Essential?**

- **Streamlined Workflows:**Users can analyze data and take action within a single application.

- **Improved User Experience:** Context-aware insights reduce friction and enhance decision-making.

- **Increased Product Value:** Applications equipped with analytic capabilities differentiate themselves in competitive markets.

### **Benefits of Integration**

Combining Angular’s dynamic frontend capabilities with .NET Core’s robust backend infrastructure creates a powerful client/server framework.

**Adding embedded analytics to this mix provides:**

1. **Enhanced Functionality:**Deliver actionable insights in real-time.

1. **User Retention:** Keep users engaged by addressing their analytical needs.

1. **Scalability:**Angular and .NET Core support applications designed to grow with your business.

## Setting Up the Development Environment

Integrating embedded analytics into your Angular applications with a .NET Core backend can significantly enhance the user experience by providing real-time, contextual insights.

The instructions below outline the steps to set up your development environment and seamlessly implement Reveal.

Before integrating embedded analytics, ensure your development environment is properly configured.

### **Prerequisites:**

1. **Angular CLI:**For creating and managing Angular applications.

1. **.NET Core SDK:** To build backend services.

1. **Node.js:**Required for Angular development.

1. **Reveal SDK:**To embed analytics into your application.

## **Step-by-Step Guide: Setting Up Reveal Embedded Analytics in Angular**

### ***Step 1:****Create the Angular App*

1. **Open Your Terminal:** Launch your favorite terminal application to get started

![windows terminal](/images/2025/02/image.jpg)

1. **Navigate to the Application Directory:**Change directories to the newly created app and open it in your preferred code editor (*e.g., **[Visual Studio Code](https://code.visualstudio.com/)***)

```
ng new getting-started
```

1. **Node.js:**Required for Angular development.

```
cd getting-started 

code
```

### ***Step 2:****Add the Reveal JavaScript API*

1. **Modify the index.html File**
  Open the index.html file and add the following script for the Reveal JavaScript API just before the closing </body> tag:

```
<script src="https://dl.revealbi.io/reveal/libs/1.7.1/infragistics.reveal.js"></script>
```

1. **Install Additional Dependencies**
  Include the following required libraries in the same file:

  **jQuery 2.2 or Greater:**

```
<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
```

**Day,js 1.8.15 or Greater:**

```
<script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script>
```

**Update the Final index.html**
Your index.html file should now look like this:

```
<!doctype html> 
<html lang="en"> 
<head> 
  <meta charset="utf-8"> 
  <title>GettingStarted</title> 
  <base href="/"> 
  <meta name="viewport" content="width=device-width, initial-scale=1"> 
  <link rel="icon" type="image/x-icon" href="favicon.ico">   
</head> 
<body> 
  <app-root></app-root> 
 
  <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script> 
  <script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script> 
  <script src="https://dl.revealbi.io/reveal/libs/1.7.1/infragistics.reveal.js"></script> 
</body> 
</html>
```

### ***Step 3:****Initialize the Reveal View*

**Update the HTML Component**
Open the src/app/app.component.html file, delete its contents, and add the following <div> to create a placeholder for the Reveal view:

```
<div #revealView style="height: 100vh; width: 100%; position:relative;"></div>
```

**Update the HTML Component**
Open the src/app/app.component.html file to make the following updates:

Declare jQuery: At the top of the file, declare a variable to ensure TypeScript can compile your JavaScript:

```
declare let $: any;
```

**Add a ViewChild Property:** Reference the revealView defined in the HTML file:

```
@ViewChild('revealView') el!: ElementRef;
```

**

**Implement the AfterViewInit Interface:** Initialize the Reveal view in the ngAfterViewInit lifecycle method:

```
ngAfterViewInit(): void { 
 
var revealView = new $.ig.RevealView(this.el.nativeElement); }
```

**Final app.component.ts: Your complete TypeScript component should look like this:**

```
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core'; 
declare let $: any; 
@Component({ 
  selector: 'app-root', 
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.scss'] 
}) 
export class AppComponent implements AfterViewInit { 
  @ViewChild('revealView') el!: ElementRef; 
  ngAfterViewInit(): void { 
    var revealView = new $.ig.RevealView(this.el.nativeElement); 
  } 
}
```

**Set the Reveal SDK Base URL:**
If your client app is hosted on a different URL from the server, ensure you set the base URL:

### ***Step 4:****Run the Application*

**Start the Application**
In the terminal, run the following command:

```
npm: npm start 
Yarn: yarn start 
Pnpm:pnpm start
```

**Test Your Application**
Once the application starts, open it in your browser. The Reveal view should initialize successfully.

**Congratulations!**

You’ve successfully created your first Reveal SDK Angular application. With this setup, you’re ready to leverage the power of embedded analytics to enhance your users’ experience and drive actionable insights.

<div class="text-left banner banner--embedded text-white">
      <p class="banner__headline">Harness the Power of Data</p>
      <p class="banner__msg">Grow your business with real-time, contextual data.</p>
      <a href="https://www.revealbi.io/request-demo" class="btn btn-secondary trackCTA" data-xd-ga-action="CTA Banner" data-xd-ga-label="embedded analytics" target="_blank" rel="noopener">Request a Demo</a>
    </div>

## Best Practices and Considerations

**Security Measures**

- **Authentication:** Implement robust authentication mechanisms like OAuth or JWT to protect sensitive data.

- **Data Access Control:** Use role-based permissions to ensure users access only what they’re authorized to view.

- **HTTPS:** Always use secure connections for data transmission.

**Performance Optimization**

- **Data Caching:** Reduce server load by caching frequently accessed data.

- **Lazy Loading:**Load dashboards and components only when needed to improve app speed.

- **Backend Optimization:**Optimize database queries to handle large datasets efficiently.

## Conclusion

Integrating embedded analytics into Angular applications with a .NET Core backend is a game-changer for modern software products. By following this guide, you can enhance your application with robust analytics capabilities, driving value for users. Reveal Embedded Analytics makes this process seamless, offering powerful tools for embedding data visualizations, ensuring security, and optimizing performance.

Ready to take your application to the next level? Book a call on the [Reveal](https://samples.revealbi.io/reveal-sdk-samples/2020-survey-results.html) website to see how we can solve your embedded analytics needs.
