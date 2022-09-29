New Glue infrastructure has introduced the possibility to build not only storefront but also backend APIs in the same project. Storefront APIs inherit the possibilities of old Glue in terms of what they can do and what they have access to (Storage and ElasticSearch, make RPC Zed calls via Clients). Backend APIs have direct access to Facades that enables creation of performant backend APIs projects often need.

This document will describe how exactly the code in a backend and storefront API modules are different. It will focus on the differences.

    

The main difference between a storefront and backend APIs will be in the base classes each type of module uses. Since Storefront APIs will continue providing lightweight APIs same as old Glue did, they will use the same base classes. Backend APIs are getting the new abstract classes that will have access to Facades from other modules.

|     |     |     |
| --- | --- | --- |
| **Class** | **Storefront** | **Backend** |
| AbstractFactory | `\Spryker\Glue\Kernel\AbstractFactory` | `\Spryker\Glue\Kernel\Backend\AbstractFactory` |
| AbstractBundleDependencyProvider | `\Spryker\Glue\Kernel\AbstractBundleDependencyProvider` | `\Spryker\Glue\Kernel\Backend\AbstractBundleDependencyProvider` |
| Container | `\Spryker\Glue\Kernel\Container` | `\Spryker\Glue\Kernel\Backend\Container` |
| AbstractPlugin | `\Spryker\Glue\Kernel\AbstractPlugin` | `\Spryker\Glue\Kernel\Backend\AbstractPlugin` |

Storefront and backend classes are not to be mixed in the same module.

Let’s go through creation of a backend module infrastructure classes.
`\Pyz\Glue\CustomBackendApi\CustomBackendApiDependencyProvider`

```
<?php

namespace Pyz\Glue\CustomBackendApi;

use Spryker\Glue\Kernel\Backend\AbstractBundleDependencyProvider;
use Spryker\Glue\Kernel\Backend\Container;

class CustomBackendApiDependencyProvider extends AbstractBundleDependencyProvider
{
    public const FACADE_CUSTOMER = 'FACADE_CUSTOMER';

    /**
     * @param \Spryker\Glue\Kernel\Backend\Container $container
     *
     * @return \Spryker\Glue\Kernel\Backend\Container
     */
    public function provideBackendDependencies(Container $container): Container
    {
        $container = parent::provideBackendDependencies($container);
        $container = $this->addCustomerFacade($container);

        return $container;
    }

    /**
     * @param \Spryker\Glue\Kernel\Backend\Container $container
     *
     * @return \Spryker\Glue\Kernel\Backend\Container
     */
    protected function addCustomerFacade(Container $container): Container
    {
        $container->set(static::FACADE_CUSTOMER, function (Container $container) {
            return $container->getLocator()->customer()->facade();
        });

        return $container;
    }
}
```


Note that in the Backend dependency provider, Backend Container will be able to resolve Facades. Also note that the function to provide Backend Dependencies is `provideBackendDependencies`.

Factory:`\Pyz\Glue\CustomBackendApi\CustomApiApplicationFactory`
```
<?php

namespace Pyz\Glue\CustomBackendApi;

use Spryker\Glue\Kernel\Backend\AbstractFactory;
use Spryker\Zed\Customer\Business\CustomerFacadeInterface;

class CustomApiApplicationFactory extends AbstractFactory
{
    /**
     * @return \Spryker\Zed\Customer\Business\CustomerFacadeInterface
     */
    public function getCustomerFacade(): CustomerFacadeInterface
    {
        return $this->getProvidedDependency(CustomBackendApiDependencyProvider::FACADE_CUSTOMER);
    }
}

```

Backend `AbstractFactory` will have access to the backend Container.

Let’s see what AbstractPlugin allows to access: `\Pyz\Glue\CustomApiApplication\Plugin\CustomApiGlueContextExpanderPlugin`

```
<?php

namespace Pyz\Glue\CustomApiApplication\Plugin;

use Generated\Shared\Transfer\GlueApiContextTransfer;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\GlueContextExpanderPluginInterface;
use Spryker\Glue\Kernel\Backend\AbstractPlugin;

/**
 * @method \Pyz\Glue\CustomApiApplication\CustomApiApplicationFactory getFactory()
 */
class CustomApiGlueContextExpanderPlugin extends AbstractPlugin implements GlueContextExpanderPluginInterface
{
    public function expand(GlueApiContextTransfer $glueApiContextTransfer): GlueApiContextTransfer
    {
        $this->getFacade();
        $this->getRepository();
        $this->getEntityManager();

        return $glueApiContextTransfer;
    }
}

```
The concrete plugin interface here is implemented just as an example to demonstrate that Facade, Repository and EntityManager of the module are dirrectly accessible from any Glue Backend plugin.
