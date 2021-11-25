---
title: Migration guide - CategoryGui
description: Learn how to upgrade the CategoryGui module.
last_updated: Jun 23, 2021
template: module-migration-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/migration-guide-categorygui
originalArticleId: 2c38692c-31e1-4d90-8a86-9b73487f02d5
redirect_from:
  - /2021080/docs/migration-guide-categorygui
  - /2021080/docs/en/migration-guide-categorygui
  - /docs/migration-guide-categorygui
  - /docs/en/migration-guide-categorygui
  - /docs/scos/dev/module-migration-guides/202108.0/migration-guide-categorygui.html
---

This document describes how to upgrade the `CategoryGui` module.  

## Upgrading from version 1.* to 2.*

*Estimated migration time: 15 minutes.*

In version 2.* of the `CategoryGui` module, we:

*   Increased the `Category` module version dependency.

*   Enabled the store assignment for `Category` to be changed in the Back Office.


Upgrade the `CategoryGui` module from version 1.* to 2.*:

1.  To migrate the `Category` module to version 5.*, follow [Upgrading from version 4.* to 5.*](/docs/scos/dev/module-migration-guides/migration-guide-category.html#upgrading-from-version-4-to-5).

2.  Update the `CategoryGui` module to version 2.0.0:
```bash    
composer require spryker/category-gui:"^2.0.0" --update-with-dependencies
```    
3.  Update the generated classes:
```bash    
console transfer:generate
```    
4.  Update navigation cache:
```bash    
console navigation:build-cache
```    
5.  From `Pyz\Zed\Category\CategoryDependencyProvider`, remove the following deprecated plugins:

* `CategoryImageFormPlugin`

* `CategoryImageFormTabExpanderPlugin`

* `ReadCmsBlockCategoryRelationsPlugin`

* `ReadProductCategoryRelationPlugin`

6.  To implement new plugins, update the related modules:
```bash    
composer require spryker/category-image-gui:"^1.3.0" spryker/cms-block-category-connector:"^2.4.0" spryker/product-category:"^4.12.0" spryker/store-gui:"^1.1.0" --update-with-dependencies
```    
7.  On the project level, register the new plugins:  

<details open>
<summary markdown='span'>\Pyz\Zed\CategoryGui\CategoryGuiDependencyProvider</summary>

```php    
<?php

namespace Pyz\Zed\CategoryGui;

use Spryker\Zed\CategoryGui\CategoryGuiDependencyProvider as SpykerCategoryGuiDependencyProvider;
use Spryker\Zed\CategoryImageGui\Communication\Plugin\CategoryGui\ImageSetCategoryFormTabExpanderPlugin;
use Spryker\Zed\CategoryImageGui\Communication\Plugin\CategoryGui\ImageSetSubformCategoryFormPlugin;
use Spryker\Zed\CmsBlockCategoryConnector\Communication\Plugin\CategoryGui\CmsBlockCategoryRelationReadPlugin;
use Spryker\Zed\CmsBlockCategoryConnector\Communication\Plugin\CategoryGui\CmsBlockSubformCategoryFormPlugin;
use Spryker\Zed\Kernel\Communication\Form\FormTypeInterface;
use Spryker\Zed\ProductCategory\Communication\Plugin\CategoryGui\ProductCategoryRelationReadPlugin;
use Spryker\Zed\StoreGui\Communication\Plugin\Form\StoreRelationDropdownFormTypePlugin;

/**
 * @method \Spryker\Zed\CategoryGui\CategoryGuiConfig getConfig()
 */
class CategoryGuiDependencyProvider extends SpykerCategoryGuiDependencyProvider
{
    /**
     * @return \Spryker\Zed\Kernel\Communication\Form\FormTypeInterface
     */
    protected function getStoreRelationFormTypePlugin(): FormTypeInterface
    {
        return new StoreRelationDropdownFormTypePlugin();
    }

    /**
     * @return \Spryker\Zed\CategoryGuiExtension\Dependency\Plugin\CategoryFormTabExpanderPluginInterface[]
     */
    protected function getCategoryFormTabExpanderPlugins(): array
    {
        return [
            new ImageSetCategoryFormTabExpanderPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\CategoryGuiExtension\Dependency\Plugin\CategoryFormPluginInterface[]
     */
    protected function getCategoryFormPlugins(): array
    {
        return [
            new ImageSetSubformCategoryFormPlugin(),
            new CmsBlockSubformCategoryFormPlugin(),
        ];
    }

    /**
     * @return \Spryker\Zed\CategoryGuiExtension\Dependency\Plugin\CategoryRelationReadPluginInterface[]
     */
    protected function getCategoryRelationReadPlugins(): array
    {
        return [
            new ProductCategoryRelationReadPlugin(),
            new CmsBlockCategoryRelationReadPlugin(),
        ];
    }
}
```    

</details>

{% info_block warningBox "Verification" %}

Make sure that, in the Back Office:

* Category management is working correctly.

* You can change the store assignment of categories.



{% endinfo_block %}
