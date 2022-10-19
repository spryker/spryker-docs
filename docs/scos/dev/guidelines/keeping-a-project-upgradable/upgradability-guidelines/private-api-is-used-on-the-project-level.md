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

Modules have public and private APIs. While public API updates always support backward compatibility, private API updates can break backward compatibility. So, backward compatibility is not guaranteed for  private API entities copied to the project level. For example, if you use a core method on the project level, and it is updated or removed with an update, it can cause unexpected issues.

For more information about module APIs, see [Definition of Module API](/docs/scos/dev/architecture/module-api/definition-of-module-api.html).

## PrivateApi:Facade

On the project level, you can use repository, factory, and entity manager classes inside of a facade class. The methods must be declared on the project level. Usage of this rule will guaranty that all methods that you use will not be changed in the future on core level.

### Example of error in the Evaluator output

```bash
----------------- ------------------------------------------------------------------------------------------------------------------------
PrivateApi:Facade Please avoid usage of Spryker\...\CustomerReader::getCustomerCollection(...) in Pyz\Zed\Customer\Business\CustomerFacade
----------------- ------------------------------------------------------------------------------------------------------------------------
```

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


### Example of resolving the error by renaming private API entities

Recommended: Apply the [development strategies](/docs/scos/dev/back-end-development/extending-spryker/development-strategies/development-strategies.html) that let you take updates safely.


Not recommended:
1. Register the missing extension point in [Spryker Ideas](https://spryker.ideas.aha.io/), so we add it in the future.
2. Give the method a unique name and copy it to the factory to fetch the business models. In the example, we add `Pyz` to its name, but you can use any other strategy. For example, you can prefix them with your project name.

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

3. Copy the method to the business model.

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

After applying the solution, re-evaluate the code. The same error shouldn’t be returned. As soon as the extension point in core is released, refactor the code using the recommended [development strategies](/docs/scos/dev/back-end-development/extending-spryker/development-strategies/development-strategies.html).
While it's not refactored, auto-upgrades are not supported, and the effort to update the project may be bigger and require more manual work.

---

## PrivateApi:Extension: form class

It is not allowed to extend Private API code on the project level. Private API updates can break backward compatibility.

### Related error in the Evaluator output

```bash
-------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
PrivateApi:Extension Please avoid extension of the PrivateApi Spryker\Zed\CustomerAccessGui\Communication\Form\CustomerAccessForm in Pyz\Zed\CustomerAccessGui\Communication\Form\CustomerAccessForm
-------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
```

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

### Example of resolving the error by copying the form class to the project level

Recommended: Apply the [development strategies](/docs/scos/dev/back-end-development/extending-spryker/development-strategies/development-strategies.html) that let you take updates safely.


Not recommended:
1. Register the missing extension point in [Spryker Ideas](https://spryker.ideas.aha.io/), so we add it in the future.
2. Give the form a unique name and copy it to the project level. In the example, we add `Pyz` to its name, but you can use any other strategy. For example, you can prefix them with your project name.

```php
<?php
namespace Pyz\Zed\CustomerAccessGui\Communication\Form;

use Spryker\Zed\Kernel\Communication\Form\AbstractType;

class PyzCustomerAccessForm extends AbstractType
{
    ...
}
```

After applying the solution, re-evaluate the code. The same error shouldn’t be returned. As soon as the extension point in core is released, refactor the code using the recommended [development strategies](/docs/scos/dev/back-end-development/extending-spryker/development-strategies/development-strategies.html).
While it's not refactored, auto-upgrades are not supported, and the effort to update the project may be bigger and require more manual work.

## PrivateApi:Extension: Business model


### Example of code that causes an upgradability error


`CustomerAccessFilter` extends `Spryker\Zed\CustomerAccess\Business\CustomerAccess\CustomerAccessFilter` from the private API.

```php
namespace Pyz\Zed\CustomerAccess\Business\CustomerAccess;

use Spryker\Zed\CustomerAccess\Business\CustomerAccess\CustomerAccessFilter as SprykerCustomerAccessFilter;

class CustomerAccessFilter extends SprykerCustomerAccessFilter
{
    ...
}
```

### Related error in the Evaluator output

```bash
-------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
PrivateApi:Extension Please avoid extension of the PrivateApi Spryker\Zed\CustomerAccess\Business\CustomerAccess\CustomerAccessFilter in Pyz\Zed\CustomerAccess\Business\CustomerAccess\CustomerAccessFilter
-------------------- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
```

### Example of resolving the error by copying the business model to the project level

Recommended: Apply the [development strategies](/docs/scos/dev/back-end-development/extending-spryker/development-strategies/development-strategies.html) that let you take updates safely.


Not recommended:
1. Register the missing extension point in [Spryker Ideas](https://spryker.ideas.aha.io/), so we add it in the future.
2. Give the business model a unique name and copy it to the project level. In the example, we add `Pyz` to its name, but you can use any other strategy. For example, you can prefix them with your project name.


```php
<?php
namespace Pyz\Zed\CustomerAccess\Business\CustomerAccess;

class PyzCustomerAccessFilter implements PyzCustomerAccessFilterInterface
{
    ...
}
```

After applying the solution, re-evaluate the code. The same error shouldn’t be returned. As soon as the extension point in core is released, refactor the code using the recommended [development strategies](/docs/scos/dev/back-end-development/extending-spryker/development-strategies/development-strategies.html).
While it's not refactored, auto-upgrades are not supported, and the effort to update the project may be bigger and require more manual work.

## PrivateApi:Extension: Bridge


### Related error in the Evaluator output

```bash
-------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
PrivateApi:Extension Please avoid extension of the PrivateApi Spryker\Zed\PriceProduct\Dependency\Facade\PriceProductToProductFacadeBridge in Pyz\Zed\PriceProduct\Dependency\Facade\PriceProductToProductFacadeBridge
-------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
```

### Example of code that causes an upgradability error

```php
namespace Pyz\Zed\PriceProduct\Dependency\Facade;

use Spryker\Zed\PriceProduct\Dependency\Facade\PriceProductToProductFacadeBridge as SprykerPriceProductToProductFacadeBridge;

class PriceProductToProductFacadeBridge extends SprykerPriceProductToProductFacadeBridge implements PriceProductToProductFacadeInterface
{
    ...
}
```

#### Example of resolving the error
To resolve the error, remove the bridge.

---

## PrivateApi:MethodIsOverridden

It is not allowed to override protected core methods from the core level on the project level. Protected methods can be changed at any time.

### Example of error in the Evaluator output

```bash
----------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
PrivateApi:MethodIsOverridden Please avoid overriding of core method Spryker\Yves\CheckoutPage\CheckoutPageDependencyProvider::getCustomerStepHandler() in the class Pyz\Yves\CheckoutPage\CheckoutPageDependencyProvider
----------------------------- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
```

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

### Example of resolving the error by copying the method to the project level and renaming it

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

After applying the solution, re-evaluate the code. The same error shouldn’t be returned. As soon as the extension point in core is released, refactor the code using the recommended [development strategies](/docs/scos/dev/back-end-development/extending-spryker/development-strategies/development-strategies.html).
While it's not refactored, auto-upgrades are not supported, and the effort to update the project may be bigger and require more manual work.
---

## PrivateApi:Persistence

It is allowed to use factory classes inside of repositories and entity manager classes on a project level, but only the methods from these classes, that were declared on the project level.

### Example of error in the Evaluator output

```bash
---------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------
PrivateApi:Persistence Please avoid usage of Spryker\...\CustomerAccessEntityManager::createCustomerAccessMapper(...) in Pyz/Zed/CustomerAccess/Persistence/CustomerAccessEntityManager
---------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------
```

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

### Example of resolving the error by cloning functionality to the project level

1. Copy the method to the factory on the project level.

```php
namespace Pyz\Zed\Customer\Business;

use Pyz\Zed\Customer\Business\Customer\CustomerPyzReader;
use Pyz\Zed\Customer\Business\Customer\CustomerReaderInterface;
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

2. Use the project-level factory method instead of core-level factory method.

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
        $this->getFactory()->createPyzCustomerAccessMapper();
       ....
    }
}
```

After applying the solution, re-evaluate the code. The same error shouldn’t be returned. As soon as the extension point in core is released, refactor the code using the recommended [development strategies](/docs/scos/dev/back-end-development/extending-spryker/development-strategies/development-strategies.html).
While it's not refactored, auto-upgrades are not supported, and the effort to update the project may be bigger and require more manual work.

---

## PrivateApi:Dependency

Business factory should use dependency by a key that is defined at the project level.

### Example of error in the Evaluator output

```bash
--------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
PrivateApi:Dependency Please avoid usage of Spryker/Zed/ProductPageSearch/ProductPageSearchDependencyProvider/ProductPageSearchDependencyProvider::QUERY_CONTAINER_CATEGORY in Pyz/Zed/CustomerAccess/Business/CustomerAccessBusinessFactory
--------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
```

### Example of code that causes an upgradability error

`CustomerAccessBusinessFactory` uses the `ProductPageSearchDependencyProvider::QUERY_CONTAINER_CATEGORY` key from the Private API.

```php
...
use Spryker\Zed\CustomerAccess\Business\CustomerAccessBusinessFactory as SprykerCustomerAccessBusinessFactory;
use Spryker\Zed\ProductPageSearch\ProductPageSearchDependencyProvider;
...
class CustomerAccessBusinessFactory extends SprykerCustomerAccessBusinessFactory
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


### Example of resolving the error by cloning functionality on the project level

1. Extend the used dependency provider with the new constant.

```php
...
use Spryker\Zed\Kernel\Container;
use Spryker\Zed\ProductPageSearch\Dependency\QueryContainer\ProductPageSearchToCategoryQueryContainerBridge;
use Spryker\Zed\ProductPageSearch\ProductPageSearchDependencyProvider as SprykerProductPageSearchDependencyProvider;
...

class ProductPageSearchDependencyProvider extends SprykerProductPageSearchDependencyProvider
{
    /**
     * @var string
     */
    public const PYZ_QUERY_CONTAINER_CATEGORY = 'PYZ_QUERY_CONTAINER_CATEGORY';

    /**
     * @param \Spryker\Zed\Kernel\Container $container
     *
     * @return \Spryker\Zed\Kernel\Container
     */
    public function provideCommunicationLayerDependencies(Container $container)
    {
        $container = parent::provideCommunicationLayerDependencies($container);

        $container->set(static::PYZ_QUERY_CONTAINER_CATEGORY, function (Container $container) {
            return new ProductPageSearchToCategoryQueryContainerBridge($container->getLocator()->category()->queryContainer());
        });

        return $container;
    }
    ...
}
```

2. Use the new constant in `CustomerAccessBusinessFactory`.

```php
...
use Spryker\Zed\CustomerAccess\Business\CustomerAccessBusinessFactory as SprykerCustomerAccessBusinessFactory;
use Pyz\Zed\ProductPageSearch\ProductPageSearchDependencyProvider;
...

class CustomerAccessBusinessFactory extends SprykerCustomerAccessBusinessFactory
{
    /**
     * @return \Pyz\Zed\CustomerAccess\Business\PropelFacadeInterface
     * @throws \Spryker\Zed\Kernel\Exception\Container\ContainerKeyNotFoundException
     */
    public function getPyzPropelFacade(): PropelFacadeInterface
    {
        return $this->getProvidedDependency(ProductPageSearchDependencyProvider::PYZ_QUERY_CONTAINER_CATEGORY);
    }
}
```
---

## PrivateApi:DependencyInBusinessModel

Business models on the project level should avoid the usage of private API from the Core level.

### Example of error in the Evaluator output

```bash
------------------------------------ -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
PrivateApi:DependencyInBusinessModel Please avoid usage of Spryker\Zed\CustomerAccess\Business\CustomerAccess\CustomerAccessReaderInterface in Pyz\Zed\CustomerAccess\Business\CustomerAccess\CustomerAccessFilter
------------------------------------ -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
```

### Example of code that causes an upgradability error

`CustomerAccessFilter` uses `CustomerAccessReaderInterface` from the private API as a dependency.

```php
...
use Spryker\Zed\CustomerAccess\Business\CustomerAccess\CustomerAccessReaderInterface;
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


### Example of resolving the error by cloning functionality on the project level

1. Create new interface on project side

```php
...
use Spryker\Zed\CustomerAccess\Business\CustomerAccess\CustomerAccessReaderInterface as SprykerCustomerAccessReaderInterface;
...

interface CustomerAccessReaderInterface extends SprykerCustomerAccessReaderInterface
{
}
```

2. Use new project-level interface instead of core-level interface

```php
use Pyz\Zed\CustomerAccess\CustomerAccessReaderInterface;

class CustomerAccessFilter implements CustomCustomerAccessFilter
{
    /**
     * @param \Pyz\Zed\CustomerAccess\CustomerAccessConfig $customerAccessConfig
     * @param \Pyz\Zed\CustomerAccess\Business\CustomerAccess\CustomerAccessReaderInterface $customerAccessReader
     */
    public function __construct(CustomerAccessConfig $customerAccessConfig, CustomerAccessReaderInterface $customerAccessReader)
    {
        $this->customerAccessReader = $customerAccessReader;
        $this->customerAccessConfig = $customerAccessConfig;
    }
}
```
---

## PrivateApi:ObjectInitialization

Business models on the project level should avoid initializing private API from the Core level.

### Example of error in the Evaluator output

```bash
------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
PrivateApi:ObjectInitialization Please avoid usage of Spryker\Zed\CustomerAccess\Business\CustomerAccess\CustomerAccessReaderInterface in Pyz\Zed\CustomerAccess\Business\CustomerAccess\CustomerAccessFilter
------------------------------- -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
```

### Example of code that causes an upgradability error

`CustomerAccessFilter` contains creating `CustomerAccessReader` in the `constructor` method.

```php
...
use Spryker\Zed\CustomerAccess\Business\CustomerAccess\CustomerAccessReaderInterface;
use Spryker\Zed\CustomerAccess\Persistence\CustomerAccessEntityManagerInterface;
...

class CustomerAccessFilter implements CustomCustomerAccessFilter
{
    ...
    public function __construct(
        CustomerAccessEntityManagerInterface $customerAccessEntityManager,
        CustomerAccessFilterInterface $customerAccessFilter
    ) {
        parent::__construct($customerAccessEntityManager);
        $this->customerAccessReader = new CustomerAccessReader();
        $this->customerAccessFilter = $customerAccessFilter;
    }
    ...
}
```

### Example of resolving the error

```php
...
use Spryker\Zed\CustomerAccess\Business\CustomerAccess\CustomerAccessReaderInterface;
use Spryker\Zed\CustomerAccess\Persistence\CustomerAccessEntityManagerInterface;
...

class CustomerAccessFilter implements CustomCustomerAccessFilter
{
    ...
    public function __construct(
        CustomerAccessEntityManagerInterface $customerAccessEntityManager,
        CustomerAccessReaderInterface $customerAccessReader,
        CustomerAccessFilterInterface $customerAccessFilter
    ) {
        parent::__construct($customerAccessEntityManager);
        $this->customerAccessReader = $customerAccessReader;
        $this->customerAccessFilter = $customerAccessFilter;
    }
}
```
---

## PrivateApi:PersistenceInBusinessModel

On the project level, you can use repository and entity manager inside the business model class. The methods must be declared on the project level.

### Example of error in the Evaluator output

```bash
------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
PrivateApi:PersistenceInBusinessModel Please avoid usage of PrivateApi customerAccessEntityManager->setContentTypesToInaccessible(...) in Pyz\Zed\CustomerAccess\Business\CustomerAccess\CustomerAccessUpdater
------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------
```

### Example of code that causes an upgradability error

`CustomerAccessUpdater` calls the `setContentTypesToInaccessible` method of the entity manager that was declared on the Spryker core level.

```php
namespace Pyz\Zed\CustomerAccess\Business\CustomerAccess;

use Generated\Shared\Transfer\CustomerAccessTransfer;

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

### Example of resolving the error by copying and renaming Private API entities

1. Create a new entity manager on the project level with the needed methods from the entity manager on the core level.

```php
<?php

namespace Pyz\Zed\CustomerAccess\Persistence;

use ArrayObject;
use Generated\Shared\Transfer\ContentTypeAccessTransfer;
use Generated\Shared\Transfer\CustomerAccessTransfer;
use Spryker\Zed\Kernel\Persistence\AbstractEntityManager;

/**
 * @method \Spryker\Zed\CustomerAccess\Persistence\CustomerAccessPersistenceFactory getFactory()
 */
class PyzCustomerAccessEntityManager extends AbstractEntityManager implements CustomerAccessEntityManagerInterface
{
    ...
    /**
     * @param \Generated\Shared\Transfer\CustomerAccessTransfer $customerAccessTransfer
     *
     * @return \Generated\Shared\Transfer\CustomerAccessTransfer
     */
    public function setPyzContentTypesToInaccessible(CustomerAccessTransfer $customerAccessTransfer): CustomerAccessTransfer
    {
        $updatedContentTypeAccessCollection = new ArrayObject();
        foreach ($customerAccessTransfer->getContentTypeAccess() as $contentTypeAccess) {
            ...
        }
        $customerAccessTransfer->setContentTypeAccess($updatedContentTypeAccessCollection);

        return $customerAccessTransfer;
    }
    ...
}
```

2. Use a new entity manager from the project level with its methods.

```php
namespace Pyz\Zed\CustomerAccess\Business\CustomerAccess;

use Generated\Shared\Transfer\CustomerAccessTransfer;

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
            return $this->pyzCustomerAccessEntityManager->setPyzContentTypesToInaccessible($customerAccessTransfer);
        });
    }
   ...
}
```

After applying the solution, re-evaluate the code. The same error shouldn’t be returned. As soon as the extension point in core is released, refactor the code using the recommended [development strategies](/docs/scos/dev/back-end-development/extending-spryker/development-strategies/development-strategies.html).
While it's not refactored, auto-upgrades are not supported, and the effort to update the project may be bigger and require more manual work.

---

## PrivateApi:CorePersistenceUsage

Repository and EntityManager on the project level must not use methods from the core level.

### Example of error in the Evaluator output

```bash
------------------------------- ------------------------------------------------------------------------------------------------------------------
PrivateApi:CorePersistenceUsage Please avoid usage of PrivateApi method SprykerCustomerAccessEntityManager::getCustomerAccessEntityByContentType()
------------------------------- ------------------------------------------------------------------------------------------------------------------
```

Example of code that causes an upgradability error:

`CustomerAccessEntityManager` calls the `getCustomerAccessEntityByContentType` method of `SprykerCustomerAccessEntityManager` that was declared on the core level.

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

### Resolving the error

To resolve the error provided in the example, try the following in the provided order:
1. Recommended: Extend the functionality using the [Configuration strategy](/docs/scos/dev/back-end-development/extending-spryker/development-strategies/development-strategies.html#configuration).
2. Recommended: Extend the functionality using the [Plug and Play strategy](/docs/scos/dev/back-end-development/extending-spryker/development-strategies/development-strategies.html#plug-and-play).
3. Recommended: Extend the functionality using the [Project Modules strategy](/docs/scos/dev/back-end-development/extending-spryker/development-strategies/development-strategies.html#project-modules).
4. Not recommended: Copy the functionality from the core to the project level:
    1. Register the missing extension point in [Spryker Ideas](https://spryker.ideas.aha.io/), so we add it in the future.
    2. Copy private API core entities to the project level and give them unique names. For an example, see [Example of resolving the error by copying and renaming Private API entities](#example-of-resolving-the-error-by-copying-and-renaming-private-api-entities).
    3. As soon as the extension point in core is released, refactor the code added in step 4.2 using the strategies in steps 1-3.
       While it's not refactored, auto-upgrades are not supported, and the effort to update the project may be bigger and require more manual work.

### Example of resolving the error by copying and renaming Private API entities

1. Create a new method for a factory on the project level.

```php
namespace Pyz\Zed\Customer\Business;

use Orm\Zed\CustomerAccess\Persistence\SpyUnauthenticatedCustomerAccessQuery;
use Pyz\Zed\Customer\Business\Customer\CustomerReader;
use Spryker\Zed\Customer\Business\CustomerBusinessFactory as SprykerCustomerBusinessFactory;

class CustomerBusinessFactory extends SprykerCustomerBusinessFactory
{
    /**
     * @return \Orm\Zed\CustomerAccess\Persistence\SpyUnauthenticatedCustomerAccessQuery
     */
    public function createPyzCustomerAccessQuery(): SpyUnauthenticatedCustomerAccessQuery
    {
        return SpyUnauthenticatedCustomerAccessQuery::create();
    }
}
```

2. Use the new project-level method instead of the core-level method.

```php
namespace Pyz\Zed\CustomerAccess\Persistence;

use Spryker\Zed\CustomerAccess\Persistence\CustomerAccessEntityManager as SprykerCustomerAccessEntityManager;

class CustomerAccessEntityManager extends SprykerCustomerAccessEntityManager implements CustomerAccessEntityManagerInterface
{
    ...
    protected function getPyzCustomerAccessEntityByContentType(ContentTypeAccessTransfer $contentTypeAccessTransfer): ?SpyUnauthenticatedCustomerAccess
    {
        return $this->getFactory()
            ->createPyzCustomerAccessQuery()
            ->filterByContentType($contentTypeAccessTransfer->getContentType())
            ->findOne();
    }

    public function setContentTypesToAccessible(CustomerAccessTransfer $customerAccessTransfer): void
    {
        foreach ($customerAccessTransfer->getContentTypeAccess() as $contentTypeAccess) {
            $customerAccessEntity = $this->getPyzCustomerAccessEntityByContentType($contentTypeAccess);
            ...
        }
    }
    ...
}
```
