---
title: "Glue API: Add shipment types"
description: Learn how to add shipment types using Glue API
last_updated: Nov 23, 2023
template: glue-api-storefront-guide-template
---

This endpoint lets you add shipment types.

## Installation

[Install the Shipment feature](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-shipment-feature.html)

## Add a shipment type point

***
`POST` **/service-types**
***

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|-|-|-|-|
| Authorization | string | &check; | Alphanumeric string that authorizes the warehouse user to send requests to protected resources. Get it by [authenticating as a warehouse user](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/glue-api-authenticate-as-a-warehouse-user.html). |

Request sample: `POST https://glue-backend.mysprykershop.com/shipment-types`
```json
{
    "data": {
        "type": "shipment-types",
        "attributes": {
            "name": "Locker pickup",
            "key": "l-pickup",
            "isActive": "true",
            "stores": ["DE", "AT"]
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| name | String | &check; | You will use it as a reference when adding shipment types to offers in the Merchant portal. |
| key | String | &check; | Unique identifier of the shipment type. |
| isActive | Boolean | &check; | Defines if the shipment type is active. You can only add active shipment types to offers. |
| stores | Object | &check; | Defines the stores the shipment type is to be available for. |


### Response

Response sample:
```json
{
    "data": {
        "type": "shipment-types",
        "id": "fa575a58-5119-5407-a00b-d1aa01fec63d",
        "attributes": {
            "name": "Locker pickup",
            "key": "l-pickup",
            "isActive": true,
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
| 5502 | A shipment type with the same key already exists. |


To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/rest-api/reference-information-glueapplication-errors.html).
