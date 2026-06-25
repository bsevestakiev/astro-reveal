---
title: Incorporando BI Self-Service em Aplicações Blazor
description: >-
  À medida que mais organizações começam a oferecer capacidades analíticas como
  parte de seus aplicativos, incorporar análise em seus aplicativos Blazor não é
  mais opcional. Saiba como fazer isso
date: '2023-06-13'
author: Bilyana Petrova
cover: /images/2023/06/reveal-embed-BI-in-blazor-header-1.png
heroImage: /images/2023/06/reveal-embed-BI-in-blazor-internal-header.svg
summary: >-
  À medida que mais organizações começam a oferecer capacidades analíticas como
  parte de seus aplicativos, incorporar análise em seus aplicativos Blazor não é
  mais opcional.
categories:
  - Insights Técnicos
seo:
  title: Incorporando BI Poderoso em Seus Apps Blazor - Reveal BI
  description: >-
    À medida que mais organizações começam a oferecer capacidades analíticas
    como parte de seus aplicativos, incorporar análise em seus aplicativos
    Blazor não é mais opcional. Saiba como fazer isso
  ogTitle: Incorporando BI Poderoso em Seus Apps Blazor - Reveal BI
  ogDescription: >-
    À medida que mais organizações começam a oferecer capacidades analíticas
    como parte de seus aplicativos, incorporar análise em seus aplicativos
    Blazor não é mais opcional. Saiba como fazer isso
  ogType: article
  twitterTitle: Incorporando BI Poderoso em Seus Apps Blazor - Reveal BI
  twitterDescription: >-
    À medida que mais organizações começam a oferecer capacidades analíticas
    como parte de seus aplicativos, incorporar análise em seus aplicativos
    Blazor não é mais opcional. Saiba como fazer isso
  ogImage: /images/2023/06/reveal-embed-BI-in-blazor-header-1.png
source_hash: 9f275251
source_locale: en
---
Com dados abundantes, os usuários migraram para uma abordagem data-first para guiar seu [processo de tomada de decisão](/blog/reveal-data-driven-decision-making).

E é fácil ver por quê.

Integrar BI poderoso com visuais e relatórios totalmente interativos em suas aplicações Blazor torna a análise de dados acessível a todos os seus usuários finais. Com dados acessíveis e em contexto, seus usuários podem extrair rapidamente insights relevantes quando necessário — livres de interrupções e caos causados pela troca de aplicações ou pela manipulação de dados.

Como uma solução de [análise incorporada](/embedded-analytics), o Reveal pode ajudá-lo a alcançar isso.

O Reveal ajuda você a incorporar painéis e relatórios interativos em suas [aplicações Blazor](https://www.infragistics.com/products/ignite-ui-blazor) de forma fácil e rápida, com [recursos de análise](/blog/embedded-analytics-features) self-service como edição em contexto, mesclagem de dados, vinculação de painéis, campos calculados e muito mais.

Neste artigo, exploraremos como você pode integrar com sucesso a análise incorporada em suas aplicações Blazor com o Reveal.

Se você é novo no Reveal, pode saber mais sobre nosso produto fazendo um tour em nosso site ou assistindo a nosso [vídeo de Visão Geral do Produto Reveal](https://www.youtube.com/watch?v=lkWA2DJsLtE).

## **Por Que Você Deve Incorporar Análise em Suas Aplicações Blazor?**

Incorporar análise em suas aplicações Blazor permite que você visualize dados de negócios importantes em seu fluxo de trabalho natural. Isso permite que você identifique facilmente tendências e padrões em dados que, de outra forma, seriam perdidos. Com acesso a insights em tempo real, você (e todos os seus usuários) pode tomar decisões mais informadas que podem guiar o sucesso do seu negócio.

A análise de dados também ajuda as empresas a otimizar fluxos de trabalho, gerenciar recursos e otimizar processos e desempenho para máxima lucratividade. Com os dados certos, você também pode identificar novas oportunidades de produtos/serviços para aumentar sua receita.

**Baixe Sua Cópia GRATUITA em PDF**

Preencha o formulário para obter acesso.

Desculpe, parece que encontramos um problema com o formulário. [Por favor, tente novamente](/blog/embedding-bi-in-blazor-applications#) em alguns minutos. Se você ainda encontrar problemas, entre em contato conosco em [support@revealbi.io](mailto:support@revealbi.io) para nos notificar sobre o problema.

Obrigatório

Infelizmente, o Google considerou você um bot. Sinta-se à vontade para entrar em contato com [support@revealbi.io](mailto:support@revealbi.io) para obter o recurso que você estava procurando ou para agendar uma demonstração de nossos produtos.
Por favor, aceite os termos do formulário para enviar com sucesso.
Este endereço de e-mail não parece válido. Por favor, atualize e tente novamente.
Por favor, use um endereço de e-mail corporativo.

País

E-mail Corporativo

Primeiro Nome

Último Nome

Eu entendo e concordo com os termos de uso e a política de privacidade da Infragistics: [Terms of Use](/terms-of-use) e [Privacy Policy](/privacy-policy)

Este site é protegido por reCAPTCHA e se aplicam a Política de Privacidade e os Termos de Uso do Google.

Baixar PDF

![Embedding Self-Service BI in Blazor Applications ](https://static.infragistics.com/marketing/slingshot/checkmark.svg)

### Seu PDF está sendo baixado!

Aproveite a leitura e o aprendizado.

**PDF:** Obtenha nosso ‘’Guia de Implantação de BI Incorporado de Ponta a Ponta’’, que detalha as fases de planejamento estratégico, seleção, desenvolvimento e melhoria contínua necessárias para uma implementação bem-sucedida. **[Baixar o PDF aqui!](https://static.infragistics.com/marketing/reveal/whitepapers/reveal-end-to-end-BI-deployment-guide.pdf)**

## **Incorporando Análise Self-Service em Suas Aplicações Blazor com Reveal BI**

Os 7 passos seguintes mostrarão como é fácil começar a habilitar visualizações de dados ricas e painéis em sua aplicação Blazor. Existem configurações tanto do cliente quanto do servidor que precisam ser feitas. Para começar, [baixe o SDK](/download-sdk)

Depois de fazer isso, vamos criar e habilitar BI incorporado e self-service em seu aplicativo Blazor em 7 passos fáceis!

### **Passo 1: Criar um Aplicativo Blazor Server**

Como este é um aplicativo Blazor Server, abra o Visual Studio e crie um novo aplicativo Blazor Server com os padrões. Concluído, o aplicativo é criado; clique com o botão direito no seu projeto, selecione Gerenciar Pacotes Nuget e pesquise nuget.org pelo pacote nuget **Reveal.Sdk.AspNetCore**, e instale-o em seu projeto.

### **Passo 2: Configurar Pastas / Adicionar Painéis**

Para testar o cliente do Reveal SDK, fornecemos painéis de amostra que você pode usar para garantir que sua configuração esteja correta. O Reveal usa uma estrutura de pastas conhecida para carregar e salvar painéis automaticamente — se você usar uma pasta chamada Dashboards na raiz do seu projeto, você não precisa escrever nenhum código adicional de Carregar / Salvar.

1. Crie uma pasta chamada **Dashboards**

2. Descompacte e copie os painéis de amostra (Marketing, Vendas, Campanhas, Manufatura) para a pasta Dashboard recém-criada a partir deste arquivo zip: [https://users.infragistics.com/Reveal/sample-dashboards.zip](https://users.infragistics.com/Reveal/sample-dashboards.zip)

### **Passo 3: Atualizar Program.cs**

Em **Program.cs:**

1. Adicione no topo da janela de código:

**using Reveal.Sdk;**

2. Diga ao seu aplicativo para usar o Reveal SDK com este código e coloque-o antes da declaração **builder.build**.

**builder.Services.AddControllers().AddReveal();**

### **Passo 4: Adicionar Dependências do Cliente SDK**

Para habilitar as dependências JavaScript do cliente Reveal, o arquivo **Pages\\\_layout.cshtml** precisa ser atualizado. Adicione o seguinte código antes do final da tag de fechamento **</Body>**.

```generic
<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>

<script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script>

<script src="https://dl.revealbi.io/reveal/libs/1.5.0/infragistics.reveal.js"></script> 
 
<script type="module"> 
    import "./js/revealview.js"; 
</script>
```

### **Passo 5: Adicionar JavaScript de Configuração do Cliente Reveal**

O cliente Reveal SDK usa é configurado através do RevealView. Para carregar o RevealView, você precisa adicionar uma função JavaScript no cliente. É também onde você configuraria quaisquer propriedades que devem ser habilitadas quando um painel é renderizado.

1. Adicione a pasta **js** na pasta **\wwwroot\\**

2. Na pasta **js**, adicione um arquivo JavaScript chamado **revealview\.js** com o seguinte código:

```generic
window.loadRevealView = function (viewId, dashboardName) {

$.ig.RevealSdkSettings.setBaseUrl('https://samples.revealbi.io/upmedia-backend/reveal-api/');

$.ig.RVDashboard.loadDashboard(dashboardName, (dashboard) => {

var revealView = new $.ig.RevealView("#" + viewId);

revealView.dashboard = dashboard;

});

}
```

### **Passo 6: Carregar Painéis**

Nesta aplicação Blazor, você irá carregar os painéis em um **<div>** chamado **revealView**. Siga estas etapas para carregar os painéis de amostra da pasta **Dashboards** em sua aplicação.

1. Em **Pages\Index.Razor**, adicione esta declaração using:

```generic
@inject IJSRuntime JSRuntime
```

2. Adicione o código para o dropdown que você usará para selecionar o painel a ser carregado:

```generic
<select @onchange="selectedDashboardChanged"> 
    <option>Campaigns</option> 
    <option>Healthcare</option> 
    <option>Manufacturing</option> 
    <option>Marketing</option> 
    <option>Sales</option> 
</select> 
```

3. Adicione a div revealView:

```generic
<div id="revealView" style="width:100%; height:750px"></div> 
```

4. Adicione código que carrega o painel de Campanhas no primeiro carregamento

```generic
@code { 
    protected override async Task OnAfterRenderAsync(bool firstRender) 
    { 
        if (firstRender) 
        { 
            await JSRuntime.InvokeVoidAsync("loadRevealView", "revealView", "Campaigns"); 
        } 
    }
} 
```

5. Observe as mudanças no Select para carregar o painel correto:

```generic
async void selectedDashboardChanged(ChangeEventArgs e) 
    { 
        await JSRuntime.InvokeVoidAsync("loadRevealView", "revealView", e.Value!.ToString()); 
    } 
} 
```

### **Passo 7: Executar Sua Aplicação**

Neste ponto, todas as etapas foram concluídas para habilitar recursos poderosos de BI em sua aplicação Blazor. Execute sua aplicação para ver os resultados!

![](/images/2023/06/image-1024x704.png)

Para o tutorial completo, assista a este vídeo que o guia pelas etapas de incorporação de análise em suas aplicações Blazor com o Reveal.

[https://www.youtube.com/watch?v=OMddgybtDi8](https://www.youtube.com/watch?v=OMddgybtDi8)

Certifique-se de assistir aos nossos outros vídeos, em [nosso canal do YouTube](https://www.youtube.com/@RevealBI), para obter informações mais aprofundadas sobre análise incorporada e inteligência de negócios e a importância dos dados para as empresas. Cobrimos tópicos como [incorporação de análise em Angular](/blog/embedding-bi-in-angular-apps), [aplicativos React com Node.js,](/blog/embedding-self-service-bi-in-react-apps-with-node-js) e aplicativos HTMP JavaScript, criação de painéis de BI incorporados, e muito mais. Lembre-se de se inscrever para ver todos os vídeos futuros de nossos especialistas.

E se você estiver tentando incorporar análise em suas aplicações Blazor com o Reveal, mas estiver enfrentando algum problema, entre em contato com nossa equipe de produto via [nosso canal do Discord](https://discord.com/invite/Ped3sSK5Xw).

Você também pode saber mais sobre o Reveal e como ele funciona [agendando um tour de produto gratuito](/request-demo). Alternativamente, você também pode [baixar nosso SDK](/download-sdk) para experimentar por conta própria.

\[cta\_banner type='{TYPE}' headline='Comece a Tomar Decisões Orientadas por Dados' msg='Traga o poder do BI para todos os seus usuários de negócios a partir de hoje.' button\_text='SAIBA MAIS' button\_link='[https://www.revealbi.io/request-demo](https://www.revealbi.io/request-demo)' class='banner--embedded']
