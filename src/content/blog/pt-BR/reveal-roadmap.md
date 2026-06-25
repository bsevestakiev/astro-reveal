---
title: Roadmap da Reveal para 2023
description: >-
  O objetivo da Reveal é oferecer uma experiência de usuário (UX) incrível para
  BI de autosserviço, análise de dados profunda e contação de histórias com
  dados.
date: '2023-01-09'
author: Casey Ciniello
cover: /images/2022/07/reveal-roadmap-2023.jpg
summary: >-
  Tenha uma ideia de como são nossos planos, em termos de recursos, para 2023.
  Tudo o que adicionamos é baseado no feedback e na demanda dos clientes. Embora
  possamos adicionar itens que acreditamos que nos tornam competitivos no
  mercado ou recursos baseados na direção geral do mercado ou feedback de
  analistas, estamos constantemente ajustando e nos adaptando ao que você
  precisa para entregar um software de sucesso.
categories:
  - Atualizações do Produto
seo:
  title: Roadmap da Reveal para 2023
  description: >-
    O objetivo da Reveal é oferecer uma experiência de usuário (UX) incrível
    para BI de autosserviço, análise de dados profunda e contação de histórias
    com dados.
  ogTitle: Roadmap da Reveal para 2023
  ogDescription: >-
    O objetivo da Reveal é oferecer uma experiência de usuário (UX) incrível
    para BI de autosserviço, análise de dados profunda e contação de histórias
    com dados.
  ogType: article
  twitterTitle: Roadmap da Reveal para 2023
  twitterDescription: >-
    O objetivo da Reveal é oferecer uma experiência de usuário (UX) incrível
    para BI de autosserviço, análise de dados profunda e contação de histórias
    com dados.
  ogImage: /images/2022/07/reveal-roadmap-2023.jpg
source_hash: e767669e
source_locale: en
---
## **Construção de Análise de Dados para Incorporação – Simples. Rápido. Previsível.**

Esse é o nosso título para o Reveal.  Desde que lançamos nosso produto de [análise incorporada](/embedded-analytics), tivemos 3 objetivos principais:

- **Integração Rápida e Fácil** – Fornecer uma solução de análise de dados fácil de integrar que os clientes possam incorporar em seus aplicativos existentes sem requisitos adicionais. [A arquitetura flexível e as ricas APIs do Reveal](https://static.infragistics.com/marketing/reveal/reveal-architecture-and-security-2021-02.pdf?_ga=2.4049392.1164794683.1623678258-1759676262.1615825090&gasource=google&gamedium=organic&gacampaign=(not%20set)&gaterm=(not%20provided)) dão controle sobre os recursos em seu aplicativo, tornando-o parte perfeita da experiência do usuário no aplicativo.
- **Experiência de Usuário Superior**– Excite seus usuários tornando fácil para eles criar, editar e aplicar modelos de aprendizado de máquina em suas próprias visualizações de dados sem sair do seu aplicativo. Aumente a adoção de [tomada de decisão baseada em evidências](/blog/reveal-data-driven-decision-making).
- **Preços Transparentes e Acessíveis** – Saiba exatamente quanto você pagará sem surpresas. Com nosso preço fixo e simples, você pode alcançar um número ilimitado de usuários em qualquer dispositivo sem pagar taxas de uso extras.

Nosso objetivo é entregar uma experiência de usuário final incrível para BI self-service, análise de dados profunda e [storytelling de dados](/glossary/data-driven-storytelling).  Com isso, uma experiência de SDK fácil de usar e começar. Isso significa uma experiência simples e bonita com o nível certo de recursos que entregam valor esmagador a você e seus stakeholders.

Com isso em mente, focamos nossos esforços nestas 4 áreas:

- Conectores de Dados
- Experiência de Usuário de Visualização de Dados
- API Fácil de Usar no SDK
- Análise Avançada / Inteligência Artificial

Historicamente, trabalhamos em ciclos de 8 a 10 semanas para recursos principais, com hotfixes mensais e sob demanda. Em outras palavras, você pode esperar grandes recursos a cada poucos meses (como um novo conector de dados ou um novo tipo de gráfico) e recursos menores ou correções de bugs em base mensal ou antes.

*Para bugs, se você tiver um bug crítico para o qual não pudermos fornecer uma solução alternativa, nós o disponibilizaremos assim que for corrigido*\*– sabemos que você está construindo software assim como nós, então podemos entender a importância e a urgência de tal assunto.\*

*Ao instalar / atualizar o SDK, você pode selecionar a versão; à medida que os bugs são corrigidos, nós informaremos qual versão instalar.*

## O Que Lançamos em 2022

2022 foi um grande ano de entrega de recursos. Alguns dos destaques maiores foram o servidor NodeJS e o Reveal Dom. Com o servidor NodeJS, equipes que estão construindo aplicativos em Angular, React, Vue e outras plataformas web modernas têm uma nova opção além das variantes existentes de servidor ASP.NET Core e Java do SDK. O projeto Reveal Dom é um Document Object Model (DOM) para o formato de arquivo Reveal .rdash. Ele permite que desenvolvedores usando o Reveal SDK carreguem, editem e criem painéis usando .NET.

Junto com esses recursos maiores, abordamos uma tonelada de solicitações de recursos e atualizações de clientes existentes e continuamos avançando com fontes de dados e capacidades de gráficos atualizadas. Aqui está uma lista completa de atualizações até agora neste ano.

### Experiência de Usuário de Visualização de Dados

- Nova API e UI que permite o nível de zoom do gráfico + uma barra de rolagem que define o nível inicial de zoom horizontal ou vertical de um gráfico que ativa uma barra de rolagem.
- Nova API que permite atribuição de cores para uma série de gráfico.
- Nova API para personalizar limites no agrupamento “Outros” do Gráfico de Pizza.
- Novas visualizações para todos os tipos de gráficos, incluindo novas cores de série e opções de rótulos de dados.

### Conectores de Dados

- Google Search Console Data Connector
- Salesforce Marketing Cloud updates
- Google Analytics updates

### SDK

- Novo Servidor NodeJS.
- Nova opção global CDN para Reveal Client SDK para Web.
- Exportação Headless para operações de exportação no lado do servidor.
- Novo filtro interativo de gráfico.
- Novo callback que permite um diálogo de fonte de dados personalizado e retorna a fonte de dados selecionada e define na visualização.
- Nova caixa de texto de Pesquisa/Filtro de Fonte de Dados para encontrar simplesmente fontes de dados específicas para usar em uma visualização.
- Novas opções de Localização/Formatação para JavaScript SDK.
- Novas propriedades de Metadados para fontes de dados baseadas em cubo.
- Nova propriedade para alterar a cor de fundo da visualização.
- Nova Propriedade para mostrar/ocultar o Título de um painel (nome + kebab).
- Novo filtro no lado do servidor para nomes de objetos de dados.
- Novas opções para definir a Taxa de Atualização em uma fonte de dados.
- Remover dependência Puppeteer para exportações com Playwright.
- Manipulação de Data atualizada para fontes de dados REST.
- Enumeração atualizada para adicionar fontes de dados adicionais.
- Manipulação atualizada de nomes de arquivos de painel – agora eles são insensíveis a maiúsculas e minúsculas, o que significa que você não precisa escrever código adicional para passar um nome de painel como variável.
- Opções atualizadas para que os usuários possam visualizar datas em seu fuso horário local, onde anteriormente as datas eram exibidas conforme obtidas do banco de dados.
- Tamanho de arquivo melhorado para o Reveal client SDK compactado.

## Roteiro do Reveal para 2023

Nosso roteiro é orientado pelo cliente. Tudo o que adicionamos é baseado no feedback e na demanda dos clientes. Embora possamos adicionar itens que acreditamos nos tornar competitivos no mercado ou recursos baseados na direção geral do mercado ou feedback de analistas, estamos constantemente ajustando e nos adaptando ao que você precisa para entregar software de sucesso.

Na primeira metade de 2023, estamos focados em alguns itens de grande porte:

- UX de Tooltip Melhorada para Drilldown e Filtragem de Gráfico
- Melhorando a UX geral do Gráfico com Barra de Ferramentas de Gráfico e Linhas Fixas
- Refatorando o client SDK para remover dependência jQuery
- API Melhorada para Reveal View no client SDK (API simplificada)
- Conector de dados MongoDB

Como o maior recurso de UX é o trabalho na Barra de Ferramentas de Gráfico, vamos dar uma olhada na direção que estamos tomando para que você saiba o que esperar.

### Barra de Ferramentas de Gráfico

O recurso de barra de ferramentas de gráfico visa dar ao criador e ao visualizador mais capacidades de análise em cada visualização em um painel. Com base no tipo de gráfico (medidor, gráfico de pizza, gráfico de linhas, gráfico de barras, etc.), você terá diferentes opções disponíveis.

Aqui está um exemplo da barra de ferramentas em um gráfico de linhas típico:

![chart toolbar feature](/images/2022/07/embedded-analytics-Chart-Toolbar-1024x278.jpg)

A barra de ferramentas não está sempre visível; ela estará visível quando a visualização estiver em estado de hover:

![embedded analytics dashboard example](/images/2022/07/embedded-dashboard-1024x544.jpg)

Ao clicar nos itens da barra de ferramentas, você verá mais opções para personalizar sua experiência de análise. Por exemplo, há o botão Barra de Ferramentas Analisar, onde você pode adicionar linhas fixas, linhas de tendência, fazer detecção de outliers, etc., com menus de aprofundamento que fornecem recursos adicionais para mostrar/ocultar no painel.

![analyze toolbar item feature](/images/2022/07/embedded-analytics-Analyze-Toolbar-Item.jpg)

Qualquer linha fixa que foi adicionada quando um criador de painel construiu o painel é visível por padrão, mas um visualizador de painel pode ativar ou desativar a linha fixa ao visualizar. O SDK dará a você as opções para ativar ou desativar itens de menu por padrão, então, por exemplo, você pode optar por ocultar a opção Barra de Ferramentas Analisar por completo, forçando o visualizador a ver apenas o que o criador definiu.

### Personalização de Linhas

Como criador, você tem as mesmas opções na barra de ferramentas para Analisar, no entanto, você tem mais controle sobre o que é mostrado e como é mostrado. Por exemplo, você pode personalizar parâmetros em linhas fixas, pode adicionar múltiplas linhas fixas de Percentil ou linhas fixas personalizadas com rótulos personalizados, como Meta de Receita ou Conversão Alvo.

Aqui está um exemplo de como o menu suspenso aparece ao criar um painel:

![creator fixed lines feature](/images/2022/07/embedded-analytics-Creator-Fixed-Lines-1024x538.jpg)

Além disso, você verá uma nova seção Linhas de Análise em Configurações, que permite personalizar ainda mais o visual das linhas que você está adicionando à visualização.

![creator customize line styles ](/images/2022/07/embedded-analytics-Creator-Customize-Line-Styles-1024x540.jpg)

Você verá opções para personalizar:

- Cor
- Espessura da Linha
- Estilo da Linha (Sólido, Pontilhado, Traço, Traço Médio, Traço Médio / Traço Curto, Traço Longo, Traço Longo / Traço Curto, Traço Longo / Traço Curto / Traço Curto)

## Conclusão

Espero que este blog lhe dê uma boa ideia do que estamos planejando para 2023, com um pouco mais de detalhes no grande recurso de Barra de Ferramentas de Gráfico e Linhas Fixas. Dar mais recursos de análise aos seus clientes é o objetivo desses recursos. Se houver outras opções que você gostaria de ver, não hesite em nos informar! Como de costume, um rápido aviso: roteiros são aspiracionais – nosso objetivo é entregar tudo o que nos propomos, mas algumas coisas inevitavelmente serão adiadas. Se você está procurando por recursos que não vê, tem uma nova ideia de produto, uma pergunta sobre o produto ou um problema de produto, envie-me um e-mail diretamente para [CaseyM@revealbi.io](mailto:CaseyM@revealbi.io) e vamos conversar!
