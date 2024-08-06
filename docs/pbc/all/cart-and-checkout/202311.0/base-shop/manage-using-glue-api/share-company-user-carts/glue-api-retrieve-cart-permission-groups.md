---
title: "Glue API: Retrieve cart permission groups"
description: Learn how to retrieve cart permission groups via Glue API.
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-cart-permission-groups
originalArticleId: 0cb5d28a-634a-425a-916e-5f1a18885f98
redirect_from:
  - /docs/scos/dev/glue-api-guides/202005.0/managing-carts/sharing-company-user-carts/retrieving-cart-permission-groups.html
  - /docs/scos/dev/glue-api-guides/202200.0/managing-carts/sharing-company-user-carts/retrieving-cart-permission-groups.html
  - /docs/scos/dev/glue-api-guides/202311.0/managing-carts/sharing-company-user-carts/retrieving-cart-permission-groups.html
  - /docs/pbc/all/cart-and-checkout/202311.0/base-shop/manage-using-glue-api/share-company-user-carts/retrieve-cart-permission-groups.html
  - /docs/pbc/all/cart-and-checkout/202204.0/base-shop/manage-using-glue-api/share-company-user-carts/glue-api-retrieve-cart-permission-groups.html
related:
  - title: Share company user carts
    link: docs/pbc/all/cart-and-checkout/page.version/base-shop/manage-using-glue-api/share-company-user-carts/glue-api-share-company-user-carts.html
  - title: Managing shared company user carts
    link: docs/pbc/all/cart-and-checkout/page.version/base-shop/manage-using-glue-api/share-company-user-carts/glue-api-manage-shared-company-user-carts.html
---

Company users can share their carts with others so that multiple representatives of the same company can work together on the same order. In addition to that, users can choose what type of access they want to grant to different users. This endpoint allows retrieving cart permission groups of a company.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see [Install the Shared Carts feature](/docs/pbc/all/cart-and-checkout/{{site.version}}/base-shop/install-and-upgrade/install-features/install-the-shared-carts-feature.html).

## Retrieve cart permission groups

To retrieve cart permission groups, send the request:

***
`GET` **/cart-permission-groups**
***

### Request

| HEADER KEY | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | ✓ | A string containing digits, letters, and symbols that authorize the company user. [Authenticate as a company user](/docs/pbc/all/identity-access-management/{{site.version}}/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user) to get the value.  |

Request sample : `GET http://glue.mysprykershop.com/cart-permission-groups`

### Response

<details>
<summary markdown='span'>Response sample</summary>

```json
{
    "data": [
        {
            "type": "cart-permission-groups",
            "id": "1",
            "attributes": {
                "name": "READ_ONLY",
                "isDefault": true
            },
            "links": {
                "self": "http://glue.mysprykershop.com/cart-permission-groups/1"
            }
        },
        {
            "type": "cart-permission-groups",
            "id": "2",
            "attributes": {
                "name": "FULL_ACCESS",
                "isDefault": false
            },
            "links": {
                "self": "http://glue.mysprykershop.com/cart-permission-groups/2"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/cart-permission-groups"
    }
}
```

</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| id | String | A unique ID that is used to define permissions with this permission group. |
| name | String | The permission group's name. For example, `READ_ONLY` or `FULL_ACCESS`. |
| isDefault | Boolean | If true, the permission group is applied to shared carts by default. |


## Retrieve a cart permission group

To retrieve a cart permission group, send the request:

***
`GET`**/cart-permission-groups/*{% raw %}{{{% endraw %}permission_group_id{% raw %}}}{% endraw %}***
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}permission_group_id{% raw %}}}{% endraw %}*** | The unique identifier of a cart's permission group to retrieve. |

### Request

| HEADER KEY | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | ✓ | A string containing digits, letters, and symbols that authorize the company user. [Authenticate as a company user](/docs/pbc/all/identity-access-management/{{site.version}}/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user) to get the value.  |

Request sample: `GET http://glue.mysprykershop.com/cart-permission-groups/1`

### Response

 Response sample:


```json
{
    "data": {
        "type": "cart-permission-groups",
        "id": "1",
        "attributes": {
            "name": "READ_ONLY",
            "isDefault": true
        },
        "links": {
            "self": "http://glue.mysprykershop.com/cart-permission-groups/1"
        }
    }
}
```

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| id | String | A unique ID that is used to assign permissions with this permission group. |
| name | String | The permission group's name. For example, `READ_ONLY` or `FULL_ACCESS`. |
| isDefault | Boolean | If true, the permission group is applied to shared carts by default. |

## Possible errors

| CODE | REASON |
| --- | --- |
| 001 | Access token is invalid. |
| 002 | Access token is missing. |
| 2501| Specified permission group is not found or the user does not have access to it. |

## Next steps

[Share company user carts](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/share-company-user-carts/glue-api-share-company-user-carts.html)
