---
title: "Glue API: Retrieve concrete product prices"
description: Retrieve details information about prices of concrete products using the Spryker GLUE API within your Spryker Projects.
last_updated: Jun 21, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-concrete-product-prices
originalArticleId: 7192572b-0b8e-4bbb-a579-570eecffc1e2
redirect_from:
  - /docs/scos/dev/glue-api-guides/202311.0/managing-products/concrete-products/retrieving-concrete-product-prices.html
  - /docs/pbc/all/price-management/manage-using-glue-api/retrieve-concrete-product-prices.html
  - /docs/pbc/all/price-management/202311.0/base-shop/manage-using-glue-api/retrieve-concrete-product-prices.html
  - /docs/pbc/all/price-management/202204.0/base-shop/manage-using-glue-api/glue-api-retrieve-concrete-product-prices.html
related:
  - title: "Glue API: Retrieve concrete products"
    link: docs/pbc/all/product-information-management/page.version/base-shop/manage-using-glue-api/concrete-products/glue-api-retrieve-concrete-products.html
  - title: Retrieve concrete product availability
    link: docs/pbc/all/warehouse-management-system/page.version/base-shop/manage-using-glue-api/glue-api-retrieve-concrete-product-availability.html
  - title: Retrieving image sets of concrete products
    link: docs/pbc/all/product-information-management/page.version/base-shop/manage-using-glue-api/concrete-products/glue-api-retrieve-image-sets-of-concrete-products.html
  - title: Retrieving sales units
    link: docs/pbc/all/product-information-management/page.version/base-shop/manage-using-glue-api/concrete-products/glue-api-retrieve-sales-units.html
---

This endpoint allows retrieving prices of concrete products.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see:

- [Install the Product Glue API](/docs/pbc/all/product-information-management/latest/base-shop/install-and-upgrade/install-glue-api/install-the-product-glue-api.html)
- [Install the Prices Glue API](/docs/pbc/all/price-management/latest/base-shop/install-and-upgrade/install-the-product-price-glue-api.html)

## Retrieve prices of a concrete product

To retrieve prices of a concrete product, send the request:

---
`GET` **/concrete-products/*{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}*/concrete-product-prices**

---

| PATH PARAMETER | DESCRIPTION |
|-|-|
|***{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}*** | SKU of a concrete product to get the price of. |

### Request

| REQUEST | USAGE |
|-|-|
| `GET https://glue.mysprykershop.com/concrete-products/001_25904006/concrete-product-prices` | Retrieve the prices of the `001_25904006` product. |
| `GET https://glue.mysprykershop.com/concrete-products/001_25904006/concrete-product-prices?currency=CHF&priceMode=GROSS_MODE` | Retrieve the gross price of the 001_25904006 product in Swiss Franc. |

| STRING PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
|-|-|-|
| currency | Defines the currency to retrieve the price in. | USD, EUR, CHF |
| priceMode | Defines the price mode to retrieve the price in. | GROSS_MODE, NET_MODE |

### Response

<details><summary>Response sample: retrieve default prices of a concrete product</summary>

```json
{
    "data": [
        {
            "type": "concrete-product-prices",
            "id": "001_25904006",
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
                "self": "https://glue.mysprykershop.com/concrete-products/001_25904006/concrete-product-prices"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/concrete-products/001_25904006/concrete-product-prices"
    }
}
```

</details>

<details><summary>Response sample: retrieve default and volume prices of a concrete product</summary>

```json
{
    "data": [
        {
            "type": "concrete-product-prices",
            "id": "093_24495843",
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
                "self": "https://glue.mysprykershop.com/concrete-products/093_24495843/concrete-product-prices"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/concrete-products/093_24495843/concrete-product-prices"
    }
}
```

</details>

<details><summary>Response sample: retrieve a gross price in Swiss Franc of a concrete product</summary>

```json
{
    "data": [
        {
            "type": "concrete-product-prices",
            "id": "001_25904006",
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
                "self": "https://glue.mysprykershop.com/concrete-products/001_25904006/concrete-product-prices"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/concrete-products/001_25904006/items?currency=CHF&priceMode=GROSS_MODE"
    }
}
```

</details>

{% include pbc/all/glue-api-guides/latest/concrete-product-prices-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/latest/concrete-product-prices-response-attributes.md -->


## Possible errors

| CODE | REASON |
|-|-|
| 302 | Concrete product is not found. |
| 308 | Can't find concrete product prices. |
| 312 | Concrete product sku is not specified. |
| 302 | Concrete product is not found. |
| 404 | Request URL or type is wrong. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/latest/rest-api/reference-information-glueapplication-errors.html).
