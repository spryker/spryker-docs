---
title: "Glue API: Manage company user authentication tokens"
description: Learn how to manage company user authentication tokens via the Spryker Glue API.
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/managing-company-user-authentication-tokens
originalArticleId: 93de3785-709e-48d2-a1f5-d5edf0e4bc93
redirect_from:
  - /docs/scos/dev/glue-api-guides/201811.0/managing-b2b-account/managing-company-user-authentication-tokens.html
  - /docs/scos/dev/glue-api-guides/201903.0/managing-b2b-account/managing-company-user-authentication-tokens.html
  - /docs/scos/dev/glue-api-guides/201907.0/managing-b2b-account/managing-company-user-authentication-tokens.html
  - /docs/scos/dev/glue-api-guides/202005.0/managing-b2b-account/managing-company-user-authentication-tokens.html
  - /docs/pbc/all/identity-access-management/202204.0/manage-using-glue-api/glue-api-manage-company-user-authentication-tokens.html
related:
  - title: Retrieving companies
    link: docs/pbc/all/customer-relationship-management/page.version/base-shop/manage-using-glue-api/company-account/glue-api-retrieve-companies.html
  - title: Retrieving company roles
    link: docs/pbc/all/customer-relationship-management/page.version/base-shop/manage-using-glue-api/company-account/glue-api-retrieve-company-roles.html
  - title: Retrieving company users
    link: docs/pbc/all/customer-relationship-management/page.version/base-shop/manage-using-glue-api/company-account/glue-api-retrieve-company-users.html
  - title: "Glue API: Authenticating as a company user"
    link: docs/pbc/all/identity-access-management/page.version/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html
  - title: Searching by company users
    link: docs/pbc/all/customer-relationship-management/page.version/base-shop/manage-using-glue-api/company-account/glue-api-search-by-company-users.html
  - title: Retrieving business units
    link: docs/pbc/all/customer-relationship-management/page.version/base-shop/manage-using-glue-api/company-account/glue-api-retrieve-business-units.html
  - title: Retrieving business unit addresses
    link: docs/pbc/all/customer-relationship-management/page.version/base-shop/manage-using-glue-api/company-account/glue-api-retrieve-business-unit-addresses.html
---

This endpoint allows refreshing a company user access token or revoking a refresh token.


## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see [Install the Company account Glue API](/docs/pbc/all/customer-relationship-management/202410.0/base-shop/install-and-upgrade/install-glue-api/install-the-company-account-glue-api.html).

## Refresh a company user authentication token

To refresh a company user authentication token, send the request:

***
`POST` **/refresh-tokens**
***

### Request

Request sample: refresh a company user authentication token

`POST https://glue.mysprykershop.com/refresh-tokens`

```json
{
  "data": {
    "type": "refresh-tokens",
    "attributes": {
      "refreshToken": "def5020000b901791eededeffbe1d2cebac97b83068b6b40953b252c87b4a2f6122f4c94f3acfdc11dfadfca7f57e61c0a2012e7d308a67ad780f8069be3b9316f5f2113c82e7765ca2d5b83209619711d30bf8e1fe95e3ffb289d37ba37ce71e9994a1121856883e1bb4a922c326d163d58e72e89fae17b1865de7b17bba1466e2109066c3acd3c3aa1d55e1f042f38d59aa2b5437e9eafd03a34cd64654fc8009761feafa25ddf2f7fabc8fcd0862802fef89298bc63a853c6c3668935c2e78429af228a063730eb68d4ad52723ec0584e6154fe37c8ac6a1ad3cdba65931ffa339272bde02b7043578fe5758d956e4fe9d0f3f5e5cf09b655d4b5684a86bf8fb5772398447666d7de7b762045ab17316c8e80ed1639d184a2fe70522b7cdcf3485b85be1671e9759432dde3ea8f5b8c3c19ca05bfc11089721e4cdd6ac377d65a122a7060d31423c321a53ec24ff8d07892efac7679ffb24f813ccd7c0f280c3ac12a8081087091e60d81f56362ff5444c710d769081fac1453c73199176082b078ea3877305f0b6c7d946a412929e9356e3e7f4c6285ab8bf0c915758206c3b59407ff2358d78799f5470741bd19d8fbd8035fed0ba6c83bee4272f4ba0c7f56ce71aaaf7b343f73285edde206c20ebf6900aae55e3419b64ad2a83bc1"
    }
  }
}
```


| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| refreshToken | String | &check; | Authentication token used to refresh `accessToken`. You can get it by [authenticating as a company user](/docs/pbc/all/identity-access-management/202410.0/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user). |



### Response

<details>
<summary>Response sample: refresh a company user authentication token</summary>

```json
{
    "data": {
        "type": "refresh-tokens",
        "id": null,
        "attributes": {
            "tokenType": "Bearer",
            "expiresIn": 28800,
            "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJmcm9udGVuZCIsImp0aSI6IjdmNzdlZGZmMDc2OTFhNDM2M2EzYjliMTFlM2U5NGM5MmM1ODQ1ZjlmYzdhYmVkOGExNTcxZTU1Njg5NTRlNDEwNDU4MzYzMjNhZGIyY2U4IiwiaWF0IjoxNjAxMzYzNDEyLCJuYmYiOjE2MDEzNjM0MTIsImV4cCI6MTYwMTM5MjIxMiwic3ViIjoie1wiaWRfY29tcGFueV91c2VyXCI6bnVsbCxcImlkX2FnZW50XCI6MSxcImN1c3RvbWVyX3JlZmVyZW5jZVwiOm51bGwsXCJpZF9jdXN0b21lclwiOm51bGwsXCJwZXJtaXNzaW9uc1wiOm51bGx9Iiwic2NvcGVzIjpbImFnZW50Il19.dZZgzg7G2jKA4NqByz8OZtF4E6QlYEvb6q546ME1RooSQoTNxuOEHCY3OCcYCa7rZB9s8hZZDa0XxCGG6n7vdz3j4cVxhge99KBePj5yEpoZ9UH7FZ177O8Q9miBmjy8OxCy9a7NVe3_6l1GojeSPBMCLK_7xjmFssCNulIIl9uchuzEHgBraB-3oX2tEoKc6XYN9EySotvm23-RrXX6VTmd-Fdw7AoFxFI2K7FNiX4TFeUgAUHMbk9KyPU9D9pb8gP-rhGalGDsCfY-bdV5IJQYOGRn_MY1t3Kclw4gtEZQWEsUM3cbb--ZGEqmpyqSZJyRk0dKNr7ZQ26Q8z3T_Q",
            "refreshToken": "def50200f6acb9e125f08a4104889acfc507e41213d6de3f79b9c6ee3c54bc8d0d0333a63a261c752ed71e70a853e29a16c95c7f02e4194203dd6d1be72790618aaa5db2219173a46a9e1417b051daa8b5dd4fee7250236237267fe015ca2eb65d060b1d0ae789c971734904f7258f212155723814102abeb60004fd574c1ca157790cccbc71a156cddbf458493a55bdad7eb45c5fb4a0a328712d35a18859332074c100568d1cd1cbab915385bd353692fbf5ef4d18d570a70d13c2939427039b2cec70802365e7327a806a7121f9c5ae66816ffe912b78e41c98bc04d7341ac482422612afaffcf6bb5642a55d314df62e2472bab69e6e1fd1bb8146405b4544dc9d881df5312e38291873477ecedec4f20425fcdfdee88643d977f01130c6f8766b476475219640ce478513461e589d72ccbd704672f16cdc87906ceea15242548cedf6ec9a6486be0a5d1789fa3245199802b464ccae018f0ad61703aea97a4eb75705087249327392b8d37ec8fc7a6e1b12cafa9d0a904fd249c87b355dd2ce31f297275548851d3472525f59178ac29c69d4342b24bb7a9726dc949e1ddff283ecd64594802033fc7c2b5c248ae522317f1e9a492d37f3e3e63621dc2bc76c622e258baf71f70850cad14667f58b27dacd8de90f3672bd4449f9a8fe"
        },
        "links": {
            "self": "https://glue.mysprykershop.com/refresh-tokens"
        }
    }
}
```

</details>


| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| tokenType | String | Authentication token type. Set this type when sending a request with the token. The default value is `Bearer`. |
| accessToken | String | Authentication token used to send requests to the protected resources available for the company user. |
| expiresIn | Integer | Time in seconds in which the`accessToken` token expires. The default value is `28800`. |
| refreshToken | String | Token used to [refresh](#refresh-a-company-user-authentication-token) the `accessToken`. |

## Revoke a company user refresh token

To revoke a company user refresh token, send the request:

***
`DELETE` **/refresh-tokens/*{% raw %}{{{% endraw %}refresh_token{% raw %}}}{% endraw %}***
***


| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}refresh_token{% raw %}}}{% endraw %}*** | Defines the refresh token to revoke. Enter `mine` to revoke all the refresh tokens of the authenticated company user. |


### Request

| HEADER KEY | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | Only required when revoking all the refresh token of a company user.  | String containing digits, letters, and symbols that authorize the company user. [Authenticate as a company user](/docs/pbc/all/identity-access-management/202410.0/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user) to get the value.  |



| REQUEST | USAGE |
| --- | --- |
| `DELETE https://glue.mysprykershop.com/refresh-tokens/mine` | Revoke all the refresh tokens of the authenticated company user. |
| `DELETE https://glue.mysprykershop.com/refresh-tokens/def50200f6acb9e125f08a4104889acfc507e41213d6de3f79b9c6ee3c54bc8d0d0333a63a261c752ed71e70a853e29a16c95c7f02e4194203dd6d1be72790618aaa5db2219173a46a9e1417b051daa8b5dd4fee7250236237267fe015ca2eb65d060b1d0ae789c971734904f7258f212155723814102abeb60004fd574c1ca157790cccbc71a156cddbf458493a55bdad7eb45c5fb4a0a328712d35a18859332074c100568d1cd1cbab915385bd353692fbf5ef4d18d570a70d13c2939427039b2cec70802365e7327a806a7121f9c5ae66816ffe912b78e41c98bc04d7341ac482422612afaffcf6bb5642a55d314df62e2472bab69e6e1fd1bb8146405b4544dc9d881df5312e38291873477ecedec4f20425fcdfdee88643d977f01130c6f8766b476475219640ce478513461e589d72ccbd704672f16cdc87906ceea15242548cedf6ec9a6486be0a5d1789fa3245199802b464ccae018f0ad61703aea97a4eb75705087249327392b8d37ec8fc7a6e1b12cafa9d0a904fd249c87b355dd2ce31f297275548851d3472525f59178ac29c69d4342b24bb7a9726dc949e1ddff283ecd64594802033fc7c2b5c248ae522317f1e9a492d37f3e3e63621dc2bc76c622e258baf71f70850cad14667f58b27dacd8de90f3672bd4449f9a8fe` | Revoke the following refresh token: `def50200f6acb9e125f08a4104889acfc507e41213d6de3f79b9c6ee3c54bc8d0d0333a63a261c752ed71e70a853e29a16c95c7f02e4194203dd6d1be72790618aaa5db2219173a46a9e1417b051daa8b5dd4fee7250236237267fe015ca2eb65d060b1d0ae789c971734904f7258f212155723814102abeb60004fd574c1ca157790cccbc71a156cddbf458493a55bdad7eb45c5fb4a0a328712d35a18859332074c100568d1cd1cbab915385bd353692fbf5ef4d18d570a70d13c2939427039b2cec70802365e7327a806a7121f9c5ae66816ffe912b78e41c98bc04d7341ac482422612afaffcf6bb5642a55d314df62e2472bab69e6e1fd1bb8146405b4544dc9d881df5312e38291873477ecedec4f20425fcdfdee88643d977f01130c6f8766b476475219640ce478513461e589d72ccbd704672f16cdc87906ceea15242548cedf6ec9a6486be0a5d1789fa3245199802b464ccae018f0ad61703aea97a4eb75705087249327392b8d37ec8fc7a6e1b12cafa9d0a904fd249c87b355dd2ce31f297275548851d3472525f59178ac29c69d4342b24bb7a9726dc949e1ddff283ecd64594802033fc7c2b5c248ae522317f1e9a492d37f3e3e63621dc2bc76c622e258baf71f70850cad14667f58b27dacd8de90f3672bd4449f9a8fe` |


### Response

For security purposes, the endpoint always returns the `204 No Content` status code, regardless of any refresh tokens being revoked.

The tokens are marked as expired on the date and time of the request. You can configure expired tokens to be automatically deleted from the database by setting the lifetime of expired tokens.

## Possible errors

| CODE  | REASON |
| --- | --- |
| 001 | Access token is invalid. |
| 004 | Failed to refresh the token. |
| 901 | Refresh token is not specified or empty. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/202410.0/rest-api/reference-information-glueapplication-errors.html).
