---
title: Revealのデータ範囲を拡大するためのインメモリデータソースの利用
description: 組み込み分析を使用して、アプリからアクセスできるデータ数とデータ型を増やすために、Revealのインメモリデータベース機能を利用します。
date: '2019-10-03'
author: Casey Ciniello
cover: /images/2020/10/business_2D00_intelligence_2D00_reveal_2D00_datasources.jpg
summary: >-
  Revealが標準でサポートしていないデータソースに直接接続したい場合があるかもしれません。例えば、独自のカスタムデータベースを持っているかもしれません。このニーズに対応するため、データソースとしてインメモリをサポートしています。また、[&hellip;]が必要な場合にもこのオプションを利用したいかもしれません。
categories:
  - 組み込み分析
seo:
  title: 組み込み分析のデータソースを拡張する（インメモリデータベース）
  description: 組み込み分析を使用して、アプリからアクセスできるデータ数とデータ型を増やすために、Revealのインメモリデータベース機能を利用します。
  ogTitle: 組み込み分析のデータソースを拡張する（インメモリデータベース）
  ogDescription: 組み込み分析を使用して、アプリからアクセスできるデータ数とデータ型を増やすために、Revealのインメモリデータベース機能を利用します。
  ogType: article
  twitterTitle: 組み込み分析のデータソースを拡張する（インメモリデータベース）
  twitterDescription: 組み込み分析を使用して、アプリからアクセスできるデータ数とデータ型を増やすために、Revealのインメモリデータベース機能を利用します。
  ogImage: /images/2020/10/business_2D00_intelligence_2D00_reveal_2D00_datasources.jpg
source_hash: 1700c106
source_locale: en
---
Revealが標準でサポートしていないデータソースに直接接続したい場合があるかもしれません。例えば、独自のカスタムデータベースを持っているかもしれません。このニーズに対応するため、データソースとしてインメモリをサポートしています。また、ユーザーが要求したレポートの結果など、すでにメモリ内にあるデータをアプリケーションの状態の一部として使用する必要がある場合にも、このオプションを使用したいかもしれません。

インメモリデータソースは、ディスクドライブ上よりもメモリ内でのデータアクセスがはるかに高速であるため、取得速度などの他の利点も提供します。

このブログでは、この機能の使用方法を順を追って説明します。

## データスキーマの定義

インメモリデータに一致するスキーマを持つデータファイルを定義することをお勧めします。データファイルは、例えばCSVファイルやExcelファイルである可能性があり、スキーマとは基本的にフィールドのリストと、各フィールドのデータ型です。以下の例では、指定されたスキーマを持つデータファイルの作成方法、そしてデータベースから情報を取得する代わりにメモリ内のデータを使用する方法の詳細が記載されています。

次の例では、社内の従業員リストのインメモリデータを使用して、HRシステムにHRメトリクスを表示するダッシュボードを組み込みます。そして、データベースから従業員リストを取得する代わりに、メモリ内のデータを使用します。

## データファイルとサンプルダッシュボードの準備

以下の手順は、いくつかのプロパティしか持たない簡素化されたEmployeeに基づいています。

- EmployeeID: string
- Fullname: string
- Wage: numeric

まず、同じスキーマを持つCSVファイルを作成します：

![ Example of preparing a Data File and Sample Dashboard in Reveal BI](/images/2020/10/reveal_2D00_code_2D00_1.jpg)

1. ファイルをDropboxやGoogle Driveなどの任意のファイル共有システムにアップロードします。
2. ダミーデータを使用してダッシュボードを作成します。注意点として、実際の本番データは後でアプリケーションに提供することになります。
3. ダッシュボードをエクスポートします（ダッシュボードメニュー → エクスポート → ダッシュボード）し、.rdashファイルとして保存します。

## ダッシュボードの可視化と実際のデータの返却

次に、ダミーデータではなく、独自のデータを使用してダッシュボードを可視化する必要があります。

[Replacing Data Sources](https://help.revealbi.io)で説明されているように、[IRVDataSourceProvider](https://help.revealbi.io)を実装し、それを[IRevealSdkContext](https://help.revealbi.io)の[DataSourceProvider](https://help.revealbi.io)プロパティとして返します。

次に、メソッド **ChangeVisualizationDataSourceItemAsync** の実装では、以下のようなコードを追加する必要があります：

![ Change Visualization Data Source Item Async example code](/images/2020/10/reveal_2D00_code_2D00_2.jpg)

これにより、ダッシュボード内のCSVファイルへのすべての参照を、識別子「employees」によって識別されるインメモリデータソースに置き換えることができます。この識別子は、データが返される際に使用されます。

実際のデータを返すメソッドを実装するには、以下に示すように[IRVDataProvider](https://help.revealbi.io)を実装する必要があります：

![IRV Data Provider example code](/images/2020/10/reveal_2D00_code_2D00_3.jpg)

Employeeクラスのプロパティは、CSVファイルの列名と完全に同じ名前であり、データ型も同じであることに注意してください。プロパティのフィールド名、フィールドラベル、および/またはデータ型を変更したい場合は、クラス宣言で属性を使用できます：

- RVSchemaColumn属性を使用して、フィールド名および/またはデータ型を変更できます。
- DisplayName属性を使用して、フィールドラベルを変更できます

![ RV Schema Column attribute can be used to alter the field name and/or data type](/images/2020/10/reveal_2D00_code_2D00_4.jpg)

さらに、[IRVDataProvider](https://help.revealbi.io)を実装するには、[IRevealSdkContext.DataProvider](https://help.revealbi.io)の実装を修正し、それを返す必要があります：

![ IRV Data Provider implementation](/images/2020/10/reveal_2D00_code_2D00_5.jpg)

Revealについてさらに詳しく知りたい場合、またはまだ試していない場合は、デモをリクエストしてください。

データの力を活用する

リアルタイムのコンテキストデータでビジネスを成長させましょう。

[Request a Demo](/request-demo)
