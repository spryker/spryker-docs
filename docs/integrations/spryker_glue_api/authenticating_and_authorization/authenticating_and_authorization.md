---
title: Spryker API Authentication and Authorization
description: Learn how to authenticate and authorize requests in the Spryker Backend API using OAuth 2.0.
last_updated: July 9, 2025
layout: custom_new
---


Spryker's Glue API uses the **OAuth 2.0** framework for authentication to secure its resources. On a technical level, this is handled by the Login API. To gain access to a protected resource, a client application must first obtain an **access token**. This token, a JSON Web Token (JWT), identifies the user in subsequent API calls and must be included in the request header.

![auth-scheme.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Glue+API/Glue+API+Storefront+Guides/Authentication+and+Authorization/auth-scheme+%281%29.png)


### Access and Refresh Tokens

For security, access tokens have a limited lifespan. The default lifetime is **8 hours** (28,800 seconds). When an access token is issued, the response also includes a **refresh token**.

- **Access Token**: Used to authenticate requests to protected resources.
- **Refresh Token**: When an access token expires, the refresh token can be exchanged for a new access token and a new refresh token. The default lifetime for a refresh token is **1 month** (2,628,000 seconds).

It is recommended to revoke refresh tokens when they are no longer needed or if they become compromised. A revoked token is immediately marked as expired and cannot be used to obtain a new access token.


### Accessing Protected Resources

To make a request to a protected resource, you must pass the access token in the `Authorization` header.

**Example Request:**

```http
GET /carts HTTP/1.1
Host: mysprykershop.com:10001
Content-Type: application/json
Authorization: Bearer eyJ0...
Cache-Control: no-cache
```

If the token is valid, the API will process the request. If authorization fails, the API returns a `401 Unauthorized` error with a code explaining the reason for the failure.

**Example Error Response:**

```json
{
    "errors": [
        {
            "detail": "Invalid access token.",
            "status": 401,
            "code": "001"
        }
    ]
}
```


### User and Application Types

Authentication grants access based on user type, and different endpoints may require different user roles. In the Spryker ecosystem, there is a distinction between the Storefront and Backend APIs.

- **Storefront API**: Used to authenticate a **customer**.
- **Backend API**: Used to authenticate a **user** (e.g., a company user or agent).

By default, you can authenticate as a customer, a company user, or an agent assist.


### Default Protected Resources

Protected resources require authentication before access is granted. The following table lists the default protected resources. However, since Glue API is highly customizable, it's recommended to retrieve the specific list of protected resources for your shop.

| ACTION                                                                 | METHOD | ENDPOINTS                                                                    |
| ---------------------------------------------------------------------- | ------ | ---------------------------------------------------------------------------- |
| Customer: Retrieve a customer                                          | GET    | /customers/{customer_reference}                                              |
| Customers: Update customer address                                     | PATCH  | /customers/{customer_id}/addresses/{address_id}                              |
| Customers: Delete customer address                                     | DELETE | ​/customers​/{customer_id}​/addresses​/{addressId}                            |
| Customers: Retrieve list of all customer addresses                     | GET    | ​/customers​/{customer_id}​/addresses                                         |
| Customers: Create customer address                                     | POST   | /customers/{customer_id}/addresses                                           |
| Customers: Retrieve customer data                                      | GET    | /customers/{customerId}                                                      |
| Customers: Update customer data                                        | PATCH  | /customers/{customerId}                                                      |
| Customers: Anonymize customers                                         | DELETE | /customers/{customerId}                                                      |
| Customer password: Update customer password                            | PATCH  | /customer-password/{customerPasswordId}                                      |
| Cart codes: Add code to cart.                                          | GET    | /carts/{cartId}/cart-codes                                                   |
| Cart codes: Delete code from cart                                      | DELETE | /carts/{cartId}/cart-codes/{code}                                            |
| Carts: Retrieve cart by id                                             | GET    | /carts/{cartId}                                                              |
| Carts: Update a cart                                                   | PATCH  | /carts/{cartId}                                                              |
| Carts: Delete cart by id                                               | DELETE | /carts/{cartId}                                                              |
| Carts: Retrieve list of all customer's carts                           | GET    | /carts                                                                       |
| Carts: Create cart                                                     | POST   | /carts                                                                       |
| Items: Add item to cart                                                | POST   | /carts/{cartId}/items                                                        |
| Items: Update cart item quantity                                       | PATCH  | /carts/{cartId}/items/{itemId}                                               |
| Items: Remove item from cart                                           | DELETE | /carts/{cartId}/items/{itemId}                                               |
| Companies: Retrieve company by id                                      | GET    | /companies/{companyId}                                                       |
| Companies: Retrieve company collection                                 | GET    | /companies                                                                   |
| Company business unit addresses: Retrieve company business unit address by id | GET    | /company-business-unit-addresses/{companyBusinessUnitAddressId}              |
| Company business unit addresses: Retrieve company business unit addresses collection | GET    | /company-business-unit-addresses                                             |
| Company roles: Retrieve company role by id                             | GET    | /company-roles/{companyRoleId}                                               |
| Company roles: Retrieve company role collection                        | GET    | /company-roles                                                               |
| Company user access token: Create access token for company user        | POST   | /company-user-access-tokens                                                  |
| Company users: Retrieve company user by id                             | GET    | /company-users/{companyUserId}                                               |
| Company users: Retrieve list of company users                          | GET    | /company-users                                                               |
| Orders: Retrieve order by id                                           | GET    | /orders/{orderId}                                                            |
| Orders: Retrieve list of orders                                        | GET    | /orders                                                                      |
| Product reviews: Create product review                                 | POST   | /abstract-products/{abstractProductId}/product-reviews                       |
| Refresh tokens: Revoke customer's refresh token                        | DELETE | /refresh-tokens/{refreshTokenId}                                             |
| Returns: Retrieve return by id                                         | GET    | /returns/{returnld}                                                          |
| Returns: Retrieve list of returns                                      | GET    | /returns                                                                     |
| Returns: Create return                                                 | POST   | /returns                                                                     |
| Shared-carts: Share cart                                               | POST   | /carts/{cartld}/shared-carts                                                 |
| Shared-carts: Update permission group for shared cart                  | PATCH  | /shared-carts/{sharedCartId}                                                 |
| Shared-carts: Delete cart sharing                                      | DELETE | /shared-carts/{sharedCartId}                                                 |
| Shopping list items: Add shopping list item                            | POST   | /shopping-lists/{shoppingListId}/shopping-list-items                         |
| Shopping list items: Update shopping list item                         | PATCH  | /shopping-lists/{shoppingListId}/shopping-list-items                         |
| Shopping list items: Delete shopping list item                         | DELETE | /shopping-lists/{shoppingListId}/shopping-list-items                         |
| Shopping lists: Retrieve shopping list by id                           | GET    | /shopping-lists/{shoppingListId}                                             |
| Shopping lists: Update shopping list by id                             | PATCH  | /shopping-lists/{shoppingListId}                                             |
| Shopping lists: Delete shopping list by id                             | DELETE | /shopping-lists/{shoppingListId}                                             |
| Shopping lists: Retrieve list of all customer's shopping lists         | GET    | /shopping-lists                                                              |
| Shopping lists: Create shopping list                                   | POST   | /shopping-lists                                                              |
| Up-selling products: Retrieve list of all up-selling products for cart | GET    | /carts/{cartId}/up-selling-products                                          |
| Vouchers: Add a code to cart                                           | POST   | /carts/{cartId}/vouchers                                                     |
| Vouchers: Delete code from cart                                        | DELETE | /carts/{cartId}/vouchers/{voucherCode}                                       |
| Wishlist items: Add item to wishlist                                   | POST   | /wishlists/{wishlistId}/wishlist-items                                       |
| Wishlist items: Remove item from wishlist                              | DELETE | ​/wishlists​/{wishlistId}​/wishlist-items​/{wishlistItemId}                      |
| Wishlists: Retrieve wishlist data by id                                | GET    | /wishlists/{wishlistld}                                                      |
| Wishlists: Update customer wishlist                                    | PATCH  | /wishlists/{wishlistld}                                                      |
| Wishlists: Remove customer wishlist                                    | DELETE | /wishlists/{wishlistld}                                                      |
| Wishlists: Retrieve all customer wishlists                             | GET    | /wishlists                                                                   |
| Wishlists: Create wishlist                                             | POST   | /wishlists                                                                   |
