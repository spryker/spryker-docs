---
title: Migration guide - Monitoring
description: Use the guide to migrate to a newer version of the Monitoring module.
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/mg-monitoring
originalArticleId: c4cc472c-756d-4d73-b086-ebf1c92edadf
redirect_from:
  - /2021080/docs/mg-monitoring
  - /2021080/docs/en/mg-monitoring
  - /docs/mg-monitoring
  - /docs/en/mg-monitoring
  - /v1/docs/mg-monitoring
  - /v1/docs/en/mg-monitoring
  - /v2/docs/mg-monitoring
  - /v2/docs/en/mg-monitoring
  - /v3/docs/mg-monitoring
  - /v3/docs/en/mg-monitoring
  - /v4/docs/mg-monitoring
  - /v4/docs/en/mg-monitoring
  - /v5/docs/mg-monitoring
  - /v5/docs/en/mg-monitoring
  - /v6/docs/mg-monitoring
  - /v6/docs/en/mg-monitoring
  - /docs/scos/dev/module-migration-guides/201811.0/migration-guide-monitoring.html
  - /docs/scos/dev/module-migration-guides/201903.0/migration-guide-monitoring.html
  - /docs/scos/dev/module-migration-guides/201907.0/migration-guide-monitoring.html
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-monitoring.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-monitoring.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-monitoring.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-monitoring.html
related:
  - title: New Relic
    link: docs/scos/user/technology-partners/page.version/operational-tools-monitoring-legal-etc/new-relic.html
---

## Upgrading from Version 1.* to Version 2.*

For BC reasons, the initial version of this module had dependencies to the`spryker/new-relic` and `spryker/new-relic-api` modules.

In this version, we have removed this hard dependency. If you still want to use New Relic as a monitoring service you can use the `spryker-eco/new-relic` module by running the command:

```bash
composer require spryker-eco/new-relic
```
This will download the New Relic monitoring extension.

To enable the New Relic monitoring extension, add it to  `MonitoringDependencyProvider` in your project:

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

Meanwhile, if you want to log a console command,  modify the `src/Pyz/Zed/Console/ConsoleDependencyProvider.php` file.

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
$config[\SprykerEco\Shared\NewRelic\NewRelicEnv::NEWRELIC_API_KEY] = 'YOUR_API_KEY';
$config[\SprykerEco\Shared\NewRelic\NewRelicEnv::NEW_RELIC_DEPLOYMENT_API_URL] = 'https://api.newrelic.com/v2/applications/%s/deployments.json';
$config[\SprykerEco\Shared\NewRelic\NewRelicEnv::NEW_RELIC_APPLICATION_ID_ARRAY] = [
	'store1'    => '12345',
	'store2'    => '12346',
	...
];
```

For more details, see [Performance Monitoring - New Relic](/docs/scos/user/technology-partners/{{site.version}}/operational-tools-monitoring-legal-etc/new-relic.html).
