---
title: Implement an API Platform resource
description: Learn how to create and enable API Platform resources in your Spryker project.
last_updated: Aug 12, 2026
template: howto-guide-template
related:
  - title: API Platform
    link: docs/integrations/spryker-api/api-platform/api-platform.html
  - title: Integrate API Platform
    link: docs/integrations/spryker-api/migrate-from-glue-to-api-platform/integrate-api-platform.html
  - title: API Platform configuration
    link: docs/integrations/spryker-api/api-platform/configuration.html
  - title: Resource schemas
    link: docs/integrations/spryker-api/api-platform/resource-schemas.html
  - title: Validation schemas
    link: docs/integrations/spryker-api/api-platform/validation-schemas.html
  - title: CodeBucket support
    link: docs/integrations/spryker-api/api-platform/code-buckets.html
  - title: Test API Platform resources
    link: docs/integrations/spryker-api/api-platform/testing.html
redirect_from:
  - /docs/dg/dev/architecture/api-platform/enablement.html
---

This document describes how to create and enable API Platform resources in your Spryker project.

## Prerequisites

Before creating API resources, ensure you have:

- Integrated API Platform as described in [Integrate API Platform](/docs/integrations/spryker-api/migrate-from-glue-to-api-platform/integrate-api-platform.html)
- Configured your application's bundle files
- Configured API types as described in [API Platform configuration](/docs/integrations/spryker-api/api-platform/configuration.html)

## Creating your first API resource

### 1. Define the resource schema

Create a schema file that defines your API resource structure. Schemas should be placed in `resources/api/{api-type}/` directory within your module.

**Example: Customer resource for Back Office API**

`src/Pyz/Glue/Customer/resources/api/backend/customers.resource.yml`

```yaml
# yaml-language-server: $schema=../../../../../vendor/spryker/api-platform/resources/schemas/api-resource-schema-v1.json

resource:
    name: Customers
    shortName: customers
    description: "Customer resource for backend API"

    provider: "Pyz\\Glue\\Customer\\Api\\Backend\\Provider\\CustomerBackendProvider"
    processor: "Pyz\\Glue\\Customer\\Api\\Backend\\Processor\\CustomerBackendProcessor"

    paginationEnabled: true
    paginationItemsPerPage: 10

    operations:
        - type: Post
        - type: Get
        - type: GetCollection
        - type: Patch
        - type: Delete

    properties:
        idCustomer:
            type: integer
            description: "The unique identifier of the customer."
            writable: false

        email:
            type: string
            description: "The email address of a user or contact."
            openapiContext:
                example: "test@acme.com"

        firstName:
            type: string
            description: "The first name of a person."
            openapiContext:
                example: "John"

        lastName:
            type: string
            description: "The last name of a user or customer."
            openapiContext:
                example: "Doe"

        customerReference:
            type: string
            description: "A unique reference for a customer."
            writable: false
            identifier: true
```

### 2. Create validation schema

Define validation rules in a separate validation schema file:

`src/Pyz/Glue/Customer/resources/api/backend/customers.validation.yml`

```yaml
post:
    email:
        - NotBlank
        - Email

    firstName:
        - NotBlank
        - Length:
              max: 100

    lastName:
        - NotBlank
        - Length:
              max: 100

patch:
    email:
        - Optional:
              constraints:
                  - NotBlank
                  - Email

    firstName:
        - Optional:
              constraints:
                  - NotBlank
                  - Length:
                        max: 100
```

### 3. Implement the Provider

The Provider is responsible for fetching data (GET operations). Implement the `ProviderInterface`:

`src/Pyz/Glue/Customer/Api/Backend/Provider/CustomerBackendProvider.php`

```php
<?php

namespace Pyz\Glue\Customer\Api\Backend\Provider;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\Pagination\TraversablePaginator;
use ApiPlatform\State\ProviderInterface;
use Pyz\Glue\Customer\Business\CustomerFacadeInterface;
use Generated\Api\Backend\CustomersBackendResource;

class CustomerBackendProvider implements ProviderInterface
{
    public function __construct(
        private CustomerFacadeInterface $customerFacade,
    ) {
    }

    /**
     * @param \ApiPlatform\Metadata\Operation $operation
     * @param array<string, mixed> $uriVariables
     * @param array<string, mixed> $context
     *
     * @return object|array<object>|null
     */
    public function provide(Operation $operation, array $uriVariables = [], array $context = []): object|array|null
    {
        // Single resource (GET /customers/{id})
        if (isset($uriVariables['customerReference'])) {
            return $this->getCustomer($uriVariables['customerReference']);
        }

        // Collection (GET /customers)
        return $this->getCustomers($context);
    }

    private function getCustomer(string $customerReference): ?CustomersBackendResource
    {
        $customerTransfer = $this->customerFacade->findCustomerByReference($customerReference);

        if ($customerTransfer === null) {
            return null;
        }

        // Map to API resource
        $resource = new CustomersBackendResource();
        $resource->fromArray($customerTransfer->toArray());

        return $resource;
    }

    private function getCustomers(array $context): TraversablePaginator
    {
        $filters = $context['filters'] ?? [];
        $page = (int) ($filters['page'] ?? 1);
        $itemsPerPage = (int) ($filters['itemsPerPage'] ?? 10);

        $customerCollection = $this->customerFacade->getCustomerCollection($page, $itemsPerPage);

        $resources = [];
        foreach ($customerCollection->getCustomers() as $customerTransfer) {
            $resource = new CustomersBackendResource();
            $resource->fromArray($customerTransfer->toArray());

            $resources[] = $resource;
        }

        return new TraversablePaginator(
            new \ArrayObject($resources),
            $page,
            $itemsPerPage,
            $customerCollection->getTotalCount()
        );
    }
}
```

### 4. Implement the Processor

The Processor handles data modifications (POST, PUT, PATCH, DELETE). Implement the `ProcessorInterface`:

`src/Pyz/Glue/Customer/Api/Backend/Processor/CustomerBackendProcessor.php`

```php
<?php

namespace Pyz\Glue\Customer\Api\Backend\Processor;

use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\State\ProcessorInterface;
use Pyz\Glue\Customer\Business\CustomerFacadeInterface;
use Generated\Api\Backend\CustomersBackendResource;

class CustomerBackendProcessor implements ProcessorInterface
{
    public function __construct(
        private CustomerFacadeInterface $customerFacade,
    ) {
    }

    /**
     * @param mixed $data
     * @param \ApiPlatform\Metadata\Operation $operation
     * @param array<string, mixed> $uriVariables
     * @param array<string, mixed> $context
     *
     * @return mixed
     */
    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): mixed
    {
        if ($operation instanceof Delete) {
            $this->customerFacade->deleteCustomer($uriVariables['customerReference']);
            return null;
        }

        if ($operation instanceof Post) {
            $customerTransfer = $this->mapToTransfer($data);
            $savedCustomer = $this->customerFacade->createCustomer($customerTransfer);
            return $this->mapToResource($savedCustomer);
        }

        if ($operation instanceof Patch) {
            $customerTransfer = $this->mapToTransfer($data);
            $customerTransfer->setCustomerReference($uriVariables['customerReference']);
            $updatedCustomer = $this->customerFacade->updateCustomer($customerTransfer);
            return $this->mapToResource($updatedCustomer);
        }

        return null;
    }

    private function mapToTransfer(CustomersBackendResource $resource): CustomerTransfer
    {
        $transfer = new CustomerTransfer();
        $transfer->fromArray($resource->toArray(), true);

        return $transfer;
    }

    private function mapToResource(CustomerTransfer $transfer): CustomersBackendResource
    {
        $resource = new CustomersBackendResource();
        $resource->fromArray($transfer->toArray());

        return $resource;
    }
}
```

### 5. Generate the resource

Run the generation command to create the API resource class:

```bash
docker/sdk cli GLUE_APPLICATION=GLUE_BACKEND glue api:generate backend
```

This generates:

`src/Generated/Api/Backend/CustomersBackendResource.php`

The generated class includes:
- API Platform attributes (`#[ApiResource]`, `#[ApiProperty]`)
- Validation constraints (`#[Assert\NotBlank]`, `#[Assert\Email]`, etc.)
- Public properties for all defined fields
- Getters and setters
- `toArray()` and `fromArray()` methods

### 6. Register services in the Dependency Injection container

Make your Provider and Processor available through dependency injection:
**config/Glue/ApplicationServices.php**

```php
<?php

use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;

return static function (ContainerConfigurator $configurator): void {
    $services = $configurator->services()
        ->defaults()
        ->autowire()
        ->public()
        ->autoconfigure();

    // Auto-discover services from your project modules
    $services->load('Pyz\\Glue\\', '../../../src/Pyz/Glue/');
};
```

### 7. Test your API

After generation, your API is immediately available:

```bash
# List all customers
GET /customers

# Get single customer
GET /customers/{customerReference}

# Create customer
POST /customers
{
  "email": "john@example.com",
  "firstName": "John",
  "lastName": "Doe"
}

# Update customer
PATCH /customers/{customerReference}
{
  "firstName": "Jane"
}

# Delete customer
DELETE /customers/{customerReference}
```

## Creating CodeBucket-specific resources

CodeBucket support lets you define resource variants that are resolved at runtime based on the `APPLICATION_CODE_BUCKET` environment constant—for example, an EU variant that adds GDPR-specific properties on top of the base resource. To create a variant, copy the resource schema, add a `codeBucket: <CODE>` key, and regenerate.

For the complete guide, including naming conventions, runtime resolution, Provider implementation, and advanced scenarios, see [CodeBucket support](/docs/integrations/spryker-api/api-platform/code-buckets.html).

## API types and use cases

| API type | Schema location | Generated namespace | Typical use cases |
| --- | --- | --- | --- |
| `storefront` | `resources/api/storefront/` | `Generated\Api\Storefront` | Customer-facing APIs, mobile apps, PWAs |
| `backend` | `resources/api/backend/` | `Generated\Api\Backend` | Admin panels, internal tools, ERP integrations |
| `merchant-portal` | `resources/api/merchant-portal/` | `Generated\Api\MerchantPortal` | Marketplace merchant interfaces |

The API types an application serves are controlled by the `apiTypes()` setting. For details, see [Configuration](/docs/integrations/spryker-api/api-platform/configuration.html).

## Schema layering and inheritance

Schemas for the same resource are merged across layers, with the project layer taking precedence: project (`src/Pyz/`) > feature (`src/SprykerFeature/`) > core (`vendor/spryker/`). For the merge rules and edge cases, see [Resource schemas](/docs/integrations/spryker-api/api-platform/resource-schemas.html).

## Delegating to another module's provider

When a module needs to expose an operation that returns resources owned by a different module, inject the host module's provider and delegate to it rather than duplicating resource-building logic.

### When to use

Use this pattern when:
- Your module resolves a list of IDs (for example, from a storage client) and needs to return fully-built resources of a type defined in another module.
- The host module already owns the reader, mapper, and serializer logic for that resource type.

### How it works

The host provider exposes a public context key constant. The consuming provider resolves its IDs, then calls `provide()` on the injected host provider, passing those IDs in the context:

```php
// Host provider — exposes a context key so callers can pass pre-resolved IDs
class AbstractProductsStorefrontProvider extends AbstractStorefrontProvider
{
    public const string CONTEXT_KEY_ABSTRACT_PRODUCT_IDS = 'abstractProductIds';

    protected function provideCollection(): array
    {
        $abstractProductIds = $this->context[static::CONTEXT_KEY_ABSTRACT_PRODUCT_IDS] ?? null;

        if (is_array($abstractProductIds) && $abstractProductIds !== []) {
            return $this->buildResourcesByAbstractProductIds($abstractProductIds);
        }

        // Normal collection handling (e.g. throw if no identifier provided)
    }
}
```

```php
// Consuming provider — resolves IDs from its own storage, then delegates
class RelatedProductsStorefrontProvider extends AbstractStorefrontProvider
{
    public function __construct(
        protected ProductStorageClientInterface $productStorageClient,
        protected ProductRelationStorageClientInterface $productRelationStorageClient,
        protected AbstractProductsStorefrontProvider $abstractProductsProvider,
        protected RelatedProductsExceptionFactory $exceptionFactory,
    ) {
    }

    protected function provideCollection(): array
    {
        // ... resolve $relatedProductIds from storage ...

        return (array)$this->abstractProductsProvider->provide(
            new GetCollection(),
            $this->uriVariables,
            array_merge($this->context, [
                AbstractProductsStorefrontProvider::CONTEXT_KEY_ABSTRACT_PRODUCT_IDS => $relatedProductIds,
            ]),
        );
    }
}
```

The host provider receives the current request context (locale, store, request object) alongside the pre-resolved IDs, so all its internal helpers (`getLocale()`, `getStore()`) continue to work correctly.

### Key rules

- The host provider MUST declare the context key as a `public const` so consuming providers can reference it without hardcoding strings.
- The consuming provider passes `$this->uriVariables` and `$this->context` unchanged, adding only the IDs key — never replacing the full context.
- The consuming module must declare the host module as a `composer.json` dependency and pin the minor version that introduced the context key.

## Debugging resources

Use `api:debug` to inspect discovered resources, their merged schemas, and source files:

```bash
docker/sdk cli glue api:debug customers --api-type=backend --show-merged
```

For the full flag reference and common failure patterns, see [Troubleshooting](/docs/integrations/spryker-api/api-platform/troubleshooting.html).

## Next steps

- [Resource schemas](/docs/integrations/spryker-api/api-platform/resource-schemas.html) - Deep dive into resource schema syntax
- [Validation schemas](/docs/integrations/spryker-api/api-platform/validation-schemas.html) - Define validation rules for your resources
- [CodeBucket support](/docs/integrations/spryker-api/api-platform/code-buckets.html) - Create Code Bucket-specific resources
- [Test API Platform resources](/docs/integrations/spryker-api/api-platform/testing.html) - Learn how to write tests for your API resources
- [Troubleshooting](/docs/integrations/spryker-api/api-platform/troubleshooting.html) - Common issues and solutions
