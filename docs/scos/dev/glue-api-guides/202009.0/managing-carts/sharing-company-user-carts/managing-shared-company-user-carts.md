---
title: Managing shared company user carts
description: Managed shared company user carts via Glue API.
last_updated: Feb 10, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/v6/docs/managing-shared-company-user-carts
originalArticleId: 457a52f0-9e6d-4265-9897-ade54b0f96f2
redirect_from:
  - /v6/docs/managing-shared-company-user-carts
  - /v6/docs/en/managing-shared-company-user-carts
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


| Path parameter | Description |
| --- | --- |
| ***{% raw %}{{{% endraw %}shared-cart-uuid{% raw %}}}{% endraw %}*** | Unique identifier of a shared cart to change the permissions of. |

### Request

| Header key | Type | Required | Description |
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

| Attribute | Type | Required | Description |
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

| Attribute | Type | Description |
| --- | --- | --- |
| idCompanyUser | String | Name of the company user the cart is shared with. |
| idCartPermissionGroup | Integer | Unique identifier of the cart permission group that describes the permissions granted to the user. |



## Stop sharing a cart
To stop sharing a cart, send the request:

***
`DELETE` **/shared-carts/*{% raw %}{{{% endraw %}shared-cart-uuid{% raw %}}}{% endraw %}***
***

| Path parameter | Description |
| --- | --- |
| ***{% raw %}{{{% endraw %}shared-cart-uuid{% raw %}}}{% endraw %}*** | Unique identifier of a shared cart to stop sharing. |

### Request

| Header key | Type | Required | Description |
| --- | --- | --- | --- |
| Authorization | string | ✓ | String containing digits, letters, and symbols that authorize the company user. [Authenticate as a company user](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/authenticating-as-a-company-user.html#authenticate-as-a-company-user) to get the value.  |

Sample request: `DELETE http://glue.mysprykershop.com/shared-carts/4c677a6b-2f65-5645-9bf8-0ef3532bbbccaa`


### Response
If the request is successful, the endpoint returns  `204 No Content` status code.



## Possible errors

| Status | Reason |
| --- | --- |
| 401 | The access token is invalid. |
| 403 | The access token is missing. |
| 404 | Cart not found. |
| 422 | Failed to share a cart. |


