---
title: Implement versioning for REST API resources
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/versioning-rest-api-resources
originalArticleId: 725aceb9-a222-49e3-9d4a-7cefa91e0907
redirect_from:
  - /docs/scos/dev/glue-api-guides/202404.0/glue-api-tutorials/implement-versioning-for-rest-api-resources.html
  - /docs/scos/dev/tutorials-and-howtos/introduction-tutorials/glue-api/versioning-rest-api-resources.html
  - /docs/scos/dev/glue-api-guides/202204.0/glue-api-tutorials/implement-versioning-for-rest-api-resources.html
related:
  - title: Glue infrastructure
    link: docs/dg/dev/glue-api/page.version/rest-api/glue-infrastructure.html
---

When developing REST APIs, you might need to change the data contracts of API resources. However, you can also have clients that rely on the existing contracts. To preserve backward compatibility for such clients, we recommend implementing a versioning system for REST API resources. With versioning, each resource version has its own data contract, and various clients can request the exact resource versions they are designed for.

{% info_block infoBox %}

Default Spryker resources don't have versions. When developing resources, only new resources or attributes are added without removing anything, which ensures backward compatibility for all clients.
If necessary, you can implement versioning for built-in resources as well as [extend](/docs/dg/dev/glue-api/{{page.version}}/glue-api-tutorials/extend-a-rest-api-resource.html) the corresponding resource module on the project level.

{% endinfo_block %}

To implement versioning for a REST API resource, take the following steps.

## 1. Implement `ResourceVersionableInterface`

To add versioning to a resource, the route plugin of the `resource` module needs to implement not only `ResourceRoutePluginInterface`, but also `\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceVersionableInterface`. The latter exposes a method called `getVersion` that lets you set the resource version.

{% info_block infoBox %}

For more information on route plugins, see [Resource routing](/docs/dg/dev/glue-api/{{page.version}}/rest-api/glue-infrastructure.html#resource-routing).

{% endinfo_block %}

Here's an example implementation of a route plugin:

<details><summary>CustomerRestorePasswordResourceRoutePlugin.php</summary>

```php
<?php

namespace Spryker\Glue\CustomersRestApi\Plugin;

use Generated\Shared\Transfer\RestCustomerRestorePasswordAttributesTransfer;
use Generated\Shared\Transfer\RestVersionTransfer;
use Spryker\Glue\CustomersRestApi\CustomersRestApiConfig;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRouteCollectionInterface;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceVersionableInterface;
use Spryker\Glue\Kernel\AbstractPlugin;

/**
 * @method \Spryker\Glue\CustomersRestApi\CustomersRestApiFactory getFactory()
 */
class CustomerRestorePasswordResourceRoutePlugin extends AbstractPlugin implements ResourceRoutePluginInterface, ResourceVersionableInterface
{
    public function configure(ResourceRouteCollectionInterface $resourceRouteCollection): ResourceRouteCollectionInterface
    {
        $resourceRouteCollection
            ->addPatch('patch', false);

        return $resourceRouteCollection;
    }

    public function getResourceType(): string
    {
        return CustomersRestApiConfig::RESOURCE_CUSTOMER_RESTORE_PASSWORD;
    }

    public function getController(): string
    {
        return CustomersRestApiConfig::CONTROLLER_CUSTOMER_RESTORE_PASSWORD;
    }

    public function getResourceAttributesClassName(): string
    {
        return RestCustomerRestorePasswordAttributesTransfer::class;
    }

    public function getVersion(): RestVersionTransfer
    {
        return (new RestVersionTransfer())
            ->setMajor(2)
            ->setMinor(0);
    }
}
```

</details>

The `CustomerRestorePasswordResourceRoutePlugin` class implements `ResourceRoutePluginInterface` and `ResourceVersionableInterface` interfaces. The resource supports only `PATCH` HTTP method. Also, the `getVersion` function sets version 2.0 for the resource:

```php
class CustomerRestorePasswordResourceRoutePlugin extends AbstractPlugin implements ResourceRoutePluginInterface, ResourceVersionableInterface
{
    ...
    public function getVersion(): RestVersionTransfer
    {
        return (new RestVersionTransfer())
            ->setMajor(2)
            ->setMinor(0);
    }
}
```

{% info_block warningBox %}

Set both the major and minor versions of a resource; otherwise, requests to this resource fail.

{% endinfo_block %}

## 2. Query a specific resource version

After implementing a specific resource version, you can query the resource by specifying the needed version. Send a request to the following endpoint of version 2.0.

**PATCH /customer-restore-password**

```json
{
  "data": {
    "type": "customer-restore-password",
    "attributes": {
        "email":"jdoe@example.com"
   }
}
```

If `\Spryker\Glue\GlueApplication\GlueApplicationConfig::getPathVersionResolving` is set to `false`, specify the exact version in the HTTP header of the request:

```json
Content-Type: application/vnd.api+json; version=2.0
```

If `getPathVersionResolving` is set to `true`, set a value for `\Pyz\Glue\GlueApplication\GlueApplicationConfig::getPathVersionPrefix`. In the example, the value is `v`. The resource path should look like this: `PATCH /v2.0/customer-restore-password`.

Because the resource is configured to version 2.0 only requests with this version specified are processed correctly. For example, the following request will fail with the `404 Not Found` error.

```json
Content-Type: application/vnd.api+json; version=3.0
```

Here's a version matching rule-set:

* PHP version:

```php
(new RestVersionTransfer())
            ->setMajor(A)
            ->setMinor(B);
```

Then use the version as follows:

* In the header: *Content-Type: application/vnd.api+json; version=A.B*

* In the path: */vA.B*



PHP version:

```php
(new RestVersionTransfer())
            ->setMajor(A);
```

Then, use the version as follows:

* In the header: *Content-Type: application/vnd.api+json; version=A*

* In the path: */vA*

There's no fall-back to the latest minor, a version can only be be matched exactly.

{% info_block infoBox %}

To call the latest vailable version, don't specify any version in a request.

{% endinfo_block %}

## 3. Add more versions

To implement a version, create a route plugin in a module—for example, to support version 3.0, you can create the following route plugin:

```php
class CustomerRestorePasswordResourceRouteVersion3Plugin extends AbstractPlugin implements ResourceRoutePluginInterface, ResourceVersionableInterface
{
    ...
    public function getVersion(): RestVersionTransfer
    {
        return (new RestVersionTransfer())
            ->setMajor(3)
            ->setMinor(0);
    }
}
```

In this plugin, you can configure routing pre your needs: use a different controller class or a different transfer for the resource attributes. Example:

```php
...
public function getResourceAttributesClassName(): string
{
    return RestCustomerRestorePasswordVersion3AttributesTransfer::class;
}
...
```

After implementing the plugin and the required functionality, register the plugin in `Pyz\Glue\GlueApplication\GlueApplicationDependencyProvider`:

```php
class GlueApplicationDependencyProvider extends SprykerGlueApplicationDependencyProvider
{
    /**
     * @return \Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceRoutePluginInterface[]
     */
    protected function getResourceRoutePlugins(): array
    {
        return [
            ...
            new CustomerRestorePasswordResourceRouteVersion3Plugin(),
        ];
    }
```

You can add as many plugins as required by your project needs.

## 3. Creating custom routes

You can include the version in the URL by introducing a [custom route](/docs/dg/dev/glue-api/{{site.version}}/routing/create-routes.html). The following example shows a `/v1/module/bar` custom route:

```php
<?php

namespace Pyz\Glue\ModuleRestApi\Plugin;

use Pyz\Glue\ModuleRestApi\Controller\ModuleBarController;
use Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RouteProviderPluginInterface;
use Spryker\Glue\Kernel\Backend\AbstractPlugin;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Route;
use Symfony\Component\Routing\RouteCollection;

class ModuleBarRouteProviderPlugin extends AbstractPlugin implements RouteProviderPluginInterface
{
    public function addRoutes(RouteCollection $routeCollection): RouteCollection
    {
        $getRoute = (new Route('/v1/module/bar'))
            ->setDefaults([
                '_controller' => [ModuleBarController::class, 'getCollectionAction'],
                '_resourceName' => 'moduleBar',
            ])
            ->setMethods(Request::METHOD_GET);

        $routeCollection->add('moduleBarGetCollection', $getRoute);

        return $routeCollection;
    }
}
```
