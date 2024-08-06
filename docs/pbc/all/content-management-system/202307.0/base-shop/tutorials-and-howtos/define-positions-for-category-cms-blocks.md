---
title: Define positions of category CMS blocks
description: Use the guide to customize the content field size in the CMS module.
last_updated: Jun 16, 2021
template: howto-guide-template
related:
  - title: CMS blocks overview
    link: docs/pbc/all/content-management-system/page.version/base-shop/cms-feature-overview/cms-blocks-overview.html
redirect_from:
  - /docs/scos/dev/tutorials-and-howtos/howtos/howto-define-positions-for-category-cms-blocks.html
  - /docs/pbc/all/content-management-system/202307.0/tutorials-and-howtos/howto-define-positions-for-category-cms-blocks.html
  - /docs/pbc/all/content-management-system/202307.0/base-shop/tutorials-and-howtos/howto-define-positions-for-category-cms-blocks.html
---


Usually, you don't want to change Twig templates for each block assignment, but still be able to manage blocks in the Back Office. In this case, you can use predefined positions.

You can predefine standard places in your Twig templates once and then manage blocks based on relations to categories and position. For example, you could define "header", "body", and "footer" positions to manage blocks in those places independently.

By default, we provide the following positions: "Top", "Middle", "Bottom". To define custom positions, follow the steps below.


## Prerequisites

[Install category CMS blocks](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/install-and-upgrade/install-category-cms-blocks.html)


## Configure custom block positions

 1. Extend `CmsBlockCategoryConnectorConfig` on the project level and override the method `getCmsBlockCategoryPositionList` as in the example below:

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

2. To update the list of positions for blocks on a category page, execute `Spryker\Zed\CmsBlockCategoryConnector\Business\CmsBlockCategoryConnectorFacade::syncCmsBlockCategoryPosition()` at least once. For example on CMS Block Category importer.

Now, you can use the block with the specified position:

```twig
{% raw %}{{{% endraw %} spyCmsBlock({category: category.id_category, position: 'top'}) {% raw %}}}{% endraw %}
```
