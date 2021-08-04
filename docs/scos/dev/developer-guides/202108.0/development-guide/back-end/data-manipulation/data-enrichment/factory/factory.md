---
title: Creating Instances of classes- factory
originalLink: https://documentation.spryker.com/2021080/docs/factory
redirect_from:
  - /2021080/docs/factory
  - /2021080/docs/en/factory
---

The guide describes how to create a factory on Yves, Zed, and Client, provides explanations to the naming conventions for factory methods and usage of factories.
***
All modules are shipped with a dedicated factory for each layer. The responsibility of the factory is to create new instances of the classes from the same layer and module.

The following example shows a typical method from a factory. The method `createKeyBuilder()`creates an instance which is then injected inside of `createCmsBlockFinder()`:

```php
<?php
...

class CmsBlockFactory extends AbstractFactory
{
    /**
     * @return \Spryker\Client\CmsBlock\Storage\CmsBlockStorageInterface
     */
    public function createCmsBlockFinder(): CmsBlockStorageInterface
    {
        return new CmsBlockStorage(
            $this->getStorage(),
            $this->createKeyBuilder()
        );
    }

    /**
     * @return \Spryker\Client\CmsBlock\Dependency\Client\CmsBlockToStorageClientInterface
     */
    protected function getStorage(): CmsBlockToStorageClientInterface
    {
        return $this->getProvidedDependency(CmsBlockDependencyProvider::KV_STORAGE);
    }

    /**
     * @return \Spryker\Shared\KeyBuilder\KeyBuilderInterface
     */
    protected function createKeyBuilder(): KeyBuilderInterface
    {
        return new CmsBlockKeyBuilder();
    }
}
```

## Conventions for factory methods
The factories contain two types of methods:

* methods which create internal classes
* methods which provide external dependencies

| Naming convention | Example                | Purpose                                                      |
| ----------------- | ---------------------- | ------------------------------------------------------------ |
| `createXXX()`       | `createCmsBlockFinder()` | These methods inject dependencies and create instances of internal classes. They always start with the `create-`prefix. It is highly recommended to have only one occurrence of `new` per method. |
| `getXXX()`          | `getCustomerClient()`    | These methods retrieve a provided external dependency which can be injected into an internal model. Typical external dependencies are Clients, Facades, and QueryContainer. It is a good practice to add the type of the object as a suffix (for example, `getCustomerFacade()`). |

## Inherited methods from AbstractFactory
The extended `AbstractFactory` holds some important methods:

| Method              | Purpose                                                      | Available |
| ------------------- | ------------------------------------------------------------ | --------- |
| `getConfig()`         | The module config contains all of the needed settings for the current module. | Zed only  |
| `getRepository()` | The dependency container always holds a direct connection to the module’s repository, which is often required by internal models. | Zed only  |
| `getEntityManager()`| The dependency container always holds a direct connection to the module’s entity manager, which is often required by internal models.| Zed only  |

## Snippets to create a new factory
The factory pattern is used all over our code-base. The concrete implementations look a bit different for Yves, Zed, and Client. You can copy and paste these snippets and just replace ‘MyBundle’ with your real module name. To enable auto-completion, it is recommended to define the interfaces for the query container and module config in the class doc block as shown in the snippets.

### Yves

```php
<?php

namespace Pyz\Yves\MyBundle;

use Spryker\Yves\Kernel\AbstractFactory;

class MyBundleFactory extends AbstractFactory
{
}
```

### Client
```php
<?php

namespace Pyz\Client\MyBundle;

use Pyz\Client\Kernel\AbstractFactory;

class MyBundleFactory extends AbstractFactory
{
}
```

### Zed - Communication layer
```php
<?php

namespace Pyz\Zed\MyBundle\Communication;

use Spryker\Zed\Kernel\Communication\AbstractCommunicationFactory;

/**
 * @method \Pyz\Zed\MyBundle\MyBundleConfig getConfig()
 * @method \Pyz\Zed\MyBundle\Persistence\MyBundleEntityManagerInterface getEntityManager()
 * @method \Pyz\Zed\MyBundle\Persistence\MyBundleRepositoryInterface getRepository()
 */
class MyBundleCommunicationFactory extends AbstractCommunicationFactory
{
}
```

### Zed - Business layer
```php
<?php

namespace Pyz\Zed\MyBundle\Business;

use Pyz\Zed\MyBundle\MyBundleConfig;
use Pyz\Zed\MyBundle\Persistence\MyBundleQueryContainerInterface;
use Spryker\Zed\Kernel\Business\AbstractBusinessFactory;

/**
 * @method \Pyz\Zed\MyBundle\MyBundleConfig getConfig()
 * @method \Pyz\Zed\MyBundle\Persistence\MyBundleEntityManagerInterface getEntityManager()
 * @method \Pyz\Zed\MyBundle\Persistence\MyBundleRepositoryInterface getRepository()
 */
class MyBundleBusinessFactory extends AbstractBusinessFactory
{
}
```

### Zed - Persistence layer
```php
<?php
namespace Pyz\Zed\MyBundle\Persistence;

use Pyz\Zed\MyBundle\MyBundleConfig;
use Spryker\Zed\Kernel\Persistence\AbstractPersistenceFactory;

/**
 * @method \Pyz\Zed\MyBundle\MyBundleConfig getConfig()
 * @method \Pyz\Zed\MyBundle\Persistence\MyBundleEntityManagerInterface getEntityManager()
 * @method \Pyz\Zed\MyBundle\Persistence\MyBundleRepositoryInterface getRepository()
 */
class MyBundlePersistenceFactory extends AbstractPersistenceFactory
{
}
```

## Using the factory
You can retrieve an instance of the factory by calling `$this->getFactory();`. This returns the instance of the factory defined in the same layer.

```php
<?php

...
    public function registerCustomer(CustomerTransfer $customerTransfer)
    {
        return $this->getFactory()
            ->createCustomer()
            ->register($customerTransfer);
    }
...
```

## Related Spryks
You might use the following definitions to generate related code:

* `vendor/bin/console spryk:run AddZedPersistenceFactory` - Add Zed Persistence Factory
* `vendor/bin/console spryk:run AddZedCommunicationFactory` - Add Zed Communication Factory
* `vendor/bin/console spryk:run AddZedBusinessFactory` - Add Zed Business Factory     
* `vendor/bin/console spryk:run AddZedBusinessFactoryMethod` - Add Zed Business Factory Method 
* `vendor/bin/console spryk:run AddClientFactory` - Add Client Factory

See the [Spryk](https://documentation.spryker.com/docs/en/spryk-201903) documentation for details.
