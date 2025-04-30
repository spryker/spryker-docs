---
title: "Glue API: Delete push notification providers"
description: Learn how to delete push notification providers using Glue API
last_updated: Dec 23, 2023
template: glue-api-storefront-guide-template
---

This endpoint lets you delete push notification providers.

## Installation

[Install the Push Notification feature](/docs/pbc/all/miscellaneous/{{page.version}}/install-and-upgrade/install-features/install-the-push-notification-feature.html)

## Retrieve push notification providers

***
`DELETE` **{% raw %}*{{backend_url}}*{% endraw %}/push-notification-providers/*{% raw %}*{{push_notification_provider_id}}*{% endraw %}**
***



| PATH | DESCRIPTION |
| --- | --- |
| {% raw %}***{{backend_url}}***{% endraw %} | URL of your Backend Glue API. |
| {% raw %}***{{push_notification_provider_id}}***{% endraw %} | ID of a push notification provider to delete. |



### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html).  |


Request sample: `DELETE https://glue-backend.b2c-eu.demo-spryker.com/push-notification-providers/ffb5875e-00d3-5436-ae67-08b7c9837f3e`


### Response

If the push notification provider is deleted successfully, the endpoint returns the `204 No Content` status code.


## Possible errors

| CODE  | REASON |
| --- | --- |
|5001| The push notification provider with the specified ID doesn't exist. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/rest-api/reference-information-glueapplication-errors.html).
