---
title: Retrieving abstract product availability
description: Retrieve information about availability of abstract products.
last_updated: Feb 2, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/v6/docs/retrieving-abstract-product-availability
originalArticleId: 4c61d644-4814-4638-a8f0-8bcac5066e71
redirect_from:
  - /v6/docs/retrieving-abstract-product-availability
  - /v6/docs/en/retrieving-abstract-product-availability
---

This endpoint allows to retrieve information about availability of abstract products. 


## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see:
* [Glue API: Products Feature Integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-product-feature-integration.html).


## Retrieve availability of an abstract product

To retrieve availability of an abstract product, send the request:

---
`GET` **/abstract-products/*{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}*/abstract-product-availabilities**


| Path parameter | Description |
| --- | --- |
| ***{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}*** | SKU of an abstract product to get availability for. |

### Request

Request sample : `GET http://glue.mysprykershop.com/abstract-products/001/abstract-product-availabilities`

### Response

Response sample:

```json
{
    "data": [{
        "type": "abstract-product-availabilities",
        "id": "001",
        "attributes": {
            "availability": true,
            "quantity": 10
        },
        "links": {
            "self": "http://glue.mysprykershop.com/abstract-products/001/abstract-product-availabilities"
        }
    }],
    "links": {
        "self": "http://glue.mysprykershop.com/abstract-products/001/abstract-product-availabilities"
    }
}
```

<a name="abstract-product-availability-response-attributes"></a>
         
| Field | Type | Description |
| --- | --- | --- |
| availability | Boolean | Boolean to inform about the availability |
| quantity | Integer | Available stock (all warehouses aggregated) |


## Possible errors

| Code | Meaning |
| --- | --- |
| 305 | Availability is not found. |
| 311 | Abstract product SKU is not specified. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/scos/dev/glue-api-guides/{{page.version}}/reference-information-glueapplication-errors.html).
