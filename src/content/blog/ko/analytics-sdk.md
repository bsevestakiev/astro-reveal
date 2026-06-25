---
title: '분석 SDK란 무엇인가? 정의, 예시 및 적절한 선택 방법'
description: >-
  분석 SDK가 무엇인지, 그리고 SaaS 제품에 적합한 것을 어떻게 선택하는지 알아보세요. 제약 없이 확장하는 데 무엇을 찾아야 하는지
  확인하세요.
date: '2026-04-08'
author: Casey Ciniello
cover: >-
  /images/2026/04/business_2D00_intelligence_2D00_reveal_2D00_dashboards_2D00_tooltips.jpg
summary: >-
  분석 SDK는 SaaS 팀이 모든 것을 처음부터 구축할 필요 없이 대시보드, 보고서 및 데이터 탐색을 제품에 직접 임베딩할 수 있도록
  합니다. 제품이 팀, 프레임워크 및 지역 전반에 걸쳐 확장됨에 따라 분석은 단순한 기능 이상의 것이 됩니다. 인프라가 됩니다. 그 지점에서
  유연성, 성능 및 제어는 더 이상 선택 사항이 아닙니다. 많은 솔루션이 초기에 비슷해 보이지만, 제품이 성장함에 따라 개발을 늦추거나
  아키텍처 선택을 제한하는 제약을 도입합니다. 현대적인 분석 플랫폼은 팀이 제품을 도구에 맞게 조정하도록 강요하지 않으면서 여러 프레임워크,
  AI 기반 상호 작용 및 확장 가능한 배포를 지원해야 합니다.
takeaways:
  - 분석 SDK를 사용하면 대시보드와 보고서를 제품에 직접 임베딩할 수 있습니다
  - 분석은 빠르게 기능에서 공유 인프라로 진화합니다
  - 'iFrame, API 및 SDK는 서로 다른 트레이드오프를 제공합니다'
  - 제한 사항은 확장함에 따라 나중에 나타나는 경우가 많습니다
  - 현대적인 솔루션은 여러 프레임워크 및 AI 사용 사례를 지원해야 합니다
  - 올바한 접근 방식은 장기적인 복잡성을 추가하지 않으면서 팀에게 제어권을 부여합니다
categories:
  - 임베디드 분석
seo:
  title: 분석 SDK란 무엇이며 어떻게 적절한 것을 선택할까요
  description: >-
    분석 SDK가 무엇인지, 그리고 SaaS 제품에 적합한 것을 어떻게 선택하는지 알아보세요. 제약 없이 확장하는 데 무엇을 찾아야 하는지
    확인하세요.
  ogTitle: 분석 SDK란 무엇이며 어떻게 적절한 것을 선택할까요
  ogDescription: >-
    분석 SDK가 무엇인지, 그리고 SaaS 제품에 적합한 것을 어떻게 선택하는지 알아보세요. 제약 없이 확장하는 데 무엇을 찾아야 하는지
    확인하세요.
  ogType: article
  twitterTitle: 분석 SDK란 무엇이며 어떻게 적절한 것을 선택할까요
  twitterDescription: >-
    분석 SDK가 무엇인지, 그리고 SaaS 제품에 적합한 것을 어떻게 선택하는지 알아보세요. 제약 없이 확장하는 데 무엇을 찾아야 하는지
    확인하세요.
  ogImage: >-
    /images/2026/04/business_2D00_intelligence_2D00_reveal_2D00_dashboards_2D00_tooltips.jpg
source_hash: 7e1284e6
source_locale: en
---
대부분의 팀은 분석 기능을 제품으로 제공하는 데 필요한 노력을 과소평가합니다.

단순한 대시보드로 시작한 것이 데이터 인프라, 권한, 성능, UX 복잡성으로 빠르게 변모합니다. 대부분의 맞춤형 분석 노력은 바로 이 지점에서 무너집니다.

사용자는 애플리케이션을 떠나지 않고도 자신의 데이터를 보고 조치하기를 기대합니다. 분석 기능이 부족하거나 연결되어 있지 않으면 채택률이 떨어지고 사용자는 외부 도구로 눈을 돌립니다. 이러한 압박은 팀들이 분석 기능을 핵심 제품 경험으로 가져오도록 만듭니다.

문제는 겉보기에는 간단해 보이는 것이 빠르게 확장된다는 것입니다. 팀들은 데이터 파이프라인, 권한 로직, 그리고 배포를 늦추는 프런트엔드 작업에 직면합니다.

바로 이 지점에서 분석 SDK가 접근 방식을 바꿉니다. 모든 것을 처음부터 구축하는 대신, 팀들은 분석 기능을 제품에 직접 통합하여 통제력을 잃지 않으면서 더 빠르게 움직일 수 있습니다.

## 분석 SDK란 무엇인가

분석 SDK는 SaaS 팀이 대시보드, 보고서 및 데이터 탐색 기능을 제품에 직접 임베딩할 수 있도록 하는 개발자 도구 세트입니다.

이는 사용자의 데이터, 애플리케이션, 그리고 사용자 간의 다리 역할을 하며, 분석 기능이 어떻게 제공되고, 표시되고, 제어되는지를 처리합니다.

분석 기능을 처음부터 구축하는 대신, 개발자들은 데이터 시각화, 사용자 상호 작용, 그리고 애플리케이션 내 접근 제어를 처리하는 사전 구축된 레이어를 통합합니다.

일반적인 분석 SDK에는 다음이 포함됩니다:

- 대시보드 및 시각화 구성 요소

- 여러 데이터 소스에 걸친 데이터 연결성

- 사용자 정의 및 제어를 위한 API

- 필터링 및 드릴다운과 같은 사용자 상호 작용

이러한 구성 요소들은 애플리케이션 내에서 실행되며 아키텍처와 일치합니다. 분석은 별도의 레이어가 아니라 제품의 일부가 됩니다.

모든 솔루션이 같은 방식으로 작동하는 것은 아닙니다.

일부는 분석 기능을 통합하거나 사용자 정의하는 방식을 제한합니다. 다른 일부는 규모가 커질 때만 나타나는 제약 조건을 도입하며, 이때 변경 사항이 비용이 많이 들고 관리하기 어려워집니다.

## SDK 대 API 대 iFrame

팀들은 분석 SDK를 선택하는 것부터 시작하는 경우는 드뭅니다. 그들은 가능한 한 빨리 제품에 대시보드를 추가하려고 시도하는 것부터 시작합니다. 이는 일반적으로 세 가지 접근 방식, 즉 iFrame, API, 또는 SDK로 이어지며, 각각은 다른 트레이드오프를 가지고 있습니다.

| 접근 방식 | 제어력 | UX | 개발 노력 | 가장 적합한 경우 |
| -------- | ------- | ------ | ---------- | ------------------------------------------------------------------- |
| iFrame | 낮음 | 미흡 | 낮음 | 예산이 제한적이고 간단한 분석 기능이 필요한 소규모 팀 |
| API | 높음 | 맞춤형 | 높음 | 전담 엔지니어링 리소스를 활용하여 완전히 맞춤화된 분석 경험을 구축하는 팀 |
| SDK | 높음 | 네이티브 | 중간 | 완전한 제어력과 빠른 배포를 통해 분석 기능을 임베딩하는 SaaS 제품 |

.sdk-table-header-controls { display: flex; justify-content: flex-end; align-items: center; margin-bottom: 10px; position: relative; }  .sdk-expand-icon { background: #fff; color: white; border: none; border-radius: 6px; width: 40px; height: 40px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; backdrop-filter: blur(4px); opacity: 1; visibility: visible; transform: translateY(0); position: relative; z-index: 10; }  .sdk-expand-icon:hover { background: #fff; transform: scale(1.1); }  .sdk-expand-icon img { transition: transform 0.2s ease; }  .sdk-expand-icon:hover img { transform: scale(1.1); }  .sdk-table-responsive-sm { overflow-x: auto !important; -webkit-overflow-scrolling: touch; max-width: 100vw; position: relative; border: none; border-radius: 0.375rem; box-shadow: inset -5px 0 11px 1px #00000014; transition: all 0.5s ease; }  .sdk-table-expanded { position: fixed !important; top: 0; left: 0; width: 100vw !important; height: 100vh !important; z-index: 999999; background: rgba(255, 255, 255, 0.95); margin: 0 !important; border-radius: 0 !important; box-shadow: none !important; overflow: auto !important; padding: 40px 20px 20px 20px; backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; }  .sdk-table-expanded .sdk-table-responsive-sm { max-width: 95vw !important; max-height: 85vh !important; overflow: auto !important; border-radius: 8px !important; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3) !important; background: white !important; z-index: 1; }  .sdk-table-expanded .sdk-comparison-table { min-width: auto !important; width: 100% !important; margin: 0 !important; position: relative !important; top: auto !important; left: auto !important; transform: none !important; max-height: none !important; }  .sdk-table-expanded .sdk-comparison-table th, .sdk-table-expanded .sdk-comparison-table td { white-space: normal !important; word-wrap: break-word; max-width: none !important; padding: 15px 10px !important; font-size: 14px; }  .sdk-table-expanded .sdk-table-header-controls { display: none !important; }  .sdk-close-expanded { position: fixed; top: 20px; right: 20px; z-index: 1000000; background: #dc3545; color: white; border: none; border-radius: 50%; width: 50px; height: 50px; font-size: 20px; cursor: pointer; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); transition: all 0.3s ease; }  .sdk-close-expanded:hover { background: #c82333; transform: scale(1.1); }  .sdk-comparison-table { min-width: 100% !important; width: 100%; table-layout: fixed; margin-bottom: 0; position: relative; }  .sdk-comparison-table th, .sdk-comparison-table td { padding: 12px 8px !important; min-width: 50px; border: none !important; text-overflow: initial; overflow: visible; white-space: normal; word-break: break-word; }  .sdk-comparison-table th:last-child, .sdk-comparison-table td:last-child { width: 220px; min-width: 220px; max-width: 220px; }  .sdk-comparison-table th { background-color: #f8f9fa; font-weight: 600; position: sticky; top: 0; z-index: 10; }  .sdk-comparison-table tr th { background: #666; color: #fff; }  .sdk-comparison-table tr td { border: none !important; z-index: 1; position: relative; }  .sdk-comparison-table td:first-child, .sdk-comparison-table th:first-child { position: sticky !important; left: 0; z-index: 5; min-width: 130px; font-weight: 600; border: none !important; overflow: visible; }  .sdk-comparison-table td:first-child::after, .sdk-comparison-table th:first-child::after { content: ""; position: absolute; top: 0; right: 0; bottom: 0; width: 10px; pointer-events: none; border-right: 1px solid #ccc; box-shadow: 10px 0px 10px 0px #00000014; }  .sdk-comparison-table tbody tr:nth-of-type(odd) td:first-child { background-color: #fff !important; }  .sdk-comparison-table tbody tr:nth-of-type(even) td:first-child { background-color: #f5f6fb !important; }  .sdk-comparison-table tbody tr:nth-of-type(even) td { background-color: #f5f6fb; }  .sdk-comparison-table tbody tr:nth-of-type(odd) td { background-color: #fff; }  .sdk-comparison-table th:first-child { background-color: #ec417a !important; z-index: 15; color: #fff; width: 130px; }  .sdk-table-responsive-sm::after { content: "← Swipe to see more →"; display: block; text-align: center; font-size: 12px; color: #6c757d; padding: 8px; background-color: #f8f9fa; border-top: 1px solid #dee2e6; }  .sdk-table-expanded::after { display: none !important; }  @media (min-width: 1200px) { .sdk-table-responsive-sm::after { display: none; } }  @media (max-width: 768px) { .sdk-expand-icon { width: 35px; height: 35px; }  .sdk-table-expanded { padding: 10px; }  .sdk-table-expanded .sdk-comparison-table th, .sdk-table-expanded .sdk-comparison-table td { font-size: 12px; padding: 8px 5px !important; } }

<script>document.addEventListener('DOMContentLoaded', function () { const expandBtn = document.getElementById('expandSdkTable'); const headerControls = document.querySelector('.sdk-table-header-controls');  if (!expandBtn || !headerControls) { return; }  expandBtn.addEventListener('click', function () { const closeBtn = document.createElement('button'); closeBtn.className = 'sdk-close-expanded'; closeBtn.innerHTML = '✕'; closeBtn.title = 'Close expanded view';  const colContainer = headerControls.parentElement; colContainer.classList.add('sdk-table-expanded'); document.body.appendChild(closeBtn); document.body.style.overflow = 'hidden';  function closeExpanded() { colContainer.classList.remove('sdk-table-expanded'); if (document.body.contains(closeBtn)) { document.body.removeChild(closeBtn); } document.body.style.overflow = ''; document.removeEventListener('keydown', handleEscape); }  function handleEscape(e) { if (e.key === 'Escape') { closeExpanded(); } }  closeBtn.addEventListener('click', closeExpanded); document.addEventListener('keydown', handleEscape); }); });</script>

### iFrame

구현하기는 가장 빠르지만, 제한적입니다:

- 최소한의 사용자 정의 기능

- 단절된 사용자 경험

- 상호 작용에 대한 통제력 부족

### API

완전한 제어력을 제공하지만, 모든 책임을 팀에 전가합니다:

- 대시보드 및 상호 작용을 처음부터 구축해야 함

- 지속적인 유지보수 및 복잡성

- 장기적인 배포 속도가 느림

### SDK

속도와 제어력의 균형을 맞춥니다:

- 사용자 정의가 가능한 사전 구축 구성 요소

- 제품에 대한 네이티브 통합

- 유연성을 희생하지 않으면서 빠른 배포

![iFrame을 사용한 임베디드 분석 대 네이티브 분석 SDK](/images/2024/12/best-analytics-integration-option-1.png)

분석 기능이 제품 경험의 일부가 됨에 따라, 대부분의 SaaS 팀은 양 극단의 트레이드오프를 피하기 위해 SDK 기반 접근 방식으로 이동합니다. 차이점은 실제 제품 시나리오에서 [임베디드 분석 대 iFrame](/blog/embedded-analytics-vs-iframes)을 비교할 때 더욱 명확해집니다.

## 분석 SDK 작동 방식

제품 내의 분석 기능은 단순한 시각적 레이어가 아닙니다. 모든 상호 작용은 데이터가 실시간으로 액세스되고, 보호되고, 제공되는 방식에 달려 있습니다. 분석 SDK는 이러한 조각들을 애플리케이션 내에 모아 팀들이 분석 기능이 처음부터 끝까지 어떻게 작동하는지 제어할 수 있도록 합니다.

### 클라이언트 측

클라이언트 측에서 SDK는 사용자가 보고 상호 작용하는 모든 것을 처리합니다:

- UI 내에 렌더링되는 대시보드 및 시각화

- 사용자 상호 작용을 위한 필터 및 드릴다운

- 사용자 입력 기반의 실시간 업데이트

이 레이어는 분석 기능이 외부 도구가 아니라 제품의 네이티브 부분처럼 느껴지도록 보장합니다.

### 서버 측

서버 측에서 SDK는 데이터가 액세스되고 제공되는 방식을 관리합니다:

- [데이터 소스](/data-sources)에 대해 실행되는 쿼리

- 사용자별로 적용되는 권한 로직

- 실시간 응답에 최적화된 성능

이 레이어는 분석 기능을 데이터 소스에 연결하고 애플리케이션의 나머지 부분과 동일한 규칙을 강제합니다.

이러한 레이어들은 데이터 이동 방식과 상호 작용 동작을 제어하는 API를 통해 통신합니다. 개발자들은 전체 분석 스택을 재구축할 필요 없이 경험을 형성할 수 있습니다. 이는 팀들에게 아키텍처 일관성을 유지하면서 유연성을 제공합니다.

SaaS 팀에게 이 모델은 여러 애플리케이션에 걸쳐 [임베디드 분석](/embedded-analytics)을 확장하기 쉽게 만듭니다. 분석 기능은 제품과 일치하게 유지되며, 팀들은 전체 시스템을 구축하고 유지 관리하는 오버헤드를 피할 수 있습니다.

## SaaS 기업이 분석 SDK가 필요한 이유

어느 시점에서든 모든 SaaS 팀은 같은 벽에 부딪힙니다. 분석 기능은 기능으로 시작하지만, 고객, 데이터 세트, 사용 사례 전반에 걸쳐 확장되어야 하는 인프라가 됩니다.

![애플리케이션에 분석 SDK를 추가하는 이점](/images/2023/03/native-sdk-vs-iframes-for-embedded-analytics.png)

변하는 것은 단순히 규모만이 아니라 기대치입니다:

- 고객별 테넌트 수준 데이터 격리

- 더 큰 데이터 세트에서의 성능

- 사용 사례 전반에 걸친 유연한 제공

- 원활한 제품 내 경험

대부분의 팀은 이러한 변화가 얼마나 빠르게 일어나는지 과소평가합니다.

그들은 몇 개의 대시보드를 출시한 다음, 고객들이 접근을 요청합니다. 권한, 성능, 확장성은 빠르게 지속적인 작업이 됩니다. 이때 분석 기능은 더 이상 기능이 아닙니다. 유지 관리해야 하는 무언가가 됩니다.

분석 SDK는 팀들에게 이를 처리하는 구조화된 방법을 제공합니다. 각 사용 사례에 대한 로직을 재구축하는 대신, 제품에 적응하는 일관된 레이어를 사용합니다.

[Datacom](/stories/datacom-case-study)은 명확한 예시입니다. 이 팀은 [Reveal](/)을 사용하여 플랫폼에 분석 기능을 임베딩함으로써, 애플리케이션을 떠나지 않고 사용자에게 실시간 가시성을 제공했습니다. 이는 개발 오버헤드를 증가시키지 않으면서 분석 기능을 확장할 수 있게 했습니다.

## 대부분의 분석 SDK의 숨겨진 한계

분석 SDK를 평가하는 팀들은 종종 [임베디드 분석 기능](/features) 목록에 초점을 맞춥니다. 언뜻 보기에는 대부분의 플랫폼이 비슷해 보입니다. 대시보드, 통합, 설정은 비교 가능해 보입니다.

차이점은 실제 구현 과정에서 나타납니다.

일반적인 한계에는 다음이 포함됩니다:

- **제한적인 프레임워크 지원:** 일부 도구는 단일 프레임워크만 지원하여 팀들이 스택을 조정하거나 불일치를 도입하도록 강요합니다.

- **부분적인 SDK:** 많은 것이 API에 크게 의존하므로, 개발자들은 여전히 분석 경험의 핵심 부분을 구축해야 합니다.

- **통합 제약:** 분석 기능이 제품의 네이티브 부분이 아니라 별도의 시스템처럼 작동합니다.

- **확장 문제:** 성능, 멀티테넌시, 데이터 복잡성은 시간이 지남에 따라 관리하기 어려워집니다.

이러한 문제들은 초기 데모에서는 거의 나타나지 않습니다. 분석 기능이 핵심 제품의 일부가 되어 팀, 애플리케이션, 고객 전반에 걸쳐 확장되어야 할 때 표면화됩니다. 이때 [임베디드 분석 유연성](/blog/embedded-analytics-flexibility)이 결정적인 요소가 됩니다.

## SaaS 기업의 멀티-프레임워크 현실

SaaS 기업은 거의 단일 프레임워크로 운영되지 않습니다. 제품이 성장하고 팀이 지역을 넘어 확장됨에 따라, 각 팀은 전문 지식과 가용성에 따라 다른 기술을 사용합니다.

### 일반적인 멀티-프레임워크 설정

- 미국 팀이 Angular로 구축한 애플리케이션 하나

- 유럽 팀이 React로 개발한 제품 하나

- .NET 워크로드를 위해 Blazor에서 실행되는 세 번째 시스템

팀들은 채용 가능성, 기존 시스템, 배포 속도에 따라 프레임워크를 선택합니다. 시간이 지남에 따라 이는 제품 전반에 걸쳐 멀티-프레임워크 환경을 만듭니다.

대부분의 분석 SDK 도구는 이 환경에서 깨집니다. 그들은 단일 프레임워크를 강요하거나 애플리케이션 전반에 걸쳐 분석 기능을 통합하는 방식을 제한합니다. 이는 팀 간의 마찰을 일으키고 배포를 늦춥니다.

### 이것이 초래하는 것

- 팀들이 사용하지 않는 프레임워크를 채택합니다.

- SDK에 맞추기 위해 애플리케이션이 재작성됩니다.

- 제품 전반에 걸쳐 분석 기능이 다르게 작동합니다.

팀들은 결국 제품을 분석 레이어에 맞게 조정하게 됩니다. 이는 비효율성을 초래하고 새로운 기능이 얼마나 빨리 출시될 수 있는지 늦춥니다.

귀하의 분석 SDK는 귀하의 아키텍처에 적응해야 하며, 그것을 지시해서는 안 됩니다. 여러 애플리케이션에 걸쳐 작업하는 SaaS 팀에게 유연성은 분석 기능이 확장될지 아니면 각 제품에 대해 재구축되어야 할지를 결정합니다.

## 현대 분석 SDK가 여러 프레임워크를 지원하는 방법

현대 분석 SDK는 분석 엔진을 프런트엔드와 분리함으로써 여러 프레임워크를 지원합니다. 단일 스택을 강요하는 대신, 다양한 프레임워크에서 작동하는 일관된 백엔드 레이어를 제공합니다.

Reveal과 같은 플랫폼은 다음을 통해 이를 지원합니다:

- **React, Angular, Blazor, .NET, Web Components, jQuery, JavaScript**용 네이티브 SDK

- 쿼리, 데이터 처리 및 렌더링을 위한 공유 분석 엔진

- 모든 프레임워크에 걸친 일관된 API 레이어

- 애플리케이션 전반의 재사용 가능한 대시보드 및 비즈니스 로직

### 이것이 가능하게 하는 것

- 팀들은 선호하는 프레임워크 내에서 작업합니다.

- 프런트엔드 스택은 변경되지 않습니다.

- 분석 기능은 제품 전반에 걸쳐 일관되게 유지됩니다.

- 각 애플리케이션에 대해 분석 기능을 재구축할 필요가 없습니다.

SaaS 팀에게 이는 주요 마찰 원인을 제거합니다. 팀들은 단일 프레임워크에 표준화하는 것을 피하면서도 여러 제품 전반에 걸쳐 일관된 분석 경험을 제공할 수 있습니다.

### 규모에서 중요한 이유

- 하나의 분석 레이어가 여러 애플리케이션과 팀을 지원합니다.

- 개발은 지역과 스택 전반에 걸쳐 유연하게 유지됩니다.

- 팀들은 중복 작업 및 재구현을 피합니다.

임베딩만 지원하는 것으로는 충분하지 않습니다. 분석 SDK는 SaaS 제품이 구축되는 방식과 일치하도록 여러 프레임워크를 지원해야 합니다.

## AI가 분석 SDK를 변화시키는 방법

AI는 사용자가 데이터와 상호 작용하는 방식을 변화시킵니다. 보고서를 구축하는 대신, 사용자는 데이터를 직접 쿼리하고, 통찰력을 생성하며, 심지어 단일 프롬프트에서 [AI 생성 대시보드](/blog/ai-generated-dashboard)를 만들 수 있습니다. 이는 수동 작업을 줄이고 분석 기능을 일상적인 워크플로우에 더 가깝게 가져오기 때문에, 더 많은 팀이 제품 내에서 [AI 기반 분석](/blog/ai-powered-analytics)을 채택하고 있습니다.

![AI 향상 분석 SDK](/images/reveal-embedded-ai-dev-focused-dashboard.webp)

분석 SDK는 이를 지원하기 위해 시각화를 넘어 나아가야 합니다. 다음을 처리해야 합니다:

- 데이터 모델에 매핑된 자연어 쿼리

- 사용자, 대시보드, 데이터 전반의 상황 인식

- 모든 상호 작용에서의 권한 강제

- [AI 토큰 비용](/blog/ai-token-cost) 및 사용량을 제어하기 위한 효율적인 처리

이러한 요구 사항은 실제 제약 조건을 도입합니다. AI는 데이터 경계 내에서 작동하고, 권한 모델을 따르며, 비용을 예측 불가능하게 증가시키지 않으면서 확장되어야 합니다.

그렇지 않으면 팀들은 데이터 액세스와 지출 모두에 대한 통제력을 잃습니다.

대부분의 플랫폼은 이런 방식으로 구축되지 않았습니다. 그들은 기존 시스템 위에 AI 분석 기능을 추가하여 보안, 제어 및 비용 관리의 격차를 만듭니다.

## 분석 SDK에서 찾아야 할 것

결정은 분석 SDK를 사용할지 여부가 아니라, 제품과 함께 확장할 수 있는 어떤 SDK인지입니다. 잘못된 선택은 제품이 성장함에 따라 나타나는 제약 조건을 도입합니다.

다음 핵심 요소부터 시작하십시오:

**1. 구축 대 구매**

분석 레이어를 구축하는 것은 완전한 제어력을 제공하지만, 최소 $350,000의 투자, 구축에 7개월 이상, 데이터 파이프라인, 전담 팀, 권한 및 프런트엔드 구성 요소에 대한 지속적인 투자가 필요합니다. 분석 SDK를 구매하는 것은 개발 노력을 줄이고 배포를 가속화하지만, 솔루션이 아키텍처에 맞는 경우에만 해당됩니다.

**2. 네이티브 통합 (iFrame 없음)**

SDK는 애플리케이션 내에 네이티브 구성 요소를 제공해야 합니다. iFrame은 사용자 정의를 제한하고 단절된 경험을 만듭니다.

**3. 멀티-프레임워크 지원**

React, Angular, Blazor와 같은 프레임워크를 지원하면 팀들이 마찰 없이 기존 스택으로 작업할 수 있습니다.

**4. 사용자 정의 및 제어**

분석 기능은 제품과 일치해야 합니다. [화이트 라벨 분석](/white-label-analytics) SDK는 UI, 상호 작용 및 데이터 표시를 제어할 수 있어야 합니다.

**5. 성능 및 확장성**

분석 기능은 느려지지 않으면서 증가하는 데이터와 사용량을 처리해야 합니다. 규모에서 실시간 성능을 확인하십시오.

**6. 보안 및 배포 유연성**

클라우드 및 [온프레미스 분석](/on-prem-analytics) 환경을 포함하여 데이터가 처리되는 위치를 제어해야 합니다.

**7. 데이터 연결성**

SDK는 광범위한 데이터 소스에 연결하고 기존 시스템과 통합해야 합니다.

강력한 솔루션은 아키텍처에 맞고, 팀을 지원하며, 제한을 도입하지 않고 제품과 함께 확장됩니다.

## Reveal: 현대 SaaS를 위한 유연한 분석 SDK

대부분의 도구는 팀들에게 제품을 분석 레이어에 맞추도록 강요합니다. Reveal은 정반대의 접근 방식을 취합니다. 이는 제품에 맞추는 것이 아니라, 아키텍처에 맞습니다.

Reveal은 다음을 통해 현대 SaaS 환경을 지원합니다:

- React, Angular, Blazor, .NET, Web Components, jQuery, JavaScript용 네이티브 SDK

- 애플리케이션 전반에 걸쳐 로직을 일관되게 유지하는 공유 분석 엔진

- 제품 전반의 재사용 가능한 대시보드 및 비즈니스 로직

- 프레임워크 전반의 일관된 API 레이어

- UI, 브랜딩 및 사용자 경험에 대한 제어력을 갖춘 완전한 화이트 라벨 분석

이를 통해 팀들은 단일 프레임워크에 표준화하지 않고도 여러 애플리케이션에서 하나의 솔루션을 사용할 수 있습니다. 각 팀은 자체 스택으로 작업하는 동안, 분석 기능은 제품 전반에 걸쳐 일관되게 유지됩니다.

그 영향은 즉각적입니다:

- 애플리케이션을 재작성할 필요가 없습니다.

- 팀 간의 의존성이 적습니다.

- 더 빠른 기능 배포가 가능합니다.

Reveal은 또한 분석 레이어 내에서 AI를 지원합니다. 팀들은 권한, 데이터 액세스 및 비용을 제어하면서 자연어 쿼리 및 AI 생성 대시보드를 포함한 [AI 분석](/ai)을 활성화할 수 있습니다.

배포는 동일한 모델을 따릅니다. 팀들은 요구 사항에 따라 클라우드, 하이브리드 또는 온프레미스 분석 환경에서 Reveal을 실행할 수 있습니다.

여러 제품과 지역에 걸쳐 운영되는 SaaS 팀에게 Reveal은 제품을 제한하는 대신 제품에 적응합니다.

\[cta\_banner type='임베디드 분석']

</source>
