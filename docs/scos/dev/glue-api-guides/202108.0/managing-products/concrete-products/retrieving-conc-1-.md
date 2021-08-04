---
title: Retrieving concrete product availability
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-concrete-product-availability
redirect_from:
  - /2021080/docs/retrieving-concrete-product-availability
  - /2021080/docs/en/retrieving-concrete-product-availability
---

This endpoint allows to retrieve availability of concrete products.


## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see:
* [Glue API: Inventory Management feature integration](https://documentation.spryker.com/docs/glue-api-inventory-management-feature-integration)



## Retrieve availability of a concrete product

---
`GET` **/concrete-products/*{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}*/concrete-product-availabilities**

---

| Path parameter | Description |
| --- | --- |
| ***{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}*** | SKU of a concrete product to get abailability for. |

### Request

Request sample: `GET http://glue.mysprykershop.com/concrete-products/001_25904006/concrete-product-availabilities`

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](https://documentation.spryker.com/docs/reference-information-glueapplication-errors).

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

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](https://documentation.spryker.com/docs/reference-information-glueapplication-errors).

