---
title: Glue API - Product relations feature integration
description: This guide will navigate you through the process of installing and configuring the Product Relations feature in Spryker OS.
last_updated: Jun 16, 2021
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/glue-api-product-relations-feature-integration
originalArticleId: 90f7f8ad-55be-4090-8a98-b8530a1d8eb9
redirect_from:
  - /2021080/docs/glue-api-product-relations-feature-integration
  - /2021080/docs/en/glue-api-product-relations-feature-integration
  - /docs/glue-api-product-relations-feature-integration
  - /docs/en/glue-api-product-relations-feature-integration
---

## Install Feature API
Follow the steps to install the Product Relations feature API.

### Prerequisites

To start feature integration, overview and install the necessary features:

| NAME | VERSION | REQUIRED  SUB-FEATURE|
|---|---|---|
|Spryker Core| {{page.version}} |[Glue Application](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-glue-application-feature-integration.html)|
|Product Relation|master||
|Cart| {{page.version}}| [Cart API](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-cart-feature-integration.html) ||
Product| {{page.version}} |[Products API](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-product-feature-integration.html)|

### 1) Install the required modules using Composer

Run the following command to install the required modules:

```bash
composer require spryker/related-products-rest-api:"^1.0.0" spryker/up-selling-products-rest-api:"^1.0.0" --update-with-dependencies
```
{% info_block warningBox “Verification” %}

Make sure that the following modules have been installed:
    
| MODULE | EXPECTED DIRECTORY |
|---|---|
|RelatedProductsRestApi|vendor/spryker/related-products-rest-api|
|UpSellingProductsRestApi|vendor/spryker/up-selling-products-rest-api|

{% endinfo_block %}


### 2) Set up behavior

Set up the following behavior.

#### Enable resources and relationships

Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
|---|---|---|---|
|RelatedProductsResourceRoutePlugin|Retrieves the related products collection.|None|Spryker\Glue\RelatedProductsRestApi\Plugin\GlueApplication|
|CartUpSellingProductsResourceRoutePlugin|Retrieves the up-selling products collection for the cart.|None|`Spryker\Glue\UpSellingProductsRestApi\Plugin\GlueApplication|
|GuestCartUpSellingProductsResourceRoutePlugin|Retrieves the up-selling products collection for the guest cart.|None|Spryker\Glue\UpSellingProductsRestApi\Plugin\GlueApplication|


**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
<?php
 
namespace Pyz\Glue\GlueApplication;
 
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\RelatedProductsRestApi\Plugin\GlueApplication\RelatedProductsResourceRoutePlugin;
use Spryker\Glue\UpSellingProductsRestApi\Plugin\GlueApplication\CartUpSellingProductsResourceRoutePlugin;
use Spryker\Glue\UpSellingProductsRestApi\Plugin\GlueApplication\GuestCartUpSellingProductsResourceRoutePlugin;
 
class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
     */
    protected function getResourceRoutePlugins(): array
     {
        return [
            new RelatedProductsResourceRoutePlugin(),
            new CartUpSellingProductsResourceRoutePlugin(),
            new GuestCartUpSellingProductsResourceRoutePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the following endpoints are available:
`http://glue.mysprykershop.com/abstract-products/`{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}`e/related-products`
`http://glue.mysprykershop.com/carts/`{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}`/up-selling-products`
`http://glue.mysprykershop.com/guest-carts/`{% raw %}{{{% endraw %}guest_cart_uuid{% raw %}}}{% endraw %}`/up-selling-products`

{% endinfo_block %}

