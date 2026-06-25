---
title: "Creating a Population Pyramid Chart Using Stacked Bar Charts"
description: "Find out what is population pyramid chart and how to create one using stacked bar charts."
date: "2020-02-03"
author: "Casey Ciniello"
cover: "/images/2020/10/reveal-logo-gradient-1200x630-1.jpg"
summary: "In this blog, I’m going to show you how to create a population pyramid chart that provides an attractive at-a-glance view of the demographics of a country, typically broken down by male/female, though it can be used for other demographics as well.  Here’s what the final chart will look like:  Before diving into how you can create a population pyramid chart, let’s first review some of the basic chart types.  What [&hellip;]"
categories:
  - "Embedded Analytics"
seo:
  title: "How To Create A Population Pyramid Chart - Reveal BI"
  description: "Find out what is population pyramid chart and how to create one using stacked bar charts."
  ogTitle: "How To Create A Population Pyramid Chart - Reveal BI"
  ogDescription: "Find out what is population pyramid chart and how to create one using stacked bar charts."
  ogType: "article"
  twitterTitle: "How To Create A Population Pyramid Chart - Reveal BI"
  twitterDescription: "Find out what is population pyramid chart and how to create one using stacked bar charts."
  ogImage: "/images/2020/10/reveal-logo-gradient-1200x630-1.jpg"
---

In this blog, I’m going to show you how to create a population pyramid chart that provides an attractive at-a-glance view of the demographics of a country, typically broken down by male/female, though it can be used for other demographics as well. Here’s what the final chart will look like:

![population pyramid chart completed](/images/2021/02/image-4.png)

Before diving into how you can create a population pyramid chart, let’s first review some of the basic chart types.

## What are bar charts?

Let’s first start with some of the basic chart types before diving into a population pyramid chart specifically. Bar charts, similar to column and area charts, are mainly used for showing comparative data. The below example uses charts to show the variation between your different categories and is sorted in ascending order to make it clear for the end user.

![What are bar charts](/images/2021/02/image.jpeg)

## What are stacked charts?

Stacked charts extend a typical bar, column or area chart by allowing you to display comparisons of different categorical data. This gives you the ability to compare parts of a whole within your data.

![What are Stacked Charts](/images/2021/02/image-1.jpeg)

So why not use a bar chart instead?

You move into using a stacked column chart vs a bar chart when you want to see the total sum of all the variables along with breakdown of each variable.

## What is a population pyramid chart?

Pyramid charts are popular visualizations when working with demographics as they are an easy way to show the age and male/female composition of a given country. While line charts are very common when describing the growth scale of any population, pyramid charts show any changes or significant differences.

## How to create a population pyramid in Reveal

We are going to the following columns in an excel file to create our chart:

![excel file with data to create population pyramid chart](/images/2021/02/image.png)

Next we will create a stacked bar chart like so:

![polulation pyramid](/images/2021/02/image-3.png)

In order to create a pyramid we will create a calculated field so that the Male values point to the left. You can do this by clicking on the F(x) icon next to your values. Inside the calculated field we will type the following into the formular bar:

![How to create a pyramid chart with Reveal BI](/images/2021/02/image-2.png)

After you hit update function we will click the original male field and uncheck the is visible box:

![how to create a pyramid chart
](/images/2021/02/image-1.png)

The end result will be a population pyramid chart like the following:

![population pyramid chart completed](/images/2021/02/image-4.png)

Learn About Other Charts and Visualizations

We created the various charts in this blog using Reveal business intelligence software. Learn about the features you get with Reveal and how to create other charts, dashboards, and much more.

<div class="text-left banner banner--embedded text-white">
      <p class="banner__headline">Harness the Power of Data</p>
      <p class="banner__msg">Grow your business with real-time, contextual data.</p>
      <a href="https://www.revealbi.io/request-demo" class="btn btn-secondary trackCTA" data-xd-ga-action="CTA Banner" data-xd-ga-label="embedded analytics" target="_blank" rel="noopener">Request a Demo</a>
    </div>
