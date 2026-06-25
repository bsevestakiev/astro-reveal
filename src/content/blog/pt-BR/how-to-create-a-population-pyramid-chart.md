---
title: >-
  Criando um Gráfico de Pirâmide Populacional Usando Gráficos de Barras
  Empilhadas
description: >-
  Descubra o que é um gráfico de pirâmide populacional e como criar um usando
  gráficos de barras empilhadas.
date: '2020-02-03'
author: Casey Ciniello
cover: /images/2020/10/reveal-logo-gradient-1200x630-1.jpg
summary: >-
  Neste blog, vou mostrar como criar um gráfico de pirâmide populacional que
  fornece uma visão atraente e rápida da demografia de um país, geralmente
  dividida por masculino/feminino, embora possa ser usado para outras
  demografias também. Veja como ficará o gráfico final: Antes de mergulhar em
  como você pode criar um gráfico de pirâmide populacional, vamos primeiro
  revisar alguns dos tipos básicos de gráficos. O que [&hellip;]
categories:
  - Análise incorporada
seo:
  title: Como Criar um Gráfico de Pirâmide Populacional - Reveal BI
  description: >-
    Descubra o que é um gráfico de pirâmide populacional e como criar um usando
    gráficos de barras empilhadas.
  ogTitle: Como Criar um Gráfico de Pirâmide Populacional - Reveal BI
  ogDescription: >-
    Descubra o que é um gráfico de pirâmide populacional e como criar um usando
    gráficos de barras empilhadas.
  ogType: article
  twitterTitle: Como Criar um Gráfico de Pirâmide Populacional - Reveal BI
  twitterDescription: >-
    Descubra o que é um gráfico de pirâmide populacional e como criar um usando
    gráficos de barras empilhadas.
  ogImage: /images/2020/10/reveal-logo-gradient-1200x630-1.jpg
source_hash: beaf1848
source_locale: en
---
Neste blog, vou mostrar como criar um gráfico de pirâmide populacional que fornece uma visão atraente e rápida da demografia de um país, geralmente dividido por masculino/feminino, embora possa ser usado para outras demografias também. Veja como ficará o gráfico final:

![population pyramid chart completed](/images/2021/02/image-4.png)

Antes de mergulhar em como você pode criar um gráfico de pirâmide populacional, vamos primeiro revisar alguns tipos básicos de gráficos.

## O que são gráficos de barras?

Vamos começar com alguns tipos básicos de gráficos antes de mergulhar especificamente em um gráfico de pirâmide populacional. Gráficos de barras, semelhantes aos gráficos de colunas e de área, são usados principalmente para mostrar dados comparativos. O exemplo abaixo usa gráficos para mostrar a variação entre suas diferentes categorias e está classificado em ordem crescente para facilitar o entendimento do usuário final.

![What are bar charts](/images/2021/02/image.jpeg)

## O que são gráficos empilhados?

Gráficos empilhados estendem um gráfico de barras, colunas ou área típico, permitindo que você exiba comparações de diferentes dados categóricos. Isso lhe dá a capacidade de comparar partes de um todo dentro dos seus dados.

![What are Stacked Charts](/images/2021/02/image-1.jpeg)

Então, por que não usar um gráfico de barras em vez disso?

Você passa a usar um gráfico de colunas empilhadas versus um gráfico de barras quando deseja ver a soma total de todas as variáveis, juntamente com o detalhamento de cada variável.

## O que é um gráfico de pirâmide populacional?

Gráficos de pirâmide são visualizações populares ao trabalhar com demografia, pois são uma maneira fácil de mostrar a composição de idade e masculino/feminino de um determinado país. Enquanto gráficos de linhas são muito comuns ao descrever a escala de crescimento de qualquer população, os gráficos de pirâmide mostram quaisquer mudanças ou diferenças significativas.

## Como criar uma pirâmide populacional no Reveal

Vamos para as seguintes colunas em um arquivo Excel para criar nosso gráfico:

![excel file with data to create population pyramid chart](/images/2021/02/image.png)

Em seguida, criaremos um gráfico de barras empilhadas assim:

![polulation pyramid](/images/2021/02/image-3.png)

Para criar uma pirâmide, criaremos um campo calculado para que os valores Masculino apontem para a esquerda. Você pode fazer isso clicando no ícone F(x) ao lado dos seus valores. Dentro do campo calculado, digitaremos o seguinte na barra de fórmulas:

![How to create a pyramid chart with Reveal BI](/images/2021/02/image-2.png)

Depois de acionar a função atualizar, clicaremos no campo masculino original e desmarcamos a caixa visível:

![how to create a pyramid chart
](/images/2021/02/image-1.png)

O resultado final será um gráfico de pirâmide populacional como o seguinte:

![population pyramid chart completed](/images/2021/02/image-4.png)

Saiba Mais Sobre Outros Gráficos e Visualizações

Criamos os vários gráficos neste blog usando o software de inteligência de negócios Reveal. Saiba mais sobre os recursos que você obtém com o Reveal e como criar outros gráficos, painéis e muito mais.

Aproveite o Poder dos Dados

Faça crescer seu negócio com dados contextuais e em tempo real.

[Request a Demo](/request-demo)
