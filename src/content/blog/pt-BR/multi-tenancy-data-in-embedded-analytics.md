---
title: Como Usar Dados Multilocatários em Análise Incorporada
description: >-
  Os serviços de multilocatário reduzem a complexidade e as personalizações
  frequentemente necessárias ao incorporar BI em seu software OEM, aplicativo
  ERP ou outros aplicativos SaaS.
date: '2021-09-23'
author: Bilyana Petrova
cover: /images/2021/09/multi-tenant-data-in-embedded-analytics.png
summary: >-
  Os serviços de multilocatário reduzem a complexidade e as personalizações
  frequentemente necessárias ao incorporar BI em seu software OEM, aplicativo
  ERP ou outros aplicativos SaaS. Suas capacidades permitem que você mantenha
  facilmente o isolamento de dados, ao mesmo tempo que suporta múltiplas tarefas
  dentro da mesma conta ou organização.
categories:
  - Tendências de Análise SaaS
seo:
  title: Como Usar Dados Multilocatários em Análise Incorporada?
  description: >-
    Os serviços de multilocatário reduzem a complexidade e as personalizações
    frequentemente necessárias ao incorporar BI em seu software OEM, aplicativo
    ERP ou outros aplicativos SaaS.
  ogTitle: Como Usar Dados Multilocatários em Análise Incorporada?
  ogDescription: >-
    Os serviços de multilocatário reduzem a complexidade e as personalizações
    frequentemente necessárias ao incorporar BI em seu software OEM, aplicativo
    ERP ou outros aplicativos SaaS.
  ogType: article
  twitterTitle: Como Usar Dados Multilocatários em Análise Incorporada?
  twitterDescription: >-
    Os serviços de multilocatário reduzem a complexidade e as personalizações
    frequentemente necessárias ao incorporar BI em seu software OEM, aplicativo
    ERP ou outros aplicativos SaaS.
  ogImage: /images/2021/09/multi-tenant-data-in-embedded-analytics.png
source_hash: d76aa5e8
source_locale: en
---
Com o aumento e a disseminação das plataformas de computação em nuvem, as organizações estão considerando cada vez mais hospedar aplicações de análise em infraestrutura compartilhada. A arquitetura multilocatária é o que elas têm buscado e o que pesa em sua decisão de fazer essa mudança – ela alavanca recursos compartilhados, economiza tempo e preocupações, e reduz custos operacionais.

Este artigo descreve o significado da arquitetura de dados multilocatária, aponta seus benefícios e mostra como você pode usar dados multilocatários em uma [solução de análise incorporada](/embedded-analytics).

[Ver o Reveal em Ação](/request-demo)

## O Que É Multilocatário?

Multilocatário é uma arquitetura de software na qual uma única instância atende a múltiplos clientes chamados inquilinos (tenants). É o oposto da arquitetura de locatário único, na qual a instância do software atende apenas um cliente.

A arquitetura multilocatária é um recurso em muitos tipos de computação em nuvem pública, um dos melhores exemplos dos quais são as ofertas [SaaS](/blog/embedded-analytics-for-saas-companies) (software como serviço). Os inquilinos de uma arquitetura multilocatária geralmente têm a capacidade de personalizar algumas partes da aplicação. Eles podem ser capazes de [personalizar o visual e a experiência da aplicação para atender à marca do cliente](/blog/white-label-analytics) e controlar as permissões e restrições de acesso dos usuários. Os inquilinos não podem personalizar o código da aplicação.

Uma maneira fácil de entender exatamente o que é multilocatário é pensar na [indústria bancária](/banking-analytics) e como ela funciona. Este exemplo é frequentemente usado para descrever o significado de multilocatário, pois realmente oferece uma compreensão mais clara:

Os bancos são [instituições financeiras](/finance-analytics) que gerenciam depósitos, concedem empréstimos e guardam o dinheiro das pessoas. Eles podem armazenar o dinheiro de centenas e milhares de pessoas de forma completamente separada, independentemente do fato de estarem realmente armazenados no mesmo local. Essas pessoas não têm acesso às contas de outras pessoas e não interagem de forma alguma entre si. É basicamente o mesmo ao usar uma arquitetura multilocatária. Os clientes do fornecedor do software usam a mesma infraestrutura e os mesmos servidores; no entanto, sua lógica de negócios e dados são totalmente separados e seguros.

![o que é multilocatário?](/images/2021/09/multi-tenant-architecture.png)

## Quais São os Benefícios do Multilocatário?

Investir em uma aplicação SaaS multilocatária vem com sua justa parcela de vantagens. Os benefícios da arquitetura multilocatária versus aplicações de locatário único hospedadas por terceiros incluem o seguinte:

![benefícios da arquitetura multilocatária para aplicações de análise incorporada](/images/2021/09/benefits-of-multi-tenancy.png)

### Custos Reduzidos

Quando múltiplos clientes compartilham a mesma infraestrutura e servidores, um fornecedor de software pode oferecer seus serviços por um preço muito mais baixo para esse grupo de pessoas em comparação com o fornecimento de sua própria infraestrutura dedicada para cada cliente. A arquitetura de software multilocatária também permite que os recursos sejam eficientemente consolidados e alocados, economizando custos operacionais.

### Atualizações e Manutenção Contínuas

As aplicações SaaS frequentemente fazem atualizações em seus serviços, adicionam novos recursos e funcionalidades e mantêm seu software atualizado. Com uma arquitetura multilocatária, os clientes não precisam pagar taxas caras de manutenção e atualizações, pois geralmente estão incluídas na assinatura do software.

Todos os custos adicionais são compartilhados por todos os inquilinos que usam a mesma infraestrutura, o que reduz o custo geral para cada inquilino.

### Economiza Tempo

Assinar uma aplicação SaaS multilocatária significa que não é mais o seu hardware para gerenciar e se preocupar. Você recebe a versão mais recente do software fornecida pelo provedor, economizando muito tempo e despesas. Ao liberar o tempo de TI, eles podem se concentrar em outras tarefas, questões e inovações importantes.

### Escalabilidade

Em aplicações de arquitetura multilocatária, o espaço do servidor aumenta e diminui com base na força do inquilino, o que significa que o fornecedor não precisa construir um novo data center para cada inquilino, como nas soluções de locatário único.

E não é só isso. Alguns benefícios adicionais do multilocatário incluem a vantagem de usar recursos avançados como IoT, IA e [machine learning](/glossary/machine-learning). A qualidade também é garantida – para que o software seja viável em um ambiente multilocatário, ele deve atender a certos padrões de controle de qualidade. Também pode ajudar a otimizar processos de fluxo de trabalho adotando as melhores práticas da indústria incorporadas diretamente nas soluções.

## Como Usar Dados Multilocatários em Análise Incorporada?

Então, você quer fornecer análises aos seus clientes e adicionar painéis e gráficos ao seu aplicativo – ótimo! [A análise incorporada tem muitos benefícios](/blog/benefits-of-embedded-analytics), mas é importante garantir que, ao incorporar uma solução de análise em seu aplicativo web ou software, diferentes usuários e clientes não consigam acessar e ver dados que não são deles. Os fornecedores de análise incorporada garantem que os dados sejam privados e protegidos, oferecendo uma arquitetura multilocatária como parte de sua solução.

Vale mencionar que plataformas modernas de [BI](/glossary/business-intelligence) suportam estruturas de segurança e implantação integradas que funcionam perfeitamente em ambientes de hospedagem multilocatária. Isto é dizer que, ao usar dados multilocatários em análise incorporada, você obtém uma plataforma [BI incorporável](/glossary/embedded-bi-business-intelligence) que se encaixa perfeitamente em sua arquitetura SaaS, ao mesmo tempo que estende o valor de seu produto/serviço principal.

Os serviços multilocatários reduzem a complexidade e as personalizações que são frequentemente necessárias ao incorporar BI em seu [software OEM](/glossary/oem-software), [aplicativo ERP](/blog/erp-and-embedded-analytics) ou outros aplicativos SaaS. Seus recursos permitem que você mantenha facilmente o isolamento de dados enquanto suporta múltiplas tarefas dentro da mesma conta ou organização ao mesmo tempo. Por exemplo, se você é um [ISV](/isv-analytics), você pode atribuir um espaço de isolamento dedicado a diferentes usuários dentro da mesma conta do cliente. Isso permite que esses usuários compartilhem conteúdo apenas com outros que são atribuídos no mesmo espaço de isolamento, eliminando a possibilidade de expor quaisquer dados a outras partes.

Aqui está um exemplo de duas organizações diferentes usando o mesmo fornecedor de análise incorporada e compartilhando os mesmos servidores, bancos de dados e caches de dados:

Você pode notar que tudo – os dados, os logotipos, as fontes e as cores – é específico do inquilino.

![dados multilocatários em análise incorporada](/images/2021/09/multi-tenancy-in-embedded-analytics.png)

## Meus Dados Estão Seguros com Multilocatário?

Ao fornecer soluções de análise multilocatária aos seus clientes, você precisa ser capaz de fornecer a cada inquilino uma experiência personalizada, ao mesmo tempo em que mantém seus dados seguros. A segurança multilocatária em análise incorporada permite que você se conecte a diferentes modelos de dados e mostre dados específicos apenas para inquilinos autorizados.

Uma solução em nuvem verdadeiramente segura vem com as mesmas medidas de segurança para cada usuário na nuvem – tanto interna quanto externamente. Firewalls por inquilino são obrigatórios para garantir que cada inquilino em uma arquitetura multilocatária esteja protegido e que seus dados não sejam comprometidos. Isso deve estar disponível para cada inquilino; caso contrário, a segurança de cada inquilino pode estar em risco.

Outro aspecto importante de um ambiente multilocatário seguro é seu data center ou a segurança física do hardware que o abriga. Se o data center que abriga seu hardware não for seguro, seus dados também não serão.

Em outras palavras, a resposta curta para esta pergunta é sim – tipicamente, você não tem nada a se preocupar; seus dados são protegidos com multilocatário. No entanto, encorajamos fortemente que você faça sua pesquisa e conheça toda a arquitetura e segurança antes de investir em qualquer aplicação SaaS multilocatária. Embora essas aplicações não estariam no mercado se não fossem confiáveis, vale a pena explorar suas opções para encontrar uma solução que melhor se adapte às suas necessidades.

## Reveal Análise Incorporada

Reveal é uma solução de análise incorporada multilocatária que foi construída do zero, com sua segurança como a prioridade número 1. O servidor do Reveal tem a capacidade de separar dados e serviços com base nos inquilinos, para que você possa ter certeza de que seus dados estão bem protegidos.

Uma determinada organização, por exemplo, pode ser configurada para usar uma área de armazenamento separada, o que significa que todos os dados (equipes, painéis e até dados em cache) serão armazenados em armazenamento dedicado, e até mesmo os serviços em tempo de execução podem ser isolados. Isso garante que o desempenho dessa organização não será afetado pela carga do restante do sistema.

Comece Hoje

Alavanque recursos compartilhados, economize tempo e reduza custos operacionais com a arquitetura multilocatária do Reveal.

[VER COMO FUNCIONA](/request-demo)
