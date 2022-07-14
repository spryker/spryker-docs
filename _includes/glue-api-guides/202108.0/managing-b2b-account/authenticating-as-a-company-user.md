---
title: Authenticating as a company user
description: Learn how to authenticate as a company user via Glue API.
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/authenticating-as-a-company-user
originalArticleId: 90ca8812-0b3c-473d-bcd7-b12805da2070
redirect_from:
  - /2021080/docs/authenticating-as-a-company-user
  - /2021080/docs/en/authenticating-as-a-company-user
  - /docs/authenticating-as-a-company-user
  - /docs/en/authenticating-as-a-company-user
---

This endpoint allows authenticating as a company user.

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see [Glue API: Company Account Feature Integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-company-account-feature-integration.html).

## Authenticate as a company user

To authenticate as a company user, send the request:

***
`POST` **/company-user-access-tokens**
***

| HEADER KEY | REQUIRED | DESCRIPTION |
| --- | --- | --- |
| Authorization | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-customers/authenticating-as-a-customer.html).  |

### Request

Request sample:

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
| idCompanyUser | String | Unique identifier of a company user to authenticate as. To get it, [Retrieve available company users](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/searching-by-company-users.html#retrieve-available-company-users).  |

### Response


<details>
<summary markdown='span'>Response sample</summary>

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
| refreshToken | String | Token used to [refresh](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/managing-company-user-authentication-tokens.html#refresh-a-company-user-authentication-token) the `accessToken`. |

## Possible errors

| CODE | REASON |
| --- | --- |
| 001 | Failed to authenticate a user. This can happen due to the following reasons:<ul><li>Current authenticated customer cannot authenticate as the specified company user.</li><li>Specified company user does not exist.</li><li>Authentication token provided in the request is incorrect.</li></ul> |
| 002 | Authentication token is missing. |
| 901 | The `idCompanyUser` attribute is not specified, invalid, or empty. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/scos/dev/glue-api-guides/{{page.version}}/reference-information-glueapplication-errors.html).

##  Next steps

* [Retrieve company users](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/retrieving-company-users.html)
* [Retrieve companies](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/retrieving-companies.html)
* [Retrieve business units](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/retrieving-business-units.html)
* [Retrieve company company roles](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/retrieving-company-roles.html)
* [Retrieve business unit addresses](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/retrieving-business-unit-addresses.html)
* [Manage company user authentication tokens](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/managing-company-user-authentication-tokens.html)
