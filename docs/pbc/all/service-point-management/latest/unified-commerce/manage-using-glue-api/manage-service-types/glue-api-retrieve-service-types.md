---
title: "Glue API: Retrieve service types"
description: Learn how to retrieve service types to your Unified Commerce shop using Spryker Glue API
last_updated: Nov 23, 2023
template: glue-api-storefront-guide-template
redirect_from:
---

This endpoint lets you retrieve service types.

## Installation

[Install the Service Points feature](/docs/pbc/all/service-point-management/{{page.version}}/unified-commerce/install-features/install-the-service-points-feature.html)

## Retrieve service types

***
`GET` **/service-types**
***

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|-|-|-|-|
| Authorization | string | &check; | Alphanumeric string that authorizes the warehouse user to send requests to protected resources. Get it by [authenticating as a warehouse user](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/glue-api-authenticate-as-a-warehouse-user.html). |

| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
|-|-|-|
|  page[offset] | Offsets the page at which to begin the response. | From `0` to any. |
|  page[limit] | Defines the maximum number of pages to return. | From `1` to any. |

Request sample: `GET https://glue-backend.mysprykershop.com/service-points`


### Response


<details>
  <summary>Retrieve all service types</summary>

```json
{
    "data": [
        {
            "type": "service-types",
            "id": "2370ad95-4e9f-5ac3-913e-300c5805b181",
            "attributes": {
                "name": "Pickup",
                "key": "pickup"
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/service-types/2370ad95-4e9f-5ac3-913e-300c5805b181"
            }
        },
        {
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
    ],
    "links": {
        "self": "https://glue-backend.mysprykershop.com/service-types"
    }
}
```



</details>


{% include pbc/all/glue-api-guides/{{page.version}}/service-types-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/service-types-response-attributes.md -->



## Retrieve a service type

***
`GET` {% raw %}**/service-types/*{{service_type_id}}***{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{service_type_id}}***{% endraw %} | ID of a service type to retrieve. To get it, [add a service type](/docs/pbc/all/service-point-management/202311.0/unified-commerce/manage-using-glue-api/manage-service-types/glue-api-add-service-types.html) or [retrieve service types](#retrieve-service-types). |


### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|-|-|-|-|
| Authorization | string | &check; | Alphanumeric string that authorizes the warehouse user to send requests to protected resources. Get it by [authenticating as a warehouse user](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/glue-api-authenticate-as-a-warehouse-user.html). |

Request sample: `https://glue-backend.mysprykershop.com/service-types/7a263a50-12a3-5ef4-86f4-366f20783180`

### Response

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
| 5418 | The service type with the specified ID doesn't exist. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/rest-api/reference-information-glueapplication-errors.html).
