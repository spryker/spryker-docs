---
title: "Backend API: Manage company business units"
description: Learn how to retrieve, create, update, and delete company business units in your Spryker shop using the Spryker Backend API.
last_updated: Sep 20, 2026
template: glue-api-backend-guide-template
---

This document describes how to manage company business units using the Backend API. A business unit is a department, branch, or site of a company, and company users are assigned to one. You can use these endpoints to build Back Office extensions, CRM and ERP integrations, and onboarding automation.

## Installation

These endpoints are implemented using API Platform. To install and enable it, see [Enable API Platform](/docs/integrations/spryker-api/api-platform/enablement.html).

For the modules that provide the business unit endpoints and their installation instructions, see [Install the Company Business Units Backend API](/docs/pbc/all/customer-relationship-management/latest/base-shop/install-and-upgrade/install-glue-api/install-the-company-business-units-backend-api.html).

## Conventions

Request headers, pagination, and the filter and sort syntax are the same for every Backend API resource—see [Backend API conventions](/docs/integrations/spryker-api/backend-api/developing-apis/create-and-change-backend-api-conventions.html). This page lists only what is specific to business units.

## Retrieve business units

To retrieve a paginated collection of business units, send the request:

***
`GET` **/company-business-units**
***

### Request

| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
| --- | --- | --- |
| q | Searches the collection partially and case-insensitively across the business unit name, the name of the company it belongs to, and the name of its parent business unit. | Any string. |
| filter[company-business-units.name] | Filters the collection by a partial business unit name, matched case-insensitively. | Any string. |
| sort | Sorts the collection by the given field. Prefix a field with `-` to sort in descending order. | name, companyName, parentName |

`name` is the only filterable property; a filter addressing any other property returns `400` with the error code `1215`.

`q` and the name filter can be combined: the collection then contains the business units that match both.

{% info_block infoBox "Ordering" %}

Without a `sort` parameter, the most recently created business unit leads. The collection is ordered deterministically, so paging through it never repeats or skips a business unit.

{% endinfo_block %}

| REQUEST | USAGE |
| --- | --- |
| `GET https://glue-backend.mysprykershop.com/company-business-units` | Retrieve the first page of business units. |
| `GET https://glue-backend.mysprykershop.com/company-business-units?page[limit]=50&page[offset]=100` | Retrieve 50 business units, skipping the first 100. |
| `GET https://glue-backend.mysprykershop.com/company-business-units?q=procurement` | Retrieve the business units whose name, company name, or parent name contains `procurement`. |
| `GET https://glue-backend.mysprykershop.com/company-business-units?filter[company-business-units.name]=acme` | Retrieve the business units whose name contains `acme`. |
| `GET https://glue-backend.mysprykershop.com/company-business-units?sort=-name` | Retrieve business units in descending name order. |
| `GET https://glue-backend.mysprykershop.com/company-business-units?sort=companyName` | Retrieve business units grouped by the name of the company they belong to. |

### Response

<details>
  <summary>Response sample: retrieve business units</summary>

```json
{
    "links": {
        "self": "https://glue-backend.mysprykershop.com/company-business-units",
        "first": "https://glue-backend.mysprykershop.com/company-business-units?page[limit]=10&page[offset]=0",
        "last": "https://glue-backend.mysprykershop.com/company-business-units?page[limit]=10&page[offset]=10",
        "next": "https://glue-backend.mysprykershop.com/company-business-units?page[limit]=10&page[offset]=10"
    },
    "meta": {
        "pagination": {
            "numFound": 14,
            "currentPage": 1,
            "maxPage": 2,
            "currentItemsPerPage": 10
        }
    },
    "data": [
        {
            "type": "company-business-units",
            "id": "4d1b3f9a-9d4c-5c1e-9f6b-2b5a7c8d9e01",
            "attributes": {
                "uuid": "4d1b3f9a-9d4c-5c1e-9f6b-2b5a7c8d9e01",
                "name": "Acme Procurement",
                "companyUuid": "0818f408-cc84-575d-ad54-92118a0e4273",
                "parentBusinessUnitUuid": "b7c2e4d6-1a3f-5b8c-9d0e-4f6a8b2c1d3e",
                "iban": "DE89370400440532013000",
                "bic": "DEUTDEFF",
                "phone": "+49 30 234567890",
                "addressUuids": [
                    "9f2c7b41-5d8e-5a3c-b06f-1e4d7a9c2b58"
                ]
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/company-business-units/4d1b3f9a-9d4c-5c1e-9f6b-2b5a7c8d9e01"
            }
        }
    ]
}
```

</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| uuid | String | Public unique identifier of the business unit. Use it to address the business unit in subsequent operations. |
| name | String | Name of the business unit. |
| companyUuid | String | Identifier of the company the business unit belongs to. |
| parentBusinessUnitUuid | String | Identifier of the business unit this one reports to, or `null` when it has no parent. |
| iban | String | International Bank Account Number of the business unit. |
| bic | String | Business Identifier Code of the account held by the business unit. |
| phone | String | Contact phone number of the business unit. |
| addressUuids | Array | Identifiers of the addresses assigned to this business unit. |

## Retrieve a business unit

To retrieve a single business unit, send the request:

***
`GET` {% raw %}**/company-business-units/*{{business_unit_uuid}}***{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{business_unit_uuid}}***{% endraw %} | UUID of the business unit to retrieve. To obtain it, [retrieve business units](#retrieve-business-units). |

### Response

The response contains one business unit, with the same attributes as [Retrieve business units](#retrieve-business-units).

## Create a business unit

To create a business unit, send the request:

***
`POST` **/company-business-units**
***

### Request

Request sample: `POST https://glue-backend.mysprykershop.com/company-business-units`

```json
{
    "data": {
        "type": "company-business-units",
        "attributes": {
            "name": "Acme Procurement",
            "companyUuid": "0818f408-cc84-575d-ad54-92118a0e4273",
            "addressUuids": ["9f2c7b41-5d8e-5a3c-b06f-1e4d7a9c2b58"]
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| name | String | &check; | Name of the business unit. At most 100 characters, and never blank. |
| companyUuid | String | &check; | Identifier of the company the business unit belongs to. Must be a UUID. |
| parentBusinessUnitUuid | String |  | Identifier of the business unit this one reports to. Must be a UUID, and must belong to the same company. |
| iban | String |  | International Bank Account Number. At most 100 characters. |
| bic | String |  | Business Identifier Code. At most 100 characters. |
| phone | String |  | Contact phone number. At most 20 characters. |
| addressUuids | Array |  | Identifiers of the addresses to assign to the business unit. Each must be a UUID of an existing address of the same company. Omit it, or send an empty array, to create the business unit without addresses. |

{% info_block infoBox "Addresses are assigned, not created" %}

`addressUuids` assigns addresses that already exist; it does not create them. Create the addresses first with [Create a business unit address](/docs/pbc/all/customer-relationship-management/latest/base-shop/manage-using-glue-api/company-account/backend-api-manage-company-business-unit-addresses.html#create-a-business-unit-address), then pass their uuids here. An address belonging to another company is rejected with `422` and error code `1229`, and an address that does not exist with `404` and error code `1227`. A value that is not a uuid is refused by the request schema before anything is looked up, and that response carries the schema error on its own—`901`, naming the position of the entry, such as `addressUuids.2`. Once the list is well formed, the whole of it is checked before the request is refused, so the response carries one error entry per rejected entry rather than stopping at the first: `1227` for a uuid no address matches and `1229` for an address of another company. A list whose only problem is addresses nobody can find answers `404`; if any entry is rejected rather than missing, the request answers `422`.

{% endinfo_block %}

### Response

<details>
  <summary>Response sample: create a business unit</summary>

```json
{
    "data": {
        "type": "company-business-units",
        "id": "4d1b3f9a-9d4c-5c1e-9f6b-2b5a7c8d9e01",
        "attributes": {
            "uuid": "4d1b3f9a-9d4c-5c1e-9f6b-2b5a7c8d9e01",
            "name": "Acme Procurement",
            "companyUuid": "0818f408-cc84-575d-ad54-92118a0e4273",
            "parentBusinessUnitUuid": null,
            "iban": null,
            "bic": null,
            "phone": null,
            "addressUuids": ["9f2c7b41-5d8e-5a3c-b06f-1e4d7a9c2b58"]
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/company-business-units/4d1b3f9a-9d4c-5c1e-9f6b-2b5a7c8d9e01"
        }
    }
}
```

</details>

A successful request returns the `201 Created` status code. The response contains the `uuid` that you can use to address the business unit in subsequent requests, and the addresses assigned to it.

## Edit a business unit

To update a business unit, send the request:

***
`PATCH` {% raw %}**/company-business-units/*{{business_unit_uuid}}***{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{business_unit_uuid}}***{% endraw %} | UUID of the business unit to update. To get it, [retrieve business units](#retrieve-business-units). |

### Request

Request sample: `PATCH https://glue-backend.mysprykershop.com/company-business-units/4d1b3f9a-9d4c-5c1e-9f6b-2b5a7c8d9e01`

```json
{
    "data": {
        "type": "company-business-units",
        "attributes": {
            "phone": "+49 30 234567890"
        }
    }
}
```

The request accepts the same writable attributes as [Create a business unit](#create-a-business-unit), and all of them are optional. The endpoint applies only the attributes present in the payload; every attribute you omit keeps its stored value.

In addition, `addressUuids` can be sent on update, with the same meaning it has on create:

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| addressUuids | Array | Identifiers of the addresses assigned to this business unit. The addresses must belong to the same company; one that belongs to another is rejected with error code `1229`. |

{% info_block infoBox "addressUuids replaces the whole set" %}

Sending `addressUuids` replaces the current assignment rather than adding to it, so send every address that should stay assigned. An empty array unassigns all of them, and leaving the attribute out keeps the current assignment untouched.

{% endinfo_block %}

To detach a business unit from its parent, send `parentBusinessUnitUuid` as `null`:

```json
{
    "data": {
        "type": "company-business-units",
        "attributes": {
            "parentBusinessUnitUuid": null
        }
    }
}
```

{% info_block warningBox "The owning company is fixed" %}

A business unit belongs to the company it was created for, for its lifetime. Sending `companyUuid` on update is rejected with `422` rather than ignored. To move the work to another company, create a business unit there.

{% endinfo_block %}

A parent that would make the business unit its own ancestor is rejected with `422` and the error code `1225`, and a parent that belongs to another company with the error code `1226`.

### Response

The response contains the updated business unit, with the same attributes as [Retrieve a business unit](#retrieve-a-business-unit).

## Delete a business unit

To delete a business unit, send the request:

***
`DELETE` {% raw %}**/company-business-units/*{{business_unit_uuid}}***{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{business_unit_uuid}}***{% endraw %} | UUID of the business unit to delete. To get it, [retrieve business units](#retrieve-business-units). |

### Response

A successful request returns the `204 No Content` status code with an empty body.

{% info_block warningBox "What deletion touches" %}

Business units that have the deleted one as their parent are left without a parent rather than deleted with it. Addresses assigned to it stay with the company but lose the assignment.

A business unit that still has company users assigned cannot be deleted; the request returns `422` with the error code `1224`. Reassign or remove those company users first.

{% endinfo_block %}

## Possible errors

| CODE  | REASON |
| --- | --- |
| 011 | A filter key is not in the `filter[company-business-units.<property>]` form. |
| 901 | The request body failed schema validation. Each error names the rejected attribute in `source.pointer`, and an entry of `addressUuids` that is not a uuid is named by its position, such as `addressUuids.2`. |
| 1203 | The `sort` parameter names a field that the collection does not support. |
| 1213 | No company matches `companyUuid`. |
| 1215 | A filter addresses a property other than `name`. |
| 1217 | No business unit matches the given UUID. |
| 1222 | The business unit was rejected by the domain. |
| 1223 | No business unit matches `parentBusinessUnitUuid`. |
| 1224 | The business unit still has company users assigned and cannot be deleted. |
| 1225 | The given parent would make the business unit its own ancestor. |
| 1226 | The given parent belongs to another company. |
| 1227 | No address matches an entry of `addressUuids`. |
| 1229 | An entry of `addressUuids` belongs to another company. |

To view generic errors, see [API errors and troubleshooting](/docs/integrations/spryker-api/spryker-api-errors-and-troubleshooting.html).
