

{% info_block errorBox %}

The following feature integration guide expects the basic feature to be in place.
This guide only describes the *Product Concrete Search* and *Add to cart from the Catalog page* integration.

{% endinfo_block %}


## Install feature core

Follow the steps below to install the feature core.

### Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
|---|---|---|
| Spryker Core | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)
| Prices | {{page.version}} | [Install the Prices feature](/docs/pbc/all/price-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-prices-feature.html) |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/product:"{{page.version}}" --update-with-dependencies
```
{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                       | EXPECTED DIRECTORY                      |
|------------------------------|-----------------------------------------|
| Product                      | spryker/product                         |
| ProductAttribute             | spryker/product-attribute               |
| ProductAttributeExtension    | spryker/product-attribute-extension     |
| ProductAttributeGui          | spryker/product-attribute-gui           |
| ProductCategoryFilter        | spryker/product-category-filter         |
| ProductCategoryFilterGui     | spryker/product-category-filter-gui     |
| ProductCategoryFilterStorage | spryker/product-category-filter-storage |
| ProductImageStorage          | spryker/product-image-storage           |
| ProductManagement            | spryker/product-management              |
| ProductPageSearch            | spryker/product-page-search             |
| ProductQuantityStorage       | spryker/product-quantity-storage        |
| ProductSearch                | spryker/product-search                  |
| ProductStorage               | spryker/product-storage                 |
| ProductSearchConfigStorage   | spryker/product-search-config-storage   |

{% endinfo_block %}

Apply database changes and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| ProductImageFilter | class | created | src/Generated/Shared/Transfer/ProductImageFilterTransfer |
| ProductConcretePageSearch.images | property | added | src/Generated/Shared/Transfer/ProductConcretePageSearchTransfer |

{% endinfo_block %}

### 2) Add translations

Append glossary according to your configuration:

**src/data/import/glossary.csv**

```yaml
quick-order.input.placeholder,Search by SKU or Name,en_US
quick-order.input.placeholder,Suche per SKU oder Name,de_DE
product_quick_add_widget.form.quantity,"# Qty",en_US
product_quick_add_widget.form.quantity,"# Anzahl",de_DE
quick-order.search.no_results,Item cannot be found,en_US
quick-order.search.no_results,Das produkt konnte nicht gefunden werden.,de_DE
product_search_widget.search.no_results,Products were not found.,en_US
product_search_widget.search.no_results,Products were not found.,de_DE
```

Import data:

```bash
console data:import glossary
```

{% info_block warningBox "Verification" %}

Make sure that the configured data has been added to the `spy_glossary` table in the database.

{% endinfo_block %}

### 3) Configuration

#### Enable multiselect product attributes

Expand available attribute types:

**src/Pyz/Zed/ProductAttribute/ProductAttributeConfig.php**

```php
<?php

namespace Pyz\Zed\ProductAttribute;

use Spryker\Shared\ProductAttribute\ProductAttributeConfig as SharedProductAttributeConfig;
use Spryker\Zed\ProductAttribute\ProductAttributeConfig as SprykerProductAttributeConfig;

class ProductAttributeConfig extends SprykerProductAttributeConfig
{
    /**
     * @return array<string, string>
     */
    public function getAttributeAvailableTypes(): array
    {
        return array_merge(
            parent::getAttributeAvailableTypes(),
            [
                SharedProductAttributeConfig::INPUT_TYPE_MULTISELECT => SharedProductAttributeConfig::INPUT_TYPE_MULTISELECT,
            ],
        );
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that new "mutliselect" input type is available in `https://backoffice.de.b2b-demo-shop.local/product-attribute-gui/attribute/create` attribute creation page.

{% endinfo_block %}

#### Configure export to Redis and Elasticsearch

Add to a cart from the catalog page configuration:

**src/Pyz/Zed/ProductPageSearch/ProductPageSearchConfig.php**

```php
<?php

namespace Pyz\Zed\ProductPageSearch;

use Spryker\Zed\ProductPageSearch\ProductPageSearchConfig as SprykerProductPageSearchConfig;

class ProductPageSearchConfig extends SprykerProductPageSearchConfig
{
    /**
     * @return bool
     */
    public function isProductAbstractAddToCartEnabled(): bool
    {
        return true;
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that abstract products eligible for adding to a cart have the additional `add_to_cart_sku` field in the Elasticsearch document.

{% endinfo_block %}

### 4) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductConcretePageSearchProductImageEventSubscriber | Registers listeners that are responsible for publishing product concrete image entity changes to search when a related entity change event occurs. | None | Spryker\Zed\ProductPageSearch\Communication\Plugin\Event\Subscriber |
| ProductImageProductConcretePageMapExpanderPlugin | Expands the product concrete page map with the images field. | None | Spryker\Zed\ProductPageSearch\Communication\Plugin\PageMapExpander |
| ProductImageProductConcretePageDataExpanderPlugin | Expands product concrete page data with the images data. | None | Spryker\Zed\ProductPageSearch\Communication\Plugin\PageMapExpander |
| ProductConcretePublisherTriggerPlugin | Triggers the concrete products resource to be published. | None | Spryker\Zed\ProductPageSearch\Communication\Plugin\Publisher |
| MultiSelectProductAttributeDataFormatterPlugin | Formats product attributes with input type `multiselect` to array. | None | Spryker\Zed\ProductAttribute\Communication\Plugin\ProductAttribute |

**src/Pyz/Zed/Event/EventDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Event;

use Spryker\Zed\Event\EventDependencyProvider as SprykerEventDependencyProvider;
use Spryker\Zed\ProductPageSearch\Communication\Plugin\Event\Subscriber\ProductConcretePageSearchProductImageEventSubscriber;

class EventDependencyProvider extends SprykerEventDependencyProvider
{
    public function getEventSubscriberCollection()
    {
        $eventSubscriberCollection = parent::getEventSubscriberCollection();
        $eventSubscriberCollection->add(new ProductConcretePageSearchProductImageEventSubscriber());

        return $eventSubscriberCollection;
    }
}
```

**src/Pyz/Zed/ProductPageSearch/ProductPageSearchDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductPageSearch;

use Spryker\Zed\ProductPageSearch\Communication\Plugin\PageDataExpander\ProductImageProductConcretePageDataExpanderPlugin;
use Spryker\Zed\ProductPageSearch\Communication\Plugin\PageMapExpander\ProductImageProductConcretePageMapExpanderPlugin;
use Spryker\Zed\ProductPageSearch\ProductPageSearchDependencyProvider as SprykerProductPageSearchDependencyProvider;

class ProductPageSearchDependencyProvider extends SprykerProductPageSearchDependencyProvider
{
    /**
     * @return \Spryker\Zed\ProductPageSearchExtension\Dependency\Plugin\ProductConcretePageMapExpanderPluginInterface[]
     */
    protected function getConcreteProductPageMapExpanderPlugins(): array
    {
        return [
            new ProductImageProductConcretePageMapExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\ProductPageSearchExtension\Dependency\Plugin\ProductConcretePageDataExpanderPluginInterface[]
     */
    protected function getProductConcretePageDataExpanderPlugins(): array
    {
        return [
            new ProductImageProductConcretePageDataExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/Publisher/PublisherDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\ProductPageSearch\Communication\Plugin\Publisher\CategoryStore\CategoryStoreProductAbstractPageSearchWritePublisherPlugin;
use Spryker\Zed\ProductPageSearch\Communication\Plugin\Publisher\Product\ProductConcretePageSearchWritePublisherPlugin;
use Spryker\Zed\ProductPageSearch\Communication\Plugin\Publisher\ProductConcretePublisherTriggerPlugin;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface>
     */
    protected function getPublisherPlugins(): array
    {
        return [
            new ProductConcretePublisherTriggerPlugin(),
            new CategoryStoreProductAbstractPageSearchWritePublisherPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Ensure the following:
1. After executing the `console sync:data product_concrete` command, product data, including images, is synced to Elasticsearch product concrete documents.
2. When a product or its images, updated by Zed UI product data including images, is synced in respective Elasticsearch product concrete documents.

| STORAGE TYPE | TARGET ENTITY | EXAMPLE EXPECTED DATA IDENTIFIER |
| --- | --- | --- |
| Elasticsearch | ProductConcrete | product_concrete:de:de_de:1 |

**Expected data fragment example**

```yaml
{
   "store":"DE",
   "locale":"de_DE",
   "type":"product_concrete",
   "is-active":true,
   "search-result-data":{
      "id_product":1,
      "fkProductAbstract":2,
      "abstractSku":"222",
      "sku":"222_111",
      "type":"product_concrete",
      "name":"HP 200 280 G1",
      "images":[
         {
            "idProductImage":1,
            "idProductImageSetToProductImage":1,
            "sortOrder":0,
            "externalUrlSmall":"//images.icecat.biz/img/gallery_mediums/img_29406823_medium_1480596185_822_26035.jpg",
            "externalUrlLarge":"//images.icecat.biz/img/gallery_raw/29406823_8847.png"
         }
      ]
   },
   "full-text-boosted":[
      "HP 200 280 G1",
      "222_111"
   ],
   "suggestion-terms":[
      "HP 200 280 G1",
      "222_111"
   ],
   "completion-terms":[
      "HP 200 280 G1",
      "222_111"
   ],
   "string-sort":{
      "name":"HP 200 280 G1"
   }
}
```
{% endinfo_block %}

**src/Pyz/Zed/ProductAttribute/ProductAttributeDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductAttribute;

use Spryker\Zed\ProductAttribute\Communication\Plugin\ProductAttribute\MultiSelectProductAttributeDataFormatterPlugin;
use Spryker\Zed\ProductAttribute\ProductAttributeDependencyProvider as SprykerProductAttributeDependencyProvider;

class ProductAttributeDependencyProvider extends SprykerProductAttributeDependencyProvider
{
    /**
     * @return list<\Spryker\Zed\ProductAttributeExtension\Dependency\Plugin\ProductAttributeDataFormatterPluginInterface>
     */
    protected function getProductAttributeDataFormatterPlugins(): array
    {
        return [
            new MultiSelectProductAttributeDataFormatterPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that you can manage "multiselect" product attribute at `https://zed.de.demo-spryker.com/product-attribute-gui/view/product-abstract?id-product-abstract={id-product-abstract}}`.

{% endinfo_block %}

## Install feature frontend

Follow the steps below to install the Product feature frontend.

### Prerequisites

Install the required features:

| NANE | VERSION | INSTALLATION GUIDE|
| --- | --- | --- |
| Spryker Core | {{page.version}} | [Install the Spryker Core feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-spryker-core-feature.html)

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker-feature/product:"{{page.version}}" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| ProductSearchWidget | spryker-shop/product-search-widget |
| ProductSearchWidgetExtension | vendor/spryker-shop/product-search-widget-extension |

{% endinfo_block %}

### 2) Set up widgets

To enable widgets, register the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductConcreteSearchWidget | Allows customers to search for concrete products on the Cart page. | None | SprykerShop\Yves\ProductSearchWidget\Widget |
| ProductConcreteSearchWidget | Incorporates `ProductConcreteSearchWidget` and lets customers search for concrete products and quickly add them to the cart with the desired quantity. | None | SprykerShop\Yves\ProductSearchWidget\Widget |
| ProductConcreteSearchGridWidget | Enables the output list of concrete products from search filtered by criteira. | None | SprykerShop\Yves\ProductSearchWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\ProductSearchWidget\Widget\ProductConcreteAddWidget;
use SprykerShop\Yves\ProductSearchWidget\Widget\ProductConcreteSearchWidget;
use SprykerShop\Yves\ProductSearchWidget\Widget\ProductConcreteSearchGridWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return list<string>
     */
    protected function getGlobalWidgets(): array
    {
        return [
            ProductConcreteSearchWidget::class,
            ProductConcreteAddWidget::class,
            ProductConcreteSearchGridWidget::class,
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure the following widgets have been registered:

| MODULE | TEST |
| --- | --- |
| ProductConcreteSearchWidget | Go to the **Cart** page and make sure the **Quick add to Cart** section is present, so you can search for concrete products by typing their SKU. |
| ProductConcreteAddWidget | Go to the **Cart** page and make sure the **Quick add to Cart** section is present, so you can add the found products to the cart with the desired Quantity. |
| ProductConcreteSearchGridWidget | Can be checked on the slot edit page of Configurator. |

{% endinfo_block %}
