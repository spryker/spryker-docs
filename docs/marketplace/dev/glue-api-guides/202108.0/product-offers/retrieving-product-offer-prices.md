---
title: Retrieving product offer prices
description: Retrieve Marketplace product offer prices via Glue API
template: glue-api-storefront-guide-template
---

This document describes how to retrieve product offer prices via Glue API.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see:
* [GLUE API: Marketplace Product Offer feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/marketplace-product-offer-feature-integration.html)
* [Glue API: Marketplace Product Offer Prices feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/marketplace-product-offer-prices-feature-integration.html)
* [Glue API: Marketplace Product Offer Volume Prices feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/marketplace-product-offer-volume-prices.html)

## Retrieve prices of a product offer


To retrieve prices of a product offer, send the request:

***
`GET` {% raw %}**/product-offers/*{{offerId}}*/product-offer-prices**{% endraw %}
***


| PATH PARAMETER | DESCRIPTION |
| ------------------ | ---------------------- |
| {% raw %}***{{offerId}}***{% endraw %} | Unique identifier of a product offer to retrieve the availability of. To get it, [retrieve the offers of a concrete product](/docs/marketplace/dev/glue-api-guides/{{page.version}}/concrete-products/retrieving-product-offers-of-concrete-products.html). |

### Request

Request sample: retrieve prices of a product offer

`GET http://glue.mysprykershop.com/product-offers/offer54/product-offer-prices`

### Response

Response sample: retrieve prices of a product offer

```json
{
    "data": [
        {
            "type": "product-offer-prices",
            "id": "offer78",
            "attributes": {
                "price": 40522,
                "prices": [
                    {
                        "priceTypeName": "DEFAULT",
                        "netAmount": null,
                        "grossAmount": 40522,
                        "currency": {
                            "code": "EUR",
                            "name": "Euro",
                            "symbol": "€"                        
                        },
                        "volumePrices": [
                            {
                                "grossAmount": 38400,
                                "netAmount": 39100,
                                "quantity": 3
                            }

                        ]
                    }
                ]
            },

            "links": {
                "self": "http://glue.mysprykershop.com/product-offers/offer54/product-offer-prices"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/product-offers/offer54/product-offer-prices"
    }
}
```

<a name="product-offer-prices-response-attributes"></a>

|ATTRIBUTE  |TYPE  |DESCRIPTION  |
|---------|---------|---------|
| price |  Integer  | Price to pay for the product offer in cents.        |
| prices | Array | Prices of this product offer. |
| prices.priceTypeName   | String   | Price type.         |
| prices.netAmount   | Integer    | Net price in cents.    |
| prices.grossAmount   |  Integer  | Gross price in cents.  |
| prices.currency.code   | String  | Currency code.   |
| prices.currency.name   | String  | Currency name.  |
| prices.currency.symbol   | String  | Currency symbol.  |
| prices.volumePrices   | Object  |  An array of objects defining the [volume prices](/docs/scos/user/features/{{page.version}}/prices-feature-overview/volume-prices-overview.html) of the product offer.  |
| prices.volumePrices.grossAmount | Integer   |  Gross volume price in cents.         |
| prices.volumePrices.netAmount | Integer   | Net volume price in cents.          |
| prices.volumePrices.quantity  |  Integer         | Required quantity of items in offer for the volume price to apply.  |


## Other management options

Retrieve product offer prices as a relationship by [retrieving product offers](/docs/marketplace/dev/glue-api-guides/{{page.version}}/product-offers/retrieving-product-offers.html)

## Possible errors

| CODE | DESCRIPTION |
| - | -  |
| 3701     | Product offer was not found. |
| 3702     | Product offer ID is not specified. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/scos/dev/glue-api-guides/{{page.version}}/reference-information-glueapplication-errors.html).
