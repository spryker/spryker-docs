---
title: About the Persistence Layer
originalLink: https://documentation.spryker.com/v6/docs/persistence-layer
redirect_from:
  - /v6/docs/persistence-layer
  - /v6/docs/en/persistence-layer
---

Zed’s persistence layer is the owner of the schema, entities and queries. This layer knows the database structure and holds the connection to it.

## Integrated Technologies

Propel	Fast and simple ORM Framework MySQL or PostgreSQL.	Both databases are supported.

## Persistence Layer Elements:

| Element   | Description |
| ----------------- | ------------------------------------------------------------ |
| Repository          | Repository is used to read from the database. |
| Entity manager | Entity manager allows operating with table contents. |
| Entities | Entity represents a single row from the database. |
|Queries| Query objects provide an object-oriented API for writing database queries. |
| Schema definition | XML files that define the database schema for the related module.|
| Persistence factory | Factory is used to instantiate query objects. |

The following diagram shows how the elements interact:
![Diagram showing interaction of elements](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Zed/Persistence+Layer/persistence-layer.png){height="" width=""}
