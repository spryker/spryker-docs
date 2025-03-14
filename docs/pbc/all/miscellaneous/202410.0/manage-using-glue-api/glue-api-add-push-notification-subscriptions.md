---
title: "Glue API: Add push notification subscriptions"
description: Learn how to add push notification subscription using Spryker Glue API to your Spryker Projects.
last_updated: Dec 23, 2023
template: glue-api-storefront-guide-template
---

This endpoint lets you subscribe to push notifications using Glue API.

## Installation

[Install the Push Notification feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-push-notification-feature.html)

## Retrieve push notification providers

***
`POST` **{% raw %}*{{backend_url}}*{% endraw %}/push-notification-subscriptions**
***



| PATH | DESCRIPTION |
| --- | --- |
| {% raw %}***{{backend_url}}***{% endraw %} | URL of your Backend Glue API. |



### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html).  |


Request sample: `POST https://glue-backend.b2c-eu.demo-spryker.com/push-notification-providers`

```json
{
    "data": {
        "type": "push-notification-subscriptions",
        "attributes": {
            "providerName": "web-push-php",
            "group": {
                "name": "warehouse",
                "identifier": "1"
            },
            "payload": {
                "endpoint": "https://push-notifications.b2c-eu.demo-spryker.com",
                "publicKey": "3243-f234-3f34-d2334",
                "authToken": "4o3ijfoi3j4f93j4d7fh4f34jf3d902kfh345g8jf903kdj23uf3"
            },
            "localeName": "en_US"
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| providerName | String | &check; | Name of the provider to subscribe to. To get it, [retrieve push notification providers](/docs/pbc/all/miscellaneous/{{page.version}}/manage-using-glue-api/manage-push-notification-providers/glue-api-retrieve-push-notification-providers.html) |
| group | Object | &check;  | Defines the entity to subscribe to. |
| group.name | String | &check;  | The entity type to receive notifications about. |
| group.identifier | String | &check;  | ID of the entity to receive notifications about. To get it, decode `accessToken` retrieved when [authenticating as a warehouse user](/docs/pbc/all/warehouse-management-system/{{page.version}}/unified-commerce/manage-using-glue-api/glue-api-authenticate-as-a-warehouse-user.html). |
| payload | Object | &check;  | The subscription details for establishing a communication channel between the server and the client. |
| payload.endpoint | String | &check;  | The URL provided by the push service that is used to send a push message to the recipient's device. |
| payload.publicKey | String | &check;  | A client public key that is used to encrypt the push message so that only the intended recipient can read it. |
| payload.authToken | String | &check;  | An authentication token that allows the server to send messages to the client's endpoint. |
| localeName | String | &check;  | Defines the language in which the client is to receive notifications. |





### Response

Response sample:
```json
{
   "data": {
      "id": "96555531-c40a-516a-85d2-4f68a8f34f4b",
      "type": "push-notification-subscriptions",
      "attributes": {
         "providerName": "web-push-php",
         "payload": {
            "endpoint": "https://push-notifications.b2c-eu.demo-spryker.com",
            "publicKey": "3243-f234-3f34-d2334",
            "authToken": "4o3ijfoi3j4f93j4d7fh4f34jf3d902kfh345g8jf903kdj23uf3"
         },
         "localeName": "en_US",
         "group": {
            "name": "warehouse",
            "identifier": "1"
         }
      },
      "links": {
         "self": "https:glue-backend.de.spryker.local/push-notification-subscriptions/96555531-c40a-516a-85d2-4f68a8f34f4b"
      }
   }
}
```

| RESOURCE | ATTRIBUTE | TYPE | DESCRIPTION |
|-|-|-|-|
| push-notification-subscriptions | providerName | String | The provider of push notifications.  |
| push-notification-subscriptions | payload.endpoint | String | The URL provided by the push service that is used to send a push message to the recipient's device. |
| push-notification-subscriptions | payload.publicKey | String | A client public key that is used to encrypt the push message so that only the intended recipient can read it. |
| push-notification-subscriptions | payload.authToken | String | An authentication token that allows the server to send messages to the client's endpoint. |
| push-notification-subscriptions | localeName | String | The language in which the client is to receive notifications. |
| push-notification-subscriptions | group | Object | Defines the entity you've subscribed to receive notifications about. |
| push-notification-subscriptions | group.name | String | The entity type you've subscribed to notifications about. |
| push-notification-subscriptions | group.identifier | String | Unique identifier of the entity you've subscribed to receive notifications about. |


## Possible errors

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).
