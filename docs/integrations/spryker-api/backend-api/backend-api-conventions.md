---
title: Backend API conventions
description: The request headers, pagination, filtering, and sorting conventions that every Spryker Backend API resource follows.
last_updated: Sep 17, 2026
template: concept-topic-template
---

Every Backend API resource follows the same conventions for authorization headers, pagination, filtering, and sorting. This page describes them once. Individual resource guides list only what is specific to that resource—the filterable properties, the sortable fields, and the attributes.

## Request headers

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |
| Content-Type | application/vnd.api+json | &check; for requests with a body | Media type of the request body. Required for `POST`, `PATCH`, and `PUT`. |
| Accept | application/vnd.api+json |  | Media type of the response. If you omit this header, the endpoint answers with `application/vnd.api+json`. |

A request without a valid access token returns `401`.

## Pagination

Collection endpoints return a page of items, never the whole collection:

| QUERY PARAMETER | DESCRIPTION | POSSIBLE VALUES |
| --- | --- | --- |
| page[limit] | Maximum number of items to return per page. | From `1` to any. Defaults to `10`. |
| page[offset] | Number of items to skip before the page begins. | From `0` to any. Defaults to `0`. |

A collection response carries its pagination summary in the top-level `meta.pagination` object:

| ATTRIBUTE | TYPE | DESCRIPTION |
| --- | --- | --- |
| meta.pagination.numFound | Integer | Total number of items found. |
| meta.pagination.currentPage | Integer | Current page number. |
| meta.pagination.maxPage | Integer | Total number of pages. |
| meta.pagination.currentItemsPerPage | Integer | Number of items per page. |

The top-level `links` object carries the `first` and `last` links, plus `prev` and `next` when those pages exist. Each link repeats the query parameters of the request and rewrites the window as `page[limit]` and `page[offset]`, so you can follow it as it is. Collection members do not carry pagination data.

A request for a page beyond the last one serves the last page and reports it as the current page.

## Filtering

Filters use the JSON:API filter form, and the key always carries the resource name:

```
filter[{resource}.{property}]={value}
```

For example, `filter[companies.name]=acme`.

Each resource supports its own set of filterable properties—see the resource's own guide. Two failures are common:

- A filter key without the resource prefix returns `400` with the error code `011`.
- A filter addressing a property the resource does not support returns `400`, and the error message names the properties that are supported.

## Sorting

The `sort` parameter names the field to sort by. Prefix it with `-` for descending order:

```
sort=name
sort=-name
```

Each resource declares its own sortable fields. Sorting by a field that is not on the list returns `400` with the error code `1203`, and the error message names the supported fields.

Collections are ordered deterministically, so paging through one never repeats or skips an item.

## Errors

Errors are returned in an `errors` array. Each entry carries the Spryker error `code`, the HTTP `status`, and a message. For the generic codes shared by every resource, see [API errors and troubleshooting](/docs/integrations/spryker-api/spryker-api-errors-and-troubleshooting.html).
