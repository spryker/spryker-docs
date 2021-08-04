---
title: Managing Carts of Registered Users
originalLink: https://documentation.spryker.com/v4/docs/managing-carts-of-registered-users-201907
redirect_from:
  - /v4/docs/managing-carts-of-registered-users-201907
  - /v4/docs/en/managing-carts-of-registered-users-201907
---

The **Carts API** provides access to management of customers' shopping carts. Carts come in two different forms: carts for registered customers and carts for guests. In your development, the resources provided by the API can support you in the development of shopping cart functionality.

{% info_block infoBox "Info" %}
The following document covers the APIs for carts for **registered customers** only. If you want to know how to access carts of unregistered users, see [Managing Guest Carts](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/managing-carts/managing-guest-
{% endinfo_block %}.)

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see [Carts API](/docs/scos/dev/migration-and-integration/202001.0/feature-integration-guides/glue-api/cart-feature-in){target="_blank"}.

## Guest Carts and Carts of Registered Users
Access to carts for registered users is provided by the **/carts** resource. Before accessing the resource, you need to authenticate a user first. For more details, see [Authentication and Authorization](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/authentication-){target="_blank"}.

Unlike guest carts, carts of registered users have an unlimited lifetime. Also, if the multiple carts feature is [integrated into your project](https://documentation.spryker.com/v4/docs/multiple-carts-feature-integration-201903){target="_blank"} and Glue is [enabled for multi-cart operations](https://documentation.spryker.com/v4/docs/multiple-carts-feature-integration-201903){target="_blank"}, registered users can have as many carts as they want. In the B2B scenario, this allows for creating different carts for different purposes. For instance, registered users can have a cart for daily purchases and one more for purchases made once a month.

## Owned and Shared Carts
Registered users can [share carts](/docs/scos/dev/features/202001.0/shopping-cart/shared-cart/shared-cart) they own. Thus, a registered user can access both their personal carts and carts shared with them by other users. This feature allows company users to collaborate on company purchases as a team.
To be able to share carts, as well as access carts shared with them, customers need to authenticate as **Company User Accounts**. Each such account is a member of a certain Business Unit, and carts can be shared only among members of the same Unit. On the other hand, customers have the ability to impersonate as different Company Accounts depending on the job tasks they want to perform. Such accounts can belong to different Business Units, which means that any specific customer can have access to a different set of shared carts depending on the Company Account they impersonate as.

To use a Company Account, a customer needs to retrieve a bearer token for the account. The token is valid for a specific combination of an authenticated user and Company Account. It provides access to:
* the carts owned by the user;
* the carts shared with the Company Account.

{% info_block infoBox "Info" %}
For details on how to receive the token, see [Logging In as Company User](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/b2b-account-management/logging-in-as-c
{% endinfo_block %}{target="_blank"}.)

To be able to access shared carts, the API client needs to access the endpoints provided by the Carts API using the token received when impersonating as the Company Account. Doing so provides access to management of both the user's own carts and the carts shared with the current Company Account based on the bearer token presented.

Shared carts can be accessed and manipulated the same as regular carts. The only difference is that the list of actions that a user can perform on a shared cart depends on the permissions granted to them.

By default, there are 2 levels of permissions for shared carts: **read-only** and **full access**. If a user attempts to perform an unauthorized action on a shared cart, the API will respond with the **403 Forbidden** status code.

{% info_block infoBox "Info" %}
For more details, see section *Retrieving Cart Permission Groups* in [Sharing Company User Carts](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/managing-carts/sharing-company
{% endinfo_block %}{target="_blank"}.)

To distinguish whether a specific cart is owned by a user directly or shared with them, you need to extend the responses of the endpoints with the **cart-permission-groups** resource relationship. For example, if you want to get all carts available to a company user and distinguish which of them are shared, send the following request: *GET http://glue.mysprykershop.com/carts?**include=cart-permission-groups***. If a cart is shared with the user, it will contain the relationship, while if a cart is owned by the user directly, the relationship will not be present.

{% info_block infoBox "Info" %}
For details on using the endpoint, see section *Retrieving Carts*.
{% endinfo_block %}

The following example represents **2** carts available to a user, where:
* **My Cart** is owned by the user;
* **Shared Cart** is shared.

**Code sample:**
    
```json
{
    "data": [
        {
            "type": "carts",
            "id": "f23f5cfa-7fde-5706-aefb-ac6c6bbadeab",
            "attributes": {...},
            "links": {...},
            "relationships": []
        },
        {
            "type": "carts",
            "id": "1ce91011-8d60-59ef-9fe0-4493ef3628b2",
            "attributes": {...},
            "relationships": {
                "cart-permission-groups": {
                    "data": [
                        {
                            "type": "cart-permission-groups",
                            "id": "1"
                        }
                    ]
                }
            }
        }
    ],
    "links": {...},
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
        }
    ]
}
```

{% info_block infoBox "Info" %}
For more details, see section *Retrieving Cart Permission Groups* in [Sharing Company User Carts](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/managing-carts/sharing-company
{% endinfo_block %}{target="_blank"}.)

## Creating Carts
To create a cart for a registered user, send a *POST* request to the following endpoint:
[/carts](https://documentation.spryker.com/v4/docs/rest-api-reference#/carts)

### Request
Sample request: *POST http://glue.mysprykershop.com/carts*

{% info_block warningBox "Note" %}
Carts created via Glue API are always set as the default carts for the user.
{% endinfo_block %}

**Attributes:**

| Attribute | Type | Required | Description |
| --- | --- | --- | --- |
| name | String | v | Sets the cart name.</br>This field can be set only if you are using the multiple carts feature. If you are operating in a single-cart environment, an attempt to set the value will result in an error with the **422 Unprocessable Entry** status code. |
| priceMode | Enum | v | Sets the price mode to be used for the cart. Possible values:<ul><li>GROSS_MODE - prices after tax;</li><li>NET_MODE - prices before tax.</li></ul>For details, see [Net &amp; Gross Prices](/docs/scos/dev/features/202001.0/price/net-gross-price){target="_blank"}. |
| currency | String | v | Sets the cart currency. |
| store | String | v | Sets the name of the store where to create the cart. |

{% info_block warningBox "Authentication" %}
To use this endpoint, customers need to authenticate first. For details, see [Authentication and Authorization](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/authentication-
{% endinfo_block %}{target="_blank"}.)

**Sample Request Body:**
    
```json
{
   "data":{
      "type":"carts",
      "attributes":{
         "name":"My Cart",
         "priceMode":"GROSS_MODE",
         "currency":"EUR",
         "store":"DE"
      }
   }
}
```

{% info_block warningBox "Note" %}
You can also use the **Accept-Language** header to specify the locale.Sample header: `[{"key":"Accept-Language","value":"de, en;q=0.9"}]` where **de** and **en** are the locales; **q=0.9** is the user's preference for a specific locale. For details, see [14.4 Accept-Language](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4
{% endinfo_block %}{target="_blank"}.)

### Response
If a request was successful and a cart was created, the endpoint responds with a **RestCartsResponse** containing information about the new cart.

{% info_block warningBox "Note" %}
The response contains a unique identifier returned in the id attribute and a self link that can be used to access the cart in the future.
{% endinfo_block %}

**Response Attributes**
General Cart Information

| Field* | Type | Description |
| --- | --- | --- |
| name | String | Specifies a cart name.</br>The field is available in multi-cart environments only. |
| isDefault | Boolean | Specifies whether the cart is the default one for the customer.</br>The field is available in multi-cart environments only.  |
| priceMode | String | Price mode that was active when the cart was created. |
| currency | String | Currency that was selected whenthe cart was created. |
| store | String | Store for which the cart was created. |

Discount Information
| Field* | Type | Description |
| --- | --- | --- |
| displayName | String | Discount name. |
| amount | Integer | Discount amount applied to the cart.  |
| code | String | Discount code applied to the cart. |

Totals
| Field* | Type | Description |
| --- | --- | --- |
| expenseTotal | String | Total amount of expenses (including e.g. shipping costs). |
| discountTotal | Integer | Total amount of discounts applied to the cart.  |
| taxTotal | String | Total amount of taxes to be paid. |
| subTotal | Integer | Subtotal of the cart.  |
| grandTotal | Integer | Grand total of the cart.  |

*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

**Sample Response**
    
```json
{
    "data": [
        {
            "type": "carts",
            "id": "f23f5cfa-7fde-5706-aefb-ac6c6bbadeab",
            "attributes": {
                "priceMode": "GROSS_MODE",
                "currency": "EUR",
                "store": "DE",
                "discounts": [],
                "totals": {
                    "expenseTotal": null,
                    "discountTotal": null,
                    "taxTotal": null,
                    "subtotal": null,
                    "grandTotal": null
                },
                "name": "My Cart",
                "isDefault": true
            },
            "links": {
                "self": "http://glue.mysprykershop.com/carts/f23f5cfa-7fde-5706-aefb-ac6c6bbadeab"
            }
        }
    ]
}
```

### Possible Errors

| Status | Reason |
| --- | --- |
| 422 | Failed to create a cart.</br>In a single cart environment, this error can occur when attempting to create a cart for a customer who already has a cart.|
| 401 | The access token is invalid. |
| 403 | The access token is missing. |

## Retrieving Carts
### Request
To access all available carts, send a GET request to the following endpoint:

[/carts](https://documentation.spryker.com/v4/docs/rest-api-reference#/carts){target="_blank"}

Sample request: *GET http://glue.mysprykershop.com/carts*

To get a specific cart by ID, use the following endpoint:

[/carts/{% raw %}{{{% endraw %}cartId{% raw %}}}{% endraw %}](https://documentation.spryker.com/v4/docs/rest-api-reference#/carts){target="_blank"}

Sample request: *GET http://glue.mysprykershop.com/carts/4741fc84-2b9b-59da-bb8d-f4afab5be054*

where **4741fc84-2b9b-59da-bb8d-f4afab5be054** is the ID of the cart you need.

{% info_block warningBox "Authentication" %}
To use this endpoint, customers need to authenticate first. For details, see [Authentication and Authorization](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/authentication-
{% endinfo_block %}.)

{% info_block warningBox "Note" %}
You can also use the **Accept-Language** header to specify the locale.Sample header: `[{"key":"Accept-Language","value":"de, en;q=0.9"}]` where **de** and **en** are the locales; **q=0.9** is the user's preference for a specific locale. For details, see [14.4 Accept-Language](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4
{% endinfo_block %}{target="_blank"}.)

### Response
No matter which of the 2 endpoints you use, the response will consist of a single or multiple **RestCartsResponse** objects containing the requested cart(s).

**Response Attributes**
General Cart Information
| Field* | Type | Description |
| --- | --- | --- |
| name | String | Specifies a cart name.</br>The field is available in multi-cart environments only. |
| isDefault | Boolean | Specifies whether the cart is the default one for the customer.</br>The field is available in multi-cart environments only.  |
| priceMode | String | Price mode that was active when the cart was created. |
| currency | String | Currency that was selected whenthe cart was created. |
| store | String | Store for which the cart was created. |

Discount Information
| Field* | Type | Description |
| --- | --- | --- |
| displayName | String | Discount name. |
| amount | Integer | Discount amount applied to the cart.  |
| code | String | Discount code applied to the cart. |

Totals
| Field* | Type | Description |
| --- | --- | --- |
| expenseTotal | String | Total amount of expenses (including e.g. shipping costs). |
| discountTotal | Integer | Total amount of discounts applied to the cart.  |
| taxTotal | String | Total amount of taxes to be paid. |
| subTotal | Integer | Subtotal of the cart.  |
| grandTotal | Integer | Grand total of the cart.  |

*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

**Sample Response - 1 Cart**
    
```json
{
    "data": [
        {
            "type": "carts",
            "id": "f8cfd611-4611-57d7-bc70-f81cee96a6af",
            "attributes": {
                "priceMode": "GROSS_MODE",
                "currency": "EUR",
                "store": "DE",
                "discounts": {},
                "totals": {
                    "expenseTotal": null,
                    "discountTotal": null,
                    "taxTotal": null,
                    "subtotal": null,
                    "grandTotal": null
                }
            },
            "links": {
                "self": "http://glue.mysprykershop.com/carts/f8cfd611-4611-57d7-bc70-f81cee96a6af"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/carts"
    }
}
```

**Sample Response - No Carts**
    
```json
{
    "data": [],
    "links": {
        "self": "http://glue.mysprykershop.com/carts"
    }
}
```

To find out which products are placed in the cart, you can extend the response of the endpoint with the items and concrete-products resource relationships. The first relationship provides information on the items placed in the cart and their quantity, and the second one provides detailed information on the products.

Apart from that, you can identify permissions granted to users for each cart shared with them. To do so, extend the response with the cart-permission-groups resource relationship. 

Sample request: *GET http://glue.mysprykershop.com/carts?include=items,concrete-products,cart-permission-groups*

The response will include the following additional attributes:

| Resource | Type of Information | Attribute* | Type | Description |
| --- | --- | --- | --- | --- |
| items | Cart item information | sku | String | Product SKU. |
| items | Cart item information | quantity | Integer | Quantity of the given product in the cart. |
| items | Cart item information | groupKey | String | Unique item identifier. The value is generated based on product properties. |
| items | Cart item information | amount | Integer | Amount to be paid for all items of the product in the cart. |
| items | Cart item calculation | unitPrice | Integer | Single item price without assuming if it is net or gross. This value should be used everywhere the price is displayed. It allows switching tax mode without side effects. |
| items | Cart item calculation | sumPrice | Integer | Sum of all items prices calculated. |
| items | Cart item calculation | taxRate | Integer | Current tax rate in per cent. |
| items | Cart item calculation | unitNetPrice | Integer | Single item net price. |
| items | Cart item calculation | sumNetPrice | Integer | Sum of prices of all items. |
| items | Cart item calculation | unitGrossPrice | Integer | Single item gross price. |
| items | Cart item calculation | sumGrossPrice | Integer | Sum of items gross price. |
| items | Cart item calculation | unitTaxAmountFullAggregation | Integer | Total tax amount for a given item with additions. |
| items | Cart item calculation | sumTaxAmountFullAggregation | Integer | Total tax amount for a given sum of items with additions. |
| items | Cart item calculation | sumSubtotalAggregation | Integer | Sum of subtotals of the items. |
| items | Cart item calculation | unitSubtotalAggregation | Integer | Subtotal for the given item. |
| items | Cart item calculation | unitProductOptionPriceAggregation | Integer | Item total product option price. |
| items | Cart item calculation | sumProductOptionPriceAggregation | Integer | Item total of product options for the given sum of items. |
| items | Cart item calculation | unitDiscountAmountAggregation | Integer | Item total discount amount. |
| items | Cart item calculation | sumDiscountAmountAggregation | Integer | Sum of Item total discount amount. |
| items | Cart item calculation | unitDiscountAmountFullAggregation | Integer | Sum total discount amount with additions. |
| items | Cart item calculation | sumDiscountAmountFullAggregation | Integer | Item total discount amount with additions. |
| items | Cart item calculation | unitPriceToPayAggregation | Integer | Item total price to pay after discounts with additions. |
| concrete-products | Information on the product that the item represents | See [Retrieving Product Information](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/managing-products/retrieving-prod). |  |  |
| cart-permission-groups | Permissions granted to the user for shared carts. | name | String | Specifies the Permission Group name, for example, READ_ONLY or FULL_ACCESS. |
| cart-permission-groups | Permissions granted to the user for shared carts | isDefault | Boolean | Indicates whether the Permission Group is applied to shared carts by default. |

*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

**Sample Response**
    
```json
{
    "data": [
        {
            "type": "carts",
            "id": "f23f5cfa-7fde-5706-aefb-ac6c6bbadeab",
            "attributes": {
                "priceMode": "GROSS_MODE",
                "currency": "EUR",
                "store": "DE",
                "discounts": [
                    {
                        "displayName": "10% Discount for all orders above",
                        "amount": 3327,
                        "code": null
                    }
                ],
                "totals": {
                    "expenseTotal": 0,
                    "discountTotal": 3327,
                    "taxTotal": 4780,
                    "subtotal": 33265,
                    "grandTotal": 29938
                },
                "name": "My Cart",
                "isDefault": true
            },
            "links": {
                "self": "http://glue.mysprykershop.com/carts/f23f5cfa-7fde-5706-aefb-ac6c6bbadeab?include=items"
            },
            "relationships": {
                "items": {
                    "data": [
                        {
                            "type": "items",
                            "id": "136_24425591"
                        }
                    ]
                }
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/carts?include=items"
    },
    "included": [
        {
            "type": "items",
            "id": "136_24425591",
            "attributes": {
                "sku": "136_24425591",
                "quantity": 1,
                "groupKey": "136_24425591",
                "abstractSku": "136",
                "amount": null,
                "calculations": {
                    "unitPrice": 33265,
                    "sumPrice": 33265,
                    "taxRate": 19,
                    "unitNetPrice": 0,
                    "sumNetPrice": 0,
                    "unitGrossPrice": 33265,
                    "sumGrossPrice": 33265,
                    "unitTaxAmountFullAggregation": 4780,
                    "sumTaxAmountFullAggregation": 4780,
                    "sumSubtotalAggregation": 33265,
                    "unitSubtotalAggregation": 33265,
                    "unitProductOptionPriceAggregation": 0,
                    "sumProductOptionPriceAggregation": 0,
                    "unitDiscountAmountAggregation": 3327,
                    "sumDiscountAmountAggregation": 3327,
                    "unitDiscountAmountFullAggregation": 3327,
                    "sumDiscountAmountFullAggregation": 3327,
                    "unitPriceToPayAggregation": 29938,
                    "sumPriceToPayAggregation": 29938
                },
                "quoteUuid": null,
                "customerReference": null,
                "customer": null
            },
            "links": {
                "self": "http://glue.mysprykershop.com/carts/f23f5cfa-7fde-5706-aefb-ac6c6bbadeab/items/136_24425591"
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

## Adding Items
To add items to a cart, send a POST request to the following endpoint:

[/carts/{% raw %}{{{% endraw %}cartId{% raw %}}}{% endraw %}/items](https://documentation.spryker.com/v4/docs/rest-api-reference#/carts)

### Request

Sample request: *POST http://glue.mysprykershop.com/carts/4741fc84-2b9b-59da-bb8d-f4afab5be054/items*

where **4741fc84-2b9b-59da-bb8d-f4afab5be054** is the ID of the cart you need.

{% info_block warningBox "Authentication" %}
To use this endpoint, customers need to authenticate first. For details, see [Authentication and Authorization](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/authentication-
{% endinfo_block %}.)

{% info_block warningBox "Note" %}
You can also use the **Accept-Language** header to specify the locale.Sample header: `[{"key":"Accept-Language","value":"de, en;q=0.9"}]` where **de** and **en** are the locales; **q=0.9** is the user's preference for a specific locale. For details, see [14.4 Accept-Language](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.4
{% endinfo_block %}{target="_blank"}.)

**Attributes:**

| Attribute | Type | Required | Description |
| --- | --- | --- | --- |
| sku | String | v | Specifies the SKU part number of the item to add to the cart. |
| quantity | String | v | Specifies the quantity of items to add. |

{% info_block warningBox "Note" %}
You can add concrete products only.
{% endinfo_block %}

**Sample Request Body:**
    
```json
{
    "data": {
        "type": "items",
        "attributes": {
            "sku": "209_12554247",
            "quantity": 10
        }
    }
}
```

### Response
In case of a successful update, the endpoint will respond with a RestCartsResponse containing the new items. For details of the response, see section *Response* in **Retrieving Carts**.

### Possible Errors

| Status | Reason |
| --- | --- |
| 400 | Cart ID is missing. |
| 401 | The access token is invalid. |
| 403 | The access token is missing or the user is not allowed to perform the operation. |
| 404 | A cart with the specified ID was not found. |
| 422 |Failed to add an item. |

## Removing Items
To remove an item from a cart, send a DELETE request to the following endpoint:

[/carts/{% raw %}{{{% endraw %}cartId{% raw %}}}{% endraw %}/items/{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}](https://documentation.spryker.com/v4/docs/rest-api-reference#/carts)

### Request

Sample request: *DELETE http://mysprykershop.com/carts/4741fc84-2b9b-59da-bb8d-f4afab5be054/items/177_25913296*

where **4741fc84-2b9b-59da-bb8d-f4afab5be054** is the ID of the cart you need and 177_25913296 is the SKU of the concrete product you want to remove.

{% info_block warningBox "Authentication" %}
To use this endpoint, customers need to authenticate first. For details, see [Authentication and Authorization](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/authentication-
{% endinfo_block %}{target="_blank"}.)

### Response
If the item was deleted successfully, the endpoint will respond with a **204 No Content** status code.

### Possible Errors
| Status | Reason |
| --- | --- |
| 400 | Cart ID and/or item ID is missing. |
| 401 | The access token is invalid. |
| 403 | The access token is missing or the user is not allowed to perform the operation. |
| 404 | A cart with the specified ID was not found. |
| 422 |Failed to add an item. |

## Changing Item Quantity
To change the quantity of certain items in a cart, use the following endpoint with the PATCH method:

[/carts/{% raw %}{{{% endraw %}cartId{% raw %}}}{% endraw %}/items/{% raw %}{{{% endraw %}concrete_product_sku{% raw %}}}{% endraw %}](https://documentation.spryker.com/v4/docs/rest-api-reference#/carts){target="_blank"}

### Request

Sample request: *PATCH http://mysprykershop.com/carts/4741fc84-2b9b-59da-bb8d-f4afab5be054/items/177_25913296*

where **4741fc84-2b9b-59da-bb8d-f4afab5be054** is the ID of the cart you need and **177_25913296** is the SKU of the concrete product for which to change the quantity.

{% info_block warningBox "Authentication" %}
To use this endpoint, customers need to authenticate first. For details, see [Authentication and Authorization](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/authentication-
{% endinfo_block %}{target="_blank"}.)

**Attributes:**

| Attribute | Type | Required | Description |
| --- | --- | --- | --- |
| quantity | String | v | Specifies the new quantity of the items. |

**Specifies the new quantity of the items.**
 
```json
{
    "data": {
        "type": "items",
        "attributes": {
            "quantity": 10
        }
    }
}
```

### Response
In case of a successful update, the endpoint will respond with a **RestCartsResponse** with updated quantity. For details of the response, see section *Response* in **Retrieving Carts**.

### Possible Errors
| Status | Reason |
| --- | --- |
| 400 | Cart ID is missing. |
| 401 | The access token is invalid. |
| 403 | The access token is missing or the user is not allowed to perform the operation. |
| 404 | A cart with the specified ID was not found. |
| 422 |Failed to add an item. |

## Deleting Registered User's Cart
To delete a cart of a registered user, send a DELETE request to the following endpoint::

[/carts/{% raw %}{{{% endraw %}cartId{% raw %}}}{% endraw %}](https://documentation.spryker.com/v4/docs/rest-api-reference#/carts){target="_blank"}

{% info_block errorBox %}
You cannot delete a cart if it is the customer's only cart. If you attempt to delete a customer's last cart, the endpoint responds with the **422 Unprocessable Entry** status code.If you delete the default cart of a customer, another cart will be assigned as default automatically.
{% endinfo_block %}

### Request
Sample request: *DELETE http://glue.mysprykershop.com/carts/4741fc84-2b9b-59da-bb8d-f4afab5be054*

where **4741fc84-2b9b-59da-bb8d-f4afab5be054** is the ID of the cart you want to delete.

{% info_block warningBox "Authentication" %}
To use this endpoint, customers need to authenticate first. For details, see [Authentication and Authorization](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/authentication-
{% endinfo_block %}{target="_blank"}.)

### Response
If the cart was deleted successfully, the endpoint will respond with a **204 No Content** status code.

### Possible Errors
| Status | Reason |
| --- | --- |
| 400 | Cart ID is missing. |
| 401 | The access token is invalid. |
| 403 | The access token is missing or the user is not allowed to perform the operation. |
| 404 | A cart with the specified ID was not found. |
| 422 |Failed to add an item. |
