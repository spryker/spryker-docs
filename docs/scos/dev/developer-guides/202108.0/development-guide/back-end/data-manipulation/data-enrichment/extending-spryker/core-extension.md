---
title: Extending the Core
originalLink: https://documentation.spryker.com/2021080/docs/core-extension
redirect_from:
  - /2021080/docs/core-extension
  - /2021080/docs/en/core-extension
---

We offer several ways like plugins to hook into the core’s behavior and extend this without modifications. But sometimes this is not enough, so you need to replace a method which is deep in the core.

Before you proceed, double-check if there is no other way to solve your requirement, maybe there is a facade method that fits in or you can use plugins. It is important to understand that if you do a core extension, you are behind the stable internal APIs, so there is no guarantee that the extended class is not modified, renamed or even non-existing in the next release. Therefore, you take over responsibility for your extension and it is highly recommended to cover it with unit tests. In case it is not urgent you can request a change in our support desk to get an official extension point.

There are three ways to extend classes from the core:

* replacement class
* inheritance object
* composition

Each of them has its advantages and disadvantages.

## Extension via Replacement
In case you want to completely replace a class from the core, you can add a class that contains all the `public` methods from the original class and implements the same interface.

## Extension via Class Inheritance
You can extend a class from the core and overwrite just the public or protected methods you need. This works well because internally there are almost no `private` methods and no `final` classes.

Inheritance is easy to do but it creates a tight coupling to a concrete class. There is a high chance that a change in parent implementation will force a change in the subclass. Your effort for future updates will be higher.

```php
<?php
namespace Pyz\Zed\MyBundle\Business\Model;

use Spryker\Zed\MyBundle\Business\Model\AnyModel as SprykerAnyModel;

class AnyModel extends SprykerAnyModel
{
    // here you can overwrite public or protected methods from the core
}
```

## Extension via Object Composition
As an alternative to the class inheritance, you can also implement composition of objects. This approach is more flexible and more robust but it requires more work in the initial implementation. You need to implement the same interface and provide all public methods. So you need to copy over some lines of code from the core to the project. This way you take over more control about this code.

```php
<?php
namespace Pyz\Zed\MyBundle\Business\Model;

use Spryker\Zed\MyBundle\Business\Model\AnyModelInterface

class AnyModel implements AnyModelInterface
{
    
    /**
      * @var AnyModelInterface
      */
    private $anyModelFromCore;
    
    public function __construct(AnyModelInterface $anyModelFromCore)
    {
        $this->anyModelFromCore = $anyModelFromCore;
    }
    
    // The interfaces forces you to add all public methods. 
    // This gives you nice hooks into the code.

    public function a()
    {
        return $this->anyModelFromCore->a();
    }
    
    public function b()
    {
        return $this->anyModelFromCore->b();
    }
    
    public function c() 
    {
        return $this->anyModelFromCore->c();
    }
    
}
```

## Add your Class to the Factory
When you extend a class from the core, you want the core code to go use that one instead of the original class. To do so, add a [factory](https://documentation.spryker.com/docs/factory) to the same module and same layer. This factory must extend its equivalent from the core. Core will automatically detect the overwritten factory and use it. Now, you can easily exchange the classes and your extension.

**Example:**
| Path | Description |
| --- | --- |
| `Pyz\Zed\MyBundle\Business\MyBundleBusinessFactory`|Factory on a project level|
|`Spryker\Zed\MyBundle\Business\MyBundleBusinessFactory`|Factory on a core level |

## Factory in Case of Class Inheritance
```php
<?php
namespace Pyz\Zed\MyBundle\Business;
use Pyz\Zed\MyBundle\Business\Model\AnyModel;

use Pyz\Zed\MyBundle\MyBundleConfig;
use Pyz\Zed\MyBundle\Persistence\MyBundleQueryContainer;
use Spryker\Zed\MyBundle\Business\Block\BlockManager;
use Spryker\Zed\MyBundle\Business\MyBundleBusinessFactory as SprykerMyBundleBusinessFactory;

/**
 * @method MyBundleConfig getConfig()
 * @method MyBundleQueryContainer getQueryContainer()
 */
class MyBundleBusinessFactory extends SprykerMyBundleBusinessFactory
{
    
    public function createAnyModel()
    {
        // Returns your sub-class which inherits from the core. 
        // If needed you can inject any dependencies here as well.
        return new AnyModel();
    }
    
}
```

## Factory in Case of Composition
```php
<?php
namespace Pyz\Zed\MyBundle\Business;

use Pyz\Zed\MyBundle\Business\Model\AnyModel;

use Pyz\Zed\MyBundle\MyBundleConfig;
use Pyz\Zed\MyBundle\Persistence\MyBundleQueryContainer;
use Spryker\Zed\MyBundle\Business\Model\AnyModel as SprykerAnyModel;
use Spryker\Zed\MyBundle\Business\MyBundleBusinessFactory as SprykerMyBundleBusinessFactory;

/**
 * @method MyBundleConfig getConfig()
 * @method MyBundleQueryContainer getQueryContainer()
 */
class MyBundleBusinessFactory extends SprykerMyBundleBusinessFactory
{
    
    public function createAnyModel()
    {
        // First you need to instantiate the original class from core.
        // If needed you can inject any dependencies here as well.
        $anyModelFromCore = new SprykerAnyModel( // TODO parent::createAnyModel();
            $this->getAnyDependency(),
            $this->getAnyOtherDependency()
        )
        
        // Now you create the composed object which gets the original class injected
        return new AnyModel($anyModelFromCore); // TODO OWN CREATE METHOD
    }
    
}
```

