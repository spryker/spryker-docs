---
title: Retrieving Company User Information
description: The article provides information on how to retrieve information on company user accounts via endpoints provided by Spryker Glue API.
last_updated: Sep 14, 2020
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/v5/docs/retrieving-company-user-information-201907
originalArticleId: f84a4096-0877-4370-8df2-52ba5b6c4b93
redirect_from:
  - /v5/docs/retrieving-company-user-information-201907
  - /v5/docs/en/retrieving-company-user-information-201907
related:
  - title: Logging In as Company User
    link: docs/scos/dev/glue-api-guides/page.version/managing-b2b-account/authenticating-as-a-company-user.html
  - title: Retrieving Company Information
    link: docs/scos/dev/glue-api-guides/page.version/managing-b2b-account/retrieving-companies.html
  - title: Retrieving Company Role Information
    link: docs/scos/dev/glue-api-guides/page.version/managing-b2b-account/retrieving-company-roles.html
  - title: Retrieving Business Unit Information
    link: docs/scos/dev/glue-api-guides/page.version/managing-b2b-account/retrieving-business-units.html
  - title: Company Account and General Organizational Structure
    link: docs/scos/user/features/page.version/company-account-feature-overview/company-accounts-overview.html
---

The [Company Account](/docs/scos/user/features/{{page.version}}/company-account-feature-overview/company-accounts-overview.html) feature provided by Spryker Commerce OS allows corporate customers to create [Company User Accounts](/docs/scos/user/features/{{page.version}}/company-account-feature-overview/company-accounts-overview.html) for their employees. This capability enables customers to organize purchasing activities in their companies. Company Accounts are typically organized in Business Units depending on the job roles they perform. Any user can impersonate as multiple Company Accounts they have access to, which provides them the freedom to organize their work when performing different roles in a company.

The **Company Accounts API** provides REST access to retrieving Company User information.

{% info_block warningBox "Authentication" %}
The endpoints provided by this API cannot be accessed anonymously. To access them, you need to impersonate users as Company Accounts and pass the authentication tokens received. For details on how to authenticate and retrieve such a token, see [Logging In as Company User](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/authenticating-as-a-company-user.html).
{% endinfo_block %}

In your development, the API can help you to provide information on *Company User Accounts* within the company that the authenticated user belongs to.

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see [Glue API: Company Account Feature Integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-company-account-feature-integration.html).

## Retrieving All Company Users
To retrieve a list of all the Company Users that belong to the company of the logged in user, send a GET request to the following endpoint:

/company-users

Sample request: *GET http://glue.mysprykershop.com/company-users*

{% info_block warningBox "Authentication Required" %}
To get a list of Company Users, you need to authenticate first and pass an access token as a part of your request. For details, see [Authentication and Authorization](/docs/scos/dev/glue-api-guides/{{page.version}}/authentication-and-authorization.html).
{% endinfo_block %}

### Response
The endpoint responds with a **RestCompanyUserCollectionResponse** that contains the Company Users in the company of the logged in user.

**Response Attributes:**

| Attribute* | Type | Description |
| --- | --- | --- |
| isActive | Boolean | Indicates whether the Company User is active. |
| isDefault | Boolean | Indicates whether the Company User is the default one for the logged in customer. |

*The attributes mentioned are all attributes in the response. Type and ID are not mentioned.

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
                "self": "http://glue.mysprykershop.com/company-users/3692d238-acb3-5b7e-8d24-8dab9c1f4505"
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
        "self": "http://glue.mysprykershop.com/company-users"
    }
}
```

<br>
</details>

## Retrieving Available Company Users
To retrieve a list of the Company Users that the currently logged in user can impersonate as, send a GET request to the following endpoint:

/company-users/mine

Sample request: *GET http://glue.mysprykershop.com/company-users/mine*

{% info_block warningBox "Authentication Required" %}
To get a list of Company Users, you need to authenticate first and pass an access token as a part of your request. For details, see [Authentication and Authorization](/docs/scos/dev/glue-api-guides/{{page.version}}/authentication-and-authorization.html).
{% endinfo_block %}

### Response
The endpoint responds with a **RestCompanyUserCollectionResponse** that contains the Company Users available to the currently logged in user.

{% info_block infoBox "Info" %}
If the currently logged in user does not have access to any Company User accounts, the endpoint returns an empty **RestCompanyUserCollectionResponse** response.
{% endinfo_block %}

**Response Attributes:**

| Attribute* | Type | Description |
| --- | --- | --- |
| id | String | Specifies the Company User ID. |
| isActive | Boolean | Indicates whether the Company User is active. |
| isDefault | Boolean | Indicates whether the Company User is the default one for the logged in customer. |

*The attributes mentioned are all attributes in the response. Type is not mentioned.

{% info_block warningBox "Note" %}
The company user identifier contained in the id member can be used to access the Company User in the future as well as impersonate as that account. For details, see [Logging In as Company User](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/authenticating-as-a-company-user.html).
{% endinfo_block %}

<details open>
<summary markdown='span'>Sample Response</summary>

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

<br>
</details>

## Retrieving Specific Company Users
To retrieve information on a specific Company User, send a GET request to the following endpoint:

/company-users/{% raw %}{{{% endraw %}company_user_id{% raw %}}}{% endraw %}

Sample request: *GET http://glue.mysprykershop.com/company-users/e1019900-88c4-5582-af83-2c1ea8775ac5*

{% info_block warningBox "Authentication Required" %}
To get information on a Company User, you need to authenticate first and pass an access token as a part of your request. For details, see [Authentication and Authorization](/docs/scos/dev/glue-api-guides/{{page.version}}/authentication-and-authorization.html).
{% endinfo_block %}

### Response
The endpoint responds with a **RestCompanyUserResponse** that contains information on the requested Company User.

{% info_block infoBox "Info" %}
If the currently logged in user does not have access to the specified Company User account, the endpoint responds with the **404 Not Found** status code.
{% endinfo_block %}

**Response Attributes:**

| Attribute* | Type | Description |
| --- | --- | --- |
| isActive | Boolean | Indicates whether the Company User is active. |
| isDefault | Boolean | Indicates whether the Company User is the default one for the logged in customer. |

*The attributes mentioned are all attributes in the response. Type is not mentioned.

<details open>
<summary markdown='span'>Sample Response</summary>

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
            "self": "http://glue.mysprykershop.com/company-users/e1019900-88c4-5582-af83-2c1ea8775ac5"
        }
    }
}
```

<br>
</details>

## Fetching Additional Information
To help customers understand which of the Company User Accounts they need, you can provide additional information, such as the company and business unit that each account belongs to. Also, you can identify which roles the corporate accounts can perform within the company. To fetch such information, extend the response of the endpoint with the companies and company-business-units, and company-roles resource relationships.

Sample request: *GET http://glue.mysprykershop.com/company-users/mine?**include=companies,company-business-units,company-roles***

In this case, the following additional attributes will be added to the response:

| Resource | Attribute* | Type | Description |
| --- | --- | --- | --- |
| companies | name | String | Specifies the name of the Company. |
| companies | isActive | Boolean | Indicates whether the Company is active. |
| companies | status | String | Specifies the status of the Company. Possible values: *Pending*, *Approved* or *Denied*. |
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
<summary markdown='span'>Sample Response</summary>

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

<br>
</details>

### Possible Errors

| Status | Reason |
| --- | --- |
| 401 | The access token is invalid. |
| 403 | The access token is missing.<br>- OR -<br>The current Company Account is not set.<br>This can occur if you didn't properly impersonate the user as a Company User Account. For details on how to do so, see [Logging In as Company User](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/authenticating-as-a-company-user.html). |
| 404 | The specified Company User was not found or the user does not have permissions to view the account. |
