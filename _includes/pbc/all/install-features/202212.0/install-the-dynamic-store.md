To integrate Dynamic store feature  in your project, you need to:


- [1. Installing Dynamic Store](#installing-ds)
- [2. Enabling Dynamic Store](#enabling-ds) 


## 1. Installing Dynamic store
To install it, you need to do the following:

{% info_block warningBox "Note" %}

Spryker Shop Suite contains Dynamci Store out of the box. If your project has the latest Shop Suite master merged, you can proceed directly to step <a href="#enabling-ds">2. Enable Dynamic Store</a>.

{% endinfo_block %}

###  Install feature core

Follow the steps below to install the feature core.

To start feature integration, overview and install the necessary features:

| NAME | VERSION | INTEGRATION GUIDE |
| --- | --- | --- |
| Spryker Core | {{site.version}} | [Dynamic store: Spryker Core feature integration](/docs/scos/dev/feature-integration-guides/{{site.version}}/glue-api/glue-api-spryker-core-feature-integration.html) |
| Spryker Dynamic store | {{site.version}} | [Dynamic store: Spryker Core feature integration](/docs/scos/dev/feature-integration-guides/{{site.version}}/glue-api/glue-api-spryker-core-feature-integration.html) |

<!-- Можливо потірбно додати ще якісь модулі -->


### Install  the required modules using Composer

Minimum version for packages 

| Packege  | Min version       |
| spryker/store-extension | 0.1.0   | 
| spryker/store | 1.17.0 |
| spryker/locale | 4.0.0 |
| spryker/locale-gui | 0.1.0 | 
| spryker/currency | 4.0.0 | 
| spryker/country | 4.0.0 | 

<!-- TODO додати усі модулі  -->

```bash
composer require spryker/store-extension:"^0.1.0"
composer require spryker/store-extension:"^0.1.0"
composer require spryker/store:"^1.17.0" --update-with-dependencies
composer require spryker/locale:"^4.0.0" --update-with-dependencies
composer require spryker/locale-gui:"^0.1.0" --update-with-dependencies
composer require spryker/currency:"^4.0.0" --update-with-dependencies
```

<!-- TODO додати усі модулі  -->


If you can’t install the required version, run the following command to see what else you need to update:

```bash

composer why-not spryker/module-name:1.0.0
```


{% info_block warningBox "Verification" %}

Make sure that the new modules have been installed:

| MODULE | EXPECTED DIRECTORY |
| --- | --- |
| StoreExtension | vendor/spryker/store-extension |
| LocaleGui | vendor/spryker/locale-gui |

<!-- TODO додати усі нвоі модулі  -->

{% endinfo_block %}


### Change configuration 

{% info_block warningBox "Конфігруація store.php" %}

Dynamic store дозволяє відмовитись від конфігурації в файлі `config/Shared/stores.php` де задається конфігурація для store's

{% endinfo_block %}



1. Змінть дефолтний файл конфігурації 
Дозвольте динамічно задавати конфігурації для черг. 

Змініть ваш файл конфігураціїЖ 

```
config/Shared/config_default.php
```

Змініть конфігурацію черг 

```php

<?php 

$config[RabbitMqEnv::RABBITMQ_CONNECTIONS] = [];
foreach ($rabbitConnections as $key => $connection) {
    $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key] = $defaultConnection;
    $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key][RabbitMqEnv::RABBITMQ_CONNECTION_NAME] = $key . '-connection';
    $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key][RabbitMqEnv::RABBITMQ_STORE_NAMES] = [$key];
    foreach ($connection as $constant => $value) {
        $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key][constant(RabbitMqEnv::class . '::' . $constant)] = $value;
    }
    $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key][RabbitMqEnv::RABBITMQ_DEFAULT_CONNECTION] = $key === APPLICATION_STORE;
}
```

На наступний 

```php

<?php 

$config[RabbitMqEnv::RABBITMQ_CONNECTIONS] = [];
$connectionKeys = array_keys($rabbitConnections);
$defaultKey = reset($connectionKeys);
if (getenv('SPRYKER_CURRENT_REGION')) {
    $defaultKey = getenv('SPRYKER_CURRENT_REGION');
}
if (getenv('APPLICATION_STORE') && (bool)getenv('SPRYKER_DYNAMIC_STORE_MODE') === false) {
    $defaultKey = getenv('APPLICATION_STORE');
}
foreach ($rabbitConnections as $key => $connection) {
    $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key] = $defaultConnection;
    $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key][RabbitMqEnv::RABBITMQ_CONNECTION_NAME] = $key . '-connection';
    $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key][RabbitMqEnv::RABBITMQ_STORE_NAMES] = [$key];
    foreach ($connection as $constant => $value) {
        $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key][constant(RabbitMqEnv::class . '::' . $constant)] = $value;
    }
    $config[RabbitMqEnv::RABBITMQ_CONNECTIONS][$key][RabbitMqEnv::RABBITMQ_DEFAULT_CONNECTION] = $key === $defaultKey;
}
```

Те ж саме потрібно зробити для CI-конфігурації 

```php
$config[RabbitMqEnv::RABBITMQ_CONNECTIONS] = array_map(static function ($storeName) {
    return [
        RabbitMqEnv::RABBITMQ_CONNECTION_NAME => $storeName . '-connection',
        RabbitMqEnv::RABBITMQ_HOST => 'localhost',
        RabbitMqEnv::RABBITMQ_PORT => '5672',
        RabbitMqEnv::RABBITMQ_PASSWORD => 'guest',
        RabbitMqEnv::RABBITMQ_USERNAME => 'guest',
        RabbitMqEnv::RABBITMQ_VIRTUAL_HOST => '/',
        RabbitMqEnv::RABBITMQ_STORE_NAMES => [$storeName],
        RabbitMqEnv::RABBITMQ_DEFAULT_CONNECTION => $storeName === APPLICATION_STORE,
    ];
}, Store::getInstance()->getAllowedStores());

```

```php
$currentRegion = getenv('SPRYKER_CURRENT_REGION') ?: null;
$dynamicStoreEnabled = (bool)getenv('SPRYKER_DYNAMIC_STORE_MODE');
$config[RabbitMqEnv::RABBITMQ_CONNECTIONS] = array_map(static function ($storeName) use ($currentRegion, $dynamicStoreEnabled) {
    return [
        RabbitMqEnv::RABBITMQ_CONNECTION_NAME => $storeName . '-connection',
        RabbitMqEnv::RABBITMQ_HOST => 'localhost',
        RabbitMqEnv::RABBITMQ_PORT => '5672',
        RabbitMqEnv::RABBITMQ_PASSWORD => 'guest',
        RabbitMqEnv::RABBITMQ_USERNAME => 'guest',
        RabbitMqEnv::RABBITMQ_VIRTUAL_HOST => '/',
        RabbitMqEnv::RABBITMQ_STORE_NAMES => $dynamicStoreEnabled ? [] : [$storeName],
        RabbitMqEnv::RABBITMQ_DEFAULT_CONNECTION => $dynamicStoreEnabled ? $storeName === $currentRegion : $storeName === APPLICATION_STORE,
    ];
}, $dynamicStoreEnabled ? [$currentRegion] : Store::getInstance()->getAllowedStores());
```

2. Змініть конфігурацію jenkins джоб 

видаліть змінну `$allStores` а також її використння в конфігуруванні джоб через парамтер `stores`. 

```
config/Zed/cronjobs/jenkins.php
```
```php
$stores = require(APPLICATION_ROOT_DIR . '/config/Shared/stores.php');

$allStores = array_keys($stores);

.
.
.

$jobs[] = [
    'name' => 'job-name',
    'command' => '$PHP_BIN vendor/bin/console product:check-validity',
    'schedule' => '0 6 * * *',
    'enable' => true,
];
```

Для дожби `queue-worker-start`, `apply-price-product-schedule` додайте параметр `storeAware` 

```php
$jobs[] = [
    'name' => 'queue-worker-start',
    'command' => '$PHP_BIN vendor/bin/console queue:worker:start',
    'schedule' => '* * * * *',
    'enable' => true,
    'storeAware' => true,
];

$jobs[] = [
    'name' => 'apply-price-product-schedule',
    'command' => '$PHP_BIN vendor/bin/console price-product-schedule:apply',
    'schedule' => '0 6 * * *',
    'enable' => true,
    'storeAware' => true,
];
```

Додайте в кінець конфігурації джоб в конфгурацію поточного регіону 

```php

if (getenv('SPRYKER_CURRENT_REGION')) {
    foreach ($jobs as $job) {
        $job['region'] = getenv('SPRYKER_CURRENT_REGION');
    }
}
```


3. Зміініть 

```
src/Pyz/Client/RabbitMq/RabbitMqConfig.php
```

```php 
<?php 

namespace Pyz\Client\RabbitMq;

use Spryker\Client\RabbitMq\RabbitMqConfig as SprykerRabbitMqConfig;
use Spryker\Shared\StoreStorage\StoreStorageConfig;


class RabbitMqConfig extends SprykerRabbitMqConfig
{
    .
    .
    .
    /**
     * @return array<array<string>>
     */
    public function getQueuePools(): array
    {
        return [
            'synchronizationPool' => [
                'EU-connection',
            ],
        ];
    }

    /**
     * @return string|null
     */
    public function getDefaultLocaleCode(): ?string
    {
        return 'en_US';
    }
    .
    .
    .

    /**
     * @return array<mixed>
     */
    protected function getSynchronizationQueueConfiguration(): array
    {
        return [
            .
            .
            StoreStorageConfig::STORE_SYNC_STORAGE_QUEUE,
            .
            .
        ];
    } 
}    

```

4. 

```
src/Pyz/Client/Store/StoreDependencyProvider.php
```
```php
<?php

namespace Pyz\Client\Store;

use Spryker\Client\Store\StoreDependencyProvider as SprykerStoreDependencyProvider;
use Spryker\Client\StoreStorage\Plugin\Store\StoreStorageStoreExpanderPlugin;

class StoreDependencyProvider extends SprykerStoreDependencyProvider
{
    /**
     * @return array<\Spryker\Client\StoreExtension\Dependency\Plugin\StoreExpanderPluginInterface>
     */
    protected function getStoreExpanderPlugins(): array
    {
        return [
            new StoreStorageStoreExpanderPlugin(),
        ];
    }
}
```


5. Adjust file 

```
src/Pyz/Client/ZedRequest/ZedRequestDependencyProvider.php
```

```php
<?php

namespace Pyz\Client\ZedRequest;

use Spryker\Client\Currency\Plugin\ZedRequestMetaDataProviderPlugin;
use Spryker\Client\Locale\Plugin\ZedRequest\LocaleMetaDataProviderPlugin;
use Spryker\Client\Store\Plugin\ZedRequest\StoreMetaDataProviderPlugin;
use Spryker\Client\ZedRequest\ZedRequestDependencyProvider as SprykerZedRequestDependencyProvider;

class ZedRequestDependencyProvider extends SprykerZedRequestDependencyProvider
{

    .
    .
    .

    /**
     * @return array<\Spryker\Client\ZedRequest\Dependency\Plugin\MetaDataProviderPluginInterface>
     */
    protected function getMetaDataProviderPlugins(): array
    {
        return [
            .
            .
            'store' => new StoreMetaDataProviderPlugin(),
            'locale' => new LocaleMetaDataProviderPlugin(),            
        ];
    }
}

```


6. Adjust 

```
src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php
```

```php
<?php 

namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\GlueApplication\Plugin\Rest\SetStoreCurrentLocaleBeforeActionPlugin;
use Spryker\Glue\Locale\Plugin\Application\LocaleApplicationPlugin;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * {@inheritDoc}
     *
     * @deprecated Will be removed without replacement.
     *
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ControllerBeforeActionPluginInterface>
     */
    protected function getControllerBeforeActionPlugins(): array
    {
        return [
            new SetStoreCurrentLocaleBeforeActionPlugin(), // <- please remove depricated plugin 
            .
            .
            .
            new LocaleApplicationPlugin(),
        ];
    }
}
```

6. 

```
src/Pyz/Yves/Router/RouterConfig.php
```

```php
<?php

namespace Pyz\Yves\Router;

use Spryker\Client\Kernel\Container;
use Spryker\Yves\Router\RouterConfig as SprykerRouterConfig;

/**
 * @method \Spryker\Shared\Router\RouterConfig getSharedConfig()
 */
class RouterConfig extends SprykerRouterConfig
{
    /**
     * @see \Spryker\Yves\Router\Plugin\RouterEnhancer\LanguagePrefixRouterEnhancerPlugin
     *
     * @return array<string>
     */
    public function getAllowedLanguages(): array
    {
        return (new Container())->getLocator()->locale()->client()->getAllowedLanguages();
    }
}
```

7. 

```
src/Pyz/Yves/ShopApplication/ShopApplicationDependencyProvider.php
```

```php
<?php 
namespace Pyz\Yves\ShopApplication;

use SprykerShop\Yves\ShopApplication\ShopApplicationDependencyProvider as SprykerShopApplicationDependencyProvider;
use SprykerShop\Yves\StoreWidget\Widget\StoreSwitcherWidget;


class ShopApplicationDependencyProvider extends SprykerShopApplicationDependencyProvider
{
    protected function getGlobalWidgets(): array
    {
        return [
            .
            .
            .
            StoreSwitcherWidget::class,
        ];
    }
}
```

8. 

```
src/Pyz/Zed/Application/ApplicationDependencyProvider.php
```

```php 
<?php

namespace Pyz\Zed\Application;

use Spryker\Zed\Application\ApplicationDependencyProvider as SprykerApplicationDependencyProvider;
use Spryker\Zed\Currency\Communication\Plugin\Application\CurrencyBackendGatewayApplicationPlugin;
use Spryker\Zed\Locale\Communication\Plugin\Application\LocaleBackendGatewayApplicationPlugin;
use Spryker\Zed\Store\Communication\Plugin\Application\StoreBackendGatewayApplicationPlugin;
use Spryker\Zed\ZedRequest\Communication\Plugin\Application\RequestBackendGatewayApplicationPlugin;


class ApplicationDependencyProvider extends SprykerApplicationDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface>
     */
    protected function getBackendGatewayApplicationPlugins(): array
    {
        return [
            .
            .
            .
            new RequestBackendGatewayApplicationPlugin(),
            new StoreBackendGatewayApplicationPlugin(),
            new LocaleBackendGatewayApplicationPlugin(),
            new CurrencyBackendGatewayApplicationPlugin(),      
            .
            .
            .
        ];
    }
}
```


9. Змініть шаблони email-ів

Замініть параметер store name із значенням  `null` на  `mail.storeName` в усіх шаблонах

На прикладі `src/Pyz/Zed/AvailabilityNotification/Presentation/Mail/notification.html.twig` 
```html
{% raw %}{{ renderCmsBlockAsTwig(
    'availability-notification--html',
    null,
    mail.locale.localeName,
    {mail: mail}
) }}{% endraw %}
```
Змініть на 
```html
{% raw %}{{ renderCmsBlockAsTwig(
    'availability-notification--html',
    mail.storeName,
    mail.locale.localeName,
    {mail: mail}
) }}{% endraw %}
```

Список можливих шаблонів: 

- `src/Pyz/Zed/AvailabilityNotification/Presentation/Mail/notification.html.twig`
- `src/Pyz/Zed/AvailabilityNotification/Presentation/Mail/notification.text.twig` 
- `src/Pyz/Zed/AvailabilityNotification/Presentation/Mail/subscribed.html.twig` 
- `src/Pyz/Zed/AvailabilityNotification/Presentation/Mail/subscribed.text.twig` 
- `src/Pyz/Zed/AvailabilityNotification/Presentation/Mail/unsubscribed.html.twig` 
- `src/Pyz/Zed/AvailabilityNotification/Presentation/Mail/unsubscribed.html.twig` 
- `src/Pyz/Zed/CompanyMailConnector/Presentation/Mail/company_status.html.twig` 
- `src/Pyz/Zed/CompanyMailConnector/Presentation/Mail/company_status.text.twig`
- `src/Pyz/Zed/CompanyUserInvitation/Presentation/Mail/invitation.html.twig` 
- `src/Pyz/Zed/CompanyUserInvitation/Presentation/Mail/invitation.text.twig`
- `src/Pyz/Zed/Customer/Presentation/Mail/customer_registration.html.twig` 
- `src/Pyz/Zed/Customer/Presentation/Mail/customer_registration.text.twig` 
- `src/Pyz/Zed/Customer/Presentation/Mail/customer_registration_token.html.twig` 
- `src/Pyz/Zed/Customer/Presentation/Mail/customer_registration_token.text.twig`
- `src/Pyz/Zed/Customer/Presentation/Mail/customer_reset_password_confirmation.html.twig`
- `src/Pyz/Zed/Customer/Presentation/Mail/customer_reset_password_confirmation.text.twig` 
- `src/Pyz/Zed/Customer/Presentation/Mail/customer_restore_password.html.twig` 
- `src/Pyz/Zed/Customer/Presentation/Mail/customer_restore_password.text.twig` 
- `src/Pyz/Zed/GiftCardMailConnector/Presentation/Mail/gift_card_delivery.html.twig` 
- `src/Pyz/Zed/GiftCardMailConnector/Presentation/Mail/gift_card_delivery.text.twig` 
- `src/Pyz/Zed/GiftCardMailConnector/Presentation/Mail/gift_card_usage.html.twig` 
- `src/Pyz/Zed/GiftCardMailConnector/Presentation/Mail/gift_card_usage.text.twig` 
- `src/Pyz/Zed/Newsletter/Presentation/Mail/subscribed.html.twig` 
- `src/Pyz/Zed/Newsletter/Presentation/Mail/subscribed.text.twig`
- `src/Pyz/Zed/Newsletter/Presentation/Mail/unsubscribed.html.twig` 
- `src/Pyz/Zed/Newsletter/Presentation/Mail/unsubscribed.text.twig` 
- `src/Pyz/Zed/Oms/Presentation/Mail/order_confirmation.html.twig`
- `src/Pyz/Zed/Oms/Presentation/Mail/order_confirmation.text.twig`
- `src/Pyz/Zed/Oms/Presentation/Mail/order_shipped.html.twig`
- `src/Pyz/Zed/Oms/Presentation/Mail/order_shipped.text.twig` 

якщо у вас використовуються Merchant Protal змініть наступні twig-шаблони:
- `src/Pyz/Zed/MerchantUserPasswordResetMail/Presentation/Mail/merchant_restore_password.html.twig`
- `src/Pyz/Zed/MerchantUserPasswordResetMail/Presentation/Mail/merchant_restore_password.text.twig` 

10.  

```
src/Pyz/Zed/Customer/CustomerConfig.php
```

```php
<?php

namespace Pyz\Zed\Customer;

use Spryker\Zed\Customer\CustomerConfig as SprykerCustomerConfig;

class CustomerConfig extends SprykerCustomerConfig
{
    .
    .
    .
    /**
     * {@inheritDoc}
     *
     * @return string|null
     */
    public function getCustomerSequenceNumberPrefix(): ?string
    {
        return 'customer';
    }
}

```

11. 

```
src/Pyz/Zed/Publisher/PublisherDependencyProvider.php
```

```php
<?php

namespace Pyz\Zed\Publisher;

use Spryker\Zed\Publisher\PublisherDependencyProvider as SprykerPublisherDependencyProvider;
use Spryker\Zed\StoreStorage\Communication\Plugin\Publisher\CountryStore\CountryStoreWritePublisherPlugin;
use Spryker\Zed\StoreStorage\Communication\Plugin\Publisher\CurrencyStore\CurrencyStoreWritePublisherPlugin;
use Spryker\Zed\StoreStorage\Communication\Plugin\Publisher\LocaleStore\LocaleStoreWritePublisherPlugin;
use Spryker\Zed\StoreStorage\Communication\Plugin\Publisher\Store\StoreSynchronizationTriggeringPublisherPlugin;
use Spryker\Zed\StoreStorage\Communication\Plugin\Publisher\Store\StoreWritePublisherPlugin;
use Spryker\Zed\StoreStorage\Communication\Plugin\Publisher\StorePublisherTriggerPlugin;

class PublisherDependencyProvider extends SprykerPublisherDependencyProvider
{
    protected function getPublisherPlugins(): array
    {
        return array_merge(
            .
            .
            .
            $this->getMerchantProductOfferStoragePlugins(),
            $this->getStoreStoragePlugins(),
            .
        );
    }
    .
    .
    protected function getPublisherTriggerPlugins(): array
    {
        return [
            .
            .
            .
            new StorePublisherTriggerPlugin(),
        ];
    }
}
```

12. 

```
src/Pyz/Zed/Queue/QueueDependencyProvider.php
```

```php
<?php

namespace Pyz\Zed\Queue;

use Spryker\Zed\Queue\QueueDependencyProvider as SprykerDependencyProvider;

class QueueDependencyProvider extends SprykerDependencyProvider
{
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Zed\Queue\Dependency\Plugin\QueueMessageProcessorPluginInterface>
     */
    protected function getProcessorMessagePlugins(Container $container): array
    {
        return [
            .
            .
            .
            StoreStorageConfig::STORE_SYNC_STORAGE_QUEUE => new SynchronizationStorageQueueMessageProcessorPlugin(),
            .
        ];
    }
}
```

13. 

```
src/Pyz/Zed/Synchronization/SynchronizationDependencyProvider.php
```

```php
<?php

namespace Pyz\Zed\Synchronization;

use Spryker\Zed\Synchronization\SynchronizationDependencyProvider as SprykerSynchronizationDependencyProvider;
use Spryker\Zed\StoreStorage\Communication\Plugin\Synchronization\StoreSynchronizationDataPlugin;

class SynchronizationDependencyProvider extends SprykerSynchronizationDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\SynchronizationExtension\Dependency\Plugin\SynchronizationDataPluginInterface>
     */
    protected function getSynchronizationDataPlugins(): array
    {
        return [
            .
            .
            .
            new StoreSynchronizationDataPlugin(),               
        ]
    }
}
```

14. Змініть файл і використовуйте регіони замість store names

```
src/SprykerConfig/CodeBucketConfig.php
```

```php
<?php

namespace SprykerConfig;

use Spryker\Shared\Kernel\CodeBucket\Config\AbstractCodeBucketConfig;

class CodeBucketConfig extends AbstractCodeBucketConfig
{
    /**
     * @return array<string>
     */
    public function getCodeBuckets(): array
    {
        return [
            'EU',
            'US',
        ];
    }

    /**
     * @deprecated This method implementation will be removed when environment configs are cleaned up.
     *
     * @return string
     */
    public function getDefaultCodeBucket(): string
    {
        $codeBuckets = $this->getCodeBuckets();

        return defined('APPLICATION_REGION') ? APPLICATION_REGION : reset($codeBuckets);
    }
}

```


15. Створіть StoreDependencyProvider

```
src/Pyz/Zed/Store/StoreDependencyProvider.php
```

```php
<?php

namespace Pyz\Zed\Store;

use Spryker\Zed\Country\Communication\Plugin\Store\CountryStoreCollectionExpanderPlugin;
use Spryker\Zed\Country\Communication\Plugin\Store\CountryStorePostCreatePlugin;
use Spryker\Zed\Country\Communication\Plugin\Store\CountryStorePostUpdatePlugin;
use Spryker\Zed\Currency\Communication\Plugin\Store\CurrencyStoreCollectionExpanderPlugin;
use Spryker\Zed\Currency\Communication\Plugin\Store\CurrencyStorePostCreatePlugin;
use Spryker\Zed\Currency\Communication\Plugin\Store\CurrencyStorePostUpdatePlugin;
use Spryker\Zed\Currency\Communication\Plugin\Store\DefaultCurrencyStorePreCreateValidationPlugin;
use Spryker\Zed\Currency\Communication\Plugin\Store\DefaultCurrencyStorePreUpdateValidationPlugin;
use Spryker\Zed\Locale\Communication\Plugin\Store\DefaultLocaleStorePostCreatePlugin;
use Spryker\Zed\Locale\Communication\Plugin\Store\DefaultLocaleStorePostUpdatePlugin;
use Spryker\Zed\Locale\Communication\Plugin\Store\DefaultLocaleStorePreCreateValidationPlugin;
use Spryker\Zed\Locale\Communication\Plugin\Store\DefaultLocaleStorePreUpdateValidationPlugin;
use Spryker\Zed\Locale\Communication\Plugin\Store\LocaleStoreCollectionExpanderPlugin;
use Spryker\Zed\Locale\Communication\Plugin\Store\LocaleStorePostCreatePlugin;
use Spryker\Zed\Locale\Communication\Plugin\Store\LocaleStorePostUpdatePlugin;
use Spryker\Zed\Search\Communication\Plugin\Store\SearchSetupSourcesStorePostCreatePlugin;
use Spryker\Zed\Store\StoreDependencyProvider as SprykerStoreDependencyProvider;

class StoreDependencyProvider extends SprykerStoreDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\StoreExtension\Dependency\Plugin\StorePreCreateValidationPluginInterface>
     */
    protected function getStorePreCreateValidationPlugins(): array
    {
        return [
            new DefaultLocaleStorePreCreateValidationPlugin(),
            new DefaultCurrencyStorePreCreateValidationPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\StoreExtension\Dependency\Plugin\StorePreUpdateValidationPluginInterface>
     */
    protected function getStorePreUpdateValidationPlugins(): array
    {
        return [
            new DefaultLocaleStorePreUpdateValidationPlugin(),
            new DefaultCurrencyStorePreUpdateValidationPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\StoreExtension\Dependency\Plugin\StorePostCreatePluginInterface>
     */
    protected function getStorePostCreatePlugins(): array
    {
        return [
            new CountryStorePostCreatePlugin(),
            new CurrencyStorePostCreatePlugin(),
            new DefaultLocaleStorePostCreatePlugin(),
            new LocaleStorePostCreatePlugin(),
            new SearchSetupSourcesStorePostCreatePlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\StoreExtension\Dependency\Plugin\StorePostUpdatePluginInterface>
     */
    protected function getStorePostUpdatePlugins(): array
    {
        return [
            new CountryStorePostUpdatePlugin(),
            new CurrencyStorePostUpdatePlugin(),
            new DefaultLocaleStorePostUpdatePlugin(),
            new LocaleStorePostUpdatePlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\StoreExtension\Dependency\Plugin\StoreCollectionExpanderPluginInterface>
     */
    protected function getStoreCollectionExpanderPlugins(): array
    {
        return [
            new CountryStoreCollectionExpanderPlugin(),
            new CurrencyStoreCollectionExpanderPlugin(),
            new LocaleStoreCollectionExpanderPlugin(),
        ];
    }
}

```

```
src/Pyz/Zed/StoreGui/StoreGuiDependencyProvider.php
```

```php
<?php

namespace Pyz\Zed\StoreGui;

use Spryker\Zed\CountryGui\Communication\Plugin\StoreGui\AssignedCountriesStoreViewExpanderPlugin;
use Spryker\Zed\CountryGui\Communication\Plugin\StoreGui\CountryStoreFormExpanderPlugin;
use Spryker\Zed\CountryGui\Communication\Plugin\StoreGui\CountryStoreFormTabExpanderPlugin;
use Spryker\Zed\CountryGui\Communication\Plugin\StoreGui\CountryStoreFormViewExpanderPlugin;
use Spryker\Zed\CountryGui\Communication\Plugin\StoreGui\CountryStoreTableExpanderPlugin;
use Spryker\Zed\CurrencyGui\Communication\Plugin\StoreGui\AssignedCurrenciesStoreViewExpanderPlugin;
use Spryker\Zed\CurrencyGui\Communication\Plugin\StoreGui\CurrencyStoreFormExpanderPlugin;
use Spryker\Zed\CurrencyGui\Communication\Plugin\StoreGui\CurrencyStoreFormTabExpanderPlugin;
use Spryker\Zed\CurrencyGui\Communication\Plugin\StoreGui\CurrencyStoreFormViewExpanderPlugin;
use Spryker\Zed\CurrencyGui\Communication\Plugin\StoreGui\CurrencyStoreTableExpanderPlugin;
use Spryker\Zed\LocaleGui\Communication\Plugin\StoreGui\AssignedLocalesStoreViewExpanderPlugin;
use Spryker\Zed\LocaleGui\Communication\Plugin\StoreGui\DefaultLocaleStoreViewExpanderPlugin;
use Spryker\Zed\LocaleGui\Communication\Plugin\StoreGui\LocaleStoreFormExpanderPlugin;
use Spryker\Zed\LocaleGui\Communication\Plugin\StoreGui\LocaleStoreFormTabExpanderPlugin;
use Spryker\Zed\LocaleGui\Communication\Plugin\StoreGui\LocaleStoreFormViewExpanderPlugin;
use Spryker\Zed\LocaleGui\Communication\Plugin\StoreGui\LocaleStoreTableExpanderPlugin;
use Spryker\Zed\StoreGui\StoreGuiDependencyProvider as SprykerStoreGuiDependencyProvider;

class StoreGuiDependencyProvider extends SprykerStoreGuiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\StoreGuiExtension\Dependency\Plugin\StoreFormExpanderPluginInterface>
     */
    protected function getStoreFormExpanderPlugins(): array
    {
        return [
            new LocaleStoreFormExpanderPlugin(),
            new CurrencyStoreFormExpanderPlugin(),
            new CountryStoreFormExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\StoreGuiExtension\Dependency\Plugin\StoreFormViewExpanderPluginInterface>
     */
    protected function getStoreFormViewExpanderPlugins(): array
    {
        return [
            new LocaleStoreFormViewExpanderPlugin(),
            new CurrencyStoreFormViewExpanderPlugin(),
            new CountryStoreFormViewExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\StoreGuiExtension\Dependency\Plugin\StoreFormTabExpanderPluginInterface>
     */
    protected function getStoreFormTabsExpanderPlugins(): array
    {
        return [
            new LocaleStoreFormTabExpanderPlugin(),
            new CurrencyStoreFormTabExpanderPlugin(),
            new CountryStoreFormTabExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\StoreGuiExtension\Dependency\Plugin\StoreViewExpanderPluginInterface>
     */
    protected function getStoreViewExpanderPlugins(): array
    {
        return [
            new DefaultLocaleStoreViewExpanderPlugin(),
            new AssignedLocalesStoreViewExpanderPlugin(),
            new AssignedCurrenciesStoreViewExpanderPlugin(),
            new AssignedCountriesStoreViewExpanderPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\StoreGuiExtension\Dependency\Plugin\StoreTableExpanderPluginInterface>
     */
    protected function getStoreTableExpanderPlugins(): array
    {
        return [
            new LocaleStoreTableExpanderPlugin(),
            new CurrencyStoreTableExpanderPlugin(),
            new CountryStoreTableExpanderPlugin(),
        ];
    }
}
```

```
src/Pyz/Zed/StoreStorage/StoreStorageConfig.php
```

```php
<?php

namespace Pyz\Zed\StoreStorage;

use Pyz\Zed\Synchronization\SynchronizationConfig;
use Spryker\Shared\CompanyUserStorage\CompanyUserStorageConfig;
use Spryker\Shared\CustomerAccessStorage\CustomerAccessStorageConstants;
use Spryker\Shared\GlossaryStorage\GlossaryStorageConfig;
use Spryker\Shared\MerchantSearch\MerchantSearchConfig;
use Spryker\Shared\MerchantStorage\MerchantStorageConfig;
use Spryker\Shared\NavigationStorage\NavigationStorageConstants;
use Spryker\Shared\ProductMeasurementUnitStorage\ProductMeasurementUnitStorageConfig;
use Spryker\Shared\ProductPackagingUnitStorage\ProductPackagingUnitStorageConfig;
use Spryker\Shared\ProductReviewSearch\ProductReviewSearchConfig;
use Spryker\Shared\SalesReturnSearch\SalesReturnSearchConfig;
use Spryker\Zed\StoreStorage\StoreStorageConfig as SprykerStoreStorageConfig;

class StoreStorageConfig extends SprykerStoreStorageConfig
{
    /**
     * @return string|null
     */
    public function getStoreSynchronizationPoolName(): ?string
    {
        return SynchronizationConfig::DEFAULT_SYNCHRONIZATION_POOL_NAME;
    }

    /**
     * @return array<string>
     */
    public function getStoreCreationResourcesToReSync(): array
    {
        return [
            GlossaryStorageConfig::TRANSLATION_RESOURCE_NAME,
            ProductReviewSearchConfig::PRODUCT_REVIEW_RESOURCE_NAME,
            NavigationStorageConstants::RESOURCE_NAME,
            ProductMeasurementUnitStorageConfig::PRODUCT_MEASUREMENT_UNIT_RESOURCE_NAME,
            ProductPackagingUnitStorageConfig::PRODUCT_PACKAGING_UNIT_RESOURCE_NAME,
            CustomerAccessStorageConstants::CUSTOMER_ACCESS_RESOURCE_NAME,
            CompanyUserStorageConfig::COMPANY_USER_RESOURCE_NAME,
            MerchantStorageConfig::MERCHANT_RESOURCE_NAME,
            SalesReturnSearchConfig::RETURN_REASON_RESOURCE_NAME,
            MerchantSearchConfig::MERCHANT_RESOURCE_NAME,
        ];
    }
}
```



10. Adjust data import 

<!-- Додати усе про датаімпорт  -->

## 2. Enabling Dynamic store

## Delete dynamic store 

Ви можете знайти інформацію по видаленю магазина на цій сторінці 
