---
title: "Migrate OauthApi to API Platform"
description: Step-by-step guide to migrate the OauthApi module to API Platform.
last_updated: Apr 24, 2026
template: howto-guide-template
related:
  - title: Migrate Glue REST API to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html
  - title: Migrate AuthRestApi to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-authrestapi.html
---

This document describes how to migrate the `OauthApi` Glue module to API Platform. The `OauthApi` module now ships an API Platform `/token` resource in-place — the Processor class and resource schema live inside the `OauthApi` module itself and delegate to the `Authentication` client.

## Prerequisites

Complete the cross-cutting changes described in [Migrate Glue REST API to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html) before proceeding.

## Overview

The `OauthApi` module provided the `/token` endpoint for the `GlueStorefrontApiApplication`. It registered the resource through the `OauthApiTokenResource` plugin, which routed requests to a legacy controller. This endpoint is now served by API Platform:

| Endpoint | Operation | Legacy plugin |
|---|---|---|
| `POST /token` | OAuth2 token endpoint supporting `password` and `refresh_token` grant types | `OauthApiTokenResource` |

The API Platform `Tokens` resource delegates to `Spryker\Client\Authentication\AuthenticationClient::authenticate()`, which returns an `OauthResponseTransfer` used to populate the response.

{% info_block infoBox "Application scope" %}

This `/token` endpoint is registered only in the `GlueStorefrontApiApplication`. In the legacy Glue application, `/token` is served by the `AuthRestApi` module — see [Migrate AuthRestApi to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-authrestapi.html).

{% endinfo_block %}

## 1. Update module dependencies

```bash
composer require spryker/oauth-api:"^X.Y.Z"
```

{% info_block infoBox "Version" %}

Use the version that ships the API Platform resources. Check the module changelog for the exact version.

{% endinfo_block %}

## 2. Remove OauthApiTokenResource from GlueStorefrontApiApplicationDependencyProvider

In `src/Pyz/Glue/GlueStorefrontApiApplication/GlueStorefrontApiApplicationDependencyProvider.php`, remove the following plugin from `getResourcePlugins()`:

| Plugin to remove | Fully qualified class name |
|---|---|
| `OauthApiTokenResource` | `Spryker\Glue\OauthApi\Plugin\GlueApplication\OauthApiTokenResource` |

Also remove the matching `use` import at the top of the file.

Keep the other `OauthApi` plugins registered in the same file — they continue to wire authentication into the storefront API application:

- `Spryker\Glue\OauthApi\Plugin\AccessTokenValidatorPlugin`
- `Spryker\Glue\OauthApi\Plugin\CustomerRequestBuilderPlugin`
- `Spryker\Glue\OauthApi\Plugin\GlueApplication\CustomerRequestValidatorPlugin`

## 3. Exclude OauthApi from the legacy Glue application

The legacy Glue application serves `/token` through the `AuthRestApi` module. To prevent the `OauthApi` schema from registering a duplicate `/token` route there, exclude it from the legacy Glue application's generator.

In `config/Glue/packages/spryker_api_platform.php`, add `OauthApi` to the `excludedPathFragments` list:

```php
$sprykerApiPlatform->excludedPathFragments([
    'src/Spryker/OauthApi/resources/api/',
    // ...other entries
]);
```

The `GlueStorefrontApiApplication` continues to discover `OauthApi` schemas via `config/GlueStorefront/packages/spryker_api_platform.php` — do not exclude `OauthApi` there.

## 4. Regenerate transfers and API resources

```bash
docker/sdk cli console transfer:generate
docker/sdk cli glue api:generate
docker/sdk cli glue cache:clear
```

## Relationship plugin status

The `OauthApi` module did not register any relationship plugins. No relationship changes are needed.
