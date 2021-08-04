---
title: Glue API- Promotions & Discounts Feature Integration
originalLink: https://documentation.spryker.com/v4/docs/glue-promotions-discounts-feature-integration
redirect_from:
  - /v4/docs/glue-promotions-discounts-feature-integration
  - /v4/docs/en/glue-promotions-discounts-feature-integration
---

## Install Feature API
### Prerequisites
To start feature integration, overview and install the necessary features:

| Name | Version | Required sub-feature |
| --- | --- | --- |
| Spryker Core | 202001.0 | [Feature API](https://documentation.spryker.com/v4/docs/glue-spryker-core-feature-integration) |
| Product | 202001.0 | [Feature API](https://documentation.spryker.com/v4/docs/glue-spryker-core-feature-integration) |
| Promotions & Discounts | 202001.0 |  |

### 1) Install the Required Modules Using Composer
Run the following command(s) to install the required modules:

```bash
composer require spryker/product-labels-rest-api:"^1.1.0" --update-with-dependencies
composer require spryker/cart-codes-rest-api:"^1.0.0" --update-with-dependencies
```

{% info_block warningBox "Verification" %}
Make sure that the following modules have been installed:<table><thead><tr><th>Module</th><th>Expected Directory </th></tr></thead><tbody><tr><td>`ProductLabelsRestApi`</td><td>`vendor/spryker/product-labels-rest-api`</td></tr><tr><td>`CartCodesRestApi`</td><td>`vendor/spryker/cart-codes-rest-api`</td></tr></tbody></table>
{% endinfo_block %}

### 2) Set up Database Schema and Transfer Objects
Run the following commands to generate transfer changes:

```bash
console transfer:generate
console propel:install
console transfer:generate
```

{% info_block warningBox "Verification" %}
Make sure that the following changes have occurred in transfer objects:<table><thead><tr><th>Transfer</th><th>Type</th><th>Event</th><th>Path</th></tr></thead><tbody><tr><td>`RestProductLabelsAttributesTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/RestDiscountsAttributesTransfer`</td></tr><tr><td>`RestDiscountsAttributesTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/RestProductLabelsAttributesTransfer`</td></tr><tr><td>`CartCodeRequestTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CartCodeRequestTransfer`</td></tr><tr><td>`CartCodeResponseTransfer`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/CartCodeResponseTransfer`</td></tr></tbody></table>
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make sure that `SpyProductAbstractStorage` and `SpyProductConcreteStorage` are extended by synchronization behavior with these methods:<table><thead><tr><th>Entity</th><th>Type</th><th>Event</th><th>Path</th><th>Methods</th></tr></thead><tbody><tr><td>`SpyProductAbstractStorage`</td><td>class</td><td>extended</td><td>`src/Orm/Zed/ProductStorage/Persistence/Base/SpyProductAbstractStorage`</td><td>`syncPublishedMessageForMappings(
{% endinfo_block %}`,</br>`syncUnpublishedMessageForMappings()`</td></tr><tr><td>`SpyProductConcreteStorage`</td><td>class</td><td>created</td><td>`src/Generated/Shared/Transfer/RestProductLabelsAttributesTransfer`</td></tr><tr><td>`CartCodeRequestTransfer`</td><td>class</td><td>extended</td><td>`src/Orm/Zed/ProductStorage/Persistence/Base/SpyProductConcreteStorage`</td><td>`syncPublishedMessageForMappings()`,</br>`syncUnpublishedMessageForMappings()`</td></tr></tbody></table>)

### 3) Set up Behavior
#### Enable resources and relationships
Activate the following plugin:

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
| `ProductLabelsResourceRoutePlugin` | Registers the **product labels** resource. | None | `Spryker\Glue\ProductLabelsRestApi\Plugin\GlueApplication` |
| `ProductLabelsRelationshipByResourceIdPlugin` | Adds the **product labels** resource as a relationship to the **abstract product** resource. | None | `Spryker\Glue\ProductLabelsRestApi\Plugin\GlueApplication` |
| `ProductLabelByProductConcreteSkuResourceRelationshipPlugin` | Adds the **product labels** resource as a relationship to the **concrete product** resource. | None | `Spryker\Glue\ProductLabelsRestApi\Plugin\GlueApplication` |
| `CartVouchersResourceRoutePlugin` | Registers the **vouchers** resource. | None | `Spryker\Glue\CartCodesRestApi\Plugin\GlueApplication` |
| `GuestCartVouchersResourceRoutePlugin` | Registers the **guest vouchers** resource. | None | `Spryker\Glue\CartCodesRestApi\Plugin\GlueApplication` |
| `CartRuleByQuoteResourceRelationshipPlugin` | Adds the **cart-rules** resource as a relationship by quote. | None | `Spryker\Glue\CartCodesRestApi\Plugin\GlueApplication` |
| `VoucherByQuoteResourceRelationshipPlugin` | Adds the **vouchers** resource as a relationship by quote. | None | `Spryker\Glue\CartCodesRestApi\Plugin\GlueApplication` |

<details open>
   <summary>src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php</summary>
    
```php
<?php
 
namespace Pyz\Glue\GlueApplication;
 
use Spryker\Glue\CartCodesRestApi\Plugin\GlueApplication\CartRuleByQuoteResourceRelationshipPlugin;
use Spryker\Glue\CartCodesRestApi\Plugin\GlueApplication\CartVouchersResourceRoutePlugin;
use Spryker\Glue\CartCodesRestApi\Plugin\GlueApplication\GuestCartVouchersResourceRoutePlugin;
use Spryker\Glue\CartCodesRestApi\Plugin\GlueApplication\VoucherByQuoteResourceRelationshipPlugin;
use Spryker\Glue\CartsRestApi\CartsRestApiConfig;
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\ProductLabelsRestApi\Plugin\GlueApplication\ProductLabelByProductConcreteSkuResourceRelationshipPlugin;
use Spryker\Glue\ProductLabelsRestApi\Plugin\GlueApplication\ProductLabelsRelationshipByResourceIdPlugin;
use Spryker\Glue\ProductLabelsRestApi\Plugin\GlueApplication\ProductLabelsResourceRoutePlugin;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
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
 
        return $resourceRelationshipCollection;
    }
}
```

</br>
</details>

{% info_block warningBox "Verification" %}
Make sure that the following endpoint is available:<ul><li>`http://glue.mysprykershop.com/product-labels/{% raw %}{{{% endraw %}idProductLabel{% raw %}}}{% endraw %}`</li></ul>
{% endinfo_block %}

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
            "self": "http://glue.mysprykershop.com/product-labels/5"
        }
    }
}
```

{% info_block warningBox "Verification" %}
Send a request to `http://glue.mysprykershop.com/abstract-products/{% raw %}{{{% endraw %}sku{% raw %}}}{% endraw %}?include=product-labels` and verify whether the abstract product with the given SKU has at least one assigned product label and the response includes relationships to the **product-labels** resources.
{% endinfo_block %}

**Example response:**

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
                "self": "http://glue.mysprykershop.com/product-labels/5"
            }
        }
    ]
}
```

{% info_block warningBox "Verification" %}
Send a request to `http://glue.mysprykershop.com/concrete-products/{% raw %}{{{% endraw %}sku{% raw %}}}{% endraw %}?include=product-labels` and verify whether the concrete product with the given SKU has at least one assigned product label and the response includes relationships to the **product-labels** resources.
{% endinfo_block %}

**Example response:**

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
                "self": "http://glue.mysprykershop.com/product-labels/5"
            }
        }
    ]
}
```

{% info_block warningBox "Verification" %}
Make sure that the following endpoints are available:<ul><li>`http://glue.mysprykershop.com/carts/{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}/vouchers`</li><li>`http://glue.mysprykershop.com/guest-carts/{% raw %}{{{% endraw %}guest_cart_uuid{% raw %}}}{% endraw %}/vouchers`</li></ul>
{% endinfo_block %}

{% info_block warningBox "Verification" %}
Make sure that the following endpoint is available:<ul><li>`http://glue.mysprykershop.com/carts/{% raw %}{{{% endraw %}cart_uuid{% raw %}}}{% endraw %}?include=vouchers,cart-rules`</li></ul>
{% endinfo_block %}

<details open>
<summary>Example</summary>

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
            "self": "http://glue.mysprykershop.com/carts/1ce91011-8d60-59ef-9fe0-4493ef3628b2?include=cart-rules,vouchers"
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
                "self": "http://glue.mysprykershop.com/vouchers/sprykerwu3d"
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
                "self": "http://glue.mysprykershop.com/cart-rules/1"
            }
        }
    ]
}
```

</br>
</details>

{% info_block warningBox "Verification" %}
Make sure that the following endpoint is available:<ul><li>`http://glue.mysprykershop.com/guest-carts/{% raw %}{{{% endraw %}guest-cart_uuid{% raw %}}}{% endraw %}?include=vouchers,cart-rules`</li></ul>
{% endinfo_block %}

<details open>
<summary>Example</summary>

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
            "self": "http://glue.mysprykershop.com/guest-carts/9b07888e-623b-5ab1-83dd-c7af5e1d81ad?include=vouchers,cart-rules"
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
                "self": "http://glue.mysprykershop.com/vouchers/sprykerpa8n"
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
                "self": "http://glue.mysprykershop.com/cart-rules/1"
            }
        }
    ]
}
```

</br>
</details>
