---
title: Create a backend resource
description: This guide shows how to create an API endpoint using a resource for the backend API application.
last_updated: September 30, 2022
template: howto-guide-template
redirect_from:
  - /docs/scos/dev/glue-api-guides/202204.0/glue-backend-api/how-to-guides/how-to-create-a-backend-resource.html
  - /docs/scos/dev/glue-api-guides/202204.0/glue-backend-api/how-to-guides/how-to-create-a-resource.html
  - /docs/scos/dev/glue-api-guides/202307.0/routing/create-backend-resources.html

---

This guide shows how to create an API endpoint using a resource for the backend API application.

Let's say you have a module named `ModuleRestApi`, where you want to have a new endpoint `/module` with `GET` and `POST` methods. To create the endpoint, follow these steps:

1. Create `ModuleRestApiConfig` and add the resource name:

**\Pyz\Glue\ModuleRestApi\ModuleRestApiConfig**

 ```php
<?php

namespace Pyz\Glue\ModuleRestApi;

use Spryker\Glue\Kernel\AbstractBundleConfig;

class ModuleRestApiConfig extends AbstractBundleConfig
{
    public const RESOURCE_MODULE = 'module';
}
```

2. Create `ModuleController`:

**\Pyz\Glue\ModuleRestApi\Controller\ModuleController**

```php
<?php

namespace Pyz\Glue\ModuleRestApi\Controller;

use Generated\Shared\Transfer\ModuleRestAttributesTransfer;
use Generated\Shared\Transfer\GlueRequestTransfer;
use Generated\Shared\Transfer\GlueResourceTransfer;
use Generated\Shared\Transfer\GlueResponseTransfer;
use Pyz\Glue\ModuleRestApi\ModuleRestApiConfig;
use Spryker\Glue\Kernel\Backend\Controller\AbstractBackendApiController;

class ModuleResourceController extends AbstractBackendApiController
{
    public function getAction(
      string $id,
      GlueRequestTransfer $glueRequestTransfer
    ): GlueResponseTransfer {
        return (new GlueResponseTransfer())
          ->addResource((new GlueResourceTransfer())
            ->setId($id)
            ->setType(ModuleRestApiConfig::RESOURCE_MODULE)
            ->setAttributes((new ModuleRestAttributesTransfer());
    }

    public function postAction(
      ModuleRestAttributesTransfer $moduleRestAttributesTransfer,
      GlueRequestTransfer $glueRequestTransfer
    ): GlueResponseTransfer {
        return (new GlueResponseTransfer())
          ->addResource((new GlueResourceTransfer())
            ->setType(ModuleRestApiConfig::RESOURCE_MODULE)
            ->setAttributes((new ModuleRestAttributesTransfer());
    }
}
```

3. Create `ModuleResource`. For no convention resource, it must implement `ResourceInterface`.

**\Pyz\Glue\ModuleRestApi\Plugin\ModuleResource**

```php
<?php

namespace Pyz\Glue\ModuleRestApi\Plugin;

use Generated\Shared\Transfer\GlueResourceMethodCollectionTransfer;
use Generated\Shared\Transfer\GlueResourceMethodConfigurationTransfer;
use Generated\Shared\Transfer\ModuleRestAttributesTransfer;
use Pyz\Glue\ModuleRestApi\Controller\ModuleResourceController;
use Spryker\Glue\ModuleRestApi\ModuleRestApiConfig;
use Spryker\Glue\GlueApplication\Plugin\GlueApplication\Backend\AbstractResourcePlugin;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceInterface;

class ModuleResource extends AbstractResourcePlugin implements ResourceInterface
{
    public function getType(): string
    {
        return ModuleRestApiConfig::RESOURCE_MODULE;
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
}
```

{% info_block infoBox %}

The default request and response data format are CamelCase, to apply a snake_case naming convention set `true` for `GlueResourceMethodConfigurationTransfer->setIsSnakeCased()` for each method where you want to change the request and response data format.

{% endinfo_block %}

See also [Create and change Glue API conventions](/docs/dg/dev/glue-api/{{page.version}}/create-and-change-glue-api-conventions.html) guide.

4. Declare the resource:

**\Pyz\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider

```php
<?php

namespace Pyz\Glue\GlueBackendApiApplication;

use Pyz\Glue\ModuleRestApi\Plugin\ModuleResource;
use Spryker\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider as SprykerGlueBackendApiApplicationDependencyProvider;

class GlueBackendApiApplicationDependencyProvider extends SprykerGlueBackendApiApplicationDependencyProvider
{
    /**
     * @return array<\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceInterface>
     */
    protected function getResourcePlugins(): array
    {
        return [
            new ModuleResource(),
        ];
    }
}
```

5. Build a fresh cache for the API application's controllers.

```bash
vendor/bin/glue glue-api:controller:cache:warm-up
```

If everything is set up correctly, you can access `https://glue-backend.mysprykershop.com/module`.

{% info_block infoBox %}

In Development mode, you do not need to refresh a cache.

{% endinfo_block %}

6. Debug existing routes.

There is a special command to debug all existing routes.

`glue route:bebug <applicationType> <options>`

The example below shows how to debug Backend routes.

```shell
$ docker/sdk/cli
╭─/data | Store: DE | Env: docker.dev | Debug: (.) | Testing: (.)
╰─$ glue route:debug Backend -c
Code bucket: DE | Store: DE | Environment: docker.dev
 ------------------- -------- -------- ------ -------- ------------------------------------------------------------------------------- --------------
  Name                Method   Scheme   Host   Path     Controller                                                                      Is Protected  
 ------------------- -------- -------- ------ -------- ------------------------------------------------------------------------------- --------------
  tokenResourcePost   POST     ANY      ANY    /token   Spryker\Glue\OauthBackendApi\Controller\TokenResourceController::postAction()   No            
 ------------------- -------- -------- ------ -------- ------------------------------------------------------------------------------- --------------
```
