---
title: Glue API authentication and authorization
description: Information about Glue API authentication and authorization.
last_updated: Jun 22, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/authentication-and-authorization
originalArticleId: fb5a9256-1188-427e-a4d1-2c2d8c60a5e3
redirect_from:
  - /docs/scos/dev/glue-api-guides/202404.0/old-glue-infrastructure/glue-api-authentication-and-authorization.html
  - /docs/scos/dev/glue-api-guides/202005.0/authentication-and-authorization.html
  - /docs/scos/dev/glue-api-guides/202200.0/authentication-and-authorization.html
  - /docs/scos/dev/glue-api-guides/202204.0/authentication-and-authorization.html
  - /docs/pbc/all/identity-access-management/202404.0/glue-api-authentication-and-authorization.html
  - /docs/dg/dev/glue-api/202410.0/old-glue-infrastructure/glue-api-authentication-and-authorization
related:
  - title: Searching by company users
    link: docs/pbc/all/customer-relationship-management/page.version/base-shop/manage-using-glue-api/company-account/glue-api-search-by-company-users.html
  - title: Glue API - Customer Account Management feature integration
    link: docs/pbc/all/identity-access-management/page.version/install-and-upgrade/install-the-customer-account-management-glue-api.html
  - title: Company Accounts overview
    link: docs/pbc/all/customer-relationship-management/page.version/base-shop/company-account-feature-overview/company-accounts-overview.html
  - title: Customer Login overview
    link: docs/pbc/all/customer-relationship-management/page.version/base-shop/customer-account-management-feature-overview/customer-login-overview.html
---

<!-- 2020307.0 is the last version to support this doc. Don't move it to the next versions. -->

[Protected resources](#protected-resources) in Spryker Glue API require user authentication. For the authentication, Spryker implements the OAuth 2.0 mechanism. On the REST API level, it's represented by the Login API.

To get access to a protected resource, a user obtains an *access token*. An access token is a JSON Web Token used to identify a user during API calls. Then, they pass the token in the request header.

![auth-scheme.png](https://spryker.s3.eu-central-1.amazonaws.com/docs/Glue+API/Glue+API+Storefront+Guides/Authentication+and+Authorization/auth-scheme+%281%29.png)

For security purposes, access tokens have a limited lifetime. When retrieving an access token, the response body also contains the token's lifetime, in seconds. When the lifetime expires, the token can no longer be used for authentication.

There is also a *refresh token* in the response. When your access token expires, you can exchange the refresh token for a new access token. The new access token also has a limited lifetime and a new refresh token.

The default lifetime of the access tokens is 8 hours (28800 seconds) and 1 month (2628000 seconds) of the refresh tokens.

For security purposes, when you finish sending requests as a user, or if a token gets compromised, we recommend revoking the refresh token. Revoked tokens are marked as expired on the date and time of the request and can no longer be exchanged for access tokens.

Expired tokens are stored in the database, and you can configure them to be deleted.

## Protected resources

Below, you can find a list of the default protected resources. As Glue API is highly customizable, a shop is likely to have its own list of protected resources. To avoid extra calls, we recommend [retrieving protected resources](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-retrieve-protected-resources.html) of the shop before you start working with the API or setting up a flow.

| ACTION | METHOD | ENDPOINTS|
| --- | --- | --- |
| Customer: Retrieve a customer | GET | /customers/{% raw %}{{{% endraw %}customer_reference{% raw %}}}{% endraw %} |
| Customers: Update customer address | PATCH | /customers/{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}/addresses/{% raw %}{{{% endraw %}address_id{% raw %}}}{% endraw %} |
| Customers: Delete customer address | DELETE | ​/customers​/{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}​/addresses​/{addressId} |
| Customers: Retrieve list of all customer addresses | GET | ​/customers​/{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}​/addresses |
| Customers: Create customer address | POST | /customers/{% raw %}{{{% endraw %}customer_id{% raw %}}}{% endraw %}/addresses |
| Customers: Retrieve customer data | GET | /customers/{% raw %}{{{% endraw %}customerId{% raw %}}}{% endraw %} |
| Customers: Update customer data | PATCH | /customers/{% raw %}{{{% endraw %}customerId{% raw %}}}{% endraw %} |
| Customers: Anonymize customers | DELETE | /customers/{% raw %}{{{% endraw %}customerId{% raw %}}}{% endraw %} |
| Customer password: Update customer password | PATCH | /customer-password/{% raw %}{{{% endraw %}customerPasswordId{% raw %}}}{% endraw %} |
| Cart codes: Add code to cart. | GET | /carts/{% raw %}{{{% endraw %}cartId{% raw %}}}{% endraw %}/cart-codes |
| Cart codes: Delete code from cart | DELETE | /carts/{% raw %}{{{% endraw %}cartId{% raw %}}}{% endraw %}/cart-codes/{code} |
| Carts: Retrieve cart by id | GET | /carts/{% raw %}{{{% endraw %}cartId{% raw %}}}{% endraw %} |
| Carts: Update a cart | PATCH | /carts/{% raw %}{{{% endraw %}cartId{% raw %}}}{% endraw %} |
| Carts: Delete cart by id | DELETE | /carts/{% raw %}{{{% endraw %}cartId{% raw %}}}{% endraw %} |
| Carts: Retrieve list of all customer's carts | GET | /carts |
| Carts: Create cart | POST | /carts |
| Items: Add item to cart | POST | /carts/{% raw %}{{{% endraw %}cartId{% raw %}}}{% endraw %}/items |
| Items: Update cart item quantity | PATCH | /carts/{% raw %}{{{% endraw %}cartId{% raw %}}}{% endraw %}/items/{% raw %}{{{% endraw %}itemId{% raw %}}}{% endraw %} |
| Items: Remove item from cart | DELETE | /carts/{% raw %}{{{% endraw %}cartId{% raw %}}}{% endraw %}/items/{% raw %}{{{% endraw %}itemId{% raw %}}}{% endraw %} |
| Companies: Retrieve company by id | GET | /companies/{% raw %}{{{% endraw %}companyId{% raw %}}}{% endraw %} |
| Companies: Retrieve company collection | GET | /companies |
| Company business unit addresses: Retrieve company business unit address by id | GET | /company-business-unit-addresses/{% raw %}{{{% endraw %}companyBusinessUnitAddressId{% raw %}}}{% endraw %} |
| Company business unit addresses: Retrieve company business unit addresses collection | GET | /company-business-unit-addresses |
| Company roles: Retrieve company role by id | GET | /company-roles/{% raw %}{{{% endraw %}companyRoleId{% raw %}}}{% endraw %} |
| Company roles: Retrieve company role collection | GET | /company-roles |
| Company user access token: Create access token for company user | POST | /company-user-access-tokens |
| Company users: Retrieve company user by id | GET | /company-users/{% raw %}{{{% endraw %}companyUserId{% raw %}}}{% endraw %} |
| Company users: Retrieve list of company users | GET | /company-users |
| Orders: Retrieve order by id | GET | /orders/{% raw %}{{{% endraw %}orderId{% raw %}}}{% endraw %} |
| Orders: Retrieve list of orders | GET | /orders |
| Product reviews: Create product review | POST | /abstract-products/{% raw %}{{{% endraw %}abstractProductId{% raw %}}}{% endraw %}/product-reviews |
| Refresh tokens: Revoke customer's refresh token | DELETE | /refresh-tokens/{% raw %}{{{% endraw %}refreshTokenId{% raw %}}}{% endraw %} |
| Returns: Retrieve return by id | GET | /returns/{% raw %}{{{% endraw %}returnld{% raw %}}}{% endraw %} |
| Returns: Retrieve list of returns | GET | /returns |
| Returns: Create return | POST | /returns |
| Shared-carts: Share cart | POST | /carts/{% raw %}{{{% endraw %}cartld{% raw %}}}{% endraw %}/shared-carts |
| Shared-carts: Update permission group for shared cart | PATCH | /shared-carts/{% raw %}{{{% endraw %}sharedCartId{% raw %}}}{% endraw %} |
| Shared-carts: Delete cart sharing | DELETE | /shared-carts/{% raw %}{{{% endraw %}sharedCartId{% raw %}}}{% endraw %} |
| Shopping list items: Add shopping list item | POST | /shopping-lists/{% raw %}{{{% endraw %}shoppingListId{% raw %}}}{% endraw %}/shopping-list-items |
| Shopping list items: Update shopping list item | PATCH | /shopping-lists/{% raw %}{{{% endraw %}shoppingListId{% raw %}}}{% endraw %}/shopping-list-items |
| Shopping list items: Delete shopping list item | DELETE | /shopping-lists/{% raw %}{{{% endraw %}shoppingListId{% raw %}}}{% endraw %}/shopping-list-items |
| Shopping lists: Retrieve shopping list by id | GET | /shopping-lists/{% raw %}{{{% endraw %}shoppingListId{% raw %}}}{% endraw %} |
| Shopping lists: Update shopping list by id | PATCH | /shopping-lists/{% raw %}{{{% endraw %}shoppingListId{% raw %}}}{% endraw %} |
| Shopping lists: Delete shopping list by id | DELETE | /shopping-lists/{% raw %}{{{% endraw %}shoppingListId{% raw %}}}{% endraw %} |
| Shopping lists: Retrieve list of all customer's shopping lists | GET | /shopping-lists |
| Shopping lists: Create shopping list | POST | /shopping-lists |
| Up-selling products: Retrieve list of all up-selling products for cart | GET | /carts/{% raw %}{{{% endraw %}cartId{% raw %}}}{% endraw %}/up-selling-products |
| Vouchers: Add a code to cart | POST | /carts/{% raw %}{{{% endraw %}cartId{% raw %}}}{% endraw %}/vouchers |
| Vouchers: Delete code from cart | DELETE | /carts/{% raw %}{{{% endraw %}cartId{% raw %}}}{% endraw %}/vouchers/{% raw %}{{{% endraw %}voucherCode{% raw %}}}{% endraw %} |
| Wishlist items: Add item to  wishlist | POST  | /wishlists/{% raw %}{{{% endraw %}wishlistId{% raw %}}}{% endraw %}/wishlist-items |
| Wishlist items: Remove item from wishlist | DELETE | ​/wishlists​/{% raw %}{{{% endraw %}wishlistId{% raw %}}}{% endraw %}​/wishlist-items​/{% raw %}{{{% endraw %}wishlistItemId{% raw %}}}{% endraw %} |
| Wishlists: Retrieve wishlist data by id | GET | /wishlists/{% raw %}{{{% endraw %}wishlistld{% raw %}}}{% endraw %} |
| Wishlists: Update customer wishlist | PATCH | /wishlists/{% raw %}{{{% endraw %}wishlistld{% raw %}}}{% endraw %} |
| Wishlists: Remove customer wishlist | DELETE | /wishlists/{% raw %}{{{% endraw %}wishlistld{% raw %}}}{% endraw %}  |
| Wishlists: Retrieve all customer wishlists | GET | /wishlists  |
| Wishlists: Create wishlist | POST | /wishlists |

## Accessing protected resources

To access a protected resource, pass the access token in the `Authorization` header of your request. Example:

```html
GET /carts HTTP/1.1
Host: mysprykershop.com:10001
Content-Type: application/json
Authorization: Bearer eyJ0...
Cache-Control: no-cache
```

If authorization is successful, the API performs the requested operation. If authorization fails, the `401 Unathorized` error is returned. The response contains an error code explaining the cause of the error.

Response sample with an error:

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

## User types

Different endpoints require the client to be authenticated as different users. By default, you can:
- [Authenticate as a customer](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-customer.html)
- [Authenticate as a company user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html)
- [Authenticate as an agent assist](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-an-agent-assist.html)

## Next steps

[Retrieve protected resources](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-retrieve-protected-resources.html)
