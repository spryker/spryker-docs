---
title: "Glue API: Retrieve shipment types"
description: Learn how to retrieve shipment types using Glue API
last_updated: Nov 23, 2023
template: glue-api-storefront-guide-template
---

This endpoint lets you retrieve shipment types.

## Installation

[Install the Shipment feature](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/install-and-upgrade/install-features/install-the-shipment-feature.html)

## Retrieve shipment types

***
`GET` **/shipment-types**
***

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|-|-|-|-|
| Authorization | string | For backend API. | Alphanumeric string that authorizes the warehouse user to send requests to protected resources. Get it by [authenticating as a warehouse user](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/glue-api-authenticate-as-a-warehouse-user.html). |


| REQUEST | API TYPE | USAGE |
| --- | --- | --- |
| `GET https://glue-backend.mysprykershop.com/shipment-types` | Backend | Retrieve all shipment types. |
| `GET https://glue.mysprykershop.com/shipment-types` | Storefront | Retrieve all shipment types. |




### Response

<details>
  <summary>Backend: Retrieve shipment types</summary>

```json
{
    "data": [
        {
            "type": "shipment-types",
            "id": "174d9dc0-55ae-5c4b-a2f2-a419027029ef",
            "attributes": {
                "name": "Pickup",
                "key": "pickup",
                "isActive": true,
                "stores": [
                    "DE",
                    "AT"
                ]
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/shipment-types/174d9dc0-55ae-5c4b-a2f2-a419027029ef"
            }
        },
        {
            "type": "shipment-types",
            "id": "9e1bd563-3106-52d1-9717-18e8d491e3b3",
            "attributes": {
                "name": "Delivery",
                "key": "delivery",
                "isActive": true,
                "stores": [
                    "DE",
                    "AT"
                ]
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/shipment-types/9e1bd563-3106-52d1-9717-18e8d491e3b3"
            }
        }
    ],
    "links": {
        "self": "https://glue-backend.mysprykershop.com/shipment-types"
    }
}
```

</details>

<details>
  <summary>Storefront: Retrieve shipment types</summary>

```json
{
    "data": [
        {
            "type": "shipment-types",
            "id": "9e1bd563-3106-52d1-9717-18e8d491e3b3",
            "attributes": {
                "name": "Delivery",
                "key": "delivery"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/shipment-types/9e1bd563-3106-52d1-9717-18e8d491e3b3"
            }
        },
        {
            "type": "shipment-types",
            "id": "174d9dc0-55ae-5c4b-a2f2-a419027029ef",
            "attributes": {
                "name": "Pickup",
                "key": "pickup"
            },
            "links": {
                "self": "https://glue.mysprykershop.com/shipment-types/174d9dc0-55ae-5c4b-a2f2-a419027029ef"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/shipment-types"
    }
}
```

</details>


{% include pbc/all/glue-api-guides/{{page.version}}/shipment-types-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/{{page.version}}/shipment-types-response-attributes.md -->




## Retrieve a shipment type

***
`GET` {% raw %}**/shipment-types/*{{shipment_type_id}}***{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{shipment_type_id}}***{% endraw %} | ID of a shipment type to retrieve. To get it, [add a shipment type](/docs/pbc/all/carrier-management/{{page.version}}/base-shop/manage-using-glue-api/manage-shipment-types/glue-api-add-shipment-types.html) or [retrieve shipment types](#retrieve-shipment-types). |


### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
|-|-|-|-|
| Authorization | string | For backend API. | Alphanumeric string that authorizes the warehouse user to send requests to protected resources. Get it by [authenticating as a warehouse user](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/glue-api-authenticate-as-a-warehouse-user.html). |

| REQUEST | API TYPE | USAGE |
| --- | --- | --- |
| `GET https://glue-backend.mysprykershop.com/shipment-types/174d9dc0-55ae-5c4b-a2f2-a419027029ef` | Backend | Retrieve a shipment type with the specified ID. |
| `GET https://glue.mysprykershop.com/shipment-types/174d9dc0-55ae-5c4b-a2f2-a419027029ef` | Storefront | Retrieve a shipment type with the specified ID. |



### Response


<details>
  <summary>Backend: Retrieve a shipment typed with the specified ID</summary>

```json
{
    "data": {
        "type": "shipment-types",
        "id": "174d9dc0-55ae-5c4b-a2f2-a419027029ef",
        "attributes": {
            "name": "Pickup",
            "key": "pickup",
            "isActive": true,
            "stores": [
                "DE",
                "AT"
            ]
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/shipment-types/174d9dc0-55ae-5c4b-a2f2-a419027029ef"
        }
    }
}
```

</details>

<details>
  <summary>Storefront: Retrieve a shipment typed with the specified ID</summary>

```json
{
    "data": {
        "type": "shipment-types",
        "id": "174d9dc0-55ae-5c4b-a2f2-a419027029ef",
        "attributes": {
            "name": "Pickup",
            "key": "pickup"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/shipment-types/174d9dc0-55ae-5c4b-a2f2-a419027029ef"
        }
    }
}
```

</details>


{% include pbc/all/glue-api-guides/{{page.version}}/shipment-types-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/{{page.version}}/shipment-types-response-attributes.md -->



## Possible errors

| CODE  | REASON |
| --- | --- |
| 5501 | The shipment type with the specified ID doesn't exist. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).
