---
title: Installing and configuring New Relic with Vagrant
template: howto-guide-template
related:
  - title: Migration Guide - Session
    link: docs/scos/dev/module-migration-guides/migration-guide-session.html
redirect_from:
  - /docs/scos/dev/technology-partner-guides/202200.0/operational-tools-monitoring-legal-etc/new-relic/installing-and-configuring-new-relic–with–vagrant.html
---

{% info_block warningBox "Warning" %}

We will soon deprecate the DevVM and stop supporting it. Therefore, we highly recommend [installing Spryker with Docker](/docs/scos/dev/set-up-spryker-locally/set-up-spryker-locally.html). For installation instructions in Docker-based projects, see [Configure New Relic](/docs/scos/dev/the-docker-sdk/{{page.version}}/configure-services.html#new-relic)

{% endinfo_block %}

To install and configure New Relic, do the following.

## Configure New Relic

1. [Create a New Relic account](https://newrelic.com/signup).  
2. In your virtual machine, install the New Relic PHP extension as described in [New Relic setup instructions](https://rpm.newrelic.com/accounts/1131235/applications/setup).

## Install New Relic

The `spryker-eco/new-relic` module provides a `NewRelicMonitoringExtensionPlugin` to send monitoring information to the New Relic service. To be able to use the `\SprykerEco\Service\NewRelic\Plugin\NewRelicMonitoringExtensionPlugin` plugin within the [Monitoring](https://github.com/spryker/monitoring) module, install the NewRelic module:

```bash
composer require spryker-eco/new-relic
```
