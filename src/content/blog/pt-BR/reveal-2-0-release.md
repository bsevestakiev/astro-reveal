---
title: 'Reveal 2.0: Construído para a forma como você realmente constrói hoje'
description: >-
  O Reveal 2.0 é uma modernização completa do Reveal Web SDK: sem dependência de
  jQuery, TypeScript-first, builds ESM e IIFE, instalação via npm ou CDN, novos
  conectores CosmosDB e ClickHouse, acessibilidade aprimorada e paridade de SDK
  para Node e Java em Preview.
date: '2026-06-04'
author: Casey Ciniello
cover: >-
  https://static.infragistics.com/marketing/reveal/blogs/launch/2026/may/reveal-new-release-2-0-header.jpg
heroImage: >-
  https://static.infragistics.com/marketing/reveal/blogs/what-is-self-service-bi/reveal-what-is-self-service-bi-header.svg
summary: >-
  O Reveal 2.0 moderniza o Reveal Web SDK para stacks de desenvolvimento atuais
  com arquitetura TypeScript-first, suporte moderno a módulos, acessibilidade
  melhorada e paridade de tempo de execução expandida em Node e Java em Preview.
takeaways:
  - O Reveal 2.0 remove a dependência de jQuery e moderniza o Web SDK
  - O suporte a TypeScript é de primeira classe com definições de tipo completas
  - >-
    Tanto os builds ESM quanto os IIFE estão disponíveis para sistemas de
    módulos modernos e legados
  - As equipes podem instalar via npm ou usar um CDN para prototipagem rápida
  - Novos conectores nativos para Azure CosmosDB e ClickHouse estão incluídos
  - >-
    Os SDKs Node e Java agora alcançam paridade de recursos de API com ASP.NET
    em Preview
categories:
  - Atualizações do Produto
tags:
  - Reveal 2.0
  - Web SDK
  - Análise incorporada
  - TypeScript
  - Experiência do Desenvolvedor
seo:
  title: 'Reveal 2.0: Construído para a forma como você realmente constrói hoje'
  description: >-
    O Reveal 2.0 é uma modernização completa do Reveal Web SDK: sem dependência
    de jQuery, TypeScript-first, builds ESM e IIFE, instalação via npm ou CDN,
    novos conectores CosmosDB e ClickHouse, acessibilidade aprimorada e paridade
    de SDK para Node e Java em Preview.
  ogTitle: 'Reveal 2.0: Construído para a forma como você realmente constrói hoje'
  ogDescription: >-
    O Reveal 2.0 é uma modernização completa do Reveal Web SDK: sem dependência
    de jQuery, TypeScript-first, builds ESM e IIFE, instalação via npm ou CDN,
    novos conectores CosmosDB e ClickHouse, acessibilidade aprimorada e paridade
    de SDK para Node e Java em Preview.
  ogType: article
  twitterTitle: 'Reveal 2.0: Construído para a forma como você realmente constrói hoje'
  twitterDescription: >-
    O Reveal 2.0 é uma modernização completa do Reveal Web SDK: sem dependência
    de jQuery, TypeScript-first, builds ESM e IIFE, instalação via npm ou CDN,
    novos conectores CosmosDB e ClickHouse, acessibilidade aprimorada e paridade
    de SDK para Node e Java em Preview.
  ogImage: >-
    https://static.infragistics.com/marketing/reveal/blogs/launch/2026/may/reveal-new-release-2-0-header.jpg
source_hash: e7089db5
source_locale: en
---
A maneira como as equipes constroem aplicações web mudou. Módulos substituíram tags de script. TypeScript se tornou o padrão. npm e bundlers modernos assumiram a instalação e o empacotamento. A maioria dos SDKs que os desenvolvedores procuram foi reescrita para acompanhar essa evolução.

A maioria deles.

Hoje, estamos lançando o Reveal 2.0, uma modernização completa do Reveal Web SDK. Sem dependência de jQuery. Escrito em TypeScript. Disponível com builds IIFE e ESM. Instalável via CDN ou npm. Os mesmos painéis, a mesma experiência do usuário final, em uma base que se encaixa perfeitamente em um pipeline de desenvolvimento de 2026.

![Reveal 2.0 manufacturing dashboard](https://static.infragistics.com/marketing/reveal/blogs/launch/2026/may/reveal-launch-2-0-manufacturing-dashboard-body-1.webp)

<h2 style="margin-bottom: 1rem;">O que há de novo no Reveal 2.0</h2>

- Um Web SDK moderno sem dependência de jQuery.
- TypeScript-first, com definições de tipo completas prontas para uso.
- Builds IIFE e ESM. Adicione o Reveal a qualquer sistema de módulos que seu aplicativo já utilize.
- Instale via CDN para prototipagem rápida, ou via npm para produção.
- Novo conector para Azure CosmosDB.
- Novo conector para ClickHouse.
- Acessibilidade melhorada em todo o SDK.
- SDKs para Node e Java agora com paridade de recursos de API com o SDK ASP.NET, disponíveis em Preview.

<h2 style="margin-bottom: 1rem;">Por que nós o reconstruímos</h2>

O Reveal 1.x funcionou. Ele ainda funciona. Mas qualquer pessoa que passou os últimos anos dentro de um projeto moderno Vite, webpack ou esbuild sabe a fricção que um SDK baseado em jQuery e tags de script só introduz. Ele não faz *tree-shake* de forma limpa. Ele complica o *server-side rendering*. Parece antigo nas avaliações em que os clientes estão decidindo em qual plataforma de análise incorporada apostar o produto deles.

Tínhamos duas opções: continuar cobrindo as emendas, ou reconstruir sobre a base onde nossos clientes realmente implantam. Escolhemos a segunda.

O Reveal 2.0 ainda faz tudo o que o Reveal sempre fez: painéis rápidos, bonitos e personalizáveis que você incorpora em seu produto. Mas agora ele se integra da maneira que os SDKs modernos deveriam.

<h2 style="margin-bottom: 1rem;">O que isso significa para você</h2>

Se você é um cliente existente do Reveal, seu caminho de atualização é simples. As mesmas APIs que você usa hoje ainda estão aqui. Publicamos um guia de migração de 1.x para 2.0 que detalha o que mudou e como atualizar sua integração. A maioria das equipes fará a transição em uma tarde.

Se você avaliou o Reveal há um ou dois anos e o SDK parecia defasado em relação ao seu *stack*, dê outra olhada. Os motivos que estavam no lado dos contras da sua planilha de avaliação agora estão no lado dos prós.

Se você é um líder de engenharia olhando para análise incorporada pela primeira vez, o Reveal 2.0 oferece um SDK que você pode adicionar a um projeto Next.js, React, Vue ou Angular, instalar com as mesmas ferramentas que você instala todo o resto, e enviar para produção sem bagagem legada.

<h2 style="margin-bottom: 1rem;">Multi-Runtime: Node e Java em Prévia</h2>

O Reveal sempre foi .NET-first. Com o Reveal 2.0, nossos SDKs para Node e Java agora têm paridade de recursos de API com o SDK ASP.NET, ambos disponíveis em Preview. O SDK Java é um SDK totalmente novo com uma API completamente moderna, um rompimento limpo com o SDK Java legado que enviamos anteriormente.

Se o seu produto roda em Node ou Java e você já teve que nos descartar porque não se encaixávamos no seu *stack*, isso não é mais o caso. Cadastre-se para acesso em Preview e diga-nos o que devemos aprimorar antes do GA.

<h2 style="margin-bottom: 1rem;">Mais Dados, Mais Acesso</h2>

Conector Azure CosmosDB: traga dados do CosmosDB para os painéis do Reveal diretamente, sem ETL manual ou *warehouses* intermediários.

Conector ClickHouse: para equipes que migraram a análise para um *stack* colunar moderno, seus painéis incorporados podem seguir.

Melhorias de acessibilidade: O Reveal 2.0 facilita o envio de painéis em ambientes onde a conformidade WCAG não é negociável. Converse conosco sobre requisitos de aquisição específicos com os quais você está trabalhando. Podemos ajudar você a mapear nossa cobertura para sua lista de verificação.

O Reveal 2.0 é a versão que gostaríamos de usar se estivéssemos construindo um produto de análise incorporada para o nosso próprio SaaS hoje. Achamos que você sentirá o mesmo.
