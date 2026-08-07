---
title: API Platform security
description: Understanding authentication and authorization in API Platform resources.
last_updated: Jul 31, 2026
template: concept-topic-template
related:
  - title: API Platform
    link: docs/integrations/spryker-api/api-platform/api-platform.html
  - title: Integrate API Platform security
    link: docs/integrations/spryker-api/authenticating-and-authorization/integrate-api-platform-security.html
  - title: Resource schemas
    link: docs/integrations/spryker-api/api-platform/resource-schemas.html
  - title: Native API Platform resources
    link: docs/integrations/spryker-api/api-platform/native-api-platform-resources.html
redirect_from:
  - /docs/dg/dev/architecture/api-platform/security.html
---

This document explains how authentication and authorization work in the API Platform integration and how to secure your API resources.

## Overview

Spryker's API Platform security is built on Symfony's [SecurityBundle](https://symfony.com/doc/current/security.html) and provides the following:

- **Authentication**: Bearer token (JWT) validation using Spryker's OAuth infrastructure.
- **Authorization**: Security expressions on resources and operations using Symfony's `is_granted()` function.
- **Role mapping**: OAuth scopes from JWT tokens are automatically mapped to Symfony roles.

For setup instructions, see [Integrate API Platform security](/docs/integrations/spryker-api/authenticating-and-authorization/integrate-api-platform-security.html).

## How authentication works

When a request includes an `Authorization: Bearer <token>` header, the following flow is executed:

1. The `OauthAuthenticator` extracts the Bearer token from the request header.
2. The token is validated locally using Spryker's OAuth client infrastructure — no Zed call is required.
3. JWT claims (user ID, scopes, client ID) are extracted from the validated token.
4. An `ApiUser` object is created with the extracted claims and made available through Symfony's security system.

If no `Authorization` header is present, the request proceeds as unauthenticated. Resources that require authentication must enforce it using security expressions.

### Public by default

The default security configuration grants `PUBLIC_ACCESS` to all paths. This means all endpoints are publicly accessible unless a resource explicitly defines a `security` expression. This approach lets you selectively protect resources rather than maintaining a global allowlist.

## Security expressions

Security expressions are the primary mechanism for protecting API resources. They use [Symfony's ExpressionLanguage](https://symfony.com/doc/current/security/expressions.html) and are evaluated at different stages of request processing.

### Resource-level security

Apply security to all operations of a resource:

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

All operations on this resource require the user to have `ROLE_USER`.

### Operation-level security

Apply security to specific operations while keeping others public:

```yaml
resource:
  name: Customers
  shortName: customers

  operations:
    - type: Post
      # No security — registration is public

    - type: Get
      security: "is_granted('ROLE_USER')"

    - type: Patch
      security: "is_granted('ROLE_USER')"

    - type: Delete
      security: "is_granted('ROLE_USER')"
```

Operation-level security overrides resource-level security for that specific operation.

### Post-denormalize security

Evaluated after the request body has been deserialized into the resource object. This lets you check authorization based on the submitted data:

```yaml
resource:
  name: Orders
  shortName: orders
  securityPostDenormalize: "is_granted('EDIT', object)"
```

The `object` variable refers to the deserialized resource instance.

### Post-validation security

Evaluated after validation has passed. Use this when authorization depends on validated data:

```yaml
resource:
  name: Payments
  shortName: payments
  securityPostValidation: "is_granted('PROCESS', object)"
```

### Expression variables

The following variables are available in security expressions:

| Variable | Description |
|----------|-------------|
| `user` | The authenticated `ApiUser` object, or `null` if unauthenticated |
| `object` | The resource object (available in `securityPostDenormalize` and `securityPostValidation`) |
| `request` | The current Symfony `Request` object |

### Common expression patterns

```yaml
# Require any authenticated user
security: "is_granted('ROLE_USER')"

# Require a specific role
security: "is_granted('ROLE_ADMIN')"

# Allow authenticated users OR public access
security: "is_granted('PUBLIC_ACCESS') or is_granted('ROLE_USER')"
```

### Spryker-specific security keys

In addition to the standard `security`, `securityPostDenormalize`, and `securityPostValidation` expressions, resource schemas support the following Spryker-specific keys that control how denials are reported:

| Key | Purpose |
|-----|---------|
| `securityMessage` | Custom message returned when the `security` expression denies access. |
| `securityCode` | Glue-compatible numeric error code returned with `403 Forbidden` when an authenticated user is denied. |
| `securityGetStatusCode` | For GET requests, the status code to return instead of `403`—typically `404`. The response is rewritten to the provider's not-found error so the API does not reveal whether the resource exists. |
| `securityBearerAuthRequired` | Marks the resource as requiring Bearer authentication. Unauthenticated requests receive the standard `403` `Missing access token.` response. |
| `securityAnonymousAuthRequired` | Appends `or request.headers.has('X-Anonymous-Customer-Unique-Id')` to the security expression at generation time, letting guest customers through. |
| `securityPostDenormalizeMessage`, `securityPostValidationMessage` | Custom messages for the corresponding expressions. |

Example from the Customers resource:

```yaml
resource:
  name: Customers
  shortName: customers
  security: "is_granted('ROLE_CUSTOMER')"
  securityCode: '411'
  securityGetStatusCode: 404
  securityBearerAuthRequired: true
```

## Roles and OAuth scope mapping

When a JWT token is validated, OAuth scopes are automatically mapped to Symfony roles using the following convention:

| OAuth Scope | Symfony Role |
|-------------|-------------|
| `read` | `ROLE_READ` |
| `write` | `ROLE_WRITE` |
| `admin` | `ROLE_ADMIN` |
| `{custom_scope}` | `ROLE_{CUSTOM_SCOPE}` |

All authenticated users automatically receive `ROLE_USER` in addition to their scope-based roles.

The mapping rule is: the scope name is uppercased and prefixed with `ROLE_`.

## Accessing the authenticated user

In providers and processors, you can access the authenticated user through Symfony's `Security` service.

### In a provider

```php
use Spryker\ApiPlatform\State\Provider\AbstractStorefrontProvider;
use Symfony\Bundle\SecurityBundle\Security;

class CustomersStorefrontProvider extends AbstractStorefrontProvider
{
    public function __construct(
        protected Security $security,
    ) {
    }

    protected function provideItem(): ?object
    {
        $user = $this->security->getUser();

        if ($user === null) {
            return null;
        }

        // $user is an instance of ApiUser
        $userId = $user->getUserIdentifier();

        // Access OAuth metadata
        $oauthClientId = $user->getOauthClientId();

        // Fetch and return the customer data using the user ID
    }
}
```

### In a processor

```php
use Spryker\ApiPlatform\State\Processor\AbstractStorefrontProcessor;
use Symfony\Bundle\SecurityBundle\Security;

class CustomersStorefrontProcessor extends AbstractStorefrontProcessor
{
    public function __construct(
        protected Security $security,
    ) {
    }

    protected function processPatch(mixed $data): mixed
    {
        $user = $this->security->getUser();

        // Use the authenticated user context for business logic
    }
}
```

### ApiUser properties

The `ApiUser` object provides the following methods:

| Method | Return Type | Description |
|--------|-------------|-------------|
| `getUserIdentifier()` | `string` | The user ID extracted from the JWT token |
| `getRoles()` | `array` | All roles including `ROLE_USER` and scope-mapped roles |
| `getOauthClientId()` | `string` | The OAuth client ID from the token |
| `getOauthAccessTokenId()` | `string` | The OAuth access token ID |

## Error responses

Error responses keep the Glue-compatible JSON:API format. The exact response depends on why access was denied:

- **Missing token on a protected resource**: the `GlueAuthenticationEntryPoint` returns `403 Forbidden` with the standard Glue error:

  ```json
  {
      "errors": [
          {
              "code": "002",
              "status": 403,
              "detail": "Missing access token."
          }
      ]
  }
  ```

- **Authenticated user denied by a security expression**: the API returns `403 Forbidden` with the resource's configured `securityCode` and `securityMessage`.

- **GET requests on resources with `securityGetStatusCode`**: instead of `403`, the response is rewritten to the configured status—typically `404` with the provider's not-found error—so the API does not reveal whether a resource exists for someone else's account.

- **Resources that do not require Bearer tokens** (`securityBearerAuthRequired` not set, for example agent endpoints): an unauthenticated denial returns `401` with the resource's configured error code.

## Next steps

- [Integrate API Platform security](/docs/integrations/spryker-api/authenticating-and-authorization/integrate-api-platform-security.html) - Setup guide
- [Resource schemas](/docs/integrations/spryker-api/api-platform/resource-schemas.html) - Security expression syntax in schemas
- [Symfony Security documentation](https://symfony.com/doc/current/security.html) - Full Symfony Security reference
