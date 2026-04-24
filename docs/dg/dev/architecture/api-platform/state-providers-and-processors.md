---
title: State providers and processors
description: Use Spryker's abstract state provider and processor base classes to implement API Platform resources with less boilerplate.
last_updated: Apr 23, 2026
template: concept-topic-template
related:
  - title: API Platform
    link: docs/dg/dev/architecture/api-platform.html
  - title: API Platform Enablement
    link: docs/dg/dev/architecture/api-platform/enablement.html
  - title: Relationships
    link: docs/dg/dev/architecture/api-platform/relationships.html
---

API Platform splits resource handling into two components:

- **Provider** — returns data for read operations (`Get`, `GetCollection`).
- **Processor** — mutates data for write operations (`Post`, `Patch`, `Delete`).

Spryker ships abstract base classes that handle operation dispatch, expose request/context helpers, and raise clear errors when a method is missing. Extend these instead of implementing `ProviderInterface` / `ProcessorInterface` directly.

## Class hierarchy

```MARKDOWN
AbstractProvider                 AbstractProcessor
├── AbstractBackendProvider      ├── AbstractBackendProcessor
└── AbstractStorefrontProvider   └── AbstractStorefrontProcessor
```

- Use **`AbstractBackend*`** for resources under the `GlueBackend` API (Zed admin context, user-scoped).
- Use **`AbstractStorefront*`** for resources under the `Glue` / `GlueStorefront` API (customer-scoped).
- Extend **`AbstractProvider`** / **`AbstractProcessor`** directly only when the resource is not tied to a backend or storefront context.

## Providers

`AbstractProvider` dispatches operations based on the incoming `Operation` type:

| Operation       | Method called       |
|-----------------|---------------------|
| `Get`           | `provideItem()`     |
| `GetCollection` | `provideCollection()` |
| `Post`          | returns `null` (the processor handles POST) |

Override only the methods you need. Unimplemented methods throw `BadMethodCallException` so missing handlers are caught early.

### Example: storefront provider

```php
<?php

declare(strict_types=1);

namespace Pyz\Glue\Customer\Api\Storefront\Provider;

use Generated\Api\Storefront\CustomersStorefrontResource;
use Pyz\Glue\Customer\Business\CustomerFacadeInterface;
use Spryker\ApiPlatform\State\Provider\AbstractStorefrontProvider;

class CustomerStorefrontProvider extends AbstractStorefrontProvider
{
    public function __construct(
        private readonly CustomerFacadeInterface $customerFacade,
    ) {
    }

    protected function provideItem(): ?CustomersStorefrontResource
    {
        $customerReference = $this->getUriVariable('customerReference');
        $customerTransfer = $this->customerFacade->findCustomerByReference($customerReference);

        if ($customerTransfer === null) {
            return null;
        }

        return (new CustomersStorefrontResource())->fromArray($customerTransfer->toArray());
    }

    /**
     * @return array<\Generated\Api\Storefront\CustomersStorefrontResource>
     */
    protected function provideCollection(): array
    {
        $pagination = $this->getPagination();
        $collection = $this->customerFacade->getCustomerCollection($pagination);

        $resources = [];
        foreach ($collection->getCustomers() as $customerTransfer) {
            $resources[] = (new CustomersStorefrontResource())->fromArray($customerTransfer->toArray());
        }

        return $resources;
    }
}
```

## Processors

`AbstractProcessor` dispatches write operations to explicit methods:

| Operation | Method called     |
|-----------|-------------------|
| `Post`    | `processPost($data)` |
| `Patch`   | `processPatch($data)` |
| `Delete`  | `processDelete()` |

### Example: backend processor

```php
<?php

declare(strict_types=1);

namespace Pyz\Glue\Customer\Api\Backend\Processor;

use Generated\Api\Backend\CustomersBackendResource;
use Generated\Shared\Transfer\CustomerTransfer;
use Pyz\Glue\Customer\Business\CustomerFacadeInterface;
use Spryker\ApiPlatform\State\Processor\AbstractBackendProcessor;

class CustomerBackendProcessor extends AbstractBackendProcessor
{
    public function __construct(
        private readonly CustomerFacadeInterface $customerFacade,
    ) {
    }

    protected function processPost(mixed $data): CustomersBackendResource
    {
        $customerTransfer = (new CustomerTransfer())->fromArray($data->toArray(), true);
        $customerTransfer = $this->customerFacade->createCustomer($customerTransfer)->getCustomerTransferOrFail();

        return (new CustomersBackendResource())->fromArray($customerTransfer->toArray());
    }

    protected function processPatch(mixed $data): CustomersBackendResource
    {
        $customerTransfer = (new CustomerTransfer())
            ->fromArray($data->toArray(), true)
            ->setCustomerReference($this->getUriVariable('customerReference'));

        $customerTransfer = $this->customerFacade->updateCustomer($customerTransfer)->getCustomerTransferOrFail();

        return (new CustomersBackendResource())->fromArray($customerTransfer->toArray());
    }

    protected function processDelete(): null
    {
        $this->customerFacade->deleteCustomerByReference($this->getUriVariable('customerReference'));

        return null;
    }
}
```

## Context helpers

Inside your provider or processor you have access to the active `Operation`, URI variables, and request-scoped data through protected helpers.

### Common helpers (available on all abstracts)

| Method                     | Description |
|----------------------------|-------------|
| `getOperation()`           | Current API Platform `Operation`. |
| `getUriVariables()`        | All URI variables of the current route. |
| `hasUriVariable($name)`    | Check whether a URI variable is set. |
| `getUriVariable($name)`    | Read a URI variable; throws `ApiPlatformContextException` if missing. |
| `hasRequest()` / `getRequest()` | Current Symfony `Request` from the context. |
| `hasLocale()` / `getLocale()`   | `LocaleTransfer` resolved by `AcceptLanguageLocaleSubscriber`. |
| `hasStore()` / `getStore()`     | `StoreTransfer` resolved from the request. |
| `getPagination()` *(provider only)* | `PaginationTransfer` built from the `page` and `perPage` query params (defaults: `1`, `10`). |

Always use the `has*()` guard before calling a `get*()` helper when the value may be absent — the `get*()` helper throws `ApiPlatformContextException` if the attribute is missing.

### Backend helpers

`AbstractBackendProvider` / `AbstractBackendProcessor` add:

| Method                   | Description |
|--------------------------|-------------|
| `hasUser()` / `getUser()` | `UserTransfer` of the authenticated Zed user. |

### Storefront helpers

`AbstractStorefrontProvider` / `AbstractStorefrontProcessor` add:

| Method                           | Description |
|----------------------------------|-------------|
| `hasCustomer()` / `getCustomer()` | `CustomerTransfer` of the authenticated customer. |
| `isGuestCustomer()`              | `true` when the customer is a guest. |
| `getCustomerReference()`         | Shortcut to `getCustomer()->getCustomerReferenceOrFail()`. |

## Pagination

`getPagination()` reads the standard query parameters and returns a fully populated `PaginationTransfer`. Pass it to your business layer and return the result as an array or a paginated collection:

```php
protected function provideCollection(): array
{
    $collection = $this->customerFacade->getCustomerCollection($this->getPagination());

    return array_map(
        fn ($customerTransfer) => (new CustomersBackendResource())->fromArray($customerTransfer->toArray()),
        $collection->getCustomers()->getArrayCopy(),
    );
}
```

Pagination response links (`first`, `last`, `prev`, `next`) are attached automatically by the API Platform integration.

## When to bypass the abstract classes

The abstract classes cover standard JSON:API CRUD. Implement `ProviderInterface` / `ProcessorInterface` directly when you need:

- Custom operation types or non-CRUD dispatch logic.
- Batch-loading across relationships — implement `BatchLoadableProviderInterface` instead.
- Full control over the `provide()` / `process()` signature (for example, returning `TraversablePaginator`).

## Related documentation

- [API Platform Enablement](/docs/dg/dev/architecture/api-platform/enablement.html)
- [Relationships](/docs/dg/dev/architecture/api-platform/relationships.html)
- [API Platform Providers](https://api-platform.com/docs/core/state-providers/)
- [API Platform Processors](https://api-platform.com/docs/core/state-processors/)
