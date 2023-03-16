---
title: Modules configuration
description: Modules configuration extension scenario
last_updated: Mar 13, 2023
template: concept-topic-template
related:
- title: Plugins registration
  link: docs/scos/dev/guidelines/keeping-a-project-upgradable/supported-extension-scenarios/event-subscribers-registration.html
- title: Event subscribers registration
  link: docs/scos/dev/guidelines/keeping-a-project-upgradable/supported-extension-scenarios/event-subscribers-registration.html
- title: Modules configuration
  link: docs/scos/dev/guidelines/keeping-a-project-upgradable/supported-extension-scenarios/modules-configuration.html
---

## Introduction

Manifests support changes in module configuration files.

Manifests support all scalar types (bool, int, float, string), compound type array and special type null.

Manifests do not support compound types object, callable, iterable and special type resource.

Manifest only add the values to configuration files. Manifests DO NOT REMOVE the values from project configuration. 

## 1.1. Basic scalar values as return

Manifests fully support 4 PHP data types:
* bool
* int
* float (floating-point number)
* string

Manifests also support usage of the constants and have built in basic support for constant concatenation.

Code example 1.1.1: Method returns string
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

Code example 1.1.2: Method returns string (constant used)
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

Code example 1.1.3: Method returns string with constant concatenation
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

Code example 1.1.4: Method returns boolean
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

Code example 1.1.5: Method returns int
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

## 1.2. Array as return

### 1.2.1. Indexed array as return

Code example 1.2.1: Method returns indexed array
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

### 1.2.2. Associative array as return

Code example 1.2.2: Method returns associative array
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

### 1.2.3. Multidimensional array as return

Multidimensional associative arrays are supported up to 2 levels, but for its usage the wrapped functions MUST be used: 
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

### 1.2.4. Merging array

Manifests fully support merging the results of calling multiple methods.

Inside of an array merge function call you can use:
* wrap methods calls
* parent method call
* indexed arrays
* associative arrays
* multidimensional arrays
* variables

Code example 1.2.4: Method returns associative array (with constants, parent method call and array merging)
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

Multidimensional arrays (up to 2 levels) are also supported here, but for its usage the wrapped function MUST be used.

Code example 1.2.5: Method returns multidimensional array (with constants, wrap methods call and array merging)
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

## 1.3. Null as return

Code example 1.1.4: Method returns null
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
