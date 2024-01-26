  
---
title: Installing and configuring Tideways with Vagrant
last_updated: Jun 16, 2021
template: howto-guide-template
redirect_from:
    - /docs/scos/dev/technology-partner-guides/202200.0/operational-tools-monitoring-legal-etc/installing-and-configuring-tideways-with-vagrant.html
    - /docs/scos/dev/technology-partner-guides/202307.0/operational-tools-monitoring-legal-etc/installing-and-configuring-tideways-with-vagrant.html
---

{% info_block warningBox "Warning" %}

We will soon deprecate the DevVM and stop supporting it. Therefore, we highly recommend [installing Spryker with Docker](/docs/scos/dev/set-up-spryker-locally/set-up-spryker-locally.html).

{% endinfo_block %}

The `spryker-eco/tideways` module provides a `TidewaysMonitoringExtensionPlugin` to send monitoring information to the tideways service.

{% info_block infoBox "New Relic installation in Docker based projects" %}

For installation instructions in Docker based projects, see [Configuring Tideways](/docs/scos/dev/the-docker-sdk/{{page.version}}/configure-services.html#configure-tideways)

{% endinfo_block %}

## Installing Tideways

To install Tideways module, run:

```bash
composer require spryker-eco/tideways
```

## Configuring Tideways

To configure Tideways, do the following:
1. Install Tideways as described at [Tideways support page](https://support.tideways.com/article/85-install-on-debian-ubuntu).
3. In your project, add `TidewaysMonitoringExtensionPlugin` to  `MonitoringDependencyProvider::getMonitoringExtensions()`.

## Implementation Overview

Monitoring is a Spryker Module and it provides a hook to add any monitoring provider you want to. In the Monitoring Module you can find some service provider and controller listener for Yves and Zed which needs to be added to the `ApplicationDependencyProvider` to enable them.

To monitor Spryker performance, go the the [Tideways application](https://app.tideways.io/login).
