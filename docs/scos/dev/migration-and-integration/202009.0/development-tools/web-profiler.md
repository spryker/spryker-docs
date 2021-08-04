---
title: Web Profiler for Zed
originalLink: https://documentation.spryker.com/v6/docs/web-profiler
redirect_from:
  - /v6/docs/web-profiler
  - /v6/docs/en/web-profiler
---

{% info_block errorBox %}

The following guide only demonstrates how to enable a development tool.

{% endinfo_block %}

The _Web Profiler_ provides a toolbar for debugging and informational purposes. The toolbar is located at the bottom of a loaded page.

Spryker Profiler is based on _Symfony Profiler_. For details, see [Profiler documentation](https://symfony.com/doc/current/profiler.html){target="_blank"}.

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
