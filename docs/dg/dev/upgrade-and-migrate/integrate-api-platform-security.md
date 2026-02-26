---
title: How to integrate API Platform Security
description: This document describes how to set up authentication and authorization for API Platform in your Spryker application.
last_updated: Feb 26, 2026
template: howto-guide-template
related:
  - title: Security
    link: docs/dg/dev/architecture/api-platform/security.html
  - title: How to integrate API Platform
    link: docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html
  - title: Symfony Bundles in Spryker
    link: docs/dg/dev/architecture/symfony-bundles.html
  - title: Resource Schemas
    link: docs/dg/dev/architecture/api-platform/resource-schemas.html
---

This document describes how to integrate Symfony's SecurityBundle with the API Platform to enable authentication and authorization for your API resources.

## Prerequisites

- API Platform is already integrated as described in [How to integrate API Platform](/docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html).
- The `spryker/api-platform` module version `0.5.0` or later is installed.

## 1. Register the SecurityBundle

Add `SecurityBundle` to the `bundles.php` file for each Glue application where you want to enable security.

### For Glue application

`config/Glue/bundles.php`

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

`config/GlueStorefront/bundles.php`

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

`config/GlueBackend/bundles.php`

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

`config/Glue/packages/security.php`

```php
<?php

declare(strict_types=1);

use Spryker\ApiPlatform\Security\ApiUserProvider;
use Spryker\ApiPlatform\Security\OauthAuthenticator;
use Symfony\Config\SecurityConfig;

return static function (SecurityConfig $security): void {
    $security->provider('api_oauth_provider')
        ->id(ApiUserProvider::class);

    $security->firewall('main')
        ->lazy(true)
        ->stateless(true)
        ->provider('api_oauth_provider')
        ->customAuthenticators([OauthAuthenticator::class]);

    // Public by default - individual resources use security expressions for authorization
    $security->accessControl()
        ->path('^/')
        ->roles(['PUBLIC_ACCESS']);
};
```

### For GlueStorefront application

`config/GlueStorefront/packages/security.php`

Use the same configuration as above.

### For GlueBackend application

`config/GlueBackend/packages/security.php`

Use the same configuration as above.

### Configuration explained

| Setting | Description |
|---------|-------------|
| `provider('api_oauth_provider')` | Registers the user provider that builds `ApiUser` objects from validated JWT claims. |
| `firewall('main')->lazy(true)` | The authenticator is only instantiated when a route requires authentication, reducing overhead for public endpoints. |
| `firewall('main')->stateless(true)` | Disables session-based authentication. Every request must include its own Bearer token. |
| `customAuthenticators([OauthAuthenticator::class])` | Registers the Spryker OAuth authenticator that validates Bearer tokens using the local OAuth infrastructure. |
| `accessControl()->roles(['PUBLIC_ACCESS'])` | Grants public access to all paths by default. Individual resources opt in to authentication using `security` expressions. |

## 3. Add security expressions to resources

After the SecurityBundle is configured, you can protect resources using security expressions in your YAML resource schemas.

### Protect an entire resource

```yaml
resource:
  name: Customers
  shortName: customers
  security: "is_granted('ROLE_USER')"

  operations:
    - type: Get
    - type: Patch
    - type: Delete
```

### Protect specific operations

```yaml
resource:
  name: Customers
  shortName: customers

  operations:
    - type: Post
      # Public — allows registration without authentication

    - type: Get
      security: "is_granted('ROLE_USER')"

    - type: Patch
      security: "is_granted('ROLE_USER')"
```

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

Send a request without a token to a protected resource — it should return `401 Unauthorized`:

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

```
InvalidArgumentException: The SecurityBundle is not registered but security expressions
were found in the following resources: [customers, orders]. Register the SecurityBundle
in config/{Application}/bundles.php.
```

This validation is performed by the `SecurityServiceRegistrationPass` compiler pass.

## Next steps

- [Security](/docs/dg/dev/architecture/api-platform/security.html) - Understanding authentication and authorization
- [Resource Schemas](/docs/dg/dev/architecture/api-platform/resource-schemas.html) - Security expression syntax
- [API Platform Configuration](/docs/dg/dev/architecture/api-platform/configuration.html) - Configuration options
