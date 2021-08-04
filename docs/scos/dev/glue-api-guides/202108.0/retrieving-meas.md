---
title: Retrieving measurement units
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-measurement-units
redirect_from:
  - /2021080/docs/retrieving-measurement-units
  - /2021080/docs/en/retrieving-measurement-units
---

The Measurement Units API together with the [Measurement Units](https://documentation.spryker.com/docs/measurement-units-feature-overview) feature allows selling products in any measurement units configured in your shop. 

## Installation 

For detailed information on the modules that provide the API functionality and related installation instructions, see [Glue API: Measurement Units Feature Integration](https://documentation.spryker.com/docs/glue-api-measurement-units-feature-integration).

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

*  Retrieve information about a concrete product, including all the measurement units defined for it—[Retrieve Concrete Products](https://documentation.spryker.com/docs/retrieving-product-information#retrieve-concrete-products).
* Retrieve sales unit of a product—[Retrieve Sales Units](https://documentation.spryker.com/docs/retrieving-product-information#retrieve-sales-units).
*  Add items to carts and retrieve information about them with the amount of cart items defined in product measurement units—[Managing Carts of Registered Users](https://documentation.spryker.com/docs/managing-carts-of-registered-users).
* Add items to guest carts and retrieve information about them with the amount of cart items defined in product measurement units—[Managing Guest Carts](https://documentation.spryker.com/docs/managing-guest-carts).
* Retrieve information about items in an order with the amount of order items defined in product measurement units—[Retrieving an Order](https://documentation.spryker.com/docs/retrieving-customers-order-history#retrieving-an-order).



## Possible errors


|Status  |Description  |
| --- | --- |
| 3401 | No product measurement unit code was specified. |
| 3402 | Product measurement unit with the specified code was not found. | 

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](https://documentation.spryker.com/docs/reference-information-glueapplication-errors).


