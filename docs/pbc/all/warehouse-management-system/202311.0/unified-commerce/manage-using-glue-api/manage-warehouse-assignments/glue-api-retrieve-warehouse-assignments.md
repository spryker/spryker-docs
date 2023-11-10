---
title: "Glue API: Retrieve warehouse user assignments"
description: Learn how to retrieve warehouse user assignments using Glue API
template: glue-api-storefront-guide-template
---

A warehouse user can have multiple warehouses assigned to them. However, because a user can be physically present only in one warehouse, a single warehouse assignment can be active for them at a time. This endpoint lets you retrieve warehouse user assignments.

## Installation

For detailed information about the modules that provide the API functionality and related installation instructions, see:

* [Install the Warehouse picking feature](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/install-and-upgrade/install-the-warehouse-picking-feature.html)
* [Install the Warehouse User Management feature](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/install-and-upgrade/install-the-warehouse-user-management-feature.html)


## Retrieve a warehouse user assignment

---
`GET` **/warehouse-user-assignments/*{% raw %}{{warehouse_user_assignment_id}}{% endraw %}***
---

| PATH PARAMETER | DESCRIPTION |
| - | - |
| ***{{warehouse_user_assignment_id}}*** | ID of the user warehouse assignment to retrieve. You get it when [creating a warehouse user assignment](/docs/pbc/all/warehouse-management-system/202311.0/unified-commerce/manage-using-glue-api/glue-api-create-warehouse-user-assignments.html) |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the warehouse user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html).  |

| STRING PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. |  |

| REQUEST  | USAGE |
| --- | --- |
| `POST http://glue-backend.mysprykershop.com/warehouse-user-assignments` | Create a warehouse user assignment.  |
| `POST http://glue-backend.mysprykershop.com/warehouse-user-assignments?include=users` | Create a warehouse user assignment. Include information about the user in the response.  |




### Response


<details open>
  <summary>Create a warehouse user assignment</summary>

```json
{
    "data": {
        "type": "warehouse-user-assignments",
        "id": "75d8832e-0aa8-570e-9761-f2ccad7e3a37",
        "attributes": {
            "userUuid": "ce63fe5c-4897-5a17-b683-39f2825316b8",
            "isActive": false,
            "warehouse": {
                "name": "Warehouse2",
                "uuid": "3899fb51-7419-5df6-9257-4599c9b857a5",
                "isActive": true
            }
        },
        "links": {
            "self": "https://glue-backend.de.b2c.internal-testing.demo-spryker.com/warehouse-user-assignments/75d8832e-0aa8-570e-9761-f2ccad7e3a37"
        }
    }
}
```

</details>

<details open>
  <summary>Create a warehouse user assignment with user information included</summary>

```json
{
    "data": {
        "type": "warehouse-user-assignments",
        "id": "624c30c2-4ce9-5f1d-a368-fb2df62a8f6c",
        "attributes": {
            "userUuid": "ce63fe5c-4897-5a17-b683-39f2825316b8",
            "isActive": false,
            "warehouse": {
                "name": "Warehouse2",
                "uuid": "3899fb51-7419-5df6-9257-4599c9b857a5",
                "isActive": true
            }
        },
        "relationships": {
            "users": {
                "data": [
                    {
                        "type": "users",
                        "id": "ce63fe5c-4897-5a17-b683-39f2825316b8"
                    }
                ]
            }
        },
        "links": {
            "self": "https://glue-backend.de.b2c.internal-testing.demo-spryker.com/warehouse-user-assignments/624c30c2-4ce9-5f1d-a368-fb2df62a8f6c?include=users"
        }
    },
    "included": [
        {
            "type": "users",
            "id": "ce63fe5c-4897-5a17-b683-39f2825316b8",
            "attributes": {
                "username": "herald.hopkins@spryker.com",
                "firstName": "Herald",
                "lastName": "Hopkins"
            },
            "links": {
                "self": "https://glue-backend.de.b2c.internal-testing.demo-spryker.com/users/ce63fe5c-4897-5a17-b683-39f2825316b8?include=users"
            }
        }
    ]
}
```

</details>


| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| userUuid | String | Unique identifier of the user the assignment belongs to. |
| isActive | Boolean | Defines if the warehouse assignment is active. |
| warehouse.name | String | Name of the warehouse in the assignment. |
| warehouse.uuid | String | Unique identifier of the warehouse in the assignment. |
| warehouse.isActive | Boolean | Defines if the warehouse in the assignment is active. |


| INCLUDED RESOURCE | ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- | --- |
| users | username | String | Username of the warehouse user you are authenticated with. |
| users | firstName | String | First name. |
| users | lastName | String | Last name. |
