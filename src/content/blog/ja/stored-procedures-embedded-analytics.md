---
title: 組み込み分析におけるストアドプロシージャの使用方法
description: >-
  ストアドプロシージャとは何か、その利点、関数と比較してどのように異なるか、作成方法、そして組み込み分析でストアドプロシージャをどのように使用するかを学びます。
date: '2021-08-25'
author: Bilyana Petrova
cover: /images/2021/08/stored-procedures-in-embedded-analytics.png
summary: >-
  ストアドプロシージャは最も使用され、最も人気のあるデータベースのトピックの1つであり、そのためいくつかの利点を提供します。ストアドプロシージャを使用することで、SQLクエリの実行を簡素化し、加速することができます。
categories:
  - 技術的な洞察
seo:
  title: 組み込み分析におけるストアドプロシージャの使用方法 | Reveal BI
  description: >-
    ストアドプロシージャとは何か、その利点、関数と比較してどのように異なるか、作成方法、そして組み込み分析でストアドプロシージャをどのように使用するかを学びます。
  ogTitle: 組み込み分析におけるストアドプロシージャの使用方法 | Reveal BI
  ogDescription: >-
    ストアドプロシージャとは何か、その利点、関数と比較してどのように異なるか、作成方法、そして組み込み分析でストアドプロシージャをどのように使用するかを学びます。
  ogType: article
  twitterTitle: 組み込み分析におけるストアドプロシージャの使用方法 | Reveal BI
  twitterDescription: >-
    ストアドプロシージャとは何か、その利点、関数と比較してどのように異なるか、作成方法、そして組み込み分析でストアドプロシージャをどのように使用するかを学びます。
  ogImage: /images/2021/08/stored-procedures-in-embedded-analytics.png
source_hash: 9a7cb49d
source_locale: en
---
ストアドプロシージャを使用することは、同じコード行を頻繁に記述する手間を省き、目的のクエリの呼び出しと実行を迅速化する簡単な方法です。

しかし、ストアドプロシージャとは何か、どのように機能するのか、そしてユーザーにどのような利点を提供するのかをご存知でしょうか？

この記事では、ストアドプロシージャとは何か、その利点、関数と比較してどのように異なるのか、ストアドプロシージャの作成方法、そして最後に、[組み込み分析](/embedded-analytics)でストアドプロシージャをどのように使用するかを学びます。

## ストアドプロシージャとは何ですか？

ストアドプロシージャは、SQLステートメントとその他のPL/SQLコンストラクトのセットであり、リレーショナルデータベース管理システム（RDBMS）にグループとして保存され、繰り返し再利用できるものです。ストアドプロシージャは、SELECT、INSERT、UPDATE、またはDELETEのような複数のSQLステートメントで構成される場合があります。これらは一つのユニットとして実行され、特定の問題を解決したり、一連の関連タスクを実行したりするために使用されます。つまり、SQLクエリが必要で、それを繰り返し記述する必要がある場合、それをストアドプロシージャとして保存し、その後呼び出してクエリを実行することができます。

![stored procedure definition](/images/2021/08/what-is-stored-procedure.png)

Microsoft SQL Serverを使用している場合、SQL Server Management Studioのオブジェクトエクスプローラーで、データベースの下にあるProgrammabilityノードを展開することで、ストアドプロシージャを見つけることができます。

![what is stored procedure](/images/2021/08/using-stored-procedures-in-embedded-analytics.png)

## ストアドプロシージャを使用する利点

ストアドプロシージャは、最も使用され、人気のある[データベースのトピック](https://study.com/academy/lesson/what-are-subject-databases-definition-types.html)の一つであり、そのため、いくつかの利点を提供します。ストアドプロシージャを使用することで、SQLクエリの実行を簡素化し、加速させることができます。

例えば、ストアドプロシージャを保存することで、サーバーとクライアント間のネットワークトラフィックを削減できます。これは、コマンドが単一のコードバッチとして実行されるためです。つまり、コードのすべての行が個別に実行のために送信されるのではなく、ストアドプロシージャを実行するための呼び出しのみがサーバーに送信されます。

ストアドプロシージャを使用するその他の利点は以下の通りです。

### メンテナンス性

ストアドプロシージャのメンテナンスは、多数のクライアントマシン上のコピーを維持するのと対照的に、サーバー上では非常に簡単です。

また、プロシージャのスクリプトは単一の場所に保存されますが、ストアドプロシージャは他のアプリケーションでも自由に利用できます。定義が変更された場合でも、それは全く問題ありません。なぜなら、影響を受けるのはストアドプロシージャのみであり、それを呼び出すアプリケーションではありません。

### パフォーマンスと効率性

ストアドプロシージャは一度コンパイルされるだけで、何度も使用できます。アドホッククエリを実行する場合、同じものを複数回記述する時間を大幅に節約でき、ストアドプロシージャの最初の実行とアドホッククエリの最初の実行の間でわずかなパフォーマンス上の優位性をもたらします。

[Reveal in Actionを見る](/request-demo)

### 複雑なビジネスロジックの組み込み

複雑なビジネスロジックを配置する場所としては最適ではありませんが、ストアドプロシージャは基本的にデータベース上での関数呼び出しです。IFステートメント、ループ、セキュリティチェックなどを組み込むことで、ストアドプロシージャの呼び出しに正しいデータが返されることを保証できます。

チームのスキルセットに基づいて議論の余地があるものの、ベストプラクティスは、アプリケーションのビジネスロジックをアプリケーション側（アプリケーション層）に配置することに傾いています。しかし、ストアドプロシージャとT-SQLは、ロジック実行のための非常に強力な構文です。

### 変更が容易

ALTER PROCEDUREコマンドの助けを借りて、ストアドプロシージャ内のステートメントを1つまたは複数迅速に変更でき、呼び出し元のアプリケーションに返される結果を非常に速く簡単に更新できます。ビジネスロジックを含むミドルウェアコンポーネントとは異なり、コストのかかる再デプロイが必要になる可能性があるのに対し、ストアドプロシージャの簡単な変更は数秒で完了します。

@OrdYearの値がハードコードされているこのストアドプロシージャを考慮してください。開発者またはデータベース管理者は、ALTER PROCEDUREコマンドを使用して、@OrdYear変数を容易に更新できます。

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

### セキュリティ

ストアドプロシージャを使用するもう一つの大きな利点は、データソースに提供するセキュリティです。ストアドプロシージャを使用して、不正なアクセスを制限することで、[アプリケーションのセキュリティを強化する](/blog/security-and-analytics)ことができます。例えば、テーブル自体へのアクセスを許可せずに、データベーステーブルを更新するプロシージャへのアクセスを許可することができます。また、ストアドプロシージャを使用して、エンドユーザーから基となるテーブル名を「隠す」こともできます。ストアドプロシージャの呼び出し元は、ストアドプロシージャで使用されるテーブル名ではなく、ストアドプロシージャの名前のみを持っているため、悪意のある方法でデータを含むテーブルに直接アクセスすることはできません。

## ストアドプロシージャと関数の違い

ストアドプロシージャと関数は、タスクを完了するためのSQLステートメントのセットを含むデータベースオブジェクトです。一見すると同じように見えるかもしれませんが、実際には大きく異なります。

ストアドプロシージャと関数を区別する点は以下の通りです。

- 関数はストアドプロシージャから呼び出すことができますが、ストアドプロシージャは関数から呼び出すことができません。
- 関数は出力パラメータを許可しませんが、ストアドプロシージャは出力パラメータと入力パラメータの両方を許可します。
- 関数内ではトランザクションを管理できませんが、ストアドプロシージャ内では管理できます。
- 関数はSELECTステートメントを使用して呼び出すことができますが、ストアドプロシージャはSELECTステートメントを使用して呼び出すことができません。
- 関数は戻り値の型を持ち、値を返しますが、ストアドプロシージャは戻り値の型を持たず、値を返すことはオプションです。
- 関数はSELECTステートメントのみを許可しますが、ストアドプロシージャはSELECT、INSERT、UPDATE、およびDELETEを許可します。
- ストアドプロシージャはデータの読み取りと変更に使用できますが、関数は読み取りのみに使用できます。
- 関数はSELECTステートメントに埋め込むことができますが、ストアドプロシージャはSELECTステートメントで使用することはできません。
- 関数は複数の結果セットを返せませんが、ストアドプロシージャは返せます。
- ストアドプロシージャではトランザクションを使用できますが、関数では許可されていません。

## ストアドプロシージャの作成方法

新しいストアドプロシージャの作成は簡単です。基本的な手順は3つあります。

1. **SQL Server Object Explorer**で、Programmabilityの下にある**Stored Proceduresノード**を右クリックします。

![creating a stored procedure ](/images/2021/08/how-to-create-stored-procedure.png)

2. 新しいストアドプロシージャテンプレートで、**CREATE PROCEDUREステートメントを修正**し、ストアドプロシージャから目的のデータを返すためのテーブル、パラメータ、およびクエリオプションを含めます。

![how to create a stored procedure](/images/2021/08/creating-stored-procedure-in-embedded-analytics.png)

3. ツールバーの**実行**ボタンをクリックして、**ストアドプロシージャをコンパイルし、保存します**。

![creating a stored procedure](/images/2021/08/creating-stored-procedure.png)

ストアドプロシージャを作成するためのツールは複数ありますが、AzureやSQL Server Analysis Servicesを含む、さまざまな種類のデータベースサーバーに接続を開始するための簡単な方法を提供する、対話型のSQL Server Management Studioを使用するのが最も簡単です。

## 組み込み分析でストアドプロシージャを使用する方法

[Reveal Embed SDK](/download-sdk)を使用する場合、ストアドプロシージャを使用する方法は2通りあります。

1. ストアドプロシージャをサポートするデータベースで新しい[ビジュアライゼーション](/glossary/data-visualization)を作成する場合、利用可能なストアドプロシージャのリストが表示されます。選択したストアドプロシージャは、Reveal内の他のデータソースと同じように扱われますが、唯一の違いは、変数にパラメータ化されたストアドプロシージャであり、これをフィルターで使用できます。

![stored procedures in embedded analytics](/images/2021/08/how-to-use-stored-procedures-in-embedded-analytics.png)

Revealのユーザーインターフェースからストアドプロシージャの使用方法に関する簡単な6分間のビデオをこちらでご覧いただけます。

2. RevealはSDKであるため、コードを通じてストアドプロシージャとパラメータを完全にプログラム的に制御できます。ストアドプロシージャ名と必要なパラメータを渡すには、ChangeVisualizationDataSourceItemAsync関数を使用します。この例では、CustOrderHistという名前のストアドプロシージャとCustomerIDパラメータを渡す方法を示しています。

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

## まとめ

ストアドプロシージャは、データベースにクエリを実行し、呼び出し元のアプリケーションに結果を返すための強力なツールです。Reveal SDKユーザーにデータを提示する方法を簡素化し、アプリケーションコード内でパラメータを扱う方法を、エラーが発生しやすい長大なアドホッククエリを使用する方法と比較して簡素化するために、ストアドプロシージャの使用を検討すべきです。

[Reveal組み込み分析](/embedded-analytics)について、およびそれがどのように機能するかについて、[SDKをダウンロードする](/download-sdk)か、[簡単なデモをスケジュールする](/request-demo)ことで、さらに学ぶことができます。

1日あたりの時間をより多く解放する

Reveal組み込み分析でSQLクエリの実行を簡素化し、加速させます

[仕組みを見る](/request-demo)
