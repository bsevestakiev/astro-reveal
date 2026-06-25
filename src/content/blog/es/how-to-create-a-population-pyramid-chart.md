---
title: Crear un gráfico de pirámide poblacional usando gráficos de barras apiladas
description: >-
  Descubre qué es un gráfico de pirámide poblacional y cómo crear uno usando
  gráficos de barras apiladas.
date: '2020-02-03'
author: Casey Ciniello
cover: /images/2020/10/reveal-logo-gradient-1200x630-1.jpg
summary: >-
  En este blog, te mostraré cómo crear un gráfico de pirámide poblacional que
  proporciona una vista atractiva de un vistazo de la demografía de un país,
  generalmente desglosada por masculino/femenino, aunque también se puede usar
  para otras demografías. Así es como se verá el gráfico final: Antes de
  profundizar en cómo puedes crear un gráfico de pirámide poblacional, revisemos
  primero algunos de los tipos de gráficos básicos. Qué [&hellip;]
categories:
  - Analítica integrada
seo:
  title: Cómo crear un gráfico de pirámide poblacional - Reveal BI
  description: >-
    Descubre qué es un gráfico de pirámide poblacional y cómo crear uno usando
    gráficos de barras apiladas.
  ogTitle: Cómo crear un gráfico de pirámide poblacional - Reveal BI
  ogDescription: >-
    Descubre qué es un gráfico de pirámide poblacional y cómo crear uno usando
    gráficos de barras apiladas.
  ogType: article
  twitterTitle: Cómo crear un gráfico de pirámide poblacional - Reveal BI
  twitterDescription: >-
    Descubre qué es un gráfico de pirámide poblacional y cómo crear uno usando
    gráficos de barras apiladas.
  ogImage: /images/2020/10/reveal-logo-gradient-1200x630-1.jpg
source_hash: beaf1848
source_locale: en
---
En este blog, les voy a mostrar cómo crear un gráfico de pirámide poblacional que proporciona una vista atractiva y general de la demografía de un país, generalmente desglosada por masculino/femenino, aunque también se puede usar para otras demografías. Así es como se verá el gráfico final:

![population pyramid chart completed](/images/2021/02/image-4.png)

Antes de profundizar en cómo crear un gráfico de pirámide poblacional, revisemos primero algunos de los tipos de gráficos básicos.

## ¿Qué son los gráficos de barras?

Empecemos primero con algunos de los tipos de gráficos básicos antes de profundizar en un gráfico de pirámide poblacional en particular. Los gráficos de barras, similares a los gráficos de columnas y de áreas, se utilizan principalmente para mostrar datos comparativos. El ejemplo a continuación utiliza gráficos para mostrar la variación entre sus diferentes categorías y está ordenado de forma ascendente para que sea claro para el usuario final.

![What are bar charts](/images/2021/02/image.jpeg)

## ¿Qué son los gráficos apilados?

Los gráficos apilados extienden un gráfico de barras, columnas o áreas típico al permitirle mostrar comparaciones de diferentes datos categóricos. Esto le da la capacidad de comparar partes de un todo dentro de sus datos.

![What are Stacked Charts](/images/2021/02/image-1.jpeg)

Entonces, ¿por qué no usar un gráfico de barras en su lugar?

Usted pasa a usar un gráfico de columnas apiladas frente a un gráfico de barras cuando desea ver la suma total de todas las variables junto con el desglose de cada variable.

## ¿Qué es un gráfico de pirámide poblacional?

Los gráficos de pirámide son visualizaciones populares al trabajar con datos demográficos, ya que son una forma fácil de mostrar la composición de edad y masculino/femenino de un país determinado. Si bien los gráficos de líneas son muy comunes al describir la escala de crecimiento de cualquier población, los gráficos de pirámide muestran cualquier cambio o diferencia significativa.

## Cómo crear una pirámide poblacional en Reveal

Vamos a las siguientes columnas en un archivo de excel para crear nuestro gráfico:

![excel file with data to create population pyramid chart](/images/2021/02/image.png)

A continuación, crearemos un gráfico de barras apiladas así:

![polulation pyramid](/images/2021/02/image-3.png)

Para crear una pirámide, crearemos un campo calculado para que los valores Masculinos apunten a la izquierda. Puede hacer esto haciendo clic en el icono F(x) junto a sus valores. Dentro del campo calculado, escribiremos lo siguiente en la barra de fórmulas:

![How to create a pyramid chart with Reveal BI](/images/2021/02/image-2.png)

Después de hacer clic en la función actualizar, haremos clic en el campo masculino original y desmarcaremos la casilla visible:

![how to create a pyramid chart
](/images/2021/02/image-1.png)

El resultado final será un gráfico de pirámide poblacional como el siguiente:

![population pyramid chart completed](/images/2021/02/image-4.png)

Conozca otros gráficos y visualizaciones

Creamos los varios gráficos en este blog utilizando el software de inteligencia de negocios Reveal. Conozca las características que obtiene con Reveal y cómo crear otros gráficos, paneles y mucho más.

Aproveche el poder de los datos

Haga crecer su negocio con datos contextuales y en tiempo real.

[Request a Demo](/request-demo)
