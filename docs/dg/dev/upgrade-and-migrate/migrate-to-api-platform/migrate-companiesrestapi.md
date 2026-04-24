---
title: "Migrate CompaniesRestApi to API Platform"
description: Step-by-step guide to migrate the CompaniesRestApi module to the API Platform Company module.
last_updated: Apr 07, 2026
template: howto-guide-template
related:
  - title: Migrate Glue REST API to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html
---

This document describes how to migrate the `CompaniesRestApi` Glue module to the API Platform `Company` module.

## Prerequisites

Complete the cross-cutting changes described in [Migrate Glue REST API to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html) before proceeding.

## Overview

The `CompaniesRestApi` module provided the following storefront endpoints:

| Endpoint | Operation | Old plugin |
|---|---|---|
| `GET /companies` | List companies | `CompaniesResourcePlugin` |
| `GET /companies/{id}` | Get company by ID | `CompaniesResourcePlugin` |

These are now served by the API Platform `Company` module.

## 1. Update module dependencies

```bash
composer require spryker/company:"^X.Y.Z"
```

{% info_block infoBox "Version" %}

Use the version that includes the API Platform resources. Check the module changelog for the exact version.

{% endinfo_block %}

## 2. Remove route plugin from GlueApplicationDependencyProvider

In `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php`, remove the following plugin from `getResourceRoutePlugins()`:

| Plugin to remove | Fully qualified class name |
|---|---|
| `CompaniesResourcePlugin` | `Spryker\Glue\CompaniesRestApi\Plugin\GlueApplication\CompaniesResourcePlugin` |

## 3. Regenerate transfers and API resources

```bash
docker/sdk cli console transfer:generate
docker/sdk cli glue api:generate
docker/sdk cli glue cache:clear
```

## Relationship plugin status

The following relationship plugins from `CompaniesRestApi` module resources are registered on resources from other modules. Their migration status depends on whether those source modules have been migrated:

| Plugin | Registered on resource | Status | Notes |
|---|---|---|---|
| `CompanyByCompanyUserResourceRelationshipPlugin` | `company-users` | Remains | Registered on `CompanyUsersRestApi`'s `company-users` resource. Do not remove until `CompanyUsersRestApi` is migrated. |
| `CompanyByCompanyBusinessUnitResourceRelationshipPlugin` | `company-business-units` | Remains | Registered on `CompanyBusinessUnitsRestApi`'s `company-business-units` resource. Do not remove until `CompanyBusinessUnitsRestApi` is migrated. |
| `CompanyByCompanyRoleResourceRelationshipPlugin` | `company-roles` | Remains | Registered on `CompanyRolesRestApi`'s `company-roles` resource. Do not remove until `CompanyRolesRestApi` is migrated. |
