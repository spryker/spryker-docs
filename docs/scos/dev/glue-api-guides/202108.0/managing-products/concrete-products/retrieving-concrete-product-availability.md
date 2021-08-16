---
title: Retrieving concrete product availability
description: Retrieve availability of concrete products.
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-concrete-product-availability
originalArticleId: 0c67acf3-3c48-484e-8a9a-3889189c7f56
redirect_from:
  - /2021080/docs/retrieving-concrete-product-availability
  - /2021080/docs/en/retrieving-concrete-product-availability
  - /docs/retrieving-concrete-product-availability
  - /docs/en/retrieving-concrete-product-availability
---

This endpoint allows to retrieve availability of concrete products.


## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see:
* [Glue API: Inventory Management feature integration](/docs/scos/dev/migration-and-integration/{{page.version}}/feature-integration-guides/glue-api/glue-api-inventory-management-feature-integration.html)



## Retrieve availability of a concrete product

---
`GET` **/concrete-products/*{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}*/concrete-product-availabilities**

---

| Path parameter | Description |
| --- | --- |
| ***{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}*** | SKU of a concrete product to get abailability for. |

### Request

Request sample: `GET http://glue.mysprykershop.com/concrete-products/001_25904006/concrete-product-availabilities`

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/scos/dev/glue-api-guides/{{page.version}}/reference-information-glueapplication-errors.html).

### Response


<details open>
    <summary>Response sample</summary>

```json
{
    "data": [{
        "type": "concrete-product-availabilities",
        "id": "001_25904006",
        "attributes": {
            "availability": true,
            "quantity": 10,
            "isNeverOutOfStock": false
        },
        "links": {
            "self": "http://glue.mysprykershop.com/concrete-products/001_25904006/concrete-product-availabilities"
        }
    }],
    "links": {
        "self": "http://glue.mysprykershop.com/concrete-products/001_25904006/concrete-product-availabilities"
    }
}
```

</details>

<a name="concrete-product-availability-response-attributes"></a>

| Field | Type | Description |
| --- | --- | --- |
| availability | Boolean | Boolean to inform about the availability. |
| quantity|Integer|Available stock (all warehouses aggregated). |
| isNeverOutOfStock | Boolean | A boolean to show if this is a product that is never out of stock. |


## Possible errors

| Code | Meaning |
| --- | --- |
| 306 | Availability is not found. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/scos/dev/glue-api-guides/{{page.version}}/reference-information-glueapplication-errors.html).

