---
title: 'Reveal 1.7.0: Paginação no Lado do Servidor, Linhas Fixas e Mais'
description: >-
  Estamos entusiasmados em anunciar o mais recente lançamento do Reveal, repleto
  de novos recursos poderosos projetados para aprimorar suas capacidades
  analíticas, ao mesmo tempo que o mantêm informado sobre mudanças críticas de
  quebra que podem impactar suas aplicações.
date: '2024-09-30'
author: Casey Ciniello
cover: /images/2024/09/reveal-sept-2024-1.7-release-header.jpg
heroImage: /images/2024/10/reveal-new-release-1-7-header.svg
summary: >-
  Estamos entusiasmados em anunciar o mais recente lançamento do Reveal, repleto
  de novos recursos poderosos projetados para aprimorar suas capacidades
  analíticas, ao mesmo tempo que o mantêm informado sobre mudanças críticas de
  quebra que podem impactar suas aplicações.
categories:
  - Atualizações do Produto
seo:
  title: >-
    Reveal 1.7.0: Paginação no Lado do Servidor, Linhas Fixas e Mais | Análise
    Incorporada Reveal
  description: >-
    Estamos entusiasmados em anunciar o mais recente lançamento do Reveal,
    repleto de novos recursos poderosos projetados para aprimorar suas
    capacidades analíticas, ao mesmo tempo que o mantêm informado sobre mudanças
    críticas de quebra que podem impactar suas aplicações.
  ogTitle: >-
    Reveal 1.7.0: Paginação no Lado do Servidor, Linhas Fixas e Mais | Análise
    Incorporada Reveal
  ogDescription: >-
    Estamos entusiasmados em anunciar o mais recente lançamento do Reveal,
    repleto de novos recursos poderosos projetados para aprimorar suas
    capacidades analíticas, ao mesmo tempo que o mantêm informado sobre mudanças
    críticas de quebra que podem impactar suas aplicações.
  ogType: article
  twitterTitle: >-
    Reveal 1.7.0: Paginação no Lado do Servidor, Linhas Fixas e Mais | Análise
    Incorporada Reveal
  twitterDescription: >-
    Estamos entusiasmados em anunciar o mais recente lançamento do Reveal,
    repleto de novos recursos poderosos projetados para aprimorar suas
    capacidades analíticas, ao mesmo tempo que o mantêm informado sobre mudanças
    críticas de quebra que podem impactar suas aplicações.
  ogImage: /images/2024/09/reveal-sept-2024-1.7-release-header.jpg
source_hash: 5526d06e
source_locale: en
---
## **Mudanças Disruptivas: O Que Você Precisa Saber**

À medida que continuamos a evoluir e melhorar o Reveal, há algumas mudanças disruptivas importantes que afetarão plataformas específicas. Por favor, revise essas mudanças atentamente para garantir uma transição suave e desempenho ideal:

**Atualizações de Java e Spring Boot**

O Spring Boot 2.x não é mais suportado. Para permanecer compatível, você precisará atualizar sua aplicação para usar Spring Boot 3.x com JDK 17+ e um servidor compatível com Jakarta EE 9 para hospedagem. Essa mudança reflete nosso compromisso em manter altos padrões de compatibilidade e desempenho e aproveitar os frameworks e tecnologias mais recentes para suas aplicações.

## **Novos Recursos para Todas as Plataformas**

Este lançamento também apresenta vários recursos novos e empolgantes em todas as plataformas, projetados para melhorar suas capacidades de visualização, gerenciamento de dados e experiência geral no Reveal.

1. **Linhas Fixas (Fixed Lines) (Beta):** Para maior clareza na apresentação de dados, introduzimos o recurso Fixed Lines (em beta) para gráficos de categoria. Com Fixed Lines, você pode agora marcar valores específicos em seu gráfico — seja o mais alto, o mais baixo, a média ou um valor personalizado — usando campos de dados ou campos especializados predefinidos. Isso permite maior precisão ao analisar suas visualizações. Para acessar este recurso, use enabledBetaFeatures em $.ig.RevealSdkSettings.

![Fixed Lines in analytitcs dashboard](/images/2024/09/reveal-fixed-lines.png)

1. **Paginação no Lado do Servidor (Server-Side Paging):** Gerenciar grandes conjuntos de dados nunca foi tão fácil com Server-Side Paging. Agora disponível sem a necessidade de habilitar recursos beta, este recurso suporta paginação para uma ampla gama de provedores, incluindo SQL Server, MySQL, BigQuery, PostgreSQL, SyBase, Athena e Oracle. No entanto, observe que a paginação não está disponível ao usar [stored procedures](/blog/stored-procedures-embedded-analytics) ou quando o processamento de dados no lado do servidor estiver desativado.

![Server-Side Paging in dashboard](/images/2024/09/reveal-server-side-paging.png)

1. **Filtros de Comparação (Compare Filters) (Beta):** Obtenha insights mais profundos comparando dados filtrados diretamente em suas visualizações usando o novo recurso Compare Filters (em beta). Disponível em vários tipos de gráficos, este recurso permite que você filtre dados e compare visualmente os resultados filtrados com os valores originais. Os tipos de gráficos suportados incluem Column, Bar, Line, Time Series, Area, Step Area, Spline, Stacked Charts, Funnel, Treemap e Gauges.

![Compare Filters in analytics dashboard](/images/2024/09/reveal-compare-filters.gif)

1. **Atualizações no Nível de Visualização:** Fizemos várias atualizações importantes no nível de visualização:

- Suporte a Datas na API de Visualização: Gerencie facilmente filtros de data, como “Últimos 7 dias”, usando o objeto RVDateRange para verificar intervalos de data.

- Descrições de Visualização: Agora você pode adicionar descrições detalhadas a visualizações individuais, melhorando o contexto e a clareza para seus displays de dados.

- Vinculação de Painéis (Dashboard Linking): As visualizações agora suportam vinculação automática de painéis, simplificando a navegação e a exploração de dados.

- Exportação para PDF: Cada visualização agora pode ser exportada para PDF através de seu overflow.

Estes recursos são apenas o começo. Para uma lista completa de melhorias, novos recursos e correções de bugs, certifique-se de conferir as [Notas de Lançamento (Release Notes)](https://help.revealbi.io/web/release-notes).

Experimente o Reveal GRATUITAMENTE

Comece hoje mesmo baixando nosso SDK.

[DOWNLOAD](/download-sdk)
