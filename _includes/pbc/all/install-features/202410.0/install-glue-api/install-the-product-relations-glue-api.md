

## Install Feature API

Follow the steps to install the Product Relations feature API.

### Prerequisites

Install the required features:

| NAME | VERSION | REQUIRED  SUB-FEATURE|
|---|---|---|
|Spryker Core| {{page.version}} |[Glue Application](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html)|
|Product Relation| {{page.version}} | [Install the Product Relations feature](/docs/pbc/all/product-relationship-management/{{page.version}}/install-and-upgrade/install-the-product-relations-feature.html)|
|Cart| {{page.version}}| [Cart API](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-cart-glue-api.html) ||
Product| {{page.version}} |[Products API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-glue-api.html)|

### 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/related-products-rest-api:"^1.0.0" spryker/up-selling-products-rest-api:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

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

- `https://glue.mysprykershop.com/abstract-products/`{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}`e/related-products`
- `https://glue.mysprykershop.com/carts/`{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}`/up-selling-products`
- `https://glue.mysprykershop.com/guest-carts/`{% raw %}{{{% endraw %}guest_cart_uuid{% raw %}}}{% endraw %}`/up-selling-products`

{% endinfo_block %}
