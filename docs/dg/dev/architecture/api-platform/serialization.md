---
title: Serialization
description: How API Platform uses the Spryker Serializer module for request and response serialization.
last_updated: Mar 29, 2026
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

API Platform uses the [Spryker Serializer module](/docs/dg/dev/guidelines/serializer-guidelines.html) for converting between PHP objects and JSON:API responses. The Serializer is registered as a Symfony service and integrates directly with API Platform's serialization pipeline.

## How it works

When a request hits an API Platform endpoint:

1. **Request deserialization** — the incoming JSON payload is deserialized into the resource object using the Serializer.
2. **Provider/Processor** — your provider or processor works with the resource object.
3. **Response serialization** — the resource object is serialized back into the JSON:API response format.

API Platform handles this automatically. You interact with the Serializer only when you need to customize serialization behavior.

## Customizing serialization context

Use `SerializerContextTransfer` to control how data is serialized in your providers or processors. Common use cases:

- **Serialization groups** — control which properties are included in the response
- **Skip null values** — omit null properties from the output
- **DateTime formatting** — set a custom date/time format

For the full list of available context options, see the [Serializer guidelines](/docs/dg/dev/guidelines/serializer-guidelines.html).

## Custom normalizers

To add a custom normalizer that applies to API Platform resources, implement `SerializerNormalizerPluginInterface` and register it in `SerializerDependencyProvider`. Custom normalizers take priority over built-in normalizers.

For details on the Symfony Serializer component, see the [Symfony documentation](https://symfony.com/doc/current/serializer.html).
