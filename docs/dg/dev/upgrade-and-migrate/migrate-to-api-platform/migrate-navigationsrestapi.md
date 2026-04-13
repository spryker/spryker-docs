---
title: "Migrate NavigationsRestApi to API Platform"
description: Step-by-step guide to migrate the NavigationsRestApi module to the API Platform Navigation module.
last_updated: Apr 07, 2026
template: howto-guide-template
related:
  - title: Migrate Glue REST API to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html
---

This document describes how to migrate the `NavigationsRestApi` Glue module to the API Platform `Navigation` module.

## Prerequisites

Complete the cross-cutting changes described in [Migrate Glue REST API to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html) before proceeding.

## Overview

The `NavigationsRestApi` module provided the following storefront endpoint:

| Endpoint | Operation | Old plugin |
|---|---|---|
| `GET /navigations/{id}` | Get navigation tree | `NavigationsResourceRoutePlugin` |

This is now served by the API Platform `Navigation` module.

## 1. Update module dependencies

```bash
composer require spryker/navigation:"^X.Y.Z"
```

{% info_block infoBox "Version" %}

Use the version that includes the API Platform resources. Check the module changelog for the exact version.

{% endinfo_block %}

## 2. Remove route plugin from GlueApplicationDependencyProvider

In `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php`, remove the following plugin from `getResourceRoutePlugins()`:

| Plugin to remove | Fully qualified class name |
|---|---|
| `NavigationsResourceRoutePlugin` | `Spryker\Glue\NavigationsRestApi\Plugin\ResourceRoute\NavigationsResourceRoutePlugin` |

## 3. Regenerate transfers and API resources

```bash
docker/sdk cli console transfer:generate
docker/sdk cli glue api:generate
docker/sdk cli glue cache:clear
```

## Relationship plugin status

| Plugin | Registered on resource | Status | Notes |
|---|---|---|---|
| `CategoryNodeByResourceIdResourceRelationshipPlugin` | `navigations` | Removed | The `Navigation` API Platform provider exposes category node data inline. This plugin was provided by `NavigationsCategoryNodesResourceRelationship` and registered on the `navigations` resource. |
