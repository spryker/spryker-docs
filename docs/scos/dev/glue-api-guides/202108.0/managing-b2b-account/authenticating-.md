---
title: Authenticating as a company user
originalLink: https://documentation.spryker.com/2021080/docs/authenticating-as-a-company-user
redirect_from:
  - /2021080/docs/authenticating-as-a-company-user
  - /2021080/docs/en/authenticating-as-a-company-user
---

This endpoint allows authenticating as a company user.

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see [Glue API: Company Account Feature Integration](https://documentation.spryker.com/docs/glue-api-company-account-api-feature-integration).



## Authenticate as a company user

To authenticate as a company user, send the request:

***
`POST` **/company-user-access-tokens**
***

| Header key | Required | Description |
| --- | --- | --- |
| Authorization | &check; | Alphanumeric string that authorizes the customer to send requests to protected resources. Get it by [authenticating as a customer](https://documentation.spryker.com/authenticating-as-a-customer).  |

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


| Attribute | Type | Description |
| --- | --- | --- |
| idCompanyUser | String | Unique identifier of a company user to authenticate as. To get it, [Retrieve available company users](https://documentation.spryker.com/docs/searching-by-company-users#retrieve-available-company-users).  |
    


### Response


<details>
    <summary>Response sample</summary>
    
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

| Attribute | Type | Description |
| --- | --- | --- |
| tokenType | String | Token type. The default value is `Bearer`. |
| accessToken | String | Authentication token used to send requests to the protected resources available for the company user. |
| expiresIn | Integer | Time in seconds in which the token expires. The default value is `28800`. |
| refreshToken | String | Token used to [refresh](https://documentation.spryker.com/docs/managing-company-user-authentication-tokens#refresh-a-company-user-authentication-token) the `accessToken`. |




## Possible errors

| Code | Reason |
| --- | --- |
| 001 | Failed to authenticate a user. This can happen due to the following reasons:<ul><li>Current authenticated customer cannot authenticate as the specified company user;</li><li>Specified company user does not exist;</li><li>Authentication token provided in the request is incorrect.</li></ul> |
| 002 | Authentication token is missing in the request. |
| 901 | Company user Id format is incorrect. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](https://documentation.spryker.com/docs/reference-information-glueapplication-errors).

 
##  Next steps

* [Retrieve company users](https://documentation.spryker.com/docs/retrieving-company-users)
* [Retrieve companies](https://documentation.spryker.com/docs/retrieving-companies)
* [Retrieve business units](https://documentation.spryker.com/docs/retrieving-business-units)
* [Retrieve company company roles](https://documentation.spryker.com/docs/retrieving-company-roles)
* [Retrieve business unit addresses](https://documentation.spryker.com/docs/retrieving-business-unit-addresses)
* [Manage company user authentication tokens](https://documentation.spryker.com/docs/managing-company-user-authentication-tokens)
