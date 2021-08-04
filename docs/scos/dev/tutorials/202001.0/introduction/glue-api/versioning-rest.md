---
title: Versioning REST API Resources
originalLink: https://documentation.spryker.com/v4/docs/versioning-rest-api-resources
redirect_from:
  - /v4/docs/versioning-rest-api-resources
  - /v4/docs/en/versioning-rest-api-resources
---

In the course of development of your REST APIs, you may need to change the data contracts of API resources. However, you can also have clients that rely on the existing contracts. To preserve backward compatibility for such clients, we recommend implementing a versioning system for REST API resources. In this case, each resource version has its own contract in terms of data, and various clients can request the exact resource versions they are designed for.

{% info_block infoBox %}
Resources provided by Spryker out of the box do not have a version. When developing resources, only new resources, attributes etc are added without removing anything, which ensures backward compatibility for all clients. </br>If necessary, you can implement versioning for built-in resources as well by [extending](/docs/scos/dev/tutorials/202001.0/introduction/glue-api/extending-a-res
{% endinfo_block %} the corresponding resource module on your project level.)

To implement versioning for a REST API resource, you need to do the following:

## Prerequisites
To implement resource versioning, you need to have at least version 2.1.0 of the `spryker/silex` module installed in your project.

## 1. Implement ResourceVersionableInterface

To add versioning to a resource, the route plugin of the resource module needs to implement not only `ResourceRoutePluginInterface`, but also `\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\ResourceVersionableInterface`. The latter exposes a method called `getVersion` that allows you to set the resource version.

{% info_block warningBox %}
For more information on route plugins, see the [Resource Routing](https://documentation.spryker.com/v4/docs/glue-infrastructure#resource-routing
{% endinfo_block %} section in **Glue Infrastructure**.)

Let us consider the following implementation of a route plugin:

CustomerRestorePasswordResourceRoutePlugin.php
    
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

As you can see, the `CustomerRestorePasswordResourceRoutePlugin` class implements both the `ResourceRoutePluginInterface` and `ResourceVersionableInterface` interfaces. The resource supports only one HTTP verb: PATCH. Also, the `getVersion` function sets version 2.0 for the resource:

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

{% info_block errorBox %}
It is important that you set both the major and the minor version of a resource, otherwise, requests to it will fail.
{% endinfo_block %}

## 2. Query specific resource version
Now, that you've implemented a specific resource version, you can query the resource specifying the version you need. Let us send a PATCH request to the `/customer-restore-password` endpoint that now has version 2.0. The payload is as follows:

**Code sample:**

```php
{
  "data": {
    "type": "customer-restore-password",
    "attributes": {
        "email":"jdoe@example.com"
   }
}
```

Also, let us specify the exact version we need. For this purpose, you need to specify the resource version in the HTTP header of your request:

```php
Content-Type: application/vnd.api+json; version=2.0
```

In the example above, version 2.0 is specified. If you repeat the request with such headers, you will receive a valid response with resource version 2.0. However, if you specify a non-existent version, for example, 3.0, the request will fail.

```php
Content-Type: application/vnd.api+json; version=3.0
```

In this case, the endpoint will respond with the **404 Not Found** error.

{% info_block infoBox %}
If a version is not specified, the latest available version will be returned.
{% endinfo_block %}

## 3. Add more versions
Now, if you want to implement a new version, you can create a new route plugin in your module. For example, to support version **3.0**, you can use the following code in your plugin:

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

In the new plugin, you can configure routing differently. For example, you can use a different controller class, use a different transfer for the resource attributes etc, for example:

**Code sample:**

```php
...
public function getResourceAttributesClassName(): string
{
    return RestCustomerRestorePasswordVersion3AttributesTransfer::class;
}
...
```

After implementing the plugin and the required functionality, you need to register the new plugin in `Pyz\Glue\GlueApplication\GlueApplicationDependencyProvider`:

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
