---
title: Sharing Company User Carts
originalLink: https://documentation.spryker.com/v4/docs/sharing-company-user-carts-201907
redirect_from:
  - /v4/docs/sharing-company-user-carts-201907
  - /v4/docs/en/sharing-company-user-carts-201907
---

Company users can share their carts with others so that multiple representatives of the same company can work together on the same order. In addition to that, users can choose what type of access they want to grant to different users.
To share and unshare user carts, you can send REST requests against the endpoints provided by the **Cart Permission Groups API** and the **Shared Carts API**.

In your development, the endpoints will help you to:
* Identify what levels of access are available in the system and display them to users;
* Identify whether a certain cart is shared;
* Identify with whom a cart is shared, and what are the levels of access granted to those users;
* Allow users to share their carts to other users;
* Allow users to stop sharing their carts when no longer needed.

{% info_block warningBox "Authentication" %}
The endpoints provided by the API cannot be accessed anonymously. For this reason, you need to pass a user's authentication token in your REST requests. For details, see [Authentication and Authorization](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/authentication-
{% endinfo_block %}{target="_blank"}.)

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see [Shared Carts Feature Integration](https://documentation.spryker.com/v4/docs/shared-carts-feature-integration-201907){target="_blank"}.

## Shared Carts in Spryker
Registered users can [share](/docs/scos/dev/features/202001.0/shopping-cart/shared-cart/shared-cart){target="_blank"} the carts owned by them with other users in their company. The feature can help them distribute the workload among their team members.

To be able to manage shared carts, you need to impersonate customers as their respective **Company User Accounts**. Upon impersonation, you will receive a bearer token that can be used to access the endpoints provided by the API.

Carts can be shared only with users that belong to the same company. As customers can impersonate themselves as multiple Company Users belonging to different companies, the available carts, as well as cart access permissions, depend on the company that a Company User Account belongs to. The active Company User can be selected when impersonating a customer as a Company User. A bearer token provided during Company User impersonation will include, among other information, the company that the user belongs to.

{% info_block infoBox "Info" %}
For details on how to receive the token, see [Logging In as Company User](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/b2b-account-management/logging-in-as-c
{% endinfo_block %}{target="_blank"}.)

Each access type is represented by a **Permission Group**. There are 2 Permission Groups available out of the box: **Read-only**, and **Full access**.

## Retrieving Cart Permission Groups
To retrieve all available Permission Groups, send a GET request to the following endpoint:

[/cart-permission-groups](https://documentation.spryker.com/v4/docs/rest-api-reference#/cart-permission-groups){target="_blank"}

Sample request: *GET http://glue.mysprykershop.com/cart-permission-groups*

To retrieve a specific Permission Group, query the following endpoint:

[/cart-permission-groups/{% raw %}{{{% endraw %}permission_group_id{% raw %}}}{% endraw %}](https://documentation.spryker.com/v4/docs/rest-api-reference#/cart-permission-groups){target="_blank"}

Sample request: *GET http://glue.mysprykershop.com/cart-permission-groups/1*

where **1** is the ID of the Permission Group you need.

{% info_block warningBox "Authentication Required" %}
To get Cart Permission Groups, you need to authenticate first and pass an access token as a part of your request. For details, see [Authentication and Authorization](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/authentication-
{% endinfo_block %}{target="_blank"}.)

### Response
If all Permission Groups are requested, the resource responds with a **RestCartPermissionGroupsCollectionResponse**. If a single group is queried, the response is a **RestCartPermissionGroupsResponse**.

**Response Attributes:**

| Attribute* | Type | Description |
| --- | --- | --- |
| id | String | Specifies a unique identifier that can be used to assign the permissions with this Permission Group. |
| name | String | Specifies the Permission Group name, for example, READ_ONLY or FULL_ACCESS. |
| isDefault | Boolean | Indicates whether the Permission Group is applied to shared carts by default. |

*The attributes mentioned are all attributes in the response. Type is not mentioned.

**Sample Response Containing All Groups**
    
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

**Sample Response Containing Specific Group**
    
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

### Possible Errors

| Status | Reason |
| --- | --- |
| 401 | The access token is invalid. |
| 403 | The access token is missing. |
| 404 | The specified Permission Group was not found or the user does not have access to it. |

## Viewing Permissions for Carts
To identify whether a cart is shared, send a request to the **/carts** or the **/carts/{% raw %}{{{% endraw %}cartId{% raw %}}}{% endraw %}** endpoint with the **shared-carts** resource relationship included. Additionally, to find out with whom carts are shared and what are the access levels, you can include the **company-users** and **cart-permission-groups** relationships.

[/carts](https://documentation.spryker.com/v4/docs/rest-api-reference#/carts){target="_blank"} - provides information on all carts of a user;

[/carts/{% raw %}{{{% endraw %}cartId{% raw %}}}{% endraw %}](https://documentation.spryker.com/v4/docs/rest-api-reference#/carts){target="_blank"} - provides information on a specific cart.

### Request
Sample requests:
* *GET http://glue.mysprykershop.com/carts?include=shared-carts,company-users,cart-permission-groups*
* *GET http://glue.mysprykershop.com/carts/4741fc84-2b9b-59da-bb8d-f4afab5be054?include=shared-carts,company-users,cart-permission-groups*

where **4741fc84-2b9b-59da-bb8d-f4afab5be054** is the ID of the specific cart you need.

{% info_block warningBox "Authentication" %}
To use this endpoint, customers need to authenticate first.  For details, see [Authentication and Authorization](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/authentication-
{% endinfo_block %}{target="_blank"}.)

{% info_block warningBox "Note" %}
You can also use the Accept-Language header to specify the locale.Sample header: `[{"key":"Accept-Language","value":"de, en;q=0.9"}]` where **de** and **en** are the locales; **q=0.9** is the user's preference for a specific locale. For details, see [14.4 Accept-Language](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4
{% endinfo_block %}{target="_blank"}.)

### Response
No matter which of the 2 endpoints you use, the response will consist of a single or multiple **RestCartsResponse** objects containing the requested cart(s).

{% info_block infoBox "Info" %}
For a detailed list of **RestCartsResponse** attributes, see section *Retrieving Carts* in [Managing Carts of Registered Users](https://documentation.spryker.com/v4/docs/managing-carts-of-registered-users-201907#retrieving-carts
{% endinfo_block %}{target="_blank"}.)

**Attributes Added by the Resource Relationships**

| Resource | Type of Information | Attribute* | Type | Description |
| --- | --- | --- | --- | --- |
| shared-carts | Shared cart properties | idCompanyUser | String | Unique identifier of the user with whom the cart is shared. |
| shared-carts | Shared cart properties | idCartPermissionGroup | Integer | Specifies the ID of the **Cart Permission Group** that describes the permissions granted. |
| cart-permission-groups | Permissions granted to the user for shared carts | name | String | Specifies the Permission Group name, for example, READ_ONLY or FULL_ACCESS. |
| cart-permission-groups | Permissions granted to the user for shared carts | isDefault | Boolean | Indicates whether the Permission Group is applied to shared carts by default. |
| company-users | Information on users with whom the cart(s) is shared | cell | cell | cell |
| company-users | Information on users with whom the cart(s) is shared | id | String | Specifies the ID of the Company User with whom the cart is shared. |
| company-users | Information on users with whom the cart(s) is shared | isActive | Boolean | Indicates whether the Company User is active. |
| company-users | Information on users with whom the cart(s) is shared | isDefault | Boolean | Indicates whether the Company User is the default one for the customer. |

**Sample Response - All Carts**
    
```json
{
    "data": [
        {
            "type": "carts",
            "id": "f23f5cfa-7fde-5706-aefb-ac6c6bbadeab",
            "attributes": {
                "name": "Shared Cart",
                "priceMode": "GROSS_MODE",
                "currency": "EUR",
                "store": "DE",
                "discounts": [],
                "totals": {...},
                "isDefault": false
            },
            "links": {...},
            "relationships": {
                "shared-carts": {
                    "data": [
                        {
                            "type": "shared-carts",
                            "id": "6f7bc709-08c0-5bdb-a3c4-d28f62b3906d"
                        }
                    ]
                }
            }
        },
        {
            "type": "carts",
            "id": "d186c09a-2ed8-50e9-ae18-03251185850d",
            "attributes": {
                "name": "Not Shared Cart",
                "priceMode": "GROSS_MODE",
                "currency": "EUR",
                "store": "DE",
                "discounts": [],
                "totals": {...},
                "isDefault": true
            },
            "links": {...}
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/carts?include=shared-carts,company-users,cart-permission-groups"
    },
    "included": [
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
            "type": "company-users",
            "id": "3692d238-acb3-5b7e-8d24-8dab9c1f4505",
            "attributes": {
                "isActive": true,
                "isDefault": false
            },
            "links": {
                "self": "http://glue.mysprykershop.com/company-users/3692d238-acb3-5b7e-8d24-8dab9c1f4505"
            }
        },
        {
            "type": "shared-carts",
            "id": "6f7bc709-08c0-5bdb-a3c4-d28f62b3906d",
            "attributes": {
                "idCompanyUser": "3692d238-acb3-5b7e-8d24-8dab9c1f4505",
                "idCartPermissionGroup": 1
            },
            "links": {
                "self": "http://glue.mysprykershop.com/shared-carts/6f7bc709-08c0-5bdb-a3c4-d28f62b3906d"
            },
            "relationships": {
                "cart-permission-groups": {
                    "data": [
                        {
                            "type": "cart-permission-groups",
                            "id": "1"
                        }
                    ]
                },
                "company-users": {
                    "data": [
                        {
                            "type": "company-users",
                            "id": "3692d238-acb3-5b7e-8d24-8dab9c1f4505"
                        }
                    ]
                }
            }
        }
    ]
}
```

**Sample Response - Single Cart**
    
```json
{
    "data": {
        "type": "carts",
        "id": "f23f5cfa-7fde-5706-aefb-ac6c6bbadeab",
        "attributes": {...},
        "links": {...},
        "relationships": {
            "shared-carts": {
                "data": [
                    {
                        "type": "shared-carts",
                        "id": "6f7bc709-08c0-5bdb-a3c4-d28f62b3906d"
                    }
                ]
            }
        }
    },
    "included": [
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
            "type": "company-users",
            "id": "3692d238-acb3-5b7e-8d24-8dab9c1f4505",
            "attributes": {
                "isActive": true,
                "isDefault": false
            },
            "links": {
                "self": "http://glue.mysprykershop.com/company-users/3692d238-acb3-5b7e-8d24-8dab9c1f4505"
            }
        },
        {
            "type": "shared-carts",
            "id": "6f7bc709-08c0-5bdb-a3c4-d28f62b3906d",
            "attributes": {
                "idCompanyUser": "3692d238-acb3-5b7e-8d24-8dab9c1f4505",
                "idCartPermissionGroup": 1
            },
            "links": {
                "self": "http://glue.mysprykershop.com/shared-carts/6f7bc709-08c0-5bdb-a3c4-d28f62b3906d"
            },
            "relationships": {
                "cart-permission-groups": {
                    "data": [
                        {
                            "type": "cart-permission-groups",
                            "id": "1"
                        }
                    ]
                },
                "company-users": {
                    "data": [
                        {
                            "type": "company-users",
                            "id": "3692d238-acb3-5b7e-8d24-8dab9c1f4505"
                        }
                    ]
                }
            }
        }
    ]
}
```

### Possible Errors

| Status | Reason |
| --- | --- |
| 401 | The access token is invalid. |
| 403 | The access token is missing. |
| 404 | A cart with the specified ID was not found. |

## Sharing Carts
To share a user's cart, send a POST request to the following endpoint:

[/carts/{% raw %}{{{% endraw %}cart-uuid{% raw %}}}{% endraw %}/shared-carts](https://documentation.spryker.com/v4/docs/rest-api-reference#/carts){target="_blank"}

### Request

Sample request: *POST http://glue.mysprykershop.com/carts/f23f5cfa-7fde-5706-aefb-ac6c6bbadeab/shared-carts*

where **f23f5cfa-7fde-5706-aefb-ac6c6bbadeab** is the ID of the cart you want to share.

{% info_block warningBox "Authentication" %}
To use this endpoint, customers need to authenticate first.  For details, see [Authentication and Authorization](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/authentication-
{% endinfo_block %}{target="_blank"}.)

**Attributes:**

| Attribute | Type | Required | Description |
| --- | --- | --- | --- |
| idCompanyUser | String | v | Specifies the name of the company user you want to share the cart with.</br>The user must belong to the same company as the cart owner. |
| idCartPermissionGroup | Integer | v | Specifies the ID of the **Cart Permission Group** that provides the desired permissions. |

{% info_block warningBox "Note" %}
You can also use the **Accept-Language** header to specify the locale.</br>Sample header: `[{"key":"Accept-Language","value":"de, en;q=0.9"}]` where **de** and **en** are the locales; **q=0.9** is the user's preference for a specific locale. For details, see [14.4 Accept-Language](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4
{% endinfo_block %}{target="_blank"}.)

**Sample Request Body:**
    
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

### Response
If a request was successful and a cart was shared, the endpoint responds with a **RestSharedCartsResponse** containing information on the shared cart.

**Response Attributes:**

| Attribute* | Type | Description |
| --- | --- | --- |
| id | String | Specifies a unique identifier that can be used to manage the sharing of the cart in the future. |
| idCompanyUser | String | Specifies the name of the company user the cart is shared with. |
| idCartPermissionGroup | Integer | Specifies the ID of the Cart Permission Group that describes the permissions granted to the user. |

*The attributes mentioned are all attributes in the response. Type is not mentioned.

**Sample Response**
    
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
            "self": "http://glue.mysprykershop.com/shared-carts/4c677a6b-2f65-5645-9bf8-0ef3532bbbccaa"
        }
    }
}
```

### Possible Errors

| Status | Reason |
| --- | --- |
| 401 | The access token is invalid. |
| 403 | The access token is missing. |
| 404 | Cart not found. |
| 422 | Failed to share a cart. |

## Changing Permissions
To change permissions for a shared cart, send a PATCH request to the following endpoint:

[/shared-carts/{% raw %}{{{% endraw %}shared-cart-uuid{% raw %}}}{% endraw %}](https://documentation.spryker.com/v4/docs/rest-api-reference#/shared-carts){target="_blank"}

### Request

Sample request: *PATCH http://glue.mysprykershop.com/shared-carts/4c677a6b-2f65-5645-9bf8-0ef3532bbbccaa*

where **4c677a6b-2f65-5645-9bf8-0ef3532bbbccaa** is the ID of the shared cart object.

{% info_block warningBox "Authentication" %}
To use this endpoint, customers need to authenticate first.  For details, see [Authentication and Authorization](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/authentication-
{% endinfo_block %}{target="_blank"}.)

**Attributes:**

| Attribute | Type | Required | Description |
| --- | --- | --- | --- |
| idCartPermissionGroup | Integer | v | Specifies the ID of the Cart Permission Group that provides the desired permissions. |

{% info_block warningBox "Note" %}
You can also use the **Accept-Language** header to specify the locale.</br>Sample header: `[{"key":"Accept-Language","value":"de, en;q=0.9"}]` where **de** and **en** are the locales; **q=0.9** is the user's preference for a specific locale. For details, see [14.4 Accept-Language](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4
{% endinfo_block %}{target="_blank"}.)

**Sample Request Body:**
    
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

### Response
If a request was successful and permissions for the shared cart were changed, the endpoint responds with a **RestSharedCartsResponse** containing updated information on the shared cart.

**Response Attributes:**

| Attribute* | Type | Description |
| --- | --- | --- |
| idCompanyUser | String | Specifies the name of the company user the cart is shared with. |
| idCartPermissionGroup | Integer | Specifies the ID of the Cart Permission Group that describes the permissions granted to the user. |

**Sample Response**
    
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

### Possible Errors

| Status | Reason |
| --- | --- |
| 401 | The access token is invalid. |
| 403 | The access token is missing. |
| 404 | Cart not found. |

## Unsharing Carts
To stop sharing a cart, send a DELETE request to the following endpoint:

[/shared-carts/{% raw %}{{{% endraw %}shared-cart-uuid{% raw %}}}{% endraw %}](https://documentation.spryker.com/v4/docs/rest-api-reference#/shared-carts){target="_blank"}

### Request
Sample request: *DELETE http://glue.mysprykershop.com/shared-carts/4c677a6b-2f65-5645-9bf8-0ef3532bbbccaa*

where **4c677a6b-2f65-5645-9bf8-0ef3532bbbccaa** is the ID of the shared cart object.

{% info_block warningBox "Authentication" %}
To use this endpoint, customers need to authenticate first.  For details, see [Authentication and Authorization](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/authentication-
{% endinfo_block %}{target="_blank"}.)

### Response
If a request was successful and a cart was shared, the endpoint responds with a **204 No Content** status code.

### Possible Errors

| Status | Reason |
| --- | --- |
| 401 | The access token is invalid. |
| 403 | The access token is missing. |
| 404 | Cart not found. |
