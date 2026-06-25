---
title: Reveal 1.6.1에서 MongoDB 지원 및 기타 기능 추가
description: >-
  Reveal 1.6.1이 출시되었으며, 모두 사용자님을 위한 것입니다! 최신 릴리스에서 향상된 사용자 경험, 원활한 내보내기 기능, 그리고
  더 많은 기능을 발견하세요.
date: '2023-10-31'
author: Casey Ciniello
cover: /images/2023/10/reveal-new-release-1-7-0-thumbnail.jpg
heroImage: /images/2023/10/reveal-new-release-1-7-0-header.svg
summary: 최신 Reveal 릴리스인 1.6.1이 사용자 피드백을 바탕으로 개선된 기능들로 가득 채워져 출시되었습니다.
categories:
  - 제품 업데이트
seo:
  title: 2023년 10월 릴리스의 MongoDB 지원 및 기타 기능
  description: >-
    Reveal 1.6.1이 출시되었으며, 모두 사용자님을 위한 것입니다! 최신 릴리스에서 향상된 사용자 경험, 원활한 내보내기 기능,
    그리고 더 많은 기능을 발견하세요.
  ogTitle: 2023년 10월 릴리스의 MongoDB 지원 및 기타 기능
  ogDescription: >-
    Reveal 1.6.1이 출시되었으며, 모두 사용자님을 위한 것입니다! 최신 릴리스에서 향상된 사용자 경험, 원활한 내보내기 기능,
    그리고 더 많은 기능을 발견하세요.
  ogType: article
  twitterTitle: 2023년 10월 릴리스의 MongoDB 지원 및 기타 기능
  twitterDescription: >-
    Reveal 1.6.1이 출시되었으며, 모두 사용자님을 위한 것입니다! 최신 릴리스에서 향상된 사용자 경험, 원활한 내보내기 기능,
    그리고 더 많은 기능을 발견하세요.
  ogImage: /images/2023/10/reveal-new-release-1-7-0-thumbnail.jpg
source_hash: e3ec0506
source_locale: en
---
저희는 [Embedded Analytics](/embedded-analytics) SDK의 버전 1.6.1 출시를 발표하게 되어 기쁩니다. 언제나 그랬듯이, 저희는 Reveal을 사용하여 애플리케이션에 분석을 통합하는 과정을 원활하게 만들고 사용자 경험을 개선하는 데 전념하고 있습니다. 이번 릴리스에서 새롭고 업데이트된 내용을 자세히 살펴보겠습니다.

![MongoDB Support and More in Reveal 1.6.1. Release](/images/2023/11/reveal-launch-1-7-0-dashboard-mongodb.png)

## 새로운 기능

사용자 도구 상자가 조금 더 커졌습니다:

**ASP.NET & Node:**

- **새 데이터 소스:** MongoDB

**모든 플랫폼:**

- 헤드리스 내보내기(headless export)를 통해 이제 사용자 인터페이스 없이 개별 시각화 자료를 내보낼 수 있습니다.
- 보안을 중요하게 생각하는 사용자를 위해 외부 대시보드 링크에 noopener 속성을 추가했습니다.
- 새로운 VisualizationMargin 속성을 사용하여 시각화 간의 여백을 조정할 수 있게 되어 시각화 미학에 대한 제어력이 높아졌습니다.
- 단일 시각화 모드를 사용하는 사용자를 위해 몇 가지 개선 사항을 적용했습니다.
- showBreadcrumb 및 showBreadcrumbDashboardTitle을 사용하여 대시보드 제목과 브레드크럼을 제어할 수 있습니다.
- RVVisualization의 showTitle에 대한 새로운 속성들이 추가되었습니다.
- RevealView의 여러 새로운 속성들이 단일 시각화 모드에서는 자동으로 false로 설정됩니다.
- SQL 프로세스를 간소화하는 데 도움을 주기 위해, SQL 기반 저장 프로시저가 이제 쿼리를 로그로 출력하고 데이터 유형 불일치 시 경고를 알려줍니다.

## 주요 변경 사항

알아두셔야 할 몇 가지 중요한 변경 사항이 있습니다:

**모든 플랫폼:**

- 단일 시각화 모드를 활성화할 때, RevealView의 여러 속성이 이제 자동으로 false로 설정됩니다. 여기에는 showChangeVisualization, canEdit, showMenu, showStatisticalFunctions, showFilters가 포함됩니다.
- window.revealDisableKeyboardManagement 속성은 이제 기본값이 true가 됩니다. 이는 특정으로 설정하지 않는 한 탭 포커스가 RevealView에서 멈추지 않음을 의미합니다.
- 저희의 슬라이스 차트(파이, 깔때기, 도넛 포함)가 디자인 변환을 거쳐 새로운 모양과 느낌을 갖게 되었습니다. 참고: RevealSdkSettings.enableNewCharts=false를 사용하여 항상 기본값으로 복원할 수 있습니다.

## 마지막 말씀…

저희는 SDK를 지속적으로 개선하고 향상시키기 위해 노력하고 있으며, 이번 릴리스도 예외는 아닙니다. 이는 또한 여러분을 위해 수많은 버그를 수정했다는 의미이기도 하며, [전체 릴리스 노트는 여기](https://help.revealbi.io/web/release-notes)에서 확인하실 수 있습니다. 이러한 업데이트가 개발 워크플로우를 간소화하고 애플리케이션의 분석 기능을 향상시키는 데 도움이 되기를 바랍니다.

저희 개발자 커뮤니티의 일원이 되어 주셔서 감사합니다. 여러분의 피드백은 매우 중요하므로, 의견, 제안 또는 질문을 주저하지 마시고 공유해 주십시오. 제품 지원이 필요하거나 단순히 Reveal에 대한 피드백을 공유하고 싶으시면, [Discord를 통해 제품 팀에 문의](https://discord.com/invite/Ped3sSK5Xw)하거나, 아이디어, 질문 및 문제 사항이 있는 경우 [CaseyM@revealbi.io](mailto:CaseyM@revealbi.io)로 직접 이메일을 보내주십시오.

Reveal을 선택해 주셔서 감사합니다. 데이터를 통해 새로운 가능성을 열어가는 데 도움을 드릴 수 있기를 기대합니다.

Reveal 무료 체험하기

지금 바로 SDK를 다운로드하여 시작하세요.

[DOWNLOAD](/download-sdk)
