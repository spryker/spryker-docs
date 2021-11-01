---
title: Retrieving tax sets
description: Retrieve details information about tax sets of abstract products.
last_updated: Feb 2, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/v6/docs/retrieving-tax-sets
originalArticleId: 643a3fb7-80b8-431b-84e0-e550d061fd3c
redirect_from:
  - /v6/docs/retrieving-tax-sets
  - /v6/docs/en/retrieving-tax-sets
related:
  - title: Wishlist feature walkthrough
    link: docs/scos/dev/feature-walkthroughs/page.version/wishlist-feature-walkthrough.html
---

This endpoint allows to retrieve detailed information about tax sets of abstract products.

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see:
* [Glue API: Products Feature Integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-product-feature-integration.html).


## Retrieve tax sets

To retrieve tax sets of a product, send the request:

---
`GET` **/abstract-products/*{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}*/tax-sets**

---

| Path parameter | Description |
| --- | --- |
| ***{% raw %}{{{% endraw %}abstract_product_sku{% raw %}}}{% endraw %}*** | SKU of an abstract product to get the tax sets of. |

### Request

Request sample: `GET http://glue.mysprykershop.com/abstract-products/209/product-tax-sets`

### Response

<details open>
    <summary markdown='span'>Response sample</summary>
    
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
| Attribute | Description |
| --- | --- |
| name | Tax set name |
| restTaxRates.name | Tax rate name |
| restTaxRates.rate | Tax rate |
| restTaxRates.country | Applicable country for the tax rate |

## Possible errors
 
 
| Code | Meaning |
| --- | --- |
| 310 | Could not get tax set, product abstract with provided id not found. |
| 311 | Abstract product SKU is not specified. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/scos/dev/glue-api-guides/{{page.version}}/reference-information-glueapplication-errors.html).

