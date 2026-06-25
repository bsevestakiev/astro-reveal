---
title: 임베디드 분석에서 저장 프로시저 사용하기
description: >-
  저장 프로시저가 무엇인지, 어떤 이점이 있는지, 함수와 어떻게 다른지, 어떻게 생성하는지, 그리고 임베디드 분석에서 저장 프로시저를 어떻게
  사용하는지 알아보세요.
date: '2021-08-25'
author: Bilyana Petrova
cover: /images/2021/08/stored-procedures-in-embedded-analytics.png
summary: >-
  저장 프로시저는 가장 많이 사용되고 인기 있는 데이터베이스 주제 중 하나이며, 따라서 몇 가지 이점을 제공합니다. 저장 프로시저를 사용하면
  SQL 쿼리 실행을 단순화하고 가속화할 수 있습니다.
categories:
  - 기술 통찰력
seo:
  title: 임베디드 분석에서 저장 프로시저 사용하기 | Reveal BI
  description: >-
    저장 프로시저가 무엇인지, 어떤 이점이 있는지, 함수와 어떻게 다른지, 어떻게 생성하는지, 그리고 임베디드 분석에서 저장 프로시저를
    어떻게 사용하는지 알아보세요.
  ogTitle: 임베디드 분석에서 저장 프로시저 사용하기 | Reveal BI
  ogDescription: >-
    저장 프로시저가 무엇인지, 어떤 이점이 있는지, 함수와 어떻게 다른지, 어떻게 생성하는지, 그리고 임베디드 분석에서 저장 프로시저를
    어떻게 사용하는지 알아보세요.
  ogType: article
  twitterTitle: 임베디드 분석에서 저장 프로시저 사용하기 | Reveal BI
  twitterDescription: >-
    저장 프로시저가 무엇인지, 어떤 이점이 있는지, 함수와 어떻게 다른지, 어떻게 생성하는지, 그리고 임베디드 분석에서 저장 프로시저를
    어떻게 사용하는지 알아보세요.
  ogImage: /images/2021/08/stored-procedures-in-embedded-analytics.png
source_hash: 9a7cb49d
source_locale: en
---
저장 프로시저를 사용하는 것은 자주 동일한 코드 라인을 작성하는 시간을 절약하고 원하는 쿼리의 호출 및 실행을 가속화하는 쉬운 방법입니다.

하지만 저장 프로시저가 무엇인지, 어떻게 작동하는지, 그리고 사용자에게 어떤 이점을 제공하는지에 대해서는 얼마나 알고 계신가요?

이 기사에서 여러분은 저장 프로시저가 무엇인지, 그 이점, 함수와 비교하여 어떻게 차별화되는지, 저장 프로시저를 어떻게 생성하는지, 그리고 마지막으로 임베디드 분석에서 저장 프로시저를 어떻게 사용하는지 배우게 될 것입니다.

## 저장 프로시저란 무엇인가요?

저장 프로시저는 관계형 데이터베이스 관리 시스템(RDBMS)에 그룹으로 저장되어 반복적으로 저장하고 재사용할 수 있는 SQL 구문 및 기타 PL/SQL 구문 집합입니다. 저장 프로시저는 SELECT, INSERT, UPDATE, DELETE와 같은 여러 SQL 구문으로 구성될 수 있습니다. 이들은 하나의 단위로 실행되며 특정 문제를 해결하거나 관련 작업을 수행하는 데 사용됩니다. 즉, SQL 쿼리가 필요하고 그것을 반복적으로 작성해야 한다면, 이를 저장 프로시저로 저장한 다음 호출하여 쿼리를 실행할 수 있습니다.

![stored procedure definition](/images/2021/08/what-is-stored-procedure.png)

Microsoft SQL Server를 사용하고 있다면, SQL Server Management Studio의 개체 탐색기에서 데이터베이스 아래의 Programmability 노드를 확장하여 저장 프로시저를 찾을 수 있습니다.

![what is stored procedure](/images/2021/08/using-stored-procedures-in-embedded-analytics.png)

## 저장 프로시저 사용의 이점

저장 프로시저는 가장 많이 사용되고 인기 있는 [데이터베이스 주제](https://study.com/academy/lesson/what-are-subject-databases-definition-types.html) 중 하나이며, 따라서 몇 가지 이점을 제공합니다. 저장 프로시저를 사용하면 SQL 쿼리 실행을 단순화하고 가속화할 수 있습니다.

예를 들어, 저장 프로시저는 서버와 클라이언트 간의 네트워크 트래픽을 줄일 수 있습니다. 이는 명령이 단일 배치 코드(single batch of code)로 실행되기 때문입니다. 따라서 모든 코드 라인이 개별적으로 실행을 위해 전송되는 대신, 저장 프로시저를 실행하라는 호출만 서버로 전송됩니다.

저장 프로시저 사용의 다른 이점들은 다음과 같습니다.

### 유지 관리 용이성 (Maintainability)

저장 프로시저를 유지 관리하는 것은 여러 클라이언트 장치에 복사본을 유지 관리하는 것과 비교하여 서버에서 매우 쉽습니다.

또한, 프로시저 스크립트는 한 위치에 저장되지만, 저장 프로시저는 다른 애플리케이션에서도 자유롭게 사용할 수 있습니다. 정의가 변경되는 경우에도 문제가 전혀 없습니다. 오직 저장 프로시저만 영향을 받고 이를 호출하는 애플리케이션은 영향을 받지 않기 때문입니다.

### 성능 및 효율성 (Performance & Efficiency)

저장 프로시저는 한 번 컴파일된 후 여러 번 사용될 수 있습니다. 이는 임시 쿼리(ad-hoc queries)를 수행할 때 동일한 작업을 여러 번 작성하는 시간을 많이 절약해 주고, 임시 쿼리의 첫 실행 대비 저장 프로시저의 첫 실행 시 약간의 성능 우위를 제공합니다.

[See Reveal in Action](/request-demo)

### 복잡한 비즈니스 로직 포함

복잡한 비즈니스 로직을 위한 최적의 장소는 아니지만, 저장 프로시저는 기본적으로 데이터베이스의 함수 호출입니다. 저장 프로시저 호출로 올바른 데이터가 전송되도록 보장하기 위해 IF 구문, 루프, 보안 검사 등 훨씬 더 많은 것을 포함할 수 있습니다.

팀의 기술 스택에 따라 논쟁의 여지는 있지만, 모범 사례는 애플리케이션의 비즈니스 로직을 애플리케이션 측에 배치하는 경향이 있습니다. 하지만 저장 프로시저와 T-SQL은 로직 실행을 위한 매우 강력한 구문입니다.

### 수정 용이성 (Easy to Modify)

ALTER PROCEDURE 명령을 사용하여 저장 프로시저의 하나 이상의 구문을 빠르게 변경할 수 있습니다. 이는 호출하는 앱으로 전송되는 결과를 매우 빠르고 쉽게 업데이트할 수 있게 해줍니다. 비즈니스 로직을 포함하는 미들티어 구성 요소가 잠재적으로 비용이 많이 드는 재배포가 필요할 수 있는 것과 달리, 저장 프로시저의 빠른 변경은 몇 초밖에 걸리지 않습니다.

@OrdYear 값이 하드 코딩된 이 저장 프로시저를 고려해 보세요. 개발자나 데이터베이스 관리자는 ALTER PROCEDURE 명령을 사용하여 @OrdYear 변수를 쉽게 업데이트할 수 있습니다.

```
ALTER PROCEDURE [dbo].[SalesByCategory] 

    @CategoryName nvarchar(15), @OrdYear nvarchar(4) = '1998' 

AS 

IF @OrdYear != '1996' AND @OrdYear != '1997' AND @OrdYear != '1998'  

BEGIN 

    SELECT @OrdYear = '1998' 

END 

 

SELECT ProductName, 

    TotalPurchase=ROUND(SUM(CONVERT(decimal(14,2), OD.Quantity * (1-OD.Discount) * OD.UnitPrice)), 0) 

FROM [Order Details] OD, Orders O, Products P, Categories C 

WHERE OD.OrderID = O.OrderID  

    AND OD.ProductID = P.ProductID  

    AND P.CategoryID = C.CategoryID 

    AND C.CategoryName = @CategoryName 

    AND SUBSTRING(CONVERT(nvarchar(22), O.OrderDate, 111), 1, 4) = @OrdYear 

GROUP BY ProductName 

ORDER BY ProductName
```

### 보안 (Security)

저장 프로시저를 사용함으로써 얻을 수 있는 또 다른 훌륭한 이점은 데이터 소스에 제공하는 보안입니다. 저장 프로시저를 사용하여 무단 액세스를 제한함으로써 [애플리케이션의 보안을 강화](/blog/security-and-analytics)할 수 있습니다. 예를 들어, 테이블 자체에 대한 액세스를 허용하지 않으면서 데이터베이스 테이블을 업데이트하는 프로시저에만 누군가 액세스할 수 있도록 권한을 부여할 수 있습니다. 또한 저장 프로시저를 사용하여 근본적인 테이블 이름을 최종 사용자로부터 "숨길" 수도 있습니다. 저장 프로시저의 호출자는 저장 프로시저에 사용된 테이블의 이름이 아니라 저장 프로시저의 이름만 가지고 있기 때문에, 악의적인 방식으로 데이터가 담긴 테이블에 직접 액세스할 수 없습니다.

## 저장 프로시저와 함수의 차이점

저장 프로시저와 함수는 작업을 완료하기 위한 SQL 구문 집합을 포함하는 데이터베이스 객체입니다. 언뜻 보기에는 같은 것 같지만, 실제로는 상당히 다릅니다.

저장 프로시저와 함수를 구별하는 몇 가지 사항은 다음과 같습니다.

- 함수는 저장 프로시저에서 호출될 수 있지만, 저장 프로시저는 함수에서 호출될 수 없습니다.
- 함수는 출력 매개변수를 허용하지 않지만, 저장 프로시저는 출력 및 입력 매개변수 모두를 허용합니다.
- 함수 내부에서는 트랜잭션을 관리할 수 없지만, 저장 프로시저 내부에서는 할 수 있습니다.
- 함수는 SELECT 구문을 사용하여 호출할 수 있지만, 저장 프로시저는 SELECT 구문을 사용하여 호출할 수 없습니다.
- 함수는 반환 유형을 가지고 값을 반환하지만, 저장 프로시저는 반환 유형이 없으며 값 반환은 선택 사항입니다.
- 함수는 SELECT 구문만 허용하지만, 저장 프로시저는 SELECT, INSERT, UPDATE, AND DELETE를 모두 허용합니다.
- 저장 프로시저는 데이터를 읽고 수정하는 데 사용될 수 있지만, 함수는 데이터를 읽기만 할 수 있습니다.
- 함수는 SELECT 구문에 임베딩될 수 있지만, 저장 프로시저는 SELECT 구문에서 활용될 수 없습니다.
- 함수는 여러 개의 결과 집합을 반환할 수 없지만, 저장 프로시저는 할 수 있습니다.
- 저장 프로시저에서는 트랜잭션을 사용할 수 있지만, 함수에서는 허용되지 않습니다.

## 저장 프로시저를 생성하는 방법은?

새로운 저장 프로시저를 생성하는 것은 간단합니다. 기본 3단계가 있습니다.

1. **SQL Server Object Explorer**에서 Programmability 아래의 **Stored Procedures 노드**를 마우스 오른쪽 버튼으로 클릭합니다.

![creating a stored procedure ](/images/2021/08/how-to-create-stored-procedure.png)

2. 새 저장 프로시저 템플릿에서 **CREATE PROCEDURE 구문을 수정**하여 저장 프로시저에서 원하는 데이터를 반환하기 위한 테이블, 매개변수 및 쿼리 옵션을 포함합니다.

![how to create a stored procedure](/images/2021/08/creating-stored-procedure-in-embedded-analytics.png)

3. 도구 모음에서 **실행(Execute)** 버튼을 클릭하여 **저장 프로시저를 컴파일하고 저장**합니다.

![creating a stored procedure](/images/2021/08/creating-stored-procedure.png)

저장 프로시저를 생성하는 데는 여러 도구가 있으며, Azure 및 SQL Server Analysis Services를 포함하여 다양한 유형의 데이터베이스 서버에 연결을 시작하는 쉬운 방법을 제공하므로 대화형 SQL Server Management Studio를 사용하는 것이 가장 쉽습니다.

## 임베디드 분석에서 저장 프로시저를 사용하는 방법은?

[Reveal Embed SDK](/download-sdk)를 사용할 때 저장 프로시저를 사용하는 방법은 2가지가 있습니다.

1. 저장 프로시저를 지원하는 데이터베이스에서 새로운 [시각화](/glossary/data-visualization)를 생성할 때, 사용 가능한 저장 프로시저 목록이 표시됩니다. 선택한 저장 프로시저는 Reveal의 다른 모든 데이터 소스처럼 취급되며, 유일한 차이점은 매개변수화된 저장 프로시저라는 점이며, 이는 필터(Filter)에서 변수를 저장 프로시저에 전달하여 사용할 수 있습니다.

![stored procedures in embedded analytics](/images/2021/08/how-to-use-stored-procedures-in-embedded-analytics.png)

Reveal 사용자 인터페이스를 통해 저장 프로시저를 사용하는 방법에 대한 간단한 6분짜리 비디오를 여기서 시청할 수 있습니다.

2. Reveal은 SDK이므로, 코드를 통해 저장 프로시저와 매개변수에 대한 완전한 프로그래밍 방식 제어 권한을 가집니다. 저장 프로시저 이름과 필요한 매개변수를 전달하려면 ChangeVisualizationDataSourceItemAsync 함수를 사용합니다. 이 예제는 CustOrderHist라는 이름의 저장 프로시저와 CustomerID 매개변수를 전달하는 방법을 보여줍니다.

```
public async override Task<RVDataSourceItem> ChangeVisualizationDataSourceItemAsync 

    (string userId, string dashboardId, RVVisualization visualization,  

RVDataSourceItem dataSourceItem) 

{ 

    if (dashboardId == "StoredProcNorthWind") 

    { 

        var msSqlDsi = dataSourceItem as RVSqlServerDataSourceItem; 

 

 

 

        if (msSqlDsi?.Procedure == "CustOrderHist") 

        { 

            msSqlDsi.ProcedureParameters["@CustomerID"] = "AROUT"; 

        } 

        else 

        { 

            msSqlDsi.Procedure = "MyProcedure"; 

            msSqlDsi.ProcedureParameters["@SampleParam"] = "SampleParamValue"; 

        } 

        return dataSourceItem; 

    } 

}
```

## 요약

저장 프로시저는 데이터베이스를 쿼리하고 호출하는 앱으로 결과를 반환하는 강력한 도구입니다. Reveal SDK 사용자에게 데이터를 제시하는 방식을 단순화하고, 오류가 발생하기 쉽고 긴 임시 쿼리를 사용하는 것과 비교하여 애플리케이션 코드에서 매개변수를 처리하는 방식을 단순화하기 위해 저장 프로시저 사용을 고려해야 합니다.

[Reveal 임베디드 분석](/embedded-analytics) 및 작동 방식에 대해 더 자세히 알고 싶다면 [SDK를 다운로드](/download-sdk)하거나 [빠른 데모를 예약](/request-demo)할 수 있습니다.

하루에 더 많은 시간 잠금 해제하기

Reveal 임베디드 분석으로 SQL 쿼리 실행을 단순화하고 가속화하세요

[SEE HOW IT WORKS](/request-demo)
