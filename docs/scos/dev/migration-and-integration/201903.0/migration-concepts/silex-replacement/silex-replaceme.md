---
title: Silex Replacement
originalLink: https://documentation.spryker.com/v2/docs/silex-replacement-201903
redirect_from:
  - /v2/docs/silex-replacement-201903
  - /v2/docs/en/silex-replacement-201903
---

Silex is abandoned and we are going to replace it with a Spryker Application. Originally, Silex was used to integrate Symfony Components into our application by using Service Providers. Apart from the Silex Service Providers, there were many other Service Providers added by Spryker and projects to the application inside the Bootstrap classes. They implemented Symfony Components and other things by adding them to Pimple container.

## What do we need to replace?
Two things are to be replaced. We need to replace `silex/silex` and `pimple/pimple` since Silex is not maintained anymore and the version of Pimple in use is outdated.

To be able to refactor out Silex, we had to separate the code of the abandoned `silex/silex` we are currently using in Spryker (v.1.3.6) until all our code is refactored to work in the new way.  On top of that, we added our own application which is to replace Silex and our own Container which is already a replacement for Pimple.

## What about backward compatibility?
To avoid forcing everyone to update the majority of Spryker modules, we introduced several small changes which are backward compatible. The Silex application used to be an instance of Pimple where all services were attached to. We introduced our own Container which implements the ContainerInterface from the PSR-11. Additionally, we added a kind of a mock class for Pimple. The Pimple mock, by extending the Container from Spryker, allowed us to keep using the use `\Pimple;` use statement. This way we were able to keep all the code which makes use of Pimple untouched and remove the `pimple/pimple` package.

Up to this point, the changes are fully backward compatible.

## What do projects need to do?
First of all, projects need to update several Spryker modules and other packages. Ideally, there should be no outdated Sprkyer module in use. However, the main ones are `spryker/silex` (2.2.1), `spryker/application` (3.13.2), `spryker/container` (1.1.1).

In some older Spryker Commerce OS or Demoshop versions, there were dependencies added to the projects' `composer.json`. Such projects need to make sure that the mentioned modules don't appear as project dependencies and that there are no constraint points to `silex/silex`, `spryker/pimple` or `pimple/pimple`.

There might be some circumstances where an update does not contain the latest versions of the required Spryker modules. To find out why they are not installed, projects can use Composer's why and why-not commands. These commands will help to update the dependencies.

## What will change?
As already mentioned, we will not use the `ServiceProviderInterface` anymore, so all code which implements it needs to be migrated to the new way. There will be a proper replacement for all the `ServiceProviders` from Spryker. We introduced Application Plugins which will bring in services like Twig, Form, Security, Routing etc. They will be added to the corresponding  `ApplicationDependencyProvider`.

With Silex, it was possible to extend or overwrite existing services. Now, instead of adding multiple `ServiceProviders`, we are going to use extension points added for our services. Each service added as an Application Plugin (e.g. Twig) will have its own extension interface.

## What about all the existing ServiceProviders?
They will remain unchanged. However, from now on, we will be creating Application Plugins to use instead of Service Providers. These Application Plugins will have extension points to add or change the functionality of the added service.

## What is an Application Plugin?
An Application Plugin is a plugin which brings a service into the application. Twig, for example, will be one of the Application Plugins.

## How to extend or change services?
Previously, if we wanted to extend a service like Twig with new functions or global variables, we would have to add another Service Provider and use Pimple's extend functionality by manipulating a registered Service Provider. Then, it would be necessary to add the ServiceProvider to the Silex application too. This option will remain available, but it will be more preferable to use the provided extension interfaces for each of the used services.

Let's have a look at how it will work following the Twig example. There will be a Twig module which has a `TwigApplicationPlugin`. On top of that, there will be a `TwigExtension` module which brings at least one interface which can be used to extend Twig. Instead of adding multiple `ServiceProviders` to the application, we will only need to add the `TwigApplicationPlugin` to the `ApplicationDependencyProvider`. If we also want to extend Twig, we will add a Plugin to the `TwigDependencyProvider`.

<!-- See also:
Application
Container 
once published, add links to related articles -->
 
<!-- Last review date: Feb 19, 2019 by Rene Klatt, Andrii Tserkovnyi-->
