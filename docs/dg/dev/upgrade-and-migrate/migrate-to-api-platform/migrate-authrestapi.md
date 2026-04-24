---
title: "Migrate AuthRestApi to API Platform"
description: Step-by-step guide to migrate the AuthRestApi module to API Platform.
last_updated: Apr 24, 2026
template: howto-guide-template
related:
  - title: Migrate Glue REST API to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html
  - title: Migrate OauthApi to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-oauthapi.html
---

This document describes how to migrate the `AuthRestApi` Glue module to API Platform. The `AuthRestApi` module now ships API Platform resources in-place — the Provider/Processor classes and resource schemas live inside the `AuthRestApi` module itself, reusing the existing `AuthRestApiClient` for OAuth2 token issuance.

## Prerequisites

Complete the cross-cutting changes described in [Migrate Glue REST API to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html) before proceeding.

## Overview

The `AuthRestApi` module provided the following storefront endpoints on the legacy Glue stack. They are now served by API Platform:

| Endpoint | Operation | Legacy plugin |
|---|---|---|
| `POST /access-tokens` | Create an access token via the password grant | `AccessTokensResourceRoutePlugin` |
| `POST /refresh-tokens` | Exchange a refresh token for a new access token | `RefreshTokensResourceRoutePlugin` |
| `DELETE /refresh-tokens/{refreshToken}` | Revoke a single refresh token or all tokens for the current user | `RefreshTokensResourceRoutePlugin` |
| `POST /token` | OAuth2 token endpoint supporting `password` and `refresh_token` grant types | `TokenResourceRoutePlugin` |

The `/token` endpoint is served by `AuthRestApi` only in the legacy Glue application. In the `GlueStorefrontApiApplication`, `/token` is served by the `OauthApi` module — see [Migrate OauthApi to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-oauthapi.html).

## 1. Update module dependencies

```bash
composer require spryker/auth-rest-api:"^X.Y.Z"
```

{% info_block infoBox "Version" %}

Use the version that ships the API Platform resources. Check the module changelog for the exact version.

{% endinfo_block %}

## 2. Remove route plugins from GlueApplicationDependencyProvider

In `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php`, remove the following plugins from `getResourceRoutePlugins()`:

| Plugin to remove | Fully qualified class name |
|---|---|
| `AccessTokensResourceRoutePlugin` | `Spryker\Glue\AuthRestApi\Plugin\AccessTokensResourceRoutePlugin` |
| `RefreshTokensResourceRoutePlugin` | `Spryker\Glue\AuthRestApi\Plugin\RefreshTokensResourceRoutePlugin` |
| `TokenResourceRoutePlugin` | `Spryker\Glue\AuthRestApi\Plugin\GlueApplication\TokenResourceRoutePlugin` |

Also remove the matching `use` imports at the top of the file.

Keep the other `AuthRestApi` plugins registered in the same file — these continue to serve authentication for unmigrated endpoints:

- `Spryker\Glue\AuthRestApi\Plugin\FormatAuthenticationErrorResponseHeadersPlugin`
- `Spryker\Glue\AuthRestApi\Plugin\GlueApplication\AccessTokenRestRequestValidatorPlugin`
- `Spryker\Glue\AuthRestApi\Plugin\GlueApplication\FormattedControllerBeforeActionValidateAccessTokenPlugin`
- `Spryker\Glue\AuthRestApi\Plugin\GlueApplication\SimultaneousAuthenticationRestRequestValidatorPlugin`
- `Spryker\Glue\AuthRestApi\Plugin\RestUserFinderByAccessTokenPlugin`

## 3. Exclude AuthRestApi from the storefront API application

In the `GlueStorefrontApiApplication` (new storefront app), the `/token` endpoint is served by `OauthApi`. To prevent duplicate route definitions, exclude `AuthRestApi` resource schemas from that application's generator.

In `config/GlueStorefront/packages/spryker_api_platform.php`, add `AuthRestApi` to the `excludedPathFragments` list:

```php
$sprykerApiPlatform->excludedPathFragments([
    'src/Spryker/AuthRestApi/resources/api/',
    // ...other entries
]);
```

The legacy Glue application continues to discover `AuthRestApi` schemas via `config/Glue/packages/spryker_api_platform.php` — do not exclude `AuthRestApi` there.

## 4. Regenerate transfers and API resources

```bash
docker/sdk cli console transfer:generate
docker/sdk cli glue api:generate
docker/sdk cli glue cache:clear
```

## Relationship plugin status

The `AuthRestApi` module did not register any relationship plugins. No relationship changes are needed.
