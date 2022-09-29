This guide will show the process of creation the API endpoint using a resource for the Storefront API application.

* * *

Let’s say we have a module named `FooApi` where we want to have a new endpoint `/foo` with GET and POST methods.

1.  Create `FooApiConfig` and add resource name:
    

|     |
| --- |
| `\Pyz\Glue\FooApi\FooApiConfig` |
| ```<br><?php<br><br>namespace Pyz\Glue\FooApi;<br><br>use Spryker\Glue\Kernel\AbstractBundleConfig;<br><br>class FooApiConfig extends AbstractBundleConfig<br>{<br>    public const RESOURCE_FOO = 'foo';<br>}<br>``` |

2\. Create `foo_api.transfer.xml`

|     |
| --- |
| `\Pyz\Shared\FooApi\Transfer\foo_api.transfer.xml` |
| ```<br><?xml version="1.0"?><br><transfers xmlns="spryker:transfer-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="spryker:transfer-01 http://static.spryker.com/transfer-01.xsd"><br><br>  <transfer name="FooRestAttributes"><br>    //add transfer fields<br>  </transfer><br>  <br>  <transfer name="GlueResourceMethodCollection"><br>    <property name="get" type="GlueResourceMethodConfiguration"/><br>    <property name="post" type="GlueResourceMethodConfiguration"/><br>  </transfer><br><br>  <transfer name="GlueResourceMethodConfiguration"><br>    <property name="controller" type="string"/><br>    <property name="action" type="string"/><br>    <property name="attributes" type="string"/><br>  </transfer><br>  <br>  //add other used transfers<br></transfers><br>``` |

3\. Create `FooController`:

|     |
| --- |
| `\Pyz\Glue\FooApi\Controller\FooController` |
| ```<br><?php<br><br>namespace Pyz\Glue\FooApi\Controller;<br><br>use Generated\Shared\Transfer\FooRestAttributesTransfer;<br>use Generated\Shared\Transfer\GlueRequestTransfer;<br>use Generated\Shared\Transfer\GlueResourceTransfer;<br>use Generated\Shared\Transfer\GlueResponseTransfer;<br>use Pyz\Glue\FooApi\FooApiConfig;<br>use Spryker\Glue\Kernel\Controller\AbstractStorefrontApiController;<br><br>class FooResourceController extends AbstractStorefrontApiController<br>{<br>    public function getAction(<br>      string $id, <br>      GlueRequestTransfer $glueRequestTransfer<br>    ): GlueResponseTransfer {<br>        return (new GlueResponseTransfer())<br>          ->addResource((new GlueResourceTransfer())<br>            ->setId($id)<br>            ->setType(FooApiConfig::RESOURCE_FOO)<br>            ->setAttributes((new FooRestAttributesTransfer());<br>    }<br>    <br>    public function postAction(<br>      FooRestAttributesTransfer $fooRestAttributesTransfer,<br>      GlueRequestTransfer $glueRequestTransfer<br>    ): GlueResponseTransfer {<br>        return (new GlueResponseTransfer())<br>          ->addResource((new GlueResourceTransfer())<br>            ->setType(FooApiConfig::RESOURCE_FOO)<br>            ->setAttributes((new FooRestAttributesTransfer());<br>    }<br>}<br>``` |

Note the `AbstractStorefrontApiController` can be used only for Storefront API. For Backend API use the appropriate backend-specific class `AbstractBackendApiController`.

4\. Create `FooResource` :

For accepting the Json API convention the resource must implement `JsonApiResourceInterface`.

|     |
| --- |
| `\Pyz\Glue\FooApi\Plugin\FooResource` |
| ```<br><?php<br><br>namespace Pyz\Glue\FooApi\Plugin;<br><br>use Generated\Shared\Transfer\GlueResourceMethodCollectionTransfer;<br>use Generated\Shared\Transfer\GlueResourceMethodConfigurationTransfer;<br>use Generated\Shared\Transfer\FooRestAttributesTransfer;<br>use Pyz\Glue\FooApi\Controller\FooResourceController;<br>use Spryker\Glue\FooApi\FooApiConfig;<br>use Spryker\Glue\GlueApplication\Plugin\GlueApplication\AbstractResourcePlugin;<br>use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceInterface;<br><br>class FooResource extends AbstractResourcePlugin implements ResourceInterface<br>{<br>    public function getType(): string<br>    {<br>        return FooApiConfig::RESOURCE_FOO;<br>    }<br>    <br>    public function getController(): string<br>    {<br>        return FooResourceController::class;<br>    }<br><br>    public function getDeclaredMethods(): GlueResourceMethodCollectionTransfer<br>    {<br>        return (new GlueResourceMethodCollectionTransfer())<br>            ->setGet(new GlueResourceMethodConfigurationTransfer())<br>            ->setPost(<br>                (new GlueResourceMethodConfigurationTransfer())<br>                    ->setAction('postAction')->setAttributes(FooRestAttributesTransfer::class),<br>            );<br>    }<br>}<br>``` |

5\. Now declare the resource:

|     |
| --- |
| `\Pyz\Glue\GlueStorefrontApiApplication\GlueStorefrontApiApplicationDependencyProvider` |
| ```<br><?php<br><br>namespace Pyz\Glue\GlueStorefrontApiApplication;<br><br>use Pyz\Glue\FooApi\Plugin\FooResource;<br>use Spryker\Glue\GlueStorefrontApiApplication\GlueStorefrontApiApplicationDependencyProvider as SprykerGlueStorefrontApiApplicationDependencyProvider;<br><br>class GlueStorefrontApiApplicationDependencyProvider extends SprykerGlueStorefrontApiApplicationDependencyProvider<br>{<br>    protected function getResourcePlugins(): array<br>    {<br>        return [<br>            new FooResource(),<br>        ];<br>    }<br>}<br>``` |

![](https://spryker.atlassian.net/wiki/images/icons/grey_arrow_down.png)Verification

If everything is set up correctly, you should be able to access `http://glue-storefront.mysprykershop.com/foo` .