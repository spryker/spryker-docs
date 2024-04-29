---
title: Create JSON:API relationships
description: This guide describes how to add resources through relationships
last_updated: September 30, 2022
template: howto-guide-template
redirect_from:
  - /docs/scos/dev/feature-integration-guides/202204.0/glue-api/decoupled-glue-infrastructure/glue-api-json-api-convention-integration.html
  - /docs/scos/dev/glue-api-guides/202204.0/glue-backend-api/how-to-guides/how-to-create-a-json-api-relationship.html
  - /docs/scos/dev/glue-api-guides/202212.0/decoupled-glue-infrastructure/how-to-guides/how-to-create-a-json-api-relationship.html
  - /docs/scos/dev/glue-api-guides/202204.0/create-json-api-relationships.html
  - /docs/scos/dev/glue-api-guides/202404.0/create-json-api-relationships.html

---

Some modules represent relationships between two different resources. Their task is to extend the response of one of the resources with the data of related resources.

To query certain data, you often need to use endpoints from different APIs to get the necessary information. This can result in a big number of requests until the necessary data is fetched. To reduce the number of calls and provide all the necessary information in one pass, you can use resource relationships.

This guide describes how to add resources through relationships. The following concept is only allowed for resources that implemented the Glue JSON:API convention.

Let's say you have a module named `ModuleRestApi`, where you want to add the `bar` resource related to the `module` resource. To do this, follow these steps:

1. Create `ModuleBarResourceRelationshipPlugin`:

**src\Pyz\Glue\ModuleRestApi\Plugin\ModuleBarResourceRelationshipPlugin.php**

```php
<?php

<?php

namespace Pyz\Glue\ModuleRestApi\Plugin\GlueJsonApiConvention;

use Generated\Shared\Transfer\GlueRelationshipTransfer;
use Generated\Shared\Transfer\GlueRequestTransfer;
use Generated\Shared\Transfer\GlueResourceTransfer;
use Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\ResourceRelationshipPluginInterface;
use Spryker\Glue\Kernel\AbstractPlugin;

class ModuleBarResourceRelationshipPlugin extends AbstractPlugin implements ResourceRelationshipPluginInterface
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

2. Declare the relationship resource:

**src\Pyz\Glue\GlueStorefrontApiApplicationGlueJsonApiConventionConnector\GlueStorefrontApiApplicationGlueJsonApiConventionConnectorDependencyProvider.php**

```php
<?php

namespace Pyz\Glue\GlueStorefrontApiApplicationGlueJsonApiConventionConnector;

use Pyz\Glue\ModuleRestApi\Plugin\ModuleBarResourceRelationshipPlugin;
use Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface;
use Spryker\Glue\GlueStorefrontApiApplicationGlueJsonApiConventionConnector\GlueStorefrontApiApplicationGlueJsonApiConventionConnectorDependencyProvider as SprykerGlueStorefrontApiApplicationGlueJsonApiConventionConnectorDependencyProvider;

class GlueStorefrontApiApplicationGlueJsonApiConventionConnectorDependencyProvider extends SprykerGlueStorefrontApiApplicationGlueJsonApiConventionConnectorDependencyProvider
{
    protected const RESOURCE_MODULE = 'module';

    /**
     * @param \Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface $resourceRelationshipCollection
     *
     * @return \Spryker\Glue\GlueJsonApiConventionExtension\Dependency\Plugin\ResourceRelationshipCollectionInterface
     */
    protected function getResourceRelationshipPlugins(
        ResourceRelationshipCollectionInterface $resourceRelationshipCollection
    ): ResourceRelationshipCollectionInterface {
        $resourceRelationshipCollection->addRelationship(
            static::RESOURCE_MODULE,
            new ModuleBarResourceRelationshipPlugin(),
        );

        return $resourceRelationshipCollection;
    }
}
```

If everything is set up correctly, you can access `https://glue-storefront.mysprykershop.com/module?include=bar`.
