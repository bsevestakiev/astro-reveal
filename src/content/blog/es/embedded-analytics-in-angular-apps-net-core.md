---
title: Cómo integrar analítica integrada en aplicaciones Angular con .NET Core
description: >-
  Descubre cómo integrar analítica integrada en aplicaciones Angular con un
  backend .NET Core, para mejores capacidades de toma de decisiones que impulsan
  el compromiso y el ROI.
date: '2025-01-20'
author: Casey Ciniello
cover: >-
  /images/2025/01/reveal-embedded-analytics-in-angular-app-with-net-core-thumbnail.png
heroImage: >-
  /images/2025/01/reveal-embedded-analytics-in-angular-app-with-net-core-header-1.svg
summary: >-
  Con Reveal, la integración de analítica en tu aplicación Angular usando .NET
  Core ofrece información en tiempo real directamente dentro de los flujos de
  trabajo de tu aplicación, eliminando la necesidad de herramientas externas o
  cambio de contexto. Esta guía lo hace simple, cortando la complejidad para
  mostrarte cómo ofrecer analítica que es natural, rápida y fluida.
categories:
  - Perspectivas Técnicas
seo:
  title: Cómo Integrar Analítica Integrada en Aplicaciones Angular con .NET Core
  description: >-
    Descubre cómo integrar analítica integrada en aplicaciones Angular con un
    backend .NET Core, para mejores capacidades de toma de decisiones que
    impulsan el compromiso y el ROI.
  ogTitle: Cómo Integrar Analítica Integrada en Aplicaciones Angular con .NET Core
  ogDescription: >-
    Descubre cómo integrar analítica integrada en aplicaciones Angular con un
    backend .NET Core, para mejores capacidades de toma de decisiones que
    impulsan el compromiso y el ROI.
  ogType: article
  twitterTitle: Cómo Integrar Analítica Integrada en Aplicaciones Angular con .NET Core
  twitterDescription: >-
    Descubre cómo integrar analítica integrada en aplicaciones Angular con un
    backend .NET Core, para mejores capacidades de toma de decisiones que
    impulsan el compromiso y el ROI.
  ogImage: >-
    /images/2025/01/reveal-embedded-analytics-in-angular-app-with-net-core-thumbnail.png
source_hash: 1b5bce47
source_locale: en
---
## Introducción a la Analítica Integrada en Angular y .NET Core

La analítica integrada ya no es una característica opcional, sino una necesidad para las aplicaciones modernas. En 2025, los usuarios exigen un acceso sin interrupciones a información en tiempo real directamente dentro de las herramientas que utilizan a diario. Al integrar la analítica integrada en aplicaciones Angular con un backend de .NET Core, las empresas pueden elevar sus productos con capacidades de toma de decisiones basadas en datos que impulsan el compromiso y el ROI.

Esta guía proporciona un recorrido completo sobre cómo integrar la analítica en sus productos de software utilizando [Reveal Embedded Analytics](/embedded-analytics). Ya sea que usted sea un desarrollador que integra analítica o un gerente de producto que planifica mejoras de funciones, esta guía paso a paso le proporcionará la información que necesita.

## Comprendiendo la Analítica Integrada

La analítica integrada se refiere a la integración de herramientas de visualización de datos y de inteligencia de negocios (BI) directamente en las aplicaciones de software. A diferencia de las soluciones de BI independientes, la analítica integrada permite a los usuarios acceder a información en contexto sin cambiar entre plataformas.

### **¿Por qué es Esencial la Analítica Integrada?**

- **Flujos de trabajo optimizados:** Los usuarios pueden analizar datos y tomar medidas dentro de una única aplicación.

- **Mejora de la Experiencia del Usuario:** Los conocimientos conscientes del contexto reducen la fricción y mejoran la toma de decisiones.

- **Aumento del Valor del Producto:** Las aplicaciones equipadas con capacidades analíticas se diferencian en mercados competitivos.

### **Beneficios de la Integración**

Combinar las capacidades de frontend dinámico de Angular con la robusta infraestructura de backend de .NET Core crea un potente marco cliente/servidor.

**Añadir analítica integrada a esta mezcla proporciona:**

1. **Funcionalidad mejorada:** Entregue información procesable en tiempo real.

2. **Retención de usuarios:** Mantenga a los usuarios comprometidos abordando sus necesidades analíticas.

3. **Escalabilidad:** Angular y .NET Core admiten aplicaciones diseñadas para crecer con su negocio.

## Configuración del Entorno de Desarrollo

Integrar la analítica integrada en sus aplicaciones Angular con un backend de .NET Core puede mejorar significativamente la experiencia del usuario al proporcionar información contextual y en tiempo real.

Las instrucciones a continuación describen los pasos para configurar su entorno de desarrollo e implementar Reveal sin problemas.

Antes de integrar la analítica integrada, asegúrese de que su entorno de desarrollo esté configurado correctamente.

### **Prerrequisitos:**

1. **Angular CLI:** Para crear y gestionar aplicaciones Angular.

2. **.NET Core SDK:** Para construir servicios de backend.

3. **Node.js:** Requerido para el desarrollo Angular.

4. **Reveal SDK:** Para incrustar analítica en su aplicación.

## **Guía Paso a Paso: Configuración de Reveal Embedded Analytics en Angular**

### ***Paso 1:*** *Crear la Aplicación Angular*

1. **Abrir su Terminal:** Inicie su aplicación de terminal favorita para comenzar

![windows terminal](/images/2025/02/image.jpg)

1. **Navegar al Directorio de la Aplicación:** Cambie de directorio al nuevo directorio de la aplicación y ábralo en su editor de código preferido (*ej. **[Visual Studio Code](https://code.visualstudio.com/)***)

```
ng new getting-started
```

1. **Node.js:** Requerido para el desarrollo Angular.

```
cd getting-started 

code
```

### ***Paso 2:*** *Añadir la API JavaScript de Reveal*

1. **Modificar el Archivo index.html**
   Abra el archivo index.html y añada el siguiente script para la API JavaScript de Reveal justo antes de la etiqueta de cierre </body>:

```
<script src="https://dl.revealbi.io/reveal/libs/1.7.1/infragistics.reveal.js"></script>
```

1. **Instalar Dependencias Adicionales**
   Incluya las siguientes bibliotecas requeridas en el mismo archivo:

**jQuery 2.2 o superior:**

```
<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
```

**Day.js 1.8.15 o superior:**

```
<script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script>
```

**Actualizar el index.html final**
Su archivo index.html ahora debe verse así:

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

### ***Paso 3:*** *Inicializar la Vista de Reveal*

**Actualizar el Componente HTML**
Abra el archivo src/app/app.component.html, elimine su contenido y añada el siguiente <div> para crear un marcador de posición para la vista de Reveal:

```
<div #revealView style="height: 100vh; width: 100%; position:relative;"></div>
```

**Actualizar el Componente HTML**
Abra el archivo src/app/app.component.html para realizar las siguientes actualizaciones:

Declarar jQuery: En la parte superior del archivo, declare una variable para asegurar que TypeScript pueda compilar su JavaScript:

```
declare let $: any;
```

**Añadir una Propiedad ViewChild:** Haga referencia a revealView definido en el archivo HTML:

```
@ViewChild('revealView') el!: ElementRef;
```

\*\*

**Implementar la Interfaz AfterViewInit:** Inicialice la vista de Reveal en el método de ciclo de vida ngAfterViewInit:

```
ngAfterViewInit(): void { 
 
var revealView = new $.ig.RevealView(this.el.nativeElement); }
```

**app.component.ts final: Su componente TypeScript completo debe verse así:**

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

**Establecer la URL Base del SDK de Reveal:**
Si su aplicación cliente está alojada en una URL diferente al servidor, asegúrese de establecer la URL base:

### ***Paso 4:*** *Ejecutar la Aplicación*

**Iniciar la Aplicación**
En la terminal, ejecute el siguiente comando:

```
npm: npm start 
Yarn: yarn start 
Pnpm:pnpm start
```

**Probar su Aplicación**
Una vez que la aplicación se inicie, ábrala en su navegador. La vista de Reveal debería inicializarse correctamente.

**¡Felicidades!**

Ha creado con éxito su primera aplicación Angular con el SDK de Reveal. Con esta configuración, está listo para aprovechar el poder de la analítica integrada para mejorar la experiencia de sus usuarios e impulsar información procesable.

Aproveche el Poder de los Datos

Haga crecer su negocio con datos contextuales y en tiempo real.

[Solicitar una Demo](/request-demo)

## Mejores Prácticas y Consideraciones

**Medidas de Seguridad**

- **Autenticación:** Implemente mecanismos de autenticación robustos como OAuth o JWT para proteger datos sensibles.

- **Control de Acceso a Datos:** Utilice permisos basados en roles para asegurar que los usuarios accedan solo a lo que están autorizados a ver.

- **HTTPS:** Siempre utilice conexiones seguras para la transmisión de datos.

**Optimización del Rendimiento**

- **Almacenamiento en Caché de Datos:** Reduzca la carga del servidor almacenando en caché los datos accedidos con frecuencia.

- **Carga Diferida (Lazy Loading):** Cargue paneles y componentes solo cuando sea necesario para mejorar la velocidad de la aplicación.

- **Optimización del Backend:** Optimice las consultas de la base de datos para manejar grandes conjuntos de datos de manera eficiente.

## Conclusión

Integrar la analítica integrada en aplicaciones Angular con un backend de .NET Core cambia las reglas del juego para los productos de software modernos. Al seguir esta guía, puede mejorar su aplicación con capacidades analíticas robustas, impulsando valor para los usuarios. Reveal Embedded Analytics hace que este proceso sea sin problemas, ofreciendo herramientas potentes para incrustar visualizaciones de datos, garantizar la seguridad y optimizar el rendimiento.

¿Listo para llevar su aplicación al siguiente nivel? Reserve una llamada en el sitio web de [Reveal](https://samples.revealbi.io/reveal-sdk-samples/2020-survey-results.html) para ver cómo podemos resolver sus necesidades de analítica integrada.
