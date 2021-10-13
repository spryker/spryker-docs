---
title: Web Profiler for Zed
description: This guide describes how to integrate and use the Web Profiler toolbar available in Zed for development purposes.
template: howto-guide-template
originalLink: https://documentation.spryker.com/v5/docs/web-profiler
originalArticleId: 627b09f7-351b-4f3a-81d7-afd533c211d8
redirect_from:
  - /v5/docs/web-profiler
  - /v5/docs/en/web-profiler
related:
  - title: Web Profiler Widget for Yves
    link: docs/scos/dev/migration-and-integration/202001.0/development-tools/web-profiler-widget-for-yves.html
---

{% info_block errorBox %}

The following guide only demonstrates how to enable a development tool.

{% endinfo_block %}

The _Web Profiler_ provides a toolbar for debugging and informational purposes. The toolbar is located at the bottom of a loaded page.

Spryker Profiler is based on _Symfony Profiler_. For details, see [Profiler documentation](https://symfony.com/doc/current/profiler.html).

## Modules

The following modules provide the profiler functionality:

*   **WebProfilerWidget** -`spryker/web-profiler-widget`
*   **WebProfilerExtension** -`spryker/web-profiler-extension`

## Installation

Run the following command to install _WebProfilerWidget_ and the extension module:
```Bash
composer require spryker/web-profiler --dev
```

## Integration

To be able to use _Web Profiler_, add  `\Spryker\Zed\WebProfiler\Communication\Plugin\Application\WebProfilerApplicationPlugin`of the`spryker-shop/web-profiler-widget`module to `\Pyz\Zed\Application\ApplicationDependencyProvider::getApplicationPlugins()`.

## Configure the Web Profiler per Environment

The below options can be used in the Router to configure _WebProfiler_. The options are contained in `\Spryker\Shared\WebProfiler\WebProfilerConstants`.

*   `\Spryker\Shared\WebProfiler\WebProfilerConstants::IS_WEB_PROFILER_ENABLED`- use this option to enable/disable _Web Profiler_. By default, the widget is **disabled**.
*   `Spryker\Shared\WebProfiler\WebProfilerConstants::PROFILER_CACHE_DIRECTORY`- use this option to specify the path where the _Web Profiler_ stores its cache.

## Extending WebProfilerWidget

You can extend _WebProfiler_ with `\Spryker\Shared\WebProfilerExtension\Dependency\Plugin\WebProfilerDataCollectorPluginInterface`. The interface can be used for adding _Data Collectors_ to the profiler.

Individual _Data Collectors_ can be added to `\Pyz\Zed\WebProfiler\WebProfilerDependencyProvider::getDataCollectorPlugins()`.

Spryker provides a lot of build-in collectors. You can locate them in `WebProfiler/src/Spryker/Zed/WebProfiler/Communication/Plugin/WebProfiler/`.
