---
title: Reveal 2.0：今日の実際の構築方法に対応
description: >-
  Reveal 2.0は、Reveal Web
  SDKの完全なモダナイズ版です。jQueryへの依存がなく、TypeScriptファースト、ESMおよびIIFEビルド、npmまたはCDNインストール、新しいCosmosDBおよびClickHouseコネクタ、強化されたアクセシビリティ、そしてPreviewでのNodeおよびJava
  SDKのパラリティを実現しました。
date: '2026-06-04'
author: Casey Ciniello
cover: >-
  https://static.infragistics.com/marketing/reveal/blogs/launch/2026/may/reveal-new-release-2-0-header.jpg
heroImage: >-
  https://static.infragistics.com/marketing/reveal/blogs/what-is-self-service-bi/reveal-what-is-self-service-bi-header.svg
summary: >-
  Reveal
  2.0は、TypeScriptファーストのアーキテクチャ、最新のモジュールサポート、改善されたアクセシビリティ、そしてPreviewでのNodeとJavaにわたる実行時パラリティを確保し、現在の開発スタック向けにReveal
  Web SDKをモダナイズしました。
takeaways:
  - Reveal 2.0は、jQueryへの依存を取り除き、Web SDKをモダナイズしました。
  - TypeScriptサポートは、完全な型定義を備え、ファーストクラスの機能を提供します。
  - ESMビルドとIIFEビルドの両方が、モダンおよびレガシーなモジュールシステムに対応しています。
  - チームはnpm経由でインストールするか、CDNを使用して迅速なプロトタイピングを行うことができます。
  - Azure CosmosDBおよびClickHouseの新しいネイティブコネクタが組み込まれています。
  - NodeおよびJava SDKは、PreviewでASP.NETとAPI機能のパラリティに到達しました。
categories:
  - 製品アップデート
tags:
  - Reveal 2.0
  - ウェブ SDK
  - 組み込み分析
  - TypeScript
  - 開発者体験
seo:
  title: Reveal 2.0：今日の実際の構築方法に対応
  description: >-
    Reveal 2.0は、Reveal Web
    SDKの完全なモダナイズ版です。jQueryへの依存がなく、TypeScriptファースト、ESMおよびIIFEビルド、npmまたはCDNインストール、新しいCosmosDBおよびClickHouseコネクタ、強化されたアクセシビリティ、そしてPreviewでのNodeおよびJava
    SDKのパラリティを実現しました。
  ogTitle: Reveal 2.0：今日の実際の構築方法に対応
  ogDescription: >-
    Reveal 2.0は、Reveal Web
    SDKの完全なモダナイズ版です。jQueryへの依存がなく、TypeScriptファースト、ESMおよびIIFEビルド、npmまたはCDNインストール、新しいCosmosDBおよびClickHouseコネクタ、強化されたアクセシビリティ、そしてPreviewでのNodeおよびJava
    SDKのパラリティを実現しました。
  ogType: article
  twitterTitle: Reveal 2.0：今日の実際の構築方法に対応
  twitterDescription: >-
    Reveal 2.0は、Reveal Web
    SDKの完全なモダナイズ版です。jQueryへの依存がなく、TypeScriptファースト、ESMおよびIIFEビルド、npmまたはCDNインストール、新しいCosmosDBおよびClickHouseコネクタ、強化されたアクセシビリティ、そしてPreviewでのNodeおよびJava
    SDKのパラリティを実現しました。
  ogImage: >-
    https://static.infragistics.com/marketing/reveal/blogs/launch/2026/may/reveal-new-release-2-0-header.jpg
source_hash: e7089db5
source_locale: en
---
チームがWebアプリケーションを構築する方法は変化しました。モジュールがスクリプトタグに取って代わりました。TypeScriptが標準となりました。npmと最新のバンドラーが、インストールとパッケージングを引き継ぎました。開発者が利用するほとんどのSDKは、これに対応するために書き直されました。

そのほとんどが。

本日、私たちはReveal Web SDKの完全なモダナイズ版であるReveal 2.0をリリースします。jQueryへの依存はありません。TypeScriptで記述されています。IIFEビルドとESMビルドの両方で提供されます。CDNまたはnpm経由でインストール可能です。同じダッシュボード、同じエンドユーザーエクスペリエンスを、2026年のビルドパイプラインにクリーンに適合する基盤の上で実現します。

![Reveal 2.0 manufacturing dashboard](https://static.infragistics.com/marketing/reveal/blogs/launch/2026/may/reveal-launch-2-0-manufacturing-dashboard-body-1.webp)

<h2 style="margin-bottom: 1rem;">Reveal 2.0の新機能</h2>

- jQueryへの依存がないモダンなWeb SDK。
- TypeScriptファーストで、最初から完全な型定義を提供。
- IIFEビルドとESMビルドの両方。アプリがすでに使用しているモジュールシステムにRevealをドロップするだけ。
- クイックプロトタイピングにはCDN経由で、本番環境にはnpm経由でインストール。
- Azure CosmosDB用の新しいコネクタ。
- ClickHouse用の新しいコネクタ。
- SDK全体のアクセシビリティが向上。
- NodeおよびJava SDKが、ASP.NET SDKと同等のAPI機能パリティを達成し、Previewで利用可能に。

<h2 style="margin-bottom: 1rem;">再構築した理由</h2>

Reveal 1.xは機能しました。今でも機能します。しかし、過去数年間、モダンなVite、webpack、またはesbuildプロジェクトに携わってきた人なら、jQueryベースでスクリプトタグのみのSDKがもたらす摩擦を知っています。これはクリーンにツリーシェイクされません。サーバーサイドレンダリングを複雑にします。顧客がどの組み込み分析プラットフォームに製品を賭けるかを決定するまさにその評価の場で、古く感じられます。

私たちには2つの選択肢がありました。継ぎ目を覆い隠し続けるか、あるいは顧客が実際にデプロイする基盤の上で再構築するか。私たちは後者を選びました。

Reveal 2.0は、Revealがこれまで行ってきたすべてを依然として実現します。製品内に組み込むための、高速で美しく、カスタマイズ可能なダッシュボードです。しかし、今ではモダンなSDKがそうあるべき方法で統合されます。

<h2 style="margin-bottom: 1rem;">これがあなたにとって意味すること</h2>

すでにRevealをご利用のお客様の場合、アップグレードパスは簡単です。今日使用しているAPIはそのまま利用できます。何が変更されたか、また統合を更新する方法を解説した1.xから2.0への移行ガイドを公開しました。ほとんどのチームは午後に移行を完了できます。

1〜2年前にRevealを評価し、SDKがあなたのスタックに遅れていると感じた場合、もう一度見てください。評価シートのデメリット側にあった理由が、今やメリット側にあります。

組み込み分析を初めて検討するエンジニアリングリーダーの場合、Reveal 2.0は、Next.js、React、Vue、またはAngularプロジェクトにドロップでき、他のすべてをインストールするのと同じツールでインストールでき、レガシーな荷物なしで本番環境にリリースできるSDKを提供します。

<h2 style="margin-bottom: 1rem;">マルチランタイム：プレビュー版のNodeとJava</h2>

Revealは常に.NETファーストでした。Reveal 2.0により、NodeおよびJava SDKがASP.NET SDKと同等のAPI機能パリティを達成し、両方ともPreviewで利用可能です。Java SDKは、以前提供していたレガシーなJava SDKから完全に脱却した、全く新しいモダンなAPIを持つ新SDKです。

製品がNodeまたはJavaで動作し、以前はスタックに合わないという理由で私たちを排除せざるを得なかった場合でも、それはもはや当てはまりません。Previewアクセスにサインアップし、GA（一般提供）の前に何を磨き上げるべきか教えてください。

<h2 style="margin-bottom: 1rem;">より多くのデータ、より多くのアクセス</h2>

Azure CosmosDBコネクタ：手動のETLや中間ウェアハウスなしに、CosmosDBのデータをRevealダッシュボードに直接取り込みます。

ClickHouseコネクタ：分析をモダンなカラムナスタックに移行したチームにとって、組み込みダッシュボードも追随できます。

アクセシビリティの改善：Reveal 2.0は、WCAG準拠が必須の環境でダッシュボードをリリースしやすくします。対応している特定の調達要件についてお話しください。当社のカバレッジをチェックリストにマッピングするお手伝いができます。

Reveal 2.0は、もし私たちが今日、独自のSaaSに組み込み分析製品を構築しているとしたら、使用したいバージョンです。皆様も同じように感じていただけると確信しています。
