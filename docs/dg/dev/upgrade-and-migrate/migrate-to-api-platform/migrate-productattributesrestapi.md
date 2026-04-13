---
title: "Migrate ProductAttributesRestApi to API Platform"
description: Step-by-step guide to migrate the ProductAttributesRestApi module to the API Platform ProductAttribute module.
last_updated: Apr 07, 2026
template: howto-guide-template
related:
  - title: Migrate Glue REST API to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html
---

This document describes how to migrate the `ProductAttributesRestApi` Glue module to the API Platform `ProductAttribute` module.

## Prerequisites

Complete the cross-cutting changes described in [Migrate Glue REST API to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html) before proceeding.

## Overview

The `ProductAttributesRestApi` module provided the following storefront endpoint:

| Endpoint | Operation | Old plugin |
|---|---|---|
| `GET /product-management-attributes` | List product management attributes | `ProductManagementAttributesResourceRoutePlugin` |
| `GET /product-management-attributes/{key}` | Get product management attribute | `ProductManagementAttributesResourceRoutePlugin` |

These are now served by the API Platform `ProductAttribute` module.

## 1. Update module dependencies

```bash
composer require spryker/product-attribute:"^X.Y.Z"
```

{% info_block infoBox "Version" %}

Use the version that includes the API Platform resources. Check the module changelog for the exact version.

{% endinfo_block %}

## 2. Remove route plugin from GlueApplicationDependencyProvider

In `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php`, remove the following plugin from `getResourceRoutePlugins()`:

| Plugin to remove | Fully qualified class name |
|---|---|
| `ProductManagementAttributesResourceRoutePlugin` | `Spryker\Glue\ProductAttributesRestApi\Plugin\GlueApplication\ProductManagementAttributesResourceRoutePlugin` |

## 3. Regenerate transfers and API resources

```bash
docker/sdk cli console transfer:generate
docker/sdk cli glue api:generate
docker/sdk cli glue cache:clear
```

## Relationship plugin status

The `ProductAttributesRestApi` module did not register any relationship plugins. No relationship changes are needed.
