---
title: Upgrade the Monitoring module
description: Use the guide to migrate to a newer version of the Monitoring module.
last_updated: Aug 6, 2026
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-monitoring
originalArticleId: c4cc472c-756d-4d73-b086-ebf1c92edadf
redirect_from:
  - /docs/scos/dev/module-migration-guides/201811.0/migration-guide-monitoring.html
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-monitoring.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-monitoring.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-monitoring.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-monitoring.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-monitoring.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-monitoring.html
  - /docs/scos/dev/module-migration-guides/migration-guide-monitoring.html
---

## Upgrading from version 1.* to version 2.*

For BC reasons, the initial version of this module had dependencies to the `spryker/new-relic` and `spryker/new-relic-api` modules.

In this version, we have removed this hard dependency. If you still want to use New Relic as a monitoring service you can use the `spryker-eco/new-relic` module:

```bash
composer require spryker-eco/new-relic
```

This will download the New Relic monitoring extension.

To enable the New Relic monitoring extension, add it to `MonitoringDependencyProvider` in your project:

```php
<?php
namespace Pyz\Service\Monitoring;

use Spryker\Service\Monitoring\MonitoringDependencyProvider as SprykerMonitoringDependencyProvider;
use SprykerEco\Service\NewRelic\Plugin\NewRelicMonitoringExtensionPlugin;

class MonitoringDependencyProvider extends SprykerMonitoringDependencyProvider
{
	/**
	* @return \Spryker\Service\MonitoringExtension\Dependency\Plugin\MonitoringExtensionPluginInterface[]
	*/
	protected function getMonitoringExtensions(): array
	{
		return [
			new NewRelicMonitoringExtensionPlugin(),
		];
	}
}
```

Meanwhile, if you want to log a console command, modify the `src/Pyz/Zed/Console/ConsoleDependencyProvider.php` file:

```php
protected function getConsoleCommands(Container $container)
{
	$commands = [
		...
		new \SprykerEco\Zed\NewRelic\Communication\Console\RecordDeploymentConsole(),
	];
}

/**
* @param \Spryker\Zed\Kernel\Container $container
*
* @return \Symfony\Component\EventDispatcher\EventSubscriberInterface[]
*/
public function getEventSubscriber(Container $container)
{
	$eventSubscriber = parent::getEventSubscriber($container);

	if (extension_loaded('newrelic')) {
		$eventSubscriber[] = new \Spryker\Zed\Monitoring\Communication\Plugin\MonitoringConsolePlugin();
	}

	return $eventSubscriber;
}
```

If you want to record deployments, add the following code to your local configuration:

```php
$config[\SprykerEco\Shared\NewRelic\NewRelicEnv::NEW_RELIC_API_KEY] = 'YOUR_API_KEY';
$config[\SprykerEco\Shared\NewRelic\NewRelicEnv::NEW_RELIC_DEPLOYMENT_API_URL] = 'https://api.newrelic.com/v2/applications/%s/deployments.json';
$config[\SprykerEco\Shared\NewRelic\NewRelicEnv::NEW_RELIC_APPLICATION_ID_ARRAY] = [
	'store1'    => '12345',
	'store2'    => '12346',
	...
];
```

In order to find ApplicationIDs used in `NEW_RELIC_APPLICATION_ID_ARRAY`,  refer to [Get app and other IDs in New Relic](https://docs.newrelic.com/docs/apis/rest-api-v2/get-started/get-app-other-ids-new-relic-one/#apm).

To get `YOUR_API_KEY` key, refer to [New Relic API keys](https://docs.newrelic.com/docs/apis/intro-apis/new-relic-api-keys/#user-api-key).
