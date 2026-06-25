---
title: Angular 앱에 임베디드 분석을 통합하는 방법 (.NET Core 사용)
description: >-
  어떻게 하면 .NET Core 백엔드를 사용하는 Angular 애플리케이션에 임베디드 분석을 통합하여 참여도를 높이고 ROI를 창출하는 더
  나은 의사 결정 기능을 확보할 수 있는지 알아보세요.
date: '2025-01-20'
author: Casey Ciniello
cover: >-
  /images/2025/01/reveal-embedded-analytics-in-angular-app-with-net-core-thumbnail.png
heroImage: >-
  /images/2025/01/reveal-embedded-analytics-in-angular-app-with-net-core-header-1.svg
summary: >-
  Reveal을 사용하면 .NET Core를 이용해 Angular 앱에 분석을 임베딩하여 앱의 워크플로우 내에서 실시간 인사이트를 제공할 수
  있으며, 외부 도구나 컨텍스트 전환의 필요성을 없애줍니다. 이 가이드는 복잡성을 뚫고 분석을 자연스럽고, 빠르고, 원활하게 제공하는 방법을
  간단하게 보여줍니다.
categories:
  - 기술 통찰력
seo:
  title: Angular 앱에 임베디드 분석을 통합하는 방법 (.NET Core 사용)
  description: >-
    어떻게 하면 .NET Core 백엔드를 사용하는 Angular 애플리케이션에 임베디드 분석을 통합하여 참여도를 높이고 ROI를 창출하는
    더 나은 의사 결정 기능을 확보할 수 있는지 알아보세요.
  ogTitle: Angular 앱에 임베디드 분석을 통합하는 방법 (.NET Core 사용)
  ogDescription: >-
    어떻게 하면 .NET Core 백엔드를 사용하는 Angular 애플리케이션에 임베디드 분석을 통합하여 참여도를 높이고 ROI를 창출하는
    더 나은 의사 결정 기능을 확보할 수 있는지 알아보세요.
  ogType: article
  twitterTitle: Angular 앱에 임베디드 분석을 통합하는 방법 (.NET Core 사용)
  twitterDescription: >-
    어떻게 하면 .NET Core 백엔드를 사용하는 Angular 애플리케이션에 임베디드 분석을 통합하여 참여도를 높이고 ROI를 창출하는
    더 나은 의사 결정 기능을 확보할 수 있는지 알아보세요.
  ogImage: >-
    /images/2025/01/reveal-embedded-analytics-in-angular-app-with-net-core-thumbnail.png
source_hash: 1b5bce47
source_locale: en
---
## Angular 및 .NET Core에서의 임베디드 분석 소개

임베디드 분석은 더 이상 선택적 기능이 아니라 현대 애플리케이션에 필수적인 요소입니다. 2025년에는 사용자들이 매일 사용하는 도구 내에서 실시간 인사이트에 대한 원활한 접근을 요구합니다. 임베디드 분석을 Angular 애플리케이션과 .NET Core 백엔드에 통합함으로써, 기업은 참여도와 ROI를 높이는 데이터 기반 의사 결정 기능을 통해 제품을 향상시킬 수 있습니다.

이 가이드는 [Reveal Embedded Analytics](/embedded-analytics)를 사용하여 소프트웨어 제품에 분석을 임베딩하는 방법에 대한 포괄적인 워크스루를 제공합니다. 분석을 통합하는 개발자이든 기능 개선을 계획하는 제품 관리자이든, 이 단계별 가이드는 필요한 통찰력을 제공합니다.

## 임베디드 분석 이해하기

임베디드 분석은 데이터 시각화 및 비즈니스 인텔리전스(BI) 도구를 소프트웨어 애플리케이션에 직접 통합하는 것을 의미합니다. 독립형 BI 솔루션과 달리, 임베디드 분석은 사용자가 플랫폼 간 전환 없이 컨텍스트 내에서 인사이트에 접근할 수 있도록 합니다.

### **임베디드 분석이 필수적인 이유?**

- **워크플로우 간소화:** 사용자는 단일 애플리케이션 내에서 데이터를 분석하고 조치를 취할 수 있습니다.

- **향상된 사용자 경험:** 컨텍스트 인식 인사이트는 마찰을 줄이고 의사 결정을 향상시킵니다.

- **제품 가치 증가:** 분석 기능이 갖춰진 애플리케이션은 경쟁 시장에서 차별화됩니다.

### **통합의 이점**

Angular의 동적 프런트엔드 기능과 .NET Core의 강력한 백엔드 인프라를 결합하면 강력한 클라이언트/서버 프레임워크가 생성됩니다.

**여기에 임베디드 분석을 추가하면 다음과 같은 이점을 얻을 수 있습니다:**

1. **향상된 기능성:** 실시간으로 실행 가능한 인사이트를 제공합니다.

2. **사용자 유지율:** 분석적 요구 사항을 해결하여 사용자의 참여를 유지합니다.

3. **확장성:** Angular와 .NET Core는 비즈니스 성장에 맞춰 설계된 애플리케이션을 지원합니다.

## 개발 환경 설정

.NET Core 백엔드를 사용하는 Angular 애플리케이션에 임베디드 분석을 통합하면 실시간 컨텍스트 기반 인사이트를 제공하여 사용자 경험을 크게 향상시킬 수 있습니다.

아래 지침은 개발 환경을 설정하고 Reveal을 원활하게 구현하는 단계를 설명합니다.

임베디드 분석을 통합하기 전에 개발 환경이 올바르게 구성되었는지 확인하십시오.

### **사전 요구 사항:**

1. **Angular CLI:** Angular 애플리케이션을 생성하고 관리하는 데 사용됩니다.

2. **.NET Core SDK:** 백엔드 서비스를 빌드하는 데 사용됩니다.

3. **Node.js:** Angular 개발에 필요합니다.

4. **Reveal SDK:** 애플리케이션에 분석을 임베딩하는 데 사용됩니다.

## **단계별 가이드: Angular에 Reveal 임베디드 분석 설정하기**

### ***1단계:*** Angular 앱 생성하기

1. **터미널 열기:** 시작하려면 좋아하는 터미널 애플리케이션을 실행합니다

![windows terminal](/images/2025/02/image.jpg)

1. **애플리케이션 디렉터리로 이동:** 디렉터리를 새로 생성된 앱으로 변경하고 선호하는 코드 편집기(*예: **[Visual Studio Code](https://code.visualstudio.com/)***)에서 엽니다.

```
ng new getting-started
```

1. **Node.js:** Angular 개발에 필요합니다.

```
cd getting-started 

code
```

### ***2단계:*** Reveal JavaScript API 추가하기

1. **index.html 파일 수정**
   index.html 파일을 열고 닫는 </body> 태그 바로 위에 다음 스크립트를 추가하여 Reveal JavaScript API를 추가합니다:

```
<script src="https://dl.revealbi.io/reveal/libs/1.7.1/infragistics.reveal.js"></script>
```

1. **추가 종속성 설치**
   다음 필수 라이브러리를 같은 파일에 포함합니다:

**jQuery 2.2 이상:**

```
<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
```

**Day.js 1.8.15 이상:**

```
<script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script>
```

**최종 index.html 업데이트**
index.html 파일은 이제 다음과 같아야 합니다:

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

### ***3단계:*** Reveal 뷰 초기화하기

**HTML 컴포넌트 업데이트**
src/app/app.component.html 파일을 열고 내용을 삭제한 다음, Reveal 뷰를 위한 플레이스홀더를 생성하기 위해 다음 <div>을 추가합니다:

```
<div #revealView style="height: 100vh; width: 100%; position:relative;"></div>
```

**HTML 컴포넌트 업데이트**
src/app/app.component.html 파일을 열어 다음 업데이트를 수행합니다:

jQuery 선언: 파일 상단에 변수를 선언하여 TypeScript가 JavaScript를 컴파일할 수 있도록 합니다:

```
declare let $: any;
```

**ViewChild 속성 추가:** HTML 파일에 정의된 revealView를 참조합니다:

```
@ViewChild('revealView') el!: ElementRef;
```

\*\*

**AfterViewInit 인터페이스 구현:** ngAfterViewInit 생명주기 메서드에서 Reveal 뷰를 초기화합니다:

```
ngAfterViewInit(): void { 
 
var revealView = new $.ig.RevealView(this.el.nativeElement); }
```

**최종 app.component.ts: 전체 TypeScript 컴포넌트는 다음과 같아야 합니다:**

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

**Reveal SDK 기본 URL 설정:**
클라이언트 앱이 서버와 다른 URL에 호스팅되는 경우, 기본 URL을 설정해야 합니다:

### ***4단계:*** 애플리케이션 실행하기

**애플리케이션 시작**
터미널에서 다음 명령을 실행합니다:

```
npm: npm start 
Yarn: yarn start 
Pnpm:pnpm start
```

**애플리케이션 테스트**
애플리케이션이 시작되면 브라우저에서 엽니다. Reveal 뷰가 성공적으로 초기화되어야 합니다.

**축하합니다!**

첫 번째 Reveal SDK Angular 애플리케이션을 성공적으로 생성했습니다. 이 설정을 통해 임베디드 분석의 강력한 기능을 활용하여 사용자 경험을 향상시키고 실행 가능한 인사이트를 도출할 준비가 되었습니다.

데이터의 힘을 활용하세요

실시간 컨텍스트 데이터로 비즈니스를 성장시키세요.

[데모 요청](/request-demo)

## 모범 사례 및 고려 사항

**보안 조치**

- **인증:** 민감한 데이터를 보호하기 위해 OAuth 또는 JWT와 같은 강력한 인증 메커니즘을 구현합니다.

- **데이터 접근 제어:** 역할 기반 권한을 사용하여 사용자가 접근할 권한이 있는 내용만 액세스하도록 보장합니다.

- **HTTPS:** 데이터 전송 시 항상 안전한 연결을 사용합니다.

**성능 최적화**

- **데이터 캐싱:** 자주 액세스하는 데이터를 캐싱하여 서버 부하를 줄입니다.

- **지연 로딩:** 대시보드와 컴포넌트는 필요할 때만 로드하여 앱 속도를 개선합니다.

- **백엔드 최적화:** 대규모 데이터 세트를 효율적으로 처리하기 위해 데이터베이스 쿼리를 최적화합니다.

## 결론

Angular 애플리케이션에 .NET Core 백엔드를 사용하여 임베디드 분석을 통합하는 것은 현대 소프트웨어 제품의 판도를 바꾸는 요소입니다. 이 가이드를 따르면 강력한 분석 기능을 애플리케이션에 추가하여 사용자에게 가치를 제공할 수 있습니다. Reveal Embedded Analytics는 데이터 시각화 임베딩, 보안 보장 및 성능 최적화를 위한 강력한 도구를 제공하여 이 과정을 원활하게 만듭니다.

애플리케이션을 다음 단계로 끌어올릴 준비가 되셨나요? [Reveal](https://samples.revealbi.io/reveal-sdk-samples/2020-survey-results.html) 웹사이트에서 상담을 예약하여 임베디드 분석 요구 사항을 어떻게 해결할 수 있는지 확인해 보세요.
