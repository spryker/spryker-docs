---
title: Retrieving abstract product prices
originalLink: https://documentation.spryker.com/v6/docs/retrieving-abstract-product-prices
redirect_from:
  - /v6/docs/retrieving-abstract-product-prices
  - /v6/docs/en/retrieving-abstract-product-prices
---

This endpoint allows to retrieve detailed information about prices of abstract products. 



## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see:
* [Glue API: Products Feature Integration](https://documentation.spryker.com/docs/glue-api-products-feature-integration).


## Retrieve prices of an abstract product

To retrieve prices of an abstract prdocut, send the request:

---
`GET` **/abstract-products/*{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}*/abstract-product-prices**

---


| Path parameter | Description |
| --- | --- |
| ***{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}*** | SKU of an abstract product to retrieve the prices of. |


### Request


| Request  | Usage |
| --- | --- |
| `GET http://glue.mysprykershop.com/abstract-products/001/abstract-product-prices` | Retrieve the price of the `001` product.  |
| `GET http://glue.mysprykershop.com/abstract-products/001/abstract-product-prices?currency=CHF&priceMode=GROSS_MODE` | Retrieve the gross price of the `001` product in Swiss Franc. |

| String parameter | Description | Exemplary values |
| --- | --- | --- |
| currency | Defines the currency to retrieve the price in. | USD, EUR, CHF |
| priceMode | 	Defines the price mode to retrieve the price in.  | GROSS_MODE, NET_MODE |



### Response


<details open>
    <summary>Response sample</summary>

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

<details open>
    <summary>Response sample with a gross price in Swiss Franc</summary>

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

<a name="prices-response-attributes"></a>
| Field | Type | Description |
| --- | --- | --- |
| price | Integer | Price to pay for that product in cents. |
| priceTypeName|String|Price type. |
| netAmount|Integer|Net price in cents.|
|grossAmount|Integer|Gross price in cents.|
|currency.code|String|Currency code.|
|currency.name|String|Currency name.|
|currency.symbol | String | Currency symbol. |


## Possible errors

| Code | Meaning |
| --- | --- |
| 307 | Can't find abstract product prices. |
| 311 | Abstract product SKU is not specified. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](https://documentation.spryker.com/docs/reference-information-glueapplication-errors).



