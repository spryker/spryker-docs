---
title: Managing Wishlists
originalLink: https://documentation.spryker.com/v3/docs/managing-wishlists
redirect_from:
  - /v3/docs/managing-wishlists
  - /v3/docs/en/managing-wishlists
---

The Wishlists API provides REST access to managing [wishlists](/docs/scos/dev/features/202001.0/wishlist/wishlist) of a customer. With the help of the endpoints provided by the API, you can create, list and delete wishlists, as well as manage the items inside them.

In your development, these resources can help you to enable complete wishlist functionality for your customers.

{% info_block warningBox "Authentication " %}
Since wishlists are available for registered users only, the endpoints provided by the API cannot be accessed anonymously. For this reason, you always need to pass a user's authentication token in your REST requests. For details on how to authenticate a user and retrieve the token, see [Authentication and Authorization](/docs/scos/dev/glue-api/202001.0/glue-api-storefront-guides/authentication-
{% endinfo_block %}.)

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see [Wishlist API Feature Integration](/docs/scos/dev/migration-and-integration/201903.0/feature-integration-guides/glue-api/wishlist-api-fe).

## Creating a Wishlist
To create a wishlist for a registered user, you need to send a POST request to the following endpoint:
`/wishlists`
Sample request: `POST http://mysprykershop.com/wishlists`
**Attributes:**
* **name** - sets a name for the new wishlist.

**Sample request body**
```js
{
		"data":{
			"type": "wishlists",
			"attributes":{
				"name":"{% raw %}{{{% endraw %}my_name{% raw %}}}{% endraw %}"
			}
		}
	}
```

**Sample Response:**
| Field* | Type | Description |
| --- | --- | --- |
| name | String | Name of the wishlist |
| numberOfItems | Integer | Number of items in the wishlist |
| createdAt | String | Creation date of the wishlist |
| updatedAt | String | Date of the last update |

\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

**Sample response**
```js
{
		"data": {
			"type": "wishlists",
			"id": "09264b7f-1894-58ed-81f4-d52d683e910a",
			"attributes": {
				"name": "Name of the wishlist",
				"numberOfItems": 0,
				"createdAt": "2018-08-17 10:04:35.311557",
				"updatedAt": "2018-08-17 10:04:35.311557"
			},
			"links": {
				"self": "http://mysprykershop.com/wishlists/09264b7f-1894-58ed-81f4-d52d683e910a"
			}
		}
	}
```

The response contains a unique identifier, contained in the id attribute, and a self link that can be used to access the wishlist later.

### Possible errors
| Code | Reason |
| --- | --- |
| 202 | A wishlist with the same name already exists. |
| 203 | Cannot create a wishlist. |

## Accessing Wishlists of User
To access all wishlists of a user, send a GET request to the following endpoint:
`/wishlists`
Sample request: `GET http://mysprykershop.com/wishlists`
**Sample Response:**
| Field* | Type | Description |
| --- | --- | --- |
| name | String | Name of the wishlist. |
| numberOfItems | Integer | Number of items in the wishlist. |
| createdAt | String | Date of the creation of the wishlist. |
| updatedAt | String | Date of the last update. |

\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

The endpoint will respond with a **RestWishlistsResponse**. The following response is returned when a user doesn't have any wishlists:

**Sample response**
```js
{
		"data": [],
		"links": {
			"self": "http://mysprykershop.com/wishlists"
		}
	}
```
If there are any wishlists already created for a user, they will be returned in the **data** attribute of the response.
**Sample response**
```js
{
		"data": {
  
 
	{
		"data": [
			{
				"type": "wishlists",
				"id": "1623f465-e4f6-5e45-8dc5-987b923f8af4",
				"attributes": {
					"name": "My Wishlist Name",
					"numberOfItems": 0,
					"createdAt": "2018-12-16 17:24:12.601033",
					"updatedAt": "2018-12-16 17:24:12.601033"
				},
				"links": {
					"self": "http://mysprykershop.com/wishlists/1623f465-e4f6-5e45-8dc5-987b923f8af4"
				}
			}
		],
		"links": {
			"self": "http://mysprykershop.com/wishlists"
		}
	}
```

## Modifying Wishlists
To modify a user's wishlist, send a PATCH request to the following endpoint:
`/wishlists`
Sample request: `PATCH http://mysprykershop.com/wishlists`

**Sample Request Body**
The following sample changes the name of a wishlist.

**Sample response**
```js
{
		"data": {
			"type": "wishlists",
			"id": "uuid",
			"attributes": {
				"name": "New Name"
			}
		}
	}
```

**Sample Response:**
| Field* | Type | Description |
| --- | --- | --- |
| name | String | Name of the wishlist |
| numberOfItems | Integer | Number of items in the wishlist |
| createdAt | String | Creation date of the wishlist |
| updatedAt | String | Date of the last update |

\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

In case of a successful update, the endpoint will also respond with a RestWishlistsResponse, where the wishlist name will be updated.

**Sample response**
### Possible errors

| Code | Reason |
| --- | --- |
| 201 | Cannot find the wishlist. |
| 202 | A wishlist with the same name already exists. |
| 204 | Cannot update the wishlist. |

## Deleting Wishlists
To delete a wishlist, send a DELETE request:
`/wishlists/{% raw %}{{{% endraw %}wishlist_id{% raw %}}}{% endraw %}`
Sample request: `DELETE http://mysprykershop.com/wishlists/09264b7f-1894-58ed-81f4-d52d683e910a`
where `09264b7f-1894-58ed-81f4-d52d683e910a` is the ID of the wishlist you want to remove.

**Response:**
If the wishlist was deleted successfully, the endpoint would respond with a **204 No Content** status code.

### Possible errors
| Code | Reason |
| --- | --- |
| 201 | Cannot find the wishlist. |
| 205 | Cannot remove the wishlist. |

## Getting Wishlists
The Wishlist API allows you not only to manage wishlists, but also to manage items inside them. Each wishlist item is referenced by the SKU of the respective product.
To get all items in a wishlist, send a request to the following endpoint:
`/wishlists/{% raw %}{{{% endraw %}wishlist_id{% raw %}}}{% endraw %}`
Sample request: `GET http://mysprykershop.com/wishlists/09264b7f-1894-58ed-81f4-d52d683e910a`
where `09264b7f-1894-58ed-81f4-d52d683e910a` is the ID of the wishlist you want to retrieve.

**Sample Response:**
| Field* | Type | Description |
| --- | --- | --- |
| name | String | Name of the wishlist |
| numberOfItems | Integer | Number of items in the wishlist |
| createdAt | String | Сreation date of the wishlist |
| updatedAt | String | Date of the last update |

\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

If the specified wishlist exists, the endpoint will respond with a RestWishlistsResponse that contains all information on the wishlist, including information on all products that have been put there.

**Sample response**

## Possible errors
| Code | Reason |
| --- | --- |
| 201 | Cannot find the wishlist. |

To add an item to a wishlist, send a POST request to the following endpoint:
`/wishlists/{% raw %}{{{% endraw %}wishlist_id{% raw %}}}{% endraw %}/wishlist-items`
Sample request: `POST http://mysprykershop.com/wishlists/09264b7f-1894-58ed-81f4-d52d683e910a/wishlist-items`
where `09264b7f-1894-58ed-81f4-d52d683e910a` is the ID of the wishlist to which you want to add an item.

**Attributes:**
* **sku** - specifies the SKU of the product you want to add to the wishlist.
**Sample request body**

**Sample Response:**
| Field* | Type | Description |
| --- | --- | --- |
| sku | String | Concrete product SKU. |

\*The fields mentioned are all attributes in the response. Type and ID are not mentioned.

The endpoint will respond with a **RestWishlistItemResponse** that contains information on the new wishlist item.

**Sample response**
```js
{
		"data": {
			"type": "wishlist-items",
			"id": "064_18404924",
			"attributes": {
				"sku": "064_18404924"
			},
			"links": {
				"self": "http://mysprykershop.com/wishlists/c917e65b-e8c3-5c8b-bec6-892529c64b30/wishlist-items/064_18404924"
			}
		}
	}
```

### Possible errors
| Code | Reason |
| --- | --- |
| 201 | Cannot find the wishlist. |
| 206 | Cannot add an item to the wishlist. |

To delete an item, send a DELETE request:
`/wishlists/{% raw %}{{{% endraw %}wishlist_id{% raw %}}}{% endraw %}/wishlist-items/{% raw %}{{{% endraw %}item_sku{% raw %}}}{% endraw %}`
Sample request: `DELETE http://mysprykershop.com/wishlists/09264b7f-1894-58ed-81f4-d52d683e910a/wishlist-items/064_18404924`
where: `09264b7f-1894-58ed-81f4-d52d683e910a` - the ID of the wishlist where you want to delete an item;
`064_18404924` - SKU of the item you want to remove.
**Response:**
If the item was removed successfully, the endpoint will respond with a **204 No Content** status code.

## Possible errors:
| Code | Reason |
| --- | --- |
| 201 | Cannot find the wishlist. |
| 207 | Cannot remove the item. |
| 208 | An item with the provided SKU does not exist in the wishlist. |
