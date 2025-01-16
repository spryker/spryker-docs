---
title: Query objects - creation and usage
description: Query objects provide an object-oriented API for writing database queries which are used in query containers.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/query-objects
originalArticleId: b8357f84-9f29-4386-ad69-01888d697556
redirect_from:
  - /docs/scos/dev/back-end-development/zed/persistence-layer/query-objects-creation-and-usage.html
related:
  - title: Database overview
    link: docs/dg/dev/backend-development/zed/persistence-layer/database-overview.html
  - title: Database schema definition
    link: docs/dg/dev/backend-development/zed/persistence-layer/database-schema-definition.html
  - title: Entity
    link: docs/dg/dev/backend-development/zed/persistence-layer/entity.html
  - title: Entity manager
    link: docs/dg/dev/backend-development/zed/persistence-layer/entity-manager.html
  - title: About the query container
    link: docs/dg/dev/backend-development/zed/persistence-layer/query-container/query-container.html
  - title: Repository
    link: docs/dg/dev/backend-development/zed/persistence-layer/repository.html
---

Query objects provide an object-oriented API for writing database queries which are used in [query containers](/docs/dg/dev/backend-development/zed/persistence-layer/query-container/query-container.html).

Please check the official [Propel Query Reference](http://propelorm.org/documentation/reference/model-criteria.html) for a complete documentation.

## Creating a New Query Object

Query objects are created by Propel during the `build model` step. See the [schema definition](/docs/dg/dev/backend-development/zed/persistence-layer/database-schema-definition.html) for details how to describe them in XML.

As you can see `src/Orm/Zed/` the query object which belongs to the Spryker core extend base classes placed in the vendordirectory. This way you can easily adopt the classes for your needs but we can still add methods in the core.

## Query Class Qenerator

The `Propel` module alters the rules of generating query models by requiring explicit passing of filtering criteria into `filterBy..` and `findBy...` methods.

This means, that when an array, `LIKE` expression or an array with `min/max` are passed as a filtering argument, it's explicitly required to specify `Criteria::IN`, `Criteria::LIKE` or `Criteria::BETWEEN`. The `Criteria::BETWEEN` is implemented in the wrapper class `Spryker\Zed\Propel\Business\Runtime\ActiveQuery\Criteria`.

Additionally the `Propel` module adds the following methods into the generated classes, that allow to easily filter: `filterBy...._In()`, `filterBy...._Like()` and `filterBy...._Between()`.
