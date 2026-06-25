---
title: Como Criar uma Visualização de Gráfico de Treemap no Reveal
description: >-
  Melhores Práticas de Gráfico de Treemap - Aprenda a criar visualizações de
  dados de Gráfico de Treemap usando o BI e Análise Incorporada do Reveal.
date: '2020-06-16'
author: Casey Ciniello
cover: /images/2020/10/business_2D00_intelligence_2D00_reveal_2D00_treemap.jpg
summary: >-
  Um Gráfico de Treemap é projetado para cenários de aprofundamento
  (drill-down). Ele mostra o peso relativo dos pontos de dados em mais de um
  nível, permitindo que os usuários aprofundem continuamente no conjunto de
  dados representado por retângulos menores para uma análise mais eficiente.
categories:
  - Análise incorporada
seo:
  title: Como Criar uma Visualização de Gráfico de Treemap no Reveal
  description: >-
    Melhores Práticas de Gráfico de Treemap - Aprenda a criar visualizações de
    dados de Gráfico de Treemap usando o BI e Análise Incorporada do Reveal.
  ogTitle: Como Criar uma Visualização de Gráfico de Treemap no Reveal
  ogDescription: >-
    Melhores Práticas de Gráfico de Treemap - Aprenda a criar visualizações de
    dados de Gráfico de Treemap usando o BI e Análise Incorporada do Reveal.
  ogType: article
  twitterTitle: Como Criar uma Visualização de Gráfico de Treemap no Reveal
  twitterDescription: >-
    Melhores Práticas de Gráfico de Treemap - Aprenda a criar visualizações de
    dados de Gráfico de Treemap usando o BI e Análise Incorporada do Reveal.
  ogImage: /images/2020/10/business_2D00_intelligence_2D00_reveal_2D00_treemap.jpg
source_hash: ccd087e1
source_locale: en
---
Um Gráfico Treemap é uma visualização de dados que mostra dados hierárquicos usando nós aninhados (retângulos) de tamanhos e cores variados, facilitando a identificação de padrões de dados ou a comparação de quantidades de dados.

Embora um Treemap seja às vezes categorizado como uma visualização de “distribuição”, eu o vejo mais frequentemente referido como uma visualização de “parte para o todo”, mostrando categorias (partes) de um conjunto de dados que somam um valor total (todo).

As categorias são mostradas em proporção às outras categorias com base em sua porcentagem de valor em relação ao valor total que está sendo analisado.

Diferentemente da visualização parte-para-todo, talvez a mais popular, o Gráfico de Pizza, um Gráfico Treemap é projetado para cenários de detalhamento (drill-down). Ele mostra o peso relativo dos pontos de dados em mais de um nível (representado como um retângulo), permitindo que você faça um detalhamento contínuo e mais profundo no conjunto de dados representado por retângulos menores para uma análise mais eficiente.

Ao mesmo tempo, os Treemaps não são projetados para transmitir quantidades numéricas; a intenção é mostrar o ranking relativo e as diferenças relativas nos valores do conjunto de dados.

[Veja o Reveal em Ação](/request-demo)

## Treemap Escarificado

Originalmente projetados para visualizar arquivos em um disco rígido, os Treemaps foram aplicados a uma grande variedade de domínios, desde análise financeira até reportagem esportiva (*Ordered Treemap Layouts*, Ben Shneiderman, Martin Wattenberg, [http://www.cs.umd.edu/hcil/treemap-history/](http://www.cs.umd.edu/hcil/treemap-history/)). Para representar dados em uma estrutura Treemap, existem vários algoritmos para escolher, como Squarified, Slice and Dice e Stripped, sendo o algoritmo Treemap Escarificado o mais comum. O Reveal usa o algoritmo Treemap Escarificado, que funciona bem em todos os tamanhos de tela (desktop, web, mobile) e dispositivos com baixa proporção.

Aqui está um exemplo de um Treemap Escarificado no Reveal, mostrando lojas McDonald's por tipo.

![Using a Treemap](/images/2020/10/treemap_2D00_mcdonalds.gif)

Neste exemplo, o Treemap está mostrando um detalhamento do número (contagem) de tipos de lojas McDonald's (Freestanding, Gas Station, Mall, etc) por Estado. Com [Reveal análise incorporada](/embedded-analytics), você pode obter mais informações na dica de ferramenta para cada categoria, como Contagem por Estado, e você pode fazer o detalhamento em cada Categoria Treemap (o Nome do Estado) para obter uma análise rápida dos resumos em nível de estado. O número de detalhamentos é limitado apenas pelos seus dados; por exemplo, se adicionássemos uma hierarquia Treemap adicional para Cidade ou Condado, poderíamos fazer análises e detalhamentos adicionais.

## Melhores Práticas para Usar uma Visualização de Gráfico Treemap

Como qualquer outra visualização de dados, uma visualização de gráfico Treemap deve ser usada em cenários específicos. Ela não resolve o mesmo problema que uma visualização como um Gráfico de Barras ou um Gráfico de Linha resolveria. Ela é realmente destinada a uma exibição de dados mais complexa e rica.

### Quando usar um Gráfico Treemap

- Dados hierárquicos de detalhamento (dados organizados como uma árvore, com galhos e sub-galhos)
- Ilustrar hierarquias de peso relativo e valores comparativos entre categorias (galhos) e subcategorias (sub-galhos)
- Exibir grandes conjuntos de dados que precisam de uma visualização compacta e eficiente em termos de espaço
- Quando você deseja fornecer uma análise de dados rápida e de relance, sem valores precisos. O tamanho relativo dos retângulos ajuda a identificar padrões e/ou valores atípicos muito rapidamente
- Para fazer uso eficiente do espaço. Treemaps podem exibir legivelmente milhares de itens na tela simultaneamente

### Quando não usar um Gráfico Treemap

- Se você está contando uma história de dados que exige valores precisos
- Se você tem valores de dados negativos
- Se você tem dados planos, não hierárquicos (embora ainda esteja OK usar um Treemap sem detalhamento, pode não ser a melhor [visualização de dados](/blog/how-to-create-a-population-pyramid-chart) para contar sua história de dados
- Se seus dados forem de tamanho semelhante – em outras palavras – se o usuário verá retângulos do mesmo tamanho – isso contraria as melhores práticas do Treemap listadas acima

## Exemplos de Dados usados com uma Visualização Treemap

Treemaps são melhores usados para conjuntos de dados maiores, com um valor quantitativo altamente variável que precisa ser exibido de maneira compacta e eficiente em termos de espaço. Cenários de dados para um Treemap podem incluir:

- Resultados eleitorais por Condado ou o número de votos por Partido por Condado
- Vendas de produtos por Categoria, Subcategoria por País
- Participações de mercado de produtos por Tecnologia / Regiões / etc
- Exportações de Categoria de Produto por País
- Vendas por Divisão por Produto

## Usando o Gráfico Treemap no Reveal

Para saber mais sobre o Gráfico Treemap do Reveal, experimente estes ótimos recursos:

- Vídeo – [Criando uma Visualização Treemap](https://youtu.be/mY8iTyy7m-U)
- Docs – [Usando o Treemap do Reveal](https://help.revealbi.io)

Para começar com seu primeiro Treemap no Reveal, acesse [https://app.revealbi.io,](https://app.revealbi.io) e inscreva-se para um teste gratuito!

Existe alguma visualização que você gostaria que não esteja no Reveal? Me envie um e-mail para [casey@revrealbi.io](mailto:casey@revrealbi.io) e me avise!

Obrigado!

Casey

Gráficos para Toda Ocasião

Entenda informações complexas rapidamente para tomar decisões de negócios mais inteligentes.

[AGENDAR UMA DEMO](/request-demo)
