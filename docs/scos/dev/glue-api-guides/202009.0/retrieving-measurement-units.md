---
title: Retrieving measurement units
description: Retrieve details about measurement units and learn what else you can do with the resource.
originalLink: https://documentation.spryker.com/v6/docs/retrieving-measurement-units
originalArticleId: d993a230-04c4-4530-a35f-8efcf696b60e
redirect_from:
  - /v6/docs/retrieving-measurement-units
  - /v6/docs/en/retrieving-measurement-units
---

The Measurement Units API together with the [Measurement Units](/docs/scos/dev/features/202009.0/measurement-units/measurement-units-feature-overview.html) feature allows selling products in any measurement units configured in your shop. 

## Installation 

For detailed information on the modules that provide the API functionality and related installation instructions, see [Glue API: Measurement Units Feature Integration](/docs/scos/dev/migration-and-integration/202009.0/feature-integration-guides/glue-api/glue-api-measurement-units-feature-integration.html).

## Retrieve a measurement unit

To retrieve measurement unit information by product measurement unit code, send the request:

---
`GET` **/product-measurement-units/*{% raw %}{{{% endraw %}product_measurement_unit_code{% raw %}}}{% endraw %}***

---



| Path parameter | Description |
| --- | --- |
| ***{% raw %}{{{% endraw %}product_measurement_unit_code{% raw %}}}{% endraw %}*** | Code of a measurement unit to get information for. |

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


<a name="measurement-units-response-attributes"></a>

| Attribute | Type | Description |
| --- | --- | --- |
| name | string | Name of the product measurement unit. |
| defaultPrecision | integer | Default ratio between a sales unit and a base unit. It is used when precision for a related sales unit is not specified. |
| measurementUnitCode | string | Code of the measurement unit. |


## Other management options

You can use the measurement units resource as follows:

*  Retrieve information about a concrete product, including all the measurement units defined for it—[Retrieve Concrete Products](https://documentation.spryker.com/v6/docs/retrieving-product-information#retrieve-concrete-products).
* Retrieve sales unit of a product—[Retrieve Sales Units](https://documentation.spryker.com/v6/docs/retrieving-product-information#retrieve-sales-units).
*  Add items to carts and retrieve information about them with the amount of cart items defined in product measurement units—[Managing Carts of Registered Users](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/carts-of-registered-users/carts-of-registered-users/managing-carts-of-registered-users.html).
* Add items to guest carts and retrieve information about them with the amount of cart items defined in product measurement units—[Managing Guest Carts](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-carts/guest-carts/guest-carts/managing-guest-carts.html).
* Retrieve information about items in an order with the amount of order items defined in product measurement units—[Retrieving an Order](/docs/scos/dev/glue-api-guides/{{page.version}}/manging-customers/retrieving-customer-orders.html#retrieving-an-order).



## Possible errors


|Status  |Description  |
| --- | --- |
| 3401 | No product measurement unit code was specified. |
| 3402 | Product measurement unit with the specified code was not found. | 

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/scos/dev/glue-api-guides/{{page.version}}/reference-information-glueapplication-errors.html).


