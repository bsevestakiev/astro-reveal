---
title: Usar Procedimientos Almacenados en Analítica Integrada
description: >-
  Aprenda qué es un procedimiento almacenado, cuáles son sus beneficios, cómo se
  diferencia de las funciones, cómo crearlo y cómo usar procedimientos
  almacenados en analítica integrada.
date: '2021-08-25'
author: Bilyana Petrova
cover: /images/2021/08/stored-procedures-in-embedded-analytics.png
summary: >-
  Los procedimientos almacenados son uno de los temas de base de datos más
  utilizados y más populares, y como tales, ofrecen una serie de beneficios.
  Usar procedimientos almacenados puede simplificar y acelerar la ejecución de
  consultas SQL, y más.
categories:
  - Perspectivas Técnicas
seo:
  title: Usar Procedimientos Almacenados en Analítica Integrada | Reveal BI
  description: >-
    Aprenda qué es un procedimiento almacenado, cuáles son sus beneficios, cómo
    se diferencia de las funciones, cómo crearlo y cómo usar procedimientos
    almacenados en analítica integrada.
  ogTitle: Usar Procedimientos Almacenados en Analítica Integrada | Reveal BI
  ogDescription: >-
    Aprenda qué es un procedimiento almacenado, cuáles son sus beneficios, cómo
    se diferencia de las funciones, cómo crearlo y cómo usar procedimientos
    almacenados en analítica integrada.
  ogType: article
  twitterTitle: Usar Procedimientos Almacenados en Analítica Integrada | Reveal BI
  twitterDescription: >-
    Aprenda qué es un procedimiento almacenado, cuáles son sus beneficios, cómo
    se diferencia de las funciones, cómo crearlo y cómo usar procedimientos
    almacenados en analítica integrada.
  ogImage: /images/2021/08/stored-procedures-in-embedded-analytics.png
source_hash: 9a7cb49d
source_locale: en
---
Usar procedimientos almacenados es una forma fácil de ahorrar tiempo al escribir repetidamente las mismas líneas de código y también agiliza la llamada y ejecución de la consulta deseada.

Pero, ¿qué sabes sobre los procedimientos almacenados, cómo funcionan y qué ventajas ofrecen a los usuarios?

En este artículo, aprenderás qué es un procedimiento almacenado, sus beneficios, cómo se diferencia de las funciones, cómo crear un procedimiento almacenado y, por último, cómo usar procedimientos almacenados en [analítica integrada](/embedded-analytics).

## ¿Qué es un Procedimiento Almacenado?

Un procedimiento almacenado es un conjunto de sentencias SQL y otros constructos PL/SQL almacenados en un sistema de gestión de bases de datos relacionales (RDBMS) como un grupo que puedes guardar y reutilizar repetidamente. Un procedimiento almacenado puede consistir en múltiples sentencias SQL como SELECT, INSERT, UPDATE o DELETE. Se ejecutan como una unidad y se utilizan para resolver un problema específico o realizar un conjunto de tareas relacionadas. Esto significa que si necesitas una consulta SQL y tienes que escribirla repetidamente, puedes guardarla como un procedimiento almacenado y luego llamarlo para ejecutar la consulta.

![definición de procedimiento almacenado](/images/2021/08/what-is-stored-procedure.png)

Si estás utilizando Microsoft SQL Server, puedes encontrar procedimientos almacenados expandiendo el nodo Programmability bajo tu base de datos en el Object Explorer de SQL Server Management Studio.

![qué es un procedimiento almacenado](/images/2021/08/using-stored-procedures-in-embedded-analytics.png)

## Beneficios de Usar Procedimientos Almacenados

Los procedimientos almacenados son uno de los temas de base de datos más utilizados y populares [temas de base de datos](https://study.com/academy/lesson/what-are-subject-databases-definition-types.html), y como tales, ofrecen un puñado de beneficios. Usar procedimientos almacenados puede simplificar y acelerar la ejecución de consultas SQL.

Por ejemplo, almacenar procedimientos puede reducir el tráfico de red entre servidores y clientes. Esto se debe a que los comandos se ejecutan como un solo lote de código; por lo tanto, en lugar de que cada línea de código se envíe para su ejecución individualmente, solo se envía la llamada para ejecutar el procedimiento almacenado al servidor.

Aquí hay algunos de los otros beneficios de usar procedimientos almacenados:

### Mantenibilidad

Mantener un procedimiento almacenado es bastante fácil en el servidor en comparación con mantener copias en numerosas máquinas cliente.

Además, los scripts de procedimientos se almacenan en una ubicación, pero los procedimientos almacenados también se pueden usar libremente en otras aplicaciones. En caso de un cambio de definición, no es en absoluto un problema, ya que solo se verá afectado el procedimiento almacenado y no la aplicación que lo llama.

### Rendimiento y Eficiencia

Los procedimientos almacenados se compilan una sola vez y luego se pueden usar muchas veces. Esto ahorra mucho tiempo al escribir lo mismo varias veces si estás realizando consultas ad-hoc y proporciona una ligera ventaja de rendimiento en la primera ejecución de un procedimiento almacenado frente a la primera ejecución de una consulta ad-hoc.

[Ver Reveal en Acción](/request-demo)

### Incluye Lógica de Negocio Compleja

Aunque no es el mejor lugar para la lógica de negocio compleja, un procedimiento almacenado es básicamente una llamada a función en una base de datos. Puedes incluir sentencias IF, LOOPS, comprobaciones de seguridad y mucho más para garantizar que los datos correctos se envíen de vuelta a la llamada del procedimiento almacenado.

Aunque es algo debatible según las habilidades de tu equipo, las mejores prácticas se inclinan por colocar la lógica de negocio de una aplicación en el lado de la aplicación. Sin embargo, los procedimientos almacenados y T-SQL son sintaxis muy potentes para la ejecución de lógica.

### Fácil de Modificar

Puedes cambiar rápidamente una o más sentencias en un procedimiento almacenado con la ayuda del comando ALTER PROCEDURE, lo que lo hace muy rápido y fácil de actualizar los resultados enviados de vuelta a la aplicación llamadora. Contrariamente a un componente de nivel medio que incluye lógica de negocio, que requeriría un costoso re-despliegue potencial, un cambio rápido en un procedimiento almacenado tarda segundos.

Considera este procedimiento almacenado, donde el valor @OrdYear está codificado. Un desarrollador o administrador de bases de datos puede actualizar la variable @OrdYear con facilidad usando el comando ALTER PROCEDURE.

```
ALTER PROCEDURE [dbo].[SalesByCategory] 

    @CategoryName nvarchar(15), @OrdYear nvarchar(4) = '1998' 

AS 

IF @OrdYear != '1996' AND @OrdYear != '1997' AND @OrdYear != '1998'  

BEGIN 

    SELECT @OrdYear = '1998' 

END 

 

SELECT ProductName, 

    TotalPurchase=ROUND(SUM(CONVERT(decimal(14,2), OD.Quantity * (1-OD.Discount) * OD.UnitPrice)), 0) 

FROM [Order Details] OD, Orders O, Products P, Categories C 

WHERE OD.OrderID = O.OrderID  

    AND OD.ProductID = P.ProductID  

    AND P.CategoryID = C.CategoryID 

    AND C.CategoryName = @CategoryName 

    AND SUBSTRING(CONVERT(nvarchar(22), O.OrderDate, 111), 1, 4) = @OrdYear 

GROUP BY ProductName 

ORDER BY ProductName
```

### Seguridad

Otro gran beneficio de usar procedimientos almacenados es la seguridad que proporciona a su fuente de datos. Puedes [mejorar la seguridad de una aplicación](/blog/security-and-analytics) usando procedimientos almacenados al restringir el acceso no autorizado. Por ejemplo, puedes otorgar a alguien acceso a un procedimiento que actualiza la tabla de la base de datos sin permitir el acceso a la tabla en sí. También puedes usar procedimientos almacenados para "ocultar" los nombres de las tablas subyacentes del usuario final del procedimiento almacenado. Dado que el llamador del procedimiento almacenado solo tiene el nombre del procedimiento almacenado, y no el nombre de las tablas utilizadas en el procedimiento almacenado, no podrán acceder directamente a las tablas con tus datos de manera maliciosa.

## Diferencias Entre Procedimientos Almacenados y Funciones

Los procedimientos almacenados y las funciones son objetos de base de datos que contienen conjuntos de sentencias SQL para completar tareas. Y aunque a primera vista puedan parecer lo mismo, son bastante diferentes.

Estas son algunas de las cosas que diferencian los procedimientos almacenados y las funciones:

- Las funciones pueden ser llamadas desde un procedimiento almacenado, mientras que un procedimiento almacenado no puede ser llamado desde una función.
- Una función no permite parámetros de salida, mientras que un procedimiento almacenado permite parámetros tanto de salida como de entrada.
- No puedes gestionar transacciones dentro de una función, pero sí puedes hacerlo dentro de un procedimiento almacenado.
- Puedes llamar a una función usando una sentencia select, pero no puedes llamar a un procedimiento almacenado usando una sentencia select.
- Una función tiene un tipo de retorno y devuelve un valor, mientras que un procedimiento almacenado no tiene un tipo de retorno, y devolver un valor es opcional.
- Una función solo permite una sentencia SELECT, mientras que un procedimiento almacenado permite SELECT, INSERT, UPDATE Y DELETE.
- Un procedimiento almacenado puede usarse para leer y modificar datos, mientras que una función solo puede leerlos.
- Una función puede estar incrustada en una sentencia SELECT, mientras que un procedimiento almacenado no puede utilizarse en una sentencia SELECT.
- Una función no puede devolver múltiples conjuntos de resultados, mientras que un procedimiento almacenado sí puede.
- Podemos usar transacciones en procedimientos almacenados, pero no están permitidas en funciones.

## ¿Cómo Crear un Procedimiento Almacenado?

Crear un nuevo procedimiento almacenado es sencillo. Hay 3 pasos básicos:

1. En el **Explorador de Objetos de SQL Server**, haga clic derecho en el **nodo Procedimientos Almacenados** bajo Programmability.

![creando un procedimiento almacenado ](/images/2021/08/how-to-create-stored-procedure.png)

2. En la Plantilla de Procedimiento Almacenado, **modifica la sentencia CREATE PROCEDURE** para incluir las tablas, parámetros y opciones de consulta para devolver los datos deseados desde el procedimiento almacenado.

![cómo crear un procedimiento almacenado](/images/2021/08/creating-stored-procedure-in-embedded-analytics.png)

3. Haz clic en el botón **Ejecutar** en la barra de herramientas para compilar **y guardar tu procedimiento almacenado**.

![creando un procedimiento almacenado](/images/2021/08/creating-stored-procedure.png)

Hay múltiples herramientas para crear procedimientos almacenados; usar el SQL Server Management Studio interactivo es el más fácil, ya que te proporciona una forma sencilla de empezar a conectarte a muchos tipos diferentes de servidores de bases de datos, incluyendo Azure y SQL Server Analysis Services.

## ¿Cómo Usar Procedimientos Almacenados en Analítica Integrada?

Al usar el [Reveal Embed SDK](/download-sdk), hay 2 formas de usar procedimientos almacenados.

1. Cuando estás creando una nueva [visualización](/glossary/data-visualization) en una base de datos que admite procedimientos almacenados, verás una lista de procedimientos almacenados disponibles para ti. Tratarás el procedimiento almacenado que selecciones como cualquier otra fuente de datos en Reveal; la única diferencia es que un procedimiento almacenado parametrizado, que puedes usar en un Filtro pasando variables al procedimiento almacenado.

![procedimientos almacenados en analítica integrada](/images/2021/08/how-to-use-stored-procedures-in-embedded-analytics.png)

Puedes ver un video rápido de 6 minutos sobre cómo usar procedimientos almacenados a través de la interfaz de usuario de Reveal aquí:

2. Dado que Reveal es un SDK, también tienes control programático completo sobre los procedimientos almacenados y los parámetros a través de código. Para pasar un nombre de procedimiento almacenado, junto con cualquier parámetro requerido, usa la función ChangeVisualizationDataSourceItemAsync. Este ejemplo demuestra pasar un procedimiento almacenado llamado CustOrderHist y pasar el parámetro CustomerID.

```
public async override Task<RVDataSourceItem> ChangeVisualizationDataSourceItemAsync 

    (string userId, string dashboardId, RVVisualization visualization,  

RVDataSourceItem dataSourceItem) 

{ 

    if (dashboardId == "StoredProcNorthWind") 

    { 

        var msSqlDsi = dataSourceItem as RVSqlServerDataSourceItem; 

 

 

 

        if (msSqlDsi?.Procedure == "CustOrderHist") 

        { 

            msSqlDsi.ProcedureParameters["@CustomerID"] = "AROUT"; 

        } 

        else 

        { 

            msSqlDsi.Procedure = "MyProcedure"; 

            msSqlDsi.ProcedureParameters["@SampleParam"] = "SampleParamValue"; 

        } 

        return dataSourceItem; 

    } 

}
```

## Conclusión

Los procedimientos almacenados son una herramienta potente para consultar una base de datos y devolver resultados a una aplicación llamadora. Deberías considerar usar procedimientos almacenados para simplificar la forma en que presentas datos a los usuarios de Reveal SDK y para simplificar cómo manejas los parámetros en el código de tu aplicación frente a usar consultas ad-hoc propensas a errores y largas.

Puedes aprender más sobre [analítica integrada de Reveal](/embedded-analytics) y cómo funciona [descargando nuestro SDK](/download-sdk) o programando una [demo rápida](/request-demo).

Desbloquea Más Horas al Día

Simplifica y acelera la ejecución de consultas SQL con Reveal Embedded Analytics

[VER CÓMO FUNCIONA](/request-demo)
