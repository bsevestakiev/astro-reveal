---
title: Blazor 애플리케이션에 셀프 서비스 BI 임베딩
description: >-
  더 많은 조직이 앱의 일부로 분석 기능을 제공하기 시작함에 따라, Blazor 애플리케이션에 분석을 임베딩하는 것은 더 이상 선택 사항이
  아닙니다. 방법을 알아보세요.
date: '2023-06-13'
author: Bilyana Petrova
cover: /images/2023/06/reveal-embed-BI-in-blazor-header-1.png
heroImage: /images/2023/06/reveal-embed-BI-in-blazor-internal-header.svg
summary: >-
  더 많은 조직이 앱의 일부로 분석 기능을 제공하기 시작함에 따라, Blazor 애플리케이션에 분석을 임베딩하는 것은 더 이상 선택 사항이
  아닙니다.
categories:
  - 기술 통찰력
seo:
  title: Blazor 앱에 강력한 BI 임베딩 - Reveal BI
  description: >-
    더 많은 조직이 앱의 일부로 분석 기능을 제공하기 시작함에 따라, Blazor 애플리케이션에 분석을 임베딩하는 것은 더 이상 선택 사항이
    아닙니다. 방법을 알아보세요.
  ogTitle: Blazor 앱에 강력한 BI 임베딩 - Reveal BI
  ogDescription: >-
    더 많은 조직이 앱의 일부로 분석 기능을 제공하기 시작함에 따라, Blazor 애플리케이션에 분석을 임베딩하는 것은 더 이상 선택 사항이
    아닙니다. 방법을 알아보세요.
  ogType: article
  twitterTitle: Blazor 앱에 강력한 BI 임베딩 - Reveal BI
  twitterDescription: >-
    더 많은 조직이 앱의 일부로 분석 기능을 제공하기 시작함에 따라, Blazor 애플리케이션에 분석을 임베딩하는 것은 더 이상 선택 사항이
    아닙니다. 방법을 알아보세요.
  ogImage: /images/2023/06/reveal-embed-BI-in-blazor-header-1.png
source_hash: 9f275251
source_locale: en
---
풍부한 데이터를 바탕으로 사용자들은 자신의 [의사 결정 과정](/blog/reveal-data-driven-decision-making)을 안내하기 위해 데이터 중심 접근 방식으로 전환하고 있습니다.

그 이유를 알기 쉽습니다.

강력한 BI를 완전히 상호 작용하는 시각 자료 및 보고서와 통합하여 Blazor 애플리케이션에 적용하면 모든 최종 사용자에게 데이터 분석을 접근 가능하게 할 수 있습니다. 컨텍스트 내에서 접근 가능한 데이터가 있으면 사용자는 애플리케이션을 전환하거나 데이터를 재배열하는 과정에서 발생하는 혼란과 방해 없이 필요한 관련 통찰력을 신속하게 추출할 수 있습니다.

[임베디드 분석](/embedded-analytics) 솔루션인 Reveal은 이러한 목표를 달성하는 데 도움을 줄 수 있습니다.

Reveal은 컨텍스트 내 편집, 데이터 혼합, 대시보드 연결, 계산된 필드 등과 같은 셀프 서비스 [분석 기능](/blog/embedded-analytics-features)을 사용하여 대화형 대시보드와 보고서를 [Blazor 애플리케이션](https://www.infragistics.com/products/ignite-ui-blazor)에 쉽고 빠르게 임베딩할 수 있도록 도와줍니다.

이 문서에서는 Reveal을 사용하여 Blazor 앱에 임베디드 분석을 성공적으로 통합하는 방법을 알아봅니다.

Reveal가 처음이시라면, 웹사이트 투어를 하거나 [Reveal 제품 개요 비디오](https://www.youtube.com/watch?v=lkWA2DJsLtE)를 시청하여 제품에 대해 더 많이 배울 수 있습니다.

## **Blazor 앱에 분석을 임베딩해야 하는 이유**

Blazor 앱에 분석을 임베딩하면 자연스러운 워크플로우 내에서 핵심 비즈니스 데이터를 볼 수 있습니다. 그렇지 않았다면 놓쳤을 데이터의 추세와 패턴을 쉽게 발견할 수 있게 해줍니다. 실시간 통찰력에 접근함으로써 사용자(그리고 모든 사용자)는 비즈니스 성공을 안내할 수 있는 더 정보에 입각한 결정[s](/blog/reveal-data-driven-decision-making)을 내릴 수 있습니다.

데이터 분석은 또한 비즈니스가 워크플로우를 간소화하고, 자원을 관리하며, 최대 수익성을 위해 프로세스와 성능을 최적화하는 데 도움을 줍니다. 올바른 데이터를 통해 수익을 늘릴 새로운 제품/서비스 기회를 식별할 수도 있습니다.

**무료 PDF 사본 받기**

접근하려면 양식을 작성하십시오.

죄송합니다. 양식에 문제가 발생한 것 같습니다. 몇 분 후에 [다시 시도](/blog/embedding-bi-in-blazor-applications#)해 주십시오. 여전히 문제가 발생하면 [support@revealbi.io](mailto:support@revealbi.io)로 연락하여 문제를 알려주십시오.

필수

불행하게도 Google은 귀하를 봇으로 간주했습니다. 찾고 계신 자료를 얻거나 제품 데모를 예약하려면 [support@revealbi.io](mailto:support@revealbi.io)로 연락 주시기 바랍니다.
성공적으로 제출하려면 양식 약관에 동의해야 합니다.
이 이메일 주소는 유효하지 않은 것 같습니다. 업데이트하고 다시 시도하십시오.
비즈니스 이메일 주소를 사용하십시오.

국가

비즈니스 이메일

이름

성

Infragistics의 [이용 약관](/terms-of-use) 및 [개인 정보 보호 정책](/privacy-policy)에 동의합니다.

이 사이트는 reCAPTCHA에 의해 보호되며 Google 개인정보 보호정책 및 서비스 약관이 적용됩니다.

PDF 다운로드

![Blazor 애플리케이션에 셀프 서비스 BI 임베딩](https://static.infragistics.com/marketing/slingshot/checkmark.svg)

### PDF가 다운로드 중입니다!

읽고 배우는 즐거움을 누리십시오.

**PDF:** 성공적인 구현에 필요한 전략적 계획, 선택, 개발 및 지속적인 개선 단계를 자세히 설명하는 무료 '엔드투엔드 임베디드 BI 배포 가이드'를 받으십시오. **[여기서 PDF 다운로드!](https://static.infragistics.com/marketing/reveal/whitepapers/reveal-end-to-end-BI-deployment-guide.pdf)**

## **Reveal BI를 사용하여 Blazor 앱에 셀프 서비스 분석 임베딩하기**

다음 7단계는 Blazor 애플리케이션에 풍부한 데이터 시각화 및 대시보드를 활성화하는 것이 얼마나 쉬운지 보여줄 것입니다. 클라이언트 및 서버 구성이 모두 필요합니다. 시작하려면 [SDK를 다운로드](/download-sdk)하십시오.

그렇게 하셨다면, 7단계의 쉬운 과정을 통해 Blazor 앱에 임베디드 셀프 서비스 BI를 생성하고 활성화해 봅시다!

### **1단계: Blazor 서버 앱 생성**

이것은 Blazor 서버 앱이므로 Visual Studio를 열고 기본 설정을 사용하여 새 Blazor 서버 앱을 만드십시오. 완료되면 애플리케이션이 생성됩니다. 프로젝트를 마우스 오른쪽 버튼으로 클릭하고 'NuGet 패키지 관리'를 선택한 다음 nuget.org에서 **Reveal.Sdk.AspNetCore** nuget 패키지를 검색하여 프로젝트에 설치하십시오.

### **2단계: 폴더 설정 / 대시보드 추가**

Reveal SDK 클라이언트를 테스트하려면, 구성이 올바른지 확인할 수 있는 샘플 대시보드를 제공합니다. Reveal은 대시보드를 자동으로 로드하고 저장하기 위해 알려진 폴더 구조를 사용합니다. 프로젝트 루트에 Dashboards라는 이름의 폴더를 사용하면 추가적인 로드/저장 코드를 작성할 필요가 없습니다.

1. **Dashboards**라는 이름의 폴더를 만드십시오.

2. 이 zip 파일에서 샘플 대시보드(Marketing, Sales, Campaigns, Manufacturing)를 새로 생성된 Dashboard 폴더에 압축 해제하고 복사하십시오: [https://users.infragistics.com/Reveal/sample-dashboards.zip](https://users.infragistics.com/Reveal/sample-dashboards.zip)

### **3단계: Program.cs 업데이트**

**Program.cs:**

1. 코드 창 상단에 추가합니다:

**using Reveal.Sdk;**

2. 이 코드를 사용하여 앱이 Reveal SDK를 사용하도록 지정하고 **builder.build** 구문 앞에 배치합니다.

**builder.Services.AddControllers().AddReveal();**

### **4단계: 클라이언트 SDK 종속성 추가**

Reveal 클라이언트 JavaScript 종속성을 활성화하려면 **Pages\\\_layout.cshtml** 파일을 업데이트해야 합니다. 닫는 **</Body>** 태그가 끝나는 지점 앞에 다음 코드를 추가하십시오.

```generic
<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>

<script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script>

<script src="https://dl.revealbi.io/reveal/libs/1.5.0/infragistics.reveal.js"></script> 
 
<script type="module"> 
    import "./js/revealview.js"; 
</script>
```

### **5단계: Reveal 클라이언트 구성 JavaScript 추가**

Reveal SDK 클라이언트는 RevealView를 통해 구성됩니다. RevealView를 로드하려면 클라이언트 측에 JavaScript 함수를 추가해야 합니다. 여기에서 대시보드가 렌더링될 때 활성화되어야 하는 모든 속성을 구성할 수도 있습니다.

1. **\wwwroot\\** 폴더에 **js** 폴더를 추가합니다.

2. **js** 폴더에 **revealview\.js**라는 이름의 JavaScript 파일을 만들고 다음 코드를 추가합니다:

```generic
window.loadRevealView = function (viewId, dashboardName) {

$.ig.RevealSdkSettings.setBaseUrl('https://samples.revealbi.io/upmedia-backend/reveal-api/');

$.ig.RVDashboard.loadDashboard(dashboardName, (dashboard) => {

var revealView = new $.ig.RevealView("#" + viewId);

revealView.dashboard = dashboard;

});

}
```

### **6단계: 대시보드 로드**

이 Blazor 애플리케이션에서는 대시보드를 **revealView**라는 이름의 **<div>**에 로드할 것입니다. 다음 단계를 따라 애플리케이션의 **Dashboards** 폴더에서 샘플 대시보드를 로드하십시오.

1. **Pages\Index.Razor**에 다음 using 구문을 추가합니다:

```generic
@inject IJSRuntime JSRuntime
```

2. 로드할 대시보드를 선택하는 데 사용할 드롭다운에 대한 코드를 추가합니다:

```generic
<select @onchange="selectedDashboardChanged"> 
    <option>Campaigns</option> 
    <option>Healthcare</option> 
    <option>Manufacturing</option> 
    <option>Marketing</option> 
    <option>Sales</option> 
</select> 
```

3. revealView div를 추가합니다:

```generic
<div id="revealView" style="width:100%; height:750px"></div> 
```

4. 첫 로드 시 Campaigns 대시보드를 로드하는 코드를 추가합니다:

```generic
@code { 
    protected override async Task OnAfterRenderAsync(bool firstRender) 
    { 
        if (firstRender) 
        { 
            await JSRuntime.InvokeVoidAsync("loadRevealView", "revealView", "Campaigns"); 
        } 
    }
} 
```

5. Select에서 변경 사항을 감지하여 올바른 대시보드를 로드합니다:

```generic
async void selectedDashboardChanged(ChangeEventArgs e) 
    { 
        await JSRuntime.InvokeVoidAsync("loadRevealView", "revealView", e.Value!.ToString()); 
    } 
} 
```

### **7단계: 애플리케이션 실행**

이 시점에서 Blazor 애플리케이션에 강력한 BI 기능을 활성화하기 위한 모든 단계가 완료되었습니다. 애플리케이션을 실행하여 결과를 확인하십시오!

![](/images/2023/06/image-1024x704.png)

전체 튜토리얼을 보려면, Reveal을 사용하여 Blazor 앱에 분석을 임베딩하는 단계를 안내하는 이 비디오를 시청하십시오.

[https://www.youtube.com/watch?v=OMddgybtDi8](https://www.youtube.com/watch?v=OMddgybtDi8)

임베디드 분석 및 비즈니스 인텔리전스에 대한 더 심층적인 정보와 비즈니스에 있어 데이터의 중요성에 대해서는 [저희 YouTube 채널](https://www.youtube.com/@RevealBI)의 다른 비디오도 시청하십시오. [Angular에 임베디드 분석](/blog/embedding-bi-in-angular-apps)하는 방법, [Node.js를 사용한 React 앱](/blog/embedding-self-service-bi-in-react-apps-with-node-js) 및 JavaScript HTMP 앱, 임베디드 BI 대시보드 생성 등 다양한 주제를 다룹니다. 미래의 모든 비디오를 전문가들로부터 볼 수 있도록 구독하는 것을 잊지 마십시오.

Reveal을 사용하여 Blazor 앱에 분석을 임베딩하려고 시도하지만 과정에서 문제가 발생하면 [저희 Discord 채널](https://discord.com/invite/Ped3sSK5Xw)을 통해 제품 팀에 문의하십시오.

또한 [무료 제품 투어 예약](/request-demo)을 하거나 [SDK를 다운로드](/download-sdk)하여 직접 사용해 보는 방법으로 Reveal 및 작동 방식에 대해 더 많이 배울 수 있습니다.

\[cta\_banner type='{TYPE}' headline='데이터 기반 의사 결정 시작하기' msg= '오늘부터 모든 비즈니스 사용자에게 BI의 힘을 전달하세요.' button\_text= '더 알아보기' button\_link='[https://www.revealbi.io/request-demo](https://www.revealbi.io/request-demo)' class='banner--embedded']
