

This document describes how to install the [Product Sets feature](/docs/pbc/all/content-management-system/latest/base-shop/product-sets-feature-overview.html).

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
- New classes have been added to `\Orm\Zed\ProductSet\Persistence`.
- They extend the base classes from the Spryker core. For example:

  - `\Orm\Zed\ProductSet\Persistence\SpyProductSet` extends `\Spryker\Zed\ProductSet\Persistence\Propel\AbstractSpyProductSet`

  - `\Orm\Zed\ProductSet\Persistence\SpyProductSetData` extends `\Spryker\Zed\ProductSet\Persistence\Propel\AbstractSpyProductSetData`

  - `\Orm\Zed\ProductSet\Persistence\SpyProductAbstractSet` extends `\Spryker\Zed\ProductSet\Persistence\Propel\AbstractSpyProductAbstractSet`

  - `\Orm\Zed\ProductSet\Persistence\SpyProductSetQuery` extends `\Spryker\Zed\ProductSet\Persistence\Propel\AbstractSpyProductSetQuery`

  - `\Orm\Zed\ProductSet\Persistence\SpyProductSetDataQuery` extends `\Spryker\Zed\ProductSet\Persistence\Propel\AbstractSpyProductSetDataQuery`

  - `\Orm\Zed\ProductSet\Persistence\SpyProductAbstractSetQuery` extends `\Spryker\Zed\ProductSet\Persistence\Propel\AbstractSpyProductAbstractSetQuery`

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

The KV storage and Elasticsearch should by now contain some product sets you can display on the Storefront. By default, the exported documents in Search do not support the configurable search features as products: full-text search, faceted navigation, sorting, and pagination. However, since their data structure is the same, it's possible to implement the same features with a custom implementation.

For a simple listing, the `ProductSet` module provides a Client API to list product sets from Elasticsearch. By calling the `ProductSetClient::getProductSetList()` method, a limited set of documents can be listed on the Storefront. The results are sorted in descending order based on the product sets' weight attributes.

The executed search query works the same way as described in Search Query.
If you need to extend the query, for example, by filtering current store and locale, add the desired query expander plugins, like in the example below. To format a raw response from Elasticsearch, provide a result formatter plugin that is also provided by the `ProductSet` module.

```php
<?php

namespace Pyz\Client\ProductSet;

use Spryker\Client\ProductSet\Plugin\Elasticsearch\ResultFormatter\ProductSetListResultFormatterPlugin;
use Spryker\Client\ProductSet\ProductSetDependencyProvider as SprykerProductSetDependencyProvider;
use Spryker\Client\SearchElasticsearch\Plugin\QueryExpander\LocalizedQueryExpanderPlugin;

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
		];
	}

}
```


{% info_block warningBox "Sorting product sets" %}

You can reorder product sets in the Back Office. See [Reorder product sets](/docs/pbc/all/content-management-system/latest/base-shop/manage-in-the-back-office/product-sets/reorder-product-sets.html) for more details.

{% endinfo_block %}


<!--### Next Steps
Integrating the Product Set feature in Yves is completely up to your project's requirements. The following points summarize how we integrated this feature into our Demoshop:

1. Added controller (`\Pyz\Yves\ProductSet\Controller\ListController`) and template to list Product Sets on a specific URL (provided by `\Pyz\Yves\ProductSet\Plugin\Provider\ProductSetControllerProvider`). This controller uses the predefined `ProductSetClient::getProductSetList()` client method, as described Listing Products Sets in Yves. The URL of the list page was added to the main navigation demo data.
2. To be able to display Product Sets on their own assigned URL, we've added a resource creator (`\Pyz\Yves\ProductSet\ResourceCreator\ProductSetResourceCreator`) and added it to the existing resource creator list (`\Pyz\Yves\Collector\CollectorFactory::createResourceCreators()`). This will ensure URL matching and URL generation of Product Sets.
3. Added controller (`\Pyz\Yves\ProductSet\Controller\DetailController`) and template to display Product Set Detail Page on their assigned URLs. The controller receives a hydrated `StorageProductSetTransfer` object and a list of `StorageProductTransfer` objects provided by the resource creator.
4. On the Product Set Detail Page we had to ensure that it's possible to select variants of the abstract products in the Set. The variant selection logic is part of the resource creating process.
5. We've added **Add to cart** buttons per each product and also **Add all to cart** when all variants are selected. To handle adding multiple items to cart at once, we've added a custom cart controller action (`\Pyz\Yves\Cart\Controller\CartController::addItemsAction()`).

Check out our [Demoshop](https://github.com/spryker/demoshop) for more detailed examples and ideas regarding the complete Yves integration.-->

## Enable the text alternatives functionality

The Text Alternatives functionality lets you add alternative text to product images for better accessibility and SEO.

### 1) Upgrade modules

Upgrade the following modules to the specified versions or higher

| NAME                               | VERSION   |
|------------------------------------|-----------|
| spryker/product-image              | 3.20.0    |
| spryker/product-set-gui            | 2.13.0    |
| spryker/product-set-page-search    | 1.13.0    |
| spryker/product-set-storage        | 1.13.0    |
| spryker/glossary                   | 3.16.0    |
| spryker/glossary-storage           | 1.5.0     |
| spryker-shop/product-set-list-page | 1.2.0     |
| spryker-shop/product-set-widget    | 1.10.0    |
| spryker-shop/shop-ui               | 1.96.0    |

```bash
composer require spryker/glossary:^3.16.0 spryker/glossary-storage:^1.5.0 spryker/product-image:^3.20.0 spryker/product-set-gui:^2.13.0 spryker/product-set-page-search:^1.13.0 spryker/product-set-storage:^1.13.0 spryker-shop/product-set-list-page:^1.2.0 spryker-shop/product-set-widget:^1.10.0 spryker-shop/shop-ui:^1.96.0 --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE               | EXPECTED DIRECTORY                        |
|----------------------|-------------------------------------------|
| ProductImage         | vendor/spryker/spryker/product-image      |
| ProductSetGui        | vendor/spryker/product-set-gui            |
| ProductSetPageSearch | vendor/spryker/product-set-page-search    |
| ProductSetStorage    | vendor/spryker/product-set-storage        |
| Glossary             | vendor/spryker/glossary                   |
| GlossaryStorage      | vendor/spryker/glossary-storage           |
| ProductSetListPage   | vendor/spryker-shop/product-set-list-page |
| ProductSetWidget     | vendor/spryker-shop/product-set-widget    |
| ShopUi               | vendor/spryker-shop/shop-ui               |

{% endinfo_block %}

### 2) Enable the feature in the ProductImage module configuration

**src/Pyz/Shared/ProductImage/ProductImageConfig.php**

```php
<?php
declare(strict_types = 1);

namespace Pyz\Shared\ProductImage;

use Spryker\Shared\ProductImage\ProductImageConfig as SprykerProductImageConfig;

class ProductImageConfig extends SprykerProductImageConfig
{
    /**
     * @return bool
     */
    public function isProductImageAlternativeTextEnabled(): bool
    {
        return true;
    }
}

```

### 3) Set up database schema and transfer objects

1. Apply database changes and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied by checking your database:

| DATABASE ENTITY                   | TYPE  | EVENT   |
|-----------------------------------|-------|---------|
| spy_product_image.alt_text_small  | field | created |
| spy_product_image.alt_text_large  | field | created |

Make sure the following changes have been applied in transfer objects:

| TRANSFER                          | TYPE     | EVENT   | PATH                                                          |
|-----------------------------------|----------|---------|---------------------------------------------------------------|
| ProductImage.altTextSmall         | property | created | src/Generated/Shared/Transfer/ProductImageTransfer            |
| ProductImage.altTextLarge         | property | created | src/Generated/Shared/Transfer/ProductImageTransfer            |
| ProductImage.translations         | property | created | src/Generated/Shared/Transfer/ProductImageTransfer            |
| ProductImageTranslation           | class    | created | src/Generated/Shared/Transfer/ProductImageTranslationTransfer |
| StorageProductImage.altTextSmall  | property | created | src/Generated/Shared/Transfer/StorageProductImageTransfer     |
| StorageProductImage.altTextLarge  | property | created | src/Generated/Shared/Transfer/StorageProductImageTransfer     |

{% endinfo_block %}

### 4) Import text alternatives data

1. Add text alternatives data for product set images by adding new fields to the data import file, using the following example:

**data/import/common/AT/combined_product.csv**

```csv
alt_text.image_small.1.1.de_DE,alt_text.image_small.1.1.en_US,alt_text.image_large.1.1.de_DE,alt_text.image_large.1.1.en_US
"Details ansehen: Samsung Gear S2","View details of Samsung Gear S2","Back view of Samsung Gear S2 Black","Rückansicht von Samsung Gear S2 Black"
```

New fields are `alt_text_small` and `alt_text_large` with the image number and the locale name as a suffix.

2. Apply the changes to the data import business logic:

Here is an example of how to extend the data import business logic for product images to handle the new fields: [https://github.com/spryker-shop/b2c-demo-shop/pull/781/files](https://github.com/spryker-shop/b2c-demo-shop/pull/781/files)

3. Import data:

```bash
console data:import --config=data/import/local/full_EU.yml product-set
```
