

## Install Feature API

### Prerequisites

To start feature integration, overview, and install the necessary features:

| NAME | VERSION | INSTALLATION GUIDE |
| --- | --- | --- |
| Product Options | {{page.version}} | Feature |
| Spryker Core | {{page.version}} | [Feature API](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html) |

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/product-options-rest-api"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| ProductOptionsRestApi | vendor/spryker/product-options-rest-api |

{% endinfo_block %}

### 2) Set up transfer objects

Apply transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| CartItemRequest.productOptions | property | created | src/Generated/Shared/Transfer/CartItemRequestTransfer |
| RestCartItemsAttributes.productOptions  | property | created | src/Generated/Shared/Transfer/RestCartItemsAttributesTransfer |
| RestCartItemsProductOption | class | created | src/Generated/Shared/Transfer/RestCartItemsProductOptionTransfer |
| RestItemsAttributes.selectedOptions | property | created | src/Generated/Shared/Transfer/RestItemsAttributesTransfer  |
| RestItemProductOptions | class | created |src/Generated/Shared/Transfer/RestItemProductOptionsTransfer |
| RestOrderItemProductOptions | class | created |src/Generated/Shared/Transfer/RestOrderItemProductOptionsTransfer |
| RestOrderItemsAttributes.productOptions | property | created |src/Generated/Shared/Transfer/RestOrderItemsAttributesTransfer |
| RestProductOptionsAttributes | class | created | src/Generated/Shared/Transfer/RestProductOptionsAttributesTransfer |

{% endinfo_block %}

### 3) Set up behavior

#### Enable relationships

Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductOptionsByProductAbstractSkuResourceRelationshipPlugin | Adds product-options resource as relationship by product abstract sku. | None | Spryker\Glue\ProductOptionsRestApi\Plugin\GlueApplication |
| ProductOptionsByProductConcreteSkuResourceRelationshipPlugin | Adds product-options resource as relationship by product concrete sku. | None | Spryker\Glue\ProductOptionsRestApi\Plugin\GlueApplication |

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\ProductOptionsRestApi\Plugin\GlueApplication\ProductOptionsByProductAbstractSkuResourceRelationshipPlugin;
use Spryker\Glue\ProductOptionsRestApi\Plugin\GlueApplication\ProductOptionsByProductConcreteSkuResourceRelationshipPlugin;
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
            new ProductOptionsByProductAbstractSkuResourceRelationshipPlugin()
        );
        $resourceRelationshipCollection->addRelationship(
            ProductsRestApiConfig::RESOURCE_CONCRETE_PRODUCTS,
            new ProductOptionsByProductConcreteSkuResourceRelationshipPlugin()
        );

        return $resourceRelationshipCollection;
    }
}
```

{% info_block warningBox "Verification" %}

Make a GET request to `https://glue.mysprykershop.com/abstract-products/{% raw %}{{{% endraw %}product_abstract_sku{% raw %}}}{% endraw %}/?include=product-options`. Abstract product with a given SKU should have at least one related product option. Make sure that the response includes relationships to product options resources.

Make a GET request to `https://glue.mysprykershop.com/concrete-products/{% raw %}{{{% endraw %}product_concrete_sku{% raw %}}}{% endraw %}/?include=product-options`. Abstract product to which concrete product with a given SKU belongs should have at least one related product option. Make sure that the response includes relationships to product options resources.

{% endinfo_block %}

#### Provide dependencies for the CartsRestApi module

Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductOptionRestCartItemsAttributesMapperPlugin | Maps selected product options to the cart item response. | None | Spryker\Glue\ProductOptionsRestApi\Plugin\CartsRestApi |
| ProductOptionCartItemMapperPlugin | Maps specified selected product options to the cart change transfer object. | None | Spryker\Zed\ProductOptionsRestApi\Communication\Plugin\CartsRestApi |
| ProductOptionCartItemExpanderPlugin | Looks up the product option by SKU and expands the request for adding an item with it. | None | Spryker\Glue\ProductOptionsRestApi\Plugin\CartsRestApi |

**src/Pyz/Glue/CartsRestApi/CartsRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\CartsRestApi;

use Spryker\Glue\CartsRestApi\CartsRestApiDependencyProvider as SprykerCartsRestApiDependencyProvider;
use Spryker\Glue\ProductOptionsRestApi\Plugin\CartsRestApi\ProductOptionCartItemExpanderPlugin;
use Spryker\Glue\ProductOptionsRestApi\Plugin\CartsRestApi\ProductOptionRestCartItemsAttributesMapperPlugin;

class CartsRestApiDependencyProvider extends SprykerCartsRestApiDependencyProvider
{
    /**
     * @return \Spryker\Glue\CartsRestApiExtension\Dependency\Plugin\RestCartItemsAttributesMapperPluginInterface[]
     */
    protected function getRestCartItemsAttributesMapperPlugins(): array
    {
        return [
            new ProductOptionRestCartItemsAttributesMapperPlugin(),
        ];
    }

    /**
     * @return \Spryker\Glue\CartsRestApiExtension\Dependency\Plugin\CartItemExpanderPluginInterface[]
     */
    protected function getCartItemExpanderPlugins(): array
    {
        return [
            new ProductOptionCartItemExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/CartsRestApi/CartsRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\CartsRestApi;

use Spryker\Zed\CartsRestApi\CartsRestApiDependencyProvider as SprykerCartsRestApiDependencyProvider;
use Spryker\Zed\ProductOptionsRestApi\Communication\Plugin\CartsRestApi\ProductOptionCartItemMapperPlugin;

class CartsRestApiDependencyProvider extends SprykerCartsRestApiDependencyProvider
{
    /**
     * @return \Spryker\Zed\CartsRestApiExtension\Dependency\Plugin\CartItemMapperPluginInterface[]
     */
    protected function getCartItemMapperPlugins(): array
    {
        return [
            new ProductOptionCartItemMapperPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make a GET request to `https://glue.mysprykershop.com/carts?include=items`.  Included cart items should have `selectedProductOptions` property with product options chosen for an item.

Make a GET request to `https://glue.mysprykershop.com/guest-carts?include=guest-cart-items`. Included guest cart items should have `selectedProductOptions` property with product options chosen for an item.

Make a POST request to `https://glue.mysprykershop.com/carts{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}/items`. The request body example is attached below. Specified product options should be attached to the item.

```yaml
{
    "data": {
        "type": "items",
        "attributes": {
            "sku": "productConcreteSku",
            "quantity": 1,
            "productOptions": [
            	{
            		"sku": "productOptionValueSku"
            	}
            ]
        }
    }
}
```
{% endinfo_block %}

#### Provide dependencies for the OrdersRestApi module

Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductOptionRestOrderItemsAttributesMapperPlugin | Maps selected product options to the order item response. | None | Spryker\Glue\ProductOptionsRestApi\Plugin\OrdersRestApi |

**src/Pyz/Glue/OrdersRestApi/OrdersRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\OrdersRestApi;

use Spryker\Glue\OrdersRestApi\OrdersRestApiDependencyProvider as SprykerOrdersRestApiDependencyProvider;
use Spryker\Glue\ProductOptionsRestApi\Plugin\OrdersRestApi\ProductOptionRestOrderItemsAttributesMapperPlugin;

class OrdersRestApiDependencyProvider extends SprykerOrdersRestApiDependencyProvider
{
    /**
     * @return \Spryker\Glue\OrdersRestApiExtension\Dependency\Plugin\RestOrderItemsAttributesMapperPluginInterface[]
     */
    protected function getRestOrderItemsAttributesMapperPlugins(): array
    {
        return [
            new ProductOptionRestOrderItemsAttributesMapperPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make a GET request to `https://glue.mysprykershop.com/orders/{% raw %}{{{% endraw %}order_uuid{% raw %}}}{% endraw %}`. Returned order items should have `productOptions` property with product options chosen for an item.

{% endinfo_block %}
