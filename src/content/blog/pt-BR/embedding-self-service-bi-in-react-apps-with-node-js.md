---
title: Incorporando BI Self-Service em Apps React com Node.js
description: >-
  Incorporar análise em seus aplicativos React traz insights relevantes e
  oportunos diretamente no fluxo de trabalho do usuário.
date: '2023-05-16'
author: Bilyana Petrova
cover: /images/2023/05/embedding-analytics-in-react-apps-with-nodejs.png
heroImage: /images/2023/05/reveal-embed-BI-in-nodejs-react-internal-header.svg
summary: >-
  Incorporar análise em seus aplicativos React traz insights relevantes e
  oportunos diretamente no fluxo de trabalho do usuário, promovendo uma cultura
  orientada por dados e incentivando um pensamento mais analítico.
categories:
  - Insights Técnicos
seo:
  title: Incorporando BI Self-Service em Apps React com Node.js
  description: >-
    Incorporar análise em seus aplicativos React traz insights relevantes e
    oportunos diretamente no fluxo de trabalho do usuário.
  ogTitle: Incorporando BI Self-Service em Apps React com Node.js
  ogDescription: >-
    Incorporar análise em seus aplicativos React traz insights relevantes e
    oportunos diretamente no fluxo de trabalho do usuário.
  ogType: article
  twitterTitle: Incorporando BI Self-Service em Apps React com Node.js
  twitterDescription: >-
    Incorporar análise em seus aplicativos React traz insights relevantes e
    oportunos diretamente no fluxo de trabalho do usuário.
  ogImage: /images/2023/05/embedding-analytics-in-react-apps-with-nodejs.png
source_hash: 045f1edb
source_locale: en
---
No mundo orientado por dados de hoje, [integrar painéis e capacidades de análise diretamente em aplicações SaaS](/blog/embedded-analytics-for-saas-companies) é essencial. Existem muitos [benefícios de incorporar análises](/blog/benefits-of-embedded-analytics), incluindo tempo de mercado mais rápido, aumento de produtividade e desempenho, e crescimento de lucros.

Incorporar análises em suas aplicações React traz insights relevantes e oportunos diretamente no fluxo de trabalho do usuário, promovendo uma [cultura orientada por dados](/whitepapers/creating-data-driven-culture) e incentivando um pensamento mais analítico.

Como uma solução de [análise incorporada](/embedded-analytics), o Reveal pode ajudá-lo a alcançar isso.

O Reveal ajuda você a incorporar painéis e relatórios interativos em suas aplicações React de forma fácil e rápida com [recursos de análise](/blog/embedded-analytics-features) como edição em contexto, mesclagem de dados, vinculação de painéis, campos calculados e muito mais.

Neste artigo, mostraremos como você pode implementar o Reveal em seus aplicativos baseados em React com Node.js.

**Baixe Seu PDF GRATUITO**

Preencha o formulário para obter acesso.

Desculpe, parece que encontramos um problema com o formulário. [Por favor, tente novamente](/blog/embedding-self-service-bi-in-react-apps-with-node-js#) em alguns minutos. Se você ainda encontrar problemas, entre em contato conosco em [support@revealbi.io](mailto:support@revealbi.io) para nos notificar sobre o problema.

Obrigatório

Infelizmente, o Google considerou você um bot. Sinta-se à vontade para entrar em contato com [support@revealbi.io](mailto:support@revealbi.io) para obter o recurso que você estava procurando ou para agendar uma demonstração de nossos produtos.
Por favor, aceite os termos do formulário para enviar com sucesso.
Este endereço de e-mail não parece válido. Por favor, atualize e tente novamente.
Por favor, use um endereço de e-mail corporativo.

País

E-mail Corporativo

Primeiro Nome

Sobrenome

Eu entendo e concordo com os termos de uso e a [Política de Privacidade](/privacy-policy) da Infragistics.

Este site é protegido pelo reCAPTCHA e se aplicam a Política de Privacidade e os Termos de Uso do Google.

Baixar PDF

![Embedding Self-Service BI in React Apps with Node.js](https://static.infragistics.com/marketing/slingshot/checkmark.svg)

### Seu PDF está sendo baixado!

Aproveite a leitura e o aprendizado.

**PDF:** Obtenha nosso ‘’Guia de Implantação de BI Incorporado End-to-End’’, que detalha as fases de planejamento estratégico, seleção, desenvolvimento e melhoria contínua necessárias para uma implementação bem-sucedida. **[Baixar o PDF aqui!](https://static.infragistics.com/marketing/reveal/whitepapers/reveal-end-to-end-BI-deployment-guide.pdf)**

## Por Que Você Deve Incorporar BI em Suas Aplicações React?

Independentemente do propósito do seu aplicativo React, os recursos de análise incorporada fornecerão enormes oportunidades para otimizar fluxos de trabalho, gerenciar recursos e otimizar o desempenho. Ferramentas de BI, como [gráficos, gráficos e painéis](/chart-types), também têm a capacidade de melhorar a literacia de dados em toda a organização. A literacia de dados, que é a capacidade de ler, entender, criar e [comunicar dados como informação](/glossary/data-driven-storytelling), ajuda ainda mais os usuários a tomar decisões melhores e mais inteligentes. [Tomada de decisão orientada por dados](/blog/reveal-data-driven-decision-making) é muito importante, pois é baseada em fatos, e não em palpites e intuições. Com acesso à análise, todos podem tomar decisões mais inteligentes com confiança e no momento certo.

## Incorporando Análises em Suas Aplicações React Reveal com Node.js

[Análise incorporada do Reveal](/embedded-analytics) ajuda você a incorporar facilmente relatórios, painéis e mais interativos em suas aplicações React. Com recursos como [machine learning](/glossary/machine-learning), vinculação de painéis, funções estatísticas, campos calculados, análise rica de dados, self-service, [white-labeling](/blog/white-label-analytics), mesclagem de dados e muito mais, o Reveal pode adicionar um enorme valor a qualquer aplicação baseada em React.

Além disso, integrar BI em suas aplicações React é muito fácil com o SDK nativo do Reveal, permitindo que você incorpore análises em suas aplicações sem requisitos adicionais. A arquitetura flexível e as ricas APIs do Reveal dão a você controle dos recursos em seu aplicativo, tornando-o parte perfeita da experiência do usuário.

Então, vamos incorporar análises em seu aplicativo React com o [Reveal SDK](/download-sdk).

Neste tutorial, usaremos um servidor Node.js.

\*Nós já temos um servidor Node.js. Para aprender como criar um para você, confira este tutorial passo a passo sobre como [configurar o servidor Reveal SDK com Node.js](https://help.revealbi.io/web/getting-started-server-node).

**1. Adicione as referências de script necessárias ao index.html**

```generic
<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" type="text/css">

<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script> 
<script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script> 
<script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script> 
<script src="https://dl.revealbi.io/reveal/libs/1.3.1/infragistics.reveal.js"></script>
```

**2. Adicione um <div> em app.tsx que será usado para renderizar o RevealView**

```generic
function App() {

return (

<div id="revealView" style={{height: "100vh", width: "100%"}}></div>

);

}
```

**3. Inicialize o objeto RevealView em app.tsx e carregue um Painel**

```generic
useEffect(() => {

$.ig.RVDashboard.loadDashboard(dashboardId).then((dashboard: any) => {

var revealView = new $.ig.RevealView("#revealView");

revealView.dashboard = dashboard;

});

}, [dashboardId]);
```

Em apenas 3 passos fáceis, você tem o básico para carregar um painel no Reveal. Para o tutorial completo, assista a este vídeo com nosso Sr. VP de Ferramentas de Desenvolvedor, Jason Beres, que o guiará passo a passo sobre como carregar e recuperar painéis de um aplicativo React.

[https://www.youtube.com/watch?v=o1XoppSfX8E\&t=2s](https://www.youtube.com/watch?v=o1XoppSfX8E&t=2s)

Certifique-se de assistir aos nossos outros vídeos, em [nosso canal do YouTube](https://www.youtube.com/@RevealBI), para obter mais informações aprofundadas sobre análise incorporada e inteligência de negócios e a importância dos dados para os negócios. Estamos cobrindo tópicos como [incorporação de análises em Angular](/blog/embedding-bi-in-angular-apps), [Blazor](/blog/embedding-bi-in-blazor-applications), e aplicativos HTML JavaScript, como criar um painel de BI incorporado, e muito mais. Não se esqueça de se inscrever para não perder nenhum vídeo futuro de nossos especialistas.

E se você estiver tentando incorporar análises em suas aplicações React Reveal com Node.js, mas estiver enfrentando algum problema, entre em contato com nossa equipe de produtos via [nosso canal do Discord](https://discord.com/invite/Ped3sSK5Xw).

Você também pode saber mais sobre o Reveal e como ele funciona [agendando um tour de produto gratuito](/request-demo). Alternativamente, você também pode [baixar nosso SDK](/download-sdk) para experimentar por conta própria.

[cta_banner type='{TYPE}' headline='Start Making Data-Driven Decisions' msg= 'Bring the power of BI to all your business users starting today.' button_text= 'LEARN MORE' button_link='[https://www.revealbi.io/request-demo](https://www.revealbi.io/request-demo)' class='banner--embedded']
