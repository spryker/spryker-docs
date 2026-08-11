---
title: Integrate API Platform security
description: This document describes how to set up authentication and authorization for API Platform in your Spryker application.
last_updated: Aug 7, 2026
template: howto-guide-template
related:
  - title: Security
    link: docs/integrations/spryker-api/authenticating-and-authorization/security.html
  - title: Integrate API Platform
    link: docs/integrations/spryker-api/migrate-from-glue-to-api-platform/integrate-api-platform.html
  - title: Symfony Bundles in Spryker
    link: docs/dg/dev/architecture/symfony-bundles.html
  - title: Resource schemas
    link: docs/integrations/spryker-api/api-platform/resource-schemas.html
redirect_from:
  - /docs/dg/dev/upgrade-and-migrate/integrate-api-platform-security.html
---

This document describes how to integrate Symfony's SecurityBundle with the API Platform to enable authentication and authorization for your API resources.

## Prerequisites

- API Platform is already integrated as described in [Integrate API Platform](/docs/integrations/spryker-api/migrate-from-glue-to-api-platform/integrate-api-platform.html).
- The `spryker/api-platform` module version `1.0.0` or later is installed.

## 1. Register the SecurityBundle

Add `SecurityBundle` to the `bundles.php` file for each Glue application where you want to enable security.

### For Glue application

**config/Glue/bundles.php**

```php
<?php

declare(strict_types = 1);

use ApiPlatform\Symfony\Bundle\ApiPlatformBundle;
use Spryker\ApiPlatform\SprykerApiPlatformBundle;
use Symfony\Bundle\FrameworkBundle\FrameworkBundle;
use Symfony\Bundle\SecurityBundle\SecurityBundle;
use Symfony\Bundle\TwigBundle\TwigBundle;

return [
    FrameworkBundle::class => ['all' => true],
    SecurityBundle::class => ['all' => true],
    TwigBundle::class => ['all' => true],
    ApiPlatformBundle::class => ['all' => true],
    SprykerApiPlatformBundle::class => ['all' => true],
];
```

### For GlueStorefront application

**config/GlueStorefront/bundles.php**

```php
<?php

declare(strict_types = 1);

use ApiPlatform\Symfony\Bundle\ApiPlatformBundle;
use Spryker\ApiPlatform\SprykerApiPlatformBundle;
use Symfony\Bundle\FrameworkBundle\FrameworkBundle;
use Symfony\Bundle\SecurityBundle\SecurityBundle;
use Symfony\Bundle\TwigBundle\TwigBundle;

return [
    FrameworkBundle::class => ['all' => true],
    SecurityBundle::class => ['all' => true],
    TwigBundle::class => ['all' => true],
    ApiPlatformBundle::class => ['all' => true],
    SprykerApiPlatformBundle::class => ['all' => true],
];
```

### For GlueBackend application

**config/GlueBackend/bundles.php**

```php
<?php

declare(strict_types = 1);

use ApiPlatform\Symfony\Bundle\ApiPlatformBundle;
use Spryker\ApiPlatform\SprykerApiPlatformBundle;
use Symfony\Bundle\FrameworkBundle\FrameworkBundle;
use Symfony\Bundle\SecurityBundle\SecurityBundle;
use Symfony\Bundle\TwigBundle\TwigBundle;

return [
    FrameworkBundle::class => ['all' => true],
    SecurityBundle::class => ['all' => true],
    TwigBundle::class => ['all' => true],
    ApiPlatformBundle::class => ['all' => true],
    SprykerApiPlatformBundle::class => ['all' => true],
];
```

{% info_block infoBox "Bundle ordering" %}

`SecurityBundle` must be registered before `ApiPlatformBundle` and `SprykerApiPlatformBundle` so that the security services are available when API Platform compiles its configuration.

{% endinfo_block %}

## 2. Configure the security firewall

Create a `security.php` configuration file for each Glue application. This file defines the authentication provider, firewall, and default access control.

### For Glue application

**config/Glue/packages/security.php**

```php
<?php

declare(strict_types=1);

use Spryker\ApiPlatform\Security\ApiUserProvider;
use Spryker\ApiPlatform\Security\GlueAuthenticationEntryPoint;
use Spryker\ApiPlatform\Security\OauthAuthenticator;
use Symfony\Config\SecurityConfig;

return static function (SecurityConfig $security): void {
    $security->provider('api_oauth_provider')
        ->id(ApiUserProvider::class);

    $security->firewall('main')
        ->lazy(true)
        ->stateless(true)
        ->provider('api_oauth_provider')
        ->customAuthenticators([OauthAuthenticator::class])
        ->entryPoint(GlueAuthenticationEntryPoint::class);

    // Public by default - individual resources use security expressions for authorization
    $security->accessControl()
        ->path('^/')
        ->roles(['PUBLIC_ACCESS']);
};
```

### For GlueStorefront application

**config/GlueStorefront/packages/security.php**

Use the same configuration as above.

### For GlueBackend application

**config/GlueBackend/packages/security.php**

Use the same configuration as above.

### Configuration explained

| Setting | Description |
|---------|-------------|
| `provider('api_oauth_provider')` | Registers the user provider that builds `ApiUser` objects from validated JWT claims. |
| `firewall('main')->lazy(true)` | The authenticator is only instantiated when a route requires authentication, reducing overhead for public endpoints. |
| `firewall('main')->stateless(true)` | Disables session-based authentication. Every request must include its own Bearer token. |
| `customAuthenticators([OauthAuthenticator::class])` | Registers the Spryker OAuth authenticator that validates Bearer tokens using the local OAuth infrastructure. |
| `entryPoint(GlueAuthenticationEntryPoint::class)` | Returns the standard `403` `Missing access token.` error when an unauthenticated request hits a protected resource. |
| `accessControl()->roles(['PUBLIC_ACCESS'])` | Grants public access to all paths by default. Individual resources opt in to authentication using `security` expressions. |

## 3. Add security expressions to resources

After the SecurityBundle is configured, you can protect resources using `security` expressions in your YAML resource schemas, either for an entire resource or for specific operations. For the expression syntax, available variables, and examples, see [API Platform security](/docs/integrations/spryker-api/authenticating-and-authorization/security.html#security-expressions).

### Regenerate resources

After adding security expressions, regenerate your API resources:

```bash
docker/sdk cli glue api:generate
```

## 4. Clear caches

Clear application caches after configuration changes:

```bash
docker/sdk cli console cache:clear
```

## Verification

### Verify SecurityBundle is registered

Check that the security services are available:

```bash
docker/sdk cli glue debug:container SecurityBundle
```

### Test authentication

Send a request without a token to a protected resource — it should return `403 Forbidden` with the `Missing access token.` error:

```bash
curl -s https://glue-storefront.your-domain/customers/DE--1 | jq .
```

Send a request with a valid Bearer token:

```bash
curl -s -H "Authorization: Bearer <your-jwt-token>" \
  https://glue-storefront.your-domain/customers/DE--1 | jq .
```

### Compile-time validation

If you add security expressions to resource schemas but forget to register the SecurityBundle, the application throws an error at compile time:

```text
InvalidArgumentException: The following API resource schemas use security expressions
but SecurityBundle is not registered: customers, orders. Register SecurityBundle in
your bundles.php to enable security expression evaluation.
```

This validation is performed by the `SecurityServiceRegistrationPass` compiler pass.

## Next steps

- [Security](/docs/integrations/spryker-api/authenticating-and-authorization/security.html) - Understanding authentication and authorization
- [Resource schemas](/docs/integrations/spryker-api/api-platform/resource-schemas.html) - Security expression syntax
- [API Platform configuration](/docs/integrations/spryker-api/api-platform/configuration.html) - Configuration options
