---
title: "Glue API: Update warehouse user assignments"
description: Learn how to update warehouse user assignments using Glue API
template: glue-api-storefront-guide-template
---

A warehouse user can have multiple warehouses assigned to them. However, because a user can be physically present only in one warehouse, a single warehouse assignment can be active for them at a time. This endpoint lets you make a user warehouse assignment active or inactive.

## Installation

For detailed information about the modules that provide the API functionality and related installation instructions, see:

* [Install the Warehouse picking feature](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/install-and-upgrade/install-the-warehouse-picking-feature.html)
* [Install the Warehouse User Management feature](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/install-and-upgrade/install-the-warehouse-user-management-feature.html)


## Update a warehouse user assignment

---
`PATCH` **/warehouse-user-assignments/*{% raw %}{{warehouse_user_assignment_id}}{% endraw %}***
---

| PATH PARAMETER | DESCRIPTION |
| - | - |
| ***{{warehouse_user_assignment_id}}*** | ID of the warehouse user assignment to update. You get it when [creating a warehouse user assignment](/docs/pbc/all/warehouse-management-system/202311.0/unified-commerce/manage-using-glue-api/glue-api-create-warehouse-user-assignments.html) |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the warehouse user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html).  |

| STRING PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | users |

| REQUEST  | USAGE |
| --- | --- |
| `PATCH https://glue-backend.de.b2c.internal-testing.demo-spryker.com/warehouse-user-assignments/99e048ef-8cd8-5e52-aca9-50a590a469c2` | Update the warehouse user assignment with the specified ID.  |
| `PATCH https://glue-backend.de.b2c.internal-testing.demo-spryker.com/warehouse-user-assignments/99e048ef-8cd8-5e52-aca9-50a590a469c2?include=users` | Update the warehouse user assignment with the specified ID. Include information about the authenticated user in the response.  |

Request sample:
```json
{
    "data": {
        "attributes": {
            "isActive": true
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| isActive | Boolean | &check; | Defines if the assignment is to be active. |


### Response

<details open>
  <summary>Response sample: Update the warehouse user assignment.</summary>

```json
{
    "data": {
        "type": "warehouse-user-assignments",
        "id": "99e048ef-8cd8-5e52-aca9-50a590a469c2",
        "attributes": {
            "userUuid": "0c1b09b7-fb51-5fdc-9ef0-1c809d7d99da",
            "isActive": true,
            "warehouse": {
                "name": "Warehouse1",
                "uuid": "834b3731-02d4-5d6f-9a61-d63ae5e70517",
                "isActive": true
            }
        },
        "links": {
            "self": "https://glue-backend.de.b2c.internal-testing.demo-spryker.com/warehouse-user-assignments/99e048ef-8cd8-5e52-aca9-50a590a469c2"
        }
    }
}
```

</details>

<details open>
  <summary>Response sample: Update the warehouse user assignment. Include the user information in the response.</summary>

```json
{
    "data": {
        "type": "warehouse-user-assignments",
        "id": "99e048ef-8cd8-5e52-aca9-50a590a469c2",
        "attributes": {
            "userUuid": "0c1b09b7-fb51-5fdc-9ef0-1c809d7d99da",
            "isActive": true,
            "warehouse": {
                "name": "Warehouse1",
                "uuid": "834b3731-02d4-5d6f-9a61-d63ae5e70517",
                "isActive": true
            }
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
            "self": "https://glue-backend.de.b2c.internal-testing.demo-spryker.com/warehouse-user-assignments/99e048ef-8cd8-5e52-aca9-50a590a469c2?include=users"
        }
    },
    "included": [
        {
            "type": "users",
            "id": "0c1b09b7-fb51-5fdc-9ef0-1c809d7d99da",
            "attributes": {
                "username": "andrii.tserkovnyi@spryker.com",
                "firstName": "Andrii",
                "lastName": "Tserkovnyi"
            },
            "links": {
                "self": "https://glue-backend.de.b2c.internal-testing.demo-spryker.com/users/0c1b09b7-fb51-5fdc-9ef0-1c809d7d99da?include=users"
            }
        }
    ]
}
```

</details>  
