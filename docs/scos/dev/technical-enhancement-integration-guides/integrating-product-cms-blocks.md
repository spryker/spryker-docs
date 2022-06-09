---
title: Integrating product CMS blocks
description: The guide describes the process of installing the Product CMS Block into your project.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/enabling-the-product-cms-block
originalArticleId: 2fd5636b-9196-4a11-8191-4a97dc7a4406
redirect_from:
  - /2021080/docs/enabling-the-product-cms-block
  - /2021080/docs/en/enabling-the-product-cms-block
  - /docs/enabling-the-product-cms-block
  - /docs/en/enabling-the-product-cms-block
  - /docs/scos/dev/technical-enhancements/enabling-the-product-cms-block.html
related:
  - title: CMS Block
    link: docs/scos/user/features/page.version/cms-feature-overview/cms-blocks-overview.html
  - title: Creating CMS Blocks
    link: docs/scos/user/back-office-user-guides/page.version/content/blocks/creating-cms-blocks.html
  - title: Managing CMS Blocks
    link: docs/scos/user/back-office-user-guides/page.version/content/blocks/managing-cms-blocks.html
  - title: Migration Guide - CMS Block
    link: docs/scos/dev/module-migration-guides/migration-guide-cmsblock.html
  - title: Migration Guide - CMS Block GUI
    link: docs/scos/dev/module-migration-guides/migration-guide-cmsblockgui.html
---

Product CMS blocks are embedded in the product template, and you can specify the exact product pages to show the block on.

To integrate product CMS block, follow the steps:

1. Install the CMS Block Product Connector module using Composer: 

```bash
composer require spryker/cms-block-product-connector:"^1.4.0"
```

2. To register the CMS block form plugin, add `CmsBlockProductAbstractFormPlugin` to the CMS block GUI dependency provider:

**src/Pyz/Zed/CmsBlockGui/CmsBlockGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\CmsBlockGui;

use Spryker\Zed\CmsBlockGui\CmsBlockGuiDependencyProvider as SprykerCmsBlockGuiDependencyProvider;
use Spryker\Zed\CmsBlockProductConnector\Communication\Plugin\CmsBlockProductAbstractFormPlugin;

class CmsBlockGuiDependencyProvider extends SprykerCmsBlockGuiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\CmsBlockGui\Communication\Plugin\CmsBlockFormPluginInterface>
     */
    protected function getCmsBlockFormPlugins(): array
    {
        return array_merge(parent::getCmsBlockFormPlugins(), [
            new CmsBlockProductAbstractFormPlugin(),
        ]);
    }
}
```

3. To register the CMS block form handler plugin, add `CmsBlockProductAbstractUpdatePlugin` to the CMS Block dependency provider:

**src/Pyz/Zed/CmsBlock/CmsBlockDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\CmsBlock;

use Spryker\Zed\CmsBlock\CmsBlockDependencyProvider as SprykerCmsBlockDependencyProvider;
use Spryker\Zed\CmsBlockProductConnector\Communication\Plugin\CmsBlockProductAbstractUpdatePlugin;

class CmsBlockDependencyProvider extends SprykerCmsBlockDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\CmsBlockExtension\Dependency\Plugin\CmsBlockUpdatePluginInterface>
     */
    protected function getCmsBlockUpdatePlugins(): array
    {
        return array_merge(parent::getCmsBlockUpdatePlugins(), [
            new CmsBlockProductAbstractUpdatePlugin(),
        ]);
    }
}
```

4. Optional: To show which product abstracts are assigned to a block on a block view page, register the product list plugin by adding `CmsBlockProductAbstractListViewPlugin` to the CMS Block GUI dependency provider:

**src/Pyz/Zed/CmsBlockGui/CmsBlockGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\CmsBlockGui;

use Spryker\Zed\CmsBlockGui\CmsBlockGuiDependencyProvider as SprykerCmsBlockGuiDependencyProvider;
use Spryker\Zed\CmsBlockProductConnector\Communication\Plugin\CmsBlockProductAbstractListViewPlugin;

class CmsBlockGuiDependencyProvider extends SprykerCmsBlockGuiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\CmsBlockGui\Communication\Plugin\CmsBlockViewPluginInterface>
     */
    protected function getCmsBlockViewPlugins(): array
    {
        return array_merge(parent::getCmsBlockViewPlugins(), [
            new CmsBlockProductAbstractListViewPlugin(),
        ]);
    }
}

```

5. Optional: To show which blocks are assigned to a product on a product abstract view page, register the block list to the product abstract view by adding `CmsBlockProductAbstractBlockListViewPlugin` to the Product Management dependency provider:

**src/Pyz/Zed/ProductManagement/ProductManagementDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\ProductManagement;

use Spryker\Zed\CmsBlockProductConnector\Communication\Plugin\CmsBlockProductAbstractBlockListViewPlugin;
use Spryker\Zed\ProductManagement\ProductManagementDependencyProvider as SprykerProductManagementDependencyProvider;

class ProductManagementDependencyProvider extends SprykerProductManagementDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\ProductManagement\Communication\Plugin\ProductAbstractViewPluginInterface>
     */
    protected function getProductAbstractViewPlugins(): array
    {
        return [
            new CmsBlockProductAbstractBlockListViewPlugin(),
        ];
    }
}

```
