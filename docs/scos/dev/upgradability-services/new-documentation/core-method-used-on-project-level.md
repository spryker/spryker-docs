---
title: A core method is used on the project level
description: Reference information for evaluator and upgrader tools.
last_updated: Mar 23, 2022
template: concept-topic-template
---

## A core method is used on the project level

Modules have public and private APIs. Link for API's documentation - [see here]{link to "Private API class was extended or used" - private-api-class-extended-or-used.md#Private API class was extended or used}

{% info_block infoBox "" %}

While public API updates always support backward compatibility, private API updates can break backward compatibility. So, backward compatibility is not guaranteed in the private API. For example, if you use a core method on the project level, and it is updated or removed, it can cause unexpected issues during updates.

{% endinfo_block %}

#### Solution to resolve the issue

To solve this problem with unexpected issues after updating the core's private API, replace the core methods with their copies on the project level.
Meanwhile, we are working on introducing a way to report such cases and add more extension points in the core.

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
1. Investigate if it is possible to extend a functionality with plugins (link to "Plug and Play strategy" - https://docs.spryker.com/docs/scos/dev/back-end-development/extending-spryker/development-strategies/development-strategies.html#plug-and-play)
2. If it's impossible to extend function functionality with plugins then copy the method from the core to the project level and rename it, for example, by adding a prefix. (details about the approach of creating prefixes for methods you can find here {link - to page 'unique-entity-name-not-unique.md'})
3. If you add new custom method then add the method to the class and the interface:
```php
// src/Pyz/Zed/CustomerAccess/Persistence/CustomerAccessEntityManager.php

/**
 * @param \Generated\Shared\Transfer\CustomerAccessTransfer $customerAccessTransfer
 *
 * @return \Generated\Shared\Transfer\CustomerAccessTransfer
 */
public function setPyzContentTypesToInaccessible(CustomerAccessTransfer $customerAccessTransfer): CustomerAccessTransfer
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
public function sePyzContentTypesToInaccessible(CustomerAccessTransfer $customerAccessTransfer): CustomerAccessTransfer;
```
After replacing the core method with its project-level copy, re-evaluate the code. The same error shouldn’t be returned.