---
title: Cronjob Scheduling
originalLink: https://documentation.spryker.com/v6/docs/cronjob-scheduling-guide
redirect_from:
  - /v6/docs/cronjob-scheduling-guide
  - /v6/docs/en/cronjob-scheduling-guide
---


## General Information

Spryker applications demand performing repetitive background operation - jobs. Such operations are necessary for synchronizing denormalized data into Search engine, key-value store, etc. We recommend running a set of predefined jobs in order for Spryker applications to operate properly.

While setting up and configuring a scheduler, a developer is to solve the following tasks:

1. Propagate predefined jobs into a scheduler.
2. Get jobs to run on remote servers. This is an environment-dependent task.
3. Set up monitoring of job execution. This may as well be provided by a scheduler.
{% info_block infoBox %}
See [Creating a New Custom Scheduler](https://documentation.spryker.com/v3/docs/ht-create-a-new-custom-scheduler-201907
{% endinfo_block %} to learn about scheduler creation.)
Currently, Spryker B2B and B2C demo shops are shipped with Jenkins as a default scheduler. Jenkins manages running and monitoring jobs. Spryker provides a module to control Jenkins and propagate the jobs it manages.

Basic module schema:

![Module schema](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/HowTo+Set+up+Schedulers+for+Different+Environments/scheduler-module.png){height="" width=""}

The scheduler module is an abstraction layer that provides basic functionality. e.g reading configuration of  jobs from a source or filtering jobs according to the store configuration.

## Configuration

* The default Jenkins scheduler configuration looks as follows:

**config_*.php**

```php
// ---------- Scheduler
// Sets up Jenkins scheduler
$config[SchedulerConstants::ENABLED_SCHEDULERS] = [
    SchedulerConfig::SCHEDULER_JENKINS, //default scheduler, "jenkins"
];

// Set up configuration for the Jenkins specific scheduler
$config[SchedulerJenkinsConstants::JENKINS_CONFIGURATION] = [
    SchedulerConfig::SCHEDULER_JENKINS => [
        // Jenkins scheduler base url
        SchedulerJenkinsConfig::SCHEDULER_JENKINS_BASE_URL => 'http://localhost:10007/',
        // Jenkins scheduler auth credentials
		SchedulerJenkinsConfig::SCHEDULER_JENKINS_CREDENTIALS => ['username', 'password'],
        // Jenkins scheduler CSRF protection to avoid cross site request forgery
        SchedulerJenkinsConfig::SCHEDULER_JENKINS_CSRF_ENABLED => true,
    ],
];
```

* An advanced configuration with multiple schedulers looks as follows:

**config_*.php**

```php
// ---------- Multiple Scheduler
// Set up all enabled schedulers
$config[SchedulerConstants::ENABLED_SCHEDULERS] = [
    SchedulerConfig::SCHEDULER_JENKINS, //default scheduler, "jenkins"
    SchedulerConfig::SCHEDULER_CUSTOM, //custom scheduler, "custom"
    SchedulerConfig::SCHEDULER_CLOUD_WATCH, //custom scheduler, "CloudWatch"
];

// Set up configuration for the Jenkins specific scheduler
$config[SchedulerJenkinsConstants::JENKINS_CONFIGURATION] = [
    SchedulerConfig::SCHEDULER_JENKINS => [
        // Jenkins scheduler base url
        SchedulerJenkinsConfig::SCHEDULER_JENKINS_BASE_URL => 'http://localhost:10007/',
        // Jenkins scheduler auth credentials
		SchedulerJenkinsConfig::SCHEDULER_JENKINS_CREDENTIALS => ['username', 'password'],
        // Jenkins scheduler CSRF protection to avoid cross site request forgery
        SchedulerJenkinsConfig::SCHEDULER_JENKINS_CSRF_ENABLED => true,
    ],
	SchedulerConfig::SCHEDULER_CUSTOM => [
        // SCHEDULER_CUSTOM configuration settings
    ],
    SchedulerConfig::SCHEDULER_CLOUD_WATCH => [
        // SCHEDULER_CLOUD_WATCH configuration settings
    ],
];
```

## Plugins

| Plugin | Specification | Prerequisites | Namespace |
| --- | --- | --- | --- |
|  `PhpScheduleReaderPlugin` | Reads definitions of jobs for a particular scheduler. | None | `Spryker\Zed\Scheduler\Communication\Plugin\Scheduler` |
|  `SchedulerJenkinsAdapterPlugin` | Cleans, suspends or resumes all or specific Jenkins jobs for current store. | None | `Spryker\Zed\SchedulerJenkins\Communication\Plugin\Adapter` |

src/Pyz/Zed/Scheduler/SchedulerDependencyProvider.php

```php
<?php

/**
 * This file is part of the Spryker Suite.
 * For full license information, please view the LICENSE file that was distributed with this source code.
 */

namespace Pyz\Zed\Scheduler;

use Pyz\Shared\Scheduler\SchedulerConfig;
use Spryker\Zed\Scheduler\Communication\Plugin\Scheduler\PhpScheduleReaderPlugin;
use Spryker\Zed\Scheduler\SchedulerDependencyProvider as SprykerSchedulerDependencyProvider;
use Spryker\Zed\SchedulerJenkins\Communication\Plugin\Adapter\SchedulerJenkinsAdapterPlugin;

class SchedulerDependencyProvider extends SprykerSchedulerDependencyProvider
{
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
    protected function getSchedulerAdapterPlugins(): array
    {
        return [
            SchedulerConfig::SCHEDULER_JENKINS => new SchedulerJenkinsAdapterPlugin(),
        ];
    }
}
```

## Usage

The scheduler module provides 4 basic console commands:

1. Set up jobs.

```php
// Sets up jobs for all enabled schedulers
vendor/bin/console scheduler:setup

// An example of configuration
$config[SchedulerConstants::ENABLED_SCHEDULERS] = [
    SchedulerConfig::SCHEDULER_JENKINS, //jenkins
    SchedulerConfig::SCHEDULER_OWN, //crontab
	SchedulerConfig::SCHEDULER_JENKINS_SECOND, //jenkinsSecond
];

// Sets up schedulers that will be executed
vendor/bin/console scheduler:setup -s {scheduler_name} -s ...
```
2. Suspend jobs.

```php
// Suspends jobs for all enabled schedulers
vendor/bin/console scheduler:suspend

// Suspends jobs for the selected and enabled scheduler
vendor/bin/console scheduler:suspend -s {scheduler_name} -s ...

// Suspends one or several jobs for specific scheduler
vendor/bin/console scheduler:suspend -s {scheduler_name} -j {job_name}
```
3. Resume jobs.

```php
// Resumes jobs for all enabled schedulers
vendor/bin/console scheduler:resume

// Resumes jobs for the selected and enabled scheduler
vendor/bin/console scheduler:resume -s {scheduler_name} -s ...

// Resumes one or several jobs for specific scheduler
vendor/bin/console scheduler:resume -s {scheduler_name} -j {job_name} -j ...
```
4. Clean jobs.

```php
// Cleans jobs for all enabled schedulers
vendor/bin/console scheduler:clean

// Cleans jobs for the selected schedulers
vendor/bin/console scheduler:clean -s {scheduler_name} -s ..
```

{% info_block infoBox %}
Cron generates jobs only for the current store. To generate jobs for a specific store, execute `APPLICATION_STORE=US vendor/bin/console scheduler:*`.
{% endinfo_block %}
