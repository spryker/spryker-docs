---
title: How to create a resource
description: This guide shows how to create an API endpoint using a resource for the Storefront API application.
last_updated: September 30, 2022
template: howto-guide-template
redirect_from:
  - /docs/scos/dev/glue-api-guides/202204.0/glue-backend-api/how-to-guides/create-a-resource.html
---

This guide shows how to create an API endpoint using a resource for the Storefront API application.

Let's say you have a module named `ModuleApi`, where you want to have a new endpoint `/foo` with `GET` and `POST` methods. To create the endpoint, follow these steps:

1. Create `FooApiConfig` and add the resource name:

**\Pyz\Glue\FooApi\FooApiConfig`**

 ```php
<?php

namespace Pyz\Glue\FooApi;

use Spryker\Glue\Kernel\AbstractBundleConfig;

class FooApiConfig extends AbstractBundleConfig
{
    public const RESOURCE_FOO = 'foo';
}
``` 

2. Create `foo_api.transfer.xml`:

```xml
<?xml version="1.0"?>
<transfers xmlns="spryker:transfer-01" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="spryker:transfer-01 http://static.spryker.com/transfer-01.xsd">

  <transfer name="FooRestAttributes">
    //add transfer fields
  </transfer>
  
  <transfer name="GlueResourceMethodCollection">
    <property name="get" type="GlueResourceMethodConfiguration"/>
    <property name="post" type="GlueResourceMethodConfiguration"/>
  </transfer>

  <transfer name="GlueResourceMethodConfiguration">
    <property name="controller" type="string"/>
    <property name="action" type="string"/>
    <property name="attributes" type="string"/>
  </transfer>
  
  //add other used transfers
</transfers>
```

3. Create `FooController`: 

**\Pyz\Glue\FooApi\Controller\FooController`**

```php
<?php

namespace Pyz\Glue\FooApi\Controller;

use Generated\Shared\Transfer\FooRestAttributesTransfer;
use Generated\Shared\Transfer\GlueRequestTransfer;
use Generated\Shared\Transfer\GlueResourceTransfer;
use Generated\Shared\Transfer\GlueResponseTransfer;
use Pyz\Glue\FooApi\FooApiConfig;
use Spryker\Glue\Kernel\Controller\AbstractStorefrontApiController;

class FooResourceController extends AbstractStorefrontApiController
{
    public function getAction(
      string $id, 
      GlueRequestTransfer $glueRequestTransfer
    ): GlueResponseTransfer {
        return (new GlueResponseTransfer())
          ->addResource((new GlueResourceTransfer())
            ->setId($id)
            ->setType(FooApiConfig::RESOURCE_FOO)
            ->setAttributes((new FooRestAttributesTransfer());
    }
    
    public function postAction(
      FooRestAttributesTransfer $fooRestAttributesTransfer,
      GlueRequestTransfer $glueRequestTransfer
    ): GlueResponseTransfer {
        return (new GlueResponseTransfer())
          ->addResource((new GlueResourceTransfer())
            ->setType(FooApiConfig::RESOURCE_FOO)
            ->setAttributes((new FooRestAttributesTransfer());
    }
}
```

{% info_block infoBox "Backend-specific class" %}

`AbstractStorefrontApiController` can be used only for Storefront API. For Backend API, use the appropriate backend-specific class `AbstractBackendApiController`.

{% endinfo_block %}

4. Create `FooResource`:

To follow the JSON API convention, the resource must implement `JsonApiResourceInterface`.

**\Pyz\Glue\FooApi\Plugin\FooResource**

```PHP
<?php

namespace Pyz\Glue\FooApi\Plugin;

use Generated\Shared\Transfer\GlueResourceMethodCollectionTransfer;
use Generated\Shared\Transfer\GlueResourceMethodConfigurationTransfer;
use Generated\Shared\Transfer\FooRestAttributesTransfer;
use Pyz\Glue\FooApi\Controller\FooResourceController;
use Spryker\Glue\FooApi\FooApiConfig;
use Spryker\Glue\GlueApplication\Plugin\GlueApplication\AbstractResourcePlugin;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceInterface;

class FooResource extends AbstractResourcePlugin implements ResourceInterface
{
    public function getType(): string
    {
        return FooApiConfig::RESOURCE_FOO;
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
}
```

5. Declare the resource: 

**\Pyz\Glue\GlueStorefrontApiApplication\GlueStorefrontApiApplicationDependencyProvider**

```php
<?php

namespace Pyz\Glue\GlueStorefrontApiApplication;

use Pyz\Glue\FooApi\Plugin\FooResource;
use Spryker\Glue\GlueStorefrontApiApplication\GlueStorefrontApiApplicationDependencyProvider as SprykerGlueStorefrontApiApplicationDependencyProvider;

class GlueStorefrontApiApplicationDependencyProvider extends SprykerGlueStorefrontApiApplicationDependencyProvider
{
    protected function getResourcePlugins(): array
    {
        return [
            new FooResource(),
        ];
    }
}
```

If everything is set up correctly, you can access `https://glue-storefront.mysprykershop.com/foo`.
