---
title: "Glue API: Add push notification subscriptions"
description: Learn how to add push notification subscription using Glue API
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


Request sample: `POST https://glue-backend.de.b2c.demo-spryker.com/push-notification-providers`

```json
{
  "data": {
    "type": "push-notificatoin-providers",
    "attributes": {
      "name": "Fulfillment App provider"
    }
  }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| acceptedTerms | Boolean | &check; | Specifies whether the customer has accepted the terms of service. For a new customer to be created, this parameter needs to be set to true. |
| confirmPassword | String | &check;  | Specifies a password confirmation for the account of the new customer. |



### Response

Response sample:
```json
{
    "data": {
        "type": "push-notification-providers",
        "id": "ffb5875e-00d3-5436-ae67-08b7c9837f3e",
        "attributes": {
            "uuid": "ffb5875e-00d3-5436-ae67-08b7c9837f3e",
            "name": "Fulfillment App provider"
        },
        "links": {
            "self": "https://glue-backend.de.b2c.demo-spryker.com/push-notification-providers/ffb5875e-00d3-5436-ae67-08b7c9837f3e"
        }
    }
}
```


{% include pbc/all/glue-api-guides/{{page.version}}/push-notification-providers-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/{{page.version}}/push-notification-providers-response-attributes.md -->



## Possible errors

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/scos/dev/glue-api-guides/{{page.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).
