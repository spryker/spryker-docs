---
title: Marketplace Product feature integration
last_updated: Dec 07, 2020
summary: This document describes how to integrate the Marketplace Product Glue API feature into a Spryker project.
---

## Install feature core
Follow the steps below to install the Marketplace Product Glue API feature core.

### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version | Link |
|-|-|-|
| Spryker Core | master | [Glue API: Spryker Core feature integration](https://documentation.spryker.com/docs/glue-api-spryker-core-feature-integration)  |
| Marketplace Product | master | [Marketplace Product Feature Integration](/docs/marketplace/dev/feature-integration-guides/marketplace-product-feature-integration.html)|

### 1) Install the required modules using Composer
Run the following commands to install the required modules:


```bash
composer require spryker/merchant-products-rest-api: "dev-master" --update-with-dependencies
```


---
**Verification**

Make sure that the following modules have been installed:

| Module | Expected Directory |
|-|-|
| MerchantProductsRestApi | vendor/spryker/merchant-products-rest-api |

---

### 2) Set up transfer objects
Run the following command to generate transfer changes:

```bash
console transfer:generate
```

---
**Verification**

Make sure that the following changes have been applied in transfer objects:

| Transfer | Type | Event | Path |
|-|-|-|-|
| AbstractProductsRestAttributes.merchantReference | property | Created | src/Generated/Shared/Transfer/AbstractProductsRestAttributesTransfer |
| RestCartItemsAttributes.merchantReference | property | Created | src/Generated/Shared/Transfer/RestCartItemsAttributesTransfer |
| CartItemRequest.merchantReference | property | Created | src/Generated/Shared/Transfer/CartItemRequestTransfer |

---

3) Set up behavior
Enable the following behaviors by registering the plugins:

| Plugin | Description | Prerequisites | Namespace |
|-|-|-|-|
| MerchantProductCartItemExpanderPlugin | Expands view data for abstract product with merchant data. | None | Spryker\Glue\MerchantProductsRestApi\Plugin\CartsRestApi |
| MerchantByMerchantReferenceResourceRelationshipPlugin |  Adds merchants resources as relationship by merchant references in the attributes. | None | Spryker\Glue\MerchantsRestApi\Plugin\GlueApplication |

**src/Pyz/Glue/CartsRestApi/CartsRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\CartsRestApi;

use Spryker\Glue\CartsRestApi\CartsRestApiDependencyProvider as SprykerCartsRestApiDependencyProvider;
use Spryker\Glue\MerchantProductsRestApi\Plugin\CartsRestApi\MerchantProductCartItemExpanderPlugin;

class CartsRestApiDependencyProvider extends SprykerCartsRestApiDependencyProvider
{
    /**
     * @return \Spryker\Glue\CartsRestApiExtension\Dependency\Plugin\CartItemExpanderPluginInterface[]
     */
    protected function getCartItemExpanderPlugins(): array
    {
        return [
            new MerchantProductCartItemExpanderPlugin(),
        ];
    }
}
```
**src/Pyz/Glue/CartsRestApi/CartsRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueApplication;


use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\MerchantsRestApi\Plugin\GlueApplication\MerchantByMerchantReferenceResourceRelationshipPlugin;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\ProductsRestApi\ProductsRestApiConfig;
use Spryker\Glue\SharedCartsRestApi\SharedCartsRestApiConfig;

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
            new MerchantByMerchantReferenceResourceRelationshipPlugin()
        );

        $resourceRelationshipCollection->addRelationship(
            CartsRestApiConfig::RESOURCE_CART_ITEMS,
            new MerchantByMerchantReferenceResourceRelationshipPlugin()
        );

        $resourceRelationshipCollection->addRelationship(
            CartsRestApiConfig::RESOURCE_GUEST_CARTS_ITEMS,
            new MerchantByMerchantReferenceResourceRelationshipPlugin()
        );

        return $resourceRelationshipCollection;
    }
}
```

---
**Verification**

Make sure that you can add a merchant product to the cart using a `POST` request to `http://zed.de.demo-spryker.com/guest-cart-items or http://zed.de.demo-spryker.com/carts/{idCart}/items`.

Make sure that when you do a `GET` request for the carts with merchant products, their merchants returned as well. `http://zed.de.demo-spryker.com/guest-carts/{idCart}?include=guest-cart-items,merchants` or `http://zed.de.demo-spryker.com/carts/{idCart}?include=items,merchants`.

Make sure that when you do a `GET` request to retrieve abstract products that belong to a specific merchant, it returns product data together with their merchants `http://zed.de.demo-spryker.com/abstract-products/{abstractProductSku}?include=merchants`.

  ---
