---
title: 당신의 대시보드 — 당신의 모습! Reveal의 새로운 사용자 지정 테마링을 만나보세요
description: >-
  Reveal 임베디드 BI 소프트웨어에 사용자 지정 테마를 적용하고 앱의 모양과 느낌에 맞는 대시보드 및 시각화 스타일을 만드는 방법을
  확인하세요.
date: '2020-04-24'
author: Casey Ciniello
cover: >-
  /images/2020/10/3583.business_2D00_intelligence_2D00_reveal_2D00_dashboards_2D00_custom_2D00_theming.jpg
summary: >-
  Reveal은 임베디드 분석을 통해 바로 통합할 수 있는 데이터 시각화를 제공하는 데 중점을 둡니다. 중요한 부분은 애플리케이션에 임베딩하는
  요소들이 모양과 느낌을 일치시키는 것입니다. 저희 애플리케이션 사용자를 위해, Reveal은 이제 라이트 및 [&hellip;] 모두에서
  아름다운 두 가지 테마(Mountain 및 Ocean)를 기본 제공합니다.
categories:
  - 제품 업데이트
seo:
  title: 당신의 임베디드 분석 대시보드 — 당신의 모습! Reveal 임베디드 분석
  description: >-
    Reveal 임베디드 BI 소프트웨어에 사용자 지정 테마를 적용하고 앱의 모양과 느낌에 맞는 대시보드 및 시각화 스타일을 만드는 방법을
    확인하세요.
  ogTitle: 당신의 임베디드 분석 대시보드 — 당신의 모습! Reveal 임베디드 분석
  ogDescription: >-
    Reveal 임베디드 BI 소프트웨어에 사용자 지정 테마를 적용하고 앱의 모양과 느낌에 맞는 대시보드 및 시각화 스타일을 만드는 방법을
    확인하세요.
  ogType: article
  twitterTitle: 당신의 임베디드 분석 대시보드 — 당신의 모습! Reveal 임베디드 분석
  twitterDescription: >-
    Reveal 임베디드 BI 소프트웨어에 사용자 지정 테마를 적용하고 앱의 모양과 느낌에 맞는 대시보드 및 시각화 스타일을 만드는 방법을
    확인하세요.
  ogImage: >-
    /images/2020/10/3583.business_2D00_intelligence_2D00_reveal_2D00_dashboards_2D00_custom_2D00_theming.jpg
source_hash: '4e429180'
source_locale: en
---
저희 애플리케이션 사용자를 위해 Reveal은 기본적으로 Mountain과 Ocean의 두 가지 테마를 제공하며, 이 두 테마 모두 라이트 모드와 다크 모드에서 아름답게 보입니다. 애플리케이션의 테마와 일치하는 시각화를 임베딩하고 싶으신가요? 문제없습니다! Reveal SDK를 통해 이제 자체 사용자 지정 테마를 만들고 대시보드의 모든 측면을 제어할 수 있습니다.

## Reveal의 새로운 대시보드 테마

Mountain 및 Ocean의 새로운 테마를 사용하여 최고의 사용자 경험을 제공하기 위해, 우리는 아름답게 보이고 라이트 모드와 다크 모드 모두에서 작동하며 현대적인 느낌과 분위기를 가진 색상 팔레트를 개발했습니다. ![Reveal dashboard](/images/2020/10/reveal_2D00_embedded_2D00_visualizations_2D00_dashboard_2D00_color_2D00_theming.jpg)
*Reveal의 오션 테마*

## 색상 팔레트

Reveal 애플리케이션 내의 각 테마는 팔레트에 10가지의 다른 색상을 가지고 있습니다. 시각화를 편집하거나 생성할 때, 팔레트에서 선택하여 시작 색상을 쉽게 변경할 수 있습니다.

![ Reveal app color palette example](/images/2020/10/2047.reveal_2D00_embedded_2D00_visualizations_2D00_color_2D00_theming_2D00_color_2D00_palette.jpg)

## 임베딩 분석 시 사용자 지정 테마 설정

기존 애플리케이션에 분석을 임베딩할 때는 해당 대시보드가 앱의 모양과 느낌과 일치하는 것이 중요합니다. 이것이 바로 저희가 SDK를 통해 Reveal 대시보드에 대한 완벽한 제어권을 제공하는 이유입니다. 애플리케이션과 비교하여, 사용자 지정 테마로 달성할 수 있는 주요 사용자 지정 사항은 다음과 같습니다.

- **색상 팔레트**: 시각화에서 시리즈를 표시하는 데 사용되는 색상입니다. 무제한의 색상을 추가할 수 있습니다. 시각화에서 모든 색상이 사용되면, Reveal은 이 색상의 새로운 음영을 자동으로 생성합니다. 이렇게 하면 색상이 반복되지 않고 각 값은 고유한 색상을 갖게 됩니다.
- **강조 색상**: Reveal의 기본 강조 색상은 Blue 계열의 음영이며, + 대시보드 버튼 및 기타 상호 작용 액션에서 찾을 수 있습니다. 이 색상을 애플리케이션에서 사용하는 것과 일치하도록 변경할 수 있습니다.
- **조건부 서식 색상**: 조건부 서식을 사용할 때 설정할 수 있는 경계의 기본 색상을 변경합니다.
- **글꼴**: Reveal은 애플리케이션에서 세 가지 유형의 텍스트(일반, 중간, 굵게)를 사용합니다. 각 텍스트 그룹에 대한 글꼴 사용을 지정할 수 있습니다.
- **시각화 및 대시보드 배경색**: 대시보드의 배경색과 시각화의 배경색을 별도로 구성할 수 있습니다.

## 사용자 지정 테마는 어떻게 만드나요?

Reveal에서 자체 테마를 만드는 것은 새로운 **RevealTheme()/$.ig.RevealTheme()** 클래스의 인스턴스를 생성하는 것만큼 쉽습니다. 이 클래스에는 위에 나열된 모든 사용자 지정 설정이 포함되어 있습니다.

새로운 **RevealTheme/$.ig.RevealTheme** 인스턴스를 생성하면 각 설정에 대한 기본값을 얻게 됩니다. 이제 필요한 설정을 수정할 수 있습니다. 마지막으로, 테마 인스턴스를 **UpdateRevealTheme(theme)/ updateRevealTheme(theme)** 메서드에 전달합니다. 만약 이미 화면에 표시된 대시보드나 다른 Reveal 구성 요소가 있다면, 적용된 변경 사항을 보려면 다시 렌더링해야 합니다.

이미 자체 테마를 적용했지만, 다른 변경 사항을 잃지 않으면서 일부 설정을 수정하고 싶을 수 있습니다.

이 경우 **GetCurrentTheme()/getCurrentTheme()** 메서드를 호출할 수 있습니다. 이 메서드는 RevealTheme 설정에 대해 설정한 마지막 값을 가져올 수 있게 해줍니다. RevealTheme의 새 인스턴스를 처음부터 생성하는 경우와 달리, 변경 사항을 적용하고 테마를 다시 업데이트한 후에는 수정하지 않은 각 설정에 대해 기본값 대신 현재 값을 얻게 됩니다.

**GetCurrentTheme()/getCurrentTheme()**과 **UpdateRevealTheme(theme)/ updateRevealTheme(theme)** 메서드 모두 **RevealView / $.ig.RevealView** 클래스를 통해 접근할 수 있습니다.

## 코드 예제

다음 코드 스니펫에서는 현재 테마를 가져오고, 원하는 변경 사항을 적용하며, Reveal에서 테마를 업데이트하는 방법을 보여줍니다.

먼저, 변경 사항을 적용하기 전 스크린샷이 어떻게 보이는지 예시를 살펴보겠습니다.

![Reveal Marketing Dashboard](/images/2020/10/reveal_2D00_embedded_2D00_dashboard_2D00_original.jpg)

이제 이 코드 스니펫을 사용하여 사용자 지정 테마를 정의하세요.

```
var regularFont = new FontFamily(new Uri("pack://application:,,,/ [Your ProjectName];component/[pathToFonts]/"), "./#Verdana Italic"); 
var boldFont = new FontFamily(new Uri("pack://application:,,,/ [Your ProjectName];component/[pathToFonts]/"), "./#Verdana Bold"); 
var mediumFont = new FontFamily(new Uri("pack://application:,,,/ [Your ProjectName];component/[pathToFonts]/"), "./#Verdana Bold Italic"); 

var customTheme = RevealView.GetCurrentTheme(); 
customTheme.ChartColors.Clear(); 
customTheme.ChartColors.Add(Color.FromRgb(192, 80, 77)); 
customTheme.ChartColors.Add(Color.FromRgb(101, 197, 235)); 
customTheme.ChartColors.Add(Color.FromRgb(232, 77, 137); 

customTheme.BoldFont = new FontFamily("Gabriola"); 
customTheme.MediumFont = new FontFamily("Comic Sans MS"); 
customTheme.FontColor = Color.FromRgb(31, 59, 84); 
customTheme.AccentColor = Color.FromRgb(192, 80, 77); 
customTheme.DashboardBackgroundColor = Color.FromRgb(232, 235, 252); 

RevealView.UpdateRevealTheme(customTheme);
```

**참고:** 새로운 색상 세트를 추가하려면 먼저 ***차트 색상 목록***의 기본값을 지워야 합니다.

다음 코드 스니펫은 revealTheme 클래스의 새 인스턴스를 생성하고, 원하는 설정에 변경 사항을 적용하며, Reveal Web에서 테마를 업데이트하는 방법을 보여줍니다.

***코드 샘플 – Reveal Web***

```
var revealTheme = new $.ig.RevealTheme(); 
revealTheme.chartColors = ["rgb(192, 80, 77)", "rgb(101, 197, 235)", "rgb(232, 77, 137)"]; 

revealTheme.mediumFont = "Gabriola"; 
revealTheme.boldFont = "Comic Sans MS"; 
revealTheme.fontColor = "rgb(31, 59, 84)"; 
revealTheme.accentColor = "rgb(192, 80, 77)"; 
revealTheme.dashboardBackgroundColor = "rgb(232, 235, 252)"; 

$.ig.RevealView.updateRevealTheme(revealTheme);
```

**참고:** **글꼴 옵션 사용**

boldFont, regularFont 또는 mediumFont 설정을 정의할 때 정확한 글꼴 패밀리 이름을 전달해야 합니다. 글꼴의 굵기는 이름에 있는 것이 아니라 글꼴 자체의 정의에 의해 결정됩니다. **$.ig.RevealTheme** 글꼴 설정에 지정된 글꼴-패밀리 이름이 사용 가능하도록 @font-face (CSS 속성)를 사용해야 할 수도 있습니다.

이제 테마 변경 사항을 구현한 후, 대시보드와 시각화 편집기 모두에서 새로운 결과가 여기에 있습니다.

![Dashboard in Reveal BI](/images/2020/10/6378.reveal_2D00_embedded_2D00_visualizations_2D00_color_2D00_theming_2D00_background_2D00_color_2D00_2.jpg)
*위 코드 스니펫에서 변경 사항을 적용한 후의 대시보드 편집기*.

![Reveal dashboard](/images/2020/10/reveal_2D00_embedded_2D00_visualizations_2D00_dashboard_2D00_editor_2D00_2.jpg)
*위 코드 스니펫에서 변경 사항을 적용한 후의 시각화 편집기*.

## 테마 속성 변경을 위한 코드 스니펫

테마 변경에 대한 문서는 여기에 있습니다:

[https://help.revealbi.io)

$.ig.RevealTheme에서 설정할 수 있는 속성은 다음과 같습니다.

- chartColors
- regularFont
- mediumFont
- boldFont
- fontColor
- dashboardBackgroundColor
- visualizationBackgroundColor
- accentColor
- useRoundedCorners
- conditionalFormatting.lowColor
- conditionalFormatting.midColor
- conditionalFormatting.hiColor
- conditionalFormatting.noneColor

웹 SDK에서 테마를 수정하는 스니펫은 다음과 같습니다.

var revealTheme = new $.ig.RevealTheme();

// 표준 색상 / 글꼴 설정
revealTheme.accentColor = “rgb(15,96,69)”;
revealTheme.regularFont = “Righteous”;
revealTheme.mediumFont = “Caveat”;
revealTheme.boldFont = “Domine”;
revealTheme.fontColor = “rgb(226,24,125)”;
revealTheme.dashboardBackgroundColor = “rgb(24,224,37)”;
revealTheme.visualizationBackgroundColor = “rgb(221,224,37)”;

// 조건부 서식 설정
revealTheme.conditionalFormatting.hiColor = “rgb(87,0,127)”;
revealTheme.conditionalFormatting.lowColor = “rgb(158,0,232)”;
revealTheme.conditionalFormatting.midColor = “rgb(198,137,229)”;
revealTheme.conditionalFormatting.noneColor = “rgb(255,255,127)”;

// 차트 색상 설정
revealTheme.chartColors = \[“rgb(248,53,255)”, “rgb(248,53,75)”, “rgb(54,247,160)”, “rgb(130,53,244)”, “rgb(235,242,138),rgb(239,139,219),rgb(38,116,68),rgb(108,147,178)”];

// 사각형 또는 둥근 모양 설정
revealTheme.useRoundedCorners = false;

// 대시보드 업데이트
$.ig.RevealView\.updateRevealTheme(revealTheme);

테마 속성을 설정한 후, **RevealView**에서 **updateReveal** 메서드를 호출합니다.

$.ig.RevealView\.updateRevealTheme(revealTheme);

글꼴 사용자 지정의 경우, 다음 줄을 페이지의 css에 추가해야 합니다:

이 속성 설정을 사용하면 고객이 요구하는 브랜드 경험에 맞춰 [Reveal 임베디드 분석](/embedded-analytics)을 사용자 지정할 수 있어야 합니다!

추가적인 스타일링 포인트가 필요한 경우, [저에게 알려주세요](mailto:cmcguigan@infragistics.com)!

데이터의 힘을 활용하세요

실시간 컨텍스트 데이터로 비즈니스를 성장시키세요.

[데모 요청](/request-demo)
