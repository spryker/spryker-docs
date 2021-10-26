---
title: Glue API - Customer Access feature integration
description: Use the guide to install the Customer Access API feature in your project.
last_updated: Sep 14, 2020
template: feature-integration-guide-template
originalLink: https://documentation.spryker.com/v5/docs/glue-api-customer-access-feature-integration
originalArticleId: 0b19c34a-b115-4ccb-90c6-bc27bb9a0c16
redirect_from:
  - /v5/docs/glue-api-customer-access-feature-integration
  - /v5/docs/en/glue-api-customer-access-feature-integration
related:
  - title: Getting the List of Protected Resources
    link: docs/scos/dev/glue-api-guides/page.version/getting-the-list-of-protected-resources.html
---

{% info_block errorBox %}

The following feature integration guide expects the basic feature to be in place.
The current feature integration Guide only adds the Company Account REST API functionality.

{% endinfo_block %}

## Install Feature API
### Prerequisites
To start the feature integration, overview and install the necessary features:

| Name | Version | Integration guide |
| --- | --- | --- |
| Spryker Core | {{page.version}} | [Feature API](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-installation-and-configuration.html) | 
| Customer Access | {{page.version}} | [Feature](/docs/scos/dev/feature-integration-guides/{{page.version}}/customer-access-feature-integration.html) |

### 1) Install the required modules using Composer
Run the following command to install the required modules:

```bash
composer require spryker/customer-access-rest-api:"^1.1.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following module has been installed:

| Module | Expected Directory |
| --- | --- |
| `CustomerAccessRestApi` | `vendor/spryker/customer-access-rest-api` |

{% endinfo_block %}

### 2) Set up configuration
Add the following configuration:

| Configuration | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `CustomerAccessRestApiConfig::CUSTOMER_ACCESS_CONTENT_TYPE_TO_RESOURCE_TYPE_MAPPING` | Array that provides a mapping between customer access content types and the corresponding REST resource names. | None |`\Spryker\Glue\CustomerAccessRestApi` |

src/Pyz/Glue/CustomerAccessRestApi/CustomerAccessRestApiConfig.php
    
```php
<?php
 
namespace Pyz\Glue\CustomerAccessRestApi;
 
use Spryker\Glue\CheckoutRestApi\CheckoutRestApiConfig;
use Spryker\Glue\CartsRestApi\CartsRestApiConfig;
use Spryker\Glue\CustomerAccessRestApi\CustomerAccessRestApiConfig as SprykerCustomerAccessRestApiConfig;
use Spryker\Glue\ProductPricesRestApi\ProductPricesRestApiConfig;
use Spryker\Glue\WishlistsRestApi\WishlistsRestApiConfig;
use Spryker\Shared\CustomerAccess\CustomerAccessConfig;
 
class CustomerAccessRestApiConfig extends SprykerCustomerAccessRestApiConfig
{
    protected const CUSTOMER_ACCESS_CONTENT_TYPE_TO_RESOURCE_TYPE_MAPPING = [
        CustomerAccessConfig::CONTENT_TYPE_PRICE => [
            ProductPricesRestApiConfig::RESOURCE_ABSTRACT_PRODUCT_PRICES,
            ProductPricesRestApiConfig::RESOURCE_CONCRETE_PRODUCT_PRICES,
        ],
        CustomerAccessConfig::CONTENT_TYPE_ORDER_PLACE_SUBMIT => [
            CheckoutRestApiConfig::RESOURCE_CHECKOUT,
            CheckoutRestApiConfig::RESOURCE_CHECKOUT_DATA,
        ],
        CustomerAccessConfig::CONTENT_TYPE_ADD_TO_CART => [
            CartsRestApiConfig::RESOURCE_GUEST_CARTS_ITEMS,
        ],
        CustomerAccessConfig::CONTENT_TYPE_WISHLIST => [
            WishlistsRestApiConfig::RESOURCE_WISHLISTS,
            WishlistsRestApiConfig::RESOURCE_WISHLIST_ITEMS,
        ],
    ];
}
```

### 3) Set up Transfer Objects
Run the following command to generate transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have occurred:

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| `RestCustomerAccessAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestCustomerAccessAttributesTransfer` |

{% endinfo_block %}

### 4) Set up Behavior
#### Enable resources

Activate the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `CustomerAccessResourceRoutePlugin` | Registers the `customer-access` resource. | None | `Spryker\Glue\CustomerAccessRestApi\Plugin\GlueApplication` |
| `CustomerAccessFormatRequestPlugin` | Checks whether the current resource is restricted by the `spryker/customer-access` module. | None | `Spryker\Glue\CustomerAccessRestApi\Plugin\GlueApplication` |

src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php

```php
<?php
 
namespace Pyz\Glue\GlueApplication;
 
use Spryker\Glue\CustomerAccessRestApi\Plugin\GlueApplication\CustomerAccessFormatRequestPlugin;
use Spryker\Glue\CustomerAccessRestApi\Plugin\GlueApplication\CustomerAccessResourceRoutePlugin;
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
 
class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            new CustomerAccessResourceRoutePlugin(),
        ];
    }
 
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\FormatRequestPluginInterface[]
     */
    protected function getFormatRequestPlugins(): array
    {
        return [
            new CustomerAccessFormatRequestPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make that following endpoint is available:
`http://glue.mysprykershop.com/customer-access`

**Sample response**

```json
{
    "data": [
        {
            "type": "customer-access",
            "id": null,
            "attributes": {
                "resourceTypes": [
                    "wishlists",
                    "wishlist-items"
                ]
            },
            "links": {
                "self": "http://glue.mysprykershop.com/customer-access"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/customer-access"
    }
}
```


{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make that `CustomerAccessFormatRequestPlugin` is set up correctly:

* Go to the **Customer Access** tab in *Spryker Back Office* and hide the `price` content.
* Make a request to: `http://glue.mysprykershop.com/abstract-products/{% raw %}{{{% endraw %}abstract-sku{% raw %}}}{% endraw %}/abstract-product-prices`
* Make sure that the response is a 403 error.

**Sample response**

```json

{
    "errors": [
        {
            "detail": "Missing access token.",
            "status": 403,
            "code": "002"
        }
    ]
}
```


{% endinfo_block %}

