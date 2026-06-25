---
title: Reveal BIが組み込み分析データを保護する方法
description: 複数の認証方法、データローカルキャッシュ、などを含むRevealの組み込みBIプラットフォームで、データを保護する方法を学びましょう。
date: '2019-07-15'
author: Casey Ciniello
cover: /images/2020/10/business_2D00_intelligence_2D00_reveal_2D00_security.jpg
summary: >-
  Revealの組み込みビジネスインテリジェンスプラットフォームは、複数の認証方法、クエリをサーバーやデータベースに送信する量を最小限に抑えるためのデータローカルキャッシュ、などを含むクラウドアーキテクチャに基づいています。このブログでそれらを探ります。認証：Reveal
  Cloud認証はOpenID Connect (OIDC)標準を使用します。Identity Serviceコンポーネントは安全な認証を提供します[...]
categories:
  - 技術的な洞察
seo:
  title: Reveal BIがお客様の組み込み分析データを保護する方法 - Reveal BI
  description: 複数の認証方法、データローカルキャッシュ、などを含むRevealの組み込みBIプラットフォームで、データを保護する方法を学びましょう。
  ogTitle: Reveal BIがお客様の組み込み分析データを保護する方法 - Reveal BI
  ogDescription: 複数の認証方法、データローカルキャッシュ、などを含むRevealの組み込みBIプラットフォームで、データを保護する方法を学びましょう。
  ogType: article
  twitterTitle: Reveal BIがお客様の組み込み分析データを保護する方法 - Reveal BI
  twitterDescription: 複数の認証方法、データローカルキャッシュ、などを含むRevealの組み込みBIプラットフォームで、データを保護する方法を学びましょう。
  ogImage: /images/2020/10/business_2D00_intelligence_2D00_reveal_2D00_security.jpg
source_hash: 35aba7c1
source_locale: en
---
Revealの組み込みビジネスインテリジェンスプラットフォームは、複数の認証方法、サーバーやデータベースへのクエリ送信を最小限に抑えるためのローカルデータキャッシングなど、クラウドアーキテクチャに基づいています。本ブログでこれらについて詳しく解説します。

## 認証

Reveal Cloud認証は、OpenID Connect (OIDC) 標準を使用しています。Identity Serviceコンポーネントは、Google、Office 365、Infragisticsアカウントなど、複数の認証ソースに対して安全な認証を提供します。

Revealは、Microsoftを使用した認証を強調表示した以下の図に示されるように、OIDC認証の標準フローに従います。

![Reveal Cloud authentication ](/images/2020/10/5125.Security-Blog-Authentication-Flow.png)

Revealは、ユーザーの資格情報が認証プロバイダー（Google、Microsoft、またはInfragistics）が提供するページに入力されるため、決してアクセスしません。認証プロバイダーはその後、アクセスコード（ステップ4）とともにユーザーをRevealにリダイレクトします。Revealは、このコードを使用して、ユーザーを識別するメールアドレスなどのユーザー情報、およびGoogleアカウントの場合はGoogle Drive、Microsoft O365アカウントの場合はSharePointやOneDriveなど、他のサービスにアクセスするために使用されるトークンを取得します。

### データソースの認証

Revealは、以下のような複数のデータソースをサポートしています。

- リレーショナルデータベース—MS SQL Server、MySQLなど
- データファイル—Google Drive、DropboxなどからのCSV、Excel、JSON
- クラウドサービス—Salesforce、Dynamics CRMなど

これらのデータソースのいずれかを認証するには、プロバイダーに依存し、それぞれが異なる認証方法を必要とすることが一般的です。Revealは、以下の4種類の認証をサポートしています。

1. Anonymous
2. User/password
3. NTLM: user, password and domain
4. OAuth v2

### OAuthデータソース

Google Drive、Dropbox、OneDriveなど、OAuthをサポートするプロバイダーの場合、Revealはユーザーを、データへのアクセス許可を求めるデータプロバイダーが提供する認証ページにリダイレクトします。以下をご覧ください。

![ Reveal authentication with OAuth Data Sources ](/images/2020/10/OAuth-Data-Sources-Diagram-Security-BLog.png)

>

このプロセスは、以前に議論したOIDCのものと類似しています。認証が完了すると、Revealは、サポートされているすべてのプラットフォームでユーザーを代理してデータにアクセスするために、認証トークンを保存します。

### データセキュリティ

パフォーマンスを向上させるため、Revealはキャッシングされたデータをデバイスにローカルに保存し、サーバーやデータベースに送信されるクエリの数を最小限に抑えます。データソースにアクセスするための資格情報も、データソースが初めて設定または使用されるときにのみ要求されるため、デバイスに保存されます。

データの力を活用する

リアルタイムのコンテキストデータでビジネスを成長させましょう。

[Request a Demo](/request-demo)
