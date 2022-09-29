New Glue infrastructure implements the Convention feature. Through it, you can change the way your API accepts or returns data.

[comment]: <> (TODO: Add diagram)

So a convention has a say in every step of the request flow:

*   Resolving the convention happens first. Any data in the `GlueRequestTransfer` can affect the resolution of the convention. For example, projects can pull attributes from a certain location in the content.
    
*   During the building request step, it’s possible to extract and pre-format the data from the raw request data.
    
*   Convention can add validation steps that are necessary for its flow, both before and after the routing.
    
*   Formatting response can be used to wrap the response attributes in the convention-determined wrapper.
    

In order to introduce a new Convention, implement `ApiConventionPluginInterface`.

```
<?php

namespace Spryker\Glue\GlueJsonApiConvention\Plugin\GlueApplication;

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
        // This interface should be implemented by resources that follow this convention.

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
