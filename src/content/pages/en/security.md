---
title: "Embedded Analytics Security With Reveal: Your Analytics, Your Control"
description: "Reveal Embedded Analytics is designed with a secure-by-default approach, ensuring that your data and applications are secured and protected. Find out more!"
cover: "/images/2020/10/reveal-logo-gradient-1200x630-1.jpg"
sections:
  - type: dark-hero
    variant: gradient-split
    title: "Embedded Analytics Security"
    subhead: "<p class=\"lead mb-3\">Enterprise-grade security for embedded analytics and AI-powered insights</p><p class=\"mb-4\">Reveal delivers embedded analytics designed for security-first SaaS and regulated environments without exposing data to third-party SaaS platforms, fragile iFrame architectures, or uncontrolled AI models.</p>"
    ctaLabel: "Book a Personalized Demo"
    ctaHref: "#"
    image: "https://static.infragistics.com/marketing/reveal/security/reveal-security-compliance-badges-hero-960.webp"
    imageAlt: "Reveal embedded analytics security hero"
    imageSrcset:
      - media: "(max-width: 480px)"
        srcset: "https://static.infragistics.com/marketing/reveal/security/reveal-security-compliance-badges-hero-480.webp"
      - media: "(max-width: 768px)"
        srcset: "https://static.infragistics.com/marketing/reveal/security/reveal-security-compliance-badges-hero-768.webp"
      - media: "(max-width: 960px)"
        srcset: "https://static.infragistics.com/marketing/reveal/security/reveal-security-compliance-badges-hero-960.webp"
      - media: "(max-width: 1100px)"
        srcset: "https://static.infragistics.com/marketing/reveal/security/reveal-security-compliance-badges-hero-1100.webp"
      - media: "(max-width: 1600px)"
        srcset: "https://static.infragistics.com/marketing/reveal/security/reveal-security-compliance-badges-hero-1600.webp"
      - media: "(min-width: 1601px)"
        srcset: "https://static.infragistics.com/marketing/reveal/security/reveal-security-compliance-badges-hero-1920.webp"

  - type: icon-grid
    headline: "Why Embedded Analytics Security Matters"
    subhead: "Embedding analytics is not just a UI decision. It is a security and architectural one."
    subhead2: "When analytics become customer-facing, it expands your application's attack surface. Data access, identity propagation, tenant isolation, and AI governance all become critical design considerations."
    cols: 3
    variant: white
    cards:
      - icon: "https://static.infragistics.com/marketing/reveal/icons/reveal-icon-data-sovereignty.svg"
        iconAlt: "Data Sovereignty Icon"
        title: "Data Sovereignty"
        body: "Reveal enforces tenant isolation at query execution, preventing cross-tenant data access in shared environments."
      - icon: "https://static.infragistics.com/marketing/reveal/icons/reveal-icon-ai.svg"
        iconAlt: "AI Context Control Icon"
        title: "AI Context Control"
        body: "Reveal restricts AI access to governed data only, reducing the risk of prompt injection and unauthorized data exposure."
      - icon: "https://static.infragistics.com/marketing/reveal/icons/reveal-icon-shield-checkmark.svg"
        iconAlt: "Compliance Ready Icon"
        title: "Compliance Ready"
        body: "Reveal supports GDPR, HIPAA, and SOC 2 requirements through controlled data access, auditing, and flexible deployment models."
    footnote: "For B2B SaaS and regulated industries, security failures do not just impact compliance; they erode customer trust, increase churn risk, and slow enterprise adoption."
    footnoteClass: "mt-3 text-muted"

  - type: security-risk-table
    headline: "Common Security Risks in Embedded Analytics and How Reveal Mitigates Them"
    rows:
      - risk: "Cross-tenant data access due to <strong>weak isolation</strong>"
        category: "TENANT ISOLATION"
        mitigation: "Tenant context enforced at <strong>query execution</strong> for every request"
      - risk: "Inconsistent <strong>authentication</strong> across analytics and application"
        category: "AUTHENTICATION MODEL"
        mitigation: "Inherits your existing auth model with <strong>no parallel user systems</strong>"
      - risk: "Analytics running <strong>outside your security perimeter</strong> via iFrames"
        category: "EMBEDDING ARCHITECTURE"
        mitigation: "Runs inside your application via <strong>SDK</strong>, not external containers"
      - risk: "AI accessing <strong>unrestricted or sensitive data</strong>"
        category: "AI ACCESS CONTROL"
        mitigation: "AI operates within your <strong>permission model</strong> and access controls"
      - risk: "Analytics tools that <strong>fail compliance requirements</strong>"
        category: "COMPLIANCE ALIGNMENT"
        mitigation: "Supports <strong>GDPR, HIPAA, and SOC 2</strong> through architecture"

  - type: security-arch-cards
    eyebrow: "CORE ARCHITECTURE"
    headline: "Reveal's Embedded Analytics Security Architecture"
    subhead: "Reveal embeds directly into your application using SDKs, not external SaaS containers or iFrames, giving security teams full operational visibility."
    cards:
      - icon: "https://static.infragistics.com/marketing/reveal/icons/reveal-icon-sdk.svg"
        iconAlt: "SDK-First Integration icon"
        title: "SDK-First Integration"
        intro: "Built to operate within your application's security model and infrastructure."
        items:
          - "Operates within your application's security and deployment model"
          - "Does not own or monetize customer data"
          - "Authentication, authorization, and data access remain under your control"
          - "Deployment flexibility without sacrificing security"
      - icon: "https://static.infragistics.com/marketing/reveal/icons/reveal-icon-security-2.svg"
        iconAlt: "Operational security icon"
        title: "Operational Security &amp; Infrastructure Safety"
        intro: "Reveal is designed to operate cleanly within enterprise environments:"
        items:
          - "Compatible with existing proxies, load balancers, and gateways"
          - "Explicit, configurable dependencies with no undisclosed data transmission"
          - "Designed to run behind reverse proxies and enterprise firewalls"

  - type: feature-row
    headline: "Authentication, Authorization &amp; Data Access Control"
    image: "https://static.infragistics.com/marketing/reveal/security/reveal-security-access-control-960.webp"
    imageAlt: "Authentication and data access control"
    imageSrcset:
      - media: "(max-width: 480px)"
        srcset: "https://static.infragistics.com/marketing/reveal/security/reveal-security-access-control-480.webp"
      - media: "(max-width: 768px)"
        srcset: "https://static.infragistics.com/marketing/reveal/security/reveal-security-access-control-768.webp"
      - media: "(max-width: 960px)"
        srcset: "https://static.infragistics.com/marketing/reveal/security/reveal-security-access-control-960.webp"
      - media: "(max-width: 1100px)"
        srcset: "https://static.infragistics.com/marketing/reveal/security/reveal-security-access-control-1100.webp"
      - media: "(min-width: 1101px)"
        srcset: "https://static.infragistics.com/marketing/reveal/security/reveal-security-access-control-1600.webp"
    reversed: false
    slotContent: |
      <p>Reveal enforces your existing security model; it does not replace it.</p>
      <ul class="list-checkmark blue-tick">
        <li>SSO, OAuth, and SAML integration</li>
        <li>Role-based and row-level security are inherited from the host application</li>
        <li>Secure user context propagation across analytics interactions</li>
        <li>No shadow user or permission systems</li>
      </ul>

  - type: security-gradient-banner
    headline: "No Shadow User or Permission Systems"
    body: "Reveal doesn't introduce a separate authentication or authorization layer. Your existing identity system remains the source of truth, preventing permission drift and keeping access control consistent across your application and analytics."
    tags:
      - label: "Single Source of Truth"
      - label: "No Permission Drift"
      - label: "Reduced System Complexity"
    image: "https://static.infragistics.com/marketing/reveal/security/reveal-security-glowing-shield.svg"
    imageAlt: "Glowing shield icon"

  - type: feature-row
    headline: "Auditability, Monitoring &amp; Operational Visibility"
    image: "https://static.infragistics.com/marketing/reveal/security/reveal-security-monitoring-visibility-960.webp"
    imageAlt: "Auditability monitoring and operational visibility"
    imageSrcset:
      - media: "(max-width: 480px)"
        srcset: "https://static.infragistics.com/marketing/reveal/security/reveal-security-monitoring-visibility-480.webp"
      - media: "(max-width: 768px)"
        srcset: "https://static.infragistics.com/marketing/reveal/security/reveal-security-monitoring-visibility-768.webp"
      - media: "(max-width: 960px)"
        srcset: "https://static.infragistics.com/marketing/reveal/security/reveal-security-monitoring-visibility-960.webp"
      - media: "(max-width: 1100px)"
        srcset: "https://static.infragistics.com/marketing/reveal/security/reveal-security-monitoring-visibility-1100.webp"
      - media: "(min-width: 1101px)"
        srcset: "https://static.infragistics.com/marketing/reveal/security/reveal-security-monitoring-visibility-1600.webp"
    reversed: true
    slotContent: |
      <p>Security teams do not lose insight when analytics are embedded.</p>
      <ul class="list-checkmark blue-tick">
        <li>Visibility into analytics query execution</li>
        <li>Deterministic behavior under load</li>
        <li>Compatibility with existing logging and monitoring tools</li>
        <li>Troubleshooting without exposing sensitive customer data</li>
      </ul>

  - type: icon-grid
    eyebrow: "CORE ARCHITECTURE"
    headline: "Secure AI Analytics Customer Controlled by Design"
    subhead: "AI in analytics must be governed, not experimental."
    cols: 4
    iconSize: 36
    cardTitleTag: p
    variant: white
    cards:
      - icon: "https://static.infragistics.com/marketing/reveal/icons/reveal-icon-toggle-switches.svg"
        iconAlt: "Fully opt-in icon"
        title: "Fully Opt-In"
        body: "AI features are disabled by default and must be explicitly enabled. You control scope, permissions, and usage at every level."
      - icon: "https://static.infragistics.com/marketing/reveal/icons/reveal-icon-gear-2.svg"
        iconAlt: "Configurable per tenant icon"
        title: "Configurable Per Tenant"
        body: "Configure AI per tenant using your own LLM endpoints, including private or on-prem models, aligned with your security requirements."
      - icon: "https://static.infragistics.com/marketing/reveal/icons/reveal-icon-data-sources-2.svg"
        iconAlt: "Controlled data access icon"
        title: "Controlled Data Access"
        body: "AI operates within your permission model and governed data access using metadata, aggregated results, or scoped datasets without bypassing controls."
      - icon: "https://static.infragistics.com/marketing/reveal/icons/reveal-icon-blocked-2.svg"
        iconAlt: "No third-party exposure icon"
        title: "No Third-Party Exposure"
        body: "No customer data is sent to third-party AI services unless explicitly configured. No raw customer data is sent by default."
    footnote: "No raw customer data is sent to third-party AI services by default."

  - type: feature-row
    headline: "Deployment Models That Reduce Security Risk"
    videoSrc: "https://static.infragistics.com/marketing/reveal/videos/analytics-cloud-hybrid.mp4"
    videoPoster: "https://static.infragistics.com/marketing/reveal/videos/analytics-cloud-hybrid-fallback-img.jpg"
    reversed: false
    slotContent: |
      <ul class="list-checkmark blue-tick mb-3">
        <li>Cloud deployments</li>
        <li>Hybrid architectures</li>
        <li>Fully on-prem environments</li>
      </ul>
      <p class="mb-0">Security-sensitive teams do not need to compromise modern analytics experiences to maintain control.</p>

  - type: feature-row
    headline: "Compliance &amp; Governance Readiness"
    image: "https://static.infragistics.com/marketing/reveal/security/reveal-security-compliance-goverance-badges-960.webp"
    imageAlt: "Compliance and governance badges"
    imageSrcset:
      - media: "(max-width: 480px)"
        srcset: "https://static.infragistics.com/marketing/reveal/security/reveal-security-compliance-goverance-badges-480.webp"
      - media: "(max-width: 768px)"
        srcset: "https://static.infragistics.com/marketing/reveal/security/reveal-security-compliance-goverance-badges-768.webp"
      - media: "(max-width: 960px)"
        srcset: "https://static.infragistics.com/marketing/reveal/security/reveal-security-compliance-goverance-badges-960.webp"
      - media: "(max-width: 1100px)"
        srcset: "https://static.infragistics.com/marketing/reveal/security/reveal-security-compliance-goverance-badges-1100.webp"
      - media: "(min-width: 1101px)"
        srcset: "https://static.infragistics.com/marketing/reveal/security/reveal-security-compliance-goverance-badges-1600.webp"
    reversed: true
    slotContent: |
      <p class="font-weight-bold">Reveal supports compliance by architecture:</p>
      <ul class="list-checkmark blue-tick">
        <li>Data residency and minimization controls</li>
        <li>Clear separation of analytics tooling and data ownership</li>
        <li>Auditing and monitoring support</li>
        <li>Deterministic exports with controlled execution contexts</li>
      </ul>
      <p class="mt-3 mb-0">Analytics remains secure from dashboard to export.</p>

  - type: blog-teaser
    headline: "Embedded Analytics Security Use Cases"
    headlineClass: "mb-3"
    subhead: "Learn why intuitive, self-service, embedded analytics matter"
    viewAllLabel: "View All Blogs"
    viewAllUrl: "/blogs"
    anchor: "blogs"
    slugs:
      - security-with-embedded-analytics
      - scalable-analytics
      - embedded-analytics-for-saas-companies

  - type: faq
    headline: "Frequently Asked Questions"
    anchor: "faq"
    multiopen: true
    items:
      - question: "How is Reveal different from SaaS embedded analytics tools from a security perspective?"
        answer: "<p><a href=\"/index\">Reveal</a> embeds analytics via SDKs inside your application architecture, not through external SaaS containers or iFrames. Analytics executes within your security perimeter, inheriting your authentication, authorization, and tenant isolation model.</p><p>By contrast, many SaaS-based embedded analytics tools operate outside the host application, introducing third-party data exposure, opaque execution paths, and limited auditability. Reveal avoids that model entirely, making secure embedded analytics a foundational design choice rather than an afterthought.</p>"
        open: true
      - question: "Where does Reveal run, and who controls the data?"
        answer: "<p>Reveal runs inside your infrastructure, cloud, hybrid, or fully self-hosted, without taking ownership of customer data. All queries execute against your existing <a href=\"/data-sources\">data sources</a>, using the same security context enforced by your application.</p><p>Reveal does not replicate, monetize, or retain customer data outside your environment. This architecture ensures embedded analytics security without expanding your data exposure surface.</p>"
      - question: "Does Reveal ever access or store our customer data?"
        answer: "<p>No.</p><p>Reveal does not persist customer data in external systems or route analytics through third-party services. Execution, caching, and exports occur within controlled environments defined by your deployment model.</p><p>This approach eliminates the common risks associated with SaaS analytics platforms and aligns with embedded analytics security best practices for regulated and enterprise environments.</p>"
      - question: "Can AI features be disabled by the tenant or environment?"
        answer: "<p>Yes.</p><p>AI capabilities can be enabled or disabled at the tenant, environment, or deployment stage level. This allows organizations to adopt AI analytics selectively while maintaining governance, compliance, and risk control.</p>"
      - question: "Can Reveal be deployed fully on-premises?"
        answer: "<p>Yes.</p><p>Reveal supports fully self-hosted deployments, allowing organizations to run analytics entirely within their security perimeter. This includes environments with strict regulatory or sovereignty requirements and aligns with <a href=\"/on-prem-analytics\">on-prem analytics</a> security expectations.</p>"
      - question: "How does Reveal support multi-tenant SaaS security models?"
        answer: "<p>Reveal enforces tenant isolation at runtime for every analytics request. Tenant context is explicitly propagated and validated before query execution, preventing cross-tenant data access by design.</p><p>There is no shared execution layer or global query context. This makes Reveal suitable for customer-facing, multi-tenant <a href=\"/embedded-analytics/index\">embedded analytics</a> in B2B SaaS applications with strict security requirements.</p>"
      - question: "How does Reveal handle authentication and identity propagation?"
        answer: "<p>Reveal inherits your application's authentication model and does not introduce a parallel identity system. Users access analytics through the same identity, roles, and permissions already defined in your product.</p><p>SSO, OAuth, and SAML integrations are supported, with secure user context propagation across dashboards and interactions. This eliminates policy drift and reduces the attack surface.</p>"
      - question: "How is AI handled securely in Reveal's embedded analytics?"
        answer: "<p>AI features in Reveal are opt-in and governed by the same permission model as analytics data. <a href=\"/ai\">AI-powered analytics</a> operates within defined access controls and never bypasses your security rules.</p><p>Reveal supports customer-controlled AI models, including private and on-prem deployments. By default, no raw customer data is sent to third-party AI services, directly addressing embedded analytics AI security concerns.</p>"
      - question: "How does Reveal support compliance requirements like GDPR, HIPAA, and SOC 2?"
        answer: "<p>Reveal supports compliance through architecture rather than bolt-on controls. Data access, residency, and minimization are enforced within your environment, with a clear separation between analytics tooling and data ownership.</p><p>Auditing, monitoring, and deterministic exports are designed to support regulatory reviews and enterprise procurement processes.</p>"
      - question: "Does enabling security controls impact analytics performance?"
        answer: "<p>No.</p><p>Security enforcement is part of Reveal's execution model, not layered on top of it. Authentication, authorization, and tenant isolation are handled deterministically, allowing analytics to remain responsive and predictable under load.</p>"
      - question: "How can security teams monitor and audit analytics behavior?"
        answer: "<p>Reveal integrates with existing logging and monitoring tools, allowing security teams to observe analytics execution without exposing sensitive customer data.</p><p>This enables troubleshooting, audit readiness, and operational visibility without introducing blind spots or unmanaged systems.</p>"

  - type: inline-cta
    icon: "https://static.infragistics.com/marketing/reveal/reveal-symbol.svg"
    iconAlt: "Reveal symbol"
    headline: "Security CTA Headline"
    ctaLabel: "Book a Personalized Demo"
seo:
  title: "Embedded Analytics Security With Reveal: Your Analytics, Your Control"
  description: "Reveal Embedded Analytics is designed with a secure-by-default approach, ensuring that your data and applications are secured and protected. Find out more!"
  ogTitle: "Embedded Analytics Security With Reveal: Your Analytics, Your Control"
  ogDescription: "Reveal Embedded Analytics is designed with a secure-by-default approach, ensuring that your data and applications are secured and protected. Find out more!"
  ogType: "article"
  twitterTitle: "Embedded Analytics Security With Reveal: Your Analytics, Your Control"
  twitterDescription: "Reveal Embedded Analytics is designed with a secure-by-default approach, ensuring that your data and applications are secured and protected. Find out more!"
  ogImage: "/images/2020/10/reveal-logo-gradient-1200x630-1.jpg"
---
