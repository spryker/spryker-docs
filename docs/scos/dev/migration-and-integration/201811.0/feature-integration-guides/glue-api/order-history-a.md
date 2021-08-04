---
title: Order History API Feature Integration
originalLink: https://documentation.spryker.com/v1/docs/order-history-api-feature-integration
redirect_from:
  - /v1/docs/order-history-api-feature-integration
  - /v1/docs/en/order-history-api-feature-integration
---

## Install Feature API
### Prerequisites
To start feature integration, review and install all these necessary features:
|Name|Version|
|---|---|
|Spryker Core|2018.12.0|
|Order Management|2018.12.0|
|AuthRestApi|2.2.2|
### 1) Install the required modules using composer

Run the following command to install the required modules:
```yaml
composer require spryker/auth-rest-api:"^2.2.2" spryker/orders-rest-api:"^1.2.2" --update-with-dependencies
```

{% info_block infoBox "Verification" %}
Make sure that the following module is installed:
{% endinfo_block %}
|Module|Expected Directory|
|---|---|
|`OrdersRestApi`|`vendor/spryker/orders-rest-api`|
### 2) Set up Transfer objects

Run the following command to generate the transfer changes:
```yaml
composer transfer:generate
```

{% info_block infoBox "Verification" %}
Make sure that the following changes are present in the transfer objects:
{% endinfo_block %}
|Transfer|Type|Event|Path|
|---|---|---|---|
|`RestOrdersAttributesTransfer`|class|created|`src/Generated/Shared/Transfer/RestOrdersAttributesTransfer`|
|`RestOrderDetailsAttributesTransfer`|class|created|`src/Generated/Shared/Transfer/RestOrderDetailsAttributesTransfer`|
|`RestOrderItemsAttributesTransfer`|class|created|`src/Generated/Shared/Transfer/RestOrderItemsAttributesTransfer`|
|`RestOrderTotalsAttributesTransfer`|class|created|`src/Generated/Shared/Transfer/RestOrderTotalsAttributesTransfer`|
|`RestOrderExpensesAttributesTransfer`|class|created|`src/Generated/Shared/Transfer/RestOrderExpensesAttributesTransfer`|
|`RestOrderAddressTransfer`|class|created|`src/Generated/Shared/Transfer/RestOrderAddressTransfer`|
|`RestOrderPaymentTransfer`|class|created|`src/Generated/Shared/Transfer/RestOrderPaymentTransfer`|
|`RestOrderItemMetadataTransfer`|class|created|`src/Generated/Shared/Transfer/RestOrderItemMetadataTransfer`|
|`RestCalculatedDiscountTransfer`|class|created|`src/Generated/Shared/Transfer/RestCalculatedDiscountTransfer`|

### 3) Set up behavior
#### Enable resource

Activate the following plugin:
|Plugin|Specification|Prerequisites|Namespace|
|---|---|---|---|
|`OrdersResourceRoutePlugin`|Registers orders resource.|None|`Spryker\Glue\OrdersRestApi\Plugin`|

```php
<?php
 
namespace Pyz\Glue\GlueApplication;
 
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\OrdersRestApi\Plugin\OrdersResourceRoutePlugin;
 
class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            new OrdersResourceRoutePlugin(),
        ];
    }
}
```

<section contenteditable="false" class="warningBox"><div class="content">
    Make sure that the following endpoints are available:

* http://example.org/orders
* http://example.org/orders/`{% raw %}{{{% endraw %}order_reference{% raw %}}}{% endraw %}`		
 </div></section>
 
 <!-- Last review date: Feb 12, 2019 by Tihran Voitov, Dmitry Beirak-->
