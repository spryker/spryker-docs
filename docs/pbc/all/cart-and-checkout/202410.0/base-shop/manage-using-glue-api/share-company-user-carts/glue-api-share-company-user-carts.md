---
title: "Glue API: Share company user carts"
description: Discover how you can share company user carts using the Spryker Glue API.
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/sharing-company-user-carts
originalArticleId: a200e568-906d-4ae4-b50a-8ad5433d4399
redirect_from:
  - /docs/scos/dev/glue-api-guides/201811.0/managing-carts/sharing-company-user-carts/sharing-company-user-carts.html
  - /docs/scos/dev/glue-api-guides/201903.0/managing-carts/sharing-company-user-carts/sharing-company-user-carts.html
  - /docs/scos/dev/glue-api-guides/202311.0/managing-carts/sharing-company-user-carts/sharing-company-user-carts.html
  - /docs/pbc/all/cart-and-checkout/202311.0/base-shop/manage-using-glue-api/share-company-user-carts/share-company-user-carts.html
  - /docs/pbc/all/cart-and-checkout/202204.0/base-shop/manage-using-glue-api/share-company-user-carts/glue-api-share-company-user-carts.html
related:
  - title: Retrieving cart permission groups
    link: docs/pbc/all/cart-and-checkout/page.version/base-shop/manage-using-glue-api/share-company-user-carts/glue-api-retrieve-cart-permission-groups.html
  - title: Managing shared company user carts
    link: docs/pbc/all/cart-and-checkout/page.version/base-shop/manage-using-glue-api/share-company-user-carts/glue-api-manage-shared-company-user-carts.html
---

Company users can share their carts with other company users, so multiple representatives of a company can work on the same order. When sharing carts, users can choose what type of access they want to grant to different each other.

This endpoint allows sharing carts with company users.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see [Install the Shared Carts feature](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-shared-carts-feature.html).


## Share a cart

To share a cart, send the request:

***
`POST` **/carts/*{% raw %}{{{% endraw %}cart-uuid{% raw %}}}{% endraw %}*/shared-carts**
***


| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}cart-uuid{% raw %}}}{% endraw %}*** | The unique ID of a cart to share. |

### Request

| HEADER KEY | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | ✓ | A string containing digits, letters, and symbols that authorize the company user. [Authenticate as a company user](/docs/pbc/all/identity-access-management/{{site.version}}/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user) to get the value.  |

Request sample: `POST https://glue.mysprykershop.com/carts/f23f5cfa-7fde-5706-aefb-ac6c6bbadeab/shared-carts`

```json
{
    "data": {
        "type": "shared-carts",
        "attributes": {
            "idCompanyUser": "4c677a6b-2f65-5645-9bf8-0ef3532bead1",
            "idCartPermissionGroup": 1
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| idCompanyUser | String | ✓ | The unique ID of a company user to share the cart with.<br>The user must belong to the same company as the cart owner. |
| idCartPermissionGroup | Integer | ✓ | The unique ID of a cart permission group that defines the permissions of the company user for the cart. To get the full list of cart permission groups, [retrieve permission groups](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/share-company-user-carts/glue-api-retrieve-cart-permission-groups.html#retrieve-cart-permission-groups). |

### Response

Response sample:

```json
{
    "data": {
        "type": "shared-carts",
        "id": "4c677a6b-2f65-5645-9bf8-0ef3532bbbccaa",
        "attributes": {
            "idCompanyUser": "4c677a6b-2f65-5645-9bf8-0ef3532bead1",
            "idCartPermissionGroup": 1
        },
        "links": {
            "self": "https://glue.mysprykershop.com/shared-carts/4c677a6b-2f65-5645-9bf8-0ef3532bbbccaa"
        }
    }
}
```

{% include pbc/all/glue-api-guides/{{page.version}}/shared-carts-response-attributes.md %} <!-- To edit, see /_includes/pbc/all/glue-api-guides/202311.0/shared-carts-response-attributes.md -->


## Possible errors

| CODE | REASON |
| --- | --- |
| 001 | The access token is invalid. |
| 002 | The access token is missing. |
| 101 | Cart is not found. |
| 104 | Cart uuid is missing. |
| 422 | Failed to share a cart. |
| 901 | `idCompanyUser` field is not specified or empty. |
| 2501 | Cart permission group is not found. |
| 2701 | Action is forbidden. |
| 2702 | Failed to share a cart. |
| 2703 | Shared cart not found. |
| 2704 | Shared cart ID is missing. |
| 2705 | Shared cart is not found. |
| 2706 | Failed to save the shared cart. |

## Next steps

- [Manage shared company user carts](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/share-company-user-carts/glue-api-manage-shared-company-user-carts.html)
