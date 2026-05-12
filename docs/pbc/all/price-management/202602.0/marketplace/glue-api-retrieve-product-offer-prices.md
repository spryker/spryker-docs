---
title: "Glue API: Retrieve product offer prices"
description: Retrieve Marketplace product offer prices via Spryker Glue API for your Spryker Marketplace projects.
template: glue-api-storefront-guide-template
last_updated: Nov 21, 2023
redirect_from:
  - /docs/marketplace/dev/glue-api-guides/202311.0/product-offers/retrieving-product-offer-prices.html
related:
  - title: Retrieving product offers
    link: docs/pbc/all/offer-management/latest/marketplace/glue-api-retrieve-product-offers.html
  - title: Retrieving product offer availabilities
    link: docs/pbc/all/warehouse-management-system/latest/marketplace/glue-api-retrieve-product-offer-availability.html
---

This document describes how to retrieve product offer prices via Glue API.

## Installation

For detailed information about the modules that provide the API functionality and related installation instructions, see:
- [Install the Marketplace Product Offer Glue API](/docs/pbc/all/offer-management/latest/marketplace/install-and-upgrade/install-glue-api/install-the-marketplace-product-offer-glue-api.html)
- [Install the Marketplace Product Offer Prices Glue API](/docs/pbc/all/price-management/latest/marketplace/install-and-upgrade/install-glue-api/install-the-marketplace-product-offer-prices-glue-api.html)
- [Install the Marketplace Product Offer Volume Prices Glue API](/docs/pbc/all/price-management/latest/marketplace/install-and-upgrade/install-glue-api/install-the-marketplace-product-offer-prices-glue-api.html)

## Retrieve prices of a product offer


To retrieve prices of a product offer, send the request:

***
`GET` {% raw %}**/product-offers/*{{offerId}}*/product-offer-prices**{% endraw %}
***


| PATH PARAMETER | DESCRIPTION |
| ------------------ | ---------------------- |
| {% raw %}***{{offerId}}***{% endraw %} | Unique identifier of a product offer to retrieve the availability of. To get it, [retrieve the offers of a concrete product](/docs/pbc/all/product-information-management/latest/marketplace/manage-using-glue-api/glue-api-retrieve-product-offers-of-concrete-products.html). |

### Request

Request sample: retrieve prices of a product offer

`GET https://glue.mysprykershop.com/product-offers/offer54/product-offer-prices`

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
                "self": "https://glue.mysprykershop.com/product-offers/offer54/product-offer-prices"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/product-offers/offer54/product-offer-prices"
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
| prices.volumePrices   | Object  |  An array of objects defining the [volume prices](/docs/pbc/all/price-management/latest/base-shop/prices-feature-overview/volume-prices-overviewhe product offer.  |
| prices.volumePrices.grossAmount | Integer   |  Gross volume price in cents.         |
| prices.volumePrices.netAmount | Integer   | Net volume price in cents.          |
| prices.volumePrices.quantity  |  Integer         | Required quantity of items in offer for the volume price to apply.  |


## Other management options

Retrieve product offer prices as a relationship by [retrieving product offers](/docs/pbc/all/offer-management/latest/marketplace/glue-api-retrieve-product-offers.html)

## Possible errors

| CODE | DESCRIPTION |
| - | -  |
| 3701     | Product offer was not found. |
| 3702     | Product offer ID is not specified. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/integrations/spryker-glue-api/storefront-api/api-references/reference-information-storefront-application-errors.html).
