---
title: "Glue API: Authenticate as a customer"
description: Retrieve customer authentication tokens to send requests to protected resources.
last_updated: Jun 21, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/authenticating-as-a-customer
originalArticleId: 4d61554f-dce0-40a2-9091-2db810bcf9a2
redirect_from:
  - /docs/scos/dev/glue-api-guides/201903.0/managing-customers/authenticating-as-a-customer.html
  - /docs/scos/dev/glue-api-guides/201907.0/managing-customers/authenticating-as-a-customer.html
  - /docs/scos/dev/glue-api-guides/202200.0/managing-customers/authenticating-as-a-customer.html
  - /docs/scos/dev/glue-api-guides/202204.0/managing-customers/authenticating-as-a-customer.html
  - /docs/pbc/all/identity-access-management/202204.0/manage-using-glue-api/glue-api-authenticate-as-a-customer.html
related:
  - title: Authentication and authorization
    link: docs/dg/dev/glue-api/page.version/old-glue-infrastructure/glue-api-authentication-and-authorization.html
  - title: Searching by company users
    link: docs/pbc/all/customer-relationship-management/page.version/base-shop/manage-using-glue-api/company-account/glue-api-search-by-company-users.html
  - title: Confirming customer registration
    link: docs/pbc/all/identity-access-management/page.version/manage-using-glue-api/glue-api-confirm-customer-registration.html
  - title: Managing customer authentication tokens
    link: docs/pbc/all/identity-access-management/page.version/manage-using-glue-api/glue-api-manage-customer-authentication-tokens.html
  - title: Managing customer authentication tokens via OAuth 2.0
    link: docs/pbc/all/identity-access-management/page.version/manage-using-glue-api/glue-api-manage-customer-authentication-tokens-via-oauth-2.0.html
  - title: Managing customers
    link: docs/pbc/all/customer-relationship-management/page.version/base-shop/manage-using-glue-api/customers/glue-api-manage-customers.html
  - title: Managing customer passwords
    link: docs/pbc/all/identity-access-management/page.version/manage-using-glue-api/glue-api-manage-customer-passwords.html
  - title: Managing customer addresses
    link: docs/pbc/all/customer-relationship-management/page.version/base-shop/manage-using-glue-api/customers/glue-api-manage-customer-addresses.html
  - title: Retrieve customer carts
    link: docs/pbc/all/cart-and-checkout/page.version/base-shop/manage-using-glue-api/glue-api-retrieve-customer-carts.html
  - title: Retrieving customer orders
    link: docs/pbc/all/customer-relationship-management/page.version/base-shop/manage-using-glue-api/customers/glue-api-retrieve-customer-orders.html
---

This endpoint allows authenticating as a customer. As an authenticated customer, you can send requests to [protected resources](/docs/dg/dev/glue-api/{{page.version}}/old-glue-infrastructure/glue-api-authentication-and-authorization.html#protected-resources).

{% info_block warningBox %}

This endpoint does not comply with OAuth 2.0. If your project requires such compliance, use the `/token` endpoint. For details about the `/token` endpoint, see [Managing customer authentication tokens via OAuth 2.0](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-manage-customer-authentication-tokens-via-oauth-2.0.html).

{% endinfo_block %}

## Installation

For details on the modules that provide the API functionality and how to install them, see [Glue API: Customer Access Feature Integration](/docs/pbc/all/identity-access-management/{{page.version}}/install-and-upgrade/install-the-customer-account-management-glue-api.html).

## Authenticate as a customer

To authenticate as a customer, send the request:

***
`POST` **/access-tokens**
***

### Request

Request sample: authenticate as a customer

`POST https://mysprykershop.com/access-tokens`

```json
{
  "data": {
    "type": "access-tokens",
    "attributes": {
      "username": "sonia@spryker.com",
      "password": "change123"
    }
  }
}
```

| ATTRIBUTE | TYPE | REQUIRED  |DESCRIPTION |
| --- | --- | --- | --- |
| username | string | &check; | Customer's username. You define it when [creating a customer](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-create-customers.html#create-a-customer). |
| password | password | &check; | Customer's password. You define it when [creating a customer](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-create-customers.html#create-a-customer). |

{% info_block infoBox "Username" %}

If you are authenticating as a newly created customer, make sure to verify your email address first. If an email address was not confirmed, the endpoint returns the `403 “Failed to authenticate user”` error.

{% endinfo_block %}

{% info_block warningBox %}

Note that depending on the Login feature configuration for your project, too many unsuccessful login attempts may result in the 429 error, and the user will be locked out for some time. For details, see [Customer Login feature overview](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/customer-account-management-feature-overview/customer-login-overview.html).

{% endinfo_block %}

### Response

<details>
<summary>Response sample: authenticate as a customer</summary>

```json
{
    "data": {
        "type": "access-tokens",
        "id": null,
        "attributes": {
            "tokenType": "Bearer",
            "expiresIn": 28800,
            "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJmcm9udGVuZCIsImp0aSI6IjA4NmRlMDEyZGE1Y2JjZDcyNzcwODBiMGFhMjU0ZWY1OTcxNjE2NjRkNzFmZjYzZjI2OTAyYTc3NmIyMTRkNjg1YWUzOGQzNGE2ZDE0NjQ5IiwiaWF0IjoxNjAxMjk1MjAxLCJuYmYiOjE2MDEyOTUyMDEsImV4cCI6MTYwMTMyNDAwMSwic3ViIjoie1wiaWRfY29tcGFueV91c2VyXCI6XCJlYmY0YjU1YS1jYWIwLTVlZDAtOGZiNy01MjVhM2VlZWRlYWNcIixcImlkX2FnZW50XCI6bnVsbCxcImN1c3RvbWVyX3JlZmVyZW5jZVwiOlwiREUtLTIxXCIsXCJpZF9jdXN0b21lclwiOjIxLFwicGVybWlzc2lvbnNcIjp7XCJwZXJtaXNzaW9uc1wiOlt7XCJpZF9wZXJtaXNzaW9uXCI6MSxcImtleVwiOlwiUmVhZFNoYXJlZENhcnRQZXJtaXNzaW9uUGx1Z2luXCIsXCJjb25maWd1cmF0aW9uXCI6e1wiaWRfcXVvdGVfY29sbGVjdGlvblwiOls1Myw1Miw1MSw1MCw0OSwyOCwyNywyNSwyNCwyMywyMiwyMV19LFwiY29uZmlndXJhdGlvbl9zaWduYXR1cmVcIjpcIltdXCIsXCJpZF9jb21wYW55X3JvbGVcIjpudWxsLFwiaXNfaW5mcmFzdHJ1Y3R1cmFsXCI6bnVsbH0se1wiaWRfcGVybWlzc2lvblwiOjIsXCJrZXlcIjpcIldyaXRlU2hhcmVkQ2FydFBlcm1pc3Npb25QbHVnaW5cIixcImNvbmZpZ3VyYXRpb25cIjp7XCJpZF9xdW90ZV9jb2xsZWN0aW9uXCI6WzUzLDUyLDUxLDUwLDQ5LDI4LDI3LDI1LDI0LDIzLDIyLDIxXX0sXCJjb25maWd1cmF0aW9uX3NpZ25hdHVyZVwiOlwiW11cIixcImlkX2NvbXBhbnlfcm9sZVwiOm51bGwsXCJpc19pbmZyYXN0cnVjdHVyYWxcIjpudWxsfSx7XCJpZF9wZXJtaXNzaW9uXCI6bnVsbCxcImtleVwiOlwiUmVhZFNob3BwaW5nTGlzdFBlcm1pc3Npb25QbHVnaW5cIixcImNvbmZpZ3VyYXRpb25cIjp7XCJpZF9zaG9wcGluZ19saXN0X2NvbGxlY3Rpb25cIjp7XCIwXCI6MSxcIjJcIjoyLFwiM1wiOjN9fSxcImNvbmZpZ3VyYXRpb25fc2lnbmF0dXJlXCI6W10sXCJpZF9jb21wYW55X3JvbGVcIjpudWxsLFwiaXNfaW5mcmFzdHJ1Y3R1cmFsXCI6bnVsbH0se1wiaWRfcGVybWlzc2lvblwiOm51bGwsXCJrZXlcIjpcIldyaXRlU2hvcHBpbmdMaXN0UGVybWlzc2lvblBsdWdpblwiLFwiY29uZmlndXJhdGlvblwiOntcImlkX3Nob3BwaW5nX2xpc3RfY29sbGVjdGlvblwiOntcIjBcIjoxLFwiMlwiOjIsXCIzXCI6M319LFwiY29uZmlndXJhdGlvbl9zaWduYXR1cmVcIjpbXSxcImlkX2NvbXBhbnlfcm9sZVwiOm51bGwsXCJpc19pbmZyYXN0cnVjdHVyYWxcIjpudWxsfV19fSIsInNjb3BlcyI6WyJjdXN0b21lciJdfQ.eLWdPoUJZyei-B20183npOEQqYgstxaXrcj2XvQdkIP88BM99wpdmPEiCiAZB7z2Bw9n-btKyt7cTPdRvq7jmJB09IW6PSemtg4y2FP99OO-GHb-A2_xRXjrRg94FAABmks_XvEpnHwdi12qQr_7QJhA361WPxhuDbT3onbqlvkRvv84txbwHl-RJNtaTVXgpY1hi4ufSZpcfuYMlCEcQUsXzG0u_2IhcLJ_bFNTYrVu-NTs4mGG2l22b4od1xCdoAPQVPGIs-YN1KpuuAgz5bdEHxfDwZiK0ljKR5asPG76sPSD-rh5Xvllzzns8nOcJUfTetIG-TjE-IuTClj-Hw",
            "refreshToken": "def5020061e2eb3ee8a3d34eec1b4a08a987894ee73ac025401ea9973ff5d81b293b31e1f061a0c96b17bcce5fcbf95ec942de8c840a0f365f936af1850bb1157f40ef5d0e8ba921ee5defb545ab7b48e3903b397c3a59022687ac7620fb810566d5669c2ed305f49f6bca5ecc39615347e46aa4dcc96f100105f5798e19c4b6b511ffb1b272dd6187dd6ffedba81799c3fe46d2e7360d6daa12da4494abd22ae2bc672d60ebfeb306b5c075bfa7fd4ff340aedf979c817653462cd1448dc427e038fee3355a8126db57313c47eab2d86a76cbe594f6c1f63d188fb458476ce33f5eba80db3fb252aac4a7e6441fdabd8a873c399cb905a8e762304bfca75d3ef57721b8d430a85d990e3f9122bf6a864b47a4fea561b995d47c7356811658ca4b82ea31a68c91c28750ad7b113a9914265cfb6645ee737494dd1b45d9e6d3185bbab136954322f0089029b7158a7560acea7c5a61d821fed372d2088aaefd4511c6cc7096305427a09de39b143704dffe51ee6a96bd350fc177b6b3d3ee7f294aeb3bf46f67bf564da5507a92213fa82f45d026ba931e9b9d7e43cd926880057d7abd733e83e23d5cea2e8af2735fb99051bc71b012277bd13250efa08b368ebe4f94731210d4d44f502dbda52d508a9e9e19afcbb0ebc013dfb40c9632a565e4115e2e1cb5739dd79a1cae92fe702f0c921d1f50f4bdba5a7b4b890ad7fae42cd21c259edb4835611ee9a00bd446fc988c589e5cafab2b676af188740e742134d681e7da5cc839193a687086756081b8fce5b7d0189044c1f0a2dba8d621b9bcc63f42926a8d2b9ab16f735109e58e29d74a966adfac7f6f4badb4fc0cccc1a18e6ed825a98e83a1cbe7dda376a3347c88cbc97fd636307f3d01cdd3a95951ce963da04aea8f2a88aae5986f27967b5c2586d0b2187e1ef9d73850bd17a833a3196b85640ec48c1a512a9e5f9c2000ca432d1467ca88d419277db906be09bbcab5218fb6d45e379f1cfffbbb12015e47bcafee888e118bd36e748dcb6f94ce2a1fb5ab3198a67bbd269821cb5d9a33e541112bcf0f64f9cb2843f23a4d3f96037896763025f45002208dae9ece57983a0c183b793641310730739ff0243cb76de9c716881677b361a4babd9661b579afb3ff86bd539534ae54f97790e2891414237ccc5df71ee46ea591fa3a9df38e344ba3d9ca1e0ecc80d84c528de1adcd27f2b2f2feca279cb5713146e9d2f5dc864e96b5e1455741dab1d10ccc5bdc3b5dbc8175d54e5158ecf776d7ab4e1ab5e204c5d269e99499e0a008f3fd8198b58945ef700ff0c2cee9196d6cca6a583e2c2f47c7d40b773d65a4105427c6e6955e429be9a4c684f976b5179f4fb48029727ffd3704dd1868a9769a5d42af8db3a45087f2459d7e71e52e993ff9ea84dd7fc3f2f66afda04f372a60267b0e61c52c9c8e8b900a2dab1a73fb2f029ef5c17b72981532d83553799ba02553777a68d8af81f9b839c79eaf76a949dd4a97e2ea5e98bd958525eaa8d2e1bcdea4649c51ab60295a23e6987a62e15123bc7a8536d283f67ef6a7093256e7a3bb358f5d15fb18d3596028d34ba68b5d0fe7326cb9e50f9f16edfdf71bc258d8d3bdd7051bba49276a4abcade326f55a858559ec371c86b47e5cc522585defc5cace4d3125538676dd98a1b07a7eb42814b5cd38024d27bc6b7ce601789b61bd611e035e6952702c5206e91ed130bf36735ed9aed2125d3a8b543ea60423d38aef05a0c3996c4ab363595c88adbe3bf73a960ad34252e2263088ee3c47b74b37e459ac1ed075a86e614358b89da9db6bf44ed0d740b927739039f5e04be7fff578ef096da7f536836bb5866bbdc8686f6c3adcf0c4f35ae98e01142d7a295397b2237a85db0d9ed33c9594644f6d5530db257a6b06a9935ad36f64788e90a678621653b52154233ef730b2c6e58a85153ad9f852bc941db562be58e3d646a53e45362f0fe6f75aecf3cb17be7a6bf78526b774845d2108838d828becf2aa42214292edb422ae482361e2a9af85470cacdbde52f7589b9d2e1c3d7d42be52cfdc70d3a9cc5d0f4e45",
            "idCompanyUser": "ebf4b55a-cab0-5ed0-8fb7-525a3eeedeac"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/access-tokens"
        }
    }
}
```
</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| tokenType | String | Type of the authorization token. Set this type when sending a request with the token. |
| expiresIn | Integer | The time in seconds in which the token expires.  |
| accessToken | String | Authentication token used to send requests to the protected resources available for a customer.  |
| refreshToken | String | Authentication token used to refresh the `accessToken`. |
| idCompanyUser | string | A unique identifier of a user within a company. Use it to [retrieve a company user](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-using-glue-api/company-account/glue-api-retrieve-company-users.html). |

## Possible errors

| CODE | REASON |
| --- | --- |
| 003 | Failed to log in the user. |
| 901 | Unprocessable login data (incorrect email format; email or password is empty).|

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).

## Next steps

* [Manage carts](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-items-in-carts-of-registered-users.html)
* [Manage cart items](/docs/pbc/all/cart-and-checkout/{{page.version}}/base-shop/manage-using-glue-api/manage-carts-of-registered-users/glue-api-manage-items-in-carts-of-registered-users.html)
* [Manage gift cards](/docs/pbc/all/gift-cards/{{page.version}}/manage-using-glue-api/glue-api-manage-gift-cards-of-registered-users.html)
* [Manage wishlists](/docs/pbc/all/shopping-list-and-wishlist/{{page.version}}/base-shop/manage-using-glue-api/glue-api-manage-wishlists.html)
* [Manage orders](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-using-glue-api/customers/glue-api-retrieve-customer-orders.html)
* [Managing customer authentication tokens](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-manage-customer-authentication-tokens.html)
* [Manage customer addresses](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-using-glue-api/customers/glue-api-manage-customer-addresses.html)
* [Manage customer addresses](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-using-glue-api/customers/glue-api-manage-customer-addresses.html)
* [Manage customer passwords](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-manage-customer-passwords.html)
