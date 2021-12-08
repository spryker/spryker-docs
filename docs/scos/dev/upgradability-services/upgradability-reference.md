---
title: Upgradability reference
description: Rerference infomation for evaluator and upgrader tools.
last_updated: Nov 25, 2021
template: concept-topic-template
---

## Method of an extended class is overridden on the project level

Factory, Dependency Provider, Repository, and Entity Manager methods belong to the private API. If you extend a core class and override one of the methods, minor releases can cause errors or unexpected changes in functionality.

### Example of code and a related error

For example, the extended class `EvaluatorCategoryImageEntityManager` overrides the core method `CategoryImageEntityManager`.

```php
namespace Pyz\Zed\Evaluator\Persistence;

use Generated\Shared\Transfer\CategoryImageSetTransfer;
use Spryker\Zed\CategoryImage\Persistence\CategoryImageEntityManager;

class EvaluatorCategoryImageEntityManager extends CategoryImageEntityManager
{
    /**
     * @param \Generated\Shared\Transfer\CategoryImageSetTransfer $categoryImageSetTransfer
     *
     * @return \Generated\Shared\Transfer\CategoryImageSetTransfer
     */
    public function saveCategoryImageSet(CategoryImageSetTransfer $categoryImageSetTransfer): CategoryImageSetTransfer
    {
        ...
    }
}

```

{% info_block warningBox "Dependency Provider exception" %}

If you override a method and initialize a plugin, it does not break backward compatibility. For example, in `StorageRouterDependencyProvider`, `StorageRouterDependencyProvider` is overridden with a plugin introduced:

<details>
<summary markdown='span'>Example of an overridden method with a plugin</summary>

```php
<?php

namespace Pyz\Yves\StorageRouter;

use SprykerShop\Yves\CatalogPage\Plugin\StorageRouter\CatalogPageResourceCreatorPlugin;
use SprykerShop\Yves\CmsPage\Plugin\StorageRouter\PageResourceCreatorPlugin;
use SprykerShop\Yves\ProductDetailPage\Plugin\StorageRouter\ProductDetailPageResourceCreatorPlugin;
use SprykerShop\Yves\ProductSetDetailPage\Plugin\StorageRouter\ProductSetDetailPageResourceCreatorPlugin;
use SprykerShop\Yves\RedirectPage\Plugin\StorageRouter\RedirectResourceCreatorPlugin;
use SprykerShop\Yves\StorageRouter\StorageRouterDependencyProvider as SprykerShopStorageRouterDependencyProvider;

class StorageRouterDependencyProvider extends SprykerShopStorageRouterDependencyProvider
{
    /**
     * @return \SprykerShop\Yves\StorageRouterExtension\Dependency\Plugin\ResourceCreatorPluginInterface[]
     */
    protected function getResourceCreatorPlugins(): array
    {
        return [
            new PageResourceCreatorPlugin(),
            new CatalogPageResourceCreatorPlugin(),
            new ProductDetailPageResourceCreatorPlugin(),
            new ProductSetDetailPageResourceCreatorPlugin(),
            new RedirectResourceCreatorPlugin(),
        ];
    }
}
```

{% endinfo_block %}


### How can I avoid this error?
- Introduce a new custom method without usage of existing one.
- Override usage of the current method in all usage of public API.
- the method names should be unique to the extend at which the future methods introduced by spryker will not match its name
