---
title: Container
originalLink: https://documentation.spryker.com/2021080/docs/container
redirect_from:
  - /2021080/docs/container
  - /2021080/docs/en/container
---

A *container* is a class which holds one or more object collections or definitions. The Spryker container implements the [PSR-11 interface](https://www.php-fig.org/psr/psr-11/).

The container is used to add services and allow other application plugins access them. Services are integrations like Twig or Symfony components like Security or Form. To be able to configure or change the services easily, they are added to the applications as a part of [application plugins](https://documentation.spryker.com/docs/application). 


It's important that almost everything that is accessible through the container should only be instantiated when it is requested. It's not as important for static values like `isDebugMode` as it is important for expensive instantiations.                

## Where is the container used?
Spryker uses several container instances to separate the access to services. The first container is used for services like Twig, which are added to the application through `Spryker\Shared\ApplicationExtension\Dependency\Plugin\ApplicationPluginInterface`.
The second container is used on a per-module basis. Each module creates its own container instance and can add its dependencies to the container. Usually, those dependencies are plugin stacks.

## How to use the container?
The container implements the [PSR-11 interface](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-11-container.md). On top of it, we added the following methods:

| Method | Description |
| --- | --- |
| `set()` | Adds services to the container. |
| `setGlobal()` | Adds global services to the container. |
| `configure()` | Configures existing services (e.g. makes them global, adds aliases). |
| `extend()` | Extends existing services. |
| `remove()` | Removes added services. |

{% info_block warningBox %}
We added the `ArrayAccess` interface for backward compatibility and do not recommend using it.
{% endinfo_block %}

### Add a service
To add a service, pass the service ID and a callback to the `set()` method.

```php
$container = $container->set('your service identifier', function () {
    return new ExpensiveThing(); // You can return whatever you require
});
```

### Create service aliases
For backward compatibility, you can configure one or more aliases for a service. You can use them for renaming service identifiers without breaking the code which uses them.

For example, you have a typo in the identifier of an added service:

```php
<?php
 
// Added in one of the ApplicationPlugins.
// Notice the typo in the id of this service.
$container->set('sevrice identifier', function () {
    return 'foo';
});
 
// In another ApplicationPlugin, the wrong id is used.
$service = $container->get('sevrice identifier');
```

After correcting the typo, to keep backward compatibility, you can add an alias:

```php
<?php
 
// Added in one of the ApplicationPlugins.
// The typo in the service identifier is fiexed.
$container->set('service identifier', function () {
    return 'foo';
});
 
// This line adds an alias for the id with the typo. With the alias, the id with the typo can still be used.
$container->configure('service identifier', ['alias' => 'sevrice identifier']);
 
// This line returns the service with the id `service identifier` by it's configured alias.
$service = $container->get('sevrice identifier');
 
// This works correctly.
$service = $container->get('service identifier');
```

Also, you can add an array of aliases:

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
To check if a service exists in the container, use the `has()` method.

Example:

```php
if ($container->has('your service identifier')) {
    // service exists
}
```

### Retrieve a service
To retrieve a service:
1. Check if the service exists using the `has()` method.
2. Retrieve the service using the `get()` method.

Example:

```php
if ($container->has('your service identifier')) {
    $yourService = $container->get('your service identifier');
    $yourService->foo();
}
```

### Remove a service
To remove a service from the container, use the `remove()` method.

Example:

```php
if ($container->has('your service identifier')) {
    $container->remove('your service identifier');
}
```

### Extend a service
To extend a service without loading it, use the `extend()` method. It's very important to return the extended service from your callback.

Example:

```php
if ($container->has('your service identifier')) {
    $container->extend('your service identifier', function (YourServiceInstance $yourServiceInstance) {
        $yourServiceInstance->addFoo('bar');
         
        return $yourServiceInstance;
    });
}
```

With the code, you can alter your service without loading it. Your service will only be loaded when it is requested from the container using `container::get()`.

## Global services

Some services are marked as global and can be retrieved from the Dependency Provider of the modules through their container. For example, the Form Application Plugin brings in the Symfony Form Component used in all modules where a form needs to be displayed. To avoid building this service in each module where forms are used, services can be added to the container with the `setGlobal` method to be globally available in the modules' Dependency Providers:

```php
namespace Spryker\Zed\Module\Communication\Plugin\Application;
 
class FormApplicationPlugin extends AbstractPlugin implements ApplicationPluginInterface
{
    public const SERVICE_FORM = 'form.factory';
     
    public function provide(containerInterface $container): containerInterface
    {
        $container->setGlobal(static::SERVICE_FORM, function () {
            $form = ...;
            ...
            return $form;
        });
    }
}
```
In the Dependency Provider of a module, add a unique constant. It allows you to use the constant as a key instead of the key provided by the service when referring to it in your Factory:

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

**when**
`FrozenServiceException` - The service `your service identifier` is marked as frozen and can't be extended at this point.

**then**
If you try to extend a service which was already requested from the container, you will see this exception. A debugger will help you to find a solution. Check which code causes this error by setting a breakpoint in the container where this exception is thrown. Most likely, you will spot the issue right away. If not, set an additional conditional breakpoint in the first line of the `container::get()` method: `$id === 'your service identifier'`. It instructs the debugger to stop when the service identifier which brings the exception is retrieved from the container. Now check the code which wants to retrieve the service and change it in a way that it is called only after `container::extend()` was executed.

