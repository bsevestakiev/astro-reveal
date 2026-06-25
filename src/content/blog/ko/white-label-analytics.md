---
title: 화이트 라벨 분석이란 무엇인가요? (대부분의 SaaS 플랫폼이 잘못 이해하는 이유)
description: >-
  화이트 라벨 분석의 개념, 이점 및 사용 사례를 깊이 파고들어 귀하의 요구 사항에 맞는 이상적인 솔루션 선택에 대한 전문가의 지침을
  받으세요.
date: '2022-07-19'
author: Casey Ciniello
cover: /images/2023/10/white-label-analytics-and-theming.png
heroImage: >-
  https://www.revealbi.io/images/2022/07/reveal-white-label-analytics-and-theming-header_2023-10-19T16.36.26.svg
summary: >-
  화이트 라벨 분석은 SaaS 제품이 대시보드와 인사이트를 자체 브랜드 아래에 임베딩하여 애플리케이션에 완전히 통합할 수 있도록 합니다.
  사용자는 동일한 인터페이스 내에서 데이터와 상호 작용하며, 이는 채택률을 높이고 워크플로우의 중단을 방지합니다. 기본적인 임베딩과의 핵심
  차이점은 통합 깊이에 있습니다. iFrame 기반 접근 방식은 사용자 정의를 제한하고 단절된 경험을 만들지만, SDK 및 API 기반
  플랫폼은 테넌트 전반에 걸쳐 더 깊은 제어, 더 나은 성능 및 확장성을 가능하게 합니다. SaaS 팀에게 이는 유지율, 수익화 및 개발
  속도에 영향을 미치며, 분석을 외부 추가 기능이 아닌 핵심 제품 기능으로 전환합니다.
takeaways:
  - 화이트 라벨 분석은 사용자를 귀하의 제품 내부에 유지합니다
  - 통합 깊이는 분석이 워크플로우에 어떻게 맞는지 정의합니다
  - iFrame 기반 도구는 사용자 정의와 유연성을 제한합니다
  - 분석은 유지율과 제품 가치를 높입니다
  - 확장성과 멀티테넌시는 SaaS에 필수적입니다
  - 분석 기능을 구축하는 것은 장기적인 비용과 복잡성을 추가합니다
categories:
  - 임베디드 분석
seo:
  title: 화이트 라벨 분석이란 무엇인가요? | Reveal BI
  description: >-
    화이트 라벨 분석의 개념, 이점 및 사용 사례를 깊이 파고들어 귀하의 요구 사항에 맞는 이상적인 솔루션 선택에 대한 전문가의 지침을
    받으세요.
  ogTitle: 화이트 라벨 분석이란 무엇인가요? | Reveal BI
  ogDescription: >-
    화이트 라벨 분석의 개념, 이점 및 사용 사례를 깊이 파고들어 귀하의 요구 사항에 맞는 이상적인 솔루션 선택에 대한 전문가의 지침을
    받으세요.
  ogType: article
  twitterTitle: 화이트 라벨 분석이란 무엇인가요? | Reveal BI
  twitterDescription: >-
    화이트 라벨 분석의 개념, 이점 및 사용 사례를 깊이 파고들어 귀하의 요구 사항에 맞는 이상적인 솔루션 선택에 대한 전문가의 지침을
    받으세요.
  ogImage: /images/2023/10/white-label-analytics-and-theming.png
source_hash: 1a0e3777
source_locale: en
---
일반적으로 과정은 이렇습니다. SaaS 제품 팀은 자체 제품 내부에 분석 기능이 필요하다고 결정합니다. 그들은 몇 가지 플랫폼을 평가하고, 깔끔하고 브랜드화된 데모 대시보드를 확인한 후, 화이트 라벨 기능을 지원하는 플랫폼을 선택합니다. 통합이 이루어지고, 대시보드가 라이브로 공개됩니다.

그러면 디자인 팀이 분석 섹션이 제품의 나머지 부분과 완전히 일치하지 않는 이유를 묻습니다. 또는 고객이 모달 창의 글꼴이 다르다는 것을 알아차립니다. 또는 누군가 AI 어시스턴트를 이름 변경하고 스킨을 바꿀 수 있는지 묻고, 답변은 '아니요, 그것은 벤더의 인터페이스이며 귀하의 것이 아닙니다'입니다.

이것이 대부분의 팀이 '우리는 화이트 라벨링을 지원한다'와 '당신의 고객들은 이것이 당신의 것이 아니라는 것을 절대 모를 것이다'라는 두 가지 완전히 다른 주장이란 것을 깨닫는 순간입니다. 대부분의 플랫폼은 전자를 제공합니다. 극히 일부만이 후자를 제공합니다. 이 둘 사이의 격차는 미적인 것이 아니라 아키텍처적인 것이며, 플랫폼에 전념하기 전에 이를 이해하는 것이 가장 중요한 평가가 될 것입니다.

<aside class="alert alert-danger rounded-xl">

## 화이트 라벨 분석이란 무엇인가요?

화이트 라벨 분석은 소프트웨어 제품 내부에 완전히 브랜드화된 분석 기능을 임베딩하는 것입니다. 이는 대시보드, 보고서, 데이터 시각화 및 AI 기반 인사이트와 같은 [임베디드 분석](/embedded-analytics) 형태로 제공되며, 호스트 애플리케이션의 브랜드가 경험의 모든 요소를 지배합니다. 사용자는 제품 내에서 분석과 상호 작용하며 오직 해당 제품의 브랜드만을 보게 됩니다. 근본적인 분석 벤더는 보이지 않습니다.

</aside>

핵심 문구는 '경험의 모든 요소'입니다. 단순히 로고가 아닙니다. 단순히 색상 구성표가 아닙니다. 모든 구성 요소, 모든 상호 작용, 모든 AI 응답, 모든 도메인 참조가 분석 벤더의 것이 아니라 호스트 제품의 정체성을 반영해야 합니다.

이러한 수준의 제어는 대부분의 플랫폼이 제공하는 것과는 다른 아키텍처적 접근 방식을 요구합니다. 이것이 평가가 흥미로워지는 지점입니다.

![What is White Label Analytics?](/images/2023/10/what-is-white-label-analytics.png "What is White Label Analytics?")

## 팀들에게 수개월의 비용을 초래한 화이트 라벨 오해

팀들이 화이트 라벨 분석을 평가할 때 가장 흔한 실수는 이를 아키텍처적 문제라기보다는 브랜딩 연습으로 취급하는 것입니다. 로고를 업로드합니다. 기본 색상을 선택합니다. 티어에서 허용한다면 사용자 지정 도메인을 추가할 수도 있습니다. 대시보드는 데모에서 대략적으로 올바르게 보입니다. 배포합니다.

문제는 시간이 지남에 따라, 특정 순간에 발생합니다:

- **색상을 넘어서는 첫 번째 사용자 지정 요청.** 디자이너가 특정 차트 구성 요소가 호버할 때 작동하는 방식을 변경하고 싶어 합니다. 또는 필터 패널 애니메이션이 제품의 나머지 부분과 일치하지 않습니다. 이러한 변경 사항은 분석 인터페이스 내부에 있으며, 만약 그 인터페이스가 iFrame을 통해 로드된다면, 당신은 그 안에 무엇이 있는지 제어할 수 없습니다. 주변에 있는 것만 제어할 수 있습니다.

- **AI 어시스턴트.** 귀하의 제품은 AI 기능을 추가하고 있습니다. 분석 플랫폼도 AI 어시스턴트를 가지고 있지만, 통합된 [AI 분석](/ai) 경험이라기보다는 별도의 레이어로 작동하며, 자체 인터페이스, 자체 모달 스타일, 자체 브랜딩을 가지고 있습니다.

- **고객들이 전혀 다르게 보이는 두 개의 AI 경험을 목격합니다.** 하나는 네이티브하게 느껴지고, 다른 하나는 그렇지 않습니다.

- **엔터프라이즈 고객.** 새로운 고객은 엄격한 브랜드 요구 사항을 가지고 있습니다. 분석을 포함하여 제품의 모든 화면은 귀하의 브랜드가 아닌 그들의 브랜드를 담아야 합니다. 퍼-테넌트 테밍(Per-tenant theming)은 각 고객이 분석 계층에서 자신만의 브랜드를 보게 한다는 의미입니다. 플랫폼이 이를 아키텍처적으로 지원하지 못하면, 당신은 임시방편을 유지하고 있는 것입니다.

- **규모에 따른 가격 책정 논의.** 강력한 분석 채택을 이끌어냈습니다. 더 많은 고객이 분석 기능을 더 자주 사용합니다. 그러다가 청구서를 봅니다. 성공한 화이트 라벨 플랫폼의 사용량 기반 가격 책정은 그렇지 않은 플랫폼보다 더 비쌉니다.

이들 중 어느 것도 예외적인 경우가 아닙니다. 이들은 분석을 심각한 기능으로 취급하는 모든 SaaS 제품의 정상적인 진화 과정입니다. 그리고 이 모든 것은 근본적인 원인, 즉 어떻게 보이는지에 따라 플랫폼을 선택하는 것이 아니라 어떻게 구축되었는지에 따라 플랫폼을 선택하는 데서 비롯됩니다.

## What Genuine White Label Analytics Requires

진정한 화이트 라벨 분석은 동시에 충족되어야 하는 두 가지 별개의 요구 사항을 가지고 있습니다: 완전한 브랜드 제어와 아키텍처적 통합입니다. 대부분의 플랫폼은 각각의 부분적인 버전을 제공합니다.

### What complete brand control it means in practice

완전한 브랜드 제어란 분석 경험이 제품의 나머지 부분과 구별할 수 없을 정도로 유사하다는 것을 의미합니다. 단순히 유사한 정도가 아니라, 구별할 수 없을 정도로 유사해야 합니다. 이는 표면적인 테밍에 의존하기보다는 핵심 [임베디드 분석 기능](/features)에 대한 완전한 제어를 가지고 있어야 합니다. 다음을 요구합니다:

- **오버라이드가 아닌 디자인 시스템 상속.** 분석 계층은 벤더의 기본 스타일 위에 적용된 테마가 아니라, 귀하의 디자인 시스템, 귀하의 글꼴, 귀하의 간격, 귀하의 상호 작용 상태, 귀하의 호버 동작을 사용하여 렌더링되어야 합니다. 분석이 [analytics SDK](/blog/analytics-sdk) 통합을 통해 귀하의 디자인 시스템을 상속받을 때, 이는 귀하의 팀이 구축한 것처럼 작동합니다. CSS가 iFrame에 적용될 때, 이는 벤더 인터페이스의 제약 내에서 귀하의 브랜드를 근사하게 만듭니다.

- **구성 요소 수준의 제어.** 모든 차트 유형, 필터 요소, 툴팁 및 상호 작용 패턴은 구성 가능해야 합니다. 단순히 색상만은 아닙니다. 동작도요.

- **귀하의 브랜드를 담는 AI.** 2026년에는 분석 플랫폼에 AI 어시스턴트가 있습니다. 만약 그 AI 어시스턴트가 제품의 나머지 부분과 다른 시각적 정체성을 가지고 있다면, 자체 모달, 자체 글꼴, 자체 상호 작용 모델을 가지고 있다면, 가장 눈에 띄는 계층에서 화이트 라벨 경험을 망가뜨립니다.

- **항상 귀하의 도메인.** 화이트 라벨 분석은 귀하의 도메인에서 제공되어야 합니다. 벤더 플랫폼의 서브도메인이 아닙니다. 리디렉션도 아닙니다. 귀하의 URL이 일관되게 유지되어야 합니다.

### Architectural integration determines everything else

아키텍처적 질문은 다음과 같습니다: 분석 계층이 귀하의 애플리케이션에 어떻게 연결되며, 애플리케이션의 데이터 모델을 깨뜨리지 않고 근본적인 [데이터 소스](/data-sources)와 어떻게 상호 작용하는가?

<aside class="alert alert-danger rounded-xl">

iFrame 임베딩은 외부 인터페이스를 애플리케이션 내의 컨테이너에 로드합니다. 당신은 컨테이너—크기, 위치, 주변에 있는 것—를 제어합니다. 당신은 그 안에 무엇이 있는지 제어하지 못합니다. SDK 통합은 분석을 애플리케이션의 구성 요소 트리에 넣습니다. 귀하의 애플리케이션이 렌더링, 동작 및 시각적 출력을 지배합니다. 분석 계층은 자체적인 것을 강요하기보다는 귀하의 컨텍스트를 상속받습니다.

</aside>

이 구분이 가능한 것의 한계를 결정합니다. iFrame 기반 화이트 라벨링에는 한계가 있으며, 분석이 렌더링되는 방식에 대해 변경할 수 없는 것들이 있습니다. 왜냐하면 당신은 렌더링을 제어하지 못하기 때문입니다. SDK 기반 화이트 라벨링에는 그러한 한계가 없습니다. 디자인 시스템이 정의한다면, 분석 계층은 그것을 구현할 수 있습니다.

실질적인 테스트: 플랫폼에 특정 차트 구성 요소가 호버할 때 어떻게 작동하는지 변경할 수 있는지 물어보십시오. 색상이 아니라 동작입니다. 답변이 임시방편을 요구하거나 불가능하다면, 당신은 [iFrame](/blog/embedded-analytics-vs-iframes)의 한계에 부딪힌 것입니다.

## How White Label Analytics Works – The Five Key Layers

화이트 라벨 분석은 다섯 개의 상호 연결된 레이어를 통해 작동합니다. 각 레이어를 이해하면 어떤 플랫폼이 완전한 화이트 라벨링을 약속할 수 있고 어떤 플랫폼이 할 수 없는지 명확해지며, 그 답은 보통 어떤 레이어가 호스트 애플리케이션에 실제로 노출되는지에 달려 있습니다.

1. **브랜딩 레이어**
   사용자가 보는 모든 시각적 요소를 제어합니다: 색상, 글꼴, 레이아웃, 구성 요소 동작, 로고 및 도메인. SDK 구현에서 브랜딩 레이어는 호스트 애플리케이션의 디자인 시스템에 의해 정의됩니다. iFrame 구현에서는 벤더가 허용하는 CSS 오버라이드에 제한됩니다.

2. **임베딩 레이어**
   분석이 애플리케이션 아키텍처에 어떻게 연결되는지를 결정합니다. SDK 임베딩은 구성 요소 트리에 통합됩니다—완전한 제어, 한계 없음. iFrame 임베딩은 컨테이너 내에 외부 인터페이스를 로드하며, 제한된 제어, 명확한 한계가 있습니다.

3. **데이터 및 멀티테넌시 레이어**
   데이터가 어떻게 검색되고 테넌트별로 격리되는지를 관리합니다. 이는 [임베디드 분석의 멀티테넌시 데이터](/blog/multi-tenancy-data-in-embedded-analytics)와 같은 아키텍처에서 핵심 요구 사항입니다. 잘 설계된 시스템에서는 데이터가 반환되기 전에 쿼리 수준에서 각 테넌트의 데이터가 격리되며, 나중에 UI에서 필터링되지 않습니다. 퍼-테넌트 테밍(Per-tenant theming)(다른 고객에게 다른 브랜드 정체성을 제공하는 것)은 브랜딩 및 멀티테넌시 레이어가 SDK 수준에서 함께 작동해야 함을 요구합니다.

4. **보안 레이어**
   전체 [임베디드 분석 보안](/security) 모델에 걸쳐 인증, 권한 및 데이터 액세스를 제어합니다. 핵심 질문: 귀하의 인증 모델이 분석 계층을 지배합니까, 아니면 분석 플랫폼이 별도의 ID 시스템을 요구합니까? 화이트 라벨 분석은 귀하의 기존 인증, SSO, JWT, 토큰 기반을 상속받아야 하며, 고객에게 보이는 Reveal 로그인 프롬프트가 없어야 합니다.

5. **AI 레이어**
   현대 플랫폼에는 [대화형 분석](/blog/conversational-analytics)이 포함됩니다. 사용자가 질문하고 답변을 얻습니다. 화이트 라벨 배포의 경우, AI 레이어는 다른 모든 것과 동일한 보안 및 테넌시 아키텍처에 의해 지배되어야 합니다. AI 쿼리는 사용자의 테넌트 및 역할에 범위가 지정되어야 합니다. AI 인터페이스는 호스트 애플리케이션의 브랜드를 담아야 합니다. 토큰 비용은 제어되어야 합니다. 기존 분석 계층에 AI를 부착하는 플랫폼은 일반적으로 이러한 것들을 사후 고려 사항으로 다루는 반면, API 우선으로 구축된 플랫폼은 구조적으로 처리합니다.

## White Label Analytics Examples Across Industries

화이트 라벨 분석은 SaaS 제품이 고객이 별도의 도구에서가 아니라 제품 내에서 데이터와 상호 작용해야 하는 모든 곳에서 나타나며, 일반적인 [임베디드 분석 예시](/blog/embedded-analytics-examples)에서 볼 수 있습니다. 아키텍처적 요구 사항은 산업 전반에 걸쳐 동일합니다. 달라지는 것은 각 상황에서 브랜드 일관성이 왜 그렇게 중요한가입니다.

<reveal-expandable-table>

| Industry | What they embed | Why white labeling matters |
| :--- | :--- | :--- |
| **SaaS platforms** | Usage metrics, feature adoption, customer KPIs | Customers expect analytics to feel like part of the product, a visible third-party tool breaks that trust |
| **Fintech** | Transaction data, portfolio performance, risk reporting | Brand consistency directly affects user trust in financial data, any inconsistency raises doubt |
| **Healthcare** | Patient outcomes, operational metrics, clinical reporting | Strict workflows mean any context switch or visual inconsistency creates compliance risk |
| **Marketing platforms** | Campaign performance, attribution, audience insights | Clients pay for insights, if the analytics looks like a separate tool, the platform's value proposition weakens |
| **Logistics** | Shipment tracking, warehouse performance, operational dashboards | Real-time visibility is the core product value, it must behave natively |
| **ISV / OEM** | Full analytics layer under their own brand for end customers | The entire product is white-labeled — analytics cannot be the one element that breaks the illusion |

</reveal-expandable-table>

## **Where Teams Go Wrong — The Five Failure Patterns**

대부분의 화이트 라벨 분석 실패는 초기 통합에서 발생하지 않습니다. 제품이 진화하고 플랫폼의 아키텍처적 한계가 제약 사항이 되는 6~18개월 후에 발생합니다.

### Choosing iFrame embedding for the speed, paying for it later

iFrame 임베딩은 빠르게 배포됩니다. 첫 번째 버전은 괜찮아 보입니다. 그러다가 제품이 진화하고, 새로운 디자인 시스템, 새로운 상호 작용 패턴, 분석 계층과 통합해야 하는 AI 기능이 생기고, 각 반복마다 iFrame이 애플리케이션이 필요로 하는 것을 노출하지 못하기 때문에 임시방편이 필요합니다. 기술 부채가 축적되어 재플랫폼화가 유일하게 현실적인 선택지가 됩니다.

### Treating white labeling as a tier upgrade rather than an architecture

일부 플랫폼은 화이트 라벨링에 대해 비용을 청구하며, 이는 더 높은 가격대에서 잠금 해제되는 기능입니다. 다른 플랫폼은 화이트 라벨링이 기본적으로 활성화되어 있습니다. 왜냐하면 그것이 아키텍처적이기 때문입니다. SDK는 항상 구성 요소 수준에서 통합되므로, 호스트 애플리케이션은 항상 렌더링을 지배합니다. 이 구분이 중요한 이유는 화이트 라벨링이 설정 토글인 플랫폼은 일반적으로 그것을 끌 수도 있고, 설정 메뉴가 다루지 않는 곳에 벤더 브랜딩이 표시될 수 있기 때문입니다.

### Ignoring multi-tenancy until it becomes a problem

단일 고객 세그먼트를 서비스하는 SaaS 제품의 경우, 멀티테넌시는 초기에 이론적인 것처럼 보입니다. 그러다가 엔터프라이즈 부문이 옵니다. 각 엔터프라이즈 고객은 SaaS 벤더의 브랜드가 아닌 그들의 브랜드를 담는 분석을 원합니다. 플랫폼이 동일한 아키텍처를 통해 퍼-테넌트 테밍 및 퍼-테넌트 데이터 격리를 지원하지 못하면, 당신은 이제 고객별로 별도의 배포나 복잡한 사용자 지정 구성을 유지하고 있는 것입니다.

### Not modeling pricing at 3x and 10x current usage

현재 사용자가 500명이고 참여도가 보통인 경우 저렴해 보이는 사용량 기반 가격 책정 모델은 강력한 분석 채택을 보이는 사용자 5,000명에게는 매우 다르게 보입니다. 역설적인 역동성: 화이트 라벨 분석이 더 잘 작동할수록, 더 많은 사용자가 그것에 참여할수록, 비용은 더 높아집니다. 고정 가격은 이 역동성을 제거합니다. 현재 규모가 아닌 목표 규모에서 가격을 평가하십시오.

### Treating AI as a feature rather than a governance question

화이트 라벨 분석 배포에 AI를 추가하는 것은 정적 대시보드가 가지고 있지 않은 위험을 도입합니다: AI 쿼리가 적절하게 범위 지정되지 않은 경우 테넌트 데이터 유출, 사용량이 관리되지 않은 경우 예측 불가능한 토큰 비용, 호스트 제품의 브랜드가 아닌 벤더의 시각적 정체성을 담는 AI 응답. AI 기능을 평가하기 전에 AI 거버넌스를 평가하십시오.

![white label analytics theming](https://static.infragistics.com/marketing/reveal/blogs/image-library/reveal-white-label.png)

## ****Build vs. Buy: The Real Decision Most Teams Face****

화이트 라벨 분석에 대한 [build vs. buy](/blog/should-you-buy-or-build-your-analytics-platform) 질문은 거의 모든 SaaS 제품 팀의 계획 주기에서 발생합니다. 솔직한 대답은 기술적 역량보다는 향후 18개월 동안 엔지니어링 팀의 주의를 어디에 기울이고 싶은지에 더 달려 있습니다.

<reveal-expandable-table>

| | Build in-house | Buy a white label platform |
| :--- | :--- | :--- |
| **Time to first dashboard** | 3–6 months minimum | 1–2 weeks |
| **Multi-tenancy** | Build from scratch | Supported by architecture |
| **White-label UI control** | Complete — but you maintain it | Complete — platform maintains it |
| **AI capabilities** | Build or bolt on separately | Embedded in the same layer |
| **Ongoing maintenance** | Your team, indefinitely | Platform updates automatically |
| **Upfront cost** | High (engineering time) | Lower (platform fee) |
| **Long-term cost** | Grows with product complexity | Predictable, fixed or usage-based |
| **When it makes sense** | Highly unique requirements | Most SaaS products |

</reveal-expandable-table>

구축을 선택하는 팀은 일반적으로 진정으로 독특한 요구 사항을 가지고 있으며, 분석 경험이 제품의 도메인에 너무 특화되어 있어 기존 플랫폼으로는 수용할 수 없는 경우입니다. 이러한 팀은 존재하지만, 예외적입니다.

구축을 후회하는 경향이 있는 팀들은 일반적으로 세 가지 중 하나를 과소평가했습니다: 쿼리 수준에서의 멀티테넌시 복잡성, 시각화 계층의 지속적인 유지 관리 부담, 또는 사용자 지정 빌드 시스템에 AI 기능을 추가하는 엔지니어링 비용.

이 세 가지가 결합되면 상당하고 지속적인 엔지니어링 투자를 나타냅니다—제품이 확장하고 AI 기능이 기대되는 만큼 증가하는 투자입니다.

실질적인 테스트: 분석 투자를 엔지니어링 로드맵에서 제거한다면, 팀은 대신 무엇을 배포할 것입니까? 만약 그 답이 핵심 제품을 차별화하는 기능이라면, build vs buy 계산은 보통 구매에 유리합니다.

![embedded analytics real estate dashboard example](https://www.revealbi.io/images/2021/02/white-label-real-estate-dashboard.jpg)

## How to Evaluate a White Label Analytics Platform

좋은 화이트 라벨 분석 플랫폼과 제한적인 플랫폼을 구분하는 기준은 데모에서는 대부분 눈에 보이지 않습니다. 이것들은 전념하기 전에 아키텍처적 한계를 노출하는 질문들입니다.

### Can you change component-level behavior, not just colors?

구체적으로 물어보십시오: 이 차트 유형이 호버할 때 어떻게 작동하는지 변경할 수 있습니까? 필터 패널의 상호 작용 모델을 변경할 수 있습니까? 분석 계층을 애플리케이션의 기존 탐색 패턴과 통합할 수 있습니까? 답변이 임시방편을 요구하거나 불가능하다면, 그 플랫폼은 근본적으로 iFrame 기반이며 제품이 진화함에 따라 한계에 부딪힐 것입니다.

### How is tenant isolation enforced?

기능 목록이 아닌 기술적인 설명을 요청하십시오. 답변이 '사용자의 테넌트를 기반으로 대시보드를 필터링합니다'라면, 그것은 UI 수준의 격리이며 우회될 수 있는 보안 위험입니다. 답변이 '데이터가 반환되기 전에 쿼리 수준에서 테넌트 컨텍스트가 적용됩니다'라면, 그것은 아키텍처적 격리입니다. 이 차이는 규정 준수, 보안 및 엔터프라이즈 영업 논의에 중요합니다.

### Where is the vendor's branding in the default state?

테스트 환경에 플랫폼을 설치하고 설정을 변경하지 않고 벤더 브랜딩을 찾으십시오. 진정으로 [화이트 라벨링된 플랫폼](/blog/white-label-analytics-platform)에서는 기본 상태에 눈에 보이는 벤더 정체성이 없습니다. 어디에서든 벤더 브랜딩을 발견한다면, AI 인터페이스, 온보딩 흐름, 오류 상태에서든, 그것이 고객이 보게 될 것이며, 명시적으로 비활성화하지 않는 한 그렇습니다.

### What does the pricing look like at 10x current usage?

구체적인 숫자를 얻으십시오. 범위가 아니라, 규모에서 예상되는 실제 사용자 수와 참여 패턴을 기반으로 한 숫자입니다. 그런 다음 그 숫자가 귀하의 비즈니스 모델에 적합한지 결정하십시오. 현재 규모에서 저렴한 사용량 기반 가격 책정은 제품이 성공함에 따라 상당한 비용 센터가 될 수 있습니다.

### How does the AI layer integrate with your brand and governance model?

AI 어시스턴트가 사용자에게 어떻게 보이는지, 특히 벤더의 시각적 정체성을 사용하는지 아니면 귀하의 것을 사용하는지 물어보십시오. 멀티테넌트 환경에서 AI 쿼리가 어떻게 범위 지정되는지 물어보십시오. 토큰 비용이 플랫폼 수준에서 제어되는지 아니면 사용자 행동에 노출되는지 물어보십시오. 이 답변들 중 어느 것이라도 불분명하다면, AI 기능은 화이트 라벨 배포를 위해 프로덕션 준비가 되어 있지 않습니다.

## Where to Go From Here

제대로 된 화이트 라벨 분석, SDK 네이티브, 디자인 시스템 인식, 쿼리 수준의 멀티테넌트, 귀하의 브랜드 아래의 AI는 SaaS 회사가 할 수 있는 가장 강력한 제품 투자 중 하나입니다. 팀이 구축한 것처럼 보이고 작동하는 분석은 채택을 촉진하고, 유지율을 개선하며, 부착된 대시보드가 제공하지 못하는 업셀 기회를 창출합니다.

iFrame의 CSS 테밍, UI 수준의 멀티테넌시, AI 기능에서 재등장하는 벤더 브랜딩으로 잘못된 화이트 라벨 분석은 제품이 확장함에 따라 복리되는 기술 부채를 만듭니다. 이 가이드의 평가 질문들은 전념하기 *후*가 아니라 *전*에 차이를 드러내도록 설계되었습니다.

![white label dashboard example](https://www.revealbi.io/images/2021/02/embedded-analytics-finance-dashboard.png)

## Frequently Asked Questions

### **What's the difference between white label analytics and embedded analytics?**

임베디드 분석은 분석이 어디에 존재하는지에 관한 것입니다—별도의 도구에 있는 것이 아니라 애플리케이션에 통합되어 있습니다. 화이트 라벨 분석은 그것이 어떻게 보이고 작동하는지에 관한 것입니다—벤더의 것이 아니라 호스트 애플리케이션의 브랜드 아래에 있습니다. 제품은 분석을 임베딩할 수 있지만 완전히 화이트 라벨링하지는 않을 수 있습니다 (눈에 보이는 벤더 브랜딩, 제한된 UI 제어). 진정한 화이트 라벨 분석은 둘 다를 요구합니다: SDK 수준의 네이티브 통합과 경험의 모든 레이어에서의 완전한 브랜드 제어입니다.

### **Why do most white label analytics tools fall short?**

대부분의 플랫폼은 외부 인터페이스를 컨테이너 내에 로드하는 iFrame 기반 임베딩을 사용합니다. 컨테이너는 스타일링하고, 색상을 변경하고, 로고를 교체할 수 있지만, 인터페이스 자체를 제어할 수는 없습니다. 구성 요소 동작, 상호 작용 패턴, AI 인터페이스는 모두 벤더의 것입니다. SDK 기반 플랫폼은 애플리케이션의 구성 요소 트리에 통합되므로, 애플리케이션이 렌더링을 지배합니다. 차이점은 한계입니다: iFrame 임베딩에는 한계가 있습니다. SDK 통합에는 한계가 없습니다.

### **What is the difference between white-label BI and white label analytics?**

화이트 라벨 BI(비즈니스 인텔리전스)는 일반적으로 재판매 또는 임베딩 사용을 위해 리브랜딩된 전통적인 BI 도구—보고 플랫폼, 데이터 시각화 도구—를 의미합니다. 현대 SaaS 컨텍스트에서의 화이트 라벨 분석은 임베디드 대시보드, 실시간 데이터 경험, 셀프 서비스 분석 및 AI 기반 인사이트를 포함하는 더 광범위한 범주이며, 모두 호스트 제품의 브랜드 아래에서 SDK 수준에서 통합되어 제공됩니다. 이 구분이 중요한 이유는 전통적인 BI 도구가 현대 SaaS의 제품 통합 요구 사항을 위해 설계되지 않았기 때문입니다.

### **Can white label analytics be monetized?**

예, 그리고 이는 투자할 수 있는 가장 강력한 비즈니스 사례 중 하나입니다. 분석 기능은 프리미엄 티어 상품으로 포지셔닝될 수 있어 자연스러운 업셀 기회를 만듭니다. ISV 및 OEM 벤더의 경우, 완전히 화이트 라벨링된 분석은 브랜드화된 제품 제공의 일부로 최종 고객에게 패키징되어 판매될 수 있으며, 새로운 수익원을 창출합니다. 핵심은 분석 경험이 프리미엄 가격 책정을 정당화하기 위해 네이티브하게 느껴져야 한다는 것입니다. 부착된 대시보드는 같은 인지된 가치를 창출하지 못합니다.

### **What is per-tenant theming and why does it matter?**

퍼-테넌트 테밍은 각 고객이 SaaS 벤더의 브랜드가 아닌 자신만의 정체성으로 분석 계층을 보는 것을 의미합니다. 이는 엔터프라이즈 고객이 사용 중인 SaaS 제품 내에서 그들의 기업 브랜드를 담는 분석을 가질 수 있게 하는 기능입니다. 이는 플랫폼이 별도의 환경 없이 동일한 배포에서 고객별로 다른 브랜드 구성을 적용해야 함을 요구합니다. 엔터프라이즈 고객을 서비스하는 ISV의 경우, 퍼-테넌트 테밍은 종종 좋은 것이 아니라 계약 요구 사항입니다.

### **How is white label analytics different from custom-built analytics?**

사용자 지정 빌드 분석은 모든 요소에 대한 완전한 제어를 제공하지만, 엔지니어링 팀이 모든 계층—데이터 파이프라인, 쿼리 엔진, 시각화 구성 요소, 멀티테넌시, 보안, 그리고 이제 AI—을 구축하고 유지 관리해야 합니다. 화이트 라벨 분석 플랫폼은 이러한 인프라를 관리되는 계층으로 제공하여, 팀이 처음부터 구축하기보다는 구성하고 통합하는 데 집중할 수 있게 합니다. 트레이드오프는 구축 시간과 유지 관리 부담 대 가장자리에서의 유연성입니다. 대부분의 SaaS 제품의 경우, 처음부터 구축하는 시간과 비용이 주변적인 유연성 이점보다 더 큽니다.

***

<div class="banner banner--embedded text-left text-white">
  <p class="banner__headline">브랜드 강화</p>
  <p class="banner__msg">몇 분 만에 영향력 있는 화이트 라벨 분석 대시보드 및 보고서를 만드세요.</p>
  <a href="https://www.revealbi.io/request-demo" class="btn btn-secondary">오늘 시작하기</a>
</div>
