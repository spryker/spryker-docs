---
title: "Glue API: Retrieve abstract product prices"
description: Retrieve details information about prices of abstract products using the Spryker GLUE API within your Spryker Projects.
last_updated: Jun 21, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-abstract-product-prices
originalArticleId: 903570fe-6ca4-4165-b0d3-6764e0262308
redirect_from:
  - /docs/scos/dev/glue-api-guides/202311.0/managing-products/abstract-products/retrieving-abstract-product-prices.html
  - /docs/pbc/all/price-management/202311.0/base-shop/manage-using-glue-api/retrieve-abstract-product-prices.html
  - /docs/pbc/all/price-management/202204.0/base-shop/manage-using-glue-api/glue-api-retrieve-abstract-product-prices.html
related:
  - title: Retrieving abstract products
    link: docs/pbc/all/product-information-management/latest/base-shop/manage-using-glue-api/abstract-products/glue-api-retrieve-abstract-products.html
  - title: Retrieve abstract product availability
    link: docs/pbc/all/warehouse-management-system/latest/base-shop/manage-using-glue-api/glue-api-retrieve-abstract-product-availability.html
  - title: Retrieving image sets of abstract products
    link: docs/pbc/all/product-information-management/latest/base-shop/manage-using-glue-api/abstract-products/glue-api-retrieve-image-sets-of-abstract-products.html
  - title: Retrieving tax sets
    link: docs/pbc/all/tax-management/latest/base-shop/manage-using-glue-api/retrieve-tax-sets.html
---

This endpoint allows retrieving detailed information about the prices of abstract products.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see [Install the Product Glue API](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-glue-api/install-the-product-glue-api.html)

## Retrieve prices of an abstract product

To retrieve prices of an abstract product, send the request:

***
`GET`**/abstract-products/*{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}*/abstract-product-prices**
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}*** | SKU of an abstract product to retrieve the prices of.|

### Request

| REQUEST | USAGE |
| --- | --- |
| `GET http://glue.mysprykershop.com/abstract-products/001/abstract-product-prices` | Retrieve the price of the 001 product. |
| `GET http://glue.mysprykershop.com/abstract-products/001/abstract-product-prices?currency=CHF&priceMode=GROSS_MODE` | Retrieve the gross price of the 001 product in Swiss Franc. |


| STRING PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| currency | Defines the currency to retrieve the price in. | USD, EUR, CHF |
| priceMode | Defines the price mode to retrieve the price in. | GROSS_MODE, NET_MODE |

### Response

<details><summary>Response sample: retrieve default prices of an abstract product</summary>

```json
{
    "data": [
        {
            "type": "abstract-product-prices",
            "id": "001",
            "attributes": {
                "price": 9999,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 9999,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    },
                    {
                        "priceTypeName": "ORIGINAL",
                        "netAmount": null,
                        "grossAmount": 12564,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        }
                    }
                ]
            },
            "links": {
                "self": "http://glue.mysprykershop.com/abstract-products/001/abstract-product-prices"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/abstract-products/001/abstract-product-prices"
    }
}
```

</details>

<details>  
<summary>Response sample: retrieve default and volume prices of an abstract product</summary>

```json
{
    "data": [
        {
            "type": "abstract-product-prices",
            "id": "093",
            "attributes": {
                "price": 24899,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 24899,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"
                        },
                        "volumePrices": [
                            {
                                "netAmount": 150,
                                "grossAmount": 165,
                                "quantity": 5
                            },
                            {
                                "netAmount": 145,
                                "grossAmount": 158,
                                "quantity": 10
                            },
                            {
                                "netAmount": 140,
                                "grossAmount": 152,
                                "quantity": 20
                            }
                        ]
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/abstract-products/093/abstract-product-prices"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/abstract-products/093/abstract-product-prices"
    }
}
```

</details>

<details><summary>Response sample: retrieve a gross price in Swiss Franc of an abstract product</summary>

 ```json
    {
    "data": [
        {
            "type": "abstract-product-prices",
            "id": "001",
            "attributes": {
                "price": 11499,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 11499,
                        "currency": {
                            "code": "CHF",
                            "name": "Swiss Franc",
                            "symbol": "CHF"
                        }
                    },
                    {
                        "priceTypeName": "ORIGINAL",
                        "netAmount": null,
                        "grossAmount": 14449,
                        "currency": {
                            "code": "CHF",
                            "name": "Swiss Franc",
                            "symbol": "CHF"
                        }
                    }
                ]
            },
            "links": {
                "self": "http://glue.mysprykershop.com/abstract-products/001/abstract-product-prices"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/abstract-products/001/items?currency=CHF&priceMode=GROSS_MODE"
    }
}
```

</details>

<a name="abstract-product-prices-response-attributes"></a>

{% include pbc/all/glue-api-guides/latest/abstract-product-prices-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/abstract-product-prices-response-attributes.md -->


## Possible errors

| CODE | REASON |
| --- | --- |
| 307 | Abstract product price is not found (for example, because of the wrong abstract product SKU. |
| 311 | Abstract product SKU is not specified. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/latest/rest-api/reference-information-glueapplication-errors.html).
