---
title: Data Processing Guidelines
originalLink: https://documentation.spryker.com/v5/docs/data-processing-guidelines
redirect_from:
  - /v5/docs/data-processing-guidelines
  - /v5/docs/en/data-processing-guidelines
---

One of the most important questions addressed during project development is “How to bring data in my project?”. Spryker provides the required infrastructure to address performance and consistency when dealing with project data.

The simplest way to bring data to a project is to leverage [Data Importers](https://documentation.spryker.com/docs/en/ht-data-import) and [P&S](https://documentation.spryker.com/docs/en/publish-and-synchronization) infrastructure. See [Data Importers Overview and Implementation](https://documentation.spryker.com/docs/en/data-processing-guidelines) for the list of available importers. 

## Strategies and Concepts

Before starting the implementation, let’s consider the most important concepts and best practices that should be used during data processing.

### Incremental Data Updates

The rule of thumb is: *Follow incremental data updates. Avoid repetitive full data import.*

A full data import is required during the initial project setup. Once data is uploaded on a staging or a production system, a project needs to switch operations to only apply incremental updates. E.g., only new products should be added to the import pipeline, or only prices updated in ERP are added to the import pipeline.

{% info_block infoBox "Note" %}

A few independent specialized data import pipelines are more performant and flexible than a single one.

{% endinfo_block %}

### Batch Operations

To achieve decent performance, batch processing is preferable instead of per-entity processing for reading and writing operations - IO. IO operations have lower scalability opportunities than stateless data transformation. This means that irrespective of the number of entities, you should initiate only 1 SQL query while reading data and 1 SQL while persisting. 

{% info_block infoBox "Note" %}

The exponential growth of SQL queries is a good refactoring reason.

{% endinfo_block %}

To read in batches, consider pre-collecting of identifiers. Also, you can leverage table JOINs and UNIONs to enrich complete datasets in relational DBs.

To write in batches, consider INSERT concatenations or an advanced method with CTE (described below). Concatenated INSERTs generate lots of repetitive character sequences that lead to Mbs of useless data transferred over a network. CTE doesn’t have this pitfall. 

When writing in batches, there can be data inconsistency, which will be discovered only on DB query execution. In some cases, one of the business requirements is to be able to work with inconsistent data. Typically after a DB exception and transaction rollback, one could decide to stop the import process or log the data set and continue with the next one. Both options are **not optimal** as terminated processes usually cause business losses and leave an engineer no trail on what entity in a batch caused the problem. In this case, consider a fallback strategy for batch operation. The default strategy here is switching to the per-entity processing, where healthy records will reach DB, and unhealthy ones could be logged and then analyzed outside of the data import process. More details on this topic can be found [here](https://docs.spring.io/spring-batch/docs/current/reference/html/index-single.html#databaseItemWriters). 
![image](https://confluence-connect.gliffy.net/embed/image/c8d699ec-7565-41a5-852e-712f4c5c9a5f.png?utm_medium=live&utm_source=custom){height="" width=""}

### Using Queues

Data processing has higher impacts on IO resources. To scale this process and take advantage of parallel processing, the use of Queues would be an ideal option to prioritize and buffer the data for asynchronous processing. Queues will allow multiple processes to consume the data messages and process them in different machines or clouds. Spryker has the [Queue DataImporter readers](https://documentation.spryker.com/docs/en/importing-data-with-queue-data-importer), so projects can integrate and use this feature for data processing.

{% info_block infoBox "Note" %}

When parallel processing is used, data dependency must be handled manually, and dependent queues must be consumed by order. E.g., to import Product Concretes, all processes of Product Abstracts must be finished first.

{% endinfo_block %}

### Data Consistency

There are many DB features we use for data consistency (e.g., foreign keys, unique indexes). This way, we ensure that only complete data sets reach production DB.

At the same time, IO operations have limited scalability. This means that we need to ensure data consistency before reaching the persistence layer.

The first step in achieving this is to establish a data pipeline, where inconsistent data sets do not reach Spryker Data Importers and are managed on the data export phase (e.g., by ERP, Middleware). 

When a clean data pipeline is not possible by system requirements, you can establish runtime validations. They should prevent inconsistent data coming to the persistence layer and reduce pollution of the DB connection with invalid SQL queries. In this case, we spend CPU time for validation, which remains highly scalable until business models are stateless.

We recommend collecting import statistics and logs to identify new reasons for data inconsistency and implement relevant validators. Example: while importing summer collection, we found that new products are missing category assignment. In this case, we implement a category validator that will clean the data up before propagating it to persistence.

### Common Table Expressions

[Common Table Expressions, or CTE](https://www.postgresqltutorial.com/postgresql-cte/), is a preferable way to write operations. 

CTE requires additional qualification and could look complex from the first view. So by default Spryker Products are configured with per-entity Propel data importer and P&S writers. To enable the out-of-the-box CTE writers, you need to configure them in Data Import Factory. When a project brings its own data structures or changes the existing ones, CTE provided by Spryker should be enhanced with new tables and fields.

{% info_block warningBox "Locking issues" %}

We identified a table locking problem caused by CTE while working with large, highly accessible tables. In case you are facing locking issues, consider switching to concatenated UPDATEs and INSERTs.

{% endinfo_block %}

Example:

```SQL
WITH records AS (
    SELECT
      input.abstract_sku,
      ....
    FROM (
           SELECT
             unnest(? :: VARCHAR []) AS abstract_sku,
         ) input
),
    updated AS (
    UPDATE spy_product_abstract
    SET
      sku = records.abstract_sku,
      ...
    FROM records
    WHERE records.abstract_sku = spy_product_abstract.sku
    RETURNING id_product_abstract,sku
  ),
    inserted AS(
    INSERT INTO spy_product_abstract (
      id_product_abstract,
      sku,
      ....
    ) (
      SELECT
        nextval('spy_product_abstract_pk_seq'),
        abstract_sku,
        ...
    FROM records
    WHERE idProductAbstract is null
  ) RETURNING id_product_abstract,sku
)
SELECT updated.id_product_abstract,sku FROM updated UNION ALL SELECT inserted.id_product_abstract,sku FROM inserted;
```

