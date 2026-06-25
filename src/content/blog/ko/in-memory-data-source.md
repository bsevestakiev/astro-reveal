---
title: Reveal의 데이터 도달 범위를 확장하기 위해 인메모리 데이터 소스 사용
description: 임베디드 분석을 통해 앱에서 액세스할 수 있는 데이터의 수와 유형을 늘리려면 Reveal의 인메모리 데이터베이스 기능을 사용하세요.
date: '2019-10-03'
author: Casey Ciniello
cover: /images/2020/10/business_2D00_intelligence_2D00_reveal_2D00_datasources.jpg
summary: >-
  Reveal이 아직 기본적으로 지원하지 않는 데이터 소스에 직접 연결하고 싶은 경우가 있을 수 있습니다. 예를 들어, 자체 사용자 지정
  데이터베이스를 가지고 있을 수 있습니다. 이러한 요구 사항을 충족하기 위해 데이터 소스로 인메모리를 지원합니다. 또한, [&hellip;]가
  필요할 경우 이 옵션을 사용하고 싶을 수도 있습니다.
categories:
  - 임베디드 분석
seo:
  title: 임베디드 분석 데이터 소스 확장 (인메모리 데이터베이스)
  description: 임베디드 분석을 통해 앱에서 액세스할 수 있는 데이터의 수와 유형을 늘리려면 Reveal의 인메모리 데이터베이스 기능을 사용하세요.
  ogTitle: 임베디드 분석 데이터 소스 확장 (인메모리 데이터베이스)
  ogDescription: 임베디드 분석을 통해 앱에서 액세스할 수 있는 데이터의 수와 유형을 늘리려면 Reveal의 인메모리 데이터베이스 기능을 사용하세요.
  ogType: article
  twitterTitle: 임베디드 분석 데이터 소스 확장 (인메모리 데이터베이스)
  twitterDescription: 임베디드 분석을 통해 앱에서 액세스할 수 있는 데이터의 수와 유형을 늘리려면 Reveal의 인메모리 데이터베이스 기능을 사용하세요.
  ogImage: /images/2020/10/business_2D00_intelligence_2D00_reveal_2D00_datasources.jpg
source_hash: 1700c106
source_locale: en
---
Reveal이 기본적으로 지원하지 않는 데이터 소스에 직접 연결해야 하는 경우가 있을 수 있습니다. 예를 들어, 자체 사용자 지정 데이터베이스를 가지고 있을 수 있습니다. 이러한 요구 사항을 충족하기 위해, 저희는 인-메모리(in-memory)를 데이터 소스로 지원합니다. 또한, 사용자 요청 보고서 결과와 같이 애플리케이션 상태의 일부로 이미 메모리에 있는 데이터를 사용해야 하는 경우에도 이 옵션을 사용할 수 있습니다.

인-메모리 데이터 소스는 디스크 드라이브보다 메모리에서 데이터에 접근하는 것이 훨씬 빠르기 때문에 검색 속도와 같은 다른 이점도 제공합니다.

이 블로그에서는 이 기능을 사용하는 방법을 단계별로 안내해 드리겠습니다.

## 데이터 스키마 정의

데이터 스키마가 인-메모리 데이터와 일치하는 데이터 파일을 정의하는 것을 권장합니다. 데이터 파일은 예를 들어 CSV 또는 Excel 파일일 수 있으며, 스키마는 기본적으로 필드 목록과 각 필드의 데이터 유형입니다. 아래 예제에서는 주어진 스키마를 가진 데이터 파일을 생성하고, 데이터베이스에서 정보를 가져오는 대신 인-메모리 데이터를 사용하는 방법에 대한 세부 정보를 찾을 수 있습니다.

다음 예제에서는 회사 직원 목록을 사용하여 HR 시스템에 HR 메트릭을 표시하는 대시보드를 임베딩하기 위해 인-메모리 데이터를 사용합니다. 그리고 직원 목록을 데이터베이스에서 가져오는 대신, 인-메모리 데이터를 사용합니다.

## 데이터 파일 및 샘플 대시보드 준비

다음은 몇 가지 속성만 가진 단순화된 Employee를 기반으로 한 단계를 사용합니다.

- EmployeeID: string
- Fullname: string
- Wage: numeric

먼저 동일한 스키마를 가진 CSV 파일을 생성합니다:

![ Example of preparing a Data File and Sample Dashboard in Reveal BI](/images/2020/10/reveal_2D00_code_2D00_1.jpg)

1. Dropbox 또는 Google Drive와 같은 선호하는 파일 공유 시스템에 파일을 업로드합니다.
2. 더미 데이터를 사용하여 대시보드를 생성합니다. 참고로, 실제 프로덕션 데이터는 나중에 애플리케이션에 제공할 것입니다.
3. 대시보드를 내보내기(Dashboard Menu → Export → Dashboard)하고 .rdash 파일로 저장합니다.

## 대시보드 시각화 및 실제 데이터 반환

이제 더미 데이터 대신 자체 데이터를 사용하여 대시보드를 시각화해야 합니다.

[IRVDataSourceProvider](https://help.revealbi.io)를 구현하고, [Replacing Data Sources](https://help.revealbi.io)에 설명된 대로 [IRevealSdkContext](https://help.revealbi.io)의 [DataSourceProvider](https://help.revealbi.io) 속성으로 반환합니다.

그런 다음, **ChangeVisualizationDataSourceItemAsync** 메서드의 구현에서 다음과 유사한 코드를 추가해야 합니다:

![ Change Visualization Data Source Item Async example code](/images/2020/10/reveal_2D00_code_2D00_2.jpg)

이 방법을 사용하면 대시보드 내의 모든 CSV 파일 참조를 "employees"로 식별된 인-메모리 데이터 소스로 기본적으로 대체하게 됩니다. 이 식별자는 나중에 데이터를 반환할 때 사용됩니다.

실제 데이터를 반환하는 메서드를 구현하려면, 아래와 같이 [IRVDataProvider](https://help.revealbi.io)를 구현해야 합니다:

![IRV Data Provider example code](/images/2020/10/reveal_2D00_code_2D00_3.jpg)

Employee 클래스의 속성은 CSV 파일의 열 이름과 정확히 일치하며, 데이터 유형도 동일하다는 점에 유의하십시오. 속성의 필드 이름, 필드 레이블 및/또는 데이터 유형을 변경하려면 클래스 선언에서 속성을 사용할 수 있습니다:

- RVSchemaColumn 속성은 필드 이름 및/또는 데이터 유형을 변경하는 데 사용될 수 있습니다.
- DisplayName 속성은 필드 레이블을 변경하는 데 사용될 수 있습니다

![ RV Schema Column attribute can be used to alter the field name and/or data type](/images/2020/10/reveal_2D00_code_2D00_4.jpg)

또한, [IRVDataProvider](https://help.revealbi.io)를 구현하려면, 이를 반환하도록 [IRevealSdkContext.DataProvider](https://help.revealbi.io) 구현을 수정해야 합니다:

![ IRV Data Provider implementation](/images/2020/10/reveal_2D00_code_2D00_5.jpg)

Reveal에 대해 더 자세히 알아보고 싶거나 아직 SDK를 사용해 보지 않았다면 체험해 보고 싶다면, 데모를 요청하십시오.

데이터의 힘을 활용하세요

실시간 컨텍스트 데이터로 비즈니스를 성장시키세요.

[Request a Demo](/request-demo)
