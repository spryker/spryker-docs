

Follow the steps below to install Measurement units feature API.

## Prerequisites

To start the feature integration, overview and install the necessary features:

| NAME | VERSION | LINK |
| --- | --- | --- |
| Spryker Core | {{page.version}} | [Install the Spryker Core Glue API](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html)  |
| Product Measurement Units | {{page.version}} | [Install the Product Measurement Units feature](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-measurement-units-feature.html) |

## 1)  Install the required modules using Composer

Run the following command to install the required modules:

```bash
composer require spryker/product-measurement-units-rest-api:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| ProductMeasurementUnitsRestApi | vendor/spryker/product-measurement-units-rest-api |

{% endinfo_block %}


## 2) Set up database schema and transfer objects

Run the following command to generate the transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that `SpyProductMeasurementUnitStorage` and `SpyProductConcreteStorage` have been extended with synchronization behavior, namely with the methods:

| ENTITY | TYPE | EVENT | PATH | METHODS |
| --- | --- | --- | --- | --- |
| SpyProductMeasurementUnitStorage | class | extended | src/Orm/Zed/ProductMeasurementUnitStorage/Persistence/Base/SpyProductMeasurementUnitStorage | syncPublishedMessageForMappings(), syncUnpublishedMessageForMappings() |
| SpyProductConcreteStorage | class | extended | src/Orm/Zed/ProductStorage/Persistence/Base/SpyProductConcreteStorage | syncPublishedMessageForMappings(), syncUnpublishedMessageForMappings() |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that the following changes have occurred:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| RestProductMeasurementUnitsAttributesTransfer | class | created | src/Generated/Shared/Transfer/RestProductMeasurementUnitsAttributesTransfer |
| RestSalesUnitsAttributesTransfer | class | created | src/Generated/Shared/Transfer/RestSalesUnitsAttributesTransfer |
| RestCartItemsSalesUnitAttributesTransfer | class | created | src/Generated/Shared/Transfer/RestCartItemsSalesUnitAttributesTransfer |
| RestOrdersProductMeasurementUnitsAttributesTransfer | class | created | src/Generated/Shared/Transfer/RestOrdersProductMeasurementUnitsAttributesTransfer |
| RestOrdersSalesUnitAttributesTransfer | class | created | src/Generated/Shared/Transfer/RestOrdersSalesUnitAttributesTransfer |
| RestCartItemsAttributesTransfer.salesUnit | property | added | src/Generated/Shared/Transfer/RestCartItemsAttributesTransfer |
| RestItemsAttributesTransfer.salesUnit | property | added | src/Generated/Shared/Transfer/RestItemsAttributesTransfer |
| RestItemsAttributesTransfer.sku | property | added | src/Generated/Shared/Transfer/RestItemsAttributesTransfer |
| RestOrderItemsAttributesTransfer.salesUnit | property | added | src/Generated/Shared/Transfer/RestOrderItemsAttributesTransfer |

{% endinfo_block %}


## 3) Set up behavior

Set up the following behaviors.

### Re-export data to storage

Run the following commands to reload abstract and concrete product data to the Storage:

```bash
console event:trigger -r product_measurement_unit
console event:trigger -r product_concrete
```

{% info_block warningBox "Verification" %}

Make sure that the following Redis keys exist and there is data in them:

* `kv:product_measurement_unit:code:{% raw %}{{{% endraw %}product_measurement_unit_code{% raw %}}}{% endraw %}`
* `kv:product_concrete:{% raw %}{{{% endraw %}locale_name{% raw %}}}{% endraw %}:sku:{% raw %}{{{% endraw %}sku_product_concrete{% raw %}}}{% endraw %}`

{% endinfo_block %}

### Enable resources and relationships

Activate the following plugins:


| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductMeasurementUnitsResourceRoutePlugin | Registers the `product-measurement-units` resource. | None | Spryker\Glue\ProductMeasurementUnitsApi\Plugin |
| SalesUnitsResourceRoutePlugin | Registers the `sales-units` resource. | None | Spryker\Glue\ProductMeasurementUnitsApi\Plugin |
| ProductMeasurementUnitsByProductConcreteResourceRelationshipPlugin | Adds the `product-measurement-units` resource as a relationship of the `product-concrete` resource. | None | Spryker\Glue\ProductMeasurementUnitsApi\Plugin\GlueApplication |
| SalesUnitsByProductConcreteResourceRelationshipPlugin | Adds the `sales-units` resource as a relationship of the `product-concrete` resource. | None | Spryker\Glue\ProductMeasurementUnitsApi\Plugin\GlueApplication |
| ProductMeasurementUnitsBySalesUnitResourceRelationshipPlugin | Adds  the `product-measurement-units` resource as a relationship of the `sales-units` resource. | None | Spryker\Glue\ProductMeasurementUnitsApi\Plugin\GlueApplication |
| SalesUnitsByCartItemResourceRelationshipPlugin | Adds the `sales-units` resource as relationship of the `item` resource. | None | Spryker\Glue\ProductMeasurementUnitsApi\Plugin\GlueApplication |


<details>
<summary>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\CartsRestApi\CartsRestApiConfig;
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\ProductMeasurementUnitsRestApi\Plugin\GlueApplication\ProductMeasurementUnitsByProductConcreteResourceRelationshipPlugin;
use Spryker\Glue\ProductMeasurementUnitsRestApi\Plugin\GlueApplication\ProductMeasurementUnitsBySalesUnitResourceRelationshipPlugin;
use Spryker\Glue\ProductMeasurementUnitsRestApi\Plugin\GlueApplication\ProductMeasurementUnitsResourceRoutePlugin;
use Spryker\Glue\ProductMeasurementUnitsRestApi\Plugin\GlueApplication\SalesUnitsByCartItemResourceRelationshipPlugin;
use Spryker\Glue\ProductMeasurementUnitsRestApi\Plugin\GlueApplication\SalesUnitsByProductConcreteResourceRelationshipPlugin;
use Spryker\Glue\ProductMeasurementUnitsRestApi\Plugin\GlueApplication\SalesUnitsResourceRoutePlugin;
use Spryker\Glue\ProductMeasurementUnitsRestApi\ProductMeasurementUnitsRestApiConfig;
use Spryker\Glue\ProductsRestApi\ProductsRestApiConfig;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            new ProductMeasurementUnitsResourceRoutePlugin(),
            new SalesUnitsResourceRoutePlugin(),
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
            ProductsRestApiConfig::RESOURCE_CONCRETE_PRODUCTS,
            new ProductMeasurementUnitsByProductConcreteResourceRelationshipPlugin()
        );
        $resourceRelationshipCollection->addRelationship(
            ProductsRestApiConfig::RESOURCE_CONCRETE_PRODUCTS,
            new SalesUnitsByProductConcreteResourceRelationshipPlugin()
        );
        $resourceRelationshipCollection->addRelationship(
            ProductMeasurementUnitsRestApiConfig::RESOURCE_SALES_UNITS,
            new ProductMeasurementUnitsBySalesUnitResourceRelationshipPlugin()
        );
        $resourceRelationshipCollection->addRelationship(
            CartsRestApiConfig::RESOURCE_CART_ITEMS,
            new SalesUnitsByCartItemResourceRelationshipPlugin()
        );
        $resourceRelationshipCollection->addRelationship(
            CartsRestApiConfig::RESOURCE_GUEST_CARTS_ITEMS,
            new SalesUnitsByCartItemResourceRelationshipPlugin()
        );

        return $resourceRelationshipCollection;
    }
}
```
</details>


{% info_block warningBox "Verification" %}

Make sure that the `ProductMeasurementUnitsResourceRoutePlugin` plugin is set up:
1. Send the request `GET https://glue.mysprykershop.com/product-measurement-units/{% raw %}{{{% endraw %}product_measurement_unit_code{% raw %}}}{% endraw %}`.

2. You should get a valid response, similar to the following:

```json
{
    "data": {
        "type": "product-measurement-units",
        "id": "METR",
        "attributes": {
            "name": "Meter",
            "defaultPrecision": 100
        },
        "links": {
            "self": "https://glue.mysprykershop.com/product-measurement-units/METR"
        }
    }
}
```
{% endinfo_block %}



{% info_block warningBox "Verification" %}

Make sure that the `SalesUnitsResourceRoutePlugin` and `ProductMeasurementUnitsBySalesUnitResourceRelationshipPlugin` plugins are set up:
1. Send the request `GET https://glue.mysprykershop.com/concrete-products/{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}/sales-units?include=product-measurement-units`.

2. You should get a valid response, similar to the following:

<details>
<summary>Response sample</summary>

```json
{
    "data": [
        {
            "type": "sales-units",
            "id": "5",
            "attributes": {
                "conversion": 0.30480000000000002,
                "precision": 100,
                "isDisplayed": true,
                "isDefault": true,
                "productMeasurementUnitCode": "FOOT"
            },
            "links": {
                "self": "http://glue.de.suite-nonsplit.local/concrete-products/215_124/sales-units/5"
            },
            "relationships": {
                "product-measurement-units": {
                    "data": [
                        {
                            "type": "product-measurement-units",
                            "id": "FOOT"
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "http://glue.de.suite-nonsplit.local/concrete-products/215_124/sales-units?include=product-measurement-units&amp;XDEBUG_SESSION_START=PHPHSTORM"
    },
    "included": [
        {
            "type": "product-measurement-units",
            "id": "FOOT",
            "attributes": {
                "name": "Foot",
                "defaultPrecision": 100
            },
            "links": {
                "self": "http://glue.de.suite-nonsplit.local/product-measurement-units/FOOT"
            }
        }
    ]
}
```
</details>

{% endinfo_block %}


{% info_block warningBox "Verification" %}

Make sure that the `ProductMeasurementUnitsByProductConcreteResourceRelationshipPlugin` and `SalesUnitsByProductConcreteResourceRelationshipPlugin` relationship plugins are set up:
1. Send the request `GET https://glue.mysprykershop.com/concrete-products/{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}?include=product-measurement-units,sales-units`.

2. You should get a valid response, similar to the following:

<details>
<summary>Response sample</summary>

```json
{
    "data": {
        "type": "concrete-products",
        "id": "215_123",
        "attributes": {
            "sku": "215_123",
            "isDiscontinued": false,
            "discontinuedNote": null,
            "averageRating": null,
            "reviewCount": 0,
            "name": "ASUS HDMI-HDMI Black",
            "description": "HDMI to HDMI High Speed Cable",
            "attributes": {
                "brand": "ASUS",
                "color": "Black",
                "packaging_unit": "Item"
            },
            "superAttributesDefinition": [
                "color",
                "packaging_unit"
            ],
            "metaTitle": "Asus HDMI - HDMI",
            "metaKeywords": "Asus, Cable, HDMI",
            "metaDescription": "The perfect cable for your home",
            "attributeNames": {
                "brand": "Brand",
                "color": "Color",
                "packaging_unit": "Packaging unit"
            }
        },
        "links": {
            "self": "https://glue.mysprykershop.com/concrete-products/215_123?include=product-measurement-units,sales-units"
        },
        "relationships": {
            "product-measurement-units": {
                "data": [
                    {
                        "type": "product-measurement-units",
                        "id": "METR"
                    }
                ]
            },
            "sales-units": {
                "data": [
                    {
                        "type": "sales-units",
                        "id": "1"
                    },
                    {
                        "type": "sales-units",
                        "id": "2"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "product-measurement-units",
            "id": "METR",
            "attributes": {
                "name": "Meter",
                "defaultPrecision": 100
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-measurement-units/METR"
            }
        },
        {
            "type": "sales-units",
            "id": "1",
            "attributes": {
                "conversion": 1,
                "precision": 100,
                "isDisplayed": true,
                "isDefault": true,
                "productMeasurementUnitCode": "METR"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/215_123/sales-units/1"
            },
            "relationships": {
                "product-measurement-units": {
                    "data": [
                        {
                            "type": "product-measurement-units",
                            "id": "METR"
                        }
                    ]
                }
            }
        },
        {
            "type": "product-measurement-units",
            "id": "CMET",
            "attributes": {
                "name": "Centimeter",
                "defaultPrecision": 10
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-measurement-units/CMET"
            }
        },
        {
            "type": "sales-units",
            "id": "2",
            "attributes": {
                "conversion": 0.01,
                "precision": 10,
                "isDisplayed": true,
                "isDefault": false,
                "productMeasurementUnitCode": "CMET"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/215_123/sales-units/2"
            },
            "relationships": {
                "product-measurement-units": {
                    "data": [
                        {
                            "type": "product-measurement-units",
                            "id": "CMET"
                        }
                    ]
                }
            }
        }
    ]
}
```
</details>

{% endinfo_block %}


{% info_block warningBox "Verification" %}

Make sure that the `SalesUnitsByCartItemResourceRelationshipPlugin` relationship plugin is set up:
1. Send the request `GET https://glue.mysprykershop.com/carts/{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}?include=items,sales-units`.

2. You should get a valid response, similar to the following:

<details>
<summary>Response sample</summary>

```json
{
    "data": {
        "type": "carts",
        "id": "1ce91011-8d60-59ef-9fe0-4493ef3628b2",
        "attributes": {
            "priceMode": "GROSS_MODE",
            "currency": "EUR",
            "store": "DE",
            "name": "My Cart",
            "isDefault": true,
            "totals": {
                "expenseTotal": 0,
                "discountTotal": 0,
                "taxTotal": 798,
                "subtotal": 5000,
                "grandTotal": 5000
            },
            "discounts": []
        },
        "links": {
            "self": "https://glue.mysprykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2?include=items,sales-units"
        },
        "relationships": {
            "items": {
                "data": [
                    {
                        "type": "items",
                        "id": "215_124_quantity_sales_unit_id_4_amount_5_sales_unit_id_4"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "sales-units",
            "id": "4",
            "attributes": {
                "conversion": 0.01,
                "precision": 1,
                "isDisplayed": true,
                "isDefault": false,
                "productMeasurementUnitCode": "CMET"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/concrete-products/215_124/sales-units/4"
            }
        },
        {
            "type": "items",
            "id": "215_124_quantity_sales_unit_id_4_amount_5_sales_unit_id_4",
            "attributes": {
                "sku": "215_124",
                "quantity": 4,
                "groupKey": "215_124_quantity_sales_unit_id_4_amount_5_sales_unit_id_4",
                "abstractSku": "215",
                "amount": "20",
                "calculations": {
                    "unitPrice": 1250,
                    "sumPrice": 5000,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 1250,
                    "sumGrossPrice": 5000,
                    "unitTaxAmountFullAggregation": 200,
                    "sumTaxAmountFullAggregation": 798,
                    "sumSubtotalAggregation": 5000,
                    "unitSubtotalAggregation": 1250,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 0,
                    "sumDiscountAmountAggregation": 0,
                    "unitDiscountAmountFullAggregation": 0,
                    "sumDiscountAmountFullAggregation": 0,
                    "unitPriceToPayAggregation": 1250,
                    "sumPriceToPayAggregation": 5000
                },
                "salesUnit": {
                    "id": 4,
                    "amount": "20"
                },
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2/items/215_124_quantity_sales_unit_id_4_amount_5_sales_unit_id_4"
            },
            "relationships": {
                "sales-units": {
                    "data": [
                        {
                            "type": "sales-units",
                            "id": "4"
                        }
                    ]
                }
            }
        }
    ]
}
```
</details>

{% endinfo_block %}

### Provide dependencies for the CartsRestApi module

Activate the following plugins:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| SalesUnitsRestCartItemsAttributesMapperPlugin | Maps `ItemTransfer::$amountSalesUnit` to `RestItemsAttributesTransfer::$salesUnit`. | None | Spryker\Glue\ProductMeasurementUnitsApi\Plugin\CartsRestApi |
| SalesUnitCartItemExpanderPlugin | Expands `CartItemRequestTransfer` with `amount` and `idProductMeasurementSalesUnit`. | None | Spryker\Glue\ProductMeasurementUnitsApi\Plugin\CartsRestApi |
| SalesUnitCartItemMapperPlugin | Maps `CartItemRequestTransfer::$idProductMeasurementSalesUnit`, `CartItemRequestTransfer::$amount` to `PersistentCartChangeTransfer::$items`. | None | Spryker\Zed\ProductMeasurementUnitsRestApi\Communication\Plugin\CartsRestApi |


**src/Pyz/Glue/CartsRestApi/CartsRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\CartsRestApi;

use Spryker\Glue\CartsRestApi\CartsRestApiDependencyProvider as SprykerCartsRestApiDependencyProvider;
use Spryker\Glue\ProductMeasurementUnitsRestApi\Plugin\CartsRestApi\SalesUnitCartItemExpanderPlugin;
use Spryker\Glue\ProductMeasurementUnitsRestApi\Plugin\CartsRestApi\SalesUnitsRestCartItemsAttributesMapperPlugin;

class CartsRestApiDependencyProvider extends SprykerCartsRestApiDependencyProvider
{
    /**
     * @return \Spryker\Glue\CartsRestApiExtension\Dependency\Plugin\RestCartItemsAttributesMapperPluginInterface[]
     */
    protected function getRestCartItemsAttributesMapperPlugins(): array
    {
        return [
            new SalesUnitsRestCartItemsAttributesMapperPlugin(),
        ];
    }

    /**
     * @return \Spryker\Glue\CartsRestApiExtension\Dependency\Plugin\CartItemExpanderPluginInterface[]
     */
    protected function getCartItemExpanderPlugins(): array
    {
        return [
            new SalesUnitCartItemExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/CartsRestApi/CartsRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\CartsRestApi;

use Spryker\Zed\CartsRestApi\CartsRestApiDependencyProvider as SprykerCartsRestApiDependencyProvider;
use Spryker\Zed\ProductMeasurementUnitsRestApi\Communication\Plugin\CartsRestApi\SalesUnitCartItemMapperPlugin;

class CartsRestApiDependencyProvider extends SprykerCartsRestApiDependencyProvider
{
    /**
     * @return \Spryker\Zed\CartsRestApiExtension\Dependency\Plugin\CartItemMapperPluginInterface[]
     */
    protected function getCartItemMapperPlugins(): array
    {
        return [
            new SalesUnitCartItemMapperPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Make sure that the plugins have been set up:
1. Send the request `POST https://glue.mysprykershop.com/carts/{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}/items`  with the request body:

```json
{
    "data": {
        "type": "items",
        "attributes": {
            "sku": "{% raw %}{{{% endraw %}concrete_sku{% raw %}}}{% endraw %}",
            "quantity": {% raw %}{{{% endraw %}quantity{% raw %}}}{% endraw %},
            "salesUnit": {
            	"id": {% raw %}{{{% endraw %}sales_unit_id{% raw %}}}{% endraw %},
                "amount": {% raw %}{{{% endraw %}amount{% raw %}}}{% endraw %}
            }
        }
    }
}
```

2. Send the request `GET https://glue.mysprykershop.com/carts?include=items` and make sure that the following attributes are included:
    * `salesUnits.id`
    * `salesUnits.amount`


{% endinfo_block %}

### Provide dependencies for the OrdersRestApi module

Activate the following plugin:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| SalesUnitRestOrderItemsAttributesMapperPlugin | Maps `ItemTransfer::$amountSalesUnit` to `RestOrderItemsAttributesTransfer::$salesUnit`. | None | Spryker\Glue\ProductMeasurementUnitsRestApi\Plugin\OrdersRestApi |


**src/Pyz/Glue/CartsRestApi/CartsRestApiDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\OrdersRestApi;

use Spryker\Glue\OrdersRestApi\OrdersRestApiDependencyProvider as SprykerOrdersRestApiDependencyProvider;
use Spryker\Glue\ProductMeasurementUnitsRestApi\Plugin\OrdersRestApi\SalesUnitRestOrderItemsAttributesMapperPlugin;

class OrdersRestApiDependencyProvider extends SprykerOrdersRestApiDependencyProvider
{
    /**
     * @return \Spryker\Glue\OrdersRestApiExtension\Dependency\Plugin\RestOrderItemsAttributesMapperPluginInterface[]
     */
    protected function getRestOrderItemsAttributesMapperPlugins(): array
    {
        return [
            new SalesUnitRestOrderItemsAttributesMapperPlugin(),
        ];
    }
}
```

{% info_block warningBox "Verification" %}

Send the request `GET https://glue.mysprykershop.com/orders/{% raw %}{{{% endraw %}order_uuid{% raw %}}}{% endraw %}` and make sure that the order items have `salesUnits` and `salesUnits.amount` properties in the response.

{% endinfo_block %}
