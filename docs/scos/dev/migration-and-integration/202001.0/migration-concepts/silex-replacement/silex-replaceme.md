---
title: Silex Replacement
originalLink: https://documentation.spryker.com/v4/docs/silex-replacement
redirect_from:
  - /v4/docs/silex-replacement
  - /v4/docs/en/silex-replacement
---

Originally, _Silex_ was used to integrate Symfony Components with Spryker using _Service Providers_. In addition to that, there are multiple other _Service Providers_ added by Spryker and customer projects to bootstrap the application. Such providers implement _Symfony_ components and other entities by adding them to the _Pimple_ container. Since _Silex_ project is abandoned and the _Pimple_ version is outdated, we are intended to replace them with a Spryker solution.

## What do we need to replace?
There are **2** things that are to be replaced: `silex/silex`, as it is no longer maintained, and `pimple/pimple`, since the version we are using is outdated.

To be able to eliminate _Silex_, we need to remove any dependencies on the abandoned `silex/silex` project that we are using in Spryker (version **1.3.6**). The Spryker code will be refactored gradually until it becomes independent of _SIlex_. On top of that, we added a new Spryker Application to replace the _Silex_ one and a container to substitute _Pimple_.

## What about backward compatibility?
To avoid forcing an immediate update to a majority of Spryker modules, we introduced several small changes. Each of them is backward compatible.

As _Silex_ used to be an instance of _Pimple_ with all services attached to, we introduced our own _Container_ that implements the `ContainerInterface` from [PSR-11](https://www.php-fig.org/psr/psr-11/){target="_blank"}. Additionally, we added a mock class for _Pimple_ that further extends the _Container_. The mock allows us to keep using the `\Pimple;` **use** statement without having the `pimple/pimple` package installed. This way, we eliminate the need to refactor the code that makes use of _Pimple_. This makes any changes fully backward compatible.

## What will change?
### Application Plugins

Since `ServiceProviderInterface` is not provided anymore, any code that implements it needs to be migrated to the new model. Spryker will provide a proper replacement for each _Service Provider_. To do so, we introduce **Application Plugins**. An _Application Plugin_ is a plugin that integrates a certain service (e.g. Twig, Form, Security, Routing, etc.) to the application. Each plugin is added to the corresponding `ApplicationDependencyProvider`.

### Service Extension

With Silex, it was possible to extend or overwrite existing services. Now, instead of adding multiple _Service Providers_, it is possible to use extension points for the services. This means that each service added as an _Application Plugin_ (e.g. Twig) will have its own extension interface.

### Existing Service Providers

The already existing _Service Providers_ will remain unchanged, however, from now on, we will be creating _Application Plugins_ to use instead of _Service Providers_. Such _Application Plugins_ will also have extension points to add or change the functionality when necessary.

## What do projects need to do?
### General
First of all, customer projects need to update several Spryker modules and other packages. Ideally, there should be no outdated Sprkyer module in use. However, the main ones are `spryker/silex`, `spryker/application`, and `spryker/container`. The **minimum** versions that allow migrating away from _Silex_ and _Pimple_ are as follows:
*   `spryker/application` >= 3.13.2
*   `spryker/container` >= 1.1.0
*   `spryker/silex` >= 2.1.0
*   `spryker/symfony` >= 3.2.2
*   `spryker-shop/shop-application` >= 1.4.1
{% info_block infoBox %}

The versions above are the minimum requirements to allow migrating away from _Silex_. Projects are strongly advised to upgrade to the **latest** version of each module available.

{% endinfo_block %}
In some older Spryker Commerce OS or Spryker Demoshop versions, there were dependencies added directly to the `composer.json` of the projects. Projects based on those versions need to make sure that the mentioned modules do not appear as project dependencies and that there are no constraint points to `silex/silex`, `spryker/pimple`, or `pimple/pimple`.
{% info_block infoBox %}

Under certain circumstances, an update does not contain the latest versions of the required Spryker modules. To find out why they are not installed, you can use the `why` and `why-not` commands provided by Composer. They will help you to update the dependencies.

{% endinfo_block %}
### Specific Services
The modules listed below have been refactored to use _Application Plugins_. Projects need to perform additional steps to migrate the modules to the latest version.

Modules that need to be migrated away from _Silex_:
*   [ErrorHandler](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/silex-replacement/silex-migration-guides/migration-guide)
*   [EventDispatcher](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/silex-replacement/silex-migration-guides/migration-guide)
*   [Form](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/silex-replacement/silex-migration-guides/migration-guide)
*   [Http](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/silex-replacement/silex-migration-guides/migration-guide)
*   [Locale](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/silex-replacement/silex-migration-guides/migration-guide)
*   [Propel](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/silex-replacement/silex-migration-guides/migration-guide)
*   [Messenger](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/silex-replacement/silex-migration-guides/migration-guide)
*   [Router](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/silex-replacement/silex-migration-guides/migration-guide)
*   [Security](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/silex-replacement/silex-migration-guides/migration-guide)
*   [Session](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/silex-replacement/silex-migration-guides/migration-guide)
*   [Store](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/silex-replacement/silex-migration-guides/migration-guide)
*   [Translator](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/silex-replacement/silex-migration-guides/migration-guide)
*   [Twig](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/silex-replacement/silex-migration-guides/migration-guide)
*   [Validator](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/silex-replacement/silex-migration-guides/migration-guide)
*   [WebProfiler](/docs/scos/dev/migration-and-integration/202001.0/migration-concepts/silex-replacement/silex-migration-guides/migration-guide)
    
## How to extend or change the services?
Previously, if we wanted to extend a service (for instance, Twig) with new functions or global variables, we would need to add a new _Service Provider_ and use the _extend_ functionality provided by Pimple to manipulate a registered _Service Provider_. After that, it would be necessary to add the _Service Provider_ to _Silex_ Application. This option remains available, however, it is preferable to use the provided extension interfaces for each of the services used.

Let us review the example of _Twig_. The `Twig` module contains `TwigApplicationPlugin`. On top of that, there is the `TwigExtension` module that brings at least one interface that can be used to extend _Twig_. Instead of adding multiple _Service Providers_ to the application, we only need to add the `TwigApplicationPlugin` to the `ApplicationDependencyProvider`. If we need to further extend Twig, we simply add a plugin to `TwigDependencyProvider`.
