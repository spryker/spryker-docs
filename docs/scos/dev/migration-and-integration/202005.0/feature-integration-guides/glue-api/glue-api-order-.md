---
title: Glue API- Order Management Feature Integration
originalLink: https://documentation.spryker.com/v5/docs/glue-api-order-management-feature-integration
redirect_from:
  - /v5/docs/glue-api-order-management-feature-integration
  - /v5/docs/en/glue-api-order-management-feature-integration
---

Follow the steps below to install Order Management feature API.

## Prerequisites
To start feature integration, overview and install all these necessary features:

| Name | Version | Required sub-feature |
| --- | --- | --- |
| Spryker Core | 201907.0 | [Glue Application Feature Integration](https://documentation.spryker.com/docs/en/glue-application-feature-integration-201907) |


## 1) Install the Required Modules Using Composer
Run the following command to install the required modules:

```bash
composer require spryker/orders-rest-api:"^4.3.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

 Make sure that the following module is installed:

| Module | Expected Directory |
| --- | --- |
| `OrdersRestApi` | `vendor/spryker/orders-rest-api` |

{% endinfo_block %}
   

## 2) Set Up Transfer Objects
Run the following command to generate the transfer changes:

```bash
composer transfer:generate
```

{% info_block warningBox "Verification" %}

  Make sure that the following changes have occurred:

| Transfer | Type | Event | Path |
| --- | --- | --- | --- |
| `RestOrdersAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestOrdersAttributesTransfer` |
| `RestOrderDetailsAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestOrderDetailsAttributesTransfer` |
| `RestOrderItemsAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestOrderItemsAttributesTransfer` |
| `RestOrderTotalsAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestOrderTotalsAttributesTransfer` |
| `RestOrderExpensesAttributesTransfer` | class | created | `src/Generated/Shared/Transfer/RestOrderExpensesAttributesTransfer` |
| `RestOrderAddressTransfer` | class | created | `src/Generated/Shared/Transfer/RestOrderAddressTransfer` |
| `RestOrderPaymentTransfer` | class | created | `src/Generated/Shared/Transfer/RestOrderPaymentTransfer` |
| `RestOrderItemMetadataTransfer` | class | created | `src/Generated/Shared/Transfer/RestOrderItemMetadataTransfer` |
| `RestCalculatedDiscountTransfer` | class | created | `src/Generated/Shared/Transfer/RestCalculatedDiscountTransfer` |
| `RestOrderShipmentTransfer` | class | created | `` |
| `` | class | created | `src/Generated/Shared/Transfer/RestOrderShipmentTransfer` |
| `ShipmentMethodTransfer` | class | created | `src/Generated/Shared/Transfer/ShipmentMethodTransfer` |
| `ExpenseTransfer` | class | created | `src/Generated/Shared/Transfer/ExpenseTransfer` |
| `RestUserTransfer` | class | created | `src/Generated/Shared/Transfer/RestUserTransfer` |

{% endinfo_block %}

### 3) Set Up Behavior
#### Enable resource
Activate the following plugins:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `OrdersResourceRoutePlugin` | Registers the `orders` resource. | None | `Spryker\Glue\OrdersRestApi\Plugin` |
| `OrderRelationshipByOrderReferencePlugin` | Adds the `orders` resource as a relationship by order reference. | None | `Spryker\Glue\OrdersRestApi\Plugin` |

{% info_block infoBox "Info" %}

`OrdersResourceRoutePlugin` *GET* verb is a protected resource, please reference the configure section of [Resource routing](https://documentation.spryker.com/docs/en/glue-infrastructure#resource-routing).

{% endinfo_block %}

<details open>
<summary>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>
    
```php
<?php
 
namespace Pyz\Glue\GlueApplication;

use Pyz\Glue\CheckoutRestApi\CheckoutRestApiConfig;
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
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

</br>
</details>

{% info_block warningBox "Verification" %}

To verify that `OrdersResourceRoutePlugin` is set up correctly, make sure that the following endpoints are available: 

* http://glue.mysprykershop.com/orders
* http://glue.mysprykershop.com/orders/{% raw %}{{{% endraw %}order_reference{% raw %}}}{% endraw %}

{% endinfo_block %}

{% info_block warningBox "Verification" %}

To verify that `OrderRelationshipByOrderReferencePlugin` is set up correctly, make sure that the `orders relationship is included when you request it with the `/checkout` request:

<details open>
<summary>POST http://glue.mysprykershop.com/checkout?include=orders</summary>

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
            "self": "http://glue.mysprykershop.com/checkout?include=orders"
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
                "self": "http://glue.mysprykershop.com/orders/DE--2"
            }
        }
    ]
}
```

</br>
</details>

{% endinfo_block %}
