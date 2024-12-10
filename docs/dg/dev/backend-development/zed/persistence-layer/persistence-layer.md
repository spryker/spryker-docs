---
title: About the Persistence layer
description: Zed's persistence layer is the owner of the schema, entities and queries. This layer knows the database structure and holds the connection to it.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/persistence-layer
originalArticleId: 1633adeb-b9a2-4707-ba78-371dc80e03b0
redirect_from:
  - /docs/scos/dev/back-end-development/zed/persistence-layer/persistence-layer.html
related:
  - title: Database overview
    link: docs/scos/dev/back-end-development/zed/persistence-layer/database-overview.html
  - title: Database schema definition
    link: docs/scos/dev/back-end-development/zed/persistence-layer/database-schema-definition.html
  - title: Entity
    link: docs/scos/dev/back-end-development/zed/persistence-layer/entity.html
  - title: Entity manager
    link: docs/scos/dev/back-end-development/zed/persistence-layer/entity-manager.html
  - title: About the query container
    link: docs/scos/dev/back-end-development/zed/persistence-layer/query-container/query-container.html
  - title: Query objects - creation and usage
    link: docs/scos/dev/back-end-development/zed/persistence-layer/query-objects-creation-and-usage.html
  - title: Repository
    link: docs/scos/dev/back-end-development/zed/persistence-layer/repository.html
  - title: About the Business layer
    link: docs/dg/dev/backend-development/zed/business-layer/business-layer.html
  - title: About Communication layer
    link: docs/dg/dev/backend-development/zed/communication-layer/communication-layer.html
---

Zed's `Persistence` layer is the owner of the schema, entities, and queries. This layer knows the database structure and holds the connection to it.

## Integrated technologies

Propel Fast and simple ORM Framework MySQL or PostgreSQL. Both databases are supported.

## Persistence layer elements:

| ELEMENT   | DESCRIPTION |
| ----------------- | ------------------------------------------------------------ |
| Repository          | Repository is used to read from the database. |
| Entity manager | Entity manager allows operating with table contents. |
| Entities | Entity represents a single row from the database. |
|Queries| Query objects provide an object-oriented API for writing database queries. |
| Schema definition | XML files that define the database schema for the related module.|
| Persistence factory | Factory is used to instantiate query objects. |

The following diagram shows how the elements interact:
![Diagram showing interaction of elements](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Back-End/Zed/Persistence+Layer/persistence-layer.png)
