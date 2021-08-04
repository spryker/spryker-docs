---
title: Tideways
originalLink: https://documentation.spryker.com/2021080/docs/tideways
redirect_from:
  - /2021080/docs/tideways
  - /2021080/docs/en/tideways
---

## Partner Information

[ABOUT TIDEWAYS](https://tideways.com/) 
Monitoring, Profiling and Exception Tracking. Tideways is an Application-Performance-Monitoring (APM) solution with built-in profiler and automated error tracking. All services are tailor-made for E-commerce systems like Spryker. Your customers are looking for a fast and painless online shopping experiences. Tideways helps you to create that experience through detailed insights about your shop's performance from fronted, checkout and backend to background processes. In addition to a weekly report and overview over your performance, you have the possibility to analyse single database queries or functions in detail.

YOUR ADVANTAGES
* smooth integration into Spryker software with automatic analysis (no further installation or code changes required)
* weekly reporting to detect tendencies within your performance
* continuous monitoring with intelligent data segmentation (shops, languages, backend or frontend...)
* automated regularly profiling with detailed performance data of outlier requests
* multiple options to prioritize profiling data based on your own criteria
* automated recognition of errors with precise and detailed leads to causes and bugfixing tips

{% info_block errorBox "Attention!" %}
[Register](https://tideways.com/spryker-monitoring-profiling
{% endinfo_block %} with Tideways now!)

### General information

The `spryker-eco/tideways` module provides a `TidewaysMonitoringExtensionPlugin` to send monitoring information to the tideways service.

### Installation

To install Tideways module, run:
```bash
composer require spryker-eco/tideways
```

### Configuration

To start using Tideways, please make sure you have accomplished the steps described below:

1. Install the Tideways module
2. Install Tideways as described on [Tideways support page](https://support.tideways.com/article/85-install-on-debian-ubuntu)
3. Add `TidewaysMonitoringExtensionPlugin` to  `MonitoringDependencyProvider::getMonitoringExtensions()` in your project

### Implementation Overview

Monitoring is a Spryker Module and it provides a hook to add any monitoring provider you want to. In the Monitoring Module you can find some service provider and controller listener for Yves and Zed which needs to be added to the `ApplicationDependencyProvider` to enable them.

<b>See also:</b>

* [Monitor Spryker Performance with Tideways](https://tideways.com/spryker-monitoring-profiling)

---

## Copyright and Disclaimer

See [Disclaimer](https://github.com/spryker/spryker-documentation).

---
For further information on this partner and integration into Spryker, please contact us.

<div class="hubspot-form js-hubspot-form" data-portal-id="2770802" data-form-id="163e11fb-e833-4638-86ae-a2ca4b929a41" id="hubspot-1"></div>
