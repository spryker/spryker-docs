---
title: Install category CMS blocks
description: Learn how to install Spryker category CMS blocks into a Spryker project and show them on Category Pages.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/enabling-the-category-cms-block
originalArticleId: ee92c90c-e72e-415e-ab58-19089024d1b5
redirect_from:
  - /docs/scos/dev/technical-enhancements/enabling-the-category-cms-block.html
  - /docs/scos/dev/technical-enhancements/enabling-the-category-cms-blocks.html
  - /docs/scos/dev/technical-enhancement-integration-guides/integrating-category-cms-blocks.html
  - /docs/scos/dev/technical-enhancement-integration-guides/integrate-category-cms-blocks.html
  - /docs/pbc/all/content-management-system/202204.0/base-shop/install-and-upgrade/install-category-cms-blocks.html
related:
  - title: Upgrade the CmsBlock module
    link: docs/pbc/all/content-management-system/latest/base-shop/install-and-upgrade/upgrade-modules/upgrade-the-cmsblock-module.html
---

A category block is a CMS block that can be embedded into a category template.

To integrate the category blocks, follow the steps:

1. Install the `CmsBlockCategoryConnector` module using Composer:

```bash
composer require spryker/cms-block-category-connector:"^2.6.0"
```

2. To register the CMS block form plugin, add `CmsBlockCategoryFormPlugin` to the CMS Block GUI dependency provider:

**src/Pyz/Zed/CmsBlockGui/CmsBlockGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\CmsBlockGui;

use Spryker\Zed\CmsBlockCategoryConnector\Communication\Plugin\CmsBlockCategoryFormPlugin;
use Spryker\Zed\CmsBlockGui\CmsBlockGuiDependencyProvider as SprykerCmsBlockGuiDependencyProvider;

class CmsBlockGuiDependencyProvider extends SprykerCmsBlockGuiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\CmsBlockGui\Communication\Plugin\CmsBlockFormPluginInterface>
     */
    protected function getCmsBlockFormPlugins(): array
    {
        return array_merge(parent::getCmsBlockFormPlugins(), [
            new CmsBlockCategoryFormPlugin(),
        ]);
    }
}

```

3. To register the CMS block form handler plugin, add `CmsBlockCategoryConnectorUpdatePlugin` to the CMS Block dependency provider:

**src/Pyz/Zed/CmsBlock/CmsBlockDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\CmsBlock;

use Spryker\Zed\CmsBlock\CmsBlockDependencyProvider as SprykerCmsBlockDependencyProvider;
use Spryker\Zed\CmsBlockCategoryConnector\Communication\Plugin\CmsBlockCategoryConnectorUpdatePlugin;

class CmsBlockDependencyProvider extends SprykerCmsBlockDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\CmsBlockExtension\Dependency\Plugin\CmsBlockUpdatePluginInterface>
     */
    protected function getCmsBlockUpdatePlugins(): array
    {
        return array_merge(parent::getCmsBlockUpdatePlugins(), [
            new CmsBlockCategoryConnectorUpdatePlugin(),
        ]);
    }
}
```

4. Register the category relation update plugin:

**src/Pyz/Zed/Category/CategoryDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\Category;

use Spryker\Zed\Category\CategoryDependencyProvider as SprykerCategoryDependencyProvider;
use Spryker\Zed\CmsBlockCategoryConnector\Communication\Plugin\Category\CmsBlockCategoryCategoryRelationPlugin;

class CategoryDependencyProvider extends SprykerCategoryDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\CategoryExtension\Dependency\Plugin\CategoryRelationUpdatePluginInterface>
     */
    protected function getRelationUpdatePluginStack(): array
    {
        return array_merge(parent::getRelationUpdatePluginStack(), [
            new CmsBlockCategoryCategoryRelationPlugin(),
        ]);
    }
}
```

5. Register the category subform and category relation read plugins:

<details>
  <summary>src/Pyz/Zed/CategoryGui/CategoryGuiDependencyProvider.php</summary>

```php
<?php

namespace Pyz\Zed\CategoryGui;

use Spryker\Zed\CategoryGui\CategoryGuiDependencyProvider as SpykerCategoryGuiDependencyProvider;
use Spryker\Zed\CmsBlockCategoryConnector\Communication\Plugin\CategoryGui\CmsBlockCategoryRelationReadPlugin;
use Spryker\Zed\CmsBlockCategoryConnector\Communication\Plugin\CategoryGui\CmsBlockSubformCategoryFormPlugin;

/**
 * @method \Spryker\Zed\CategoryGui\CategoryGuiConfig getConfig()
 */
class CategoryGuiDependencyProvider extends SpykerCategoryGuiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\CategoryGuiExtension\Dependency\Plugin\CategoryFormPluginInterface>
     */
    protected function getCategoryFormPlugins(): array
    {
        return [
            new CmsBlockSubformCategoryFormPlugin(),
        ];
    }

    /**
     * @return array<\Spryker\Zed\CategoryGuiExtension\Dependency\Plugin\CategoryRelationReadPluginInterface>
     */
    protected function getCategoryRelationReadPlugins(): array
    {
        return [
            new CmsBlockCategoryRelationReadPlugin(),
        ];
    }
}
```

</details>

6. Optional: To show which categories a block is assigned to on the **View CMS Block** page, register the category list plugin by adding `CmsBlockCategoryListViewPlugin` to the CMS Block GUI dependency provider:

**src/Pyz/Zed/CmsBlockGui/CmsBlockGuiDependencyProvider.php**

```php
<?php

namespace Pyz\Zed\CmsBlockGui;

use Spryker\Zed\CmsBlockCategoryConnector\Communication\Plugin\CmsBlockCategoryListViewPlugin;
use Spryker\Zed\CmsBlockGui\CmsBlockGuiDependencyProvider as SprykerCmsBlockGuiDependencyProvider;

class CmsBlockGuiDependencyProvider extends SprykerCmsBlockGuiDependencyProvider
{
    /**
     * @return array<\Spryker\Zed\CmsBlockGui\Communication\Plugin\CmsBlockViewPluginInterface>
     */
    protected function getCmsBlockViewPlugins(): array
    {
        return array_merge(parent::getCmsBlockViewPlugins(), [
            new CmsBlockCategoryListViewPlugin(),
        ]);
    }
}
```

7. To show category CMS blocks on category pages, update the `catalog.twig` template:

```twig
{% raw %}{%{% endraw %} if category is defined {% raw %}%}{% endraw %}
	{% raw %}{{{% endraw %} spyCmsBlock({category: category.id_category}) {% raw %}}}{% endraw %}
{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
```

Now you can create category CMS blocks and add them to category pages. For instructions, see [Create category CMS blocks](/docs/pbc/all/content-management-system/latest/base-shop/manage-in-the-back-office/blocks/create-category-cms-blocks.html).

Also, you can [define custom positions for category blocks](/docs/pbc/all/content-management-system/latest/base-shop/tutorials-and-howtos/define-positions-for-category-cms-blocks.html).
