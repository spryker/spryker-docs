---
title: Installing and configuring New Relic with Vagrant
template: howto-guide-template
related:
  - title: Migration Guide - Session
    link: docs/scos/dev/module-migration-guides/migration-guide-session.html
---

To install and configure New Relic, do the following.

## Install New Relic

The `spryker-eco/new-relic` module provides a `NewRelicMonitoringExtensionPlugin` to send monitoring information to the New Relic service.


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


## Configure New Relic

1. [Create a New Relic account](https://newrelic.com/signup).  
2. Install the New Relic PHP extension in your virtual machine as described in [New Relic setup instructions](https://rpm.newrelic.com/accounts/1131235/applications/setup).

## Implementation overview

Monitoring is a Spryker module that provides a hook to add any monitoring provider you want. In the Monitoring module, you can find a service provider and a controller listener for Yves and Zed that need to be added to  `ApplicationDependencyProvider` to enable them.

## New Relic API

You can add custom New Relic events in your application with the API wrapper for New Relic in `\SprykerEco\Service\NewRelic\Plugin\NewRelicMonitoringExtensionPlugin`. To read detailed information about the available API methods, please read the following documentation: [New Relic API](https://docs.newrelic.com/docs/apm/agents/php-agent/php-agent-api/guide-using-php-agent-api/).
