---
title: API Platform Enablement
description: Learn how to create and enable API Platform resources in your Spryker project.
last_updated: Apr 7, 2026
template: howto-guide-template
related:
  - title: API Platform
    link: docs/dg/dev/architecture/api-platform.html
  - title: How to integrate API Platform
    link: docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html
  - title: API Platform Configuration
    link: docs/dg/dev/architecture/api-platform/configuration.html
  - title: Resource Schemas
    link: docs/dg/dev/architecture/api-platform/resource-schemas.html
  - title: Validation Schemas
    link: docs/dg/dev/architecture/api-platform/validation-schemas.html
  - title: CodeBucket Support
    link: docs/dg/dev/architecture/api-platform/code-buckets.html
  - title: API Platform Testing
    link: docs/dg/dev/architecture/api-platform/testing.html
  - title: Error Handling
    link: docs/dg/dev/architecture/api-platform/error-handling.html
---

This document describes how to create and enable API Platform resources in your Spryker project.

## Prerequisites

Before creating API resources, ensure you have:

- Integrated API Platform as described in [How to integrate API Platform](/docs/dg/dev/upgrade-and-migrate/integrate-api-platform.html)
- Configured your application's bundle files
- Configured API types as described in [API Platform Configuration](/docs/dg/dev/architecture/api-platform/configuration.html)

## Creating your first API resource

### 1. Define the resource schema

Create a schema file that defines your API resource structure. Schemas should be placed in `resources/api/{api-type}/` directory within your module.

**Example: Customer resource for Back Office API**

`src/Pyz/Glue/Customer/resources/api/backend/customers.resource.yml`

```yaml
# yaml-language-server: $schema=../../../../../vendor/spryker/api-platform/resources/schemas/api-resource-schema-v1.json

resource:
    name: Customers
    shortName: Customer
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
                example: "test@spryker.com"

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

The Provider is responsible for fetching data (GET operations). Extend `AbstractProvider` and override the methods for the operations you support:

`src/Pyz/Glue/Customer/Api/Backend/Provider/CustomerBackendProvider.php`

```php
<?php

namespace Pyz\Glue\Customer\Api\Backend\Provider;

use ApiPlatform\State\Pagination\TraversablePaginator;
use Generated\Api\Backend\CustomersBackendResource;
use Generated\Shared\Transfer\CustomerTransfer;
use Spryker\ApiPlatform\State\Provider\AbstractProvider;
use Spryker\Zed\Customer\Business\CustomerFacadeInterface;

class CustomerBackendProvider extends AbstractProvider
{
    public function __construct(
        private CustomerFacadeInterface $customerFacade,
    ) {
    }

    protected function provideItem(): ?object
    {
        $customerReference = $this->getUriVariables()['customerReference'];
        $customerTransfer = $this->customerFacade->findCustomerByReference($customerReference);

        if ($customerTransfer === null) {
            return null;
        }

        return $this->mapToResource($customerTransfer);
    }

    /**
     * @return \ApiPlatform\State\Pagination\TraversablePaginator<\Generated\Api\Backend\CustomersBackendResource>
     */
    protected function provideCollection(): TraversablePaginator
    {
        $pagination = $this->getPagination();
        $customerCollection = $this->customerFacade->getCustomerCollection(
            $pagination['page'],
            $pagination['itemsPerPage'],
        );

        $resources = [];
        foreach ($customerCollection->getCustomers() as $customerTransfer) {
            $resources[] = $this->mapToResource($customerTransfer);
        }

        return new TraversablePaginator(
            new \ArrayObject($resources),
            $pagination['page'],
            $pagination['itemsPerPage'],
            $customerCollection->getTotalCount(),
        );
    }

    private function mapToResource(CustomerTransfer $customerTransfer): CustomersBackendResource
    {
        $resource = new CustomersBackendResource();
        $resource->fromArray($customerTransfer->toArray());

        return $resource;
    }
}
```

`AbstractProvider` automatically routes `Get` operations to `provideItem()` and `GetCollection` operations to `provideCollection()`. It also provides built-in helpers:

| Method | Purpose |
|--------|---------|
| `getUriVariables()` | Access URI variables (for example, `customerReference` from `/customers/{customerReference}`) |
| `getPagination()` | Extract `page` and `itemsPerPage` from query parameters |
| `getLocale()` | Get the current locale from the request |
| `getStore()` | Get the current store from the request |
| `getRequest()` | Access the full Symfony Request object |
| `getOperation()` | Access the current API Platform Operation |

### 4. Implement the Processor

The Processor handles data modifications (POST, PUT, PATCH, DELETE). Extend `AbstractProcessor` and override the methods for the operations you support:

`src/Pyz/Glue/Customer/Api/Backend/Processor/CustomerBackendProcessor.php`

```php
<?php

namespace Pyz\Glue\Customer\Api\Backend\Processor;

use Generated\Api\Backend\CustomersBackendResource;
use Generated\Shared\Transfer\CustomerTransfer;
use Spryker\ApiPlatform\State\Processor\AbstractProcessor;
use Spryker\Zed\Customer\Business\CustomerFacadeInterface;

class CustomerBackendProcessor extends AbstractProcessor
{
    public function __construct(
        private CustomerFacadeInterface $customerFacade,
    ) {
    }

    protected function processPost(): mixed
    {
        $customerTransfer = $this->mapToTransfer($this->data);
        $savedCustomer = $this->customerFacade->createCustomer($customerTransfer);

        return $this->mapToResource($savedCustomer);
    }

    protected function processPatch(): mixed
    {
        $customerTransfer = $this->mapToTransfer($this->data);
        $customerTransfer->setCustomerReference($this->getUriVariables()['customerReference']);
        $updatedCustomer = $this->customerFacade->updateCustomer($customerTransfer);

        return $this->mapToResource($updatedCustomer);
    }

    protected function processDelete(): mixed
    {
        $this->customerFacade->deleteCustomer($this->getUriVariables()['customerReference']);

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

`AbstractProcessor` automatically routes operations to the correct method based on the HTTP method. The deserialized request body is available as `$this->data`. The same context helpers as `AbstractProvider` are available (`getUriVariables()`, `getLocale()`, `getStore()`, etc.).

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

### 6. Service registration (automatic)

Provider and Processor classes referenced in your resource schema YAML are **automatically discovered and registered** as public, autowired services in the Symfony Dependency Injection container. No manual service registration is needed for standard cases.

The auto-discovery system:
- Reads provider and processor class names from your `*.resource.yml` schema files
- Registers them with `autowire: true`, `autoconfigure: true`, and `public: true`
- Applies the appropriate API Platform tags (`api_platform.state_provider`, `api_platform.state_processor`)
- Also discovers and registers support classes (mappers, resolvers) from `Api/` directories

If you need custom service configuration (non-standard constructor arguments, service decoration, etc.), you can still register services manually in `ApplicationServices.php`:

```php
// config/Glue/ApplicationServices.php
return static function (ContainerConfigurator $configurator): void {
    $services = $configurator->services()
        ->defaults()
        ->autowire()
        ->public()
        ->autoconfigure();

    // Only needed for services that require custom configuration
    $services->set(MyCustomProvider::class)
        ->arg('$customArgument', 'value');
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

CodeBucket support enables you to create Code Bucket-specific API resource variants that are resolved at runtime based on the `APPLICATION_CODE_BUCKET` environment constant.

### When to use CodeBucket resources

Create CodeBucket variants when you need:
- Code Bucket-specific properties (EU GDPR fields, tax rates, compliance data)
- Code Bucket-specific validation rules (country-specific requirements)
- Country-specific business logic
- Feature variations per Code Bucket

### Quick example

**Base resource:**

`src/Pyz/Glue/Customer/resources/api/backend/customers.resource.yml`

```yaml
resource:
  name: Customers
  shortName: Customer

  operations:
    - type: Get
    - type: Post

  properties:
    customerReference:
      type: string
      identifier: true
    email:
      type: string
    firstName:
      type: string
```

**EU-specific variant:**

`src/Pyz/Glue/CustomerEU/resources/api/backend/customers.resource.yml`

```yaml
resource:
  name: Customers
  shortName: Customer
  codeBucket: EU
  
  operations:
    - type: Get
    - type: Post

  properties:
    customerReference:
      type: string
      identifier: true
    email:
      type: string
    firstName:
      type: string

    # EU-specific properties
    gdprConsentDate:
      type: string
      description: "Date of GDPR consent"
    dataPrivacyOfficerEmail:
      type: string
      description: "Data privacy officer contact"
```

**Generate resources:**

```bash
docker/sdk cli GLUE_APPLICATION=GLUE_BACKEND glue api:generate backend
```

This generates:
- `CustomersBackendResource.php` (base)
- `CustomersEUBackendResource.php` (with `CODE_BUCKET = 'EU'`)

**Runtime behavior:**

- Request to `glue.eu.spryker.local/customers` → Uses `CustomersEUBackendResource`
- Request to `glue.de.spryker.local/customers` → Uses `CustomersBackendResource` (fallback)
- Request to `glue.at.spryker.local/customers` → Uses `CustomersBackendResource` (or `CustomersATBackendResource` if variant exists)

For a comprehensive guide including Provider implementation and advanced scenarios, see [CodeBucket Support](/docs/dg/dev/architecture/api-platform/code-buckets.html).

## API types and use cases

Spryker supports multiple API types for different use cases:

### Storefront API (Glue)

- **API Type:** `storefront`
- **Module location:** `src/Spryker/{Module}/resources/api/storefront/`
- **Generated namespace:** `Generated\Api\Storefront`
- **Use cases:** Customer-facing APIs, mobile apps, PWAs

### Back Office API (Glue)

- **API Type:** `backend`
- **Module location:** `src/Pyz/Glue/{Module}/resources/api/backend/`
- **Generated namespace:** `Generated\Api\Backend`
- **Use cases:** Admin panels, internal tools, ERP integrations

### Merchant Portal API

- **API Type:** `merchant-portal`
- **Module location:** `src/Spryker/{Module}/resources/api/merchant-portal/`
- **Generated namespace:** `Generated\Api\MerchantPortal`
- **Use cases:** Marketplace merchant interfaces

## Schema layering and inheritance

API Platform supports multi-layer schema definitions with automatic merging:

### Core layer

`vendor/spryker/customer/resources/api/backend/customer.resource.yml` - Base definition

### Feature layer

`src/SprykerFeature/CustomerRelationManagement/resources/api/backend/customer.resource.yml` - Feature enhancements

### Project layer

`src/Pyz/Glue/Customer/resources/api/backend/customer.resource.yml` - Project customizations

The generator automatically merges these schemas with project layer taking precedence.

## Debugging resources

Use the debug command to inspect resources:

```bash
# List all resources
docker/sdk cli glue  api:debug --list

# Show resource details
docker/sdk cli glue  api:debug customers --api-type=backend

# Show merged schema
docker/sdk cli glue  api:debug customers --api-type=backend --show-merged

# Show source files
docker/sdk cli glue  api:debug customers --api-type=backend --show-sources
```

## Next steps

- [Resource Schemas](/docs/dg/dev/architecture/api-platform/resource-schemas.html) - Deep dive into resource schema syntax
- [Validation Schemas](/docs/dg/dev/architecture/api-platform/validation-schemas.html) - Define validation rules for your resources
- [CodeBucket Support](/docs/dg/dev/architecture/api-platform/code-buckets.html) - Create Code Bucket-specific resources
- [API Platform Testing](/docs/dg/dev/architecture/api-platform/testing.html) - Learn how to write tests for your API resources
- [Troubleshooting](/docs/dg/dev/architecture/api-platform/troubleshooting.html) - Common issues and solutions
