---
title: "Migrate MerchantOpeningHoursRestApi to API Platform"
description: Step-by-step guide to migrate the MerchantOpeningHoursRestApi module to the API Platform MerchantOpeningHours module.
last_updated: Apr 07, 2026
template: howto-guide-template
related:
  - title: Migrate Glue REST API to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html
---

This document describes how to migrate the `MerchantOpeningHoursRestApi` Glue module to the API Platform `MerchantOpeningHours` module.

## Prerequisites

Complete the cross-cutting changes described in [Migrate Glue REST API to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html) before proceeding.

Migrating this module requires [Migrate MerchantsRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-merchantsrestapi.html) to be completed first.

## Overview

The `MerchantOpeningHoursRestApi` module provided the following storefront endpoint:

| Endpoint | Operation | Old plugin |
|---|---|---|
| `GET /merchants/{merchantReference}/merchant-opening-hours` | Get merchant opening hours | `MerchantOpeningHoursResourceRoutePlugin` |

This is now served by the API Platform `MerchantOpeningHours` module.

## 1. Update module dependencies

```bash
composer require spryker/merchant-opening-hours:"^X.Y.Z"
```

{% info_block infoBox "Version" %}

Use the version that includes the API Platform resources. Check the module changelog for the exact version.

{% endinfo_block %}

## 2. Remove route plugin from GlueApplicationDependencyProvider

In `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php`, remove the following plugin from `getResourceRoutePlugins()`:

| Plugin to remove | Fully qualified class name |
|---|---|
| `MerchantOpeningHoursResourceRoutePlugin` | `Spryker\Glue\MerchantOpeningHoursRestApi\Plugin\GlueApplication\MerchantOpeningHoursResourceRoutePlugin` |

## 3. Regenerate transfers and API resources

```bash
docker/sdk cli console transfer:generate
docker/sdk cli glue api:generate
docker/sdk cli glue cache:clear
```

## Relationship plugin status

| Plugin | Registered on resource | Status | Notes |
|---|---|---|---|
| `MerchantOpeningHoursByMerchantReferenceResourceRelationshipPlugin` | `merchants` | Removed | Opening hours are now included in the `Merchant` resource payload or via `?include=merchant-opening-hours`. |
