---
title: "Backend API: Manage company role permissions"
description: Learn how to retrieve the permissions a company role can hold in your Spryker shop using the Spryker Backend API.
last_updated: Sep 28, 2026
template: glue-api-backend-guide-template
---

This document describes how to retrieve the permissions a company role can hold, using the Backend API. A permission is a capability a company grants its company users through a company role—approving a quote, adding a company user, managing a shopping list. The catalogue is defined by the permission plugins your project registers, so it is the same for every company.

The resource is read-only. Permissions cannot be created, changed, or deleted through the API; you assign them to a company role by putting their keys in the role's `permissionKeys`. See [Backend API: Manage company roles](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/company-account/backend-api-manage-company-roles.html).

## Installation

These endpoints are implemented using API Platform. To install and enable it, see [Enable API Platform](/docs/integrations/spryker-api/api-platform/enablement.html).

For the modules that provide the permission endpoint and their installation instructions, see [Install the Company Roles Backend API](/docs/pbc/all/customer-relationship-management/latest/base-shop/install-and-upgrade/install-glue-api/install-the-company-roles-backend-api.html).

## Conventions

Request headers, pagination, and the filter syntax are the same for every Backend API resource—see [Backend API conventions](/docs/integrations/spryker-api/backend-api/developing-apis/create-and-change-backend-api-conventions.html).

## Retrieve the available permissions

To retrieve a paginated collection of permissions, send the request:

***
`GET` **/company-role-permissions**
***

### Request

| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
| --- | --- | --- |
| filter[company-role-permissions.name] | Filters the collection by a partial permission name, matched case-insensitively. | Any string. |
| filter[company-role-permissions.localeName] | Locale the name filter is matched in. | Any locale available in the shop, such as `de_DE`. |

The default page size of this collection is 50.

{% info_block infoBox "Why the locale is a separate filter" %}

A permission name is translatable content, so it exists once per locale. `filter[company-role-permissions.name]` therefore needs to know which locale to match in.

Omit `filter[company-role-permissions.localeName]` and a permission matches when the fragment is found in any of its locales. Send it and only that locale is matched. A locale the shop does not have matches nothing, returning an empty collection rather than an error.

{% endinfo_block %}

| REQUEST | USAGE |
| --- | --- |
| `GET https://glue-backend.mysprykershop.com/company-role-permissions` | Retrieve the first page of permissions. |
| `GET https://glue-backend.mysprykershop.com/company-role-permissions?page[limit]=100` | Retrieve up to 100 permissions in one page. |
| `GET https://glue-backend.mysprykershop.com/company-role-permissions?filter[company-role-permissions.name]=company` | Retrieve the permissions whose name contains `company` in any locale. |
| `GET https://glue-backend.mysprykershop.com/company-role-permissions?filter[company-role-permissions.name]=firmen&filter[company-role-permissions.localeName]=de_DE` | Retrieve the permissions whose German name contains `firmen`. |

### Response

<details>
  <summary>Response sample: retrieve the available permissions</summary>

```json
{
    "links": {
        "self": "https://glue-backend.mysprykershop.com/company-role-permissions",
        "first": "https://glue-backend.mysprykershop.com/company-role-permissions?page[limit]=50&page[offset]=0",
        "last": "https://glue-backend.mysprykershop.com/company-role-permissions?page[limit]=50&page[offset]=0"
    },
    "meta": {
        "pagination": {
            "numFound": 9,
            "currentPage": 1,
            "maxPage": 1,
            "currentItemsPerPage": 50
        }
    },
    "data": [
        {
            "type": "company-role-permissions",
            "id": "AddCompanyUserPermissionPlugin",
            "attributes": {
                "key": "AddCompanyUserPermissionPlugin",
                "localizedNames": [
                    {
                        "localeName": "de_DE",
                        "name": "Firmennutzer hinzufügen"
                    },
                    {
                        "localeName": "en_US",
                        "name": "Add company users"
                    }
                ]
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/company-role-permissions/AddCompanyUserPermissionPlugin"
            }
        }
    ]
}
```

</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| key | String | Unique permission identifier, and the resource identifier. Put this value in a company role's `permissionKeys` to assign the permission. |
| localizedNames | Array | Human-readable permission name, one entry per locale available. |

Each entry of `localizedNames` has the following structure:

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| localeName | String | Locale this entry applies to, such as `en_US`. |
| name | String | Permission name in that locale. A locale with no translation for this permission carries the permission's own key instead of an empty name. |

{% info_block warningBox "The self link of an entry does not resolve" %}

Each entry carries a `links.self` pointing at `/company-role-permissions/{permission_key}`. There is no single-permission endpoint, so that URL returns `404` with the detail `This route does not aim to be called`. Read permissions from the collection; the key you need is already in the entry.

{% endinfo_block %}

{% info_block infoBox "Every locale is returned" %}

The permission name is translatable content, so the response carries every locale and the client picks the one it wants to display. The request locale narrows error messages, not content—sending `Accept-Language` does not reduce `localizedNames` to one entry.

{% endinfo_block %}

## Possible errors

This collection defines no error codes of its own. It rejects only what every Backend API resource rejects: a missing or expired access token (`401`), an operator without ACL access to the resource (`403`), and a malformed pagination parameter (`400`).

To view generic errors, see [API errors and troubleshooting](/docs/integrations/spryker-api/spryker-api-errors-and-troubleshooting.html).
