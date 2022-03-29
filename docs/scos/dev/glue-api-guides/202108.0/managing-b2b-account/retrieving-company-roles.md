---
title: Retrieving company roles
description: Learn how to retrieve company roles via Glue API.
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-company-roles
originalArticleId: 91e7d4fb-7088-4249-bb24-c146c3a63ea4
redirect_from:
  - /2021080/docs/retrieving-company-roles
  - /2021080/docs/en/retrieving-company-roles
  - /docs/retrieving-company-roles
  - /docs/en/retrieving-company-roles
related:
  - title: Logging In as Company User
    link: docs/scos/dev/glue-api-guides/page.version/managing-b2b-account/authenticating-as-a-company-user.html
  - title: Retrieving Company Information
    link: docs/scos/dev/glue-api-guides/page.version/managing-b2b-account/retrieving-companies.html
  - title: Retrieving Company User Information
    link: docs/scos/dev/glue-api-guides/page.version/managing-b2b-account/retrieving-company-users.html
  - title: Company User Roles and Permissions Feature Overview
    link: docs/scos/user/features/page.version/company-account-feature-overview/company-user-roles-and-permissions-overview.html
  - title: Authentication and Authorization
    link: docs/scos/dev/glue-api-guides/page.version/managing-customers/authenticating-as-a-customer.html
---

In corporate environments, where users act as company representatives rather than private buyers, companies can leverage [Company Roles](/docs/scos/user/features/{{page.version}}/company-account-feature-overview/company-user-roles-and-permissions-overview.html) to distribute scopes and permissions among [Company Users](/docs/scos/user/features/{{page.version}}/company-account-feature-overview/company-accounts-overview.html). This endpoint allows retrieving information about the company roles.

## Installation
For detailed information on the modules that provide the API functionality and related installation instructions, see [Glue API: Company Account Feature Integration](/docs/scos/dev/feature-integration-guides/{{page.version}}/glue-api/glue-api-company-account-feature-integration.html).

## Retrieve a company role

To retrieve a company role, send the request:

***
`GET` **/company-roles/*{% raw %}{{{% endraw %}company_role_id{% raw %}}}{% endraw %}***
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| ***{% raw %}{{{% endraw %}company_role_id{% raw %}}}{% endraw %}*** | Unique identifier of a company role to retrieve. Enter `mine` to retrieve the company role of the current authenticated company user. |

### Request

| HEADER KEY | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | String containing digits, letters, and symbols that authorize the company user. [Authenticate as a company user](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/authenticating-as-a-company-user.html#authenticate-as-a-company-user) to get the value. |

| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
| --- | --- | --- |
| Include | Adds resource relationships to the request. |  |

| REQUEST | USAGE |
| --- | --- |
| GET https://glue.mysprykershop.com/company-roles/mine | Retrieve all the copmany roles of the current authenticated company user. |
| GET https://glue.mysprykershop.com/company-roles/2f0a9d3e-9e69-53eb-8518-284a0db04376 | Retrieve the company role with the id `2f0a9d3e-9e69-53eb-8518-284a0db04376`. |
| GET https://glue.mysprykershop.com/company-roles/2f0a9d3e-9e69-53eb-8518-284a0db04376?include=companies | Retrieve the company role with the id `2f0a9d3e-9e69-53eb-8518-284a0db04376` with related companies included. |

#### Response

<details>
<summary markdown='span'>Response sample of company roles of the current authenticated company user</summary>

```json
{
    "data": [
        {
            "type": "company-roles",
            "id": "2f0a9d3e-9e69-53eb-8518-284a0db04376",
            "attributes": {
                "name": "Admin",
                "isDefault": true
        },
        "links": {
            "self": "https://glue.mysprykershop.com/company-roles/2f0a9d3e-9e69-53eb-8518-284a0db04376"
        }
    }
    ],
    "links": {
        "self": "https://glue.mysprykershop.com/company-roles/mine"
    }
}
```
</details>


<details>
<summary markdown='span'>Response sample of a particular company role</summary>

```json
{
    "data": {
        "type": "company-roles",
        "id": "2f0a9d3e-9e69-53eb-8518-284a0db04376",
        "attributes": {
            "name": "Admin",
            "isDefault": true
        },
        "links": {
            "self": "https://glue.mysprykershop.com/company-roles/2f0a9d3e-9e69-53eb-8518-284a0db04376"
        }
    }
}
```

</details>


<details>
<summary markdown='span'>Response sample with companies</summary>

```json
{
    "data": {
        "type": "company-roles",
        "id": "2f0a9d3e-9e69-53eb-8518-284a0db04376",
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
                "self": "https://glue.mysprykershop.com/companies/0818f408-cc84-575d-ad54-92118a0e4273"
            }
        }
    ]
}
```

</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| name | String | Specifies the name of the Company Role |
| isDefault | Boolean | Indicates whether the Company Role is the default role for the company. |

| INCLUDED RESOURCE | ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- | --- |
| companies | name | String | Company name. |
| companies | isActive | Boolean | Indicates if the company is active. |
| companies | status | String | Company status. Possible values are: *Pending*, *Approved* or *Denied*. |

## Possible errors

| CODE | REASON |
| --- | --- |
| 001 | Authentication token is invalid. |
| 002 | Authentication token is missing. |
| 2101 | Company role is not found. |
| 2103 | Current company user is not set. Select the current company user with `/company-user-access-tokens` to access the resource collection. |

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/scos/dev/glue-api-guides/{{page.version}}/reference-information-glueapplication-errors.html).

##  Next steps

* [Retrieve business unit addresses](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/retrieving-business-unit-addresses.html)
* [Manage company user authentication tokens](/docs/scos/dev/glue-api-guides/{{page.version}}/managing-b2b-account/managing-company-user-authentication-tokens.html)
