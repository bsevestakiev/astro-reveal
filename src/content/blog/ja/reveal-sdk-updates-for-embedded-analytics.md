---
title: 組み込み分析のためのReveal SDKアップデート
description: >-
  新しい機能には、ビジュアライゼーションでツールチップを使用する方法の柔軟性の追加と、アプリケーションのルック＆フィールによりよく合わせるためのテーマアップデートが含まれます。
date: '2020-05-11'
author: Casey Ciniello
cover: >-
  /images/2020/10/business_2D00_intelligence_2D00_reveal_2D00_dashboards_2D00_tooltips.jpg
summary: "より多くのカスタマイズを提供するために、Reveal組み込み分析SDKにいくつかの新しいアップデートを発表できることを嬉しく思います。ツールチップの表示\_ビジュアライゼーションでツールチップを表示する方法により柔軟性を持たせる新しいイベントを追加しました。このイベントは、WPFではrevealView.TooltipShowing、WebではonTooltipShowingと呼ばれ、エンドユーザーが[&hellip;]のたびにトリガーされます。"
categories:
  - 製品アップデート
seo:
  title: 組み込み分析のためのReveal SDKアップデート Reveal組み込み分析
  description: >-
    新しい機能には、ビジュアライゼーションでツールチップを使用する方法の柔軟性の追加と、アプリケーションのルック＆フィールによりよく合わせるためのテーマアップデートが含まれます。
  ogTitle: 組み込み分析のためのReveal SDKアップデート Reveal組み込み分析
  ogDescription: >-
    新しい機能には、ビジュアライゼーションでツールチップを使用する方法の柔軟性の追加と、アプリケーションのルック＆フィールによりよく合わせるためのテーマアップデートが含まれます。
  ogType: article
  twitterTitle: 組み込み分析のためのReveal SDKアップデート Reveal組み込み分析
  twitterDescription: >-
    新しい機能には、ビジュアライゼーションでツールチップを使用する方法の柔軟性の追加と、アプリケーションのルック＆フィールによりよく合わせるためのテーマアップデートが含まれます。
  ogImage: >-
    /images/2020/10/business_2D00_intelligence_2D00_reveal_2D00_dashboards_2D00_tooltips.jpg
source_hash: fa18fab8
source_locale: en
---
より多くのカスタマイズを提供するため、[Reveal embedded analytics](/embedded-analytics) [SDK](/blog/reveal-sdk-updates-for-embedded-analytics) にいくつかの新しいアップデートを発表できることを嬉しく思います。

## ツールチップの表示

可視化におけるツールチップの表示方法に、より柔軟性を持たせる新しいイベントを追加しました。このイベントは、WPFでは *revealView\.TooltipShowing*、Webでは .*onTooltipShowing* という名前で呼ばれ、エンドユーザーが可視化内のシリーズにカーソルを合わせるか、シリーズをクリックするたびにトリガーされます（以下に示します）。

**![Reveal tooltip](/images/2020/10/reveal_2D00_tooltip.jpg)**

ツールチップイベントをキャンセルするか、表示される内容を変更するかを選択できます。いくつかの例を以下に示します。

1. ツールチップを完全に無効にするか、特定の可視化でのみ表示するようにしたい場合。
2. 視聴者にとってより価値があるかもしれない、RevealViewコンポーネント外のデータをツールチップに表示したい場合。

このイベントは、グリッド、ゲージなど、ツールチップをサポートしていない可視化ではトリガーされません。

## WPFおよびWebのコードスニペット

以下のコードスニペットでは、可視化のツールチップを無効にしつつ、エンドユーザーがこの可視化にカーソルを合わせたりクリックしたりしたときに、イベント引数から追加の情報を取得する方法を示します。イベント引数には、カーソルが合わせられた、またはクリックされた可視化に関する情報、カーソルが合わせられた、またはクリックされたデータの正確なセル、このセルの行全体（他の列からの情報が必要な場合）、そしてもちろん、Cancelブール値が含まれます。

**WP&#x46;****Code****&#x53;nippet:**

```
>private void RevealView_TooltipShowing(object sender, TooltipShowingEventArgs e) { if (e.Visualization.Title == "NoNeedForTooltips") { e.Cancel = true; } Debug.WriteLine($"TooltipShowing: Visualization: {e.Visualization.Title}, Cell: {e.Cell}, Row: {e.Row}"); }
```

**Web Code Snippet:**

```
revealView.onTooltipShowing = function (args) { if (args.visualization.title == "NoNeedForTooltips") { args.Cancel = true; } console.log("onTooltipShowing: visualization: " + args.visualization.title() + ",cell: " + args.cell.value + ", row:" + args.row.length); };
```

## RevealThemeのアップデート

Reveal内の可視化やボタンの角を、既存のアプリケーションのルック＆フィールに合わせるためのサポートを追加しました。これを行うため、RevealThemeクラスにUseRoundedCornersというブールプロパティを追加しました。これがtrueに設定されている場合（デフォルト値）、可視化コンテナの角がわずかに丸くなります。よりシャープなエッジが必要な場合は、このプロパティをfalseに設定して無効にしてください。

![Reveal dashboard - Theme Update](/images/2020/10/reveal_2D00_dashboard.jpg)

データの力を活用する

リアルタイムのコンテキストデータでビジネスを成長させましょう。

[Request a Demo](/request-demo)
