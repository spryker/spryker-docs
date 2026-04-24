---
title: "Migrate OauthApi to API Platform"
description: Step-by-step guide to migrate the OauthApi module to the API Platform Oauth module.
last_updated: Apr 07, 2026
template: howto-guide-template
related:
  - title: Migrate Glue REST API to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html
  - title: Migrate AuthRestApi to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-authrestapi.html
---

This document describes how to migrate the `OauthApi` Glue module to the API Platform `Oauth` module.

## Prerequisites

Complete the cross-cutting changes described in [Migrate Glue REST API to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html) before proceeding.

This migration is closely related to [Migrate AuthRestApi](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-authrestapi.html). Complete that migration first.

## Overview

The `OauthApi` module served as the bridge between the `GlueStorefrontApiApplication` and the OAuth2 token issuance stack. It provided the `OauthApiTokenResource` plugin that registered the `/token` endpoint in the storefront API application.

The API Platform `Oauth` module replaces this with a dedicated processor that integrates natively with the API Platform authentication stack.

## 1. Update module dependencies

```bash
composer require spryker/oauth:"^X.Y.Z"
```

{% info_block infoBox "Version" %}

Use the version that includes the API Platform resources. Check the module changelog for the exact version.

{% endinfo_block %}

## 2. Remove OauthApiTokenResource from GlueStorefrontApiApplicationDependencyProvider

In `src/Pyz/Glue/GlueStorefrontApiApplication/GlueStorefrontApiApplicationDependencyProvider.php`, remove the following plugin from `getResourcePlugins()`:

| Plugin to remove | Fully qualified class name |
|---|---|
| `OauthApiTokenResource` | `Spryker\Glue\OauthApi\Plugin\GlueApplication\OauthApiTokenResource` |

## 3. Delete the obsolete OauthApiConfig

Delete `src/Pyz/Glue/OauthApi/OauthApiConfig.php`. This file overrode `isConventionalResponseCodeEnabled()` to return `true`, which controlled the HTTP status code for token responses in the legacy Glue layer. The API Platform `Oauth` module uses standard HTTP status codes natively — this override is no longer needed.

## 4. Regenerate transfers and API resources

```bash
docker/sdk cli console transfer:generate
docker/sdk cli glue api:generate
docker/sdk cli glue cache:clear
```

## Relationship plugin status

The `OauthApi` module did not register any relationship plugins. No relationship changes are needed.
