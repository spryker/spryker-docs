---
title: Retrieve concrete product availability
description: Retrieve availability of concrete products.
last_updated: Jul 12, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-concrete-product-availability
originalArticleId: 0c67acf3-3c48-484e-8a9a-3889189c7f56
redirect_from:
  - /docs/scos/dev/glue-api-guides/201811.0/managing-products/concrete-products/retrieving-concrete-product-availability.html
  - /docs/scos/dev/glue-api-guides/201907.0/managing-products/concrete-products/retrieving-concrete-product-availability.html
  - /docs/scos/dev/glue-api-guides/202005.0/managing-products/concrete-products/retrieving-concrete-product-availability.html
  - /docs/scos/dev/glue-api-guides/202200.0/managing-products/concrete-products/retrieving-concrete-product-availability.html
  - /docs/scos/dev/glue-api-guides/202307.0/managing-products/concrete-products/retrieving-concrete-product-availability.html
  - /docs/pbc/all/warehouse-management-system/202307.0/base-shop/manage-using-glue-api/retrieve-concrete-product-availability.html
related:
  - title: "Glue API: Retrieve concrete products"
    link: docs/pbc/all/product-information-management/page.version/base-shop/manage-using-glue-api/concrete-products/glue-api-retrieve-concrete-products.html
  - title: Retrieving concrete product prices
    link: docs/pbc/all/price-management/page.version/base-shop/manage-using-glue-api/glue-api-retrieve-concrete-product-prices.html
  - title: Retrieving image sets of concrete products
    link: docs/pbc/all/product-information-management/page.version/base-shop/manage-using-glue-api/concrete-products/glue-api-retrieve-image-sets-of-concrete-products.html
  - title: Retrieving sales units
    link: docs/pbc/all/product-information-management/page.version/base-shop/manage-using-glue-api/concrete-products/glue-api-retrieve-sales-units.html
---

This endpoint allows retrieving availability of concrete products.


## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see:
* [Install the Inventory Management Glue API](/docs/pbc/all/warehouse-management-system/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-inventory-management-glue-api.html)



## Retrieve availability of a concrete product

---
`GET` **/concrete-products/*{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}*/concrete-product-availabilities**

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}*** | SKU of a concrete product to get abailability for. |

### Request

Request sample: retrieve availability of a concrete product

---
`GET http://glue.mysprykershop.com/concrete-products/001_25904006/concrete-product-availabilities`
---

### Response


<details>
<summary markdown='span'>Response sample: retrieve availability of a concrete product</summary>

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

| FIELD | TYPE | DESCRIPTION |
| --- | --- | --- |
| availability | Boolean | Boolean to inform about the availability. |
| quantity|Integer|Available stock (all warehouses aggregated). |
| isNeverOutOfStock | Boolean | A boolean to show if this is a product that is never out of stock. |


## Possible errors

| CODE | REASON |
| --- | --- |
| 302   | Concrete product is not found. |
| 306 | Availability is not found. |
| 312 | Concrete product sku is not specified. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{site.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).
