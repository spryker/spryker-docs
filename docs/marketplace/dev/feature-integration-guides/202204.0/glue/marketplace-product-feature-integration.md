---
title: "Glue API: Marketplace Product feature integration"
last_updated: Aug 31, 2021
description: This document describes how to integrate the Marketplace Product Glue API feature into a Spryker project.
template: feature-integration-guide-template
---

This document describes how to integrate the Marketplace Product Glue API feature into a Spryker project.

## Install feature core

Follow the steps below to install the Marketplace Product Glue API feature core.

### Prerequisites

To start feature integration, integrate the required features:

| NAME | VERSION | INTEGRATION GUIDE |
|-|-|-|
| Spryker Core | {{page.version}} | [Glue API: Spryker Core feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-spryker-core-feature-integration.html)  |
| Marketplace Product | {{page.version}} | [Marketplace Product Feature Integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/marketplace-product-feature-integration.html)|

### 1) Install the required modules using Composer

Install the required modules:

```bash
composer require spryker/merchant-products-rest-api: "^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
|-|-|
| MerchantProductsRestApi | vendor/spryker/merchant-products-rest-api |

{% endinfo_block %}

### 2) Set up transfer objects

Generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have been applied in transfer objects:

| TRANSFER | TYPE | EVENT| PATH |
|-|-|-|-|
| AbstractProductsRestAttributes.merchantReference | property | Created | src/Generated/Shared/Transfer/AbstractProductsRestAttributesTransfer |
| RestCartItemsAttributes.merchantReference | property | Created | src/Generated/Shared/Transfer/RestCartItemsAttributesTransfer |
| CartItemRequest.merchantReference | property | Created | src/Generated/Shared/Transfer/CartItemRequestTransfer |

{% endinfo_block %}

### 3) Set up behavior

Enable the following behaviors by registering the plugins:

| PLUGIN | DESCRIPTION | PREREQUISITES | NAMESPACE |
|-|-|-|-|
| MerchantByMerchantReferenceResourceRelationshipPlugin |  Adds merchants resources as relationship by merchant references in the attributes. |  | Spryker\Glue\MerchantsRestApi\Plugin\GlueApplication |

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

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

{% info_block warningBox "Verification" %}

Make sure that when you do a `GET` request to retrieve abstract products that belong to a specific merchant, it returns products' data together with their merchants `http://glue.de.demo-spryker.com/abstract-products/{% raw %}{{abstractProductSku}}{% endraw %}?include=merchants`.

{% endinfo_block %}

## Related features

| FEATURE | REQUIRED FOR THE CURRENT FEATURE | INTEGRATION GUIDE |
| -------------- | -------------------------------- | ----------------- |
| Marketplace Product + Cart API | | [Glue API: Marketplace Product + Cart feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/marketplace-product-cart-feature-integration.html) |