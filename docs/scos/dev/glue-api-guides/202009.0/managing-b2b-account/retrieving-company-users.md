---
title: Retrieving company users
description: Learn how to retrieve company users via Glue API.
last_updated: Feb 9, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/v6/docs/retrieving-company-users
originalArticleId: e8755bf3-ef7c-4482-a278-f156203694dc
redirect_from:
  - /v6/docs/retrieving-company-users
  - /v6/docs/en/retrieving-company-users
related:
  - title: Logging In as Company User
    link: docs/scos/dev/glue-api-guides/page.version/managing-b2b-account/authenticating-as-a-company-user.html
  - title: Retrieving Company Information
    link: docs/scos/dev/glue-api-guides/page.version/managing-b2b-account/retrieving-companies.html
  - title: Retrieving Company Role Information
    link: docs/scos/dev/glue-api-guides/page.version/managing-b2b-account/retrieving-company-roles.html
  - title: Company Account and General Organizational Structure
    link: docs/scos/user/features/page.version/company-account-feature-overview/company-accounts-overview.html
---

This endpoint allows retrieving information about company users.

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see [Glue API: Company Account Feature Integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-company-account-feature-integration.html).

## Retrieve company users

To retrieve all the company users that belong to the company of the authenticated company user, send the request:

***
`GET`**/company-users**
***

### Request

| Header key | Required | Description |
| --- | --- | --- |
| Authorization | &check; | Alphanumeric string that authorizes the company user to send requests to protected resources. Get it by [authenticating as a company user](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/authenticating-as-a-company-user.html).  |

Sample request: `GET https://glue.mysprykershop.com/company-users`


### Response


<details open>
<summary markdown='span'>Sample Response</summary>
    
```json
{
    "data": [
        {
            "type": "company-users",
            "id": "3692d238-acb3-5b7e-8d24-8dab9c1f4505",
            "attributes": {
                "isActive": true,
                "isDefault": false
            },
            "links": {
                "self": "https://glue.mysprykershop.com/company-users/3692d238-acb3-5b7e-8d24-8dab9c1f4505"
            }
        },
        {
            "type": "company-users",
            "id": "4c677a6b-2f65-5645-9bf8-0ef3532bead1",
            "attributes": {
                "isActive": true,
                "isDefault": false
            },
            "links": {
                "self": "https://glue.mysprykershop.com/company-users/4c677a6b-2f65-5645-9bf8-0ef3532bead1"
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
                "self": "https://glue.mysprykershop.com/company-users/cfbe2644-a9bd-581b-977b-e72d1c9a9c54"
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
                "self": "https://glue.mysprykershop.com/company-users/e1019900-88c4-5582-af83-2c1ea8775ac5"
            }
        }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/company-users"
    }
}
```

</details>

| Attribute | Type | Description |
| --- | --- | --- |
| isActive | Boolean | Defines if the company user is active. |
| isDefault | Boolean | Defines if the company user is default for the authenticated company user. |



## Retrieve a company user

To retrieve information about a company user, send the request:

***
`GET` **/company-users/*{% raw %}{{{% endraw %}company_user_id{% raw %}}}{% endraw %}***
***


| Path parameter | Description |
| --- | --- |
| ***{% raw %}{{{% endraw %}company_user_id{% raw %}}}{% endraw %}***  | Unique identifier of a company user to retrieve information for. To get it, [retrieve company users](#retrieve-company-users). Enter `mine` to retrieve information on the company user available to the current authenticated company user. |


### Request


| Header key | Required | Description |
| --- | --- | --- |
| Authorization | &check; | Alphanumeric string that authorizes the company user to send requests to protected resources. Get it by [authenticating as a company user](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/authenticating-as-a-company-user.html).  |


| Query parameter | Description | Possible values |
| --- | --- | --- |
| Include | Adds resource relationships to the request. | companies, company-business-units, company-roles |


| Request | Usage |
| --- | --- |
| GET https://glue.mysprykershop.com/company-users/e1019900-88c4-5582-af83-2c1ea8775ac5 | Retrieve the company user with unique identifier `e1019900-88c4-5582-af83-2c1ea8775ac5`. |
| GET https://glue.mysprykershop.com/company-users/min?include=companies,company-business-units,company-roles | Retrieve copmany users and related companies, business units, and roles. |


### Response


<details open>
<summary markdown='span'>Response sample</summary>
    
```json
{
    "data": {
        "type": "company-users",
        "id": "e1019900-88c4-5582-af83-2c1ea8775ac5",
        "attributes": {
            "isActive": true,
            "isDefault": false
        },
        "links": {
            "self": "https://glue.mysprykershop.com/company-users/e1019900-88c4-5582-af83-2c1ea8775ac5"
        }
    }
}
```
    
</details>

<details open>
<summary markdown='span'>Response sample with companies, company business units and company roles</summary>
    
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
                "self": "https://glue.mysprykershop.com/company-users/cfbe2644-a9bd-581b-977b-e72d1c9a9c54?include=companies,company-business-units"
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
                "self": "https://glue.mysprykershop.com/companies/88efe8fb-98bd-5423-a041-a8f866c0f913"
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
                "self": "https://glue.mysprykershop.com/b2ea10b2-263a-5cd9-88dc-747309f0534a"
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
                "self": "https://glue.mysprykershop.com/company-business-units/35752ce6-e25f-5d04-8bef-d46b2c359695"
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
                "self": "https://glue.mysprykershop.com/company-business-units/5a6032dc-fbce-5d0d-9d57-11ade1947bac"
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
                "self": "https://glue.mysprykershop.com/company-roles/50c647a4-d27f-5d82-a587-1d0b7cc6b58d"
            }
        }
    ]
}
```
    
</details>





| Attribute | Type | Description |
| --- | --- | --- |
| isActive | Boolean | Defines if the company user is active. |
| isDefault | Boolean | Defines if the company user is default for the authenticated company user. |

| Included resource | Attribute | Type | Description |
| --- | --- | --- | --- |
| companies | name | String | Specifies the name of the company. |
| companies | isActive | Boolean | Indicates whether the company is active. |
| companies | status | String | Specifies the status of the company. Possible values: *Pending*, *Approved* or *Denied*. |
| company-roles | name | String | Specifies the name of the company role. |
| company-roles | isDefault | Boolean | Indicates whether the company role is the default role for the company. |
| company-business-units | name | String | Specifies the name of the business unit. |
| company-business-units | email | String | Specifies the email address of the business unit. |
| company-business-units | phone | String | Specifies the telephone number of the business unit. |
| company-business-units | externalUrl | String | Specifies the url of the website of the business unit. |
| company-business-units | bic | String | Specifies the bank identifier code of the business unit. |
| company-business-units | iban | String | Specifies the International bank account number of the business unit. |
| company-business-units | defaultBillingAddress | String | Specifies the default billing address of the business unit. |



## Possible errors

| Status | Reason |
| --- | --- |
| 001 | Access token is invalid. |
| 002 | Access token is missing.|
| 1403| Current company account is not set. |
| 1404 | Specified company user was not found or the user does not have permissions to view the account. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/scos/dev/glue-api-guides/{{page.version}}/reference-information-glueapplication-errors.html).

##  Next steps

* [Retrieve companies](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/retrieving-companies.html)
* [Retrieve business units](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/retrieving-business-units.html)
* [Retrieve company company roles](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/retrieving-company-roles.html)
* [Retrieve business unit addresses](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/retrieving-business-unit-addresses.html)
* [Manage company user authentication tokens](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/managing-company-user-authentication-tokens.html)
