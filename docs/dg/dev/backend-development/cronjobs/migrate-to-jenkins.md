---
title: Migrate to Jenkins
description: Learn how to migrate cronjobs to Jenkins in Spryker's backend to streamline task automation. Improve the efficiency of your ecommerce platform with Jenkins integration.
template: howto-guide-template
last_updated: Nov 1, 2021
redirect_from:
  - /docs/scos/dev/back-end-development/cronjobs/migrating-to-jenkins.html
  - /docs/scos/dev/back-end-development/cronjobs/migrate-to-jenkins.html
related:
  - title: Cronjobs
    link: docs/scos/dev/back-end-development/cronjobs/cronjobs.html
  - title: Create a custom scheduler
    link: docs/scos/dev/back-end-development/cronjobs/create-a-custom-scheduler.html
  - title: Add and configure cronjobs
    link: docs/scos/dev/back-end-development/cronjobs/add-and-configure-cronjobs.html
---

This document describes how to migrate to the Jenkins scheduler and set up jobs.

{% info_block infoBox %}

Jenkins is the default scheduler shipped with Spryker Demo Shops. Follow the instructions in the document only if you previously migrated to another scheduler.

{% endinfo_block %}


## Prerequisites

Check `composer.json` and `package.json` to make sure that the following Composer packages are installed:

* `spryker/scheduler: *`
* `spryker/scheduler-extension: *`
* `spryker/scheduler-jenkins: *`

## 1. Configure Jenkins

1. In `src/Pyz/Shared/Scheduler/SchedulerConfig.php`, add the scheduler name constant:

```php
class SchedulerConfig extends AbstractSharedConfig
{
    public const SCHEDULER_JENKINS = 'jenkins';
}
```

2. In `src/Pyz/Zed/Console/ConsoleDependencyProvider.php`, add the console commands and Twig application plugin:

```php
/**
 * @SuppressWarnings(PHPMD.ExcessiveMethodLength)
 * @method \Pyz\Zed\Console\ConsoleConfig getConfig()
 */
class ConsoleDependencyProvider extends SprykerConsoleDependencyProvider
{
    ...
    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Symfony\Component\Console\Command\Command[]
     */
    protected function getConsoleCommands(Container $container): array
    {
        $commands = [
          ...
          new SchedulerSetupConsole(),
          new SchedulerCleanConsole(),
          new SchedulerSuspendConsole(),
          new SchedulerResumeConsole(),
          ...
        ];
        ...
    }

    ...

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return array<\Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface>
     */
    public function getApplicationPlugins(Container $container): array
    {
        $applicationPlugins = parent::getApplicationPlugins($container);

        ...

        $applicationPlugins[] = new TwigApplicationPlugin();

        return $applicationPlugins;
    }

   ...

}
```

3. In `src/Pyz/Zed/Scheduler/SchedulerDependencyProvider.php`, add the adapter:

```php
class SchedulerDependencyProvider extends SprykerSchedulerDependencyProvider
{
    ...
    /**
     * @return \Spryker\Zed\SchedulerExtension\Dependency\Plugin\ScheduleReaderPluginInterface[]
     */
    protected function getSchedulerReaderPlugins(): array
    {
        return [
            new PhpScheduleReaderPlugin(),
        ];
    }
    /**
     * @return \Spryker\Zed\SchedulerExtension\Dependency\Plugin\SchedulerAdapterPluginInterface[]
     */
    protected function getSchedulerAdapterPlugins(): array
    {
            ...
            SchedulerConfig::SCHEDULER_JENKINS => new SchedulerJenkinsAdapterPlugin(),
        ];
    }
}
```


## 2. Configure the project

1. To use enabled schedulers from environment variables, adjust the project configuration with `SchedulerConstants::ENABLED_SCHEDULERS`:

```php
$config[SchedulerConstants::ENABLED_SCHEDULERS] = [
    SchedulerConfig::SCHEDULER_JENKINS,
];
```

2. Init configuration for each Jenkins:

```php
$config[SchedulerJenkinsConstants::JENKINS_CONFIGURATION] = [
    SchedulerConfig::SCHEDULER_JENKINS => [
        SchedulerJenkinsConfig::SCHEDULER_JENKINS_BASE_URL => sprintf(
            '%s://%s:%s/',
            getenv('SPRYKER_SCHEDULER_PROTOCOL') ?: 'http',
            getenv('SPRYKER_SCHEDULER_HOST'),
            getenv('SPRYKER_SCHEDULER_PORT')
        ),
    ],
];

$config[SchedulerJenkinsConstants::JENKINS_TEMPLATE_PATH] = getenv('SPRYKER_JENKINS_TEMPLATE_PATH') ?: null;
```

## 3. Configure Jenkins jobs

Create or update the Jenkins job list in `config/Zed/cronjobs/jenkins.php`. To learn how to add jobs, see [Add and configure cronjobs](/docs/dg/dev/backend-development/cronjobs/add-and-configure-cronjobs.html).
