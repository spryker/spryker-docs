---
title: Installation New Relic with Vagrant
template: howto-guide-template
---

The `spryker-eco/new-relic` module provides a `NewRelicMonitoringExtensionPlugin` to send monitoring information to the New Relic service. To be able to use the `\SprykerEco\Service\NewRelic\Plugin\NewRelicMonitoringExtensionPlugin` plugin within the [Monitoring](https://github.com/spryker/monitoring) module, install the NewRelic module:

```bash
composer require spryker-eco/new-relic
```

{% info_block infoBox "New Relic installation in Docker based projects" %}

For installation instructions in Docker based projects, see [Configuring New Relic](/docs/scos/dev/the-docker-sdk/{{page.version}}/configuring-services.html)

{% endinfo_block %}
