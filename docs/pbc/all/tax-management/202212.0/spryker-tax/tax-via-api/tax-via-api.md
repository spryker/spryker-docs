---
title: Retrieve tax sets
description: Retrieve details information about tax sets of abstract products.
last_updated: Jun 30, 2023
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-tax-sets
originalArticleId: 9b8f60f0-3815-4d5b-94df-64deb0771117
redirect_from:
  - /2021080/docs/retrieving-tax-sets
  - /2021080/docs/en/retrieving-tax-sets
  - /docs/retrieving-tax-sets
  - /docs/en/retrieving-tax-sets
  - /docs/scos/dev/glue-api-guides/201811.0/managing-products/abstract-products/retrieving-tax-sets.html
  - /docs/scos/dev/glue-api-guides/201903.0/managing-products/abstract-products/retrieving-tax-sets.html
  - /docs/scos/dev/glue-api-guides/201907.0/managing-products/abstract-products/retrieving-tax-sets.html
  - /docs/scos/dev/glue-api-guides/202005.0/managing-products/abstract-products/retrieving-tax-sets.html
  - /docs/scos/dev/glue-api-guides/202212.0/managing-products/abstract-products/retrieving-tax-sets.html
  - /docs/pbc/all/tax-management/202212.0/manage-via-glue-api/retrieve-tax-sets.html
  - /docs/pbc/all/tax-management/202212.0/base-shop/manage-using-glue-api/retrieve-tax-sets-when-retrieving-abstract-products.html
  - /docs/pbc/all/tax-management/202212.0/base-shop/manage-using-glue-api/retrieve-tax-sets.html
related:
  - title: Retrieving abstract products
    link: docs/pbc/all/product-information-management/page.version/base-shop/manage-using-glue-api/abstract-products/glue-api-retrieve-abstract-products.html
---

## /abstract-products/{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}/product-tax-sets

To retrieve tax sets of a product, send the request:

---
`GET /abstract-products/{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}/product-tax-sets`
---

### Request

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| abstract_product_sku | SKU of an abstract product to get the tax sets of. |

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

<a name="tax-sets-response-attributes"></a>

| ATTRIBUTE | DESCRIPTION |
| --- | --- |
| name | Tax set name |
| `restTaxRates.name` | Tax rate name |
| `restTaxRates.rate` | Tax rate |
| `restTaxRates.country` | Applicable country for the tax rate |

### Possible errors

| CODE | REASON |
| --- | --- |
| 310 | Could not get tax set, product abstract with provided id not found. |
| 311 | Abstract product SKU is not specified. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/scos/dev/glue-api-guides/{{site.version}}/reference-information-glueapplication-errors.html).

## /abstract-products/{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}?include=product-tax-sets

To retrieve tax sets of a product, send the request:

---
`GET /abstract-products/{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}?include=product-tax-sets`
---

### Request

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| abstract_product_sku | SKU of an abstract product to get information for. |

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

{% include pbc/all/glue-api-guides/202212.0/retrieve-an-abstract-product-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202212.0/retrieve-an-abstract-product-response-attributes.md -->

### Possible errors

| CODE | REASON |
|-|-|
| 301 | Abstract product is not found. |
| 311 | Abstract product SKU is not specified. |

