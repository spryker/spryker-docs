---
title: "Glue API: Retrieve company roles"
description: Learn how to retrieve company roles via Glue API.
last_updated: Jun 16, 2021
template: glue-api-storefront-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/retrieving-company-roles
originalArticleId: 91e7d4fb-7088-4249-bb24-c146c3a63ea4
redirect_from:
  - /docs/scos/dev/glue-api-guides/201811.0/managing-b2b-account/retrieving-company-roles.html
  - /docs/scos/dev/glue-api-guides/201903.0/managing-b2b-account/retrieving-company-roles.html
  - /docs/scos/dev/glue-api-guides/202307.0/managing-b2b-account/retrieving-company-roles.html
related:
  - title: Retrieving companies
    link: docs/pbc/all/customer-relationship-management/page.version/base-shop/manage-using-glue-api/company-account/glue-api-retrieve-companies.html
  - title: Retrieving company users
    link: docs/pbc/all/customer-relationship-management/page.version/base-shop/manage-using-glue-api/company-account/glue-api-retrieve-company-users.html
  - title: "Glue API: Authenticating as a company user"
    link: docs/pbc/all/identity-access-management/page.version/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html
  - title: Managing company user authentication tokens
    link: docs/pbc/all/identity-access-management/page.version/manage-using-glue-api/glue-api-manage-company-user-authentication-tokens.html
  - title: Searching by company users
    link: docs/pbc/all/customer-relationship-management/page.version/base-shop/manage-using-glue-api/company-account/glue-api-search-by-company-users.html
  - title: Retrieving business units
    link: docs/pbc/all/customer-relationship-management/page.version/base-shop/manage-using-glue-api/company-account/glue-api-retrieve-business-units.html
  - title: Retrieving business unit addresses
    link: docs/pbc/all/customer-relationship-management/page.version/base-shop/manage-using-glue-api/company-account/glue-api-retrieve-business-unit-addresses.html
  - title: Company user roles and permissions overview
    link: docs/pbc/all/customer-relationship-management/page.version/base-shop/company-account-feature-overview/company-user-roles-and-permissions-overview.html
  - title: Authenticating as a customer
    link: docs/pbc/all/identity-access-management/page.version/manage-using-glue-api/glue-api-authenticate-as-a-customer.html
---

In corporate environments, where users act as company representatives rather than private buyers, companies can leverage [Company Roles](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/company-account-feature-overview/company-user-roles-and-permissions-overview.html) to distribute scopes and permissions among [Company Users](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/company-account-feature-overview/company-accounts-overview.html). This endpoint allows retrieving information about the company roles.

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see [Install the Company account Glue API](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/install-and-upgrade/install-glue-api/install-the-company-account-glue-api.html).

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
| Authorization | string | &check; | String containing digits, letters, and symbols that authorize the company user. [Authenticate as a company user](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-authenticate-as-a-company-user.html#authenticate-as-a-company-user) to get the value. |

| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
| --- | --- | --- |
| Include | Adds resource relationships to the request. |  |

| REQUEST | USAGE |
| --- | --- |
| `GET https://glue.mysprykershop.com/company-roles/mine` | Retrieve all the company roles of the current authenticated company user. |
| `GET https://glue.mysprykershop.com/company-roles/2f0a9d3e-9e69-53eb-8518-284a0db04376` | Retrieve the company role with the id `2f0a9d3e-9e69-53eb-8518-284a0db04376`. |
| `GET https://glue.mysprykershop.com/company-roles/2f0a9d3e-9e69-53eb-8518-284a0db04376?include=companies` | Retrieve the company role with the id `2f0a9d3e-9e69-53eb-8518-284a0db04376` with related companies included. |

#### Response

<details>
<summary>Response sample: Retrieve all the company roles of the current authenticated company user</summary>

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
<summary>Response sample: retrieve a company role with the unique identifier</summary>

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
<summary>Response sample: retrieve a company role with the unique identifier and include the related companies</summary>

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

To view generic errors that originate from the Glue Application, see [Reference information: GlueApplication errors](/docs/dg/dev/glue-api/{{page.version}}/old-glue-infrastructure/reference-information-glueapplication-errors.html).

##  Next steps

* [Retrieve business unit addresses](/docs/pbc/all/customer-relationship-management/{{page.version}}/base-shop/manage-using-glue-api/company-account/glue-api-retrieve-business-unit-addresses.html)
* [Manage company user authentication tokens](/docs/pbc/all/identity-access-management/{{page.version}}/manage-using-glue-api/glue-api-manage-company-user-authentication-tokens.html)
