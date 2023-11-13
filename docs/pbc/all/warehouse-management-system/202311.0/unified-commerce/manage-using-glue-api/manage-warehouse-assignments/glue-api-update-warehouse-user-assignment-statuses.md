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
| include | Adds resource relationships to the request. |  |

| REQUEST  | USAGE |
| --- | --- |
| `POST http://glue-backend.mysprykershop.com/warehouse-user-assignments` | Create a warehouse user assignment.  |
| `POST http://glue-backend.mysprykershop.com/warehouse-user-assignments?include=users` | Create a warehouse user assignment. Include information about the user in the response.  |

```json
{
    "data": {
        "attributes": {
            "isActive": false
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| isActive | Boolean | &check; | Defines if the assignment is to be active. |


### Response
