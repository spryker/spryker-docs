---
title: Activate and deactivate warehouse assignments
description: Learn how to activate and deactivate warehouse assignments using Glue API
template: glue-api-storefront-guide-template
---

A warehouse user can have multiple warehouses assigned to them. However, because a user can be physically present only in one warehouse, a single warehouse assignment can be active for them at a time. This endpoint lets you activate and deactivate warehouse assignments for warehouse users.

## Installation

For detailed information about the modules that provide the API functionality and related installation instructions, see:

* [Install the Warehouse picking feature](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/install-and-upgrade/install-the-warehouse-picking-feature.html)
* [Install the Warehouse User Management feature](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/install-and-upgrade/install-the-warehouse-user-management-feature.html)


## Activate or deactivate a warehouse assignment

---
`POST` **/warehouse-user-assignments**
---


### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the warehouse user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html).  |

| STRING PARAMETER | DESCRIPTION | EXEMPLARY VALUES |
| --- | --- | --- |
| include | Adds resource relationships to the request. | <ul><li>picking-list-items</li> <li>users</li> <li>warehouses</li></ul> |


Request sample: Activate a warehouse assignment

`http://glue-backend.mysprykershop.com/warehouse-user-assignments?include=users`

```json
{
    "data": {
        "type": "warehouse-user-assignments",
        "attributes": {
            "userUuid": "48a6c610-693e-5d88-bdce-3c6018b3abd2",
            "warehouse": {
                "uuid": "e84b3cb8-a94a-5a7e-9adb-cc5353f7a73f"
            },
            "isActive": false
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| userUuid | String | &check; | Unique identifier of the warehouse user to activate or deactivate assignment for. |
| warehouse.uuid | String | &check; | Unique identifier of the warehouse to activate or deactivate assignment for. |
| isActive | Boolean | &check; | Defines if the assignment is to be activated or deactivated. |






### Response
