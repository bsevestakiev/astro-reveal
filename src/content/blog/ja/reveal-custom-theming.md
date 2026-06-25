---
title: ダッシュボードはあなた次第 — あなたのルック！Revealの新しいカスタムテーマリングをご紹介
description: >-
  Reveal組み込みBIソフトウェアにカスタムテーマを適用する方法と、アプリのルック＆フィールに合わせた独自のダッシュボードおよびビジュアライゼーションスタイルを作成する方法をご覧ください。
date: '2020-04-24'
author: Casey Ciniello
cover: >-
  /images/2020/10/3583.business_2D00_intelligence_2D00_reveal_2D00_dashboards_2D00_custom_2D00_theming.jpg
summary: >-
  Revealは、組み込み分析を備えた、すぐに統合できるデータビジュアライゼーションを提供することに重点を置いています。重要な点の一つは、アプリケーションに組み込む要素がルック＆フィールに一致していることを確認することです。当社のアプリケーションユーザー向けに、Revealは現在、ライトと[&hellip;]の両方で美しく見える、2つのテーマ（MountainとOcean）を標準で提供しています。
categories:
  - 製品アップデート
seo:
  title: 組み込み分析ダッシュボード — あなたのルック！Reveal組み込み分析
  description: >-
    Reveal組み込みBIソフトウェアにカスタムテーマを適用する方法と、アプリのルック＆フィールに合わせた独自のダッシュボードおよびビジュアライゼーションスタイルを作成する方法をご覧ください。
  ogTitle: 組み込み分析ダッシュボード — あなたのルック！Reveal組み込み分析
  ogDescription: >-
    Reveal組み込みBIソフトウェアにカスタムテーマを適用する方法と、アプリのルック＆フィールに合わせた独自のダッシュボードおよびビジュアライゼーションスタイルを作成する方法をご覧ください。
  ogType: article
  twitterTitle: 組み込み分析ダッシュボード — あなたのルック！Reveal組み込み分析
  twitterDescription: >-
    Reveal組み込みBIソフトウェアにカスタムテーマを適用する方法と、アプリのルック＆フィールに合わせた独自のダッシュボードおよびビジュアライゼーションスタイルを作成する方法をご覧ください。
  ogImage: >-
    /images/2020/10/3583.business_2D00_intelligence_2D00_reveal_2D00_dashboards_2D00_custom_2D00_theming.jpg
source_hash: '4e429180'
source_locale: en
---
アプリケーションユーザー向けに、Revealには現在、ライトテーマとダークテーマの両方で美しい2つのテーマ（MountainとOcean）が標準で提供されています。アプリケーションのテーマに合わせた可視化を組み込みたいですか？問題ありません！Reveal SDKを使用すると、独自のカスタムテーマを作成し、ダッシュボードのあらゆる側面を制御できます。

## Revealの新しいダッシュボードテーマ

MountainとOceanの新しいテーマで最高のユーザーエクスペリエンスを提供するため、私たちは美しく、ライトモードとダークモードの両方で機能し、モダンなルック＆フィールを持つカラーパレットを開発しました。 ![Reveal dashboard](/images/2020/10/reveal_2D00_embedded_2D00_visualizations_2D00_dashboard_2D00_color_2D00_theming.jpg)
*Revealのオーシャンテーマ*

## カラーパレット

Revealアプリケーション内の各テーマには、パレットに10色の異なる色が含まれています。可視化を編集または作成する際、パレットから選択することで開始色を簡単に変更できます。

![ Reveal app color palette example](/images/2020/10/2047.reveal_2D00_embedded_2D00_visualizations_2D00_color_2D00_theming_2D00_color_2D00_palette.jpg)

## 組み込み分析を行う際のカスタムテーマ設定

既存のアプリケーションに分析を組み込む場合、そのダッシュボードがアプリのルック＆フィールと一致することが重要です。そのため、SDKを通じてRevealダッシュボードの完全な制御を提供します。アプリケーションと比較して、カスタムテーマで実現できる主なカスタマイズは以下の通りです。

- **カラーパレット**: 可視化のシリーズを表示するために使用される色。無制限の色を追加できます。可視化ですべての色が使用されると、Revealがこれらの色の新しいシェードを自動生成します。これにより、色が繰り返されることがなく、各値が独自の色を持つようになります。
- **アクセントカラー**: Revealのデフォルトのアクセントカラーは、+ ダッシュボードボタンやその他のインタラクティブなアクションで見つけることができるブルーのシェードです。この色を、アプリケーションで使用しているのと同じアクセントカラーに合わせるように変更できます。
- **条件付き書式の色**: 条件付き書式を使用する際に設定できる境界のデフォルトの色を変更します。
- **フォント**: Revealはアプリケーションで3種類のテキスト（レギュラー、ミディアム、ボールド）を使用します。これらのテキストグループそれぞれに使用するフォントを指定できます。
- **可視化およびダッシュボードの背景色**: ダッシュボードの背景色と可視化の背景色を個別に設定できます。

## カスタムテーマの作成方法

Revealで独自のテーマを作成するのは、新しい**RevealTheme()/$.ig.RevealTheme()**クラスのインスタンスを作成するのと同じくらい簡単です。このクラスには、上記でリストしたすべてのカスタマイズ可能な設定が含まれています。

新しい**RevealTheme/$.ig.RevealTheme**インスタンスを作成すると、各設定のデフォルト値が取得されます。次に、変更する必要がある設定を修正できます。最後に、テーマインスタンスを**UpdateRevealTheme(theme)/ updateRevealTheme(theme)**メソッドに渡します。ダッシュボードや別のRevealコンポーネントがすでに画面に表示されている場合は、適用された変更を確認するために再レンダリングする必要があります。

すでに独自のテーマを適用しているが、他の変更を失うことなく、いくつかの設定を変更したい場合があります。

この場合、**GetCurrentTheme()/getCurrentTheme()**メソッドを呼び出すことができます。このメソッドを使用すると、RevealTheme設定に対して設定した最新の値を取得できます。RevealThemeの新しいインスタンスをゼロから作成する場合とは異なり、変更を適用し、テーマを再度更新した後、デフォルト値ではなく、変更しなかった各設定の現在の値が取得されます。

**GetCurrentTheme()/getCurrentTheme()**と**UpdateRevealTheme(theme)/ updateRevealTheme(theme)**の両方のメソッドは、**RevealView / $.ig.RevealView**クラスを通じてアクセスできます。

## コード例

以下のコードスニペットでは、現在のテーマを取得し、必要な変更を適用し、Revealでテーマを更新する方法を説明します。まず、変更を加える前のスクリーンショットの例を見てみましょう：

![Reveal Marketing Dashboard](/images/2020/10/reveal_2D00_embedded_2D00_dashboard_2D00_original.jpg)

次に、このコードスニペットを使用してカスタムテーマを定義します：

```
var regularFont = new FontFamily(new Uri("pack://application:,,,/ [Your ProjectName];component/[pathToFonts]/"), "./#Verdana Italic"); 
var boldFont = new FontFamily(new Uri("pack://application:,,,/ [Your ProjectName];component/[pathToFonts]/"), "./#Verdana Bold"); 
var mediumFont = new FontFamily(new Uri("pack://application:,,,/ [Your ProjectName];component/[pathToFonts]/"), "./#Verdana Bold Italic"); 

var customTheme = RevealView.GetCurrentTheme(); 
customTheme.ChartColors.Clear(); 
customTheme.ChartColors.Add(Color.FromRgb(192, 80, 77)); 
customTheme.ChartColors.Add(Color.FromRgb(101, 197, 235)); 
customTheme.ChartColors.Add(Color.FromRgb(232, 77, 137); 

customTheme.BoldFont = new FontFamily("Gabriola"); 
customTheme.MediumFont = new FontFamily("Comic Sans MS"); 
customTheme.FontColor = Color.FromRgb(31, 59, 84); 
customTheme.AccentColor = Color.FromRgb(192, 80, 77); 
customTheme.DashboardBackgroundColor = Color.FromRgb(232, 235, 252); 

RevealView.UpdateRevealTheme(customTheme);
```

**注:** 新しい色のセットを追加するには、まず***chart colors list***のデフォルト値をクリアする必要があります。

以下のコードスニペットは、revealThemeクラスの新しいインスタンスを作成し、設定に変更を適用し、Reveal Webでテーマを更新する方法を示しています。\*\* ***Code Sample – Reveal Web***

```
var revealTheme = new $.ig.RevealTheme(); 
revealTheme.chartColors = ["rgb(192, 80, 77)", "rgb(101, 197, 235)", "rgb(232, 77, 137)"]; 

revealTheme.mediumFont = "Gabriola"; 
revealTheme.boldFont = "Comic Sans MS"; 
revealTheme.fontColor = "rgb(31, 59, 84)"; 
revealTheme.accentColor = "rgb(192, 80, 77)"; 
revealTheme.dashboardBackgroundColor = "rgb(232, 235, 252)"; 

$.ig.RevealView.updateRevealTheme(revealTheme);
```

**注:** **フォントオプションの使用**
revealテーマのboldFont、regularFont、またはmediumFontの設定を定義する場合、正確なフォントファミリー名を渡す必要があります。ウェイトはフォント自体の定義によって決定され、名前によるものではありません。**$.ig.RevealTheme**のフォント設定で指定されたフォントファミリー名が利用可能であることを確認するために、@font-face（CSSプロパティ）を使用する必要がある場合があります。

これで、テーマの変更を実装した後、ダッシュボードエディターと可視化エディターの両方での新しい結果がこちらです。

![Dashboard in Reveal BI](/images/2020/10/6378.reveal_2D00_embedded_2D00_visualizations_2D00_color_2D00_theming_2D00_background_2D00_color_2D00_2.jpg)
*上記のコードスニペットからの変更を適用した後のダッシュボードエディター*。

![Reveal dashboard](/images/2020/10/reveal_2D00_embedded_2D00_visualizations_2D00_dashboard_2D00_editor_2D00_2.jpg)
*上記のコードスニペットからの変更を適用した後の可視化エディター*。

## テーマプロパティを変更するためのコードスニペット

テーマの変更に関するドキュメントは、こちらにあります：

[https://help.revealbi.io)

$.ig.RevealThemeで設定できるプロパティは以下の通りです：

- chartColors
- regularFont
- mediumFont
- boldFont
- fontColor
- dashboardBackgroundColor
- visualizationBackgroundColor
- accentColor
- useRoundedCorners
- conditionalFormatting.lowColor
- conditionalFormatting.midColor
- conditionalFormatting.hiColor
- conditionalFormatting.noneColor

Web SDKでテーマを変更するスニペットは以下の通りです：

var revealTheme = new $.ig.RevealTheme();

// Setting Standard Color / Font
revealTheme.accentColor = “rgb(15,96,69)”;
revealTheme.regularFont = “Righteous”;
revealTheme.mediumFont = “Caveat”;
revealTheme.boldFont = “Domine”;
revealTheme.fontColor = “rgb(226,24,125)”;
revealTheme.dashboardBackgroundColor = “rgb(24,224,37)”;
revealTheme.visualizationBackgroundColor = “rgb(221,224,37)”;

// Setting Conditioanl Formatting
revealTheme.conditionalFormatting.hiColor = “rgb(87,0,127)”;
revealTheme.conditionalFormatting.lowColor = “rgb(158,0,232)”;
revealTheme.conditionalFormatting.midColor = “rgb(198,137,229)”;
revealTheme.conditionalFormatting.noneColor = “rgb(255,255,127)”;

// Setting Chart Colors
revealTheme.chartColors = \[“rgb(248,53,255)”, “rgb(248,53,75)”, “rgb(54,247,160)”, “rgb(130,53,244)”, “rgb(235,242,138),rgb(239,139,219),rgb(38,116,68),rgb(108,147,178)”];

// Setting Square or Rounded look
revealTheme.useRoundedCorners = false;

// Update the Dashboard
$.ig.RevealView\.updateRevealTheme(revealTheme);

テーマプロパティを設定したら、**RevealView**の**updateReveal**メソッドを呼び出します。

$.ig.RevealView\.updateRevealTheme(revealTheme);

フォントのカスタマイズには、これらの行をページのCSSに追加する必要があります：

このプロパティ設定を使用することで、必要なブランドの顧客体験に合わせる[Reveal組み込み分析](/embedded-analytics)をカスタマイズできるはずです！

追加のスタイリングポイントが必要な場合は、[お知らせください](mailto:cmcguigan@infragistics.com)！

データの力を活用して

リアルタイムのコンテキストデータでビジネスを成長させましょう。

[Request a Demo](/request-demo)
