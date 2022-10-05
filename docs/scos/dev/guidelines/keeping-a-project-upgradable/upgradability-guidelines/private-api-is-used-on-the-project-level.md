---
title: Private API is used on the project level
description: Guidelines for copying Private API functionality to the project level
last_updated: Mar 23, 2022
template: concept-topic-template
related:
  - title: Upgradability guidelines
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/upgradability-guidelines.html
  - title: Entity name is not unique
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/entity-name-is-not-unique.html
  - title: Private API is extended
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/private-api-is-extended.html
  - title: Private API method is overridden on the project level
    link: docs/scos/dev/guidelines/keeping-a-project-upgradable/upgradability-guidelines/private-api-method-is-overridden-on-the-project-level.html
---

Private API is used on the project level. Private API entities shouldn't be used on the project side. The project has to follow the rule to be able to correctly receive Spryker autoupdates.

Modules have public and private APIs. While public API updates always support backward compatibility, private API updates can break backward compatibility. So, backward compatibility is not guaranteed in the private API. For example, if you use a core method on the project level, and it is updated or removed with an update, it can cause unexpected issues.

For more information about module APIs, see [Definition of Module API](/docs/scos/dev/architecture/module-api/definition-of-module-api.html).

## PrivateApi:Facade

It is allowed to use repository, factory, or entity manager classes inside of facade class on a project level, but only the methods from these classes, that were declared on project level.

### Example of code that causes an upgradability error

`CustomerFacade` uses `createCustomerReader` and `getCustomerCollection` from a private API.

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

### Example of related error in the Evaluator output

```bash
------------------------------------------------------------------------------------------------------------------------
Please avoid usage of Spryker\...\CustomerReader::getCustomerCollection(...) in Pyz\Zed\Customer\Business\CustomerFacade
------------------------------------------------------------------------------------------------------------------------
```

### Resolving the error

To resolve the error provided in the example, try the following in the provided order:
1. Recommended: Extend the functionality using the [Configuration strategy](/docs/scos/dev/back-end-development/extending-spryker/development-strategies/development-strategies.html#configuration).
2. Recommended: Extend the functionality using the [Plug and Play strategy](/docs/scos/dev/back-end-development/extending-spryker/development-strategies/development-strategies.html#plug-and-play).
3. Recommended: Extend the functionality using the [Project Modules strategy](/docs/scos/dev/back-end-development/extending-spryker/development-strategies/development-strategies.html#project-modules).
4. Not recommended: Copy the functionality from the core to the project level:
    1. Register the missing extension point in [Spryker Ideas](https://spryker.ideas.aha.io/), so we add it in future.
    2. Copy private API core entities to the project level and give them unique names. For an example, see [Example of resolving the error by copying and renaming the entities](#example-of-resolving-the-error-by-renaming-private-api-entities).
    3. As soon as the extension point in core is released, refactor the code added in step 4.2 using the strategies in steps 1-3.
        While it's not refactored, auto-upgrades are not supported, and the effort to update the project may be bigger and require more manual work.

### Example of resolving the error by renaming private API entities

1. Give the method a unique name and copy it to the factory to fetch the business models. In the  example, we add `Pyz` to its name, but you can use any other strategy. For example, you can prefix them with your project name.


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

2. Copy the method to the business model.

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


## PrivateApi:Persistence

It is allowed to use factory classes inside of repositories and entity manager classes on a project level, but only the methods from these classes, that were declared on the project level.

### Example of code that causes an upgradability error

`CustomerAccessEntityManager` uses factory method `createCustomerAccessMapper` that was declared on the vendor level.

```php
use Spryker\Zed\CustomerAccess\Persistence\CustomerAccessEntityManager as SprykerCustomerAccessEntityManager;

/**
 * @method \Pyz\Zed\Customer\Business\CustomerBusinessFactory getFactory()
 */
class CustomerAccessEntityManager extends SprykerCustomerAccessEntityManager implements CustomCustomerAccessEntityManager
{
   /**
     * 
     */
    public function setContentTypesToAccessible(CustomerAccessTransfer $customerAccessTransfer): void
    {
        $this->getFactory()->createCustomerAccessMapper();
       ....
    }
}
```

### Example of related error in the Evaluator output

```bash
------------------------------------------------------------------------------------------------------------------------
Please avoid usage of Spryker\...\CustomerAccessEntityManager::createCustomerAccessMapper(...) in Pyz/Zed/CustomerAccess/Persistence/CustomerAccessEntityManager
------------------------------------------------------------------------------------------------------------------------
```

### Resolving the error

The solution for the error is the same as in `Resolving the error`[PrivateApi:Facade](#privateapi:facade)

### Example of resolving the error by cloning functionality to the project level

Copy the method to the factory on the project level.

```php
namespace Pyz\Zed\Customer\Business;

use Pyz\Zed\Customer\Business\Customer\CustomerReader;
use Spryker\Zed\Customer\Business\CustomerBusinessFactory as SprykerCustomerBusinessFactory;

class CustomerBusinessFactory extends SprykerCustomerBusinessFactory
{
    /**
     * @return \Pyz\Zed\Customer\Business\Customer\CustomerReaderInterface
     */
    public function createPyzCustomerAccessMapper(): CustomerReaderInterface
    {
        return new CustomerPyzReader(...);
    }
}
```


## PrivateApi:Dependency

The business factory should use dependency by a key that is defined at the project level.

### Example of code that causes an upgradability error

`CustomerAccessBusinessFactory` uses as key `ProductPageSearchDependencyProvider::QUERY_CONTAINER_CATEGORY` that was declared on the vendor level.

```php
...
use Spryker\Zed\ProductPageSearch\ProductPageSearchDependencyProvider
...
class CustomerAccessBusinessFactory implements SprykerCustomerAccessBusinessFactory
{
    /**
    * @return \Pyz\Zed\CustomerAccess\Business\PropelFacadeInterface
    * @throws \Spryker\Zed\Kernel\Exception\Container\ContainerKeyNotFoundException
    */
    public function getPropelFacade(): PropelFacadeInterface
    {
        return $this->getProvidedDependency(ProductPageSearchDependencyProvider::QUERY_CONTAINER_CATEGORY);
    }
}
```

### Example of related error in the Evaluator output

```bash
------------------------------------------------------------------------------------------------------------------------
Please avoid usage of Spryker/Zed/ProductPageSearch/ProductPageSearchDependencyProvider/ProductPageSearchDependencyProvider::QUERY_CONTAINER_CATEGORY in Pyz/Zed/CustomerAccess/Business/CustomerAccessBusinessFactory
------------------------------------------------------------------------------------------------------------------------
```

### Resolving the error

The solution for the error is the same as in `Resolving the error`[PrivateApi:Facade](#privateapi:facade)


## PrivateApi:DependencyInBusinessModel

Business models on the project level should avoid the usage of private API from the Core level.

### Example of code that causes an upgradability error

`CustomerAccessFilter` uses as dependency `CustomerAccessReaderInterface` that was declared on the vendor level.

```php
...
class CustomerAccessFilter implements CustomCustomerAccessFilter
{
    /**
    * @param \Pyz\Zed\CustomerAccess\CustomerAccessConfig $customerAccessConfig
    * @param \Spryker\Zed\CustomerAccess\Business\CustomerAccess\CustomerAccessReaderInterface $customerAccessReader
    */
    public function __construct(CustomerAccessConfig $customerAccessConfig, CustomerAccessReaderInterface $customerAccessReader)
    {
        $this->customerAccessReader = $customerAccessReader;
        $this->customerAccessConfig = $customerAccessConfig;
    }
}
```

### Example of related error in the Evaluator output

```bash
------------------------------------------------------------------------------------------------------------------------
PrivateApi:DependencyInBusinessModel "Please avoid usage of Spryker\Zed\CustomerAccess\Business\CustomerAccess\CustomerAccessReaderInterface in Pyz\Zed\CustomerAccess\Business\CustomerAccess\CustomerAccessFilter"
------------------------------------------------------------------------------------------------------------------------
```

### Resolving the error

The solution for the error is the same as in `Resolving the error`[PrivateApi:Facade](#privateapi:facade)


## PrivateApi:ObjectInitialization

Business models on the project level should avoid creating private API from the Core level.

### Example of code that causes an upgradability error

`CustomerAccessFilter` contains creating `CustomerAccessReader` in the `constructor` method.

```php
...
class CustomerAccessFilter implements CustomCustomerAccessFilter
{
    public function __construct(
        CustomerAccessEntityManagerInterface $customerAccessEntityManager,
        CustomerAccessReaderInterface $customerAccessReader,
        CustomerAccessFilterInterface $customerAccessFilter
    ) {
        parent::__construct($customerAccessEntityManager);
        $this->customerAccessReader = new CustomerAccessReader();
        $this->customerAccessFilter = $customerAccessFilter;
    }
}
```

### Example of related error in the Evaluator output

```bash
------------------------------------------------------------------------------------------------------------------------
Please avoid usage of Spryker\Zed\CustomerAccess\Business\CustomerAccess\CustomerAccessReaderInterface in Pyz\Zed\CustomerAccess\Business\CustomerAccess\CustomerAccessFilter
------------------------------------------------------------------------------------------------------------------------
```

### Resolving the error

The solution for the error is the same as in `Resolving the error`[PrivateApi:Facade](#privateapi:facade)
