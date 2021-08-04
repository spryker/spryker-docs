---
title: Retrieving sales units
originalLink: https://documentation.spryker.com/v6/docs/retrieving-sales-units
redirect_from:
  - /v6/docs/retrieving-sales-units
  - /v6/docs/en/retrieving-sales-units
---

This endpoint allows to retrieve sales units of concrete products.

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see:
* [Glue API: Products Feature Integration](https://documentation.spryker.com/docs/glue-api-products-feature-integration).
* [Glue API: Measurement Units Feature Integration](https://documentation.spryker.com/docs/glue-api-measurement-units-feature-integration).



## Retrieve sales units

To retrieve sales units of a concrete product, send the request:

---
`GET` **/concrete-products/*{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}*/sales-units**

---


| Path parameter | Description |
| --- | --- |
|***{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}*** | SKU of a concrete product to get sales units for. |

### Request

Request sample: `GET http://glue.mysprykershop.com/concrete-products/cable-vga-1-2/sales-units`

### Response

<details open>
    <summary>Response sample</summary>

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

| Attribute | Type | Description |
| --- | --- | --- |
| conversion | integer | Factor to convert a value from sales to base unit. If it is "null", the information is taken from the global conversions. |
| precision | integer | Ratio between a sales unit and a base unit. |
| is displayed | boolean | Defines if the sales unit is displayed on the product details page. |
| is default | boolean | Defines if the sales unit is selected by default on the product details page. |
| measurementUnitCode | string | Code of the measurement unit. | 


See [Retrieving Measurement Units](https://documentation.spryker.com/docs/retrieving-measurement-units) for more information on managing the sales units.

## Possible errors

| Code  | Reason |
| --- | --- |
|302| Concrete product is not found. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](https://documentation.spryker.com/docs/reference-information-glueapplication-errors).

