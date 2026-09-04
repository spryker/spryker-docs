---
title: Test API Platform resources
description: Learn how to write and run tests for your API Platform resources in Spryker.
last_updated: Aug 17, 2026
template: howto-guide-template
related:
  - title: Prove API Platform contract coverage
    link: docs/integrations/spryker-api/api-platform/contract-coverage.html
  - title: API Platform
    link: docs/integrations/spryker-api/api-platform/api-platform.html
  - title: Implement an API Platform resource
    link: docs/integrations/spryker-api/api-platform/enablement.html
  - title: Resource schemas
    link: docs/integrations/spryker-api/api-platform/resource-schemas.html
  - title: Validation schemas
    link: docs/integrations/spryker-api/api-platform/validation-schemas.html
  - title: Troubleshooting
    link: docs/integrations/spryker-api/api-platform/troubleshooting.html
redirect_from:
  - /docs/dg/dev/architecture/api-platform/testing.html
---

This document describes how to write and run tests for your API Platform resources in your project.

## Overview

API Platform provides a comprehensive testing infrastructure built on top of:

- **Codeception**: Test framework for PHP
- **API Platform Test Client**: Specialized HTTP client for API testing
- **PHPUnit Assertions**: Rich set of assertion methods
- **Test Helpers**: Custom helpers for test data management

The testing infrastructure supports both Backend and Storefront API types with dedicated base classes and configuration.

## Test tiers

Tests split into two tiers by what they cover and what they cost. Put a test in the cheapest tier that can carry it.

| Tier | Covers | Kernel | Cost per test |
|---|---|---|---|
| Logic | Provider and processor mapping, and the mapping from an error to a status. | Shared, built once per process. | About 0.4 ms, after a first boot of about 250 ms. |
| Integration | Full-stack CRUD and the real error surface: authentication to `401` and `403`, validation to `422`, serialization and the response envelope, and `?include=` compound documents. | The real stack. | About 2–3 s, after a one-time database template build. |

Both tiers resolve the system under test from the container, so both exercise the real service wiring. The difference is how far a request travels.

The logic tier stubs the collaborators a test names and calls `provide()` or `process()` directly. Nothing else is stubbed, and there is no automatic doubling—a collaborator you want to control must be registered explicitly.

The integration tier runs without Docker. The booted Glue kernel drives the real client and facade, and each client-to-Zed remote call is dispatched in-process to the gateway controller against a SQLite database, preserving the JSON round trip. Only OAuth token introspection is stubbed. Everything on the data path is real.

Authentication and input-validation negatives belong in the integration tier even though they persist nothing, because the firewall and the framework validator answer before the data layer is reached.

Do not assert on validation constraint messages or JSON structure in the logic tier. Those belong in the integration tier.

## Test architecture

### Test class hierarchy

```bash
AbstractApiTestCase (base class from core)
├── BackendApiTestCase (for Backend API tests)
└── StorefrontApiTestCase (for Storefront API tests)
```

### Key components

| Component | Purpose |
|-----------|---------|
| `AbstractApiTestCase` | Base class providing API Platform integration |
| `BackendApiTestCase` | Pre-configured for Backend API testing |
| `StorefrontApiTestCase` | Pre-configured for Storefront API testing |
| `ApiTestKernel` | Lightweight Symfony kernel for testing |
| `ApiTestAssertionsTrait` | API-specific assertions (from API Platform) |

### Test helper classes

The testing infrastructure provides specialized Codeception helpers to streamline test development:

| Helper Class | Purpose |
|--------------|---------|
| `BootstrapHelper` | Configures application plugin providers for test environments via codeception.yml. Allows different test suites to use different factory implementations without hardcoding dependencies in test infrastructure. |
| `ApiPlatformHelper` | Configures resource generation and cache lifecycle for the test kernel. Has two modes — `project` (default, preserves the compiled container for speed) and `core` (generates fresh resources per suite and cleans the container cache afterwards, used when testing the API Platform module itself). See [ApiPlatformHelper modes](#apiplatformhelper-modes). |
| `ApiPlatformConfigBuilder` | Provides a fluent interface for building test-specific API Platform configurations. Useful for creating isolated test scenarios with custom settings. |
| `ApiResourceGeneratorHelper` | Assists with testing resource generation functionality. Provides methods to generate test resources, validate generation output, and clean up generated files. |

These helpers are automatically available in your test cases through the Codeception actor and provide essential functionality for testing API Platform resources effectively.

## Setting up your test environment

### 1. Configure autoloading for generated test resources

Update your project-level `composer.json` to include the test API namespace:

`composer.json` (project root)

```json
{
    "autoload-dev": {
        "psr-4": {
            "PyzTest\\": "tests/PyzTest/",
            "Generated\\TestApi\\": "tests/_data/Api/"
        }
    }
}
```

### 2. Optional: Configure application plugin providers

If your tests require application plugins to be registered (for example, service providers or middleware), configure the `BootstrapHelper` in your suite's `codeception.yml`:

`tests/PyzTest/Glue/Customer/BackendApi/codeception.yml`

```yaml
modules:
    enabled:
        - \SprykerTest\Shared\Testify\Helper\BootstrapHelper:
            applicationPluginProvider:
                class: Spryker\Glue\GlueBackendApiApplication\GlueBackendApiApplicationFactory
                method: getApplicationPlugins
```

For Storefront API tests, use the appropriate factory:

`tests/PyzTest/Glue/Customer/StorefrontApi/codeception.yml`

```yaml
modules:
    enabled:
        - \SprykerTest\Shared\Testify\Helper\BootstrapHelper:
            applicationPluginProvider:
                class: Spryker\Glue\GlueStorefrontApiApplication\GlueStorefrontApiApplicationFactory
                method: getApplicationPlugins
```

**Configuration options:**

- `class`: The fully qualified class name of the factory that provides application plugins
- `method`: The method name to call on the factory (typically `getApplicationPlugins`)

If no `applicationPluginProvider` is configured, the helper returns an empty array, and tests run without additional application plugins.

### 3. Create test directory structure

```bash
tests/
├── PyzTest/
│   └── Glue/
│       └── Customer/
│           ├── BackendApi/
│           │   ├── codeception.yml
│           │   └── CustomersBackendApiTest.php
│           └── StorefrontApi/
│               ├── codeception.yml
│               └── CustomersStorefrontApiTest.php
└── _data/
    └── Api/
        ├── Backend/
        │   └── CustomersBackendResource.php (generated)
        └── Storefront/
            └── CustomersStorefrontResource.php (generated)
```

### 4. Generate API resources for testing

The resources and the container are automatically generated right before the test suite runs.

#### Automatic resource generation and cleanup

The test infrastructure handles resource lifecycle automatically:

- **Generation** (core mode only): Test-specific API resources are generated into `tests/_data/Api/{ApiType}/` before each suite executes. In project mode, the helper instead validates that the project-generated resources already exist on disk.
- **Cleanup** (core mode only): The `ApiPlatformHelper` clears the compiled Symfony test kernel cache and the generated resources after the suite completes. Project mode deliberately skips this step so the compiled container can be reused across runs.
- **Mode selection**: Choose the mode in `codeception.yml` — see [ApiPlatformHelper modes](#apiplatformhelper-modes) below for the trade-offs.

This automation ensures that:
- Tests always run against the latest schema definitions
- No manual cache clearing is required between test runs
- Test failures related to stale cache are eliminated

## Writing Backend API tests

### Basic test structure

Backend API tests extend `BackendApiTestCase` and use the `BackendApiTester` tester which gets automatically injected into your tests by Codeception.

`tests/PyzTest/Glue/Customer/BackendApi/CustomersBackendApiTest.php`

```php
<?php

namespace PyzTest\Glue\Customer\BackendApi;

use PyzTest\Glue\Customer\BackendApiTester;
use SprykerTest\Shared\ApiPlatform\Test\BackendApiTestCase;

/**
 * @group PyzTest
 * @group Glue
 * @group Customer
 * @group BackendApi
 * @group CustomersBackendApiTest
 */
class CustomersBackendApiTest extends BackendApiTestCase
{
    protected BackendApiTester $tester;

    public function testGivenValidDataWhenCreatingCustomerViaPostThenCustomerIsCreatedSuccessfully(): void
    {
        // Arrange
        $customerData = [
            'email' => 'john.doe@example.com',
            'firstName' => 'John',
            'lastName' => 'Doe',
        ];

        // Act
        static::createClient()->request('POST', '/customers', ['json' => $customerData]);

        // Assert
        $this->assertResponseIsSuccessful();
        $this->assertResponseStatusCodeSame(201);
        $this->assertJsonContains(['email' => 'john.doe@example.com']);
        $this->assertJsonContains(['firstName' => 'John']);
        $this->assertJsonContains(['lastName' => 'Doe']);
    }
}
```

### Testing GET operations

#### Single resource

```php
public function testGivenExistingCustomerWhenRetrievingViaGetThenCustomerDataIsReturned(): void
{
    // Arrange
    $customerTransfer = $this->tester->haveCustomer([
        'email' => 'existing@example.com',
        'firstName' => 'Jane',
        'lastName' => 'Smith',
    ]);

    // Act
    static::createClient()->request(
        'GET',
        sprintf('/customers/%s', $customerTransfer->getCustomerReference())
    );

    // Assert
    $this->assertResponseIsSuccessful();
    $this->assertJsonContains(['email' => 'existing@example.com']);
    $this->assertJsonContains(['firstName' => 'Jane']);
}
```

#### Collection with pagination

```php
public function testGivenMultipleCustomersWhenRetrievingCollectionViaGetThenAllCustomersAreReturned(): void
{
    // Arrange
    $this->tester->haveCustomer(['email' => 'customer1@example.com']);
    $this->tester->haveCustomer(['email' => 'customer2@example.com']);
    $this->tester->haveCustomer(['email' => 'customer3@example.com']);

    // Act
    static::createClient()->request('GET', '/customers');

    // Assert
    $this->assertResponseIsSuccessful();
    $this->assertJsonContains(['@type' => 'Collection']);
    $this->assertJsonContains(['totalItems' => 3]);
}

public function testGivenPaginationParamsWhenRetrievingCollectionThenPaginatedResultsAreReturned(): void
{
    // Arrange
    for ($i = 1; $i <= 15; $i++) {
        $this->tester->haveCustomer(['email' => sprintf('customer%d@example.com', $i)]);
    }

    // Act
    static::createClient()->request('GET', '/customers?page=2&itemsPerPage=5');

    // Assert
    $this->assertResponseIsSuccessful();
    $this->assertJsonContains(['@type' => 'Collection']);
    $this->assertJsonContains(['view' => ['@id' => '/customers?page=2&itemsPerPage=5']]);
}
```

### Testing POST operations

#### Successful creation

```php
public function testGivenValidDataWhenCreatingCustomerViaPostThenCustomerIsCreatedSuccessfully(): void
{
    // Arrange
    $customerData = [
        'email' => 'new.customer@example.com',
        'firstName' => 'New',
        'lastName' => 'Customer',
    ];

    // Act
    $response = static::createClient()->request('POST', '/customers', [
        'json' => $customerData,
    ]);

    // Assert
    $this->assertResponseIsSuccessful();
    $this->assertResponseStatusCodeSame(201);
    $this->assertJsonContains($customerData);
    $this->assertResponseHeaderSame('Content-Type', 'application/ld+json; charset=utf-8');

    // Verify the resource was created and has an ID
    $responseData = $response->toArray();
    $this->assertArrayHasKey('customerReference', $responseData);
    $this->assertNotEmpty($responseData['customerReference']);
}
```

#### Validation errors

```php
public function testGivenInvalidDataWhenCreatingCustomerViaPostThenValidationErrorIsReturned(): void
{
    // Arrange
    $invalidCustomerData = [
        'email' => 'invalid-email',  // Invalid email format
        'firstName' => '',            // Empty first name
    ];

    // Act
    static::createClient()->request('POST', '/customers', [
        'json' => $invalidCustomerData,
    ]);

    // Assert
    $this->assertResponseStatusCodeSame(422);
    $this->assertResponseHeaderSame('Content-Type', 'application/ld+json; charset=utf-8');
    $this->assertJsonContains(['@type' => 'ConstraintViolationList']);
    $this->assertJsonContains([
        'violations' => [
            ['propertyPath' => 'email'],
            ['propertyPath' => 'firstName'],
            ['propertyPath' => 'lastName'],
        ],
    ]);
}
```

#### Business rule violations

```php
public function testGivenDuplicateEmailWhenCreatingCustomerViaPostThenErrorIsReturned(): void
{
    // Arrange
    $this->tester->haveCustomer(['email' => 'duplicate@example.com']);

    $duplicateData = [
        'email' => 'duplicate@example.com',
        'firstName' => 'Duplicate',
        'lastName' => 'Customer',
    ];

    // Act
    static::createClient()->request('POST', '/customers', [
        'json' => $duplicateData,
    ]);

    // Assert
    $this->assertResponseStatusCodeSame(422);
    $this->assertJsonContains(['@type' => 'Error']);
    $this->assertJsonContains(['detail' => 'Customer with this email already exists']);
}
```

### Testing PATCH operations

```php
public function testGivenExistingCustomerWhenUpdatingViaPatchThenCustomerIsUpdatedSuccessfully(): void
{
    // Arrange
    $customerTransfer = $this->tester->haveCustomer([
        'email' => 'update@example.com',
        'firstName' => 'Original',
        'lastName' => 'Name',
    ]);

    $updateData = [
        'firstName' => 'Updated',
        'lastName' => 'Name',
    ];

    // Act
    static::createClient()->request(
        'PATCH',
        sprintf('/customers/%s', $customerTransfer->getCustomerReference()),
        [
            'json' => $updateData,
            'headers' => [
                'Content-Type' => 'application/merge-patch+json',
            ],
        ]
    );

    // Assert
    $this->assertResponseIsSuccessful();
    $this->assertJsonContains(['firstName' => 'Updated']);
    $this->assertJsonContains(['email' => 'update@example.com']); // Unchanged
}
```

### Testing DELETE operations

```php
public function testGivenExistingCustomerWhenDeletingViaDeleteThenCustomerIsDeletedSuccessfully(): void
{
    // Arrange
    $customerTransfer = $this->tester->haveCustomer([
        'email' => 'delete@example.com',
    ]);

    // Act
    static::createClient()->request(
        'DELETE',
        sprintf('/customers/%s', $customerTransfer->getCustomerReference())
    );

    // Assert
    $this->assertResponseStatusCodeSame(204);
    $this->assertResponseHasNoContent();
}

public function testGivenNonExistentCustomerWhenDeletingViaDeleteThen404IsReturned(): void
{
    // Act
    static::createClient()->request('DELETE', '/customers/NON-EXISTENT-REFERENCE');

    // Assert
    $this->assertResponseStatusCodeSame(404);
}
```

### Testing relationships

The relationships feature enables resources to include related resources via the `?include=` query parameter. For details on configuring relationships, see [Resource relationships](/docs/integrations/spryker-api/api-platform/relationships.html).

#### Testing include parameter

```php
public function testGivenCustomerWithAddressesWhenRequestingWithIncludeThenAddressesAreIncluded(): void
{
    // Arrange
    $customerTransfer = $this->tester->haveCustomer();
    $this->tester->haveAddress(['customerReference' => $customerTransfer->getCustomerReference()]);
    $this->tester->haveAddress(['customerReference' => $customerTransfer->getCustomerReference()]);

    // Act
    $response = static::createClient()->request(
        'GET',
        sprintf('/customers/%s?include=addresses', $customerTransfer->getCustomerReference())
    );

    // Assert
    $this->assertResponseIsSuccessful();
    $data = $response->toArray();

    // Assert relationships section exists
    $this->assertArrayHasKey('relationships', $data['data']);
    $this->assertArrayHasKey('addresses', $data['data']['relationships']);

    // Assert included section contains addresses
    $this->assertArrayHasKey('included', $data);
    $this->assertCount(2, $data['included']);
}
```

#### Testing JSON:API structure

```php
public function testGivenIncludedResourcesWhenRetrievingThenJsonApiStructureIsValid(): void
{
    // Arrange
    $customerTransfer = $this->tester->haveCustomer();
    $this->tester->haveAddress(['customerReference' => $customerTransfer->getCustomerReference()]);

    // Act
    $response = static::createClient()->request(
        'GET',
        sprintf('/customers/%s?include=addresses', $customerTransfer->getCustomerReference())
    );

    // Assert
    $data = $response->toArray();

    // Verify main resource structure
    $this->assertArrayHasKey('data', $data);
    $this->assertArrayHasKey('type', $data['data']);
    $this->assertArrayHasKey('id', $data['data']);
    $this->assertArrayHasKey('attributes', $data['data']);
    $this->assertArrayHasKey('relationships', $data['data']);

    // Verify included resources structure
    foreach ($data['included'] as $includedResource) {
        $this->assertArrayHasKey('type', $includedResource);
        $this->assertArrayHasKey('id', $includedResource);
        $this->assertArrayHasKey('attributes', $includedResource);
    }

    // Verify relationship linkage
    $relationshipData = $data['data']['relationships']['addresses']['data'];
    foreach ($relationshipData as $linkage) {
        $this->assertArrayHasKey('type', $linkage);
        $this->assertArrayHasKey('id', $linkage);
    }
}
```

## Writing Storefront API tests

### Basic test structure

Storefront API tests extend `StorefrontApiTestCase` and typically use mocks for read-only operations.

`tests/PyzTest/Glue/Customer/StorefrontApi/CustomersStorefrontApiTest.php`

```php
<?php

namespace PyzTest\Glue\Customer\StorefrontApi;

use Codeception\Stub;
use Pyz\Client\Customer\CustomerClientInterface;
use PyzTest\Glue\Customer\StorefrontApiTester;
use SprykerTest\Shared\ApiPlatform\Test\StorefrontApiTestCase;

/**
 * @group PyzTest
 * @group Glue
 * @group Customer
 * @group StorefrontApi
 * @group CustomersStorefrontApiTest
 */
class CustomersStorefrontApiTest extends StorefrontApiTestCase
{
    protected StorefrontApiTester $tester;

    public function testGivenAuthenticatedCustomerWhenRetrievingProfileViaGetThenCustomerDataIsReturned(): void
    {
        // Arrange
        $customerClientStub = Stub::makeEmpty(CustomerClientInterface::class, [
            'getCustomer' => (new CustomerTransfer())
                ->setEmail('customer@example.com')
                ->setFirstName('John')
                ->setLastName('Doe'),
        ]);

        static::getContainer()->set(CustomerClientInterface::class, $customerClientStub);

        // Act
        static::createClient()->request('GET', '/customers/me');

        // Assert
        $this->assertResponseIsSuccessful();
        $this->assertJsonContains(['email' => 'customer@example.com']);
    }
}
```

### Testing with service mocks

```php
public function testGivenMultipleCustomersWhenRetrievingCollectionViaGetThenAllCustomersAreReturned(): void
{
    // Arrange
    $customerClientStub = Stub::makeEmpty(CustomerClientInterface::class, [
        'getCustomerCollection' => [
            (new CustomerTransfer())->setEmail('customer1@example.com'),
            (new CustomerTransfer())->setEmail('customer2@example.com'),
        ],
    ]);

    static::getContainer()->set(CustomerClientInterface::class, $customerClientStub);

    // Act
    static::createClient()->request('GET', '/customers');

    // Assert
    $this->assertResponseIsSuccessful();
    $this->assertJsonContains(['@type' => 'Collection']);
}
```

## Available assertions

### HTTP response assertions

```php
// Status codes
$this->assertResponseIsSuccessful();        // 2xx status code
$this->assertResponseStatusCodeSame(200);   // Exact status code
$this->assertResponseStatusCodeSame(201);   // Created
$this->assertResponseStatusCodeSame(204);   // No content
$this->assertResponseStatusCodeSame(400);   // Bad request
$this->assertResponseStatusCodeSame(401);   // Unauthorized
$this->assertResponseStatusCodeSame(403);   // Forbidden
$this->assertResponseStatusCodeSame(404);   // Not found
$this->assertResponseStatusCodeSame(422);   // Validation error

// Headers
$this->assertResponseHasHeader('Content-Type');
$this->assertResponseHeaderSame('Content-Type', 'application/ld+json; charset=utf-8');
$this->assertResponseHeaderNotSame('X-Custom-Header', 'value');

// Content
$this->assertResponseHasNoContent();        // Empty response body
```

### JSON assertions

```php
// Content matching
$this->assertJsonContains(['email' => 'test@example.com']);
$this->assertJsonContains(['@type' => 'Customer']);
$this->assertJsonContains(['@type' => 'Collection']);

// Array keys
$responseData = $response->toArray();
$this->assertArrayHasKey('customerReference', $responseData);
$this->assertArrayNotHasKey('password', $responseData);

// Validation violations
$this->assertJsonContains(['@type' => 'ConstraintViolationList']);
$this->assertJsonContains([
    'violations' => [
        ['propertyPath' => 'email'],
    ],
]);

// Collection metadata
$this->assertJsonContains(['totalItems' => 10]);
$this->assertJsonContains(['view' => ['@id' => '/customers?page=1']]);
```

### Custom API Platform assertions

```php
// JSON-LD context
$this->assertJsonContains(['@context' => '/contexts/Customer']);

// Hydra collections
$this->assertJsonContains(['hydra:totalItems' => 5]);
$this->assertJsonContains(['hydra:member' => []]);

// IRI matching
$iri = $this->getIriFromResource($resource);
$this->assertMatchesRegularExpression('~^/customers/[A-Z0-9\-]+$~', $iri);
```

## Test data management

### Using Codeception helpers

Create test data using your project's tester helpers:

```php
// Create a customer
$customerTransfer = $this->tester->haveCustomer([
    'email' => 'test@example.com',
    'firstName' => 'John',
    'lastName' => 'Doe',
]);

// Create multiple customers
for ($i = 1; $i <= 10; $i++) {
    $this->tester->haveCustomer([
        'email' => sprintf('customer%d@example.com', $i),
    ]);
}
```

### Cleanup strategies

#### Automatic cleanup (default)

The test kernel automatically cleans up after each test. No manual cleanup needed.

#### Manual cleanup (when needed)

```php
protected function tearDown(): void
{
    // Custom cleanup logic
    $this->tester->cleanupCustomers();

    parent::tearDown();
}
```

## Testing different media types

### JSON-LD (default)

```php
public function testJsonLdFormat(): void
{
    static::createClient()->request('GET', '/customers', [
        'headers' => [
            'Accept' => 'application/ld+json',
        ],
    ]);

    $this->assertResponseHeaderSame('Content-Type', 'application/ld+json; charset=utf-8');
    $this->assertJsonContains(['@context' => '/contexts/Customer']);
}
```

### JSON:API

```php
public function testJsonApiFormat(): void
{
    static::createClient()->request('GET', '/customers', [
        'headers' => [
            'Accept' => 'application/vnd.api+json',
        ],
    ]);

    $this->assertResponseHeaderSame('Content-Type', 'application/vnd.api+json; charset=utf-8');
    $this->assertJsonContains(['data' => ['type' => 'Customer']]);
}
```

### HAL+JSON

```php
public function testHalJsonFormat(): void
{
    static::createClient()->request('GET', '/customers', [
        'headers' => [
            'Accept' => 'application/hal+json',
        ],
    ]);

    $this->assertResponseHeaderSame('Content-Type', 'application/hal+json; charset=utf-8');
    $this->assertJsonContains(['_links' => ['self' => ['href' => '/customers']]]);
}
```

## Advanced testing patterns

### Testing with filters

```php
public function testGivenFilterParamsWhenRetrievingCollectionThenFilteredResultsAreReturned(): void
{
    // Arrange
    $this->tester->haveCustomer(['email' => 'active@example.com', 'status' => 'active']);
    $this->tester->haveCustomer(['email' => 'inactive@example.com', 'status' => 'inactive']);

    // Act
    static::createClient()->request('GET', '/customers?status=active');

    // Assert
    $this->assertResponseIsSuccessful();
    $responseData = static::createClient()->getResponse()->toArray();
    $this->assertCount(1, $responseData['hydra:member']);
}
```

### Testing sorting

```php
public function testGivenSortParamsWhenRetrievingCollectionThenSortedResultsAreReturned(): void
{
    // Arrange
    $this->tester->haveCustomer(['lastName' => 'Zulu']);
    $this->tester->haveCustomer(['lastName' => 'Alpha']);
    $this->tester->haveCustomer(['lastName' => 'Bravo']);

    // Act
    static::createClient()->request('GET', '/customers?order[lastName]=asc');

    // Assert
    $this->assertResponseIsSuccessful();
    $responseData = static::createClient()->getResponse()->toArray();
    $members = $responseData['hydra:member'];

    $this->assertEquals('Alpha', $members[0]['lastName']);
    $this->assertEquals('Bravo', $members[1]['lastName']);
    $this->assertEquals('Zulu', $members[2]['lastName']);
}
```

### Testing error scenarios

```php
public function testGivenMalformedJsonWhenCreatingCustomerViaPostThenBadRequestIsReturned(): void
{
    // Act
    static::createClient()->request('POST', '/customers', [
        'body' => '{invalid-json}',
        'headers' => [
            'Content-Type' => 'application/json',
        ],
    ]);

    // Assert
    $this->assertResponseStatusCodeSame(400);
}

public function testGivenUnauthorizedRequestWhenAccessingProtectedResourceThen401IsReturned(): void
{
    // Act
    static::createClient()->request('GET', '/customers/me');

    // Assert
    $this->assertResponseStatusCodeSame(401);
}
```

## Running tests

Both tiers run on your host without Docker and without any running service.

### Generate the code the suites need

The suites depend on generated code that is not in version control. Run this once per checkout, and again after any schema change:

```bash
vendor/bin/console transfer:generate
vendor/bin/console transfer:databuilder:generate
vendor/bin/console propel:schema:copy
vendor/bin/console propel:model:build
vendor/bin/console transfer:entity:generate
vendor/bin/console search:setup:source-map
GLUE_APPLICATION=GLUE_STOREFRONT vendor/bin/glue api:generate
vendor/bin/console testify:build:sqlite-template
```

The order matters. Entity transfers derive from the merged Propel schema, so the schema copy and the model build come first.

`transfer:databuilder:generate` and `testify:build:sqlite-template` are registered only when development console commands are enabled:

```bash
DEVELOPMENT_CONSOLE_COMMANDS=1
```

`search:setup:source-map` writes the `Generated\Shared\Search\*IndexMap` classes. Only search-backed resources need them, but the catalog query plugins reference them while the query is being built, so a missing map is a fatal error rather than an empty result.

`api:generate` is a Glue console command, so use `vendor/bin/glue` and not `vendor/bin/console`. It removes `src/Generated/Api/{ApiType}` before it parses anything, and `--dry-run` does not suppress that. An interrupted run therefore leaves no resources behind, and every test fails with `Class "Generated\Api\Storefront\…Resource" not found`. Re-run the command to recover, and pass `--keep-existing` when you only want to inspect the output.

`testify:build:sqlite-template` leaves an existing template alone. Pass `--force` to drop and rebuild it after a Zed schema change, or `--path` to build it somewhere other than the configured default. A suite run rebuilds a missing template on its own, so calling it explicitly only front-loads the cost or forces a rebuild.

### Run a suite

```bash
APPLICATION_ENV=devtest vendor/bin/codecept run -c tests/PyzTest/Glue/Wishlists/codeception.yml
```

### Enable the test container

Both tiers resolve services from the container, which needs Symfony's test container. Turn `framework.test` on for the environment the suites run in—it is configured per application in `config/<App>/packages/framework.php`. Without it, the suites fail with `Could not find service "test.service_container"`.

The container is compiled on first use and then cached, which takes roughly 45 seconds. That is a one-time cost per checkout and after any change to configuration or generated resources. Run the suites once after regenerating and the compile is behind you.

### Rebuild the class-resolver cache after adding a project override

`src/Generated/Shared/Kernel/Pyz/resolvableClassCache*.php` maps every resolvable class to the winning namespace, and it is read in preference to live resolution. It never expires, so a `Pyz` class added after the cache was written is silently ignored and the module resolves to the core class. There is no error—just core behavior where your project's should be. After adding an override, run:

```bash
vendor/bin/console cache:class-resolver:build
```

CI runs from a bare checkout where the file is absent and resolution is live, so this affects local runs only.

### In CI

The suites are found by convention. Every `tests/PyzTest/Glue/*/codeception.yml` that declares a `StorefrontApiLogic` or a `StorefrontApiIntegration` suite is picked up, one process per module configuration.

Use exactly those two suite names. A new module then needs no workflow change. Use different names and the suites either run nowhere or land in the Docker lane, which they cannot survive.

One process per module configuration is a requirement, not a preference. These suites boot the Glue kernel in-process and need `APPLICATION=GLUE_STOREFRONT`. The constant is process-global and first-wins, so a suite sharing a process with the Docker Glue lane inherits whatever that lane set.

### Running inside Docker

Test suites that predate the host lane still run through the Docker SDK:

```bash
# Run Backend API tests only
docker/sdk cli vendor/bin/codecept run -c path/to/codeception.yml -g BackendApi

# Run Storefront API tests only
docker/sdk cli vendor/bin/codecept run -c path/to/codeception.yml -g StorefrontApi
```

## Codeception configuration

### Suite configuration

Configure your test suite's `codeception.yml` to enable the necessary helpers:

`tests/PyzTest/Glue/Customer/BackendApi/codeception.yml`

```yaml
suite_namespace: PyzTest\Glue\Customer\BackendApi

actor: BackendApiTester

modules:
    enabled:
        - \SprykerTest\Shared\Testify\Helper\BootstrapHelper:
            applicationPluginProvider:
                class: Spryker\Glue\GlueBackendApiApplication\GlueBackendApiApplicationFactory
                method: getApplicationPlugins

paths:
    tests: .
    data: ../../../../../_data
    support: _support
    output: ../../../../../_output

settings:
    bootstrap: _bootstrap.php
    colors: true
    memory_limit: 1024M
```

**Key configuration points:**

- **BootstrapHelper**: Provides application plugins for the test kernel. This is optional and can be omitted if your tests do not require application-level dependencies.
- **suite_namespace**: Must match your test suite's PHP namespace
- **actor**: The tester class name (for example, `BackendApiTester`, `StorefrontApiTester`)

### Wire a suite with an umbrella helper

Each tier needs a stack of helpers in a specific order. Rather than repeating that stack in every suite, enable one umbrella helper that registers it:

```yaml
modules:
    enabled:
        - \SprykerTest\ApiPlatform\Helper\StorefrontApiIntegrationHelper:
              environmentModule: '\PyzTest\Shared\Testify\Helper\Environment'
              projectNamespaces: ['Pyz']
              publish: true
        - \PyzTest\Glue\Wishlists\Helper\WishlistsApiHelper
        - \SprykerTest\ApiPlatform\Helper\ApiPlatformHelper:
              bootOnce: true
              reuseApplicationContainer: true
```

`StorefrontApiIntegrationHelper` registers the integration stack: the database lane, bootstrap, locator, configuration, dependency and data cleanup, transactions, processor resolution, and the in-process Zed transport. Setting `publish: true` adds the in-process publish leg. `StorefrontApiLogicHelper` does the same for the logic tier—container resolution only, with no database and no HTTP.

Two keys are yours to supply, because the core helper cannot know them:

- `environmentModule` is required. It points at the project helper that defines the `APPLICATION` constants. The umbrella creates it in the one position it must occupy—after the bootstrap and before the locator freezes the configuration—which a plain entry in your `enabled` list could not guarantee.
- `projectNamespaces` tells the class resolver about your project namespace. Without it, a module your project overrides resolves to the Spryker base class and silently loses every plugin you registered.

Three rules govern the list:

- Enable the umbrella helper **first**.
- Keep `ApiPlatformHelper` **last**. Codeception runs `_afterSuite` in reverse order, and the kernel reset has to happen before the database lane deletes its work database.
- Never re-list one of the umbrella's own child helpers after it. Codeception creates the child a second time and silently discards the configuration forwarded to the replaced instance.

Per-child configuration overrides go under `modules: config:`. The exceptions are `application`, `projectNamespaces`, `applicationPluginProvider`, and `environmentModule`, which are umbrella configuration keys—setting them on a child has no effect, because the umbrella overwrites them.

Do not enable `ContainerHelper` in an integration suite. Its `_after()` nulls the shared container delegator whenever its container was touched, and the database-fixture path touches it. That discards the compiled container between methods, so every method after the first fails with a null-container `TypeError`. The logic tier keeps `ContainerHelper`, because its container stays untouched.

### ApiPlatformHelper modes

`ApiPlatformHelper` runs in one of two modes, selected in the suite's `codeception.yml`:

```yaml
modules:
    enabled:
        - \SprykerTest\ApiPlatform\Helper\ApiPlatformHelper:
            mode: 'project'      # default; or 'core' for module-level tests
```

| Mode | Use this when | Before suite | After suite |
|---|---|---|---|
| `project` (default) | Testing your own project's API resources end-to-end. | Validates that the project-generated resources in `src/Generated/Api/` exist. Skips generation. | Does nothing — the compiled container is preserved across runs for fast subsequent invocations. |
| `core` | Testing the `ApiPlatform` module itself (or any module that ships its own schemas in isolation from a project). | Generates fresh resources into `tests/_data/Api/{ApiType}/`. Requires `apiType` to be set on the helper. | Removes the generated resources and clears the compiled test kernel cache so the next suite starts from a clean slate. |

Use `project` mode for almost all real-world test suites — it is significantly faster because the compiled Symfony container is reused. Reach for `core` mode only when you intentionally want each suite to regenerate resources from scratch (typical when testing schema generation or a single module without a project around it).

When using `core` mode, declare which API type the suite exercises so the helper knows what to generate:

```yaml
modules:
    enabled:
        - \SprykerTest\ApiPlatform\Helper\ApiPlatformHelper:
            mode: 'core'
            apiType: 'Storefront'   # or 'Backend'
```

### Fast-path configuration keys

These keys are all opt-in. Omitting one keeps the slower per-method boot with debug on.

```yaml
- \SprykerTest\ApiPlatform\Helper\ApiPlatformHelper:
      mode: 'project'                  # or 'core'
      apiType: 'Storefront'            # or 'Backend'
      debug: false                     # Symfony debug off on warm resources; default true
      bootOnce: true                   # one kernel per suite, reset between methods; default false
      reuseApplicationContainer: true  # keep the container delegator singleton; default false
```

With `bootOnce`, the kernel is built once per process rather than once per test method. The container is still reset between methods, which is what lets each method bind its own stubs—a service already bound in the container cannot be replaced.

#### Register stubs before you resolve the system under test

Call `setService($id, $stub)` **before** the first `createClient()`, `getTestKernel()`, `getProcessor()`, or `getProvider()` in a test method. Stubs are bound when the kernel is taken for that method, so registering an ID after that point has no effect, and the same ID cannot be re-bound within one method once the container holds it.

The container knows nothing about stubs at compile time. They are bound afterwards through Symfony's test container.

### Infrastructure stand-in helpers

The host lane has no Redis, no Elasticsearch, and nothing draining the queue. These helpers put a real substitute behind each one, so the code above them runs unchanged. None of them stubs the resource under test.

| Helper | Stands in for | Provides |
|---|---|---|
| `\SprykerTest\Client\StorageDatabase\Helper\SqliteStorageHelper` | Redis, read side | Points the Storage client at the storage-database plugin, so reads hit the `spy_*_storage` tables of the lane's SQLite database. Configuration only, no methods. |
| `\SprykerTest\Zed\Publisher\Helper\PublishHelper` | The queue | `publishPendingEvents()` drains what the test just created. `publishEntities($eventName, $ids)` publishes rows that never raised an event. The synchronization leg stays off, because it only pushes into Redis. |
| `\SprykerTest\Shared\Testify\Helper\StorageCacheHelper` | — | `resetStorageCaches()`, plus a reset before every test. Storage clients memoize in statics that survive a container reset, so a read taken before the arrange step otherwise pins the empty result for the whole process. |
| `\SprykerTest\Client\Search\Helper\SearchResponseStubHelper` | Elasticsearch | `stubSearchResult(array $formattedSearchResult)` takes over the search-adapter plugin list. Everything above the adapter runs for real, so the array is the post-formatting result and not a raw Elasticsearch body. |
| `\SprykerTest\Client\Queue\Helper\QueueHelper` | — | Backs the publish leg's in-memory queue. Set `application: Zed` for a `Glue`-namespaced suite: without it, the configuration resolver guesses the application from the suite namespace, guesses `Glue`, and finds no queue configuration. The umbrella helper forces this when `publish: true`. |

A storage resource whose name does not derive its table as `spy_<resource>_storage` needs an entry in `SprykerTest\Client\StorageDatabase\Sqlite\SqliteStorageDatabaseConfig`. Two exist by default: `translation` maps to `spy_glossary_storage`, and `product_search_config_extension` maps to `spy_product_search_config_storage`.

Miss the `translation` entry and *every* error response becomes `PDOException: no such table`, because the error provider translates its message before rendering. The reported exception then has nothing to do with the actual failure.

### Helper classes

Create helper classes to manage test data:

`tests/PyzTest/Glue/Customer/Helper/CustomerHelper.php`

```php
<?php

namespace PyzTest\Glue\Customer\Helper;

use Codeception\Module;
use Generated\Shared\Transfer\CustomerTransfer;
use Pyz\Zed\Customer\Business\CustomerFacadeInterface;

class CustomerHelper extends Module
{
    public function haveCustomer(array $seed = []): CustomerTransfer
    {
        $customerTransfer = (new CustomerTransfer())
            ->fromArray($seed, true)
            ->setEmail($seed['email'] ?? sprintf('customer-%s@example.com', uniqid()))
            ->setFirstName($seed['firstName'] ?? 'Test')
            ->setLastName($seed['lastName'] ?? 'Customer');

        return $this->getCustomerFacade()->createCustomer($customerTransfer);
    }

    protected function getCustomerFacade(): CustomerFacadeInterface
    {
        return $this->getModule('\\PyzTest\\Shared\\Testify\\Helper\\Environment')
            ->getFacade('Customer');
    }
}
```

## Best practices

### 1. Use descriptive test method names

```php
// ✅ Good
public function testGivenInvalidEmailWhenCreatingCustomerViaPostThenValidationErrorIsReturned(): void

// ❌ Bad
public function testCreate(): void
```

### 2. Follow Arrange-Act-Assert pattern

```php
public function testExample(): void
{
    // Arrange - Set up test data and preconditions
    $data = ['email' => 'test@example.com'];

    // Act - Execute the operation being tested
    static::createClient()->request('POST', '/customers', ['json' => $data]);

    // Assert - Verify the results
    $this->assertResponseIsSuccessful();
}
```

### 3. Test one thing per test

```php
// ✅ Good - Tests one specific validation rule
public function testGivenMissingEmailWhenCreatingCustomerThenValidationErrorIsReturned(): void
{
    static::createClient()->request('POST', '/customers', ['json' => []]);
    $this->assertJsonContains(['violations' => [['propertyPath' => 'email']]]);
}

// ❌ Bad - Tests multiple unrelated things
public function testCustomerCreation(): void
{
    // Tests validation, creation, retrieval, update all in one test
}
```

### 4. Use meaningful test data

```php
// ✅ Good
$customerData = [
    'email' => 'john.doe@example.com',  // Realistic email
    'firstName' => 'John',               // Realistic name
    'lastName' => 'Doe',
];

// ❌ Bad
$customerData = [
    'email' => 'a@b.c',    // Not realistic
    'firstName' => 'x',     // Not meaningful
    'lastName' => 'y',
];
```

### 5. Clean up test data appropriately

```php
// For Backend API tests - use tester helpers for setup
$customer = $this->tester->haveCustomer(['email' => 'test@example.com']);

// Cleanup happens automatically via test kernel shutdown
```

### 6. Test error cases

```php
// Always test both success and failure scenarios
public function testSuccessfulCreation(): void { /* ... */ }
public function testValidationErrors(): void { /* ... */ }
public function testDuplicateEmail(): void { /* ... */ }
public function testNotFound(): void { /* ... */ }
```

### 7. Use constants for repeated values

```php
class CustomersBackendApiTest extends BackendApiTestCase
{
    private const TEST_EMAIL = 'test@example.com';
    private const TEST_FIRST_NAME = 'John';

    public function testExample(): void
    {
        $data = [
            'email' => self::TEST_EMAIL,
            'firstName' => self::TEST_FIRST_NAME,
        ];
        // ...
    }
}
```

### 8. Group related tests

```php
/**
 * @group PyzTest
 * @group Glue
 * @group Customer
 * @group BackendApi
 * @group CustomersBackendApiTest
 * @group ValidationTests
 */
class CustomersBackendApiTest extends BackendApiTestCase
{
    // Run only validation tests:
    // vendor/bin/codecept run -g ValidationTests
}
```

### 9. Provision fixtures through data helpers

Build transfers through data builders, reached through a module's own helper. Never hand-roll a transfer in a test, and never let a test carry its own UUIDs, names, or counts.

A test owns the data it asserts against. In the integration tier, that means creating the products, customers, and carts the scenario needs rather than relying on data another test or an installer left behind.

Module-owned data and assertions belong in that module's helper, shipped from the core module so that projects can enable it. For example, a wishlist helper builds the transfers a stubbed client returns and asserts a resource against them:

```php
$wishlistTransfer = $this->tester->haveWishlistTransfer();   // non-persisting, logic tier
$wishlistTransfer = $this->tester->haveWishlist();           // DB-backed, integration tier
```

The authenticated customer transfer comes from the core customer helper: `haveCustomerTransfer()` for the logic tier and `haveCustomer()` for the integration tier. The API test lanes carry no customer code of their own.

## Troubleshooting

### Generated resources not found

**Problem:** Test fails with "Class not found" for generated resource.

**Solution:**

1. Verify autoload configuration in `composer.json`:

```json
{
    "autoload-dev": {
        "psr-4": {
            "PyzTest\\": "tests/PyzTest/",
            "Generated\\TestApi\\": "tests/_data/Api/"
        }
    }
}
```

2. Run composer dump-autoload:

```bash
docker/sdk cli composer dump-autoload
```

### Test kernel boot failures

**Problem:** Tests fail with kernel boot errors.

**Solution:**

Ensure your test case extends the correct base class:

```php
// For Backend API
use PyzTest\Shared\ApiPlatform\Test\BackendApiTestCase;

class CustomersBackendApiTest extends BackendApiTestCase
{
    // ...
}

// For Storefront API
use PyzTest\Shared\ApiPlatform\Test\StorefrontApiTestCase;

class CustomersStorefrontApiTest extends StorefrontApiTestCase
{
    // ...
}
```

### Assertion failures with JSON-LD

**Problem:** JSON assertions fail with `@context` or `@type` fields.

**Solution:**

Use JSON-LD specific assertions:

```php
// ✅ Correct
$this->assertJsonContains(['@type' => 'Customer']);
$this->assertJsonContains(['@context' => '/contexts/Customer']);

// ❌ Wrong
$this->assertJsonContains(['type' => 'Customer']);
```

### Tester helper not found

**Problem:** `$this->tester` property shows as undefined.

**Solution:**

1. Verify your tester class exists in the correct location
2. Check that the tester is properly type-hinted in your test:

```php
class CustomersBackendApiTest extends BackendApiTestCase
{
    protected BackendApiTester $tester;  // Must be declared
}
```

3. Rebuild Codeception actors:

```bash
docker/sdk cli vendor/bin/codecept build
```

## Next steps

- [Prove API Platform contract coverage](/docs/integrations/spryker-api/api-platform/contract-coverage.html) - Declare what your tests cover and gate it in CI
- [Implement an API Platform resource](/docs/integrations/spryker-api/api-platform/enablement.html) - Creating API resources
- [Resource schemas](/docs/integrations/spryker-api/api-platform/resource-schemas.html) - Resource schema reference
- [Validation schemas](/docs/integrations/spryker-api/api-platform/validation-schemas.html) - Validation schema reference
- [Troubleshooting](/docs/integrations/spryker-api/api-platform/troubleshooting.html) - Common issues and solutions
- [Codeception Documentation](https://codeception.com/docs/Introduction) - Codeception framework docs
- [Test API Platform resources](https://api-platform.com/docs/symfony/testing/) - Official API Platform testing guide
