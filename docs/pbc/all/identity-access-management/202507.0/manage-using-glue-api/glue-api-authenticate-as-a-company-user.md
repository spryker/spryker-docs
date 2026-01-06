---
title: "Glue API: Authenticating as a company user"
description: Learn how to authenticate as a Company user using the Spryker Glue API for your Spryker projects.
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/authenticating-as-a-company-user
originalArticleId: 90ca8812-0b3c-473d-bcd7-b12805da2070
redirect_from:
  - /docs/scos/dev/glue-api-guides/201811.0/managing-b2b-account/authenticating-as-a-company-user.html
  - /docs/scos/dev/glue-api-guides/201903.0/managing-b2b-account/authenticating-as-a-company-user.html
  - /docs/scos/dev/glue-api-guides/202200.0/managing-b2b-account/authenticating-as-a-company-user.html
  - /docs/pbc/all/identity-access-management/202204.0/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html
related:
  - title: Retrieving companies
    link: docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/company-account/glue-api-retrieve-companies.html
  - title: Retrieving company roles
    link: docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/company-account/glue-api-retrieve-company-roles.html
  - title: Retrieving company users
    link: docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/company-account/glue-api-retrieve-company-users.html
  - title: Managing company user authentication tokens
    link: docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-manage-company-user-authentication-tokens.html
  - title: Searching by company users
    link: docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/company-account/glue-api-search-by-company-users.html
  - title: Retrieving business units
    link: docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/company-account/glue-api-retrieve-business-units.html
  - title: Retrieving business unit addresses
    link: docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/company-account/glue-api-retrieve-business-unit-addresses.html
  - title: Authenticating as a customer
    link: docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-customer.html
---

This endpoint allows authenticating as a company user.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see [Install the Company account Glue API](/docs/pbc/all/customer-relationship-management/latest/base-shop/install-and-upgrade/install-glue-api/install-the-company-account-glue-api.html).

## Authenticate as a company user

To authenticate as a company user, send the request:

***
`POST` **/company-user-access-tokens**
***

| HEADER KEY | REQUIRED | DESCRIPTION |
| --- | --- | --- |
| Authorization | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-customer.html).  |

### Request

Request sample: authenticate as a company user

`POST https://glue.mysprykershop.com/company-user-access-tokens`

```json
{
    "data": {
        "type": "company-user-access-tokens",
        "attributes": {
            "idCompanyUser": "5daf27b3-eddf-5b81-98cb-899f140f97e5"
        }
    }
}
```


| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| idCompanyUser | String | Unique identifier of a company user to authenticate as. To get it, [Retrieve available company users](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/company-account/glue-api-search-by-company-users.html#retrieve-available-company-users).  |

### Response


<details>
<summary>Response sample: authenticate as a company user</summary>

```json
{
    "data": {
        "type": "company-user-access-tokens",
        "id": null,
        "attributes": {
            "tokenType": "Bearer",
            "expiresIn": 28800,
            "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUz",
            "refreshToken": "def50200d7338763c798a0600f18e"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/company-user-access-tokens"
        }
    }
}
```

</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| tokenType | String | Token type. The default value is `Bearer`. |
| accessToken | String | Authentication token used to send requests to the protected resources available for the company user. |
| expiresIn | Integer | Time in seconds in which the token expires. The default value is `28800`. |
| refreshToken | String | Token used to [refresh](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-manage-company-user-authentication-tokens.html#refresh-a-company-user-authentication-token) the `accessToken`. |

## Possible errors

| CODE | REASON |
| --- | --- |
| 001 | Failed to authenticate a user. This can happen because of the following reasons:<ul><li>Current authenticated customer cannot authenticate as the specified company user.</li><li>Specified company user does not exist.</li><li>Authentication token provided in the request is incorrect.</li></ul> |
| 002 | Authentication token is missing. |
| 901 | The `idCompanyUser` attribute is not specified, invalid, or empty. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/integrations/spryker-glue-api/storefront-api/api-references/reference-information-storefront-application-errors.html).

## Next steps

- [Retrieve company users](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/company-account/glue-api-retrieve-company-users.html)
- [Retrieve companies](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/company-account/glue-api-retrieve-companies.html)
- [Retrieve business units](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/company-account/glue-api-retrieve-business-units.html)
- [Retrieve company company roles](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/company-account/glue-api-retrieve-company-roles.html)
- [Retrieve business unit addresses](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/company-account/glue-api-retrieve-business-unit-addresses.html)
- [Manage company user authentication tokens](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-manage-company-user-authentication-tokens.html)
