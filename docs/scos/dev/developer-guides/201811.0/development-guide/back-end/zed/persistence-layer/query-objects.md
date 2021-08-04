---
title: Query Objects- Creation and Usage
originalLink: https://documentation.spryker.com/v1/docs/query-objects
redirect_from:
  - /v1/docs/query-objects
  - /v1/docs/en/query-objects
---

Query objects provide an object-oriented API for writing database queries which are used in [query containers](/docs/scos/dev/developer-guides/201811.0/development-guide/back-end/zed/persistence-layer/query-container/query-container).

Please check the official [Propel Query Reference](http://propelorm.org/documentation/reference/model-criteria.html) for a complete documentation.

## Creating a New Query Object

Query objects are created by Propel during the `build model` step. See the [schema definition](/docs/scos/dev/developer-guides/201811.0/development-guide/back-end/zed/persistence-layer/database-schema) for details how to describe them in XML.

As you can see `src/Orm/Zed/` the query object which belongs to the Spryker core extend base classes placed in the vendordirectory. This way you can easily adopt the classes for your needs but we can still add methods in the core.

## Query Class Qenerator

The `Propel` module alters the rules of generating query models by requiring explicit passing of filtering criteria into `filterBy..` and `findBy...` methods.

This means, that when an array, `LIKE` expression or an array with `min/max` are passed as a filtering argument, it is explicitly required to specify `Criteria::IN`, `Criteria::LIKE` or `Criteria::BETWEEN`. The `Criteria::BETWEEN` is implemented in the wrapper class `Spryker\Zed\Propel\Business\Runtime\ActiveQuery\Criteria`.

Additionally the `Propel` module adds the following methods into the generated classes, that allow to easily filter: `filterBy...._In()`, `filterBy...._Like()` and `filterBy...._Between()`.
