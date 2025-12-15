---
title: API Platform Testing
description: Learn how to write and run tests for your API Platform resources in Spryker.
last_updated: Nov 24, 2025
template: howto-guide-template
related:
  - title: API Platform
    link: docs/dg/dev/architecture/api-platform.html
  - title: API Platform Enablement
    link: docs/dg/dev/architecture/api-platform/enablement.html
  - title: Schemas and Resource Generation
    link: docs/dg/dev/architecture/api-platform/schemas-and-resource-generation.html
  - title: Troubleshooting
    link: docs/dg/dev/architecture/api-platform/troubleshooting.html
---

This document describes how to write and run tests for your API Platform resources in your project.

## Overview

API Platform provides a comprehensive testing infrastructure built on top of:

- **Codeception**: Test framework for PHP
- **API Platform Test Client**: Specialized HTTP client for API testing
- **PHPUnit Assertions**: Rich set of assertion methods
- **Test Helpers**: Custom helpers for test data management

The testing infrastructure supports both Backend and Storefront API types with dedicated base classes and configuration.

## Test architecture

### Test class hierarchy

```
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

### 2. Create test directory structure

```bash
tests/
├── PyzTest/
│   └── Glue/
│       └── Customer/
│           ├── BackendApi/
│           │   ├── CustomersBackendApiTest.php
│           │   └── BackendApiTester.php
│           └── StorefrontApi/
│               ├── CustomersStorefrontApiTest.php
│               └── StorefrontApiTester.php
└── _data/
    └── Api/
        ├── Backend/
        │   └── CustomersBackendResource.php (generated)
        └── Storefront/
            └── CustomersStorefrontResource.php (generated)
```

### 3. Generate API resources for testing

Generate test resources to your test directory:

```bash
# Generate Backend API test resources
docker/sdk cli glue api:generate backend --output-dir=tests/_data/Api/Backend

# Generate Storefront API test resources
docker/sdk cli glue api:generate storefront --output-dir=tests/_data/Api/Storefront
```

After generation, run composer dump-autoload:

```bash
docker/sdk cli composer dump-autoload
```

## Writing Backend API tests

### Basic test structure

Backend API tests extend `BackendApiTestCase` and use the `BackendApiTester` helper.

`tests/PyzTest/Glue/Customer/BackendApi/CustomersBackendApiTest.php`

```php
<?php

namespace PyzTest\Glue\Customer\BackendApi;

use PyzTest\Glue\Customer\BackendApiTester;
use PyzTest\Shared\ApiPlatform\Test\BackendApiTestCase;

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
use PyzTest\Shared\ApiPlatform\Test\StorefrontApiTestCase;

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

### Testing with authentication

```php
public function testGivenAuthenticatedRequestWhenAccessingProtectedResourceThenDataIsReturned(): void
{
    // Arrange
    $token = $this->tester->haveAuthToken(['customer_reference' => 'CUST-123']);

    // Act
    static::createClient()->request('GET', '/customers/me', [
        'headers' => [
            'Authorization' => sprintf('Bearer %s', $token),
        ],
    ]);

    // Assert
    $this->assertResponseIsSuccessful();
}
```

## Running tests

### Run all project API tests

```bash
docker/sdk cli vendor/bin/codecept run
```

### Run specific test suite

```bash
# Run Backend API tests only
docker/sdk cli vendor/bin/codecept run BackendApi

# Run Storefront API tests only
docker/sdk cli vendor/bin/codecept run StorefrontApi
```

### Run single test class

```bash
docker/sdk cli vendor/bin/codecept run BackendApi/CustomersBackendApiTest
```

### Run single test method

```bash
docker/sdk cli vendor/bin/codecept run BackendApi/CustomersBackendApiTest:testGivenValidDataWhenCreatingCustomerViaPostThenCustomerIsCreatedSuccessfully
```

### Run with different verbosity levels

```bash
# Normal output
docker/sdk cli vendor/bin/codecept run

# Verbose output
docker/sdk cli vendor/bin/codecept run -v

# Debug output with full stack traces
docker/sdk cli vendor/bin/codecept run -vvv
```

### Run with coverage

```bash
docker/sdk cli vendor/bin/codecept run --coverage --coverage-html
```

### Run specific test groups

```bash
# Run only validation tests
docker/sdk cli vendor/bin/codecept run -g ValidationTests

# Run only customer tests
docker/sdk cli vendor/bin/codecept run -g Customer
```

## Codeception configuration

### Project-level configuration

Create a `codeception.yml` in your project's tests directory:

`tests/codeception.yml`

```yaml
namespace: PyzTest

paths:
    tests: PyzTest
    data: _data
    support: _support
    output: _output

coverage:
    enabled: true
    include:
        - src/Pyz/Glue/*

suites:
    BackendApi:
        path: Glue/Customer/BackendApi
        actor: BackendApiTester
        modules:
            enabled:
                - \PyzTest\Shared\Testify\Helper\Environment
                - \PyzTest\Glue\Testify\Helper\JsonPath
                - \PyzTest\Glue\Customer\Helper\CustomerHelper

    StorefrontApi:
        path: Glue/Customer/StorefrontApi
        actor: StorefrontApiTester
        modules:
            enabled:
                - \PyzTest\Shared\Testify\Helper\Environment
                - \PyzTest\Glue\Testify\Helper\JsonPath
```

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

2. Regenerate resources:

```bash
docker/sdk cli glue api:generate backend --output-dir=tests/_data/Api/Backend
```

3. Run composer dump-autoload:

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

- [API Platform Enablement](/docs/dg/dev/architecture/api-platform/enablement.html) - Creating API resources
- [Schemas and Resource Generation](/docs/dg/dev/architecture/api-platform/schemas-and-resource-generation.html) - Schema reference
- [Troubleshooting](/docs/dg/dev/architecture/api-platform/troubleshooting.html) - Common issues and solutions
- [Codeception Documentation](https://codeception.com/docs/Introduction) - Codeception framework docs
- [API Platform Testing](https://api-platform.com/docs/symfony/testing/) - Official API Platform testing guide
