---
title: "Migrate CustomerAccessRestApi to API Platform"
description: Step-by-step guide to migrate the CustomerAccessRestApi module to the API Platform CustomerAccess module.
last_updated: Apr 07, 2026
template: howto-guide-template
related:
  - title: Migrate Glue REST API to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html
---

This document describes how to migrate the `CustomerAccessRestApi` Glue module to the API Platform `CustomerAccess` module.

## Prerequisites

Complete the cross-cutting changes described in [Migrate Glue REST API to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html) before proceeding.

## Overview

The `CustomerAccessRestApi` module provided the following storefront endpoint:

| Endpoint | Operation | Old plugin |
|---|---|---|
| `GET /customer-access` | Get customer access configuration | `CustomerAccessResourceRoutePlugin` |

This is now served by the API Platform `CustomerAccess` module.

## 1. Update module dependencies

```bash
composer require spryker/customer-access:"^X.Y.Z"
```

{% info_block infoBox "Version" %}

Use the version that includes the API Platform resources. Check the module changelog for the exact version.

{% endinfo_block %}

## 2. Remove route plugin from GlueApplicationDependencyProvider

In `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php`, remove the following plugin from `getResourceRoutePlugins()`:

| Plugin to remove | Fully qualified class name |
|---|---|
| `CustomerAccessResourceRoutePlugin` | `Spryker\Glue\CustomerAccessRestApi\Plugin\GlueApplication\CustomerAccessResourceRoutePlugin` |

## 3. Delete the obsolete Pyz CustomerAccessRestApi config

Once all dependent modules have been migrated, delete the following file:

```text
src/Pyz/Glue/CustomerAccessRestApi/CustomerAccessRestApiConfig.php
```

This config mapped legacy resource type constants (`CartsRestApiConfig`, `ProductPricesRestApiConfig`, `CheckoutRestApiConfig`, `WishlistsRestApiConfig`) to customer access content types. Once all those modules are migrated to API Platform, this mapping is no longer needed.

{% info_block warningBox "Migration prerequisite" %}

Do not delete `CustomerAccessRestApiConfig.php` until the following modules have been migrated:
- `CartsRestApi`
- `ProductPricesRestApi`
- `CheckoutRestApi`
- `WishlistsRestApi`

Deleting this file while any of those modules still use the legacy Glue router will break the customer access checks for guest endpoints.

{% endinfo_block %}

## 4. Regenerate transfers and API resources

```bash
docker/sdk cli console transfer:generate
docker/sdk cli glue api:generate
docker/sdk cli glue cache:clear
```

## Relationship plugin status

The `CustomerAccessRestApi` module did not register any relationship plugins. No relationship changes are needed.
