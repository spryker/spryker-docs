---
title: Private API is used on the project level
description: Reference information for evaluator and upgrader tools.
last_updated: Mar 23, 2022
template: concept-topic-template
---

Modules have public and private APIs. While public API updates always support backward compatibility, private API updates can break backward compatibility. So, backward compatibility is not guaranteed in the private API. For example, if you use a core method on the project level, and it is updated or removed, it can cause unexpected issues during updates.

For more information about module APIs, see [Definition of Module API](/docs/scos/dev/architecture/module-api/definition-of-module-api.html).

## Example of code that causes the upgradability error

`CustomerFacade` uses `createCustomerReader` and `getCustomerCollection`. These are private API entities.

```php
namespace Pyz\Zed\Customer\Business;

use Spryker\Zed\Customer\Business\CustomerFacade as SprykerCustomerFacade;

/**
 * @method \Pyz\Zed\Customer\Business\CustomerBusinessFactory getFactory()
 */
class CustomerFacade extends SprykerCustomerFacade implements CustomerFacadeInterface
{
   /**
     * ...
     */
    public function getCustomerCollection(...): ...
    {
        return $this->getFactory()
            ->createCustomerReader()
            ->getCustomerCollection(...);
    }
}
```

## Example of related error in the Evaluator output

```bash
------------------------------------------------------------------------------------------------------------------------
Pyz\Zed\Customer\Business\CustomerFacade
"PrivateApi:Persistence Please avoid Spryker dependency: "{name}""
************************************************************************************************************************
```

## Resolving the Evaluator check error

To resolve the error provided in the example, try the following in the provided order:
1. Recommended: Extend the functionality using the [Configuration strategy](/docs/scos/dev/back-end-development/extending-spryker/development-strategies/development-strategies.html#configuration).
2. Recommended: Extend the functionality using the [Plug and Play strategy](/docs/scos/dev/back-end-development/extending-spryker/development-strategies/development-strategies.html#plug-and-play).
3. Recommended: Extend the functionality using the [Project Modules strategy](/docs/scos/dev/back-end-development/extending-spryker/development-strategies/development-strategies.html#project-modules).
4. Not recommended: Copy private API core entities to the project level and give them unique names. For an example, see [Example of resolving the error by copying and renaming the entities](#example-of-resolving-the-error-by-copying-and-renaming-the-entities).

{% info_block infoBox "Making your code unique" %}
To make your code unique, use prefixes like `pyz` or your project name.
{% endinfo_block %}

## Example of resolving the error by renaming Private API entities


1. Give the method a unique name and copy it to the factory to fetch the business model.
2. Give the method a unique name and copy it to the business model.


```php
namespace Pyz\Zed\Customer\Business;

use Spryker\Zed\Customer\Business\CustomerFacade as SprykerCustomerFacade;

/**
 * @method \Pyz\Zed\Customer\Business\CustomerBusinessFactory getFactory()
 */
class CustomerFacade extends SprykerCustomerFacade implements CustomerFacadeInterface
{
   /**
     * ...
     */
    public function getCustomerCollection(...): ...
    {
        return $this->getFactory()
            ->createPyzCustomerReader()
            ->getPyzCustomerCollection(...);
    }
}
```
```php
namespace Pyz\Zed\Customer\Business;

use Pyz\Zed\Customer\Business\Customer\CustomerReader;
use Spryker\Zed\Customer\Business\CustomerBusinessFactory as SprykerCustomerBusinessFactory;

class CustomerBusinessFactory extends SprykerCustomerBusinessFactory
{
    /**
     * @return \Pyz\Zed\Customer\Business\Customer\CustomerReaderInterface
     */
    public function createPyzCustomerReader(): CustomerReaderInterface
    {
        return new CustomerReader(...);
    }
}
```
```php
namespace Pyz\Zed\Customer\Business\Customer;

use Spryker\Zed\Customer\Business\Customer\CustomerReader as SprykerCustomerReader;

class CustomerReader extends SprykerCustomerReader implements CustomerReaderInterface
{
    /**
     * ...
     */
    public function getPyzCustomerCollection(...)
    {
        ...
    }
}
```
After the fix re-evaluate the code. The same error shouldn’t be returned.
