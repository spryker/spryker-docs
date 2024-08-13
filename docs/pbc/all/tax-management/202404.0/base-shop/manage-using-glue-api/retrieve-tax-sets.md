---
title: Retrieve tax sets
description: Retrieve details information about tax sets of abstract products.
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-tax-sets
originalArticleId: 9b8f60f0-3815-4d5b-94df-64deb0771117
redirect_from:
  - /docs/scos/dev/glue-api-guides/202311.0/managing-products/abstract-products/retrieving-tax-sets.html
  - /docs/pbc/all/tax-management/202311.0/manage-via-glue-api/retrieve-tax-sets.html
  - /docs/pbc/all/tax-management/202311.0/spryker-tax/base-shop/manage-using-glue-api/retrieve-tax-sets.html
  - /docs/pbc/all/tax-management/202204.0/base-shop/manage-using-glue-api/retrieve-tax-sets.html
related:
  - title: Retrieving abstract products
    link: docs/pbc/all/product-information-management/page.version/base-shop/manage-using-glue-api/abstract-products/glue-api-retrieve-abstract-products.html
  - title: Retrieve abstract product availability
    link: docs/pbc/all/warehouse-management-system/page.version/base-shop/manage-using-glue-api/glue-api-retrieve-abstract-product-availability.html
  - title: Retrieving abstract product prices
    link: docs/pbc/all/price-management/page.version/base-shop/manage-using-glue-api/glue-api-retrieve-abstract-product-prices.html
  - title: Retrieving image sets of abstract products
    link: docs/pbc/all/product-information-management/page.version/base-shop/manage-using-glue-api/abstract-products/glue-api-retrieve-image-sets-of-abstract-products.html
---

This endpoint allows retrieving detailed information about tax sets of abstract products.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see [Install the Product Glue API](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-glue-api.html).

## Retrieve tax sets

To retrieve tax sets of a product, send the request:

---
`GET` **/abstract-products/*{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}*/product-tax-sets**

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}*** | SKU of an abstract product to get the tax sets of. |

### Request

Request sample: retrieve tax sets

`GET http://glue.mysprykershop.com/abstract-products/209/product-tax-sets`

### Response

<details>
<summary markdown='span'>Response sample: retrieve tax sets</summary>

```json
{
    "data": [
        {
            "type": "product-tax-sets",
            "id": "deb94215-a1fc-5cdc-af6e-87ec3a847480",
            "attributes": {
                "name": "Communication Electronics",
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
                        "name": "Bulgaria Standard",
                        "rate": "20.00",
                        "country": "BG"
                    },
                    {
                        "name": "Czech Republic Standard",
                        "rate": "21.00",
                        "country": "CZ"
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
                    },
                    {
                        "name": "Hungary Standard",
                        "rate": "27.00",
                        "country": "HU"
                    },
                    {
                        "name": "Italy Standard",
                        "rate": "22.00",
                        "country": "IT"
                    },
                    {
                        "name": "Netherlands Standard",
                        "rate": "21.00",
                        "country": "NL"
                    },
                    {
                        "name": "Romania Standard",
                        "rate": "20.00",
                        "country": "RO"
                    },
                    {
                        "name": "Slovakia Standard",
                        "rate": "20.00",
                        "country": "SK"
                    },
                    {
                        "name": "Slovenia Standard",
                        "rate": "22.00",
                        "country": "SI"
                    },
                    {
                        "name": "Luxembourg Reduced1",
                        "rate": "3.00",
                        "country": "LU"
                    },
                    {
                        "name": "Poland Reduced1",
                        "rate": "5.00",
                        "country": "PL"
                    }
                ]
            },
            "links": {
                "self": "http://glue.mysprykershop.com/abstract-products/177/product-tax-sets"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/abstract-products/177/product-tax-sets"
    }
}
```
</details>

{% include pbc/all/glue-api-guides/{{page.version}}/product-tax-sets-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/{{page.version}}/product-tax-sets-response-attributes.md -->


## Possible errors

| CODE | REASON |
| --- | --- |
| 310 | Could not get tax set, product abstract with provided id not found. |
| 311 | Abstract product SKU is not specified. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{site.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).
