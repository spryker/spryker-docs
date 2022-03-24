---
title: Glue API - Product Relations feature integration
description: This guide will navigate you through the process of installing and configuring the Product Relations feature in Spryker OS.
last_updated: Nov 22, 2019
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v3/docs/product-relations-api-feature-integration-201907
originalArticleId: ff50c3f0-1d65-499b-8570-a417da9bfcf5
redirect_from:
  - /v3/docs/product-relations-api-feature-integration-201907
  - /v3/docs/en/product-relations-api-feature-integration-201907
---

## Install Feature API
### Prerequisites
To start feature integration, overview and install the necessary features:

|Name|Version|Required Sub-Feature|
|---|---|---|
|Spryker Core|201907.0|[Glue Application](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-glue-application-feature-integration.html)|
|Product Relation|201907.0||
|Glue API: Cart|201907.0| [Cart feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/cart-feature-integration.html) |
|Glue API: Products |201903.0|[Product API feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/product-api-feature-integration.html)|

### 1) Install the required modules using Composer
Run the following command to install the required modules:

```bash
composer require spryker/related-products-rest-api:"^1.0.0" spryker/up-selling-products-rest-api:"^1.0.0" --update-with-dependencies
```
<section contenteditable="false" class="warningBox"><div class="content">
    Make sure that the following modules have been installed:

|Module|Expected Directory|
|---|---|
|`RelatedProductsRestApi`|`vendor/spryker/related-products-rest-api`|
|`UpSellingProductsRestApi`|`vendor/spryker/up-selling-products-rest-api`|
</div></section>

### 2) Set up Behavior
#### Enable Resources and Relationships
Activate the following plugins:

|Plugin|Specification|Prerequisites|Namespace|
|---|---|---|---|
|`RelatedProductsResourceRoutePlugin`|Retrieves the related products collection.|None|`Spryker\Glue\RelatedProductsRestApi\Plugin\GlueApplication`|
|`CartUpSellingProductsResourceRoutePlugin`|Retrieves the up-selling products collection for the cart.|None|`Spryker\Glue\UpSellingProductsRestApi\Plugin\GlueApplication`|
|`GuestCartUpSellingProductsResourceRoutePlugin`|Retrieves the up-selling products collection for the guest cart.|None|`Spryker\Glue\UpSellingProductsRestApi\Plugin\GlueApplication`|


<details open>
<summary markdown='span'>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>

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

<br>
</details>

{% info_block infoBox "Verification" %}
Make sure that the following endpoints are available:<br>http://glue.mysprykershop.com/abstract-products/`{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}`/related-products<br>http://glue.mysprykershop.com/carts/`{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}`/up-selling-products<br>http://glue.mysprykershop.com/guest-carts/`{% raw %}{{{% endraw %}guest_cart_uuid{% raw %}}}{% endraw %}`/up-selling-products
{% endinfo_block %}
 
<!-- Last review date: Aug 02, 2019* by Eugenia Poidenko, Yuliia Boiko-->
