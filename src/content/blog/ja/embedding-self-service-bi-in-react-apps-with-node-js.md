---
title: ReactアプリにNode.jsで組み込みセルフサービスBIを実装する方法
description: Reactアプリケーションに分析を組み込むことで、ユーザーのワークフロー内に関連性が高くタイムリーなインサイトを直接提供できます。
date: '2023-05-16'
author: Bilyana Petrova
cover: /images/2023/05/embedding-analytics-in-react-apps-with-nodejs.png
heroImage: /images/2023/05/reveal-embed-BI-in-nodejs-react-internal-header.svg
summary: >-
  Reactアプリケーションに分析を組み込むことで、ユーザーのワークフロー内に関連性が高くタイムリーなインサイトを直接提供し、データドリブンな文化を促進し、より分析的な思考を奨励します。
categories:
  - 技術的な洞察
seo:
  title: ReactアプリにNode.jsで組み込みセルフサービスBIを実装する方法
  description: Reactアプリケーションに分析を組み込むことで、ユーザーのワークフロー内に関連性が高くタイムリーなインサイトを直接提供できます。
  ogTitle: ReactアプリにNode.jsで組み込みセルフサービスBIを実装する方法
  ogDescription: Reactアプリケーションに分析を組み込むことで、ユーザーのワークフロー内に関連性が高くタイムリーなインサイトを直接提供できます。
  ogType: article
  twitterTitle: ReactアプリにNode.jsで組み込みセルフサービスBIを実装する方法
  twitterDescription: Reactアプリケーションに分析を組み込むことで、ユーザーのワークフロー内に関連性が高くタイムリーなインサイトを直接提供できます。
  ogImage: /images/2023/05/embedding-analytics-in-react-apps-with-nodejs.png
source_hash: 045f1edb
source_locale: en
---
今日のデータ駆動型の世界において、SaaSアプリケーション内にダッシュボードと分析機能を直接統合すること(/blog/embedded-analytics-for-saas-companies)は必須です。分析の組み込み(/blog/benefits-of-embedded-analytics)には、市場投入までの時間の短縮、生産性とパフォーマンスの向上、利益の成長など、多くの利点があります。

Reactアプリケーションに分析を組み込むことで、ユーザーのワークフロー内に関連性が高くタイムリーなインサイトを直接提供し、データ駆動型文化(/whitepapers/creating-data-driven-culture)を促進し、より分析的な思考を促します。

組み込み分析(/embedded-analytics)ソリューションとして、Revealがそれを実現するのに役立ちます。

Revealは、インコンテキスト編集、データブレンド、ダッシュボードリンク、計算フィールドなど、分析機能(/blog/embedded-analytics-features)を備えたインタラクティブなダッシュボードやレポートを、Reactアプリケーションに簡単かつ迅速に組み込むのに役立ちます。

この記事では、Node.jsを使用してReactベースのアプリにRevealをどのように実装できるかを紹介します。

**無料PDFコピーを入手**

フォームに記入してアクセス権を取得してください。

申し訳ございませんが、フォームに問題が発生したようです。[数分後に再度お試しください](/blog/embedding-self-service-bi-in-react-apps-with-node-js#)。引き続き問題が発生する場合は、[support@revealbi.io](mailto:support@revealbi.io)までご連絡いただき、問題をお知らせください。

必須

残念ながら、Googleはあなたをボットと判断しました。お探しの資産を入手するには、[support@revealbi.io](mailto:support@revealbi.io)までお気軽にご連絡いただくか、製品のデモを予約してください。
正常に送信するには、フォームの規約に同意する必要があります。
このメールアドレスは有効ではありません。更新して再度お試しください。
ビジネスメールアドレスを使用してください。

国

ビジネスメール

名

姓

Infragisticsの[利用規約](/terms-of-use)および[プライバシーポリシー](/privacy-policy)に同意します

このサイトはreCAPTCHAによって保護されており、Googleのプライバシーポリシーと利用規約が適用されます。

PDFをダウンロード

![ReactアプリにNode.jsでセルフサービスBIを組み込む](https://static.infragistics.com/marketing/slingshot/checkmark.svg)

### PDFをダウンロード中です！

お楽しみいただき、学んでください。

**PDF:** 戦略的計画、選択、開発、および継続的な改善フェーズなど、成功的な実装に必要な詳細を記した無料の「エンドツーエンドの組み込みBIデプロイメントガイド」を入手してください。**[こちらからPDFをダウンロード！](https://static.infragistics.com/marketing/reveal/whitepapers/reveal-end-to-end-BI-deployment-guide.pdf)**

## なぜReactアプリにBIを組み込むべきなのか？

Reactアプリの目的が何であれ、組み込み分析機能は、ワークフローの合理化、リソース管理、パフォーマンスの最適化のための計り知れない機会を提供します。グラフ、チャート、ダッシュボードのようなBIツールは、組織全体のデータリテラシーを向上させる能力も持っています。データリテラシーとは、データを読み取り、理解し、作成し、[情報として伝達する](/glossary/data-driven-storytelling)能力であり、ユーザーがより良く、より賢明な意思決定を行うのに役立ちます。[データ駆動型の意思決定](/blog/reveal-data-driven-decision-making)は、推測や勘ではなく事実に基づいているため、非常に重要です。分析にアクセスすることで、誰もが自信を持って、影響の瞬間に、よりインテリジェントな意思決定を行うことができます。

## Node.jsを使用したReveal Reactアプリへの分析の組み込み

[Revealの組み込み分析](/embedded-analytics)は、インタラクティブなレポート、ダッシュボードなどをReactアプリに簡単に組み込むのに役立ちます。機械学習(/glossary/machine-learning)、ダッシュボードリンク、統計関数、計算フィールド、リッチなデータ分析、セルフサービス、[ホワイトラベリング](/blog/white-label-analytics)、データブレンドなど、さまざまな機能により、RevealはあらゆるReactベースのアプリケーションに大きな価値を加えることができます。

さらに、RevealのネイティブSDKを使用すると、ReactアプリにBIを統合することは非常に簡単であり、追加の要件なしにアプリケーションに分析を組み込むことができます。Revealの柔軟なアーキテクチャと豊富なAPIは、アプリ内の機能に対する制御を提供し、ユーザーエクスペリエンスのシームレスな一部となります。

それでは、[Reveal SDK](/download-sdk)を使用して、Reactアプリに分析を組み込んでいきましょう。

このチュートリアルでは、Node.jsサーバーを使用します。

\*すでにNode.jsサーバーがあります。ご自身で作成する方法を学ぶには、[Node.jsを使用してReveal SDKサーバーを設定する方法](https://help.revealbi.io/web/getting-started-server-node)に関するこのステップバイステップのチュートリアルをご覧ください。

**1. index.htmlに必要なスクリプト参照を追加する**

```generic
<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" type="text/css">

<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script> 
<script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script> 
<script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script> 
<script src="https://dl.revealbi.io/reveal/libs/1.3.1/infragistics.reveal.js"></script>
```

**2. app.tsxにRevealViewをレンダリングするために使用する<div>を追加する**

```generic
function App() {

return (

<div id="revealView" style={{height: "100vh", width: "100%"}}></div>

);

}
```

**3. app.tsxでRevealViewオブジェクトを初期化し、ダッシュボードをロードする**

```generic
useEffect(() => {

$.ig.RVDashboard.loadDashboard(dashboardId).then((dashboard: any) => {

var revealView = new $.ig.RevealView("#revealView");

revealView.dashboard = dashboard;

});

}, [dashboardId]);
```

わずか3つの簡単なステップで、Revealにダッシュボードをロードする基本を習得できます。完全なチュートリアルについては、シニアVP of Developer ToolsであるJason Beresが、Reactアプリからダッシュボードをロードおよび取得する手順をステップバイステップで解説するこの動画をご覧ください。

[https://www.youtube.com/watch?v=o1XoppSfX8E\&t=2s](https://www.youtube.com/watch?v=o1XoppSfX8E&t=2s)

組み込み分析やビジネスインテリジェンスに関するより詳細な情報、およびビジネスにとってデータが重要であることについて、[当社のYouTubeチャンネル](https://www.youtube.com/@RevealBI)の他の動画も必ずご覧ください。Angularへの組み込み分析(/blog/embedding-bi-in-angular-apps)、[Blazor](/blog/embedding-bi-in-blazor-applications)、JavaScript HTMLアプリなど、トピックを網羅し、組み込みBIダッシュボードの作成方法などについて解説しています。専門家による今後の動画をお見逃しにならないよう、チャンネル登録をお忘れなく。

また、Node.jsを使用してReveal Reactアプリに分析を組み込もうとしていて、途中で何らかの問題に直面した場合は、[当社のDiscordチャンネル](https://discord.com/invite/Ped3sSK5Xw)を通じて製品チームにご連絡ください。

また、Revealがどのように機能するかについて、[無料の製品ツアーを予約する](/request-demo)ことで、さらに学ぶことができます。あるいは、[SDKをダウンロード](/download-sdk)して、ご自身で試すこともできます。

\[cta\_banner type='{TYPE}' headline='データ駆動型の意思決定を始めましょう' msg= '今日からすべてのビジネスユーザーにBIの力を届けましょう。' button\_text= '詳細はこちら' button\_link='[https://www.revealbi.io/request-demo](https://www.revealbi.io/request-demo)' class='banner--embedded']
