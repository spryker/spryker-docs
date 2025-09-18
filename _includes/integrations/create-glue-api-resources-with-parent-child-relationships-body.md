Backend API lets you create resources with parent-child relationships or, in other words, nested resources. To enable such relationship, you need to create a resource that implements `Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceWithParentPluginInterface`.

Such a plugin routes requests from parent resources to the correct child resource. This interface must be implemented together with `ResourceInterface` or with the convention resource interface.

The `ResourceInterface` interface provides only one method: `getParentResourceType`. The method must return the type of the immediate parent resource within the context in which the child resource is implemented.

Let's say you have a module named `ModuleBackendApi`, where you want to have a new endpoint `/module/1/bar` with `GET` and `POST` methods. To create the new endpoint, follow these steps:

1. Create a resource using the steps described in the [Create Backend resources](/docs/integrations/spryker-glue-api/create-backend-api-applications/create-backend-resources.html) guide.
2. Add a child resource name:

**src\Pyz\Glue\ModuleBackendApi\ModuleBackendApiConfig.php**

```php
<?php

namespace Pyz\Glue\ModuleBackendApi;

use Spryker\Glue\Kernel\AbstractBundleConfig;

class ModuleBackendApiConfig extends AbstractBundleConfig
{
    public const RESOURCE_BAR = 'bar';
}
```

3. Create `BarResource` that implements `ResourceWithParentPluginInterface`:

<details><summary>src\Pyz\Glue\ModuleBackendApi\Plugin\BarResource.php</summary>

```php
<?php

namespace Pyz\Glue\ModuleBackendApi\Plugin;

use Generated\Shared\Transfer\GlueResourceMethodCollectionTransfer;
use Generated\Shared\Transfer\GlueResourceMethodConfigurationTransfer;
use Generated\Shared\Transfer\ModuleRestAttributesTransfer;
use Spryker\Glue\ModuleBackendApi\Controller\ModuleResourceController;
use Spryker\Glue\ModuleBackendApi\ModuleBackendApiConfig;
use Spryker\Glue\GlueApplication\Plugin\GlueApplication\AbstractResourcePlugin;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceInterface;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceWithParentPluginInterface;

class ModuleRestResource extends AbstractResourcePlugin implements ResourceInterface, ResourceWithParentPluginInterface
{
    public function getType(): string
    {
        return ModuleBackendApiConfig::RESOURCE_BAR;
    }

    public function getController(): string
    {
        return ModuleResourceController::class;
    }

    public function getDeclaredMethods(): GlueResourceMethodCollectionTransfer
    {
        return (new GlueResourceMethodCollectionTransfer())
            ->setGet(new GlueResourceMethodConfigurationTransfer())
            ->setPost(
                (new GlueResourceMethodConfigurationTransfer())
                    ->setAction('postAction')->setAttributes(ModuleRestAttributesTransfer::class),
            );
    }

    public function getParentResourceType(): string
    {
        return ModuleBackendApiConfig::RESOURCE_MODULE;
    }
}
```
</details>

4. Declare the resource:

**\Pyz\Glue\GlueStorefrontApiApplication\GlueStorefrontApiApplicationDependencyProvider**

```php
<?php

namespace Pyz\Glue\GlueStorefrontApiApplication;

use Pyz\Glue\ModuleBackendApi\Plugin\BarResource;
use Spryker\Glue\GlueStorefrontApiApplication\GlueStorefrontApiApplicationDependencyProvider as SprykerGlueStorefrontApiApplicationDependencyProvider;

class GlueStorefrontApiApplicationDependencyProvider extends SprykerGlueStorefrontApiApplicationDependencyProvider
{
    protected function getResourcePlugins(): array
    {
        return [
            new BarResource(),
            //Parent resource for BarResource
            new ModuleResource(),
        ];
    }
}
```

5. Access `https://glue-storefront.mysprykershop.com/module/1/bar`.