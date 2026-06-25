---
title: "Designing Embedded Analytics Users Actually Use"
description: "🎥 Watch the full webinar: Designing Embedded Analytics Your Users Actually Use"
date: "2026-04-28"
author: "Jason Beres"
# description is a video CTA (kept for SEO meta parity with old prod); hide it
# from the visible hero subtitle so it isn't duplicated above the first paragraph.
hideHeroSubtitle: true
cover: "/images/2026/04/reveal-designing-ea-users-actually-use-thumbnail.jpg"
categories:
  - "Business Intelligence"
  - "Embedded Analytics"
seo:
  title: "Designing Embedded Analytics Users Actually Use | Reveal Embedded Analytics"
  description: "🎥 Watch the full webinar: Designing Embedded Analytics Your Users Actually Use"
  ogTitle: "Designing Embedded Analytics Users Actually Use | Reveal Embedded Analytics"
  ogDescription: "🎥 Watch the full webinar: Designing Embedded Analytics Your Users Actually Use"
  ogType: "article"
  twitterTitle: "Designing Embedded Analytics Users Actually Use | Reveal Embedded Analytics"
  twitterDescription: "🎥 Watch the full webinar: Designing Embedded Analytics Your Users Actually Use"
  ogImage: "/images/2026/04/reveal-designing-ea-users-actually-use-thumbnail.jpg"
---
<p>🎥 <strong>Watch the full webinar:</strong> <a href="https://youtu.be/-EuPiGUeDXc">Designing Embedded Analytics Your Users Actually Use</a></p>



<h2 class="wp-block-heading" id="key-takeaways">Key Takeaways</h2>



<ul class="wp-block-list">
<li>Embedded analytics adoption fails when users are forced to leave their workflow to check static dashboards.</li>



<li>Dashboard fatigue happens when every new business question creates another dashboard instead of a better analytics experience.</li>



<li>Product teams need to balance governed data with flexible exploration, especially as AI becomes part of analytics workflows.</li>



<li>A contextual layer is essential for AI analytics because it gives natural-language answers consistent business definitions.</li>



<li>An embedded analytics SDK gives SaaS teams more control than an iframe, including custom UX, single visualizations, dashboard linking, theming, and conversational analytics.</li>



<li>The future of embedded analytics is decision intelligence: proactive, explainable insights delivered where users already work.</li>
</ul>



<p></p>



<h2 class="wp-block-heading" id="the-problem-nobody-wants-to-admit-your-dashboards-arent-getting-used">The problem nobody wants to admit: your dashboards aren't getting used</h2>



<p>You bought the BI tool. You rolled it out. Your team built the dashboards. The launch email went out. And then… silence.</p>



<p>If that sounds familiar, you're not alone. At a recent industry conference, one session opened with a line that stuck with us: <em>nobody is asking for more dashboards</em>. And yet, the default response to every new business question is to build another one.</p>



<p>This is <strong>dashboard fatigue</strong>, and it follows a predictable vicious cycle:</p>



<ol class="wp-block-list">
<li>A question arises</li>



<li>A dashboard gets built</li>



<li>Follow-up questions emerge</li>



<li>Repeat indefinitely</li>
</ol>



<p>The dashboard the data team shipped on Monday is stale by Friday. The person who built it understands what every field means - your business stakeholders don't. And in a SaaS context, the cost is even higher: every time a user has to leave the workflow they're in to go "check a dashboard" somewhere else, they lose context, lose momentum, and eventually stop bothering altogether.</p>



<p>The result? An expensive BI investment that informs almost nothing.</p>



<h2 class="wp-block-heading" id="power-vs-control-the-product-teams-dilemma">Power vs. control: the product team's dilemma</h2>



<p>Every product team building embedded analytics gets caught between two failure modes:</p>



<section class="container pb-5">
  <div class="row">
    <div class="col-12">
      <div class="vibe-table-responsive-sm mw-100" style="overflow-x: auto; -webkit-overflow-scrolling: touch; position: relative;">
        <table class="table vibe-comparison-table vibe-comparison-table--2col mw-100 text-center" border="0" cellpadding="10">
          <thead>
            <tr>
              <th>Too much freedom</th>
              <th>Too much control</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Open self-service creates chaos. Six departments, six definitions of "revenue." Trust in the data erodes fast.</td>
              <td>Locked-down dashboards frustrate users who can't answer their own follow-up questions. They go build shadow analytics in Excel.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</section>



<p>Neither extreme works. The early 2000s gave us governance lockdown. The 2010s low-code era gave us shadow IT and rogue spreadsheets. Now, with AI in the mix, teams are tempted to clamp down again — and they'll lose users all over again.</p>



<p><strong>The right shift isn't more freedom or more control. It's better service.</strong> Most users don't actually want to <em>build</em> analytics. They want direct, contextual answers delivered to them, in the workflow they're already in.</p>



<h2 class="wp-block-heading" id="ease-of-use-is-a-product-strategy-not-a-feature">Ease of use is a product strategy, not a feature</h2>



<p>Here's the reframe that changes everything: in 2026, ease of use isn't a "nice-to-have." It's the strategy.</p>



<p>Think about how you bank on your phone. How you order food. How you book a flight. The consumer software bar is now the corporate software bar - and if your embedded analytics feels like enterprise software from 2008, your users will route around it.</p>



<p>Two shifts are driving this:</p>



<h3 class="wp-block-heading">1. Conversational AI is the new default interface</h3>



<p>Natural language is rapidly becoming the expected way to ask questions of data. "Show me deposits by state." "How does our actual revenue compare to monthly budget?" Users shouldn't have to learn SQL, data modeling, or your dashboard configuration tool to get an answer.</p>



<h3 class="wp-block-heading">2. Perceptive analytics replaces static reporting</h3>



<p>The next frontier isn't a prettier dashboard - it's analytics that surface insights <em>before</em> the user knows to ask. KPIs that update in context. Alerts that fire when a threshold is crossed. Notifications delivered where decisions actually happen.</p>



<p>The payoff is measurable: organizations that integrate self-service and natural language into their analytics workflows report <strong>up to a 50% drop in net-new dashboard requests</strong>, freeing engineering teams for higher-value work.</p>



<h2 class="wp-block-heading" id="design-for-three-personas-not-one">Design for three personas, not one</h2>



<p>One of the biggest mistakes in embedded analytics is treating "the user" as a single persona. In reality, you have at least three:</p>



<ul class="wp-block-list">
<li><strong>The Business Stakeholder</strong> -wants guided, plain-language answers. Doesn't want to learn a tool. Just needs to make a decision.</li>



<li><strong>The Power Analyst</strong> - wants multi-step reasoning, custom filters, drill-downs, and the ability to explore freely.</li>



<li><strong>The Developer / Builder</strong> - wants composable, programmatic access to embed analytics cleanly into existing product surfaces.</li>
</ul>



<p>If you only design for one of these, you'll lose the other two. This is exactly where an <strong>embedded analytics SDK</strong> has a structural advantage over an iframe-based BI embed: the SDK gives the developer the primitives to deliver each persona a tailored experience inside the same product, instead of dropping all three of them into the same locked-down viewer.</p>



<h2 class="wp-block-heading" id="why-context-is-king-for-embedded-ai-analytics">Why context is king for embedded AI analytics</h2>



<p>Here's where most "AI BI" stories fall apart.</p>



<p>You point an LLM at your raw schema. A user asks "what's our revenue this quarter?" The LLM cheerfully returns a number - but is it gross revenue? Net? Recognized? Booked? Including renewals? The model doesn't know, so it guesses. And because LLMs are <em>generative</em>, you'll get a slightly different guess every time.</p>



<p>That's not analytics. That's faster, prettier mistakes.</p>



<p>The fix is a <strong>contextual layer</strong> over your data - a layer that translates business meaning into data logic. With Reveal, this is configured through simple JSON or APIs that tell the AI:</p>



<ul class="wp-block-list">
<li><strong>Consistent definitions</strong> - "revenue" means <em>this field plus this field minus this field</em>, every time, across every team.</li>



<li><strong>Hallucination prevention</strong> -the AI is constrained to your governed definitions and can't fabricate metrics.</li>



<li><strong>Governed exploration</strong> - users can ask anything, but they always get answers grounded in your real business logic.</li>
</ul>



<p>This is the difference between a semantic layer (a translation layer for humans) and a contextual layer (a translation layer for AI). In the world we're now in, <strong>context is king.</strong></p>



<h2 class="wp-block-heading" id="from-insight-to-action-decision-intelligence">From insight to action: decision intelligence</h2>



<p>Even with great dashboards and great NLQ, there's still a fundamental problem: analytics still waits to be asked. The next frontier is <strong>decision intelligence</strong> - embedding explainable insights directly into the operational workflows where decisions actually get made.</p>



<p>Three patterns that matter here:</p>



<ul class="wp-block-list">
<li><strong>Proactive risk scoring</strong> - automatically flag things like customer churn risk or revenue leakage <em>while there is still time to act</em>, not in a quarterly review.</li>



<li><strong>Human-readable explanations</strong> - every recommended action comes with a plain-language rationale, so business users understand <em>why</em>, not just <em>what</em>.</li>



<li><strong>Outcome-oriented metrics</strong> - measure your analytics by how many decisions and actions it drove, not how many times somebody opened a dashboard.</li>
</ul>



<p>Because Reveal is an SDK, you can drop a single KPI visualization next to a workflow, fire a notification when a threshold is crossed, or surface a chat-driven recommendation right where the user is already working. You're not bolting on a separate "analytics zone." You're embedding intelligence into the product.</p>



<h2 class="wp-block-heading" id="what-the-live-demo-shows">What the live demo shows</h2>



<p>In the <a href="https://youtu.be/-EuPiGUeDXc">webinar walkthrough</a>, we put all of this together inside <em>Acme Analytics</em> - a fictitious SaaS app built on the Reveal SDK. A few highlights worth jumping to:</p>



<ul class="wp-block-list">
<li><strong>Single-visualization mode</strong>: KPI tiles across a homepage that are actually individual dashboards, delivering proactive answers without forcing users to "open a dashboard."</li>



<li><strong>Dashboard linking</strong>: drill from one dashboard to another with full filter context, so power analysts can follow their question instead of starting over.</li>



<li><strong>Three paths to a new dashboard</strong>: start blank (full WYSIWYG), start from a template, or start from a visualization catalog of pre-built KPIs your users can drag and drop.</li>



<li><strong>AI dashboard assistant</strong>: type "build a sales pipeline" and get a complete, governed dashboard back in seconds, grounded in your contextual layer.</li>



<li><strong>Conversational analytics</strong>: ask "what are deposits by state?" in chat, get a chart, then say "change to a tree map" - the AI keeps the conversational context and updates the visualization.</li>



<li><strong>Full theming and white-label control</strong>: light mode, dark mode, custom fonts, custom colors. Because you control the host app, the embedded experience always looks like <em>your</em> product.</li>
</ul>



<h2 class="wp-block-heading" id="why-an-embedded-analytics-sdk-beats-an-iframe-every-time">Why an embedded analytics SDK beats an iframe — every time</h2>



<p>If your only embedded analytics option is an iframe, you're stuck with whatever experience the BI vendor decided to ship. You can't tailor the UX to different personas. You can't drop a single KPI into a workflow. You can't add custom tooltip actions, custom dashboard linking, or a chat experience that lives natively in your product.</p>



<p>An SDK like Reveal flips that. You get JavaScript APIs on the client and a .NET, Java, or Node back end on the server, which means:</p>



<ul class="wp-block-list">
<li>Your developers control the experience your users see</li>



<li>You can mix dashboards, single visualizations, NLQ chat, and templates however your product needs</li>



<li>Every interaction (tooltips, menus, drill-downs) is extensible</li>



<li>The embedded analytics feels like a <em>built-in</em> feature of your SaaS app, not a bolted-on tab</li>
</ul>



<p>That's the difference between users adopting your analytics and users ignoring them.</p>



<h2 class="wp-block-heading" id="the-bottom-line">The bottom line</h2>



<p>Ease of use is not a feature. It's the strategy that determines whether your embedded analytics investment pays off or quietly dies in a backlog of "more dashboards please."</p>



<p>If you want users to actually <em>use</em> your analytics:</p>



<ol class="wp-block-list">
<li><strong>Establish an AI context layer</strong> so every answer is consistent, governed, and trustworthy</li>



<li><strong>Make natural language the default interface</strong> so users ask in plain English, not SQL</li>



<li><strong>Move from reporting to decision intelligence</strong> — embed insights where the work happens</li>



<li><strong>Choose an SDK, not an iframe</strong>, so you can deliver the experience each persona actually needs</li>
</ol>



<h2 class="wp-block-heading" id="watch-the-full-webinar">Watch the full webinar</h2>



<p>For the full breakdown — including the live <a href="https://www.revealbi.io/embedded-analytics">Reveal BI</a> product demo showing AI dashboard assistance, NLQ chat, dashboard linking, single-visualization mode, and theming — watch the complete session on YouTube:</p>



<p>▶️ <strong><a href="https://youtu.be/-EuPiGUeDXc">Designing Embedded Analytics Your Users Actually Use</a></strong></p>



<h2 class="wp-block-heading" id="ready-to-see-reveal-in-your-product">Ready to see Reveal in your product?</h2>



<ul class="wp-block-list">
<li>🌐 <strong>Request a demo:</strong> <a href="https://www.revealbi.io/">revealbi.io</a></li>



<li>📧 <strong>Email sales:</strong> sales@revealbi.io</li>



<li>📧 <strong>Reach out directly:</strong> jasonb@infragistics.com</li>
</ul>



<p><em>About the author: Jason Beres leads product and content strategy at Infragistics, the makers of Reveal embedded analytics and Ignite UI. He works with SaaS and ISV teams to design analytics experiences users actually adopt.</em></p>



<p></p>



<h2 class="wp-block-heading" id="faq-designing-embedded-analytics-users-actually-use">FAQ: Designing Embedded Analytics Users Actually Use</h2>



<h3 class="wp-block-heading">Why do embedded analytics projects fail?</h3>



<p>Most embedded analytics projects fail because users do not adopt them. The issue is usually not that the dashboards are poorly built, but that they are disconnected from the user’s workflow, difficult to act on, or unable to answer follow-up questions quickly.</p>



<h3 class="wp-block-heading">What is dashboard fatigue?</h3>



<p>Dashboard fatigue happens when every new business question leads to another dashboard. Over time, users face too many reports, inconsistent definitions, stale data, and too much effort to find the answer they need.</p>



<h3 class="wp-block-heading">Why is an embedded analytics SDK better than an iframe?</h3>



<p>An embedded analytics SDK gives product teams control over the user experience. Instead of placing a separate BI interface inside an iframe, an SDK lets developers embed dashboards, single visualizations, natural-language chat, custom actions, theming, and analytics workflows directly into the host application.</p>



<h3 class="wp-block-heading">What is a contextual layer in AI analytics?</h3>



<p>A contextual layer defines the business meaning behind the data so AI can answer questions consistently. For example, it tells the AI exactly what “revenue” means, which fields to use, and which governed definitions apply.</p>



<h3 class="wp-block-heading">How does natural-language analytics improve adoption?</h3>



<p>Natural-language analytics lets users ask questions in plain English instead of learning SQL, dashboard tools, or data models. This makes analytics more accessible to business stakeholders while still supporting deeper exploration for power users.</p>



<h3 class="wp-block-heading">What is decision intelligence in embedded analytics?</h3>



<p>Decision intelligence moves analytics beyond static reporting. It delivers proactive insights, risk scores, recommendations, alerts, and plain-language explanations directly inside the workflows where users make decisions.</p>



<h3 class="wp-block-heading">Who should embedded analytics be designed for?</h3>



<p>Embedded analytics should be designed for at least three personas: business stakeholders who want guided answers, power analysts who need deeper exploration, and developers who need flexible tools to embed analytics into the product experience.</p>



<p></p>
