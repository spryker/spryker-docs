---
title: Plugins registration
description: Plugins registration extension scenario
last_updated: Mar 13, 2023
template: concept-topic-template
related:
  - title: Keeping a project upgradable
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/keeping-a-project-upgradable.html
  - title: Event subscribers registration
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/supported-extension-scenarios/event-subscribers-registration.html
  - title: Modules configuration
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/supported-extension-scenarios/modules-configuration.html
redirect_from:
    - /docs/scos/dev/guidelines/keeping-a-project-upgradable/supported-extension-scenarios/plugins-registration.html
    - /docs/scos/dev/guidelines/keeping-a-project-upgradable/extension-scenarios/plugins-registration.html
---

Manifests support plugins registration in the dependency provider and plugins registration in the configuration files. There are multiple ways how plugins can be registered inside of the project.

## Plugins registration in the configuration file

The following is an example of how to have single plugin registration in the global configuration file (e.g. config_default.php):

```php
<?php

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

Plugins can also be registered in the dependency provider file.

### Single plugin registration

Inside of a dependency provider call, you can also register the plugin directly in the method or through another wrap method, with and without constructor arguments. Manifests also support constant concatenation inside of the constructor arguments.

The following is an example of how to have single plugin registration with arguments in constructor:

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

The following is an example of how to have single plugin registration with the wrap method call:

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

### Plugins registration in an indexed array

Manifests fully support multiple plugins registration in an indexed array. Manifests also support additional conditions for plugin registration and restrictions on the order of the plugins.

Restrictions on the order of the plugins can be done with special annotation keys `before` and `after`.

If the plugin doesn’t contain any of these keys, it is added to the end of the plugin stack.

If the plugin contains the `after` key and defined plugins in the `after` parameter don’t exist on the project side, the plugin is added to the end of the plugin stack.

If the plugin contains the `before` key and defined plugins in the `before` parameter don’t exist on the project side, the plugin is added as the first plugin in plugin stack.

The following is an example of how to have multiple plugins registration in an indexed array:

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

The following is an example of how to have multiple plugins registration in an indexed array with restrictions on the order of the plugins:

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

The following is an example of how to have multiple plugins registration in an indexed array (BC reasons only):

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

The following is an example of how to have multiple console commands registration with a constant concatenated constructor argument:

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

### Plugins in an associative array

Manifests fully support multiple plugins registration in an associative array. As a key, you can use:

* string
* constant
* function call with arguments

The following is an example of how to have multiple plugins registration in an indexed array:

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

The following is an example of how to have multiple plugins registration in an indexed array:

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

### Plugins in multidimensional array

Manifests have limited support of a multidimensional array. Only arrays that are added through the key are supported. Also, only multidimensional arrays with up to 2 levels of depth are supported. It means that structures like the following are *not supported*:

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

The following is an example of how to have multiple plugins registration in a multidimensional array:

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

The following is an example of how to have multiple plugins registration in a multidimensional array:

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

### Container extension

Manifests fully support the possibility of adding plugins through container extension. Order of the plugins is *not supported* inside of the container extension. It means that before and after are *not supported* in this case.

The following is an example of how to have multiple plugins registration through container extension:

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

### Merging plugins

Manifests fully support the possibility of merging the results of calling multiple plugins registration methods.

Inside of array merge function call you can use:

* wrap methods calls
* parent method call
* indexed arrays
* associative arrays
* multidimensional arrays
* variables

Multidimensional associative arrays are supported inside of the `array_merge()` up to two levels, but to use them, you must use the wrapped functions.

The following is an example of how to have multiple plugins registration with the merging plugins method call:

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

## Special situations

* If the target dependency provider class doesn’t exist in the project, it is created and all required methods are created automatically as well.

* If the target dependency provider class exists in the project without the target method, but such method exists in the parent class, the method is created and the changes are applied.

* If the target dependency provider class exists in the project without the target method, and such method also doesn’t exist in the parent class, the method is NOT created and the changes is NOT applied.

* If the target method inside of the dependency provider class was modified on the project level and for example array was extracted into the separated method, the upgrader won’t find the array, and the changes won’t be applied.
