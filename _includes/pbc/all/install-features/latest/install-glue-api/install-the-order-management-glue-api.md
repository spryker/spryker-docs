

Follow the steps below to install the Glue API: Order Management feature.


## Prerequisites

To start feature integration, overview and install the following features and Glue APIs:

| NAME  | VERSION  | INSTALLATION GUIDE   |
| ---------------- | ------- | --------------------------- |
| Glue API: Spryker Core | 202507.0 | [Install the Spryker Core Glue API](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html) |
| Order Management       | 202507.0 | [Install the Order Management feature](/docs/pbc/all/order-management-system/latest/base-shop/install-and-upgrade/install-features/install-the-order-management-feature.html) |

## 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/orders-rest-api:"^4.7.0" --update-with-dependencies
```


{% info_block warningBox "Verification" %}

Make sure that the following module has been installed:

| MODULE        | EXPECTED DIRECTORY             |
| ------------ | ------------------ |
| OrdersRestApi | vendor/spryker/orders-rest-api |

{% endinfo_block %}



## 2) Set up transfer objects

Generate the transfer changes:

```bash
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have occurred:

| TRANSFER   | TYPE  | EVENT   | PATH    |
| --------------- | ---- | ------ | ------------------ |
| RestOrdersAttributesTransfer        | class | created | src/Generated/Shared/Transfer/RestOrdersAttributesTransfer   |
| RestOrderDetailsAttributesTransfer  | class | created | src/Generated/Shared/Transfer/RestOrderDetailsAttributesTransfer |
| RestOrderItemsAttributesTransfer    | class | created | src/Generated/Shared/Transfer/RestOrderItemsAttributesTransfer |
| RestOrderTotalsAttributesTransfer   | class | created | src/Generated/Shared/Transfer/RestOrderTotalsAttributesTransfer |
| RestOrderExpensesAttributesTransfer | class | created | src/Generated/Shared/Transfer/RestOrderExpensesAttributesTransfer |
| RestOrderAddressTransfer            | class | created | src/Generated/Shared/Transfer/RestOrderAddressTransfer       |
| RestOrderPaymentTransfer            | class | created | src/Generated/Shared/Transfer/RestOrderPaymentTransfer       |
| RestOrderItemMetadataTransfer       | class | created | src/Generated/Shared/Transfer/RestOrderItemMetadataTransfer  |
| RestCalculatedDiscountTransfer      | class | created | src/Generated/Shared/Transfer/RestCalculatedDiscountTransfer |
| RestOrderShipmentTransfer           | class | created | src/Generated/Shared/Transfer/RestOrderShipmentTransfer      |
| ShipmentMethodTransfer              | class | created | src/Generated/Shared/Transfer/ShipmentMethodTransfer         |
| ExpenseTransfer                     | class | created | src/Generated/Shared/Transfer/ExpenseTransfer                |
| RestUserTransfer                    | class | created | src/Generated/Shared/Transfer/RestUserTransfer               |

{% endinfo_block %}

## 3) Set up behavior: Enable resources

Activate the following plugins:

{% info_block infoBox %}

`OrdersResourceRoutePlugin` GET verb is a protected resource. For more details, see the `configure` function [Resource routing](/docs/integrations/spryker-glue-api/getting-started-with-apis/storefront-infrastructure.html).

{% endinfo_block %}


| PLUGIN  | SPECIFICATION  | PREREQUISITES | NAMESPACE  |
| -------------------- | --------------------- | ------------ | --------------- |
| OrdersResourceRoutePlugin               | Registers the `orders` resource.                             | None          | Spryker\Glue\OrdersRestApi\Plugin |
| OrderRelationshipByOrderReferencePlugin | Adds the `orders` resource as a relationship by order reference. | None          | Spryker\Glue\OrdersRestApi\Plugin |
| CustomerOrdersResourceRoutePlugin       | Adds the configuration for resource routing, mapping of HTTP methods to controller actions and defines if actions are protected. | None          | Spryker\Glue\OrdersRestApi\Plugin |


<details>
<summary>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Pyz\Glue\CheckoutRestApi\CheckoutRestApiConfig;
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\OrdersRestApi\Plugin\CustomerOrdersResourceRoutePlugin;
use Spryker\Glue\OrdersRestApi\Plugin\OrderRelationshipByOrderReferencePlugin;
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
            new CustomerOrdersResourceRoutePlugin()
        ];
    }

	/**
     * @param \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface $resourceRelationshipCollection
     *
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface
     */
    protected function getResourceRelationshipPlugins(
        ResourceRelationshipCollectionInterface $resourceRelationshipCollection
    ): ResourceRelationshipCollectionInterface {
		$resourceRelationshipCollection->addRelationship(
            CheckoutRestApiConfig::RESOURCE_CHECKOUT,
            new OrderRelationshipByOrderReferencePlugin()
        );

		return $resourceRelationshipCollection;
	}
}
```

</details>



{% info_block warningBox "Verification" %}

To verify that `OrdersResourceRoutePlugin` is set up correctly, make sure that the following endpoints are available:

- `https://glue.mysprykershop.comm/orders`
- `https://glue.mysprykershop.comm/orders/{% raw %}{{{% endraw %}order_reference{% raw %}}}{% endraw %}`

{% endinfo_block %}


{% info_block warningBox "Verification" %}

To verify that `CustomerOrdersResourceRoutePlugin` is set up correctly, make sure that the `https://glue.mysprykershop.com/customers/{% raw %}{{{% endraw %}customerId{% raw %}}}{% endraw %}/orders` endpoint is available.

{% endinfo_block %}



{% info_block warningBox "Verification" %}

To verify that `OrderRelationshipByOrderReferencePlugin` is set up correctly, make sure that the `orders` relationship is returned after sending the following request:

<details>
<summary>POST https://glue.mysprykershop.comm/checkout?include=orders</summary>

```json
{
    "data": {
        "type": "checkout",
        "id": null,
        "attributes": {
            "orderReference": "DE--2",
            "redirectUrl": null,
            "isExternalRedirect": null
        },
        "links": {
            "self": "https://glue.mysprykershop.comm/checkout?include=orders"
        },
        "relationships": {
            "orders": {
                "data": [
                    {
                        "type": "orders",
                        "id": "DE--2"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "orders",
            "id": "DE--2",
            "attributes": {
                "createdAt": "2020-03-30 05:07:22.442535",
                "currencyIsoCode": "EUR",
                "priceMode": "GROSS_MODE",
                "totals": {
                    "expenseTotal": 490,
                    "discountTotal": 0,
                    "taxTotal": 1675,
                    "subtotal": 9999,
                    "grandTotal": 10489,
                    "canceledTotal": 0
                },
                "billingAddress": {
                    "salutation": "Mr",
                    "firstName": "spencor",
                    "middleName": null,
                    "lastName": "hopkin",
                    "address1": "West road",
                    "address2": "212",
                    "address3": "",
                    "company": "Spryker",
                    "city": "Berlin",
                    "zipCode": "61000",
                    "poBox": null,
                    "phone": "+380669455897",
                    "cellPhone": null,
                    "description": null,
                    "comment": null,
                    "email": null,
                    "country": "Germany",
                    "iso2Code": "DE"
                },
                "shippingAddress": {
                    "salutation": "Mr",
                    "firstName": "spencor",
                    "middleName": null,
                    "lastName": "hopkin",
                    "address1": "West road",
                    "address2": "212",
                    "address3": "",
                    "company": "Spryker",
                    "city": "Berlin",
                    "zipCode": "61000",
                    "poBox": null,
                    "phone": "+380669455897",
                    "cellPhone": null,
                    "description": null,
                    "comment": null,
                    "email": null,
                    "country": "Germany",
                    "iso2Code": "DE"
                },
                "items": [
                    {
                        "name": "Canon IXUS 285",
                        "sku": "009_30692991",
                        "sumPrice": 9999,
                        "quantity": 1,
                        "unitGrossPrice": 9999,
                        "sumGrossPrice": 9999,
                        "taxRate": "19.00",
                        "unitNetPrice": 0,
                        "sumNetPrice": 0,
                        "unitPrice": 9999,
                        "unitTaxAmountFullAggregation": 1596,
                        "sumTaxAmountFullAggregation": 1596,
                        "refundableAmount": 9999,
                        "canceledAmount": 0,
                        "sumSubtotalAggregation": 9999,
                        "unitSubtotalAggregation": 9999,
                        "unitProductOptionPriceAggregation": 0,
                        "sumProductOptionPriceAggregation": 0,
                        "unitExpensePriceAggregation": 0,
                        "sumExpensePriceAggregation": null,
                        "unitDiscountAmountAggregation": 0,
                        "sumDiscountAmountAggregation": 0,
                        "unitDiscountAmountFullAggregation": 0,
                        "sumDiscountAmountFullAggregation": 0,
                        "unitPriceToPayAggregation": 9999,
                        "sumPriceToPayAggregation": 9999,
                        "taxRateAverageAggregation": "19.00",
                        "taxAmountAfterCancellation": null,
                        "metadata": {
                            "superAttributes": [],
                            "image": "https://images.icecat.biz/img/gallery_lows/30692991_6058401644.jpg"
                        },
                        "calculatedDiscounts": [],
                        "productOptions": []
                    }
                ],
                "expenses": [
                    {
                        "type": "SHIPMENT_EXPENSE_TYPE",
                        "name": "Standard",
                        "sumPrice": 490,
                        "unitGrossPrice": 490,
                        "sumGrossPrice": 490,
                        "taxRate": "19.00",
                        "unitNetPrice": 0,
                        "sumNetPrice": 0,
                        "canceledAmount": null,
                        "unitDiscountAmountAggregation": null,
                        "sumDiscountAmountAggregation": null,
                        "unitTaxAmount": 79,
                        "sumTaxAmount": 79,
                        "unitPriceToPayAggregation": 490,
                        "sumPriceToPayAggregation": 490,
                        "taxAmountAfterCancellation": null
                    }
                ],
                "payments": [
                    {
                        "amount": 10489,
                        "paymentProvider": "DummyPayment",
                        "paymentMethod": "Credit Card"
                    }
                ],
                "shipments": [
                    {
                        "shipmentMethodName": "Standard",
                        "carrierName": "Spryker Dummy Shipment",
                        "deliveryTime": null,
                        "defaultGrossPrice": 490,
                        "defaultNetPrice": 0,
                        "currencyIsoCode": "EUR"
                    }
                ],
                "calculatedDiscounts": []
            },
            "links": {
                "self": "https://glue.mysprykershop.comm/orders/DE--2"
            }
        }
    ]
}
```

</details>

{% endinfo_block %}
