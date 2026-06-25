---
title: BlazorアプリケーションにセルフサービスBIを組み込む
description: >-
  より多くの組織がアプリケーションの一部として分析機能を提供し始めるにつれて、Blazorアプリケーションに分析を組み込むことはもはやオプションではありません。その方法を学びましょう。
date: '2023-06-13'
author: Bilyana Petrova
cover: /images/2023/06/reveal-embed-BI-in-blazor-header-1.png
heroImage: /images/2023/06/reveal-embed-BI-in-blazor-internal-header.svg
summary: >-
  より多くの組織がアプリケーションの一部として分析機能を提供し始めるにつれて、Blazorアプリケーションに分析を組み込むことはもはやオプションではありません。
categories:
  - 技術的な洞察
seo:
  title: Blazorアプリに強力なBIを組み込む - Reveal BI
  description: >-
    より多くの組織がアプリケーションの一部として分析機能を提供し始めるにつれて、Blazorアプリケーションに分析を組み込むことはもはやオプションではありません。その方法を学びましょう。
  ogTitle: Blazorアプリに強力なBIを組み込む - Reveal BI
  ogDescription: >-
    より多くの組織がアプリケーションの一部として分析機能を提供し始めるにつれて、Blazorアプリケーションに分析を組み込むことはもはやオプションではありません。その方法を学びましょう。
  ogType: article
  twitterTitle: Blazorアプリに強力なBIを組み込む - Reveal BI
  twitterDescription: >-
    より多くの組織がアプリケーションの一部として分析機能を提供し始めるにつれて、Blazorアプリケーションに分析を組み込むことはもはやオプションではありません。その方法を学びましょう。
  ogImage: /images/2023/06/reveal-embed-BI-in-blazor-header-1.png
source_hash: 9f275251
source_locale: en
---
豊富なデータを持つ現代において、ユーザーはデータ主導のアプローチを採用し、[意思決定プロセス](/blog/reveal-data-driven-decision-making)を導くようになっています。

その理由は明らかです。

強力なBIを完全にインタラクティブなビジュアルとレポートと統合し、Blazorアプリケーションに組み込むことで、データ分析をすべてのエンドユーザーにとって利用しやすくなります。コンテキスト内でアクセス可能なデータがあれば、ユーザーはアプリケーションの切り替えやデータのシャッフルによる混乱や中断から解放され、必要なときに迅速に関連するインサイトを抽出できます。

[組み込み分析](/embedded-analytics)ソリューションとして、Revealがその実現を支援できます。

Revealを使用すると、自己サービス型の[分析機能](/blog/embedded-analytics-features)（コンテキスト内編集、データブレンド、ダッシュボードリンク、計算フィールドなど）を備えたインタラクティブなダッシュボードとレポートを、[Blazorアプリケーション](https://www.infragistics.com/products/ignite-ui-blazor)に簡単かつ迅速に組み込むことができます。

この記事では、Revealを使用してBlazorアプリに組み込み分析を成功裏に統合する方法を探ります。

Revealが初めての場合は、ウェブサイトのツアーをご覧いただくか、[Reveal製品概要ビデオ](https://www.youtube.com/watch?v=lkWA2DJsLtE)を視聴することで、製品について詳しく学ぶことができます。

## **Blazorアプリに分析を組み込むべき理由**

Blazorアプリに分析を組み込むことで、自然なワークフローの中で主要なビジネスデータを確認できます。そうすることで、そうでなければ見過ごされていた可能性のあるデータ内の傾向やパターンを容易に発見できます。リアルタイムのインサイトにアクセスすることで、あなた（およびすべてのユーザー）は、ビジネスの成功を導くより情報に基づいた[決定](/blog/reveal-data-driven-decision-making)を下すことができます。

データ分析は、ワークフローの合理化、リソース管理、プロセスとパフォーマンスの最適化を通じて、最大限の収益性を実現するのにも役立ちます。適切なデータがあれば、収益を増加させるための新しい製品/サービスの機会を特定することもできます。

**無料PDFコピーを入手**

アクセスするには、フォームにご記入ください。

申し訳ございませんが、フォームに問題が発生したようです。[数分後に再度お試しください](/blog/embedding-bi-in-blazor-applications#)。引き続き問題が発生する場合は、[support@revealbi.io](mailto:support@revealbi.io)までご連絡いただき、問題をお知らせください。

必須

残念ながら、Googleはあなたをボットと判断しました。お探しの資産を入手するには、[support@revealbi.io](mailto:support@revealbi.io)までお気軽にご連絡いただくか、製品のデモを予約してください。
提出を成功させるには、フォームの規約に同意する必要があります。
このメールアドレスは有効ではありません。更新して再度お試しください。
ビジネスメールアドレスを使用してください。

国

ビジネスメール

名

姓

Infragisticsの[利用規約](/terms-of-use)および[プライバシーポリシー](/privacy-policy)に同意します。

このサイトはreCAPTCHAによって保護されており、Googleのプライバシーポリシーと利用規約が適用されます。

PDFをダウンロード

![Blazorアプリケーションへの自己サービスBIの組み込み](https://static.infragistics.com/marketing/slingshot/checkmark.svg)

### PDFがダウンロード中です！

お読みいただき、学んでいただくのをお楽しみください。

**PDF:** 戦略的計画、選択、開発、継続的な改善のフェーズが成功的な実装に必要であることを詳述した、無料の「エンドツーエンドの組み込みBI展開ガイド」を入手してください。**[こちらからPDFをダウンロード！](https://static.infragistics.com/marketing/reveal/whitepapers/reveal-end-to-end-BI-deployment-guide.pdf)**

## **Reveal BIによるBlazorアプリへの自己サービス分析の組み込み**

以下の7つのステップで、Blazorアプリケーションにリッチなデータビジュアライゼーションとダッシュボードを有効化するのがいかに簡単かをご紹介します。クライアント側とサーバー側の両方の設定が必要です。始めるには、[SDKをダウンロード](/download-sdk)してください。

これを完了したら、7つの簡単なステップでBlazorアプリに組み込み型の自己サービスBIを作成し、有効化しましょう！

### **ステップ1：Blazor Serverアプリの作成**

これはBlazor Serverアプリなので、Visual Studioを開き、デフォルト設定で新しいBlazor Serverアプリを作成します。完了したら、プロジェクトを右クリックし、「NuGetパッケージの管理」を選択し、nuget.orgで**Reveal.Sdk.AspNetCore** nugetパッケージを検索し、プロジェクトにインストールします。

### **ステップ2：フォルダの設定 / ダッシュボードの追加**

Reveal SDKクライアントをテストするために、設定が正しいことを確認できるサンプルダッシュボードを提供します。Revealは、ダッシュボードを自動的にロードおよび保存するために既知のフォルダ構造を使用します。プロジェクトのルートに「Dashboards」という名前のフォルダを使用する場合、追加のロード/保存コードを記述する必要はありません。

1. **Dashboards** という名前のフォルダを作成します。

2. このzipファイルから、サンプルダッシュボード（Marketing、Sales、Campaigns、Manufacturing）を解凍し、新しく作成したDashboardフォルダにコピーします：[https://users.infragistics.com/Reveal/sample-dashboards.zip](https://users.infragistics.com/Reveal/sample-dashboards.zip)

### **ステップ3：Program.csの更新**

**Program.cs:**

1. コードウィンドウの先頭に以下を追加します：

**using Reveal.Sdk;**

2. このコードを使用して、アプリにReveal SDKを使用するように指示し、**builder.build** ステートメントの前に配置します。

**builder.Services.AddControllers().AddReveal();**

### **ステップ4：クライアントSDK依存関係の追加**

RevealクライアントJavaScript依存関係を有効にするには、**Pages\\\_layout.cshtml** ファイルを更新する必要があります。以下のコードを、閉じタグの**</Body>**の直前に追加します。

```generic
<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>

<script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script>

<script src="https://dl.revealbi.io/reveal/libs/1.5.0/infragistics.reveal.js"></script> 
 
<script type="module"> 
    import "./js/revealview.js"; 
</script>
```

### **ステップ5：Revealクライアント設定JavaScriptの追加**

Reveal SDK ClientはRevealViewを通じて設定されます。RevealViewをロードするには、クライアント側でJavaScript関数を追加する必要があります。ここが、ダッシュボードがレンダリングされるときに有効にすべきプロパティを設定する場所でもあります。

1. **\wwwroot\\** フォルダに **js** フォルダを追加します。

2. **js** フォルダ内に、以下のコードを持つ **revealview\.js** という名前のJavaScriptファイルを追加します：

```generic
window.loadRevealView = function (viewId, dashboardName) {

$.ig.RevealSdkSettings.setBaseUrl('https://samples.revealbi.io/upmedia-backend/reveal-api/');

$.ig.RVDashboard.loadDashboard(dashboardName, (dashboard) => {

var revealView = new $.ig.RevealView("#" + viewId);

revealView.dashboard = dashboard;

});

}
```

### **ステップ6：ダッシュボードのロード**

このBlazorアプリケーションでは、ダッシュボードを **revealView** という名前の**<div>**にロードします。以下の手順に従って、アプリケーションの**Dashboards**フォルダからサンプルダッシュボードをロードします。

1. **Pages\Index.Razor** に、この using ステートメントを追加します：

```generic
@inject IJSRuntime JSRuntime
```

2. ロードするダッシュボードを選択するために使用するドロップダウンのコードを追加します：

```generic
<select @onchange="selectedDashboardChanged"> 
    <option>Campaigns</option> 
    <option>Healthcare</option> 
    <option>Manufacturing</option> 
    <option>Marketing</option> 
    <option>Sales</option> 
</select> 
```

3. revealView divを追加します：

```generic
<div id="revealView" style="width:100%; height:750px"></div> 
```

4. 初回ロード時にCampaignsダッシュボードをロードするコードを追加します：

```generic
@code { 
    protected override async Task OnAfterRenderAsync(bool firstRender) 
    { 
        if (firstRender) 
        { 
            await JSRuntime.InvokeVoidAsync("loadRevealView", "revealView", "Campaigns"); 
        } 
    }
} 
```

5. 選択が変更されたときに正しいダッシュボードをロードするように監視します：

```generic
async void selectedDashboardChanged(ChangeEventArgs e) 
    { 
        await JSRuntime.InvokeVoidAsync("loadRevealView", "revealView", e.Value!.ToString()); 
    } 
} 
```

### **ステップ7：アプリケーションの実行**

これで、Blazorアプリケーションに強力なBI機能を有効にするためのすべてのステップが完了しました。アプリケーションを実行して結果を確認してください！

![](/images/2023/06/image-1024x704.png)

完全なチュートリアルについては、Revealを使用してBlazorアプリに分析を組み込む手順を解説したこのビデオをご覧ください。

[https://www.youtube.com/watch?v=OMddgybtDi8](https://www.youtube.com/watch?v=OMddgybtDi8)

組み込み分析やビジネスインテリジェンス、そしてビジネスにとってデータが重要であることについて、より詳細な情報については、[当社のYouTubeチャンネル](https://www.youtube.com/@RevealBI)の他のビデオも必ずご覧ください。[Angularに組み込み分析を組み込む](/blog/embedding-bi-in-angular-apps)方法、[Node.jsを使用したReactアプリ](/blog/embedding-self-service-bi-in-react-apps-with-node-js)、JavaScript HTMPアプリなど、さまざまなトピックを扱っています。チャンネル登録をしていただくことで、専門家による今後のすべてのビデオをご覧いただけます。

Revealを使用してBlazorアプリに分析を組み込もうとしていて、途中で何らかの問題に直面した場合は、[当社のDiscordチャンネル](https://discord.com/invite/Ped3sSK5Xw)を通じて製品チームにご連絡ください。

また、[無料の製品ツアーを予約](/request-demo)することで、Revealとその仕組みについてさらに学ぶことができます。あるいは、[SDKをダウンロード](/download-sdk)して、ご自身で試すこともできます。

\[cta\_banner type='{TYPE}' headline='データに基づいた意思決定を始めましょう' msg= '今日からすべてのビジネスユーザーにBIの力を届けます。' button\_text= '詳細はこちら' button\_link='[https://www.revealbi.io/request-demo](https://www.revealbi.io/request-demo)' class='banner--embedded']
