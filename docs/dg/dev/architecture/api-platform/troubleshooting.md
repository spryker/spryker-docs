---
title: Troubleshooting API Platform
description: Common issues and solutions when working with API Platform in Spryker.
last_updated: Nov 24, 2025
template: troubleshooting-guide-template
related:
  - title: API Platform
    link: docs/dg/dev/architecture/api-platform.html
  - title: How to integrate API Platform
    link: docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html
  - title: API Platform Enablement
    link: docs/dg/dev/architecture/api-platform/enablement.html
  - title: Schemas and Resource Generation
    link: docs/dg/dev/architecture/api-platform/schemas-and-resource-generation.html
---

This document provides solutions to common issues when working with API Platform in Spryker.

## Generation issues

### Resources not generating

**Symptom:** Running `console api:generate` completes but no resources are created.

**Possible causes:**

1. **Schema file location is incorrect**

   ```bash
   ❌ src/Pyz/Zed/Customer/api/customers.yml
   ✅ src/Pyz/Zed/Customer/resources/api/backoffice/customers.yml
   ```

2. **API type not configured**

   Check `config/{APPLICATION}/packages/spryker_api_platform.php`:

   ```php
   $containerConfigurator->extension('spryker_api_platform', [
       'api_types' => [
           'backoffice',  // Must match directory name
       ],
   ]);
   ```

3. **Bundle not registered**

   Verify `config/{APPLICATION}/bundles.php` includes:

   ```php
   SprykerApiPlatformBundle::class => ['all' => true],
   ```

**Solution:**

```bash
# Debug to see what's being discovered
console api:debug --list

# Check schema validation
console api:generate --validate-only

# Force regeneration
console api:generate --force
```

### Schema validation errors

**Symptom:** Generation fails with schema validation errors.

**Common errors:**

```bash
# Error: Invalid operation type
❌ operations:
    - type: CREATE

✅ operations:
    - type: Post

# Error: Invalid property type
❌ type: int
✅ type: integer

# Error: Missing resource name
❌ resource:
    shortName: Customer

✅ resource:
    name: Customers
    shortName: Customer
```

**Solution:**

1. Check schema against examples in documentation
2. Use `--validate-only` flag for detailed validation:

   ```bash
   console api:generate --validate-only
   ```

3. Inspect merged schema:

   ```bash
   console api:debug resource-name --show-merged
   ```

### Cache not invalidating

**Symptom:** Changes to schemas don't appear after regeneration.

**Solution:**

```bash
# Clear all caches
console cache:clear

# Force resource regeneration
console api:generate --force

# Rebuild container
console container:build
```

## Runtime issues

### Provider/Processor not found

**Symptom:**

```bash
Error: Class "Pyz\Zed\Customer\Api\Backoffice\Provider\CustomerBackofficeProvider" not found
```

**Possible causes:**

1. Class doesn't exist or namespace is wrong
2. Not registered in the Dependency Injection container
3. Typo in the schema file

**Solution:**

1. Verify the class exists and namespace matches:

   ```php
   namespace Pyz\Zed\Customer\Api\Backoffice\Provider;

   class CustomerBackofficeProvider implements ProviderInterface
   ```

2. Ensure services are auto-discovered in `ApplicationServices.php`:

   ```php
   $services->load('Pyz\\Zed\\', '../../../src/Pyz/Zed/');
   ```

3. Check class name in schema matches exactly:

   ```yaml
   provider: "Pyz\\Zed\\Customer\\Api\\Backoffice\\Provider\\CustomerBackofficeProvider"
   ```

### Validation not working

**Symptom:** API accepts invalid data despite validation rules.

**Possible causes:**

1. Validation schema file not found
2. Wrong operation name in validation schema
3. Validation groups not matching

**Solution:**

1. Ensure validation file exists:

   ```bash
   ✅ resources/api/backoffice/customers.validation.yml
   ```

2. Match operation names to HTTP methods:

   ```yaml
   post:      # For POST /customers
     email:
       - NotBlank

   patch:     # For PATCH /customers/{id}
     email:
       - Optional:
           constraints:
             - Email
   ```

3. Check generated resource class has validation attributes:

   ```php
   #[Assert\NotBlank(groups: ['customers:create'])]
   #[Assert\Email(groups: ['customers:create'])]
   public ?string $email = null;
   ```

### API documentation UI not displaying correctly

**Symptom:** When accessing the root URL of your API application, you see:
- Missing styles/CSS
- Broken JavaScript functionality
- Plain HTML without formatting
- "Failed to load resource" errors in browser console

**Cause:** Assets were not installed after API Platform integration.

**Solution:**

Run the appropriate assets:install command for your application:

**For Glue application (Storefront):**

```bash
glue assets:install
```

**For Zed application (Backoffice):**

```bash
console assets:install
```

After installing assets, clear the cache:

```bash
console cache:clear
```

Then verify the documentation UI loads correctly by visiting the root URL:
- Storefront: `https://glue.mysprykershop.com/`
- Backoffice: `https://backoffice.mysprykershop.com/`

{% info_block warningBox "Required after integration" %}

The `assets:install` command must be run after integrating API Platform and whenever API Platform assets are updated. This is a required step documented in [How to integrate API Platform](/docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html).

{% endinfo_block %}

### 404 Not Found for API endpoints

**Symptom:** API requests return 404.

**Possible causes:**

1. Router not configured
2. Routes not loaded
3. Wrong URL format

**Solution:**

1. Verify `SymfonyRouterPlugin` is registered:

   ```php
   // RouterDependencyProvider
   protected function getRouterPlugins(): array
   {
       return [
           new GlueRouterPlugin(),
           new SymfonyRouterPlugin(), // Must be present
       ];
   }
   ```

2. Check API documentation for correct URLs:

   ```bash
   Storefront: https://glue.mysprykershop.com/
   Backoffice: https://backoffice.mysprykershop.com/
   ```

   The interactive API documentation is available at the root URL of each application.

3. Use correct URL format:

   ```bash
   ❌ /api/v1/customers
   ✅ /customers
   ```

### Pagination not working

**Symptom:** All results returned instead of paginated response.

**Solution:**

1. Enable pagination in schema:

   ```yaml
   resource:
     paginationEnabled: true
     paginationItemsPerPage: 10
   ```

2. Return `PaginatorInterface` from provider:

   ```php
   use ApiPlatform\State\Pagination\TraversablePaginator;

   return new TraversablePaginator(
       new \ArrayObject($results),
       $currentPage,
       $itemsPerPage,
       $totalItems
   );
   ```

3. Use pagination query parameters:

   ```bash
   GET /customers?page=2&itemsPerPage=20
   ```

## Dependency Injection issues

### Services not autowired

**Symptom:**

```bash
Cannot autowire service "CustomerBackofficeProvider": argument "$customerFacade"
references class "CustomerFacadeInterface" but no such service exists.
```

**Solution:**

1. Register facade in `ApplicationServices.php`:

   ```php
   use Pyz\Zed\Customer\Business\CustomerFacadeInterface;
   use Pyz\Zed\Customer\Business\CustomerFacade;

   $services->set(CustomerFacadeInterface::class, CustomerFacade::class);
   ```

2. Ensure constructor uses interface type hints:

   ```php
   public function __construct(
       private CustomerFacadeInterface $customerFacade,  // ✅ Interface
   ) {}
   ```

### Circular reference detected

**Symptom:**

```bash
Circular reference detected for service "Pyz\Zed\Customer\Api\Provider\CustomerBackofficeProvider"
```

**Solution:**

1. Review your dependency graph
2. Break circular dependencies by extracting shared logic
3. Use lazy services if needed

## Performance issues

### Slow resource generation

**Symptom:** `console api:generate` takes very long to complete.

**Solution:**

1. Use caching in production:

   ```bash
   # Don't use --force in production
   console api:generate
   ```

2. Generate specific API types only:

   ```bash
   console api:generate backoffice
   ```

3. Reduce number of source directories:

   ```php
   $containerConfigurator->extension('spryker_api_platform', [
       'source_directories' => [
           'src/Pyz',  // Only project layer
       ],
   ]);
   ```

### Slow API responses

**Symptom:** API endpoints respond slowly.

**Solution:**

1. Enable Symfony cache:

   ```bash
   console cache:warmup
   ```

2. Use pagination for collections
3. Optimize database queries in Provider
4. Use API Platform's built-in caching features

## Development tips

### Debugging schema merging

See which schemas contribute to final resource:

```bash
console api:debug customers --api-type=backoffice --show-sources
```

Output:

```bash
Source Files (priority order):
  ✓ vendor/spryker/customer/resources/api/backoffice/customers.yml (CORE)
  ✓ src/SprykerFeature/CRM/resources/api/backoffice/customers.yml (FEATURE)
  ✓ src/Pyz/Zed/Customer/resources/api/backoffice/customers.yml (PROJECT)
```

### Inspecting generated code

View the generated resource class:

```bash
cat src/Generated/Api/Backoffice/CustomersBackofficeResource.php
```

Check for:
- Correct property types
- Validation attributes
- API Platform metadata

### Testing with dry-run

Preview generation without writing files:

```bash
console api:generate --dry-run
```

## Getting help

If you encounter issues not covered here:

1. **Check logs:**

   ```bash
   tail -f var/log/application.log
   tail -f var/log/exception.log
   ```

2. **Enable debug mode:**

   ```php
   // config/{APPLICATION}/packages/spryker_api_platform.php
   $containerConfigurator->extension('spryker_api_platform', [
       'debug' => true,
   ]);
   ```

3. **Validate environment:**

   ```bash
   php -v  # Check PHP version (8.1+)
   composer show | grep api-platform
   console debug:container | grep -i api
   ```

4. **Common error patterns:**

| Error | Likely cause | Solution |
|-------|--------------|----------|
| `Class not found` | Autoloading issue | Run `composer dump-autoload` |
| `Service not found` | DI configuration | Check `ApplicationServices.php` |
| `Route not found` | Router not configured | Add `SymfonyRouterPlugin` |
| `Validation failed` | Schema mismatch | Regenerate with `--force` |
| `Cache is stale` | Outdated cache | Run `cache:clear` |
| API docs UI broken/unstyled | Assets not installed | Run `console/glue assets:install` |

## Next steps

- [API Platform](/docs/dg/dev/architecture/api-platform.html) - Overview and concepts
- [How to integrate API Platform](/docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html) - Setup guide
- [API Platform Enablement](/docs/dg/dev/architecture/api-platform/enablement.html) - Creating resources
- [Schemas and Resource Generation](/docs/dg/dev/architecture/api-platform/schemas-and-resource-generation.html) - Schema reference
