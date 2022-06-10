


## Prerequisites

[Integrate category CMS blocks](/docs/scos/dev/technical-enhancement-integration-guides/integrate-category-cms-blocks.html)



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

```twig
{% raw %}{{{% endraw %} spyCmsBlock({category: category.id_category, position: 'top'}) {% raw %}}}{% endraw %}
```
