---
title: 'Reveal 1.6.6: 임베디드 분석의 새로운 기능'
description: >-
  Reveal 1.6.6 출시를 발표하게 되어 기쁩니다. 이 버전은 임베디드 분석 경험을 향상시키는 여러 새로운 기능과 개선 사항을
  제공합니다. 더 자세히 알아보세요!
date: '2024-05-01'
author: Casey Ciniello
cover: /images/2024/04/reveal-new-release-1-6-6-thumbnail.jpg
heroImage: /images/2024/04/reveal-new-release-1-6-6-header_2024-04-30T15.33.46.svg
summary: >-
  Reveal 1.6.6 출시를 발표하게 되어 기쁩니다. 이 버전은 임베디드 분석 경험을 향상시키는 여러 새로운 기능과 개선 사항을
  제공합니다.
categories:
  - 제품 업데이트
seo:
  title: 'Reveal 1.6.6: 임베디드 분석의 새로운 기능 | Reveal 임베디드 분석'
  description: >-
    Reveal 1.6.6 출시를 발표하게 되어 기쁩니다. 이 버전은 임베디드 분석 경험을 향상시키는 여러 새로운 기능과 개선 사항을
    제공합니다. 더 자세히 알아보세요!
  ogTitle: 'Reveal 1.6.6: 임베디드 분석의 새로운 기능 | Reveal 임베디드 분석'
  ogDescription: >-
    Reveal 1.6.6 출시를 발표하게 되어 기쁩니다. 이 버전은 임베디드 분석 경험을 향상시키는 여러 새로운 기능과 개선 사항을
    제공합니다. 더 자세히 알아보세요!
  ogType: article
  twitterTitle: 'Reveal 1.6.6: 임베디드 분석의 새로운 기능 | Reveal 임베디드 분석'
  twitterDescription: >-
    Reveal 1.6.6 출시를 발표하게 되어 기쁩니다. 이 버전은 임베디드 분석 경험을 향상시키는 여러 새로운 기능과 개선 사항을
    제공합니다. 더 자세히 알아보세요!
  ogImage: /images/2024/04/reveal-new-release-1-6-6-thumbnail.jpg
source_hash: b355143a
source_locale: en
---
## **Reveal 1.6.6 공개: 분석 경험 향상**

Reveal 1.6.6 출시 소식을 기쁘게 알려드립니다. 이 버전은 여러 새로운 기능과 개선 사항을 포함하여 사용자의 [embedded analytics](/embedded-analytics) 경험을 향상시킬 것입니다. 이번 릴리스의 주요 내용은 다음과 같습니다:

## **새 기능(New Features)**

- **서버 측 페이지 매김(Server-Side Paging)**: 서버 측 페이지 매김을 사용하면 Grid 시각화에서 데이터를 표시할 때 클라이언트로 전송되는 행의 수를 제한할 수 있습니다. 이는 대규모 데이터 세트와 상호 작용할 때 사용자 경험을 개선하는 동시에 성능을 크게 향상시킵니다. 현재 베타 기능이므로 피드백을 기다립니다! 서버 측 페이지 매김을 활성화하려면 클라이언트 JavaScript에서 *$.ig.RevealSdkSettings.enableBetaFeatures=true*로 설정하고 Grid 시각화의 설정 탭에서 설정하면 새로운 페이지 매김 옵션을 볼 수 있습니다.

![Reveal 1.6.6: What's New in Embedded Analytics](/images/2024/04/reveal-server-side-paging.png)

- **설명 텍스트 상자(Description Text Box)**: 새로운 설명 텍스트 상자를 사용하여 대시보드에 추가적인 컨텍스트를 추가할 수 있습니다. 이는 대시보드의 제목 바로 아래에 위치합니다. 설명 텍스트 상자는 RevealView의 *canEdit* 속성에 설정된 규칙을 따릅니다. 사용자에게 대시보드 편집 권한이 부여된 경우, 대시보드 설명을 편집할 수 있습니다. 설명 텍스트 상자를 표시하거나 숨기려면 RevealView의 *showDescription* Boolean 속성을 변경하십시오.

![Reveal 1.6.6: What's New in Embedded Analytics](/images/2024/04/reveal-description-text-box.png)

- **향상된 PDF 내보내기(Enhanced PDF Export)**: Grid 및 Pivot Grid 시각화에 대한 PDF 내보내기가 개편되었습니다. 새로운 Grid 및 Pivot Grid 내보내기 경험에는 열 너비 처리 개선, 개선된 열 및 행 오버플로우 처리, 그리고 가독성 향상을 위해 내보낸 페이지 전반에 걸쳐 동일한 행을 더 잘 추적하는 업데이트된 PDF 렌더링이 포함됩니다.
- **내보내기 필터(Export Filters)**: PowerPoint, PDF 또는 Microsoft Excel로 내보낼 때, 이제 대시보드에 적용된 필터를 설명하는 표지 페이지가 표시됩니다. 이를 통해 대시보드가 내보내질 때, 해당 내보내기 형식의 뷰어가 전체 데이터인지 데이터의 일부인지 알 수 있도록 보장합니다.

![Reveal 1.6.6: What's New in Embedded Analytics](/images/2024/04/reveal-export-filters.png)

- **로드 성능 개선(Improve Load Performance)**: 새 시각화를 생성할 때 데이터 스키마의 로드 경험을 더 개선하기 위해, 데이터 소스의 필드 목록에서 필드에 마우스를 올릴 때 데이터 미리보기를 표시하는 플래그를 추가했습니다. 기본적으로 툴팁에 각 필드의 샘플링을 표시하기 위해 데이터 소스에서 5개 행의 데이터를 쿼리합니다. 대규모 데이터 세트를 사용하는 저장 프로시저의 경우, 이는 성능에 영향을 줄 수 있습니다. 이 데이터 툴팁 기능을 활성화하려면 *isPreviewDataInVisualizationEditorEnabled*를 true로 설정하십시오. 기본값은 꺼져 있습니다.
- **MySQL 서버 측 데이터 블렌딩(MySQL Server-Side Data Blending)**: MySQL이 이제 서버 측 데이터 블렌딩을 지원하여, 조인된 테이블이 이제 서버에서 쿼리를 실행하므로 대규모 데이터 세트의 성능이 극적으로 향상됩니다.
- **새 차트(New Charts)**: Radial 차트를 업데이트된 코드로 그리고 새로운 모양과 느낌으로 향상시켰습니다. 이전 차트는 여전히 클라이언트 라이브러리에 있지만, 이제 사용되지 않으며 올해 후반에 영구적으로 제거될 예정입니다. 이전 차트를 유지하려면 *RevealSdkSettings.EnableNewCharts = false*를 설정할 수 있습니다.
- **업데이트된 막대 및 열 차트(Updated Bar and Column Charts)**: 시각화 편집기 설정 창의 새로운 Overlap 및 Gap 속성은 막대와 열 사이의 중첩 정도와 그룹 간의 간격 정도를 제어할 수 있게 합니다. 이 새로운 설정은 막대와 열을 '병합'하여 데이터를 시각화하고 데이터 레이블을 표시하는 새로운 방법을 제공합니다.
- **Treemap 시각화 툴팁(Treemap Visualization Tooltip)**: Reveal에서 툴팁 경험을 계속 개선하고 있습니다. 이번 릴리스를 통해 마우스를 올리면 노드에 하이라이트가 적용된 툴팁을 얻을 수 있습니다.
- **데이터 소스 대화 상자 필터(Data Sources Dialog Filter)**: Node 서버에서 RevealOptions에 새로운 *dataSourceItemFilter* 속성을 추가했습니다. 이는 .NET Core 서버의 *IRVObjectFilter*를 모방하여 데이터 소스 대화 상자에서 데이터 소스 항목을 필터링할 수 있게 합니다. 이 기능은 사용자가 클라이언트에서 어떤 데이터 객체를 볼 수 있는지 결정하는 서버 측 보안 설정 능력을 향상시킵니다.

## **버그 수정(Bug Fixes)**

또한 Pie 차트, Grid 충돌, 데이터 블렌딩 오류 등 모든 플랫폼에서 더욱 원활하고 안정적인 분석 경험을 보장하기 위해 여러 버그를 수정했습니다. 전체 목록은 다음과 같습니다:

- UI에서 내보낼 때 Pie 및 Doughnut 차트가 표시되지 않음.

- 계산된 필드가 의존하는 데이터 블렌드를 삭제해도 계산된 필드는 삭제되지 않음.

- Redshift 및 Postgres에서 함수를 호출할 때 오류 메시지가 발생할 수 있음.

- 컨테이너 또는 모든 상위 요소에 transform:scale 스타일을 사용할 때 RevealView의 위치 지정 및 크기 조정 문제.

- canAddDateFilter 설정 시 예외가 발생함.

- 대시보드 속성이 null 또는 undefined로 설정된 경우 Save event args.isNew가 false임.

- 저장 프로시저 매개변수 화면이 때때로 이전 데이터나 아무것도 가져오지 못함.

- 검색창을 사용할 때 팝업 요소에서 스크롤이 작동하지 않음.

- 스캐터 맵 지표가 확대/축소에 따라 마우스 오버 영역이 이동함.

- Choropleth Map 툴팁에 분수 자릿수가 표시되지 않음.

- 3000 초과 필터 값 보존되지 않음.

- 계산된 필드 UI에서 이름이 변경된 피벗 필드 오류.

- 미리보기 데이터 셀이 재사용되지 않아 여러 번 렌더링됨.

- MacOS ARM64에서 Grid 충돌 발생.

- 충분한 공간이 있어도 Pie 차트 범례가 사라짐.

- 슬라이스 차트에서 마우스 오버 이벤트가 의도한 대로 작동하지 않음.

- Pivot Grid 시각화에서 총합계가 표시되지 않음.

- Analysis Services 데이터 공급자를 사용할 때 잘못된 총합계 값이 표시됨.

- Analysis Services 데이터 공급자를 사용할 때 대시보드 및 시각화 필터의 총합계가 잘못됨.

- Pivot Grid에서 값을 재정렬한 후 필드 이름 수정 사항이 손실됨.

- Analysis Services에서 "…hierarchy already appears in the Axis1 axis." 오류 발생.

- Analysis Services에서 'Top N' 필터를 적용할 때 잘못된 결과가 나옴.

- 리소스 기반 시각화가 잘못된 캐시 항목을 가져옴.

- 블렌딩을 사용할 때 잘못된 캐시 항목이 사용됨.

- 브라우저가 백그라운드로 전환된 후 검색 상자에 포커스를 설정할 수 없음.

## **종속성 업데이트(Dependency Updates)**

- Playwright v1.27.2 종속성이 v1.42.0으로 업데이트되었습니다.

Reveal 무료 체험하기

SDK를 다운로드하여 오늘 바로 시작하세요.

[DOWNLOAD](/download-sdk)
