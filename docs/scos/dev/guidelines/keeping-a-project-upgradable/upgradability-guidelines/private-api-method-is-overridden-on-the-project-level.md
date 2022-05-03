---
title: Private API method is overridden on the project level
description: Guidelines for using Private API methods on the project level
last_updated: Mar 23, 2022
template: concept-topic-template
---

Modules have public and private APIs. While public API updates always support backward compatibility, private API updates can break backward compatibility. So, backward compatibility is not guaranteed in the private API. For example, if you extend a Private API functionality, and it is changed or removed with an update, it can cause unexpected issues.

For more information about module APIs, see [Definition of Module API](/docs/scos/dev/architecture/module-api/definition-of-module-api.html).


## Example of code that causes an upgradability error

The extended class `CategoryImageEntityManager` overrides the private API core method `CategoryImageEntityManager::saveCategoryImageSet`.

```php
namespace Pyz\Zed\CategoryImage\Persistence;

use Spryker\Zed\CategoryImage\Persistence\CategoryImageEntityManager as SprykerCategoryImageEntityManager;

class CategoryImageEntityManager extends SprykerCategoryImageEntityManager
{
    /**
     * ...
     */
    public function saveCategoryImageSet(...): ...
    {
        ...
    }
}
```

## Example of related error in the Evaluator output

```bash
------------------------------------------------------------------------------------
************************************************************************************************************************
Evaluator\Business\Check\IsMethodOverridden\EntityManagerCheck
Introduce a new custom method without usage of existing one. Override usage of the current method in all usage of public API.
************************************************************************************************************************
------------------------------------------------------------------------------------
Pyz\Zed\CategoryImage\Persistence\CategoryImageEntityManager
{"name":"saveCategoryImageSet", "class":"Pyz\Zed\CategoryImage\Persistence\CategoryImageEntityManager"}
{"parentClass":"Pyz\Zed\CategoryImage\Persistence\CategoryImageEntityManager"}
************************************************************************************************************************
```

## Resolving the error

To resolve the error provided in the example, try the following in the provided order:
1. Recommended: Extend the functionality using the [Configuration strategy](/docs/scos/dev/back-end-development/extending-spryker/development-strategies/development-strategies.html#configuration).
2. Recommended: Extend the functionality using the [Plug and Play strategy](/docs/scos/dev/back-end-development/extending-spryker/development-strategies/development-strategies.html#plug-and-play).
3. Recommended: Extend the functionality using the [Project Modules strategy](/docs/scos/dev/back-end-development/extending-spryker/development-strategies/development-strategies.html#project-modules).
4. Not recommended: Give the Private API entities unique names:
    1. Register the missing extension point in [Spryker Ideas](https://spryker.ideas.aha.io/), so we add it in future.
    2. On the project level, give the Private API entities unique names. For an example, see [Example of resolving the error by copying and renaming the entities](#example-of-resolving-the-error-by-renaming-the-core-entity).
    3. As soon as the extension point in core is released, refactor the code added in step 4.2 using the strategies in steps 1-3.
        While it's not refactored, auto-upgrades are not supported, and the effort to update the project may be bigger and require more manual work.

## Example of resolving the error by renaming the core entity

Make the name of the Private API entity unique by adding `Pyz`.

```php
namespace Pyz\Zed\CategoryImage\Persistence;

use Spryker\Zed\CategoryImage\Persistence\CategoryImageEntityManager as SprykerCategoryImageEntityManager;

class CategoryImageEntityManager extends SprykerCategoryImageEntityManager
{
    /**
     * ...
     */
    public function savePyzCategoryImageSet(...): ...
    {
        ...
    }
}
```

To make the names of extended Private API entities unique, you can use any other strategy. For example, you can prefix them with your project name.


After renaming the entity, re-evaluate the code. The same error shouldn't be returned.
