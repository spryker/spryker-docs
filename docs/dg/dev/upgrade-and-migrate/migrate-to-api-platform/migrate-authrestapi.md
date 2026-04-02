---
title: "Migrate AuthRestApi to API Platform"
description: Step-by-step guide to migrate the AuthRestApi module to the API Platform Authentication module.
last_updated: Mar 31, 2026
template: howto-guide-template
related:
  - title: Migrate Glue REST API to API Platform
    link: /docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html
---

This document describes how to migrate the `AuthRestApi` Glue module to the API Platform `Authentication` module.

## Prerequisites

Complete the cross-cutting changes described in [Migrate Glue REST API to API Platform](/docs/dg/dev/upgrade-and-migrate/migrate-to-api-platform/migrate-glue-api-to-api-platform.html) before proceeding.

## Overview

The `AuthRestApi` module provided the following storefront endpoints:

| Endpoint | Operation | Old plugin |
|---|---|---|
| `POST /access-tokens` | Create access token | `AccessTokensResourceRoutePlugin` |
| `POST /refresh-tokens` | Create refresh token | `RefreshTokensResourceRoutePlugin` |
| `DELETE /refresh-tokens/{refreshTokenId}` | Revoke refresh token | `RefreshTokensResourceRoutePlugin` |
| `POST /token` | OAuth2 token (form-encoded) | `TokenResourceRoutePlugin` |

These are now served by the API Platform `Authentication` module.

## 1. Update module dependencies

```bash
composer require spryker/authentication:"^X.Y.Z"
```

{% info_block infoBox "Version" %}

Use the version that includes the API Platform resources. Check the module changelog for the exact version.

{% endinfo_block %}

## 2. Remove route plugins from GlueApplicationDependencyProvider

In `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php`, remove the following plugins from `getResourceRoutePlugins()`:

| Plugin to remove | Fully qualified class name |
|---|---|
| `AccessTokensResourceRoutePlugin` | `Spryker\Glue\AuthRestApi\Plugin\AccessTokensResourceRoutePlugin` |
| `RefreshTokensResourceRoutePlugin` | `Spryker\Glue\AuthRestApi\Plugin\RefreshTokensResourceRoutePlugin` |
| `TokenResourceRoutePlugin` | `Spryker\Glue\AuthRestApi\Plugin\GlueApplication\TokenResourceRoutePlugin` |

## 3. Remove OauthApiTokenResource from GlueStorefrontApiApplicationDependencyProvider

In `src/Pyz/Glue/GlueStorefrontApiApplication/GlueStorefrontApiApplicationDependencyProvider.php`, remove the following plugin from `getResourcePlugins()`:

| Plugin to remove | Fully qualified class name |
|---|---|
| `OauthApiTokenResource` | `Spryker\Glue\OauthApi\Plugin\GlueApplication\OauthApiTokenResource` |

## 4. Create Authentication dependency provider

Create a new file `src/Pyz/Glue/Authentication/AuthenticationDependencyProvider.php` to wire the customer identity expander. This file does not exist yet in your project.

```php
<?php

declare(strict_types = 1);

namespace Pyz\Glue\Authentication;

use Spryker\Glue\Authentication\AuthenticationDependencyProvider as SprykerAuthenticationDependencyProvider;
use Spryker\Glue\CompanyUserStorage\Plugin\Authentication\CompanyUserIdentityExpanderPlugin;

class AuthenticationDependencyProvider extends SprykerAuthenticationDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\AuthenticationExtension\Dependency\Plugin\CustomerIdentityExpanderPluginInterface>
     */
    protected function getCustomerIdentityExpanderPlugins(): array
    {
        return [
            new CompanyUserIdentityExpanderPlugin(),
        ];
    }
}
```

## 5. Delete obsolete OauthApiConfig

Delete `src/Pyz/Glue/OauthApi/OauthApiConfig.php` if it exists. This file overrode `isConventionalResponseCodeEnabled()` for the legacy token endpoint, which is no longer needed.

## 6. Regenerate transfers and API resources

```bash
docker/sdk cli console transfer:generate
docker/sdk cli glue api:generate
docker/sdk cli glue cache:clear
```

## Relationship plugin status

The `AuthRestApi` module did not register any relationship plugins. No relationship changes are needed.
