---
title: Serializer guidelines
description: Guidelines for using the Spryker Serializer module to serialize, deserialize, normalize, and denormalize data.
last_updated: Mar 29, 2026
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

The `SerializerContextTransfer` maps Spryker transfer conventions to Symfony Serializer context options. Supported options include:

- **groups** — serialization groups for attribute filtering
- **isSkipNullValues** — omit null properties from output
- **isSkipUninitializedValues** — omit uninitialized properties
- **isPreserveEmptyObjects** — keep empty objects as `{}` instead of `[]`
- **isEnableMaxDepth** — enable max depth handling
- **datetimeFormat** — custom date/time format string
- **datetimeTimezone** — timezone for date/time normalization
- **defaultConstructorArguments** — default constructor arguments for denormalization
- **symfonyContext** — raw Symfony context array for advanced use cases (overrides explicit properties)

For the full list of Symfony context options, see the [Symfony Serializer documentation](https://symfony.com/doc/current/serializer.html#context).

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

## Built-in support

The module includes the following Symfony normalizers and encoders out of the box:

**Normalizers:** ObjectNormalizer, ArrayDenormalizer, DateTimeNormalizer, DateTimeZoneNormalizer, DateIntervalNormalizer, BackedEnumNormalizer, DataUriNormalizer, JsonSerializableNormalizer, UidNormalizer, UnwrappingDenormalizer

**Encoders:** JsonEncoder, XmlEncoder, CsvEncoder
