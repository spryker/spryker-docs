---
title: "Glue API: Add service types"
description: Learn how to add service types to your Unified Commerce shop using Spryker Glue API
last_updated: Nov 23, 2023
template: glue-api-storefront-guide-template
---

This endpoint lets you add service types.

## Installation

[Install the Service Points feature](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/install-features/install-the-service-points-feature.html)

## Add a service type

***
`POST` **/service-types**
***

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|-|-|-|-|
| Authorization | string | &check; | Alphanumeric string that authorizes the warehouse user to send requests to protected resources. Get it by [authenticating as a warehouse user](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/glue-api-authenticate-as-a-warehouse-user.html). |

Request sample: `POST https://glue-backend.mysprykershop.com/service-types`
```json
{
    "data": {
        "type": "service-types",
        "attributes": {
            "name": "Demo",
            "key": "demo"
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| name | String | &check; | Name. |
| key | String | &check; | Unique identifier of the service type. You will use it when adding services. |



### Response

Response sample:
```json
{
    "data": {
        "type": "service-types",
        "id": "7a263a50-12a3-5ef4-86f4-366f20783180",
        "attributes": {
            "name": "Demo",
            "key": "demo"
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/service-types/7a263a50-12a3-5ef4-86f4-366f20783180"
        }
    }
}
```

{% include pbc/all/glue-api-guides/{{page.version}}/service-types-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/service-types-response-attributes.md -->


## Possible errors

| CODE  | REASON |
| --- | --- |
| 5425 | A service type with the same name already exists. |
| 5419 | A service type with the same key already exists. |


To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).
