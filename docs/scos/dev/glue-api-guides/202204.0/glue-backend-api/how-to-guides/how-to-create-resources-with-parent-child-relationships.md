---
title: How to create resources with parent-child relationships
description: This document shows how to create resources with parent-child relationships 
last_updated: September 30, 2022
template: howto-guide-template
redirect_from:
  - /docs/scos/dev/glue-api-guides/202204.0/glue-backend-api/how-to-guides/create-a-resource-with-parent.html
---

Glue API lets you create resources with parent-child relationships or, in other words, nested resources. In order to enable such behavior, a resource that implements `Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceWithParentPluginInterface` must be created.

Such a plugin routes requests from the parent resources to the correct child resource. This interface must be implemented together with `ResourceInterface`.

The interface provides only one method: `getParentResourceType`. The method must return the type of the immediate parent resource within the context in which the child resource is implemented.

Let's say you have a module named `FooApi`, where you want to have a new endpoint `/foo/1/bar` with `GET` and `POST` methods. For this, follow these steps:

1. Create a resource following the how to create a resource guide.
2. Add a child resource name:

**src\Pyz\Glue\FooApi\FooApiConfig.php**

```php
<?php

namespace Pyz\Glue\FooApi;

use Spryker\Glue\Kernel\AbstractBundleConfig;

class FooApiConfig extends AbstractBundleConfig
{
    public const RESOURCE_BAR = 'bar';
}
```

3. Create `BarResource` implemented `ResourceWithParentPluginInterface`:

<details><summary markdown='span'>src\Pyz\Glue\FooApi\Plugin\BarResource.php</summary>

```php
<?php

namespace Pyz\Glue\FooApi\Plugin;

use Generated\Shared\Transfer\GlueResourceMethodCollectionTransfer;
use Generated\Shared\Transfer\GlueResourceMethodConfigurationTransfer;
use Generated\Shared\Transfer\FooRestAttributesTransfer;
use Spryker\Glue\FooApi\Controller\FooResourceController;
use Spryker\Glue\FooApi\FooApiConfig;
use Spryker\Glue\GlueApplication\Plugin\GlueApplication\AbstractResourcePlugin;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceInterface;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceWithParentPluginInterface;

class FooRestResource extends AbstractResourcePlugin implements ResourceInterface, ResourceWithParentPluginInterface 
{
    public function getType(): string
    {
        return FooApiConfig::RESOURCE_BAR;
    }
    
    public function getController(): string
    {
        return FooResourceController::class;
    }

    public function getDeclaredMethods(): GlueResourceMethodCollectionTransfer
    {
        return (new GlueResourceMethodCollectionTransfer())
            ->setGet(new GlueResourceMethodConfigurationTransfer())
            ->setPost(
                (new GlueResourceMethodConfigurationTransfer())
                    ->setAction('postAction')->setAttributes(FooRestAttributesTransfer::class),
            );
    }
    
    public function getParentResourceType(): string
    {
        return FooApiConfig::RESOURCE_FOO;
    }
}
```
</details>

4. Declare the resource:

**\Pyz\Glue\GlueStorefrontApiApplication\GlueStorefrontApiApplicationDependencyProvider**

```php
<?php

namespace Pyz\Glue\GlueStorefrontApiApplication;

use Pyz\Glue\FooApi\Plugin\BarResource;
use Spryker\Glue\GlueStorefrontApiApplication\GlueStorefrontApiApplicationDependencyProvider as SprykerGlueStorefrontApiApplicationDependencyProvider;

class GlueStorefrontApiApplicationDependencyProvider extends SprykerGlueStorefrontApiApplicationDependencyProvider
{
    protected function getResourcePlugins(): array
    {
        return [
            new BarResource(),
        ];
    }
}
```

If everything is set up correctly, you can access `https://glue-storefront.mysprykershop.com/foo/1/bar`.
