---
title: "Migrate CategoriesRestApi to API Platform"
description: Step-by-step guide to migrate the CategoriesRestApi module to the API Platform Category module.
last_updated: Mar 31, 2026
template: howto-guide-template
related:
  - title: Migrate Glue REST API to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html
---

This document describes how to migrate the `CategoriesRestApi` Glue module to the API Platform `Category` module.

## Prerequisites

Complete the cross-cutting changes described in [Migrate Glue REST API to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html) before proceeding.

## Overview

The `CategoriesRestApi` module provided the following storefront endpoints:

| Endpoint | Operation | Old plugin |
|---|---|---|
| `GET /category-trees` | Get category tree | `CategoriesResourceRoutePlugin` |
| `GET /category-nodes/{categoryNodeId}` | Get category node | `CategoryResourceRoutePlugin` |

These are now served by the API Platform `Category` module.

## 1. Update module dependencies

```bash
composer require spryker/category:"^X.Y.Z"
```

{% info_block infoBox "Version" %}

Use the version that includes the API Platform resources. Check the module changelog for the exact version.

{% endinfo_block %}

## 2. Remove route plugins from GlueApplicationDependencyProvider

In `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php`, remove the following plugins from `getResourceRoutePlugins()`:

| Plugin to remove | Fully qualified class name |
|---|---|
| `CategoriesResourceRoutePlugin` | `Spryker\Glue\CategoriesRestApi\Plugin\CategoriesResourceRoutePlugin` |
| `CategoryResourceRoutePlugin` | `Spryker\Glue\CategoriesRestApi\Plugin\CategoryResourceRoutePlugin` |

## 3. Regenerate transfers and API resources

```bash
docker/sdk cli console transfer:generate
docker/sdk cli glue api:generate
docker/sdk cli glue cache:clear
```

## Relationship plugin status

| Plugin | Status |
|---|---|
| `AbstractProductsCategoriesResourceRelationshipPlugin` (`ProductsCategoriesResourceRelationship`) | Remains registered on the `abstract-products` resource for legacy Glue endpoints. Do not remove. |
