---
title: "Glue API: Retrieve sales units"
description: Retrieve sales units of concrete products.
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-sales-units
originalArticleId: 4150363f-4c47-4e7c-b7e6-d1430ce864ba
redirect_from:
  - /docs/scos/dev/glue-api-guides/202311.0/managing-products/concrete-products/retrieving-sales-units.html
  - /docs/pbc/all/product-information-management/202311.0/manage-using-glue-api/concrete-products/glue-api-retrieve-sales-units.html
  - /docs/pbc/all/product-information-management/202204.0/base-shop/manage-using-glue-api/concrete-products/glue-api-retrieve-sales-units.html
related:
  - title: "Glue API: Retrieve concrete products"
    link: docs/pbc/all/product-information-management/page.version/base-shop/manage-using-glue-api/concrete-products/glue-api-retrieve-concrete-products.html
  - title: Retrieve concrete product availability
    link: docs/pbc/all/warehouse-management-system/page.version/base-shop/manage-using-glue-api/glue-api-retrieve-concrete-product-availability.html
  - title: Retrieving concrete product prices
    link: docs/pbc/all/price-management/page.version/base-shop/manage-using-glue-api/glue-api-retrieve-concrete-product-prices.html
  - title: Retrieving image sets of concrete products
    link: docs/pbc/all/product-information-management/page.version/base-shop/manage-using-glue-api/concrete-products/glue-api-retrieve-image-sets-of-concrete-products.html
  - title: Measurement units feature overview
    link: docs/pbc/all/product-information-management/page.version/base-shop/feature-overviews/measurement-units-feature-overview.html
---

This endpoint allows retrieving sales units of concrete products.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see:
* [Glue API: Products Feature Integration](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-product-glue-api.html).
* [Glue API: Measurement Units Feature Integration](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-measurement-units-glue-api.html).

## Retrieve sales units

To retrieve sales units of a concrete product, send the request:

---
`GET` **/concrete-products/*{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}*/sales-units**

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
|***{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}*** | SKU of a concrete product to get sales units for. |

### Request

Request sample: retrieve sales units

`GET http://glue.mysprykershop.com/concrete-products/cable-vga-1-2/sales-units`

### Response

<details>
<summary markdown='span'>Response sample: retrieve sales units</summary>

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

{% include pbc/all/glue-api-guides/{{page.version}}/sales-units-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/{{page.version}}/sales-units-response-attributes.md -->


See [Retrieve measurement units](/docs/pbc/all/product-information-management/{{page.version}}/base-shop/manage-using-glue-api/glue-api-retrieve-measurement-units.html) for more information on managing the sales units.

## Possible errors

| CODE  | REASON |
| --- | --- |
| 302 | Concrete product is not found. |
| 312  | Concrete product SKU is not specified. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).
