

This document describes how to integrate the Service Points + [Order Management](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/order-management-feature-overview/order-management-feature-overview.html) feature into a Spryker project.

## Install feature core

Follow the steps below to install the Service Points + Order Management feature.

### Prerequisites

To start feature integration, integrate the required features:

| NAME             | VERSION          | INTEGRATION GUIDE                                                                                                                                                                       |
|------------------|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Service Points   | {{page.version}} | [Install the Service Points feature](/docs/pbc/all/service-points/{{page.version}}/install-and-upgrade/install-the-service-points-feature.html)                                         |
| Order Management | {{page.version}} | [Order Management feature integration](/docs/pbc/all/order-management-system/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-order-management-feature.html) |

## Set up behavior

1. Register plugins:

| PLUGIN                                                | SPECIFICATION                                                                                        | PREREQUISITES | NAMESPACE                                                                                     |
|-------------------------------------------------------|------------------------------------------------------------------------------------------------------|---------------|-----------------------------------------------------------------------------------------------|
| ServicePointOrderItemExpanderPlugin                   | Expands sales order items with with related service point.                                           | None          | Spryker\Zed\SalesServicePoint\Communication\Plugin\Sales\ServicePointOrderItemExpanderPlugin  |
| ServicePointOrderItemsPostSavePlugin                  | Persists service point information for sales order items.                                            | None          | Spryker\Zed\SalesServicePoint\Communication\Plugin\Sales\ServicePointOrderItemsPostSavePlugin |
| ServicePointCheckoutDataExpanderPlugin                | Expands `RestCheckoutDataTransfer` with extracted service points.                                    | None          | Spryker\Zed\ServicePointsRestApi\Communication\Plugin\CheckoutRestApi                         |
| ServicePointQuoteMapperPlugin                         | Maps service points rest checkout request data to quote transfer.                                    | None          | Spryker\Zed\SalesServicePoint\Communication\Plugin\Sales\ServicePointOrderItemsPostSavePlugin |
| ServicePointsByCheckoutDataResourceRelationshipPlugin | Adds `service-points` resources as a relationship to `checkout-data` resources.                      | None          | Spryker\Glue\ServicePointsRestApi\Plugin\GlueApplication                                      |
| ServicePointCheckoutDataResponseMapperPlugin          | Maps service points from `RestCheckoutDataTransfer` to `RestCheckoutDataResponseAttributesTransfers` | None          | Spryker\Glue\ServicePointsRestApi\Plugin\CheckoutRestApi                                      |
| ServicePointCheckoutRequestAttributesValidatorPlugin  | Validates service points in `RestCheckoutRequestAttributesTransfer`.                                 | None          | Spryker\Glue\ServicePointsRestApi\Plugin\CheckoutRestApi                                      |


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

Make sure that sales plugins work correctly:

1.  Add a product offer with the service point shipment type to your cart.

2.  Place an order with the added product.

3.  Check that the `spy_sales_order_item_service_point` database table contains a record with the product and selected service point.

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

Make sure `checkout-data` Glue API endpoint supports service points:

- Add a product offer with service point relation to Cart.
- `POST https://glue.mysprykershop.com/checkout-data`
<details>
  <summary markdown='span'>Request body example</summary>
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

<details>
  <summary markdown='span'>Response body example</summary>
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

- Repeat the previous steps but specify not existing/not active Service Point ID, make sure you see the corresponding errors in the response.
- Repeat the previous steps but do not specify data.attributes.servicePoints.idServicePoint/data.attributes.servicePoints.items, make sure you see the corresponding errors in the response.

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure `checkout` Glue API endpoint supports service points:

- Add a product offer with service point relation to Cart.
- `POST https://glue.mysprykershop.com/checkout`
<details>
  <summary markdown='span'>Request body example</summary>
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

- Make sure the response status is 201 and the `spy_sales_order_item_service_point` database table contains a record with the selected service point.
- Repeat the previous steps but specify not existing/not active Service Point ID, make sure you see the corresponding errors in the response.
- Repeat the previous steps but do not specify data.attributes.servicePoints.idServicePoint/data.attributes.servicePoints.items, make sure you see the corresponding errors in the response.

{% endinfo_block %}

## Install feature frontend

Follow the steps below to install the {Feature Name} feature frontend.

## Set up widgets

1. Register the following plugins to enable widgets:

| PLUGIN                                      | SPECIFICATION                                               | PREREQUISITES | NAMESPACE                                       |
|---------------------------------------------|-------------------------------------------------------------|---------------|-------------------------------------------------|
| SalesServicePointNameForShipmentGroupWidget | Allow customers to display order service point information. |               | SprykerShop\Yves\SalesServicePointWidget\Widget |

**src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\SalesServicePointWidget\Widget\SalesServicePointNameForShipmentGroupWidget;
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
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the following widgets have been registered by adding the respective code snippets to a Twig template:

| WIDGET                                      | VERIFICATION                                                                                                                                                                    |
|---------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| SalesServicePointNameForShipmentGroupWidget | `{% raw %}{%{% endraw %} widget 'SalesServicePointNameForShipmentGroupWidget' args [...] only {% raw %}%}{% endraw %}{% raw %}{%{% endraw %} endwidget {% raw %}%}{% endraw %}` |

{% endinfo_block %}
