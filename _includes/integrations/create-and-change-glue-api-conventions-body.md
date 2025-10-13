The Backend API *Convention* feature lets you change the way your API accepts or returns data.

The following diagram demonstrates the Backend API request flow that highlights where the convention can affect the execution.

<div class="mxgraph" style="max-width:100%;border:1px solid transparent;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;nav&quot;:true,&quot;resize&quot;:true,&quot;toolbar&quot;:&quot;zoom layers tags lightbox&quot;,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;ac.draw.io\&quot; modified=\&quot;2022-10-13T10:15:50.631Z\&quot; agent=\&quot;5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36\&quot; etag=\&quot;BstIUINyP50NAm8-fRfq\&quot; version=\&quot;20.4.0\&quot; type=\&quot;embed\&quot;&gt;&lt;diagram id=\&quot;kgpKYQtTHZ0yAKxKKP6v\&quot; name=\&quot;Page-1\&quot;&gt;&lt;mxGraphModel dx=\&quot;710\&quot; dy=\&quot;1187\&quot; grid=\&quot;1\&quot; gridSize=\&quot;10\&quot; guides=\&quot;1\&quot; tooltips=\&quot;1\&quot; connect=\&quot;1\&quot; arrows=\&quot;1\&quot; fold=\&quot;1\&quot; page=\&quot;1\&quot; pageScale=\&quot;1\&quot; pageWidth=\&quot;850\&quot; pageHeight=\&quot;1100\&quot; math=\&quot;0\&quot; shadow=\&quot;0\&quot;&gt;&lt;root&gt;&lt;mxCell id=\&quot;0\&quot;/&gt;&lt;mxCell id=\&quot;1\&quot; parent=\&quot;0\&quot;/&gt;&lt;mxCell id=\&quot;3nuBFxr9cyL0pnOWT2aG-1\&quot; value=\&quot;GlueAppliaction\&quot; style=\&quot;shape=umlLifeline;perimeter=lifelinePerimeter;container=1;collapsible=0;recursiveResize=0;rounded=0;shadow=0;strokeWidth=1;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;&lt;mxGeometry x=\&quot;120\&quot; y=\&quot;80\&quot; width=\&quot;100\&quot; height=\&quot;330\&quot; as=\&quot;geometry\&quot;/&gt;&lt;/mxCell&gt;&lt;mxCell id=\&quot;3nuBFxr9cyL0pnOWT2aG-2\&quot; value=\&quot;\&quot; style=\&quot;points=[];perimeter=orthogonalPerimeter;rounded=0;shadow=0;strokeWidth=1;\&quot; parent=\&quot;3nuBFxr9cyL0pnOWT2aG-1\&quot; vertex=\&quot;1\&quot;&gt;&lt;mxGeometry x=\&quot;45\&quot; y=\&quot;70\&quot; width=\&quot;10\&quot; height=\&quot;260\&quot; as=\&quot;geometry\&quot;/&gt;&lt;/mxCell&gt;&lt;mxCell id=\&quot;3nuBFxr9cyL0pnOWT2aG-3\&quot; value=\&quot;dispatch\&quot; style=\&quot;verticalAlign=bottom;startArrow=oval;endArrow=block;startSize=8;shadow=0;strokeWidth=1;\&quot; parent=\&quot;3nuBFxr9cyL0pnOWT2aG-1\&quot; target=\&quot;3nuBFxr9cyL0pnOWT2aG-2\&quot; edge=\&quot;1\&quot;&gt;&lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;&lt;mxPoint x=\&quot;-15\&quot; y=\&quot;70\&quot; as=\&quot;sourcePoint\&quot;/&gt;&lt;/mxGeometry&gt;&lt;/mxCell&gt;&lt;mxCell id=\&quot;6NX8xG91MHoqcAc4rUNx-6\&quot; value=\&quot;validate request\&quot; style=\&quot;verticalAlign=bottom;startArrow=oval;endArrow=block;startSize=8;shadow=0;strokeWidth=1;entryX=0.1;entryY=0.272;entryDx=0;entryDy=0;entryPerimeter=0;\&quot; parent=\&quot;3nuBFxr9cyL0pnOWT2aG-1\&quot; target=\&quot;6NX8xG91MHoqcAc4rUNx-2\&quot; edge=\&quot;1\&quot;&gt;&lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;&lt;mxPoint x=\&quot;50\&quot; y=\&quot;150\&quot; as=\&quot;sourcePoint\&quot;/&gt;&lt;mxPoint x=\&quot;250\&quot; y=\&quot;160\&quot; as=\&quot;targetPoint\&quot;/&gt;&lt;Array as=\&quot;points\&quot;&gt;&lt;mxPoint x=\&quot;105.5\&quot; y=\&quot;149.5\&quot;/&gt;&lt;mxPoint x=\&quot;155.5\&quot; y=\&quot;149.5\&quot;/&gt;&lt;/Array&gt;&lt;/mxGeometry&gt;&lt;/mxCell&gt;&lt;mxCell id=\&quot;6NX8xG91MHoqcAc4rUNx-10\&quot; value=\&quot;validate request\&quot; style=\&quot;verticalAlign=bottom;startArrow=oval;endArrow=block;startSize=8;shadow=0;strokeWidth=1;entryX=0.5;entryY=0.188;entryDx=0;entryDy=0;entryPerimeter=0;\&quot; parent=\&quot;3nuBFxr9cyL0pnOWT2aG-1\&quot; edge=\&quot;1\&quot;&gt;&lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;&lt;mxPoint x=\&quot;50\&quot; y=\&quot;210\&quot; as=\&quot;sourcePoint\&quot;/&gt;&lt;mxPoint x=\&quot;245.5\&quot; y=\&quot;210.00000000000006\&quot; as=\&quot;targetPoint\&quot;/&gt;&lt;/mxGeometry&gt;&lt;/mxCell&gt;&lt;mxCell id=\&quot;6NX8xG91MHoqcAc4rUNx-12\&quot; value=\&quot;format response\&quot; style=\&quot;verticalAlign=bottom;startArrow=oval;endArrow=block;startSize=8;shadow=0;strokeWidth=1;entryX=0.1;entryY=0.716;entryDx=0;entryDy=0;entryPerimeter=0;\&quot; parent=\&quot;3nuBFxr9cyL0pnOWT2aG-1\&quot; target=\&quot;6NX8xG91MHoqcAc4rUNx-2\&quot; edge=\&quot;1\&quot;&gt;&lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;&lt;mxPoint x=\&quot;50\&quot; y=\&quot;260\&quot; as=\&quot;sourcePoint\&quot;/&gt;&lt;mxPoint x=\&quot;250.5\&quot; y=\&quot;260\&quot; as=\&quot;targetPoint\&quot;/&gt;&lt;/mxGeometry&gt;&lt;/mxCell&gt;&lt;mxCell id=\&quot;3nuBFxr9cyL0pnOWT2aG-5\&quot; value=\&quot;ApiApplication\&quot; style=\&quot;shape=umlLifeline;perimeter=lifelinePerimeter;container=1;collapsible=0;recursiveResize=0;rounded=0;shadow=0;strokeWidth=1;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;&lt;mxGeometry x=\&quot;520\&quot; y=\&quot;80\&quot; width=\&quot;100\&quot; height=\&quot;330\&quot; as=\&quot;geometry\&quot;/&gt;&lt;/mxCell&gt;&lt;mxCell id=\&quot;3nuBFxr9cyL0pnOWT2aG-6\&quot; value=\&quot;\&quot; style=\&quot;points=[];perimeter=orthogonalPerimeter;rounded=0;shadow=0;strokeWidth=1;\&quot; parent=\&quot;3nuBFxr9cyL0pnOWT2aG-5\&quot; vertex=\&quot;1\&quot;&gt;&lt;mxGeometry x=\&quot;45\&quot; y=\&quot;80\&quot; width=\&quot;10\&quot; height=\&quot;250\&quot; as=\&quot;geometry\&quot;/&gt;&lt;/mxCell&gt;&lt;mxCell id=\&quot;6NX8xG91MHoqcAc4rUNx-1\&quot; value=\&quot;Convention\&quot; style=\&quot;shape=umlLifeline;perimeter=lifelinePerimeter;container=1;collapsible=0;recursiveResize=0;rounded=0;shadow=0;strokeWidth=1;\&quot; parent=\&quot;1\&quot; vertex=\&quot;1\&quot;&gt;&lt;mxGeometry x=\&quot;320\&quot; y=\&quot;80\&quot; width=\&quot;100\&quot; height=\&quot;330\&quot; as=\&quot;geometry\&quot;/&gt;&lt;/mxCell&gt;&lt;mxCell id=\&quot;6NX8xG91MHoqcAc4rUNx-2\&quot; value=\&quot;\&quot; style=\&quot;points=[];perimeter=orthogonalPerimeter;rounded=0;shadow=0;strokeWidth=1;\&quot; parent=\&quot;6NX8xG91MHoqcAc4rUNx-1\&quot; vertex=\&quot;1\&quot;&gt;&lt;mxGeometry x=\&quot;45\&quot; y=\&quot;80\&quot; width=\&quot;10\&quot; height=\&quot;250\&quot; as=\&quot;geometry\&quot;/&gt;&lt;/mxCell&gt;&lt;mxCell id=\&quot;6NX8xG91MHoqcAc4rUNx-11\&quot; value=\&quot;validate request\&quot; style=\&quot;verticalAlign=bottom;startArrow=oval;endArrow=block;startSize=8;shadow=0;strokeWidth=1;\&quot; parent=\&quot;6NX8xG91MHoqcAc4rUNx-1\&quot; edge=\&quot;1\&quot;&gt;&lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;&lt;mxPoint x=\&quot;-150\&quot; y=\&quot;230\&quot; as=\&quot;sourcePoint\&quot;/&gt;&lt;mxPoint x=\&quot;250\&quot; y=\&quot;230\&quot; as=\&quot;targetPoint\&quot;/&gt;&lt;/mxGeometry&gt;&lt;/mxCell&gt;&lt;mxCell id=\&quot;6NX8xG91MHoqcAc4rUNx-13\&quot; value=\&quot;format response\&quot; style=\&quot;verticalAlign=bottom;startArrow=oval;endArrow=block;startSize=8;shadow=0;strokeWidth=1;\&quot; parent=\&quot;6NX8xG91MHoqcAc4rUNx-1\&quot; edge=\&quot;1\&quot;&gt;&lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;&lt;mxPoint x=\&quot;-150\&quot; y=\&quot;280\&quot; as=\&quot;sourcePoint\&quot;/&gt;&lt;mxPoint x=\&quot;250\&quot; y=\&quot;280\&quot; as=\&quot;targetPoint\&quot;/&gt;&lt;/mxGeometry&gt;&lt;/mxCell&gt;&lt;mxCell id=\&quot;6NX8xG91MHoqcAc4rUNx-3\&quot; value=\&quot;resolve convention\&quot; style=\&quot;verticalAlign=bottom;startArrow=oval;endArrow=block;startSize=8;shadow=0;strokeWidth=1;\&quot; parent=\&quot;1\&quot; edge=\&quot;1\&quot;&gt;&lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;&lt;mxPoint x=\&quot;170\&quot; y=\&quot;170\&quot; as=\&quot;sourcePoint\&quot;/&gt;&lt;mxPoint x=\&quot;370\&quot; y=\&quot;170\&quot; as=\&quot;targetPoint\&quot;/&gt;&lt;/mxGeometry&gt;&lt;/mxCell&gt;&lt;mxCell id=\&quot;6NX8xG91MHoqcAc4rUNx-4\&quot; value=\&quot;build request\&quot; style=\&quot;verticalAlign=bottom;startArrow=oval;endArrow=block;startSize=8;shadow=0;strokeWidth=1;entryX=0.5;entryY=0.188;entryDx=0;entryDy=0;entryPerimeter=0;\&quot; parent=\&quot;1\&quot; edge=\&quot;1\&quot;&gt;&lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;&lt;mxPoint x=\&quot;169.5\&quot; y=\&quot;191\&quot; as=\&quot;sourcePoint\&quot;/&gt;&lt;mxPoint x=\&quot;370\&quot; y=\&quot;191\&quot; as=\&quot;targetPoint\&quot;/&gt;&lt;/mxGeometry&gt;&lt;/mxCell&gt;&lt;mxCell id=\&quot;6NX8xG91MHoqcAc4rUNx-5\&quot; value=\&quot;build request\&quot; style=\&quot;verticalAlign=bottom;startArrow=oval;endArrow=block;startSize=8;shadow=0;strokeWidth=1;\&quot; parent=\&quot;1\&quot; edge=\&quot;1\&quot;&gt;&lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;&lt;mxPoint x=\&quot;170\&quot; y=\&quot;209\&quot; as=\&quot;sourcePoint\&quot;/&gt;&lt;mxPoint x=\&quot;570\&quot; y=\&quot;209\&quot; as=\&quot;targetPoint\&quot;/&gt;&lt;Array as=\&quot;points\&quot;&gt;&lt;mxPoint x=\&quot;320\&quot; y=\&quot;209\&quot;/&gt;&lt;mxPoint x=\&quot;420\&quot; y=\&quot;209\&quot;/&gt;&lt;/Array&gt;&lt;/mxGeometry&gt;&lt;/mxCell&gt;&lt;mxCell id=\&quot;6NX8xG91MHoqcAc4rUNx-7\&quot; value=\&quot;validate request\&quot; style=\&quot;verticalAlign=bottom;startArrow=oval;endArrow=block;startSize=8;shadow=0;strokeWidth=1;\&quot; parent=\&quot;1\&quot; edge=\&quot;1\&quot;&gt;&lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;&lt;mxPoint x=\&quot;170\&quot; y=\&quot;250\&quot; as=\&quot;sourcePoint\&quot;/&gt;&lt;mxPoint x=\&quot;570\&quot; y=\&quot;250\&quot; as=\&quot;targetPoint\&quot;/&gt;&lt;/mxGeometry&gt;&lt;/mxCell&gt;&lt;mxCell id=\&quot;6NX8xG91MHoqcAc4rUNx-9\&quot; value=\&quot;route request\&quot; style=\&quot;verticalAlign=bottom;startArrow=oval;endArrow=block;startSize=8;shadow=0;strokeWidth=1;\&quot; parent=\&quot;1\&quot; target=\&quot;3nuBFxr9cyL0pnOWT2aG-5\&quot; edge=\&quot;1\&quot;&gt;&lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;&lt;mxPoint x=\&quot;170\&quot; y=\&quot;270.00000000000006\&quot; as=\&quot;sourcePoint\&quot;/&gt;&lt;mxPoint x=\&quot;370.5\&quot; y=\&quot;270.00000000000006\&quot; as=\&quot;targetPoint\&quot;/&gt;&lt;/mxGeometry&gt;&lt;/mxCell&gt;&lt;/root&gt;&lt;/mxGraphModel&gt;&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
<script type="text/javascript" src="https://viewer.diagrams.net/js/viewer-static.min.js"></script>

A convention has a say in every step of the request flow:

* Resolving the convention happens first. Any data in `GlueRequestTransfer` can affect the resolution of the convention. For example, projects can pull attributes from a certain location in the content.
* At the request building step, you can extract and pre-format the data from the raw request data.
* A convention can add validation steps that are necessary for its flow, both before and after the routing.
* Formatting response can be used to wrap the response attributes in the convention-determined wrapper.

## Create a new convention

To crete a new convention, implement `ConventionPluginInterface`:

```php
<?php

namespace Pyz\Glue\GlueJsonApiConvention\Plugin\GlueApplication;

use Generated\Shared\Transfer\GlueRequestTransfer;
use Pyz\Glue\CustomConventionExtension\Dependency\Plugin\CustomResourceInterface;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ConventionPluginInterface;
use Spryker\Glue\Kernel\AbstractPlugin;

class CustomConventionPlugin extends AbstractPlugin implements ConventionPluginInterface
{
    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @param \Generated\Shared\Transfer\GlueRequestTransfer $glueRequestTransfer
     *
     * @return bool
     */
    public function isApplicable(GlueRequestTransfer $glueRequestTransfer): bool
    {
        // Check any info in the GlueRequestTransfer, like headers.

        return true;
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @return string
     */
    public function getName(): string
    {
        return 'CUSTOM_CONVENTION';
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @return string
     */
    public function getResourceType(): string
    {
        // This interface must be implemented by resources that follow this convention.

        return CustomResourceInterface::class;
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RequestBuilderPluginInterface>
     */
    public function provideRequestBuilderPlugins(): array
    {
        return $this->getFactory()->getRequestBuilderPlugins();
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RequestValidatorPluginInterface>
     */
    public function provideRequestValidatorPlugins(): array
    {
        return $this->getFactory()->getRequestValidatorPlugins();
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RequestAfterRoutingValidatorPluginInterface>
     */
    public function provideRequestAfterRoutingValidatorPlugins(): array
    {
        return $this->getFactory()->getRequestAfterRoutingValidatorPlugins();
    }

    /**
     * {@inheritDoc}
     *
     * @api
     *
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResponseFormatterPluginInterface>
     */
    public function provideResponseFormatterPlugins(): array
    {
        return $this->getFactory()->getResponseFormatterPlugins();
    }
}
```

## Use a convention
To use the newly created convention, you must add it to the `GlueApplicationDependencyProvider::getConventionPlugins()`.

```php
<?php

namespace namespace Pyz\Glue\GlueApplication;

use Pyz\Glue\GlueJsonApiConvention\Plugin\GlueApplication\CustomConventionPlugin;
use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ConventionPluginInterface>
     */
    protected function getConventionPlugins(): array
    {
        return [
            new CustomConventionPlugin(),
        ];
    }
}
```

{% info_block infoBox %}

If no convention has been defined, endpoints will work with default (no convention) behavior.
In this case, the resource should implement `Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceInterface`.

{% endinfo_block %}