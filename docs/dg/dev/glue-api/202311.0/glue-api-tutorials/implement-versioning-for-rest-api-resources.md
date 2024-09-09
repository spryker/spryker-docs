---
title: Implement versioning for REST API resources
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/versioning-rest-api-resources
originalArticleId: 725aceb9-a222-49e3-9d4a-7cefa91e0907
redirect_from:
  - /docs/scos/dev/glue-api-guides/202311.0/glue-api-tutorials/implement-versioning-for-rest-api-resources.html
  - /docs/scos/dev/tutorials-and-howtos/introduction-tutorials/glue-api/versioning-rest-api-resources.html
  - /docs/scos/dev/glue-api-guides/202204.0/glue-api-tutorials/implement-versioning-for-rest-api-resources.html
related:
  - title: Glue infrastructure
    link: docs/dg/dev/glue-api/page.version/old-glue-infrastructure/glue-infrastructure.html
---

In the course of the development of your REST APIs, you may need to change the data contracts of API resources. However, you can also have clients that rely on the existing contracts. To preserve backward compatibility for such clients, we recommend implementing a versioning system for REST API resources. In this case, each resource version has its own contract in terms of data, and various clients can request the exact resource versions they are designed for.

{% info_block infoBox %}

Resources that are provided by Spryker out of the box do not have a version. When developing resources, only new resources or attributes are added without removing anything, which ensures backward compatibility for all clients.
If necessary, you can implement versioning for built-in resources as well as [extend](/docs/dg/dev/glue-api/{{page.version}}/glue-api-tutorials/extend-a-rest-api-resource.html) the corresponding resource module on your project level.

{% endinfo_block %}

To implement versioning for a REST API resource, follow these steps:

## 1. Implement `ResourceVersionableInterface`

To add versioning to a resource, the route plugin of the `resource` module needs to implement not only `ResourceRoutePluginInterface`, but also `\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceVersionableInterface`. The latter exposes a method called `getVersion` that lets you set the resource version.

{% info_block warningBox %}

For more information on route plugins, see the [Resource routing](/docs/dg/dev/glue-api/{{page.version}}/old-glue-infrastructure/glue-infrastructure.html#resource-routing) section in *Glue Infrastructure*.

{% endinfo_block %}

Consider the following implementation of a route plugin:

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

As you can see, the `CustomerRestorePasswordResourceRoutePlugin` class implements the `ResourceRoutePluginInterface` and `ResourceVersionableInterface` interfaces. The resource supports only one HTTP method: `PATCH`. Also, the `getVersion` function sets version 2.0 for the resource:

**Code sample:**

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

## 2. Query specific resource version

After implementing a specific resource version, you can query the resource specifying the version you need. Send a `PATCH` request to the `/customer-restore-password` endpoint that now has version 2.0. The payload is as follows:

**Code sample:**

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

If `\Spryker\Glue\GlueApplication\GlueApplicationConfig::getPathVersionResolving` is set to *false*, specify the exact version you need, in the HTTP header of your request:

```php
Content-Type: application/vnd.api+json; version=2.0
```

If `getPathVersionResolving` is set to *true*, then you have to set some value in `\Pyz\Glue\GlueApplication\GlueApplicationConfig::getPathVersionPrefix`, *"v"* in our examples, and then your resource path should look like this:
**PATCH /v2.0/customer-restore-password**


In the preceding example, version 2.0 is specified. If you repeat the request with such headers, you receive a valid response with resource version 2.0. However, if you specify a non-existent version, for example, 3.0, the request fail.

```php
Content-Type: application/vnd.api+json; version=3.0
```

In this case, the endpoint responds with the `404 Not Found` error.

Here's a version matching rule-set:

PHP version:
```php
(new RestVersionTransfer())
            ->setMajor(A)
            ->setMinor(B);
```

Then use version

In the header: *Content-Type: application/vnd.api+json; version=A.B*

In the path: */vA.B*

PHP version:
```php
(new RestVersionTransfer())
            ->setMajor(A);
```

Then, use version

In the header: *Content-Type: application/vnd.api+json; version=A*

In the path: */vA*

There's no fall-back to the latest minor, only exact match of version is used.

{% info_block infoBox %}

If a version is not specified, the latest available version is returned.

In order to call the the latest version of the resource, do not specify version in the request.

{% endinfo_block %}

## 3. Add more versions

To implement a new version, you can create a new route plugin in your module—for example, to support version 3.0, you can use the following code in your plugin:

**Code sample:**

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

In the new plugin, you can configure routing differently. You can use a different controller class or use a different transfer for the resource attributes. See the following example:

**Code sample:**

```php
...
public function getResourceAttributesClassName(): string
{
    return RestCustomerRestorePasswordVersion3AttributesTransfer::class;
}
...
```

After implementing the plugin and the required functionality, you register the new plugin in `Pyz\Glue\GlueApplication\GlueApplicationDependencyProvider`:

**Code sample:**

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
