---
title: Migration Guide - CmsBlockWidget
description: Learn how to upgrade the CmsBlockWidget module to a certain version.
originalLink: https://documentation.spryker.com/v6/docs/migration-guide-cmsblockwidget
originalArticleId: 7b255539-bc8f-4f94-8860-98fa8e206465
redirect_from:
  - /v6/docs/migration-guide-cmsblockwidget
  - /v6/docs/en/migration-guide-cmsblockwidget
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

1. Upgrade the `CmsBlock` module to version 3.0.0. See  [Migration Guide - CmsBlock](/docs/scos/dev/module-migration-guides/{{page.version}}/migration-guide-cmsblock.html#upgrading-from-version-2---to-version-3--).
2. Upgrade the `CmsBlockStorage` module to version 2.0.0. See [Migration Guide - CmsBlockStorage](/docs/scos/dev/module-migration-guides/{{page.version}}/migration-guide-cmsblockstorage.html#upgrading-from-version-1-to-version-2).
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
