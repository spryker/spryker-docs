---
title: "Migrate AlternativeProductsRestApi to API Platform"
description: Step-by-step guide to migrate the AlternativeProductsRestApi module to the API Platform ProductAlternative module.
last_updated: Apr 07, 2026
template: howto-guide-template
related:
  - title: Migrate Glue REST API to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html
---

This document describes how to migrate the `AlternativeProductsRestApi` Glue module to the API Platform `ProductAlternative` module.

## Prerequisites

Complete the cross-cutting changes described in [Migrate Glue REST API to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html) before proceeding.

## Overview

The `AlternativeProductsRestApi` module provided the following storefront endpoints:

| Endpoint | Operation | Old plugin |
|---|---|---|
| `GET /concrete-products/{sku}/abstract-alternative-products` | Get abstract alternative products | `AbstractAlternativeProductsResourceRoutePlugin` |
| `GET /concrete-products/{sku}/concrete-alternative-products` | Get concrete alternative products | `ConcreteAlternativeProductsResourceRoutePlugin` |

These are now served by the API Platform `ProductAlternative` module.

## 1. Update module dependencies

```bash
composer require spryker/product-alternative:"^X.Y.Z"
```

{% info_block infoBox "Version" %}

Use the version that includes the API Platform resources. Check the module changelog for the exact version.

{% endinfo_block %}

## 2. Remove route plugins from GlueApplicationDependencyProvider

In `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php`, remove the following plugins from `getResourceRoutePlugins()`:

| Plugin to remove | Fully qualified class name |
|---|---|
| `AbstractAlternativeProductsResourceRoutePlugin` | `Spryker\Glue\AlternativeProductsRestApi\Plugin\GlueApplication\AbstractAlternativeProductsResourceRoutePlugin` |
| `ConcreteAlternativeProductsResourceRoutePlugin` | `Spryker\Glue\AlternativeProductsRestApi\Plugin\GlueApplication\ConcreteAlternativeProductsResourceRoutePlugin` |

## 3. Regenerate transfers and API resources

```bash
docker/sdk cli console transfer:generate
docker/sdk cli glue api:generate
docker/sdk cli glue cache:clear
```

## Relationship plugin status

The `AlternativeProductsRestApi` module did not register any relationship plugins. No relationship changes are needed.
