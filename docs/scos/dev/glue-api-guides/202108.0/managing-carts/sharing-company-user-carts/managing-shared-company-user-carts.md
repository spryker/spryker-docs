---
title: Managing shared company user carts
description: Managed shared company user carts via Glue API.
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-shared-company-user-carts
originalArticleId: 87aea51a-e7f0-43a3-a820-b72537b8395b
redirect_from:
  - /2021080/docs/managing-shared-company-user-carts
  - /2021080/docs/en/managing-shared-company-user-carts
  - /docs/managing-shared-company-user-carts
  - /docs/en/managing-shared-company-user-carts
related:
  - title: Logging In as Company User
    link: docs/scos/dev/glue-api-guides/page.version/managing-b2b-account/authenticating-as-a-company-user.html
  - title: Shared Cart Feature Overview
    link: docs/scos/user/features/page.version/shared-carts-feature-overview.html
  - title: Shared Carts feature integration
    link: docs/scos/dev/feature-integration-guides/page.version/shared-carts-feature-integration.html
  - title: Managing carts of registered users
    link: docs/scos/dev/glue-api-guides/page.version/managing-carts/carts-of-registered-users/managing-carts-of-registered-users.html
---

This endpoint allows managing shared company user carts.

## Change permissions

To change permissions for a shared cart, send the request:

***
`PATCH` **/shared-carts/*{% raw %}{{{% endraw %}shared-cart-uuid{% raw %}}}{% endraw %}***
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}shared-cart-uuid{% raw %}}}{% endraw %}*** | Unique identifier of a shared cart to change the permissions of. |

### Request

| HEADER KEY | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | ✓ | String containing digits, letters, and symbols that authorize the company user. [Authenticate as a company user](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/authenticating-as-a-company-user.html#authenticate-as-a-company-user) to get the value.  |

Request sample: `PATCH http://glue.mysprykershop.com/shared-carts/4c677a6b-2f65-5645-9bf8-0ef3532bbbccaa`

```json
{
    "data": {
        "type": "shared-carts",
        "attributes": {
            "idCartPermissionGroup": 2
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| idCartPermissionGroup | Integer | ✓ | Unique identifier of the cart permission group that describes the permissions granted to the users with whom the cart is shared. |

### Response

Response sample:

```json
{
    "data": {
        "type": "shared-carts",
        "id": "4c677a6b-2f65-5645-9bf8-0ef3532bbbccaa",
        "attributes": {
            "idCompanyUser": "4c677a6b-2f65-5645-9bf8-0ef3532bead1",
            "idCartPermissionGroup": 2
        },
        "links": {
            "self": "http://glue.mysprykershop.com/shared-carts/4c677a6b-2f65-5645-9bf8-0ef3532bbbccaa"
        }
    }
}
```

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| idCompanyUser | String | Name of the company user the cart is shared with. |
| idCartPermissionGroup | Integer | Unique identifier of the cart permission group that describes the permissions granted to the user. |

## Stop sharing a cart

To stop sharing a cart, send the request:

***
`DELETE` **/shared-carts/*{% raw %}{{{% endraw %}shared-cart-uuid{% raw %}}}{% endraw %}***
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}shared-cart-uuid{% raw %}}}{% endraw %}*** | Unique identifier of a shared cart to stop sharing. |

### Request

| HEADER KEY | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | ✓ | String containing digits, letters, and symbols that authorize the company user. [Authenticate as a company user](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/authenticating-as-a-company-user.html#authenticate-as-a-company-user) to get the value.  |

Sample request: `DELETE http://glue.mysprykershop.com/shared-carts/4c677a6b-2f65-5645-9bf8-0ef3532bbbccaa`

### Response

If the request is successful, the endpoint returns  `204 No Content` status code.

## Possible errors

| CODE | REASON |
| --- | --- |
| 001 | Access token is invalid. |
| 002 | Access token is missing. |
| 101 | Cart is not found. |
| 104 | Cart uuid is missing.  |
| 2501| Specified permission group is not found or the user does not have access to it. |
| 2701 | Action is forbidden. |
| 2702 | Failed to share a cart. |
| 2703 | Shared cart not found. |
| 2704 | Shared cart ID is missing. |
| 2705 | Shared cart is not found. |
| 2706 | Failed to save the shared cart. |
