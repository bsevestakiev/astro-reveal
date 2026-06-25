---
title: Usando Fonte de Dados em Memória para Expandir o Alcance de Dados do Reveal
description: >-
  Use o recurso de banco de dados em memória do Reveal para expandir o número e
  os tipos de dados que você pode acessar de seu aplicativo com análise
  incorporada.
date: '2019-10-03'
author: Casey Ciniello
cover: /images/2020/10/business_2D00_intelligence_2D00_reveal_2D00_datasources.jpg
summary: >-
  Pode haver momentos em que você queira se conectar diretamente a uma fonte de
  dados que o Reveal talvez ainda não suporte nativamente. Por exemplo, você
  pode ter seu próprio banco de dados personalizado. Para atender a essa
  necessidade, suportamos em memória como fonte de dados. Você também pode
  querer usar esta opção se precisar [&hellip;]
categories:
  - Análise incorporada
seo:
  title: Expandir Fontes de Dados de Análise Incorporada (Bancos de Dados em Memória)
  description: >-
    Use o recurso de banco de dados em memória do Reveal para expandir o número
    e os tipos de dados que você pode acessar de seu aplicativo com análise
    incorporada.
  ogTitle: Expandir Fontes de Dados de Análise Incorporada (Bancos de Dados em Memória)
  ogDescription: >-
    Use o recurso de banco de dados em memória do Reveal para expandir o número
    e os tipos de dados que você pode acessar de seu aplicativo com análise
    incorporada.
  ogType: article
  twitterTitle: Expandir Fontes de Dados de Análise Incorporada (Bancos de Dados em Memória)
  twitterDescription: >-
    Use o recurso de banco de dados em memória do Reveal para expandir o número
    e os tipos de dados que você pode acessar de seu aplicativo com análise
    incorporada.
  ogImage: /images/2020/10/business_2D00_intelligence_2D00_reveal_2D00_datasources.jpg
source_hash: 1700c106
source_locale: en
---
Pode haver momentos em que você queira se conectar diretamente a uma fonte de dados que o Reveal talvez ainda não suporte nativamente. Por exemplo, você pode ter seu próprio banco de dados personalizado. Para atender a essa necessidade, suportamos a memória em tempo real (in-memory) como uma fonte de dados. Você também pode querer usar esta opção se precisar usar dados já na memória como parte do estado do seu aplicativo, como o resultado de um relatório solicitado por um usuário.

A fonte de dados em memória também oferece outros benefícios, como velocidade de recuperação, pois é muito mais rápido acessar dados na memória do que em um disco rígido.

Neste blog, mostraremos como usar esse recurso.

## Definindo um Esquema de Dados

Recomendamos que você defina um arquivo de dados com um esquema que corresponda aos seus dados em memória. Arquivos de dados podem ser, por exemplo, um arquivo CSV ou Excel, e um esquema é basicamente uma lista de campos e o tipo de dado para cada campo. No exemplo abaixo, você encontrará detalhes sobre como criar um arquivo de dados com um esquema específico e, em seguida, usar dados em memória em vez de obter informações de um banco de dados.

No exemplo a seguir, usaremos dados em memória com a lista de funcionários da empresa para incorporar um painel mostrando métricas de RH em seu sistema de RH. E em vez de obter a lista de funcionários do seu banco de dados, usaremos os dados em memória.

## Preparando o Arquivo de Dados e o Painel de Exemplo

Use os seguintes passos com base em um Employee simplificado que possui apenas algumas propriedades:

- EmployeeID: string
- Fullname: string
- Wage: numeric

Primeiro, crie o arquivo CSV com o mesmo esquema:

![ Example of preparing a Data File and Sample Dashboard in Reveal BI](/images/2020/10/reveal_2D00_code_2D00_1.jpg)

1. Faça o upload do arquivo para o sistema de compartilhamento de arquivos de sua preferência, como Dropbox ou Google Drive
2. Crie um painel usando os dados fictícios. Observe que você fornecerá os dados de produção reais mais tarde em seu aplicativo
3. Exporte o painel (Menu Painel → Exportar → Painel) e salve como um arquivo .rdash.

## Visualizando o Painel e Retornando os Dados Reais

Agora você precisa visualizar o painel usando seus próprios dados em vez dos dados fictícios.

Implemente [IRVDataSourceProvider](https://help.revealbi.io) e retorne-o como a propriedade [DataSourceProvider](https://help.revealbi.io) em [IRevealSdkContext](https://help.revealbi.io), conforme descrito em [Replacing Data Sources](https://help.revealbi.io).

Em seguida, na implementação para o método **ChangeVisualizationDataSourceItemAsync**, você precisa adicionar um código semelhante a este:

![ Change Visualization Data Source Item Async example code](/images/2020/10/reveal_2D00_code_2D00_2.jpg)

Dessa forma, você basicamente substitui todas as referências a arquivos CSV no painel pela fonte de dados em memória identificada por “employees”. Essa identificação será usada mais tarde ao retornar os dados.

Implemente o método que retornará os dados reais. Para isso, implemente [IRVDataProvider](https://help.revealbi.io) como mostrado abaixo:

![IRV Data Provider example code](/images/2020/10/reveal_2D00_code_2D00_3.jpg)

Observe que as propriedades na classe Employee são nomeadas exatamente como as colunas no arquivo CSV, e o tipo de dado também é o mesmo. Caso você queira alterar o nome do campo, o rótulo do campo e/ou o tipo de dado de qualquer uma das propriedades, você pode usar atributos na declaração da classe:

- O atributo RVSchemaColumn pode ser usado para alterar o nome do campo e/ou o tipo de dado.
- O atributo DisplayName pode ser usado para alterar o rótulo do campo

![ RV Schema Column attribute can be used to alter the field name and/or data type](/images/2020/10/reveal_2D00_code_2D00_4.jpg)

Além disso, para implementar [IRVDataProvider](https://help.revealbi.io), você precisa modificar sua implementação de [IRevealSdkContext.DataProvider](https://help.revealbi.io) para retorná-lo:

![ IRV Data Provider implementation](/images/2020/10/reveal_2D00_code_2D00_5.jpg)

Para saber mais sobre o Reveal ou testar o SDK, caso ainda não o tenha feito, solicite uma demonstração.

Aproveite o Poder dos Dados

Faça crescer seu negócio com dados contextuais e em tempo real.

[Request a Demo](/request-demo)
