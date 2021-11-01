---
title: Retrieving Measurement Units
description: Retrieve details about measurement units and learn what else you can do with the resource.
last_updated: Sep 14, 2020
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/v5/docs/retrieving-measurement-units
originalArticleId: d16fe8ed-0977-42d3-9c20-9a7f1113ec0b
redirect_from:
  - /v5/docs/retrieving-measurement-units
  - /v5/docs/en/retrieving-measurement-units
related:
  - title: Measurement Units Feature Overview
    link: docs/scos/user/features/page.version/measurement-units-feature-overview.html
---

The Measurement Units API together with the [Measurement Units](/docs/scos/user/features/{{page.version}}/measurement-units-feature-overview.html) feature allows selling products in any measurement units configured in your shop. 

## Installation 

For detailed information on the modules that provide the API functionality and related installation instructions, see [Glue API: Measurement Units Feature Integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-measurement-units-feature-integration.html).

## Retrieve a Measurement Unit

To retrieve measurement unit information by product measurement unit code, send the request:

---
`GET` **product-measurement-units/*{% raw %}{{{% endraw %}productMeasurementUnitCode{% raw %}}}{% endraw %}***

---



| Path parameter | Description |
| --- | --- |
| {% raw %}{{{% endraw %}productMeasurementUnitCode{% raw %}}}{% endraw %} | Code of a measurement unit to get information for. |

### Request

Sample request: `GET http://glue.mysprykershop.com/product-measurement-unit/METR`

### Response
Response sample:

```json
{
    "data": {
        "type": "product-measurement-units",
        "id": "METR",
        "attributes": {
            "name": "Meter",
            "defaultPrecision": 100
        },
        "links": {
            "self": "http://glue.mysprykershop.com/product-measurement-units/METR"
        }
    }
}
```



| Attribute | Type | Description |
| --- | --- | --- |
| name | string | Name of the product measurement unit. |
| defaultPrecision | integer | The default ratio between a sales unit and a base unit. It is used when precision for a related sales unit is not specified. |
| measurementUnitCode | string | Code of the measurement unit. |


## Other Management Options

You can use the measurement units resource as follows:

*  Retrieve information about a concrete product, including all the measurement units defined for it - [Retrieve Concrete Products](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-products/retrieving-product-information.html#retrieve-concrete-products).
* Retrieve sales unit of a product - [Retrieve Sales Units](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-products/retrieving-product-information.html#retrieve-sales-units)
*  Add items to carts and retrieve information about them with the amount of cart items defined in product measurement units - [Managing Carts of Registered Users](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/carts-of-registered-users/managing-carts-of-registered-users.html).
* Add items to guest carts and retrieve information about them with the amount of cart items defined in product measurement units - [Managing Guest Carts](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/guest-carts/managing-guest-carts.html).
* Retrieve information about items in an order with the amount of order items defined in product measurement units - [Retrieving an Order](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/retrieving-customer-orders.html#retrieving-an-order).



## Possible Errors


|Status  |Description  |
| --- | --- |
| 400 | No product measurement unit code was specified. |
| 404 | Product measurement unit with the specified code does not exist. | 




