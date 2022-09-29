New Glue infrastructure has introduced the possibility to build not only storefront but also backend APIs in the same project. Storefront APIs inherit the possibilities of old Glue in terms of what they can do and what they have access to (Storage and ElasticSearch, make RPC Zed calls via Clients). Backend APIs have direct access to Facades that enables creation of performant backend APIs projects often need.

This document will describe how exactly the code in a backend and storefront API modules are different. It will focus on the differences, so if you want to learn how to create endpoints (resources or custom routes) you can check:

*   [\[FINAL\] Create a resource](https://spryker.atlassian.net/wiki/spaces/CORE/pages/3298459765)
    
*   [\[FINAL\] Create a custom route](https://spryker.atlassian.net/wiki/spaces/CORE/pages/3293941112)
    

The main difference between a storefront and backend APIs will be in the base classes each type of module uses. Since Storefront APIs will continue providing lightweight APIs same as old Glue did, they will use the same base classes. Backend APIs are getting the new abstract classes that will have access to Facades from other modules.

|     |     |     |
| --- | --- | --- |
| **Class** | **Storefront** | **Backend** |
| AbstractFactory | `\Spryker\Glue\Kernel\AbstractFactory` | `\Spryker\Glue\Kernel\Backend\AbstractFactory` |
| AbstractBundleDependencyProvider | `\Spryker\Glue\Kernel\AbstractBundleDependencyProvider` | `\Spryker\Glue\Kernel\Backend\AbstractBundleDependencyProvider` |
| Container | `\Spryker\Glue\Kernel\Container` | `\Spryker\Glue\Kernel\Backend\Container` |
| AbstractPlugin | `\Spryker\Glue\Kernel\AbstractPlugin` | `\Spryker\Glue\Kernel\Backend\AbstractPlugin` |

Storefront and backend classes are not to be mixed in the same module.

Let’s go through creation of a backend module infrastructure classes (creating a storefront one is described in the [\[FINAL\] Create a custom route](https://spryker.atlassian.net/wiki/spaces/CORE/pages/3293941112)).

|     |
| --- |
| `\Pyz\Glue\CustomBackendApi\CustomBackendApiDependencyProvider` |
| ```<br><?php<br><br>namespace Pyz\Glue\CustomBackendApi;<br><br>use Spryker\Glue\Kernel\Backend\AbstractBundleDependencyProvider;<br>use Spryker\Glue\Kernel\Backend\Container;<br><br>class CustomBackendApiDependencyProvider extends AbstractBundleDependencyProvider<br>{<br>    public const FACADE_CUSTOMER = 'FACADE_CUSTOMER';<br><br>    /**<br>     * @param \Spryker\Glue\Kernel\Backend\Container $container<br>     *<br>     * @return \Spryker\Glue\Kernel\Backend\Container<br>     */<br>    public function provideBackendDependencies(Container $container): Container<br>    {<br>        $container = parent::provideBackendDependencies($container);<br>        $container = $this->addCustomerFacade($container);<br><br>        return $container;<br>    }<br><br>    /**<br>     * @param \Spryker\Glue\Kernel\Backend\Container $container<br>     *<br>     * @return \Spryker\Glue\Kernel\Backend\Container<br>     */<br>    protected function addCustomerFacade(Container $container): Container<br>    {<br>        $container->set(static::FACADE_CUSTOMER, function (Container $container) {<br>            return $container->getLocator()->customer()->facade();<br>        });<br><br>        return $container;<br>    }<br>}<br>``` |

Note that in the Backend dependency provider, Backend Container will be able to resolve Facades. Also note that the function to provide Backend Dependencies is provideBackendDependencies.

Factory:

|     |
| --- |
| `\Pyz\Glue\CustomBackendApi\CustomApiApplicationFactory` |
| ```<br><?php<br><br>namespace Pyz\Glue\CustomBackendApi;<br><br>use Spryker\Glue\Kernel\Backend\AbstractFactory;<br>use Spryker\Zed\Customer\Business\CustomerFacadeInterface;<br><br>class CustomApiApplicationFactory extends AbstractFactory<br>{<br>    /**<br>     * @return \Spryker\Zed\Customer\Business\CustomerFacadeInterface<br>     */<br>    public function getCustomerFacade(): CustomerFacadeInterface<br>    {<br>        return $this->getProvidedDependency(CustomBackendApiDependencyProvider::FACADE_CUSTOMER);<br>    }<br>}<br>``` |

Backend AbstractFactory will have access to the backend Container.

Let’s see what AbstractPlugin allows to access:

|     |
| --- |
| `\Pyz\Glue\CustomApiApplication\Plugin\CustomApiGlueContextExpanderPlugin` |
| ```<br><?php<br><br>namespace Pyz\Glue\CustomApiApplication\Plugin;<br><br>use Generated\Shared\Transfer\GlueApiContextTransfer;<br>use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\GlueContextExpanderPluginInterface;<br>use Spryker\Glue\Kernel\Backend\AbstractPlugin;<br><br>/**<br> * @method \Pyz\Glue\CustomApiApplication\CustomApiApplicationFactory getFactory()<br> */<br>class CustomApiGlueContextExpanderPlugin extends AbstractPlugin implements GlueContextExpanderPluginInterface<br>{<br>    public function expand(GlueApiContextTransfer $glueApiContextTransfer): GlueApiContextTransfer<br>    {<br>        $this->getFacade();<br>        $this->getRepository();<br>        $this->getEntityManager();<br><br>        return $glueApiContextTransfer;<br>    }<br>}<br>``` |

The concrete plugin interface here is implemented just as an example to demonstrate that Facade, Repository and EntityManager of the module are dirrectly accessible from any Glue Backend plugin.