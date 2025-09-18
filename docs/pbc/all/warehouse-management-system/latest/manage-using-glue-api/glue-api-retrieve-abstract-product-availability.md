---
title: Retrieve abstract product availability
description: Learn how to retrieve information about availability of abstract products using Spryker GLUE API within your Spryker based projects.
last_updated: Jul 12, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-abstract-product-availability
originalArticleId: c712b4c5-0418-48a7-bb0a-bafd208dcf17
redirect_from:
  - /docs/scos/dev/glue-api-guides/202311.0/managing-products/abstract-products/retrieving-abstract-product-availability.html  
  - /docs/pbc/all/warehouse-management-system/202311.0/base-shop/manage-using-glue-api/retrieve-abstract-product-availability.html
  - /docs/pbc/all/warehouse-management-system/202204.0/base-shop/manage-using-glue-api/glue-api-retrieve-abstract-product-availability.html
related:
  - title: Retrieving abstract products
    link: docs/pbc/all/product-information-management/latest/base-shop/manage-using-glue-api/abstract-products/glue-api-retrieve-abstract-products.html
  - title: Retrieving abstract product prices
    link: docs/pbc/all/price-management/latest/base-shop/manage-using-glue-api/glue-api-retrieve-abstract-product-prices.html
  - title: Retrieving image sets of abstract products
    link: docs/pbc/all/product-information-management/latest/base-shop/manage-using-glue-api/abstract-products/glue-api-retrieve-image-sets-of-abstract-products.html
  - title: Retrieving tax sets
    link: docs/pbc/all/tax-management/latest/base-shop/manage-using-glue-api/retrieve-tax-sets.html
---

This endpoint allows retrieving information about availability of abstract products.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see [Install the Inventory Management Glue API](/docs/pbc/all/warehouse-management-system/latest/base-shop/install-and-upgrade/install-features/install-the-inventory-management-glue-api.html)

## Retrieve availability of an abstract product

To retrieve availability of an abstract product, send the request:

---
`GET` **/abstract-products/*{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}*/abstract-product-availabilities**

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}*** | SKU of an abstract product to get availability for. |

### Request

Request sample: retrieve availability of an abstract product

`GET http://glue.mysprykershop.com/abstract-products/001/abstract-product-availabilities`

### Response

Response sample: retrieve availability of an abstract product

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

{% include pbc/all/glue-api-guides/latest/abstract-product-availabilities-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/abstract-product-availabilities-response-attributes.md -->


## Possible errors

| CODE | REASON |
| --- | --- |
| 305 | Availability is not found. |
| 311 | Abstract product SKU is not specified. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/latest/rest-api/reference-information-glueapplication-errors.html).
