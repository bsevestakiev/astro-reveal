---
title: 'Reveal 1.7.0: 서버 측 페이지 매김, 고정 라인 및 기타 기능'
description: >-
  최신 Reveal 릴리스를 발표하게 되어 기쁩니다. 이 릴리스에는 분석 기능을 향상시키고 애플리케이션에 영향을 미칠 수 있는 중요한 변경
  사항에 대한 정보를 제공하는 강력한 새 기능들이 가득합니다.
date: '2024-09-30'
author: Casey Ciniello
cover: /images/2024/09/reveal-sept-2024-1.7-release-header.jpg
heroImage: /images/2024/10/reveal-new-release-1-7-header.svg
summary: >-
  최신 Reveal 릴리스를 발표하게 되어 기쁩니다. 이 릴리스에는 분석 기능을 향상시키고 애플리케이션에 영향을 미칠 수 있는 중요한 변경
  사항에 대한 정보를 제공하는 강력한 새 기능들이 가득합니다.
categories:
  - 제품 업데이트
seo:
  title: 'Reveal 1.7.0: 서버 측 페이지 매김, 고정 라인 및 기타 기능 | Reveal 임베디드 분석'
  description: >-
    최신 Reveal 릴리스를 발표하게 되어 기쁩니다. 이 릴리스에는 분석 기능을 향상시키고 애플리케이션에 영향을 미칠 수 있는 중요한 변경
    사항에 대한 정보를 제공하는 강력한 새 기능들이 가득합니다.
  ogTitle: 'Reveal 1.7.0: 서버 측 페이지 매김, 고정 라인 및 기타 기능 | Reveal 임베디드 분석'
  ogDescription: >-
    최신 Reveal 릴리스를 발표하게 되어 기쁩니다. 이 릴리스에는 분석 기능을 향상시키고 애플리케이션에 영향을 미칠 수 있는 중요한 변경
    사항에 대한 정보를 제공하는 강력한 새 기능들이 가득합니다.
  ogType: article
  twitterTitle: 'Reveal 1.7.0: 서버 측 페이지 매김, 고정 라인 및 기타 기능 | Reveal 임베디드 분석'
  twitterDescription: >-
    최신 Reveal 릴리스를 발표하게 되어 기쁩니다. 이 릴리스에는 분석 기능을 향상시키고 애플리케이션에 영향을 미칠 수 있는 중요한 변경
    사항에 대한 정보를 제공하는 강력한 새 기능들이 가득합니다.
  ogImage: /images/2024/09/reveal-sept-2024-1.7-release-header.jpg
source_hash: 5526d06e
source_locale: en
---
## **중요 변경 사항: 알아야 할 것들**

Reveal를 지속적으로 발전시키고 개선함에 따라, 특정 플랫폼에 영향을 미치는 몇 가지 중요한 변경 사항이 있습니다. 원활한 전환과 최적의 성능을 보장하기 위해 이 변경 사항들을 주의 깊게 검토해 주십시오:

**Java 및 Spring Boot 업데이트**

Spring Boot 2.x는 더 이상 지원되지 않습니다. 호환성을 유지하려면, 애플리케이션을 Spring Boot 3.x와 JDK 17+를 사용하고 Jakarta EE 9를 준수하는 서버를 호스팅하도록 업데이트해야 합니다. 이 변경 사항은 호환성 및 성능에 대한 높은 기준을 유지하고, 애플리케이션에 최신 프레임워크 및 기술을 활용하려는 당사의 의지를 반영합니다.

## **모든 플랫폼을 위한 새로운 기능**

이번 릴리스에서는 또한 Reveal에서 시각화 기능, 데이터 관리 및 전반적인 경험을 개선하도록 설계된 여러 흥미로운 새로운 기능들이 모든 플랫폼에 도입됩니다.

1. **고정선 (Fixed Lines) (베타):** 데이터 제시의 명확성을 높이기 위해, 카테고리 차트에 Fixed Lines 기능(베타)을 도입했습니다. Fixed Lines를 사용하면 데이터 필드 또는 미리 정의된 특수 필드를 사용하여 차트의 특정 값(가장 높은 값, 가장 낮은 값, 평균 또는 사용자 지정 값)을 표시할 수 있습니다. 이를 통해 시각화를 분석할 때 더 높은 정밀도를 확보할 수 있습니다. 이 기능을 사용하려면 $.ig.RevealSdkSettings의 enabledBetaFeatures를 활성화해야 합니다.

![Fixed Lines in analytitcs dashboard](/images/2024/09/reveal-fixed-lines.png)

1. **서버 측 페이지 매김 (Server-Side Paging):** Server-Side Paging을 사용하면 대규모 데이터 세트 관리가 그 어느 때보다 쉬워졌습니다. 이제 베타 기능을 활성화할 필요 없이 사용할 수 있으며, SQL Server, MySQL, BigQuery, PostgreSQL, SyBase, Athena, Oracle을 포함한 광범위한 공급업체에 대한 페이지 매김을 지원합니다. 단, [저장 프로시저](/blog/stored-procedures-embedded-analytics)를 사용하거나 서버 측 데이터 처리가 비활성화된 경우에는 페이지 매김을 사용할 수 없다는 점에 유의하십시오.

![Server-Side Paging in dashboard](/images/2024/09/reveal-server-side-paging.png)

1. **비교 필터 (Compare Filters) (베타):** 새로운 Compare Filters 기능을 사용하여 시각화 내에서 필터링된 데이터를 직접 비교함으로써 더 깊은 통찰력을 얻으십시오 (베타). 여러 차트 유형에서 사용할 수 있는 이 기능은 데이터를 필터링하고 필터링된 결과를 원본 값과 시각적으로 비교할 수 있게 해줍니다. 지원되는 차트 유형에는 Column, Bar, Line, Time Series, Area, Step Area, Spline, Stacked Charts, Funnel, Treemap, Gauges가 포함됩니다.

![Compare Filters in analytics dashboard](/images/2024/09/reveal-compare-filters.gif)

1. **시각화 수준 업데이트:** 시각화 수준에서 몇 가지 중요한 업데이트를 진행했습니다:

- 시각화 API의 날짜 지원: RVDateRange 객체를 사용하여 날짜 범위를 확인함으로써 "지난 7일"과 같은 날짜 필터를 쉽게 관리할 수 있습니다.

- 시각화 설명: 이제 개별 시각화에 상세 설명을 추가하여 데이터 표시의 맥락과 명확성을 개선할 수 있습니다.

- 대시보드 연결: 시각화가 이제 자동 대시보드 연결을 지원하여 탐색 및 데이터 탐색을 간소화합니다.

- PDF로 내보내기: 각 시각화는 이제 오버플로우를 통해 PDF로 내보낼 수 있습니다.

이 기능들은 시작에 불과합니다. 향상된 기능, 새로운 기능 및 버그 수정에 대한 전체 목록을 확인하려면 전체 [릴리스 노트](https://help.revealbi.io/web/release-notes)를 확인하십시오.

Reveal를 무료로 사용해 보세요

SDK를 다운로드하여 오늘 바로 시작하세요.

[DOWNLOAD](/download-sdk)
