---
title: Backend and storefront API module differences
description: This document describes the difference between the code in a backend and storefront API modules.
last_updated: September 30, 2022
template: howto-guide-template
redirect_from:
  - /docs/scos/dev/glue-api-guides/202204.0/glue-backend-api/how-to-guides/create-backend-vs-storefront-api-endpoint.html
  - /docs/scos/dev/glue-api-guides/202204.0/glue-backend-api/how-to-guides/backend-and-storefront-api-module-differences.html
  - /docs/scos/dev/glue-api-guides/202212.0/decoupled-glue-infrastructure/backend-and-storefront-api-module-differences.html
  - /docs/scos/dev/glue-api-guides/202311.0/decoupled-glue-infrastructure/backend-and-storefront-api-module-differences.html
  - /docs/scos/dev/glue-api-guides/202204.0/decoupled-glue-infrastructure/backend-and-storefront-api-module-differences.html
  - /docs/scos/dev/glue-api-guides/202311.0/backend-and-storefront-api-module-differences.html

---

This document describes differences between the backend and storefront code in API modules.

The Glue infrastructure can build not only the storefront but also backend APIs in the same project. *storefront APIs* inherit the possibilities of the old Spryker Glue implementation in terms of what they can do and what they have access to. For example, storefront APIs can access Storage and Elasticsearch and make RPC Zed calls using Clients. *backend APIs* have direct access to Facades, which lets you create performant backend APIs that you might often need for your projects.

The storefront API uses authentication based on the customer, while the backend API is based on the user.

The main difference between storefront and backend APIs is in the base classes that each type of module uses. Since storefront APIs continue providing lightweight APIs like Spryker Glue of the previous implementation did, they use the same base classes. backend APIs are getting abstract classes that have access to Facades from other modules.

The following table shows classes to use for the backend and storefront:

| CLASS | STOREFRONT | BACKEND |
| --- | --- | --- |
| AbstractFactory | `\Spryker\Glue\Kernel\AbstractFactory` | `\Spryker\Glue\Kernel\Backend\AbstractFactory` |
| AbstractBundleDependencyProvider | `\Spryker\Glue\Kernel\AbstractBundleDependencyProvider` | `\Spryker\Glue\Kernel\Backend\AbstractBundleDependencyProvider` |
| Container | `\Spryker\Glue\Kernel\Container` | `\Spryker\Glue\Kernel\Backend\Container` |
| AbstractPlugin | `\Spryker\Glue\Kernel\AbstractPlugin` | `\Spryker\Glue\Kernel\Backend\AbstractPlugin` |

Storefront and backend classes MUST be in different modules. For storefront it should be `ResourceNameStorefrontApi`, and for backend `ResourceNameBackendApi`.

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
