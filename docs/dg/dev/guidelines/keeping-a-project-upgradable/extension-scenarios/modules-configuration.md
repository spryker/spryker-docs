---
title: Modules configuration
description: Learn all about how manifests support changes in the configuration files of modules within your Spryker Project.
last_updated: Mar 13, 2023
template: concept-topic-template
related:
  - title: Keeping a project upgradable
    link: docs/dg/dev/guidelines/keeping-a-project-upgradable/keeping-a-project-upgradable.html
  - title: Plugins registration
    link: docs/dg/dev/guidelines/keeping-a-project-upgradable/extension-scenarios/plugins-registration.html
  - title: Event subscribers registration
    link: ocs/dg/dev/guidelines/keeping-a-project-upgradable/extension-scenarios/event-subscribers-registration.html
redirect_from:
    - /docs/scos/dev/guidelines/keeping-a-project-upgradable/supported-extension-scenarios/modules-configuration.html
    - /docs/scos/dev/guidelines/keeping-a-project-upgradable/extension-scenarios/modules-configuration.html
---


This document explains how manifests support changes in the configuration files of modules.

Manifests support all scalar types (bool, int, float, string), the compound type array, and the special type, null.

Manifests do not support compound type objects, or callable, iterable and special type resources.

Manifest only add values to configuration files. Manifests *don't remove* values from project configuration.

## Basic scalar values as the return

Manifests fully support 4 PHP data types as the return.

The following is an example of how to have the method return a boolean:

```php
use SprykerShop\Yves\ProductReplacementForWidget\ProductReplacementForWidgetConfig as SprykerShopProductReplacementForWidgetConfig;

class ProductReplacementForWidgetConfig extends SprykerShopProductReplacementForWidgetConfig
{
    ...
    public function isProductReplacementFilterActive(): bool
    {
        return true;
    }
}
```

The following is an example of how to have the method return an int:

```php
use Spryker\Zed\Customer\CustomerConfig as SprykerCustomerConfig;

class CustomerConfig extends SprykerCustomerConfig
{
    ...
    public function getCustomerPasswordSequenceLimit(): ?int
    {
        return 3;
    }
}
```

The following is an example of how to have the method return a string:
```php
use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;

class RabbitMqConfig extends SprykerRabbitMqConfig
{
    ...
    protected function getDefaultBoundQueueNamePrefix(): string
    {
        return 'error';
    }
}
```

Manifests also support the usage of constants and have built in basic support for constant concatenation.

The following is an example of how to have the method return a string with a constant:

```php
use Pyz\Zed\Synchronization\SynchronizationConfig;
use Spryker\Zed\ConfigurableBundleStorage\ConfigurableBundleStorageConfig as SprykerConfigurableBundleStorageConfig;

class ConfigurableBundleStorageConfig extends SprykerConfigurableBundleStorageConfig
{
    ...
    public function getConfigurableBundleTemplateSynchronizationPoolName(): string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }
}
```

The following is an example of how to have the method return a string with constant concatenation:

```php
use Spryker\Zed\Development\DevelopmentConfig as SprykerDevelopmentConfig;

class DevelopmentConfig extends SprykerDevelopmentConfig
{
    ...
    public function getCodingStandard(): string
    {
        return APPLICATION_ROOT_DIR . DIRECTORY_SEPARATOR . 'phpcs.xml';
    }
}
```
##  Array as a return

There's a multitude of ways to view arrays as the return. Manifests support the following array types:

### Indexed array as the return

The following is an example of how to have the method return an indexed array:

```php
use Spryker\Client\Storage\StorageConfig as SprykerStorageClientConfig;

class StorageConfig extends SprykerStorageClientConfig
{
    ...
    public function getAllowedGetParametersList(): array
    {
        return [
            'page',
            'sort',
            'ipp',
            'q',
        ];
    }
}
```

### Associative array as the return

The following is an example of how to have the method return an associative array:

```php
use Spryker\Glue\NavigationsRestApi\NavigationsRestApiConfig as SprykerNavigationsRestApiConfigi;

class NavigationsRestApiConfig extends SprykerNavigationsRestApiConfigi
{
    ...
    public function getNavigationTypeToUrlResourceIdFieldMapping(): array
    {
        return [
            'category' => 'fkResourceCategorynode',
            'cms_page' => 'fkResourcePage',
        ];
    }
}
```

### Multidimensional array as the return

Multidimensional associative arrays are supported up to two levels, but for their usage the wrapped functions *must* be used:

```php
use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;
use Spryker\Shared\Event\EventConfig;
use Spryker\Shared\Event\EventConstants;
use Spryker\Shared\Log\LogConstants;

class RabbitMqConfig extends SprykerRabbitMqConfig
{
    ...
    protected function getQueueConfiguration(): array
    {
        return [
            EventConstants::EVENT_QUEUE => $this->getEventQueuePlugins(),
            $this->get(LogConstants::LOG_QUEUE_NAME),
        ];
    }

    protected function getEventQueuePlugins(): array
    {
        return [
            EventConfig::EVENT_ROUTING_KEY_RETRY => EventConstants::EVENT_QUEUE_RETRY,
            EventConfig::EVENT_ROUTING_KEY_ERROR => EventConstants::EVENT_QUEUE_ERROR,
        ];
    }
}
```

### Merging arrays

Manifests fully support merging the results of calling multiple methods.

Inside of an array merge function call you can use the following:

* wrap methods calls
* parent method call
* indexed arrays
* associative arrays

The following is an example of how to have the method return an associative array (with constants, parent method call and array merging):

```php
use Generated\Shared\Transfer\QuoteTransfer;
use Spryker\Client\MultiCart\MultiCartConfig as SprykerMultiCartConfig;

class MultiCartConfig extends SprykerMultiCartConfig
{
    ...
    public function getQuoteFieldsAllowedForQuoteDuplicate(): array
    {
        return array_merge(parent::getQuoteFieldsAllowedForQuoteDuplicate(), [
            QuoteTransfer::BUNDLE_ITEMS,
            QuoteTransfer::CART_NOTE,
        ]);
    }
}
```
multidimensional arrays of up to two levels are also supported, but to use them, you must use the wrapped function.

The following is an example of how to have the method return a multidimensional array (with constants, wrap methods call and array merging):

```php
use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;
use Spryker\Shared\Event\EventConfig;
use Spryker\Shared\Event\EventConstants;
use Spryker\Shared\Log\LogConstants;

class RabbitMqConfig extends SprykerRabbitMqConfig
{
    ...
    protected function getQueueConfiguration(): array
    {
        return array_merge(
            [
                EventConstants::EVENT_QUEUE => $this->getEventQueuePlugins(),
                $this->get(LogConstants::LOG_QUEUE_NAME),
            ],
            $this->getPublishQueueConfiguration(),
            $this->getSynchronizationQueueConfiguration(),
        );
    }

    protected function getEventQueuePlugins(): array
    {
        return [
            EventConfig::EVENT_ROUTING_KEY_RETRY => EventConstants::EVENT_QUEUE_RETRY,
            EventConfig::EVENT_ROUTING_KEY_ERROR => EventConstants::EVENT_QUEUE_ERROR,
        ];
    }
}
```
* variables

## Null as the return

The following is an example of how to have the method return a null result:

```php
use Spryker\Zed\Api\ApiConfig as SprykerApiConfig;

class ApiConfig extends SprykerApiConfig
{
    ...
    public function getAllowedOrigin(): ?string
    {
        return null;
    }
}
```
