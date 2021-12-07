The `spryker-eco/tideways` module provides a `TidewaysMonitoringExtensionPlugin` to send monitoring information to the tideways service.

### Installation

To install Tideways module, run:

```bash
composer require spryker-eco/tideways
```

### Configuration

To start using Tideways, please make sure you have accomplished the steps described below:
1. Install the Tideways module.
2. Install Tideways as described on [Tideways support page](https://support.tideways.com/article/85-install-on-debian-ubuntu).
3. Add `TidewaysMonitoringExtensionPlugin` to  `MonitoringDependencyProvider::getMonitoringExtensions()` in your project.

### Implementation Overview

Monitoring is a Spryker Module and it provides a hook to add any monitoring provider you want to. In the Monitoring Module you can find some service provider and controller listener for Yves and Zed which needs to be added to the `ApplicationDependencyProvider` to enable them.

See also [Monitor Spryker Performance with Tideways](https://app.tideways.io/login)
