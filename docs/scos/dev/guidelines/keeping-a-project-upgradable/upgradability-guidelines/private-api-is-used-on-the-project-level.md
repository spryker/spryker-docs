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
---

Modules have public and private APIs. While public API updates always support backward compatibility, private API updates can break backward compatibility. So, backward compatibility is not guaranteed in the private API.

To be able to take semi-automatic updates, private API entities shouldn't be used on the project side. For example, if you use a core method on the project level, and it is updated or removed with an update, it can cause unexpected issues.

For more information about module APIs, see [Definition of Module API](/docs/scos/dev/architecture/module-api/definition-of-module-api.html).

## General approach to solving upgradability issues

When solving any of the following cases, apply the following strategies in the provided order:
1. Recommended: Extend the functionality using the [Configuration strategy](/docs/scos/dev/back-end-development/extending-spryker/development-strategies/development-strategies.html#configuration).
2. Recommended: Extend the functionality using the [Plug and Play strategy](/docs/scos/dev/back-end-development/extending-spryker/development-strategies/development-strategies.html#plug-and-play).
3. Recommended: Extend the functionality using the [Project Modules strategy](/docs/scos/dev/back-end-development/extending-spryker/development-strategies/development-strategies.html#project-modules).
4. Not recommended: Copy the functionality from the core to the project level:
    1. Register the missing extension point in [Spryker Ideas](https://spryker.ideas.aha.io/), so we add it in future.
    2. Copy private API core entities to the project level and give them unique names. For an example, see [Example of resolving the error by copying and renaming the entities](#example-of-resolving-the-error-by-renaming-private-api-entities).
    3. As soon as the extension point in core is released, refactor the code added in step 4.2 using the strategies in steps 1-3.
        While it's not refactored, auto-upgrades are not supported, and the effort to update the project may be bigger and require more manual work.



## PrivateApi:Facade

It is allowed to use repository, factory, or entity manager classes inside of facade class on a project level, but only the methods from these classes, that were declared on project level.

### Example of code that causes an upgradability error

`CustomerFacade` uses `createCustomerReader` and `getCustomerCollection` from the private API.

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

After applying the solution, re-evaluate the code. The same error shouldn’t be returned.


## PrivateApi:Extension



### Example of code that causes an upgradability error

`CustomerAccessForm` extends `Spryker\Zed\CustomerAccessGui\Communication\Form\CustomerAccessForm` from the private API.

```php
namespace Pyz\Zed\CustomerAccessGui\Communication\Form;

use Spryker\Zed\CustomerAccessGui\Communication\Form\CustomerAccessForm as SprykerCustomerAccessForm;

class CustomerAccessForm extends SprykerCustomerAccessForm
{
...
}
```

### Related error in the Evaluator output: Extending a private API form class

```bash
------------------------------------------------------------------------------------
Please avoid extension of the PrivateApi Spryker\Zed\CustomerAccessGui\Communication\Form\CustomerAccessForm in Pyz\Zed\CustomerAccessGui\Communication\Form\CustomerAccessForm
------------------------------------------------------------------------------------
```

### Example of resolving the error by copying the form class to the project level

```php
<?php
namespace Pyz\Zed\CustomerAccessGui\Communication\Form;

use Spryker\Zed\Kernel\Communication\Form\AbstractType;

class PyzCustomerAccessForm extends AbstractType
{
    ...
}
```

After applying the solution, re-evaluate the code. The same error shouldn’t be returned.

## Rule name

Description


### Example of code that causes an upgradability error: Extending a private API business model

`CustomerAccessFilter` extends `Spryker\Zed\CustomerAccess\Business\CustomerAccess\CustomerAccessFilter` from a private API.

```php
namespace Pyz\Zed\CustomerAccess\Business\CustomerAccess;

use Spryker\Zed\CustomerAccess\Business\CustomerAccess\CustomerAccessFilter as SprykerCustomerAccessFilter;

class CustomerAccessFilter extends SprykerCustomerAccessFilter
{
    ...
}
```

### Related error in the Evaluator output: Extending a private API business model

```bash
------------------------------------------------------------------------------------
Please avoid extension of the PrivateApi Spryker\Zed\CustomerAccess\Business\CustomerAccess\CustomerAccessFilter in Pyz\Zed\CustomerAccess\Business\CustomerAccess\CustomerAccessFilter
------------------------------------------------------------------------------------
```

### Example of resolving the error by copying the business model to the project level

```php
<?php
namespace Pyz\Zed\CustomerAccess\Business\CustomerAccess;

class PyzCustomerAccessFilter implements PyzCustomerAccessFilterInterface
{
    ...
}
```

## Rule name

Description

### Example of code that causes an upgradability error: Extending a private API Bridge

```php
namespace Pyz\Zed\PriceProduct\Dependency\Facade;

use Spryker\Zed\PriceProduct\Dependency\Facade\PriceProductToProductFacadeBridge as SprykerPriceProductToProductFacadeBridge;

class PriceProductToProductFacadeBridge extends SprykerPriceProductToProductFacadeBridge implements PriceProductToProductFacadeInterface
{
    ...
}
```

### Related error in the Evaluator output: Extending a private API Bridge


```bash
------------------------------------------------------------------------------------
Please avoid extension of the PrivateApi Spryker\Zed\PriceProduct\Dependency\Facade\PriceProductToProductFacadeBridge in Pyz\Zed\PriceProduct\Dependency\Facade\PriceProductToProductFacadeBridge
------------------------------------------------------------------------------------
```

### Resolve the error: Extending a private API Bridge


Remove the bridge.


## PrivateApi:MethodIsOverwritten


### Example of code that causes an upgradability error

The extended class `CheckoutPageDependencyProvider` overrides the private API core method `SprykerCheckoutPageDependencyProvider::getCustomerStepHandler`.

```php
namespace Pyz\Yves\CheckoutPage;

use Spryker\Yves\CheckoutPage\CheckoutPageDependencyProvider as SprykerCheckoutPageDependencyProvider;

class CheckoutPageDependencyProvider extends SprykerCheckoutPageDependencyProvider
{
    /**
     * ...
     */
    protected function getCustomerStepHandler(): ...
    {
        ...
    }
}
```

## Example of related error in the Evaluator output

```bash
------------------------------------------------------------------------------------
Please avoid overriding of core method Spryker\Yves\CheckoutPage\CheckoutPageDependencyProvider::getCustomerStepHandler() in the class Pyz\Yves\CheckoutPage\CheckoutPageDependencyProvider
------------------------------------------------------------------------------------
```

### Example of resolving the error by copying the method to the project level


Make the name of the Private API entity unique by adding `Pyz`.

```php
namespace Pyz\Yves\CheckoutPage;

use Spryker\Yves\CheckoutPage\CheckoutPageDependencyProvider as SprykerCheckoutPageDependencyProvider;

class CheckoutPageDependencyProvider extends SprykerCheckoutPageDependencyProvider
{
    /**
     * ...
     */
    protected function getPyzCustomerStepHandler(): ...
    {
        ...
    }
}
```

To make the names of extended Private API entities unique, you can use any other strategy. For example, you can prefix them with your project name.

After renaming the entity, re-evaluate the code. The same error shouldn't be returned.



## PrivateApi:Persistence

It is allowed to use factory classes inside of repositories and entity manager classes on a project level, but only the methods from these classes, that were declared on the project level.

### Example of code that causes an upgradability error

`CustomerAccessEntityManager` uses factory method `createCustomerAccessMapper` from the Private API.

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

### Example of resolving the error by copying the method to the factory on the project level

```php
namespace Pyz\Zed\Customer\Business;

use Pyz\Zed\Customer\Business\Customer\CustomerPyzReader;
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

`CustomerAccessBusinessFactory` the `ProductPageSearchDependencyProvider::QUERY_CONTAINER_CATEGORY` key from the Private API.

```php
...
use Spryker\Zed\ProductPageSearch\ProductPageSearchDependencyProvider;
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


## PrivateApi:PersistenceInBusinessModel

Business models on project level can use repository and entity manager but only methods that were declared on project level.

### Example of code that causes an upgradability error

`CustomerAccessUpdater` calls method `setContentTypesToInaccessible` of the entity manager, that was declared on the core level.

```php
namespace Pyz\Zed\CustomerAccess\Business\CustomerAccess;

class CustomerAccessUpdater implements CustomerAccessUpdaterInterface;
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
   ...
}
```

### Example of related error in the Evaluator output

```bash
------------------------------------------------------------------------------------------------------------------------
Please avoid usage of PrivateApi customerAccessEntityManager->setContentTypesToInaccessible(...) in Pyz\Zed\CustomerAccess\Business\CustomerAccess\CustomerAccessUpdater
------------------------------------------------------------------------------------------------------------------------
```

### Resolving the error

The solution for the error is the same as in `Resolving the error`[PrivateApi:Facade](#privateapi:facade)



## PrivateApi:CorePersistenceUsage

Repository and EntityManager on project level should avoid methods from Core.

### Example of code that causes an upgradability error

`CustomerAccessEntityManager` calls method `getCustomerAccessEntityByContentType` of the SprykerCustomerAccessEntityManager, that was declared on the core level.

```php
namespace Pyz\Zed\CustomerAccess\Persistence;

use Spryker\Zed\CustomerAccess\Persistence\CustomerAccessEntityManager as SprykerCustomerAccessEntityManager;

class CustomerAccessEntityManager extends SprykerCustomerAccessEntityManager implements CustomerAccessEntityManagerInterface
{
    ...
    public function setContentTypesToAccessible(CustomerAccessTransfer $customerAccessTransfer): void
    {
        foreach ($customerAccessTransfer->getContentTypeAccess() as $contentTypeAccess) {
            $customerAccessEntity = $this->getCustomerAccessEntityByContentType($contentTypeAccess);
            ...
        }
    }
    ...
}
```

### Example of related error in the Evaluator output

```bash
------------------------------------------------------------------------------------------------------------------------
Please avoid usage of PrivateApi method SprykerCustomerAccessEntityManager::getCustomerAccessEntityByContentType()
------------------------------------------------------------------------------------------------------------------------
```

### Resolving the error

The solution for the error is the same as in `Resolving the error`[PrivateApi:Facade](#privateapi:facade)
