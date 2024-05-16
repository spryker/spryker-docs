---
title: "Glue API: Manage shared company user carts"
description: Managed shared company user carts via Glue API.
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-shared-company-user-carts
originalArticleId: 87aea51a-e7f0-43a3-a820-b72537b8395b
redirect_from:
  - /docs/scos/dev/glue-api-guides/202311.0/managing-carts/sharing-company-user-carts/managing-shared-company-user-carts.html
  - /docs/pbc/all/cart-and-checkout/202311.0/base-shop/manage-using-glue-api/share-company-user-carts/manage-shared-company-user-carts.html
  - /docs/pbc/all/cart-and-checkout/202204.0/base-shop/manage-using-glue-api/share-company-user-carts/glue-api-manage-shared-company-user-carts.html
related:
  - title: Share company user carts
    link: docs/pbc/all/cart-and-checkout/page.version/base-shop/manage-using-glue-api/share-company-user-carts/glue-api-share-company-user-carts.html
  - title: Retrieving cart permission groups
    link: docs/pbc/all/cart-and-checkout/page.version/base-shop/manage-using-glue-api/share-company-user-carts/glue-api-retrieve-cart-permission-groups.html
  - title: "Glue API: Authenticating as a company user"
    link: docs/pbc/all/identity-access-management/page.version/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html
  - title: Shared Cart feature overview
    link: docs/scos/user/features/page.version/shared-carts-feature-overview.html
  - title: Install the Shared Carts feature
    link: docs/pbc/all/cart-and-checkout/page.version/base-shop/install-and-upgrade/install-features/install-the-shared-carts-feature.html
  - title: Manage carts of registered users
    link: docs/pbc/all/cart-and-checkout/page.version/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-carts-of-registered-users.html
---

This endpoint allows managing shared company user carts.

## Change permissions

To change permissions for a shared cart, send the request:

***
`PATCH` **/shared-carts/*{% raw %}{{{% endraw %}shared-cart-uuid{% raw %}}}{% endraw %}***
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}shared-cart-uuid{% raw %}}}{% endraw %}*** | The unique ID of a shared cart to change the permissions of. |

### Request

| HEADER KEY | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | ✓ | A string containing digits, letters, and symbols that authorize the company user. [Authenticate as a company user](/docs/pbc/all/identity-access-management/{{site.version}}/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user) to get the value.  |

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
| idCartPermissionGroup | Integer | ✓ | The unique ID of the cart permission group that describes the permissions granted to the users with whom the cart is shared. |

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
| idCompanyUser | String | The name of the company user the cart is shared with. |
| idCartPermissionGroup | Integer | The unique ID of the cart's permission group that describes the permissions granted to the user. |

## Stop sharing a cart

To stop sharing a cart, send the request:

***
`DELETE` **/shared-carts/*{% raw %}{{{% endraw %}shared-cart-uuid{% raw %}}}{% endraw %}***
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}shared-cart-uuid{% raw %}}}{% endraw %}*** | The unique ID of a shared cart to stop sharing. |

### Request

| HEADER KEY | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | ✓ | String containing digits, letters, and symbols that authorize the company user. [Authenticate as a company user](/docs/pbc/all/identity-access-management/{{site.version}}/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user) to get the value.  |

Request sample: `DELETE http://glue.mysprykershop.com/shared-carts/4c677a6b-2f65-5645-9bf8-0ef3532bbbccaa`

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
