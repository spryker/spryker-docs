---
title: "Migrate StoresRestApi to API Platform"
description: Step-by-step guide to migrate the StoresRestApi module to the API Platform Store module.
last_updated: Apr 07, 2026
template: howto-guide-template
related:
  - title: Migrate Glue REST API to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html
---

This document describes how to migrate the `StoresRestApi` (also known as `StoresApi`) Glue module to the API Platform `Store` module.

## Prerequisites

Complete the cross-cutting changes described in [Migrate Glue REST API to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html) before proceeding.

## Overview

The `StoresRestApi` module provided the following storefront endpoint:

| Endpoint | Operation | Old plugin |
|---|---|---|
| `GET /stores` | Get store configuration | `StoresResourceRoutePlugin` |

The `StoresApi` module additionally provided:

| Endpoint | Operation | Old plugin |
|---|---|---|
| `GET /stores` | Get store configuration (API Platform app) | `StoresResource` |

Both are now served by the API Platform `Store` module.

## 1. Update module dependencies

```bash
composer require spryker/store:"^X.Y.Z"
```

{% info_block infoBox "Version" %}

Use the version that includes the API Platform resources. Check the module changelog for the exact version.

{% endinfo_block %}

## 2. Remove route plugin from GlueApplicationDependencyProvider

In `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php`, remove the following plugin from `getResourceRoutePlugins()`:

| Plugin to remove | Fully qualified class name |
|---|---|
| `StoresResourceRoutePlugin` | `Spryker\Glue\StoresRestApi\Plugin\StoresResourceRoutePlugin` |

## 3. Remove StoresResource from GlueStorefrontApiApplicationDependencyProvider

In `src/Pyz/Glue/GlueStorefrontApiApplication/GlueStorefrontApiApplicationDependencyProvider.php`, remove the following plugin from `getResourcePlugins()`:

| Plugin to remove | Fully qualified class name |
|---|---|
| `StoresResource` | `Spryker\Glue\StoresApi\Plugin\GlueStorefrontApiApplication\StoresResource` |

## 4. Regenerate transfers and API resources

```bash
docker/sdk cli console transfer:generate
docker/sdk cli glue api:generate
docker/sdk cli glue cache:clear
```

## Relationship plugin status

The `StoresRestApi` and `StoresApi` modules did not register any relationship plugins. No relationship changes are needed.
