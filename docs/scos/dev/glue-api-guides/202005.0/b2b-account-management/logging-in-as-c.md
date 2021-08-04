---
title: Logging In as Company User
originalLink: https://documentation.spryker.com/v5/docs/logging-in-as-company-user-201907
redirect_from:
  - /v5/docs/logging-in-as-company-user-201907
  - /v5/docs/en/logging-in-as-company-user-201907
---

In the B2B context, buyers typically represent a company and act on its behalf. For this reason, Spryker Commerce OS provides the [Company Account](https://documentation.spryker.com/docs/en/company-account-overview) capability which allows companies to create multiple [Company Users](https://documentation.spryker.com/docs/en/company-account-general-organizational-structure), as well as organize them in Business Units depending on the user role and scope. Customers can impersonate as various *Company Accounts* depending on the task they need to perform.

To impersonate a customer as a Company User, API clients can use the **Business on Behalf API**. It provides REST access to retrieve a list of the Company Users available to the currently logged in user and impersonate as any user available to them.

{% info_block warningBox "Authentication" %}
Before impersonating as Company Users, customers need to authenticate first. For details on how to do so, see [Authentication and Authorization](https://documentation.spryker.com/docs/en/authentication-and-authorization
{% endinfo_block %}.)

During the impersonation process, customers receive an Access Token. The token can be used to access any B2B REST API resources, such as Companies, Business Units, Carts etc. Also, authenticated company users will benefit from the [merchant-specific prices](https://documentation.spryker.com/docs/en/price-per-merchant-relation-feature-overview) available to them (applied to certain business units as a rule) instead of the default ones. Also, you can customize the behavior of your API client to match the user's company, job role, business unit, and scope.

{% info_block infoBox "Info" %}
If the [Prices per Merchant Relation \(Customer specific prices\
{% endinfo_block %}](https://documentation.spryker.com/docs/en/price-per-merchant-relation) feature is enabled in your project, all prices returned by Spryker REST API are the prices specific to the Company of the current Company User (if any).)

The same as with B2C resource access tokens, the tokens provided by the API have limited timeframe. When receiving an access token, the response body contains not only the access token itself, but also its lifetime, in seconds, and a **Refresh Token**. When the lifetime expires, the Refresh Token can be exchanged for a new Access Token. The new token will also have a limited lifetime and have a corresponding Refresh Token for future authentication. The default lifetime of the tokens is 8 hours (28800 seconds) for an access token and 1 month (2628000 seconds) for a refresh token. The settings can be changed in the module configuration.

{% info_block infoBox "Info" %}
For details, see [Authentication and Authorization](https://documentation.spryker.com/docs/en/authentication-and-authorization
{% endinfo_block %}.)

In your development, the endpoint can help you to:

* Authenticate users as B2B Company Users;
* Obtain a token that can be used when accessing protected B2B resources;
* Provide customized user experience based on the user's Company, Business Unit, Role etc;
* Allow users to benefit from prices specific to their company.

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see [Glue API: Company Account Feature Integration](https://documentation.spryker.com/docs/en/company-account-api-feature-integration-201907#glue-api--company-account-feature-integration).

## Retrieving Available Company Users
To retrieve a list of all the Company Users available to the currently logged in user, send a GET request to the following endpoint:

[/company-users/mine](https://documentation.spryker.com/docs/en/rest-api-reference#/company-users)

Sample request: *GET http://glue.mysprykershop.com/company-users/mine*

{% info_block infoBox "Authentication Required" %}
To get a list of Company Users, you need to authenticate first and pass an access token as a part of your request. For details, see [Authentication and Authorization](https://documentation.spryker.com/docs/en/authentication-and-authorization
{% endinfo_block %}.)

### Response
The endpoint responds with a `RestCompanyUserCollectionResponse` that contains the Company Users available to the currently logged in user.

**Response Attributes:**

| Attribute* | Type | Description |
| --- | --- | --- |
| id | String | Specifies the Company User ID.</br>You can use the ID to impersonate as the Company User via the `/company-user-access-tokens` endpoint. |
| isActive | Boolean | Indicates whether the Company User is active. |
| isDefault | Boolean | Indicates whether the Company User is the default one for the logged in customer. |

*The attributes mentioned are all attributes in the response. Type is not mentioned.

**Sample Response**
    
```json
{
    "data": [
        {
            "type": "company-users",
            "id": "4c677a6b-2f65-5645-9bf8-0ef3532bead1",
            "attributes": {
                "isActive": true,
                "isDefault": false
            },
            "links": {
                "self": "http://glue.mysprykershop.com/company-users/4c677a6b-2f65-5645-9bf8-0ef3532bead1"
            }
        },
        {
            "type": "company-users",
            "id": "cfbe2644-a9bd-581b-977b-e72d1c9a9c54",
            "attributes": {
                "isActive": true,
                "isDefault": false
            },
            "links": {
                "self": "http://glue.mysprykershop.com/company-users/cfbe2644-a9bd-581b-977b-e72d1c9a9c54"
            }
        },
        {
            "type": "company-users",
            "id": "e1019900-88c4-5582-af83-2c1ea8775ac5",
            "attributes": {
                "isActive": true,
                "isDefault": false
            },
            "links": {
                "self": "http://glue.mysprykershop.com/company-users/e1019900-88c4-5582-af83-2c1ea8775ac5"
            }
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/company-users/mine"
    }
}
```

{% info_block infoBox "Info" %}
If the currently logged in user does not have access to any Company User accounts, the endpoint returns an empty **RestCompanyUserCollectionResponse** response.
{% endinfo_block %}

To help customers with selecting the necessary Company User, you can provide additional information, such as the company and business unit that each account belongs to. Also, you can identify which roles the corporate accounts can perform within the company. To fetch such information, extend the response of the endpoint with the **companies** and **company-business-units**, and **company-roles** resource relationships.

Sample request: *GET http://glue.mysprykershop.com/company-users/min?**include=companies,company-business-units,company-roles***

In this case, the following additional attributes will be added to the response:

| Resource | Attribute* | Type | Description |
| --- | --- | --- | --- |
| companies | name | String | Specifies the name of the Company. |
| companies | isActive | Boolean | Indicates whether the Company is active. |
| companies | status | String | Specifies the status of the Company. Possible values: *Pending*, *Approved* or *Denied*. |
| company-roles | name | String | Specifies the name of the Company Role. |
| company-roles | isDefault | Boolean | Indicates whether the Company Role is the default role for the company. |
| company-business-units | name | String | Specifies the name of the Business Unit. |
| company-business-units | email | String | Specifies the email address of the Business Unit. |
| company-business-units | phone | String | Specifies the telephone number of the Business Unit. |
| company-business-units | externalUrl | String | Specifies the url of the website of the Business Unit. |
| company-business-units | bic | String | Specifies the Bank Identifier Code of the Business Unit. |
| company-business-units | iban | String | Specifies the International Bank Account Number of the Business Unit. |
| company-business-units | defaultBillingAddress | String | Specifies the default billing address of the Business Unit. |

*The attributes mentioned are all attributes in the response. Type and ID are not mentioned.

<details open>
<summary>Sample Response</summary>
    
```json
{
    "data": [
        {
            "type": "company-users",
            "id": "4c677a6b-2f65-5645-9bf8-0ef3532bead1",
            "attributes": {...},
            "links": {...},
            "relationships": {
                "companies": {
                    "data": [
                        {
                            "type": "companies",
                            "id": "88efe8fb-98bd-5423-a041-a8f866c0f913"
                        }
                    ]
                },
                "company-business-units": {
                    "data": [
                        {
                            "type": "company-business-units",
                            "id": "b2ea10b2-263a-5cd9-88dc-747309f0534a"
                        }
                    ]
                },
                "company-roles": {
                    "data": [
                        {
                            "type": "company-roles",
                            "id": "50c647a4-d27f-5d82-a587-1d0b7cc6b58d"
                        }
                    ]
                }
            }
        },
        {
            "type": "company-users",
            "id": "cfbe2644-a9bd-581b-977b-e72d1c9a9c54",
            "attributes": {
                "isActive": true,
                "isDefault": false
            },
            "links": {
                "self": "http://glue.mysprykershop.com/company-users/cfbe2644-a9bd-581b-977b-e72d1c9a9c54?include=companies,company-business-units"
            },
            "relationships": {
                "companies": {
                    "data": [
                        {
                            "type": "companies",
                            "id": "88efe8fb-98bd-5423-a041-a8f866c0f913"
                        }
                    ]
                },
                "company-business-units": {
                    "data": [
                        {
                            "type": "company-business-units",
                            "id": "35752ce6-e25f-5d04-8bef-d46b2c359695"
                        }
                    ]
                }
            }
        },
        {
            "type": "company-users",
            "id": "e1019900-88c4-5582-af83-2c1ea8775ac5",
            "attributes": {...},
            "links": {...},
            "relationships": {
                "companies": {
                    "data": [
                        {
                            "type": "companies",
                            "id": "88efe8fb-98bd-5423-a041-a8f866c0f913"
                        }
                    ]
                },
                "company-business-units": {
                    "data": [
                        {
                            "type": "company-business-units",
                            "id": "5a6032dc-fbce-5d0d-9d57-11ade1947bac"
                        }
                    ]
                }
            }
        }
    ],
    "links": {...},
    "included": [
        {
            "type": "companies",
            "id": "88efe8fb-98bd-5423-a041-a8f866c0f913",
            "attributes": {
                "isActive": true,
                "name": "BoB-Hotel Mitte",
                "status": "approved"
            },
            "links": {
                "self": "http://glue.mysprykershop.com/companies/88efe8fb-98bd-5423-a041-a8f866c0f913"
            }
        },
        {
            "type": "company-business-units",
            "id": "b2ea10b2-263a-5cd9-88dc-747309f0534a",
            "attributes": {
                "name": "Hotel Mitte",
                "email": "Hotel.Mitte@spryker.com",
                "phone": "12345617",
                "externalUrl": "",
                "bic": "",
                "iban": "",
                "defaultBillingAddress": null
            },
            "links": {
                "self": "http://glue.mysprykershop.com/b2ea10b2-263a-5cd9-88dc-747309f0534a"
            }
        },
        {
            "type": "company-business-units",
            "id": "35752ce6-e25f-5d04-8bef-d46b2c359695",
            "attributes": {
                "name": "Service Mitte",
                "email": "Service.Mitte@spryker.com",
                "phone": "12345617",
                "externalUrl": "",
                "bic": "",
                "iban": "",
                "defaultBillingAddress": null
            },
            "links": {
                "self": "http://glue.mysprykershop.com/company-business-units/35752ce6-e25f-5d04-8bef-d46b2c359695"
            }
        },
        {
            "type": "company-business-units",
            "id": "5a6032dc-fbce-5d0d-9d57-11ade1947bac",
            "attributes": {
                "name": "Cleaning Mitte",
                "email": "Cleaning.Mitte@spryker.com",
                "phone": "12345617",
                "externalUrl": "",
                "bic": "",
                "iban": "",
                "defaultBillingAddress": null
            },
            "links": {
                "self": "http://glue.mysprykershop.com/company-business-units/5a6032dc-fbce-5d0d-9d57-11ade1947bac"
            }
        },
        {
            "type": "company-roles",
            "id": "50c647a4-d27f-5d82-a587-1d0b7cc6b58d",
            "attributes": {
                "name": "Buyer",
                "isDefault": true
            },
            "links": {
                "self": "http://glue.mysprykershop.com/company-roles/50c647a4-d27f-5d82-a587-1d0b7cc6b58d"
            }
        }
    ]
}
```
    
</br>
</details>

### Possible Errors

| Code | Reason |
| --- | --- |
| 401 | The access token is invalid. |
| 403 | The access token is missing. |

## Impersonating as a Company User
To impersonate a user as a Company Account and receive a B2B access token, send a POST request to the following endpoint:

[/company-user-access-tokens](https://documentation.spryker.com/docs/en/rest-api-reference#/company-user-access-tokens)

Sample request: *POST http://glue.mysprykershop.com/company-user-access-tokens*

{% info_block warningBox "Authentication Required" %}
To access the endpoint, you need to authenticate customers as regular users first and pass an access token as a part of your request. For details, see [Authentication and Authorization](https://documentation.spryker.com/docs/en/authentication-and-authorization
{% endinfo_block %}.)

**Attributes**

| Attribute | Type | Description |
| --- | --- | --- |
| idCompanyUser | String | Specifies the ID of the Company User to impersonate.</br>Company User IDs can be retrieved using the **/company-users/mine** endpoint. |

**Sample Request:**
    
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

### Response
If the request was successful, the endpoint responds with a **RestCompanyUserAccessTokensRequest** containing the access and refresh tokens.

**Response Attributes:**

| Attribute* | Type | Description |
| --- | --- | --- |
| tokenType | String | Specifies the token type. By default, the type is always Bearer. |
| accessToken | String | Specifies the access token that can be used to impersonate as the Company User. |
| expiresIn | Integer | Specifies the time period after which the access token expires (in seconds). By default, 28800. |
| refreshToken | String | Specifies the refresh token that can be exchanged for a new access token after the current one expires. |

*The attributes mentioned are all attributes in the response. Type and ID are not mentioned.

**Sample Response**
    
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
            "self": "http://glue.mysprykershop.com/company-user-access-tokens"
        }
    }
}
```

### Possible Errors

| Code | Reason |
| --- | --- |
| 401 | Failed to authenticate a user. This can happen due to the following reasons:<ul><li>the currently logged on user cannot authenticate as the specified Company User;</li><li>the specified Company User does not exist;</li><li>the access token provided in the request is incorrect.</li></ul> |
| 403 | The access token is missing in the request. |
| 422 | The Company User Id format is incorrect. |
 
##  Accessing B2B Resources
After impersonating as a Company User, you can access the resources provided to B2B customers using the access token received via the **/company-user-access-tokens** endpoint. When accessing the resources, you need to pass the token in the Authorization header. For details, see [Accessing Resources](https://documentation.spryker.com/docs/en/authentication-and-authorization#accessing-resources).

## Refreshing the Access Token
You can refresh an access token issued for a Company User the same as any other access token issued by Glue API. For details, see [Refreshing Tokens](https://documentation.spryker.com/docs/en/authentication-and-authorization#refreshing-tokens).

