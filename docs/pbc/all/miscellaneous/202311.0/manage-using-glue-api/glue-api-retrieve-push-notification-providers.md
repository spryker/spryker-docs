---
title: "Glue API: Retrieve push notification providers"
description: Learn how to retrieve push notification providers using Glue API
template: glue-api-storefront-guide-template
---

This endpoint lets you retrieve push notification providers.

## Installation

For detailed information about the modules that provide the API functionality and related installation instructions, see [Install the Push Notification feature](/docs/pbc/all/miscellaneous/202311.0/install-and-upgrade/install-features/install-the-push-notification-feature.html).


## Retrieve push notification providers

---
`GET` **/push-notification-providers**
---

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the warehouse user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html).  |


| REQUEST  | USAGE |
| --- | --- |
| `POST http://glue-backend.mysprykershop.com/warehouse-user-assignments` | Create a warehouse user assignment.  |
| `POST http://glue-backend.mysprykershop.com/warehouse-user-assignments?include=users` | Create a warehouse user assignment. Include information about the user in the response.  |

Request sample: `GET http://glue-backend.mysprykershop.com/push-notification-providers`



### Response


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
