---
title: "Migrate ShipmentTypesRestApi to API Platform"
description: Step-by-step guide to migrate the ShipmentTypesRestApi module to the API Platform ShipmentType module.
last_updated: Apr 07, 2026
template: howto-guide-template
related:
  - title: Migrate Glue REST API to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html
---

This document describes how to migrate the `ShipmentTypesRestApi` Glue module to the API Platform `ShipmentType` module.

## Prerequisites

Complete the cross-cutting changes described in [Migrate Glue REST API to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html) before proceeding.

## Overview

The `ShipmentTypesRestApi` module provided the following storefront endpoints:

| Endpoint | Operation | Old plugin |
|---|---|---|
| `GET /shipment-types` | List shipment types | `ShipmentTypesResourceRoutePlugin` |
| `GET /shipment-types/{id}` | Get shipment type | `ShipmentTypesResourceRoutePlugin` |

These are now served by the API Platform `ShipmentType` module.

## 1. Update module dependencies

```bash
composer require spryker/shipment-type:"^X.Y.Z"
```

{% info_block infoBox "Version" %}

Use the version that includes the API Platform resources. Check the module changelog for the exact version.

{% endinfo_block %}

## 2. Remove route plugin from GlueApplicationDependencyProvider

In `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php`, remove the following plugin from `getResourceRoutePlugins()`:

| Plugin to remove | Fully qualified class name |
|---|---|
| `ShipmentTypesResourceRoutePlugin` | `Spryker\Glue\ShipmentTypesRestApi\Plugin\GlueApplication\ShipmentTypesResourceRoutePlugin` |

## 3. Regenerate transfers and API resources

```bash
docker/sdk cli console transfer:generate
docker/sdk cli glue api:generate
docker/sdk cli glue cache:clear
```

## Relationship plugin status

The `ShipmentTypesRestApi` module did not register any relationship plugins on resources it owns. No relationship changes are needed for this module.

{% info_block infoBox "ShipmentTypesByShipmentMethodsResourceRelationshipPlugin" %}

`ShipmentTypesByShipmentMethodsResourceRelationshipPlugin` (from `ShipmentTypesRestApi`) and `ServiceTypeByShipmentTypesResourceRelationshipPlugin` (from `ShipmentTypeServicePointsRestApi`) remain registered in the legacy Glue layer on `shipment-methods` and `shipment-types` respectively. These belong to modules that are not yet migrated.

{% endinfo_block %}
