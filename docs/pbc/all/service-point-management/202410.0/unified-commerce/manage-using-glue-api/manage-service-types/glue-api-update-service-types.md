---
title: "Glue API: Update service types"
description: Learn how to update service types to your Unified Commerce shop using Spryker Glue API
last_updated: Nov 23, 2023
template: glue-api-storefront-guide-template
---

This endpoint lets you update service types.

## Installation

[Install the Service Points feature](/docs/pbc/all/service-point-management/latest/unified-commerce/install-features/install-the-service-points-feature.html)

## Update a service type

***
`PATCH` **/service-types**
***

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|-|-|-|-|
| Authorization | string | &check; | Alphanumeric string that authorizes the warehouse user to send requests to protected resources. Get it by [authenticating as a warehouse user](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/glue-api-authenticate-as-a-warehouse-user.html). |

Request sample: `PATCH https://glue-backend.mysprykershop.com/service-types/7a263a50-12a3-5ef4-86f4-366f20783180`

```json
{
    "data": {
        "type": "service-types",
        "attributes": {
            "name": "Demos"
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| name | String |  | Name. |



### Response

Response sample:

```json
{
    "data": {
        "type": "service-types",
        "id": "7a263a50-12a3-5ef4-86f4-366f20783180",
        "attributes": {
            "name": "Demos",
            "key": "demo"
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/service-types/7a263a50-12a3-5ef4-86f4-366f20783180"
        }
    }
}
```

{% include pbc/all/glue-api-guides/{{page.version}}/service-points-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/service-points-response-attributes.md -->


## Possible errors

| CODE  | REASON |
| --- | --- |
| 5403 | The service point with the specified ID doesn't exist. |


To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/rest-api/reference-information-glueapplication-errors.html).
