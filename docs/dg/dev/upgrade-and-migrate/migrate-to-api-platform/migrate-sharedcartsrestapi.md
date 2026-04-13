---
title: "Migrate SharedCartsRestApi to API Platform"
description: Step-by-step guide to migrate the SharedCartsRestApi module to the API Platform SharedCart module.
last_updated: Apr 07, 2026
template: howto-guide-template
related:
  - title: Migrate Glue REST API to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html
  - title: Migrate CartsRestApi to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-cartsrestapi.html
---

This document describes how to migrate the `SharedCartsRestApi` Glue module to the API Platform `SharedCart` module.

## Prerequisites

Complete the cross-cutting changes described in [Migrate Glue REST API to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html) before proceeding.

Migrating this module requires [Migrate CartsRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-cartsrestapi.html) to be completed first.

## Overview

The `SharedCartsRestApi` module provided the following storefront endpoint:

| Endpoint | Operation | Old plugin |
|---|---|---|
| `GET /shared-carts` | List shared carts | `SharedCartsResourceRoutePlugin` |
| `GET /shared-carts/{id}` | Get shared cart | `SharedCartsResourceRoutePlugin` |
| `POST /shared-carts` | Share a cart | `SharedCartsResourceRoutePlugin` |
| `PATCH /shared-carts/{id}` | Update shared cart | `SharedCartsResourceRoutePlugin` |
| `DELETE /shared-carts/{id}` | Delete shared cart | `SharedCartsResourceRoutePlugin` |

These are now served by the API Platform `SharedCart` module.

## 1. Update module dependencies

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
| `SharedCartsResourceRoutePlugin` | `Spryker\Glue\SharedCartsRestApi\Plugin\GlueApplication\SharedCartsResourceRoutePlugin` |

## 3. Delete the obsolete Pyz SharedCartsRestApi module

Delete `src/Pyz/Glue/SharedCartsRestApi/SharedCartsRestApiDependencyProvider.php`. This file registered `CompanyUserStorageProviderPlugin` for the legacy `SharedCartsRestApi`. The API Platform `SharedCart` module handles company user resolution natively.

## 4. Regenerate transfers and API resources

```bash
docker/sdk cli console transfer:generate
docker/sdk cli glue api:generate
docker/sdk cli glue cache:clear
```

## Relationship plugin status

| Plugin | Registered on resource | Status | Notes |
|---|---|---|---|
| `SharedCartByCartIdResourceRelationshipPlugin` | `carts` | Removed | Shared cart data is now included in the `Cart` resource via the API Platform `SharedCart` module. |
| `CartPermissionGroupByShareDetailResourceRelationshipPlugin` | `shared-carts` | Remains | This plugin is still registered on `shared-carts` in the legacy Glue layer. The `cart-permission-groups` endpoint is still served by `CartPermissionGroupsRestApi`. Do not remove until `CartPermissionGroupsRestApi` is migrated. |
| `CompanyUserByShareDetailResourceRelationshipPlugin` | `shared-carts` | Remains | Same reasoning as above. Do not remove yet. |
