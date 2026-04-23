---
title: Serializer
description: Spryker's Serializer service wraps the Symfony Serializer with a transfer-based context and pluggable normalizers and encoders.
last_updated: Apr 23, 2026
template: concept-topic-template
related:
  - title: API Platform
    link: docs/dg/dev/architecture/api-platform.html
  - title: Dependency Injection
    link: docs/dg/dev/architecture/dependency-injection.html
---

The `spryker/serializer` module provides a thin Spryker service around the [Symfony Serializer component](https://symfony.com/doc/current/serializer.html). It exposes the four canonical operations — `serialize`, `deserialize`, `normalize`, `denormalize` — and accepts a `SerializerContextTransfer` instead of a raw context array, so projects get a typed, self-documenting API.

The companion `spryker/serializer-extension` module ships the plugin interfaces used to contribute custom normalizers and encoders.

## When to use it

Use the Serializer service when you need to:

- Convert objects or transfers to JSON, XML, CSV, or any other format supported by a registered encoder.
- Hydrate objects from raw input (strings or arrays) with consistent context handling.
- Plug custom (de)normalizers or (de)encoders into a shared, project-wide serializer instance.

For HTTP-facing serialization in API Platform resources, keep relying on API Platform's own serializer; the Spryker Serializer is meant for service-layer and plugin-level use cases.

## Public API

`Spryker\Service\Serializer\SerializerServiceInterface`

```php
public function serialize(mixed $data, string $format, ?SerializerContextTransfer $serializerContextTransfer = null): string;

public function deserialize(mixed $data, string $type, string $format, ?SerializerContextTransfer $serializerContextTransfer = null): mixed;

public function normalize(mixed $data, ?string $format = null, ?SerializerContextTransfer $serializerContextTransfer = null): array|string|int|float|bool|\ArrayObject|null;

public function denormalize(
    mixed $data,
    string $type,
    ?string $format = null,
    ?SerializerContextTransfer $serializerContextTransfer = null,
    ?object $objectToPopulate = null,
): mixed;
```

## Using the service

```php
use Generated\Shared\Transfer\SerializerContextTransfer;
use Spryker\Service\Serializer\SerializerServiceInterface;

class OrderExporter
{
    public function __construct(
        private readonly SerializerServiceInterface $serializerService,
    ) {
    }

    public function export(OrderTransfer $orderTransfer): string
    {
        $context = (new SerializerContextTransfer())
            ->addGroup('export')
            ->setIsSkipNullValues(true)
            ->setDatetimeFormat(DATE_ATOM);

        return $this->serializerService->serialize($orderTransfer, 'json', $context);
    }
}
```

To hydrate a specific object instance instead of creating a new one, pass it as `objectToPopulate`:

```php
$order = new OrderTransfer();
$this->serializerService->denormalize($payload, OrderTransfer::class, 'json', null, $order);
```

## SerializerContextTransfer

The context transfer is the typed equivalent of the associative context array Symfony Serializer expects. It is mapped internally to the matching Symfony constants.

| Property                              | Maps to (Symfony)                                         |
|---------------------------------------|-----------------------------------------------------------|
| `groups`                              | `AbstractNormalizer::GROUPS`                              |
| `isSkipNullValues`                    | `AbstractObjectNormalizer::SKIP_NULL_VALUES`              |
| `isSkipUninitializedValues`           | `AbstractObjectNormalizer::SKIP_UNINITIALIZED_VALUES`     |
| `isPreserveEmptyObjects`              | `AbstractObjectNormalizer::PRESERVE_EMPTY_OBJECTS`        |
| `isEnableMaxDepth` / `maxDepth`       | `AbstractObjectNormalizer::ENABLE_MAX_DEPTH`              |
| `isAllowExtraAttributes`              | `AbstractNormalizer::ALLOW_EXTRA_ATTRIBUTES`              |
| `datetimeFormat` / `datetimeTimezone` | `DateTimeNormalizer::FORMAT_KEY` / `TIMEZONE_KEY`         |
| `isCollectDenormalizationErrors`      | `AbstractObjectNormalizer::COLLECT_DENORMALIZATION_ERRORS`|
| `isRequireAllProperties`              | `AbstractObjectNormalizer::REQUIRE_ALL_PROPERTIES`        |
| `isDisableTypeEnforcement`            | `AbstractObjectNormalizer::DISABLE_TYPE_ENFORCEMENT`      |
| `defaultConstructorArguments`         | `AbstractNormalizer::DEFAULT_CONSTRUCTOR_ARGUMENTS`       |
| `symfonyContext`                      | Merged verbatim into the final context array              |

Any key that is not covered by a dedicated property can be supplied through `symfonyContext`, which is merged last.

## Extending the Serializer

Register custom (de)normalizers or (de)encoders through the plugin interfaces from `spryker/serializer-extension`.

### Normalizers

Implement `Spryker\Shared\SerializerExtension\Dependency\Plugin\SerializerNormalizerPluginInterface` and return one or more Symfony normalizer instances:

```php
<?php

declare(strict_types=1);

namespace Pyz\Service\Serializer\Plugin;

use Spryker\Shared\SerializerExtension\Dependency\Plugin\SerializerNormalizerPluginInterface;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class DefaultNormalizerPlugin implements SerializerNormalizerPluginInterface
{
    /**
     * @return array<\Symfony\Component\Serializer\Normalizer\NormalizerInterface|\Symfony\Component\Serializer\Normalizer\DenormalizerInterface>
     */
    public function getNormalizers(): array
    {
        return [
            new DateTimeNormalizer(),
            new ObjectNormalizer(),
        ];
    }
}
```

### Encoders

Implement `Spryker\Shared\SerializerExtension\Dependency\Plugin\SerializerEncoderPluginInterface`:

```php
<?php

declare(strict_types=1);

namespace Pyz\Service\Serializer\Plugin;

use Spryker\Shared\SerializerExtension\Dependency\Plugin\SerializerEncoderPluginInterface;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;

class DefaultEncoderPlugin implements SerializerEncoderPluginInterface
{
    /**
     * @return array<\Symfony\Component\Serializer\Encoder\EncoderInterface|\Symfony\Component\Serializer\Encoder\DecoderInterface>
     */
    public function getEncoders(): array
    {
        return [
            new JsonEncoder(),
            new XmlEncoder(),
        ];
    }
}
```

### Wiring the plugins

Register your plugins in the project dependency provider:

`src/Pyz/Service/Serializer/SerializerDependencyProvider.php`

```php
<?php

declare(strict_types=1);

namespace Pyz\Service\Serializer;

use Pyz\Service\Serializer\Plugin\DefaultEncoderPlugin;
use Pyz\Service\Serializer\Plugin\DefaultNormalizerPlugin;
use Spryker\Service\Serializer\SerializerDependencyProvider as SprykerSerializerDependencyProvider;

class SerializerDependencyProvider extends SprykerSerializerDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\SerializerExtension\Dependency\Plugin\SerializerNormalizerPluginInterface>
     */
    protected function getSerializerNormalizerPlugins(): array
    {
        return [
            new DefaultNormalizerPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Shared\SerializerExtension\Dependency\Plugin\SerializerEncoderPluginInterface>
     */
    protected function getSerializerEncoderPlugins(): array
    {
        return [
            new DefaultEncoderPlugin(),
        ];
    }
}
```

Plugins are collected lazily; the underlying Symfony `Serializer` is built once on first use and reused for the life of the request.

## Installation

```bash
composer require spryker/serializer spryker/serializer-extension
```

## Related documentation

- [Symfony Serializer component](https://symfony.com/doc/current/serializer.html)
- [API Platform](/docs/dg/dev/architecture/api-platform.html)
