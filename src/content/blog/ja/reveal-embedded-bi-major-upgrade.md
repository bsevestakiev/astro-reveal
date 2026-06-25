---
title: Revealが主要な新機能—予測分析、ビッグデータなどを追加
description: 機械学習、ビッグデータコネクタ、予測分析、RおよびPythonスクリプティングなどによって強化されたデータ分析の力を体験してください。
date: '2020-04-02'
author: Casey Ciniello
cover: >-
  /images/2020/10/0247.business_2D00_intelligence_2D00_reveal_2D00_machine_2D00_learning.jpg
summary: >-
  本日、Reveal製品のさらなる大きなアップデートを発表できることを大変嬉しく思います！このリリースには、今日の最もホットなトピックやトレンドに触れる機能が満載です：予測および高度な分析、機械学習、RおよびPythonスクリプティング、ビッグデータコネクタ、高度なビジュアライゼーション、インタラクションなど、その他多数。このブログで各機能を強調し、スクリーンショットとともに[...]。
categories:
  - 製品アップデート
seo:
  title: Reveal BIは予測分析、ビッグデータを含む
  description: 機械学習、ビッグデータコネクタ、予測分析、RおよびPythonスクリプティングなどによって強化されたデータ分析の力を体験してください。
  ogTitle: Reveal BIは予測分析、ビッグデータを含む
  ogDescription: 機械学習、ビッグデータコネクタ、予測分析、RおよびPythonスクリプティングなどによって強化されたデータ分析の力を体験してください。
  ogType: article
  twitterTitle: Reveal BIは予測分析、ビッグデータを含む
  twitterDescription: 機械学習、ビッグデータコネクタ、予測分析、RおよびPythonスクリプティングなどによって強化されたデータ分析の力を体験してください。
  ogImage: >-
    /images/2020/10/0247.business_2D00_intelligence_2D00_reveal_2D00_machine_2D00_learning.jpg
source_hash: 02816422
source_locale: en
---
本日、Reveal製品のさらなる大きなアップデートを発表できることを大変嬉しく思います！今回のリリースには、今日の最もホットなトピックやトレンドに触れる機能が満載です。

- 予測分析および高度な分析
- 機械学習
- RおよびPythonスクリプティング
- ビッグデータコネクタ
- 高度なビジュアライゼーションインタラクション
- その他多数

このブログで各機能を詳しく紹介し、スクリーンショットを通じて、次回Revealにログインしたときに何が期待できるかをご理解いただけるでしょう！

また、RevealをLinuxクラウドバックエンドに移行した点にご注意ください。これにより、Windowsよりもはるかに低コストなデプロイメントオプションを提供しつつ、.NET Core 3のサポートも含まれています。

## 統計関数による高度な分析

ビジネスユーザーである皆様は、わずか数回のクリックで、データに関するより多くの洞察を得て、以下の組み込み関数を使用してさまざまな統計分析を実行できます。

### 外れ値検出

外れ値検出を使用すると、データセットの大部分とは異なり、異常な点（アノマリー）を簡単に検出できます。これらの外れ値を表示または非表示にできるため、常に表示させたり、分析を妨げないようにしたりできます。

![Outliers Detection in Reveal](/images/2020/11/4274.OUtliers.PNG-1040x1626-1.png)

### 時系列予測

時系列予測を使用すると、Revealは履歴データとトレンドに基づいて将来の値の予測を行います。これは、売上および収益予測、在庫管理など、数多くのアプリケーションで役立ちます。

![Time Series Forecasting in dashboard ](/images/2020/10/5340.Time-Series-Forecast.png)

### 線形回帰

線形回帰を使用すると、2つの変数間の関係を見つけることで、データ内のトレンドを視覚的に確認し、将来のトレンドを含むデータに対する線形近似を確認できます。線形回帰に加え、Revealには以下のアルゴリズムのトレンドラインが含まれています：Linear Fit、Quadratic Fit、Cubic Fit、Quartic Fit、Logarithmic Fit、Exponential Fit、Power Law Fit、Simple Average、Exponential Average、Modified Average、Cumulative Average、およびWeighted Average。

![Linear regeression ](/images/2020/10/7416.Linear-Regression.png)

## 機械学習

これで、Revealに機械学習のパワーをもたらすことができます！Microsoft Azure Machine Learning Models Integrationを使用すると、Azure Machine Learning Studioからデータに適用されたトレーニング済みモデルを使用して、美しいビジュアライゼーションを構築できます。データソースをAzureモデルのURLに向けるだけで、Revealは機械学習のシナリオに基づいてビジュアライゼーションをレンダリングします。また、Google BigQuery Platformsからデータに適用されたトレーニング済みモデルを使用して、印象的なビジュアライゼーションを構築することも可能です。

![ Machine learning models in Reveal BI](/images/2020/10/ML-Models.png)

## RおよびPythonスクリプティング

現在、RおよびPythonスクリプティングをサポートしています。これは、データセットに対してRevealが実行できる限界を超える統計分析やデータ分析を行う、内なる市民データサイエンティストのための入り口となります。例えば、ビジュアライゼーションの出力を改善するためにデータを前処理/後処理したり、RまたはPythonライブラリに含まれる独自のビジュアライゼーションをレンダリングしたりできます。スクリプトのURLを貼り付けるか、コードをスクリプトエディターに貼り付けるだけです。

![R & Python Scripting](/images/2020/10/R-_2600_-Python.png)

## 新しいデータソースコネクタ！

皆様からのご要望にお応えし、Revealに3つの重要な新しいデータコネクタを追加しました：

- Azure SQL
- Azure Synapse
- Google Big Query

これらの強力な新しいコネクタを使用すると、数百万件のレコードをRevealに取り込み、スピードを犠牲にすることなくビジュアライゼーションを作成できます！Azure Synapseで1億件のレコードをテストしましたが…瞬時にロードされました！

マーケティング、営業、ITのニーズに対応するため、以下の新しいコネクタを追加しました：

- Google Analytics
- Microsoft SQL Server Reporting Services (SSRS)
- Salesforce

市場で最も使用されているウェブ分析サービスの一つであるGoogle Analyticsを使用すると、ウェブサイトのトラフィック、アプリケーションの使用状況などから洞察を提供するダッシュボードを構築できます！Reporting Servicesを使用すると、PDFビジュアライゼーションをRevealビジュアライゼーションとしてレンダリングしたり、レポート内のフィールドを使用して、Reporting Servicesが提供しない新しいビジュアライゼーションを作成したりできます。これはレガシーな用途に最適です。SSRSのURLをRevealに向けるだけで、データに新しくインタラクティブな命を吹き込むことができます。

![Connecting Google Analytics with Reveal BI](/images/2020/10/Google-Analytics.png)

![Connecting Microsoft SQL Server Reporting Services with Reveal BI](/images/2020/10/SSRS.png)

## 新しいビジュアライゼーションレベルのインタラクション

今回のリリースで、データ分析とビジュアライゼーションがさらに向上しました。最も重要なデータに焦点を当てるため、Revealには以下が含まれるようになりました：

- より洗練されたスタイルと優れた可読性を持つホバーツールチップ
- ビジュアライゼーションのポイントにおける精度向上のためのチャート用クロスヘアサポート！
- データポイントのホバー位置に基づいてX軸およびY軸に精度インジケーターを提供する値オーバーレイ

![ Data visualization improvements in Reveal app](/images/2020/10/ToolTips.png)

![Linear regeression ](/images/2020/10/7416.Linear-Regression.png)

## 高度なエクスポートオプション

PDFエクスポートの追加に加え、PowerPointおよびPDFにエクスポートする際のエクスポート機能を完全にカスタマイズする機能が利用可能になりました。今回のリリースでは、以下のことが可能です：

- エクスポートに含めたいビジュアライゼーションを選択する
- スライドとページにタイトルを追加する
- ビジュアライゼーションに注釈を追加する
- 会社のロゴ、名前、色に合わせたカスタムブランディングを追加する

![Reveal BI export to Power Point option](/images/2020/10/Export-to-PowerPoint.png)

## **アプリのルック＆フィールに合わせた新しいテーマ**

最新のRevealバージョンには、ライトモードとダークモードの両方で機能する2つの新しいテーマが含まれています。Revealをアプリケーションに組み込む際、これらのテーマをカスタマイズしてアプリのルック＆フィールに合わせ、色、フォント、形状などについて完全な制御を行えます！

データの力を活用する

リアルタイムのコンテキストデータでビジネスを成長させましょう。

[Request a Demo](/request-demo)
