---
title: New Relic
description: Monitor the performance and health of your application by integrating New Relic into the Spryker Commerce OS.
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/new-relic
originalArticleId: 6932e215-8b44-4cb4-b43e-12704e967a45
redirect_from:
  - /2021080/docs/new-relic
  - /2021080/docs/en/new-relic
  - /docs/new-relic
  - /docs/en/new-relic
---

## New Relic Monitoring

Spryker enables integration with New Relic for performance monitoring. New Relic contains a set of powerful features that help you monitor the performance and health of your application. To be able to use New Relic, first, you need to get an account. Next, you will need to install the New Relic PHP extension in your virtual machine by following the steps described in [New Relic Setup instructions](https://rpm.newrelic.com/accounts/1131235/applications/setup).

## General Information

The `spryker-eco/new-relic` module provides a `NewRelicMonitoringExtensionPlugin` to send monitoring information to the New Relic service.

## Installation

To be able to use the `\SprykerEco\Service\NewRelic\Plugin\NewRelicMonitoringExtensionPlugin` plugin within the [Monitoring](https://github.com/spryker/monitoring) module, install the NewRelic Module:

```bash
composer require spryker-eco/new-relic
```

## New Relic Logs Configuration

### Request Logging

Every request is automatically logged by New Relic. The name of the requests will be the name of the used route for Yves and the `[module]/[controller]/[action]` for Zed. Also, URL request and the host are stored as custom parameters for each request.

To enable the New Relic monitoring extension, add it to the `MonitoringDependencyProvider` in your project:

```php
 '12345',
    'zed_de'    =&gt; '12346',
    'yves_us'   =&gt; '12347',
    'zed_us'    =&gt; '12348',
];
```
Therefore, it will be possible to use the record deployment functionality built-in in the console commands, as follows:

```
$ vendor/bin/console newrelic:record-deployment 
