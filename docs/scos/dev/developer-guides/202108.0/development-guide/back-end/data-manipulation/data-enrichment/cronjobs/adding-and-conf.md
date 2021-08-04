---
title: Adding and Configuring a Cronjob
originalLink: https://documentation.spryker.com/2021080/docs/adding-and-configuring-cronjob
redirect_from:
  - /2021080/docs/adding-and-configuring-cronjob
  - /2021080/docs/en/adding-and-configuring-cronjob
---

<!--Used to be: http://spryker.github.io/development-guide/reference/cronjob-scheduling/-->

We use [Jenkins](https://jenkins-ci.org/) for cronjob scheduling. Compared to Crontab, there are several benefits:

* Jobs are queued and can be manually executed
* Job definitions are under version control and can be changed by any developer
* Console output available for debugging

## Add a New Job and Run It

Jobs are defined in `config/Zed/cronjobs/jobs.php`

This file contains an array which defines the jobs.

```PHP
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

`vendor/bin/console setup:jenkins:generate`

Now you can open Jenkins on port 10007 and watch your scripts running: [http://zed.mysprykershop.com:10007](http://zed.mysprykershop.com:10007/) (URL works for standard VM, you may use a different host name).

## Cronjob Configuration

For each job you can define several configurations:

| Key                   | Type   | Purpose                                                      | Mandatory |
| --------------------- | ------ | ------------------------------------------------------------ | --------- |
| name                  | string | Name of the job                                              | yes       |
| command               | string | The [console command](/docs/scos/dev/developer-guides/202001.0/development-guide/back-end/data-manipulation/data-enrichment/console-commands/console-command) that is executed. | yes       |
| schedule              | string | Expression that defines the job schedule (how often the job is executed).The schedule string is compatible with cronjob schedule definition (eg. 0 * * * * means: run once each hour at 00 minute). If environment is development, return empty string - cronjobs are being executed on development environment only manually. | yes       |
| enable                | bool   | Enable/Disable jobs                                          | yes       |
| stores                | array  | An array of stores where the job is executed.                | yes       |
| run_on_non_production | bool   | Defines, if the job also runs on environments other than production (development, testing, staging). Default: false | no        |

{% info_block errorBox %}
When not using Jenkins for job scheduling there is no locking between concurrently running commands.
{% endinfo_block %}
