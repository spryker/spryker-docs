---
title: Extend the core
description: There are three ways to extend classes from the core—replacement class, inheritance object, and composition.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/core-extension
originalArticleId: 8baa3c78-9795-426b-9df2-576290b2acb4
redirect_from:
  - /docs/scos/dev/back-end-development/extend-spryker/spryker-os-module-customisation/extend-the-core.html
  - /docs/scos/dev/back-end-development/extend-spryker/extending-the-core.html
  - /docs/scos/dev/back-end-development/extend-spryker/spryker-os-module-customisation/extending-the-core.html
related:
  - title: Extend the Spryker Core functionality
    link: docs/dg/dev/backend-development/extend-spryker/spryker-os-module-customisation/extend-the-spryker-core-functionality.html
  - title: Extend a core module that is used by another
    link: docs/dg/dev/backend-development/extend-spryker/spryker-os-module-customisation/extend-a-core-module-that-is-used-by-another-module.html
---

We offer several ways like plugins to hook into the core's behavior and extend this without modifications. But sometimes this is not enough, so you need to replace a method that is deep in the core.

Before you proceed, double-check if there is no other way to solve your requirement, maybe there is a facade method that fits in or you can use plugins. You must understand that if you do a core extension, you are behind the stable internal APIs, so there is no guarantee that the extended class is not modified, renamed, or even non-existing in the next release. Therefore, you take over responsibility for your extension, and it's highly recommended to cover it with unit tests. If it's not urgent, you can request a change in our support desk to get an official extension point.

There are three ways to extend classes from the core:
- Replacement class
- Inheritance object
- Composition

Each of them has its advantages and disadvantages.

## Extension using replacement

To completely replace a class from the core, add a class that contains all the `public` methods from the original class and implements the same interface.

## Extension using class inheritance

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

## Extension using object composition

As an alternative to class inheritance, you can also implement the composition of objects. This approach is more flexible and robust, but it requires more work in the initial implementation. You need to implement the same interface and provide all public methods. So you need to copy over some lines of code from the core to the project. This way you take over more control about this code.

```php
<?php

namespace Pyz\Zed\MyBundle\Business\Model;

use Spryker\Zed\MyBundle\Business\Model\AnyModelInterface;

class AnyModel implements AnyModelInterface
{
    /**
      * @var \Spryker\Zed\MyBundle\Business\Model\AnyModelInterface
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

## Add your class to the factory

When you extend a class from the core, you want the core code to go use that one instead of the original class. To do so, add a [factory](/docs/dg/dev/backend-development/factory/factory.html) to the same module and same layer. This factory must extend its equivalent from the core. The core will automatically detect the overwritten factory and use it. Now, you can easily exchange the classes and your extension.

**Example:**

| PATH | DESCRIPTION |
| --- | --- |
| `Pyz\Zed\MyBundle\Business\MyBundleBusinessFactory`|Factory on a project level|
|`Spryker\Zed\MyBundle\Business\MyBundleBusinessFactory`|Factory on a core level |

## Factory in case of class inheritance

```php
<?php

namespace Pyz\Zed\MyBundle\Business;

use Pyz\Zed\MyBundle\Business\Model\AnyModel;
use Pyz\Zed\MyBundle\MyBundleConfig;
use Pyz\Zed\MyBundle\Persistence\MyBundleQueryContainer;
use Spryker\Zed\MyBundle\Business\MyBundleBusinessFactory as SprykerMyBundleBusinessFactory;

/**
 * @method MyBundleConfig getConfig()
 * @method MyBundleQueryContainer getQueryContainer()
 */
class MyBundleBusinessFactory extends SprykerMyBundleBusinessFactory
{
    /**
     * @return \Pyz\Zed\MyBundle\Business\Model\AnyModel
     */
    public function createAnyModel()
    {
        // Returns your sub-class which inherits from the core.
        // If needed you can inject any dependencies here as well.
        return new AnyModel();
    }
}
```

## Factory in case of composition

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
    /**
     * @return \Pyz\Zed\MyBundle\Business\Model\AnyModel
     */
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
