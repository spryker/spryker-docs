This guide describes how to add resources through relationships. The following concept is allowed only for applications that implemented the Glue Json API convention.

* * *

Let’s say we have a module named `FooApi` where we want to add `bar` resource related to `foo` resource.

1.  Create `FooBarResourceRelationshipPlugin`:
    

|     |
| --- |
| `src\Pyz\Glue\FooApi\Plugin\FooBarResourceRelationshipPlugin.php` |
| ```<br><?php<br><br>namespace Pyz\Glue\FooApi\Plugin\GlueJsonApiConvention;<br><br>use Generated\Shared\Transfer\GlueRelationshipTransfer;<br>use Generated\Shared\Transfer\GlueRequestTransfer;<br>use Generated\Shared\Transfer\GlueResourceTransfer;<br>use Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\ResourceRelationshipPluginInterface;<br>use Spryker\Glue\Kernel\AbstractPlugin;<br><br>class FooBarResourceRelationshipPlugin extends AbstractPlugin implements ResourceRelationshipPluginInterface<br>{<br><br>    protected const RESOURCE_TYPE_BAR = 'bar';<br><br>    public function addRelationships(array $resources, GlueRequestTransfer $glueRequestTransfer): void<br>    {<br>        foreach ($resources as $glueResourceTransfer) {<br>            $glueRelationshipTransfer = (new GlueRelationshipTransfer())<br>                ->addResource(new GlueResourceTransfer());<br>            $glueResourceTransfer->addRelationship($glueRelationshipTransfer);<br>        }<br>    }<br><br>    public function getRelationshipResourceType(): string<br>    {<br>        return static::RESOURCE_TYPE_BAR;<br>    }<br>}<br><br>``` |

2\. Now declare the relationship resource:

|     |
| --- |
| `src\Pyz\Glue\GlueStorefrontApiApplicationGlueJsonApiConventionConnector\GlueStorefrontApiApplicationGlueJsonApiConventionConnectorDependencyProvider.php` |
| ```<br><?php<br><br>namespace Pyz\Glue\GlueStorefrontApiApplicationGlueJsonApiConventionConnector;<br><br>use Pyz\Glue\FooApi\Plugin\FooBarResourceRelationshipPlugin;<br>use Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;<br>use Spryker\Glue\GlueStorefrontApiApplicationGlueJsonApiConventionConnector\GlueStorefrontApiApplicationGlueJsonApiConventionConnectorDependencyProvider as SprykerGlueStorefrontApiApplicationGlueJsonApiConventionConnectorDependencyProvider;<br><br>class GlueStorefrontApiApplicationGlueJsonApiConventionConnectorDependencyProvider extends SprykerGlueStorefrontApiApplicationGlueJsonApiConventionConnectorDependencyProvider<br>{<br>    protected const RESOURCE_FOO = 'foo';<br>    <br>    /**<br>     * @param \Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface $resourceRelationshipCollection<br>     *<br>     * @return \Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface<br>     */<br>    protected function getResourceRelationshipPlugins(<br>        ResourceRelationshipCollectionInterface $resourceRelationshipCollection<br>    ): ResourceRelationshipCollectionInterface {<br>        $resourceRelationshipCollection->addRelationship(<br>            static::RESOURCE_FOO,<br>            new FooBarResourceRelationshipPlugin(),<br>        );<br><br>        return $resourceRelationshipCollection;<br>    }<br>}<br>``` |

![](https://spryker.atlassian.net/wiki/images/icons/grey_arrow_down.png)Verification

If everything is set up correctly, you should be able to access `http://glue-storefront.mysprykershop.com/foo?include=bar`