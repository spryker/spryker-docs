---
title: Upgradability reference
description: Rerference infomation for evaluator and upgrader tools.
last_updated: Nov 25, 2021
template: concept-topic-template
---

## Method of an extended class is overridden on the project level

Factory, Dependency Provider, Repository, and Entity Manager methods belong to the private API. If you extend a core class and override one of the methods, minor releases can cause errors or unexpected changes in functionality.

### Using custom methods on the project level

To avoid the error, instead of overriding the core methods, introduce custom ones in the private API.


#### Example of code and a related error

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
* the error and recommendation in the output will look like
```bash
------------------------------------------------------------------------------------------------------------------------
************************************************************************************************************************
Evaluator\Business\Check\IsMethodOverridden\EntityManagerCheck
Introduce a new custom method without usage of existing one. Override usage of the current method in all usage of public API.
************************************************************************************************************************
------------------------------------------------------------------------------------------------------------------------
Pyz\Zed\EvaluatorSpryker\Persistence\EvaluatorSprykerCategoryImageEntityManager
{"name":"saveCategoryImageSet","class":"Pyz\\Zed\\EvaluatorSpryker\\Persistence\\EvaluatorSprykerCategoryImageEntityManager"}
{"parentClass":"Spryker\\Zed\\CategoryImage\\Persistence\\CategoryImageEntityManager"}
************************************************************************************************************************
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


#### Introducing custom methods

To resolve the error:
1. Introduce a new custom method.

{% info_block infoBox "Unique method names" %}

The method name should be unique to the extent impossible to accidentally match the name of a core method introduced in future.

{% endinfo_block %}

2. Replace the core method with the custom one.

When the core method is replaced, re-run the Evaluator. The same error shouldn't be returned.
