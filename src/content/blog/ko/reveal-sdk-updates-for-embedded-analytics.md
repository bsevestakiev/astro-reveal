---
title: 임베디드 분석을 위한 Reveal SDK 업데이트
description: 새 기능에는 시각화에서 툴팁을 사용하는 방식에 대한 추가적인 유연성과 애플리케이션의 모양과 느낌에 더 잘 맞도록 테마 업데이트가 포함됩니다.
date: '2020-05-11'
author: Casey Ciniello
cover: >-
  /images/2020/10/business_2D00_intelligence_2D00_reveal_2D00_dashboards_2D00_tooltips.jpg
summary: >-
  더 많은 사용자 정의 기능을 제공하기 위해 Reveal 임베디드 분석 SDK에 몇 가지 새로운 업데이트를 발표하게 되어 기쁩니다. 툴팁 표시
  저희는 시각화에서 툴팁을 표시하는 방식에 더 많은 유연성을 제공하는 새 이벤트를 추가했습니다. 이 이벤트는 WPF에서
  revealView.TooltipShowing이며 Web에서는 .onTooltipShowing이며, 최종 사용자가 [&hellip;]일
  때마다 트리거됩니다.
categories:
  - 제품 업데이트
seo:
  title: 임베디드 분석을 위한 Reveal SDK 업데이트 Reveal 임베디드 분석
  description: >-
    새 기능에는 시각화에서 툴팁을 사용하는 방식에 대한 추가적인 유연성과 애플리케이션의 모양과 느낌에 더 잘 맞도록 테마 업데이트가
    포함됩니다.
  ogTitle: 임베디드 분석을 위한 Reveal SDK 업데이트 Reveal 임베디드 분석
  ogDescription: >-
    새 기능에는 시각화에서 툴팁을 사용하는 방식에 대한 추가적인 유연성과 애플리케이션의 모양과 느낌에 더 잘 맞도록 테마 업데이트가
    포함됩니다.
  ogType: article
  twitterTitle: 임베디드 분석을 위한 Reveal SDK 업데이트 Reveal 임베디드 분석
  twitterDescription: >-
    새 기능에는 시각화에서 툴팁을 사용하는 방식에 대한 추가적인 유연성과 애플리케이션의 모양과 느낌에 더 잘 맞도록 테마 업데이트가
    포함됩니다.
  ogImage: >-
    /images/2020/10/business_2D00_intelligence_2D00_reveal_2D00_dashboards_2D00_tooltips.jpg
source_hash: fa18fab8
source_locale: en
---
더 많은 사용자 정의 기능을 제공하기 위해 [Reveal 임베디드 분석](/embedded-analytics) [SDK](/blog/reveal-sdk-updates-for-embedded-analytics)에 몇 가지 새로운 업데이트를 발표하게 되어 기쁩니다.

## 툴팁 표시하기

시각화에서 툴팁을 표시하는 방식에 더 많은 유연성을 제공하는 새로운 이벤트를 추가했습니다. 이 이벤트는 WPF에서는 *revealView\.TooltipShowing*으로, Web에서는 .*onTooltipShowing*으로 불리며, 최종 사용자가 시각화의 시리즈 위에 마우스를 올리거나 시리즈를 클릭할 때마다 트리거됩니다 (아래 참조).

**![Reveal tooltip](/images/2020/10/reveal_2D00_tooltip.jpg)**

툴팁 이벤트를 취소하거나 표시되는 내용을 수정하도록 선택할 수 있습니다. 몇 가지 예시는 다음과 같습니다:

1. 툴팁을 완전히 비활성화하거나 특정 시각화에 대해서만 표시하려는 경우.
2. 뷰어에게 더 가치 있을 수 있는, RevealView 컴포넌트 외부의 데이터를 툴팁에 표시하려는 경우.

참고로, 이 이벤트는 그리드, 게이지 등 툴팁을 지원하지 않는 시각화에서는 트리거되지 않습니다.

## WPF 및 Web용 코드 스니펫

다음 코드 스니펫에서는 최종 사용자가 이 시각화 위에 마우스를 올리거나 클릭했을 때 툴팁을 비활성화하는 방법과 이벤트 인자에서 추가 정보를 얻는 방법을 보여드리겠습니다. 이벤트 인자에는 마우스를 올리거나 클릭된 시각화에 대한 정보, 마우스를 올리거나 클릭된 데이터의 정확한 셀, 이 셀의 전체 행(다른 열의 정보가 필요한 경우), 그리고 물론 Cancel 부울 값이 포함됩니다.

**WP&#x46;****Code****&#x53;nippet:**

```
>private void RevealView_TooltipShowing(object sender, TooltipShowingEventArgs e) { if (e.Visualization.Title == "NoNeedForTooltips") { e.Cancel = true; } Debug.WriteLine($"TooltipShowing: Visualization: {e.Visualization.Title}, Cell: {e.Cell}, Row: {e.Row}"); }
```

**Web Code Snippet:**

```
revealView.onTooltipShowing = function (args) { if (args.visualization.title == "NoNeedForTooltips") { args.Cancel = true; } console.log("onTooltipShowing: visualization: " + args.visualization.title() + ",cell: " + args.cell.value + ", row:" + args.row.length); };
```

## RevealTheme 업데이트

Reveal 내의 시각화 및 버튼 모서리를 기존 애플리케이션의 모양과 느낌에 맞게 변경하는 기능을 추가했습니다. 이를 위해 RevealTheme 클래스에 UseRoundedCorners 부울 속성을 추가했습니다. 이 속성이 true로 설정되면(기본값), 시각화 컨테이너의 모서리가 약간 둥글게 처리됩니다. 더 날카로운 모서리를 원하면 이 속성을 false로 설정하여 비활성화할 수 있습니다.

![Reveal dashboard - Theme Update](/images/2020/10/reveal_2D00_dashboard.jpg)

데이터의 힘을 활용하세요

실시간 컨텍스트 데이터로 비즈니스를 성장시키세요.

[Request a Demo](/request-demo)
