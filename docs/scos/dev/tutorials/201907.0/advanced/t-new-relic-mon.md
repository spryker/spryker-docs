---
title: Tutorial - New Relic Monitoring
originalLink: https://documentation.spryker.com/v3/docs/t-new-relic-monitoring
redirect_from:
  - /v3/docs/t-new-relic-monitoring
  - /v3/docs/en/t-new-relic-monitoring
---

## Installing the PHP agent
When accessing your New Relic APM dashboard, you will be asked to download and set up the New Relic agent:

![New Relic - Step 1](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/Advanced/Tutorial+New+Relic+Monitoring/newrelic-step1.png){height="" width=""}

It is important to generate a LICENSE KEY (which is different from the API KEY):

![New Relic - Step 2](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/Advanced/Tutorial+New+Relic+Monitoring/newrelic-step2.png){height="" width=""}

Then, you'll be able to install the New Relic agent:

![New Relic - Step 3](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/Advanced/Tutorial+New+Relic+Monitoring/newrelic-step3.png){height="" width=""}

Here is the instruction for a default Linux installation:

```
$ wget http://download.newrelic.com/php_agent/release/newrelic-php5-X.X.X.X-OS.tar.gz
 $ sudo gzip -dc newrelic-php5-X.X.X.X-OS.tar.gz | tar xf -
$ cd newrelic-php5-X.X.X.X
$ sudo ./newrelic-install install
```
Enter the license key  and follow the instructions:

![New Relic - Step 4](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/Advanced/Tutorial+New+Relic+Monitoring/newrelic-step4.png){height="" width=""}

Once the installation is finished,  check/modify the following files: a mapping default fpm (web) transaction to the default Yves, and the console commands (non-web) to the default Zed.

<details open>
<summary>/etc/php/7.2/cli/conf.d/newrelic.ini</summary>
    
```
newrelic.appname = "YVES-DE (environment)"
newrelic.framework = "no_framework"
```
    
</br>
</details>

<details open>
<summary>/etc/php/7.2/fpm/conf.d/newrelic.ini</summary>
    
```
newrelic.appname = "ZED-DE (environment)"
newrelic.framework = "no_framework"
```
 
</br>
</details>

Additionally, if, for some reasons, the transactions return some erroneous data, these values can be set in either one or both `newrelic.ini` files:

```
newrelic.browser_monitoring.auto_instrument = false
newrelic.transaction_tracer.enabled = false
```

The same is for the `vhost` configuration of php parameters.

<details open>
<summary>/etc/php/7.2/fpm/pool.d/environment-yves.conf</summary>
    
```php
php_admin_value[newrelic.appname] = "YVES-DE (environment)"
php_admin_value[newrelic.framework] = "no_framework"
```
    
</br>
</details>

<details>
<summary>/etc/php/7.2/fpm/pool.d/environment-zed.conf</summary>
    
```php
php_admin_value[newrelic.appname] = "ZED-DE (environment)"
php_admin_value[newrelic.framework] = "no_framework"
```
    
</br>
</details>

In the end, you'll need to restart `fpm` and `Nginx`, and check that the New Relic daemon is up and running:

```
$ sudo service php7.2-fpm restart
$ sudo service nginx restart
$ sudo /etc/init.d/newrelic-daemon status
```

To enable or migrate New Relic packages, check the following tutorial:

* [Migration Guide - Monitoring](/docs/scos/dev/migration-and-integration/202001.0/module-migration-guides/mg-monitoring)
* [New Relic](/docs/scos/dev/technology-partners/202001.0/operational-tools-monitoring-legal-etc./new-relic)

<!-- Last review date: Jun 20, 2019 -by Fabrizio Ciacchi, Yuliia Boiko-->
