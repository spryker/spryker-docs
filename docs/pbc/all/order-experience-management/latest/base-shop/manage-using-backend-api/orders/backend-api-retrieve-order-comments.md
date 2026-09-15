---
title: "Backend API: Retrieve order comments"
description: Learn how to retrieve the Back Office comment thread of a placed order using the Spryker Backend API.
last_updated: Sep 15, 2026
template: default
related:
  - title: Authenticate as a Back Office user
    link: docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html
  - title: Create an order comment
    link: docs/pbc/all/order-experience-management/latest/base-shop/manage-using-backend-api/orders/backend-api-create-an-order-comment.html
  - title: Retrieve orders
    link: docs/pbc/all/order-experience-management/latest/base-shop/manage-using-backend-api/orders/backend-api-retrieve-orders.html
---

The `order-comments` resource of the Backend API lets Back Office integrations read the comment thread of a placed order—the same comments shown on the order screens. This document describes how to retrieve an order's comments.

## Installation

The endpoints are provided by the `OrderExperienceManagement` module. For details on installing it, see [Install the Orders Backend API feature](/docs/pbc/all/order-experience-management/latest/base-shop/install-and-upgrade/install-features/install-the-orders-backend-api-feature.html).

## Retrieve order comments

To retrieve the comments of an order, send the request:

---
`GET` **/orders/*{% raw %}{{orderReference}}{% endraw %}*/comments**

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{orderReference}}***{% endraw %} | Reference of the order to retrieve comments of. To get it, [retrieve orders](/docs/pbc/all/order-experience-management/latest/base-shop/manage-using-backend-api/orders/backend-api-retrieve-orders.html#retrieve-orders). |

### Request

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |

Request sample: retrieve an order's comments

`GET https://glue-backend.mysprykershop.com/orders/DE--1234/comments`

### Response

Comments are returned oldest first. The thread is small enough that the resource is not paginated. An order with no comments yet returns an empty `data` array rather than a `404`.

<details>
<summary>Response sample: retrieve order comments</summary>

```json
{
    "data": [
        {
            "id": "DE--1234",
            "type": "order-comments",
            "attributes": {
                "orderReference": "DE--1234",
                "message": "Customer asked to hold the shipment until Friday.",
                "username": "Admin Spryker",
                "createdAt": "2026-08-27 15:12:03.000000",
                "updatedAt": "2026-08-27 15:12:03.000000"
            }
        },
        {
            "id": "DE--1234",
            "type": "order-comments",
            "attributes": {
                "orderReference": "DE--1234",
                "message": "Shipment released.",
                "username": "Admin Spryker",
                "createdAt": "2026-08-28 08:30:11.000000",
                "updatedAt": "2026-08-28 08:30:11.000000"
            }
        }
    ]
}
```

</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| orderReference | String | Order the comment belongs to. |
| message | String | The comment body. |
| username | String | Display name of the operator who wrote the comment. May be absent on some existing comments. |
| createdAt | String | Timestamp the comment was created at. |
| updatedAt | String | Timestamp the comment was last updated at. |

{% info_block infoBox "No single-comment endpoint" %}

There is no endpoint to retrieve, update, or delete one comment: comments have no addressable identifier and no reliable authorship reference, so per-comment access or edit and delete cannot be enforced correctly. Always retrieve the full thread.

{% endinfo_block %}

## Possible errors

| STATUS | CODE | REASON |
| --- | --- | --- |
| 404 | N/A | No order with the specified `orderReference`. |
| 401 | N/A | The `Authorization` header is missing, or the access token is invalid or expired. |
| 403 | N/A | The authenticated Back Office user is not allowed to access the `order-comments` resource. |

To view generic errors and status codes of the Backend API, see [Backend API request and response reference](/docs/integrations/spryker-api/backend-api/developing-apis/backend-api-request-and-response-reference.html#http-status-codes).
