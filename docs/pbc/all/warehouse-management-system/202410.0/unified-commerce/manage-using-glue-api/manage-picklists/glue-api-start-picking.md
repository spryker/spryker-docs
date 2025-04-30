---
title: "Glue API: Start picking"
description: Learn how to start picking items using Spryker Glue API in your Spryker Unified Commerce Store.
template: glue-api-storefront-guide-template
last_updated: Dec 7, 2023
---

This endpoint lets you start picking.

## Installation

For detailed information about the modules that provide the API functionality and related installation instructions, see:

* [Install the Warehouse picking feature](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/install-and-upgrade/install-the-warehouse-picking-feature.html)
* [Install the Warehouse User Management feature](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/install-and-upgrade/install-the-warehouse-user-management-feature.html)


## Start picking of a picklist

***
`POST` **/picking-lists/*{% raw %}{{picklist_id}}{% endraw %}*/start-picking**
***  

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{picklist_id}}***{% endraw %} | ID of the picklist to start picking of. To get it, [retrieve picklists](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/manage-picklists/glue-api-retrieve-picklists.html).     |


### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the warehouse user to send requests to protected resources. Get it by [authenticating as a warehouse user](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/glue-api-authenticate-as-a-warehouse-user.html).  |

| STRING PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | users, warehouses |

| REQUEST  | USAGE |
| --- | --- |
| `POST https://glue-backend.mysprykershop.com/picking-lists/910a4d20-59a3-5c49-808e-aa7038a59313/start-picking` | Start picking the picklist with the specified ID.  |
| `POST https://glue-backend.mysprykershop.com/picking-lists/910a4d20-59a3-5c49-808e-aa7038a59313/start-picking?include=users` | Start picking the picklist with the specified ID. Include information about the authenticated user into the response.  |
| `POST https://glue-backend.mysprykershop.com/picking-lists/910a4d20-59a3-5c49-808e-aa7038a59313/start-picking?include=warehouses` | Start picking the picklist with the specified ID. Include information about the warehouse the order is fulfilled in.  |


### Response

<details>
  <summary>Response sample: Start picking the picklist with the specified ID.</summary>

```json
{
    "data": {
        "type": "picking-lists",
        "id": "910a4d20-59a3-5c49-808e-aa7038a59313",
        "attributes": {
            "status": "picking-started",
            "createdAt": "2023-11-13 13:33:03.000000",
            "updatedAt": "2023-11-13 13:42:29.739183"
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/picking-lists/910a4d20-59a3-5c49-808e-aa7038a59313/picking-lists/910a4d20-59a3-5c49-808e-aa7038a59313"
        }
    }
}
```

</details>

<details>
  <summary>Response sample: Start picking the picklist with the specified ID. Include information about the authenticated user.</summary>

```json
{
    "data": {
        "type": "picking-lists",
        "id": "460a5030-1e06-545f-81ee-05299f239fd4",
        "attributes": {
            "status": "picking-started",
            "createdAt": "2023-11-13 13:52:56.000000",
            "updatedAt": "2023-11-14 08:35:05.355155"
        },
        "relationships": {
            "users": {
                "data": [
                    {
                        "type": "users",
                        "id": "0c1b09b7-fb51-5fdc-9ef0-1c809d7d99da"
                    }
                ]
            }
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/picking-lists/460a5030-1e06-545f-81ee-05299f239fd4/picking-lists/460a5030-1e06-545f-81ee-05299f239fd4?include=users"
        }
    },
    "included": [
        {
            "type": "users",
            "id": "0c1b09b7-fb51-5fdc-9ef0-1c809d7d99da",
            "attributes": {
                "username": "herald.hopkins@spryker.com",
                "firstName": "Herald",
                "lastName": "Hopkins"
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/picking-lists/460a5030-1e06-545f-81ee-05299f239fd4/users/0c1b09b7-fb51-5fdc-9ef0-1c809d7d99da?include=users"
            }
        }
    ]
}
```

</details>

<details>
  <summary>Pick an item in the picklist with the specified ID. Include information about the warehouse the order is fulfilled in.</summary>

```json
{
    "data": {
        "type": "picking-lists",
        "id": "460a5030-1e06-545f-81ee-05299f239fd4",
        "attributes": {
            "status": "picking-started",
            "createdAt": "2023-11-13 13:52:56.000000",
            "updatedAt": "2023-11-14 08:35:05.000000"
        },
        "relationships": {
            "warehouses": {
                "data": [
                    {
                        "type": "warehouses",
                        "id": "834b3731-02d4-5d6f-9a61-d63ae5e70517"
                    }
                ]
            }
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/picking-lists/460a5030-1e06-545f-81ee-05299f239fd4/picking-lists/460a5030-1e06-545f-81ee-05299f239fd4?include=warehouses"
        }
    },
    "included": [
        {
            "type": "warehouses",
            "id": "834b3731-02d4-5d6f-9a61-d63ae5e70517",
            "attributes": {
                "name": "Warehouse1",
                "uuid": "834b3731-02d4-5d6f-9a61-d63ae5e70517",
                "isActive": true
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/picking-lists/460a5030-1e06-545f-81ee-05299f239fd4/warehouses/834b3731-02d4-5d6f-9a61-d63ae5e70517?include=warehouses"
            }
        }
    ]
}
```

</details>


{% include pbc/all/glue-api-guides/{{page.version}}/picking-lists-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/picking-lists-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/users-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/users-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/warehouses-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/warehouses-response-attributes.md -->

## Possible errors

| CODE | DESCRIPTION |
|-|-|
| 5303 | The picklist with the specified ID doesn't exist.  |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/rest-api/reference-information-glueapplication-errors.html).
