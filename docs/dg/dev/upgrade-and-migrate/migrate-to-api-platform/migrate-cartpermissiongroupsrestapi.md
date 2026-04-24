---
title: "Migrate CartPermissionGroupsRestApi to API Platform"
description: Step-by-step guide to migrate the CartPermissionGroupsRestApi module to the API Platform SharedCart module.
last_updated: Apr 07, 2026
template: howto-guide-template
related:
  - title: Migrate Glue REST API to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html
  - title: Migrate SharedCartsRestApi to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-sharedcartsrestapi.html
---

This document describes how to migrate the `CartPermissionGroupsRestApi` Glue module to the API Platform `SharedCart` module.

## Prerequisites

Complete the cross-cutting changes described in [Migrate Glue REST API to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html) before proceeding.

Migrating this module requires [Migrate SharedCartsRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-sharedcartsrestapi.html) to be completed first.

## Overview

The `CartPermissionGroupsRestApi` module provided the following storefront endpoints:

| Endpoint | Operation | Old plugin |
|---|---|---|
| `GET /cart-permission-groups` | List cart permission groups | `CartPermissionGroupsResourceRoutePlugin` |
| `GET /cart-permission-groups/{id}` | Get cart permission group | `CartPermissionGroupsResourceRoutePlugin` |

These are now served by the API Platform `SharedCart` module.

## 1. Update module dependencies

The `CartPermissionGroupsRestApi` endpoints are served by the same `spryker/shared-cart` package that covers `SharedCartsRestApi`. If you have already installed it, no additional package is needed.

```bash
composer require spryker/shared-cart:"^X.Y.Z"
```

{% info_block infoBox "Version" %}

Use the version that includes the API Platform resources. Check the module changelog for the exact version.

{% endinfo_block %}

## 2. Remove route plugin from GlueApplicationDependencyProvider

In `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php`, remove the following plugin from `getResourceRoutePlugins()`:

| Plugin to remove | Fully qualified class name |
|---|---|
| `CartPermissionGroupsResourceRoutePlugin` | `Spryker\Glue\CartPermissionGroupsRestApi\Plugin\GlueApplication\CartPermissionGroupsResourceRoutePlugin` |

## 3. Regenerate transfers and API resources

```bash
docker/sdk cli console transfer:generate
docker/sdk cli glue api:generate
docker/sdk cli glue cache:clear
```

## Relationship plugin status

| Plugin | Registered on resource | Status | Notes |
|---|---|---|---|
| `CartPermissionGroupByQuoteResourceRelationshipPlugin` | `carts` | Remains | This plugin is still registered on `carts` from the legacy `CartsRestApi` endpoint. Do not remove until `CartsRestApi` is fully sunset from the legacy Glue layer. |
| `CartPermissionGroupByShareDetailResourceRelationshipPlugin` | `shared-carts` | Remains | This plugin is registered on `shared-carts` in the legacy Glue layer. Do not remove until `SharedCartsRestApi` is fully sunset. |
