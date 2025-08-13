---
title: "Glue API: Update shipment types"
description: Learn how to update shipment types using Glue API in Spryker Cloud Commerce OS, enabling flexibility and customization of your shipment types.
last_updated: Nov 23, 2023
template: glue-api-storefront-guide-template
redirect_from:
  - /docs/pbc/all/carrier-management/latest/base-shop/manage-using-glue-api/manage-shipment-types/glue-api-update-shipment-types.html

---

This endpoint lets you update shipment types.

## Installation

[Install the Shipment feature](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-shipment-feature.html)

## Update a shipment type

***
`PATCH` **/shipment-types**
***

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|-|-|-|-|
| Authorization | string | &check; | Alphanumeric string that authorizes the warehouse user to send requests to protected resources. Get it by [authenticating as a warehouse user](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/glue-api-authenticate-as-a-warehouse-user.html). |

Request sample: `PATCH https://glue-backend.mysprykershop.com/shipment-types/fa575a58-5119-5407-a00b-d1aa01fec63d`

```json
{
    "data": {
        "type": "shipment-types",
        "attributes": {
            "name": "Curbside pickup",
            "key": "c-pickup",
            "isActive": "false",
            "stores": ["DE", "AT"]
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| name | String |  | You will use it as a reference when adding shipment types to offers in the Merchant portal. |
| key | String |  | Unique identifier of the shipment type. |
| isActive | Boolean |  | Defines if the shipment type is active. You can only add active shipment types to offers. |
| stores | Object |  | Defines the stores the shipment type is to be available for. |


### Response

Response sample:

```json
{
    "data": {
        "type": "shipment-types",
        "id": "fa575a58-5119-5407-a00b-d1aa01fec63d",
        "attributes": {
            "name": "Curbside pickup",
            "key": "c-pickup",
            "isActive": false,
            "stores": [
                "DE",
                "AT"
            ]
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/shipment-types/fa575a58-5119-5407-a00b-d1aa01fec63d"
        }
    }
}
```

{% include pbc/all/glue-api-guides/{{page.version}}/shipment-types-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/{{page.version}}/shipment-types-response-attributes.md -->


## Possible errors

| CODE  | REASON |
| --- | --- |
| 5501 | The shipment type with the specified ID doesn't exist. |


To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/rest-api/reference-information-glueapplication-errors.html).
