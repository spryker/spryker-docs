---
title: Retrieving sales units
description: Retrieve sales units of concrete products.
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-sales-units
originalArticleId: 4150363f-4c47-4e7c-b7e6-d1430ce864ba
redirect_from:
  - /2021080/docs/retrieving-sales-units
  - /2021080/docs/en/retrieving-sales-units
  - /docs/retrieving-sales-units
  - /docs/en/retrieving-sales-units
related:
  - title: Measurement units feature overview
    link: docs/scos/user/features/page.version/measurement-units-feature-overview.html
---

This endpoint allows retrieving sales units of concrete products.

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see:
* [Glue API: Products Feature Integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-product-feature-integration.html).
* [Glue API: Measurement Units Feature Integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-measurement-units-feature-integration.html).

## Retrieve sales units

To retrieve sales units of a concrete product, send the request:

---
`GET` **/concrete-products/*{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}*/sales-units**

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
|***{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}*** | SKU of a concrete product to get sales units for. |

### Request

Request sample: `GET http://glue.mysprykershop.com/concrete-products/cable-vga-1-2/sales-units`

### Response

<details>
<summary markdown='span'>Response sample</summary>

```json
{
    "data": [
        {
            "type": "sales-units",
            "id": "34",
            "attributes": {
                "conversion": 0.01,
                "precision": 10,
                "isDisplayed": true,
                "isDefault": false,
                "productMeasurementUnitCode": "CMET"
            },
            "links": {
                "self": "http://glue.mysprykershop.com/concrete-products/cable-vga-1-2/sales-units/34"
            }
        },
        {
            "type": "sales-units",
            "id": "33",
            "attributes": {
                "conversion": 1,
                "precision": 100,
                "isDisplayed": true,
                "isDefault": true,
                "productMeasurementUnitCode": "METR"
            },
            "links": {
                "self": "http://glue.mysprykershop.com/concrete-products/cable-vga-1-2/sales-units/33"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/concrete-products/cable-vga-1-2/sales-units"
    }
}
```

</details>

<a name="sales-units-response-attributes"></a>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| conversion | integer | Factor to convert a value from sales to base unit. If it is "null", the information is taken from the global conversions. |
| precision | integer | Ratio between a sales unit and a base unit. |
| is displayed | boolean | Defines if the sales unit is displayed on the product details page. |
| is default | boolean | Defines if the sales unit is selected by default on the product details page. |
| measurementUnitCode | string | Code of the measurement unit. |

See [Retrieving Measurement Units](/docs/scos/dev/glue-api-guides/{{page.version}}/retrieving-measurement-units.html) for more information on managing the sales units.

## Possible errors

| CODE  | REASON |
| --- | --- |
| 302 | Concrete product is not found. |
| 312  | Concrete product SKU is not specified. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/scos/dev/glue-api-guides/{{page.version}}/reference-information-glueapplication-errors.html).
