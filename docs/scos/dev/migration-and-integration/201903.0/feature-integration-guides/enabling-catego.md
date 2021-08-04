---
title: Installing the Category CMS Blocks
originalLink: https://documentation.spryker.com/v2/docs/enabling-category-cms-block
redirect_from:
  - /v2/docs/enabling-category-cms-block
  - /v2/docs/en/enabling-category-cms-block
---

Category blocks are blocks that can be embedded into the category template.
To enable the Category CMS Block in your project, do the following:
1. Install CMS Block Category Connector module by composer. 

```bash
"spryker/cms-block-category-connector": "^2.0.0"
```

2. Register the CMS block form plugin.
3. Add `CmsBlockCategoryFormPlugin` to the CMS Block GUI dependency provider (`\Pyz\Zed\CmsBlockGui\CmsBlockGuiDependencyProvider`).

```php
<?php
namespace Pyz\Zed\CmsBlockGui;

use Spryker\Zed\CmsBlockCategoryConnector\Communication\Plugin\CmsBlockCategoryFormPlugin;

class CmsBlockGuiDependencyProvider extends CmsBlockGuiCmsBlockGuiDependencyProvider
	{
	/**
	 * @return array
	 */
	protected function getCmsBlockFormPlugins()
	{
		return = array_merge(parent::getCmsBlockFormPluginsq(), [
			new CmsBlockCategoryFormPlugin(),
		]);
	}
}
```

4. Register the CMS block form the handler plugin.
5. Add `CmsBlockCategoryConnectorUpdatePlugin` to the CMS Block dependency provider (`Pyz\Zed\CmsBlock\CmsBlockDependencyProvider`).

```php
<?php
namespace Pyz\Zed\CmsBlock;

use Spryker\Zed\CmsBlockCategoryConnector\Communication\Plugin\CmsBlockCategoryConnectorUpdatePlugin;


class CmsBlockDependencyProvider extends CmsBlockCmsBlockDependencyProvider
{
	protected function getCmsBlockUpdatePlugins()
	{
		return array_merge(parent::getCmsBlockUpdatePlugins(), [
			new CmsBlockCategoryConnectorUpdatePlugin()
		]);
	}
}
```

6. Register collector plugin: add `CmsBlockCategoryConnectorCollectorPlugin` to the Collector dependency provider (`\Pyz\Zed\Collector\CollectorDependencyProvider`).

```php
<?php
namespace Pyz\Zed\Collector;
...

class CollectorDependencyProvider extends SprykerCollectorDependencyProvider
{
	public function provideBusinessLayerDependencies(Container $container)
	{
		...

		$container[self::STORAGE_PLUGINS] = function (Container $container) {
			return [
				...
				CmsBlockCategoryConnectorConstants::RESOURCE_TYPE_CMS_BLOCK_CATEGORY_CONNECTOR => new CmsBlockCategoryConnectorCollectorPlugin(),
			];
		};
	}
}
```

7. Register Category form and form handler plugins.

```php
<?php
namespace Pyz\Zed\CmsBlockGui;

...

class CategoryDependencyProvider extends SprykerDependencyProvider
{
	...
	/**
     * @return \Spryker\Zed\Category\Dependency\Plugin\CategoryRelationUpdatePluginInterface[]
     */
    protected function getRelationUpdatePluginStack()
    {
        return array_merge(
            [
				...
                new CategoryFormPlugin(),
            ],
            parent::getRelationUpdatePluginStack()
        );
    }

	/**
     * @return array
     */
    protected function getCategoryFormPlugins()
    {
        return array_merge(parent::getCategoryFormPlugins(), [
			...
            new CategoryFormPlugin()
        ]);
    }
}
```

8. Register the category list plugin (optional): To show which categories are assigned to a block on a block view page, add `CmsBlockCategoryListViewPlugin` to the CMS Block GUI dependency provider.

```
<?php
namespace Pyz\Zed\CmsBlockGui;

...

class CmsBlockGuiDependencyProvider extends CmsBlockGuiCmsBlockGuiDependencyProvider
{
	...

	/**
	* @return array
	*/
	protected function getCmsBlockViewPlugins()
	{
		return array_merge(parent::getCmsBlockViewPlugins(), [
			new CmsBlockCategoryListViewPlugin(),
		]);
	}
}
```

9. Register the CMS block form the handler plugin.
10. Add `CmsBlockCategoryConnectorUpdatePlugin` to the CMS Block dependency provider : (`Pyz\Zed\CmsBlock\CmsBlockDependencyProvider`).

```php
		<?php
namespace Pyz\Zed\CmsBlock;

use Spryker\Zed\CmsBlockCategoryConnector\Communication\Plugin\CmsBlockCategoryConnectorUpdatePlugin;


class CmsBlockDependencyProvider extends CmsBlockCmsBlockDependencyProvider
{
	protected function getCmsBlockUpdatePlugins()
	{
		return array_merge(parent::getCmsBlockUpdatePlugins(), [
			new CmsBlockCategoryConnectorUpdatePlugin()
		]);
	}
}
```

11. Register collector plugin: add `CmsBlockCategoryConnectorCollectorPlugin` to the Collector dependency provider (`\Pyz\Zed\Collector\CollectorDependencyProvider`).

```php
<?php
namespace Pyz\Zed\Collector;
...

class CollectorDependencyProvider extends SprykerCollectorDependencyProvider
{
	public function provideBusinessLayerDependencies(Container $container)
	{
		...

		$container[self::STORAGE_PLUGINS] = function (Container $container) {
			return [
				...
				CmsBlockCategoryConnectorConstants::RESOURCE_TYPE_CMS_BLOCK_CATEGORY_CONNECTOR => new CmsBlockCategoryConnectorCollectorPlugin(),
			];
		};
	}
}
```

12. Register Category form and form handler plugins.

```php
<?php
namespace Pyz\Zed\CmsBlockGui;

...

class CategoryDependencyProvider extends SprykerDependencyProvider
{
	...
	/**
     * @return \Spryker\Zed\Category\Dependency\Plugin\CategoryRelationUpdatePluginInterface[]
     */
    protected function getRelationUpdatePluginStack()
    {
        return array_merge(
            [
				...
                new CategoryFormPlugin(),
            ],
            parent::getRelationUpdatePluginStack()
        );
    }

	/**
     * @return array
     */
    protected function getCategoryFormPlugins()
    {
        return array_merge(parent::getCategoryFormPlugins(), [
			...
            new CategoryFormPlugin()
        ]);
    }
}
```

13. Register the category list plugin (optional): To show which categories are assigned to a block on a block view page, add `CmsBlockCategoryListViewPlugin` to the CMS Block GUI dependency provider.

```php
<?php
namespace Pyz\Zed\CmsBlockGui;

...

class CmsBlockGuiDependencyProvider extends CmsBlockGuiCmsBlockGuiDependencyProvider
{
	...

	/**
	* @return array
	*/
	protected function getCmsBlockViewPlugins()
	{
		return array_merge(parent::getCmsBlockViewPlugins(), [
			new CmsBlockCategoryListViewPlugin(),
		]);
	}
}
```

<!--
### Usage for Demoshop

Adding a template for the new block is done in the same way as for static blocks.

Create a new Twig template under the `src/Pyz/Yves/CmsBlock/Theme/default/template/` folder. We'll call it `categorySale.twig` and it will have the following structure :

```php
<!-- CMS_BLOCK_PLACEHOLDER : "saleMessage" -->
<!-- CMS_BLOCK_PLACEHOLDER : "saleInterval" -->
<!--<blockquote>
	{% raw %}{{{% endraw %} spyCmsBlockPlaceholder('saleMessage') | raw {% raw %}}}{% endraw %}

	<footer>
		{% raw %}{{{% endraw %} spyCmsBlockPlaceholder('saleInterval') | raw {% raw %}}}{% endraw %}
	</footer>
</blockquote>
```
-->
**To configure the block:**
1. In the Zed UI, go to the CMS section  and navigate to the blocks section.
2. Click Create CMS Block to create a new block. 
3. From the template drop-down, select the new template and  name the new block.
4. Set the "Category" and enter the category URL in the Category field. While typing, the product  search will offer suggestions from the product list.
5. View on a CMS Block edit page.

6. View on a Category edit page.
       

7. Set the block to active to use it straight away.
8. After clicking **Save**, you will be prompted to provide glossary keys for the placeholders  included in the Twig template. 
9. Embed the block into the category page by adding the following code in the `catalog.twig` template:

```
{% raw %}{%{% endraw %} if category is defined {% raw %}%}{% endraw %}
	{% raw %}{{{% endraw %} spyCmsBlock({category: category.id}) {% raw %}}}{% endraw %}
{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
```
10. To see the page in Yves, the client data storage (Redis) must be up-to-date. This is handled through `cronjobs`.
11. To manually execute this step,  run the collectors to update the frontend data storage:

```bash
vendor/bin/console collector:storage:export
```

**To configure block positions**
Usually you don't want to change Twig templates for each block assignment, but still be able to manage CMS Blocks from Zed GUI. In this case we recommend to use positioning.
        
CMS Block positioning means that you can predefine some of the useful places in your Twig templates once and then manage your CMS Blocks based on relations to categories and position. For example, you could define "header", "body", "footer" positions to manage your CMS Blocks in those places independently.
        
 By default we provide the following positions: "Top", "Middle", "Bottom", but you can easily change them in the module configuration on a project level (put your extension of `CmsBlockCategoryConnectorConfig` with the replaced method `getCmsBlockCategoryPositionList` to `Pyz\Zed\CmsBlockCategoryConnector\CmsBlockCategoryConnectorConfig` as in the example below).

```php
<?php

namespace Pyz\Zed\CmsBlockCategoryConnector;

...

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
{% raw %}{{{% endraw %} spyCmsBlock({category: category.id, position: 'top'}) {% raw %}}}{% endraw %}
```

**Results:**

After running the collectors you should be able to see the block only on the page for which you configured it to be shown.

<!--**See also:**

* [Learn what CMS blocks are and what they are needed for](https://documentation.spryker.com/capabilities/cms/cms_block/cms-block.htm)
* [Learn how to migrate to a newer version of CMS Block](https://documentation.spryker.com/module_migration_guides/mg-cms-block.htm)
* Learn about multi-store CMS block functionality and how to enable it
* Learn about product blocks and how to enable them
            
_Last review date: Feb 15, 2019_
-->
[//]: # (by Denis Tukrov, Anastasija Datsun)
