---
title: Add and configure cronjobs
last_updated: Jun 16, 2021
description: Learn to add and configure cronjobs
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/adding-and-configuring-cronjob
originalArticleId: 6af304f1-b8ba-417b-874e-878e5d9a5730
redirect_from:
  - /docs/scos/dev/back-end-development/cronjobs/adding-and-configuring-cronjobs.html
  - /docs/scos/dev/back-end-development/cronjobs/add-and-configure-cronjobs.html
related:
  - title: Cronjobs
    link: docs/scos/dev/back-end-development/cronjobs/cronjobs.html
  - title: Create a custom scheduler
    link: docs/scos/dev/back-end-development/cronjobs/create-a-custom-scheduler.html
  - title: Migrate to Jenkins
    link: docs/scos/dev/back-end-development/cronjobs/migrate-to-jenkins.html
  - title: Cronjob scheduling
    link: docs/scos/dev/sdk/cronjob-scheduling.html
---

This document shows how to add and configure cronjobs in Jenkins.

We use [Jenkins](https://jenkins-ci.org/) for cronjob scheduling. Compared to Crontab, there are several benefits:

* Jobs are queued and can be manually executed.
* Job definitions are under version control and can be changed by any developer.
* Console output is available for debugging.

## Add a new job and run it

Jobs are defined in `config/Zed/cronjobs/jenkins.php`

This file contains an array defining the jobs.

```php
// Send emails every 10 minutes
$jobs[] = [
    'name'                  => 'send-mails',
    'command'               => '$PHP_BIN vendor/bin/console mail:send-mail',
    'schedule'              => '*/10 * * * *',
    'enable'                => true,
    'stores'                => ['DE', 'FR'],
];
```

To import this configuration to Jenkins, run the following command in the console. In a production environment, this is part of the deployment process.

`vendor/bin/console scheduler:setup`

After this, you can open Jenkins on port `10007` and watch your scripts running: [http://zed.mysprykershop.com:10007](http://zed.mysprykershop.com:10007/) (URL works for standard VM, you may use a different hostname).

## Cronjob configuration

For each job you can define several configurations:

| KEY                   | TYPE   | PURPOSE                                                      | ✓ |
| --------------------- | ------ | ------------------------------------------------------------ | --------- |
| name                  | string | Name of the job.                                              | yes       |
| command               | string | The [console command](/docs/dg/dev/backend-development/console-commands/implement-console-commands.html) that is executed. | yes       |
| schedule              | string | Expression that defines the job schedule (how often the job is executed).The schedule string is compatible with cronjob schedule definition—for example, `0 * * * *` means run once each hour at 00 minute). If the environment is in development, return empty string—cronjobs are being executed on development environment only manually. | yes       |
| enable                | bool   | Enable or disable jobs.                                          | yes       |
| stores                | array  | An array of stores where the job is executed.                | yes       |

{% info_block errorBox %}

When you don't use Jenkins for job scheduling, there is no locking between concurrently running commands.

{% endinfo_block %}
