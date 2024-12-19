---
title: About the query container
description: Query containers in Persistence Layer. This guide explains their role in managing database queries, ensuring modular and efficient data access for Zed backend development.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/query-container
originalArticleId: 04a14116-3380-4712-a840-3464a4177c84
redirect_from:
  - /docs/scos/dev/back-end-development/zed/persistence-layer/query-container/query-container.html
related:
  - title: Implement a query container
    link: docs/dg/dev/backend-development/zed/persistence-layer/query-container/implement-a-query-container.html
  - title: Using a query container
    link: docs/dg/dev/backend-development/zed/persistence-layer/query-container/using-a-query-container.html
---

{% info_block infoBox "When to use query containers" %}

Don't use query containers to cross module boundaries, as this increases module coupling. However, you can use them behind [Repository](/docs/dg/dev/backend-development/zed/persistence-layer/repository.html) and [Entity Manager](/docs/dg/dev/backend-development/zed/persistence-layer/entity-manager.html) as query aggregations.

Previously, query containers were used to cross-module borders (using dependency providers), which led to higher module coupling and leaking of the `Persistence` layer from one domain object to another, and therefore, to higher maintenance efforts and lower code reusability. This approach is deprecated, so we don't recommend using query containers like this in your project development.

{% endinfo_block %}

A query container holds all the database queries of the current module.

Each module has exactly one query container, which also acts as an entry point to the `Persistence` layer. Internally, it uses [query objects](/docs/dg/dev/backend-development/zed/persistence-layer/query-objects-creation-and-usage.html) and returns unterminated queries.

As you can see in the following example, the query container consists of `query-methods`. It gets [query objects](/docs/dg/dev/backend-development/zed/persistence-layer/query-objects-creation-and-usage.html) from the [factory](/docs/dg/dev/backend-development/factory/factory.html), adds some filters or joins, and returns the unterminated query object.

 Avoid unterminated queries in the Application layers above `Persistence`. To decouple persistence and ORM implementation details, consider using the [Repository](/docs/dg/dev/backend-development/zed/persistence-layer/repository.html) and [Entity Manager](/docs/dg/dev/backend-development/zed/persistence-layer/entity-manager.html) patterns.

Unterminated means you don't execute the query with `find()`, `findOne()`, or `count()`.

```php
use Spryker\Zed\Kernel\Persistence\AbstractQueryContainer;

/**
 * @method \Pyz\Zed\MyBundle\Persistence\MyBundlePersistenceFactory getFactory()
 */
class MyBundleQueryContainer extends AbstractQueryContainer implements MyBundleQueryContainerInterface
{
    public function queryTemplateByPath($path)
    {
        $query = $this->getFactory()->createTemplateQuery();
        $query->filterByTemplatePath($path);

        return $query;
    }
}
```

## Related Spryks

To generate the related code, you can use the following definitions:

* `vendor/bin/console spryk:run AddZedPersistencePropelAbstractQuery`: Add Zed Persistence Propel Abstract Query

For details, see [Spryks](/docs/dg/dev/sdks/sdk/spryks/spryks.html).

## Next steps

* For information about using the query containers, see [Using a query container](/docs/dg/dev/backend-development/zed/persistence-layer/query-container/using-a-query-container.html).
* If you need to implement your own Query Container, see [Implement a query container](/docs/dg/dev/backend-development/zed/persistence-layer/query-container/implement-a-query-container.html).
