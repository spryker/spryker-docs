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

Spryker modules contain public and private APIs. While the updates of the public API always follow backward compatibility, the updates of the private API can break backward compatibility.

The public API includes the enities like facade, plugin stack, dependency list and so on. The private API includes Business model, Factory, Dependency provider, Repository, and Entity manager.

### What is the nature of the upgradability error?
Spryker's minor releases can break backward compatibility in the private API. For example, a method is renamed or removed. If you use this method on the project level, you can get an error during an update.

In this check, the Evaluator works with Factory, Dependency provider, Repository, and Entity manager.
Errors related to this check contains prefix `IsCoreMethodUsedOnProjectLevel`.

### How can I avoid this error?

To avoid the error, instead of using the default methods, introduce custom ones. Override the default methods in the private API.

### Example of code that can cause the upgradability errors

`CustomerAccessUpdater` uses the `setContentTypesToInaccessible` method that was declared on the core level.

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

Copy the method from the core to the project level and rename it with a specific prefix.

#### Example of code achieving the same result but not causing upgradability errors
We have to add a method to class and interface
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
