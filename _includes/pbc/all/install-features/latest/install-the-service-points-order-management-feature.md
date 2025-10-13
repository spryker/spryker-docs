

This document describes how to install the Service Points + [Order Management](/docs/pbc/all/order-management-system/latest/base-shop/order-management-feature-overview/order-management-feature-overview.html) feature.

## Install feature core

Follow the steps below to install the Service Points + Order Management feature core.

### Prerequisites

Install the required features:

| NAME             | VERSION          | INSTALLATION GUIDE                                                                                                                                                                       |
|------------------|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Service Points   | 202507.0 | [Install the Service Points feature](/docs/pbc/all/service-point-management/latest/unified-commerce/install-features/install-the-service-points-feature.html)                                         |
| Order Management | 202507.0 | [Install the Order Management feature](/docs/pbc/all/order-management-system/latest/base-shop/install-and-upgrade/install-features/install-the-order-management-feature.html) |

### Set up behavior

1. Register the plugins:

| PLUGIN                                                | SPECIFICATION                                                                                        | PREREQUISITES | NAMESPACE                                                                                     |
|-------------------------------------------------------|------------------------------------------------------------------------------------------------------|---------------|-----------------------------------------------------------------------------------------------|
| ServicePointOrderItemExpanderPlugin                   | Expands sales order items with a related service point.                                           |           | Spryker\Zed\SalesServicePoint\Communication\Plugin\Sales\ServicePointOrderItemExpanderPlugin  |
| ServicePointOrderItemsPostSavePlugin                  | Persists service point information for sales order items.                                            |           | Spryker\Zed\SalesServicePoint\Communication\Plugin\Sales\ServicePointOrderItemsPostSavePlugin |
| ServicePointCheckoutDataExpanderPlugin                | Expands `RestCheckoutDataTransfer` with extracted service points.                                    |           | Spryker\Zed\ServicePointsRestApi\Communication\Plugin\CheckoutRestApi                         |
| ServicePointQuoteMapperPlugin                         | Maps the rest checkout request data of service points to a quote transfer.                                    |           | Spryker\Zed\SalesServicePoint\Communication\Plugin\Sales\ServicePointOrderItemsPostSavePlugin |
| ServicePointsByCheckoutDataResourceRelationshipPlugin | Adds the `service-points` resources as a relationship to the `checkout-data` resources.                      |           | Spryker\Glue\ServicePointsRestApi\Plugin\GlueApplication                                      |
| ServicePointCheckoutDataResponseMapperPlugin          | Maps service points from `RestCheckoutDataTransfer` to `RestCheckoutDataResponseAttributesTransfers` |           | Spryker\Glue\ServicePointsRestApi\Plugin\CheckoutRestApi                                      |
| ServicePointCheckoutRequestAttributesValidatorPlugin  | Validates service points in `RestCheckoutRequestAttributesTransfer`.                                 |           | Spryker\Glue\ServicePointsRestApi\Plugin\CheckoutRestApi                                      |


**src/Pyz/Zed/Sales/SalesDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Sales;

use Spryker\Zed\Sales\SalesDependencyProvider as SprykerSalesDependencyProvider;
use Spryker\Zed\SalesServicePoint\Communication\Plugin\Sales\ServicePointOrderItemExpanderPlugin;
use Spryker\Zed\SalesServicePoint\Communication\Plugin\Sales\ServicePointOrderItemsPostSavePlugin;

class SalesDependencyProvider extends SprykerSalesDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemExpanderPluginInterface>
     */
    protected function getOrderItemExpanderPlugins(): array
    {
        return [
            new ServicePointOrderItemExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\SalesExtension\Dependency\Plugin\OrderItemsPostSavePluginInterface>
     */
    protected function getOrderItemsPostSavePlugins(): array
    {
        return [
            new ServicePointOrderItemsPostSavePlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

1. Add a product offer with the service point shipment type to cart.

2. Place the order.

3. Check that the `spy_sales_order_item_service_point` database table contains a record with the product and the selected service point.

{% endinfo_block %}

**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\CheckoutRestApi\CheckoutRestApiConfig;
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\ServicePointsRestApi\Plugin\GlueApplication\ServicePointsByCheckoutDataResourceRelationshipPlugin;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @param \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface $resourceRelationshipCollection
     *
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface
     */
    protected function getResourceRelationshipPlugins(
        ResourceRelationshipCollectionInterface $resourceRelationshipCollection,
    ): ResourceRelationshipCollectionInterface {
        $resourceRelationshipCollection->addRelationship(
            CheckoutRestApiConfig::RESOURCE_CHECKOUT_DATA,
            new ServicePointsByCheckoutDataResourceRelationshipPlugin(),
        );

        return $resourceRelationshipCollection;
    }
}
```

**src/Pyz/Glue/CheckoutRestApi/CheckoutRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\CheckoutRestApi;

use Spryker\Glue\CheckoutRestApi\CheckoutRestApiDependencyProvider as SprykerCheckoutRestApiDependencyProvider;
use Spryker\Glue\ServicePointsRestApi\Plugin\CheckoutRestApi\ServicePointCheckoutDataResponseMapperPlugin;
use Spryker\Glue\ServicePointsRestApi\Plugin\CheckoutRestApi\ServicePointCheckoutRequestAttributesValidatorPlugin;

class CheckoutRestApiDependencyProvider extends SprykerCheckoutRestApiDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\CheckoutRestApiExtension\Dependency\Plugin\CheckoutRequestAttributesValidatorPluginInterface>
     */
    protected function getCheckoutRequestAttributesValidatorPlugins(): array
    {
        return [
            new ServicePointCheckoutRequestAttributesValidatorPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Glue\CheckoutRestApiExtension\Dependency\Plugin\CheckoutDataResponseMapperPluginInterface>
     */
    protected function getCheckoutDataResponseMapperPlugins(): array
    {
        return [
            new ServicePointCheckoutDataResponseMapperPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/CheckoutRestApi/CheckoutRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\CheckoutRestApi;

use Spryker\Zed\CheckoutRestApi\CheckoutRestApiDependencyProvider as SprykerCheckoutRestApiDependencyProvider;
use Spryker\Zed\ServicePointsRestApi\Communication\Plugin\CheckoutRestApi\ServicePointCheckoutDataExpanderPlugin;
use Spryker\Zed\ServicePointsRestApi\Communication\Plugin\CheckoutRestApi\ServicePointQuoteMapperPlugin;

class CheckoutRestApiDependencyProvider extends SprykerCheckoutRestApiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\CheckoutRestApiExtension\Dependency\Plugin\QuoteMapperPluginInterface>
     */
    protected function getQuoteMapperPlugins(): array
    {
        return [
            new ServicePointQuoteMapperPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\CheckoutRestApiExtension\Dependency\Plugin\CheckoutDataExpanderPluginInterface>
     */
    protected function getCheckoutDataExpanderPlugins(): array
    {
        return [
            new ServicePointCheckoutDataExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Verify the `checkout-data` Glue API endpoint supports service points:

1. Add a product offer with a service point relation to cart:

`POST https://glue.mysprykershop.com/checkout-data`
<details>
  <summary>Request body example</summary>
```json
{
    "data": {
        "type": "checkout-data",
        "attributes": {
        	"idCart": "Cart ID",
            "servicePoints": [{
                "idServicePoint": "Service Point ID",
                "items": [
                    "Item Group Key"
                ]
            }]
        }
    }
}
```
</details>

Make sure you receive a valid response:

<details>
  <summary>Response body example</summary>
```json
{
    "data": {
        "type": "checkout-data",
        "id": null,
        "attributes": {
            "selectedServicePoints": [
                {
                    "idServicePoint": "Service Point ID",
                    "items": [
                        "Item Group Key"
                    ]
                }
            ]
        },
        "links": {
            "self": "https://glue.mysprykershop.com/checkout-data"
        }
    }
}
```
</details>

2. Repeat the previous steps but specify a non-existing or inactive service point ID.
  Make sure the response contains the corresponding error.
3. Repeat step 1 but do not specify `data.attributes.servicePoints.idServicePoint` or `data.attributes.servicePoints.items`.
  Make sure the response contains the corresponding error.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Verify the `checkout` Glue API endpoint supports service points:

1. Add a product offer with a service point relation to cart.
- `POST https://glue.mysprykershop.com/checkout`
<details>
  <summary>Request body example</summary>
```json
{
    "data": {
        "type": "checkout",
        "attributes": {
            // Other Checkout attributes
            "servicePoints": [{
                "idServicePoint": "Service Point ID",
                "items": [
                    "Item Group Key"
                ]
            }]
        }
    }
}
```
</details>

  Make sure the response status is 201 and the `spy_sales_order_item_service_point` database table contains the record with the selected service point.

2. Repeat the previous steps but specify a non-existing or inactive service point ID.
  Make sure the response contains the corresponding error.

3. Repeat step 1 but do not specify `data.attributes.servicePoints.idServicePoint` or `data.attributes.servicePoints.items`.
  Make sure the response contains the corresponding error.

{% endinfo_block %}

## Install feature frontend

Follow the steps below to install the Service Points + Order Management feature frontend.

### Set up widgets

Register the following plugins to enable widgets:

| PLUGIN                                      | SPECIFICATION                                               | PREREQUISITES | NAMESPACE                                       |
|---------------------------------------------|-------------------------------------------------------------|---------------|-------------------------------------------------|
| SalesServicePointNameForShipmentGroupWidget | Displays service points in orders on the Storefront. |               | SprykerShop\Yves\SalesServicePointWidget\Widget |
| ServicePointNameForShipmentGroupWidget | Displays service points per shipment group on the Storefront. |               | SprykerShop\Yves\ServicePointWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\SalesServicePointWidget\Widget\SalesServicePointNameForShipmentGroupWidget;
use SprykerShop\Yves\ServicePointWidget\Widget\ServicePointNameForShipmentGroupWidget;
use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;

class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    /**
     * @return array<string>
     */
    protected function getGlobalWidgets(): array
    {
        return [
            SalesServicePointNameForShipmentGroupWidget::class,
            ServicePointNameForShipmentGroupWidget::class,
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Add the widget to a Twig template:

```twig
{% raw %}{%{% endraw %} widget 'SalesServicePointNameForShipmentGroupWidget' args [...] only {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}
{% raw %}{%{% endraw %} widget 'ServicePointNameForShipmentGroupWidget' args [...] only {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}
```

Make sure that, in orders with service points, service points are displayed during checkout and in the order details.


{% endinfo_block %}
