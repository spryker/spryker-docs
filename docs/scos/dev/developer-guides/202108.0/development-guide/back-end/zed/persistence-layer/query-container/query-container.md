---
title: About the Query Container
originalLink: https://documentation.spryker.com/2021080/docs/query-container
redirect_from:
  - /2021080/docs/query-container
  - /2021080/docs/en/query-container
---

A query container holds all the database queries of the current module.

Each module has exactly one query container, which also acts as an entry point to the persistence layer. Internally, it uses [query objects](https://documentation.spryker.com/docs/query-objects) and returns unterminated queries.

As you can see in the example below, the query container consists of `query-methods` which gets [query objects](https://documentation.spryker.com/docs/query-objects) from the [factory](https://documentation.spryker.com/docs/factory), adds some filters or joins and returns the unterminated query object.

Unterminated queries should be avoided in the Application Layers above Persistence. Consider using the [Repository](https://documentation.spryker.com/docs/repository) and [Entity Manager](https://documentation.spryker.com/docs/entity-manager) patterns to decouple persistence and ORM implementation details.

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

See the [Spryk](https://documentation.spryker.com/docs/spryk-201903) documentation for details.

## What's next?

* See [Using a Query Container](https://documentation.spryker.com/docs/using-a-query-container) for information on how to use the Query Containers.
* If you need to implement your own Query Container, see [Implementing a Query Container](https://documentation.spryker.com/docs/implementing-a-query-container).
