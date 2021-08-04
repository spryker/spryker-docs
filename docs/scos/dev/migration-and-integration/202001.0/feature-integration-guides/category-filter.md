---
title: Category Filters Feature Integration
originalLink: https://documentation.spryker.com/v4/docs/category-filter-feature-integration
redirect_from:
  - /v4/docs/category-filter-feature-integration
  - /v4/docs/en/category-filter-feature-integration
---

## Prerequisites
To prepare your project to work with Category Filters:

1. Require the Category Filters modules in your composer by running:
*  `composer require spryker/product-category-filter`
*  `composer require spryker/product-category-filter-collector`
*  `composer require spryker/product-category-filter-gui`

2.  Install the new database tables by running `vendor/bin/console propel:diff`. Propel should generate a
migration file with the changes.
    
3. Run `vendor/bin/console propel:migrate` to apply the database changes.
4. Generate ORM models by running `vendor/bin/console propel:model:build`.
This command will generate some new classes in your project under the `  \Orm\Zed\ProductCategoryFilter\Persistence namespace`.
It is important to make sure that they extend the base classes from the Spryker core, for example:

* `\Orm\Zed\ProductCategoryFilter\Persistence\SpyProductCategoryFilter` extends `\Spryker\Zed\ProductCategoryFilter\Persistence\Propel\AbstractSpyProductCategoryFilter`

* `\Orm\Zed\ProductReview\Persistence\SpyProductCategoryFilterQuery` extends `\Spryker\Zed\ProductCategoryFilter\Persistence\Propel\AbstractSpyProductCategoryFilterQuery`

5. Run `vendor/bin/console transfer:generate` to generate the new transfer objects.
6.  Activate the product category filters collector by adding `ProductCategoryFilterCollectorPlugin` to    the Storage Collector plugin stack.

<details open>
    <summary>Example: collector plugin list extension</summary> 
    
```php
<?php

    namespace Pyz\Zed\Collector;

    use Spryker\Zed\Collector\CollectorDependencyProvider as SprykerCollectorDependencyProvider;
    use Spryker\Zed\Kernel\Container;
    use Spryker\Zed\ProductReviewCollector\Communication\Plugin\ProductReviewCollectorSearchPlugin;
    use Spryker\Zed\ProductReviewCollector\Communication\Plugin\ProductAbstractReviewCollectorStoragePlugin;
    // ...

    class CollectorDependencyProvider extends SprykerCollectorDependencyProvider
    {
        /**
         * @param \Spryker\Zed\Kernel\Container $container
         *
         * @return \Spryker\Zed\Kernel\Container
         */
        public function provideBusinessLayerDependencies(Container $container)
        {
            // ...

            $container[static::STORAGE_PLUGINS] = function (Container $container) {
                return [
                    // ...
                    ProductCategoryFilterConfig::RESOURCE_TYPE_PRODUCT_CATEGORY_FILTER => new ProductCategoryFilterCollectorPlugin(),
                ];
            };


            // ...
        }
    }
```

<br>
</details>

7. Make sure the new Zed user interface assets are built. Run `npm run zed` (or antelope build zed
        for older versions) for that.
8. Update Zed’s navigation cache to show the new items for the Product Category Filter management user interface by running `vendor/bin/console application:build-navigation-cache`.

You should now be able to use the Zed UI of Category Filters to re-order, remove or add search filters to specific categories, and the collectors should also be able to push those category settings to storage.
Check out our [Demoshop implementation](https://github.com/spryker/demoshop) for frontend implementation example and the general idea.

### Updating Filters For a Category
To use the setup category filter, `CatalogController::indexAction` needs to call `ProductCategoryFilterClient::updateFacetsByCategory`.

For example, it might look like this:

```php
<?php

/**
 * @method \Pyz\Yves\Catalog\CatalogFactory getFactory()
 * @method \Spryker\Client\Catalog\CatalogClientInterface getClient()
 */
class CatalogController extends AbstractController
{
    const STORAGE_CACHE_STRATEGY = StorageConstants::STORAGE_CACHE_STRATEGY_INCREMENTAL;

    /**
     * @param array $categoryNode
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return array|\Symfony\Component\HttpFoundation\Response
     */
    public function indexAction(array $categoryNode, Request $request)
    {
        $searchString = $request->query->get('q', '');

        $parameters = $request->query->all();
        $parameters[PageIndexMap::CATEGORY] = $categoryNode['node_id'];

        $searchResults = $this
            ->getClient()
            ->catalogSearch($searchString, $parameters);

        $currentLocale = $this
            ->getFactory()
            ->getLocaleClient()
            ->getCurrentLocale();

        $productCategoryFilterClient = $this->getFactory()->getProductCategoryFilterClient();

        $searchResults[FacetResultFormatterPlugin::NAME] = $productCategoryFilterClient
            ->updateFacetsByCategory(
                $searchResults[FacetResultFormatterPlugin::NAME],
                $productCategoryFilterClient->getProductCategoryFiltersForCategoryByLocale($parameters[PageIndexMap::CATEGORY], $currentLocale)
            ); //This line here is the one that updates the facets with the category filters.

        $pageTitle = ($categoryNode['meta_title']) ?: $categoryNode['name'];
        $metaAttributes = [
            'idCategory' => $parameters['category'],
            'category' => $categoryNode,
            'page_title' => $pageTitle,
            'page_description' => $categoryNode['meta_description'],
            'page_keywords' => $categoryNode['meta_keywords'],
            'searchString' => $searchString,
        ];

        $searchResults = array_merge($searchResults, $metaAttributes);

        return $this->envelopeResult($searchResults, $categoryNode['node_id']);
    }
}
```

It is also necessary to add `ProductCategoryFilterClient` to `CatalogFactory`:

```php
<?php

namespace Pyz\Yves\Catalog;

class CatalogFactory extends AbstractFactory
{
    /**
     * @return \Spryker\Client\ProductCategoryFilter\ProductCategoryFilterClientInterface
     */
    public function getProductCategoryFilterClient()
    {
        return $this->getProvidedDependency(CatalogDependencyProvider::CLIENT_PRODUCT_CATEGORY_FILTER);
    }
}
```

Add an additional dependency to `CatalogDependencyProvider` to look like this:

```php
<?php

namespace Pyz\Yves\Catalog;

class CatalogDependencyProvider extends AbstractBundleDependencyProvider
{
    const CLIENT_PRODUCT_CATEGORY_FILTER = 'CLIENT_PRODUCT_CATEGORY_FILTER';

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    public function provideDependencies(Container $container)
    {
        $container = $this->addProductCategoryFilterClient($container);

        return $container;
    }

    /**
     * @param \Spryker\Yves\Kernel\Container $container
     *
     * @return \Spryker\Yves\Kernel\Container
     */
    protected function addProductCategoryFilterClient(Container $container)
    {
        $container[static::CLIENT_PRODUCT_CATEGORY_FILTER] = function (Container $container) {
            return $container->getLocator()->productCategoryFilter()->client();
        };

        return $container;
    }
}
```

<!-- Last review date: Dec 1, 2017 -->

[//]: # (by Ahmed Sabaa)
