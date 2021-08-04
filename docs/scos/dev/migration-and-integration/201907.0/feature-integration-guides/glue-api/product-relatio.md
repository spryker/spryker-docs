---
title: Product Relations API Feature Integration
originalLink: https://documentation.spryker.com/v3/docs/product-relations-api-feature-integration-201907
redirect_from:
  - /v3/docs/product-relations-api-feature-integration-201907
  - /v3/docs/en/product-relations-api-feature-integration-201907
---

## Install Feature API
### Prerequisites
To start feature integration, overview and install the necessary features:

|Name|Version|Required Sub-Feature|
|---|---|---|
|Spryker Core|201907.0|[Glue Application](/docs/scos/dev/migration-and-integration/201907.0/feature-integration-guides/glue-api/glue-applicatio)|
|Product Relation|201907.0||
|Cart|201907.0| [Cart API](https://documentation.spryker.com/v3/docs/cart-feature-integration-201907) ||
Product|201903.0|[Products API](https://documentation.spryker.com/v3/docs/products-feature-integration-201907)|

### 1) Install the Required Modules Using Composer
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
<summary>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>

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

</br>
</details>

{% info_block infoBox "Verification" %}
Make sure that the following endpoints are available:</br>http://glue.mysprykershop.com/abstract-products/`{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}`/related-products</br>http://glue.mysprykershop.com/carts/`{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}`/up-selling-products</br>http://glue.mysprykershop.com/guest-carts/`{% raw %}{{{% endraw %}guest_cart_uuid{% raw %}}}{% endraw %}`/up-selling-products
{% endinfo_block %}
 
<!-- Last review date: Aug 02, 2019* by Eugenia Poidenko, Yuliia Boiko-->
