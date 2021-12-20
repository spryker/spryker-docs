---
title: Retrieving business units
description: Learn how to retrieve business units via Glue API.
last_updated: Feb 9, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/v6/docs/retrieving-business-units
originalArticleId: e5ab5468-6acc-473b-9fbc-97d544958f95
redirect_from:
  - /v6/docs/retrieving-business-units
  - /v6/docs/en/retrieving-business-units
related:
  - title: Logging In as Company User
    link: docs/scos/dev/glue-api-guides/page.version/managing-b2b-account/authenticating-as-a-company-user.html
  - title: Retrieving Company User Information
    link: docs/scos/dev/glue-api-guides/page.version/managing-b2b-account/retrieving-company-users.html
  - title: Retrieving Company Information
    link: docs/scos/dev/glue-api-guides/page.version/managing-b2b-account/retrieving-companies.html
  - title: Authentication and Authorization
    link: docs/scos/dev/glue-api-guides/page.version/managing-customers/authenticating-as-a-customer.html
  - title: Business Units Management Feature Overview
    link: docs/scos/user/features/page.version/company-account-feature-overview/business-units-overview.html
  - title: Company Account and General Organizational Structure
    link: docs/scos/user/features/page.version/company-account-feature-overview/company-accounts-overview.html
---

In the B2B world, users represent their companies rather than act on their own behalf. Such users, called [Company Accounts](/docs/scos/user/features/{{page.version}}/company-account-feature-overview/company-accounts-overview.html), are organized in business units depending on their job role and the scope of their activity. The endpoints allows retrieving business unit information.

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see [Glue API: Company Account Feature Integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-company-account-feature-integration.html).

## Retrieve a company business unit


To retrieve a business unit, send the request:

***
`GET` **/company-business-units/*{% raw %}{{{% endraw %}business_unit_id{% raw %}}}{% endraw %}***
***


| Path parameter | Description |
| --- | --- |
| ***{% raw %}{{{% endraw %}business_unit_id{% raw %}}}{% endraw %}*** | Unique identifier of a business unit to retireve information for. Enter `mine` to retireve information on the business unit of the current authenticated company user.  |



### Request

| Header key | Type | Required | Description |
| --- | --- | --- | --- |
| Authorization | string | &check; | String containing digits, letters, and symbols that authorize the company user. [Authenticate as a company user](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/authenticating-as-a-company-user.html#authenticate-as-a-company-user) to get the value.  |

| Query parameter | Description | Possible values |
| --- | --- | --- |
| Include | Adds resource relationships to the request. | companies, company-business-unit-addresses |




| Request | Usage |
| --- | --- |
| GET http://glue.mysprykershop.com/company-business-units/mine | Retrive business units of the current authenticated company user. |
| GET http://glue.mysprykershop.com/company-business-units/b8a06475-73f5-575a-b1e9-1954de7a49ef | Retrieve the business unit with the unique identifier `b8a06475-73f5-575a-b1e9-1954de7a49ef`. |
| GET http://glue.mysprykershop.com/company-business-units/32b44d30-3c2d-5f0a-91d3-e66adad10dc1?include=companies | Retrieve the business unit with the unique identifier `b8a06475-73f5-575a-b1e9-1954de7a49ef` and related companies included. |
| GET http://glue.mysprykershop.com/company-business-units/32b44d30-3c2d-5f0a-91d3-e66adad10dc1?include=company-business-unit-addresses | Retrieve the business unit with the unique identifier `b8a06475-73f5-575a-b1e9-1954de7a49ef` and related business unit addresses included.  |

#### Response


<details open>
    <summary markdown='span'>Response sample</summary>
    
```json
{
    "data": [
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
        }
    ],
    "links": {
        "self": "http://glue.mysprykershop.com/company-business-units/mine"
    }
}
```
    
</details>


<details open>
    <summary markdown='span'>Response sample with business units of a company user</summary>

```json
{
    "data": {
        "type": "company-business-units",
        "id": "b8a06475-73f5-575a-b1e9-1954de7a49ef",
        "attributes": {
            "name": "Hotel Tommy Berlin",
            "email": "hotel.tommy@spryker.com",
            "phone": "+49 (30) 1234 56789",
            "externalUrl": "",
            "bic": "OSDD DE 81 005",
            "iban": "DE 91 10000000 0123456789",
            "defaultBillingAddress": null
        },
        "links": {
            "self": "http://glue.mysprykershop.com/company-business-units/b8a06475-73f5-575a-b1e9-1954de7a49ef"
        }
    }
}
```
    
</details>


<details open>
    <summary markdown='span'>Response sample with companies</summary>

```json
{
    "data": {
        "type": "company-business-units",
        "id": "32b44d30-3c2d-5f0a-91d3-e66adad10dc1",
        "attributes": {...},
        "links": {...},
        "relationships": {
            "companies": {
                "data": [
                    {
                        "type": "companies",
                        "id": "0818f408-cc84-575d-ad54-92118a0e4273"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "companies",
            "id": "0818f408-cc84-575d-ad54-92118a0e4273",
            "attributes": {
                "isActive": true,
                "name": "Test Company",
                "status": "approved"
            },
            "links": {
                "self": "http://glue.mysprykershop.com/companies/0818f408-cc84-575d-ad54-92118a0e4273"
            }
        }
    ]
}
```
    
</details>

<details open>
    <summary markdown='span'>Response sample with company business unit addresses</summary>

```json
{
    "data": {
        "type": "company-business-units",
        "id": "32b44d30-3c2d-5f0a-91d3-e66adad10dc1",
        "attributes": {...},
        "links": {...},
        "relationships": {
            "company-business-unit-addresses": {
                "data": [
                    {
                        "type": "company-business-unit-addresses",
                        "id": "19a55c0d-7bf0-580c-a9e8-6edacdc1ecde"
                    }
                ]
            }
        }
    },
    "included": [
        {
            "type": "company-business-unit-addresses",
            "id": "19a55c0d-7bf0-580c-a9e8-6edacdc1ecde",
            "attributes": {
                "address1": "Kirncher Str.",
                "address2": "7",
                "address3": "",
                "zipCode": "10247",
                "city": "Berlin",
                "phone": "4902890031",
                "iso2Code": "DE",
                "comment": ""
            },
            "links": {
                "self": "http://glue.mysprykershop.com/company-business-unit-addresses/19a55c0d-7bf0-580c-a9e8-6edacdc1ecde"
            }
        }
    ]
}
```
    
</details>




| Attribute | Type | Description |
| --- | --- | --- |
| id | String | Specifies a unique identifier of the business unit. You can use the identifier to access the unit in the future. |
| name | String | Specifies the name of the business unit. |
| email | String | Specifies the email address of the business unit. |
| phone | String | Specifies the telephone number of the business unit. |
| externalUrl | String | Specifies the URL of the business unit's website. |
| bic | String | Specifies the Bank Identifier Code of the business unit. |
| iban | String | Specifies the International Bank Account Number of the business unit. |
| defaultBillingAddress | String | Specifies the ID of the business unit default billing address. For details on how to retrieve the actual address, see the *Retrieving Business Unit Addresses* section. |

| Included resource | Attribute | Type | Description |
| --- | --- | --- | --- |
| companies | name | String | Specifies the company name. |
| companies | isActive | Boolean | Indicates whether the company is active. |
| companies | status | String | Specifies the status of the company. Possible values: *Pending*, *Approved* or *Denied*. |
| company-business-unit-addresses | address1 | String | Specifies the 1st line of the business unit address. |
| company-business-unit-addresses | address2 | String | Specifies the 2nd line of the business unit address. |
| company-business-unit-addresses | address3 | String | Specifies the 3rd line of the business unit address. |
| company-business-unit-addresses | zipCode  | String | Specifies the ZIP code. |
| company-business-unit-addresses | city | String | Specifies the city. |
| company-business-unit-addresses | phone | String | Specifies the phone number of the business unit. |
| company-business-unit-addresses | iso2Code | String | Specifies an ISO 2 country code to use. |
| company-business-unit-addresses | comment  | String | Specifies an optional comment to the business unit. |
  

## Possible errors

| Status | Reason |
| --- | --- |
| 001 | Access token is invalid. |
| 002 | Access token is missing. |
| 1903 | Current company account is not set. |
| 1901 | Specified business unit was not found or the user does not have access to it. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/scos/dev/glue-api-guides/{{page.version}}/reference-information-glueapplication-errors.html).


##  Next steps

* [Retrieve company company roles](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/retrieving-company-roles.html)
* [Retrieve business unit addresses](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/retrieving-business-unit-addresses.html)
* [Manage company user authentication tokens](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/managing-company-user-authentication-tokens.html)
