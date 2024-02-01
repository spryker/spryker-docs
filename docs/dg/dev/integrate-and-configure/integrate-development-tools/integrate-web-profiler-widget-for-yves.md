---
title: Integrate Web Profiler Widget for Yves
description: This guide describes how to integrate and use the Web Profiler Widget available in Yves for development purposes.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/web-profiler-widget
originalArticleId: 3a38050f-46db-446a-a4ff-80129759a861
redirect_from:
  - /docs/scos/dev/technical-enhancement-integration-guides/integrating-development-tools/integrating-web-profiler-widget-for-yves.html
  - /docs/scos/dev/migration-and-integration/202108.0/development-tools/web-profiler-widget
related:
  - title: Web Profiler for Zed
    link: docs/scos/dev/technical-enhancement-integration-guides/integrating-development-tools/integrating-web-profiler-for-zed.html
  - title: Integrating Formatter
    link: docs/scos/dev/technical-enhancement-integration-guides/integrating-development-tools/integrating-formatter.html
  - title: Integrating SCSS linter
    link: docs/scos/dev/technical-enhancement-integration-guides/integrating-development-tools/integrating-scss-linter.html
  - title: Integrating TS linter
    link: docs/scos/dev/technical-enhancement-integration-guides/integrating-development-tools/integrating-ts-linter.html
  - title: Integrating Web Profiler for Zed
    link: docs/scos/dev/technical-enhancement-integration-guides/integrating-development-tools/integrating-web-profiler-for-zed.html
---

The _Web Profiler Widget_ provides a toolbar for debugging and for informational purposes. The toolbar is located at the bottom of a loaded page.

The widget is based on _Symfony Profiler_. For details, see [Profiler documentation](https://symfony.com/doc/current/profiler.html).

## Modules

The following modules provide the profiler functionality:

*   **WebProfilerWidget** -`spryker-shop/web-profiler-widget`
*   **WebProfilerExtension** -`spryker/web-profiler-extension`

## Installation

Run the following command to install _WebProfilerWidget_ and the extension module:
```bash
composer require spryker-shop/web-profiler-widget --dev
```
## Integration

To be able to use the _Web Profiler Widget_, add `\SprykerShop\Yves\WebProfilerWidget\Plugin\Application\WebProfilerApplicationPlugin`of the`spryker-shop/web-profiler-widget`module to `\Pyz\Yves\ShopApplication\ShopApplicationDependencyProvider::getApplicationPlugins()`.

## Configure WebProfilerWidget per environment

The below options can be used in the Router to configure _WebProfilerWidget_. The options are contained in `\SprykerShop\Shared\WebProfilerWidget\WebProfilerWidgetConstants`.

*   `\SprykerShop\Shared\WebProfilerWidget\WebProfilerWidgetConstants::IS_WEB_PROFILER_ENABLED`\- use this option to enable/disable _WebProfilerWidget_. By default, the widget is disabled.
*   `\SprykerShop\Shared\WebProfilerWidget\WebProfilerWidgetConstants::PROFILER_CACHE_DIRECTORY`\- use this option to specify the path where the _WebProfiler_ stores its cache.

## Extending WebProfilerWidget

You can extend _WebProfiler_ with the `\Spryker\Shared\WebProfilerExtension\Dependency\Plugin\WebProfilerDataCollectorPluginInterface` interface. It can be used for adding _Data Collectors_ to the profiler.

Individual _Data Collectors_ can be added to `\Pyz\Yves\WebProfilerWidget\WebProfilerWidgetDependencyProvider::getDataCollectorPlugins()`.

Spryker provides a lot of build-in collectors. You can locate them in `WebProfilerWidget/src/SprykerShop/Yves/WebProfilerWidget/Plugin/WebProfiler/`.

### Additional collectors
Starting from version 3.17.0, the `spryker/zed-request` module allows you to collect data about all the requests to Zed sent from Yves.
To enable the data collection, add `\Spryker\Yves\ZedRequest\Plugin\WebProfiler\WebProfilerZedRequestDataCollectorPlugin` to the stack returned by `\Pyz\Yves\WebProfilerWidget\WebProfilerWidgetDependencyProvider::getDataCollectorPlugins()`.

If you are using Redis as storage, you can track the calls to it as well. Starting from the `redis` version 2.4.0, the new data collector plugin `\Spryker\Yves\Redis\Plugin\WebProfiler\WebProfilerRedisDataCollectorPlugin` is available for that matter. To track calls to Redis, add this plugin to  `\Pyz\Yves\WebProfilerWidget\WebProfilerWidgetDependencyProvider::getDataCollectorPlugins()`.

Same goes for Elasticsearch. Make sure your version of `spryker/search-elasticsearch` is 1.8.0 and add `\Spryker\Yves\SearchElasticsearch\Plugin\WebProfiler\WebProfilerElasticsearchDataCollectorPlugin` to  `\Pyz\Yves\WebProfilerWidget\WebProfilerWidgetDependencyProvider::getDataCollectorPlugins()` to track calls to Elasticsearch.
