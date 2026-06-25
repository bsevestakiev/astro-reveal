---
title: Reveal BI가 임베디드 분석 데이터를 보호하는 방법
description: '여러 인증 방법, 데이터 로컬 캐싱 및 기타 기능을 포함하는 Reveal 임베디드 BI 플랫폼으로 데이터를 보호하는 방법을 알아보세요.'
date: '2019-07-15'
author: Casey Ciniello
cover: /images/2020/10/business_2D00_intelligence_2D00_reveal_2D00_security.jpg
summary: >-
  Reveal 임베디드 비즈니스 인텔리전스 플랫폼은 여러 인증 방법, 서버 및 데이터베이스로의 쿼리 전송을 최소화하기 위한 데이터 로컬 캐싱
  및 기타 기능을 포함하는 클라우드 아키텍처를 기반으로 합니다. 이 블로그에서 이를 탐구해 보겠습니다. 인증 Reveal Cloud 인증은
  OpenID Connect (OIDC) 표준을 사용합니다. Identity Service 구성 요소는 안전한 인증을 제공합니다. [...]
categories:
  - 기술 통찰력
seo:
  title: Reveal BI가 임베디드 분석 데이터를 보호하는 방법 - Reveal BI
  description: '여러 인증 방법, 데이터 로컬 캐싱 및 기타 기능을 포함하는 Reveal 임베디드 BI 플랫폼으로 데이터를 보호하는 방법을 알아보세요.'
  ogTitle: Reveal BI가 임베디드 분석 데이터를 보호하는 방법 - Reveal BI
  ogDescription: '여러 인증 방법, 데이터 로컬 캐싱 및 기타 기능을 포함하는 Reveal 임베디드 BI 플랫폼으로 데이터를 보호하는 방법을 알아보세요.'
  ogType: article
  twitterTitle: Reveal BI가 임베디드 분석 데이터를 보호하는 방법 - Reveal BI
  twitterDescription: '여러 인증 방법, 데이터 로컬 캐싱 및 기타 기능을 포함하는 Reveal 임베디드 BI 플랫폼으로 데이터를 보호하는 방법을 알아보세요.'
  ogImage: /images/2020/10/business_2D00_intelligence_2D00_reveal_2D00_security.jpg
source_hash: 35aba7c1
source_locale: en
---
Reveal 임베디드 비즈니스 인텔리전스 플랫폼은 여러 인증 방법을 포함하고, 서버 및 데이터베이스로의 쿼리 전송을 최소화하기 위한 로컬 데이터 캐싱 등을 포함하는 클라우드 아키텍처를 기반으로 합니다. 이 블로그에서 이에 대해 자세히 알아 보겠습니다.

## 인증

Reveal Cloud 인증은 OpenID Connect (OIDC) 표준을 사용합니다. Identity Service 구성 요소는 Google, Office 365 및 Infragistics 계정을 포함한 여러 인증 소스에 대해 안전한 인증을 제공합니다.

Reveal은 아래 다이어그램에서 Microsoft를 사용한 인증을 강조하여 볼 수 있듯이 OIDC 인증의 표준 흐름을 따릅니다.

![Reveal Cloud authentication ](/images/2020/10/5125.Security-Blog-Authentication-Flow.png)

Reveal은 인증 제공업체(Google, Microsoft 또는 Infragistics)가 제공하는 페이지에 입력되는 사용자 자격 증명에 절대 접근하지 않는다는 점에 유의하십시오. 인증 제공업체는 그런 다음 액세스 코드(4단계)와 함께 사용자를 Reveal로 리디렉션합니다. Reveal은 그런 다음 이 코드를 사용하여 사용자 식별에 사용되는 이메일 주소와 Google 계정의 Google Drive 또는 Microsoft O365 계정의 SharePoint 및 OneDrive를 포함하여 다른 서비스에 액세스하는 데 사용될 토큰과 같은 사용자 정보를 가져옵니다.

### 데이터 소스 인증

Reveal은 다음과 같은 여러 데이터 소스를 지원합니다:

- 관계형 데이터베이스—MS SQL Server, MySQL 및 기타
- 데이터 파일—Google Drive, Dropbox 및 기타의 CSV, Excel, JSON
- 클라우드 서비스—Salesforce, Dynamics CRM 및 기타

이러한 데이터 소스 중 어느 것을 인증하는 것은 제공업체에 따라 달라지며, 일반적으로 각각 다른 인증 방법을 필요로 합니다. Reveal은 네 가지 유형의 인증을 지원합니다:

1. 익명(Anonymous)
2. 사용자/비밀번호(User/password)
3. NTLM: 사용자, 비밀번호 및 도메인
4. OAuth v2

### OAuth 데이터 소스

Google Drive, Dropbox, OneDrive 등 OAuth를 지원하는 제공업체의 경우, Reveal은 사용자를 해당 데이터 제공업체가 제공하는 인증 페이지로 리디렉션하여 데이터 액세스 권한을 요청합니다. 아래에서 확인할 수 있습니다:

![ Reveal authentication with OAuth Data Sources ](/images/2020/10/OAuth-Data-Sources-Diagram-Security-BLog.png)

>
이 과정은 이전에 논의한 OIDC와 유사합니다. 인증이 완료되면, Reveal은 사용자를 대신하여 모든 지원되는 플랫폼에서 데이터에 액세스하기 위해 인증 토큰을 저장합니다.

### 데이터 보안

성능 향상을 위해 Reveal은 캐시된 데이터를 장치에 로컬로 저장하여 서버 또는 데이터베이스로 전송되는 쿼리 수를 최소화합니다. 데이터 소스에 액세스하기 위한 자격 증명도 데이터 소스가 처음 구성되거나 사용될 때만 요청되기 때문에 장치에 저장됩니다.

데이터의 힘을 활용하세요

실시간 컨텍스트 데이터로 비즈니스를 성장시키세요.

[데모 요청](/request-demo)
