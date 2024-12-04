---
title: Install product CMS blocks
description: Learn how to install Spryker Cloud Commerce OS product CMS blocks into a Spryker project.
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
  - /docs/scos/dev/technical-enhancement-integration-guides/integrating-product-cms-blocks.html
  - /docs/scos/dev/technical-enhancement-integration-guides/integrate-product-cms-blocks.html
  - /docs/pbc/all/content-management-system/202204.0/base-shop/install-and-upgrade/install-product-cms-blocks.html
---

Product blocks are CMS blocks that are embedded in the product template and rendered on product details pages of selected products.

To integrate product blocks, follow the steps:

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

4. Optional: To show which abstract products a blocks is assigned to on the **View CMS Block** page, register the product list plugin by adding `CmsBlockProductAbstractListViewPlugin` to the CMS Block GUI dependency provider:

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

5. Optional: To show which blocks an abstract product is assigned to on the **View Product Abstract** page, add `CmsBlockProductAbstractBlockListViewPlugin` to the Product Management dependency provider:

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

6. To show product CMS blocks on product details pages, add the following to the pages' template:

```twig
{% raw %}{%{% endraw %} if data.idProductAbstract is defined {% raw %}%}{% endraw %}
	{% raw %}{{{% endraw %} spyCmsBlock({ product: data.idProductAbstract}) {% raw %}}}{% endraw %}
{% raw %}{%{% endraw %} endif {% raw %}%}{% endraw %}
```

Now you can create product CMS blocks and add them to product pages. For instructions, see [Create product CMS blocks](/docs/pbc/all/content-management-system/{{page.version}}/base-shop/manage-in-the-back-office/blocks/create-product-cms-blocks.html).
