---
title: Usando Procedimentos Armazenados em Análise Incorporada
description: >-
  Aprenda o que é um procedimento armazenado, quais são seus benefícios, como
  ele se diferencia em comparação com funções, como criá-lo e como usar
  procedimentos armazenados em análise incorporada.
date: '2021-08-25'
author: Bilyana Petrova
cover: /images/2021/08/stored-procedures-in-embedded-analytics.png
summary: >-
  Procedimentos armazenados são um dos tópicos de banco de dados mais usados e
  mais populares e, como tal, oferecem vários benefícios. Usar procedimentos
  armazenados pode simplificar e acelerar a execução de consultas SQL, e mais.
categories:
  - Insights Técnicos
seo:
  title: Usando Procedimentos Armazenados em Análise Incorporada | Reveal BI
  description: >-
    Aprenda o que é um procedimento armazenado, quais são seus benefícios, como
    ele se diferencia em comparação com funções, como criá-lo e como usar
    procedimentos armazenados em análise incorporada.
  ogTitle: Usando Procedimentos Armazenados em Análise Incorporada | Reveal BI
  ogDescription: >-
    Aprenda o que é um procedimento armazenado, quais são seus benefícios, como
    ele se diferencia em comparação com funções, como criá-lo e como usar
    procedimentos armazenados em análise incorporada.
  ogType: article
  twitterTitle: Usando Procedimentos Armazenados em Análise Incorporada | Reveal BI
  twitterDescription: >-
    Aprenda o que é um procedimento armazenado, quais são seus benefícios, como
    ele se diferencia em comparação com funções, como criá-lo e como usar
    procedimentos armazenados em análise incorporada.
  ogImage: /images/2021/08/stored-procedures-in-embedded-analytics.png
source_hash: 9a7cb49d
source_locale: en
---
Usar procedimentos armazenados é uma maneira fácil de economizar tempo ao escrever frequentemente as mesmas linhas de código e também agilizar a chamada e a execução da consulta desejada.

Mas o que você sabe sobre procedimentos armazenados, como eles funcionam e que vantagens eles oferecem aos usuários?

Neste artigo, você aprenderá o que é um procedimento armazenado, seus benefícios, como ele se diferencia em comparação com funções, como criar um procedimento armazenado e, por último, mas não menos importante, como usar procedimentos armazenados em [análise incorporada](/embedded-analytics).

## O Que É um Procedimento Armazenado?

Um procedimento armazenado é um conjunto de comandos SQL e outros construtores PL/SQL armazenados em um sistema de gerenciamento de banco de dados relacional (RDBMS) como um grupo que você pode salvar e reutilizar repetidamente. Um procedimento armazenado pode consistir em vários comandos SQL como SELECT, INSERT, UPDATE ou DELETE. Eles são executados como uma unidade e são usados para resolver um problema específico ou realizar um conjunto de tarefas relacionadas. Isso significa que, se você precisar de uma consulta SQL e escrevê-la repetidamente, você pode salvá-la como um procedimento armazenado e depois chamá-lo para executar a consulta.

![stored procedure definition](/images/2021/08/what-is-stored-procedure.png)

Se você estiver usando Microsoft SQL Server, você pode encontrar procedimentos armazenados expandindo o nó Programability sob seu banco de dados no Object Explorer do SQL Server Management Studio.

![what is stored procedure](/images/2021/08/using-stored-procedures-in-embedded-analytics.png)

## Benefícios de Usar Procedimentos Armazenados

Procedimentos armazenados são um dos [tópicos de banco de dados](https://study.com/academy/lesson/what-are-subject-databases-definition-types.html) mais usados e populares, e como tal, oferecem vários benefícios. Usar procedimentos armazenados pode simplificar e acelerar a execução de consultas SQL.

Por exemplo, os procedimentos armazenados podem reduzir o tráfego de rede entre servidores e clientes. Isso é resultado dos comandos serem executados como um único lote de código – assim, em vez de cada linha de código ser enviada para execução individualmente, apenas a chamada para executar o procedimento armazenado é enviada ao servidor.

Aqui estão alguns outros benefícios de usar procedimentos armazenados:

### Manutenibilidade

Manter um procedimento armazenado é bastante fácil no servidor em contraste com manter cópias em inúmeras máquinas cliente.

Além disso, os scripts de procedimentos são armazenados em um único local, mas os procedimentos armazenados também podem ser usados livremente em outros aplicativos. No caso de uma mudança de definição, isso não é problema algum, pois apenas o procedimento armazenado será afetado e não o aplicativo que o chama.

### Desempenho e Eficiência

Procedimentos armazenados são compilados apenas uma vez e depois podem ser usados muitas vezes. Isso economiza muito tempo ao escrever o mesmo várias vezes se você estiver fazendo consultas ad-hoc e confere uma ligeira vantagem de desempenho na primeira execução de um procedimento armazenado versus a primeira execução de uma consulta ad-hoc.

[See Reveal in Action](/request-demo)

### Inclui Lógica de Negócio Complexa

Embora não seja o melhor lugar para lógica de negócio complexa, um procedimento armazenado é basicamente uma chamada de função em um banco de dados. Você pode incluir instruções IF, LOOPS, verificações de segurança e muito mais para garantir que os dados corretos sejam enviados de volta à chamada do procedimento armazenado.

Embora seja um pouco debatível com base nas habilidades da sua equipe, as melhores práticas tendem a colocar a lógica de negócio de um aplicativo no lado do aplicativo. No entanto, procedimentos armazenados e T-SQL são sintaxes muito poderosas para execução de lógica.

### Fácil de Modificar

Você pode alterar rapidamente um ou mais comandos em um procedimento armazenado com a ajuda do comando ALTER PROCEDURE, o que torna muito rápido e fácil atualizar os resultados enviados de volta ao aplicativo chamador. Ao contrário de um componente de camada intermediária que inclui lógica de negócio, que exigiria um possível e caro novo implante (re-deployment), uma mudança rápida em um procedimento armazenado leva segundos.

Considere este procedimento armazenado, onde o valor @OrdYear está codificado. Um desenvolvedor ou administrador de banco de dados pode atualizar a variável @OrdYear com facilidade usando o comando ALTER PROCEDURE.

```
ALTER PROCEDURE [dbo].[SalesByCategory] 

    @CategoryName nvarchar(15), @OrdYear nvarchar(4) = '1998' 

AS 

IF @OrdYear != '1996' AND @OrdYear != '1997' AND @OrdYear != '1998'  

BEGIN 

    SELECT @OrdYear = '1998' 

END 

 

SELECT ProductName, 

    TotalPurchase=ROUND(SUM(CONVERT(decimal(14,2), OD.Quantity * (1-OD.Discount) * OD.UnitPrice)), 0) 

FROM [Order Details] OD, Orders O, Products P, Categories C 

WHERE OD.OrderID = O.OrderID  

    AND OD.ProductID = P.ProductID  

    AND P.CategoryID = C.CategoryID 

    AND C.CategoryName = @CategoryName 

    AND SUBSTRING(CONVERT(nvarchar(22), O.OrderDate, 111), 1, 4) = @OrdYear 

GROUP BY ProductName 

ORDER BY ProductName
```

### Segurança

Outro grande benefício de usar procedimentos armazenados é a segurança que ele fornece à sua fonte de dados. Você pode [melhorar a segurança de um aplicativo](/blog/security-and-analytics) usando procedimentos armazenados, restringindo o acesso não autorizado. Por exemplo, você pode conceder a alguém acesso a um procedimento que atualiza a tabela do banco de dados sem permitir o acesso à tabela em si. Você também pode usar procedimentos armazenados para “esconder” os nomes das tabelas subjacentes do usuário final do procedimento armazenado. Como o chamador do procedimento armazenado só tem o nome do procedimento armazenado, e não o nome das tabelas usadas no procedimento armazenado, ele não poderá acessar diretamente as tabelas com seus dados de maneira maliciosa.

## Diferenças Entre Procedimentos Armazenados e Funções

Procedimentos armazenados e funções são objetos de banco de dados que contêm conjuntos de comandos SQL para completar tarefas. E embora possam parecer a mesma coisa à primeira vista, eles são bastante diferentes.

Estas são algumas das coisas que diferenciam procedimentos armazenados e funções:

- Funções podem ser chamadas a partir de um procedimento armazenado, enquanto procedimentos armazenados não podem ser chamados a partir de uma função.
- Uma função não permite parâmetros de saída, enquanto um procedimento armazenado permite parâmetros de saída e de entrada.
- Você não pode gerenciar transações dentro de uma função, mas pode fazer isso dentro de um procedimento armazenado.
- Você pode chamar uma função usando uma instrução SELECT, mas não pode chamar um procedimento armazenado usando uma instrução SELECT.
- Uma função tem um tipo de retorno e retorna um valor, enquanto um procedimento armazenado não tem um tipo de retorno, e retornar um valor é opcional.
- Uma função permite apenas uma instrução SELECT, enquanto um procedimento armazenado permite SELECT, INSERT, UPDATE E DELETE.
- Um procedimento armazenado pode ser usado para ler e modificar dados, enquanto uma função só pode lê-los.
- Uma função pode ser incorporada em uma instrução SELECT, enquanto um procedimento armazenado não pode ser utilizado em uma instrução SELECT.
- Uma função não pode retornar múltiplos conjuntos de resultados, enquanto um procedimento armazenado pode.
- Podemos usar transações em procedimentos armazenados, mas elas não são permitidas em funções.

## Como Criar um Procedimento Armazenado?

Criar um novo procedimento armazenado é simples. Existem 3 etapas básicas:

1. No **SQL Server Object Explorer**, Clique com o botão direito no nó **Stored Procedures** sob Programability.

![creating a stored procedure ](/images/2021/08/how-to-create-stored-procedure.png)

2. No New Stored Procedure Template, **modifique a instrução CREATE PROCEDURE** para incluir as tabelas, parâmetros e opções de consulta para retornar os dados desejados do procedimento armazenado.

![how to create a stored procedure](/images/2021/08/creating-stored-procedure-in-embedded-analytics.png)

3. Clique no botão **Execute** na barra de ferramentas para compilar **e salvar seu procedimento armazenado**.

![creating a stored procedure](/images/2021/08/creating-stored-procedure.png)

Existem várias ferramentas para criar procedimentos armazenados, e usar o SQL Server Management Studio interativo é o mais fácil, pois oferece uma maneira simples de começar a se conectar a muitos tipos diferentes de servidores de banco de dados, incluindo Azure e SQL Server Analysis Services.

## Como Usar Procedimentos Armazenados em Análise Incorporada?

Ao usar o [Reveal Embed SDK](/download-sdk) existem 2 maneiras de usar procedimentos armazenados.

1. Ao criar uma nova [visualização](/glossary/data-visualization) em um banco de dados que suporta procedimentos armazenados, você verá uma lista de procedimentos armazenados disponíveis para você. Você tratará o procedimento armazenado que selecionar como qualquer outra fonte de dados no Reveal, a única diferença sendo um procedimento armazenado parametrizado, que você pode usar em um Filtro passando variáveis para o procedimento armazenado.

![stored procedures in embedded analytics](/images/2021/08/how-to-use-stored-procedures-in-embedded-analytics.png)

Você pode assistir a um vídeo rápido de 6 minutos sobre como usar procedimentos armazenados via interface do usuário do Reveal aqui:

2. Como o Reveal é um SDK, você também tem controle programático completo sobre procedimentos armazenados e parâmetros via código. Para passar um nome de procedimento armazenado, juntamente com quaisquer parâmetros necessários, use a função ChangeVisualizationDataSourceItemAsync. Este exemplo demonstra passar um procedimento armazenado chamado CustOrderHist e passar o parâmetro CustomerID.

```
public async override Task<RVDataSourceItem> ChangeVisualizationDataSourceItemAsync 

    (string userId, string dashboardId, RVVisualization visualization,  

RVDataSourceItem dataSourceItem) 

{ 

    if (dashboardId == "StoredProcNorthWind") 

    { 

        var msSqlDsi = dataSourceItem as RVSqlServerDataSourceItem; 

 

 

 

        if (msSqlDsi?.Procedure == "CustOrderHist") 

        { 

            msSqlDsi.ProcedureParameters["@CustomerID"] = "AROUT"; 

        } 

        else 

        { 

            msSqlDsi.Procedure = "MyProcedure"; 

            msSqlDsi.ProcedureParameters["@SampleParam"] = "SampleParamValue"; 

        } 

        return dataSourceItem; 

    } 

}
```

## Conclusão

Procedimentos armazenados são uma ferramenta poderosa para consultar um banco de dados e retornar resultados a um aplicativo chamador. Você deve considerar usar procedimentos armazenados para simplificar a maneira como você apresenta dados aos usuários do Reveal SDK e para simplificar como você lida com parâmetros em seu código de aplicativo versus usar consultas ad-hoc longas e propensas a erros.

Você pode aprender mais sobre [Reveal embedded analytics](/embedded-analytics) e como ele funciona [baixando nosso SDK](/download-sdk) ou [agendando uma demonstração rápida](/request-demo).

Desbloqueie Mais Horas por Dia

Simplifique e acelere a execução de consultas SQL com Reveal Embedded Analytics

[VEJA COMO FUNCIONA](/request-demo)
