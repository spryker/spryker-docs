---
title: "Migrate AgentAuthRestApi to API Platform"
description: Step-by-step guide to migrate the AgentAuthRestApi module to the API Platform Agent module.
last_updated: Apr 07, 2026
template: howto-guide-template
related:
  - title: Migrate Glue REST API to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html
---

This document describes how to migrate the `AgentAuthRestApi` Glue module to the API Platform `Agent` module.

## Prerequisites

Complete the cross-cutting changes described in [Migrate Glue REST API to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html) before proceeding.

## Overview

The `AgentAuthRestApi` module provided the following storefront endpoints:

| Endpoint | Operation | Old plugin |
|---|---|---|
| `POST /agent-access-tokens` | Create agent access token | `AgentAccessTokensResourceRoutePlugin` |
| `POST /agent-customer-impersonation-access-tokens` | Impersonate customer as agent | `AgentCustomerImpersonationAccessTokensResourceRoutePlugin` |
| `GET /agent-customer-search` | Search for customers (agent) | `AgentCustomerSearchResourceRoutePlugin` |

These are now served by the API Platform `Agent` module.

## 1. Update module dependencies

```bash
composer require spryker/agent:"^X.Y.Z"
```

{% info_block infoBox "Version" %}

Use the version that includes the API Platform resources. Check the module changelog for the exact version.

{% endinfo_block %}

## 2. Remove route plugins from GlueApplicationDependencyProvider

In `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php`, remove the following plugins from `getResourceRoutePlugins()`:

| Plugin to remove | Fully qualified class name |
|---|---|
| `AgentAccessTokensResourceRoutePlugin` | `Spryker\Glue\AgentAuthRestApi\Plugin\GlueApplication\AgentAccessTokensResourceRoutePlugin` |
| `AgentCustomerImpersonationAccessTokensResourceRoutePlugin` | `Spryker\Glue\AgentAuthRestApi\Plugin\GlueApplication\AgentCustomerImpersonationAccessTokensResourceRoutePlugin` |
| `AgentCustomerSearchResourceRoutePlugin` | `Spryker\Glue\AgentAuthRestApi\Plugin\GlueApplication\AgentCustomerSearchResourceRoutePlugin` |

## 3. Regenerate transfers and API resources

```bash
docker/sdk cli console transfer:generate
docker/sdk cli glue api:generate
docker/sdk cli glue cache:clear
```

## Relationship plugin status

The `AgentAuthRestApi` module did not register any relationship plugins. No relationship changes are needed.
