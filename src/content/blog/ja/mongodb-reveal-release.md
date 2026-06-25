---
title: Reveal 1.6.1でのMongoDBサポートとその他の機能
description: >-
  Reveal
  1.6.1がリリースされました。すべてはユーザーの皆様のために！最新リリースでは、強化されたユーザーエクスペリエンス、よりスムーズなエクスポート、そしてさらに多くの機能を発見してください。
date: '2023-10-31'
author: Casey Ciniello
cover: /images/2023/10/reveal-new-release-1-7-0-thumbnail.jpg
heroImage: /images/2023/10/reveal-new-release-1-7-0-header.svg
summary: 最新のRevealリリース1.6.1が、皆様からのフィードバックに基づいた改善を多数盛り込んで登場しました。
categories:
  - 製品アップデート
seo:
  title: 2023年10月リリースでのMongoDBサポートとその他の機能
  description: >-
    Reveal
    1.6.1がリリースされました。すべてはユーザーの皆様のために！最新リリースでは、強化されたユーザーエクスペリエンス、よりスムーズなエクスポート、そしてさらに多くの機能を発見してください。
  ogTitle: 2023年10月リリースでのMongoDBサポートとその他の機能
  ogDescription: >-
    Reveal
    1.6.1がリリースされました。すべてはユーザーの皆様のために！最新リリースでは、強化されたユーザーエクスペリエンス、よりスムーズなエクスポート、そしてさらに多くの機能を発見してください。
  ogType: article
  twitterTitle: 2023年10月リリースでのMongoDBサポートとその他の機能
  twitterDescription: >-
    Reveal
    1.6.1がリリースされました。すべてはユーザーの皆様のために！最新リリースでは、強化されたユーザーエクスペリエンス、よりスムーズなエクスポート、そしてさらに多くの機能を発見してください。
  ogImage: /images/2023/10/reveal-new-release-1-7-0-thumbnail.jpg
source_hash: e3ec0506
source_locale: en
---
この度、[組み込み分析](/embedded-analytics) SDKのバージョン1.6.1がリリースされたことをお知らせいたします。これまでと同様に、私たちは皆様の体験向上に尽力し、Revealを使用してアプリケーションに分析をシームレスに組み込むことを可能にします。本リリースで新しく追加された機能や更新された点について、詳しく見ていきましょう。

![MongoDB Support and More in Reveal 1.6.1. Release](/images/2023/11/reveal-launch-1-7-0-dashboard-mongodb.png)

## 新機能

ツールボックスがさらに充実しました：

**ASP.NET & Node:**

- **新しいデータソース:** MongoDB

**すべてのプラットフォーム:**

- ヘッドレスエクスポートにより、ユーザーインターフェースなしで個別のビジュアライゼーションをエクスポートできるようになりました。
- セキュリティを重視される方のために、外部ダッシュボードリンクに `noopener` 属性を追加しました。
- RevealThemeの新しいVisualizationMarginプロパティを使用することで、ビジュアライゼーション間のマージンを調整し、ビジュアライゼーションの美観をより細かく制御できます。
- シングルビジュアライゼーションモードを使用される方のために、いくつかの改善を行いました。
- `showBreadcrumb` および `showBreadcrumbDashboardTitle` でダッシュボードのタイトルとパンくずリストを制御できます。
- RVVisualizationに新しい `showTitle` プロパティが追加されました。
- RevealViewのいくつかの新しいプロパティが、シングルビジュアライゼーションモードでは自動的に `false` に設定されます。
- SQLプロセスを合理化するのに役立つよう、SQLベースのストアドプロシージャは、クエリをログに出力し、データ型の不一致がある場合にアラートを出すようになりました。

## 破壊的変更点

ご留意いただきたい重要な変更点がいくつかあります：

**すべてのプラットフォーム:**

- シングルビジュアライゼーションモードを有効にすると、RevealViewのいくつかのプロパティが自動的に `false` に設定されるようになりました。これには、`showChangeVisualization`、`canEdit`、`showMenu`、`showStatisticalFunctions`、および `showFilters` が含まれます。
- `window.revealDisableKeyboardManagement` プロパティは、デフォルトで `true` になります。これは、明示的に設定しない限り、タブフォーカスがRevealViewで停止しなくなることを意味します。
- 当社のスライスチャート（円グラフ、ファネル、ドーナツを含む）はデザインが刷新され、新しいルック＆フィールになりました。注意：`RevealSdkSettings.enableNewCharts=false` を使用して、いつでもデフォルトに戻すことができます。

## 最後に…

私たちはSDKの洗練と強化に継続的に取り組んでおり、今回のリリースも例外ではありません。つまり、[完全なリリースノートはこちら](https://help.revealbi.io/web/release-notes) に記載されているように、多くのバグも修正しました。これらのアップデートが、皆様の開発ワークフローの合理化と、アプリケーションの分析機能の強化に役立つことを願っています。

開発者コミュニティの一員となっていただきありがとうございます。皆様からのフィードバックは非常に重要ですので、お考え、提案、またはご質問がございましたら、お気軽にご共有ください。製品サポートが必要な場合や、単にRevealに関するフィードバックを共有したい場合は、[Discord経由で製品チームにご連絡](https://discord.com/invite/Ped3sSK5Xw)いただくか、アイデア、質問、問題などがありましたら、[CaseyM@revealbi.io](mailto:CaseyM@revealbi.io)まで直接メールでご連絡ください。

Revealをお選びいただきありがとうございます。皆様のデータで新たな可能性を解き放つお手伝いができることを楽しみにしております。

Revealを無料で試す

SDKをダウンロードして、今日から始めましょう。

[DOWNLOAD](/download-sdk)
