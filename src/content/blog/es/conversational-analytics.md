---
title: Analítica conversacional en analítica integrada
description: >-
  Aprenda cómo la IA convierte el lenguaje natural en información y cómo la
  analítica conversacional impulsa la adopción y monetización de productos SaaS
  e ISV
date: '2024-09-27'
author: Casey Ciniello
cover: /images/2024/09/reveal-conversational-analytics-thumbnail.jpg
heroImage: >-
  /blogs/conversational-analytics-in-emebedded-analytics-benefits/reveal-conversational-analytics-security-header.svg
summary: >-
  La analítica conversacional da a los usuarios una forma más rápida de obtener
  información al permitirles hacer preguntas directas en lugar de crear
  informes. Reduce la fricción en todo el producto y ayuda a los equipos a
  ofrecer respuestas claras sin clics o pasos técnicos adicionales. El desafío
  surge cuando el software de analítica conversacional depende de servicios
  externos de IA, lo que crea riesgos de seguridad y control de datos. Reveal
  resuelve esto con una arquitectura que mantiene la IA dentro de su entorno y
  aplica sus reglas existentes a cada solicitud. Obtiene una capa segura y
  flexible que admite consultas en lenguaje natural sin exponer sus datos.
takeaways:
  - >-
    La analítica conversacional mejora la velocidad de obtención de información
    al permitir que los usuarios soliciten métricas o vistas que necesitan en
    lenguaje sencillo.
  - >-
    Los paneles siguen siendo útiles, pero las consultas en lenguaje natural
    eliminan la fricción para preguntas de seguimiento o comparaciones rápidas.
  - >-
    La mayoría de las herramientas fallan en productos SaaS porque envían
    indicaciones y generación de SQL a proveedores externos, rompiendo la
    seguridad y el control.
  - >-
    Reveal mantiene la IA dentro de su entorno, aplica sus reglas existentes y
    evita que el modelo acceda a datos sin procesar.
  - >-
    Los desarrolladores obtienen control total sobre las intenciones, la UX y la
    selección del modelo, lo que les ayuda a lanzar funciones seguras en las que
    confían los usuarios.
categories:
  - Analítica de IA
seo:
  title: 'Analítica conversacional en BI integrado: por qué usarla y cómo'
  description: >-
    Aprenda cómo la IA convierte el lenguaje natural en información y cómo la
    analítica conversacional impulsa la adopción y monetización de productos
    SaaS e ISV
  ogTitle: 'Analítica conversacional en BI integrado: por qué usarla y cómo'
  ogDescription: >-
    Aprenda cómo la IA convierte el lenguaje natural en información y cómo la
    analítica conversacional impulsa la adopción y monetización de productos
    SaaS e ISV
  ogType: article
  twitterTitle: 'Analítica conversacional en BI integrado: por qué usarla y cómo'
  twitterDescription: >-
    Aprenda cómo la IA convierte el lenguaje natural en información y cómo la
    analítica conversacional impulsa la adopción y monetización de productos
    SaaS e ISV
  ogImage: /images/2024/09/reveal-conversational-analytics-thumbnail.jpg
source_hash: 0a4c79d9
source_locale: en
---
ChatGPT cambió la forma en que las personas esperan interactuar con la información. Tú escribes una pregunta y obtienes una respuesta clara en segundos. Este simple patrón ahora moldea las expectativas para cada parte de cada aplicación, y la analítica integrada sigue el ritmo. Los usuarios quieren respuestas directas a sus preguntas de datos sin pasos adicionales. La analítica conversacional ofrece esta experiencia.

Los informes aún ayudan a los usuarios a explorar datos, sin embargo, muchos quieren una forma más rápida de llegar a las ideas que ya tienen en mente. Quieren formular una pregunta y obtener el gráfico que coincida con ella, al igual que obtienen ideas de ChatGPT. Este cambio afecta a todas las industrias porque elimina la fricción para los usuarios con diferentes niveles de habilidades técnicas. Como resultado, muchos equipos de productos SaaS ahora ven la analítica conversacional como una parte central de su futura capa de analítica.

[73%](/embedded-analytics-statistics) de líderes tecnológicos planean expandir su uso de IA el próximo año, lo que demuestra lo rápido que están cambiando las expectativas. El lenguaje natural hace que la analítica sea más fácil de usar y expande el acceso a la información más allá de los usuarios avanzados. También cambia la forma en que los clientes juzgan el valor del producto, porque las respuestas más rápidas conducen a decisiones más rápidas.

La idea suena simple, pero la mayoría del software de analítica conversacional falla dentro de productos SaaS reales. Muchas herramientas dependen de servicios de IA externos, creando nuevos problemas de privacidad, control y exposición de datos. Estos riesgos son difíciles de aceptar en capas de analítica orientadas al cliente. Por eso los equipos necesitan comprender cómo funciona la analítica conversacional a nivel arquitectónico antes de añadirla a su hoja de ruta.

## ¿Qué es la Analítica Conversacional?

La analítica conversacional permite a los usuarios hacer preguntas sobre datos utilizando lenguaje natural y recibir respuestas en forma de gráficos, métricas o resúmenes. En lugar de crear informes o navegar por editores, los usuarios describen lo que quieren ver. El sistema traduce esa solicitud en una visualización o información utilizando la misma lógica que impulsa el resto de la capa de analítica.

Un ejemplo simple se ve así. Un usuario abre una aplicación SaaS y pregunta: "Muestra la tasa de abandono mensual por plan". El producto responde con un gráfico que sigue los mismos filtros, permisos y reglas de datos que cualquier otro panel de control de la aplicación. Sin crear informes. Sin conocimiento de esquemas. Solo una respuesta directa a una pregunta de negocio.

Esto suena sencillo, pero implementarlo dentro de un producto orientado al cliente introduce limitaciones que la mayoría de las herramientas no están diseñadas para manejar. Ahí es donde aparecen la mayoría de las brechas.

## Por Qué la Mayoría de las Herramientas de Analítica Conversacional No Encajan en Productos SaaS

Muchos equipos ven la promesa de la analítica conversacional, pero la mayoría de las herramientas no cumplen con las necesidades de los productos SaaS reales. Crean nuevos riesgos, rompen reglas centrales del producto o obligan a los equipos a depender de sistemas externos que no pueden controlar. Estos problemas aparecen al principio de la implementación y crecen rápidamente a medida que se expande la base de usuarios.

![Why most conversational analytics tools do no fit SaaS Products](https://static.infragistics.com/marketing/reveal/blogs/conversational-analytics-in-emebedded-analytics-benefits/reveal-why-convo-analytics-tools-dont-fit-saas-products-body.webp)

### Los Servicios de IA Externos Envían Datos Fuera de su Entorno

La mayoría del software de analítica conversacional depende de modelos alojados en la nube que procesan las indicaciones de los usuarios y los metadatos fuera de su entorno. Esto rompe la postura de seguridad de las plataformas SaaS que manejan registros sensibles. [51%](/embedded-analytics-statistics) de líderes tecnológicos identifican la seguridad como su principal desafío de desarrollo para 2025. Enrutar consultas de analítica a través de modelos de terceros aumenta este riesgo y crea nuevas preocupaciones de cumplimiento.

### Los Modelos Genéricos No Pueden Seguir las Reglas de Seguridad del Producto

Los modelos externos no pueden aplicar su seguridad a nivel de fila ni su lógica de inquilino. No saben qué cliente, rol o grupo debe ver qué campos. Un usuario puede hacer una pregunta simple, pero el modelo puede extraer datos que violan sus reglas internas. Esto rompe la confianza y aumenta la carga de soporte en su equipo.

### La Analítica Conversacional Debe Coincidir con la UX del Producto

La mayoría de las herramientas genéricas proporcionan una ventana de chat que no se alinea con su producto. Introducen diseños, elementos y flujos que se sienten desconectados del resto de la aplicación. Esto debilita la experiencia y obliga a los equipos a mantener capas de UI inconsistentes. Los productos SaaS necesitan un flujo de trabajo conversacional que encaje en su experiencia existente de [**analítica integrada**](/embedded-analytics).

### Los Equipos SaaS Pierden el Control del Comportamiento y la Salida de la IA

El software de analítica conversacional genérico a menudo crea resultados impredecibles. Puede devolver campos irrelevantes, inventar métricas o crear gráficos que no siguen la lógica de su producto. Esto hace que la función sea poco fiable y aumenta el riesgo de decisiones incorrectas. Los equipos de producto necesitan predictibilidad, especialmente cuando la analítica moldea los resultados comerciales.

Estos desafíos muestran por qué la analítica conversacional debe ejecutarse dentro de su propio entorno.

## Por Qué la Analítica Conversacional Debe Ejecutarse Dentro de su Entorno

Los líderes SaaS necesitan un modelo que soporte la analítica conversacional sin debilitar la seguridad o perder el control del producto. Muchas herramientas fallan porque añaden otra capa fuera de su entorno. Un modelo mejor mantiene todo cerca de sus datos, sus reglas y sus usuarios.

### Mantenga Todos los Datos y la Lógica Dentro de su Propio Entorno

Un enfoque seguro mantiene todo el procesamiento dentro de su red. Su aplicación envía una solicitud a un servicio interno. Ese servicio se comunica con un modelo de lenguaje utilizando sus propias credenciales. Sus datos sin procesar nunca llegan al servidor de un proveedor. Esto convierte la analítica de IA conversacional de un complemento arriesgado a un flujo de trabajo controlado. También ayuda a los equipos a cumplir con estrictas reglas de gobernanza sin ralentizar a los usuarios.

### Use su Modelo de Datos Existente en Lugar de Dejar que el Modelo Escriba SQL

Muchas herramientas de software de analítica conversacional crean SQL directamente a partir de las indicaciones del usuario. Esto es arriesgado. Elude las reglas de seguridad y a menudo produce resultados impredecibles. Un enfoque más sólido genera definiciones de paneles o configuraciones de visualización en lugar de SQL sin procesar. Luego, la solicitud pasa por su autenticación, seguridad a nivel de fila y lógica de filtrado existentes. Esto mantiene las reglas de acceso consistentes y predecibles en todas las consultas.

### Trate el Lenguaje Natural como una Capa de Intención, No Solo como una Ventana de Chat

Un sistema moderno trata el lenguaje natural como una capa de comandos flexible. Los usuarios pueden pedir crear paneles, añadir widgets, aplicar filtros o resumir visualizaciones. Estos ejemplos de analítica conversacional muestran cómo la intención impulsa el flujo de trabajo. Una pregunta hecha en un panel de chat, barra de búsqueda o menú contextual activa la misma lógica interna. Esto crea una experiencia consistente en todo su producto, encajando limpiamente con sus flujos de trabajo existentes de [AI-powered analytics](/ai).

### Haga que la IA Sea Fácil de Confiar con Pruebas, Puntuación y Guardarraíles

La IA debe comportarse de manera predecible cuando se utiliza dentro de un producto SaaS. Un sistema sólido incluye puntuación de relevancia, indicaciones controladas y reglas de salida claras. También permite a los equipos probar diferentes modelos contra paneles conocidos para evaluar la precisión y la velocidad.

Un modelo construido en torno a estos principios da a los equipos un control total sobre la analítica conversacional. El siguiente paso es comprender cómo encaja la seguridad en este enfoque y por qué moldea cada elección de diseño.

## La Capa de Seguridad: Manteniendo la IA, los Datos y la Analítica Bajo su Control

La seguridad se convierte en el mayor riesgo cuando los equipos pasan de las demos de IA a la analítica conversacional de producción. Los usuarios quieren respuestas rápidas, pero los clientes esperan un control estricto sobre sus datos. Muchas herramientas ignoran esta brecha. Generan SQL a través de un modelo externo, lo envían fuera de su entorno y esperan que el proveedor mantenga todo seguro.

Reveal toma una ruta diferente. Mantiene todo el flujo de trabajo de analítica conversacional dentro del perímetro de seguridad de su producto. Ningún dato sin procesar sale de su entorno, y la capa de IA respeta cada regla que usted ya aplica.

![conversational analytics Diagram](https://static.infragistics.com/marketing/reveal/blogs/conversational-analytics-in-emebedded-analytics-benefits/reveal-ai-security.webp)

### Mantenga la IA Cerca de Sus Datos, No en la Nube de un Proveedor

La mayoría del software de analítica conversacional envía indicaciones de usuario a un modelo en la nube que luego escribe SQL. Esto rompe la cadena de seguridad, porque:

- El modelo no conoce sus permisos de usuario.

- No puede hacer cumplir la seguridad a nivel de fila.

- Puede exponer campos o patrones que usted nunca revelaría.

Reveal evita este patrón por completo. La IA se ejecuta a través de su propia cuenta de nube o en su propia infraestructura, y su aplicación sigue siendo el único sistema que habla con el modelo. El modelo recibe metadatos, nunca datos sin procesar. Esto mantiene la propiedad y el control donde deben estar: con su equipo.

### Genere Paneles a Través de su Modelo de Seguridad Existente

Reveal nunca permite que la IA genere SQL. En su lugar, utiliza su DOM SDK para convertir lenguaje natural en una definición JSON de panel. Esa definición pasa por el mismo ciclo de vida del servidor utilizado para cada panel de su producto. Esto garantiza que todos los controles existentes se apliquen:

- Autenticación

- Elementos de fuente de datos

- Seguridad a nivel de fila

- Filtros

- Contexto de usuario

Si un usuario no puede ver una métrica en un panel normal, tampoco puede verla a través de la analítica conversacional. Esta es una de las razones principales por las que los equipos eligen [**Reveal**](https://samples.revealbi.io/reveal-sdk-samples/2020-survey-results.html) para IA conversacional segura dentro de la analítica integrada.

### Añada una Segunda Capa de Seguridad para el Acceso a la IA

Reveal añade otra capa de control sobre su modelo de seguridad existente. Usted decide con qué conjuntos de datos puede trabajar la IA y cuáles deben permanecer fuera de límites. Esto incluye:

- **Lista blanca de tablas y vistas.** Limite la IA a conjuntos de datos específicos dentro de cada fuente de datos.

- **Anulaciones de metadatos.** Mapee términos de dominio como "ticket de trabajo" o "código de caso" a campos subyacentes sin cambiar el esquema.

- **Controles a nivel de intención.** Permita la creación, edición, resúmenes o análisis de paneles solo donde tiene sentido.

Estas opciones crean un entorno predecible y seguro para la analítica conversacional. Obtiene la flexibilidad del lenguaje natural sin darle poder a un modelo que no entiende su producto, sus reglas o sus necesidades de cumplimiento.

## Cómo Funciona Realmente la Analítica Conversacional Dentro de un Producto

Ver la analítica conversacional en acción ayuda a comprender lo que la función puede hacer realmente dentro de un producto en vivo. El video a continuación recorre el flujo de trabajo de Reveal paso a paso, mostrando cómo las consultas en lenguaje natural se convierten en paneles seguros, resúmenes y actualizaciones en tiempo real. Muestra los comportamientos exactos que sus usuarios pueden esperar dentro de un entorno integrado.

## Dónde Encaja la Analítica Conversacional Dentro de la Analítica Integrada

La mayoría de los usuarios abren su aplicación con un propósito. Quieren una respuesta rápida o una vista clara de lo que cambió desde ayer. Los paneles ayudan, pero no cubren todas las preguntas que la gente hace durante su jornada laboral. Aquí es donde la analítica conversacional se vuelve útil. Llena el espacio entre la exploración y la acción al dar a los usuarios una forma directa de solicitar lo que necesitan.

La analítica conversacional encaja bien en los flujos de trabajo existentes porque los datos detrás de sus paneles se mantienen iguales. Simplemente da a los usuarios una forma más rápida de acceder a ellos trabajando a través de sus [**fuentes de datos**](/data-sources) conectadas sin obligarlos a entender cómo están estructuradas esas fuentes.

![How conversational analytics helps you have a better overlook over your product ](https://static.infragistics.com/marketing/reveal/blogs/conversational-analytics-in-emebedded-analytics-benefits/reveal-convo-analytics-security-body.webp)

### Respuestas Más Rápidas Dentro de Paneles Existentes

Los usuarios a menudo abren un panel para verificar tendencias y métricas clave. Ven suficiente para saber qué cambió, pero aún necesitan un detalle más. Aquí es cuando la analítica conversacional se convierte en la opción más rápida. Pueden solicitar un desglose por país, una comparación con el mes pasado o una lista de los mejores rendimientos sin crear una nueva vista.

Una consulta corta es a menudo más fácil que hacer clic en menús o cambiar de paneles. El usuario mantiene el enfoque en la tarea y evita la fricción de una exploración más profunda.

### Ayudando a Usuarios No Técnicos a Crear lo que Necesitan

Muchos usuarios saben el resultado que quieren, pero no saben cómo armar el panel que lo entrega. No entienden tablas, uniones, campos o agregaciones. La analítica conversacional elimina esa barrera. Una pregunta simple puede devolver un gráfico, una tabla o un widget que coincida con lo que tenían en mente.

Esto ayuda a los usuarios que dependen de la aplicación todos los días, pero no se sienten cómodos con el editor completo. También reduce la presión sobre sus equipos de soporte y producto. Cuando los usuarios pueden hacer una pregunta en lenguaje sencillo, no necesitan ayuda para navegar el esquema.

Ejemplos incluyen:

- Gerentes que quieren un desglose regional rápido.

- Operadores que necesitan verificar el volumen o las excepciones.

- Analistas que quieren un punto de partida antes de refinar un panel.

### Reduciendo la Fricción Entre Datos y Acción

Los usuarios a menudo necesitan un pequeño cambio en lugar de un panel nuevo. Pueden querer añadir un widget, ajustar un filtro o generar un informe simple. La analítica conversacional les ayuda a hacer esto sin interrumpir su flujo de trabajo.

Encaja de forma natural en el flujo de la analítica integrada, permitiendo a los usuarios tomar medidas mientras mantienen el contexto de su trabajo frente a ellos. No necesitan salir de la pantalla, abrir un constructor o buscar en menús.

Esto hace que el producto se sienta más rápido y más útil. Una vez que los usuarios experimentan este nivel de conveniencia, lo esperan en todas partes.

## El Enfoque de Reveal: Analítica Conversacional Flexible y Segura para SaaS

La mayoría de los equipos llegan a los límites del software de analítica conversacional genérico una vez que intentan implementarlo dentro de un producto real. Necesitan respuestas rápidas, información precisa y una arquitectura segura que respete sus reglas existentes. Reveal maneja estas necesidades manteniendo la IA dentro de su entorno, dando a los desarrolladores control total y ofreciendo una experiencia predecible para cada usuario.

Reveal no toca sus datos. Su aplicación se comunica con el modelo elegido a través de su propia cuenta de nube o infraestructura. Nada sale de su entorno, y la capa de IA funciona dentro de los mismos controles que usted ya aplica a través de sus paneles integrados.

![conversational analytics in action](https://static.infragistics.com/marketing/reveal/blogs/conversational-analytics-in-emebedded-analytics-benefits/reveal-ai-dashboard-body.webp)

### IA que se Ejecuta Dentro de su Entorno

Reveal mantiene tanto sus datos como su flujo de trabajo de IA bajo su control. El sistema utiliza su autenticación, su cuenta de nube y su modelo de gobernanza. Esto evita las brechas de seguridad que aparecen cuando los proveedores de analítica envían indicaciones y consultas a servicios externos.

Ventajas clave incluyen:

- Usted elige el modelo: Azure OpenAI, modelos de lenguaje pequeños locales u otros proveedores.

- La IA recibe metadatos, no datos sin procesar.

- Reveal nunca ve sus consultas, conjuntos de datos o resultados.

- Todas las funciones de IA son opcionales y totalmente configurables.

- Rendimiento predecible porque todo se ejecuta junto a sus datos.

Esto le da a su equipo un nivel de control que la mayoría de las plataformas de analítica con IA no pueden igualar.

### Una Arquitectura Segura para Productos Reales

Reveal utiliza su DOM SDK para convertir solicitudes en lenguaje natural en definiciones de paneles seguras en lugar de SQL. Cada resultado pasa por el ciclo de vida del servidor de Reveal, por lo que sus reglas existentes se aplican en cada paso.

Usted obtiene:

- Seguridad a nivel de fila para cada consulta.

- Todos los filtros y el contexto de usuario se aplican automáticamente.

- Control sobre qué tablas y vistas están disponibles para la IA.

- Anulaciones de metadatos para términos de dominio utilizados por sus clientes.

- Ejecución segura porque el modelo nunca escribe SQL.

Esto elimina los puntos de fallo más comunes en la analítica conversacional y mantiene su postura de cumplimiento intacta.

### Diseñado para Desarrolladores y Equipos de Producto

Reveal funciona como una verdadera solución integrada, no como un chatbot desconectado. Puede colocar funciones de IA en cualquier parte de su UX y controlar toda la experiencia a través del SDK. Esto le da la libertad de encajar la analítica conversacional en su producto en sus propios términos.

Reveal apoya a los equipos de producto con:

- Una superficie API completa para chat, resúmenes, ediciones de paneles y análisis.

- Control sobre cada intención de IA según el flujo de trabajo que desee habilitar.

- Una ruta limpia para añadir información en cualquier pantalla de su aplicación.

- Un costo anual fijo que no crece con sus usuarios.

- Una base segura y escalable para [**analítica con IA**](/ai).

Así es como los equipos mejoran la adopción, aumentan la [**retención de clientes con analítica integrada**](/blog/customer-retention-with-embedded-analytics) y aceleran su capacidad para [**reducir el tiempo de comercialización**](/blog/reduce-time-to-market) de nuevas funciones. También apoya el crecimiento a largo plazo a través de oportunidades de [**ingresos por analítica de producto**](/blog/product-analytics-revenue) y [**monetización de datos**](/blog/how-to-monetize-data-analytics-offering).

Reveal está construido para productos que dependen de los datos. Mantiene su modelo de seguridad intacto, apoya a su equipo con herramientas predecibles y ofrece una experiencia de analítica conversacional en la que los usuarios pueden confiar.

Aproveche el Poder de los Datos

Haga crecer su negocio con datos contextuales en tiempo real.

[Request a Demo](/request-demo)
