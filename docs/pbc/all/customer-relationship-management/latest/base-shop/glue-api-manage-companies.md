---
title: "Glue API: Manage companies"
description: Retrieve, create, and update companies through the Companies Backend API, including the full attribute reference and update behavior.
last_updated: Sep 16, 2026
template: glue-api-storefront-guide-template
---

This document describes the `companies` resource of the [Companies Backend API](/docs/pbc/all/customer-relationship-management/base-shop/companies-backend-api.html).

## Installation

For detailed information on the modules that provide the API functionality and related installation instructions, see [Install the Companies Backend API](/docs/pbc/all/customer-relationship-management/base-shop/install-and-upgrade/install-glue-api/install-the-companies-backend-api.html).

## Authorization

All operations require an authenticated Back Office user. To get an access token, see [Authenticate as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html).

| HEADER KEY | TYPE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | ✓ | Access token of a Back Office user. Requests without a valid token return `401`. |
| Content-Type | string | ✓ | `application/vnd.api+json`. |

## Retrieve a company

To retrieve a company, send the request:

---
`GET` **/companies/{% raw %}{{uuid}}{% endraw %}**

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}{{uuid}}{% endraw %} | UUID of the company. |

### Request

```http
GET /companies/0818f408-cc84-575d-ad54-92118a0e4273
Authorization: Bearer <access_token>
```

### Response

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

## Retrieve companies

To retrieve a collection of companies, send the request:

---
`GET` **/companies**

---

| QUERY PARAMETER | DESCRIPTION |
| --- | --- |
| `filter[companies.name]` | Returns the companies whose name contains this fragment. Matched case-insensitively. |
| `sort` | Sort field, prefixed with `-` for descending order. Accepts `name`, `status`, and `isActive`. |
| `page[limit]` | Number of companies per page. The default is `10`. |
| `page[offset]` | Number of companies to skip. The default is `0`. |

Filter keys must include the `companies.` resource prefix. A key without the prefix returns `400` with code `011`, and a key addressing any property other than `name` returns `400` with code `1215`. An unsupported `sort` field returns `400` with code `1203`.

Sorting by `status` follows the lifecycle order `pending`, `approved`, `denied` rather than alphabetical order, so pending companies lead. Without a sort, the most recently created company leads. The collection is ordered deterministically, so paging through it never repeats or skips a company.

A request for a page beyond the last one serves the last page and reports it as the current page.

### Request

```http
GET /companies?filter[companies.name]=acme&sort=-name&page[limit]=20&page[offset]=20
Authorization: Bearer <access_token>
```

### Response

The response contains a `data` array of company resources in the same shape as [Retrieve a company](#retrieve-a-company). The pagination summary is returned in the top-level `meta.pagination` object, and the pagination links in the top-level `links` object. Collection members do not carry pagination data.

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
            "attributes": {}
        }
    ]
}
```

## Create a company

To create a company, send the request:

---
`POST` **/companies**

---

### Request

```http
POST /companies
Authorization: Bearer <access_token>
Content-Type: application/vnd.api+json
```

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

Only `name` is required. A company created without `status` or `isActive` is `pending` and inactive, exactly as a company created in the Back Office. To create an approved and active company, send all three attributes:

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

### Response

The response returns `201` with the created company in the same shape as [Retrieve a company](#retrieve-a-company). The `uuid` assigned on creation is the identifier every later request uses.

## Update a company

To update a company, send the request:

---
`PATCH` **/companies/{% raw %}{{uuid}}{% endraw %}**

---

| PATH PARAMETER | DESCRIPTION |
| --- | --- |
| {% raw %}{{uuid}}{% endraw %} | UUID of the company. |

### Request

```http
PATCH /companies/0818f408-cc84-575d-ad54-92118a0e4273
Authorization: Bearer <access_token>
Content-Type: application/vnd.api+json
```

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

Only the attributes present in the payload are applied, so `name`, `status`, and `isActive` can each be changed on their own. Attributes you leave out keep their current values.

### Response

The response returns `200` with the updated company in the same shape as [Retrieve a company](#retrieve-a-company).

## Company attributes

| ATTRIBUTE | TYPE | WRITABLE | DESCRIPTION |
| --- | --- | --- | --- |
| `uuid` | string | No | Public unique company identifier, assigned on creation. |
| `name` | string | ✓ | Company name. Required on create, at most 100 characters, and never blank. |
| `status` | string | ✓ | Approval status: `pending`, `approved`, or `denied`. |
| `isActive` | boolean | ✓ | Whether the company is active. |

### Status

`status` defaults to `pending` on create. On update it accepts `approved` or `denied` only: a company cannot be returned to `pending` once it has left that state, which matches the Back Office lifecycle. Any other value returns a validation error.

### Activation

`isActive` defaults to `false` on create. It accepts a JSON boolean, or the string `"true"` or `"false"`. Any other value is rejected rather than coerced, so `1`, `0`, and `"yes"` return a validation error instead of silently activating or deactivating a company.

## Possible errors

| CODE | REASON |
| --- | --- |
| 011 | A filter key is not in `filter[companies.<property>]` form. |
| 901 | The request failed validation. An attribute is malformed or not allowed for the operation. |
| 1203 | The `sort` field is not supported. |
| 1213 | No company exists with the requested UUID. |
| 1214 | The company was rejected by the domain. |
| 1215 | A filter addresses a property other than `name`. |

Errors are returned in an `errors` array. Each entry carries the Spryker error `code`, the HTTP `status`, and a message:

```json
{
    "errors": [
        {
            "code": "1213",
            "status": 404,
            "detail": "Company with uuid \"11111111-2222-4333-8444-555555555555\" was not found.",
            "message": "Company with uuid \"11111111-2222-4333-8444-555555555555\" was not found."
        }
    ]
}
```

A request with a body that is not a valid JSON:API document returns `400`. A request without a valid Back Office access token returns `401`. A request whose path exists but whose method no operation declares returns `405` with an `Allow` header naming the methods that do work.
