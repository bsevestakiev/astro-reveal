---
title: React 앱에 Node.js로 임베딩 셀프 서비스 BI 구현하기
description: React 애플리케이션에 분석을 임베딩하면 사용자의 워크플로우 내에서 관련성 높고 시의적절한 통찰력을 얻을 수 있습니다.
date: '2023-05-16'
author: Bilyana Petrova
cover: /images/2023/05/embedding-analytics-in-react-apps-with-nodejs.png
heroImage: /images/2023/05/reveal-embed-BI-in-nodejs-react-internal-header.svg
summary: >-
  React 애플리케이션에 분석을 임베딩하면 사용자의 워크플로우 내에서 관련성 높고 시의적절한 통찰력을 얻을 수 있으며, 데이터 기반 문화를
  촉진하고 분석적 사고를 장려합니다.
categories:
  - 기술 통찰력
seo:
  title: React 앱에 Node.js로 임베딩 셀프 서비스 BI 구현하기
  description: React 애플리케이션에 분석을 임베딩하면 사용자의 워크플로우 내에서 관련성 높고 시의적절한 통찰력을 얻을 수 있습니다.
  ogTitle: React 앱에 Node.js로 임베딩 셀프 서비스 BI 구현하기
  ogDescription: React 애플리케이션에 분석을 임베딩하면 사용자의 워크플로우 내에서 관련성 높고 시의적절한 통찰력을 얻을 수 있습니다.
  ogType: article
  twitterTitle: React 앱에 Node.js로 임베딩 셀프 서비스 BI 구현하기
  twitterDescription: React 애플리케이션에 분석을 임베딩하면 사용자의 워크플로우 내에서 관련성 높고 시의적절한 통찰력을 얻을 수 있습니다.
  ogImage: /images/2023/05/embedding-analytics-in-react-apps-with-nodejs.png
source_hash: 045f1edb
source_locale: en
---
오늘날 데이터 기반 세계에서, [SaaS 애플리케이션 내부에 대시보드 및 분석 기능을 직접 통합하는 것](/blog/embedded-analytics-for-saas-companies)은 필수입니다. 분석 임베딩에는 더 빠른 시장 출시 시간, 생산성 및 성능 향상, 그리고 수익 성장을 포함하여 많은 [이점](/blog/benefits-of-embedded-analytics)이 있습니다.

분석 임베딩을 React 애플리케이션에 적용하면 사용자 워크플로우 내에서 관련성 높고 시의적절한 통찰력을 제공하여 [데이터 기반 문화](/whitepapers/creating-data-driven-culture)를 촉진하고 더 많은 분석적 사고를 장려합니다.

[임베디드 분석](/embedded-analytics) 솔루션인 Reveal은 이러한 목표를 달성하는 데 도움을 줄 수 있습니다.

Reveal은 인-컨텍스트 편집, 데이터 블렌딩, 대시보드 연결, 계산 필드 등 [분석 기능](/blog/embedded-analytics-features)을 사용하여 React 애플리케이션에 대화형 대시보드와 보고서를 쉽고 빠르게 임베딩할 수 있도록 도와줍니다.

이 문서에서는 Node.js를 사용하여 React 기반 앱에 Reveal을 구현하는 방법을 안내합니다.

**무료 PDF 사본 받기**

접근 권한을 얻으려면 양식을 작성해 주세요.

죄송합니다. 양식에 문제가 발생한 것 같습니다. 몇 분 후에 [다시 시도해 주세요](/blog/embedding-self-service-bi-in-react-apps-with-node-js#) . 여전히 문제가 발생하면, [support@revealbi.io](mailto:support@revealbi.io)로 연락하여 저희에게 문제를 알려주세요.

필수

불행하게도, Google은 귀하를 봇으로 간주했습니다. 찾고 계신 자료를 얻으려면 [support@revealbi.io](mailto:support@revealbi.io)로 연락하거나 제품 데모를 예약하는 것을 선택해 주세요.
성공적으로 제출하려면 양식 약관에 동의해야 합니다.
이 이메일 주소는 유효하지 않은 것 같습니다. 업데이트하고 다시 시도해 주세요.
비즈니스 이메일 주소를 사용해 주세요.

국가

비즈니스 이메일

이름

성

저는 Infragistics의 [이용 약관](/terms-of-use) 및 [개인 정보 보호 정책](/privacy-policy)에 동의합니다.

이 사이트는 reCAPTCHA에 의해 보호되며 Google 개인정보 보호정책 및 서비스 약관이 적용됩니다.

PDF 다운로드

![React 앱에 Node.js로 셀프 서비스 BI 임베딩](https://static.infragistics.com/marketing/slingshot/checkmark.svg)

### PDF가 다운로드 중입니다!

읽고 배우는 즐거움을 누리세요.

**PDF:** 성공적인 구현에 필요한 전략적 계획, 선택, 개발 및 지속적인 개선 단계를 자세히 설명하는 무료 ‘엔드투엔드 임베디드 BI 배포 가이드’를 받으세요. **[여기서 PDF 다운로드!](https://static.infragistics.com/marketing/reveal/whitepapers/reveal-end-to-end-BI-deployment-guide.pdf)**

## React 앱에 BI를 임베딩해야 하는 이유?

React 앱의 목적에 관계없이, 임베디드 분석 기능은 워크플로우를 간소화하고, 리소스를 관리하며, 성능을 최적화할 수 있는 엄청난 기회를 제공할 것입니다. [그래프, 차트 및 대시보드](/chart-types)와 같은 BI 도구는 조직 전체의 데이터 리터러시를 향상시키는 능력도 가지고 있습니다. 데이터 리터러시는 읽고, 이해하고, 생성하고, [정보로서 데이터를 전달하는](/glossary/data-driven-storytelling) 능력을 의미하며, 사용자가 더 좋고 스마트한 결정을 내리는 데 도움이 됩니다. [데이터 기반 의사 결정](/blog/reveal-data-driven-decision-making)은 추측이나 직감에 의존하는 것이 아니라 사실에 기반하기 때문에 매우 중요합니다. 분석에 접근하면 누구나 자신감 있게 그리고 영향이 미치는 순간에 더 지능적인 결정을 내릴 수 있습니다.

## Node.js를 사용하여 Reveal React 앱에 분석 임베딩하기

[Reveal 임베디드 분석](/embedded-analytics)은 대화형 보고서, 대시보드 등을 React 앱에 쉽게 임베딩할 수 있도록 도와줍니다. [머신러닝](/glossary/machine-learning), 대시보드 연결, 통계 함수, 계산 필드, 풍부한 데이터 분석, 셀프 서비스, [화이트 라벨링](/blog/white-label-analytics), 데이터 블렌딩 등과 같은 기능을 통해 Reveal은 모든 React 기반 애플리케이션에 엄청난 가치를 더할 수 있습니다.

더 나아가, Reveal의 네이티브 SDK를 사용하면 React 앱에 BI를 통합하는 것이 매우 쉬우며, 추가 요구 사항 없이 애플리케이션에 분석을 임베딩할 수 있습니다. Reveal의 유연한 아키텍처와 풍부한 API는 앱의 기능을 제어할 수 있게 하여 사용자 경험의 원활한 부분이 되도록 만듭니다.

자, 이제 [Reveal SDK](/download-sdk)를 사용하여 React 앱에 분석을 임베딩해 보겠습니다.

이 튜토리얼에서는 Node.js 서버를 사용할 것입니다.

\*이미 Node.js 서버가 있습니다. 직접 만드는 방법을 알아보려면, [Node.js로 Reveal SDK 서버 설정하기](https://help.revealbi.io/web/getting-started-server-node)에 대한 단계별 튜토리얼을 확인해 보세요.

**1. index.html에 필요한 스크립트 참조 추가**

```generic
<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" type="text/css">

<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script> 
<script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script> 
<script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script> 
<script src="https://dl.revealbi.io/reveal/libs/1.3.1/infragistics.reveal.js"></script>
```

**2. app.tsx에 RevealView를 렌더링하는 데 사용될 <div> 추가**

```generic
function App() {

return (

<div id="revealView" style={{height: "100vh", width: "100%"}}></div>

);

}
```

**3. app.tsx에서 RevealView 객체를 초기화하고 대시보드 로드**

```generic
useEffect(() => {

$.ig.RVDashboard.loadDashboard(dashboardId).then((dashboard: any) => {

var revealView = new $.ig.RevealView("#revealView");

revealView.dashboard = dashboard;

});

}, [dashboardId]);
```

단 3단계의 쉬운 과정만으로 Reveal에 대시보드를 로드하는 기본 방법을 익힐 수 있습니다. 전체 튜토리얼을 보려면, 개발자 도구 수석 부사장인 Jason Beres가 React 앱에서 대시보드를 로드하고 검색하는 과정을 단계별로 안내하는 이 비디오를 시청하세요.

[https://www.youtube.com/watch?v=o1XoppSfX8E\&t=2s](https://www.youtube.com/watch?v=o1XoppSfX8E&t=2s)

임베디드 분석 및 비즈니스 인텔리전스에 대한 더 심층적인 정보와 비즈니스에 있어 데이터의 중요성에 대해서는 [저희 YouTube 채널](https://www.youtube.com/@RevealBI)의 다른 비디오도 시청해 주세요. 저희는 [Angular에 분석 임베딩](/blog/embedding-bi-in-angular-apps), [Blazor](/blog/embedding-bi-in-blazor-applications), JavaScript HTML 앱 등, 임베디드 BI 대시보드를 만드는 방법 등 다양한 주제를 다루고 있습니다. 전문가들의 향후 비디오를 놓치지 않으려면 구독하는 것을 잊지 마세요.

또한, Node.js를 사용하여 Reveal React 앱에 분석을 임베딩하는 과정에서 문제가 발생하면 [저희 Discord 채널](https://discord.com/invite/Ped3sSK5Xw)을 통해 제품 팀에 문의하세요.

Reveal이 무엇이며 어떻게 작동하는지에 대해서도 [무료 제품 투어 예약](/request-demo)을 통해 더 많이 배울 수 있습니다. 또는, [저희 SDK를 다운로드](/download-sdk)하여 직접 사용해 볼 수도 있습니다.

\[cta\_banner type='{TYPE}' headline='데이터 기반 의사 결정 시작하기' msg= '오늘부터 모든 비즈니스 사용자에게 BI의 힘을 전달하세요.' button\_text= '더 알아보기' button\_link='[https://www.revealbi.io/request-demo](https://www.revealbi.io/request-demo)' class='banner--embedded']
