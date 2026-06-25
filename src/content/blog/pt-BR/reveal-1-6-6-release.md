---
title: 'Reveal 1.6.6: Novidades em Análise Incorporada'
description: >-
  Estamos entusiasmados em anunciar o lançamento do Reveal 1.6.6, que traz
  vários novos recursos e melhorias que aprimorarão sua experiência de análise
  incorporada. Saiba mais!
date: '2024-05-01'
author: Casey Ciniello
cover: /images/2024/04/reveal-new-release-1-6-6-thumbnail.jpg
heroImage: /images/2024/04/reveal-new-release-1-6-6-header_2024-04-30T15.33.46.svg
summary: >-
  Estamos entusiasmados em anunciar o lançamento do Reveal 1.6.6, que traz
  vários novos recursos e melhorias que aprimorarão sua experiência de análise
  incorporada.
categories:
  - Atualizações do Produto
seo:
  title: 'Reveal 1.6.6: Novidades em Análise Incorporada | Análise Incorporada Reveal'
  description: >-
    Estamos entusiasmados em anunciar o lançamento do Reveal 1.6.6, que traz
    vários novos recursos e melhorias que aprimorarão sua experiência de análise
    incorporada. Saiba mais!
  ogTitle: 'Reveal 1.6.6: Novidades em Análise Incorporada | Análise Incorporada Reveal'
  ogDescription: >-
    Estamos entusiasmados em anunciar o lançamento do Reveal 1.6.6, que traz
    vários novos recursos e melhorias que aprimorarão sua experiência de análise
    incorporada. Saiba mais!
  ogType: article
  twitterTitle: 'Reveal 1.6.6: Novidades em Análise Incorporada | Análise Incorporada Reveal'
  twitterDescription: >-
    Estamos entusiasmados em anunciar o lançamento do Reveal 1.6.6, que traz
    vários novos recursos e melhorias que aprimorarão sua experiência de análise
    incorporada. Saiba mais!
  ogImage: /images/2024/04/reveal-new-release-1-6-6-thumbnail.jpg
source_hash: b355143a
source_locale: en
---
## **Lançamento do Reveal 1.6.6: Aprimorando Sua Experiência de Análise**

Temos o prazer de anunciar o lançamento do Reveal 1.6.6, que traz vários novos recursos e melhorias que aprimorarão sua experiência de [análise incorporada](/embedded-analytics). Aqui estão alguns dos destaques deste lançamento:

## **Novos Recursos**

- **Paginação no Lado do Servidor (Server-Side Paging)**: A paginação no lado do servidor permite que você limite o número de linhas enviadas ao cliente ao exibir dados em uma visualização Grid. Isso aprimora muito o desempenho, ao mesmo tempo que proporciona uma ótima experiência de usuário ao interagir com grandes conjuntos de dados. Este é atualmente um recurso beta, então estamos buscando feedback! Para ativar a paginação no lado do servidor, basta definir *$.ig.RevealSdkSettings.enableBetaFeatures=true* em seu JavaScript cliente e na aba Configurações de uma visualização Grid; você verá as novas opções de paginação.

![Reveal 1.6.6: What's New in Embedded Analytics](/images/2024/04/reveal-server-side-paging.png)

- **Caixa de Texto de Descrição (Description Text Box):** Agora você pode adicionar contexto adicional aos painéis com a nova caixa de texto de Descrição. Isso está no nível do painel, diretamente abaixo do Título do painel. A caixa de texto de Descrição segue as mesmas regras definidas na propriedade *canEdit* em RevealView. Se os usuários tiverem permissão para editar um painel, eles poderão editar a descrição do painel. Para mostrar ou ocultar a caixa de texto de Descrição, altere a propriedade booleana *showDescription* em RevealView.

![Reveal 1.6.6: What's New in Embedded Analytics](/images/2024/04/reveal-description-text-box.png)

- **Exportação PDF Aprimorada**: A Exportação PDF foi reformulada para visualizações Grid e Pivot Grid. A nova experiência de exportação Grid e Pivot Grid inclui melhor tratamento de larguras de coluna, melhoria no estouro de colunas e linhas, e uma renderização PDF atualizada para rastrear melhor as mesmas linhas em páginas exportadas, melhorando a legibilidade.
- **Filtros de Exportação**: Ao exportar para PowerPoint, PDF ou Microsoft Excel, você verá agora uma página de capa que descreve os filtros aplicados ao painel. Isso garante que, quando seu painel for exportado, o visualizador desse formato exportado saberá se está olhando para todos os dados ou apenas um subconjunto dos dados.

![Reveal 1.6.6: What's New in Embedded Analytics](/images/2024/04/reveal-export-filters.png)

- **Melhoria no Desempenho de Carregamento**: Para melhorar ainda mais a experiência de carregamento de um esquema de dados ao criar uma nova visualização, adicionamos uma flag para exibir prévias de dados ao passar o mouse sobre os campos na lista de campos da sua fonte de dados. Por padrão, consultamos a fonte de dados para 5 linhas de dados para exibir uma amostra de cada campo em uma dica de ferramenta. Se você estiver usando procedimentos armazenados com grandes conjuntos de dados, isso pode impactar o desempenho. Defina *isPreviewDataInVisualizationEditorEnabled* como *true* para ativar este recurso de dica de ferramenta de dados. Ele está desativado por padrão.
- **Mistura de Dados no Lado do Servidor do MySQL**: O MySQL agora suporta mistura de dados no lado do servidor, o que significa que as tabelas unidas executarão a consulta no servidor, melhorando drasticamente o desempenho para grandes conjuntos de dados.
- **Novos Gráficos**: Aprimoramos os gráficos Radiais com um código atualizado e um novo visual. Os gráficos antigos ainda estão na biblioteca cliente, no entanto, estão obsoletos e serão removidos permanentemente ainda este ano. Se você deseja reter os gráficos anteriores, você pode definir *RevealSdkSettings.EnableNewCharts = false*.
- **Gráficos de Barras e Colunas Atualizados**: Uma nova propriedade Overlap and Gap (Sobreposição e Intervalo) no painel de Configurações do editor de visualização permite que você controle a quantidade de sobreposição entre as barras e colunas, e a quantidade de espaço entre os grupos. Esta nova configuração permite que você 'mescle' barras e colunas, dando-lhe novas maneiras de visualizar dados e rótulos de dados.
- **Dica de Ferramenta (Tooltip) de Visualização Treemap**: Continuamos a melhorar a experiência de dica de ferramenta no Reveal. Com este lançamento, você agora obtém uma dica de ferramenta ao passar o mouse com destaques no nó quando o mouse está pairando.
- **Filtro no Diálogo de Fontes de Dados**: No servidor Node, adicionamos uma nova propriedade *dataSourceItemFilter* às RevealOptions. Isso imita o *IRVObjectFilter* no servidor .NET Core, o que permite o filtragem de itens de fontes de dados no diálogo de fontes de dados. Este recurso eleva sua capacidade de definir segurança no lado do servidor, determinando em quais objetos de dados um usuário tem permissão para visualizar no cliente.

## **Correções de Bugs**

Também abordamos vários bugs para garantir uma experiência de análise mais suave e confiável em todas as plataformas, incluindo correções para gráficos de Pizza, travamentos de Grid, erros de mistura de dados e muito mais. Aqui está uma lista completa:

- Gráficos de Pizza e Rosca não são exibidos ao exportar da UI.

- Excluir uma mistura de dados enquanto um campo calculado depende dela não excluirá o campo calculado.

- Chamar uma função no Redshift e Postgres pode produzir uma mensagem de erro.

- Posicionamento e dimensionamento do RevealView ao usar o estilo transform:scale no container ou em qualquer elemento ancestral.

- Definir canAddDateFilter causava exceções.

- save event args.isNew é false se a propriedade do painel for definida como null ou undefined.

- A tela de parâmetros de procedimentos armazenados às vezes puxará dados anteriores ou nada.

- O scroll para de funcionar no elemento pop-up ao usar a barra de pesquisa.

- Os indicadores do Scatter Map mudam de região de hover com o zoom.

- Os dígitos de fração não são exibidos na dica de ferramenta do Mapa Coroplético.

- Valores de filtro acima de 3000+ não são preservados.

- Erros com campos pivot renomeados na UI de campo pós-calculado.

- A célula de dados de prévisualização não está sendo reutilizada, fazendo com que seja renderizada várias vezes.

- Grids travam no MacOS ARM64.

- A legenda do Gráfico de Pizza desaparece quando há espaço suficiente para exibi-la.

- O evento de hover não se comporta como pretendido em gráficos de fatia.

- Totais Gerais não são exibidos nas visualizações Pivot Grid.

- Valores incorretos de totais gerais exibidos ao usar o provedor de dados Analysis Services.

- Filtros de painel e visualização com totais gerais incorretos ao usar o provedor de dados Analysis Services.

- Modificações no nome do campo perdidas após reordenar valores no Pivot Grid.

- Erro “…hierarchy already appears in the Axis1 axis.” no Analysis Services.

- Resultados incorretos ao aplicar o filtro ‘Top N’ no Analysis Services.

- A visualização baseada em recursos busca a entrada de cache incorreta.

- Uma entrada de cache incorreta é atingida ao usar mistura de dados.

- Não é possível definir o foco na caixa de pesquisa depois que o navegador vai para o segundo plano.

## **Atualizações de Dependência**

- Dependência Playwright v1.27.2 atualizada para v1.42.0.

Experimente o Reveal GRATUITAMENTE

Comece hoje mesmo baixando nosso SDK.

[DOWNLOAD](/download-sdk)
