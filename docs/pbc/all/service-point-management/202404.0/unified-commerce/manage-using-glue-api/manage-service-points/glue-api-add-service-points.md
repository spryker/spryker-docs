---
title: "Glue API: Add service points"
description: Learn how to add service points using Glue API
last_updated: Nov 23, 2023
template: glue-api-storefront-guide-template
---

This endpoint lets you add service points.

## Installation

[Install the Service Points feature](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/install-features/install-the-service-points-feature.html)

## Add a service point

***
`POST` **/service-points**
***

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|-|-|-|-|
| Authorization | string | &check; | Alphanumeric string that authorizes the warehouse user to send requests to protected resources. Get it by [authenticating as a warehouse user](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/glue-api-authenticate-as-a-warehouse-user.html). |

Request sample: `POST https://glue-backend.mysprykershop.com/service-points`
```json
{
    "data": {
        "type": "service-points",
        "attributes": {
            "name": "Central store",
            "key": "cs",
            "isActive": "true",
            "stores": ["DE", "AT"]
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| name | String | &check; | This name is displayed on the Storefront. |
| key | String | &check; | Unique identifier of the service point. |
| isActive | Boolean | &check; | Defines if the service point is to be active. Inactive service points are not displayed on the Storefront. |
| stores | Object | &check; | Defines which stores the service point is displayed in. |



### Response

Response sample:
```json
{
    "data": {
        "type": "service-points",
        "id": "924ed48a-b4f0-516a-9921-5e9fd2149638",
        "attributes": {
            "name": "Central store",
            "key": "cs",
            "isActive": true,
            "stores": [
                "DE",
                "AT"
            ]
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/service-points/924ed48a-b4f0-516a-9921-5e9fd2149638"
        }
    }
}
```

{% include pbc/all/glue-api-guides/{{page.version}}/service-points-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/service-points-response-attributes.md -->


## Possible errors

| CODE  | REASON |
| --- | --- |
| 5404 | A service point with the same key already exists. |


To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/rest-api/reference-information-glueapplication-errors.html).
