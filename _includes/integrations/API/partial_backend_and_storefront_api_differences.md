This document describes differences between Storefront API (REST API) and Backend API.

Spryker provides two main API applications in the same project. *Storefront APIs* are designed for consumer-facing applications and provide access to Storage and Elasticsearch, making RPC Zed calls using Clients. *Backend APIs* are designed for administrative and system-to-system communication with direct access to Facades, enabling performant backend operations.

Storefront API uses customer-based authentication, while Backend API uses user-based authentication.

The main difference between storefront and backend APIs is in the base classes that each type of module uses. Because storefront APIs remain lightweight. Backend APIs are getting abstract classes that have access to Facades from other modules.

The following table shows classes to use for the backend and storefront:

| CLASS | STOREFRONT | BACKEND |
| --- | --- | --- |
| AbstractFactory | `\Spryker\Glue\Kernel\AbstractFactory` | `\Spryker\Glue\Kernel\Backend\AbstractFactory` |
| AbstractBundleDependencyProvider | `\Spryker\Glue\Kernel\AbstractBundleDependencyProvider` | `\Spryker\Glue\Kernel\Backend\AbstractBundleDependencyProvider` |
| Container | `\Spryker\Glue\Kernel\Container` | `\Spryker\Glue\Kernel\Backend\Container` |
| AbstractPlugin | `\Spryker\Glue\Kernel\AbstractPlugin` | `\Spryker\Glue\Kernel\Backend\AbstractPlugin` |

Storefront and backend classes MUST be in different modules. For storefront, it should be `ResourceNameRestApi`, and for backend `ResourceNameBackendApi`.

Let's go through the creation of backend module infrastructure classes:

1. **\Pyz\Glue\CustomBackendApi\CustomBackendApiDependencyProvider**:

```php
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

{% info_block infoBox %}

In the backend dependency provider, the backend container can resolve facades.

The function to provide backend dependencies is `provideBackendDependencies`.

{% endinfo_block %}

2. Factory:

**\Pyz\Glue\CustomBackendApi\CustomApiApplicationFactory**

```php
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

Backend `AbstractFactory` has access to backend `Container`.

Let's see what `AbstractPlugin` allows you to access:

**\Pyz\Glue\CustomApiApplication\Plugin\CustomApiGlueContextExpanderPlugin**

```php
<?php

namespace Pyz\Glue\CustomApiApplication\Plugin;

use Generated\Shared\Transfer\GlueApiContextTransfer;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\GlueContextExpanderPluginInterface;
use Spryker\Glue\Kernel\Backend\AbstractPlugin;

/**
 * @method \Pyz\Zed\CustomApiApplication\Business\CustomApiApplicationFacadeInterface getFacade()
 * @method \Pyz\Glue\CustomApiApplication\CustomApiApplicationFactory getFactory()
 * @method \Pyz\Zed\CustomApiApplication\Persistence\CustomApiApplicationRepositoryInterface getRepository()
 * @method \Pyz\Zed\CustomApiApplication\Persistence\CustomApiApplicationEntityManagerInterface getEntityManager()
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

The concrete plugin interface here is implemented just as an example to demonstrate that `Facade`, `Repository`, and `EntityManager` of the module are directly accessible from any Glue backend plugin.
