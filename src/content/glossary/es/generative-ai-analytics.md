---
title: Analítica de IA Generativa
description: >-
  La analítica de IA generativa utiliza modelos de lenguaje grandes (LLMs) para
  analizar datos empresariales y generar nuevas salidas de texto, como
  explicaciones, resúmenes,
seo:
  title: Analítica de IA Generativa | Analítica integrada de Reveal
  description: >-
    La analítica de IA generativa utiliza modelos de lenguaje grandes (LLMs)
    para analizar datos empresariales y generar nuevas salidas de texto, como
    explicaciones, resúmenes,
  ogTitle: Analítica de IA Generativa | Analítica integrada de Reveal
  ogDescription: >-
    La analítica de IA generativa utiliza modelos de lenguaje grandes (LLMs)
    para analizar datos empresariales y generar nuevas salidas de texto, como
    explicaciones, resúmenes,
  ogType: article
  twitterTitle: Analítica de IA Generativa | Analítica integrada de Reveal
  twitterDescription: >-
    La analítica de IA generativa utiliza modelos de lenguaje grandes (LLMs)
    para analizar datos empresariales y generar nuevas salidas de texto, como
    explicaciones, resúmenes,
  ogImage: /images/2020/10/reveal-logo-gradient-1200x630-1.jpg
source_hash: fba9b69f
source_locale: en
---
## ¿Qué es la analítica de IA generativa?

La analítica de IA generativa utiliza modelos de lenguaje grandes (LLMs) para analizar datos empresariales y generar nuevas salidas de texto, como explicaciones, resúmenes o recomendaciones. Expande la elaboración de informes tradicional al producir información narrativa en lugar de depender únicamente de gráficos o consultas manuales. En este contexto, la IA generativa para la analítica opera dentro de un producto a través de [**analítica integrada**](/embedded-analytics) en lugar de mediante una herramienta BI separada.

Este enfoque es una forma de [**analítica integrada**](http://www.revealbi.io/glossary/embedded-bi-business-intelligence), en la que las capacidades analíticas se incorporan a las interfaces de usuario existentes. Los usuarios pueden explorar y comprender los datos dentro del contexto de la aplicación que ya utilizan. El sistema interpreta los paneles como lo haría una persona, respondiendo preguntas en lenguaje sencillo y explicando cambios, causas y próximos pasos.

## ¿Cómo funciona la analítica de IA generativa?

La analítica de IA generativa interpreta la pregunta de un usuario, lee la estructura de datos y decide qué acción tomar. El modelo identifica la intención, como crear un panel, resumir un gráfico o explicar una tendencia. Luego utiliza la lógica existente del producto para obtener y procesar datos, de modo que los resultados se mantengan alineados con los permisos del usuario.

![Cómo funciona la analítica de IA generativa](https://static.infragistics.com/marketing/reveal/glossary/generative-ai-analytics/reveal-generative-ai-process.webp)

En Reveal, la capa de IA trabaja con [**fuentes de datos**](/data-sources) gobernadas y se ejecuta dentro del entorno del cliente. No genera SQL crudo. En su lugar, crea definiciones de paneles que fluyen a través de las reglas normales de autenticación, filtrado y [**seguridad**](/security) ya establecidas. Esto mantiene intacto el contexto del usuario para cada solicitud.

Los equipos pueden usar la recuperación para localizar paneles existentes utilizando metadatos almacenados. El modelo busca activos indexados, devuelve la coincidencia más cercana y lo renderiza a través del proceso estándar del SDK. Este enfoque vincula consultas de lenguaje natural con la analítica operativa sin eludir flujos de trabajo establecidos.

Reveal soporta este proceso con [**funciones de IA**](/ai) que integran consultas conversacionales, control programático y generación de información dentro del producto.

## Ejemplos de analítica de IA generativa en acción

La analítica de IA generativa aparece en muchos flujos de trabajo de productos. Estos ejemplos muestran cómo interactúan los usuarios con la información sin tener que aprender herramientas de informes complejas.

- Crear un panel a partir de una solicitud en lenguaje sencillo, como "crear un panel de análisis de ventas y pedidos para el año pasado".

- Añadir un elemento visual a un [**panel integrado**](/glossary/embedded-dashboard)[**d**](/glossary/embedded-dashboard) pidiendo un widget nuevo o un tipo de gráfico específico.

- Resumir una única visualización para que un usuario pueda convertir una métrica en una narrativa corta para un correo electrónico o chat.

- Producir un resumen o análisis completo del panel que explique tendencias, patrones y cambios en el rendimiento.

- Editar un panel mediante lenguaje natural, como añadir filtros o ajustar una vista sin abrir el editor.

- Devolver un visual existente cuando los usuarios buscan en muchos paneles a través de metadatos de IA almacenados.

Patrones como estos soportan una [**narrativa basada en datos**](/glossary/data-driven-storytelling) más sólida dentro de los productos. Dan a los usuarios una forma rápida de entender qué cambió, por qué cambió y qué es importante a continuación.

## Beneficios de la IA generativa para la analítica

La analítica de IA generativa ayuda a los equipos a dar a los usuarios un acceso más rápido a la información sin añadir complejidad a su producto. Estos beneficios son más importantes para las plataformas SaaS e ISV que dependen del uso repetido, las renovaciones y el valor claro en [**analítica orientada al cliente**](/glossary/customer-facing-analytics).

![Beneficios de la analítica de IA generativa](https://static.infragistics.com/marketing/reveal/glossary/generative-ai-analytics/reveal-benefits-generative-ai-analytics.webp)

Los beneficios clave incluyen:

- Reduce la demanda de los equipos de datos porque los usuarios pueden hacer preguntas directamente en lenguaje natural.

- Ayuda a los usuarios no técnicos a comprender los datos convirtiendo gráficos en explicaciones claras.

- Acelera la toma de decisiones con respuestas más rápidas a preguntas rutinarias.

- Reduce el trabajo de desarrollo al usar el mismo [**SDK integrado**](/glossary/embedded-sdk) y las intenciones de IA en muchas pantallas.

- Aumenta la adopción del producto al hacer que la información sea más fácil de encontrar y usar en contexto.

Estos beneficios soportan un uso de producto más sólido y abren nuevos caminos para la [**monetización de datos**](/blog/how-to-monetize-data-analytics-offering) a través de funciones de analítica que ofrecen resultados claros para los usuarios finales.

## Desafíos y consideraciones

La analítica de IA generativa introduce nuevos riesgos que los equipos de producto deben controlar. Estos riesgos giran en torno a la privacidad, la precisión y la gobernanza, y determinan cómo debe funcionar la IA dentro de una aplicación.

La privacidad de los datos es la primera preocupación. Los equipos deben decidir dónde se ejecutan los modelos y qué datos permanecen dentro de su entorno. Reveal aborda esto manteniendo la inferencia dentro de la infraestructura del cliente y aplicando reglas de seguridad existentes para cada solicitud de IA. La precisión es el siguiente desafío. Los modelos pueden devolver respuestas incompletas o incorrectas, por lo que los equipos a menudo utilizan puntuaciones de confianza, pruebas de modelos y comprobaciones puntuales para proteger los flujos de trabajo de alto impacto.

La gobernanza y la fiabilidad también son importantes. Los equipos deben rastrear el comportamiento del modelo, almacenar el historial de auditoría y gestionar la gobernanza de datos para cada información. La latencia afecta la confianza del usuario, por lo que la optimización del rendimiento y la selección del modelo juegan un papel. Reveal añade controles, como listas blancas de metadatos y anulaciones específicas del dominio, que ayudan a guiar la IA y a mantener los resultados alineados con la estructura de datos subyacente.

Estos problemas crean un claro contraste entre la analítica de IA generativa y los flujos de trabajo de analítica tradicionales.

## IA generativa vs. analítica tradicional

La analítica de IA generativa cambia la forma en que los usuarios exploran los datos. La analítica tradicional depende de paneles preparados y consultas manuales. Los sistemas generativos añaden una capa que explica los resultados, resalta los cambios y responde preguntas en lenguaje sencillo. Este cambio modifica la forma en que los usuarios trabajan con la información y cómo los equipos diseñan funciones analíticas.

![Tradicional vs. analítica de IA generativa](https://static.infragistics.com/marketing/reveal/glossary/generative-ai-analytics/reveal-traditional-vs-generative-ai.webp)

Esta comparación muestra por qué muchos equipos emparejan la IA generativa con paneles existentes en lugar de reemplazarlos. Se convierte en un nuevo punto de entrada a la información, no un sustituto de las prácticas analíticas establecidas.

## IA generativa en analítica integrada

La IA generativa obtiene el mayor valor cuando se ejecuta dentro del producto donde los usuarios ya trabajan. Este modelo mantiene la información cerca de las acciones y reduce la fricción de cambiar entre herramientas. También da a los equipos de producto control total sobre cómo se comporta la IA, cómo aparecen los resultados y cómo se mantienen protegidos los datos.

En una arquitectura integrada, la aplicación utiliza un SDK y analítica impulsada por API para conectar las intenciones de IA a las pantallas existentes. Los usuarios pueden hacer una pregunta junto a una tarea operativa y recibir gráficos o explicaciones actualizados dentro del mismo [**informe integrado**](/glossary/embedded-reporting) o vista de panel. Este patrón soporta paneles interactivos y flujos guiados sin forzar a los usuarios a un portal BI separado.

El despliegue también da forma a la experiencia. Muchos equipos ejecutan [Reveal](https://samples.revealbi.io/reveal-sdk-samples/2020-survey-results.html) en su propio entorno y se conectan a modelos bajo su propia cuenta. Esto mantiene todos los datos del cliente dentro de sus [**fuentes de datos**](/data-sources) y reglas de seguridad aprobadas. También soporta la [**analítica de marca blanca**](/white-label-analytics), donde las funciones generativas coinciden con el diseño del producto anfitrión.

Estas capacidades mejoran el [**ROI de la analítica integrada**](/glossary/embedded-analytics-roi) al convertir visuales pasivos en puntos de entrada conversacionales que ayudan a los usuarios a obtener información más rápido. Cuando se hace bien, la IA generativa se convierte en una capa operativa sobre la analítica integrada en lugar de una función separada que se sitúa fuera del flujo de trabajo.
