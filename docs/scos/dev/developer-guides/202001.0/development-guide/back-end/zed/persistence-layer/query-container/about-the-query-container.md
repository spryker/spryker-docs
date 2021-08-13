---
title: About the Query Container
description: A query container holds all the database queries of the current module.
originalLink: https://documentation.spryker.com/v4/docs/query-container
originalArticleId: 8cb091a7-f7db-409e-b30a-78b833ec9244
redirect_from:
  - /v4/docs/query-container
  - /v4/docs/en/query-container
---

A query container holds all the database queries of the current module.

Each module has exactly one query container, which also acts as an entry point to the persistence layer. Internally, it uses [query objects](/docs/scos/dev/developer-guides/202001.0/development-guide/back-end/zed/persistence-layer/query-objects-creation-and-usage.html) and returns unterminated queries.

As you can see in the example below, the query container consists of `query-methods` which gets [query objects](/docs/scos/dev/developer-guides/202001.0/development-guide/back-end/zed/persistence-layer/query-objects-creation-and-usage.html) from the [factory](/docs/scos/dev/developer-guides/202001.0/development-guide/back-end/data-manipulation/data-enrichment/factory/creating-instances-of-classes-factory.html), adds some filters or joins and returns the unterminated query object.

Unterminated queries should be avoided in the Application Layers above Persistence. Consider using the [Repository](/docs/scos/dev/developer-guides/202001.0/development-guide/back-end/zed/persistence-layer/repository.html) and [Entity Manager](/docs/scos/dev/developer-guides/202001.0/development-guide/back-end/zed/persistence-layer/entity-manager.html) patterns to decouple persistence and ORM implementation details.

Unterminated means you don’t execute the query with `find()`, `findOne()` or `count()`.

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

You might use the following definitions to generate the related code:

* `vendor/bin/console spryk:run AddZedPersistencePropelAbstractQuery` - Add Zed Persistence Propel Abstract Query

See the [Spryk](/docs/scos/dev/features/202001.0/sdk/spryk-code-generator.html) documentation for details.

## What's next?

* See [Using a Query Container](/docs/scos/dev/developer-guides/202001.0/development-guide/back-end/zed/persistence-layer/query-container/using-a-query-container.html) for information on how to use the Query Containers.
* If you need to implement your own Query Container, see [Implementing a Query Container](/docs/scos/dev/developer-guides/202001.0/development-guide/back-end/zed/persistence-layer/query-container/implementing-a-query-container.html).
