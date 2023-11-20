


This document describes how to install the [Category Filters](/docs/scos/user/features/{{page.version}}/search-feature-overview/category-filters-overview.html).

## Install feature core

Follow the steps below to install the Category Filters feature core.

## Prerequisites

Prepare your project to work with Category Filter:

1. Require Category Filters' modules in your Сomposer:
*  `composer require spryker/product-category-filter`
*  `composer require spryker/product-category-filter-collector`
*  `composer require spryker/product-category-filter-gui`

2. Install the new database tables by running `vendor/bin/console propel:diff`. Propel generates a migration file with the changes.

3. Apply the database changes:
```bash
vendor/bin/console propel:migrate
```

4. Generate ORM models: 
```bash
vendor/bin/console propel:model:build
```
This command generates some new classes in your project under the `\Orm\Zed\ProductCategoryFilter\Persistence namespace`. 

{% info_block warningBox "Verification" %}

Make sure that they extend the base classes from the Spryker core—for example:

* `\Orm\Zed\ProductCategoryFilter\Persistence\SpyProductCategoryFilter` extends `\Spryker\Zed\ProductCategoryFilter\Persistence\Propel\AbstractSpyProductCategoryFilter`

* `\Orm\Zed\ProductReview\Persistence\SpyProductCategoryFilterQuery` extends `\Spryker\Zed\ProductCategoryFilter\Persistence\Propel\AbstractSpyProductCategoryFilterQuery`

{% endinfo_block %}

5. Generate the new transfer objects:
```bash
vendor/bin/console transfer:generate
```
6. Activate the product category filters collector by adding `ProductCategoryFilterCollectorPlugin` to the Storage Collector plugin stack.

**Example: collector plugin list extension:**

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

7. Make sure the new Zed user interface assets are built. Run `npm run zed` (or antelope build Zed
for older versions) for that.
8. Update Zed's navigation cache to show the new items for the Product Category Filter management user interface:
```bash
vendor/bin/console application:build-navigation-cache
```

Now you can use the Zed UI of Category Filters to reorder, remove, or add search filters to specific categories. The collectors also can push those category settings to storage.
For the frontend implementation example and the general idea, check out our [`demoshop` implementation](https://github.com/spryker/demoshop).

### Update filters for a category

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

Add `ProductCategoryFilterClient` to `CatalogFactory`:

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
