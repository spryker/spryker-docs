---
title: Installing and configuring New Relic with Vagrant
template: howto-guide-template
related:
  - title: Migration Guide - Session
    link: docs/scos/dev/module-migration-guides/migration-guide-session.html
---

{% info_block infoBox "New Relic installation in Docker based projects" %}

For installation instructions in Docker based projects, see [Configuring New Relic](/docs/scos/dev/the-docker-sdk/{{page.version}}/configuring-services.html#configuring-new-relic)

{% endinfo_block %}

To install and configure New Relic, do the following.


## Configure New Relic

1. [Create a New Relic account](https://newrelic.com/signup).  
2. Install the New Relic PHP extension in your virtual machine as described in [New Relic setup instructions](https://rpm.newrelic.com/accounts/1131235/applications/setup).



## Install New Relic

The `spryker-eco/new-relic` module provides a `NewRelicMonitoringExtensionPlugin` to send monitoring information to the New Relic service. To be able to use the `\SprykerEco\Service\NewRelic\Plugin\NewRelicMonitoringExtensionPlugin` plugin within the [Monitoring](https://github.com/spryker/monitoring) module, install the NewRelic module:

```bash
composer require spryker-eco/new-relic
```
