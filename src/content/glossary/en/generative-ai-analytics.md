---
title: "Generative AI Analytics"
heading: "Generative AI Analytics"
description: "Generative AI analytics uses large language models (LLMs) to analyze business data and generate new text outputs, such as explanations, summaries,"
seo:
  title: "Generative AI Analytics | Reveal Embedded Analytics"
  description: "Generative AI analytics uses large language models (LLMs) to analyze business data and generate new text outputs, such as explanations, summaries,"
  ogTitle: "Generative AI Analytics | Reveal Embedded Analytics"
  ogDescription: "Generative AI analytics uses large language models (LLMs) to analyze business data and generate new text outputs, such as explanations, summaries,"
  ogType: "article"
  twitterTitle: "Generative AI Analytics | Reveal Embedded Analytics"
  twitterDescription: "Generative AI analytics uses large language models (LLMs) to analyze business data and generate new text outputs, such as explanations, summaries,"
  ogImage: "/images/2020/10/reveal-logo-gradient-1200x630-1.jpg"
---

## What Is Generative AI Analytics?

Generative AI analytics uses large language models (LLMs) to analyze business data and generate new text outputs, such as explanations, summaries, or recommendations. It expands traditional reporting by producing narrative insight rather than relying only on charts or manual queries. In this context, generative AI for analytics operates within a product via [**embedded analytics**](/embedded-analytics) rather than through a separate BI tool.

This approach is a form of [**embedded BI**](http://www.revealbi.io/glossary/embedded-bi-business-intelligence), in which analytic capabilities are built into existing user interfaces. Users can explore and understand data within the context of the application they already use. The system interprets dashboards as a person would, answering questions in plain language and explaining changes, causes, and next steps.

## How Generative AI Analytics Works

Generative AI analytics interprets a user’s question, reads the data structure, and decides what action to take. The model identifies intent, such as creating a dashboard, summarizing a chart, or explaining a trend. It then uses the product’s existing logic to fetch and process data, so results stay aligned with the user’s permissions.

![How Generative AI Analytics work](https://static.infragistics.com/marketing/reveal/glossary/generative-ai-analytics/reveal-generative-ai-process.webp)

In Reveal, the AI layer works with governed [**data sources**](/data-sources) and runs inside the customer environment. It does not generate raw SQL. Instead, it creates dashboard definitions that flow through the normal authentication, filtering, and [**security**](/security) rules already in place. This keeps the user context intact for every request.

Teams can use retrieval to locate existing dashboards using stored metadata. The model searches indexed assets, returns the closest match, and renders it through the standard SDK process. This approach links natural language queries to operational BI without bypassing established workflows.

Reveal supports this process with [**AI features**](/ai) that integrate conversational queries, programmatic control, and insight generation within the product.

## Examples of Generative AI Analytics in Action

Generative AI analytics appears in many product workflows. These examples show how users interact with insight without learning complex reporting tools.

- Creating a dashboard from a plain language request, such as “create a sales and orders analysis dashboard for last year.”

- Adding a visual to an [**embedded dashboar**](/glossary/embedded-dashboard)[**d**](/glossary/embedded-dashboard) by asking for a new widget or a specific chart type.

- Summarizing a single visualization so a user can turn a metric into a short narrative for email or chat.

- Producing a full dashboard summary or analysis that explains trends, patterns, and shifts in performance.

- Editing a dashboard through natural language, such as adding filters or adjusting a view without opening the editor.

- Returning an existing visual when users search across many dashboards through stored AI metadata.

Patterns like these support stronger [**data-driven storytelling**](/glossary/data-driven-storytelling) inside products. They give users a fast way to understand what changed, why it changed, and what matters next.

## Benefits of Generative AI for Analytics

Generative AI analytics helps teams give users faster access to insight without adding complexity to their product. These benefits matter most for SaaS and ISV platforms that rely on repeat use, renewals, and clear value in [**customer-facing analytics**](/glossary/customer-facing-analytics).

![Benefits of Generative AI analytics](https://static.infragistics.com/marketing/reveal/glossary/generative-ai-analytics/reveal-benefits-generative-ai-analytics.webp)

Key benefits include:

- It reduces demand on data teams because users can ask questions directly in natural language.

- It helps non-technical users understand data by turning charts into clear explanations.

- It accelerates decision-making with faster answers to routine questions.

- It cuts development work by using the same [**embedded SDK**](/glossary/embedded-sdk) and AI intents across many screens.

- It increases product adoption by making insights easier to find and use in context.

These benefits support stronger product usage and open new paths for [**data monetization**](/blog/how-to-monetize-data-analytics-offering) through analytics features that deliver clear outcomes for end users.

## Challenges & Considerations

Generative AI analytics introduces new risks that product teams must control. These risks sit around privacy, accuracy, and governance, and they shape how AI should run inside an application.

Data privacy is the first concern. Teams must decide where models run and which data stays inside their environment. Reveal addresses this by keeping inference inside the customer’s infrastructure and by enforcing existing security rules for every AI request. Accuracy is the next challenge. Models can return incomplete or incorrect answers, so teams often use confidence scores, model tests, and spot checks to protect high-impact workflows.

Governance and reliability also matter. Teams must track model behavior, store audit history, and manage data governance for every insight. Latency affects user trust, so performance tuning and model selection both play a role. Reveal adds controls, such as metadata whitelists and domain-specific overrides, that help guide AI and keep results aligned with the underlying data structure.

These issues create a clear contrast between generative AI analytics and traditional analytics workflows.

## Generative AI vs. Traditional Analytics

Generative AI analytics changes how users explore data. Traditional analytics depends on prepared dashboards and manual queries. Generative systems add a layer that explains results, highlights changes, and answers questions in plain language. This shift changes how users work with insight and how teams design analytic features.

![Traditional vs Gen AI analytics](https://static.infragistics.com/marketing/reveal/glossary/generative-ai-analytics/reveal-traditional-vs-generative-ai.webp)

This comparison shows why many teams pair generative AI with existing dashboards instead of replacing them. It becomes a new entry point to insight, not a substitute for established analytic practices.

## Generative AI in Embedded Analytics

Generative AI gains the most value when it runs inside the product where users already work. This model keeps insight close to actions and reduces the friction of switching between tools. It also gives product teams full control over how AI behaves, how results appear, and how data stays protected.

In an embedded architecture, the application uses an analytics SDK and API driven analytics to connect AI intents to existing screens. Users might ask a question beside an operational task and receive updated charts or explanations inside the same [**embedded reporting**](/glossary/embedded-reporting) or dashboard view. This pattern supports interactive dashboards and guided flows without forcing users into a separate BI portal.

Deployment also shapes the experience. Many teams run [Reveal](https://samples.revealbi.io/reveal-sdk-samples/2020-survey-results.html) in their own environment and connect to models under their own account. This keeps all customer data inside their approved [**data sources**](/data-sources) and security rules. It also supports [**white-label analytics**](/white-label-analytics), where generative features match the host product’s design.

These capabilities improve [**embedded analytics ROI**](/glossary/embedded-analytics-roi) by turning passive visuals into conversational entry points that help users reach insight faster. When done well, generative AI becomes an operating layer over embedded analytics rather than a separate feature that sits outside the workflow.
