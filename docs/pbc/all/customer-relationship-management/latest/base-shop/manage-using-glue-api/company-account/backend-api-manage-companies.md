---
title: "Backend API: Manage companies"
description: Learn how to retrieve, create, and update companies in your Spryker shop using the Spryker Backend API.
last_updated: Sep 17, 2026
template: glue-api-backend-guide-template
---

This document describes how to manage companies using the Backend API. You can use these endpoints to build Back Office extensions, CRM and ERP integrations, and onboarding automation.

## Installation

These endpoints are implemented using API Platform. To install and enable it, see [Enable API Platform](/docs/integrations/spryker-api/api-platform/enablement.html).

For the modules that provide the company endpoints and their installation instructions, see [Install the Companies Backend API](/docs/pbc/all/customer-relationship-management/latest/base-shop/install-and-upgrade/install-glue-api/install-the-companies-backend-api.html).

## Conventions

Request headers, pagination, and the filter and sort syntax are the same for every Backend API resource—see [Backend API conventions](/docs/integrations/spryker-api/backend-api/backend-api-conventions.html). This page lists only what is specific to companies.

## Retrieve companies

To retrieve a paginated collection of companies, send the request:

***
`GET` **/companies**
***

### Request

| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
| --- | --- | --- |
| filter[companies.name] | Filters the collection by a partial company name, matched case-insensitively. | Any string. |
| sort | Sorts the collection by the given field. Prefix a field with `-` to sort in descending order. | name, status, isActive |

{% info_block infoBox "Sorting by status" %}

`status` sorts by the lifecycle order `pending`, `approved`, `denied` rather than alphabetically, so pending companies lead. Without a `sort` parameter, the most recently created company leads. The collection is ordered deterministically, so paging through it never repeats or skips a company.

{% endinfo_block %}

`name` is the only filterable property; a filter addressing any other property returns `400` with the error code `1215`.

| REQUEST | USAGE |
| --- | --- |
| `GET https://glue-backend.mysprykershop.com/companies` | Retrieve the first page of companies. |
| `GET https://glue-backend.mysprykershop.com/companies?page[limit]=50&page[offset]=100` | Retrieve 50 companies, skipping the first 100. |
| `GET https://glue-backend.mysprykershop.com/companies?filter[companies.name]=acme` | Retrieve the companies whose name contains `acme`. |
| `GET https://glue-backend.mysprykershop.com/companies?sort=-name` | Retrieve companies in descending name order. |
| `GET https://glue-backend.mysprykershop.com/companies?sort=status` | Retrieve companies in the lifecycle order, pending first. |

### Response

<details>
  <summary>Response sample: retrieve companies</summary>

```json
{
    "links": {
        "self": "https://glue-backend.mysprykershop.com/companies?filter[companies.name]=acme",
        "first": "https://glue-backend.mysprykershop.com/companies?filter[companies.name]=acme&page[limit]=20&page[offset]=0",
        "last": "https://glue-backend.mysprykershop.com/companies?filter[companies.name]=acme&page[limit]=20&page[offset]=20",
        "prev": "https://glue-backend.mysprykershop.com/companies?filter[companies.name]=acme&page[limit]=20&page[offset]=0"
    },
    "meta": {
        "pagination": {
            "numFound": 27,
            "currentPage": 2,
            "maxPage": 2,
            "currentItemsPerPage": 20
        }
    },
    "data": [
        {
            "type": "companies",
            "id": "0818f408-cc84-575d-ad54-92118a0e4273",
            "attributes": {
                "uuid": "0818f408-cc84-575d-ad54-92118a0e4273",
                "name": "Acme Corporation",
                "status": "approved",
                "isActive": true
            },
            "links": {
                "self": "https://glue-backend.mysprykershop.com/companies/0818f408-cc84-575d-ad54-92118a0e4273"
            }
        }
    ]
}
```

</details>

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| uuid | String | Public unique identifier of the company. Use it to address the company in subsequent operations. |
| name | String | Name of the company. |
| status | String | Approval status of the company: `pending`, `approved`, or `denied`. |
| isActive | Boolean | Whether the company is active. |

## Retrieve a company

To retrieve a single company, send the request:

***
`GET` {% raw %}**/companies/*{{company_uuid}}***{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{company_uuid}}***{% endraw %} | UUID of the company to retrieve. To obtain it, [retrieve companies](#retrieve-companies). |

### Request

| REQUEST | USAGE |
| --- | --- |
| `GET https://glue-backend.mysprykershop.com/companies/0818f408-cc84-575d-ad54-92118a0e4273` | Retrieve the company with the given UUID. |

### Response

<details>
  <summary>Response sample: retrieve a company</summary>

```json
{
    "data": {
        "type": "companies",
        "id": "0818f408-cc84-575d-ad54-92118a0e4273",
        "attributes": {
            "uuid": "0818f408-cc84-575d-ad54-92118a0e4273",
            "name": "Acme Corporation",
            "status": "approved",
            "isActive": true
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/companies/0818f408-cc84-575d-ad54-92118a0e4273"
        }
    }
}
```

</details>

The response contains the same attributes as [Retrieve companies](#retrieve-companies), without the `meta.pagination` object.

A UUID that matches no company returns `404` with the error code `1213`.

## Create a company

To create a company, send the request:

***
`POST` **/companies**
***

### Request

Request sample: `POST https://glue-backend.mysprykershop.com/companies`

```json
{
    "data": {
        "type": "companies",
        "attributes": {
            "name": "Acme Corporation"
        }
    }
}
```

| ATTRIBUTE | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| name | String | &check; | Name of the company. At most 100 characters, and never blank. |
| status | String |  | Approval status of the company. Defaults to `pending`. |
| isActive | Boolean |  | Whether the company is active. Defaults to `false`. |

A company created without `status` or `isActive` is pending and inactive, exactly as a company created in the Back Office. To create an approved and active company, send all three attributes:

```json
{
    "data": {
        "type": "companies",
        "attributes": {
            "name": "Acme Corporation",
            "status": "approved",
            "isActive": true
        }
    }
}
```

{% info_block infoBox "Strict booleans" %}

`isActive` accepts a JSON boolean, or the string `"true"` or `"false"`. Any other value is rejected rather than coerced, so `1`, `0`, and `"yes"` return a validation error instead of silently activating or deactivating a company.

{% endinfo_block %}

### Response

<details>
  <summary>Response sample: create a company</summary>

```json
{
    "data": {
        "type": "companies",
        "id": "0818f408-cc84-575d-ad54-92118a0e4273",
        "attributes": {
            "uuid": "0818f408-cc84-575d-ad54-92118a0e4273",
            "name": "Acme Corporation",
            "status": "pending",
            "isActive": false
        },
        "links": {
            "self": "https://glue-backend.mysprykershop.com/companies/0818f408-cc84-575d-ad54-92118a0e4273"
        }
    }
}
```

</details>

A successful request returns the `201 Created` status code. The response contains the `uuid` that you can use to address the company in subsequent requests.

## Edit a company

To update a company, send the request:

***
`PATCH` {% raw %}**/companies/*{{company_uuid}}***{% endraw %}
***

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}***{{company_uuid}}***{% endraw %} | UUID of the company to update. To get it, [retrieve companies](#retrieve-companies). |

### Request

Request sample: `PATCH https://glue-backend.mysprykershop.com/companies/0818f408-cc84-575d-ad54-92118a0e4273`

```json
{
    "data": {
        "type": "companies",
        "attributes": {
            "status": "approved"
        }
    }
}
```

The request accepts the same writable attributes as [Create a company](#create-a-company), and all of them are optional. The endpoint applies only the attributes present in the payload; every attribute you omit keeps its stored value.

{% info_block infoBox "Status transitions" %}

On update, `status` accepts `approved` or `denied` only. You cannot change a company's status back to `pending` after it leaves that state.

{% endinfo_block %}

### Response

The response contains the updated company, with the same attributes as [Retrieve a company](#retrieve-a-company).

{% info_block warningBox "Companies are not deleted" %}

There is no endpoint that deletes a company. To take a company out of use, set `isActive` to `false`.

{% endinfo_block %}

## Possible errors

| CODE  | REASON |
| --- | --- |
| 011 | A filter key is not in the `filter[companies.<property>]` form. |
| 901 | The request body failed schema validation. Each error names the rejected attribute in `source.pointer`. |
| 1203 | The `sort` parameter names a field that the collection does not support. |
| 1213 | No company matches the given UUID. |
| 1214 | The company was rejected by the domain. |
| 1215 | A filter addresses a property other than `name`. |

To view generic errors, see [API errors and troubleshooting](/docs/integrations/spryker-api/spryker-api-errors-and-troubleshooting.html).
