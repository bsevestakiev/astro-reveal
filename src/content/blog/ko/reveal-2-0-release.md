---
title: 'Reveal 2.0: 오늘날 실제로 구축하는 방식에 맞춰 설계되었습니다'
description: >-
  Reveal 2.0은 Reveal Web SDK의 완전한 현대화 버전입니다. jQuery 의존성이 없고, TypeScript 우선이며,
  ESM 및 IIFE 빌드를 지원하고, npm 또는 CDN 설치가 가능하며, 새로운 CosmosDB 및 ClickHouse 커넥터와 향상된
  접근성, Preview에서 Node 및 Java SDK 동등성을 제공합니다.
date: '2026-06-04'
author: Casey Ciniello
cover: >-
  https://static.infragistics.com/marketing/reveal/blogs/launch/2026/may/reveal-new-release-2-0-header.jpg
heroImage: >-
  https://static.infragistics.com/marketing/reveal/blogs/what-is-self-service-bi/reveal-what-is-self-service-bi-header.svg
summary: >-
  Reveal 2.0은 TypeScript 우선 아키텍처, 최신 모듈 지원, 향상된 접근성, 그리고 Preview에서 Node 및 Java
  전반에 걸친 확장된 런타임 동등성을 통해 현재 개발 스택에 맞춰 Reveal Web SDK를 현대화합니다.
takeaways:
  - Reveal 2.0은 jQuery 의존성을 제거하고 Web SDK를 현대화합니다.
  - TypeScript 지원은 완벽한 타입 정의와 함께 최고 수준입니다.
  - ESM 및 IIFE 빌드 모두 현대 및 레거시 모듈 시스템을 위해 사용할 수 있습니다.
  - 팀은 npm을 통해 설치하거나 빠른 프로토타이핑을 위해 CDN을 사용할 수 있습니다.
  - Azure CosmosDB 및 ClickHouse용 새로운 네이티브 커넥터가 포함되어 있습니다.
  - Node 및 Java SDK는 이제 Preview에서 ASP.NET과 API 기능 동등성에 도달했습니다.
categories:
  - 제품 업데이트
tags:
  - Reveal 2.0
  - 웹 SDK
  - 임베디드 분석
  - TypeScript
  - 개발자 경험
seo:
  title: 'Reveal 2.0: 오늘날 실제로 구축하는 방식에 맞춰 설계되었습니다'
  description: >-
    Reveal 2.0은 Reveal Web SDK의 완전한 현대화 버전입니다. jQuery 의존성이 없고, TypeScript 우선이며,
    ESM 및 IIFE 빌드를 지원하고, npm 또는 CDN 설치가 가능하며, 새로운 CosmosDB 및 ClickHouse 커넥터와 향상된
    접근성, Preview에서 Node 및 Java SDK 동등성을 제공합니다.
  ogTitle: 'Reveal 2.0: 오늘날 실제로 구축하는 방식에 맞춰 설계되었습니다'
  ogDescription: >-
    Reveal 2.0은 Reveal Web SDK의 완전한 현대화 버전입니다. jQuery 의존성이 없고, TypeScript 우선이며,
    ESM 및 IIFE 빌드를 지원하고, npm 또는 CDN 설치가 가능하며, 새로운 CosmosDB 및 ClickHouse 커넥터와 향상된
    접근성, Preview에서 Node 및 Java SDK 동등성을 제공합니다.
  ogType: article
  twitterTitle: 'Reveal 2.0: 오늘날 실제로 구축하는 방식에 맞춰 설계되었습니다'
  twitterDescription: >-
    Reveal 2.0은 Reveal Web SDK의 완전한 현대화 버전입니다. jQuery 의존성이 없고, TypeScript 우선이며,
    ESM 및 IIFE 빌드를 지원하고, npm 또는 CDN 설치가 가능하며, 새로운 CosmosDB 및 ClickHouse 커넥터와 향상된
    접근성, Preview에서 Node 및 Java SDK 동등성을 제공합니다.
  ogImage: >-
    https://static.infragistics.com/marketing/reveal/blogs/launch/2026/may/reveal-new-release-2-0-header.jpg
source_hash: e7089db5
source_locale: en
---
팀이 웹 애플리케이션을 구축하는 방식이 바뀌었습니다. 모듈이 스크립트 태그를 대체했습니다. TypeScript가 기본이 되었습니다. npm과 최신 번들러가 설치 및 패키징을 담당하게 되었습니다. 개발자들이 사용하는 대부분의 SDK도 따라잡기 위해 재작성되었습니다.

대부분의 SDK가 그렇습니다.

오늘 저희는 Reveal Web SDK의 완전한 현대화 버전인 Reveal 2.0을 출시합니다. jQuery 의존성이 없습니다. TypeScript로 작성되었으며, IIFE와 ESM 빌드를 모두 지원합니다. CDN 또는 npm을 통해 설치할 수 있습니다. 2026년 빌드 파이프라인에 깔끔하게 통합되는 기반 위에서, 동일한 대시보드와 동일한 최종 사용자 경험을 제공합니다.

![Reveal 2.0 manufacturing dashboard](https://static.infragistics.com/marketing/reveal/blogs/launch/2026/may/reveal-launch-2-0-manufacturing-dashboard-body-1.webp)

<h2 style="margin-bottom: 1rem;">Reveal 2.0의 새로운 기능</h2>

- jQuery 의존성이 없는 현대적인 Web SDK.
- TypeScript 우선, 즉시 사용 가능한 전체 타입 정의 제공.
- IIFE 및 ESM 빌드 모두 지원. 앱이 이미 사용하는 어떤 모듈 시스템에도 Reveal을 드롭하세요.
- 빠른 프로토타이핑을 위해 CDN을 통해, 또는 프로덕션을 위해 npm을 통해 설치하세요.
- Azure CosmosDB용 새 커넥터.
- ClickHouse용 새 커넥터.
- SDK 전반에 걸친 접근성 개선.
- Node 및 Java SDK가 이제 ASP.NET SDK와 API 기능 동등성을 갖추었으며, Preview에서 사용 가능합니다.

<h2 style="margin-bottom: 1rem;">우리가 재구축한 이유</h2>

Reveal 1.x는 작동했습니다. 여전히 작동합니다. 하지만 지난 몇 년 동안 최신 Vite, webpack 또는 esbuild 프로젝트에 참여해 본 사람이라면, jQuery 기반의 스크립트 태그 전용 SDK가 도입하는 마찰을 알고 있습니다. 이는 깔끔하게 트리 쉐이크되지 않습니다. 서버 측 렌더링을 복잡하게 만듭니다. 고객들이 어떤 임베디드 분석 플랫폼에 제품을 걸지 결정하는 바로 그 평가 과정에서 구식처럼 느껴집니다.

저희에게는 두 가지 선택지가 있었습니다. 틈새를 덮어 가리는 것이든, 아니면 고객이 실제로 배포하는 기반 위에서 재구축하는 것이었습니다. 저희는 후자를 선택했습니다.

Reveal 2.0은 여전히 Reveal이 항상 해왔던 모든 것을 수행합니다. 제품 내부에 임베딩할 수 있는 빠르고, 아름답고, 사용자 정의 가능한 대시보드입니다. 하지만 이제는 현대적인 SDK가 되어야 하는 방식으로 통합됩니다.

<h2 style="margin-bottom: 1rem;">이것이 귀하에게 의미하는 바</h2>

기존 Reveal 고객이라면, 업그레이드 경로는 간단합니다. 오늘날 사용하고 있는 동일한 API가 여전히 여기에 있습니다. 저희는 무엇이 변경되었고 통합을 어떻게 업데이트해야 하는지 안내하는 1.x에서 2.0으로의 마이그레이션 가이드를 게시했습니다. 대부분의 팀은 오후 안에 전환할 것입니다.

만약 1~2년 전에 Reveal을 평가했는데 SDK가 사용 중인 스택보다 뒤처진다고 느꼈다면, 다시 살펴보세요. 평가 시트의 단점(cons) 쪽에 있던 이유들이 이제 장점(pros) 쪽에 있습니다.

임베디드 분석을 처음 검토하는 엔지니어링 리더라면, Reveal 2.0은 Next.js, React, Vue 또는 Angular 프로젝트에 드롭할 수 있는 SDK를 제공하며, 다른 모든 것을 설치하는 것과 동일한 도구로 설치하고, 레거시 부담 없이 프로덕션에 배포할 수 있게 합니다.

<h2 style="margin-bottom: 1rem;">멀티 런타임: 미리 보기의 Node 및 Java</h2>

Reveal은 항상 .NET 우선이었습니다. Reveal 2.0을 통해, 저희의 Node 및 Java SDK는 이제 ASP.NET SDK와 API 기능 동등성을 갖추었으며, 둘 다 Preview에서 사용 가능합니다. Java SDK는 완전히 현대적인 API를 가진 완전히 새로운 SDK이며, 이전에 출시했던 레거시 Java SDK와는 완전히 단절되었습니다.

제품이 Node 또는 Java에서 실행되고 있고, 이전에 저희가 스택에 맞지 않아 제외해야 했던 적이 있다면, 더 이상 그렇지 않습니다. Preview 액세스에 가입하고 GA 전에 무엇을 개선해야 할지 알려주세요.

<h2 style="margin-bottom: 1rem;">더 많은 데이터, 더 많은 접근성</h2>

Azure CosmosDB 커넥터: 수동 ETL이나 중간 웨어하우스 없이 CosmosDB 데이터를 Reveal 대시보드에 직접 가져오세요.

ClickHouse 커넥터: 분석을 최신 컬럼형 스택으로 옮긴 팀이라면, 임베디드 대시보드도 따라갈 수 있습니다.

접근성 개선: Reveal 2.0은 WCAG 준수가 필수적인 환경에서 대시보드를 배포하는 것을 더 쉽게 만듭니다. 대응하고 있는 특정 조달 요구 사항에 대해 저희와 이야기해 보세요. 저희가 커버리지를 체크리스트에 매핑하는 것을 도와드릴 수 있습니다.

Reveal 2.0은 만약 저희가 오늘 자체 SaaS에 임베디드 분석 제품을 구축한다면 사용하고 싶은 버전입니다. 귀하도 같은 느낌을 받을 것이라고 생각합니다.
