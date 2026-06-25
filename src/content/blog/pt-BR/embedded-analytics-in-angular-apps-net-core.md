---
title: Como Integrar Análise Incorporada em Aplicativos Angular com .NET Core
description: >-
  Descubra como integrar análise incorporada em aplicativos Angular com um
  backend .NET Core, para melhores capacidades de tomada de decisão que
  impulsionam o engajamento e o ROI.
date: '2025-01-20'
author: Casey Ciniello
cover: >-
  /images/2025/01/reveal-embedded-analytics-in-angular-app-with-net-core-thumbnail.png
heroImage: >-
  /images/2025/01/reveal-embedded-analytics-in-angular-app-with-net-core-header-1.svg
summary: >-
  Com o Reveal, incorporar análise em seu aplicativo Angular usando .NET Core
  entrega insights em tempo real diretamente nos fluxos de trabalho do seu
  aplicativo, eliminando a necessidade de ferramentas externas ou troca de
  contexto. Este guia torna isso simples, cortando a complexidade para mostrar
  como entregar análises que são naturais, rápidas e fluidas.
categories:
  - Insights Técnicos
seo:
  title: Como Integrar Análise Incorporada em Aplicativos Angular com .NET Core
  description: >-
    Descubra como integrar análise incorporada em aplicativos Angular com um
    backend .NET Core, para melhores capacidades de tomada de decisão que
    impulsionam o engajamento e o ROI.
  ogTitle: Como Integrar Análise Incorporada em Aplicativos Angular com .NET Core
  ogDescription: >-
    Descubra como integrar análise incorporada em aplicativos Angular com um
    backend .NET Core, para melhores capacidades de tomada de decisão que
    impulsionam o engajamento e o ROI.
  ogType: article
  twitterTitle: Como Integrar Análise Incorporada em Aplicativos Angular com .NET Core
  twitterDescription: >-
    Descubra como integrar análise incorporada em aplicativos Angular com um
    backend .NET Core, para melhores capacidades de tomada de decisão que
    impulsionam o engajamento e o ROI.
  ogImage: >-
    /images/2025/01/reveal-embedded-analytics-in-angular-app-with-net-core-thumbnail.png
source_hash: 1b5bce47
source_locale: en
---
## Introdução à Análise Incorporada em Angular e .NET Core

A análise incorporada não é mais um recurso opcional—é uma necessidade para aplicações modernas. Em 2025, os usuários exigem acesso contínuo a insights em tempo real diretamente nas ferramentas que usam diariamente. Ao integrar análise incorporada em aplicações Angular com um backend .NET Core, as empresas podem elevar seus produtos com capacidades de tomada de decisão orientada por dados que impulsionam o engajamento e o ROI.

Este guia fornece um walkthrough completo sobre a incorporação de análise em seus produtos de software usando [Reveal Embedded Analytics](/embedded-analytics). Se você é um desenvolvedor integrando análises ou um gerente de produto planejando melhorias de recursos, este guia passo a passo fornece os insights que você precisa.

## Entendendo a Análise Incorporada

Análise incorporada refere-se à integração de ferramentas de visualização de dados e inteligência de negócios (BI) diretamente em aplicações de software. Diferentemente das soluções de BI autônomas, a análise incorporada permite que os usuários acessem insights no contexto sem precisar alternar entre plataformas.

### **Por que a Análise Incorporada é Essencial?**

- **Fluxos de Trabalho Otimizados:** Os usuários podem analisar dados e tomar ações dentro de uma única aplicação.

- **Melhor Experiência do Usuário:** Insights conscientes do contexto reduzem o atrito e aprimoram a tomada de decisão.

- **Aumento do Valor do Produto:** Aplicações equipadas com capacidades analíticas se diferenciam em mercados competitivos.

### **Benefícios da Integração**

Combinar os recursos de frontend dinâmicos do Angular com a robusta infraestrutura de backend do .NET Core cria um poderoso framework cliente/servidor.

**Adicionar análise incorporada a essa combinação fornece:**

1. **Funcionalidade Aprimorada:** Entregue insights acionáveis em tempo real.

2. **Retenção de Usuários:** Mantenha os usuários engajados abordando suas necessidades analíticas.

3. **Escalabilidade:** Angular e .NET Core suportam aplicações projetadas para crescer com o seu negócio.

## Configurando o Ambiente de Desenvolvimento

Integrar análise incorporada em suas aplicações Angular com um backend .NET Core pode melhorar significativamente a experiência do usuário, fornecendo insights contextuais e em tempo real.

As instruções abaixo descrevem os passos para configurar seu ambiente de desenvolvimento e implementar o Reveal de forma contínua.

Antes de integrar análise incorporada, certifique-se de que seu ambiente de desenvolvimento esteja configurado corretamente.

### **Pré-requisitos:**

1. **Angular CLI:** Para criar e gerenciar aplicações Angular.

2. **.NET Core SDK:** Para construir serviços de backend.

3. **Node.js:** Necessário para desenvolvimento Angular.

4. **Reveal SDK:** Para incorporar análises em sua aplicação.

## **Guia Passo a Passo: Configurando a Análise Incorporada Reveal em Angular**

### \*\*\*Passo 1:\*\*\**Criar o App Angular*

1. **Abrir Seu Terminal:** Inicie seu aplicativo de terminal favorito para começar

![windows terminal](/images/2025/02/image.jpg)

1. **Navegar para o Diretório da Aplicação:** Mude os diretórios para o aplicativo recém-criado e abra-o em seu editor de código preferido (*ex: **[Visual Studio Code](https://code.visualstudio.com/)***)

```
ng new getting-started
```

1. **Node.js:** Necessário para desenvolvimento Angular.

```
cd getting-started 

code
```

### \*\*\*Passo 2:\*\*\**Adicionar a API JavaScript Reveal*

1. **Modificar o Arquivo index.html**
   Abra o arquivo index.html e adicione o seguinte script para a API JavaScript Reveal logo antes da tag de fechamento </body>:

```
<script src="https://dl.revealbi.io/reveal/libs/1.7.1/infragistics.reveal.js"></script>
```

1. **Instalar Dependências Adicionais**
   Inclua as seguintes bibliotecas necessárias no mesmo arquivo:

**jQuery 2.2 ou Superior:**

```
<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
```

**Day.js 1.8.15 ou Superior:**

```
<script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script>
```

**Atualizar o index.html Final**
Seu arquivo index.html deve ficar assim:

```
<!doctype html> 
<html lang="en"> 
<head> 
  <meta charset="utf-8"> 
  <title>GettingStarted</title> 
  <base href="/"> 
  <meta name="viewport" content="width=device-width, initial-scale=1"> 
  <link rel="icon" type="image/x-icon" href="favicon.ico">   
</head> 
<body> 
  <app-root></app-root> 
 
  <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script> 
  <script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script> 
  <script src="https://dl.revealbi.io/reveal/libs/1.7.1/infragistics.reveal.js"></script> 
</body> 
</html>
```

### \*\*\*Passo 3:\*\*\**Inicializar a View Reveal*

**Atualizar o Componente HTML**
Abra o arquivo src/app/app.component.html, delete seu conteúdo e adicione o seguinte <div> para criar um placeholder para a view Reveal:

```
<div #revealView style="height: 100vh; width: 100%; position:relative;"></div>
```

**Atualizar o Componente HTML**
Abra o arquivo src/app/app.component.html para fazer as seguintes atualizações:

Declarar jQuery: No topo do arquivo, declare uma variável para garantir que o TypeScript possa compilar seu JavaScript:

```
declare let $: any;
```

**Adicionar uma Propriedade ViewChild:** Referencie o revealView definido no arquivo HTML:

```
@ViewChild('revealView') el!: ElementRef;
```

\*\*

**Implementar a Interface AfterViewInit:** Inicialize a view Reveal no método de ciclo de vida ngAfterViewInit:

```
ngAfterViewInit(): void { 
 
var revealView = new $.ig.RevealView(this.el.nativeElement); }
```

**app.component.ts final: Seu componente TypeScript completo deve ficar assim:**

```
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core'; 
declare let $: any; 
@Component({ 
  selector: 'app-root', 
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.scss'] 
}) 
export class AppComponent implements AfterViewInit { 
  @ViewChild('revealView') el!: ElementRef; 
  ngAfterViewInit(): void { 
    var revealView = new $.ig.RevealView(this.el.nativeElement); 
  } 
}
```

**Definir a URL Base do SDK Reveal:**
Se o seu aplicativo cliente for hospedado em uma URL diferente do servidor, certifique-se de definir a URL base:

### \*\*\*Passo 4:\*\*\**Executar o Aplicativo*

**Iniciar o Aplicativo**
No terminal, execute o seguinte comando:

```
npm: npm start 
Yarn: yarn start 
Pnpm:pnpm start
```

**Testar Seu Aplicativo**
Assim que o aplicativo iniciar, abra-o em seu navegador. A view Reveal deve ser inicializada com sucesso.

**Parabéns!**

Você criou com sucesso seu primeiro aplicativo Angular com o Reveal SDK. Com esta configuração, você está pronto para alavancar o poder da análise incorporada para aprimorar a experiência de seus usuários e impulsionar insights acionáveis.

Aproveite o Poder dos Dados

Cresça seu negócio com dados contextuais e em tempo real.

[Solicitar uma Demo](/request-demo)

## Melhores Práticas e Considerações

**Medidas de Segurança**

- **Autenticação:** Implemente mecanismos de autenticação robustos, como OAuth ou JWT, para proteger dados sensíveis.

- **Controle de Acesso a Dados:** Use permissões baseadas em funções para garantir que os usuários acessem apenas o que estão autorizados a visualizar.

- **HTTPS:** Use sempre conexões seguras para transmissão de dados.

**Otimização de Desempenho**

- **Cache de Dados:** Reduza a carga do servidor armazenando em cache dados acessados frequentemente.

- **Carregamento Preguiçoso (Lazy Loading):** Carregue painéis e componentes apenas quando necessário para melhorar a velocidade do aplicativo.

- **Otimização de Backend:** Otimize consultas de banco de dados para lidar com grandes conjuntos de dados de forma eficiente.

## Conclusão

Integrar análise incorporada em aplicações Angular com um backend .NET Core é um divisor de águas para produtos de software modernos. Ao seguir este guia, você pode aprimorar seu aplicativo com capacidades analíticas robustas, impulsionando valor para os usuários. O Reveal Embedded Analytics torna esse processo contínuo, oferecendo ferramentas poderosas para incorporar visualizações de dados, garantindo segurança e otimizando o desempenho.

Pronto para levar seu aplicativo para o próximo nível? Agende uma chamada no site [Reveal](https://samples.revealbi.io/reveal-sdk-samples/2020-survey-results.html) para ver como podemos resolver suas necessidades de análise incorporada.
