---
title: 'Reveal이 주요 신규 기능—예측 분석, 빅 데이터 및 기타—를 추가합니다'
description: '머신러닝, 빅 데이터 커넥터, 예측 분석, R 및 Python 스크립팅 등으로 강화된 데이터 분석의 강력함을 경험해 보세요.'
date: '2020-04-02'
author: Casey Ciniello
cover: >-
  /images/2020/10/0247.business_2D00_intelligence_2D00_reveal_2D00_machine_2D00_learning.jpg
summary: >-
  오늘 저희 Reveal 제품의 또 다른 대규모 업데이트를 발표하게 되어 매우 기쁩니다! 이 릴리스에는 오늘날 가장 인기 있는 주제 및
  트렌드와 관련된 기능들이 가득합니다: 예측 및 고급 분석, 머신러닝, R 및 Python 스크립팅, 빅 데이터 커넥터, 고급 시각화 상호
  작용 등. 이 블로그에서 각 기능을 강조할 것이며, 스크린샷과 함께 [&hellip;]
categories:
  - 제품 업데이트
seo:
  title: 'Reveal BI에 예측 분석, 빅 데이터 포함 - Reveal BI'
  description: '머신러닝, 빅 데이터 커넥터, 예측 분석, R 및 Python 스크립팅 등으로 강화된 데이터 분석의 강력함을 경험해 보세요.'
  ogTitle: 'Reveal BI에 예측 분석, 빅 데이터 포함 - Reveal BI'
  ogDescription: '머신러닝, 빅 데이터 커넥터, 예측 분석, R 및 Python 스크립팅 등으로 강화된 데이터 분석의 강력함을 경험해 보세요.'
  ogType: article
  twitterTitle: 'Reveal BI에 예측 분석, 빅 데이터 포함 - Reveal BI'
  twitterDescription: '머신러닝, 빅 데이터 커넥터, 예측 분석, R 및 Python 스크립팅 등으로 강화된 데이터 분석의 강력함을 경험해 보세요.'
  ogImage: >-
    /images/2020/10/0247.business_2D00_intelligence_2D00_reveal_2D00_machine_2D00_learning.jpg
source_hash: 02816422
source_locale: en
---
Reveal 제품의 또 다른 대규모 업데이트를 오늘 발표하게 되어 매우 기쁩니다! 이번 릴리스에는 오늘날 가장 인기 있는 주제와 트렌드를 다루는 기능들이 가득 담겨 있습니다:

- 예측 및 고급 분석(Predictive and Advanced Analytics)
- 머신러닝(Machine Learning)
- R 및 Python 스크립팅(R & Python Scripting)
- 빅 데이터 커넥터(Big Data Connectors)
- 고급 시각화 상호 작용(Advanced Visualization Interactions)
- 그리고 훨씬 더 많은 기능들

이 블로그에서 각 기능을 자세히 설명할 것이며, 스크린샷을 통해 다음번에 Reveal에 로그인했을 때 무엇을 기대할 수 있는지 아이디어를 얻으실 수 있을 것입니다!

또한 Reveal을 Linux 클라우드 백엔드로 이전하여 Windows보다 훨씬 저렴한 배포 옵션을 제공하며, .NET Core 3 지원도 포함했음을 알려드립니다.

## 통계 함수를 활용한 고급 분석(Advanced Analytics with Statistical Functions)

단 몇 번의 클릭만으로 비즈니스 사용자로서 데이터에 대한 통찰력을 빠르게 얻고 다음 내장 함수 중 하나를 사용하여 다양한 통계 분석을 수행할 수 있습니다:

### 이상치 감지(Outliers Detection)

이상치 감지 기능을 사용하면 데이터 세트의 대부분과 다르거나 이상치인 데이터 포인트를 쉽게 감지할 수 있습니다. 이러한 이상치를 보기로 표시하거나 숨길 수 있어, 항상 표시되거나 분석을 방해하지 않도록 할 수 있습니다.

![Outliers Detection in Reveal](/images/2020/11/4274.OUtliers.PNG-1040x1626-1.png)

### 시계열 예측(Time Series Forecasting)

시계열 예측 기능을 사용하면 Reveal이 과거 데이터와 추세를 기반으로 미래 값을 예측합니다. 이는 판매 및 수익 예측, 재고 관리 등 수많은 애플리케이션에 유용합니다.

![Time Series Forecasting in dashboard ](/images/2020/10/5340.Time-Series-Forecast.png)

### 선형 회귀(Linear Regression)

선형 회귀를 사용하면 두 변수 간의 관계를 찾아 데이터의 추세를 시각적으로 확인하고, 미래 추세를 포함하여 데이터의 선형 근사치를 볼 수 있습니다. 선형 회귀와 함께 Reveal은 다음 알고리즘 추세선도 포함합니다: 선형 적합(Linear Fit), 이차 적합(Quadratic Fit), 삼차 적합(Cubic Fit), 사차 적합(Quartic Fit), 로그 적합(Logarithmic Fit), 지수 적합(Exponential Fit), 거듭제곱 법칙 적합(Power Law Fit), 단순 평균(Simple Average), 지수 평균(Exponential Average), 수정 평균(Modified Average), 누적 평균(Cumulative Average), 그리고 가중 평균(Weighted Average)입니다.

![Linear regeression ](/images/2020/10/7416.Linear-Regression.png)

## 머신러닝(Machine Learning)

이제 Reveal에 머신러닝의 강력한 기능을 가져올 수 있습니다! Microsoft Azure Machine Learning Models Integration을 사용하면 Azure Machine Learning Studio에서 훈련된 모델을 귀하의 데이터에 적용하여 아름다운 시각화를 만들 수 있습니다. 단순히 데이터가 있는 URL을 Azure 모델에 연결하면, Reveal이 귀하의 머신러닝 시나리오를 기반으로 시각화를 렌더링합니다. 또한 Google BigQuery Platforms에서 데이터에 적용된 훈련된 모델을 사용하여 눈에 띄는 시각화를 만들 수도 있습니다.

![ Machine learning models in Reveal BI](/images/2020/10/ML-Models.png)

## R 및 Python 스크립팅(R & Python Scripting)

이제 R 및 Python 스크립팅을 지원하여, Reveal이 데이터 세트로 할 수 있는 것의 한계를 뛰어넘는 통계 분석 및 데이터 분석을 수행하는 내부 시민 데이터 과학자에게 진입로를 제공합니다. 예를 들어, 시각화 출력을 개선하기 위해 데이터를 사전/사후 처리하거나 R 또는 Python 라이브러리에 포함된 고유한 시각화를 렌더링할 수 있습니다. 스크립트 URL을 붙여넣거나 스크립트 편집기에 코드를 붙여넣기만 하면 됩니다.

![R & Python Scripting](/images/2020/10/R-_2600_-Python.png)

## 새로운 데이터 소스 커넥터!

많은 요청에 따라 Reveal에 3가지 중요한 새 데이터 커넥터를 추가했습니다:

- Azure SQL
- Azure Synapse
- Google Big Query

이 강력한 새 커넥터들을 통해 수백만 개의 레코드를 Reveal로 가져와 속도를 희생하지 않고 시각화를 만들 수 있습니다! Azure Synapse에서 1억 개의 레코드를 테스트했는데... 순식간에 로드됩니다!

마케팅, 영업 및 IT 요구 사항을 위해 다음 커넥터들을 추가했습니다:

- Google Analytics
- Microsoft SQL Server Reporting Services (SSRS)
- Salesforce

시장상 가장 많이 사용되는 웹 분석 서비스 중 하나인 Google Analytics를 사용하면 웹사이트 트래픽, 애플리케이션 사용량 등에서 통찰력을 가져오는 대시보드를 만들 수 있습니다! Reporting Services를 사용하면 PDF 시각화를 Reveal 시각화로 렌더링하거나, 보고서의 필드를 사용하여 Reporting Services에서 제공하지 않는 새로운 시각화를 만들 수 있습니다. 이는 레거시 사용에 완벽합니다. SSRS URL을 Reveal에 연결하기만 하면 데이터에 새롭고 상호 작용적인 생명을 불어넣을 수 있습니다.

![Connecting Google Analytics with Reveal BI](/images/2020/10/Google-Analytics.png)

![Connecting Microsoft SQL Server Reporting Services with Reveal BI](/images/2020/10/SSRS.png)

## 새로운 시각화 레벨 상호 작용(New Visualization Level Interactions)

이번 릴리스에서 데이터 분석 및 시각화가 더욱 향상되었습니다. 가장 중요한 데이터에 초점을 맞추기 위해, Reveal은 이제 다음 기능을 포함합니다:

- 더 세련된 스타일과 향상된 가독성을 가진 호버 툴팁(Hover ToolTips)
- 시각화의 포인트에 대한 더 나은 정밀도를 위한 차트용 교차선(Crosshair support) 지원!
- 데이터 포인트 호버 위치를 기반으로 X축 및 Y축에 정밀도 지표를 제공하는 값 오버레이(Value Overlays)

![ Data visualization improvements in Reveal app](/images/2020/10/ToolTips.png)

![Linear regeression ](/images/2020/10/7416.Linear-Regression.png)

## 고급 내보내기 옵션(Advanced Exporting Options)

PDF 내보내기 기능 추가 외에도, 이제 PowerPoint 및 PDF로 내보낼 때 내보내기 기능을 완전히 사용자 정의할 수 있는 기능을 갖게 되었습니다. 이번 릴리스를 통해 다음을 수행할 수 있습니다:

- 내보내기에 포함할 시각화 선택
- 슬라이드 및 페이지에 제목 추가
- 시각화 주석 달기
- 회사 로고, 이름 및 색상과 일치하는 사용자 지정 브랜딩 추가

![Reveal BI export to Power Point option](/images/2020/10/Export-to-PowerPoint.png)

## **앱의 모양과 느낌에 맞는 새 테마**

최신 Reveal 버전에는 라이트 모드와 다크 모드에서 작동하는 두 가지 새 테마가 포함되어 있습니다. Reveal을 귀하의 애플리케이션에 임베딩할 때 앱의 모양과 느낌에 맞게 사용자 정의하고, 색상, 글꼴, 모양 등에 대한 완벽한 제어권을 갖게 됩니다!

데이터의 힘을 활용하세요

실시간 컨텍스트 데이터로 비즈니스를 성장시키세요.

[Request a Demo](/request-demo)
