---
title: Como o Reveal BI Protege Seus Dados de Análise Incorporada
description: >-
  Saiba como proteger seus dados com a plataforma embedded BI Reveal, que inclui
  múltiplos métodos de autenticação, cache local de dados e muito mais.
date: '2019-07-15'
author: Casey Ciniello
cover: /images/2020/10/business_2D00_intelligence_2D00_reveal_2D00_security.jpg
summary: >-
  A plataforma de inteligência de negócios incorporada Reveal é baseada em uma
  arquitetura em nuvem que inclui múltiplos métodos de autenticação, cache local
  de dados para minimizar o envio de consultas para servidores e bancos de
  dados, e muito mais. Exploraremos isso neste blog. A autenticação do Reveal
  usa o padrão OpenID Connect (OIDC). O componente Identity Service fornece
  autenticação segura [&hellip;]
categories:
  - Insights Técnicos
seo:
  title: Como o Reveal BI Protege Seus Dados de Análise Incorporada - Reveal BI
  description: >-
    Saiba como proteger seus dados com a plataforma embedded BI Reveal, que
    inclui múltiplos métodos de autenticação, cache local de dados e muito mais.
  ogTitle: Como o Reveal BI Protege Seus Dados de Análise Incorporada - Reveal BI
  ogDescription: >-
    Saiba como proteger seus dados com a plataforma embedded BI Reveal, que
    inclui múltiplos métodos de autenticação, cache local de dados e muito mais.
  ogType: article
  twitterTitle: Como o Reveal BI Protege Seus Dados de Análise Incorporada - Reveal BI
  twitterDescription: >-
    Saiba como proteger seus dados com a plataforma embedded BI Reveal, que
    inclui múltiplos métodos de autenticação, cache local de dados e muito mais.
  ogImage: /images/2020/10/business_2D00_intelligence_2D00_reveal_2D00_security.jpg
source_hash: 35aba7c1
source_locale: en
---
A plataforma de inteligência de negócios incorporada Reveal é baseada em uma arquitetura em nuvem que inclui múltiplos métodos de autenticação, cache local de dados para minimizar o envio de consultas a servidores e bancos de dados, e muito mais. Exploraremos tudo isso neste blog.

## Autenticação

A autenticação do Reveal Cloud usa o padrão OpenID Connect (OIDC). O componente Identity Service fornece autenticação segura contra múltiplas fontes de autenticação, incluindo contas Google, Office 365 e Infragistics.

O Reveal segue o fluxo padrão para autenticação OIDC, como você pode ver no diagrama abaixo que destaca a autenticação usando Microsoft.

![Reveal Cloud authentication ](/images/2020/10/5125.Security-Blog-Authentication-Flow.png)

Observe que o Reveal nunca tem acesso às credenciais do usuário, pois elas são inseridas em uma página fornecida pelo provedor de autenticação (Google, Microsoft ou Infragistics). O provedor de autenticação então redireciona o usuário para o Reveal com um código de acesso (etapa 4). O Reveal então usa este código para obter informações do usuário, como o endereço de e-mail que identifica o usuário, e tokens que serão usados para acessar outros serviços, incluindo Google Drive para contas Google ou SharePoint e OneDrive para contas Microsoft O365.

### Autenticação de Fontes de Dados

O Reveal suporta múltiplas fontes de dados, tais como:

- Bancos de dados relacionais—MS SQL Server, MySQL e outros
- Arquivos de dados—CSV, Excel e JSON do Google Drive, Dropbox e outros
- Serviços em nuvem—Salesforce, Dynamics CRM e mais

Autenticar qualquer uma dessas fontes de dados depende do provedor e cada uma geralmente requer um método de autenticação diferente. O Reveal suporta quatro tipos de autenticação:

1. Anônimo
2. Usuário/senha
3. NTLM: usuário, senha e domínio
4. OAuth v2

### Fontes de Dados OAuth

Para provedores que suportam OAuth, como Google Drive, Dropbox, OneDrive e outros, o Reveal redirecionará os usuários para a página de autenticação fornecida pelo provedor de dados, solicitando permissão para acessar seus dados. Você pode ver isso abaixo:

![ Reveal authentication with OAuth Data Sources ](/images/2020/10/OAuth-Data-Sources-Diagram-Security-BLog.png)

“>

O processo é semelhante ao que discutimos anteriormente com OIDC. Assim que a autenticação for concluída, o Reveal armazenará os tokens de autenticação para acessar os dados em nome do usuário em todas as plataformas suportadas.

### Segurança de Dados

Para melhorar o desempenho, o Reveal armazena dados em cache localmente no dispositivo, minimizando assim o número de consultas enviadas ao servidor ou banco de dados. As credenciais para acessar fontes de dados também são armazenadas no dispositivo, pois são solicitadas apenas quando a fonte de dados é configurada ou usada pela primeira vez.

Aproveite o Poder dos Dados

Faça crescer seu negócio com dados contextuais e em tempo real.

[Solicitar uma Demo](/request-demo)
