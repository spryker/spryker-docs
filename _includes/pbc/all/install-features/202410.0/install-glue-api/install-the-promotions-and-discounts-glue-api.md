

Follow the steps below to install Promotions & Discounts feature API.

## Prerequisites

Install the required features:

| NAME | VERSION | INSTALLATION GUIDE |
| --- | --- | --- |
| Spryker Core | {{page.version}} | [Install the Spryker Core Glue API](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-glue-api/install-the-spryker-core-glue-api.html) |
| Product | {{page.version}} | [Install the Product Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-glue-api.html) |
| Promotions & Discounts | {{page.version}} | [Install the Promotions & Discounts feature](/docs/pbc/all/discount-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-promotions-and-discounts-feature.html) |

## 1) Install the required modules

Install the required modules using Composer:

```bash
composer require spryker/product-labels-rest-api:"^1.1.0" --update-with-dependencies
composer require spryker/cart-codes-rest-api:"^1.0.0" --update-with-dependencies
composer require spryker/discount-promotions-rest-api:"^1.1.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}

Make sure that the following modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| ProductLabelsRestApi | vendor/spryker/product-labels-rest-api |
| CartCodesRestApi | vendor/spryker/cart-codes-rest-api |
| DiscountPromotionsRestApi | vendor/spryker/discount-promotions-rest-api |

{% endinfo_block %}

## 2) Set up database schema and transfer objects

Generate transfer changes:

```bash
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}

Make sure that the following changes have occurred in the database:

| DATABASE ENTITY | TYPE | EVENT |
| --- | --- | --- |
| spy_discount_promotion.uuid | column | added |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that the following changes have occurred in the database:

| TRANSFER | TYPE | EVENT | PATH |
| --- | --- | --- | --- |
| RestProductLabelsAttributesTransfer | class | created | src/Generated/Shared/Transfer/RestDiscountsAttributesTransfer |
| RestDiscountsAttributesTransfer | class | created | src/Generated/Shared/Transfer/RestProductLabelsAttributesTransfer |
| CartCodeRequestTransfer | class | created | src/Generated/Shared/Transfer/CartCodeRequestTransfer |
| CartCodeResponseTransfer | class | created | src/Generated/Shared/Transfer/CartCodeResponseTransfer |
| DiscountPromotionTransfer.uuid | property | added | src/Generated/Shared/Transfer/DiscountPromotionTransfer |
| PromotionItemTransfer.uuid | property | added | src/Generated/Shared/Transfer/PromotionItemTransfer |
| CartItemRequestTransfer.discountPromotionUuid | property | added | src/Generated/Shared/Transfer/CartItemRequestTransfer |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that `SpyProductAbstractStorage` and `SpyProductConcreteStorage` are extended with synchronization behavior using the following methods:

| ENTITY | TYPE | EVENT | PATH | METHODS |
| --- | --- | --- | --- | --- |
| SpyProductAbstractStorage | class | extended | src/Orm/Zed/ProductStorage/Persistence/Base/SpyProductAbstractStorage	| syncPublishedMessageForMappings(), syncUnpublishedMessageForMappings() |
| SpyProductConcreteStorage | class | extended | src/Orm/Zed/ProductStorage/Persistence/Base/SpyProductConcreteStorage | syncPublishedMessageForMappings(), syncUnpublishedMessageForMappings() |

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that `SpyDiscountPromotion` is extended with UUID behavior using the following method:

| ENTITY | TYPE | EVENT | PATH | METHODS |
| --- | --- | --- | --- | --- |
| SpyDiscountPromotion | class | extended | src/Orm/Zed/DiscountPromotion/Persistence/Base/SpyDiscountPromotion	| setGeneratedUuid() |

{% endinfo_block %}

## 3) Set up behavior

### Generate UUIDs for existing discount promotion records that do not have them

Generate UUIDs:

```bash
console uuid:generate DiscountPromotion spy_discount_promotion
```

{% info_block warningBox "Verification" %}

Make sure that the UUID field is populated for all records in the spy_discount_promotion table. For this purpose, run the following SQL query and make sure that the result is **0** records:

```sql
SELECT COUNT(*) FROM spy_discount_promotion WHERE uuid IS NULL;
```

{% endinfo_block %}

### Enable the Quote field list to save

Add the following fields into the *Quote Fields Allowed for Saving* list:

| FIELD | 	SPECIFICATION |
| --- | --- |
| QuoteTransfer::VOUCHER_DISCOUNTS | Stores information about voucher discounts in the Quote transfer object. |
| QuoteTransfer::CART_RULE_DISCOUNTS | Stores information about cart rule discounts in the Quote transfer object. |
| QuoteTransfer::PROMOTION_ITEMS | Stores information about promotional items in the Quote transfer object. |

To do so, modify the following file:

**src/Pyz/Zed/Quote/QuoteConfig.php**

```php
<?php

namespace Pyz\Zed\Quote;

use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Zed\Quote\QuoteConfig as SprykerQuoteConfig;

class QuoteConfig extends SprykerQuoteConfig
{
    /**
     * @return array
     */
    public function getQuoteFieldsAllowedForSaving()
    {
        return array_merge(parent::getQuoteFieldsAllowedForSaving(), [
            QuoteTransfer::VOUCHER_DISCOUNTS,
            QuoteTransfer::CART_RULE_DISCOUNTS,
            QuoteTransfer::PROMOTION_ITEMS,
        ]);
    }
}
```


### Enable resources and relationships

Activate the following plugin:

| PLUGIN | SPECIFICATION | PREREQUISITES | NAMESPACE |
| --- | --- | --- | --- |
| ProductLabelsResourceRoutePlugin | Registers the **product labels** resource. | None | Spryker\Glue\ProductLabelsRestApi\Plugin\GlueApplication |
| ProductLabelsRelationshipByResourceIdPlugin | Adds the **product labels** resource as a relationship to the **abstract product** resource. | None | Spryker\Glue\ProductLabelsRestApi\Plugin\GlueApplication |
| ProductLabelByProductConcreteSkuResourceRelationshipPlugin | Adds the **product labels** resource as a relationship to the **concrete product** resource. | None | Spryker\Glue\ProductLabelsRestApi\Plugin\GlueApplication |
| CartVouchersResourceRoutePlugin | Registers the **vouchers** resource. | None | Spryker\Glue\CartCodesRestApi\Plugin\GlueApplication |
| GuestCartVouchersResourceRoutePlugin | Registers the **guest vouchers** resource. | None | Spryker\Glue\CartCodesRestApi\Plugin\GlueApplication |
| CartRuleByQuoteResourceRelationshipPlugin | Adds the **cart-rules** resource as a relationship by quote. | None | Spryker\Glue\CartCodesRestApi\Plugin\GlueApplication |
| VoucherByQuoteResourceRelationshipPlugin | Adds the **vouchers** resource as a relationship by quote. | None | `Spryker\Glue\CartCodesRestApi\Plugin\GlueApplication |
| DiscountPromotionCartItemExpanderPlugin | Expands the Add to Cart request data with discount promotion information. | None | Spryker\Glue\DiscountPromotionsRestApi\Plugin\CartsRestApi |
| DiscountPromotionCartItemMapperPlugin | Maps a discount to the *Add to Cart* request data. | None | Spryker\Zed\DiscountPromotionsRestApi\Communication\Plugin\CartsRestApi |
| PromotionItemByQuoteTransferResourceRelationshipPlugin | Adds the `promotional-items` resource as a relationship to the carts and `guest-carts` resources. | None | Spryker\Glue\DiscountPromotionsRestApi\Plugin\GlueApplication |
| ProductAbstractBySkuResourceRelationshipPlugin | Adds the `abstract-products` resource as a relationship to the `promotional-items` resource. | None | Spryker\Glue\ProductsRestApi\Plugin\GlueApplication |

<details>
<summary>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\CartCodesRestApi\Plugin\GlueApplication\CartRuleByQuoteResourceRelationshipPlugin;
use Spryker\Glue\CartCodesRestApi\Plugin\GlueApplication\CartVouchersResourceRoutePlugin;
use Spryker\Glue\CartCodesRestApi\Plugin\GlueApplication\GuestCartVouchersResourceRoutePlugin;
use Spryker\Glue\CartCodesRestApi\Plugin\GlueApplication\VoucherByQuoteResourceRelationshipPlugin;
use Spryker\Glue\CartsRestApi\CartsRestApiConfig;
use Spryker\Glue\DiscountPromotionsRestApi\DiscountPromotionsRestApiConfig;
use Spryker\Glue\DiscountPromotionsRestApi\Plugin\GlueApplication\PromotionItemByQuoteTransferResourceRelationshipPlugin;
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\ProductLabelsRestApi\Plugin\GlueApplication\ProductLabelByProductConcreteSkuResourceRelationshipPlugin;
use Spryker\Glue\ProductLabelsRestApi\Plugin\GlueApplication\ProductLabelsRelationshipByResourceIdPlugin;
use Spryker\Glue\ProductLabelsRestApi\Plugin\GlueApplication\ProductLabelsResourceRoutePlugin;
use Spryker\Glue\ProductsRestApi\Plugin\GlueApplication\ProductAbstractBySkuResourceRelationshipPlugin;
use Spryker\Glue\ProductsRestApi\ProductsRestApiConfig;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            new ProductLabelsResourceRoutePlugin(),
            new CartVouchersResourceRoutePlugin(),
            new GuestCartVouchersResourceRoutePlugin(),
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
            ProductsRestApiConfig::RESOURCE_ABSTRACT_PRODUCTS,
            new ProductLabelsRelationshipByResourceIdPlugin()
        );
        $resourceRelationshipCollection->addRelationship(
            ProductsRestApiConfig::RESOURCE_CONCRETE_PRODUCTS,
            new ProductLabelByProductConcreteSkuResourceRelationshipPlugin()
        );
        $resourceRelationshipCollection->addRelationship(
            CartsRestApiConfig::RESOURCE_CARTS,
            new VoucherByQuoteResourceRelationshipPlugin()
        );
        $resourceRelationshipCollection->addRelationship(
            CartsRestApiConfig::RESOURCE_GUEST_CARTS,
            new VoucherByQuoteResourceRelationshipPlugin()
        );
        $resourceRelationshipCollection->addRelationship(
            CartsRestApiConfig::RESOURCE_CARTS,
            new CartRuleByQuoteResourceRelationshipPlugin()
        );
        $resourceRelationshipCollection->addRelationship(
            CartsRestApiConfig::RESOURCE_GUEST_CARTS,
            new CartRuleByQuoteResourceRelationshipPlugin()
        );
        $resourceRelationshipCollection->addRelationship(
            CartsRestApiConfig::RESOURCE_CARTS,
            new PromotionItemByQuoteTransferResourceRelationshipPlugin()
        );
        $resourceRelationshipCollection->addRelationship(
            CartsRestApiConfig::RESOURCE_GUEST_CARTS,
            new PromotionItemByQuoteTransferResourceRelationshipPlugin()
        );
        $resourceRelationshipCollection->addRelationship(
            DiscountPromotionsRestApiConfig::RESOURCE_PROMOTIONAL_ITEMS,
            new ProductAbstractBySkuResourceRelationshipPlugin()
        );

        return $resourceRelationshipCollection;
    }
}
```

</details>

**src/Pyz/Glue/CartsRestApi/CartsRestApiDependencyProvider.php**

```php

<?php

namespace Pyz\Glue\CartsRestApi;

use Spryker\Glue\CartsRestApi\CartsRestApiDependencyProvider as SprykerCartsRestApiDependencyProvider;
use Spryker\Glue\DiscountPromotionsRestApi\Plugin\CartsRestApi\DiscountPromotionCartItemExpanderPlugin;

class CartsRestApiDependencyProvider extends SprykerCartsRestApiDependencyProvider
{
    /**
     * @return \Spryker\Glue\CartsRestApiExtension\Dependency\Plugin\CartItemExpanderPluginInterface[]
     */
    protected function getCartItemExpanderPlugins(): array
    {
        return [
            new DiscountPromotionCartItemExpanderPlugin(),
        ];
    }
}
```

**src/Pyz/Zed/CartsRestApi/CartsRestApiDependencyProvider.php**

```php

<?php

namespace Pyz\Zed\CartsRestApi;

use Spryker\Zed\CartsRestApi\CartsRestApiDependencyProvider as SprykerCartsRestApiDependencyProvider;
use Spryker\Zed\DiscountPromotionsRestApi\Communication\Plugin\CartsRestApi\DiscountPromotionCartItemMapperPlugin;

class CartsRestApiDependencyProvider extends SprykerCartsRestApiDependencyProvider
{
    /**
     * @return \Spryker\Zed\CartsRestApiExtension\Dependency\Plugin\CartItemMapperPluginInterface[]
     */
    protected function getCartItemMapperPlugins(): array
    {
        return [
            new DiscountPromotionCartItemMapperPlugin(),
        ];
    }
}
```


{% info_block warningBox "Verification" %}

Make sure that the following endpoint is available:

- `https://glue.mysprykershop.com/product-labels/{% raw %}{{ idProductLabel }}{% endraw %}`

**Example response:**

```json
{
    "data": {
        "type": "product-labels",
        "id": "5",
        "attributes": {
            "name": "SALE %",
            "isExclusive": false,
            "position": 5,
            "frontEndReference": "highlight"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/product-labels/5"
        }
    }
}
```

{% endinfo_block %}


{% info_block warningBox "Verification" %}

To verify that `ProductLabelsResourceRoutePlugin` is set up correctly, make sure that the following endpoint is available:

- `https://glue.mysprykershop.com/product-labels/{% raw %}{{{% endraw %}idProductLabel{% raw %}}}{% endraw %}`

**Example response**

```json
{
    "data": {
        "type": "product-labels",
        "id": "5",
        "attributes": {
            "name": "SALE %",
            "isExclusive": false,
            "position": 5,
            "frontEndReference": "highlight"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/product-labels/5"
        }
    }
}
```

{% endinfo_block %}

{% info_block warningBox "Verification" %}

To check `ProductLabelsRelationshipByResourceIdPlugin` plugin installation, send a request to `https://glue.mysprykershop.com/abstract-products/{% raw %}{{{% endraw %}sku{% raw %}}}{% endraw %}?include=product-labels` with an SKU of a product with at least one product label assigned to it. Make sure that the response includes relationships to the product-labels resources.

**Example response**

```json
{
    "data": {
        "type": "abstract-products",
        "id": "sku",
        "attributes": {
            ...
        },
        "links": {
            ...
        },
        "relationships": {
            "product-labels": {
                "data": [
                    {
                        "type": "product-labels",
                        "id": "5"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "product-labels",
            "id": "5",
            "attributes": {
                "name": "SALE %",
                "isExclusive": false,
                "position": 5,
                "frontEndReference": "highlight"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-labels/5"
            }
        }
    ]
}
```

{% endinfo_block %}

{% info_block warningBox "Verification" %}

To check `ProductLabelByProductConcreteSkuResourceRelationshipPlugin` plugin installation, send a request to `https://glue.mysprykershop.com/concrete-products/{% raw %}{{{% endraw %}sku{% raw %}}}{% endraw %}?include=product-labels` with an SKU of a product with at least one product label assigned to it. Make sure that the response includes relationships to the product-labels resources.

**Example response**

```json
{
    "data": {
        "type": "concrete-products",
        "id": "sku",
        "attributes": {
            ...
        },
        "links": {
            ...
        },
        "relationships": {
            "product-labels": {
                "data": [
                    {
                        "type": "product-labels",
                        "id": "5"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "product-labels",
            "id": "5",
            "attributes": {
                "name": "SALE %",
                "isExclusive": false,
                "position": 5,
                "frontEndReference": "highlight"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/product-labels/5"
            }
        }
    ]
}
```

{% endinfo_block %}

{% info_block warningBox "Verification" %}

To verify the `CartVouchersResourceRoutePlugin` and `GuestCartVouchersResourceRoutePlugin` plugin integration, make sure that the following endpoints are available:

- `https://glue.mysprykershop.com/carts/{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}/vouchers`
- `https://glue.mysprykershop.com/guest-carts/{% raw %}{{{% endraw %}guest_cart_uuid{% raw %}}}{% endraw %}/vouchers`

{% endinfo_block %}

{% info_block warningBox "Verification" %}

To verify installation of `CartRuleByQuoteResourceRelationshipPlugin` and `VoucherByQuoteResourceRelationshipPlugin` make sure that the vouchers and cart-rules relationships are available when requesting a cart:

- `https://glue.mysprykershop.com/carts/{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}?include=vouchers,cart-rules`

<details>
<summary>Example response</summary>

```json
{
    "data": {
        "type": "carts",
        "id": "1ce91011-8d60-59ef-9fe0-4493ef3628b2",
        "attributes": {
            "priceMode": "GROSS_MODE",
            "currency": "CHF",
            "store": "DE",
            "name": "My Cart",
            "isDefault": true,
            "totals": {
                "expenseTotal": 0,
                "discountTotal": 95307,
                "taxTotal": 75262,
                "subtotal": 635381,
                "grandTotal": 540074
            },
            "discounts": [
                {
                    "displayName": "5% discount on all white products",
                    "amount": 31769,
                    "code": null
                },
                {
                    "displayName": "10% Discount for all orders above",
                    "amount": 63538,
                    "code": null
                }
            ]
        },
        "links": {
            "self": "https://glue.mysprykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2?include=cart-rules,vouchers"
        },
        "relationships": {
            "vouchers": {
                "data": [
                    {
                        "type": "vouchers",
                        "id": "sprykerwu3d"
                    }
                ]
            },
            "cart-rules": {
                "data": [
                    {
                        "type": "cart-rules",
                        "id": "1"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "vouchers",
            "id": "sprykerwu3d",
            "attributes": {
                "amount": 31769,
                "code": "sprykerwu3d",
                "discountType": "voucher",
                "displayName": "5% discount on all white products",
                "isExclusive": false,
                "expirationDateTime": "2020-12-31 00:00:00.000000",
                "discountPromotionAbstractSku": null,
                "discountPromotionQuantity": null
            },
            "links": {
                "self": "https://glue.mysprykershop.com/vouchers/sprykerwu3d"
            }
        },
        {
            "type": "cart-rules",
            "id": "1",
            "attributes": {
                "amount": 63538,
                "code": null,
                "discountType": "cart_rule",
                "displayName": "10% Discount for all orders above",
                "isExclusive": false,
                "expirationDateTime": "2020-12-31 00:00:00.000000",
                "discountPromotionAbstractSku": null,
                "discountPromotionQuantity": null
            },
            "links": {
                "self": "https://glue.mysprykershop.com/cart-rules/1"
            }
        }
    ]
}
```

</details>

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Make sure that the cart-rules and vouchers relationships are also available for guest carts. The relationships are provided by `CartRuleByQuoteResourceRelationshipPlugin` and `VoucherByQuoteResourceRelationshipPlugin` plugins. To do so, send a request to the following endpoint:

- `https://glue.mysprykershop.com/guest-carts/{% raw %}{{{% endraw %}guest-cart_uuid{% raw %}}}{% endraw %}?include=vouchers,cart-rules`

<details>
<summary>Example response</summary>

```json
{
    "data": {
        "type": "guest-carts",
        "id": "9b07888e-623b-5ab1-83dd-c7af5e1d81ad",
        "attributes": {
            "priceMode": "GROSS_MODE",
            "currency": "EUR",
            "store": "DE",
            "name": "Shopping cart",
            "isDefault": true,
            "totals": {
                "expenseTotal": 0,
                "discountTotal": 1853,
                "taxTotal": 1676,
                "subtotal": 12350,
                "grandTotal": 10497
            },
            "discounts": [
                {
                    "displayName": "5% discount on all white products",
                    "amount": 618,
                    "code": null
                },
                {
                    "displayName": "10% Discount for all orders above",
                    "amount": 1235,
                    "code": null
                }
            ]
        },
        "links": {
            "self": "https://glue.mysprykershop.com/guest-carts/9b07888e-623b-5ab1-83dd-c7af5e1d81ad?include=vouchers,cart-rules"
        },
        "relationships": {
            "vouchers": {
                "data": [
                    {
                        "type": "vouchers",
                        "id": "sprykerpa8n"
                    }
                ]
            },
            "cart-rules": {
                "data": [
                    {
                        "type": "cart-rules",
                        "id": "1"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "vouchers",
            "id": "sprykerpa8n",
            "attributes": {
                "amount": 618,
                "code": "sprykerpa8n",
                "discountType": "voucher",
                "displayName": "5% discount on all white products",
                "isExclusive": false,
                "expirationDateTime": "2020-12-31 00:00:00.000000",
                "discountPromotionAbstractSku": null,
                "discountPromotionQuantity": null
            },
            "links": {
                "self": "https://glue.mysprykershop.com/vouchers/sprykerpa8n"
            }
        },
        {
            "type": "cart-rules",
            "id": "1",
            "attributes": {
                "amount": 1235,
                "code": null,
                "discountType": "cart_rule",
                "displayName": "10% Discount for all orders above",
                "isExclusive": false,
                "expirationDateTime": "2020-12-31 00:00:00.000000",
                "discountPromotionAbstractSku": null,
                "discountPromotionQuantity": null
            },
            "links": {
                "self": "https://glue.mysprykershop.com/cart-rules/1"
            }
        }
    ]
}
```

</details>

{% endinfo_block %}

{% info_block warningBox "Verification" %}

Verify that the `PromotionItemByQuoteTransferResourceRelationshipPlugin` and `ProductAbstractBySkuResourceRelationshipPlugin` plugins add the `promotional-items` and `abstract-products` relations.

Prerequisites:

- [Create a discount for the product](/docs/pbc/all/discount-management/{{page.version}}/base-shop/manage-in-the-back-office/create-discounts.html). The discount application type should be promotional product.
- Create a cart.

Add items to the cart to satisfy the conditions of the discount rule:

- `POST https://glue.mysprykershop.com/carts/{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}/items?include=promotional-items,abstract-product`

**Example of Request**

```json
{
    "data": {
        "type": "items",
        "attributes": {
            "sku": "173_26973306",
            "quantity": 4
        }
    }
}
```

Make sure that the following relations are available:

- `promotional-items with abstract-products`

<details>
<summary>Example of Response</summary>

```json
{
    "data": {
        "type": "carts",
        "id": "1ce91011-8d60-59ef-9fe0-4493ef3628b2",
        ...
        "links": {
            "self": "https://glue.mysprykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2?include=promotional-items,abstract-products"
        },
        "relationships": {
            "promotional-items": {
                "data": [
                    {
                        "type": "promotional-items",
                        "id": "bfc600e1-5bf1-50eb-a9f5-a37deb796f8a"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "abstract-products",
            "id": "112",
            "attributes": {
                "sku": "112",
                ...
                "attributeMap": {
                    "product_concrete_ids": [
                        "112_312526171",
                        "112_306918001",
                        "112_312526191",
                        "112_312526172",
                        "112_306918002",
                        "112_312526192",
                        "112_306918003",
                        "112_312526193"
                    ],
                    ...
                    "attribute_variants": {
                        "processor_frequency:3.3 GHz": {
                            "processor_cache:3 MB": {
                                "id_product_concrete": "112_312526193"
                            },
                            "processor_cache:12 MB": {
                                "id_product_concrete": "112_312526191"
                            }
                        },
                        "processor_cache:3 MB": {
                            "processor_frequency:3.3 GHz": {
                                "id_product_concrete": "112_312526193"
                            },
                            "processor_frequency:3.2 GHz": {
                                "id_product_concrete": "112_306918002"
                            },
                            "processor_frequency:3.7 GHz": {
                                "id_product_concrete": "112_312526171"
                            }
                        },
                        "processor_frequency:3.2 GHz": {
                            "processor_cache:12 MB": {
                                "id_product_concrete": "112_306918003"
                            },
                            "processor_cache:3 MB": {
                                "id_product_concrete": "112_306918002"
                            },
                            "processor_cache:6 MB": {
                                "id_product_concrete": "112_306918001"
                            }
                        },
                        "processor_cache:12 MB": {
                            "processor_frequency:3.2 GHz": {
                                "id_product_concrete": "112_306918003"
                            },
                            "processor_frequency:3.7 GHz": {
                                "id_product_concrete": "112_312526192"
                            },
                            "processor_frequency:3.3 GHz": {
                                "id_product_concrete": "112_312526191"
                            }
                        },
                        "processor_frequency:3.7 GHz": {
                            "processor_cache:12 MB": {
                                "id_product_concrete": "112_312526192"
                            },
                            "processor_cache:6 MB": {
                                "id_product_concrete": "112_312526172"
                            },
                            "processor_cache:3 MB": {
                                "id_product_concrete": "112_312526171"
                            }
                        },
                        "processor_cache:6 MB": {
                            "processor_frequency:3.7 GHz": {
                                "id_product_concrete": "112_312526172"
                            },
                            "processor_frequency:3.2 GHz": {
                                "id_product_concrete": "112_306918001"
                            }
                        }
                    }
                },
                ...
            },
            "links": {
                "self": "https://glue.mysprykershop.com/abstract-products/112"
            }
        },
        {
            "type": "promotional-items",
            "id": "bfc600e1-5bf1-50eb-a9f5-a37deb796f8a",
            "attributes": {
                "sku": "112",
                "quantity": 2
            },
            "links": {
                "self": "https://glue.mysprykershop.com/promotional-items/bfc600e1-5bf1-50eb-a9f5-a37deb796f8a"
            },
            "relationships": {
                "abstract-products": {
                    "data": [
                        {
                            "type": "abstract-products",
                            "id": "112"
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

Verify the `DiscountPromotionCartItemExpanderPlugin` and `DiscountPromotionCartItemMapperPlugin` plugin installation.

Prerequisites:

- [Create a discount])(/docs/pbc/all/discount-management/{{page.version}}/base-shop/manage-in-the-back-office/create-discounts.html). Discount application type should be promotional product.
- Create a cart with items that satisfy the conditions of the discount rule.
- Get a concrete promotional product SKU.

Add the selected promotional product to the cart and check the cart in the response has the cart rule applied to match the promotional product price:

- `POST https://glue.mysprykershop.com/carts/{% raw %}{{{% endraw %}cart-uuid{% raw %}}}{% endraw %}/items?include=items,cart-rules`

**Example of Request to Add Selected Promotional Product Into The Cart**

```json
{
    "data": {
        "type": "items",
        "attributes": {
            "sku": "112_312526171",
            "quantity": 2,
            "idPromotionalItem": "bfc600e1-5bf1-50eb-a9f5-a37deb796f8a"
        }
    }
}
```

<details>
<summary>Example of Response</summary>

```json
{
    "data": {
        "type": "carts",
        "id": "1ce91011-8d60-59ef-9fe0-4493ef3628b2",
        "attributes": {
            "priceMode": "GROSS_MODE",
            "currency": "EUR",
            "store": "DE",
            "totals": {
                "expenseTotal": 0,
                "discountTotal": 32544,
                "taxTotal": 19868,
                "subtotal": 170808,
                "grandTotal": 118396
            },
            "discounts": [
                {
                    "displayName": "For every purchase above certain value depending on the currency and net/gross price. you get this promotional product for free",
                    "amount": 32544,
                    "code": null
                }
            ]
        },
        "links": {
            "self": "https://glue.mysprykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2?include=promotional-items,abstract-products,cart-rules"
        },
        "relationships": {
            "items": {
                "data": [
                    {
                        "type": "items",
                        "id": "112_312526171-promotion-1"
                    }
                ]
            }
            "cart-rules": {
                "data": [
                    {
                        "type": "cart-rules",
                        "id": "6"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "items",
            "id": "112_312526171-promotion-1",
            "attributes": {
                "sku": "112_312526171",
                "quantity": "1",
                "groupKey": "112_312526171-promotion-1",
                "abstractSku": "112",
                "amount": null,
                "calculations": {
                    "unitPrice": 43723,
                    "sumPrice": 43723,
                    "taxRate": 0,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 43723,
                    "sumGrossPrice": 43723,
                    "unitTaxAmountFullAggregation": 0,
                    "sumTaxAmountFullAggregation": 0,
                    "sumSubtotalAggregation": 43723,
                    "unitSubtotalAggregation": 43723,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 43723,
                    "sumDiscountAmountAggregation": 43723,
                    "unitDiscountAmountFullAggregation": 43723,
                    "sumDiscountAmountFullAggregation": 43723,
                    "unitPriceToPayAggregation": 0,
                    "sumPriceToPayAggregation": 0
                },
                "selectedProductOptions": []
            },
            "links": {
                "self": "https://glue.mysprykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2/items/112_312526171-promotion-1"
            }
        },
        {
            "type": "cart-rules",
            "id": "6",
            "attributes": {
                "amount": 32544,
                "code": null,
                "discountType": "cart_rule",
                "displayName": "For every purchase above certain value depending on the currency and net/gross price. you get this promotional product for free",
                "isExclusive": false,
                "expirationDateTime": "2020-12-31 00:00:00.000000",
                "discountPromotionAbstractSku": 112,
                "discountPromotionQuantity": 2
            },
            "links": {
                "self": "https://glue.mysprykershop.com/cart-rules/6"
            }
        }
    ]
}
```

</details>

{% endinfo_block %}
