---
title: Adding and configuring cronjobs
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/adding-and-configuring-cronjob
originalArticleId: 6af304f1-b8ba-417b-874e-878e5d9a5730
redirect_from:
  - /2021080/docs/adding-and-configuring-cronjob
  - /2021080/docs/en/adding-and-configuring-cronjob
  - /docs/adding-and-configuring-cronjob
  - /docs/en/adding-and-configuring-cronjob
  - /v6/docs/adding-and-configuring-cronjob
  - /v6/docs/en/adding-and-configuring-cronjob
  - /v5/docs/adding-and-configuring-cronjob
  - /v5/docs/en/adding-and-configuring-cronjob
  - /v4/docs/adding-and-configuring-cronjob
  - /v4/docs/en/adding-and-configuring-cronjob
  - /v2/docs/cronjob-scheduling-guide
  - /v2/docs/en/cronjob-scheduling-guide
  - /v1/docs/cronjob-scheduling-guide
  - /v1/docs/en/cronjob-scheduling-guide
---

We use [Jenkins](https://jenkins-ci.org/) for cronjob scheduling. Compared to Crontab, there are several benefits:

* Jobs are queued and can be manually executed
* Job definitions are under version control and can be changed by any developer
* Console output available for debugging

## Add a New Job and Run It

Jobs are defined in `config/Zed/cronjobs/jenkins.php`

This file contains an array which defines the jobs.

```php
// Send emails every 10 minutes
$jobs[] = [
    'name'                  => 'send-mails',
    'command'               => '$PHP_BIN vendor/bin/console mail:send-mail',
    'schedule'              => '*/10 * * * *',
    'enable'                => true,
    'run_on_non_production' => true,
    'stores'                => ['DE', 'FR'],
];
```

To import this configuration to Jenkins you need to run this command in the console. In a production environment, this is part of the deployment process.

`vendor/bin/console scheduler:setup`

Now you can open Jenkins on port 10007 and watch your scripts running: [http://zed.mysprykershop.com:10007](http://zed.mysprykershop.com:10007/) (URL works for standard VM, you may use a different host name).

## Cronjob Configuration

For each job you can define several configurations:

| Key                   | Type   | Purpose                                                      | Mandatory |
| --------------------- | ------ | ------------------------------------------------------------ | --------- |
| name                  | string | Name of the job                                              | yes       |
| command               | string | The [console command](/docs/scos/dev/back-end-development/console-commands/implementing-a-new-console-command.html) that is executed. | yes       |
| schedule              | string | Expression that defines the job schedule (how often the job is executed).The schedule string is compatible with cronjob schedule definition (eg. 0 * * * * means: run once each hour at 00 minute). If environment is development, return empty string - cronjobs are being executed on development environment only manually. | yes       |
| enable                | bool   | Enable/Disable jobs                                          | yes       |
| stores                | array  | An array of stores where the job is executed.                | yes       |
| run_on_non_production | bool   | Defines, if the job also runs on environments other than production (development, testing, staging). Default: false | no        |

{% info_block errorBox %}
When not using Jenkins for job scheduling there is no locking between concurrently running commands.
{% endinfo_block %}