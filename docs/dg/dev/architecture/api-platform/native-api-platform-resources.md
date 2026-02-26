---
title: Native API Platform Resources
description: How to use native API Platform resource definitions alongside or instead of Spryker's YAML-based generation.
last_updated: Feb 26, 2026
template: howto-guide-template
related:
  - title: API Platform
    link: docs/dg/dev/architecture/api-platform.html
  - title: Resource Schemas
    link: docs/dg/dev/architecture/api-platform/resource-schemas.html
  - title: API Platform Configuration
    link: docs/dg/dev/architecture/api-platform/configuration.html
  - title: How to integrate API Platform
    link: docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html
---

This document explains how to create API Platform resources using native PHP attributes instead of Spryker's YAML-based generation pipeline, and how to configure your project to discover these resources.

## When to use native resources

Spryker's YAML schema pipeline (`resource.yml` files) generates PHP resource classes automatically and provides features like multi-layer merging, validation auto-discovery, and CodeBucket support. For most use cases, the YAML approach is recommended.

Use native API Platform resources when you need features that are not yet supported by the Spryker SchemaParser and ClassGenerator, such as:

- [Custom filters](https://api-platform.com/docs/core/filters/) (search, date range, order)
- [GraphQL support](https://api-platform.com/docs/core/graphql/)
- [Messenger integration](https://api-platform.com/docs/core/messenger/)
- [Custom operations](https://api-platform.com/docs/core/operations/) with non-standard HTTP methods
- [DTO input/output](https://api-platform.com/docs/core/dto/) patterns
- [Elasticsearch provider](https://api-platform.com/docs/core/elasticsearch/) integration
- Any other advanced API Platform feature documented at [api-platform.com/docs](https://api-platform.com/docs/)

## Creating a native resource class

A native API Platform resource is a PHP class annotated with `#[ApiResource]` and related attributes. You can place it in any directory that is configured as a mapping path.

### Example resource

```php
<?php

declare(strict_types=1);

namespace Pyz\Glue\Catalog\Api\Backend\Resource;

use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use Pyz\Glue\Catalog\Api\Backend\Provider\CatalogSearchBackendProvider;

#[ApiResource(
    operations: [
        new GetCollection(),
        new Get(),
    ],
    shortName: 'catalog-search',
    provider: CatalogSearchBackendProvider::class,
    paginationEnabled: true,
    paginationItemsPerPage: 20,
)]
final class CatalogSearchBackendResource
{
    #[ApiProperty(identifier: true, writable: false)]
    public ?string $sku = null;

    #[ApiProperty]
    public ?string $name = null;

    #[ApiProperty]
    public ?float $price = null;

    #[ApiProperty(writable: false)]
    public ?string $url = null;
}
```

This follows the same provider/processor pattern as generated resources. For full attribute documentation, see the [API Platform resource configuration reference](https://api-platform.com/docs/core/getting-started/#mapping-the-entities).

### Provider for the native resource

```php
<?php

declare(strict_types=1);

namespace Pyz\Glue\Catalog\Api\Backend\Provider;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;

class CatalogSearchBackendProvider implements ProviderInterface
{
    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        // Fetch data from your business layer and return resource objects
    }
}
```

## Configuring custom resource paths

API Platform discovers resource classes from directories listed in the `mapping.paths` configuration. By default, Spryker configures only the generated resource directory:

```php
$apiPlatform->mapping()->paths([
    '%kernel.project_dir%/src/Generated/Api/Backend',
]);
```

To make API Platform discover your native resources, add your directory to this list.

### Adding a custom path

Edit the `api_platform.php` configuration file for the application where your resources should be available.

For GlueBackend resources, edit `config/GlueBackend/packages/api_platform.php`:

```php
<?php

declare(strict_types=1);

use Symfony\Config\ApiPlatformConfig;

return static function (ApiPlatformConfig $apiPlatform, string $env): void {
    $apiPlatform->mapping()->paths([
        '%kernel.project_dir%/src/Generated/Api/Backend',
        '%kernel.project_dir%/src/Pyz/Glue/*/Api/Backend/Resource',
    ]);

    // ... rest of configuration
};
```

For GlueStorefront resources, edit `config/GlueStorefront/packages/api_platform.php`:

```php
$apiPlatform->mapping()->paths([
    '%kernel.project_dir%/src/Generated/Api/Storefront',
    '%kernel.project_dir%/src/Pyz/Glue/*/Api/Storefront/Resource',
]);
```

{% info_block warningBox "Keep the generated path" %}

Always keep the `src/Generated/Api/{ApiType}` path in the list. Removing it disables all YAML-generated resources.

{% endinfo_block %}

### Directory structure example

```
src/
├── Generated/
│   └── Api/
│       └── Backend/
│           └── CustomersBackendResource.php       # Generated from YAML
├── Pyz/
│   └── Glue/
│       └── Catalog/
│           └── Api/
│               └── Backend/
│                   ├── Resource/
│                   │   └── CatalogSearchBackendResource.php  # Native resource
│                   └── Provider/
│                       └── CatalogSearchBackendProvider.php
```

Both the generated and native resources are discovered and served by API Platform.

## Coexistence with generated resources

Native resources and YAML-generated resources coexist without conflict. API Platform treats all discovered `#[ApiResource]` classes equally, regardless of whether they were generated or hand-written.

Key points:

- **No naming conflicts**: Ensure `shortName` values are unique across all resources in the same API type.
- **Same provider/processor pattern**: Native resources use the same `ProviderInterface` and `ProcessorInterface` as generated resources.
- **Same serialization**: Native resources use the same JSON:API (or other configured) format.
- **Same security model**: Native resources can use the same `security` expressions. See [Security](/docs/dg/dev/architecture/api-platform/security.html).

## Limitations of native resources

Native resources bypass the Spryker generation pipeline, which means the following features are not available:

| Feature | Available | Alternative |
|---------|-----------|-------------|
| Multi-layer schema merging (Core, Feature, Project) | No | Manage inheritance manually |
| Validation auto-discovery from `.validation.yml` | No | Use `#[Assert\*]` attributes directly on properties |
| CodeBucket support | No | Use conditional logic in providers |
| `api:debug` command output | No | Use `debug:router` instead |
| `api:generate` management | No | Manage files manually |

## Validation on native resources

Without the YAML validation pipeline, add Symfony Validator constraints directly as attributes:

```php
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(/* ... */)]
final class CatalogSearchBackendResource
{
    #[ApiProperty(identifier: true)]
    public ?string $sku = null;

    #[Assert\NotBlank]
    #[Assert\Length(min: 1, max: 255)]
    public ?string $name = null;

    #[Assert\PositiveOrZero]
    public ?float $price = null;
}
```

For the full list of available constraints, see the [Symfony Validator documentation](https://symfony.com/doc/current/validation.html#constraints).

## Next steps

- [API Platform Configuration](/docs/dg/dev/architecture/api-platform/configuration.html) - Full configuration reference
- [Resource Schemas](/docs/dg/dev/architecture/api-platform/resource-schemas.html) - YAML-based resource generation
- [API Platform official documentation](https://api-platform.com/docs/) - Full API Platform reference
