---
title: "Glue API: Update warehouse user assignments"
description: Learn how to update warehouse user assignments using Glue API within your Spryker Unified Commerce project.
template: glue-api-storefront-guide-template
last_updated: Dec 7, 2023
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
| ***{% raw %}{{warehouse_user_assignment_id}}{% endraw %}*** | ID of the warehouse user assignment to update. You get it when [creating a warehouse user assignment](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/manage-warehouse-user-assignments/glue-api-create-warehouse-user-assignments.html) |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html).  |

| STRING PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | users |

| REQUEST  | USAGE |
| --- | --- |
| `PATCH https://glue-backend.mysprykershop.com/warehouse-user-assignments/99e048ef-8cd8-5e52-aca9-50a590a469c2` | Update the warehouse user assignment with the specified ID.  |
| `PATCH https://glue-backend.mysprykershop.com/warehouse-user-assignments/99e048ef-8cd8-5e52-aca9-50a590a469c2?include=users` | Update the warehouse user assignment with the specified ID. Include information about the authenticated user in the response.  |

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

<details>
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
            "self": "https://glue-backend.mysprykershop.com/warehouse-user-assignments/99e048ef-8cd8-5e52-aca9-50a590a469c2"
        }
    }
}
```

</details>

<details>
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


{% include pbc/all/glue-api-guides/{{page.version}}/warehouse-user-assignments-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/warehouse-user-assignments-response-attributes.md -->

{% include pbc/all/glue-api-guides/{{page.version}}/users-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/users-response-attributes.md -->



## Possible errors

| CODE | REASON |
| --- | --- |
| 5201 | The warehouse user assignment with the specified ID doesn't exist.  |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).
