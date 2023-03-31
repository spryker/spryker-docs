---
title: "HowTo: import 1M of products and make it searchable and shown on the Storefront"
last_updated: Mar 31, 2023
template: howto-guide-template
---

This document outlines approaches to importing large volumes of data. We assume that you are using a standard model of product data, product prices, categories, and other entities.

## DataImport approaches

There are several approaches to data import, and Spryker uses two of them:

* [One-by-one approach](/docs/scos/dev/tutorials-and-howtos/advanced-tutorials/howto-import-1m-of-products-and-make-it-searchable-and-shown-on-the-storefront#one-by-one-approach)
* [Bulk approach](/docs/scos/dev/tutorials-and-howtos/advanced-tutorials/howto-import-1m-of-products-and-make-it-searchable-and-shown-on-the-storefront#bulk-approach)

Each of these approaches has its own advantages and disadvantages, which we will try to discuss in the current document.

### One-by-one approach
<a href="#one-by-one-approach"></a>

This approach is mainly used for importing small amounts of data, as for importing a single entity, DataImport must:


<a href="#one-by-one-approach-steps"></a>
* Check the imported data to ensure that it is complete and accurate, without errors or inconsistencies.
* Prepare the data for importing a single entity, including related entities (for example, TaxSet IDs for products).
* Import (save) the data to the database.

These steps are performed for each individual entity in the dataset, which is the simplest and most convenient way of importing, as it is easy to implement and to track potential errors. In case of an unsuccessful import, it is easy to determine which dataset is causing the problems.

However, as you may have noticed, this approach has performance issues, as it saves entities one by one, resulting in a large number of transactions and increasing the load on the database, which becomes a bottleneck when using this approach. In the case of a small amount of data, these issues can be disregarded.

### Bulk approach
<a href="bulk-approach"></a>

The bulk approach to data import in Spryker has the same [steps as One-by-one approach](/docs/scos/dev/tutorials-and-howtos/advanced-tutorials/howto-import-1m-of-products-and-make-it-searchable-and-shown-on-the-storefront#one-by-one-approach-steps) except for the last step: while DataImport will perform all necessary actions to prepare for import, it will not save the entities to the database until a certain amount of data sets have accumulated, and later it will use a raw SQL query to perform the actual data import operation.

This approach solves the speed problem of data import, but it creates several difficulties, namely:

* Tracking errors becomes more difficult because DataImport now writes multiple entities to the database simultaneously. If the data contains an error, it's hard to determine which data set caused the problem (this issue should be addressed during data validation).
* You will need to maintain a complex raw SQL query and modify it in case of changes to the data structure or import functionality.
* The SQL query structure will likely differ depending on the selected RDBMS (PostgreSQL/MySQL).

### Raw SQL queries and Common Table Expressions (CTE)

In the paragraph above, we have learned that a raw SQL query provides better performance when importing large volumes of data and is the preferred method for storing information in a database. However, there are several approaches to consider, and we will discuss two of them:

* Common Table Expressions (CTE)
* UPSERT using INSERT with ON DUPLICATE KEY UPDATE

#### Common Table Expressions (CTE)

CTEs allow users to create additional statements that can be utilized within a larger query. These statements function as temporary tables that are only applicable to a single query. The auxiliary statements, which can take the form of SELECT, INSERT, UPDATE, or DELETE commands, are grouped together within a WITH clause that is then attached to a primary statement. The primary statement can also be a SELECT, INSERT, UPDATE, or DELETE command.

By utilizing CTEs, users can simplify the process of writing and maintaining complex queries, resulting in increased readability. This is achieved by breaking down complicated queries into simple blocks that can be reused when needed, similar to how database views and derived tables work. As a result, the overall complexity of the query is reduced.

As we can see, CTE is a very convenient tool, but how about its performance? It all depends on the RDBMS you are using. Our measurements have shown a slight increase in performance when using MySQL and a significant increase when using PostgreSQL.

#### UPSERT using INSERT with ON DUPLICATE KEY UPDATE

This approach is easy to use, provides good and predictable results, but slightly complicates the final code of the importer.


SUMMARY
//to do summarise all steps and provide links to the corresponding docs