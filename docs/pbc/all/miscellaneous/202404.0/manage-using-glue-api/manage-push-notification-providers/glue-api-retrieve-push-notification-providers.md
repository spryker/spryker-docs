---
title: "Glue API: Retrieve push notification providers"
description: Learn how to retrieve push notification providers using Glue API
last_updated: Dec 23, 2023
template: glue-api-storefront-guide-template
redirect_from:
---

This endpoint lets you retrieve push notification providers to further subscribe to notifications.

## Installation

[Install the Push Notification feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-push-notification-feature.html)

## Retrieve push notification providers

***
`GET` **{% raw %}*{{backend_url}}*{% endraw %}/push-notification-providers**
***



| PATH | DESCRIPTION |
| --- | --- |
| {% raw %}***{{backend_url}}***{% endraw %} | URL of your Backend Glue API. |



### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html).  |


Request sample: `GET https://glue-backend.b2c-eu.demo-spryker.com/push-notification-providers`

### Response

<details>
<summary>Retrieve push notification providers</summary>

```json
{
    "data": [
        {
            "type": "push-notification-providers",
            "id": "2a304ddf-d51b-514f-bd11-6e818a27fe23",
            "attributes": {
                "uuid": "2a304ddf-d51b-514f-bd11-6e818a27fe23",
                "name": "web-push-php"
            },
            "links": {
                "self": "https://glue-backend.b2c-eu.demo-spryker.com/push-notification-providers/2a304ddf-d51b-514f-bd11-6e818a27fe23"
            }
        },
        {
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
    ],
    "links": {
        "self": "https://glue-backend.b2c-eu.demo-spryker.com/push-notification-providers"
    }
}
```

</details>

{% include pbc/all/glue-api-guides/{{page.version}}/push-notification-providers-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/{{page.version}}/push-notification-providers-response-attributes.md -->


## Retrieve a push notification provider


***
`GET` **{% raw %}*{{backend_url}}*{% endraw %}/push-notification-providers/*{% raw %}*{{push_notification_provider_id}}{% endraw %}***
***


| PATH PARAMETER     | DESCRIPTON                                                   |
| ------------------ | -------------------- |
| {% raw %}***{{backend_url}}***{% endraw %} | URL of your Backend Glue API. |
| {% raw %}***{{push_notification_provider_id}}***{% endraw %} | ID of a push notification provider to retrieve. To get it, [retrieve push notification providers](#retrieve-push-notification-providers). |

### Request

| HEADER KEY    | HEADER VALUE | REQUIRED | DESCRIPTION                                                  |
| ------------- | ------------ | -------- | ------------------------------------------------------------ |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html).  |

Request sample: `GET https://glue-backend.b2c-eu.demo-spryker.com/push-notification-providers/2a304ddf-d51b-514f-bd11-6e818a27fe23`

### Response

Response sample:
```json
{
    "data": {
        "type": "push-notification-providers",
        "id": "2a304ddf-d51b-514f-bd11-6e818a27fe23",
        "attributes": {
            "uuid": "2a304ddf-d51b-514f-bd11-6e818a27fe23",
            "name": "web-push-php"
        },
        "links": {
            "self": "https://glue-backend.b2c-eu.demo-spryker.com/push-notification-providers/2a304ddf-d51b-514f-bd11-6e818a27fe23"
        }
    }
}
```


{% include pbc/all/glue-api-guides/{{page.version}}/push-notification-providers-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/{{page.version}}/push-notification-providers-response-attributes.md -->




## Possible errors

| CODE  | REASON |
| --- | --- |
|5001| The push notification provider with the specified ID doesn't exist. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).
