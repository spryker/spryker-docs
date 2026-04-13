---
title: "Migrate ProductOfferServicePointAvailabilitiesRestApi to API Platform"
description: Step-by-step guide to migrate the ProductOfferServicePointAvailabilitiesRestApi module to the API Platform ProductOfferServicePointAvailability module.
last_updated: Apr 07, 2026
template: howto-guide-template
related:
  - title: Migrate Glue REST API to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html
---

This document describes how to migrate the `ProductOfferServicePointAvailabilitiesRestApi` Glue module to the API Platform `ProductOfferServicePointAvailability` module.

## Prerequisites

Complete the cross-cutting changes described in [Migrate Glue REST API to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html) before proceeding.

## Overview

The `ProductOfferServicePointAvailabilitiesRestApi` module provided the following storefront endpoint:

| Endpoint | Operation | Old plugin |
|---|---|---|
| `POST /product-offer-service-point-availabilities` | Check product offer availability at service points | `ProductOfferServicePointAvailabilitiesResourceRoutePlugin` |

This is now served by the API Platform `ProductOfferServicePointAvailability` module.

## 1. Update module dependencies

```bash
composer require spryker/product-offer-service-point-availability:"^X.Y.Z"
```

{% info_block infoBox "Version" %}

Use the version that includes the API Platform resources. Check the module changelog for the exact version.

{% endinfo_block %}

## 2. Remove route plugin from GlueApplicationDependencyProvider

In `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php`, remove the following plugin from `getResourceRoutePlugins()`:

| Plugin to remove | Fully qualified class name |
|---|---|
| `ProductOfferServicePointAvailabilitiesResourceRoutePlugin` | `Spryker\Glue\ProductOfferServicePointAvailabilitiesRestApi\Plugin\GlueApplication\ProductOfferServicePointAvailabilitiesResourceRoutePlugin` |

## 3. Regenerate transfers and API resources

```bash
docker/sdk cli console transfer:generate
docker/sdk cli glue api:generate
docker/sdk cli glue cache:clear
```

## Relationship plugin status

The `ProductOfferServicePointAvailabilitiesRestApi` module did not register any relationship plugins. No relationship changes are needed.
