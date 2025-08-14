---
title: "Glue API: Add push notification providers"
description: Learn how to add push notification providers using Spryker Glue API in your Spryker projects.
last_updated: Dec 23, 2023
template: glue-api-storefront-guide-template
redirect_from:
  - /docs/pbc/all/miscellaneous/latest/manage-using-glue-api/manage-push-notification-providers/glue-api-add-push-notification-providers.html
---

This endpoint lets you add push notification providers to further subscribe to notifications.

## Installation

[Install the Push Notification feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-push-notification-feature.html)

## Retrieve push notification providers

***
`POST` **{% raw %}*{{backend_url}}*{% endraw %}/push-notification-providers**
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
    "type": "push-notificatoin-providers",
    "attributes": {
      "name": "Fulfillment App provider"
    }
  }
}
```


{% include pbc/all/glue-api-guides/{{page.version}}/push-notification-providers-request-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/{{page.version}}/push-notification-providers-request-attributes.md -->



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
            "self": "https://glue-backend.b2c-eu.demo-spryker.com/push-notification-providers/ffb5875e-00d3-5436-ae67-08b7c9837f3e"
        }
    }
}
```


{% include pbc/all/glue-api-guides/{{page.version}}/push-notification-providers-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/{{page.version}}/push-notification-providers-response-attributes.md -->



## Possible errors

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/rest-api/reference-information-glueapplication-errors.html).
