---
title: >-
  Usar una fuente de datos en memoria para expandir el alcance de datos de
  Reveal
description: >-
  Utilice la función de base de datos en memoria de Reveal para ampliar el
  número y tipos de datos a los que puede acceder desde su aplicación con
  analítica integrada.
date: '2019-10-03'
author: Casey Ciniello
cover: /images/2020/10/business_2D00_intelligence_2D00_reveal_2D00_datasources.jpg
summary: >-
  Puede haber momentos en los que desee conectarse directamente a una fuente de
  datos que Reveal aún podría no admitir de forma nativa. Por ejemplo, puede
  tener su propia base de datos personalizada. Para satisfacer esta necesidad,
  admitimos la memoria en el sistema como fuente de datos. También puede querer
  usar esta opción si necesita [&hellip;]
categories:
  - Analítica integrada
seo:
  title: Expandir fuentes de datos de analítica integrada (Bases de datos en memoria)
  description: >-
    Utilice la función de base de datos en memoria de Reveal para ampliar el
    número y tipos de datos a los que puede acceder desde su aplicación con
    analítica integrada.
  ogTitle: Expandir fuentes de datos de analítica integrada (Bases de datos en memoria)
  ogDescription: >-
    Utilice la función de base de datos en memoria de Reveal para ampliar el
    número y tipos de datos a los que puede acceder desde su aplicación con
    analítica integrada.
  ogType: article
  twitterTitle: Expandir fuentes de datos de analítica integrada (Bases de datos en memoria)
  twitterDescription: >-
    Utilice la función de base de datos en memoria de Reveal para ampliar el
    número y tipos de datos a los que puede acceder desde su aplicación con
    analítica integrada.
  ogImage: /images/2020/10/business_2D00_intelligence_2D00_reveal_2D00_datasources.jpg
source_hash: 1700c106
source_locale: en
---
Puede haber momentos en los que desee conectarse directamente a una fuente de datos que Reveal aún podría no admitir de forma nativa. Por ejemplo, puede tener su propia base de datos personalizada. Para satisfacer esta necesidad, admitimos la memoria en tiempo de ejecución (in-memory) como fuente de datos. También puede querer usar esta opción si necesita utilizar datos que ya están en memoria como parte del estado de su aplicación, como el resultado de un informe solicitado por un usuario.

La fuente de datos en memoria también ofrece otros beneficios, como la velocidad de recuperación, ya que es mucho más rápido acceder a los datos en memoria que en una unidad de disco.

En este blog, repasaremos cómo usar esta función.

## Definición de un Esquema de Datos

Le recomendamos que defina un archivo de datos con un esquema que coincida con sus datos en memoria. Los archivos de datos pueden ser, por ejemplo, un archivo CSV o Excel, y un esquema es básicamente una lista de campos y el tipo de datos para cada campo. En el ejemplo a continuación, encontrará detalles sobre cómo crear un archivo de datos con un esquema determinado y luego usar datos en memoria en lugar de obtener información de una base de datos.

En el siguiente ejemplo, utilizaremos datos en memoria con la lista de empleados de la empresa para incrustar un panel que muestra métricas de RR. HH. en su sistema de RR. HH. Y en lugar de obtener la lista de empleados de su base de datos, utilizaremos los datos en memoria.

## Preparación del Archivo de Datos y Panel de Muestra

Utilice los siguientes pasos basados en un empleado simplificado que solo tiene algunas propiedades:

- EmployeeID: string
- Fullname: string
- Wage: numeric

Primero, cree el archivo CSV con el mismo esquema:

![ Example of preparing a Data File and Sample Dashboard in Reveal BI](/images/2020/10/reveal_2D00_code_2D00_1.jpg)

1. Suba el archivo a su sistema de uso compartido de archivos preferido, como Dropbox o Google Drive
2. Cree un panel utilizando los datos ficticios. Tenga en cuenta que proporcionará los datos reales de producción más tarde en su aplicación
3. Exporte el panel (Menú de Panel → Exportar → Panel) y guárdelo como un archivo .rdash.

## Visualización del Panel y Devolución de los Datos Reales

Ahora necesita visualizar el panel utilizando sus propios datos en lugar de los datos ficticios.

Implemente [IRVDataSourceProvider](https://help.revealbi.io) y devuélvalo como la propiedad [DataSourceProvider](https://help.revealbi.io) en [IRevealSdkContext](https://help.revealbi.io), como se describe en [Replacing Data Sources](https://help.revealbi.io).

Luego, en la implementación para el método **ChangeVisualizationDataSourceItemAsync**, debe agregar un código similar a este:

![ Change Visualization Data Source Item Async example code](/images/2020/10/reveal_2D00_code_2D00_2.jpg)

De esta manera, básicamente reemplaza todas las referencias a archivos CSV en el panel con la fuente de datos en memoria identificada como "employees". Esta identificación se utilizará más tarde al devolver los datos.

Implemente el método que devolverá los datos reales, para hacer esto implemente [IRVDataProvider](https://help.revealbi.io) como se muestra a continuación:

![IRV Data Provider example code](/images/2020/10/reveal_2D00_code_2D00_3.jpg)

Tenga en cuenta que las propiedades en la clase Employee tienen nombres exactamente como las columnas en el archivo CSV, y el tipo de datos también es el mismo. En caso de que desee modificar el nombre del campo, la etiqueta del campo y/o el tipo de datos de cualquiera de las propiedades, puede usar atributos en la declaración de la clase:

- El atributo RVSchemaColumn se puede usar para modificar el nombre del campo y/o el tipo de datos.
- El atributo DisplayName se puede usar para modificar la etiqueta del campo

![ RV Schema Column attribute can be used to alter the field name and/or data type](/images/2020/10/reveal_2D00_code_2D00_4.jpg)

Además, para implementar [IRVDataProvider](https://help.revealbi.io) debe modificar su implementación de [IRevealSdkContext.DataProvider](https://help.revealbi.io) para devolverlo:

![ IRV Data Provider implementation](/images/2020/10/reveal_2D00_code_2D00_5.jpg)

Para obtener más información sobre Reveal o probar el SDK si aún no lo ha hecho, solicite una demo.

Aproveche el poder de los datos

Haga crecer su negocio con datos contextuales en tiempo real.

[Request a Demo](/request-demo)
