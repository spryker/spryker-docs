---
title: "Glue API: Update service points"
description: Learn how to update services to your Unified Commerce shop using Spryker Glue API
last_updated: Nov 23, 2023
template: glue-api-storefront-guide-template
---

This endpoint lets you update service points.

## Installation

[Install the Service Points feature](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/install-features/install-the-service-points-feature.html)

## Update a service point

***
`PATCH` **/services**
***

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|-|-|-|-|
| Authorization | string | &check; | Alphanumeric string that authorizes the warehouse user to send requests to protected resources. Get it by [authenticating as a warehouse user](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/glue-api-authenticate-as-a-warehouse-user.html). |

Request sample: `PATCH https://glue-backend.mysprykershop.com/services/37ef89d3-7792-533c-951c-981c6b56312c`
```json
{
    "data": {
        "type": "services",
        "attributes": {
            "isActive": false
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| isActive | Boolean |  | Defines if the service is to be active. Inactive services are not displayed on the Storefront. |



### Response

Response sample:
```json
{
    "data": {
        "type": "services",
        "id": "37ef89d3-7792-533c-951c-981c6b56312c",
        "attributes": {
            "uuid": "37ef89d3-7792-533c-951c-981c6b56312c",
            "isActive": false,
            "key": "s1"
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/services/37ef89d3-7792-533c-951c-981c6b56312c"
        }
    }
}
```

{% include pbc/all/glue-api-guides/{{page.version}}/services-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/service-points-response-attributes.md -->


## Possible errors

| CODE  | REASON |
| --- | --- |
| 5403 | The service point with the specified ID doesn't exist. |


To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/rest-api/reference-information-glueapplication-errors.html).
