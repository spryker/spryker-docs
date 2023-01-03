---
title: Installing and configuring New Relic with Vagrant
template: howto-guide-template
---

{% info_block warningBox "Warning" %}

We will soon deprecate the DevVM and stop supporting it. Therefore, we highly recommend [installing Spryker with Docker](/docs/scos/dev/setup/installing-spryker-with-docker/installing-spryker-with-docker.html). For installation instructions in Docker-based projects, see [Configure New Relic](/docs/scos/dev/the-docker-sdk/{{page.version}}/configure-services.html#new-relic)

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
