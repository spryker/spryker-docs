---
title: Data Processing Guidelines
description: The article describes the most important concepts and best practices that should be used during data processing.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/data-processing-guidelines
originalArticleId: 5db3896c-3085-4056-870c-2c28cd0fe62b
redirect_from:
  - /docs/scos/dev/guidelines/data-processing-guidelines.html
related:
  - title: Making your Spryker shop secure
    link: docs/dg/dev/guidelines/security-guidelines.html
  - title: Module configuration convention
    link: docs/dg/dev/guidelines/module-configuration-convention.html
  - title: Project development guidelines
    link: docs/dg/dev/guidelines/project-development-guidelines.html
---

One of the most important questions addressed during project development is "How to bring data in my project?". Spryker provides the required infrastructure to address performance and consistency when dealing with project data.

The simplest way to bring data to a project is to leverage [Data importers](/docs/dg/dev/data-import/{{site.version}}/creating-data-importers.html) and [P&S](/docs/dg/dev/backend-development/data-manipulation/data-publishing/publish-and-synchronization.html) infrastructure. See [Data importers overview and implementation](/docs/dg/dev/guidelines/data-processing-guidelines.html) for the list of available importers.

## Strategies and concepts

Before starting the implementation, let's consider the most important concepts and best practices that should be used during data processing.

### Incremental data updates

The rule of thumb is: *Follow incremental data updates. Avoid repetitive full data import.*

A full data import is required during the initial project setup. Once data is uploaded on a staging or a production system, a project needs to switch operations to only apply incremental updates. Fox example, only new products should be added to the import pipeline, or only prices updated in ERP are added to the import pipeline.

{% info_block infoBox "Note" %}

A few independent specialized data import pipelines are more performant and flexible than a single one.

{% endinfo_block %}

### Batch operations

To achieve decent performance, batch processing is preferable instead of per-entity processing for reading and writing operations - IO. IO operations have lower scalability opportunities than stateless data transformation. This means that irrespective of the number of entities, you should initiate only 1 SQL query while reading data and 1 SQL while persisting.

{% info_block infoBox "Note" %}

The exponential growth of SQL queries is a good refactoring reason.

{% endinfo_block %}

To read in batches, consider pre-collecting of identifiers. Also, you can leverage table JOINs and UNIONs to enrich complete datasets in relational DBs.

To write in batches, consider INSERT concatenations or an advanced method with CTE (described below). Concatenated INSERTs generate lots of repetitive character sequences that lead to Mbs of useless data transferred over a network. CTE doesn't have this pitfall.

When writing in batches, there can be data inconsistency, which will be discovered only on DB query execution. In some cases, one of the business requirements is to be able to work with inconsistent data. Typically after a DB exception and transaction rollback, one could decide to stop the import process or log the data set and continue with the next one. Both options are **not optimal** as terminated processes usually cause business losses and leave an engineer no trail on what entity in a batch caused the problem. In this case, consider a fallback strategy for batch operation. The default strategy here is switching to the per-entity processing, where healthy records will reach DB, and unhealthy ones could be logged and then analyzed outside of the data import process. More details on this topic can be found [here](https://docs.spring.io/spring-batch/docs/current/reference/html/index-single.html#databaseItemWriters).
![image](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Guidelines/Data+Processing+Guidelines/recovery+on+batch.png)

### Using queues

Data processing has higher impacts on IO resources. To scale this process and take advantage of parallel processing, the use of Queues would be an ideal option to prioritize and buffer the data for asynchronous processing. Queues will allow multiple processes to consume the data messages and process them in different machines or clouds. Spryker has the [Queue DataImporter readers](/docs/dg/dev/data-import/{{site.version}}/importing-data-with-the-queue-data-importer.html), so projects can integrate and use this feature for data processing.

{% info_block infoBox "Note" %}

When parallel processing is used, data dependency must be handled manually, and dependent queues must be consumed by order. For example, to import Product Concretes, all processes of Product Abstracts must be finished first.

{% endinfo_block %}

### Data consistency

There are many DB features we use for data consistency, such as foreign keys or unique indexes. This way, we ensure that only complete data sets reach production DB.

At the same time, IO operations have limited scalability. This means that we need to ensure data consistency before reaching the persistence layer.

The first step in achieving this is to establish a data pipeline, where inconsistent data sets do not reach Spryker Data Importers and are managed on the data export phase–for example, by ERP or Middleware.

When a clean data pipeline is not possible by DevVM system requirements, you can establish runtime validations. They should prevent inconsistent data coming to the persistence layer and reduce pollution of the DB connection with invalid SQL queries. In this case, we spend CPU time for validation, which remains highly scalable until business models are stateless.

We recommend collecting import statistics and logs to identify new reasons for data inconsistency and implement relevant validators. Example: while importing summer collection, we found that new products are missing category assignment. In this case, we implement a category validator that will clean the data up before propagating it to persistence.

### Common table expressions

[Common Table Expressions, or CTE](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-cte/), is a preferable way to write operations.

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
