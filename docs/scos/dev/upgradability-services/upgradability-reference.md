---
title: Upgradability reference
description: Rerference infomation for evaluator and upgrader tools.
last_updated: Nov 25, 2021
template: concept-topic-template
---

## Method is overridden with a Factory, Dependency Provider, Repository, or Entity Manager extended

### What is the nature of the upgradability error?
Minor releases can break backward compatibility through private API. In particular, the method can be changed (number of parameters or their types), renamed, or deleted. If you override this method on the project level, you could get an error during the update or get unexpected functionality.

### Example of code that can cause the upgradability errors

#### Factory method overridding

```php

namespace Pyz\Zed\CategoryDataImport\Business;

use Pyz\Zed\CategoryDataImport\Business\Model\CategoryWriterStep;
use Spryker\Zed\CategoryDataImport\Business\CategoryDataImportBusinessFactory as SprykerCategoryDataImportBusinessFactory;

/**
 * @method \Spryker\Zed\CategoryDataImport\CategoryDataImportConfig getConfig()
 */
class CategoryDataImportBusinessFactory extends SprykerCategoryDataImportBusinessFactory
{
    /**
     * @return \Spryker\Zed\DataImport\Business\Model\DataImporterInterface
     */
    public function createCategoryImporter()
    {
        ...
    }
}
```

#### DependencyProvider method overridding

```php
namespace Pyz\Client\Queue;

use Spryker\Client\Kernel\Container;
use Spryker\Client\Queue\QueueDependencyProvider as BaseQueueDependencyProvider;

class QueueDependencyProvider extends BaseQueueDependencyProvider
{
    /**
     * @param \Spryker\Client\Kernel\Container $container
     *
     * @return \Spryker\Client\Queue\Model\Adapter\AdapterInterface[]
     */
    protected function createQueueAdapters(Container $container)
    {
        return [
            $container->getLocator()->rabbitMq()->client()->createQueueAdapter(),
        ];
    }
}
```


Exception: when a plugin is introduced together with an overriddden method.


#### Repository method overridding

```php
namespace Pyz\Zed\EvaluatorSpryker\Persistence;

use Generated\Shared\Transfer\CategoryImageSetTransfer;
use Spryker\Zed\CategoryImage\Persistence\CategoryImageEntityManager;

class EvaluatorSprykerCategoryImageEntityManager extends CategoryImageEntityManager
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

#### Entity Manager method overridding
```php
namespace Pyz\Zed\EvaluatorSpryker\Persistence;
...

class EvaluatorSprykerCmsSlotBlockRepository  extends CmsSlotBlockRepository
{
    /**
     * @param \Generated\Shared\Transfer\CmsSlotBlockCriteriaTransfer $cmsSlotBlockCriteriaTransfer
     *
     * @return \Generated\Shared\Transfer\CmsSlotBlockCollectionTransfer
     */
    public function getCmsSlotBlocks(
        CmsSlotBlockCriteriaTransfer $cmsSlotBlockCriteriaTransfer
    ): CmsSlotBlockCollectionTransfer {

        return new CmsSlotBlockCollectionTransfer();
    }
}
```

### How can I avoid this error?
- Introduce a new custom method without usage of existing one.
- Override usage of the current method in all usage of public API.
- the method names should be unique to the extend at which the future methods introduced by spryker will not match its name
