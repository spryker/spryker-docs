---
title: Migration guide - CmsBlockWidget
description: Learn how to upgrade the CmsBlockWidget module to a certain version.
last_updated: Jun 16, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/migration-guide-cmsblockwidget
originalArticleId: 0e61cf4b-5360-404d-93f0-312f32e022c8
redirect_from:
  - /2021080/docs/migration-guide-cmsblockwidget
  - /2021080/docs/en/migration-guide-cmsblockwidget
  - /docs/migration-guide-cmsblockwidget
  - /docs/en/migration-guide-cmsblockwidget
  - /v4/docs/migration-guide-cmsblockwidget
  - /v4/docs/en/migration-guide-cmsblockwidget
  - /v5/docs/migration-guide-cmsblockwidget
  - /v5/docs/en/migration-guide-cmsblockwidget
  - /v6/docs/migration-guide-cmsblockwidget
  - /v6/docs/en/migration-guide-cmsblockwidget
  - /docs/scos/dev/module-migration-guides/202001.0/migration-guide-cmsblockwidget.html
  - /docs/scos/dev/module-migration-guides/202005.0/migration-guide-cmsblockwidget.html
  - /docs/scos/dev/module-migration-guides/202009.0/migration-guide-cmsblockwidget.html
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-cmsblockwidget.html
---

## Upgrading from Version 1.* to Version 2.*

In the CmsBlockWidget module version 2.0.0, we have:

*     updated `CmsBlockWidgetTwigPlugin` with the support of getting CMS blocks by keys and names;
*     increased the version of `spryker/cms-block-storage` in `composer.json`;
*     removed the `TwigCmsBlock` plugin;
*     introduced `CmsBlockWidgetToCmsBlockStorageClient::findBlocksByKeys()` that finds blocks by keys;
*     introduced `CmsBlockWidgetToCmsBlockStorageClient::findBlockKeysByOptions()` that finds block keys by provided options;
*     deprecated `CmsBlockWidgetToCmsBlockStorageClient::findBlocksByNames()`;
*     removed `CmsBlockWidgetToCmsBlockStorageClient::findBlockNamesByOptions()`;
*     removed `CmsBlockWidgetToCmsBlockStorageClient::generateBlockNameKey()`.
***
**Upgrade to the new version of the module:**

1. Upgrade the `CmsBlock` module to version 3.0.0. See  [Migration Guide - CmsBlock](/docs/scos/dev/module-migration-guides/migration-guide-cmsblock.html#upgrading-from-version-2-to-version-3).
2. Upgrade the `CmsBlockStorage` module to version 2.0.0. See [Migration Guide - CmsBlockStorage](/docs/scos/dev/module-migration-guides/migration-guide-cmsblockstorage.html#upgrading-from-version-1-to-version-2).
3. Upgrade the `CmsBlockWidget` module to version 2.0.0:
```bash
composer require spryker-shop/cms-block-widget:"^2.0.0" --update-with-dependencies
```

The new version of the `CmsBlockWidget` module implements the `spyCmsBlock` widget that gets data by CMS block keys.You can still use the widget that gets data by CMS block names, e.g. `{% raw %}{{{% endraw %} spyCmsBlock(name: 'Block name') {% raw %}}}{% endraw %}`. However, this will cause two separate storage requests to be created in the back end. The first gets mapped keys by CMS block names while the second uses those keys to get CMS blocks. Also, if a widget has both `key` and `name` parameters, the `key` parameter is processed first.

**Use the new widget:**

1. with the `key` parameter:
```twig
{% raw %}{{{% endraw %} spyCmsBlock(keys: ['blck-1']) {% raw %}}}{% endraw %}
```
2. with the `name` parameter (deprecated functionality):
```twig
{% raw %}{{{% endraw %} spyCmsBlock(name: 'Block name') {% raw %}}}{% endraw %}
```
3. with the `category` and `position` parameters:
```twig
{% raw %}{{{% endraw %} spyCmsBlock({ category: category_id, position: 'top' }) {% raw %}}}{% endraw %}
```
4. with the `product` parameter:
```twig
{% raw %}{{{% endraw %} spyCmsBlock({ product: product_id }) {% raw %}}}{% endraw %}
```

*Estimated migration time: 30m-1h*
