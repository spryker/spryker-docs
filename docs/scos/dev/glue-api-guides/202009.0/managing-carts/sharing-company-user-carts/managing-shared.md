---
title: Managing shared company user carts
originalLink: https://documentation.spryker.com/v6/docs/managing-shared-company-user-carts
redirect_from:
  - /v6/docs/managing-shared-company-user-carts
  - /v6/docs/en/managing-shared-company-user-carts
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
| Authorization | string | ✓ | String containing digits, letters, and symbols that authorize the company user. [Authenticate as a company user](https://documentation.spryker.com/docs/authenticating-as-a-company-user#authenticate-as-a-company-user) to get the value.  |

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
| Authorization | string | ✓ | String containing digits, letters, and symbols that authorize the company user. [Authenticate as a company user](https://documentation.spryker.com/docs/authenticating-as-a-company-user#authenticate-as-a-company-user) to get the value.  |

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


