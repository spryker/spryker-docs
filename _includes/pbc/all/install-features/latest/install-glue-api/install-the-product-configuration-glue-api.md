

This document describes how to install the [Product Configuration](/docs/pbc/all/product-information-management/latest/base-shop/feature-overviews/configurable-product-feature-overview/configurable-product-feature-overview.html) feature API.

## Install feature core

Follow the steps below to install the Product Configuration feature core.

## Prerequisites

To start feature integration, integrate the required features and Glue APIs:

| NAME                  | VERSION          | INSTALLATION GUIDE                                                                                                                                                        |
|-----------------------|------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Spryker Core API      | {{page.version}} | [Install the Spryker Core Glue API](/docs/pbc/all/miscellaneous/latest/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html)         |
| Product API           | {{page.version}} | [Install the Product Glue API](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-glue-api/install-the-product-glue-api.html)                  |
| Cart API              | {{page.version}} | [Install the Cart Glue API](/docs/pbc/all/cart-and-checkout/latest/base-shop/install-and-upgrade/install-glue-api/install-the-cart-glue-api.html)                                  |
| Wishlist API          | {{page.version}} | [Install the Wishlist Glue API](/docs/pbc/all/shopping-list-and-wishlist/latest/base-shop/install-and-upgrade/install-glue-api/install-the-wishlist-glue-api.html)                              |
| Shopping List API     | {{page.version}} | [Install the Shopping Lists Glue API](/docs/pbc/all/shopping-list-and-wishlist/latest/base-shop/install-and-upgrade/install-glue-api/install-the-shopping-lists-glue-api.html)     |
| Order Management API  | {{page.version}} | [Install the Order Management Glue API](/docs/pbc/all/order-management-system/latest/base-shop/install-and-upgrade/install-glue-api/install-the-order-management-glue-api.html) |
| Product Configuration | {{page.version}} | [Install the Product feature](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-features/install-the-product-feature.html)                   |

## 1) Install the required modules

Install the required modules using Composer:

```bash
composer install spryker/product-configurations-rest-api:"^1.0.0" spryker/product-configurations-price-product-volumes-rest-api:"^1.0.0" spryker/product-configuration-wishlists-rest-api:"^1.0.0" spryker/product-configuration-shopping-lists-rest-api:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE                                            | EXPECTED DIRECTORY                                                     |
|---------------------------------------------------|------------------------------------------------------------------------|
| ProductConfigurationsRestApi                      | vendor/spryker/product-configurations-rest-api                         |
| ProductConfigurationsPriceProductVolumesRestApi   | vendor/spryker/product-configurations-price-product-volumes-rest-api   |
| ProductConfigurationWishlistsRestApi              | vendor/spryker/product-configuration-wishlists-rest-api                |
| ProductConfigurationShoppingListsRestApi          | vendor/spryker/product-configuration-shopping-lists-rest-api           |

{% endinfo_block %}

## 2) Set up transfer objects

Generate transfers:

```bash
vendor/bin/console transfer:generate
```

{% info_block warningBox "Verification" %}

Ensure that the following changes have occurred in transfer objects:

| TRANSFER                                                           | TYPE   | EVENT    | PATH                                                                                             |
|--------------------------------------------------------------------|--------|----------|--------------------------------------------------------------------------------------------------|
| CartItemRequestTransfer                                            | class  | created  | src/Generated/Shared/Transfer/CartItemRequestTransfer                                            |
| ConcreteProductsRestAttributesTransfer                             | class  | created  | src/Generated/Shared/Transfer/ConcreteProductsRestAttributesTransfer                             |
| CurrencyTransfer                                                   | class  | created  | src/Generated/Shared/Transfer/CurrencyTransfer                                                   |
| CustomerTransfer                                                   | class  | created  | src/Generated/Shared/Transfer/CustomerTransfer                                                   |
| ItemTransfer                                                       | class  | created  | src/Generated/Shared/Transfer/ItemTransfer                                                       |
| MoneyValueTransfer                                                 | class  | created  | src/Generated/Shared/Transfer/MoneyValueTransfer                                                 |
| PersistentCartChangeTransfer                                       | class  | created  | src/Generated/Shared/Transfer/PersistentCartChangeTransfer                                       |
| PersistentItemReplaceTransfer                                      | class  | created  | src/Generated/Shared/Transfer/PersistentItemReplaceTransfer                                      |
| PriceProductTransfer                                               | class  | created  | src/Generated/Shared/Transfer/PriceProductTransfer                                               |
| PriceProductDimensionTransfer                                      | class  | created  | src/Generated/Shared/Transfer/PriceProductDimensionTransfer                                      |
| ProductConfigurationInstanceTransfer                               | class  | created  | src/Generated/Shared/Transfer/ProductConfigurationInstanceTransfer                               |
| ProductConfigurationInstanceCollectionTransfer                     | class  | created  | src/Generated/Shared/Transfer/ProductConfigurationInstanceCollectionTransfer                     |
| ProductConfigurationInstanceConditionsTransfer                     | class  | created  | src/Generated/Shared/Transfer/ProductConfigurationInstanceConditionsTransfer                     |
| ProductConfigurationInstanceCriteriaTransfer                       | class  | created  | src/Generated/Shared/Transfer/ProductConfigurationInstanceCriteriaTransfer                       |
| QuoteTransfer                                                      | class  | created  | src/Generated/Shared/Transfer/QuoteTransfer                                                      |
| QuoteErrorTransfer                                                 | class  | created  | src/Generated/Shared/Transfer/QuoteErrorTransfer                                                 |
| QuoteResponseTransfer                                              | class  | created  | src/Generated/Shared/Transfer/QuoteResponseTransfer                                              |
| RestCartItemProductConfigurationInstanceAttributesTransfer         | class  | created  | src/Generated/Shared/Transfer/RestCartItemProductConfigurationInstanceAttributesTransfer         |
| RestCartItemsAttributesTransfer                                    | class  | created  | src/Generated/Shared/Transfer/RestCartItemsAttributesTransfer                                    |
| RestCurrencyTransfer                                               | class  | created  | src/Generated/Shared/Transfer/RestCurrencyTransfer                                               |
| RestErrorCollectionTransfer                                        | class  | created  | src/Generated/Shared/Transfer/RestErrorCollectionTransfer                                        |
| RestErrorMessageTransfer                                           | class  | created  | src/Generated/Shared/Transfer/RestErrorMessageTransfer                                           |
| RestItemsAttributesTransfer                                        | class  | created  | src/Generated/Shared/Transfer/RestItemsAttributesTransfer                                        |
| RestOrderItemsAttributesTransfer                                   | class  | created  | src/Generated/Shared/Transfer/RestOrderItemsAttributesTransfer                                   |
| RestProductConfigurationInstanceAttributesTransfer                 | class  | created  | src/Generated/Shared/Transfer/RestProductConfigurationInstanceAttributesTransfer                 |
| RestProductConfigurationPriceAttributesTransfer                    | class  | created  | src/Generated/Shared/Transfer/RestProductConfigurationPriceAttributesTransfer                    |
| RestProductPriceVolumesAttributesTransfer                          | class  | created  | src/Generated/Shared/Transfer/RestProductPriceVolumesAttributesTransfer                          |
| RestSalesOrderItemProductConfigurationInstanceAttributesTransfer   | class  | created  | src/Generated/Shared/Transfer/RestSalesOrderItemProductConfigurationInstanceAttributesTransfer   |
| RestShoppingListItemProductConfigurationInstanceAttributesTransfer | class  | created  | src/Generated/Shared/Transfer/RestShoppingListItemProductConfigurationInstanceAttributesTransfer |
| RestShoppingListItemsAttributesTransfer                            | class  | created  | src/Generated/Shared/Transfer/RestShoppingListItemsAttributesTransfer                            |
| RestWishlistItemProductConfigurationInstanceAttributesTransfer     | class  | created  | src/Generated/Shared/Transfer/RestWishlistItemProductConfigurationInstanceAttributesTransfer     |
| RestWishlistItemsAttributesTransfer                                | class  | created  | src/Generated/Shared/Transfer/RestWishlistItemsAttributesTransfer                                |
| SalesOrderItemConfigurationTransfer                                | class  | created  | src/Generated/Shared/Transfer/SalesOrderItemConfigurationTransfer                                |
| ShoppingListItemTransfer                                           | class  | created  | src/Generated/Shared/Transfer/ShoppingListItemTransfer                                           |
| ShoppingListItemRequestTransfer                                    | class  | created  | src/Generated/Shared/Transfer/ShoppingListItemRequestTransfer                                    |
| WishlistItemTransfer                                               | class  | created  | src/Generated/Shared/Transfer/WishlistItemTransfer                                               |
| WishlistItemRequestTransfer                                        | class  | created  | src/Generated/Shared/Transfer/WishlistItemRequestTransfer                                        |
| WishlistItemResponseTransfer                                       | class  | created  | src/Generated/Shared/Transfer/WishlistItemResponseTransfer                                       |

{% endinfo_block %}

## 3) Set up behavior

Set up the following behaviors.

### Enable product-concrete resource expanding plugin

Activate the following plugin:

| PLUGIN                                                      | SPECIFICATION                                                              | PREREQUISITES | NAMESPACE                                                         |
|-------------------------------------------------------------|----------------------------------------------------------------------------|---------------|-------------------------------------------------------------------|
| ProductConfigurationConcreteProductsResourceExpanderPlugin  | Expands the `concrete-products` resource with product configuration data.  | None          | Spryker\Glue\ProductConfigurationsRestApi\Plugin\ProductsRestApi  |

**src/Pyz/Glue/ProductsRestApi/ProductsRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\ProductsRestApi;

use Spryker\Glue\ProductConfigurationsRestApi\Plugin\ProductsRestApi\ProductConfigurationConcreteProductsResourceExpanderPlugin;
use Spryker\Glue\ProductsRestApi\ProductsRestApiDependencyProvider as SprykerProductsRestApiDependencyProvider;

class ProductsRestApiDependencyProvider extends SprykerProductsRestApiDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\ProductsRestApiExtension\Dependency\Plugin\ConcreteProductsResourceExpanderPluginInterface>
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

<details>
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

| PLUGIN                                                                   | SPECIFICATION                                                                                                      | PREREQUISITES | NAMESPACE                                                                     |
|--------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------|---------------|-------------------------------------------------------------------------------|
| ProductConfigurationRestCartItemsAttributesMapperPlugin                  | Maps `ItemTransfer` product configuration to `RestItemsAttributesTransfer`.                                        | None          | Spryker\Glue\ProductConfigurationsRestApi\Plugin\CartsRestApi                 |
| ProductConfigurationCartItemExpanderPlugin                               | Expands cart item data with product configuration data.                                                            | None          | Spryker\Glue\ProductConfigurationsRestApi\Plugin\CartsRestApi                 |
| ProductConfigurationVolumePriceProductConfigurationPriceMapperPlugin     | Maps product configuration volume price data to `ProductConfigurationInstanceTransfer`.                            | None          | Spryker\Glue\ProductConfigurationsRestApi\Plugin\ProductConfigurationsRestApi |
| ProductConfigurationVolumePriceRestProductConfigurationPriceMapperPlugin | Maps product configuration volume price data to `RestCartItemProductConfigurationInstanceAttributesTransfer`.      | None          | Spryker\Glue\ProductConfigurationsRestApi\Plugin\ProductConfigurationsRestApi |
| ProductConfigurationCartItemMapperPlugin                                 | Maps `CartItemRequestTransfer.productConfigurationInstance` to according `PersistentCartChangeTransfer.item`.      | None          | Spryker\Zed\ProductConfigurationsRestApi\Communication\Plugin\CartsRestApi    |
| CartItemProductConfigurationRestRequestValidatorPlugin                   | Checks if resource with provided product configuration has default product configuration defined.                  | None          | Spryker\Glue\ProductConfigurationsRestApi\Plugin\GlueApplication              |
| ProductConfigurationRestOrderItemsAttributesMapperPlugin                 | Maps `ItemTransfer.salesOrderItemConfiguration` to `RestOrderItemsAttributesTransfer.salesOrderItemConfiguration`. | None          | Spryker\Glue\ProductConfigurationsRestApi\Plugin\OrdersRestApi                |

**src/Pyz/Glue/CartsRestApi/CartsRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\CartsRestApi;

use Spryker\Glue\CartsRestApi\CartsRestApiDependencyProvider as SprykerCartsRestApiDependencyProvider;
use Spryker\Glue\ProductConfigurationsRestApi\Plugin\CartsRestApi\ProductConfigurationCartItemExpanderPlugin;
use Spryker\Glue\ProductConfigurationsRestApi\Plugin\CartsRestApi\ProductConfigurationRestCartItemsAttributesMapperPlugin;

class CartsRestApiDependencyProvider extends SprykerCartsRestApiDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\CartsRestApiExtension\Dependency\Plugin\RestCartItemsAttributesMapperPluginInterface>
     */
    protected function getRestCartItemsAttributesMapperPlugins(): array
    {
        return [
            new ProductConfigurationRestCartItemsAttributesMapperPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Glue\CartsRestApiExtension\Dependency\Plugin\CartItemExpanderPluginInterface>
     */
    protected function getCartItemExpanderPlugins(): array
    {
        return [
            new ProductConfigurationCartItemExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Glue/ProductConfigurationsRestApi/ProductConfigurationsRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\ProductConfigurationsRestApi;

use Spryker\Glue\ProductConfigurationsPriceProductVolumesRestApi\Plugin\ProductConfigurationsRestApi\ProductConfigurationVolumePriceProductConfigurationPriceMapperPlugin;
use Spryker\Glue\ProductConfigurationsPriceProductVolumesRestApi\Plugin\ProductConfigurationsRestApi\ProductConfigurationVolumePriceRestProductConfigurationPriceMapperPlugin;
use Spryker\Glue\ProductConfigurationsRestApi\ProductConfigurationsRestApiDependencyProvider as SprykerProductConfigurationsRestApiDependencyProvider;

class ProductConfigurationsRestApiDependencyProvider extends SprykerProductConfigurationsRestApiDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\ProductConfigurationsRestApiExtension\Dependency\Plugin\ProductConfigurationPriceMapperPluginInterface>
     */
    protected function getProductConfigurationPriceMapperPlugins(): array
    {
        return [
            new ProductConfigurationVolumePriceProductConfigurationPriceMapperPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Glue\ProductConfigurationsRestApiExtension\Dependency\Plugin\RestProductConfigurationPriceMapperPluginInterface>
     */
    protected function getRestProductConfigurationPriceMapperPlugins(): array
    {
        return [
            new ProductConfigurationVolumePriceRestProductConfigurationPriceMapperPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/CartsRestApi/CartsRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\CartsRestApi;

use Spryker\Zed\CartsRestApi\CartsRestApiDependencyProvider as SprykerCartsRestApiDependencyProvider;
use Spryker\Zed\ProductConfigurationsRestApi\Communication\Plugin\CartsRestApi\ProductConfigurationCartItemMapperPlugin;

class CartsRestApiDependencyProvider extends SprykerCartsRestApiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\CartsRestApiExtension\Dependency\Plugin\CartItemMapperPluginInterface>
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
     * @return array<\Spryker\Glue\OrdersRestApiExtension\Dependency\Plugin\RestOrderItemsAttributesMapperPluginInterface>
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

<details>
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

</details>

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
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RestRequestValidatorPluginInterface>
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

<details>
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

<details>
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

Set up wishlist plugins:

| PLUGIN                                                                   | SPECIFICATION                                                                                                                                                                                                                                                                            | PREREQUISITES  | NAMESPACE                                                                                                |
|--------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------|----------------------------------------------------------------------------------------------------------|
| ProductConfigurationRestWishlistItemsAttributesMapperPlugin              | Concatenates product sku with product configuration instance hash, sets created reference to `RestWishlistItemsAttributesTransfer::id` and maps `WishlistItemTransfer::productConfigurationInstance` to the `RestWishlistItemsAttributes::productConfigurationInstance` transfer object. | None           | Spryker\Glue\ProductConfigurationWishlistsRestApi\Plugin\WishlistsRestApi                                |
| ProductConfigurationWishlistItemRequestMapperPlugin                      | Maps `RestWishlistItemsAttributesTransfer::productConfigurationInstance` to `WishlistItemRequestTransfer::productConfigurationInstance`.                                                                                                                                             | None           | Spryker\Glue\ProductConfigurationWishlistsRestApi\Plugin\WishlistsRestApi                                |
| ProductConfigurationVolumePriceProductConfigurationPriceMapperPlugin     | Maps product configuration volume price data to `ProductConfigurationInstanceTransfer`.                                                                                                                                                                                                  | None           | Spryker\Glue\ProductConfigurationsPriceProductVolumesRestApi\Plugin\ProductConfigurationWishlistsRestApi |
| ProductConfigurationVolumePriceRestProductConfigurationPriceMapperPlugin | Maps product configuration volume price data to `RestProductConfigurationPriceAttributesTransfer[]`.                                                                                                                                                                                     | None           | Spryker\Glue\ProductConfigurationsPriceProductVolumesRestApi\Plugin\ProductConfigurationWishlistsRestApi |
| ProductConfigurationRestWishlistItemsAttributesDeleteStrategyPlugin      | Finds an item by product sku + product configuration instance hash in the collection of the `WishlistItem` transfer objects and deletes the found wishlist item.                                                                                                                                 | None           | Spryker\Zed\ProductConfigurationWishlistsRestApi\Communication\Plugin\WishlistsRestApi                   |
| ProductConfigurationRestWishlistItemsAttributesUpdateStrategyPlugin      | Finds an item by product sku + product configuration instance hash the in the collection of the `WishlistItem` transfer objects and updates the found wishlist item.                                                                                                                                 | None           | Spryker\Zed\ProductConfigurationWishlistsRestApi\Communication\Plugin\WishlistsRestApi                   |

**src/Pyz/Glue/WishlistsRestApi/WishlistsRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\WishlistsRestApi;

use Spryker\Glue\ProductConfigurationWishlistsRestApi\Plugin\WishlistsRestApi\ProductConfigurationRestWishlistItemsAttributesMapperPlugin;
use Spryker\Glue\ProductConfigurationWishlistsRestApi\Plugin\WishlistsRestApi\ProductConfigurationWishlistItemRequestMapperPlugin;
use Spryker\Glue\WishlistsRestApi\WishlistsRestApiDependencyProvider as SprykerWishlistsRestApiDependencyProvider;

class WishlistsRestApiDependencyProvider extends SprykerWishlistsRestApiDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\WishlistsRestApiExtension\Dependency\Plugin\RestWishlistItemsAttributesMapperPluginInterface>
     */
    protected function getRestWishlistItemsAttributesMapperPlugins(): array
    {
        return [
            new ProductConfigurationRestWishlistItemsAttributesMapperPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Glue\WishlistsRestApiExtension\Dependency\Plugin\WishlistItemRequestMapperPluginInterface>
     */
    protected function getWishlistItemRequestMapperPlugins(): array
    {
        return [
            new ProductConfigurationWishlistItemRequestMapperPlugin(),
        ];
    }
}
```

**src/Pyz/Glue/ProductConfigurationWishlistsRestApi/ProductConfigurationWishlistsRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\ProductConfigurationWishlistsRestApi;

use Spryker\Glue\ProductConfigurationsPriceProductVolumesRestApi\Plugin\ProductConfigurationWishlistsRestApi\ProductConfigurationVolumePriceProductConfigurationPriceMapperPlugin;
use Spryker\Glue\ProductConfigurationsPriceProductVolumesRestApi\Plugin\ProductConfigurationWishlistsRestApi\ProductConfigurationVolumePriceRestProductConfigurationPriceMapperPlugin;
use Spryker\Glue\ProductConfigurationWishlistsRestApi\ProductConfigurationWishlistsRestApiDependencyProvider as SprykerProductConfigurationWishlistsRestApiDependencyProvider;

class ProductConfigurationWishlistsRestApiDependencyProvider extends SprykerProductConfigurationWishlistsRestApiDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\ProductConfigurationWishlistsRestApiExtension\Dependency\Plugin\ProductConfigurationPriceMapperPluginInterface>
     */
    protected function getProductConfigurationPriceMapperPlugins(): array
    {
        return [
            new ProductConfigurationVolumePriceProductConfigurationPriceMapperPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Glue\ProductConfigurationWishlistsRestApiExtension\Dependency\Plugin\RestProductConfigurationPriceMapperPluginInterface>
     */
    protected function getRestProductConfigurationPriceMapperPlugins(): array
    {
        return [
            new ProductConfigurationVolumePriceRestProductConfigurationPriceMapperPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/WishlistsRestApi/WishlistsRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\WishlistsRestApi;

use Spryker\Zed\ProductConfigurationWishlistsRestApi\Communication\Plugin\WishlistsRestApi\ProductConfigurationRestWishlistItemsAttributesDeleteStrategyPlugin;
use Spryker\Zed\ProductConfigurationWishlistsRestApi\Communication\Plugin\WishlistsRestApi\ProductConfigurationRestWishlistItemsAttributesUpdateStrategyPlugin;
use Spryker\Zed\WishlistsRestApi\WishlistsRestApiDependencyProvider as SprykerWishlistsRestApiDependencyProvider;

class WishlistsRestApiDependencyProvider extends SprykerWishlistsRestApiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\WishlistsRestApiExtension\Dependency\Plugin\RestWishlistItemsAttributesDeleteStrategyPluginInterface>
     */
    protected function getRestWishlistItemsAttributesDeleteStrategyPlugins(): array
    {
        return [
            new ProductConfigurationRestWishlistItemsAttributesDeleteStrategyPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\WishlistsRestApiExtension\Dependency\Plugin\RestWishlistItemsAttributesUpdateStrategyPluginInterface>
     */
    protected function getRestWishlistItemsAttributesUpdateStrategyPlugins(): array
    {
        return [
            new ProductConfigurationRestWishlistItemsAttributesUpdateStrategyPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Ensure that wishlist item CRUD operations support configurable products.
For an example, see the following response to the `POST https://glue.mysprykershop.com/wishlists/63b14493-021f-59c2-ae70-94041beb5c06/wishlist-items` request:

**Request sample**

```json
{
  "data": {
    "type": "wishlist-items",
    "attributes": {
      "sku": "093_24495843",
      "productConfigurationInstance": {
        "configuratorKey": "DATE_TIME_CONFIGURATOR",
        "isComplete": true,
        "displayData": "{\"Preferred time of the day\": \"Afternoon\", \"Date\": \"9.10.2021\", \"Test1\": \"9.10.2021\", \"Test2\": \"9.10.2021\"}",
        "configuration": "{\"time_of_day\": \"2\"}",
        "availableQuantity": 1
      }
    }
  }
}
```


**Response sample**

```json
{
  "data": {
    "type": "wishlist-items",
    "id": "093_24495843_08be76ee04918735abd0202456cc8e15",
    "attributes": {
      "productOfferReference": null,
      "merchantReference": "MER000001",
      "id": "093_24495843_08be76ee04918735abd0202456cc8e15",
      "sku": "093_24495843",
      "availability": null,
      "productConfigurationInstance": {
        "displayData": "{\"Preferred time of the day\": \"Afternoon\", \"Date\": \"9.10.2021\", \"Test1\": \"9.10.2021\", \"Test2\": \"9.10.2021\"}",
        "configuration": "{\"time_of_day\": \"2\"}",
        "configuratorKey": "DATE_TIME_CONFIGURATOR",
        "isComplete": true,
        "quantity": null,
        "availableQuantity": 1,
        "prices": []
      },
      "prices": []
    },
    "links": {
      "self": "https://glue.mysprykershop.com/wishlists/63b14493-021f-59c2-ae70-94041beb5c06/wishlist-items/093_24495843_08be76ee04918735abd0202456cc8e15"
    }
  }
}
```

{% endinfo_block %}

Set up the following shopping list plugins:

| PLUGIN                                                                   | SPECIFICATION                                                                                        | PREREQUISITES | NAMESPACE |
|--------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------| --- | --- |
| ProductConfigurationVolumePriceProductConfigurationPriceMapperPlugin     | Maps product configuration volume price data to `ProductConfigurationInstanceTransfer`.              | None | Spryker\Glue\ProductConfigurationsPriceProductVolumesRestApi\Plugin\ProductConfigurationsRestApi |
| ProductConfigurationVolumePriceRestProductConfigurationPriceMapperPlugin | Maps product configuration volume price data to `RestProductConfigurationPriceAttributesTransfer[]`. | None | Spryker\Glue\ProductConfigurationsPriceProductVolumesRestApi\Plugin\ProductConfigurationShoppingListsRestApi |
| ProductConfigurationRestShoppingListItemsAttributesMapperPlugin          | Maps the `ShoppingListItemTransfer` product configuration to `RestShoppingListItemsAttributesTransfer`.  | None | Spryker\Glue\ProductConfigurationShoppingListsRestApi\Plugin\ShoppingListsRestApi |
| ProductConfigurationShoppingListItemRequestMapperPlugin                  | Maps product configuration from rest attributes to shopping list item.                               | None | Spryker\Glue\ProductConfigurationShoppingListsRestApi\Plugin\ShoppingListsRestApi |

**src/Pyz/Glue/ProductConfigurationShoppingListsRestApi/ProductConfigurationShoppingListsRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\ProductConfigurationShoppingListsRestApi;

use Spryker\Glue\ProductConfigurationShoppingListsRestApi\ProductConfigurationShoppingListsRestApiDependencyProvider as SprykerProductConfigurationShoppingListsRestApiDependencyProvider;
use Spryker\Glue\ProductConfigurationsPriceProductVolumesRestApi\Plugin\ProductConfigurationShoppingListsRestApi\ProductConfigurationVolumePriceProductConfigurationPriceMapperPlugin;
use Spryker\Glue\ProductConfigurationsPriceProductVolumesRestApi\Plugin\ProductConfigurationShoppingListsRestApi\ProductConfigurationVolumePriceRestProductConfigurationPriceMapperPlugin;

class ProductConfigurationShoppingListsRestApiDependencyProvider extends SprykerProductConfigurationShoppingListsRestApiDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\ProductConfigurationShoppingListsRestApiExtension\Dependency\Plugin\ProductConfigurationPriceMapperPluginInterface>
     */
    protected function getProductConfigurationPriceMapperPlugins(): array
    {
        return [
            new ProductConfigurationVolumePriceProductConfigurationPriceMapperPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Glue\ProductConfigurationShoppingListsRestApiExtension\Dependency\Plugin\RestProductConfigurationPriceMapperPluginInterface>
     */
    protected function getRestProductConfigurationPriceMapperPlugins(): array
    {
        return [
            new ProductConfigurationVolumePriceRestProductConfigurationPriceMapperPlugin(),
        ];
    }
}

```

**src/Pyz/Glue/ShoppingListsRestApi/ShoppingListsRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\ShoppingListsRestApi;

use Spryker\Glue\ProductConfigurationShoppingListsRestApi\Plugin\ShoppingListsRestApi\ProductConfigurationRestShoppingListItemsAttributesMapperPlugin;
use Spryker\Glue\ProductConfigurationShoppingListsRestApi\Plugin\ShoppingListsRestApi\ProductConfigurationShoppingListItemRequestMapperPlugin;
use Spryker\Glue\ShoppingListsRestApi\ShoppingListsRestApiDependencyProvider as SprykerShoppingListsRestApiDependencyProvider;

class ShoppingListsRestApiDependencyProvider extends SprykerShoppingListsRestApiDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\ShoppingListsRestApiExtension\Dependency\Plugin\RestShoppingListItemsAttributesMapperPluginInterface>
     */
    protected function getRestShoppingListItemsAttributesMapperPlugins(): array
    {
        return [
            new ProductConfigurationRestShoppingListItemsAttributesMapperPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Glue\ShoppingListsRestApiExtension\Dependency\Plugin\ShoppingListItemRequestMapperPluginInterface>
     */
    protected function getShoppingListItemRequestMapperPlugins(): array
    {
        return [
            new ProductConfigurationShoppingListItemRequestMapperPlugin(),
        ];
    }
}

```

{% info_block warningBox "Verification" %}

Ensure that shopping list item CRUD operations support configurable products.
For an example, see the following response to the `POST https://glue.mysprykershop.com/shopping-lists/63b14493-021f-59c2-ae70-94041beb5c06/shopping-list-items` request:

**Request sample**

```json
{
  "data": {
    "type": "shopping-list-items",
    "attributes": {
      "sku": "093_24495843",
      "quantity": 1,
      "productConfigurationInstance": {
        "configuratorKey": "DATE_TIME_CONFIGURATOR",
        "isComplete": true,
        "displayData": "{\"Preferred time of the day\": \"Afternoon\", \"Date\": \"9.10.2021\", \"Test1\": \"9.10.2021\", \"Test2\": \"9.10.2021\"}",
        "configuration": "{\"time_of_day\": \"2\"}",
        "availableQuantity": 1
      }
    }
  }
}
```

**Response sample**

```json
{
  "data": {
    "type": "shopping-list-items",
    "id": "63b14493-021f-59c2-ae70-94041beb5c04",
    "attributes": {
      "productOfferReference": null,
      "merchantReference": "MER000001",
      "sku": "093_24495843",
      "quantity": 1,
      "productConfigurationInstance": {
        "displayData": "{\"Preferred time of the day\": \"Afternoon\", \"Date\": \"9.10.2021\", \"Test1\": \"9.10.2021\", \"Test2\": \"9.10.2021\"}",
        "configuration": "{\"time_of_day\": \"2\"}",
        "configuratorKey": "DATE_TIME_CONFIGURATOR",
        "isComplete": true,
        "quantity": null,
        "availableQuantity": 1,
        "prices": []
      },
      "prices": []
    },
    "links": {
      "self": "https://glue.mysprykershop.com/shopping-lists/63b14493-021f-59c2-ae70-94041beb5c06/shopping-list-items/63b14493-021f-59c2-ae70-94041beb5c04"
    }
  }
}
```

{% endinfo_block %}
