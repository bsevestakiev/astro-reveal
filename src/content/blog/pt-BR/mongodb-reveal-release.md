---
title: Suporte a MongoDB e Mais no Reveal 1.6.1. Lançamento
description: >-
  O Reveal 1.6.1 chegou, e é tudo sobre você! Descubra uma experiência de
  usuário aprimorada, exportações mais suaves e muito mais em nosso último
  lançamento.
date: '2023-10-31'
author: Casey Ciniello
cover: /images/2023/10/reveal-new-release-1-7-0-thumbnail.jpg
heroImage: /images/2023/10/reveal-new-release-1-7-0-header.svg
summary: >-
  O mais recente lançamento do Reveal, 1.6.1, chegou, repleto de melhorias
  baseadas no seu feedback.
categories:
  - Atualizações do Produto
seo:
  title: Suporte a MongoDB e Mais no Lançamento de Outubro de 2023
  description: >-
    O Reveal 1.6.1 chegou, e é tudo sobre você! Descubra uma experiência de
    usuário aprimorada, exportações mais suaves e muito mais em nosso último
    lançamento.
  ogTitle: Suporte a MongoDB e Mais no Lançamento de Outubro de 2023
  ogDescription: >-
    O Reveal 1.6.1 chegou, e é tudo sobre você! Descubra uma experiência de
    usuário aprimorada, exportações mais suaves e muito mais em nosso último
    lançamento.
  ogType: article
  twitterTitle: Suporte a MongoDB e Mais no Lançamento de Outubro de 2023
  twitterDescription: >-
    O Reveal 1.6.1 chegou, e é tudo sobre você! Descubra uma experiência de
    usuário aprimorada, exportações mais suaves e muito mais em nosso último
    lançamento.
  ogImage: /images/2023/10/reveal-new-release-1-7-0-thumbnail.jpg
source_hash: e3ec0506
source_locale: en
---
Estamos entusiasmados em anunciar o lançamento da versão 1.6.1 do nosso SDK de [Análise Incorporada](/embedded-analytics). Como sempre, estamos dedicados a melhorar sua experiência e tornar fácil para você integrar análises em seus aplicativos usando Reveal. Vamos mergulhar no que há de novo e atualizado nesta versão.

![MongoDB Support and More in Reveal 1.6.1. Release](/images/2023/11/reveal-launch-1-7-0-dashboard-mongodb.png)

## Novos Recursos

Sua caixa de ferramentas ficou um pouco maior:

**ASP.NET & Node:**

- **NOVA FONTE DE DADOS:** MongoDB

**Todas as Plataformas:**

- Com exportação *headless*, você agora pode exportar uma visualização individual sem a interface do usuário.
- Para quem se preocupa com segurança, adicionamos o atributo `noopener` aos links externos de painel.
- Agora você pode ajustar a margem entre as visualizações usando a nova propriedade `VisualizationMargin` em `RevealTheme` para dar mais controle sobre a estética das visualizações.
- Fizemos alguns aprimoramentos para quem usa o modo de visualização única.
- Controle o título do painel e o *breadcrumb* com `showBreadcrumb` e `showBreadcrumbDashboardTitle`.
- Novas propriedades para `showTitle` em `RVVisualization`.
- Várias novas propriedades em `RevealView` são definidas automaticamente como `false` quando no modo de visualização única.
- Para ajudar a otimizar seus processos SQL, procedimentos armazenados baseados em SQL agora enviarão sua consulta para o log e alertarão sobre quaisquer incompatibilidades de tipo de dados.

## Alterações Críticas

Aqui estão algumas mudanças importantes que você deve estar ciente:

**Todas as Plataformas:**

- Ao ativar o modo de visualização única, várias propriedades em `RevealView` são agora definidas automaticamente como `false`. Estas incluem `showChangeVisualization`, `canEdit`, `showMenu`, `showStatisticalFunctions` e `showFilters`.
- A propriedade `window\.revealDisableKeyboardManagement` agora terá o padrão `true`. Isso significa que o foco da aba não parará mais no `RevealView` a menos que você o defina especificamente.
- Nossos Gráficos de Fatias (cobrindo pizza, funil e donut) passaram por uma transformação de design e têm um novo visual e sensação. Nota: você sempre pode restaurar o padrão usando `RevealSdkSettings.enableNewCharts=false`

## Palavras Finais…

Continuamos nos esforçando para refinar e aprimorar nosso SDK; este lançamento não é exceção. Isso significa que também corrigimos muitos bugs para você, que você pode encontrar nas [notas de lançamento completas aqui](https://help.revealbi.io/web/release-notes). Esperamos que você ache estas atualizações valiosas para otimizar seu fluxo de trabalho de desenvolvimento e aprimorar os recursos de análise de seu aplicativo.

Obrigado por fazer parte da nossa comunidade de desenvolvedores. Seu feedback é crucial, portanto, não hesite em compartilhar seus pensamentos, sugestões ou perguntas. Se precisar de qualquer assistência do produto ou apenas quiser compartilhar seu feedback sobre o Reveal conosco, você pode [contatar nossa equipe de produto via Discord](https://discord.com/invite/Ped3sSK5Xw) ou me enviar um e-mail diretamente com quaisquer ideias, perguntas e problemas para [CaseyM@revealbi.io](mailto:CaseyM@revealbi.io).

Obrigado por escolher o Reveal. Estamos ansiosos para ajudá-lo a desbloquear novas possibilidades com seus dados.

Experimente o Reveal GRATUITAMENTE

Comece hoje mesmo baixando nosso SDK.

[DOWNLOAD](/download-sdk)
