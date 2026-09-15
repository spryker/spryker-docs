---
title: "Backend API: Create an order comment"
description: Learn how to add a Back Office comment to a placed order, attributed to the authenticated operator, using the Spryker Backend API.
last_updated: Sep 15, 2026
template: default
related:
  - title: Authenticate as a Back Office user
    link: docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html
  - title: Retrieve order comments
    link: docs/pbc/all/order-experience-management/latest/base-shop/manage-using-backend-api/orders/backend-api-retrieve-order-comments.html
  - title: Retrieve orders
    link: docs/pbc/all/order-experience-management/latest/base-shop/manage-using-backend-api/orders/backend-api-retrieve-orders.html
---

The `order-comments` resource of the Backend API lets Back Office integrations add a comment to a placed order. This document describes how to create a comment and which validations the request has to pass.

## Installation

The endpoints are provided by the `OrderExperienceManagement` module. Install it with `composer require spryker-feature/order-experience-management`, then run `console transfer:generate` and `console propel:install` to apply the module's schema extension.

## Create an order comment

To add a comment to an order, send the request:

---
`POST` **/orders/*{% raw %}{{orderReference}}{% endraw %}*/comments**

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{orderReference}}***{% endraw %} | Reference of the order to comment on. To get it, [retrieve orders](/docs/pbc/all/order-experience-management/latest/base-shop/manage-using-backend-api/orders/backend-api-retrieve-orders.html#retrieve-orders). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |

Request sample: add a comment to an order

`POST https://glue-backend.mysprykershop.com/orders/DE--1234/comments`

```json
{
    "data": {
        "type": "order-comments",
        "attributes": {
            "message": "Customer asked to hold the shipment until Friday."
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| message | String | &check; | The comment body. Trimmed, then required to be 1 to 5000 characters. |

{% info_block infoBox "Author is set automatically" %}

The comment is attributed to the operator whose access token was used. `username` cannot be supplied by the client—a value sent for it is ignored.

{% endinfo_block %}

### Response

<details>
<summary>Response sample: create an order comment</summary>

```json
{
    "data": {
        "id": "DE--1234",
        "type": "order-comments",
        "attributes": {
            "orderReference": "DE--1234",
            "message": "Customer asked to hold the shipment until Friday.",
            "username": "Admin Spryker",
            "createdAt": "2026-08-27 15:12:03.000000",
            "updatedAt": "2026-08-27 15:12:03.000000"
        }
    }
}
```

</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| orderReference | String | Order the comment belongs to. |
| message | String | The comment body. |
| username | String | Display name of the operator who wrote the comment. |
| createdAt | String | Timestamp the comment was created at. |
| updatedAt | String | Timestamp the comment was last updated at. |

## Possible errors

| STATUS | CODE | REASON |
| --- | --- | --- |
| 404 | N/A | No order with the specified `orderReference`. |
| 422 | N/A | The message is blank, or longer than 5000 characters. |

| 401 | N/A | The `Authorization` header is missing, or the access token is invalid or expired. |
| 403 | N/A | The authenticated Back Office user is not allowed to access the `order-comments` resource. |

To view generic errors and status codes of the Backend API, see [Backend API request and response reference](/docs/integrations/spryker-api/backend-api/developing-apis/backend-api-request-and-response-reference.html#http-status-codes).
