---
title: "Backend API: Manage company roles"
description: Learn how to retrieve, create, update, and delete company roles in your Spryker shop using the Spryker Backend API.
last_updated: Sep 28, 2026
template: glue-api-backend-guide-template
---

This document describes how to manage company roles using the Backend API. A company role groups the permissions a company grants its company users—who may approve a quote, add a company user, or manage a shopping list. Every company user holds at least one role of their own company. You can use these endpoints to build Back Office extensions, CRM and ERP integrations, and onboarding automation.

## Installation

These endpoints are implemented using API Platform. To install and enable it, see [Enable API Platform](/docs/integrations/spryker-api/api-platform/enablement.html).

For the modules that provide the company role endpoints and their installation instructions, see [Install the Company Roles Backend API](/docs/pbc/all/customer-relationship-management/latest/base-shop/install-and-upgrade/install-glue-api/install-the-company-roles-backend-api.html).

## Conventions

Request headers, pagination, and the filter and sort syntax are the same for every Backend API resource—see [Backend API conventions](/docs/integrations/spryker-api/backend-api/developing-apis/create-and-change-backend-api-conventions.html). This page lists only what is specific to company roles.

## Retrieve company roles

To retrieve a paginated collection of company roles, send the request:

***
`GET` **/company-roles**
***

### Request

| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
| --- | --- | --- |
| q | Searches the collection partially and case-insensitively across the role name and the name of the company it belongs to. | Any string. |
| filter[company-roles.name] | Filters the collection by a partial role name, matched case-insensitively. | Any string. |
| filter[company-roles.companyName] | Filters the collection by a partial company name, matched case-insensitively. | Any string. |
| filter[company-roles.companyUuid] | Filters the collection down to the roles of one company, matched exactly. | UUID of a company. |
| filter[company-roles.isDefault] | Filters the collection by the default flag. | `true`, `false` |
| sort | Sorts the collection by the given field. Prefix a field with `-` to sort in descending order. | name, companyName, isDefault |

`name`, `companyName`, `companyUuid`, and `isDefault` are the filterable properties; a filter addressing any other property returns `400` with the error code `1215`, as does a filter whose value is not a scalar.

Filters combine with each other and with `q`. The collection then contains only the roles that match every criterion.

{% info_block infoBox "Ordering" %}

Without a `sort` parameter, the collection is ordered by the internal company role ID ascending, so the oldest role leads. That ID also breaks ties whenever you do sort—role names and company names are not unique—so the order is total and paging through the collection does not repeat or skip roles.

{% endinfo_block %}

| REQUEST | USAGE |
| --- | --- |
| `GET https://glue-backend.mysprykershop.com/company-roles` | Retrieve the first page of company roles. |
| `GET https://glue-backend.mysprykershop.com/company-roles?page[limit]=50&page[offset]=100` | Retrieve 50 company roles, skipping the first 100. |
| `GET https://glue-backend.mysprykershop.com/company-roles?q=approver` | Retrieve the company roles whose name or company name contains `approver`. |
| `GET https://glue-backend.mysprykershop.com/company-roles?filter[company-roles.companyUuid]=a0e4d1c8-6b47-5f19-9c2d-3f8b1e7a5d40` | Retrieve the company roles of one company. |
| `GET https://glue-backend.mysprykershop.com/company-roles?filter[company-roles.isDefault]=true` | Retrieve the default roles only. |
| `GET https://glue-backend.mysprykershop.com/company-roles?sort=-name` | Retrieve company roles in descending name order. |
| `GET https://glue-backend.mysprykershop.com/company-roles?sort=companyName` | Retrieve company roles grouped by the name of the company they belong to. |

### Response

<details>
  <summary>Response sample: retrieve company roles</summary>

```json
{
    "links": {
        "self": "https://glue-backend.mysprykershop.com/company-roles",
        "first": "https://glue-backend.mysprykershop.com/company-roles?page[limit]=10&page[offset]=0",
        "last": "https://glue-backend.mysprykershop.com/company-roles?page[limit]=10&page[offset]=10",
        "next": "https://glue-backend.mysprykershop.com/company-roles?page[limit]=10&page[offset]=10"
    },
    "meta": {
        "pagination": {
            "numFound": 12,
            "currentPage": 1,
            "maxPage": 2,
            "currentItemsPerPage": 10
        }
    },
    "data": [
        {
            "type": "company-roles",
            "id": "50c647a4-d27f-5d82-a587-1d0b7cc6b58d",
            "attributes": {
                "uuid": "50c647a4-d27f-5d82-a587-1d0b7cc6b58d",
                "name": "Approver",
                "isDefault": false,
                "companyUuid": "a0e4d1c8-6b47-5f19-9c2d-3f8b1e7a5d40",
                "companyName": "Acme Corporation",
                "permissionKeys": [
                    "AddCompanyUserPermissionPlugin",
                    "ApproveQuotePermissionPlugin"
                ]
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/company-roles/50c647a4-d27f-5d82-a587-1d0b7cc6b58d"
            }
        }
    ]
}
```

</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| uuid | String | Public unique identifier of the company role. Use it to address the role in subsequent operations. |
| name | String | Name of the company role. Unique within the company. |
| isDefault | Boolean | Whether this is the company's default role, which every newly created company user of that company is given. |
| companyUuid | String | Identifier of the company the role belongs to. |
| companyName | String | Name of the company the role belongs to. This is what `filter[company-roles.companyName]`, the `companyName` sort, and the free-text search match against. |
| permissionKeys | Array | Keys of the permissions this role holds. To learn what each key means, see [Backend API: Manage company role permissions](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/company-account/backend-api-manage-company-role-permissions.html). |

## Retrieve a company role

To retrieve a single company role, send the request:

***
`GET` {% raw %}**/company-roles/*{{company_role_uuid}}***{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{company_role_uuid}}***{% endraw %} | UUID of the company role to retrieve. To obtain it, [retrieve company roles](#retrieve-company-roles). |

### Response

The response contains one company role, with the same attributes as [Retrieve company roles](#retrieve-company-roles).

## Create a company role

To create a company role, send the request:

***
`POST` **/company-roles**
***

### Request

Request sample: `POST https://glue-backend.mysprykershop.com/company-roles`

```json
{
    "data": {
        "type": "company-roles",
        "attributes": {
            "name": "Approver",
            "companyUuid": "a0e4d1c8-6b47-5f19-9c2d-3f8b1e7a5d40",
            "permissionKeys": ["ApproveQuotePermissionPlugin"]
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| name | String | &check; | Name of the company role. At most 255 characters, never blank, and unique within the company. |
| companyUuid | String | &check; | Identifier of the company the role belongs to. Must be a UUID. |
| isDefault | Boolean |  | Whether the role becomes the company's default role. Defaults to `false`. |
| permissionKeys | Array |  | Keys of the permissions to assign. Each must be the key of a permission this installation offers. Omit it, or send an empty array, to create the role without permissions. |

{% info_block infoBox "Permissions are assigned, not created" %}

`permissionKeys` assigns permissions that this installation already offers. It does not create them—the permission catalogue cannot be created, changed, or deleted through this API. To list the keys you can assign, [retrieve the available permissions](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/company-account/backend-api-manage-company-role-permissions.html). A key no permission matches is rejected with `422` and error code `1233`.

{% endinfo_block %}

{% info_block infoBox "The first role of a company is not promoted automatically" %}

`isDefault` defaults to `false`, including for the first role created for a company. A company's default role is normally the one created together with the company itself, so a company whose roles are all created through this endpoint has no default until you request one explicitly.

{% endinfo_block %}

### Response

<details>
  <summary>Response sample: create a company role</summary>

```json
{
    "data": {
        "type": "company-roles",
        "id": "50c647a4-d27f-5d82-a587-1d0b7cc6b58d",
        "attributes": {
            "uuid": "50c647a4-d27f-5d82-a587-1d0b7cc6b58d",
            "name": "Approver",
            "isDefault": false,
            "companyUuid": "a0e4d1c8-6b47-5f19-9c2d-3f8b1e7a5d40",
            "companyName": "Acme Corporation",
            "permissionKeys": ["ApproveQuotePermissionPlugin"]
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/company-roles/50c647a4-d27f-5d82-a587-1d0b7cc6b58d"
        }
    }
}
```

</details>

A successful request returns the `201 Created` status code. The response contains the `uuid` that you can use to address the company role in subsequent requests, and the permissions assigned to it.

## Edit a company role

To update a company role, send the request:

***
`PATCH` {% raw %}**/company-roles/*{{company_role_uuid}}***{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{company_role_uuid}}***{% endraw %} | UUID of the company role to update. To get it, [retrieve company roles](#retrieve-company-roles). |

### Request

Request sample: `PATCH https://glue-backend.mysprykershop.com/company-roles/50c647a4-d27f-5d82-a587-1d0b7cc6b58d`

```json
{
    "data": {
        "type": "company-roles",
        "attributes": {
            "name": "Quote Approver"
        }
    }
}
```

The request accepts `name`, `isDefault`, and `permissionKeys`, and all of them are optional. The endpoint applies only the attributes present in the payload; every attribute you omit keeps its stored value.

{% info_block warningBox "permissionKeys replaces the whole set" %}

Sending `permissionKeys` replaces the role's current permissions rather than adding to it, so send every permission that should stay assigned. An empty array detaches all of them, and leaving the attribute out keeps the current set untouched—a request that changes only the name keeps the permissions.

Attributes the schema does not know are dropped rather than rejected. If you send the permissions under any name other than `permissionKeys`, the request still returns `200` and the stored permissions are left untouched, because the endpoint reads that as "no permissions given".

{% endinfo_block %}

To make a role the company's default, send `isDefault` as `true`:

```json
{
    "data": {
        "type": "company-roles",
        "attributes": {
            "isDefault": true
        }
    }
}
```

This promotes the role and demotes the company's previous default, so a company never holds more than one default role.

{% info_block warningBox "The default flag cannot be cleared" %}

Sending `isDefault` as `false` on the role that currently holds the flag is rejected with `422` and error code `1234`. A company keeps exactly one default role at all times—to move the default elsewhere, send `isDefault: true` on the role that should take over, which demotes this one.

{% endinfo_block %}

{% info_block warningBox "The owning company is fixed" %}

A company role belongs to the company it was created for, for its lifetime. Sending `companyUuid` on update is rejected with `422` and error code `1235` rather than ignored. To grant the same permissions in another company, create a role there.

{% endinfo_block %}

### Response

The response contains the updated company role, with the same attributes as [Retrieve a company role](#retrieve-a-company-role).

## Delete a company role

To delete a company role, send the request:

***
`DELETE` {% raw %}**/company-roles/*{{company_role_uuid}}***{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{company_role_uuid}}***{% endraw %} | UUID of the company role to delete. To get it, [retrieve company roles](#retrieve-company-roles). |

### Response

A successful request returns the `204 No Content` status code with an empty body.

{% info_block warningBox "What blocks deletion" %}

A role that is the company's default cannot be deleted; the request returns `422` with the error code `1231`. Make another role the default first, which demotes this one.

A role that still has company users assigned cannot be deleted either; the request returns `422` with the error code `1232`. Move those company users to another role first.

Deleting a role detaches the permissions assigned to it. The permissions themselves are not deleted—they stay available for other roles.

{% endinfo_block %}

## Possible errors

| CODE  | REASON |
| --- | --- |
| 011 | A filter key is not in the `filter[company-roles.<property>]` form. |
| 901 | The request body failed schema validation. Each error names the rejected attribute in `source.pointer`. |
| 1203 | The `sort` parameter names a field that the collection does not support. |
| 1213 | No company matches `companyUuid`. |
| 1215 | A filter addresses a property other than `name`, `companyName`, `companyUuid`, or `isDefault`, or its value is not a scalar. |
| 1218 | No company role matches the given UUID. |
| 1230 | The company role was rejected by the domain—the name is blank, longer than 255 characters, or already used within the company, or no company was given. |
| 1231 | The company role is the company's default role and cannot be deleted. |
| 1232 | The company role still has company users assigned and cannot be deleted. |
| 1233 | No permission matches an entry of `permissionKeys`. |
| 1234 | `isDefault` was cleared on the role that currently holds the flag. |
| 1235 | `companyUuid` was sent on update, and the owning company is immutable. |

To view generic errors, see [API errors and troubleshooting](/docs/integrations/spryker-api/spryker-api-errors-and-troubleshooting.html).
