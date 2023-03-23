---
title: Integrate profiler module
description: Learn how to integrate profiler module
last_updated: March 22, 2023
template: howto-guide-template
---

This document describes how to integrate profiler module into a Spryker project.

## Prerequisites

To start the integration, review and install the necessary features:

| NAME         | VERSION          |
|--------------|------------------|
| Spryker Core | {{page.version}} |

## Enable extension

Enable xhprof extension to collect execution traces.

```yaml
version: '0.1'

namespace: spryker
tag: 'dev'

environment: docker.dev
image:
  tag: spryker/php:8.1
  php:
    enabled-extensions:
      - xhprof
```

## Bootstrap the docker setup

```shell
docker/sdk boot deploy.dev.yml
```

## Install the required modules using Composer

Ensure that the following modules have been updated:

| MODULE                   | EXPECTED DIRECTORY                        |
|--------------------------|-------------------------------------------|
| EventDispatcherExtension | vendor/spryker/event-dispatcher-extension |
| WebProfilerExtension     | vendor/spryker/web-profiler-extension     |

```shell
composer require --dev spryker/profiler
```

### Set up Behavior

1. Register the following plugins for `Yves` application:

| PLUGIN                                 | SPECIFICATION                                      | PREREQUISITES            | NAMESPACE                                                                                    |
|----------------------------------------|----------------------------------------------------|--------------------------|----------------------------------------------------------------------------------------------|
| ProfilerRequestEventDispatcherPlugin   | Starts collecting the data on request events.      | EventDispatcherExtension | Spryker\Zed\Profiler\Communication\Plugin\EventDispatcher                                    |
| WebProfilerProfilerDataCollectorPlugin | Shows the traces data in the web profiler toolbar. | WebProfilerExtension     | Spryker\Zed\Profiler\Communication\Plugin\WebProfiler\WebProfilerProfilerDataCollectorPlugin |


```php
<?php

namespace Pyz\Yves\EventDispatcher;

use Spryker\Yves\EventDispatcher\EventDispatcherDependencyProvider as SprykerEventDispatcherDependencyProvider;
use Spryker\Yves\Profiler\Plugin\EventDispatcher\ProfilerRequestEventDispatcherPlugin;


class EventDispatcherDependencyProvider extends SprykerEventDispatcherDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\EventDispatcherExtension\Dependency\Plugin\EventDispatcherPluginInterface>
     */
    protected function getEventDispatcherPlugins(): array
    {
        return [
            new ProfilerRequestEventDispatcherPlugin(),
        ];
    }
}
```

```php
<?php

namespace Pyz\Yves\WebProfilerWidget;

use Spryker\Yves\Profiler\Plugin\WebProfiler\WebProfilerProfilerDataCollectorPlugin;
use SprykerShop\Yves\WebProfilerWidget\WebProfilerWidgetDependencyProvider as SprykerWebProfilerDependencyProvider;

class WebProfilerWidgetDependencyProvider extends SprykerWebProfilerDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\WebProfilerExtension\Dependency\Plugin\WebProfilerDataCollectorPluginInterface>
     */
    public function getDataCollectorPlugins(): array
    {
        return [
            new WebProfilerProfilerDataCollectorPlugin(),
        ];
    }
}

```

2. Register the following plugins for `Zed` application:

| PLUGIN                                 | SPECIFICATION                                      | PREREQUISITES            | NAMESPACE                                                                                    |
|----------------------------------------|----------------------------------------------------|--------------------------|----------------------------------------------------------------------------------------------|
| ProfilerRequestEventDispatcherPlugin   | Starts collecting the data on request events.      | EventDispatcherExtension | Spryker\Zed\Profiler\Communication\Plugin\EventDispatcher                                    |
| WebProfilerProfilerDataCollectorPlugin | Shows the traces data in the web profiler toolbar. | WebProfilerExtension     | Spryker\Zed\Profiler\Communication\Plugin\WebProfiler\WebProfilerProfilerDataCollectorPlugin |

```php
<?php

namespace Pyz\Zed\EventDispatcher;

use Spryker\Zed\Profiler\Communication\Plugin\EventDispatcher\ProfilerRequestEventDispatcherPlugin;
use Spryker\Zed\EventDispatcher\EventDispatcherDependencyProvider as SprykerEventDispatcherDependencyProvider;

class EventDispatcherDependencyProvider extends SprykerEventDispatcherDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\EventDispatcherExtension\Dependency\Plugin\EventDispatcherPluginInterface>
     */
    protected function getEventDispatcherPlugins(): array
    {
        return [
            new ProfilerRequestEventDispatcherPlugin(),
        ];
    }
}
```

```php
<?php

namespace Pyz\Zed\WebProfiler;

use Spryker\Zed\Profiler\Communication\Plugin\WebProfiler\WebProfilerProfilerDataCollectorPlugin;
use Spryker\Zed\WebProfiler\WebProfilerDependencyProvider as SprykerWebProfilerDependencyProvider;

class WebProfilerDependencyProvider extends SprykerWebProfilerDependencyProvider
{
    /**
     * @return array<\Spryker\Shared\WebProfilerExtension\Dependency\Plugin\WebProfilerDataCollectorPluginInterface>
     */
    public function getDataCollectorPlugins(): array
    {
        return [
            new WebProfilerProfilerDataCollectorPlugin(),
        ];
    }
}
```