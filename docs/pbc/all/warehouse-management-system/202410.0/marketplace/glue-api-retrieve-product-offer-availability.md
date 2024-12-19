---
title: "Glue API: Retrieve product offer availability"
description: Learn how to retrieve Marketplace product offer availabilities via Glue API for your Spryker Marketplace projects.
template: glue-api-storefront-guide-template
last_updated: Nov 21, 2023
redirect_from:
  - /docs/marketplace/dev/glue-api-guides/202311.0/product-offers/retrieving-product-offer-availability.html
related:
  - title: Retrieving product offer prices
    link: docs/pbc/all/price-management/page.version/marketplace/glue-api-retrieve-product-offer-prices.html
  - title: Retrieving product offers
    link: docs/pbc/all/offer-management/page.version/marketplace/glue-api-retrieve-product-offers.html
---

This document describes how to retrieve product offer availabilities via Glue API.


## Installation

For detailed information about the modules that provide the API functionality and related installation instructions, see:
* [Install the Marketplace Product Offer Glue API](/docs/pbc/all/offer-management/{{page.version}}/marketplace/install-and-upgrade/install-glue-api/install-the-marketplace-product-offer-glue-api.html)
* [Install the Marketplace Product Offer Prices Glue API](/docs/pbc/all/price-management/{{page.version}}/marketplace/install-and-upgrade/install-glue-api/install-the-marketplace-product-offer-prices-glue-api.html)
* [Install the Marketplace Product Offer Volume Prices Glue API](/docs/pbc/all/price-management/{{page.version}}/marketplace/install-and-upgrade/install-glue-api/install-the-marketplace-product-offer-prices-glue-api.html)

## Retrieve availability of a product offer

To retrieve a availability of a product offer, send the request:

***
`GET` {% raw %}**/product-offers/*{{offerId}}*/product-offer-availabilities**{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| ------------------ | ---------------------- |
| {% raw %}***{{offerId}}***{% endraw %} | Unique identifier of a product offer to retrieve the availability of. To get it, [retrieve the offers of a concrete product](/docs/pbc/all/product-information-management/{{page.version}}/marketplace/manage-using-glue-api/glue-api-retrieve-product-offers-of-concrete-products.html). |

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
                "self": "https://glue.mysprykershop.com/product-offers/offer56/product-offer-availabilities"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/product-offers/offer56/product-offer-availabilities"
    }
}
```

{% include pbc/all/glue-api-guides/{{page.version}}/product-offer-availabilities-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/product-offer-availabilities-response-attributes.md -->



## Possible errors

| CODE | DESCRIPTION |
| - | -  |
| 3701     | Product offer was not found. |
| 3702     | Product offer ID is not specified. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).
