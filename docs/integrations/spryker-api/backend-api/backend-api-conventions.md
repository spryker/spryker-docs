---
title: Backend API conventions
description: The request headers, pagination, filtering, and sorting conventions that every Spryker Backend API resource follows.
last_updated: Sep 23, 2026
template: concept-topic-template
---

Every Backend API resource follows the same conventions for authorization headers, pagination, filtering, and sorting. This page describes them once. Individual resource guides list only what is specific to that resource—the filterable properties, the sortable fields, and the attributes.

These conventions are [JSON:API](https://jsonapi.org/format/) as implemented by [API Platform](https://api-platform.com/docs/core/pagination/), not a Spryker invention: `page[limit]`/`page[offset]`, the `filter[…]` family, the `sort` parameter with its `-` prefix, and the `first`/`last`/`prev`/`next` link set all come from that stack. The one Spryker-specific part is the shape of the `meta.pagination` object, which keeps the keys the legacy Glue REST API returned.

## Where to find the full schema

Every Backend API resource is generated from its `*.resource.yml` and `*.validation.yml` files, so the attribute list, parameter descriptions, request and response schemas, and validation rules are already published where they cannot go stale: your project's own generated OpenAPI documentation.

- **Swagger UI**: served at the root URL of your Glue Backend application, for example `http://glue-backend.eu.spryker.local/`. Disabled in production by default—see [Enable the documentation UI only in development](/docs/integrations/spryker-api/api-platform/configuration.html#enable-the-documentation-ui-only-in-development).
- **CLI**: `docker/sdk cli glue api:debug {resource} --api-type=backend` prints the merged schema for one resource, including every property contributed by every installed module.

Resource guides do not repeat this schema. They document only what the generated schema cannot show: which module and version an endpoint or attribute ships in, which plugins you need to register, and behavior that spans multiple modules or isn't expressible in a `*.resource.yml` file.

## Request headers

| HEADER KEY | HEADER VALUE | REQUIRED | DESCRIPTION |
| --- | --- | --- | --- |
| Authorization | string | &check; | Alphanumeric string that authorizes the Back Office user to send requests to protected resources. Get it by [authenticating as a Back Office user](/docs/pbc/all/identity-access-management/latest/manage-using-glue-api/glue-api-authenticate-as-a-back-office-user.html). |
| Content-Type | application/vnd.api+json | &check; for requests with a body | Media type of the request body. Required for `POST`, `PATCH`, and `PUT`. |
| Accept | application/vnd.api+json |  | Media type of the response. If you omit this header, the endpoint answers with `application/vnd.api+json`. |

A request without a valid access token returns `401`.

## Pagination

Pagination, the `meta.pagination` summary, and the pagination links are described in [Resource schemas — Pagination](/docs/integrations/spryker-api/api-platform/resource-schemas.html#pagination).

One behaviour is worth knowing at the call site: a request for a page beyond the last one serves the last page and reports it as the current page, rather than returning an empty collection.

## Filtering and sorting

Filtering uses the JSON:API [`filter` parameter family](https://jsonapi.org/format/#fetching-filtering) and sorting the [`sort` parameter](https://jsonapi.org/format/#fetching-sorting), with a `-` prefix for descending order. Each resource declares which properties it supports—see the resource's own guide.

JSON:API reserves the `filter` name but leaves its contents to the implementation. Spryker qualifies every filter key with the resource name, so a filter on a related resource is unambiguous:

```text
filter[{resource}.{property}]={value}
```

For example, `filter[companies.name]=acme`. A key without the resource prefix returns `400` with the error code `011`, and a filter addressing an unsupported property returns `400` with the error message naming the properties that are supported. An unsupported `sort` field returns `400` with the error code `1203`.

Collections are ordered deterministically, so paging through one never repeats or skips an item.

## Partial updates

A `PATCH` request applies only the attributes present in the payload; every attribute you omit keeps its stored value. Resource guides call this out only where a resource has an exception—for example, a default that a create operation applies but an update does not.

## Errors

Each resource guide lists the error codes specific to that resource. For the response shape and the codes shared by every API, see [API errors and troubleshooting](/docs/integrations/spryker-api/spryker-api-errors-and-troubleshooting.html).
