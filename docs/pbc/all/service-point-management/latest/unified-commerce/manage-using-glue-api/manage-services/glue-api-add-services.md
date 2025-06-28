---
title: "Glue API: Add services"
description: Learn how to add new services to your Unified Commerce shop using Spryker Glue API
last_updated: Nov 23, 2023
template: glue-api-storefront-guide-template
---

This endpoint lets you add services.

## Installation

[Install the Service Points feature](/docs/pbc/all/service-point-management/latest/unified-commerce/install-features/install-the-service-points-feature.html)

## Add a service

***
`POST` **/services**
***

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|-|-|-|-|
| Authorization | string | &check; | Alphanumeric string that authorizes the warehouse user to send requests to protected resources. Get it by [authenticating as a warehouse user](/docs/pbc/all/warehouse-management-system/latest/unified-commerce/manage-using-glue-api/glue-api-authenticate-as-a-warehouse-user.html). |

| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
|-|-|-|
| include | Adds resource relationships to the request. | service-types service-points |

| REQUEST | USAGE |
|-|-|
| `POST https://glue-backend.mysprykershop.com/services` | Add a service. |
| `POST https://glue-backend.mysprykershop.com/services?include=service-types` | Add a service. Include information about the specified service type in the response. |
| `POST https://glue-backend.mysprykershop.com/services?include=service-points` | Add a service. Include information about the specified service type in the response. |


```json
{
    "data": {
        "type": "services",
        "attributes": {
            "isActive": false,
            "key": "Demo",
            "servicePointUuid": "262feb9d-33a7-5c55-9b04-45b1fd22067e",
            "serviceTypeUuid": "7a263a50-12a3-5ef4-86f4-366f20783180"
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| isActive | Boolean | &check; | Defines if the service is to be active. Inactive services are not displayed on the Storefront. |
| key | String | &check; | Unique identifier of the service. |
| servicePointUuid | String | &check; | Unique identifier of the service point to assign this service to. To get it, [retrieve service points](/docs/pbc/all/service-point-management/latest/unified-commerce/manage-using-glue-api/manage-service-points/glue-api-retrieve-service-points.html). |
| serviceTypeUuid | String | &check; | Unique identifier of the service type to add a service of. To get it, [retrieve service types](/docs/pbc/all/service-point-management/latest/unified-commerce/manage-using-glue-api/manage-service-types/glue-api-retrieve-service-types.html). |



### Response

<details>
  <summary>Add a service</summary>

```json
{
    "data": {
        "type": "services",
        "id": "6cec29eb-a835-561c-a821-f7a690538db7",
        "attributes": {
            "uuid": "6cec29eb-a835-561c-a821-f7a690538db7",
            "isActive": false,
            "key": "Demo"
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/services/6cec29eb-a835-561c-a821-f7a690538db7"
        }
    }
}
```

</details>

<details>
  <summary>Add a service with service type information included</summary>

```json
{
    "data": {
        "type": "services",
        "id": "5d1c9ed0-43b9-520b-931c-415557d9a633",
        "attributes": {
            "uuid": "5d1c9ed0-43b9-520b-931c-415557d9a633",
            "isActive": false,
            "key": "repair"
        },
        "relationships": {
            "service-types": {
                "data": [
                    {
                        "type": "service-types",
                        "id": "30f29960-b357-53a7-8ad6-1ed93ffc4086"
                    }
                ]
            }
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/services/5d1c9ed0-43b9-520b-931c-415557d9a633?include=service-types"
        }
    },
    "included": [
        {
            "type": "service-types",
            "id": "30f29960-b357-53a7-8ad6-1ed93ffc4086",
            "attributes": {
                "name": "Repair",
                "key": "rp"
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/service-types/30f29960-b357-53a7-8ad6-1ed93ffc4086?include=service-types"
            }
        }
    ]
}
```

</details>

<details>
  <summary>Add a service with service point information included</summary>


```json
{
    "data": {
        "type": "services",
        "id": "16007e04-72b4-5ac1-ad18-1ed75fef1639",
        "attributes": {
            "uuid": "16007e04-72b4-5ac1-ad18-1ed75fef1639",
            "isActive": false,
            "key": "installation"
        },
        "relationships": {
            "service-points": {
                "data": [
                    {
                        "type": "service-points",
                        "id": "262feb9d-33a7-5c55-9b04-45b1fd22067e"
                    }
                ]
            }
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/services/16007e04-72b4-5ac1-ad18-1ed75fef1639?include=service-points"
        }
    },
    "included": [
        {
            "type": "service-points",
            "id": "262feb9d-33a7-5c55-9b04-45b1fd22067e",
            "attributes": {
                "name": "Spryker Main Store",
                "key": "sp1",
                "isActive": true,
                "stores": [
                    "DE",
                    "AT"
                ]
            },
            "relationships": {
                "services": {
                    "data": [
                        {
                            "type": "services",
                            "id": "16007e04-72b4-5ac1-ad18-1ed75fef1639"
                        }
                    ]
                }
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/service-points/262feb9d-33a7-5c55-9b04-45b1fd22067e?include=service-points"
            }
        }
    ]
}
```

</details>

{% include pbc/all/glue-api-guides/latest/services-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/services-response-attributes.md -->

{% include pbc/all/glue-api-guides/latest/service-types-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/services-response-attributes.md -->

{% include pbc/all/glue-api-guides/latest/service-points-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/services-response-attributes.md -->


## Possible errors

| CODE  | REASON |
| --- | --- |
| 5403 | A service point with the specified id doesn't exist. |
| 5418 | A service type with the specified id doesn't exist. |
| 5426 | A service with the specified key exists. |
| 5429 | A service with defined relation of service point and service type exists. |


To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/latest/rest-api/reference-information-glueapplication-errors.html).
