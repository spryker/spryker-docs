---
title: Integrate Web Profiler for Zed
description: This guide describes how to integrate and use the Web Profiler toolbar available in Zed for development purposes.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/web-profiler
originalArticleId: 9f24bafe-1bae-49f7-bd22-505a61629807
redirect_from:
  - /docs/scos/dev/technical-enhancement-integration-guides/integrating-development-tools/integrating-web-profiler-for-zed.html
  - /docs/scos/dev/migration-and-integration/202108.0/development-tools/web-profiler.html
related:
  - title: Integrating Formatter
    link: docs/dg/dev/integrate-and-configure/integrate-development-tools/integrate-formatter.html
  - title: Integrating SCSS linter
    link: docs/dg/dev/integrate-and-configure/integrate-development-tools/integrate-scss-linter.html
  - title: Integrating TS linter
    link: docs/dg/dev/integrate-and-configure/integrate-development-tools/integrate-ts-linter.html
  - title: Integrating Web Profiler Widget for Yves
    link: docs/dg/dev/integrate-and-configure/integrate-development-tools/integrate-web-profiler-widget-for-yves.html
---

The *Web Profiler* provides a toolbar for debugging and informational purposes. The toolbar is located at the bottom of a loaded page.

Spryker Profiler is based on *Symfony Profiler*. For details, see [Profiler documentation](https://symfony.com/doc/current/profiler.html).

## Modules

The following modules provide the profiler functionality:

- **WebProfilerWidget** -`spryker/web-profiler`
- **WebProfilerExtension** -`spryker/web-profiler-extension`

## Installation

Install *WebProfilerWidget* and the extension module:

```bash
composer require spryker/web-profiler --dev
```

## Integration

To be able to use *Web Profiler*, add  `\Spryker\Zed\WebProfiler\Communication\Plugin\Application\WebProfilerApplicationPlugin`of the`spryker-shop/web-profiler`module to `\Pyz\Zed\Application\ApplicationDependencyProvider::getApplicationPlugins()`.

## Configure the Web Profiler per Environment

The below options can be used in the Router to configure *WebProfiler*. The options are contained in `\Spryker\Shared\WebProfiler\WebProfilerConstants`.

- `\Spryker\Shared\WebProfiler\WebProfilerConstants::IS_WEB_PROFILER_ENABLED`- use this option to enable/disable *Web Profiler*. By default, the widget is **disabled**.
- `Spryker\Shared\WebProfiler\WebProfilerConstants::PROFILER_CACHE_DIRECTORY`- use this option to specify the path where the *Web Profiler* stores its cache.

## Extending WebProfilerWidget

You can extend *WebProfiler* with `\Spryker\Shared\WebProfilerExtension\Dependency\Plugin\WebProfilerDataCollectorPluginInterface`. The interface can be used for adding *Data Collectors* to the profiler.

Individual *Data Collectors* can be added to `\Pyz\Zed\WebProfiler\WebProfilerDependencyProvider::getDataCollectorPlugins()`.

Spryker provides a lot of build-in collectors. You can locate them in `WebProfiler/src/Spryker/Zed/WebProfiler/Communication/Plugin/WebProfiler/`.
