---
title: "Migrate CompanyUsersRestApi and CompanyUserAuthRestApi to API Platform"
description: Step-by-step guide to migrate the CompanyUsersRestApi and CompanyUserAuthRestApi modules to the API Platform CompanyUser module.
last_updated: Apr 07, 2026
template: howto-guide-template
related:
  - title: Migrate Glue REST API to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html
---

This document describes how to migrate the `CompanyUsersRestApi` and `CompanyUserAuthRestApi` Glue modules to the API Platform `CompanyUser` module.

## Prerequisites

Complete the cross-cutting changes described in [Migrate Glue REST API to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html) before proceeding.

Migrating these modules requires [Migrate AuthRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-authrestapi.html) to be completed first, because the company user access token endpoint builds on the authentication stack.

## Overview

These two modules provided the following storefront endpoints:

| Endpoint | Operation | Old plugin | Source module |
|---|---|---|---|
| `GET /company-users` | List company users | `CompanyUsersResourceRoutePlugin` | `CompanyUsersRestApi` |
| `GET /company-users/{id}` | Get company user | `CompanyUsersResourceRoutePlugin` | `CompanyUsersRestApi` |
| `POST /company-user-access-tokens` | Create company user access token | `CompanyUserAccessTokensResourceRoutePlugin` | `CompanyUserAuthRestApi` |

These are now served by the API Platform `CompanyUser` module.

## 1. Update module dependencies

```bash
composer require spryker/company-user:"^X.Y.Z"
```

{% info_block infoBox "Version" %}

Use the version that includes the API Platform resources. Check the module changelog for the exact version.

{% endinfo_block %}

## 2. Remove route plugins from GlueApplicationDependencyProvider

In `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php`, remove the following plugins from `getResourceRoutePlugins()`:

| Plugin to remove | Fully qualified class name |
|---|---|
| `CompanyUsersResourceRoutePlugin` | `Spryker\Glue\CompanyUsersRestApi\Plugin\GlueApplication\CompanyUsersResourceRoutePlugin` |
| `CompanyUserAccessTokensResourceRoutePlugin` | `Spryker\Glue\CompanyUserAuthRestApi\Plugin\GlueApplication\CompanyUserAccessTokensResourceRoutePlugin` |

## 3. Regenerate transfers and API resources

```bash
docker/sdk cli console transfer:generate
docker/sdk cli glue api:generate
docker/sdk cli glue cache:clear
```

## Relationship plugin status

| Plugin | Registered on resource | Status | Notes |
|---|---|---|---|
| `CompanyByCompanyUserResourceRelationshipPlugin` | `company-users` | Remains | Registered on `company-users` for the legacy company endpoint still served by `CompanyRolesRestApi`/`CompanyBusinessUnitsRestApi`. Do not remove until those modules are migrated. |
| `CompanyBusinessUnitByCompanyUserResourceRelationshipPlugin` | `company-users` | Remains | Same reasoning as above. Do not remove yet. |
| `CompanyRoleByCompanyUserResourceRelationshipPlugin` | `company-users` | Remains | Same reasoning as above. Do not remove yet. |
| `CustomerByCompanyUserResourceRelationshipPlugin` | `company-users` | Remains | Registered to expose customer data via the legacy `company-users` relationship. Do not remove yet. |
