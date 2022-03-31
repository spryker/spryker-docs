---
title: Retrieving product offer availabilities
description: Retrieve Marketplace product offer availabilities via Glue API
template: glue-api-storefront-guide-template
---

This document describes how to retrieve product offer availabilities via Glue API.


## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see:
* [GLUE API: Marketplace Product Offer feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/marketplace-product-offer-feature-integration.html)
* [Glue API: Marketplace Product Offer Prices feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/marketplace-product-offer-prices-feature-integration.html)
* [Glue API: Marketplace Product Offer Volume Prices feature integration](/docs/marketplace/dev/feature-integration-guides/{{page.version}}/glue/marketplace-product-offer-volume-prices.html)

## Retrieve availability of a product offer

To retrieve a availability of a product offer, send the request:

***
`GET` {% raw %}**/product-offers/*{{offerId}}*/product-offer-availabilities**{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| ------------------ | ---------------------- |
| {% raw %}***{{offerId}}***{% endraw %} | Unique identifier of a product offer to retrieve the availability of. To get it, [retrieve the offers of a concrete product](/docs/marketplace/dev/glue-api-guides/{{page.version}}/concrete-products/retrieving-product-offers-of-concrete-products.html). |

### Request

Request sample: retrieve availability of a product offer

`GET https://glue.mysprykershop.com/product-offers/offer56/product-offer-availabilities`

### Response

Response sample: retrieve availability of a product offer

```json
{
    "data": [
        {
            "type": "product-offer-availabilities",
            "id": "offer56",
            "attributes": {
                "isNeverOutOfStock": true,
                "availability": true,
                "quantity": "0.0000000000"
            },
            "links": {
                "self": "http://glue.mysprykershop.com/product-offers/offer56/product-offer-availabilities"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/product-offers/offer56/product-offer-availabilities"
    }
}
```

<a name="product-offer-availability-response-attributes"></a>

|ATTRIBUTE  |TYPE  |DESCRIPTION  |
|---------|---------|---------|
| isNeverOutOfStock          |  Boolean         | Shows if the product offer is never out of stock.          |
| availability          | Boolean          |Defines if the product offer is available.           |
| quantity          | Integer          |Stock of the product offer.           |


## Possible errors

| CODE | DESCRIPTION |
| - | -  |
| 3701     | Product offer was not found. |
| 3702     | Product offer ID is not specified. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/scos/dev/glue-api-guides/{{page.version}}/reference-information-glueapplication-errors.html).
