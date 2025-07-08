This document shows how to implement a REST API resource in your project.

{% info_block warningBox %}

## Prerequisites

Read the following documents:

* [JSON API Specification](https://jsonapi.org/format/) implemented in Spryker;
* [Swagger Tools Reference](https://swagger.io/) to know how to document your API;
* [REST API Modeling Reference](https://www.thoughtworks.com/insights/blog/rest-api-design-resource-modeling).

{% endinfo_block %}

## 1. Create a Glue resource module

For naming convention, all the resource module names consist of the feature name in plural followed by the `RestApi` suffix. For example, the `WishlistsRestApi` module represents a resource for managing the wishlists feature.

To create a module, follow these steps:

1. Create a new module in `src/Pyz/Glue/{YOUR_RESOURCE}sRestApi` if you want to have a project-level resource.
2. Create the following folder and file structure:

| {YOUR_RESOURCE}sRestApi | DESCRIPTION |
| --- | --- |
| `/Controller` | Folder for resource controllers. Controllers are used to handle JSON requests and responses. |
| `/Dependency` | Bridges to other clients. |
| `/Plugin` |Glue API plugins.  |
| `/Processor` | Folder where all the resource processing logic, data mapping code, and calls to other clients are located. |
| `{YOUR_RESOURCE}sRestApiConfig.php` | Contains resource-related configuration, such as the resource type and error code constants. |
|`{YOUR_RESOURCE}sRestApiFactory.php`  | Factory to construct objects.|
| `ResourcesDependencyProvider.php` | Provides external dependencies to this module. |
| `{YOUR_RESOURCE}sRestApiResource.php` | Locatable class that provides resource objects to other modules as a dependency.|

{% info_block infoBox %}

To create a basic structure, you can use a [Spryk](/docs/dg/dev/glue-api/{{page.version}}/glue-spryks.html):

```bash
console spryk:run AddGlueBasicStructure --mode=project --module=ResourcesRestApi --organization=Pyz --resourceType=resources
```

You must agree to all the default values when prompted.

{% endinfo_block %}

Add a transfer file that is used to automatically map JSON data. Transfers are defined in the `Shared` layer—for example, `src/Pyz/Shared/{YOUR_RESOURCE}sRestApi/Transfer`—as it needs to be accessible to any layer, including Glue. The name of the transfer file is `resources_rest_api.transfer.xml`, where the first part is the name of your resource.

{% info_block infoBox %}

To add a transfer file, you can use a [Spryk](/docs/dg/dev/glue-api/{{page.version}}/glue-spryks.html):

```bash
console spryk:run AddSharedRestAttributesTransfer --mode=project --module=ResourcesRestApi --organization=Pyz --name=RestResourcesAttributes
```

{% endinfo_block %}

This is a resulting folder structure in the example of the Wishlists REST API module:
![Wishlists REST API module](https://spryker.s3.eu-central-1.amazonaws.com/docs/Tutorials/Introduction/Glue+API/wishlists-rest-api-module.png)

## 2. Create a configuration class

Create a configuration class that provides general module information. The class can be used to store types of resources, custom error codes used in your module, and other configuration data.

Open the `WishlistsRestApiConfig.php` file and provide some initial configuration:

**WishlistsRestApiConfig.php**

```php
<?php
namespace Spryker\Glue\WishlistsRestApi;

use Spryker\Glue\Kernel\AbstractBundleConfig;

class WishlistsRestApiConfig extends AbstractBundleConfig
{
    // Define names of resources handled by this module
    public const RESOURCE_WISHLISTS = 'wishlists';

    // Define names of related resources used in this module
    public const RESOURCE_RELATION_PRODUCTS = 'products';

    // Define business validation response codes
    // The codes is set manually when building error responses
    public const RESPONSE_CODE_WISHLIST_NOT_FOUND = '101';
    public const RESPONSE_CODE_WISHLIST_VALIDATION = '102';
}
```

{% info_block infoBox %}

To create a configuration class, you can use a [Spryk](/docs/dg/dev/glue-api/{{page.version}}/glue-spryks.html):

```bash
console spryk:run AddGlueConfig --mode=project --module=ResourcesRestApi --organization=Pyz
```

{% endinfo_block %}

## 3. Create a factory

A factory is used for instantiating module classes and dependencies and provides access to the resource builder.

The factory must be inherited from `Spryker\Glue\Kernel\AbstractFactory`. This abstract factory exposes the `getResourceBuilder()` method that is used to construct resource and response objects.

The following example shows how to correctly instantiate a resource reader using the `getResourceBuilder()` method:

**WishlistRestApiFactory.php**

```php
<?php
namespace Spryker\Glue\WishlistsRestApi;

use Spryker\Glue\Kernel\AbstractFactory;

class WishlistsRestApiFactory extends AbstractFactory
{
    /**
     *
     * @return \Spryker\Glue\WishlistsRestApi\Processor\Wishlists\WishlistsReaderInterface
     */
    public function createWishlistsReader(): WishlistsReaderInterface
    {
        return new WishlistsReader($this->getResourceBuilder());
    }
}
```

{% info_block infoBox %}

To create a factory, you can use a [Spryk](/docs/dg/dev/glue-api/{{page.version}}/glue-spryks.html):  

```bash
console spryk:run AddGlueFactory --mode=project --module=ResourcesRestApi --organization=Pyz
```

{% endinfo_block %}

## 4. Create a resource controller

The controller is a PHP class that receives all the requests, calls business logic, and returns responses.

To implement a controller, follow these steps:

1. Create a new class in the `Controller` folder. Naming convention: class name must start with the resource name that it controls and end with the `ResourceController` suffix.
2. Inherit from the `\Spryker\Glue\Kernel\Controller\AbstractController` class.
3. Add a use clause to include `RestResponseInterface`. It lets you pass responses to Glue. Any action method in a resource controller must take `\Spryker\Glue\GlueApplication\Rest\Request\Data\RestRequestInterface` as a parameter and return `\Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface`.
4. Implement actions that are used to handle all the possible HTTP methods (`GET`, `POST`, `DELETE`, `PATCH`) for the given resource.

{% info_block errorBox %}

The controller must provide only the request handling the flow and must not contain any actual business logic. All operations must be delegated to the corresponding layers.

Requests are passed to the controller as the instances of `RestRequestInterface`, and responses must be provided as `RestResponseInterface` objects.

{% endinfo_block %}

<details><summary>Sample controller implementation: WishlistsResourceController.php</summary>

```php
<?php
namespace Spryker\Glue\WishlistsRestApi\Controller;

use Generated\Shared\Transfer\RestWishlistsAttributesTransfer;
use Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface;
use Spryker\Glue\Kernel\Controller\AbstractController;

/**
 * @method \Spryker\Glue\WishlistsRestApi\WishlistsRestApiFactory getFactory()
 */
class WishlistsResourceController extends AbstractController
{
    /**
     * Handles the GET verb.
     *
     * @return \Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface
     */
    public function getAction(): RestResponseInterface
    {
        //TODO: call factory, do data handling
    }

    /**
     * Handles the POST verb.
     *
     * @param \Generated\Shared\Transfer\RestWishlistsAttributesTransfer $restWishlistsAttributesTransfer
     *
     * @return \Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface
     */
    public function postAction(RestWishlistsAttributesTransfer $restWishlistsAttributesTransfer): RestResponseInterface
    {
        $restWishlistsAttributesTransfer; //This variable is automatically mapped from request POST data

        //TODO: call factory, do data handling
    }

    /**
     * Handles the DELETE verb.
     *
     * @return \Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface
     */
    public function deleteAction(): RestResponseInterface
    {
        //TODO: call factory, do data handling
    }

    /**
     * Handles the PATCH verb.
     *
     * @param \Generated\Shared\Transfer\RestWishlistsAttributesTransfer $restWishlistsAttributesTransfer
     *
     * @return \Spryker\Glue\GlueApplication\Rest\JsonApi\RestResponseInterface
     */
     public function patchAction(RestWishlistsAttributesTransfer $restWishlistsAttributesTransfer): RestResponseInterface
     {
          $restWishlistsAttributesTransfer; //This variable is automatically mapped from request PATCH data

          //TODO: call factory, do data handling
     }
}
```

</details>

{% info_block infoBox %}

To create a resource controller, you can use a [Spryk](/docs/dg/dev/glue-api/{{page.version}}/glue-spryks.html):

```bash
console AddGlueController  --mode=project --module=ResourcesRestApi --organization=Pyz --controller=ResourcesController
```

{% endinfo_block %}

## 5. Describe fields for post and patch calls

`POST` and `PATCH` let you pass the body in your request. Such parameters can be used in your resource module to manipulate Spryker entities. For example, when changing an entity using REST API, you can pass the modified values as fields of a `POST` or `PATCH` request.

The same as with any other data source, you can use containers called *transfer objects* for the convenience of dealing with data retrieved from `POST` requests. The objects are defined in the XML transfer file located in the `Shared` layer. The names of the transfer objects must start with `Rest`.

{% info_block infoBox %}

For information about defining objects and syntax, see [Create, use, and extend the transfer objects](/docs/dg/dev/backend-development/data-manipulation/data-ingestion/structural-preparations/create-use-and-extend-the-transfer-objects.html).

{% endinfo_block %}

In the following example, the `RestWishlistsAttributesTransfer` transfer object has three string attributes, which are automatically mapped from a `POST` request:

**wishlists_rest_api.transfer.xml**

```xml
<?xml version="1.0"?>
<transfers xmlns="spryker:transfer-01"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="spryker:transfer-01 http://static.spryker.com/transfer-01.xsd">

           <transfer name="RestWishlistsAttributesTransfer">
               <property name="attribute1" type="string" />
               <property name="attribute2" type="string" />
               <property name="attribute3" type="string" />
            </transfer>
    </transfers>
```

To generate the respective transfer objects, run the following command:

```bash
vendor/bin/console transfer:generate
```

{% info_block infoBox %}

To describe fields for `POST` and `PATCH` calls, you can use a [Spryk](/docs/dg/dev/glue-api/{{page.version}}/glue-spryks.html):

```bash
console spryk:run AddSharedRestAttributesTransfer --mode=project --module=ResourcesRestApi --organization=Pyz --name=RestResourcesAttributes
```

{% endinfo_block %}

## 6. Route requests to your controller

To route requests to your module, create a routing plugin that calls a certain function of the resource controller depending on the method configured in your resource and add the plugin to the Glue module dependency provider.

**Resource route plugin**

A route plugin must be inherited from `AbstractPlugin` and implement `ResourceRoutePluginInterface`. In the `Plugin` folder, create a routing plugin:

**WishlistsResourceRoutePlugin.php**

```php
<?php
namespace Spryker\Glue\WishlistsRestApi\Plugin;

use Spryker\Glue\GlueApplication\Dependency\Plugin\ResourceRoutePluginInterface;

/**
 * @method \Spryker\Glue\WishlistsRestApi\WishlistsRestApiFactory getFactory()
 */

class WishlistsResourceRoutePlugin extends AbstractPlugin implements ResourceRoutePluginInterface
{
}
```

To map the controller actions to the verbs they implement, implement the function `ResourceRoutePluginInterface::configure()`.

To map the actions, you can use such methods as `addPost`, `addDelete`, `addPatch`, and `addGet`, which are supported by `ResourceRouteCollectionInterface`. Each function has three parameters:

* `action`: Specifies the action name to map the verb to the Resource controller method.
* `protected` (optional): Specifies whether authentication is required to access the resource. If this parameter is not specified, then the verb requires authentication.
* `context` (optional): An array of additional parameters that can be passed to the action. Use this parameter to perform additional configuration of your actions.

In the following example, the plugin maps `GET`, `POST`, `DELETE` and `PATCH` to the controller actions created in step 4. All the verbs except `GET` require authentication. This means that unauthenticated users can read the resource but can not create, modify, or delete items.

```php
...
class WishlistsResourceRoutePlugin extends AbstractPlugin implements ResourceRoutePluginInterface
{
    /**
     * @api
     *
     * @param \Spryker\Glue\GlueApplication\Dependency\Plugin\ResourceRouteCollectionInterface  $resourceRouteCollection
     *
     * @return \Spryker\Glue\GlueApplication\Dependency\Plugin\ResourceRouteCollectionInterface
     */
     public function configure(ResourceRouteCollectionInterface $resourceRouteCollection): ResourceRouteCollectionInterface
     {
          $resourceRouteCollection->addPost('post')
               ->addDelete('delete')
               ->addPatch('patch')
               ->addGet('get', false);

          return $resourceRouteCollection;
     }
     ...
```

Implement the function `ResourceRoutePluginInterface::getResourceType()`. It must return your resource's name in plural (which is a resource URI):

```php
/**

		* @api
		*
		* @return string
		*/
		public function getResourceName(): string
		{
			return WishlistsRestApiConfig::RESOURCE_WISHLISTS;
		}
```

For your resource, specify the name of the controller class created in step 4. The name must be specified in lowercase, separated by hyphens, and without the `Controller` suffix. For example, if the name of the controller class is `WishlistsResourceController`, implement a function as follows:

```php
/**
     * @api
     *
     * @return string
     */
public function getController(): string
{
    return 'wishlists-resource';
}
```

Specify a fully qualified class name of the transfer object created in step 5. It is used by Glue to map attributes from the REST API calls. It works with the `POST` and `PATCH` actions only.

```php
/**
     * @api
     *
     * @return string
     */
    public function getResourceAttributesClassName(): string
    {
        return RestWishlistsAttributesTransfer::class;
    }
```

The plugin is complete. It must look as follows:

<details><summary>WishlistsResourceRoutePlugin.php</summary>

```php
<?php

namespace Spryker\Glue\WishlistsRestApi\Plugin;

use Generated\Shared\Transfer\RestWishlistsAttributesTransfer;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRouteCollectionInterface;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface;
use Spryker\Glue\WishlistsRestApi\WishlistsRestApiConfig;
use Spryker\Glue\Kernel\AbstractPlugin;

/**
 * @method \Spryker\Glue\WishlistsRestApi\WishlistsRestApiFactory getFactory()
 */
class WishlistsResourceRoutePlugin extends AbstractPlugin implements ResourceRoutePluginInterface
{
    /**
     * {@inheritdoc}
     *
     * @api
     *
     * @param \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRouteCollectionInterface $resourceRouteCollection
     *
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRouteCollectionInterface
     */
    public function configure(ResourceRouteCollectionInterface $resourceRouteCollection): ResourceRouteCollectionInterface
    {
        $resourceRouteCollection->addPost('post')
            ->addDelete('delete')
            ->addPatch('patch')
            ->addGet('get');

        return $resourceRouteCollection;
    }

    /**
     * {@inheritdoc}
     *
     * @api
     *
     * @return string
     */
    public function getResourceType(): string
    {
        return WishlistsRestApiConfig::RESOURCE_WISHLISTS;
    }

    /**
     * {@inheritdoc}
     *
     * @api
     *
     * @return string
     */
    public function getController(): string
    {
        return 'wishlists-resource';
    }

    /**
     * {@inheritdoc}
     *
     * @api
     *
     * @return string
     */
    public function getResourceAttributesClassName(): string
    {
        return RestWishlistsAttributesTransfer::class;
    }
}
```

</details>

{% info_block infoBox %}

To route requests to your controller, you can use a [Spryk](/docs/dg/dev/glue-api/{{page.version}}/glue-spryks.html):

```bash
console spryk:run AddGlueResourceRoute --mode=project --module=ResourcesRestApi --organization=Pyz --resourceType=resources --resourceRouteMethod=get
```

{% endinfo_block %}

## 7. Process REST requests

After routing requests to your module, you can process them using the `Spryker\Glue\Kernel\AbstractFactory::getResourceBuilder()` method. It returns `Spryker\Glue\GlueApplication\Rest\JsonApi\RestResourceBuilderInterface`. This builder interface instantiates the `RestResourceInterface` and `RestResponseInterface` objects that are necessary to build the REST responses correctly.

To build the responses, create classes responsible for the request processing. You can place them in the `Processor` folder. You can create various separate models for reading, creating, updating, and deleting modules.

## 8. Invoke processors in your code

When you have a processor in place, you can use it in your code.

To invoke the processor, follow these steps:
1. Use the factory created in step 3.
2. Reopen the resource controller created in step 4 (`WishlistsResourceController.php`).
3. Add code that handles `GET` requests:

```php
public function getAction(RestRequestInterface $restRequest): RestResponseInterface
    {
        return $this->getFactory()->createWishlistsReader()->readByIdentifier($restRequest);
        // This line passes the request to the actual class that handles data. It returns an instance of RestResponseInterface
    }
```

## 9. Register resources in 'GlueApplicationDependencyProvider'

1. Open the `src/Pyz/Glue/GlueApplication/GlueApplicationDependencyProvider.php` file.
2. Add the route plugin to `getResourceRoutePlugins()`.

**Code sample**

```php
<?php
namespace Pyz\Glue\GlueApplication;

use Spryker\Glue\GlueApplication\GlueApplicationDependencyProvider as SprykerGlueApplicationDependencyProvider;
use Spryker\Glue\WishlistsRestApi\Plugin\WishlistsResourceRoutePlugin;

class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            ...
            new WishlistsResourceRoutePlugin(),
        ];
    }
```

3. Save the file.