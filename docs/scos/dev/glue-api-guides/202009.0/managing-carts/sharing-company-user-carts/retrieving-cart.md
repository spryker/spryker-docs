---
title: Retrieving cart permission groups
originalLink: https://documentation.spryker.com/v6/docs/retrieving-cart-permission-groups
redirect_from:
  - /v6/docs/retrieving-cart-permission-groups
  - /v6/docs/en/retrieving-cart-permission-groups
---

Company users can share their carts with others so that multiple representatives of the same company can work together on the same order. In addition to that, users can choose what type of access they want to grant to different users. This endoint allows retrieving cart permission groups of a company. 

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see [Shared Carts feature integration](https://documentation.spryker.com/docs/shared-carts-feature-integration).

## Retrieve cart permission groups

To retrieve cart permission groups, send the request:

***
`GET` **/cart-permission-groups**
***

### Request

| Header key | Type | Required | Description |
| --- | --- | --- | --- |
| Authorization | string | ✓ | String containing digits, letters, and symbols that authorize the company user. [Authenticate as a company user](https://documentation.spryker.com/docs/authenticating-as-a-company-user#authenticate-as-a-company-user) to get the value.  |

Request sample : `GET http://glue.mysprykershop.com/cart-permission-groups`

### Response

<details open>
    <summary>Response sample</summary>

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

| Attribute | Type | Description |
| --- | --- | --- |
| id | String | A unique identifier that is used to define permissions with this permission group. |
| name | String | Permission group name. For example, `READ_ONLY` or `FULL_ACCESS`. |
| isDefault | Boolean | Defines if the permission group is applied to shared carts by default. |


## Retrieve a cart permission group

To retrieve a cart permission group, send the request:

***
`GET`**/cart-permission-groups/*{% raw %}{{{% endraw %}permission_group_id{% raw %}}}{% endraw %}***
***


| Path parameter | Description |
| --- | --- |
| ***{% raw %}{{{% endraw %}permission_group_id{% raw %}}}{% endraw %}*** | Unique identifier of a cart permission group to retrieve. |

### Request

| Header key | Type | Required | Description |
| --- | --- | --- | --- |
| Authorization | string | ✓ | String containing digits, letters, and symbols that authorize the company user. [Authenticate as a company user](https://documentation.spryker.com/docs/authenticating-as-a-company-user#authenticate-as-a-company-user) to get the value.  |

Sample request: `GET http://glue.mysprykershop.com/cart-permission-groups/1`



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

| Attribute | Type | Description |
| --- | --- | --- |
| id | String | A unique identifier that is used to assign permissions with this permission group. |
| name | String | Permission group name. For example, `READ_ONLY` or `FULL_ACCESS`. |
| isDefault | Boolean | Defines if the permission group is applied to shared carts by default. |


## Possible errors

| Status | Reason |
| --- | --- |
| 001 | The access token is invalid. |
| 002 | The access token is missing. |
| 2501| The specified permission group was not found or the user does not have access to it. |

## Next steps


* [Sharing company user carts](https://documentation.spryker.com/docs/sharing-company-user-carts)
