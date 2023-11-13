---
title: "Glue API: Create push notification subscriptions"
description: Learn how to create push notification subscriptions using Glue API
template: glue-api-storefront-guide-template
---



## Installation

For detailed information about the modules that provide the API functionality and related installation instructions, see [Install the Push Notification feature](/docs/pbc/all/miscellaneous/202311.0/install-and-upgrade/install-features/install-the-push-notification-feature.html).


## Create a push notification subscription

---
`POST` **/push-notification-subscriptions**
---

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the warehouse user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html).  |


| REQUEST  | USAGE |
| --- | --- |
| `POST http://glue-backend.mysprykershop.com/warehouse-user-assignments` | Create a warehouse user assignment.  |
| `POST http://glue-backend.mysprykershop.com/warehouse-user-assignments?include=users` | Create a warehouse user assignment. Include information about the user in the response.  |

Request sample:

`POST http://glue-backend.mysprykershop.com/push-notification-subscriptions`

```json
{
    "data": {
        "type": "push-notification-subscriptions",
        "attributes": {
            "providerName": "web-push-php",
            "group": {
                "name": "warehouse",
                "identifier": "{{warehouseIdentifier}}"
            },
            "payload": {
                "endpoint": "{{pushNotificationEndpoint}}",
                "publicKey": "{{pushNotificationPublicKey}}",
                "authToken": "{{pushNotificationAuthToken}}"
            },
            "localeName": "en_US"
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| providerName | String | &check; |  |
| group | Object | &check; |  |
| group.name | String | &check; |  |
| group.identifier | String | &check; |  |
| payload | Object | &check; |  |
| payload.endpoint | String | &check; |  |
| payload.publicKey | String | &check; |  |
| payload.authToken | String | &check; |  |
| localeName | String | &check; |  |





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
