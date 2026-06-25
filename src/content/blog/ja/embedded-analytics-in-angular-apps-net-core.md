---
title: Angularアプリに組み込み分析を.NET Coreで統合する方法
description: エンゲージメントとROIを向上させるより良い意思決定能力のために、Angularアプリケーションに組み込み分析を統合する方法を調べます。
date: '2025-01-20'
author: Casey Ciniello
cover: >-
  /images/2025/01/reveal-embedded-analytics-in-angular-app-with-net-core-thumbnail.png
heroImage: >-
  /images/2025/01/reveal-embedded-analytics-in-angular-app-with-net-core-header-1.svg
summary: >-
  Revealを使用すると、.NET
  Coreを使用してAngularアプリに分析を組み込むことで、外部ツールやコンテキスト切り替えの必要性を排除し、アプリのワークフロー内にリアルタイムのインサイトを直接提供できます。このガイドは、複雑さを排除し、自然で、高速で、シームレスな分析を提供する方法を簡単にご紹介します。
categories:
  - 技術的な洞察
seo:
  title: Angularアプリに組み込み分析を.NET Coreで統合する方法
  description: エンゲージメントとROIを向上させるより良い意思決定能力のために、Angularアプリケーションに組み込み分析を統合する方法を調べます。
  ogTitle: Angularアプリに組み込み分析を.NET Coreで統合する方法
  ogDescription: エンゲージメントとROIを向上させるより良い意思決定能力のために、Angularアプリケーションに組み込み分析を統合する方法を調べます。
  ogType: article
  twitterTitle: Angularアプリに組み込み分析を.NET Coreで統合する方法
  twitterDescription: エンゲージメントとROIを向上させるより良い意思決定能力のために、Angularアプリケーションに組み込み分析を統合する方法を調べます。
  ogImage: >-
    /images/2025/01/reveal-embedded-analytics-in-angular-app-with-net-core-thumbnail.png
source_hash: 1b5bce47
source_locale: en
---
## Angularおよび.NET Coreにおける組み込み分析の紹介

組み込み分析は、もはやオプションの機能ではなく、現代のアプリケーションにとって必須の要素です。2025年までに、ユーザーは日常的に使用するツール内で、リアルタイムのインサイトにシームレスにアクセスすることを求めています。組み込み分析をAngularアプリケーションと.NET Coreバックエンドに統合することで、企業はエンゲージメントとROIを促進するデータ駆動型の意思決定能力によって製品を向上させることができます。

本ガイドでは、[Reveal Embedded Analytics](/embedded-analytics)を使用して、ソフトウェア製品に分析を組み込むための包括的な手順ガイドを提供します。分析を統合する開発者であれ、機能強化を計画するプロダクトマネージャーであれ、このステップバイステップガイドが必要なインサイトを提供します。

## 組み込み分析の理解

組み込み分析とは、データ可視化およびビジネスインテリジェンス（BI）ツールをソフトウェアアプリケーションに直接統合することを指します。スタンドアロンのBIソリューションとは異なり、組み込み分析により、ユーザーはプラットフォームを切り替えることなく、コンテキスト内でインサイトにアクセスできます。

### **組み込み分析が不可欠な理由**

- **ワークフローの合理化:** ユーザーは単一のアプリケーション内でデータを分析し、行動を起こすことができます。

- **ユーザーエクスペリエンスの向上:** コンテキストを認識したインサイトは摩擦を減らし、意思決定を強化します。

- **製品価値の向上:** 分析機能が備わったアプリケーションは、競争の激しい市場で差別化を図ることができます。

### **統合のメリット**

Angularの動的なフロントエンド機能と.NET Coreの堅牢なバックエンドインフラストラクチャを組み合わせることで、強力なクライアント/サーバーフレームワークが構築されます。

これに組み込み分析を追加することで、以下のものが提供されます。

1. **機能の強化:** アクション可能なインサイトをリアルタイムで提供します。

2. **ユーザー維持:** 分析的なニーズに対応することで、ユーザーのエンゲージメントを維持します。

3. **スケーラビリティ:** Angularと.NET Coreは、ビジネスの成長に合わせて設計されたアプリケーションをサポートします。

## 開発環境のセットアップ

組み込み分析をAngularアプリケーションと.NET Coreバックエンドに統合することは、リアルタイムのコンテキスト的なインサイトを提供することで、ユーザーエクスペリエンスを大幅に向上させることができます。

以下の手順は、開発環境をセットアップし、Revealをシームレスに実装するための手順を概説しています。

組み込み分析を統合する前に、開発環境が適切に設定されていることを確認してください。

### **前提条件:**

1. **Angular CLI:** Angularアプリケーションの作成と管理に使用します。

2. **.NET Core SDK:** バックエンドサービスをビルドするために使用します。

3. **Node.js:** Angular開発に必要です。

4. **Reveal SDK:** アプリケーションに分析を組み込むために使用します。

## **ステップバイステップガイド：AngularでのReveal組み込み分析のセットアップ**

### **ステップ1：Angularアプリの作成**

1. **ターミナルを開く:** お気に入りのターミナルアプリケーションを起動して開始します

![windows terminal](/images/2025/02/image.jpg)

1. **アプリケーションディレクトリに移動:** ディレクトリを新しく作成したアプリに変更し、お好みのコードエディター（例：**[Visual Studio Code](https://code.visualstudio.com/)**）で開きます。

```
ng new getting-started
```

1. **Node.js:** Angular開発に必要です。

```
cd getting-started 

code
```

### **ステップ2：Reveal JavaScript APIの追加**

1. **index.htmlファイルを修正**
   index.htmlファイルを開き、クローズタグの直前に以下のスクリプトを追加して、Reveal JavaScript APIを組み込みます。

```
<script src="https://dl.revealbi.io/reveal/libs/1.7.1/infragistics.reveal.js"></script>
```

1. **追加の依存関係のインストール**
   以下の必須ライブラリを同じファイルに含めます。

**jQuery 2.2以上:**

```
<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
```

**Day.js 1.8.15以上:**

```
<script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script>
```

**最終的なindex.htmlの更新**
index.htmlファイルは、次のようになります。

```
<!doctype html> 
<html lang="en"> 
<head> 
  <meta charset="utf-8"> 
  <title>GettingStarted</title> 
  <base href="/"> 
  <meta name="viewport" content="width=device-width, initial-scale=1"> 
  <link rel="icon" type="image/x-icon" href="favicon.ico">   
</head> 
<body> 
  <app-root></app-root> 
 
  <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script> 
  <script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script> 
  <script src="https://dl.revealbi.io/reveal/libs/1.7.1/infragistics.reveal.js"></script> 
</body> 
</html>
```

### **ステップ3：Revealビューの初期化**

**HTMLコンポーネントの更新**
src/app/app.component.htmlファイルを開き、内容を削除し、以下の<div>を追加して、Revealビューのプレースホルダーを作成します。

```
<div #revealView style="height: 100vh; width: 100%; position:relative;"></div>
```

**HTMLコンポーネントの更新**
src/app/app.component.htmlファイルを開き、以下の更新を行います。

jQueryの宣言: ファイルの先頭で、TypeScriptがJavaScriptをコンパイルできるように変数を宣言します。

```
declare let $: any;
```

**ViewChildプロパティの追加:** HTMLファイルで定義されたrevealViewを参照します。

```
@ViewChild('revealView') el!: ElementRef;
```

\*\*

**AfterViewInitインターフェースの実装:** ngAfterViewInitライフサイクルメソッド内でRevealビューを初期化します。

```
ngAfterViewInit(): void { 
 
var revealView = new $.ig.RevealView(this.el.nativeElement); }
```

**最終的なapp.component.ts: 完全なTypeScriptコンポーネントは次のようになります:**

```
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core'; 
declare let $: any; 
@Component({ 
  selector: 'app-root', 
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.scss'] 
}) 
export class AppComponent implements AfterViewInit { 
  @ViewChild('revealView') el!: ElementRef; 
  ngAfterViewInit(): void { 
    var revealView = new $.ig.RevealView(this.el.nativeElement); 
  } 
}
```

**Reveal SDKのベースURLの設定:**
クライアントアプリがサーバーとは異なるURLでホストされている場合は、ベースURLを設定する必要があります。

### **ステップ4：アプリケーションの実行**

**アプリケーションの起動**
ターミナルで、次のコマンドを実行します。

```
npm: npm start 
Yarn: yarn start 
Pnpm:pnpm start
```

**アプリケーションのテスト**
アプリケーションが起動したら、ブラウザで開きます。Revealビューが正常に初期化されているはずです。

**おめでとうございます！**

最初のReveal SDK Angularアプリケーションを正常に作成しました。このセットアップにより、組み込み分析の力を活用してユーザーエクスペリエンスを向上させ、アクション可能なインサイトを推進する準備が整いました。

データの力を活用する

リアルタイムのコンテキストデータでビジネスを成長させましょう。

[デモをリクエスト](/request-demo)

## ベストプラクティスと考慮事項

**セキュリティ対策**

- **認証:** 機密データを保護するために、OAuthやJWTなどの堅牢な認証メカニズムを実装します。

- **データアクセス制御:** ロールベースの権限を使用して、ユーザーがアクセスを許可されているもののみにアクセスできるようにします。

- **HTTPS:** データ送信には常に安全な接続を使用します。

**パフォーマンスの最適化**

- **データキャッシング:** 頻繁にアクセスされるデータをキャッシュすることで、サーバー負荷を軽減します。

- **遅延読み込み (Lazy Loading):** ダッシュボードやコンポーネントは必要なときだけ読み込むことで、アプリの速度を向上させます。

- **バックエンドの最適化:** 大量のデータセットを効率的に処理するために、データベースクエリを最適化します。

## 結論

組み込み分析をAngularアプリケーションと.NET Coreバックエンドに統合することは、現代のソフトウェア製品にとってゲームチェンジャーです。このガイドに従うことで、堅牢な分析機能でアプリケーションを強化し、ユーザーに価値をもたらすことができます。Reveal Embedded Analyticsは、このプロセスをシームレスにし、データ可視化の組み込み、セキュリティの確保、パフォーマンスの最適化のための強力なツールを提供します。

アプリケーションを次のレベルに引き上げる準備ができましたか？[Reveal](https://samples.revealbi.io/reveal-sdk-samples/2020-survey-results.html)のウェブサイトでコールを予約し、組み込み分析のニーズをどのように解決できるかをご覧ください。
