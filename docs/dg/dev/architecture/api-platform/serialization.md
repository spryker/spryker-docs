---
title: Serialization
description: How API Platform serializes requests and responses, and how the Spryker Serializer module fits in.
last_updated: Jun 10, 2026
template: concept-topic-template
related:
  - title: API Platform
    link: docs/dg/dev/architecture/api-platform.html
  - title: Resource Schemas
    link: docs/dg/dev/architecture/api-platform/resource-schemas.html
  - title: Sparse fieldsets
    link: docs/dg/dev/architecture/api-platform/sparse-fieldsets.html
  - title: Serializer guidelines
    link: docs/dg/dev/guidelines/serializer-guidelines.html
---

API Platform serializes requests and responses with the [Symfony Serializer component](https://symfony.com/doc/current/serializer.html) through its own serialization pipeline. The [Spryker Serializer module](/docs/dg/dev/guidelines/serializer-guidelines.html) complements this pipeline: it is registered as a Symfony service, and providers and processors use it to denormalize data into resource objects.

## How it works

When a request hits an API Platform endpoint:

1. **Request deserialization** — API Platform deserializes the incoming payload into the resource object.
2. **Provider/Processor** — your provider or processor converts the resource object to arrays or transfer objects via `toArray()` and mappers, calls the business layer, and converts the result back into a resource object.
3. **Response serialization** — API Platform serializes the resource object into the expected response format.

The serialization context for steps 1 and 3 is built by API Platform's `SerializerContextBuilder` from the resource and operation configuration. Providers and processors don't interact with this context directly.

## Using the Serializer service in providers and processors

Providers and processors inject `SerializerServiceInterface` and use its `denormalize()` method to convert mapped transfer data into the generated resource class:

```php
return $this->serializer->denormalize(
    $this->customersResourceMapper->mapCustomerTransferToResourceData($customerTransfer),
    CustomersStorefrontResource::class,
);
```

For the full Serializer service API, see the [Serializer guidelines](/docs/dg/dev/guidelines/serializer-guidelines.html).

## Custom normalizers

To add a custom normalizer that applies to API Platform resources, register it as a Symfony service tagged with `serializer.normalizer`. Use the `priority` attribute to control execution order. For example, the ApiPlatform module registers its JSON:API response normalizers this way:

```php
$services->set(SelfLinkNormalizer::class)
    ->tag('serializer.normalizer', ['priority' => 63]);
```

Normalizer plugins registered in the Serializer module's `SerializerDependencyProvider` affect only the Serializer service itself; they have no effect on API Platform's request and response serialization.

For details on the Symfony Serializer component, see the [Symfony documentation](https://symfony.com/doc/current/serializer.html).
