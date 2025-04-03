---
title: "Glue API: Create warehouse user assignments"
description: Learn how to create warehouse user assignments using Glue API within your Spryker Unified Commerce project.
template: glue-api-storefront-guide-template
last_updated: Dec 14, 2023
---

A warehouse user can have multiple warehouses assigned to them. However, because a user can be physically present only in one warehouse, a single warehouse assignment can be active for them at a time. This endpoint lets you create active and inactive warehouse user assignments.

## Installation

For detailed information about the modules that provide the API functionality and related installation instructions, see:

* [Install the Warehouse picking feature](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/install-and-upgrade/install-the-warehouse-picking-feature.html)
* [Install the Warehouse User Management feature](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/install-and-upgrade/install-the-warehouse-user-management-feature.html)


## Create a warehouse user assignment

***
`POST` **/warehouse-user-assignments**
***

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html).  |

| STRING PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | users |

| REQUEST  | USAGE |
| --- | --- |
| `POST http://glue-backend.mysprykershop.com/warehouse-user-assignments` | Create a warehouse user assignment.  |
| `POST http://glue-backend.mysprykershop.com/warehouse-user-assignments?include=users` | Create a warehouse user assignment. Include information about the user in the response.  |

Request sample:
```json
{
    "data": {
        "type": "warehouse-user-assignments",
        "attributes": {
            "userUuid": "ce63fe5c-4897-5a17-b683-39f2825316b8",
            "warehouse": {
                "uuid": "3899fb51-7419-5df6-9257-4599c9b857a5"
            },
            "isActive": false
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| userUuid | String | &check; | Unique identifier of the warehouse user to create the assignment for. |
| warehouse.uuid | String | &check; | Unique identifier of the warehouse to create the assignment for. |
| isActive | Boolean | &check; | Defines if the assignment is to be active. |




### Response


<details>
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
            "self": "https://glue-backend.mysprykershop.com/warehouse-user-assignments/75d8832e-0aa8-570e-9761-f2ccad7e3a37"
        }
    }
}
```

</details>

<details>
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
            "self": "https://glue-backend.mysprykershop.com/warehouse-user-assignments/624c30c2-4ce9-5f1d-a368-fb2df62a8f6c?include=users"
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
                "self": "https://glue-backend.mysprykershop.com/users/ce63fe5c-4897-5a17-b683-39f2825316b8?include=users"
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
| 5201 | The provided user or warehouse ID is invalid. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).
