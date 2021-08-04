---
title: Retrieving abstract product prices
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-abstract-product-prices
redirect_from:
  - /2021080/docs/retrieving-abstract-product-prices
  - /2021080/docs/en/retrieving-abstract-product-prices
---

This endpoint allows retrieving detailed information about the prices of abstract products.

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see:
* [Glue API: Products feature integration](https://documentation.spryker.com/docs/glue-api-products-feature-integration)
* [Glue API: Prices feature integration](https://documentation.spryker.com/2021080/docs/glue-api-prices-feature-integration)

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
<details><summary>Response sample with default abstract product prices</summary>
   
```JSON
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
<summary>
Response sample with default prices and volume prices for an abstract product
</summary>
    
```JSON    
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

<details><summary>Response sample with a gross price in Swiss Franc for an abstract product</summary>
    
 ```JSON
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


| FIELD | TYPE | DESCRIPTION |
| --- | --- | --- |
| price | Integer | Price to pay for that product in cents. |
| priceTypeName | String | Price type. |
| netAmount | Integer | Net price in cents. |
| grossAmount | Integer | Gross price in cents. |
| currency.code | String | Currency code. |
| currency.name | String | Currency name. |
| currency.symbol | String | Currency symbol. |
| volumePrices | Array | An array of objects defining the [volume prices](https://documentation.spryker.com/docs/volume-prices) for the abstract product. |
| netAmount | Integer | Net price in cents. |
| grossAmount | Integer | Gross price in cents. |
| quantity | Integer | Number of items. |

## Possible errors

| CODE | MEANING |
| --- | --- |
| 307 | Abstract product price is not found (for example, becasue of the wrong abstract product SKU. |
| 311 | Abstract product SKU is not specified. |
| 404 | Request URL or type is wrong. |



