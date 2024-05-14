---
title: Retrieve tax sets when retrieving abstract products
description: Learn how to retrieve tax sets when retrieving abstract products using Glue API.
last_updated: Jun 21, 2021
template: glue-api-storefront-guide-template
redirect_from:
  - /docs/pbc/all/tax-management/202311.0/manage-via-glue-api/retrieve-tax-sets-when-retrieving-abstract-products.html
  - /docs/pbc/all/tax-management/202311.0/base-shop/spryker-tax/manage-using-glue-api/retrieve-tax-sets-when-retrieving-abstract-products.html
  - /docs/pbc/all/tax-management/202204.0/base-shop/manage-using-glue-api/retrieve-tax-sets-when-retrieving-abstract-products.html
---

This document describes how to retrieve tax sets of abstract products. To retrieve full information of abstract products, see [Retrieve abstract products](/docs/pbc/all/product-information-management/{{site.version}}/base-shop/manage-using-glue-api/abstract-products/glue-api-retrieve-abstract-products.html).

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see [Glue API: Products Feature Integration](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-glue-api.html).

## Retrieve tax sets of an abstract product

---
`GET` **/abstract-products/*{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}?include=product-tax-sets***

---


| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}*** | SKU of an abstract product to get information for. |

### Request


`GET https://glue.mysprykershop.com/abstract-products/001?include=product-tax-sets`:  Retrieve information about the abstract product with SKU `001` with its tax sets.



### Response




<details>
<summary markdown='span'>Response sample: retrieve information about an abstract product with the details about tax sets</summary>

```json
{
    "data": {
        "type": "abstract-products",
        "id": "001",
        "attributes": {
            "sku": "001"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/abstract-products/001?include=product-tax-sets"
        },
        "relationships": {
            "product-tax-sets": {
                "data": [
                    {
                        "type": "product-tax-sets",
                        "id": "0e93b0d4-6d83-5fc1-ac1d-d6ae11690406"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "product-tax-sets",
            "id": "0e93b0d4-6d83-5fc1-ac1d-d6ae11690406",
            "attributes": {
                "name": "Entertainment Electronics",
                "restTaxRates": [
                    {
                        "name": "Austria Standard",
                        "rate": "20.00",
                        "country": "AT"
                    },
                    {
                        "name": "Belgium Standard",
                        "rate": "21.00",
                        "country": "BE"
                    },
                    {
                        "name": "Denmark Standard",
                        "rate": "25.00",
                        "country": "DK"
                    },
                    {
                        "name": "France Standard",
                        "rate": "20.00",
                        "country": "FR"
                    },
                    {
                        "name": "Germany Standard",
                        "rate": "19.00",
                        "country": "DE"
                    }
                ]
            },
            "links": {
                "self": "https://glue.mysprykershop.com/abstract-products/001/product-tax-sets"
            }
        }
    ]
}
```
</details>

{% include pbc/all/glue-api-guides/202311.0/abstract-products-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/abstract-products-response-attributes.md -->

{% include pbc/all/glue-api-guides/202311.0/product-tax-sets-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/product-tax-sets-response-attributes.md -->

## Possible errors

| CODE | REASON |
|-|-|
| 301 | Abstract product is not found. |
| 311 | Abstract product SKU is not specified. |
