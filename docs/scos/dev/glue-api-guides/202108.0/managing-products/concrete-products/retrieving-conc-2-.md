---
title: Retrieving concrete product prices
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-concrete-product-prices
redirect_from:
  - /2021080/docs/retrieving-concrete-product-prices
  - /2021080/docs/en/retrieving-concrete-product-prices
---

This endpoint allows retrieving prices of concrete products.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see:

* [Glue API: Products feature integration](https://documentation.spryker.com/docs/glue-api-products-feature-integration)
* [Glue API: Prices feature integration](https://documentation.spryker.com/2021080/docs/glue-api-prices-feature-integration)

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
| `GET http://glue.mysprykershop.com/concrete-products/001_25904006/concrete-product-prices` | Retrieve the prices of the 001_25904006 product. |
| `GET http://glue.mysprykershop.com/concrete-products/001_25904006/concrete-product-prices?currency=CHF&priceMode=GROSS_MODE` | Retrieve the gross price of the 001_25904006 product in Swiss Franc. |

| STRING PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
|-|-|-|
| currency | Defines the currency to retrieve the price in. | USD, EUR, CHF |
| priceMode | Defines the price mode to retrieve the price in. | GROSS_MODE, NET_MODE |

### Response

<details><summary>Response sample with default concrete product prices</summary>

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
                "self": "http://glue.mysprykershop.com/concrete-products/001_25904006/concrete-product-prices"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/concrete-products/001_25904006/concrete-product-prices"
    }
}
```

</details>

<details><summary>Response sample with default and volume concrete prices</summary>

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

<details><summary>Response sample with a gross price in Swiss Franc for a concrete product</summary>

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
                "self": "http://glue.mysprykershop.com/concrete-products/001_25904006/concrete-product-prices"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/concrete-products/001_25904006/items?currency=CHF&priceMode=GROSS_MODE"
    }
}
```

</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
|-|-|-|
| price | Integer | Price to pay for that product in cents. |
| priceTypeName | String | Price type. |
| netAmount | Integer | Net price in cents. |
| grossAmount | Integer | Gross price in cents. |
| currency.code | String | Currency code. |
| currency.name | String | Currency name. |
| currency.symbol | String | Currency symbol. |
| volumePrices | Array | An array of objects defining the [volume prices](https://documentation.spryker.com/docs/volume-prices-overview) for the concrete product. |
| netAmount | Integer | Net price in cents. |
| grossAmount | Integer | Gross price in cents. |
| quantity | Integer | Number of items. |

## Possible errors

| CODE | MEANING |
|-|-|
| 308 | Can't find concrete product prices. |
| 312 | Concrete product sku is not specified. |
| 302 | Concrete product is not found. |
| 404 | Request URL or type is wrong. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](https://documentation.spryker.com/docs/reference-information-glueapplication-errors).
