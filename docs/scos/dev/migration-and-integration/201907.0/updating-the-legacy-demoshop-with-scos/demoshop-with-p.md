---
title: Making the Legacy Demoshop Compatible with Publish & Synchronize
originalLink: https://documentation.spryker.com/v3/docs/demoshop-with-publish-and-sync
redirect_from:
  - /v3/docs/demoshop-with-publish-and-sync
  - /v3/docs/en/demoshop-with-publish-and-sync
---

By following this document and adjusting all the necessary changes in the Legacy Demoshop, you will be able to set up the infrastructure for Publish &amp; Synchronize. If you need to learn more about any requirements needed and changes made to each particular feature, read their own [installation guides](/docs/scos/dev/migration-and-integration/202001.0/feature-integration-guides/about-integrati).

### 1. Add infrastructure modules
You need to adjust the `composer.json` to get the latest version of the Storage and Search modules. By executing this code you will be able to update the library you need for running Publish &amp; Synchronize:

```yaml
composer update "spryker/*"
composer remove spryker/event-behavior
composer require spryker/availability-storage:"^1.0.0" spryker/category-page search:"^1.0.0" spryker/category-storage:"^1.0.0" spryker/cms-block-category-storage:"^1.0.0" spryker/cms-block-product-storage:"^1.0.0" spryker/cms-block-storage:"^1.0.0"
spryker/cms-page-search:"^1.0.0" spryker/cms-storage:"^1.0.0" spryker/glossary-storage:"^1.0.0"
spryker/navigation-storage:"^1.0.0" spryker/price-product-storage:"^1.0.0"
spryker/product-category-filter-storage:"^1.0.0" spryker/product-category-storage:"^1.0.0"
spryker/product-group-storage:"^1.0.0" spryker/product-image-storage:"^1.0.0"
spryker/product-label-search:"^1.0.0" spryker/product-label-storage:"^1.0.0"
spryker/product-measurement-unit:"^0.2.0" spryker/product-measurement-unit-storage:"^0.2.0"
spryker/product-option-storage:"^1.0.0" spryker/product-page-search:"^1.0.0" spryker/product-relation-storage:"^1.0.0"
spryker/product-review-search:"^1.0.0" spryker/product-review-storage:"^1.0.0"
spryker/product-search-config-storage:"^1.0.0" spryker/product-set-page-search:"^1.0.0"
spryker/product-set-storage:"^1.0.0" spryker/product-storage:"^1.0.0"
spryker/url-storage:"^1.0.0"  spryker/product-quantity-storage:"^0.1.1"
--update-with-dependencies
composer require "spryker/synchronization-behavior":"^1.0.0"
```

## 2. Configure the Queue
Adjust queues before you start running the cron jobs, open `QueueDependencyProvider.php`.

{% info_block errorBox %}
This only works if the Queue module is installed on the current server.
{% endinfo_block %}

<details open>
<summary>src/Pyz/Zed/Queue/QueueDependencyProvider.php</summary>
    
```php
namespace Pyz\Zed\Queue;
 
...
 
class QueueDependencyProvider extends SprykerDependencyProvider
{
protected function getProcessorMessagePlugins(Container $container)
{
			return [
						EventConstants::EVENT_QUEUE => new EventQueueMessageProcessorPlugin(),
			];
}
}
```
    
</br>
</details>

## 3. Activate cron jobs
Add the following jobs to `jobs.php`:

<details open>
<summary>config/Zed/cronjobs/jobs.php</summary>
    
```php
$jobs[] = [
'name' => 'queue-worker-start',
'command' => '$PHP_BIN vendor/bin/console queue:worker:start -vvv',
'schedule' => '* * * * *',
'enable' => true,
'run_on_non_production' => true,
'stores' => $allStores,
];
 
$jobs[] = [
'name' => 'event-trigger-timeout',
'command' => '$PHP_BIN vendor/bin/console event:trigger:timeout -vvv',
'schedule' => '*/5 * * * *',
'enable' => true,
'run_on_non_production' => true,
'stores' => $allStores,
];
```
</br>
</details>

Then restart Jenkins:

```bash
vendor/bin/console setup:jenkins:generate
```

## 4. Adjust Config
We need to enable event behavior in config_default.php

```
// ---------- EventBehavior
		$config[EventBehaviorConstants::EVENT_BEHAVIOR_TRIGGERING_ACTIVE] = true;
```

## 5. Adjust Zed
Add `EventBehaviorServiceProvider` to all the `ServiceProviders` methods in `ApplicationDependencyProvider.php`:

<details open>
<summary>src/Pyz/Zed/Application/ApplicationDependencyProvider.php</summary>
    
```php
namespace Pyz\Zed\Application;
 
use Spryker\Zed\EventBehavior\Communication\Plugin\ServiceProvider\EventBehaviorServiceProvider;
 
class ApplicationDependencyProvider extends SprykerApplicationDependencyProvider
{
			protected function getServiceProviders(Container $container)
						{
						...
						$providers = [
						// Add Auth service providers
						...
						new EventBehaviorServiceProvider(),
			];
...
```
    
</br>
</details>

## 6. Adjust Console
Add `EventBehaviorPostHookPlugin` to the `getConsolePostRunHookPlugins()` method in `ConsoleDependencyProvider.php`:

<details open>
<summary>src/Pyz/Zed/Console/ConsoleDependencyProvider.php</summary>
    
```php
namespace Pyz\Zed\Console;
 
use Spryker\Zed\EventBehavior\Communication\Plugin\Console\EventBehaviorPostHookPlugin;
 
class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
 
		/**
		* @param \Spryker\Zed\Kernel\Container $container
		*
		* @return array
		*/
		public function getConsolePostRunHookPlugins(Container $container)
		{
				return [
						new EventBehaviorPostHookPlugin(),
						];
		}
```
    
</br>
</details>

## 7. Adjust DataImporter
Add `DataImportPublisherPlugin` and `DataImportEventBehaviorPlugin` to `Pyz\Zed\DataImport\DataImportDependencyProvider`:


<details open>
<summary>src/Pyz/Zed/DataImport/DataImportDependencyProvider.php</summary>

```php
use Spryker\Zed\DataImport\Communication\Plugin\DataImportEventBehaviorPlugin;
use Spryker\Zed\DataImport\Communication\Plugin\DataImportPublisherPlugin;
```
    
</br>
</details>

Overwrite the core methods:

<details open>
<summary>Code sample:</summary>
    
```php
/**
* @return array
*/
protected function getDataImportBeforeImportHookPlugins(): array
{
		return [
				new DataImportEventBehaviorPlugin(),
		];
}
 
/**
* @return array
*/
protected function getDataImportAfterImportHookPlugins(): array
{
		return [
				new DataImportEventBehaviorPlugin(),
				new DataImportPublisherPlugin(),
		];
}
```
    
</br>
</details>

You can find all the changes in the following branch:
https://github.com/spryker/demoshop/tree/tech/compatibility-pub-sync

## Using Collector data with P&amp;S features
To be able to use the data structure provided by the collectors from Redis, you need to use your own module in a compatibility mode. You can simply do this by updating the `ModuleStorageConfig::isCollectorCompatibilityMode()` method of your storage module and return true.
