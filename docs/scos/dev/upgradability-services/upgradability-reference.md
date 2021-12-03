---
title: Upgradability reference
description: Rerference infomation for evaluator and upgrader tools.
last_updated: Nov 25, 2021
template: concept-topic-template
---

## Method is overridden with a Factory, Dependency Provider, Repository, or Entity Manager extended

### What is the nature of the upgradability error?


### Example of code that can cause the upgradability errors


### How can I avoid this error?


### Example of code achieving the same result but not causing upgradability errors




## A core method is used on the project level

Modules have public and private APIs. The public API includes the entities like facade, plugin stack, dependency list and so on. The private API includes Business model, Factory, Dependency provider, Repository, and Entity manager.

While public API updates always support backward compatibility, the private API updates can break backward compatibility. Minor releases can break backward compatibility in the private API. For example, a method is renamed or removed. If you use this method on the project level, you can get an error during an update.

In this check, the Evaluator works with Factory, Dependency provider, Repository, and Entity manager.
Errors related to this check contains prefix `IsCoreMethodUsedOnProjectLevel`.

### How can I avoid this error?

To avoid the error, override the existing methods with custom ones in the private API.

### Example incompatible code

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

### Solution

To resolve the error provided in the example, would do the following:

1. Copy the method from the core to the project level and rename, for example, by adding a prefix.

2. Add the method to the class and interface:

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

When the core method is overridden, re-run the Evalutor. The same error shouldn't be returned.
