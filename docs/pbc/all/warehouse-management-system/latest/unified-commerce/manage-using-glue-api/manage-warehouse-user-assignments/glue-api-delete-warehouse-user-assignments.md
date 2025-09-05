---
title: "Glue API: Delete warehouse user assignments"
description: Learn how to activate and deactivate warehouse assignments using Glue API
template: glue-api-storefront-guide-template
redirect_from:
last_updated: Dec 18, 2023
---

A warehouse user can have multiple warehouses assigned to them. However, because a user can be physically present only in one warehouse, a single warehouse assignment can be active for them at a time. This endpoint lets you delete warehouse user assignments.

## Installation

For detailed information about the modules that provide the API functionality and related installation instructions, see:

- [Install the Warehouse picking feature](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/install-and-upgrade/install-the-warehouse-picking-feature.html)
- [Install the Warehouse User Management feature](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/install-and-upgrade/install-the-warehouse-user-management-feature.html)


## Delete a warehouse user assignment

***
`DELETE` **/warehouse-user-assignments/*{% raw %}{{warehouse_user_assignment_id}}{% endraw %}***
***

| PATH PARAMETER | DESCRIPTION |
| - | - |
| ***{% raw %}{{warehouse_user_assignment_id}}{% endraw %}*** | ID of the user warehouse assignment to delete. You get it when [creating a warehouse user assignment](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/manage-warehouse-user-assignments/glue-api-create-warehouse-user-assignments.html) |


### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html).  |

Request sample: `DELETE https://glue-backend.mysprykershop.com/warehouse-user-assignments/4464f4d0-34ab-57bb-ac2b-77609bbacb2b`

### Response

If the warehouse user assignment is deleted successfully, the endpoint returns the `204 No Content` status code.

## Possible errors

| CODE | REASON |
| --- | --- |
| 5201 | The warehouse user assignment with the specified ID doesn't exist.  |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/rest-api/reference-information-glueapplication-errors.html).
