---
title: Integrating category CMS blocks
description: The guide describes the process of installing the Category CMS Block in your project.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/enabling-the-category-cms-block
originalArticleId: ee92c90c-e72e-415e-ab58-19089024d1b5
redirect_from:
  - /2021080/docs/enabling-the-category-cms-block
  - /2021080/docs/en/enabling-the-category-cms-block
  - /docs/enabling-the-category-cms-block
  - /docs/en/enabling-the-category-cms-block
  - /docs/scos/dev/technical-enhancements/enabling-the-category-cms-block.html
  - /docs/scos/dev/technical-enhancements/enabling-the-category-cms-blocks.html
related:
  - title: Migration Guide - CMS Block
    link: docs/scos/dev/module-migration-guides/migration-guide-cmsblock.html
---

This document describes how to enable category CMS blocks. A category block is a CMS block that can be embedded into a category template.

To enable the Category CMS Block in your project, follow the steps:

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

4. Register the category relation update plugin.

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

5. Register the category subform and category relation read plugins.

**src/Pyz/Zed/CategoryGui/CategoryGuiDependencyProvider.php**

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

6. Optional: To show which categories a block is assigned to on the **View CMS Block
** page, register the category list plugin by adding `CmsBlockCategoryListViewPlugin` to the CMS Block GUI dependency provider:

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

**To configure the block:**

1. In the Backoffice, go to the Content section and navigate to the Blocks section.
2. Click Create Block to create a new block.
3. From the template drop-down, select the "Title and description block" template and name the new block.
4. Select the Categories in the "Categories: Top", "Categories: Middle" and "Categories: Bottom" fields. While typing, the product search will offer suggestions from the product list.
5. After clicking **Save**, you will be prompted to provide content per locale for the placeholders in the Twig template.
6. Set the block to active to use it straight away.
7. Embed the block into the category page by adding the following code in the `catalog.twig` template:

```twig
{% raw %}{%{% endraw %} if category is defined {% raw %}%}{% endraw %}
	{% raw %}{{{% endraw %} spyCmsBlock({category: category.id_category}) {% raw %}}}{% endraw %}
{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
```

8. To see the page in Yves, the client data storage (Redis) must be up-to-date. This is handled through `cronjobs` (command `console queue:worker:start`).

**To configure block positions**

Usually you don't want to change Twig templates for each block assignment, but still be able to manage CMS Blocks from Zed GUI. In this case we recommend to use positioning.

CMS Block positioning means that you can predefine some of the useful places in your Twig templates once and then manage your CMS Blocks based on relations to categories and position. For example, you could define "header", "body", "footer" positions to manage your CMS Blocks in those places independently.

By default, we provide the following positions: "Top", "Middle", "Bottom". To change them, extend `CmsBlockCategoryConnectorConfig` on a project level and override the method `getCmsBlockCategoryPositionList` as in the example below.

**src/Pyz/Zed/CmsBlockCategoryConnector/CmsBlockCategoryConnectorConfig.php**

```php
<?php

namespace Pyz\Zed\CmsBlockCategoryConnector;

use Spryker\Zed\CmsBlockCategoryConnector\CmsBlockCategoryConnectorConfig as SprykerCmsBlockCategoryConnectorConfig;

class CmsBlockCategoryConnectorConfig extends SprykerCmsBlockCategoryConnectorConfig
{
	const CMS_BLOCK_CATEGORY_POSITION_TOP = 'Top';
	const CMS_BLOCK_CATEGORY_POSITION_MIDDLE = 'Middle';
	const CMS_BLOCK_CATEGORY_POSITION_BOTTOM = 'Bottom';

	/**
     * @return array
     */
    public function getCmsBlockCategoryPositionList()
    {
        return [
            static::CMS_BLOCK_CATEGORY_POSITION_TOP,
            static::CMS_BLOCK_CATEGORY_POSITION_MIDDLE,
            static::CMS_BLOCK_CATEGORY_POSITION_BOTTOM,
        ];
    }

}
```

Run position sync:

To update a list of positions for CMS Blocks on a category page, execute at least once the `Spryker\Zed\CmsBlockCategoryConnector\Business\CmsBlockCategoryConnectorFacade::syncCmsBlockCategoryPosition()` (e.g. on CMS Block Category importer)).

Now, you can use the block with the specified position:

```bash
{% raw %}{{{% endraw %} spyCmsBlock({category: category.id_category, position: 'top'}) {% raw %}}}{% endraw %}
```
