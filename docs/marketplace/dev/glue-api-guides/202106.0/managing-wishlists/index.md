The Marketplace Wishlists API allows creating list and deleting [wishlists](https://documentation.spryker.com/docs/wishlist)  in the Marketplace, as well as managing the items inside them.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see:

- Marketplace Wishlist API feature integration

## Create a wishlist

To create a wishlist, send the request:

------

`POST` **/wishlists**

------

### Request

| HEADER KEY    | HEADER VALUE | REQUIRED? | DESCRIPTION                                                  |
| :------------ | :----------- | :-------- | :----------------------------------------------------------- |
| Authorization | string       | ✓         | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](https://documentation.spryker.com/authenticating-as-a-customer). |

Sample request: `POST https://glue.mysprykershop.com/wishlists`

```json
{
    "data": {
        "type": "wishlists",
        "attributes": {
            "name": "My_favourite_wishlist"
        }
    }
}
```

| ATTRIBUTE | TYPE   | REQUIRED | DESCRIPTION                     |
| :-------- | :----- | :------- | :------------------------------ |
| name      | string | ✓        | Name of the wishlist to create. |

### Response

Response sample

```json
{
    "data": {
        "type": "wishlists",
        "id": "57c96d55-8a37-5998-927f-7bb663b69094",
        "attributes": {
            "name": "My_favourite_wishlist",
            "numberOfItems": 0,
            "createdAt": "2021-07-13 14:50:08.755124",
            "updatedAt": "2021-07-13 14:50:08.755124"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/wishlists/57c96d55-8a37-5998-927f-7bb663b69094"
        }
    }
}
```

| ATTRIBUTE     | TYPE    | DESCRIPTION                      |
| :------------ | :------ | :------------------------------- |
| name          | String  | Name of the wishlist.            |
| numberOfItems | Integer | Number of items in the wishlist. |
| createdAt     | String  | Creation date of the wishlist.   |
| updatedAt     | String  | Date of the last update.         |

## Retrieve wishlists

To retrieve all wishlists of a customer, send the request:

------

`GET` **/wishlists**

------

### Request

| QUERY PARAMETER | DESCRIPTION                                 | POSSIBLE VALUES                                              |
| :-------------- | :------------------------------------------ | :----------------------------------------------------------- |
| include         | Adds resource relationships to the request. | wishlist-items</br>concrete-products</br>product-labels</br> |

| REQUEST SAMPLE                                               | USAGE                                                        |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| GET https://glue.mysprykershop.com/wishlists                 | Retrieve all the wishlists of a customer.                    |
| GET https://glue.mysprykershop.com/wishlists?include=wishlist-items | Retrieve all the wishlists of a customer with wishlist items. |
| GET https://glue.mysprykershop.com/wishlists?include=wishlist-items,concrete-products | Retrieve all the wishlists of a customer with wishlist items and respective concrete products. |
| GET https://glue.mysprykershop.com/wishlists?include=wishlist-items,concrete-products,product-labels | Retrieve all the wishlists of a customer with wishlist items, respective concrete products, and their product labels. |
| GET https://glue.mysprykershop.com/wishlists?include=wishlist-items,concrete-products,concrete-product-availabilities |                                                              |
|                                                              |                                                              |
|                                                              |                                                              |
|                                                              |                                                              |
|                                                              |                                                              |

| HEADER KEY    | HEADER VALUE | REQUIRED? | DESCRIPTION                                                  |
| :------------ | :----------- | :-------- | :----------------------------------------------------------- |
| Authorization | string       | ✓         | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](https://documentation.spryker.com/authenticating-as-a-customer). |

### 