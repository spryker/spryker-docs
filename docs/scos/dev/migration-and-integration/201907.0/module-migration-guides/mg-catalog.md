---
title: Migration Guide - Catalog
originalLink: https://documentation.spryker.com/v3/docs/mg-catalog
redirect_from:
  - /v3/docs/mg-catalog
  - /v3/docs/en/mg-catalog
---

## Upgrading from Version 3.* to Version 4.*

Due to introducing the Suggestion Search feature, the Catalog bundle now requires Search >=5.2.
To upgrade from 3.* to 4.\*:
1. Before upgrading to the new version, make sure that you do not use any deprecated code from version 3.\*. Check the description of the deprecated code to see what you will need to use instead.
2. In the previous version `\Spryker\Client\Catalog\CatalogDependencyProvider` provided by default a stack of query expander and a stack of result formatter plugins for the `\Spryker\Client\Catalog\CatalogClient::catalogSearch()` method. In the new version you need to provide the necessary plugins from project level instead in: `\Pyz\Client\Catalog\CatalogDependencyProvider`.
