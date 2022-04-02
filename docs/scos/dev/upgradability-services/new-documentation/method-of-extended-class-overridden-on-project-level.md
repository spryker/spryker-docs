---
title: Method under private API is overridden on the project level
description: Reference information for evaluator and upgrader tools.
last_updated: Mar 23, 2022
template: concept-topic-template
---

## Method under private API is overridden on the project level

Modules have public and private APIs. More information you can get here - https://docs.spryker.com/docs/scos/dev/architecture/module-api/definition-of-module-api.html

{% info_block infoBox "" %}
While public API updates always support backward compatibility, private API updates can break backward compatibility. So, backward compatibility is not guaranteed in the private API.
{% endinfo_block %}

For example, if you extend functionality under private API, any update can cause errors or unexpected changes in functionality after Spryker update.

#### Example of code that causes the upgradability error

For example, the extended class `PyzCategoryImageEntityManager` overrides the private API core method `CategoryImageEntityManager::saveCategoryImageSet`.

```php
namespace Pyz\Zed\CategoryImage\Persistence;

use Spryker\Zed\CategoryImage\Persistence\CategoryImageEntityManager as SprykerCategoryImageEntityManager;

class PyzCategoryImageEntityManager extends SprykerCategoryImageEntityManager
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

#### Example of related error in the Evaluator output

```bash
------------------------------------------------------------------------------------
************************************************************************************************************************
Evaluator\Business\Check\IsMethodOverridden\EntityManagerCheck
Introduce a new custom method without usage of existing one. Override usage of the current method in all usage of public API.
************************************************************************************************************************
------------------------------------------------------------------------------------
Pyz\Zed\EvaluatorSpryker\Persistence\EvaluatorSprykerCategoryImageEntityManager
{"name":"{name}"}
{"parentClass":"{parentClass}"}
************************************************************************************************************************
```
#### Solution to resolve the issue

To resolve the error provided in the example, do the following steps:
1. [Recommended] Check if it is possible to extend functionality with "Configuration" strategy (link to "Configuration" - https://docs.spryker.com/docs/scos/dev/back-end-development/extending-spryker/development-strategies/development-strategies.html#configuration)
2. [Recommended] Check if it is possible to extend functionality with "Plug and Play" strategy (link to "Plug and Play" - https://docs.spryker.com/docs/scos/dev/back-end-development/extending-spryker/development-strategies/development-strategies.html#plug-and-play)
3. [Recommended] Check if it is possible to extend functionality with "Project Modules" strategy (link to "Project Modules") - https://docs.spryker.com/docs/scos/dev/back-end-development/extending-spryker/development-strategies/development-strategies.html#project-modules
4. [Not Recommended] Replace the private API core naming with a unique naming.

{% info_block infoBox "" %}
Meanwhile, we are working on introducing a way to report such cases and add more extension points in the core.
{% endinfo_block %}

{% info_block infoBox "" %}
To make your code unique you can use prefixes. F.e. "Pyz" or {Project_mane}
{% endinfo_block %}

#### Example to resolve the Evaluator check error

At this particular example we replaced the private API core naming with a unique naming.

```php
namespace Pyz\Zed\CategoryImage\Persistence;

use Spryker\Zed\CategoryImage\Persistence\CategoryImageEntityManager as SprykerCategoryImageEntityManager;

class PyzCategoryImageEntityManager extends SprykerCategoryImageEntityManager
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
---
After the fix re-evaluate the code. The same error shouldn’t be returned.


