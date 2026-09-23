---
title: "Backend API: Manage merchants"
description: Learn how to install and extend the merchants Backend API endpoint in your Spryker shop.
last_updated: Sep 23, 2026
template: glue-api-backend-guide-template
---

The `merchants` Backend API resource lets you retrieve, create, and update merchants (`GET /merchants`, `GET /merchants/{merchantReference}`, `POST /merchants`, `PATCH /merchants/{merchantReference}`). You can use it to build Back Office extensions, ERP and PIM integrations, and merchant onboarding automation.

This page does not repeat the attribute list, parameter reference, or response schema—see [Where to find the full schema](/docs/integrations/spryker-api/backend-api/backend-api-conventions.html#where-to-find-the-full-schema). It documents only what that generated schema does not show: installation, module wiring, and behavior that spans multiple modules.

## Installation

These endpoints are implemented using API Platform. To install and enable it, see [Enable API Platform](/docs/integrations/spryker-api/api-platform/enablement.html).

For the required module version and plugin registration, see [Install the Merchants Backend API](/docs/pbc/all/merchant-management/latest/base-shop/install-and-upgrade/install-glue-api/install-the-merchants-backend-api.html). In particular:

- The uniqueness and URL validation behind error code `1302` (duplicate email, merchant reference, name, or merchant URL) runs only if the merchant validator plugins are registered.
- The `isOpenForRelationRequest` attribute is contributed by the Merchant Relation Request module and appears in the schema only once that module is installed and its expander plugins are registered.

## Conventions

Request headers, pagination, filtering, sorting, partial updates, and errors follow the rules in [Backend API conventions](/docs/integrations/spryker-api/backend-api/backend-api-conventions.html).

## Behavior notes

The following behaviors are either not expressible in a `*.resource.yml` schema or currently differ from what it describes. Everything else—filterable and sortable fields, attribute types and defaults, and per-operation error codes—is in the generated schema (Swagger UI or `docker/sdk cli glue api:debug merchants --api-type=backend`), not here.

{% info_block warningBox "merchantUrls.url: the schema description is out of date" %}

The schema currently documents `url` as taken as given, with no prefix added. In practice, the backend automatically prepends the locale's URL prefix and a `/merchant/` segment—so a request sending `"url": "spryker-merchant"` for `de_DE` is stored and returned as `/de/merchant/spryker-merchant`. Send only the slug. Until the `merchants.resource.yml` description is corrected at the source, treat this note as authoritative over the generated docs for this one property.

{% endinfo_block %}

{% info_block infoBox "isOpenForRelationRequest on create" %}

Left out of the create payload, `isOpenForRelationRequest` keeps its current value instead of resetting to a default—unlike `isActive`, which defaults to `false`. This follows from the attribute being contributed by a separate module rather than owned by the base `merchants` resource.

{% endinfo_block %}

To view generic errors, see [API errors and troubleshooting](/docs/integrations/spryker-api/spryker-api-errors-and-troubleshooting.html).
