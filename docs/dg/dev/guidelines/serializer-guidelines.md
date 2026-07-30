---
title: Serializer guidelines
description: Guidelines for using the Spryker Serializer module to serialize, deserialize, normalize, and denormalize data.
last_updated: Jun 10, 2026
template: concept-topic-template
related:
  - title: API Platform
    link: docs/dg/dev/architecture/api-platform.html
  - title: API Platform serialization
    link: docs/dg/dev/architecture/api-platform/serialization.html
---

The Serializer module provides a Spryker-native wrapper around the [Symfony Serializer component](https://symfony.com/doc/current/serializer.html). It exposes serialization operations through the Spryker Service layer and supports extension via plugins.

## Operations

The `SerializerServiceInterface` provides four operations:

| Method | Description |
|---|---|
| `serialize()` | Converts data to a string format (JSON, XML, CSV) |
| `deserialize()` | Converts a string into a typed object |
| `normalize()` | Converts an object or data structure to an associative array |
| `denormalize()` | Converts an array into a typed object |

All operations accept an optional `SerializerContextTransfer` to configure behavior.

## SerializerContextTransfer

The `SerializerContextTransfer` maps Spryker transfer conventions to Symfony Serializer context options. Supported options:

- **groups** — serialization groups for attribute filtering
- **isSkipNullValues** — omit null properties from output
- **isSkipUninitializedValues** — omit uninitialized properties
- **isPreserveEmptyObjects** — keep empty objects as `{}` instead of `[]`
- **isEnableMaxDepth** — enable max depth handling
- **maxDepth** — setting a value also enables max depth handling; the depth limits themselves come from `#[MaxDepth]` attributes on properties
- **isAllowExtraAttributes** — allow attributes in the input that don't exist on the target object
- **isCollectDenormalizationErrors** — collect all denormalization errors instead of failing on the first one
- **isRequireAllProperties** — require all properties to be present during denormalization
- **isDisableTypeEnforcement** — disable type enforcement during denormalization
- **datetimeFormat** — custom date/time format string
- **datetimeTimezone** — timezone for date/time normalization
- **defaultConstructorArguments** — default constructor arguments for denormalization
- **symfonyContext** — raw Symfony context array for advanced use cases (overrides explicit properties)

For the full list of Symfony context options, see the [Symfony Serializer documentation](https://symfony.com/doc/current/serializer.html#serializer-context).

## Extension via plugins

The module supports two plugin interfaces for registering custom normalizers and encoders:

- `SerializerNormalizerPluginInterface` — provides additional normalizers/denormalizers
- `SerializerEncoderPluginInterface` — provides additional encoders/decoders

Register plugins in your project's `SerializerDependencyProvider`:

```php
protected function getSerializerNormalizerPlugins(): array
{
    return [
        new YourCustomNormalizerPlugin(),
    ];
}
```

Custom normalizers are prepended before built-in normalizers, giving them higher priority.

These plugins affect only the Serializer module's own serializer instance. They have no effect on API Platform's request and response serialization—for that, see [API Platform serialization](/docs/dg/dev/architecture/api-platform/serialization.html).

## Built-in support

The module includes the following Symfony normalizers and encoders out of the box:

**Normalizers (in registration order):** UnwrappingDenormalizer, UidNormalizer, DateTimeNormalizer, DateTimeZoneNormalizer, DateIntervalNormalizer, BackedEnumNormalizer, DataUriNormalizer, JsonSerializableNormalizer, ArrayDenormalizer, ObjectNormalizer

**Encoders:** JsonEncoder, XmlEncoder, CsvEncoder
