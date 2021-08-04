---
title: Product Sets feature integration
originalLink: https://documentation.spryker.com/2021080/docs/product-sets-feature-integration
redirect_from:
  - /2021080/docs/product-sets-feature-integration
  - /2021080/docs/en/product-sets-feature-integration
---

This document describes how to integrate the [Product Sets feature](https://documentation.spryker.com/docs/product-sets-feature-overview) into a Spryker project.

## Prerequisites
To prepare your project to work with Product Sets:
1. Require the Product Set modules in your `composer.json`: 

```bash
composer require spryker/product-set spryker/product-set-collector spryker/product-set-gui
```

2. If you want to enable the Product Sets search powered by Elasticsearch, install the `spryker/search-elasticsearch` module:
```bash
composer require spryker/search-elasticsearch
```

3. Install the new database tables:

```bash
vendor/bin/console propel:diff
```
Propel should generate a migration file with the changes.

4. Apply the database changes: 
```bash
vendor/bin/console propel:migrate
```

5. Generate ORM models: 
```bash
vendor/bin/console propel:model:build
```


{% info_block warningBox "Verification" %}

   
Make sure that:
* New classes have been added to `\Orm\Zed\ProductSet\Persistence`.
* They extend the base classes from the Spryker core. For example:

    * `\Orm\Zed\ProductSet\Persistence\SpyProductSet` extends `\Spryker\Zed\ProductSet\Persistence\Propel\AbstractSpyProductSet`

    * `\Orm\Zed\ProductSet\Persistence\SpyProductSetData` extends `\Spryker\Zed\ProductSet\Persistence\Propel\AbstractSpyProductSetData`

    * `\Orm\Zed\ProductSet\Persistence\SpyProductAbstractSet` extends `\Spryker\Zed\ProductSet\Persistence\Propel\AbstractSpyProductAbstractSet`

    * `\Orm\Zed\ProductSet\Persistence\SpyProductSetQuery` extends `\Spryker\Zed\ProductSet\Persistence\Propel\AbstractSpyProductSetQuery`

    * `\Orm\Zed\ProductSet\Persistence\SpyProductSetDataQuery` extends `\Spryker\Zed\ProductSet\Persistence\Propel\AbstractSpyProductSetDataQuery`

    * `\Orm\Zed\ProductSet\Persistence\SpyProductAbstractSetQuery` extends `\Spryker\Zed\ProductSet\Persistence\Propel\AbstractSpyProductAbstractSetQuery`

{% endinfo_block %}

6. Get the new transfer objects:

```bash
vendor/bin/console transfer:generate
```

7. Rebuild Zed navigation:

```bash
vendor/bin/console navigation:build-cache
```

8. To activate the Product Set collectors, add `ProductSetCollectorStoragePlugin` to the storage collector plugin stack and `ProductSetCollectorSearchPlugin` to the search collector plugin stack:

```php
<?php

namespace Pyz\Zed\Collector;

use Spryker\Shared\ProductSet\ProductSetConfig;
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\ProductSetCollector\Communication\Plugin\ProductSetCollectorSearchPlugin;
use Spryker\Zed\ProductSetCollector\Communication\Plugin\ProductSetCollectorStoragePlugin;
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

		$container->set(static::SEARCH_PLUGINS, function (Container $container) {
			return [
				// ...
				ProductSetConfig::RESOURCE_TYPE_PRODUCT_SET => new ProductSetCollectorSearchPlugin(),
			];
		});
       
		$container->set(static::STORAGE_PLUGINS, function (Container $container) {
			return [
				// ...
				ProductSetConfig::RESOURCE_TYPE_PRODUCT_SET => new ProductSetCollectorStoragePlugin(),
			];
		});
        
		// ...
	}
}
```

## Data setup

Implement an installer in your project to put products together in sets representing how you want them to be displayed in your shop frontend. Find implementation examples in the [Demoshop](https://github.com/spryker/demoshop).

### Listing products sets on the Storefront
The KV storage and Elasticsearch should by now contain some product sets you can display on the Storefront. By default, the exported documents in Search do not support the configurable search features as products: full-text search, faceted navigation, sorting, and pagination. However, since their data structure is the same, it is possible to implement the same features with a custom implementation.

For a simple listing, the `ProductSet` module provides a Client API to list product sets from Elasticsearch. By calling the `ProductSetClient::getProductSetList()` method, a limited set of documents can be listed on the Storefront. The results are sorted in descending order based on the product sets' weight attributes.

The executed search query works the same way as described in Search Query. 
If you need to extend the query, for example, by filtering current store and locale, add the desired query expander plugins, like in the example below. To format a raw response from Elasticsearch, provide a result formatter plugin that is also provided by the `ProductSet` module. 

```php
<?php

namespace Pyz\Client\ProductSet;

use Spryker\Client\ProductSet\Plugin\Elasticsearch\ResultFormatter\ProductSetListResultFormatterPlugin;
use Spryker\Client\ProductSet\ProductSetDependencyProvider as SprykerProductSetDependencyProvider;
use Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\LocalizedQueryExpanderPlugin;
use Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\StoreQueryExpanderPlugin;

class ProductSetDependencyProvider extends SprykerProductSetDependencyProvider
{

	/**
	 * @return array
	 */
	protected function getProductSetListResultFormatterPlugins()
	{
		return [
			new ProductSetListResultFormatterPlugin(),
		];
	}

	/**
	 * @return array
	 */
	protected function getProductSetListQueryExpanderPlugins()
	{
		return [
			new LocalizedQueryExpanderPlugin(),
			new StoreQueryExpanderPlugin(),
		];
	}

}
```


{% info_block warningBox "Sorting product sets" %}

You can reorder product sets in the Back Office. See [Reordering product sets](https://documentation.spryker.com/docs/managing-product-sets#reordering-product-sets) for more details.

{% endinfo_block %}


<!--
### Next Steps
Integrating the Product Set feature in Yves is completely up to your project’s requirements. The following points summarize how we integrated this feature into our Demoshop:

1. Added controller (`\Pyz\Yves\ProductSet\Controller\ListController`) and template to list Product Sets on a specific URL (provided by `\Pyz\Yves\ProductSet\Plugin\Provider\ProductSetControllerProvider`). This controller uses the predefined `ProductSetClient::getProductSetList()` client method, as described Listing Products Sets in Yves. The URL of the list page was added to the main navigation demo data.
2. To be able to display Product Sets on their own assigned URL, we’ve added a resource creator (`\Pyz\Yves\ProductSet\ResourceCreator\ProductSetResourceCreator`) and added it to the existing resource creator list (`\Pyz\Yves\Collector\CollectorFactory::createResourceCreators()`). This will ensure URL matching and URL generation of Product Sets.
3. Added controller (`\Pyz\Yves\ProductSet\Controller\DetailController`) and template to display Product Set Detail Page on their assigned URLs. The controller receives a hydrated `StorageProductSetTransfer` object and a list of `StorageProductTransfer` objects provided by the resource creator.
4. On the Product Set Detail Page we had to ensure that it’s possible to select variants of the abstract products in the Set. The variant selection logic is part of the resource creating process.
5. We’ve added “Add to cart” buttons per each product and also “Add all to cart” when all variants are selected. To handle adding multiple items to cart at once, we’ve added a custom cart controller action (`\Pyz\Yves\Cart\Controller\CartController::addItemsAction()`).

Check out our [Demoshop](https://github.com/spryker/demoshop) for more detailed examples and ideas regarding the complete Yves integration.
-->
