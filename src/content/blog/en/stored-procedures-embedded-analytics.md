---
title: "Using Stored Procedures in Embedded Analytics"
description: "Learn what a stored procedure is, what are its benefits, how does it differentiate itself in comparison to functions, how to create it and how to use stored procedures in embedded analytics."
date: "2021-08-25"
author: "Bilyana Petrova"
cover: "/images/2021/08/stored-procedures-in-embedded-analytics.png"
summary: "Stored procedures are one of the most used and most popular database subjects and as such, they offer a handful of benefits. Using stored procedures can simplify and accelerate the execution of SQL queries, and more."
categories:
  - "Technical Insights"
seo:
  title: "Using Stored Procedures In Embedded Analytics | Reveal BI"
  description: "Learn what a stored procedure is, what are its benefits, how does it differentiate itself in comparison to functions, how to create it and how to use stored procedures in embedded analytics."
  ogTitle: "Using Stored Procedures In Embedded Analytics | Reveal BI"
  ogDescription: "Learn what a stored procedure is, what are its benefits, how does it differentiate itself in comparison to functions, how to create it and how to use stored procedures in embedded analytics."
  ogType: "article"
  twitterTitle: "Using Stored Procedures In Embedded Analytics | Reveal BI"
  twitterDescription: "Learn what a stored procedure is, what are its benefits, how does it differentiate itself in comparison to functions, how to create it and how to use stored procedures in embedded analytics."
  ogImage: "/images/2021/08/stored-procedures-in-embedded-analytics.png"
---

Using stored procedures is an easy way to save time from frequently writing the same lines of code and also expedite the call and execution of the desired query.

But what do you know about stored procedures, how they work, and what advantages they provide to users?

From this article, you’ll learn what a stored procedure is, its benefits, how it differentiates itself in comparison to functions, how to create a stored procedure, and last but not least, how to use stored procedures in [embedded analytics](/embedded-analytics).

## What Is a Stored Procedure?

A stored procedure is a set of SQL statements and other PL/SQL constructs stored in a relational database management system (RDBMS) as a group that you can save and reuse repeatedly. A stored procedure can consist of multiple SQL statements like SELECT, INSERT, UPDATE, or DELETE. They run as a unit and are used to solve a specific problem or perform a set of related tasks. That means that if you need an SQL query and write it repeatedly, you can save it as a stored procedure and then call it to perform the query.

![stored procedure definition](/images/2021/08/what-is-stored-procedure.png)

If you are using Microsoft SQL Server, you can find stored procedures by expanding the Programmability node under your database in the Object Explorer of SQL Server Management Studio.

![what is stored procedure](/images/2021/08/using-stored-procedures-in-embedded-analytics.png)

## Benefits of Using Stored Procedures

Stored procedures are one of the most used and popular [database subjects](https://study.com/academy/lesson/what-are-subject-databases-definition-types.html), and as such, they offer a handful of benefits. Using stored procedures can simplify and accelerate the execution of SQL queries.

For example, storing procedures can reduce network traffic between servers and clients. This is a result of the commands being executed as a single batch of code – so, instead of every single line of code being sent for execution individually, only the call to execute the stored procedure is sent to the server.

Here are some of the other benefits of using stored procedures:

### Maintainability

Maintaining a stored procedure is quite easy on the server in contrast to maintaining copies on numerous client machines.

Also, scripts of procedures are stored in one location, but the stored procedures can be freely used in other applications too. In the event of a definition change, that is not at all a problem, as only the stored procedure will be affected and not the application that calls it.

### Performance & Efficiency

Stored procedures are compiled just once and then can be used many times. This saves a lot of time writing the same multiple times if you are doing ad-hoc queries and gives a slight performance edge on the first execution of a stored procedure vs. the first execution of an ad-hoc query.

<p class="text-center"><a class="btn btn-primary trackCTA" href="https://www.revealbi.io/request-demo" data-xd-ga-label="Reveal Demo" data-xd-ga-action="Request Demo" target="_blank" rel="noopener">See Reveal in Action</a></p>

### Includes Complex Business Logic

While not the best place for complex business logic, a stored procedure is basically a function call on a database. You can include IF statements, LOOPS, security checks, and much more to ensure the correct data is being sent back to the call of the stored procedure.

While somewhat debatable based on your team’s skillsets, best practices lean towards putting business logic for an application on the application side. However, stored procedures and T-SQL are very powerful syntaxes for logic execution.

### Easy to Modify

You can quickly change one or more statements in a store procedure with the help of the ALTER PROCEDURE command, which makes it very fast and easy to update the results sent back to the calling app. Contrary to a middle-tier component that includes business logic, which would need a potentially costly re-deployment, a quick change to a stored procedure takes seconds.

Consider this stored procedure, where the @OrdYear value is hard-coded. A developer or database administrator can update the @OrdYear variable with ease using the ALTER PROCEDURE command.

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

### Security

Another great benefit of using stored procedures is the security it provides to its data source. You can [enhance the security of an application](/blog/security-and-analytics) using stored procedures by restricting unauthorized access. For example, you can grant someone access to a procedure that updates the database table without allowing access to the table itself. You can also use stored procedures to “hide” the underlying table names from the end-user of the stored procedure. Since the caller of the stored procedure only has the name of the stored procedure, not the name of the tables used in the stored procedure, they won’t be able to directly access the tables with your data in any malicious way.

## Differences Between Stored Procedures and Functions

Stored procedures and functions are database objects containing sets of SQL statements to complete tasks. And while they might seem like the same thing at first glance, they are quite different.

These are some of the things that differentiate stored procedures and functions:

- Functions can be called from a stored procedure, whereas stored procedure cannot be called from a function.
- A function does not allow output parameters, whereas a stored procedure allows both output and input parameters.
- You cannot manage transactions inside a function but can do it inside a stored procedure.
- You can call a function using a select statement but cannot call a stored procedure using a select statement.
- A function has a return type and returns a value, whereas a stored procedure does not have a return type, and returning a value is optional.
- A function allows only a SELECT statement in it, whereas a stored procedure allows SELECT, INSERT, UPDATE, AND DELETE.
- A stored procedure can be used to read and modify data, whereas a function can only read it.
- A function can be embedded in a SELECT statement, whereas a stored procedure cannot be utilized in a SELECT statement.
- A function can’t return multiple result sets, while a stored procedure can.
- We can use transactions in stored procedures, but they are not allowed in functions.

## How to Create a Stored Procedure?

Creating a new stored procedure is straightforward. There are 3 basic steps:

1. In the **SQL Server Object Explorer**, Right-Click on the **Stored Procedures node** under Programmability.

![creating a stored procedure ](/images/2021/08/how-to-create-stored-procedure.png)

2. In the New Stored Procedure Template, **modify the CREATE PROCEDURE statement** to include the tables, parameters, and query options to return the desired data from the stored procedure.

![how to create a stored procedure](/images/2021/08/creating-stored-procedure-in-embedded-analytics.png)

3. Click the **Execute** button in the toolbar to compile **and save your stored procedure**.

![creating a stored procedure](/images/2021/08/creating-stored-procedure.png)

There are multiple tools to create stored procedures, using the interactive SQL Server Management Studio is the easiest, as it gives you an easy way to get started connecting to many different types of database servers, including Azure and SQL Server Analysis Services.

## How to Use Store Procedures in Embedded Analytics?

When using the [Reveal Embed SDK](/download-sdk) there are 2 ways to use stored procedures.

1. When you are creating a new [visualization](/glossary/data-visualization) on a database that supports stored procedures, you’ll see a list of stored procedures that are available to you. You will treat the stored produced you select just like any other data source in Reveal, the only difference being a parameterized stored procedure, which you can use in a Filter by passing variables to the stored procedure.

![stored procedures in embedded analytics](/images/2021/08/how-to-use-stored-procedures-in-embedded-analytics.png)

You can watch a quick 6-minute video on how to use stored procedures via the Reveal user interface here:

2. As Reveal is an SDK, you also have complete programmatic control over stored procedures and parameters via code. To pass a stored procedure name, along with any required parameters, use the ChangeVisualizationDataSourceItemAsync function. This example demonstrates passing a stored procedure named CustOrderHist and passing the CustomerID parameter.

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

## Wrap up

Stored procedures are a powerful tool to query a database and return results to a calling app. You should consider using stored procedures to simplify the way you present data to Reveal SDK users and to simplify how you deal with parameters in your application code vs. using error-prone and lengthy ad-hoc queries.

You can learn more about [Reveal embedded analytics](/embedded-analytics) and how it works by [downloading our SDK](/download-sdk) or by [scheduling a quick demo](/request-demo).

<div class="text-left banner banner--embedded text-white">
      <p class="banner__headline">Unlock More Hours a Day</p>
      <p class="banner__msg">Simplify and accelerate the execution of SQL queries with Reveal Embedded Analytics</p>
      <a href="https://www.revealbi.io/request-demo" class="btn btn-secondary trackCTA" data-xd-ga-action="CTA Banner" data-xd-ga-label="default" target="_blank" rel="noopener">SEE HOW IT WORKS</a>
    </div>
