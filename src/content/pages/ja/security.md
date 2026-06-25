---
title: Revealによる組み込み分析のセキュリティ：お客様の分析、お客様の管理
description: >-
  Revealの組み込み分析は、デフォルトで安全なアプローチで設計されており、お客様のデータとアプリケーションが保護され、安全であることを保証します。詳細はこちらをご覧ください！
cover: /images/2020/10/reveal-logo-gradient-1200x630-1.jpg
sections:
  - type: dark-hero
    variant: gradient-split
    title: 組み込み分析のセキュリティ
    subhead: >-
      <p class="lead mb-3">組み込み分析とAIを活用したインサイトのためのエンタープライズグレードのセキュリティ</p><p
      class="mb-4">Revealは、データをサードパーティのSaaSプラットフォーム、不安定なiFrameアーキテクチャ、または制御不能なAIモデルに公開することなく、セキュリティファーストのSaaSおよび規制環境向けに設計された組み込み分析を提供します。</p>
    ctaLabel: パーソナライズされたデモを予約
    ctaHref: '#'
    image: >-
      https://static.infragistics.com/marketing/reveal/security/reveal-security-compliance-badges-hero-960.webp
    imageAlt: Revealの組み込み分析セキュリティヒーロー
    imageSrcset:
      - media: '(max-width: 480px)'
        srcset: >-
          https://static.infragistics.com/marketing/reveal/security/reveal-security-compliance-badges-hero-480.webp
      - media: '(max-width: 768px)'
        srcset: >-
          https://static.infragistics.com/marketing/reveal/security/reveal-security-compliance-badges-hero-768.webp
      - media: '(max-width: 960px)'
        srcset: >-
          https://static.infragistics.com/marketing/reveal/security/reveal-security-compliance-badges-hero-960.webp
      - media: '(max-width: 1100px)'
        srcset: >-
          https://static.infragistics.com/marketing/reveal/security/reveal-security-compliance-badges-hero-1100.webp
      - media: '(max-width: 1600px)'
        srcset: >-
          https://static.infragistics.com/marketing/reveal/security/reveal-security-compliance-badges-hero-1600.webp
      - media: '(min-width: 1601px)'
        srcset: >-
          https://static.infragistics.com/marketing/reveal/security/reveal-security-compliance-badges-hero-1920.webp
  - type: icon-grid
    headline: 組み込み分析のセキュリティが重要である理由
    subhead: 分析を組み込むことは単なるUIの決定ではありません。それはセキュリティとアーキテクチャに関する決定です。
    subhead2: >-
      分析が顧客向けになると、アプリケーションの攻撃対象領域が拡大します。データアクセス、IDの伝播、テナント分離、AIガバナンスがすべて重要な設計上の考慮事項となります。
    cols: 3
    variant: white
    cards:
      - icon: >-
          https://static.infragistics.com/marketing/reveal/icons/reveal-icon-data-sovereignty.svg
        iconAlt: データ主権アイコン
        title: データ主権
        body: Revealは、クエリ実行時にテナント分離を強制し、共有環境におけるクロステナントのデータアクセスを防ぎます。
      - icon: >-
          https://static.infragistics.com/marketing/reveal/icons/reveal-icon-ai.svg
        iconAlt: AIコンテキスト制御アイコン
        title: AIコンテキスト制御
        body: >-
          Revealは、AIがガバナンスされたデータのみにアクセスすることを制限し、プロンプトインジェクションや不正なデータ漏洩のリスクを低減します。
      - icon: >-
          https://static.infragistics.com/marketing/reveal/icons/reveal-icon-shield-checkmark.svg
        iconAlt: コンプライアンス対応アイコン
        title: コンプライアンス対応
        body: >-
          Revealは、制御されたデータアクセス、監査、および柔軟なデプロイメントモデルを通じて、GDPR、HIPAA、およびSOC
          2の要件をサポートします。
    footnote: >-
      B2B
      SaaSおよび規制産業にとって、セキュリティの失敗はコンプライアンスに影響を与えるだけでなく、顧客の信頼を損ない、チャーンリスクを高め、エンタープライズ導入を遅らせます。
    footnoteClass: mt-3 text-muted
  - type: security-risk-table
    headline: 組み込み分析における一般的なセキュリティリスクとRevealによる軽減方法
    rows:
      - risk: <strong class="text-red-600">弱い分離</strong>によるクロステナントのデータアクセス
        category: テナント分離
        mitigation: リクエストごとに<strong>クエリ実行</strong>でテナントコンテキストを強制
      - risk: 分析とアプリケーション間で<strong>認証</strong>に一貫性がない
        category: 認証モデル
        mitigation: <strong>並行ユーザーシステムがない</strong>ため、既存の認証モデルを継承
      - risk: iFrameを介して、<strong>セキュリティ境界外で実行される</strong>分析
        category: 組み込みアーキテクチャ
        mitigation: 外部コンテナではなく、<strong>SDK</strong>を介してアプリケーション内に実行
      - risk: <strong>制限されていない、または機密性の高いデータ</strong>にアクセスするAI
        category: AIアクセス制御
        mitigation: AIは、お客様の<strong>権限モデル</strong>とアクセス制御内で動作
      - risk: <strong>コンプライアンス要件を満たさない</strong>分析ツール
        category: コンプライアンス整合性
        mitigation: アーキテクチャを通じて<strong>GDPR、HIPAA、およびSOC 2</strong>をサポート
  - type: security-arch-cards
    eyebrow: コアアーキテクチャ
    headline: Revealの組み込み分析セキュリティアーキテクチャ
    subhead: >-
      Revealは、外部SaaSコンテナやiFrameではなく、SDKを使用してアプリケーションに直接組み込まれ、セキュリティチームに完全な運用可視性を提供します。
    cards:
      - icon: >-
          https://static.infragistics.com/marketing/reveal/icons/reveal-icon-sdk.svg
        iconAlt: SDKファースト統合アイコン
        title: SDKファースト統合
        intro: アプリケーションのセキュリティモデルとインフラストラクチャ内で動作するように構築されています。
        items:
          - アプリケーションのセキュリティおよびデプロイメントモデル内で動作
          - 顧客データを所有または収益化しない
          - 認証、認可、およびデータアクセスは引き続きお客様の管理下にあります
          - セキュリティを犠牲にすることなく、デプロイの柔軟性
      - icon: >-
          https://static.infragistics.com/marketing/reveal/icons/reveal-icon-security-2.svg
        iconAlt: 運用セキュリティアイコン
        title: 運用セキュリティとインフラストラクチャの安全性
        intro: Revealは、エンタープライズ環境内でクリーンに動作するように設計されています：
        items:
          - 既存のプロキシ、ロードバランサー、およびゲートウェイと互換性があります
          - 開示されていないデータ送信がない、明示的で設定可能な依存関係
          - リバースプロキシおよびエンタープライズファイアウォールの背後で実行するように設計されています
  - type: feature-row
    headline: 認証、認可、およびデータアクセス制御
    image: >-
      https://static.infragistics.com/marketing/reveal/security/reveal-security-access-control-960.webp
    imageAlt: 認証とデータアクセス制御
    imageSrcset:
      - media: '(max-width: 480px)'
        srcset: >-
          https://static.infragistics.com/marketing/reveal/security/reveal-security-access-control-480.webp
      - media: '(max-width: 768px)'
        srcset: >-
          https://static.infragistics.com/marketing/reveal/security/reveal-security-access-control-768.webp
      - media: '(max-width: 960px)'
        srcset: >-
          https://static.infragistics.com/marketing/reveal/security/reveal-security-access-control-960.webp
      - media: '(max-width: 1100px)'
        srcset: >-
          https://static.infragistics.com/marketing/reveal/security/reveal-security-access-control-1100.webp
      - media: '(min-width: 1101px)'
        srcset: >-
          https://static.infragistics.com/marketing/reveal/security/reveal-security-access-control-1600.webp
    reversed: false
    slotContent: |
      <p>Revealは既存のセキュリティモデルを強制しますが、それを置き換えるものではありません。</p>
      <ul class="list-checkmark blue-tick">
        <li>SSO、OAuth、およびSAML統合</li>
        <li>ロールベースおよび行レベルのセキュリティは、ホストアプリケーションから継承されます。</li>
        <li>分析インタラクション全体にわたる安全なユーザーコンテキストの伝播</li>
        <li>シャドウユーザーや権限システムはありません</li>
      </ul>
  - type: security-gradient-banner
    headline: シャドウユーザーや権限システムがない
    body: >-
      Revealは、個別の認証または認可レイヤーを導入しません。既存のIDシステムが真実の源泉であり続け、権限のドリフトを防ぎ、アプリケーションと分析全体でアクセス制御を一貫させます。
    tags:
      - label: 単一の真実の源泉
      - label: 権限のドリフトなし
      - label: システム複雑性の低減
    image: >-
      https://static.infragistics.com/marketing/reveal/security/reveal-security-glowing-shield.svg
    imageAlt: 輝くシールドアイコン
  - type: feature-row
    headline: 監査可能性、監視、および運用上の可視性
    image: >-
      https://static.infragistics.com/marketing/reveal/security/reveal-security-monitoring-visibility-960.webp
    imageAlt: 監査可能性の監視と運用上の可視性
    imageSrcset:
      - media: '(max-width: 480px)'
        srcset: >-
          https://static.infragistics.com/marketing/reveal/security/reveal-security-monitoring-visibility-480.webp
      - media: '(max-width: 768px)'
        srcset: >-
          https://static.infragistics.com/marketing/reveal/security/reveal-security-monitoring-visibility-768.webp
      - media: '(max-width: 960px)'
        srcset: >-
          https://static.infragistics.com/marketing/reveal/security/reveal-security-monitoring-visibility-960.webp
      - media: '(max-width: 1100px)'
        srcset: >-
          https://static.infragistics.com/marketing/reveal/security/reveal-security-monitoring-visibility-1100.webp
      - media: '(min-width: 1101px)'
        srcset: >-
          https://static.infragistics.com/marketing/reveal/security/reveal-security-monitoring-visibility-1600.webp
    reversed: true
    slotContent: |
      <p>セキュリティチームは、分析が組み込まれていてもインサイトを失いません。</p>
      <ul class="list-checkmark blue-tick">
        <li>分析クエリ実行の可視性</li>
        <li>負荷がかかっても決定論的な動作</li>
        <li>既存のロギングおよび監視ツールとの互換性</li>
        <li>機密性の高い顧客データを公開せずにトラブルシューティング</li>
      </ul>
  - type: icon-grid
    eyebrow: コアアーキテクチャ
    headline: 設計によって制御されるセキュアなAI分析
    subhead: 分析におけるAIは、実験的であってはならず、統制される必要があります。
    cols: 4
    iconSize: 36
    cardTitleTag: p
    variant: white
    cards:
      - icon: >-
          https://static.infragistics.com/marketing/reveal/icons/reveal-icon-toggle-switches.svg
        iconAlt: 完全にオプトインのアイコン
        title: 完全なオプトイン
        body: AI機能はデフォルトで無効になっており、明示的に有効にする必要があります。スコープ、権限、使用状況はすべてのレベルで制御できます。
      - icon: >-
          https://static.infragistics.com/marketing/reveal/icons/reveal-icon-gear-2.svg
        iconAlt: テナントごとに設定可能なアイコン
        title: テナントごとに設定可能
        body: セキュリティ要件に合わせ、プライベートまたはオンプレミスのモデルを含む独自のLLMエンドポイントを使用して、テナントごとにAIを設定します。
      - icon: >-
          https://static.infragistics.com/marketing/reveal/icons/reveal-icon-data-sources-2.svg
        iconAlt: 制御されたデータアクセスアイコン
        title: 制御されたデータアクセス
        body: >-
          AIは、メタデータ、集計結果、またはスコープ化されたデータセットを使用して、権限モデルと統制されたデータアクセス内で動作し、制御をバイパスすることはありません。
      - icon: >-
          https://static.infragistics.com/marketing/reveal/icons/reveal-icon-blocked-2.svg
        iconAlt: サードパーティへの露出なしのアイコン
        title: サードパーティへの露出なし
        body: 明示的に設定されない限り、顧客データはサードパーティのAIサービスに送信されません。デフォルトでは、生の顧客データは送信されません。
    footnote: デフォルトでは、生の顧客データはサードパーティのAIサービスに送信されません。
  - type: feature-row
    headline: セキュリティリスクを低減するデプロイメントモデル
    videoSrc: >-
      https://static.infragistics.com/marketing/reveal/videos/analytics-cloud-hybrid.mp4
    videoPoster: >-
      https://static.infragistics.com/marketing/reveal/videos/analytics-cloud-hybrid-fallback-img.jpg
    reversed: false
    slotContent: |
      <ul class="list-checkmark blue-tick mb-3">
        <li>クラウドデプロイメント</li>
        <li>ハイブリッドアーキテクチャ</li>
        <li>完全にオンプレミス環境</li>
      </ul>
      <p class="mb-0">セキュリティに敏感なチームは、コントロールを維持するために最新の分析体験を妥協する必要はありません。</p>
  - type: feature-row
    headline: コンプライアンスとガバナンスの準備状況
    image: >-
      https://static.infragistics.com/marketing/reveal/security/reveal-security-compliance-goverance-badges-960.webp
    imageAlt: コンプライアンスおよびガバナンスバッジ
    imageSrcset:
      - media: '(max-width: 480px)'
        srcset: >-
          https://static.infragistics.com/marketing/reveal/security/reveal-security-compliance-goverance-badges-480.webp
      - media: '(max-width: 768px)'
        srcset: >-
          https://static.infragistics.com/marketing/reveal/security/reveal-security-compliance-goverance-badges-768.webp
      - media: '(max-width: 960px)'
        srcset: >-
          https://static.infragistics.com/marketing/reveal/security/reveal-security-compliance-goverance-badges-960.webp
      - media: '(max-width: 1100px)'
        srcset: >-
          https://static.infragistics.com/marketing/reveal/security/reveal-security-compliance-goverance-badges-1100.webp
      - media: '(min-width: 1101px)'
        srcset: >-
          https://static.infragistics.com/marketing/reveal/security/reveal-security-compliance-goverance-badges-1600.webp
    reversed: true
    slotContent: |
      <p class="font-weight-bold">Revealはアーキテクチャによってコンプライアンスをサポートします：</p>
      <ul class="list-checkmark blue-tick">
        <li>データレジデンシーと最小化のコントロール</li>
        <li>分析ツールとデータ所有権の明確な分離</li>
        <li>監査と監視のサポート</li>
        <li>制御された実行コンテキストによる決定論的なエクスポート</li>
      </ul>
      <p class="mt-3 mb-0">ダッシュボードからエクスポートまで、分析は安全に保たれます。</p>
  - type: blog-teaser
    headline: 組み込み分析のセキュリティユースケース
    headlineClass: mb-3
    subhead: 直感的でセルフサービス型の組み込み分析がなぜ重要なのかを学びましょう
    viewAllLabel: すべてのブログを見る
    viewAllUrl: /blogs
    anchor: blogs
    slugs:
      - security-with-embedded-analytics
      - scalable-analytics
      - embedded-analytics-for-saas-companies
  - type: faq
    headline: よくある質問
    anchor: faq
    multiopen: true
    items:
      - question: セキュリティの観点から見て、RevealはSaaSの組み込み分析ツールとどのように異なりますか？
        answer: >-
          <p><a href="/index">Reveal</a>
          外部のSaaSコンテナやiFrameを介するのではなく、SDKを介してアプリケーションアーキテクチャ内に組み込み分析を実現します。分析はセキュリティ境界内で実行され、認証、認可、テナント分離モデルを継承します。</p><p>対照的に、多くのSaaSベースの組み込み分析ツールはホストアプリケーションの外で動作し、サードパーティのデータ露出、不透明な実行パス、および限定的な監査可能性をもたらします。Revealは完全にそのモデルを回避し、セキュアな組み込み分析を後付けではなく、基本的な設計上の選択として実現します。</p>
        open: true
      - question: Revealはどこで実行され、誰がデータを制御しますか？
        answer: >-
          <p>Revealは、お客様のデータを所有することなく、お客様の既存のインフラストラクチャ、クラウド、ハイブリッド、または完全にセルフホスト環境内で実行されます。すべてのクエリは、お客様のアプリケーションによって強制されるのと同じセキュリティコンテキストを使用して、お客様の既存の
          <a href="/data-sources">データソース</a>,
          アプリケーションによって適用される同じセキュリティコンテキストを使用して。</p><p>Revealは、お客様の環境外で顧客データを複製、収益化、または保持しません。このアーキテクチャは、データ露出表面を拡大することなく、組み込み分析のセキュリティを保証します。</p>
      - question: Revealは顧客データをアクセスしたり保存したりしますか？
        answer: >-
          <p>番号</p><p>Revealは、顧客データを外部システムに永続化したり、分析をサードパーティサービス経由でルーティングしたりしません。実行、キャッシング、エクスポートは、お客様のデプロイメントモデルによって定義された管理された環境内で行われます。</p><p>このアプローチは、SaaS分析プラットフォームに伴う一般的なリスクを排除し、規制されたエンタープライズ環境における組み込み分析のセキュリティベストプラクティスに準拠しています。</p>
      - question: AI機能はテナントまたは環境によって無効にできますか？
        answer: >-
          <p>はい。</p><p>AI機能は、テナント、環境、またはデプロイメントの段階レベルで有効化または無効化できます。これにより、組織はガバナンス、コンプライアンス、リスク管理を維持しながら、AI分析を選択的に導入できます。</p>
      - question: Revealは完全にオンプレミスにデプロイできますか？
        answer: >-
          <p>はい。</p><p>Revealは完全にセルフホスト型のデプロイメントをサポートしており、組織が分析を完全に自社のセキュリティ境界内で実行できるようにします。これには、厳格な規制または主権要件を持つ環境が含まれ、〜に合致します。
          <a href="/on-prem-analytics">オンプレミス分析</a> セキュリティの期待。</p>
      - question: RevealはマルチテナントSaaSのセキュリティモデルをどのようにサポートしますか？
        answer: >-
          <p>Revealは、すべての分析リクエストでランタイムにおけるテナント分離を強制します。クエリ実行前にテナントコンテキストが明示的に伝播および検証されるため、設計上、クロステナントのデータアクセスを防ぎます。</p><p>共有実行レイヤーやグローバルクエリコンテキストは存在しません。このため、Revealは厳格なセキュリティ要件を持つB2B
          SaaSアプリケーションの顧客向けに適しています。 <a
          href="/embedded-analytics/index">組み込み分析</a> 厳格なセキュリティ要件を持つB2B
          SaaSアプリケーションにおいて。</p>
      - question: Revealは認証とIDの伝播をどのように処理しますか？
        answer: >-
          <p>Revealは、アプリケーションの認証モデルを継承し、並列のIDシステムを導入しません。ユーザーは、製品ですでに定義されている同じID、ロール、および権限を通じて分析にアクセスします。</p><p>SSO、OAuth、およびSAML統合がサポートされており、ダッシュボードやインタラクション全体で安全なユーザーコンテキストの伝播が可能です。これにより、ポリシーのドリフトが排除され、攻撃対象領域が減少します。</p>
      - question: Revealの組み込み分析におけるAIはどのように安全に処理されますか？
        answer: >-
          <p>RevealのAI機能はオプトインであり、分析データと同じ権限モデルによって管理されます。 <a
          href="/ai">AIを活用した分析</a>
          は定義されたアクセス制御内で動作し、お客様のセキュリティルールをバイパスすることはありません。</p><p>Revealは、プライベートおよびオンプレミス展開を含む、顧客が管理するAIモデルをサポートしています。デフォルトでは、生の顧客データはサードパーティのAIサービスに送信されないため、組み込み分析のAIセキュリティ懸念に直接対処します。</p>
      - question: RevealはGDPR、HIPAA、およびSOC 2のようなコンプライアンス要件をどのようにサポートしますか？
        answer: >-
          <p>Revealは、ボルトオンのコントロールではなく、アーキテクチャを通じてコンプライアンスをサポートします。データアクセス、レジデンシー、および最小化は、お客様の環境内で強制され、分析ツールとデータ所有権の間に明確な分離が保たれます。</p><p>監査、監視、および決定論的エクスポートは、規制レビューおよびエンタープライズ調達プロセスをサポートするように設計されています。</p>
      - question: セキュリティコントロールを有効にすることは、分析のパフォーマンスに影響しますか？
        answer: >-
          <p>番号</p><p>セキュリティの強制は、Revealの実行モデルの一部であり、上から重ねられたものではありません。認証、認可、テナント分離は決定論的に処理され、負荷がかかっても分析が応答性が高く予測可能であることを可能にします。</p>
      - question: セキュリティチームは、分析の動作をどのように監視および監査できますか？
        answer: >-
          <p>Revealは、既存のロギングおよび監視ツールと統合し、セキュリティチームが機密性の高い顧客データを公開することなく、分析の実行を監視できるようにします。</p><p>これにより、盲点や管理されていないシステムを導入することなく、トラブルシューティング、監査対応、および運用上の可視化が可能になります。</p>
  - type: inline-cta
    icon: 'https://static.infragistics.com/marketing/reveal/reveal-symbol.svg'
    iconAlt: Revealのシンボル
    headline: セキュリティCTAの見出し
    ctaLabel: パーソナライズされたデモを予約
seo:
  title: Revealによる組み込み分析のセキュリティ：お客様の分析、お客様の管理
  description: >-
    Revealの組み込み分析は、デフォルトで安全なアプローチで設計されており、お客様のデータとアプリケーションが保護され、安全であることを保証します。詳細はこちらをご覧ください！
  ogTitle: Revealによる組み込み分析のセキュリティ：お客様の分析、お客様の管理
  ogDescription: >-
    Revealの組み込み分析は、デフォルトで安全なアプローチで設計されており、お客様のデータとアプリケーションが保護され、安全であることを保証します。詳細はこちらをご覧ください！
  ogType: article
  twitterTitle: Revealによる組み込み分析のセキュリティ：お客様の分析、お客様の管理
  twitterDescription: >-
    Revealの組み込み分析は、デフォルトで安全なアプローチで設計されており、お客様のデータとアプリケーションが保護され、安全であることを保証します。詳細はこちらをご覧ください！
  ogImage: /images/2020/10/reveal-logo-gradient-1200x630-1.jpg
source_hash: ee60bc19
source_locale: en
---

