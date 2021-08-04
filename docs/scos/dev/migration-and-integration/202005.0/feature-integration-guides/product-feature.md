---
title: Product Feature Integration
originalLink: https://documentation.spryker.com/v5/docs/product-feature-integration
redirect_from:
  - /v5/docs/product-feature-integration
  - /v5/docs/en/product-feature-integration
---

{% info_block errorBox "Attention!" %}
 The following Feature Integration guide expects the basic feature to be in place.
{% endinfo_block %}

## Install Feature Core

### Prerequisites

Please overview and install the necessary features before beginning the integration step.

| Name | Version |
|---|---|
| Spryker Core | master|
| Prices | master |

### 1) Install the Required Modules Using Composer

Run the following command to install the required modules:

```shell
composer require spryker-feature/product: "^master" --update-with-dependencies 
```
{% info_block warningBox "Verification" %}

Make sure that the following module is installed:

| Module | Expected Directory |
| --- | --- |
| `Product` | `spryker/product` |
| `ProductAttribute` | `spryker/product-attribute` |
| `ProductAttributeGui` | `spryker/product-attribute-gui` |
| `ProductCategoryFilterGui	` | `spryker/product-category-filter-gui` |
| `ProductImageStorage` | `spryker/product-image-storage` |
| `ProductManagement` | `spryker/product-management` |
| `ProductPageSearch` | `spryker/product-page-search` |
| `ProductQuantityStorage` | `spryker/product-quantity-storage` |
| `ProductSearch` | `spryker/product-search` |
| `ProductStorage` | `spryker/product-storage` |
| `ProductSearchConfigStorage` | `spryker/product-search-config-storage` |

{% endinfo_block %}

Run the following commands to apply database changes and generate entity and transfer changes:
```bash
console transfer:generate
console propel:install
console transfer:generate
```
{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects:

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| `ProductImageFilter` | class | created | `src/Generated/Shared/Transfer/ProductImageFilterTransfer` |
| `ProductConcretePageSearch.images` | property | added | `src/Generated/Shared/Transfer/ProductConcretePageSearchTransfer` |

{% endinfo_block %}
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

Run the following console command to import data:
```bash
console data:import glossar
```
{% info_block warningBox "Verification" %}

Make sure that the configured data are added to the `spy_glossary` table in the database.

{% endinfo_block %}

### 2) Set up Search
Add expander plugins for the *product concrete* entity.

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ProductImageProductConcretePageMapExpanderPlugin` | Expands product concrete page map with images field. | None | `Spryker\Zed\ProductPageSearch\Communication\Plugin\PageMapExpander` |
| `ProductImageProductConcretePageDataExpanderPlugin` | Expands product concrete page data with images data. | None | `Spryker\Zed\ProductPageSearch\Communication\Plugin\PageDataExpander` |

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

If you are using Elasticsearch pagination plugins, you'll also need to update `CatalogConfig` to have a hack for the `ProductConcreteSearchGridWidget` since it does not support pagination yet.

That's safe and won't affect any other feature behavior except mentioned widget.

**src/Pyz/Client/Catalog/CatalogConfig.php**

```php
<?php
 
namespace Pyz\Client\Catalog;
 
use Spryker\Client\Catalog\CatalogConfig as SprykerCatalogConfig;
 
class CatalogConfig extends SprykerCatalogConfig
{
    protected const PAGINATION_VALID_ITEMS_PER_PAGE = [
        //...
        1000,
    ];
}
```

### 3) Configure Export to Redis and Elasticsearch
#### Set up Event Listeners


| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ProductConcretePageSearchProductImageEventSubscriber` | Registers listeners that are responsible for publishing product concrete image entity changes to search when a related entity change event occurs. | None | `Spryker\Zed\ProductPageSearch\Communication\Plugin\Event\Subscriber` |

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

{% info_block warningBox "Verification" %}

1. Make sure that after `console sync:data product_concrete` command execution product data including images is synced to Elasticsearch product concrete documents. 
2. Also check that when product or its images updated via Zed UI, product data including images is synced at respective Elasticsearch product concrete documents.

| Storage Type | Target Entity | Example Expected Data Identifier |
| --- | --- | --- |
| Elasticsearch | `ProductConcrete` | `product_concrete:de:de_de:1` |

**Example expected data fragment for Elasticsearch**

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

## Install Feature Frontend
### Prerequisites
Overview and install the necessary features before beginning the integration step.

| Name | Version |
| --- | --- |
| Spryker Core | master |

### 1) Install the Required Modules Using Composer
Run the following command to install the required modules:
```bash
composer require spryker-feature/product: "^master" --update-with-dependencies
```
{% info_block warningBox "Verification" %}

Make sure that the following modules are installed:

| Module | Expected Directory |
| --- | --- |
| `ProductSearchWidget` | `spryker-shop/product-search-widget` |

{% endinfo_block %}
### 2) Set up Widgets
Register the following plugins to enable widgets:

| Plugin | Description | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ProductConcreteSearchWidget` | Allows customers to search for concrete products on the Cart page. | None | `SprykerShop\Yves\ProductSearchWidget\Widget` |
| `ProductConcreteSearchWidget` | Incorporates `ProductConcreteSearchWidget` and allows customers to search for concrete products and quickly add them to the Cart with the desired quantity. | None | `SprykerShop\Yves\ProductSearchWidget\Widget` |
| `ProductConcreteSearchGridWidget` | Allows to output list of concrete products from search filtered by criteira. | None | `SprykerShop\Yves\ProductSearchWidget\Widget` |

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
     * @return string[]
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

Make sure that the following widgets are registered:

| Module | Test |
| --- | --- |
| `ProductConcreteSearchWidget` | Go to the Cart page and make sure the "Quick add to Cart" section is present, so you can search for concrete products by typing their SKU. |
| `ProductConcreteAddWidget` | Go to the Cart page and make sure the "Quick add to Cart" section is present, so you can add the found products to the Cart with the desired Quantity. |
| `ProductConcreteSearchGridWidget` | Could be checked on slot edit page of Configurator. |

{% endinfo_block %}
