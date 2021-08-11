---
title: Managing wishlist items
description: Add and delete items from wishlists via Glue API.
originalLink: https://documentation.spryker.com/v6/docs/managing-wishlist-items
redirect_from:
  - /v6/docs/managing-wishlist-items
  - /v6/docs/en/managing-wishlist-items
---

This endpoint allows to add and remove items from wishlists. 

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see [Wishlist API Feature Integration](https://documentation.spryker.com/docs/glue-api-wishlist-feature-integration).


## Add an item to a wishlist


To add an item to a wishlist, send the request:

---
`POST` **/wishlists/*{% raw %}{{{% endraw %}wishlist_id{% raw %}}}{% endraw %}*/wishlist-items**

---

| Path parameter | Description |
| --- | --- |
| ***{% raw %}{{{% endraw %}wishlist_id{% raw %}}}{% endraw %}*** | Unique identifier of the wishlist to add the items to. [Create a wishlist](https://documentation.spryker.com/docs/managing-wishlists#create-a-wishlist) or [retrieve all wishlists](https://documentation.spryker.com/v6/docs/managing-wishlists#retrieve-wishlists) to get it. |

### Request

Request sample: `POST https://glue.mysprykershop.com/wishlists/09264b7f-1894-58ed-81f4-d52d683e910a/wishlist-items`

```json
{
		"data": {
			"type": "wishlist-items",
			"attributes": {
				"sku": "064_18404924"
			}
		}
	}
```


| Attribute | Type | Description |
| --- | --- | --- |
| sku | String | SKU of a concrete product to add. |


### Response

```json
{
		"data": {
			"type": "wishlist-items",
			"id": "064_18404924",
			"attributes": {
				"sku": "064_18404924"
			},
			"links": {
				"self": "https://glue.mysprykershop.com/wishlists/c917e65b-e8c3-5c8b-bec6-892529c64b30/wishlist-items/064_18404924"
			}
		}
	}
```

<a name="wishlishlist-items-response-attributes"></a>
| Attribute | Type | Description |
| --- | --- | --- |
| sku | String | SKU of the concrete product in the wishlist. |



## Delete a wishlist item

To delete wishlist item, send the request:

---
`DELETE` **/wishlists/*{% raw %}{{{% endraw %}wishlist_id{% raw %}}}{% endraw %}*/wishlist-items/*{% raw %}{{{% endraw %}item_sku{% raw %}}}{% endraw %}***

---

| Path parameter | Description |
| --- | --- |
| ***{% raw %}{{{% endraw %}wishlist_id{% raw %}}}{% endraw %}*** | Unique identifier of the wishlist to delete an item from. [Create a wishlist](https://documentation.spryker.com/docs/managing-wishlists#create-a-wishlist) or [retrieve all wishlists](https://documentation.spryker.com/v6/docs/managing-wishlists#retrieve-wishlists) to get it. |
| ***{% raw %}{{{% endraw %}item_sku{% raw %}}}{% endraw %}*** | Unique identifier of the product to delete. |

### Request

Request sample: `DELETE https://glue.mysprykershop.com/wishlists/09264b7f-1894-58ed-81f4-d52d683e910a/wishlist-items/064_18404924`


### Response

If the item is removed successfully, the endpoint returns the `204 No Content` status code.


## Possible errors

| Code | Reason |
| --- | --- |
| 201 | Cannot find the wishlist. |
| 206 | Cannot add an item to the wishlist. |
| 207 | Cannot remove the item. |
| 208 | An item with the provided SKU does not exist in the wishlist. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](https://documentation.spryker.com/docs/reference-information-glueapplication-errors).
