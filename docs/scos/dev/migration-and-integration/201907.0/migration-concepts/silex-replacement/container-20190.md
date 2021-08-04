---
title: Container
originalLink: https://documentation.spryker.com/v3/docs/container-201903
redirect_from:
  - /v3/docs/container-201903
  - /v3/docs/en/container-201903
---

## What is a Container?
A Container is a class which holds one or more object collections or definitions. It's important to know that almost everything that is accessible through the Container should only be instantiated when it is requested. It's not as important for static values like `isDebugMode` as it is important for expensive instantiations.
Previously, Spryker has been using the pimple/pimple library which offers the "Pimple Container" class. This class is widely used in Spryker Commerce OS by the Silex Microframework we are currently refactoring out.

The Container is used to add services and provide access to those services to other application plugins. The exemplary services are Twig or Symfony components like Security, Form etc. To be able to configure or change the services easily, they are added to the applications as a part of "Service Providers". The previously used `Silex\Application` extends the Pimple class which makes it a Container too.
To be able to refactor out the abandoned Silex code, we added our own Container which implements the PSR-11 interface. The Spryker Container still supports the Silex way of accessing services through the `ArrayAccess` interface.

## Where is the Container used?
Spryker uses several Container instances to separate the accessibility to services. The first Container is used for the services like Twig which are added to the application through the `Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface`.
The second Container is used on a per-Module basis. Each Module creates its own Container instance and can add its own dependencies to the Container. Usually, those dependencies are Plugin stacks.

## How to use the Container?
The Container implements the PSR-11 [interface](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-11-container.md). On top of it, we added the following additional methods:

| Method | Description |
| --- | --- |
| `set()` | Adds services to the Container. |
| `setGlobal()` | Adds global services to the Container. |
| `configure()` | Configures existing services (e.g. makes them global, adds aliases). |
| `extend()` | Extends existing services. |
| `remove()` | Removes added services. |

{% info_block warningBox %}
Although the Container still implements the `ArrayAccess` interface, it is not recommended to use it anymore. This was added for backward compatibility only.
{% endinfo_block %}

### Add a service
To add a service, you need to pass the service ID and a callback to the `set()` method.

```php
$container = $container->set('your service identifier', function () {
    return new ExpensiveThing(); // You can return whatever you require
});
```

### Create service aliases
For backward compatibility, it is possible to configure one or more aliases for a service. Later on, aliases can also be used for renaming of service identifiers without breaking the code which makes use them.

Example with a typo in the identifier of the added service:

```php
<?php
 
// Added in one of the ApplicationPlugins
// notice the typo in the id of this service
$container->set('sevrice identifier', function () {
    return 'foo';
});
 
// In another ApplicationPlugin, the wrong id is used
$service = $container->get('sevrice identifier');
```

To keep backward compatibility when the wrong key is fixed, you can now use the alias feature:

```php
<?php
 
// Added in one of the ApplicationPlugin's
// notice the type in the id for the service is fixed
$container->set('service identifier', function () {
    return 'foo';
});
 
// This line adds an alias to the id with the typo, that way the id with the typo can still be used
$container->configure('service identifier', ['alias' => 'sevrice identifier']);
 
// This will now return the service with the id `service identifier` by it's configured alias.
$service = $container->get('sevrice identifier');
 
// Will work as normal
$service = $container->get('service identifier');
```

It is also possible to add more than one alias at a time. To achieve this, an array of aliases is used in the configuration:

```php
<php
 
$container->set('service identifier', function () {
    return 'foo';
});
 
$container->configure('service identifier', [
    'alias' => [
        'alias 1',
        'alias 2',
    ],
]);
```

### Check if a service was added
You should always check if a service exists in the container by using the `has()` method.

Example:

```php
if ($container->has('your service identifier')) {
    // service exists
}
```

### Get a service
To retrieve a service, you should always check if the service exists by using the `has()` method prior to using the `get()` method.

Example:

```php
if ($container->has('your service identifier')) {
    $yourService = $container->get('your service identifier');
    $yourService->foo();
}
```

### Remove a service
In some circumstances, you may want to remove a service from the container again. You can do this with the `remove()` method.

Example:

```php
if ($container->has('your service identifier')) {
    $container->remove('your service identifier');
}
```

### Extend a service
Whenever you need to extend a service without loading it, you can use the `extend()` method. It's very important to return the extended service from your callback.

Example:

```php
if ($container->has('your service identifier')) {
    $container->extend('your service identifier', function (YourServiceInstance $yourServiceInstance) {
        $yourServiceInstance->addFoo('bar');
         
        return $yourServiceInstance;
    });
}
```

With the code, you can alter your service without loading it. Your service will only be loaded when it is requested from the Container by using `Container::get()`.

## Global Services
Access an infrastructural service in a module's Dependency Provider
In some cases, it is required to get access to an Application Plugin from a module. To achieve this, some services are marked as global and can be retrieved from the Dependency Provider of the modules through their Container.

For example, the Form Application Plugin brings in the Symfony Form Component used in all modules where a form needs to be displayed. To avoid building this service in each module where forms are used, services can be added to the Container with the `setGlobal` method to be globally available in the modules' Dependency Providers:

```php
namespace Spryker\Zed\Module\Communication\Plugin\Application;
 
class FormApplicationPlugin extends AbstractPlugin implements ApplicationPluginInterface
{
    public const SERVICE_FORM = 'form.factory';
     
    public function provide(ContainerInterface $container): ContainerInterface
    {
        $container->setGlobal(static::SERVICE_FORM, function () {
            $form = ...;
            ...
            return $form;
        });
    }
}
```
In the Dependency Provider of your module, you need to add a unique constant. It will allow you to use the constant as a key instead of the key provided by the service when referring to it in your Factory:

```php
namespace Spryker\Zed\Module;
 
use Spryker\Shared\Form\Plugin\Application\FormApplicationPlugin;
 
class ModuleDependencyProvider extends AbstractBundleDependencyProvider
{
    public const SERVICE_FORM = FormApplicationPlugin::SERVICE_FORM;
 
    ...
}
```

Then, in your Factory, retrieve the dependency as usual:

```php
namespace Spryker\Zed\Module\Communication;
 
use Spryker\Zed\Module\ModuleDependencyProvider;
 
class ModuleCommunicationFactory extends AbstractCommunicationFactory
{
    public function getFormService(): FormFactoryInterface
    {
        return $this->getProvidedDependency(ModuleDependencyProvider::SERVICE_FORM);
    }
}
```

## Troubleshooting

`FrozenServiceException` - The service "your service identifier" is marked as frozen and can't be extended at this point.

In case you try to extend a service which has been already requested from the Container, you will see this exception. A debugger will help you to find a solution. Check which code causes this error by setting a breakpoint in the Container where this exception is thrown. Most likely, you will spot the issue right away. If not, set an additional conditional breakpoint in the first line of the `Container::get()` method. The condition here should look like `$id === 'your service identifier'`. It instructs the debugger to stop only when the service identifier which brings the exception is retrieved from the Container. Now check the code which wants to retrieve the service and change it in a way that it is called only after the `Container::extend()` has been executed.
