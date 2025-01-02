---
title: Cronjobs
description: Explore how to manage and configure cronjobs in Spryker’s backend to automate tasks, ensuring smooth operation of your ecommerce platform with scheduled jobs.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/cronjob-scheduling-guide
originalArticleId: 2027e1e4-d579-4ec6-aa6e-aff40955d76c
redirect_from:
  - /docs/scos/dev/sdk/cronjob-scheduling.html
  - /docs/scos/dev/back-end-development/cronjobs/cronjobs.html
related:
  - title: Create a custom scheduler
    link: docs/scos/dev/back-end-development/cronjobs/create-a-custom-scheduler.html
  - title: Migrate to Jenkins
    link: docs/scos/dev/back-end-development/cronjobs/migrate-to-jenkins.html
  - title: Add and configure cronjobs
    link: docs/scos/dev/back-end-development/cronjobs/add-and-configure-cronjobs.html
  - title: Cronjob scheduling
    link: docs/scos/dev/sdk/cronjob-scheduling.html
---

Spryker applications demand performing repetitive background operations called _jobs_. Such operations are necessary for synchronizing denormalized data into the search engine or key-value store. For Spryker applications to operate properly, we recommend running predefined jobs.

While setting up and configuring a scheduler, a developer is to solve the following tasks:

1. Propagate predefined jobs into a scheduler.
2. Get jobs to run on remote servers. This is an environment-dependent task.
3. Set up the monitoring of job execution. A scheduler can manage this.

Cronjob schedulers are supported and controlled by the [Scheduler](https://github.com/spryker/scheduler) module. The module is an abstraction layer that provides basic functionality, like reading the configuration of jobs from a source or filtering jobs according to the store configuration.

Basic module schema:

![Module schema](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/HowTos/HowTo+Set+up+Schedulers+for+Different+Environments/scheduler-module.png)

## Cronjob schedulers

[Demo Shops](/docs/about/all/about-spryker.html#demo-shops) are shipped with Jenkins as a default scheduler. Jenkins manages running and monitoring jobs. If you migrated to another scheduler and want to migrate back to Jenkins, see [Migrate to Jenkins](/docs/dg/dev/backend-development/cronjobs/migrate-to-jenkins.html).

If your project has very specific requirements, you can [create a custom scheduler](/docs/dg/dev/backend-development/cronjobs/create-a-custom-scheduler.html).


## Using cronjob schedulers

The `Scheduler` module provides the following commands:


Set up jobs:

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
Suspend jobs:

```php
// Suspends jobs for all enabled schedulers
vendor/bin/console scheduler:suspend

// Suspends jobs for the selected and enabled scheduler
vendor/bin/console scheduler:suspend -s {scheduler_name} -s ...

// Suspends one or several jobs for specific scheduler
vendor/bin/console scheduler:suspend -s {scheduler_name} -j {job_name}
```
Resume jobs:

```php
// Resumes jobs for all enabled schedulers
vendor/bin/console scheduler:resume

// Resumes jobs for the selected and enabled scheduler
vendor/bin/console scheduler:resume -s {scheduler_name} -s ...

// Resumes one or several jobs for specific scheduler
vendor/bin/console scheduler:resume -s {scheduler_name} -j {job_name} -j ...
```
Clean jobs:

```php
// Cleans jobs for all enabled schedulers
vendor/bin/console scheduler:clean

// Cleans jobs for the selected schedulers
vendor/bin/console scheduler:clean -s {scheduler_name} -s ..
```

{% info_block infoBox %}

Cron generates jobs only for the current store. To generate jobs for a specific store, execute `APPLICATION_STORE=US vendor/bin/console scheduler:*`.

{% endinfo_block %}
