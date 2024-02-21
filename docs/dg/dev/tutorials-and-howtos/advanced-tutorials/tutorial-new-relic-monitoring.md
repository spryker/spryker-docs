  - /docs/scos/dev/tutorials-and-howtos/advanced-tutorials/tutorial-new-relic-monitoring.html
---
title: "Tutorial: New Relic monitoring"
description: Use the guide to learn how to configure a New Relic agent, including on Linux,  and then test it.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/t-new-relic-monitoring
originalArticleId: b7ba0c6c-21fb-43ae-abad-e030dccbea98
redirect_from:
  - /2021080/docs/t-new-relic-monitoring
  - /2021080/docs/en/t-new-relic-monitoring
  - /docs/t-new-relic-monitoring
  - /docs/en/t-new-relic-monitoring
  - /v6/docs/t-new-relic-monitoring
  - /v6/docs/en/t-new-relic-monitoring
  - /v5/docs/t-new-relic-monitoring
  - /v5/docs/en/t-new-relic-monitoring
  - /v4/docs/t-new-relic-monitoring
  - /v4/docs/en/t-new-relic-monitoring
  - /v3/docs/t-new-relic-monitoring
  - /v3/docs/en/t-new-relic-monitoring
  - /v2/docs/t-new-relic-monitoring
  - /v2/docs/en/t-new-relic-monitoring
  - /v1/docs/t-new-relic-monitoring
  - /v1/docs/en/t-new-relic-monitoring
---

{% info_block infoBox %}
For existing Spryker Cloud Customers, the NewRelic APM is already preconfigured and just needs to be activated by requesting access [here](https://spryker.force.com/support/s/hosting-change-requests/change-request-monitoring-access). Please note the access access can only be requested by a direct customer, not a partner. Please also note that only the NewRelic APM account provided by Spryker should be used. It is not possible to use existing NewRelic APM accounts on a PaaS environment, as this would conflict with our monitoring setup.
{% endinfo_block %}

## Installing the PHP agent

When accessing your New Relic APM dashboard, you are asked to download and set up the New Relic agent:

![New Relic - Step 1](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/Advanced/Tutorial+New+Relic+Monitoring/newrelic-step1.png)

It is important to generate a LICENSE KEY (which is different from the API KEY):

![New Relic - Step 2](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/Advanced/Tutorial+New+Relic+Monitoring/newrelic-step2.png)

Then, you can install the New Relic agent:

![New Relic - Step 3](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/Advanced/Tutorial+New+Relic+Monitoring/newrelic-step3.png)

Here is the instruction for a default Linux installation:

```bash
$ wget http://download.newrelic.com/php_agent/release/newrelic-php5-X.X.X.X-OS.tar.gz
$ sudo gzip -dc newrelic-php5-X.X.X.X-OS.tar.gz | tar xf -
$ cd newrelic-php5-X.X.X.X
$ sudo ./newrelic-install install
```

Enter the license key and follow the instructions:

![New Relic - Step 4](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/Advanced/Tutorial+New+Relic+Monitoring/newrelic-step4.png)

Once the installation is finished, check/modify the following files: a mapping default fpm (web) transaction to the default Yves, and the console commands (non-web) to the default Zed.

**/etc/php/7.2/cli/conf.d/newrelic.ini**

```bash
newrelic.appname = "YVES-DE (environment)"
newrelic.framework = "no_framework"
```

**/etc/php/7.2/fpm/conf.d/newrelic.ini**

```bash
newrelic.appname = "ZED-DE (environment)"
newrelic.framework = "no_framework"
```

Additionally, if, for some reasons, the transactions return some erroneous data, these values can be set in one or both `newrelic.ini` files:

```bash
newrelic.browser_monitoring.auto_instrument = false
newrelic.transaction_tracer.enabled = false
```

The same is for the `vhost` configuration of php parameters.

**/etc/php/7.2/fpm/pool.d/environment-yves.conf**

```php
php_admin_value[newrelic.appname] = "YVES-DE (environment)"
php_admin_value[newrelic.framework] = "no_framework"
```

**/etc/php/7.2/fpm/pool.d/environment-zed.conf**

```php
php_admin_value[newrelic.appname] = "ZED-DE (environment)"
php_admin_value[newrelic.framework] = "no_framework"
```

Then, restart `fpm` and `Nginx`, and check that the New Relic daemon is up and running:

```bash
$ sudo service php7.2-fpm restart
$ sudo service nginx restart
$ sudo /etc/init.d/newrelic-daemon status
```

To enable or migrate New Relic packages, check the following documents:

* [Migration Guide - Monitoring](/docs/scos/dev/module-migration-guides/migration-guide-monitoring.html)
* [New Relic](/docs/pbc/all/miscellaneous/{{site.version}}/third-party-integrations/operational-tools-monitoring-legal/new-relic.html)
