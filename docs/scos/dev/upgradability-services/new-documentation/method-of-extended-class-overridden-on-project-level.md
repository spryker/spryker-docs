---
title: Method of extended class is overridden one the project level
description: Reference information for evaluator and upgrader tools.
last_updated: Mar 23, 2022
template: concept-topic-template
---

## Method of an extended class is overridden on the project level

If you extend functionality under private API, any update can cause errors or unexpected changes in functionality.
If you extend a core class and override one of its methods, updates can cause errors or unexpected changes in functionality.

More information about private API [see here]{link to Private API class was extended or used - private-api-class-extended-or-used.md#Private API class was extended or used}

#### Using custom methods on the project level

To avoid unexpected issues and achieve the same result, instead of overriding the core methods, introduce custom ones.

{% info_block infoBox "" %}

While public API updates always support backward compatibility, private API updates can break backward compatibility. So, backward compatibility is not guaranteed in the private API. For example, if you use a core method on the project level, and it is updated or removed, it can cause unexpected issues during updates.

{% endinfo_block %}

#### Example of code that can cause upgradability errors

For example, the extended class EvaluatorCategoryImageEntityManager overrides the core method CategoryImageEntityManager.

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

#### Example of related error in the Evaluator output

```bash
------------------------------------------------------------------------------------
************************************************************************************************************************
Evaluator\Business\Check\IsMethodOverridden\EntityManagerCheck
Introduce a new custom method without usage of existing one. Override usage of the current method in all usage of public API.
************************************************************************************************************************
------------------------------------------------------------------------------------
Pyz\Zed\EvaluatorSpryker\Persistence\EvaluatorSprykerCategoryImageEntityManager
{"name":"saveCategoryImageSet","class":"Pyz\\Zed\\EvaluatorSpryker\\Persistence\\EvaluatorSprykerCategoryImageEntityManager"}
{"parentClass":"Spryker\\Zed\\CategoryImage\\Persistence\\CategoryImageEntityManager"}
************************************************************************************************************************
```

#### Steps to solve potential problem in functionality

1. Investigate if it is possible to extend functionality with configuration or plugins (link to "Configuration", "Plug and Play strategy" - https://docs.spryker.com/docs/scos/dev/back-end-development/extending-spryker/development-strategies/development-strategies.html#plug-and-play)
2. If it's impossible to extend functionality with configuration or plugins then introduce a new custom method.
3. If you introduced new custom method then replace the core method with the custom one you've created in the previous step.

{% info_block infoBox "Unique method names" %}

The new custom method name should be unique to the extent of making it impossible to accidentally match the name of a core method introduced in the future.

More details about unique names here {link to "Making method names unique" - unique-entity-name-not-unique.md#Making method names unique }

{% endinfo_block %}

When the core method is overridden with a custom one, re-evaluate the code. The same error shouldn't be returned.

#### Example of using a custom method on the project level

At this particular example was created new method that almost the same as the core one, but it has unique prefix that base on the default name of current shop (Pyz). 
This new method should be used instead core's one.

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
    public function savePyzCategoryImageSet(CategoryImageSetTransfer $categoryImageSetTransfer): CategoryImageSetTransfer
    {
        ...
    }
}
```
---

