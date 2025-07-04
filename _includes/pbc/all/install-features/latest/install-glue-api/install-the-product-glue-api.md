

This document describes how to install the Products Glue API.


## Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
| --- | --- | --- |
| Spryker Core | 202507.0 | [Install the Spryker Core Glue API](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html) |
| Product | 202507.0 |  |
| Price | 202507.0 |  |


## 1) Install the required modules

Install the required modules using composer:

```bash
composer require spryker/products-rest-api:"^2.11.0" spryker/product-image-sets-rest-api:"^1.0.3" spryker/product-prices-rest-api:"^1.1.0" spryker/product-tax-sets-rest-api:"^2.1.2" spryker/products-categories-resource-relationship:"^1.0.0" spryker/product-attributes-rest-api:"^1.1.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| ProductsRestApi | vendor/spryker/products-rest-api |
| ProductImageSetsRestApi | vendor/spryker/product-image-sets-rest-api |
| ProductPricesRestApi | vendor/spryker/product-prices-rest-api |
| ProductTaxSetsRestApi | vendor/spryker/product-tax-sets-rest-api |
| ProductsCategoriesResourceRelationship | vendor/spryker/products-categories-resource-relationship |
| ProductAttributesRestApi |vendor/spryker/product-attributes-rest-api|

{% endinfo_block %}

## 2) Set up configuration

{% info_block infoBox %}

You can control whether the `abstract-products` get the `concrete-products` as a relationship by default with the `ProductsRestApiConfig::ALLOW_PRODUCT_CONCRETE_EAGER_RELATIONSHIP` config setting.

{% endinfo_block %}

**src/Pyz/Glue/ProductsRestApi/ProductsRestApiConfig.php**

```php
<?php

namespace Pyz\Glue\ProductsRestApi;

use Spryker\Glue\ProductsRestApi\ProductsRestApiConfig as SprykerProductsRestApiConfig;

class ProductsRestApiConfig extends SprykerProductsRestApiConfig
{
    public const ALLOW_PRODUCT_CONCRETE_EAGER_RELATIONSHIP = false;
}
```

{% info_block errorBox %}

We recommend setting `ALLOW_PRODUCT_CONCRETE_EAGER_RELATIONSHIP` to `false`.  

Using `ALLOW_PRODUCT_CONCRETE_EAGER_RELATIONSHIP = true` in combination with `ConcreteProductsByProductConcreteIdsResourceRelationshipPlugin`, which is described later in this document, results in duplicated relationships.

We also recommend using `ConcreteProductsByProductConcreteIdsResourceRelationshipPlugin` with `ALLOW_PRODUCT_CONCRETE_EAGER_RELATIONSHIP = false`. The config setting exists for backward-compatibility reasons only.

{% endinfo_block %}


## 3) Set up database schema and transfer objects

Update the database and generate entity and transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Ensure that the following changes have occurred in transfer objects:

| TRANSFER                                                 | TYPE   | EVENT    | PATH                                                                                           |
|----------------------------------------------------------|--------|----------|------------------------------------------------------------------------------------------------|
| AbstractProductsRestAttributes                           | class  | created  | src/Generated/Shared/Transfer/AbstractProductsRestAttributesTransfer                           |
| ConcreteProductsRestAttributes                           | class  | created  | src/Generated/Shared/Transfer/ConcreteProductsRestAttributesTransfer                           |
| RestProductImageSetsAttributes                           | class  | created  | src/Generated/Shared/Transfer/RestProductImageSetsAttributesTransfer                           |
| RestProductImageSet                                      | class  | created  | src/Generated/Shared/Transfer/RestProductImageSetTransfer                                      |
| RestImagesAttributes                                     | class  | created  | src/Generated/Shared/Transfer/RestImagesAttributesTransfer                                     |
| RestProductPriceAttributes                               | class  | created  | src/Generated/Shared/Transfer/RestProductPriceAttributesTransfer                               |
| RestProductPricesAttributes                              | class  | created  | src/Generated/Shared/Transfer/RestProductPricesAttributesTransfer                              |
| RestCurrency                                             | class  | created  | src/Generated/Shared/Transfer/RestCurrencyTransfer                                             |
| RestProductManagementAttributeAttributes                 | class  | created  | src/Generated/Shared/Transfer/RestProductManagementAttributeAttributesTransfer                 |
| RestLocalizedProductManagementAttributeKeyAttributes     | class  | created  | src/Generated/Shared/Transfer/RestLocalizedProductManagementAttributeKeyAttributesTransfer     |
| RestProductManagementAttributeValueAttributes            | class  | created  | src/Generated/Shared/Transfer/RestProductManagementAttributeValueAttributesTransfer            |
| RestProductManagementAttributeValueTranslationAttributes | class  | created  | src/Generated/Shared/Transfer/RestProductManagementAttributeValueTranslationAttributesTransfer |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Ensure that `SpyProductAbstractStorage` and `SpyProductConcreteStorage` are extended with the synchronization behavior of the following methods:

| ENTITY | TYPE | EVENT | PATH | METHODS |
| --- | --- | --- | --- | --- |
| SpyProductAbstractStorage | class | extended | src/Orm/Zed/ProductStorage/Persistence/Base/SpyProductAbstractStorage | `syncPublishedMessageForMappings()`, `syncUnpublishedMessageForMappings()` |
|SpyProductConcreteStorage |class |extended |src/Orm/Zed/ProductStorage/Persistence/Base/SpyProductConcreteStorage |`syncPublishedMessageForMappings()`, `syncUnpublishedMessageForMappings()`|

{% endinfo_block %}


## 4) Set up behavior

Set up the following behaviors.

### Reexport data to storage

Reload the abstract and concrete product data into the Storage:

```bash
console publish:trigger-events -r product_abstract
console publish:trigger-events -r product_concrete
```

{% info_block warningBox "Verification" %}

Ensure that the following Redis keys exist, and there is data in them:

- `kv:product_abstract:{% raw %}{{{% endraw %}store_name{% raw %}}}{% endraw %}:{% raw %}{{{% endraw %}locale_name{% raw %}}}{% endraw %}:sku:{% raw %}{{{% endraw %}sku_product_abstract{% raw %}}}{% endraw %}`

- `kv:product_concrete:{% raw %}{{{% endraw %}locale_name{% raw %}}}{% endraw %}:sku:{% raw %}{{{% endraw %}sku_product_concrete{% raw %}}}{% endraw %}`

{% endinfo_block %}

### Enable resources

Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| AbstractProductsResourceRoutePlugin | Registers the `abstract-products` resource. |  | Spryker\Glue\ProductsRestApi\Plugin |
| ConcreteProductsResourceRoutePlugin| Registers the `concrete-products` resource. | |Spryker\Glue\ProductsRestApi\Plugin |


**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\ProductsRestApi\Plugin\AbstractProductsResourceRoutePlugin;
use Spryker\Glue\ProductsRestApi\Plugin\ConcreteProductsResourceRoutePlugin;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return list<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface>
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            new AbstractProductsResourceRoutePlugin(),
            new ConcreteProductsResourceRoutePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Ensure that the following endpoints are available:

- `https://glue.mysprykershop.com/abstract-products/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}`

- `https://glue.mysprykershop.com/concrete-products/{% raw %}{{{% endraw %}concrete_sku{% raw %}}}{% endraw %}`

{% endinfo_block %}

### Enable relationships

Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ConcreteProductsByProductConcreteIdsResourceRelationshipPlugin | Adds the `concrete-products` resource as a relationship to the `abstract-products` resource. |  | Spryker\Glue\ProductsRestApi\Plugin\GlueApplication |
|ProductAbstractByProductAbstractSkuResourceRelationshipPlugin |Adds the `abstract-products` resource as a relationship to the `concrete-products` resource. || Spryker\Glue\ProductsRestApi\Plugin\GlueApplication|

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\ProductsRestApi\Plugin\GlueApplication\ConcreteProductsByProductConcreteIdsResourceRelationshipPlugin;
use Spryker\Glue\ProductsRestApi\Plugin\GlueApplication\ProductAbstractByProductAbstractSkuResourceRelationshipPlugin;
use Spryker\Glue\ProductsRestApi\ProductsRestApiConfig;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @param \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface $resourceRelationshipCollection
     *
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface
     */
    protected function getResourceRelationshipPlugins(
        ResourceRelationshipCollectionInterface $resourceRelationshipCollection
    ): ResourceRelationshipCollectionInterface {
        $resourceRelationshipCollection->addRelationship(
            ProductsRestApiConfig::RESOURCE_ABSTRACT_PRODUCTS,
            new ConcreteProductsByProductConcreteIdsResourceRelationshipPlugin()
        );
        $resourceRelationshipCollection->addRelationship(
            ProductsRestApiConfig::RESOURCE_CONCRETE_PRODUCTS,
            new ProductAbstractByProductAbstractSkuResourceRelationshipPlugin()
        );

        return $resourceRelationshipCollection;
    }
}
```

{% info_block warningBox "Verification" %}

Make sure the following applies:

- The following endpoints are available:
  - `https://glue.mysprykershop.com/abstract-products/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}`
  - `https://glue.mysprykershop.com/concrete-products/{% raw %}{{{% endraw %}concrete_sku{% raw %}}}{% endraw %}`  

- When the `concrete-products` resource is included as a query string, the `abstract-products` resource returns it as a relationship: `https://glue.mysprykershop.com/abstract-products/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}?include=concrete-products`.
- When the `abstract-products` resource is included as a query string, the `concrete-products` resource returns it as a relationship: `https://glue.mysprykershop.com/concrete-products/{% raw %}{{{% endraw %}concrete_sku{% raw %}}}{% endraw %}?include=abstract-products`.

{% endinfo_block %}

### Enable resources and relationships of image sets

Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| AbstractProductImageSetsRoutePlugin | Registers the `abstract-product-image-sets` resource. |  | Spryker\Glue\ProductImageSetsRestApi\Plugin |
|ConcreteProductImageSetsRoutePlugin |Registers the `concrete-product-image-sets` resource. || Spryker\Glue\ProductImageSetsRestApi\Plugin |
| AbstractProductsProductImageSetsResourceRelationshipPlugin |Adds the `abstract-product-image-sets` resource as a relationship to the `abstract-products` resource. | | Spryker\Glue\ProductImageSetsRestApi\Plugin\Relationship|
|ConcreteProductsProductImageSetsResourceRelationshipPlugin |Adds the `concrete-product-image-sets` resource as a relationship to the `concrete-products` resource. | |Spryker\Glue\ProductImageSetsRestApi\Plugin\Relationship|


<details>
<summary markdown='span'>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\ProductImageSetsRestApi\Plugin\AbstractProductImageSetsRoutePlugin;
use Spryker\Glue\ProductImageSetsRestApi\Plugin\ConcreteProductImageSetsRoutePlugin;
use Spryker\Glue\ProductImageSetsRestApi\Plugin\Relationship\AbstractProductsProductImageSetsResourceRelationshipPlugin;
use Spryker\Glue\ProductImageSetsRestApi\Plugin\Relationship\ConcreteProductsProductImageSetsResourceRelationshipPlugin;
use Spryker\Glue\ProductsRestApi\ProductsRestApiConfig;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return list<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface>
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            new AbstractProductImageSetsRoutePlugin(),
            new ConcreteProductImageSetsRoutePlugin(),
        ];
    }

 	/**
    * @param \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface $resourceRelationshipCollection
    *
    * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface
    */
    protected function getResourceRelationshipPlugins(
        ResourceRelationshipCollectionInterface $resourceRelationshipCollection
    ): ResourceRelationshipCollectionInterface {
        $resourceRelationshipCollection->addRelationship(
            ProductsRestApiConfig::RESOURCE_ABSTRACT_PRODUCTS,
            new AbstractProductsProductImageSetsResourceRelationshipPlugin()
        );
        $resourceRelationshipCollection->addRelationship(
            ProductsRestApiConfig::RESOURCE_CONCRETE_PRODUCTS,
            new ConcreteProductsProductImageSetsResourceRelationshipPlugin()
        );

        return $resourceRelationshipCollection;
    }
}
```

</details>


{% info_block warningBox "Verification" %}

Make sure the following applies:

- The following endpoints are available:
  - `https://glue.mysprykershop.com/abstract-products/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}/abstract-product-image-sets`

  - `https://glue.mysprykershop.com/concrete-products/{% raw %}{{{% endraw %}concrete_sku{% raw %}}}{% endraw %}/concrete-product-image-sets`  

- When the `abstract-product-image-sets` resource is included as a query string, the `abstract-products` resource returns it as a relationship: `https://glue.mysprykershop.com/abstract-products/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}?include=abstract-product-image-sets`

- When the `concrete-product-image-sets` resource is included as a query string, the `concrete-products` resource returns it as a relationship: `https://glue.mysprykershop.com/concrete-products/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}?include=concrete-product-image-sets`

{% endinfo_block %}

### Enable resources and relationships of prices

Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| AbstractProductPricesRoutePlugin | Registers the `abstract-product-prices` resource. |  | Spryker\Glue\ProductPricesRestApi\Plugin |
| ConcreteProductPricesRoutePlugin | Registers the `concrete-product-prices` resource. || Spryker\Glue\ProductPricesRestApi\Plugin |
| AbstractProductPricesByResourceIdResourceRelationshipPlugin |Adds the `abstract-product-prices-resource` as a relationship to the `abstract-products` resource. | | Spryker\Glue\ProductPricesRestApi\Plugin\GlueApplication |
| ConcreteProductPricesByResourceIdResourceRelationshipPlugin |Adds the `concrete-product-prices-resource` as a relationship to the `concrete-products` resource. | | Spryker\Glue\ProductPricesRestApi\Plugin\GlueApplication|



<details open>
<summary markdown='span'>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>

```json
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\ProductPricesRestApi\Plugin\AbstractProductPricesRoutePlugin;
use Spryker\Glue\ProductPricesRestApi\Plugin\ConcreteProductPricesRoutePlugin;
use Spryker\Glue\ProductPricesRestApi\Plugin\GlueApplication\AbstractProductPricesByResourceIdResourceRelationshipPlugin;
use Spryker\Glue\ProductPricesRestApi\Plugin\GlueApplication\ConcreteProductPricesByResourceIdResourceRelationshipPlugin;
use Spryker\Glue\ProductsRestApi\ProductsRestApiConfig;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return list<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface>
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            new AbstractProductPricesRoutePlugin(),
            new ConcreteProductPricesRoutePlugin(),
        ];
    }

    /**
     * @param \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface $resourceRelationshipCollection
     *
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface
     */
    protected function getResourceRelationshipPlugins(
        ResourceRelationshipCollectionInterface $resourceRelationshipCollection
    ): ResourceRelationshipCollectionInterface {
        $resourceRelationshipCollection->addRelationship(
            ProductsRestApiConfig::RESOURCE_ABSTRACT_PRODUCTS,
            new AbstractProductPricesByResourceIdResourceRelationshipPlugin()
        );
        $resourceRelationshipCollection->addRelationship(
            ProductsRestApiConfig::RESOURCE_CONCRETE_PRODUCTS,
            new ConcreteProductPricesByResourceIdResourceRelationshipPlugin()
        );

        return $resourceRelationshipCollection;
    }
}
```

</details>

{% info_block warningBox "Verification" %}

Make sure the following applies:

- The following endpoints are available:
  - `https://glue.mysprykershop.com/abstract-products/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}/abstract-product-prices`
  - `https://glue.mysprykershop.com/concrete-products/{% raw %}{{{% endraw %}concrete_sku{% raw %}}}{% endraw %}/concrete-product-prices`

- When the `abstract-product-prices` resource is included as a query string, the `abstract-products` resource returns it as a relationship: `https://glue.mysprykershop.com/abstract-products/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}?include=abstract-product-prices`

- When the `concrete-product-prices` resource is included as a query string, the `concrete-products` resource returns it as a relationship: `https://glue.mysprykershop.com/concrete-products/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}?include=concrete-product-prices`

{% endinfo_block %}

### Enable resources and relationships of category

Activate the following plugin:


| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| AbstractProductsCategoriesResourceRelationshipPlugin | Adds the `categories` resource as a relationship to the `abstract-products` resource. |  | Spryker\Glue\ProductsCategoriesResourceRelationship\Plugin |

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\ProductsCategoriesResourceRelationship\Plugin\AbstractProductsCategoriesResourceRelationshipPlugin;
use Spryker\Glue\ProductsRestApi\ProductsRestApiConfig;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
   /**
    * @param \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface $resourceRelationshipCollection
    *
    * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface
    */
    protected function getResourceRelationshipPlugins(
        ResourceRelationshipCollectionInterface $resourceRelationshipCollection
    ): ResourceRelationshipCollectionInterface {
        $resourceRelationshipCollection->addRelationship(
            ProductsRestApiConfig::RESOURCE_ABSTRACT_PRODUCTS,
            new AbstractProductsCategoriesResourceRelationshipPlugin()
        );

        return $resourceRelationshipCollection;
    }
}
```

{% info_block warningBox "Verification" %}

Send a request to `https://glue.mysprykershop.com/abstract-products/{% raw %}{{{% endraw %}abstract_sku{% raw %}}}{% endraw %}?include=category-nodes`.

The response should contain the `category-nodes` resource as a relationship:

<details>
<summary markdown='span'>Response sample</summary>

```json
{  
   "data":{  
      "type":"abstract-products",
      "id":"001",
      "attributes":{  
         ...
      },
      "links":{  
         "self":"https://glue.mysprykershop.com/abstract-products/001"
      },
      "relationships":{  
         "category-nodes":{  
            "data":[  
               {  
                  "type":"category-nodes",
                  "id":"4"
               },
               {  
                  "type":"category-nodes",
                  "id":"2"
               }
            ]
         }
      }
   },
   "included":[  
      {  
         "type":"category-nodes",
         "id":"4",
         "attributes":{  
            ...
         },
         "links":{  
            "self":"https://glue.mysprykershop.com/category-nodes/4"
         }
      },
      {  
         "type":"category-nodes",
         "id":"2",
         "attributes":{  
            ...
         },
         "links":{  
            "self":"https://glue.mysprykershop.com/category-nodes/2"
         }
      }
   ]
}
```

</details>

{% endinfo_block %}

### Enable resources and relationships of product management attributes

Activate the following plugin:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductManagementAttributesResourceRoutePlugin | Registers the `product-management-attributes` resource. |  | Spryker\Glue\ProductAttributesRestApi\Plugin\GlueApplication |

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\ProductAttributesRestApi\Plugin\GlueApplication\ProductManagementAttributesResourceRoutePlugin;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return list<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface>
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            new ProductManagementAttributesResourceRoutePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the following endpoint is available: `https://glue.mysprykershop.com/product-management-attributes/{% raw %}{{{% endraw %}attribute_key{% raw %}}}{% endraw %}`

{% endinfo_block %}

### Enable multiselect product attributes

Activate the following plugins:

| PLUGIN | SPECIFICATION                                                          | PREREQUISITES | NAMESPACE |
| --- |------------------------------------------------------------------------| --- | --- |
| MultiSelectAttributeConcreteProductsResourceExpanderPlugin | Formats the "multiselect" attributes of the `concrete-products` resource to string. |  | Spryker\Glue\ProductAttributesRestApi\Plugin\ProductsRestApi |
| MultiSelectAttributeAbstractProductsResourceExpanderPlugin | Formats the "multiselect" attributes of the `abstract-products` resource to string. |  | Spryker\Glue\ProductAttributesRestApi\Plugin\ProductsRestApi |

**src/Pyz/Glue/ProductsRestApi/ProductsRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\ProductsRestApi;

use Spryker\Glue\ProductAttributesRestApi\Plugin\ProductsRestApi\MultiSelectAttributeAbstractProductsResourceExpanderPlugin;
use Spryker\Glue\ProductAttributesRestApi\Plugin\ProductsRestApi\MultiSelectAttributeConcreteProductsResourceExpanderPlugin;
use Spryker\Glue\ProductsRestApi\ProductsRestApiDependencyProvider as SprykerProductsRestApiDependencyProvider;

class ProductsRestApiDependencyProvider extends SprykerProductsRestApiDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\ProductsRestApiExtension\Dependency\Plugin\ConcreteProductsResourceExpanderPluginInterface>
     */
    protected function getConcreteProductsResourceExpanderPlugins(): array
    {
        return [
            new MultiSelectAttributeConcreteProductsResourceExpanderPlugin(), // remove if the project is accept product attribute values as array of strings
        ];
    }

    /**
     * @return array<\Spryker\Glue\ProductsRestApiExtension\Dependency\Plugin\AbstractProductsResourceExpanderPluginInterface>
     */
    protected function getAbstractProductsResourceExpanderPlugins(): array
    {
        return [
            new MultiSelectAttributeAbstractProductsResourceExpanderPlugin(), // remove if the project is accept product attribute values as array of strings
        ];
    }
}

```

{% info_block warningBox "Verification" %}

Make sure that `abstract-products` and `concrete-products` resources return "multiselect" product attributes as strings.

{% endinfo_block %}
