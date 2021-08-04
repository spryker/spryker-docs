---
title: New Relic
originalLink: https://documentation.spryker.com/v3/docs/new-relic
redirect_from:
  - /v3/docs/new-relic
  - /v3/docs/en/new-relic
---

## New Relic Monitoring

Spryker enables integration with New Relic for performance monitoring. New Relic contains a set of powerful features that help you monitor the performance and health of your application. To be able to use New Relic, first, you need to get an account. Next, you will need to install the New Relic PHP extension in your virtual machine by following the steps described in [New Relic Setup instructions](https://rpm.newrelic.com/accounts/1131235/applications/setup).

## General Information

The `spryker-eco/new-relic` module provides a `NewRelicMonitoringExtensionPlugin` to send monitoring information to the New Relic service.

## Installation

To install New Relic module, run
```bash
composer require spryker-eco/new-relic
```
This will install:

* `spryker-eco/new-relic - 1.1.x`
* `spryker/monitoring - 2.x.x`
* `spryker/monitoring - 1.x.x`

and will remove the eventual New Relic legacy packages:

* `spryker/new-relic`
* `spryker/new-relic-api`

## New Relic Logs Configuration

### Request Logging

Every request is automatically logged by New Relic. The name of the requests will be the name of the used route for Yves and the `[module]/[controller]/[action]` for Zed. Also, URL request and the host are stored as custom parameters for each request.

To enable the New Relic monitoring extension, add it to the `MonitoringDependencyProvider` in your project:

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

Additionally, you can add ignorable transactions in your config file - for example, `config/Shared/config_default.php`:

```php
use Spryker\Shared\Monitoring\MonitoringConstants;
 
// ---------- Monitoring
$config[MonitoringConstants::IGNORABLE_TRANSACTIONS] = [
    '_profiler',
    '_wdt',
    'page/catalog/my-endpoint',
];
```

### Error Logging

Every error will be logged in New Relic along with its detailed stack trace.

### Console Command Logging

To enable the Monitoring for console commands, modify the `src/Pyz/Zed/Console/ConsoleDependencyProvider.php` file:

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

### Deployment Logging

To be able to use the deployment recording feature of New Relic, add your `api_key` and `deployment_api_url` to the project config. The API key is generated in your New Relic account. Open your account settings in New Relic and enable the API Access on the Data Sharing page. Once done, you'll get your API key. For more details, see [API Explorer](https://rpm.newrelic.com/api/explore).

```php
$config[\SprykerEco\Shared\NewRelic\NewRelicEnv::NEW_RELIC_API_KEY] = 'YOUR_API_KEY';
$config[\SprykerEco\Shared\NewRelic\NewRelicEnv::NEW_RELIC_DEPLOYMENT_API_URL] = 'NEW_RELIC_DEPLOYMENT_API_URL';
```

The `NEW_RELIC_DEPLOYMENT_API_URL` can be retrieved from the official documentation about [Record Deployment](https://docs.newrelic.com/docs/apm/new-relic-apm/maintenance/record-deployments). It should contain the environment application ID you want to register the deployment for.

For example: `https://api.newrelic.com/v2/applications/12345/deployments.json`

However, the latest version (1.1.0)  of the module allows passing a list of IDs to be able to record multiple deployments (i.e. Yves and Zed for different stores) at once. In that case, the config has to be modified using the %s as a placeholder in the deployment URL:

```
$config[\SprykerEco\Shared\NewRelic\NewRelicEnv::NEW_RELIC_DEPLOYMENT_API_URL] =
    'https://api.newrelic.com/v2/applications/%s/deployments.json';
$config[\SprykerEco\Shared\NewRelic\NewRelicEnv::NEW_RELIC_APPLICATION_ID_ARRAY] = [
    'yves_de'   => '12345',
    'zed_de'    => '12346',
    'yves_us'   => '12347',
    'zed_us'    => '12348',
];
```
Therefore, it will be possible to use the record deployment functionality built-in in the console commands, as follows:

```
$ vendor/bin/console newrelic:record-deployment <app_name> <user> <revision> [<description>] [<changelog>]
```

where the first three arguments are mandatory. A real example of usage would be:

```
$ vendor/bin/console newrelic:record-deployment MyStore user@gmail.com v1.2.0 "New version 1.2.0" "Fixed bugs in controller"
```

## Implementation Overview

Monitoring is a Spryker module that provides a hook to add any monitoring provider you want. In the Monitoring module, you can find a service provider and a controller listener for Yves and Zed that need to be added to  `ApplicationDependencyProvider` to enable them.

## New Relic API

You can add custom New Relic events in your application with the API wrapper for New Relic in `\SprykerEco\Service\NewRelic\Plugin\NewRelicMonitoringExtensionPlugin`. To read detailed information about the available API methods, please read the following documentation: [New Relic API](https://docs.newrelic.com/docs/agents/php-agent/php-agent-api).

---

## Copyright and Disclaimer

See [Disclaimer](https://github.com/spryker/spryker-documentation).

---
For further information on this partner and integration into Spryker, please contact us.

<div class="hubspot-forms hubspot-forms--docs">
<div class="hubspot-form" id="hubspot-partners-1">
            <div class="script-embed" data-code="
                                            hbspt.forms.create({
				                                portalId: '2770802',
				                                formId: '163e11fb-e833-4638-86ae-a2ca4b929a41',
              	                                onFormReady: function() {
              		                                const hbsptInit = new CustomEvent('hbsptInit', {bubbles: true});
              		                                document.querySelector('#hubspot-partners-1').dispatchEvent(hbsptInit);
              	                                }
				                            });
            "></div>
</div>
</div>
