---
title: Supported code changes
description: Description and examples of the supported code changes by manifests
last_updated: Dec 31, 2022
template: concept-topic-template
related:
  - title: Upgradability guidelines
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/upgradability-guidelines.html
---

## 1. Plugins registration

Manifests support the registration of plugins in dependency provider classes and in configuration files. There are multiple ways in which the plugins can be registered inside of a project.

### 1.1. Plugins registration in the configuration file

Code example:

```php
use Spryker\Shared\Log\LogConstants;
use Spryker\Glue\Log\Plugin\GlueLoggerConfigPlugin;
use Spryker\Yves\Log\Plugin\YvesLoggerConfigPlugin;
use Spryker\Zed\Log\Communication\Plugin\ZedLoggerConfigPlugin;

...

$config[LogConstants::LOGGER_CONFIG_ZED] = ZedLoggerConfigPlugin::class;
$config[LogConstants::LOGGER_CONFIG_YVES] = YvesLoggerConfigPlugin::class;
$config[LogConstants::LOGGER_CONFIG_GLUE] = GlueLoggerConfigPlugin::class;

...
```
<em>Code example 1.1</em>: A single plugin registration in the global configuration file (e.g. config_default.php)

## 1.2. Plugins registration in the dependency provider file
### 1.2.1. Single plugin registration

Inside of a dependency provider call, you can register the plugin directly in the method or through another wrap method, with and without constructor arguments. Manifests also support constant concatenation inside of the constructor arguments.

Code examples:

```php
use Spryker\Client\Catalog\CatalogDependencyProvider as SprykerCatalogDependencyProvider;
use Spryker\Client\CatalogPriceProductConnector\Plugin\CurrencyAwareSuggestionByTypeResultFormatter;
use Spryker\Client\Search\Dependency\Plugin\ResultFormatterPluginInterface;
use Spryker\Client\SearchElasticsearch\Plugin\ResultFormatter\SuggestionByTypeResultFormatterPlugin;

class CatalogDependencyProvider extends SprykerCatalogDependencyProvider
{
    ...
    protected function getResultFormatterPlugin(): ResultFormatterPluginInterface 
    {
        return new CurrencyAwareSuggestionByTypeResultFormatter(
            new SuggestionByTypeResultFormatterPlugin()
        );
    }
}
```
<em>Code example 1.2.1</em>: A single plugin registration with arguments in constructor

```php
use Spryker\Service\FileSystemExtension\Dependency\Plugin\FileSystemReaderPluginInterface;
use Spryker\Service\Flysystem\Plugin\FileSystem\FileSystemReaderPlugin;
use Spryker\Service\Kernel\AbstractBundleDependencyProvider;

class FileSystemDependencyProvider extends AbstractBundleDependencyProvider
{
    ...
    protected function getSystemReaderPlugin(): FileSystemReaderPluginInterface 
    {
        return $this->getFileSystemReaderPlugin();
    }
    
    protected function getFileSystemReaderPlugin(): FileSystemReaderPluginInterface
    {
        return new FileSystemReaderPlugin();
    }
}
```
<em>Code example 1.2.2</em>: A single plugin registration with wrap method call

### 1.2.2. Plugins registration in an indexed array
Manifests fully support multiple plugins registration in an indexed array. Manifests also support additional conditions for the registration of plugins, and additional restrictions on the order of plugins.

Restrictions on the order of plugins can be done with special annotation keys ‘before' and ‘after’ (Code example 1.2.4). 

If the plugin doesn’t contain any of these keys, it will be added to the end of the plugin stack. 

If the plugin contains the ‘after' key and defined plugins in ‘after’ parameter don’t exist on the project side, the plugin will be added to the end of the plugin stack.

If the plugin contains the ‘before' key and defined plugins in ‘before’ parameter don’t exist on the project side, the plugin will be added as the first plugin in the plugin stack.

Code examples:

```php
use Spryker\Client\MerchantProductStorage\Plugin\ProductOfferStorage\MerchantProductProductOfferReferenceStrategyPlugin;
use Spryker\Client\ProductOfferStorage\Plugin\ProductOfferStorage\ProductOfferReferenceStrategyPlugin;
use Spryker\Client\ProductOfferStorage\ProductOfferStorageDependencyProvider as SprykerProductOfferStorageDependencyProvider;

class ProductOfferStorageDependencyProvider extends SprykerProductOfferStorageDependencyProvider
{
    ...
    protected function getProductOfferReferenceStrategyPlugins(): array
    {
        return [
            new ProductOfferReferenceStrategyPlugin(),
            new MerchantProductProductOfferReferenceStrategyPlugin(),
        ];
    }
}
```
<em>Code example 1.2.3</em>: Multiple plugins registration in an indexed array

```php
use Spryker\Client\MerchantProductStorage\Plugin\ProductOfferStorage\MerchantProductProductOfferReferenceStrategyPlugin;
use Spryker\Client\ProductOfferStorage\Plugin\ProductOfferStorage\DefaultProductOfferReferenceStrategyPlugin;
use Spryker\Client\ProductOfferStorage\Plugin\ProductOfferStorage\ProductOfferReferenceStrategyPlugin;
use Spryker\Client\ProductOfferStorage\ProductOfferStorageDependencyProvider as SprykerProductOfferStorageDependencyProvider;

class ProductOfferStorageDependencyProvider extends SprykerProductOfferStorageDependencyProvider
{
    ...
    protected function getProductOfferReferenceStrategyPlugins(): array
    {
        return [
            /**
             * Restrictions:
             * - before {@link \Spryker\Client\MerchantProductStorage\Plugin\ProductOfferStorage\MerchantProductProductOfferReferenceStrategyPlugin} Call it always before MerchantProductProductOfferReferenceStrategyPlugin.
             */
            new ProductOfferReferenceStrategyPlugin(),
            new MerchantProductProductOfferReferenceStrategyPlugin(),
            /**
             * Restrictions:
             * - after {@link \Spryker\Client\ProductOfferStorage\Plugin\ProductOfferStorage\ProductOfferReferenceStrategyPlugin}
             * - after {@link \Spryker\Client\MerchantProductStorage\Plugin\ProductOfferStorage\MerchantProductProductOfferReferenceStrategyPlugin} Call it always after ProductOfferReferenceStrategyPlugin and MerchantProductProductOfferReferenceStrategyPlugin.
             */
            new DefaultProductOfferReferenceStrategyPlugin(),
        ];
    }
}
```
<em>Code example 1.2.4</em>: Multiple plugins registration in an indexed array with restrictions on the order of the plugins

```php
use Spryker\Yves\Form\FormDependencyProvider as SprykerFormDependencyProvider;
use Spryker\Yves\Validator\Plugin\Form\ValidatorExtensionFormPlugin;
use Spryker\Yves\Form\Plugin\Form\CsrfFormPlugin;
use SprykerShop\Yves\WebProfilerWidget\Plugin\Form\WebProfilerFormPlugin;

class FormDependencyProvider extends SprykerFormDependencyProvider
{
    ...
    protected function getFormPlugins(): array
    {
        $plugins = [
            new ValidatorExtensionFormPlugin(),
        ];
        
        $plugins[] = new CsrfFormPlugin();
        
        if (class_exists(WebProfilerFormPlugin::class)) {
            $plugins[] = new WebProfilerFormPlugin();
        }
        
        return $plugins;
    }
}
```
<em>Code example 1.2.5</em>: Multiple plugins registration in an indexed array (BC reasons only)

```php
use Pyz\Zed\DataImport\DataImportConfig;
use Spryker\Zed\DataImport\Communication\Console\DataImportConsole;
use Spryker\Zed\Twig\Communication\Console\CacheWarmerConsole;
use Spryker\Zed\ZedNavigation\Communication\Console\BuildNavigationConsole;

class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    protected const COMMAND_SEPARATOR = ':';

    protected function getConsoleCommands(Container $container): array
    {
        $commands = [
            new CacheWarmerConsole(),
            new BuildNavigationConsole(),
            new DataImportConsole(),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . DataImportConfig::IMPORT_TYPE_STORE),
            new DataImportConsole(DataImportConsole::DEFAULT_NAME . static::COMMAND_SEPARATOR . DataImportConfig::IMPORT_TYPE_CURRENCY),
        ];
    }
}
```
<em>Code example 1.2.6</em>: Multiple console commands registration with a constant concatenated constructor argument

### 1.2.3. Plugins in an associative array
Manifests fully support multiple plugins registration in an associative array. As a key you can use:

* string
* constant
* function call with arguments

Code examples:

```php
use Spryker\Shared\Config\Config;
use Spryker\Shared\Event\EventConstants;
use Spryker\Shared\Log\LogConstants;
use Spryker\Zed\Event\Communication\Plugin\Queue\EventRetryQueueMessageProcessorPlugin;
use Spryker\Zed\Event\Communication\Plugin\Queue\EventQueueMessageProcessorPlugin;
use Spryker\Zed\Queue\QueueDependencyProvider as SprykerDependencyProvider;
use SprykerEco\Zed\Loggly\Communication\Plugin\LogglyLoggerQueueMessageProcessorPlugin;

class QueueDependencyProvider extends SprykerDependencyProvider
{
    ...
    protected function getProcessorMessagePlugins(Container $container): array
    {
        return [
            'eventQueue' => new EventQueueMessageProcessorPlugin(),
            EventConstants::EVENT_QUEUE_RETRY => new EventRetryQueueMessageProcessorPlugin(),
            Config::get(LogConstants::LOG_QUEUE_NAME) => new LogglyLoggerQueueMessageProcessorPlugin(),
        ];
    }
}
```
<em>Code example 1.2.7</em>: Multiple plugins registration in an indexed array

```php
use Spryker\Shared\Config\Config;
use Spryker\Shared\Event\EventConstants;
use Spryker\Shared\Log\LogConstants;
use Spryker\Zed\Event\Communication\Plugin\Queue\EventRetryQueueMessageProcessorPlugin;
use Spryker\Zed\Event\Communication\Plugin\Queue\EventQueueMessageProcessorPlugin;
use Spryker\Zed\Queue\QueueDependencyProvider as SprykerDependencyProvider;
use SprykerEco\Zed\Loggly\Communication\Plugin\LogglyLoggerQueueMessageProcessorPlugin;

class QueueDependencyProvider extends SprykerDependencyProvider
{
    ...
    protected function getProcessorMessagePlugins(Container $container): array
    {
        $plugins = [];
        
        $plugins['eventQueue'] = new EventQueueMessageProcessorPlugin();
        $plugins[EventConstants::EVENT_QUEUE_RETRY] = new EventRetryQueueMessageProcessorPlugin();
        $plugins[Config::get(LogConstants::LOG_QUEUE_NAME)] = new LogglyLoggerQueueMessageProcessorPlugin();
        
        return $plugins;
    }
}
```
<em>Code example 1.2.8</em>: Multiple plugins registration in an indexed array

### 1.2.4. Plugins in multidimensional array
Manifests have limited support of multidimensional arrays:

* only arrays that are added through the key are supported

* only multidimensional arrays with up to 2 levels of depth are supported. It means that the following structure WILL NOT BE SUPPORTED: 

```php
protected function getPlugins(): array
{
    return [
        GlossaryStorageConfig::PUBLISH_TRANSLATION => [
            'delete' => [
                new GlossaryKeyDeletePublisherPlugin(),
            ],
            'write' => [
                new GlossaryKeyWriterPublisherPlugin(),
                new GlossaryTranslationWritePublisherPlugin(),
            ],
        ],
    ];
}
```

Code examples:

```php
use Spryker\Shared\GlossaryStorage\GlossaryStorageConfig;
use Spryker\Zed\GlossaryStorage\Communication\Plugin\Publisher\GlossaryKey\GlossaryDeletePublisherPlugin as GlossaryKeyDeletePublisherPlugin;
use Spryker\Zed\GlossaryStorage\Communication\Plugin\Publisher\GlossaryKey\GlossaryWritePublisherPlugin as GlossaryKeyWriterPublisherPlugin;
use Spryker\Zed\GlossaryStorage\Communication\Plugin\Publisher\GlossaryTranslation\GlossaryWritePublisherPlugin as GlossaryTranslationWritePublisherPlugin;
use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    ...
    protected function getGlossaryStoragePlugins(): array
    {
        return [
            GlossaryStorageConfig::PUBLISH_TRANSLATION => [
                new GlossaryKeyDeletePublisherPlugin(),
                new GlossaryKeyWriterPublisherPlugin(),
                new GlossaryTranslationWritePublisherPlugin(),
            ],
        ];
    }
}
```
<em>Code example 1.2.9</em>: Multiple plugins registration in a multidimensional array

```php
use Spryker\Shared\GlossaryStorage\GlossaryStorageConfig;
use Spryker\Zed\GlossaryStorage\Communication\Plugin\Publisher\GlossaryKey\GlossaryDeletePublisherPlugin as GlossaryKeyDeletePublisherPlugin;
use Spryker\Zed\GlossaryStorage\Communication\Plugin\Publisher\GlossaryKey\GlossaryWritePublisherPlugin as GlossaryKeyWriterPublisherPlugin;
use Spryker\Zed\GlossaryStorage\Communication\Plugin\Publisher\GlossaryTranslation\GlossaryWritePublisherPlugin as GlossaryTranslationWritePublisherPlugin;
use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    ...
    protected function getGlossaryStoragePlugins(): array
    {
        $storagePlugins = [];
        
        $storagePlugins[GlossaryStorageConfig::PUBLISH_TRANSLATION] = [
            new GlossaryKeyDeletePublisherPlugin(),
            new GlossaryKeyWriterPublisherPlugin(),
            new GlossaryTranslationWritePublisherPlugin(),
        ];
        
        return $storagePlugins;
    }
}
```
<em>Code example 1.2.10</em>: Multiple plugins registration in a multidimensional array

### 1.2.5. Container extension
Manifests fully support the possibility of adding plugins through a container extension. The Order of the plugins is NOT SUPPORTED inside of the container extension. It means that `before` and `after` are NOT SUPPORTED in this case.

Code example:

```php
use Generated\Shared\Transfer\PaymentTransfer;
use Spryker\Shared\Nopayment\NopaymentConfig;
use Spryker\Yves\Kernel\Container;
use Spryker\Yves\Nopayment\Plugin\NopaymentHandlerPlugin;
use Spryker\Yves\StepEngine\Dependency\Plugin\Handler\StepHandlerPluginCollection;
use SprykerEco\Yves\Payone\Plugin\PayoneHandlerPlugin;
use SprykerShop\Yves\CheckoutPage\CheckoutPageDependencyProvider as SprykerShopCheckoutPageDependencyProvider;

class CheckoutPageDependencyProvider extends SprykerShopCheckoutPageDependencyProvider
{
    ...
    protected function extendPaymentMethodHandler(Container $container): Container
    {
        $container->extend(static::PAYMENT_METHOD_HANDLER, function (StepHandlerPluginCollection $paymentMethodHandler) {
            $paymentMethodHandler->add(new NopaymentHandlerPlugin(), NopaymentConfig::PAYMENT_PROVIDER_NAME);
      
            $paymentMethodHandler->add(new PayoneHandlerPlugin(), PaymentTransfer::PAYONE_CREDIT_CARD);
            $paymentMethodHandler->add(new PayoneHandlerPlugin(), PaymentTransfer::PAYONE_INSTANT_ONLINE_TRANSFER);
            
            return $paymentMethodHandler;
        });
    
        return $container;
    }
}
```
<em>Code example 1.2.11</em>: Multiple plugins registration through a container extension

### 1.2.6. Merging plugins
Manifests fully support the possibility of merging the results of calling the registration methods of multiple plugins.

Inside of array merge function call you can use:

* wrap methods calls
* parent method call
* indexed arrays
* associative arrays
* multidimensional arrays
* variables

Multidimensional associative arrays are supported up to 2 levels, but for its usage the wrapped functions MUST be used.

Code examples:

```php
use Spryker\Shared\GlossaryStorage\GlossaryStorageConfig;
use Spryker\Shared\PublishAndSynchronizeHealthCheck\PublishAndSynchronizeHealthCheckConfig;
use Spryker\Zed\GlossaryStorage\Communication\Plugin\Publisher\GlossaryKey\GlossaryDeletePublisherPlugin as GlossaryKeyDeletePublisherPlugin;
use Spryker\Zed\GlossaryStorage\Communication\Plugin\Publisher\GlossaryKey\GlossaryWritePublisherPlugin as GlossaryKeyWriterPublisherPlugin;
use Spryker\Zed\MerchantProductSearch\Communication\Plugin\Publisher\Merchant\MerchantProductSearchWritePublisherPlugin as MerchantMerchantProductSearchWritePublisherPlugin;
use Spryker\Zed\MerchantProductSearch\Communication\Plugin\Publisher\MerchantProduct\MerchantProductSearchWritePublisherPlugin;
use Spryker\Zed\MerchantStorage\Communication\Plugin\Publisher\Merchant\MerchantCategoryStoragePublisherPlugin;
use Spryker\Zed\ProductRelationStorage\Communication\Plugin\Publisher\ProductRelation\ProductRelationWriteForPublishingPublisherPlugin;
use Spryker\Zed\ProductRelationStorage\Communication\Plugin\Publisher\ProductRelation\ProductRelationWritePublisherPlugin;
use Spryker\Zed\PublishAndSynchronizeHealthCheckSearch\Communication\Plugin\Publisher\PublishAndSynchronizeHealthCheckSearchWritePublisherPlugin;
use Spryker\Zed\PublishAndSynchronizeHealthCheckStorage\Communication\Plugin\Publisher\PublishAndSynchronizeHealthCheckStorageWritePublisherPlugin;
use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;
use Spryker\Zed\PublisherExtension\Dependency\Plugin\PublisherPluginInterface;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    ...
    protected function getPublisherPlugins(): array
    {
        $productSearchPlugins = [
            new MerchantMerchantProductSearchWritePublisherPlugin(),
            new MerchantProductSearchWritePublisherPlugin(),
        ];
        
        return array_merge(
            parent::getPublisherPlugins(),
            [
                PublishAndSynchronizeHealthCheckConfig::PUBLISH_PUBLISH_AND_SYNCHRONIZE_HEALTH_CHECK => $this->getHealthCheckPublisherPlugins(),
            ],
            $productSearchPlugins,
            $this->getGlossaryStoragePlugins(),
            $this->getProductRelationStoragePlugins(),
            [
                $this->getMerchantStoragePlugin(),
            ]
        );
    }
    
    protected function getHealthCheckPublisherPlugins(): array
    {
        return [
            new PublishAndSynchronizeHealthCheckStorageWritePublisherPlugin(),
            new PublishAndSynchronizeHealthCheckSearchWritePublisherPlugin(),
        ];
    }
    
    protected function getGlossaryStoragePlugins(): array
    {
        return [
            GlossaryStorageConfig::PUBLISH_TRANSLATION => [
                new GlossaryKeyDeletePublisherPlugin(),
                new GlossaryKeyWriterPublisherPlugin(),
            ],
        ];
    }
    
    protected function getProductRelationStoragePlugins(): array
    {
        return [
            new ProductRelationWritePublisherPlugin(),
            new ProductRelationWriteForPublishingPublisherPlugin(),
        ];
    }
    
    protected function getMerchantStoragePlugin(): PublisherPluginInterface
    {
        return new MerchantCategoryStoragePublisherPlugin();
    }
}
```
<em>Code example 1.2.12</em>: Multiple plugins registration with the merging plugins method call

### 1.3. Special situations
If the target dependency provider class doesn’t exist in the project, it will be automatically created, and all required methods will be created automatically as well.

If the target dependency provider class exists, but the target method doesn’t exist in the class, the method won’t be created, and the changes won’t be applied.

If the target method inside of the dependency provider class was modified on the project level and, for example, the array was extracted into the separated method, the upgrader won’t find the array, and the changes won’t be applied.

## 2. Event subscribers registration
Manifests support the registration of event subscribers in the dependency provider.

Manifests fully support event subscribers registration in collection. Restrictions to the order of the plugins in collection are NOT SUPPORTED. New plugin will be added to the end of the collection.

Code examples:

```php
use Spryker\Zed\AvailabilityStorage\Communication\Plugin\Event\Subscriber\AvailabilityStorageEventSubscriber;
use Spryker\Zed\Event\EventDependencyProvider as SprykerEventDependencyProvider;
use Spryker\Zed\UrlStorage\Communication\Plugin\Event\Subscriber\UrlStorageEventSubscriber;

class EventDependencyProvider extends SprykerEventDependencyProvider
{
    ...
    protected function getEventSubscriberCollection()
    {
        $collection = parent::getEventSubscriberCollection();
    
        $collection->add(new AvailabilityStorageEventSubscriber());
        $collection->add(new UrlStorageEventSubscriber());
    
        return $collection;
    }
}
```
<em>Code example 2.1</em>: Event subscribers registration in collection with a parent method call

```php
use Spryker\Zed\AvailabilityStorage\Communication\Plugin\Event\Subscriber\AvailabilityStorageEventSubscriber;
use Spryker\Zed\Event\EventDependencyProvider as SprykerEventDependencyProvider;
use Spryker\Zed\UrlStorage\Communication\Plugin\Event\Subscriber\UrlStorageEventSubscriber;

class EventDependencyProvider extends SprykerEventDependencyProvider
{
    ...
    protected function getEventSubscriberCollection()
    {
        $collection = parent::getEventSubscriberCollection();
    
        $collection->add(new AvailabilityStorageEventSubscriber())
            ->add(new UrlStorageEventSubscriber());
    
        return $collection;
    }
}
```
<em>Code example 2.2</em>: Event subscriber registration in a collection with a chain

## 3. Modules configuration
Manifests support changes in a module's configuration files.

Manifests support all scalar types (bool, int, float, string), alongside the compound type array and the special type null.

Manifests do not support the compound types object, or any callable, iterable and special type resources.

Manifest only add the values to configuration files. Manifests DO NOT REMOVE the values from project configuration. 

## 3.1. Basic scalar values as return 
Manifests fully support 4 scalar types:

* bool
* int
* float (floating-point number)
* string

Manifests also support usage of the constants and have built in basic support for constant concatenation.

Code examples:

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
<em>Code example 3.1.1</em>: Method returns string

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
<em>Code example 3.1.2</em>: Method returns string (constant used)

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
<em>Code example 3.1.3</em>: Method returns string with constant concatenation

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
<em>Code example 3.1.4</em>: Method returns boolean

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
<em>Code example 3.1.5</em>: Method returns int

## 3.2. Array as return

### 3.2.1.  Indexed array as return

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
<em>Code example 3.2.1</em>: Method returns indexed array

### 3.2.2. Associative array as return

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
<em>Code example 3.2.2</em>: Method returns associative array

### 3.2.3. Multidimensional array as return

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
<em>Code example 3.2.3</em>: Method returns multidimensional array (with constants)

### 3.2.4. Merging array

Manifests fully support the possibility of merging the results of calling multiple methods.

Inside of array merge function call you can use:

* wrap methods calls
* parent method call
* indexed arrays
* associative arrays
* multidimensional arrays
* variables

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
<em>Code example 3.2.4</em>: Method returns with associative array (with constants, parent method call and array merging)

Multidimensional arrays up to 2 levels are also supported here, but for its usage the wrapped function MUST be used.

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
<em>Code example 3.2.5</em>: Method returns multidimensional array (with constants, wrap methods call and array merging)

### 3.3. Null as return

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
<em>Code example 3.1.4</em>: Method returns null
