---
title: Order History API Feature Integration
originalLink: https://documentation.spryker.com/v3/docs/order-history-api-feature-integration-201907
redirect_from:
  - /v3/docs/order-history-api-feature-integration-201907
  - /v3/docs/en/order-history-api-feature-integration-201907
---

{% info_block errorBox %}
The following Feature Integration Guide expects the basic feature to be in place. The current Feature Integration Guide only adds the **Orders Rest API** functionality.
{% endinfo_block %}

## Install Feature API
### Prerequisites
To start feature integration, overview and install all these necessary features:

| Name | Version | Required sub-feature |
| --- | --- | --- |
| Spryker Core | 201907.0 | [Glue Application Feature Integration](/docs/scos/dev/migration-and-integration/201907.0/feature-integration-guides/glue-api/glue-applicatio) |
| Order Management | 201907.0 |  |
| Customer Account Management | 201907.0 | [Customer Account Management Feature Integration](/docs/scos/dev/migration-and-integration/201907.0/feature-integration-guides/customer-accoun) |

### 1) Install the Required Modules Using Composer
Run the following command to install the required modules:

```bash
composer require spryker/orders-rest-api:"^3.0.0" --update-with-dependencies
```

<section contenteditable="false" class="warningBox"><div class="content">
    Make sure that the following module is installed:

| Module | Expected Directory |
| --- | --- |
| `OrdersRestApi` | `vendor/spryker/orders-rest-api` |
</div></section>

### 2) Set Up Transfer Objects
Run the following command to generate the transfer changes:

```bash
composer transfer:generate
```

<section contenteditable="false" class="errorBox"><div class="content">
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
</div></section>

### 3) Set Up Behavior
#### Enable resource
Activate the following plugin:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `OrdersResourceRoutePlugin` | Registers the `orders` resource. | None | `Spryker\Glue\OrdersRestApi\Plugin` |
| `OrderRelationshipByOrderReferencePlugin` | Adds the `orders` resource as a relationship by order reference. | None | `Spryker\Glue\OrdersRestApi\Plugin` |

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

{% info_block warningBox %}
To verify that `OrdersResourceRoutePlugin` is set up correctly, make sure that the following endpoints are available:<ul><li>http://glue.mysprykershop.com/orders</li><li>http://glue.mysprykershop.com/orders/{% raw %}{{{% endraw %}order_reference{% raw %}}}{% endraw %}</li></ul>
{% endinfo_block %}

@(Warning)(To verify that `OrderRelationshipByOrderReferencePlugin` is set up correctly, make sure that the `orders relationship is included when you request it with the `/checkout` request:)

<details open>
<summary>POST http://glue.mysprykershop.com/checkout?include=orders</summary>

```json
{
    "data": {
        "type": "checkout",
        "id": null,
        "attributes": {
            "orderReference": "DE--3"
        },
        "links": {
            "self": "http://glue.mysprykershop.com/checkout"
        },
        "relationships": {
            "orders": {
                "data": [
                    {
                        "type": "orders",
                        "id": "DE--3"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "orders",
            "id": "DE--3",
            "attributes": {
                "createdAt": "2018-12-14 08:00:34.775623",
                "totals": {
                    "expenseTotal": 490,
                    "discountTotal": 10489,
                    "taxTotal": 14368,
                    "subtotal": 99990,
                    "grandTotal": 89991,
                    "canceledTotal": 0
                },
                "currencyIsoCode": "EUR",
                "items": [
                    {
                        "name": "Canon IXUS 285",
                        "sku": "009_30692991",
                        "sumPrice": 99990,
                        "sumPriceToPayAggregation": 89991,
                        "quantity": 10,
                        "metadata": {
                            "superAttributes": [],
                            "image": "//images.icecat.biz/img/gallery_mediums/30692991_9278.jpg"
                        },
                        "calculatedDiscounts": [
                            {
                                "unitAmount": 1000,
                                "sumAmount": 9999,
                                "displayName": "10% Discount for all orders above",
                                "description": "Get a 10% discount on all orders above certain value depending on the currency and net/gross price. This discount is not exclusive and can be combined with other discounts.",
                                "voucherCode": null,
                                "quantity": 10
                            }
                        ],
                        "unitGrossPrice": 9999,
                        "sumGrossPrice": 99990,
                        "taxRate": "19.00",
                        "unitNetPrice": 0,
                        "sumNetPrice": 0,
                        "unitPrice": 9999,
                        "unitTaxAmountFullAggregation": 1437,
                        "sumTaxAmountFullAggregation": 14368,
                        "refundableAmount": 89991,
                        "canceledAmount": 0,
                        "sumSubtotalAggregation": 99990,
                        "unitSubtotalAggregation": 9999,
                        "unitProductOptionPriceAggregation": 0,
                        "sumProductOptionPriceAggregation": 0,
                        "unitExpensePriceAggregation": 0,
                        "sumExpensePriceAggregation": null,
                        "unitDiscountAmountAggregation": 1000,
                        "sumDiscountAmountAggregation": 9999,
                        "unitDiscountAmountFullAggregation": 1000,
                        "sumDiscountAmountFullAggregation": 9999,
                        "unitPriceToPayAggregation": 8999,
                        "taxRateAverageAggregation": "19.00",
                        "taxAmountAfterCancellation": null
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
                        "unitTaxAmount": 0,
                        "sumTaxAmount": 0,
                        "unitPriceToPayAggregation": 0,
                        "sumPriceToPayAggregation": 0,
                        "taxAmountAfterCancellation": null
                    }
                ],
                "billingAddress": {
                    "salutation": "Mr",
                    "firstName": "Spencor",
                    "middleName": null,
                    "lastName": "Hopkin",
                    "address1": "Julie-Wolfthorn-Straße",
                    "address2": "1",
                    "address3": "new one",
                    "company": "spryker",
                    "city": "Berlin",
                    "zipCode": "10115",
                    "poBox": null,
                    "phone": "+49 (30) 2084 98350",
                    "cellPhone": null,
                    "description": null,
                    "comment": null,
                    "email": null,
                    "country": "Germany",
                    "iso2Code": "DE"
                },
                "shippingAddress": {
                    "salutation": "Mr",
                    "firstName": "Spencor",
                    "middleName": null,
                    "lastName": "Hopkin",
                    "address1": "Julie-Wolfthorn-Straße",
                    "address2": "1",
                    "address3": "new one",
                    "company": "spryker",
                    "city": "Berlin",
                    "zipCode": "10115",
                    "poBox": null,
                    "phone": "+49 (30) 2084 98350",
                    "cellPhone": null,
                    "description": null,
                    "comment": null,
                    "email": null,
                    "country": "Germany",
                    "iso2Code": "DE"
                },
                "priceMode": "GROSS_MODE",
                "payments": [
                    {
                        "amount": 89991,
                        "paymentProvider": "DummyPayment",
                        "paymentMethod": "invoice"
                    }
                ],
                "calculatedDiscounts": [
                    {
                        "unitAmount": 490,
                        "sumAmount": 490,
                        "displayName": "Free standard delivery",
                        "description": "Free standard delivery for all orders above certain value depending on the currency and net/gross price. This discount is not exclusive and can be combined with other discounts.",
                        "voucherCode": null,
                        "quantity": 1
                    },
                    {
                        "unitAmount": 1000,
                        "sumAmount": 9999,
                        "displayName": "10% Discount for all orders above",
                        "description": "Get a 10% discount on all orders above certain value depending on the currency and net/gross price. This discount is not exclusive and can be combined with other discounts.",
                        "voucherCode": null,
                        "quantity": 10
                    }
                ]
            },
            "links": {
                "self": "http://glue.mysprykershop.com/orders/DE--3"
            }
        }
    ]
}
```

</br>
</details>

<!-- Last review date: Jul 18, 2019 by Oleh Hladchenko, Volodymyr Volkov-->
