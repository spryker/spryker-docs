---
title: Companies Backend API
description: Manage companies programmatically through the Glue Backend API, running the same business rules as the Back Office.
last_updated: Sep 16, 2026
template: concept-topic-template
---

The Companies Backend API lets external systems create, read, and update companies in your shop over HTTP. It covers the company data a Back Office user works with—the company name, its approval status, and whether it is active—and presents it as a single `companies` resource on the Glue Backend API.

The resource is built on [API Platform](/docs/integrations/spryker-api/api-platform/api-platform.html) and ships with the Customer Experience Management feature. For the companies themselves, see the [Company Account feature overview](/docs/pbc/all/customer-relationship-management/base-shop/company-account-feature-overview/company-account-feature-overview.html).

## When to use the Companies Backend API

Use this API when an external system needs to read or change company data through Spryker business logic:

- **Custom Back Office applications.** You replace or extend the standard Back Office with your own interface and need company management operations that behave identically to the standard one.
- **Third-party system integrations.** A CRM, ERP, or middleware platform maintains company records in Spryker as part of an ongoing exchange, rather than through scheduled file imports.
- **Onboarding automation.** A registration or vetting workflow outside Spryker creates companies and moves them through approval as the vetting completes.

### Companies behave as they do in the Back Office

Every request runs through the same business rules and validation that apply when a Back Office user edits a company. A company created through the API is indistinguishable from one created in the Back Office: it starts pending and inactive unless you say otherwise, and the same status transitions are permitted.

### Companies are addressed by UUID

The API never exposes database identifiers. Each company is addressed by its `uuid`, which is assigned on creation and stable for the life of the record.

## How the Companies Backend API compares to other company APIs

Spryker offers three ways to work with company data over HTTP. They serve different purposes:

| API | Audience | Business logic | Typical use |
| --- | --- | --- | --- |
| [Storefront API](/docs/pbc/all/customer-relationship-management/base-shop/manage-using-glue-api/company-account/glue-api-retrieve-companies.html) | Company users in the Storefront | Read-only, scoped to the authenticated company user | Showing a company user their own company |
| [Data Exchange API](/docs/integrations/spryker-api/backend-api/data-exchange-api/sending-requests-to-data-exchange-api.html) | Technical integrations | None—generic access to configured database entities | Moving raw records in and out of tables |
| Companies Backend API | Back Office applications and business integrations | Full Back Office business rules and validation | Managing companies from a custom Back Office or a third-party system |

The Data Exchange API writes to tables you configure and does not apply company business rules. The Companies Backend API applies them, which is why it rejects a status transition the Back Office would not allow.

## Supported operations

| OPERATION | METHOD AND PATH |
| --- | --- |
| Retrieve a company | `GET /companies/{uuid}` |
| Retrieve companies | `GET /companies` |
| Create a company | `POST /companies` |
| Update a company | `PATCH /companies/{uuid}` |

All operations require a Back Office user access token. See [Authenticate as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html).

For requests, responses, the full attribute reference, and update behavior, see [Glue API: Manage companies](/docs/pbc/all/customer-relationship-management/base-shop/glue-api-manage-companies.html).

## Company attributes

| ATTRIBUTE | TYPE | WRITABLE | DESCRIPTION |
| --- | --- | --- | --- |
| `uuid` | string | No | Public unique company identifier, assigned on creation. |
| `name` | string | Yes | Company name. Required on create, at most 100 characters. |
| `status` | string | Yes | Approval status: `pending`, `approved`, or `denied`. |
| `isActive` | boolean | Yes | Whether the company is active. |

### Status and activation defaults

A company created without `status` or `isActive` is pending and inactive, exactly as a company created in the Back Office. You can set both explicitly on create.

On update, `status` accepts `approved` or `denied` only. A company cannot be returned to `pending` once it has left that state, which matches the Back Office lifecycle.

`isActive` must be sent as a JSON boolean, or as the string `"true"` or `"false"`. Any other value is rejected rather than coerced, so `1`, `0`, and `"yes"` return a validation error instead of silently activating or deactivating a company.

## Reading a company collection

`GET /companies` returns a paginated collection. Pagination uses the JSON:API item window, `page[limit]` and `page[offset]`, with a default window of 10 items.

Pagination metadata is reported in the response's top-level `meta.pagination` object as `numFound`, `currentPage`, `maxPage`, and `currentItemsPerPage`, alongside the JSON:API `first`, `last`, `prev`, and `next` links. Collection members do not carry pagination data. A request for a page beyond the last one serves the last page and reports it as the current page.

Filtering follows the JSON:API filter form. `filter[companies.name]` matches partially and case-insensitively:

```
GET /companies?filter[companies.name]=acme
```

Sorting accepts `name`, `status`, and `isActive`, prefixed with `-` for descending:

```
GET /companies?sort=-name
```

Sorting by `status` follows the lifecycle order `pending`, `approved`, `denied` rather than alphabetical order, so pending companies lead. Without a sort, the most recently created company leads. The collection is ordered deterministically, so paging through it never repeats or skips a company.

## Errors

| CODE | STATUS | MEANING |
| --- | --- | --- |
| 001 | 401 | The access token is missing, invalid, or expired. |
| 011 | 400 | A filter key is not in `filter[companies.<property>]` form. |
| 901 | 422 | An attribute failed validation. |
| 1203 | 400 | The `sort` field is not supported. |
| 1213 | 404 | No company matches the UUID. |
| 1214 | 422 | The company was rejected by the domain. |
| 1215 | 400 | A filter addresses a property other than `name`. |

A request whose path exists but whose method no operation declares is answered with `405` and an `Allow` header naming the methods that do work. A path that does not exist is answered with `404`.

## Current constraints

- `DELETE` is not supported. Companies are deactivated by setting `isActive` to `false`, not removed.
- `status` cannot be set back to `pending` after the company has left that state.
- `name` is the only filterable property, and `name`, `status`, and `isActive` are the only sortable fields.
- Business units and company users are not part of this resource.

## Related Developer documents

| GLUE API GUIDES | INSTALLATION GUIDES |
| --- | --- |
| [Glue API: Manage companies](/docs/pbc/all/customer-relationship-management/base-shop/glue-api-manage-companies.html) | [Install the Companies Backend API](/docs/pbc/all/customer-relationship-management/base-shop/install-and-upgrade/install-glue-api/install-the-companies-backend-api.html) |
| [Authenticate as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html) | [Integrate API Platform](/docs/integrations/spryker-api/migrate-from-glue-to-api-platform/integrate-api-platform.html) |
