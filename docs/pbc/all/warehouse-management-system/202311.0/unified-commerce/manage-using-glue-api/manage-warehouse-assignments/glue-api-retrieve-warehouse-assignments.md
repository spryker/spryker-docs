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
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html).  |

| STRING PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | users |
| filter | Filters out the warehouse user assignments to be retrieved. | warehouseUuid, userUuid, isActive, uuid  |

| REQUEST  | USAGE |
| --- | --- |
| `https://glue-backend.mysprykershop.com/warehouse-user-assignments/99e048ef-8cd8-5e52-aca9-50a590a469c2` | Retrieve the warehouse assignment with the specified ID.  |
| `https://glue-backend.mysprykershop.com/warehouse-user-assignments/99e048ef-8cd8-5e52-aca9-50a590a469c2?include=users` | Retrieve the warehouse assignment with the specified ID. Include information about the authenticated user. |




### Response


<details open>
  <summary>Retrieve a warehouse user assignment</summary>

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
            "self": "https://glue-backend.mysprykershop.com/warehouse-user-assignments/99e048ef-8cd8-5e52-aca9-50a590a469c2"
        }
    }
}
```

</details>

<details open>
  <summary>Retrieve a warehouse user assignment with user information included</summary>

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
            "self": "https://glue-backend.mysprykershop.com/warehouse-user-assignments/99e048ef-8cd8-5e52-aca9-50a590a469c2?include=users"
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
                "self": "https://glue-backend.mysprykershop.com/users/0c1b09b7-fb51-5fdc-9ef0-1c809d7d99da?include=users"
            }
        }
    ]
}
```

</details>


{% include pbc/all/glue-api-guides/{{page.version}}/warehouse-management-system/warehouse-user-assignments-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/{{page.version}}/warehouse-management-system/warehouse-user-assignments-response-attributes.md -->


{% include pbc/all/glue-api-guides/{{page.version}}/warehouse-management-system/users-included-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/{{page.version}}/warehouse-management-system/users-included-response-attributes.md -->


## Possible errors

| CODE | REASON |
| --- | --- |
| 5201 | The warehouse user assignment with the specified ID doesn't exist.  |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/scos/dev/glue-api-guides/{{page.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).
