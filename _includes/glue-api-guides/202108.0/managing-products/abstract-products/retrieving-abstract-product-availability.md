---
title: Retrieving abstract product availability
description: Retrieve information about availability of abstract products.
last_updated: Jul 12, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-abstract-product-availability
originalArticleId: c712b4c5-0418-48a7-bb0a-bafd208dcf17
redirect_from:
  - /2021080/docs/retrieving-abstract-product-availability
  - /2021080/docs/en/retrieving-abstract-product-availability
  - /docs/retrieving-abstract-product-availability
  - /docs/en/retrieving-abstract-product-availability
---

This endpoint allows retrieving information about availability of abstract products.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see [Glue API: Inventory Management feature integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-inventory-management-feature-integration.html)

## Retrieve availability of an abstract product

To retrieve availability of an abstract product, send the request:

---
`GET` **/abstract-products/*{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}*/abstract-product-availabilities**

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}*** | SKU of an abstract product to get availability for. |

### Request

Request sample: `GET http://glue.mysprykershop.com/abstract-products/001/abstract-product-availabilities`

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

| FIELD | TYPE | DESCRIPTION |
| --- | --- | --- |
| availability | Boolean | Boolean to inform about the availability |
| quantity | Integer | Available stock (all warehouses aggregated) |


## Possible errors

| CODE | REASON |
| --- | --- |
| 305 | Availability is not found. |
| 311 | Abstract product SKU is not specified. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/scos/dev/glue-api-guides/{{page.version}}/reference-information-glueapplication-errors.html).
