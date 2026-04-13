---
title: "Migrate ContentProductAbstractListsRestApi to API Platform"
description: Step-by-step guide to migrate the ContentProductAbstractListsRestApi module to the API Platform ContentProduct module.
last_updated: Apr 07, 2026
template: howto-guide-template
related:
  - title: Migrate Glue REST API to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html
---

This document describes how to migrate the `ContentProductAbstractListsRestApi` Glue module to the API Platform `ContentProduct` module.

## Prerequisites

Complete the cross-cutting changes described in [Migrate Glue REST API to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html) before proceeding.

## Overview

The `ContentProductAbstractListsRestApi` module provided the following storefront endpoints:

| Endpoint | Operation | Old plugin |
|---|---|---|
| `GET /content-product-abstract-lists/{key}` | Get content product abstract list | `ContentProductAbstractListsResourceRoutePlugin` |
| `GET /content-product-abstract-lists/{key}/abstract-products` | Get abstract products for content list | `ContentProductAbstractListAbstractProductsResourceRoutePlugin` |

These are now served by the API Platform `ContentProduct` module.

## 1. Update module dependencies

```bash
composer require spryker/content-product:"^X.Y.Z"
```

{% info_block infoBox "Version" %}

Use the version that includes the API Platform resources. Check the module changelog for the exact version.

{% endinfo_block %}

## 2. Remove route plugins from GlueApplicationDependencyProvider

In `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php`, remove the following plugins from `getResourceRoutePlugins()`:

| Plugin to remove | Fully qualified class name |
|---|---|
| `ContentProductAbstractListsResourceRoutePlugin` | `Spryker\Glue\ContentProductAbstractListsRestApi\Plugin\GlueApplication\ContentProductAbstractListsResourceRoutePlugin` |
| `ContentProductAbstractListAbstractProductsResourceRoutePlugin` (aliased as `AbstractProductsResourceRoutePlugin`) | `Spryker\Glue\ContentProductAbstractListsRestApi\Plugin\GlueApplication\AbstractProductsResourceRoutePlugin` |

## 3. Regenerate transfers and API resources

```bash
docker/sdk cli console transfer:generate
docker/sdk cli glue api:generate
docker/sdk cli glue cache:clear
```

## Relationship plugin status

| Plugin | Registered on resource | Status | Notes |
|---|---|---|---|
| `ProductAbstractByContentProductAbstractListResourceRelationshipPlugin` | `content-product-abstract-lists` | Removed | Abstract product relationships are now handled by the API Platform `ContentProduct` module via `?include=abstract-products`. |
