---
title: A core method is used on the project level
description: Reference information for evaluator and upgrader tools.
last_updated: Mar 23, 2022
template: concept-topic-template
---

## A core method is used on the project level

Modules have public and private APIs. The public API includes the entities like facade, plugin stack, dependency list, etc. This check covers private API entities, including Business model, Factory, Dependency provider, Repository, and Entity manager.

While public API updates always support backward compatibility, private API updates can break backward compatibility. So, backward compatibility in minor releases is not guaranteed in the private API. For example, if you use a core method on the project level, and it is updated or removed, it can cause unexpected issues during minor updates.

#### Solution to resolve the issue

To solve this problem with unexpected issues after updating the core's private API, replace the core methods with their copies on the project level.

#### Example of code that causes the upgradability error

CustomerAccessUpdater uses the setContentTypesToInaccessible method from the core level.

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

#### Example related error in the Evaluator output

```bash
------------------------------------------------------------------------------------------------------------------------
Pyz\Zed\CustomerAccess\Business\CustomerAccess\CustomerAccessUpdater
"PrivateApi:Persistence Please avoid Spryker dependency: $this->getCustomerAccessEntityByContentType(...)"
************************************************************************************************************************
```

#### Example to resolve the Evaluator check error

To resolve the error provided in the example, do the following steps:

1. Copy the method from the core to the project level and rename it, for example, by adding a prefix. (details about the approach of creating prefixes for methods you can find here {link - to page 'unique-entity-name-not-unique.md'})
2. Add the method to the class and the interface:
```php
// src/Pyz/Zed/CustomerAccess/Persistence/CustomerAccessEntityManager.php

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
// src/Pyz/Zed/CustomerAccess/Persistence/CustomerAccessEntityManagerInterface.php

/**
 * @param \Generated\Shared\Transfer\CustomerAccessTransfer $customerAccessTransfer
 *
 * @return \Generated\Shared\Transfer\CustomerAccessTransfer
 */
public function setContentTypesToInaccessible(CustomerAccessTransfer $customerAccessTransfer): CustomerAccessTransfer;
```
After replacing the core method with its project-level copy, re-evaluate the code. The same error shouldn’t be returned.