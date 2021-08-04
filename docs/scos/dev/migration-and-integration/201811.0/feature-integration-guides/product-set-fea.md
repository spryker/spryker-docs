---
title: Product Set Feature Integration
originalLink: https://documentation.spryker.com/v1/docs/product-set-feature-integration
redirect_from:
  - /v1/docs/product-set-feature-integration
  - /v1/docs/en/product-set-feature-integration
---

The Product Sets feature allows you to put together multiple products for the purpose to emphasize that the set of products can be bought together. Product Sets usually have their separate list and detail pages in the shop frontend where customers can add containing products to the cart.

## Prerequisites
To prepare your project to work with Product Sets:
1. Require the Product Set modules in your `composer.json` by running: 

```bash
composer require spryker/product-set spryker/product-set-collector spryker/product-set-gui
```
2. Install the new database tables by running:

```bash
vendor/bin/console propel:diff
```
Propel should generate a migration file with the changes.

3. Apply the database changes. For this, run: 

```bash
vendor/bin/console propel:migrate
```
4. To generate ORM models, run: 

```bash
vendor/bin/console propel:model:build
```

5. After running this command, new classes are added. 

The classes are located in your project under the `\Orm\Zed\ProductSet\Persistence` namespace. 

<section contenteditable="false" class="warningBox"><div class="content">
    
**Verification**
Make sure that they extend the base classes from the Spryker core, for example:

* `\Orm\Zed\ProductSet\Persistence\SpyProductSet` extends `\Spryker\Zed\ProductSet\Persistence\Propel\AbstractSpyProductSet`

* `\Orm\Zed\ProductSet\Persistence\SpyProductSetData` extends `\Spryker\Zed\ProductSet\Persistence\Propel\AbstractSpyProductSetData`

* `\Orm\Zed\ProductSet\Persistence\SpyProductAbstractSet` extends `\Spryker\Zed\ProductSet\Persistence\Propel\AbstractSpyProductAbstractSet`

* `\Orm\Zed\ProductSet\Persistence\SpyProductSetQuery` extends `\Spryker\Zed\ProductSet\Persistence\Propel\AbstractSpyProductSetQuery`

* `\Orm\Zed\ProductSet\Persistence\SpyProductSetDataQuery` extends `\Spryker\Zed\ProductSet\Persistence\Propel\AbstractSpyProductSetDataQuery`

* `\Orm\Zed\ProductSet\Persistence\SpyProductAbstractSetQuery` extends `\Spryker\Zed\ProductSet\Persistence\Propel\AbstractSpyProductAbstractSetQuery`
</div></section>

6. To get the new transfer objects, run the following command:

```bash
vendor/bin/console transfer:generat
```

7. To rebuild Zed navigation, run the following command:

```bash
vendor/bin/console navigation:build-cache
```

8. Activate the Product Set collectors:

Adding `ProductSetCollectorStoragePlugin` to the storage collector plugin stack and `ProductSetCollectorSearchPlugin` to the search collector plugin stack, see the example below.

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

		$container[self::SEARCH_PLUGINS] = function (Container $container) {
			return [
				// ...
				ProductSetConfig::RESOURCE_TYPE_PRODUCT_SET => new ProductSetCollectorSearchPlugin(),
			];
		};
       
		$container[self::STORAGE_PLUGINS] = function (Container $container) {
			return [
				// ...
				ProductSetConfig::RESOURCE_TYPE_PRODUCT_SET => new ProductSetCollectorStoragePlugin(),
			];
		};
        
		// ...
	}
}
```

## Data Setup

You should now be able to use the `ProductSet` module Zed API to manage Product Sets, and the collectors should also be able to export them to the KV storage and Elasticsearch. In Zed you can also manage Product Sets under Products > Product Sets menu point.

This is a good time to implement an installer in your project to put products together in sets representing how you want them to be displayed in your shop frontend. Check out our [Demoshop](https://github.com/spryker/demoshop) implementation for examples and ideas.

### Listing Products Sets in Yves
The KV storage and Elasticsearch should by now have some Product Sets you can list and display in your shop. The exported documents in Search by default do not support the configurable search features as products (full-text search, faceted navigation, sorting, and pagination). However, since their data structure is the same it is possible to implement the same features with a custom implementation.

For simple listing the `ProductSet` module provides a Client API to list Product Sets from Elasticsearch. By calling the `ProductSetClient::getProductSetList()` method, a limited set of documents can be listed in Yves. The results are sorted in descending order by the Product Set’s weight attribute.

The executed search query works the same way as described in Search Query. 
If you need to extend the query, for example, by filtering current store and locale, you will need to add the necessary query expander plugins, like in the example below. Also, to format the raw response from Elasticsearch we also need to provide a result formatter plugin that is also provided by the `ProductSet` module. 

Take a look at the following example to see how to activate the plugins:

```php
<?php

namespace Pyz\Client\ProductSet;

use Spryker\Client\ProductSet\Plugin\Elasticsearch\ResultFormatter\ProductSetListResultFormatterPlugin;
use Spryker\Client\ProductSet\ProductSetDependencyProvider as SprykerProductSetDependencyProvider;
use Spryker\Client\Search\Plugin\Elasticsearch\QueryExpander\LocalizedQueryExpanderPlugin;
use Spryker\Client\Search\Plugin\Elasticsearch\QueryExpander\StoreQueryExpanderPlugin;

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

{% info_block warningBox "Sorting Product Sets" %}
There's a Zed UI to be able to sort Product Sets easily compared to each other under the Reorder Product Sets.

<!--
### Next Steps
Integrating the Product Set feature in Yves is completely up to your project’s requirements. The following points summarize how we integrated this feature into our Demoshop:

1. Added controller (`\Pyz\Yves\ProductSet\Controller\ListController`
{% endinfo_block %} and template to list Product Sets on a specific URL (provided by `\Pyz\Yves\ProductSet\Plugin\Provider\ProductSetControllerProvider`). This controller uses the predefined `ProductSetClient::getProductSetList()` client method, as described Listing Products Sets in Yves. The URL of the list page was added to the main navigation demo data.
2. To be able to display Product Sets on their own assigned URL, we’ve added a resource creator (`\Pyz\Yves\ProductSet\ResourceCreator\ProductSetResourceCreator`) and added it to the existing resource creator list (`\Pyz\Yves\Collector\CollectorFactory::createResourceCreators()`). This will ensure URL matching and URL generation of Product Sets.
3. Added controller (`\Pyz\Yves\ProductSet\Controller\DetailController`) and template to display Product Set Detail Page on their assigned URLs. The controller receives a hydrated `StorageProductSetTransfer` object and a list of `StorageProductTransfer` objects provided by the resource creator.
4. On the Product Set Detail Page we had to ensure that it’s possible to select variants of the abstract products in the Set. The variant selection logic is part of the resource creating process.
5. We’ve added “Add to cart” buttons per each product and also “Add all to cart” when all variants are selected. To handle adding multiple items to cart at once, we’ve added a custom cart controller action (`\Pyz\Yves\Cart\Controller\CartController::addItemsAction()`).

Check out our [Demoshop](https://github.com/spryker/demoshop) for more detailed examples and ideas regarding the complete Yves integration.
-->
