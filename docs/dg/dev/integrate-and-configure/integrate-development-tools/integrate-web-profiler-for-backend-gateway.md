---
title: Integrate Web Profiler for Backend Gateway
description: This guide describes how to access and use Web Profiler for Backend Gateway requests for development and debugging purposes.
last_updated: Dec 6, 2024
template: howto-guide-template
related:
  - title: Integrate Web Profiler for Zed
    link: docs/dg/dev/integrate-and-configure/integrate-development-tools/integrate-web-profiler-for-zed.html
  - title: Integrate Web Profiler Widget for Yves
    link: docs/dg/dev/integrate-and-configure/integrate-development-tools/integrate-web-profiler-widget-for-yves.html
  - title: Integrate Web Profiler for Glue
    link: docs/dg/dev/integrate-and-configure/integrate-development-tools/integrate-web-profiler-for-glue.html
  - title: Integrate Profiler Module
    link: docs/dg/dev/integrate-and-configure/Integrate-profiler-module.html
---

The *Web Profiler for Backend Gateway* provides detailed profiling information for requests made from Yves to Zed through the Backend Gateway. This enables developers to debug and analyze the performance of backend gateway calls directly from the Yves Web Profiler interface.

The Web Profiler for Backend Gateway is based on *Symfony Profiler*. For details, see [Profiler documentation](https://symfony.com/doc/current/profiler.html).

## Prerequisites

Ensure that the following modules are installed with the specified versions:

- `spryker/web-profiler` version 1.6.5 or higher
- `spryker/zed-request` version 3.24.0 or higher

## Installation

If the required modules are not yet installed or need to be updated, run:

```bash
composer require spryker/web-profiler:^1.6.5 --dev
composer require spryker/zed-request:^3.24.0
```

## Integration

To use Web Profiler for Backend Gateway, ensure that Web Profiler is enabled for Yves. For details on enabling Web Profiler Widget for Yves, see [Integrate Web Profiler Widget for Yves](/docs/dg/dev/integrate-and-configure/integrate-development-tools/integrate-web-profiler-widget-for-yves.html).

**src/Pyz/Yves/WebProfilerWidget/WebProfilerWidgetDependencyProvider.php**

```php
<?php

namespace Pyz\Yves\WebProfilerWidget;

use Spryker\Yves\WebProfilerWidget\WebProfilerWidgetDependencyProvider as SprykerWebProfilerDependencyProvider;
use Spryker\Yves\ZedRequest\Plugin\WebProfiler\WebProfilerZedRequestDataCollectorPlugin;

class WebProfilerWidgetDependencyProvider extends SprykerWebProfilerDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\WebProfilerExtension\Dependency\Plugin\WebProfilerDataCollectorPluginInterface>
     */
    protected function getDataCollectorPlugins(): array
    {
        return [
            new WebProfilerZedRequestDataCollectorPlugin(),
        ];
    }
}
```

## Accessing Backend Gateway profiles

When a Yves page makes requests to the Backend Gateway, the Web Profiler automatically captures detailed profiles for each request.

### Viewing gateway request links

In the Yves Web Profiler toolbar, navigate to the Zed Requests section. Each Backend Gateway request displays a profile link that allows you to access the detailed execution profile for that specific request.

![Gateway profile link in Zed Requests](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/integrate-and-configure/Gateway+profile+link.png)

### Viewing gateway profile details

Clicking on the profile link opens the comprehensive Web Profiler view for the Backend Gateway request, showing:

![Detailed Backend Gateway profile](https://spryker.s3.eu-central-1.amazonaws.com/docs/dg/dev/integrate-and-configure/Gateway+profile.png)

### Additional profiling with XHProf

If the `xhprof` extension is enabled and the Profiler module is integrated, Backend Gateway profiles also include detailed performance profiling data through XHProf. This provides function-level performance analysis and call graphs.

For information on integrating the Profiler module, see [Integrate Profiler Module](/docs/dg/dev/integrate-and-configure/Integrate-profiler-module.html).