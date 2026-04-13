---
title: "Migrate CatalogSearchRestApi to API Platform"
description: Step-by-step guide to migrate the CatalogSearchRestApi module to the API Platform Catalog module.
last_updated: Apr 07, 2026
template: howto-guide-template
related:
  - title: Migrate Glue REST API to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html
---

This document describes how to migrate the `CatalogSearchRestApi` Glue module to the API Platform `Catalog` module.

## Prerequisites

Complete the cross-cutting changes described in [Migrate Glue REST API to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html) before proceeding.

## Overview

The `CatalogSearchRestApi` module provided the following storefront endpoints:

| Endpoint | Operation | Old plugin |
|---|---|---|
| `GET /catalog-search` | Full-text product search | `CatalogSearchResourceRoutePlugin` |
| `GET /catalog-search-suggestions` | Search suggestions | `CatalogSearchSuggestionsResourceRoutePlugin` |

These are now served by the API Platform `Catalog` module.

## 1. Update module dependencies

```bash
composer require spryker/catalog:"^X.Y.Z"
```

{% info_block infoBox "Version" %}

Use the version that includes the API Platform resources. Check the module changelog for the exact version.

{% endinfo_block %}

## 2. Remove route plugins and validator from GlueApplicationDependencyProvider

In `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php`, remove the following from `getResourceRoutePlugins()` and `getRestRequestValidatorPlugins()`:

| Plugin to remove | Method | Fully qualified class name |
|---|---|---|
| `CatalogSearchResourceRoutePlugin` | `getResourceRoutePlugins()` | `Spryker\Glue\CatalogSearchRestApi\Plugin\CatalogSearchResourceRoutePlugin` |
| `CatalogSearchSuggestionsResourceRoutePlugin` | `getResourceRoutePlugins()` | `Spryker\Glue\CatalogSearchRestApi\Plugin\CatalogSearchSuggestionsResourceRoutePlugin` |
| `CatalogSearchRequestParametersIntegerRestRequestValidatorPlugin` | `getRestRequestValidatorPlugins()` | `Spryker\Glue\CatalogSearchRestApi\Plugin\CatalogSearchRequestParametersIntegerRestRequestValidatorPlugin` |

## 3. Remove relationship plugins for catalog-search resources

In the `getResourceRelationshipPlugins()` method, remove the following relationship registrations:

| Resource constant | Plugin to remove | Fully qualified class name |
|---|---|---|
| `CatalogSearchRestApiConfig::RESOURCE_CATALOG_SEARCH` | `CatalogSearchAbstractProductsResourceRelationshipPlugin` | `Spryker\Glue\CatalogSearchProductsResourceRelationship\Plugin\CatalogSearchAbstractProductsResourceRelationshipPlugin` |
| `CatalogSearchRestApiConfig::RESOURCE_CATALOG_SEARCH_SUGGESTIONS` | `CatalogSearchSuggestionsAbstractProductsResourceRelationshipPlugin` | `Spryker\Glue\CatalogSearchProductsResourceRelationship\Plugin\CatalogSearchSuggestionsAbstractProductsResourceRelationshipPlugin` |

## 4. Regenerate transfers and API resources

```bash
docker/sdk cli console transfer:generate
docker/sdk cli glue api:generate
docker/sdk cli glue cache:clear
```

## Relationship plugin status

| Plugin | Status | Notes |
|---|---|---|
| `CatalogSearchAbstractProductsResourceRelationshipPlugin` | Removed | API Platform handles product relationships via the `?include=` query parameter. |
| `CatalogSearchSuggestionsAbstractProductsResourceRelationshipPlugin` | Removed | Same as above. |
