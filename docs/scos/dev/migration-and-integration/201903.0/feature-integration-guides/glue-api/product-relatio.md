---
title: Product Relations API Feature Integration
originalLink: https://documentation.spryker.com/v2/docs/product-relations-api-feature-integration-201903
redirect_from:
  - /v2/docs/product-relations-api-feature-integration-201903
  - /v2/docs/en/product-relations-api-feature-integration-201903
---

## Install Feature API
### Prerequisites
To start feature integration, overview and install the necessary features:
|Name|Version|Required Sub-Feature|
|---|---|---|
|Spryker Core|201903.0|Feature API|
|Product Relation|201903.0||
|Cart|201903.0|Feature API||
Product|201903.0|Feature API|
### 1) Install the Required Modules Using Composer
Run the following command to install the required modules:
```bash
composer require spryker/related-products-rest-api:"^1.0.0" spryker/up-selling-products-rest-api:"^1.0.1" --update-with-dependencies
```
<section contenteditable="false" class="warningBox"><div class="content">
    Make sure that the following modules are installed:
    
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
|`RelatedProductsRoutePlugin`|Retrieves the related products collection.|None|`Spryker\Glue\RelatedProductsRestApi\Plugin`|
|`UpSellingProductsForCartRoutePlugin`|Retrieves the up-selling products collection for the cart.|None|`Spryker\Glue\UpSellingProductsRestApi\Plugin`|
|`UpSellingProductsForGuestCartRoutePlugin`|Retrieves the up-selling products collection for the guest cart.|None|`Spryker\Glue\UpSellingProductsRestApi\Plugin`|


<details open>
<summary>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>

```php
<?php
 
namespace Pyz\Glue\GlueApplication;
 
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\RelatedProductsRestApi\Plugin\RelatedProductsRoutePlugin
use Spryker\Glue\UpSellingProductsRestApi\Plugin\UpSellingProductsForCartRoutePlugin
use Spryker\Glue\UpSellingProductsRestApi\Plugin\UpSellingProductsForGuestCartRoutePlugin
 
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

<!-- Last review date: Mar 14, 2019* by  Volodymyr Volkov-->
