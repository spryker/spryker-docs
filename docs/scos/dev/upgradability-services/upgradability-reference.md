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
Spryker modules contain public and private API.
Updates of public API always follow backward compatibility and updates of private API can break backward compatibility.

Public API includes Facade, plugin stack, dependency list ... etc.  
Private API includes Business model, Factory, Dependency provider, Repository, and Entity manager.

### What is the nature of the upgradability error?
Sprykers minor releases can break backward compatibility in private API. For example: rename or delete method. If the customer project uses this core method in their logic, the project will throw an error after the update.

In this check, the Evaluator works with Factory, Dependency provider, Repository, and Entity manager.
Errors related to this check contains prefix `IsCoreMethodUsedOnProjectLevel`.

### How can I avoid this error?
For avoiding error, please introduce a new custom method without the usage of an existing one. Override usage of the current method in all usage of private API.

#### Example of code that can cause the upgradability errors

`CustomerAccessUpdater` use method `setContentTypesToInaccessible` that was declared on core level.

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
Evaluator output overview: 
```text
------------------------------------------------------------------------------------------------------------------------
Pyz\Zed\CustomerAccess\Business\CustomerAccess\CustomerAccessUpdater
"Please avoid Spryker dependency: customerAccessEntityManager->setContentTypesToInaccessible(...)"
************************************************************************************************************************
```

#### Fix
Please copy the method from core to project level and rename it with a specific prefix.

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
As the result, the error was avoided. 
