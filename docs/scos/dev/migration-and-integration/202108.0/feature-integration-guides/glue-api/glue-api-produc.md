---
title: Glue API- Product Configuration feature integration
originalLink: https://documentation.spryker.com/2021080/docs/glue-api-product-configuration-feature-integration
redirect_from:
  - /2021080/docs/glue-api-product-configuration-feature-integration
  - /2021080/docs/en/glue-api-product-configuration-feature-integration
---

{% info_block errorBox "Beta version" %}

This is the Beta version of the feature and is therefore subject to changes.

{% endinfo_block %}


This document describes how to integrate the Product Configuration feature API into a Spryker project.

## Prerequisites

To start feature integration, overview and install the necessary features:


| NAME | VERSION | INTEGRATION GUIDE |
| --- | --- | --- |
| Spryker Core | master | [Glue API: Spryker Core feature integration](https://documentation.spryker.com/upcoming-release/docs/glue-api-spryker-core-feature-integration) |
| Product |master |[Glue API: Products feature integration](https://documentation.spryker.com/upcoming-release/docs/glue-api-products-feature-integration)|
| Cart| master| [Glue API: Cart feature integration](https://documentation.spryker.com/upcoming-release/docs/glue-api-cart-feature-integration)|
| Order Management| master |[Glue API: Order Management feature integration](https://documentation.spryker.com/docs/glue-api-order-management-feature-integration)|
|Product Configuration |master |[Product Configuration feature integration](https://documentation.spryker.com/upcoming-release/docs/product-configuration-feature-integration)|

## 1) Install the required modules using Composer

Install the required modules:
```bash
composer install spryker/product-configurations-rest-api:"^0.1.0" spryker/product-configurations-price-product-volumes-rest-api:"^0.1.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}


Ensure the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| ProductConfigurationsRestApi | vendor/spryker/product-configurations-rest-api |
|ProductConfigurationsRestApiExtension |vendor/spryker/product-configurations-rest-api-extension|
|ProductConfigurationsPriceProductVolumesRestApi |vendor/spryker/product-configurations-price-product-volumes-rest-api|

{% endinfo_block %}

## 2) Set up transfer objects

Generate transfer changes:
```bash
vendor/bin/console transfer:generate
```

{% info_block warningBox "Verification" %}


Ensure that the following changes have occurred in transfer objects:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| RestProductConfigurationInstanceAttributesTransfer | class | created | src/Generated/Shared/Transfer/RestProductConfigurationInstanceAttributesTransfer |
|RestCartItemProductConfigurationInstanceAttributesTransfer| class| created |src/Generated/Shared/Transfer/RestCartItemProductConfigurationInstanceAttributesTransfer|
|RestProductConfigurationPriceAttributesTrarnsfer |class |created |src/Generated/Shared/Transfer/RestProductConfigurationPriceAttributesTrarnsfer|
|RestProductPriceVolumesAttributesTransfer |class| added |src/Generated/Shared/Transfer/RestProductPriceVolumesAttributesTransfer|
|ConcreteProductsRestAttributesTransferr.productConfigurationInstance| property |added |src/Generated/Shared/Transfer/ConcreteProductsRestAttributesTransferr|
|RestCartItemsAttributesTransfer.productConfigurationInstance |property| added |src/Generated/Shared/Transfer/RestCartItemsAttributesTransfer|
|RestItemsAttributesTransfer.productConfigurationInstance |property |added |src/Generated/Shared/Transfer/RestItemsAttributesTransfer|
|RestOrderItemsAttributesTransfer.salesOrderItemConfiguration |property |added |src/Generated/Shared/Transfer/RestOrderItemsAttributesTransfer|

{% endinfo_block %}
## 3) Set up behavior

Set up the following behaviors.

### Enable product-concrete resource expanding plugin

Activate the following plugin:


| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductConfigurationConcreteProductsResourceExpanderPlugin | Expands the `concrete-products` resource with product configuration data. | None | Spryker\Glue\ProductConfigurationsRestApi\Plugin\ProductsRestApi |

**src/Pyz/Glue/ProductsRestApi/ProductsRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\ProductsRestApi;

use Spryker\Glue\ProductConfigurationsRestApi\Plugin\ProductsRestApi\ProductConfigurationConcreteProductsResourceExpanderPlugin;
use Spryker\Glue\ProductsRestApi\ProductsRestApiDependencyProvider as SprykerProductsRestApiDependencyProvider;

class ProductsRestApiDependencyProvider extends SprykerProductsRestApiDependencyProvider
{
    /**
     * @return \Spryker\Glue\ProductsRestApiExtension\Dependency\Plugin\ConcreteProductsResourceExpanderPluginInterface[]
     */
    protected function getConcreteProductsResourceExpanderPlugins(): array
    {
        return [
            new ProductConfigurationConcreteProductsResourceExpanderPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}


Make sure that the `https://glue.mysprykershop.com/concrete-products/{% raw %}{{{% endraw %}concrete_sku{% raw %}}}{% endraw %}` endpoint is available.

Make sure that the `concrete-products` resource is expanded with the product configuration properties. For an example, see the following response to the `GET https://glue.mysprykershop.com/concrete-products/093_24495843` request.

<details open>
    <summary>Response sample</summary>

```json
{
    "data": {
        "type": "concrete-products",
        "id": "093\_24495843",
        "attributes": {
            "sku": "093\_24495843",
            "isDiscontinued": false,
            "discontinuedNote": null,
            "averageRating": 4.2999999999999998,
            "reviewCount": "4",
            "productAbstractSku": "093",
            "name": "Sony SmartWatch 3",
            "description": "The way you like it Whatever your lifestyle SmartWatch 3 SWR50 can be made to suit it. You can choose from a range of wrist straps – formal, sophisticated, casual, vibrant colours and fitness style, all made from the finest materials. Designed to perform and impress, this smartphone watch delivers a groundbreaking combination of technology and style. Downloadable apps let you customise your SmartWatch 3 SWR50 and how you use it.         Tell SmartWatch 3 SWR50 smartphone watch what you want and it will do it. Search. Command. Find.",
            "attributes": {
                "internal\_ram": "512 MB",
                "flash\_memory": "4 GB",
                "weight": "45 g",
                "protection\_feature": "Water resistent",
                "brand": "Sony",
                "color": "Silver"
            },
            "superAttributesDefinition": \[
                "flash\_memory",
                "color"
            \],
            "metaTitle": "Sony SmartWatch 3",
            "metaKeywords": "Sony,Smart Electronics",
            "metaDescription": "The way you like it Whatever your lifestyle SmartWatch 3 SWR50 can be made to suit it. You can choose from a range of wrist straps – formal, sophisticated,",
            "attributeNames": {
                "internal\_ram": "Internal RAM",
                "flash\_memory": "Flash memory",
                "weight": "Weight",
                "protection\_feature": "Protection feature",
                "brand": "Brand",
                "color": "Color"
            },
            "productConfigurationInstance": {
                "displayData": "{\\"Preferred time of the day\\": \\"Afternoon\\", \\"Date\\": \\"9.09.2020\\"}",
                "configuration": "{\\"time\_of\_day\\": \\"2\\"}",
                "configuratorKey": "DATE\_TIME\_CONFIGURATOR",
                "isComplete": false
            }
        },
        "links": {
            "self": "https://glue.mysprykershop.com/concrete-products/093\_24495843"
        }
    }
}
```

</details>


{% endinfo_block %}
### Enable items resource expanding plugin

Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductConfigurationRestCartItemsAttributesMapperPlugin | Maps `ItemTransfer` product configuration to `RestItemsAttributesTransfer`. | None | Spryker\Glue\ProductConfigurationsRestApi\Plugin\CartsRestApi |
| ProductConfigurationCartItemExpanderPlugin |Expands cart item data with product configuration data. |None |Spryker\Glue\ProductConfigurationsRestApi\Plugin\CartsRestApi|
|ProductConfigurationVolumePriceCartItemProductConfigurationMapperPlugin| Maps product configuration volume price data to `ProductConfigurationInstanceTransfer`. |None| Spryker\Glue\ProductConfigurationsRestApi\Plugin\ProductConfigurationsRestApi|
|ProductConfigurationVolumePriceRestCartItemProductConfigurationMapperPlugin| Maps product configuration volume price data to `RestCartItemProductConfigurationInstanceAttributesTransfer`. |None |Spryker\Glue\ProductConfigurationsRestApi\Plugin\ProductConfigurationsRestApi|
|ProductConfigurationCartItemMapperPlugin | Maps `CartItemRequestTransfer.productConfigurationInstance` to according `PersistentCartChangeTransfer.item`. |None |Spryker\Zed\ProductConfigurationsRestApi\Communication\Plugin\CartsRestApi|
| CartItemProductConfigurationRestRequestValidatorPlugin |Checks if resource with provided product configuration has default product configuration defined. |None| Spryker\Glue\ProductConfigurationsRestApi\Plugin\GlueApplication|
| ProductConfigurationRestOrderItemsAttributesMapperPlugin| Maps `ItemTransfer.salesOrderItemConfiguration` to `RestOrderItemsAttributesTransfer.salesOrderItemConfiguration`. |None |Spryker\Glue\ProductConfigurationsRestApi\Plugin\OrdersRestApi|


<details open>
    <summary>src/Pyz/Glue/CartsRestApi/CartsRestApiDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\CartsRestApi;

use Spryker\Glue\CartsRestApi\CartsRestApiDependencyProvider as SprykerCartsRestApiDependencyProvider;
use Spryker\Glue\ProductConfigurationsRestApi\Plugin\CartsRestApi\ProductConfigurationCartItemExpanderPlugin;
use Spryker\Glue\ProductConfigurationsRestApi\Plugin\CartsRestApi\ProductConfigurationRestCartItemsAttributesMapperPlugin;

class CartsRestApiDependencyProvider extends SprykerCartsRestApiDependencyProvider
{
    /**
     * @return \Spryker\Glue\CartsRestApiExtension\Dependency\Plugin\RestCartItemsAttributesMapperPluginInterface[]
     */
    protected function getRestCartItemsAttributesMapperPlugins(): array
    {
        return [
            new ProductConfigurationRestCartItemsAttributesMapperPlugin(),
        ];
    }

    /**
     * @return \Spryker\Glue\CartsRestApiExtension\Dependency\Plugin\CartItemExpanderPluginInterface[]
     */
    protected function getCartItemExpanderPlugins(): array
    {
        return [
            new ProductConfigurationCartItemExpanderPlugin(),
        ];
    }
}
```

</details>

<details open>
    <summary>src/Pyz/Glue/ProductConfigurationsRestApi/ProductConfigurationsRestApiDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\ProductConfigurationsRestApi;

use Spryker\Glue\ProductConfigurationsRestApi\Plugin\ProductConfigurationsRestApi\ProductConfigurationVolumePriceCartItemProductConfigurationMapperPlugin;
use Spryker\Glue\ProductConfigurationsRestApi\Plugin\ProductConfigurationsRestApi\ProductConfigurationVolumePriceRestCartItemProductConfigurationMapperPlugin;
use Spryker\Glue\ProductConfigurationsRestApi\ProductConfigurationsRestApiDependencyProvider as SprykerProductConfigurationsRestApiDependencyProvider;

class ProductConfigurationsRestApiDependencyProvider extends SprykerProductConfigurationsRestApiDependencyProvider
{
    /**
     * @return \Spryker\Glue\ProductConfigurationsRestApiExtension\Dependency\Plugin\CartItemProductConfigurationMapperPluginInterface[]
     */
    protected function getCartItemProductConfigurationMapperPlugins(): array
    {
        return [
            new ProductConfigurationVolumePriceCartItemProductConfigurationMapperPlugin(),
        ];
    }

    /**
     * @return \Spryker\Glue\ProductConfigurationsRestApiExtension\Dependency\Plugin\RestCartItemProductConfigurationMapperPluginInterface[]
     */
    protected function getRestCartItemProductConfigurationMapperPlugins(): array
    {
        return [
            new ProductConfigurationVolumePriceRestCartItemProductConfigurationMapperPlugin(),
        ];
    }
}
```

</details>


**src/Pyz/Zed/CartsRestApi/CartsRestApiDependencyProvider.php**
```php
<?php

namespace Pyz\Zed\CartsRestApi;

use Spryker\Zed\CartsRestApi\CartsRestApiDependencyProvider as SprykerCartsRestApiDependencyProvider;
use Spryker\Zed\ProductConfigurationsRestApi\Communication\Plugin\CartsRestApi\ProductConfigurationCartItemMapperPlugin;

class CartsRestApiDependencyProvider extends SprykerCartsRestApiDependencyProvider
{
    /**
     * @return \Spryker\Zed\CartsRestApiExtension\Dependency\Plugin\CartItemMapperPluginInterface[]
     */
    protected function getCartItemMapperPlugins(): array
    {
        return [
            new ProductConfigurationCartItemMapperPlugin(),
        ];
    }
}
``` 

**src/Pyz/Glue/OrdersRestApi/OrdersRestApiDependencyProvider.php**
```php
<?php

namespace Pyz\Glue\OrdersRestApi;

use Spryker\Glue\OrdersRestApi\OrdersRestApiDependencyProvider as SprykerOrdersRestApiDependencyProvider;
use Spryker\Glue\ProductConfigurationsRestApi\Plugin\OrdersRestApi\ProductConfigurationRestOrderItemsAttributesMapperPlugin;

class OrdersRestApiDependencyProvider extends SprykerOrdersRestApiDependencyProvider
{
    /**
     * @return \Spryker\Glue\OrdersRestApiExtension\Dependency\Plugin\RestOrderItemsAttributesMapperPluginInterface[]
     */
    protected function getRestOrderItemsAttributesMapperPlugins(): array
    {
        return [
            new ProductConfigurationRestOrderItemsAttributesMapperPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}


Make sure that the `orders` resource is expanded with the product configuration properties. For an example, see the following response to the `GET https://glue.mysprykershop.com/orders/DE--2` request:

<details open>
    <summary>Response sample</summary>

```json
{
    "data": {
        "type": "orders",
        "id": "DE--2",
        "attributes": {
            "merchantReferences": [],
            "itemStates": [
                "payment pending"
            ],
            "createdAt": "2021-03-12 09:23:22.000000",
            "currencyIsoCode": "EUR",
            "priceMode": "GROSS_MODE",
            "totals": {
                "expenseTotal": 980,
                "discountTotal": 0,
                "taxTotal": 7347,
                "subtotal": 111110,
                "grandTotal": 112090,
                "canceledTotal": 0,
                "remunerationTotal": 0
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
                    "merchantReference": null,
                    "state": "payment pending",
                    "name": "Sony SmartWatch 3",
                    "sku": "093_24495843",
                    "sumPrice": 55555,
                    "quantity": 1,
                    "unitGrossPrice": 55555,
                    "sumGrossPrice": 55555,
                    "taxRate": "7.00",
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitPrice": 55555,
                    "unitTaxAmountFullAggregation": 3634,
                    "sumTaxAmountFullAggregation": 3634,
                    "refundableAmount": 55555,
                    "canceledAmount": 0,
                    "sumSubtotalAggregation": 55555,
                    "unitSubtotalAggregation": 55555,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitExpensePriceAggregation": 0,
                    "sumExpensePriceAggregation": null,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 55555,
                    "sumPriceToPayAggregation": 55555,
                    "taxRateAverageAggregation": "7.00",
                    "taxAmountAfterCancellation": null,
                    "orderReference": null,
                    "uuid": "3b0d7d32-c519-5eea-92f1-408c54113c25",
                    "isReturnable": false,
                    "idShipment": 2,
                    "bundleItemIdentifier": null,
                    "relatedBundleItemIdentifier": null,
                    "salesOrderConfiguredBundle": null,
                    "salesOrderConfiguredBundleItem": null,
                    "metadata": {
                        "superAttributes": {
                            "color": "Silver"
                        },
                        "image": "https://images.icecat.biz/img/norm/medium/24495843-7844.jpg"
                    },
                    "salesOrderItemConfiguration": {
                        "displayData": "{\"Preferred time of the day\": \"Afternoon\", \"Date\": \"9.09.2020\"}",
                        "configuration": "{\"time_of_day\": \"2\"}",
                        "configuratorKey": "DATE_TIME_CONFIGURATOR"
                    },
                    "salesUnit": null,
                    "calculatedDiscounts": [],
                    "productOptions": [],
                    "amount": null
                },
                {
                    "merchantReference": null,
                    "state": "payment pending",
                    "name": "Sony SmartWatch 3",
                    "sku": "093_24495843",
                    "sumPrice": 55555,
                    "quantity": 1,
                    "unitGrossPrice": 55555,
                    "sumGrossPrice": 55555,
                    "taxRate": "7.00",
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitPrice": 55555,
                    "unitTaxAmountFullAggregation": 3635,
                    "sumTaxAmountFullAggregation": 3635,
                    "refundableAmount": 55555,
                    "canceledAmount": 0,
                    "sumSubtotalAggregation": 55555,
                    "unitSubtotalAggregation": 55555,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitExpensePriceAggregation": 0,
                    "sumExpensePriceAggregation": null,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 55555,
                    "sumPriceToPayAggregation": 55555,
                    "taxRateAverageAggregation": "7.00",
                    "taxAmountAfterCancellation": null,
                    "orderReference": null,
                    "uuid": "b39c7e1c-12ba-53d3-8d81-5c363d5307e9",
                    "isReturnable": false,
                    "idShipment": 2,
                    "bundleItemIdentifier": null,
                    "relatedBundleItemIdentifier": null,
                    "salesOrderConfiguredBundle": null,
                    "salesOrderConfiguredBundleItem": null,
                    "metadata": {
                        "superAttributes": {
                            "color": "Silver"
                        },
                        "image": "https://images.icecat.biz/img/norm/medium/24495843-7844.jpg"
                    },
                    "salesOrderItemConfiguration": {
                        "displayData": "{\"Preferred time of the day\": \"Afternoon\", \"Date\": \"9.09.2020\"}",
                        "configuration": "{\"time_of_day\": \"2\"}",
                        "configuratorKey": "DATE_TIME_CONFIGURATOR"
                    },
                    "salesUnit": null,
                    "calculatedDiscounts": [],
                    "productOptions": [],
                    "amount": null
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
                    "unitTaxAmount": 78,
                    "sumTaxAmount": 78,
                    "unitPriceToPayAggregation": 490,
                    "sumPriceToPayAggregation": 490,
                    "taxAmountAfterCancellation": null,
                    "idShipment": 2,
                    "idSalesExpense": 2
                }
            ],
            "payments": [
                {
                    "amount": 112090,
                    "paymentProvider": "DummyPayment",
                    "paymentMethod": "invoice"
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
            "calculatedDiscounts": [],
            "bundleItems": []
        },
        "links": {
            "self": "https://glue.mysprykershop.com/orders/DE--2"
        }
    }
}
```


{% endinfo_block %}


**src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php**
```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\ProductConfigurationsRestApi\Plugin\GlueApplication\CartItemProductConfigurationRestRequestValidatorPlugin;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RestRequestValidatorPluginInterface[]
     */
    protected function getRestRequestValidatorPlugins(): array
    {
        return [
            new CartItemProductConfigurationRestRequestValidatorPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}


Make sure that the `items` resource is expanded with the product configuration properties. For an example, see the following response to the `POST https://glue.mysprykershop.com/carts/2f0a0b59-b988-5829-8fd3-6d636fc8ea33/items?include=items` request:

<details open>
    <summary>Request sample</summary>

```json
{
    "data": {
        "type": "items",
        "attributes": {
            "sku": "093_24495843",
            "quantity": 10,
            "productConfigurationInstance": {
                "displayData": "{\"Preferred time of the day\": \"Afternoon\", \"Date\": \"9.09.2020\"}",
                "configuration": "{\"time_of_day\": \"2\"}",
                "configuratorKey": "installation_appointment",
                "isComplete": false,
                "quantity": 5,
                "availableQuantity": 100,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": 23434,
                        "grossAmount": 42502,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        },
                        "volumePrices": [
                            {
                                "netAmount": 555,
                                "grossAmount": 556,
                                "quantity": 5
                            },
                            {
                                "netAmount": 666,
                                "grossAmount": 667,
                                "quantity": 10
                            },
                            {
                                "netAmount": 777,
                                "grossAmount": 778,
                                "quantity": 20
                            }
                        ]
                    }
                ]
            }
        }
    }
}
```

</details>

<details open>
    <summary>Response sample</summary>
    
```json
{
    "data": {
        "type": "carts",
        "id": "2f0a0b59-b988-5829-8fd3-6d636fc8ea33",
        "attributes": {
            "priceMode": "GROSS_MODE",
            "currency": "EUR",
            "store": "DE",
            "name": "Test 1",
            "isDefault": true,
            "totals": {
                "expenseTotal": 0,
                "discountTotal": 0,
                "taxTotal": 490,
                "subtotal": 7495,
                "grandTotal": 7495,
                "priceToPay": 7495
            },
            "discounts": []
        },
        "links": {
            "self": "http://glue.de.spryker.local/carts/2f0a0b59-b988-5829-8fd3-6d636fc8ea33"
        },
        "relationships": {
            "items": {
                "data": [
                    {
                        "type": "items",
                        "id": "093_24495843-e312a2dbb6b3828719daba16a9e34658"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "items",
            "id": "093_24495843-e312a2dbb6b3828719daba16a9e34658",
            "attributes": {
                "sku": "093_24495843",
                "quantity": 10,
                "groupKey": "093_24495843-e312a2dbb6b3828719daba16a9e34658",
                "abstractSku": "093",
                "amount": null,
                "productOfferReference": null,
                "merchantReference": null,
                "calculations": {
                    "unitPrice": 667,
                    "sumPrice": 6670,
                    "taxRate": 7,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 667,
                    "sumGrossPrice": 6670,
                    "unitTaxAmountFullAggregation": 44,
                    "sumTaxAmountFullAggregation": 436,
                    "sumSubtotalAggregation": 6670,
                    "unitSubtotalAggregation": 667,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 667,
                    "sumPriceToPayAggregation": 6670
                },
                "configuredBundle": null,
                "configuredBundleItem": null,
                "productConfigurationInstance": {
                    "displayData": "{\"Preferred time of the day\": \"Afternoon\", \"Date\": \"9.09.2020\"}",
                    "configuration": "{\"time_of_day\": \"2\"}",
                    "configuratorKey": "installation_appointment",
                    "isComplete": false,
                    "quantity": 5,
                    "availableQuantity": 100,
                    "prices": [
                        {
                            "priceTypeName": "DEFAULT",
                            "netAmount": 23434,
                            "grossAmount": 42502,
                            "volumeQuantity": null,
                            "currency": {
                                "code": "EUR",
                                "name": "Euro",
                                "symbol": "€"
                            },
                            "volumePrices": [
                                {
                                    "grossAmount": 42502,
                                    "netAmount": 23434,
                                    "quantity": 5
                                },
                                {
                                    "grossAmount": 42502,
                                    "netAmount": 23434,
                                    "quantity": 10
                                },
                                {
                                    "grossAmount": 42502,
                                    "netAmount": 23434,
                                    "quantity": 20
                                }
                            ]
                        }
                    ]
                },
                "salesUnit": null,
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/2f0a0b59-b988-5829-8fd3-6d636fc8ea33/items/093_24495843-e312a2dbb6b3828719daba16a9e34658"
            }
        }
    ]
}
```

</details>

{% endinfo_block %}

