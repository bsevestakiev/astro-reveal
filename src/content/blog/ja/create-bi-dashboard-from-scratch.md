---
title: Revealを使用して最初のビジネスインテリジェンスダッシュボードを作成する方法
description: >-
  独自のKPIダッシュボードの構築に興味がありますか？Reveal
  BIソフトウェアのこのステップバイステップのウォークスルーで、ビジネス指標を視覚化する方法を学びましょう。
date: '2019-07-10'
author: Casey Ciniello
cover: >-
  /images/2020/10/business_2D00_teams_2D00_reveal_2D00_create_2D00_dashboards_2D00_easily.jpg
summary: >-
  ダッシュボードの作成に慣れていない場合、異なるシステムにあるすべてのデータに接続し、すべてのデータをビジネスの完全な360度ビューにまとめるダッシュボードを構築する方法を理解するのは、少し圧倒されるかもしれません。Revealは、[...
  ]を可能にするセルフサービス型のビジネスインテリジェンスソフトウェアです。
categories:
  - 組み込み分析
seo:
  title: Revealで最初のBIダッシュボードを作成する方法
  description: >-
    独自のKPIダッシュボードの構築に興味がありますか？Reveal
    BIソフトウェアのこのステップバイステップのウォークスルーで、ビジネス指標を視覚化する方法を学びましょう。
  ogTitle: Revealで最初のBIダッシュボードを作成する方法
  ogDescription: >-
    独自のKPIダッシュボードの構築に興味がありますか？Reveal
    BIソフトウェアのこのステップバイステップのウォークスルーで、ビジネス指標を視覚化する方法を学びましょう。
  ogType: article
  twitterTitle: Revealで最初のBIダッシュボードを作成する方法
  twitterDescription: >-
    独自のKPIダッシュボードの構築に興味がありますか？Reveal
    BIソフトウェアのこのステップバイステップのウォークスルーで、ビジネス指標を視覚化する方法を学びましょう。
  ogImage: >-
    /images/2020/10/business_2D00_teams_2D00_reveal_2D00_create_2D00_dashboards_2D00_easily.jpg
source_hash: 753c5623
source_locale: en
---
ダッシュボードの作成に慣れていない場合、異なるシステムに存在するすべてのデータに接続し、すべてのデータを集約したビジネスの完全な360度ビューを持つダッシュボードを構築する方法を理解しようとすると、少し圧倒されるかもしれません。

Revealは、マーケティングのパフォーマンス、運用トレンドの監視、KPIの可視化、顧客ポートフォリオの最適化など、重要なビジネス指標を単一の集中管理された場所で視覚化できる、セルフサービス型の[ビジネスインテリジェンス](/blog/business-intelligence-tools-enable-data-driven-decision-making)ソフトウェアです。これをいかに迅速に達成できるかをお見せするために、このブログでは、アプリケーション内に提供されるサンプルデータExcelファイルを使用して、以下の手順を順を追って説明します。

1. Excelファイルへの接続
2. 可視化の作成
3. ダッシュボードのテーマの変更
4. ダッシュボードの保存

完了すると、ダッシュボードは次のようになります。

![How to create a dashboard in Reveal ](/images/2020/10/6685.Finished-Dashboard.png)

## データインサイトへのステップ

Revealに初めてアクセスすると、探索するためのさまざまなサンプルが提示されます。独自のダッシュボードを作成するには、左側のパネルにある「ダッシュボード」セクションに移動します。右上隅にある「新規」ボタンをクリックし、「ダッシュボード」を選択します。

![ Steps to Data Insights - click the new button in the top right-hand corner and select dashboard](/images/2020/10/4544.1.png)

最初の可視化を追加するには、右上隅の「*プラス*」をクリックします。ここで、データに接続するための最初のデータソースを選択できます。

![Steps to Data Insights - click the plus in the upper right corner.](/images/2020/10/7268.Data-Source-Picker.png)

OneDrive内で、ダッシュボードに取り込みたいファイルに移動します。Excelファイルを選択すると、Revealはそのファイル内のさまざまなシート（Marketing、Salesなど）をその名前とともに取り込みます。さらに、データがダッシュボードに同期される頻度を選択することもできます。ここでは、1時間ごとに選択したことがわかります。

![ Excel file set up in Reveal](/images/2020/10/7268.Excel-FIle-Set-Up.png)

シートを選択すると、ウィジェットエディターに移動します。左側には、そのExcelシート内のすべての列と、それらがどのような種類のフィールドであるかを示すインジケーター（Date、Value、Category）が表示されます。上部のバーには、可視化の種類を選択できる場所があります。

フィールドを列フィールドにドラッグし始めると、右側でデータがポップアップし始めるのがわかります。または、作成したい可視化がわかっている場合は、それを最初に選択することもできます！Revealは、そのビジュアルを作成するために正確に何が必要かを示すために、入力フィールドを変更します。

時間の経過に伴う新規売上を示すには、次の手順に従います。

1. 可視化リストから「折れ線グラフ」を選択する
