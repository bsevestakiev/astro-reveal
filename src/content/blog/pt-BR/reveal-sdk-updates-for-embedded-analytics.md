---
title: Atualizações do SDK Reveal para Análise Incorporada
description: >-
  Novos recursos incluem flexibilidade adicional sobre como usar Dicas de
  Ferramenta em visualizações, e atualizações de tema para melhor corresponder à
  aparência e sensação do seu aplicativo.
date: '2020-05-11'
author: Casey Ciniello
cover: >-
  /images/2020/10/business_2D00_intelligence_2D00_reveal_2D00_dashboards_2D00_tooltips.jpg
summary: >-
  Estamos entusiasmados em anunciar algumas novas atualizações para o SDK de
  análise incorporada Reveal, a fim de fornecer mais personalização. Exibindo
  Dicas de Ferramenta Adicionamos um novo evento que lhe dará mais flexibilidade
  sobre como exibir Dicas de Ferramenta em suas visualizações. O evento é
  chamado revealView.TooltipShowing em WPF e .onTooltipShowing em Web e é
  acionado sempre que o usuário final [&hellip;]
categories:
  - Atualizações do Produto
seo:
  title: >-
    Atualizações do SDK Reveal para Análise Incorporada Análise Incorporada
    Reveal
  description: >-
    Novos recursos incluem flexibilidade adicional sobre como usar Dicas de
    Ferramenta em visualizações, e atualizações de tema para melhor corresponder
    à aparência e sensação do seu aplicativo.
  ogTitle: >-
    Atualizações do SDK Reveal para Análise Incorporada Análise Incorporada
    Reveal
  ogDescription: >-
    Novos recursos incluem flexibilidade adicional sobre como usar Dicas de
    Ferramenta em visualizações, e atualizações de tema para melhor corresponder
    à aparência e sensação do seu aplicativo.
  ogType: article
  twitterTitle: >-
    Atualizações do SDK Reveal para Análise Incorporada Análise Incorporada
    Reveal
  twitterDescription: >-
    Novos recursos incluem flexibilidade adicional sobre como usar Dicas de
    Ferramenta em visualizações, e atualizações de tema para melhor corresponder
    à aparência e sensação do seu aplicativo.
  ogImage: >-
    /images/2020/10/business_2D00_intelligence_2D00_reveal_2D00_dashboards_2D00_tooltips.jpg
source_hash: fa18fab8
source_locale: en
---
Estamos entusiasmados em anunciar algumas novas atualizações para o [análise incorporada Reveal](/embedded-analytics) [SDK](/blog/reveal-sdk-updates-for-embedded-analytics) para fornecer mais personalização.

## Exibindo Dicas de Ferramenta (Tooltips)

Adicionamos um novo evento que lhe dará mais flexibilidade sobre como exibir Dicas de Ferramenta (Tooltips) em suas visualizações. O evento é chamado *revealView\.TooltipShowing* em WPF e .*onTooltipShowing* em Web e é acionado sempre que o usuário final passa o mouse sobre uma série em uma visualização ou clica na série (como mostrado abaixo).

**![Reveal tooltip](/images/2020/10/reveal_2D00_tooltip.jpg)**

Você pode optar por cancelar o evento de Dica de Ferramenta ou modificar o que é exibido. Alguns exemplos incluem:

1. Você deseja desabilitar as Dicas de Ferramenta completamente ou exibi-las apenas para visualizações específicas.
2. Você deseja exibir dados na Dica de Ferramenta que estão fora do componente RevealView e que podem ser mais valiosos para seus visualizadores.

Observe que este evento não será acionado para visualizações que não suportam Dicas de Ferramenta, como grades, medidores e outros.

## Trechos de Código para WPF e Web

Nos seguintes trechos de código, mostraremos como desabilitar as Dicas de Ferramenta para uma visualização e ainda obter informações adicionais dos argumentos do evento quando o usuário final passar o mouse ou clicar nesta visualização. Os argumentos do evento incluem informações sobre a visualização que está sendo passada o mouse ou clicada, a célula de dados exata passada o mouse ou clicada, a linha inteira desta célula (caso você precise de informações de outras colunas) e, é claro, o booleano Cancel.

**WP&#x46;****Code****&#x53;nippet:**

```
>private void RevealView_TooltipShowing(object sender, TooltipShowingEventArgs e) { if (e.Visualization.Title == "NoNeedForTooltips") { e.Cancel = true; } Debug.WriteLine($"TooltipShowing: Visualization: {e.Visualization.Title}, Cell: {e.Cell}, Row: {e.Row}"); }
```

**Trecho de Código Web:**

```
revealView.onTooltipShowing = function (args) { if (args.visualization.title == "NoNeedForTooltips") { args.Cancel = true; } console.log("onTooltipShowing: visualization: " + args.visualization.title() + ",cell: " + args.cell.value + ", row:" + args.row.length); };
```

## Atualização do RevealTheme

Adicionamos suporte para alterar os cantos de visualizações e botões dentro do Reveal para corresponder à aparência e sensação do seu aplicativo existente. Para fazer isso, adicionamos a propriedade booleana UseRoundedCorners à classe RevealTheme. Quando ela é definida como true (o valor padrão), os cantos dos contêineres de visualização são ligeiramente arredondados. Se você quiser bordas mais nítidas, defina esta propriedade como false para desativá-la.

![Reveal dashboard - Theme Update](/images/2020/10/reveal_2D00_dashboard.jpg)

Aproveite o Poder dos Dados

Faça crescer seu negócio com dados contextuais e em tempo real.

[Solicitar uma Demonstração](/request-demo)
