---
title: Seus Painéis — Seu Visual! Conheça o Novo Tematização Personalizada no Reveal
description: >-
  Veja como aplicar tematização personalizada ao software embedded BI Reveal e
  criar seu próprio estilo de painel e visualização para combinar com o visual e
  a sensação do seu aplicativo.
date: '2020-04-24'
author: Casey Ciniello
cover: >-
  /images/2020/10/3583.business_2D00_intelligence_2D00_reveal_2D00_dashboards_2D00_custom_2D00_theming.jpg
summary: >-
  O Reveal é sobre fornecer a você visualizações de dados prontas para
  integração com análise incorporada. Uma parte importante é garantir que os
  elementos que você está incorporando em seus aplicativos combinem com o visual
  e a sensação. Para os usuários do nosso aplicativo, o Reveal agora tem dois
  temas prontos — Mountain e Ocean — que ficam lindos tanto em claro quanto em
  [&hellip;]
categories:
  - Atualizações do Produto
seo:
  title: Seus Painéis de Análise Incorporada — Seu Visual! Reveal Embedded Analytics
  description: >-
    Veja como aplicar tematização personalizada ao software embedded BI Reveal e
    criar seu próprio estilo de painel e visualização para combinar com o visual
    e a sensação do seu aplicativo.
  ogTitle: Seus Painéis de Análise Incorporada — Seu Visual! Reveal Embedded Analytics
  ogDescription: >-
    Veja como aplicar tematização personalizada ao software embedded BI Reveal e
    criar seu próprio estilo de painel e visualização para combinar com o visual
    e a sensação do seu aplicativo.
  ogType: article
  twitterTitle: Seus Painéis de Análise Incorporada — Seu Visual! Reveal Embedded Analytics
  twitterDescription: >-
    Veja como aplicar tematização personalizada ao software embedded BI Reveal e
    criar seu próprio estilo de painel e visualização para combinar com o visual
    e a sensação do seu aplicativo.
  ogImage: >-
    /images/2020/10/3583.business_2D00_intelligence_2D00_reveal_2D00_dashboards_2D00_custom_2D00_theming.jpg
source_hash: '4e429180'
source_locale: en
---
Para os usuários do nosso aplicativo, o Reveal agora possui dois temas prontos — Mountain e Ocean — que ficam lindos tanto no tema claro quanto no escuro. Quer incorporar visualizações para combinar com o tema do seu aplicativo? Não é problema! Através do Reveal SDK, você pode criar seus próprios temas personalizados e controlar todos os aspectos dos seus painéis.

## Novos Temas de Painel no Reveal

Para fornecer a melhor experiência do usuário com os novos temas Mountain e Ocean, desenvolvemos paletas de cores que são bonitas, funcionam em modo claro e modo escuro e têm uma aparência e sensação modernas. ![Reveal dashboard](/images/2020/10/reveal_2D00_embedded_2D00_visualizations_2D00_dashboard_2D00_color_2D00_theming.jpg)
*Tema oceano do Reveal*

## Paletas de Cores

Cada tema dentro do aplicativo Reveal possui 10 cores diferentes em sua paleta. Ao editar ou criar uma visualização, você pode mudar facilmente a cor inicial escolhendo na paleta:

![ Reveal app color palette example](/images/2020/10/2047.reveal_2D00_embedded_2D00_visualizations_2D00_color_2D00_theming_2D00_color_2D00_palette.jpg)

## Tematização Personalizada ao Incorporar Análise

Quando se trata de incorporar análise em seus aplicativos existentes, é fundamental que esses painéis correspondam à aparência e sensação do seu aplicativo. É por isso que lhe damos controle total sobre os painéis do Reveal através do nosso SDK. Em comparação com o aplicativo, aqui estão as principais personalizações que você pode alcançar com temas personalizados:

- **Paletas de cores**: As cores usadas para exibir as séries em suas visualizações. Você pode adicionar um número ilimitado de cores. Assim que todas as cores forem usadas em uma visualização, o Reveal autogerará novos tons dessas cores. Dessa forma, suas cores não se repetirão e cada valor terá sua própria cor.
- **Cor de destaque**: A cor de destaque padrão no Reveal é um tom de Azul que você pode encontrar no botão + Painel e em outras ações interativas. Você pode mudar a cor para combinar com a mesma cor de destaque que você usa em seus aplicativos.
- **Cores de formatação condicional**: Mude as cores padrão dos limites que você pode definir ao usar formatação condicional.
- **Fonte**: O Reveal usa três tipos de texto no aplicativo: regular, médio e negrito. Você pode especificar os usos da fonte para cada um desses grupos de texto.
- **Cores de fundo de visualização e painel**: Você pode configurar separadamente a cor de fundo do seu painel e a cor de fundo das visualizações.

## Como Criar Seu Tema Personalizado?

Criar seu próprio tema no Reveal é tão fácil quanto criar uma instância da nova classe **RevealTheme()/$.ig.RevealTheme()**. Esta classe contém todas as configurações personalizáveis que listamos acima.

Ao criar uma nova instância **RevealTheme/$.ig.RevealTheme**, você receberá os valores padrão para cada configuração. Agora, você pode modificar as configurações que precisam ser alteradas. Por fim, passe a instância do tema para o método **UpdateRevealTheme(theme)/ updateRevealTheme(theme)**. Se você tiver um painel ou outro componente Reveal já exibido na sua tela, você precisará renderizá-lo novamente para ver as alterações aplicadas.

Você pode já ter aplicado seu próprio tema, mas querer modificar algumas das configurações sem perder as alterações que fez nas outras.

Neste caso, você pode chamar o método **GetCurrentTheme()/getCurrentTheme()**. Este método permite que você obtenha os últimos valores que definiu para as configurações do seu RevealTheme. Diferentemente do caso em que você cria uma nova instância do RevealTheme do zero, após aplicar suas alterações e atualizar seu tema novamente, você receberá os valores atuais para cada configuração que não modificou, em vez dos valores padrão.

Tanto os métodos **GetCurrentTheme()/getCurrentTheme()** quanto **UpdateRevealTheme(theme)/ updateRevealTheme(theme)** são acessíveis através da classe **RevealView / $.ig.RevealView**.

## Exemplo de Código

No seguinte trecho de código, ilustramos como obter seu tema atual, aplicar as alterações desejadas e atualizar o tema no Reveal.

Primeiro, vamos começar com um exemplo de como é uma captura de tela antes de fazermos alterações:

![Reveal Marketing Dashboard](/images/2020/10/reveal_2D00_embedded_2D00_dashboard_2D00_original.jpg)

Agora use este trecho de código para definir seus temas personalizados:

```
var regularFont = new FontFamily(new Uri("pack://application:,,,/ [Your ProjectName];component/[pathToFonts]/"), "./#Verdana Italic"); 
var boldFont = new FontFamily(new Uri("pack://application:,,,/ [Your ProjectName];component/[pathToFonts]/"), "./#Verdana Bold"); 
var mediumFont = new FontFamily(new Uri("pack://application:,,,/ [Your ProjectName];component/[pathToFonts]/"), "./#Verdana Bold Italic"); 

var customTheme = RevealView.GetCurrentTheme(); 
customTheme.ChartColors.Clear(); 
customTheme.ChartColors.Add(Color.FromRgb(192, 80, 77)); 
customTheme.ChartColors.Add(Color.FromRgb(101, 197, 235)); 
customTheme.ChartColors.Add(Color.FromRgb(232, 77, 137); 

customTheme.BoldFont = new FontFamily("Gabriola"); 
customTheme.MediumFont = new FontFamily("Comic Sans MS"); 
customTheme.FontColor = Color.FromRgb(31, 59, 84); 
customTheme.AccentColor = Color.FromRgb(192, 80, 77); 
customTheme.DashboardBackgroundColor = Color.FromRgb(232, 235, 252); 

RevealView.UpdateRevealTheme(customTheme);
```

**Nota:** Você primeiro precisa limpar os valores padrão da ***lista de cores do gráfico***&#x64;efault para que o novo conjunto de cores seja adicionado.

O seguinte trecho de código ilustra como criar uma nova instância da classe revealTheme, aplicar as alterações nas configurações desejadas e atualizar o tema no Reveal Web.\*\*
 
***Exemplo de Código – Reveal Web***

```
var revealTheme = new $.ig.RevealTheme(); 
revealTheme.chartColors = ["rgb(192, 80, 77)", "rgb(101, 197, 235)", "rgb(232, 77, 137)"]; 

revealTheme.mediumFont = "Gabriola"; 
revealTheme.boldFont = "Comic Sans MS"; 
revealTheme.fontColor = "rgb(31, 59, 84)"; 
revealTheme.accentColor = "rgb(192, 80, 77)"; 
revealTheme.dashboardBackgroundColor = "rgb(232, 235, 252)"; 

$.ig.RevealView.updateRevealTheme(revealTheme);
```

**Nota:** **Usando as opções de fonte**

Ao definir as configurações boldFont, regularFont ou mediumFont de um tema Reveal, você precisa passar o nome exato da família da fonte. O peso é definido pela definição da própria fonte e não no nome. Você pode precisar usar @font-face (propriedade CSS) para garantir que o nome da fonte especificado nas configurações de fonte **$.ig.RevealTheme** esteja disponível.

Agora, após implementar nossas alterações de tema, aqui estão os novos resultados tanto no Editor de Painel quanto no Editor de Visualização.

![Dashboard in Reveal BI](/images/2020/10/6378.reveal_2D00_embedded_2D00_visualizations_2D00_color_2D00_theming_2D00_background_2D00_color_2D00_2.jpg)
*O Editor de Painel após aplicar as alterações dos trechos de código acima*.

![Reveal dashboard](/images/2020/10/reveal_2D00_embedded_2D00_visualizations_2D00_dashboard_2D00_editor_2D00_2.jpg)
*O Editor de Visualização após aplicar as alterações dos trechos de código acima.*

## Trechos de Código para Alterar Propriedades do Tema

A documentação para alterar o tema está localizada aqui:

[https://help.revealbi.io)

Estas são as propriedades que você pode definir em $.ig.RevealTheme:

- chartColors
- regularFont
- mediumFont
- boldFont
- fontColor
- dashboardBackgroundColor
- visualizationBackgroundColor
- accentColor
- useRoundedCorners
- conditionalFormatting.lowColor
- conditionalFormatting.midColor
- conditionalFormatting.hiColor
- conditionalFormatting.noneColor

Aqui está um trecho modificando o tema no web SDK:

var revealTheme = new $.ig.RevealTheme();

// Setting Standard Color / Font
revealTheme.accentColor = “rgb(15,96,69)”;
revealTheme.regularFont = “Righteous”;
revealTheme.mediumFont = “Caveat”;
revealTheme.boldFont = “Domine”;
revealTheme.fontColor = “rgb(226,24,125)”;
revealTheme.dashboardBackgroundColor = “rgb(24,224,37)”;
revealTheme.visualizationBackgroundColor = “rgb(221,224,37)”;

// Setting Conditioanl Formatting
revealTheme.conditionalFormatting.hiColor = “rgb(87,0,127)”;
revealTheme.conditionalFormatting.lowColor = “rgb(158,0,232)”;
revealTheme.conditionalFormatting.midColor = “rgb(198,137,229)”;
revealTheme.conditionalFormatting.noneColor = “rgb(255,255,127)”;

// Setting Chart Colors
revealTheme.chartColors = \[“rgb(248,53,255)”, “rgb(248,53,75)”, “rgb(54,247,160)”, “rgb(130,53,244)”, “rgb(235,242,138),rgb(239,139,219),rgb(38,116,68),rgb(108,147,178)”];

// Setting Square or Rounded look
revealTheme.useRoundedCorners = false;

// Update the Dashboard
$.ig.RevealView\.updateRevealTheme(revealTheme);

Depois de definir as propriedades do Tema, chame o método **updateReveal** no **RevealView**.

$.ig.RevealView\.updateRevealTheme(revealTheme);

Para a personalização de fontes, você precisará adicionar estas linhas ao CSS da página:

Com estas configurações de propriedades, você deve ser capaz de personalizar [análise incorporada do Reveal](/embedded-analytics) para corresponder à experiência do cliente da marca que você exige!

Se houver pontos de estilo adicionais que você precise, por favor, deixe [saber](mailto:cmcguigan@infragistics.com)!

Aproveite o Poder dos Dados

Faça crescer seu negócio com dados contextuais e em tempo real.

[Solicitar uma Demonstração](/request-demo)
