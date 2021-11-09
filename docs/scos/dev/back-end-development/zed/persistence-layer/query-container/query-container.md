---
title: About the Query Container
description: A query container holds all the database queries of the current module.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/query-container
originalArticleId: 04a14116-3380-4712-a840-3464a4177c84
redirect_from:
  - /2021080/docs/query-container
  - /2021080/docs/en/query-container
  - /docs/query-container
  - /docs/en/query-container
  - /v6/docs/query-container
  - /v6/docs/en/query-container
  - /v5/docs/query-container
  - /v5/docs/en/query-container
  - /v4/docs/query-container
  - /v4/docs/en/query-container
  - /v3/docs/query-container
  - /v3/docs/en/query-container
  - /v2/docs/query-container
  - /v2/docs/en/query-container
  - /v1/docs/query-container
  - /v1/docs/en/query-container
---

A query container holds all the database queries of the current module.

Each module has exactly one query container, which also acts as an entry point to the persistence layer. Internally, it uses [query objects](/docs/scos/dev/back-end-development/zed/persistence-layer/query-objects-creation-and-usage.html) and returns unterminated queries.

As you can see in the example below, the query container consists of `query-methods` which gets [query objects](/docs/scos/dev/back-end-development/zed/persistence-layer/query-objects-creation-and-usage.html) from the [factory](/docs/scos/dev/back-end-development/factory/factory.html), adds some filters or joins and returns the unterminated query object.

Unterminated queries should be avoided in the Application Layers above Persistence. Consider using the [Repository](/docs/scos/dev/back-end-development/zed/persistence-layer/repository.html) and [Entity Manager](/docs/scos/dev/back-end-development/zed/persistence-layer/entity-manager.html) patterns to decouple persistence and ORM implementation details.

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

See the [Spryk](/docs/scos/dev/sdk/development-tools/spryk-code-generator.html) documentation for details.

## What's next?

* See [Using a Query Container](/docs/scos/dev/back-end-development/zed/persistence-layer/query-container/using-a-query-container.html) for information on how to use the Query Containers.
* If you need to implement your own Query Container, see [Implementing a Query Container](/docs/scos/dev/back-end-development/zed/persistence-layer/query-container/implementing-a-query-container.html).
