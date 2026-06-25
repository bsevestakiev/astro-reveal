---
title: 'Reveal을 사용한 임베디드 분석 보안: 귀하의 분석, 귀하의 통제'
description: >-
  Reveal 임베디드 분석은 기본적으로 안전한 접근 방식을 염두에 두고 설계되어, 귀하의 데이터와 애플리케이션이 안전하게 보호되도록
  보장합니다. 더 알아보기!
cover: /images/2020/10/reveal-logo-gradient-1200x630-1.jpg
sections:
  - type: dark-hero
    variant: gradient-split
    title: 임베디드 분석 보안
    subhead: >-
      <p class="lead mb-3">임베디드 분석 및 AI 기반 인사이트를 위한 엔터프라이즈급 보안</p><p
      class="mb-4">Reveal은 데이터를 타사 SaaS 플랫폼, 취약한 iFrame 아키텍처 또는 통제되지 않은 AI 모델에
      노출하지 않도록 설계된, 보안 우선 SaaS 및 규제 환경을 위한 임베디드 분석을 제공합니다.</p>
    ctaLabel: 개인 맞춤 데모 예약
    ctaHref: '#'
    image: >-
      https://static.infragistics.com/marketing/reveal/security/reveal-security-compliance-badges-hero-960.webp
    imageAlt: Reveal 임베디드 분석 보안 히어로
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
    headline: 임베디드 분석 보안이 중요한 이유
    subhead: 분석을 임베딩하는 것은 단순히 UI 결정이 아닙니다. 이는 보안 및 아키텍처 문제입니다.
    subhead2: >-
      분석이 고객에게 노출될 때, 애플리케이션의 공격 표면이 확장됩니다. 데이터 액세스, ID 전파, 테넌트 격리, 그리고 AI 거버넌스
      모두 중요한 설계 고려 사항이 됩니다.
    cols: 3
    variant: white
    cards:
      - icon: >-
          https://static.infragistics.com/marketing/reveal/icons/reveal-icon-data-sovereignty.svg
        iconAlt: 데이터 주권 아이콘
        title: 데이터 주권
        body: Reveal은 쿼리 실행 시 테넌트 격리를 강제하여 공유 환경에서 테넌트 간 데이터 액세스를 방지합니다.
      - icon: >-
          https://static.infragistics.com/marketing/reveal/icons/reveal-icon-ai.svg
        iconAlt: AI 컨텍스트 제어 아이콘
        title: AI 컨텍스트 제어
        body: 'Reveal은 AI가 거버넌스된 데이터에만 액세스하도록 제한하여, 프롬프트 주입 및 무단 데이터 노출 위험을 줄입니다.'
      - icon: >-
          https://static.infragistics.com/marketing/reveal/icons/reveal-icon-shield-checkmark.svg
        iconAlt: 규정 준수 준비 아이콘
        title: 규정 준수 준비
        body: >-
          Reveal은 통제된 데이터 액세스, 감사 및 유연한 배포 모델을 통해 GDPR, HIPAA, SOC 2 요구 사항을
          지원합니다.
    footnote: >-
      B2B SaaS 및 규제 산업의 경우, 보안 실패는 단순히 규정 준수에 영향을 미치는 것을 넘어, 고객 신뢰를 저하시키고, 이탈
      위험을 증가시키며, 엔터프라이즈 도입을 늦춥니다.
    footnoteClass: mt-3 text-muted
  - type: security-risk-table
    headline: 임베디드 분석의 일반적인 보안 위험과 Reveal이 이를 완화하는 방법
    rows:
      - risk: <strong class="text-red-600">약한 격리</strong>로 인한 테넌트 간 데이터 액세스
        category: 테넌트 격리
        mitigation: 요청 시 <strong>쿼리 실행</strong>에서 테넌트 컨텍스트가 강제됩니다
      - risk: 분석 및 애플리케이션 전반에 걸친 일관성 없는 <strong>인증</strong>
        category: 인증 모델
        mitigation: <strong>병렬 사용자 시스템이 없는</strong> 기존 인증 모델을 상속받습니다
      - risk: iFrame을 통해 귀하의 보안 경계 <strong>외부에서 실행되는</strong> 분석
        category: 임베딩 아키텍처
        mitigation: 외부 컨테이너가 아닌 <strong>SDK</strong>를 통해 애플리케이션 내부에서 실행됩니다
      - risk: <strong>제한되지 않거나 민감한 데이터에 접근하는</strong> AI
        category: AI 접근 제어
        mitigation: AI는 귀하의 <strong>권한 모델</strong> 및 접근 제어 내에서 작동합니다
      - risk: <strong>규정 준수 요구 사항을 충족하지 못하는</strong> 분석 도구
        category: 규정 준수 정렬
        mitigation: '아키텍처를 통해 <strong>GDPR, HIPAA 및 SOC 2</strong>를 지원합니다'
  - type: security-arch-cards
    eyebrow: 핵심 아키텍처
    headline: Reveal의 임베디드 분석 보안 아키텍처
    subhead: >-
      Reveal은 외부 SaaS 컨테이너나 iFrame을 사용하지 않고 SDK를 사용하여 애플리케이션에 직접 임베딩하여 보안 팀에 완전한
      운영 가시성을 제공합니다.
    cards:
      - icon: >-
          https://static.infragistics.com/marketing/reveal/icons/reveal-icon-sdk.svg
        iconAlt: SDK 우선 통합 아이콘
        title: SDK 우선 통합
        intro: 애플리케이션의 보안 모델 및 인프라 내에서 작동하도록 구축되었습니다.
        items:
          - 애플리케이션의 보안 및 배포 모델 내에서 작동합니다
          - 고객 데이터 소유 또는 수익화 안 함
          - '인증, 권한 부여 및 데이터 액세스는 귀하의 통제 하에 유지됩니다'
          - 보안을 희생하지 않는 배포 유연성
      - icon: >-
          https://static.infragistics.com/marketing/reveal/icons/reveal-icon-security-2.svg
        iconAlt: 운영 보안 아이콘
        title: 운영 보안 및 인프라 안전
        intro: 'Reveal은 엔터프라이즈 환경 내에서 깨끗하게 작동하도록 설계되었습니다:'
        items:
          - '기존 프록시, 로드 밸런서 및 게이트웨이와 호환됩니다'
          - 공개되지 않은 데이터 전송이 없는 명시적이고 구성 가능한 종속성
          - 리버스 프록시 및 엔터프라이즈 방화벽 뒤에서 실행하도록 설계되었습니다
  - type: feature-row
    headline: '인증, 권한 부여 및 데이터 액세스 제어'
    image: >-
      https://static.infragistics.com/marketing/reveal/security/reveal-security-access-control-960.webp
    imageAlt: 인증 및 데이터 액세스 제어
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
      <p>Reveal은 기존 보안 모델을 강제하며, 이를 대체하지 않습니다.</p>
      <ul class="list-checkmark blue-tick">
        <li>SSO, OAuth, 및 SAML 통합</li>
        <li>역할 기반 및 행 수준 보안은 호스트 애플리케이션에서 상속됩니다.</li>
        <li>분석 상호 작용 전반에 걸쳐 안전한 사용자 컨텍스트 전파</li>
        <li>섀도우 사용자 또는 권한 시스템 없음</li>
      </ul>
  - type: security-gradient-banner
    headline: 섀도우 사용자 또는 권한 시스템 없음
    body: >-
      Reveal은 별도의 인증 또는 권한 부여 계층을 도입하지 않습니다. 기존 ID 시스템이 진실의 원천으로 남아, 권한 드리프트를
      방지하고 애플리케이션 및 분석 전반에 걸쳐 액세스 제어를 일관되게 유지합니다.
    tags:
      - label: 단일 진실의 원천
      - label: 권한 드리프트 없음
      - label: 시스템 복잡성 감소
    image: >-
      https://static.infragistics.com/marketing/reveal/security/reveal-security-glowing-shield.svg
    imageAlt: 빛나는 방패 아이콘
  - type: feature-row
    headline: '감사 가능성, 모니터링 및 운영 가시성'
    image: >-
      https://static.infragistics.com/marketing/reveal/security/reveal-security-monitoring-visibility-960.webp
    imageAlt: 감사 가능성 모니터링 및 운영 가시성
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
      <p>보안 팀은 분석이 임베디드되어도 통찰력을 잃지 않습니다.</p>
      <ul class="list-checkmark blue-tick">
        <li>분석 쿼리 실행에 대한 가시성</li>
        <li>부하 조건에서의 결정론적 동작</li>
        <li>기존 로깅 및 모니터링 도구와의 호환성</li>
        <li>민감한 고객 데이터를 노출하지 않고 문제 해결</li>
      </ul>
  - type: icon-grid
    eyebrow: 핵심 아키텍처
    headline: 설계 단계부터 고객이 통제하는 보안 AI 분석
    subhead: 분석에서 AI는 실험적이지 않고 거버넌스되어야 합니다.
    cols: 4
    iconSize: 36
    cardTitleTag: p
    variant: white
    cards:
      - icon: >-
          https://static.infragistics.com/marketing/reveal/icons/reveal-icon-toggle-switches.svg
        iconAlt: 완전 옵트인 아이콘
        title: 완전 옵트인
        body: 'AI 기능은 기본적으로 비활성화되며 명시적으로 활성화해야 합니다. 모든 수준에서 범위, 권한 및 사용을 제어합니다.'
      - icon: >-
          https://static.infragistics.com/marketing/reveal/icons/reveal-icon-gear-2.svg
        iconAlt: 테넌트별 구성 아이콘
        title: 테넌트별 구성
        body: 보안 요구 사항에 맞춰 개인 또는 온프레미스 모델을 포함하여 자체 LLM 엔드포인트를 사용하여 테넌트별 AI를 구성합니다.
      - icon: >-
          https://static.infragistics.com/marketing/reveal/icons/reveal-icon-data-sources-2.svg
        iconAlt: 제어된 데이터 액세스 아이콘
        title: 제어된 데이터 액세스
        body: >-
          AI는 메타데이터, 집계된 결과 또는 범위가 지정된 데이터 세트를 사용하여 귀하의 권한 모델 및 거버넌스된 데이터 액세스
          내에서 작동하며, 제어를 우회하지 않습니다.
      - icon: >-
          https://static.infragistics.com/marketing/reveal/icons/reveal-icon-blocked-2.svg
        iconAlt: 제3자 노출 없음 아이콘
        title: 제3자 노출 없음
        body: >-
          명시적으로 구성하지 않는 한, 고객 데이터는 제3자 AI 서비스로 전송되지 않습니다. 기본적으로 원시 고객 데이터는 전송되지
          않습니다.
    footnote: 기본적으로 원시 고객 데이터는 제3자 AI 서비스로 전송되지 않습니다.
  - type: feature-row
    headline: 보안 위험을 줄이는 배포 모델
    videoSrc: >-
      https://static.infragistics.com/marketing/reveal/videos/analytics-cloud-hybrid.mp4
    videoPoster: >-
      https://static.infragistics.com/marketing/reveal/videos/analytics-cloud-hybrid-fallback-img.jpg
    reversed: false
    slotContent: |
      <ul class="list-checkmark blue-tick mb-3">
        <li>클라우드 배포</li>
        <li>하이브리드 아키텍처</li>
        <li>완전 온프레미스 환경</li>
      </ul>
      <p class="mb-0">보안에 민감한 팀은 통제를 유지하기 위해 현대적인 분석 경험을 희생할 필요가 없습니다.</p>
  - type: feature-row
    headline: 규정 준수 및 거버넌스 준비 상태
    image: >-
      https://static.infragistics.com/marketing/reveal/security/reveal-security-compliance-goverance-badges-960.webp
    imageAlt: 규정 준수 및 거버넌스 배지
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
      <p class="font-weight-bold">Reveal은 아키텍처를 통해 규정 준수를 지원합니다:</p>
      <ul class="list-checkmark blue-tick">
        <li>데이터 거주지 및 최소화 제어</li>
        <li>분석 도구와 데이터 소유권의 명확한 분리</li>
        <li>감사 및 모니터링 지원</li>
        <li>제어된 실행 컨텍스트를 사용한 결정론적 내보내기</li>
      </ul>
      <p class="mt-3 mb-0">대시보드부터 내보내기까지 분석은 안전하게 유지됩니다.</p>
  - type: blog-teaser
    headline: 임베디드 분석 보안 사용 사례
    headlineClass: mb-3
    subhead: 직관적이고 셀프 서비스가 가능한 임베디드 분석이 왜 중요한지 알아보세요
    viewAllLabel: 모든 블로그 보기
    viewAllUrl: /blogs
    anchor: blogs
    slugs:
      - security-with-embedded-analytics
      - scalable-analytics
      - embedded-analytics-for-saas-companies
  - type: faq
    headline: 자주 묻는 질문
    anchor: faq
    multiopen: true
    items:
      - question: 보안 관점에서 Reveal은 SaaS 임베디드 분석 도구와 어떻게 다릅니까?
        answer: >-
          <p><a href="/index">Reveal</a> 외부 SaaS 컨테이너나 iFrame을 통하지 않고, 애플리케이션
          아키텍처 내에서 SDK를 통해 임베디드 분석을 구현합니다. 분석은 귀하의 보안 경계 내에서 실행되며, 귀하의 인증, 권한 부여
          및 테넌트 격리 모델을 상속받습니다.</p><p>반면, 많은 SaaS 기반 임베디드 분석 도구는 호스트 애플리케이션 외부에서
          작동하여, 제3자 데이터 노출, 불투명한 실행 경로, 제한적인 감사 가능성을 초래합니다. Reveal은 그러한 모델을 완전히
          회피하여, 안전한 임베디드 분석을 사후 고려 사항이 아닌 근본적인 설계 선택으로 만듭니다.</p>
        open: true
      - question: 'Reveal은 어디에서 실행되며, 누가 데이터를 제어합니까?'
        answer: >-
          <p>Reveal은 고객 데이터 소유권을 가져가지 않고, 고객의 인프라, 클라우드, 하이브리드 또는 완전 자체 호스팅 환경
          내에서 실행됩니다. 모든 쿼리는 귀하의 기존 <a href="/data-sources">데이터 소스</a>을 사용하여
          실행되며, 귀하의 애플리케이션이 적용하는 동일한 보안 컨텍스트를 사용합니다.</p><p>Reveal은 고객 데이터를 복제,
          수익화 또는 귀하의 환경 외부에서 보관하지 않습니다. 이 아키텍처는 데이터 노출 표면을 확장하지 않으면서 임베디드 분석 보안을
          보장합니다.</p>
      - question: Reveal은 고객 데이터를 접근하거나 저장합니까?
        answer: >-
          <p>번호</p><p>Reveal은 고객 데이터를 외부 시스템에 저장하거나 분석을 타사 서비스를 통해 라우팅하지 않습니다.
          실행, 캐싱 및 내보내기는 배포 모델에 의해 정의된 통제된 환경 내에서 발생합니다.</p><p>이 접근 방식은 SaaS 분석
          플랫폼과 관련된 일반적인 위험을 제거하고 규제 및 엔터프라이즈 환경을 위한 임베디드 분석 보안 모범 사례와 일치합니다.</p>
      - question: AI 기능은 테넌트 또는 환경에서 비활성화할 수 있습니까?
        answer: >-
          <p>예.</p><p>AI 기능은 테넌트, 환경 또는 배포 단계별로 활성화하거나 비활성화할 수 있습니다. 이를 통해 조직은
          거버넌스, 규정 준수 및 위험 통제를 유지하면서 AI 분석을 선택적으로 도입할 수 있습니다.</p>
      - question: Reveal은 온프레미스에 완전히 배포될 수 있습니까?
        answer: >-
          <p>예.</p><p>Reveal은 완전히 자체 호스팅 배포를 지원하여 조직이 분석을 보안 경계 내에서 완전히 실행할 수
          있도록 합니다. 여기에는 엄격한 규제 또는 주권 요구 사항이 있는 환경이 포함되며, <a
          href="/on-prem-analytics">온프레미스 분석</a> 보안 기대치와 일치합니다.</p>
      - question: Reveal은 멀티테넌트 SaaS 보안 모델을 어떻게 지원합니까?
        answer: >-
          <p>Reveal은 모든 분석 요청에 대해 런타임에서 테넌트 격리를 강제합니다. 쿼리 실행 전에 테넌트 컨텍스트가 명시적으로
          전파 및 검증되어 설계상 크로스 테넌트 데이터 접근을 방지합니다.</p><p>공유 실행 계층이나 전역 쿼리 컨텍스트가
          없습니다. 이로 인해 Reveal은 엄격한 보안 요구 사항을 가진 고객 대면의 멀티테넌트 B2B SaaS 애플리케이션에
          적합합니다. <a href="/embedded-analytics/index">임베디드 분석</a> B2B SaaS
          애플리케이션에서 엄격한 보안 요구 사항을 가진 고객 대면의 멀티테넌트</p>
      - question: Reveal은 인증 및 ID 전파를 어떻게 처리합니까?
        answer: >-
          <p>Reveal은 애플리케이션의 인증 모델을 상속받으며 별도의 ID 시스템을 도입하지 않습니다. 사용자는 제품에 이미 정의된
          동일한 ID, 역할 및 권한을 통해 분석에 접근합니다.</p><p>SSO, OAuth 및 SAML 통합을 지원하며, 대시보드
          및 상호 작용 전반에 걸쳐 안전한 사용자 컨텍스트 전파가 이루어집니다. 이를 통해 정책 드리프트를 제거하고 공격 표면을 줄일
          수 있습니다.</p>
      - question: Reveal의 임베디드 분석에서 AI는 어떻게 안전하게 처리됩니까?
        answer: >-
          <p>Reveal의 AI 기능은 옵트인 방식이며 분석 데이터와 동일한 권한 모델의 적용을 받습니다. <a
          href="/ai">AI 기반 분석</a> 정의된 접근 제어 내에서 작동하며 귀하의 보안 규칙을 절대 우회하지
          않습니다.</p><p>Reveal은 사설 및 온프레미스 배포를 포함하여 고객이 제어하는 AI 모델을 지원합니다. 기본적으로,
          원시 고객 데이터는 제3자 AI 서비스로 전송되지 않아 임베디드 분석 AI 보안 문제를 직접적으로 해결합니다.</p>
      - question: 'Reveal은 GDPR, HIPAA, SOC 2와 같은 규정 준수 요구 사항을 어떻게 지원합니까?'
        answer: >-
          <p>Reveal은 추가적인 제어 장치보다는 아키텍처를 통해 규정 준수를 지원합니다. 데이터 액세스, 거주지, 최소화는 귀하의
          환경 내에서 강제되며, 분석 도구와 데이터 소유권 사이에 명확한 분리가 이루어집니다.</p><p>감사, 모니터링 및 결정론적
          내보내기는 규제 검토 및 기업 조달 프로세스를 지원하도록 설계되었습니다.</p>
      - question: 보안 제어 활성화가 분석 성능에 영향을 미칩니까?
        answer: >-
          <p>번호</p><p>보안 강제는 Reveal의 실행 모델의 일부이며, 그 위에 추가되는 것이 아닙니다. 인증, 권한 부여 및
          테넌트 격리는 결정론적으로 처리되어, 분석이 부하 상태에서도 응답성이 있고 예측 가능하도록 합니다.</p>
      - question: 보안 팀은 분석 동작을 어떻게 모니터링하고 감사할 수 있습니까?
        answer: >-
          <p>Reveal은 기존 로깅 및 모니터링 도구와 통합되어 보안 팀이 민감한 고객 데이터를 노출하지 않고 분석 실행을 관찰할
          수 있도록 합니다.</p><p>이를 통해 사각지대나 관리되지 않는 시스템을 도입하지 않으면서 문제 해결, 감사 준비 및 운영
          가시성을 확보할 수 있습니다.</p>
  - type: inline-cta
    icon: 'https://static.infragistics.com/marketing/reveal/reveal-symbol.svg'
    iconAlt: Reveal 심볼
    headline: 보안 CTA 헤드라인
    ctaLabel: 개인 맞춤 데모 예약
seo:
  title: 'Reveal을 사용한 임베디드 분석 보안: 귀하의 분석, 귀하의 통제'
  description: >-
    Reveal 임베디드 분석은 기본적으로 안전한 접근 방식을 염두에 두고 설계되어, 귀하의 데이터와 애플리케이션이 안전하게 보호되도록
    보장합니다. 더 알아보기!
  ogTitle: 'Reveal을 사용한 임베디드 분석 보안: 귀하의 분석, 귀하의 통제'
  ogDescription: >-
    Reveal 임베디드 분석은 기본적으로 안전한 접근 방식을 염두에 두고 설계되어, 귀하의 데이터와 애플리케이션이 안전하게 보호되도록
    보장합니다. 더 알아보기!
  ogType: article
  twitterTitle: 'Reveal을 사용한 임베디드 분석 보안: 귀하의 분석, 귀하의 통제'
  twitterDescription: >-
    Reveal 임베디드 분석은 기본적으로 안전한 접근 방식을 염두에 두고 설계되어, 귀하의 데이터와 애플리케이션이 안전하게 보호되도록
    보장합니다. 더 알아보기!
  ogImage: /images/2020/10/reveal-logo-gradient-1200x630-1.jpg
source_hash: ee60bc19
source_locale: en
---

