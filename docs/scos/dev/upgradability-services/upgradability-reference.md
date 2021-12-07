---
title: Upgradability reference
description: Rerference infomation for evaluator and upgrader tools.
last_updated: Nov 25, 2021
template: concept-topic-template
---


## A core method is used on the project level

Modules have public and private APIs. The public API includes the entities like facade, plugin stack, dependency list, etc. This check covers private API entities, including Business model, Factory, Dependency provider, Repository, and Entity manager.

While public API updates always support backward compatibility, the private API updates can break backward compatibility. Major and minor releases can break the backward compatibility in the private API. For example, if you use a core method on the project level, and it is updated or removed, you can get the error during an update.

The errors related to this check are prefixed with `IsCoreMethodUsedOnProjectLevel`.

### Overriding a core method on the project level

To avoid the error, override the core methods with custom ones in the private API.

#### Example of code and a related error

`CustomerAccessUpdater` uses the `setContentTypesToInaccessible` method from the core level.

```php
<?php
namespace Pyz\Zed\CustomerAccess\Business\CustomerAccess;
...
class CustomerAccessUpdater extends SprykerCustomerAccessUpdater
{
    ...
    /**
     * @param \Generated\Shared\Transfer\CustomerAccessTransfer $customerAccessTransfer
     *
     * @return \Generated\Shared\Transfer\CustomerAccessTransfer
     */
    public function updateUnauthenticatedCustomerAccess(CustomerAccessTransfer $customerAccessTransfer): CustomerAccessTransfer
    {
        return $this->getTransactionHandler()->handleTransaction(function () use ($customerAccessTransfer) {
            ...
            return $this->customerAccessEntityManager->setContentTypesToInaccessible($customerAccessTransfer);
        });
    }
}
```

Related error in the Evaluator output:
```text
------------------------------------------------------------------------------------------------------------------------
Pyz\Zed\CustomerAccess\Business\CustomerAccess\CustomerAccessUpdater
"Please avoid Spryker dependency: customerAccessEntityManager->setContentTypesToInaccessible(...)"
************************************************************************************************************************
```

#### Example of overriding a core method on the project error

To resolve the error provided in the example, do the following:

1. Copy the method from the core to the project level and rename, for example, by adding a prefix.

2. Add the method to the class and the interface:

```php
src/Pyz/Zed/CustomerAccess/Persistence/CustomerAccessEntityManager.php
/**
 * @param \Generated\Shared\Transfer\CustomerAccessTransfer $customerAccessTransfer
 *
 * @return \Generated\Shared\Transfer\CustomerAccessTransfer
 */
public function setContentTypesToInaccessible(CustomerAccessTransfer $customerAccessTransfer): CustomerAccessTransfer
{
   ...
}
```

```php
src/Pyz/Zed/CustomerAccess/Persistence/CustomerAccessEntityManagerInterface.php

/**
 * @param \Generated\Shared\Transfer\CustomerAccessTransfer $customerAccessTransfer
 *
 * @return \Generated\Shared\Transfer\CustomerAccessTransfer
 */
public function setContentTypesToInaccessible(CustomerAccessTransfer $customerAccessTransfer): CustomerAccessTransfer;
```

When the core method is overridden, re-run the Evaluator. The same error shouldn't be returned.
