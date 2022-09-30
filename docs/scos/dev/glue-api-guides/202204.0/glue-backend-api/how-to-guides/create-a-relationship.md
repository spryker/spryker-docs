---
title: How to create a JSON:API relationship
description: 
last_updated: September 30, 2022
template: howto-guide-template
---
This guide describes how to add resources through relationships. The following concept is allowed only for applications that implemented the Glue Json API convention.

* * *

Let’s say we have a module named `FooApi` where we want to add `bar` resource related to `foo` resource.

1.  Create `FooBarResourceRelationshipPlugin`: `src\Pyz\Glue\FooApi\Plugin\FooBarResourceRelationshipPlugin.php`

```
<?php

<?php

namespace Pyz\Glue\FooApi\Plugin\GlueJsonApiConvention;

use Generated\Shared\Transfer\GlueRelationshipTransfer;
use Generated\Shared\Transfer\GlueRequestTransfer;
use Generated\Shared\Transfer\GlueResourceTransfer;
use Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\ResourceRelationshipPluginInterface;
use Spryker\Glue\Kernel\AbstractPlugin;

class FooBarResourceRelationshipPlugin extends AbstractPlugin implements ResourceRelationshipPluginInterface
{

    protected const RESOURCE_TYPE_BAR = 'bar';

    public function addRelationships(array $resources, GlueRequestTransfer $glueRequestTransfer): void
    {
        foreach ($resources as $glueResourceTransfer) {
            $glueRelationshipTransfer = (new GlueRelationshipTransfer())
                ->addResource(new GlueResourceTransfer());
            $glueResourceTransfer->addRelationship($glueRelationshipTransfer);
        }
    }

    public function getRelationshipResourceType(): string
    {
        return static::RESOURCE_TYPE_BAR;
    }
}

```

2. Now declare the relationship resource:
   `src\Pyz\Glue\GlueStorefrontApiApplicationGlueJsonApiConventionConnector\GlueStorefrontApiApplicationGlueJsonApiConventionConnectorDependencyProvider.php`
```
<?php

namespace Pyz\Glue\GlueStorefrontApiApplicationGlueJsonApiConventionConnector;

use Pyz\Glue\FooApi\Plugin\FooBarResourceRelationshipPlugin;
use Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\GlueStorefrontApiApplicationGlueJsonApiConventionConnector\GlueStorefrontApiApplicationGlueJsonApiConventionConnectorDependencyProvider as SprykerGlueStorefrontApiApplicationGlueJsonApiConventionConnectorDependencyProvider;

class GlueStorefrontApiApplicationGlueJsonApiConventionConnectorDependencyProvider extends SprykerGlueStorefrontApiApplicationGlueJsonApiConventionConnectorDependencyProvider
{
    protected const RESOURCE_FOO = 'foo';
    
    /**
     * @param \Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface $resourceRelationshipCollection
     *
     * @return \Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface
     */
    protected function getResourceRelationshipPlugins(
        ResourceRelationshipCollectionInterface $resourceRelationshipCollection
    ): ResourceRelationshipCollectionInterface {
        $resourceRelationshipCollection->addRelationship(
            static::RESOURCE_FOO,
            new FooBarResourceRelationshipPlugin(),
        );

        return $resourceRelationshipCollection;
    }
}
```
If everything is set up correctly, you should be able to access `http://glue-storefront.mysprykershop.com/foo?include=bar`
