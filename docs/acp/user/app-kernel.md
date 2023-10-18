---
title: Create an app with AppKernel
description: Learn how to use the AppKernel when developing an App with Spryker's Mini Framework
template: howto-guide-template
---

The [AppKernel](https://github.com/spryker/app-kernel) is a module that provides the default functionality required by most of the apps. The functionality includes:

- Configuration of an app: Receiving a request from the App Store Catalog to configure this app for a Tenant.
- Disconnecting an app: The App gets disconnected from a Tenant through the App Store Catalog.

This document provides describes how to use AppKernel together with Spryker's Mini Framework to develop an app.

## AppKernel
Basically, every app needs to be configured for each Tenant individually. To prevent this logic from being implemented with each PBC, AppKernel provides this functionality by default.

This functionality includes the following components:

- The `\Spryker\Glue\App\Plugin\RouteProvider\AppRouteProviderPlugin` route provider plugin which provides the following Glue endpoints:
  - `/private/configure` - to receive the configuration request.
  - `/private/disconnect` - to disconnect the app from a Tenant (configuration gets deleted).
- The `\Spryker\Glue\App\Controller\AppConfigController::postConfigureAction()` controller that receives the configuration request. 
- The `\Spryker\Glue\App\Controller\AppDisconnectController::postDisconnectAction()` controller that receives the disconnection request. 
 
Additionally, you can extend the AppKernel with your own business logic by using plugins in the provided extension points as outlined in the following sections.

## Install the required modules using Composer

```bash
composer require spryker/app-kernel
```


## Configure routes

Add the `AppRouteProviderPlugin` to `\Pyz\Glue\GlueBackendApiApplication\GlueBackendApiApplicationDependencyProvider::getRouteProviderPlugins()`.

## Extending Glue

In many cases, it is required to add your own validation on top of the default validation that is provided by the AppKernel. We offer extension points for both actions Configure and Disconnect. You can use the same plugin in both places when needed.

### Configure

Add a class that implements `\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RequestValidatorPluginInterface` and add it to `\Pyz\Glue\AppKernel\AppKernelDependencyProvider::getRequestConfigureValidatorPlugins()` on the project level when needed.

This plugin will be executed inside the `\Spryker\Glue\AppKernel\Controller\AppConfigController::postConfigureAction()` before any other action is happening.

### Disconnect

Add a class that implements `\Spryker\Glue\GlueApplicationExtension\Dependency\Plugin\RequestValidatorPluginInterface` and add it to `\Pyz\Glue\AppKernel\AppKernelDependencyProvider::getRequestDisconnectValidatorPlugins()` on the project level when needed.

This plugin will be executed inside the `\Spryker\Glue\AppKernel\Controller\AppConfigController::postDisconnectAction()` before any other action is happening.

## Extending Zed

### Configure

In some cases, you need to do additional things with the passed configuration e.g. sending a request to a third-party application, or manipulating the data before it gets saved into the database.

You can add two plugins:

- `\Spryker\Zed\AppKernelExtension\Dependency\Plugin\ConfigurationBeforeSavePluginInterface` - This one will be executed before the configuration is saved in the database. 
- `\Spryker\Zed\AppKernelExtension\Dependency\Plugin\ConfigurationAfterSavePluginInterface` - This one will be executed after the configuration was saved in the database.

These plugins will be executed inside of the `\Spryker\Zed\AppKernel\Business\Writer\ConfigWriter::doSaveAppConfig()` method in a transaction. When you need to do some business logic for your App then you can use those plugins to do so and add them to the corresponding method in the \Pyz\Zed\AppKernel\AppKernelDependencyProvider on the project level when needed.

The following methods can be used to attach your plugins:

- `\Pyz\Zed\AppKernel\AppKernelDependencyProvider::getConfigurationBeforeSavePlugin()` - Use this for plugins that must be executed before the data gets saved to the database. 
- `\Pyz\Zed\AppKernel\AppKernelDependencyProvider::getConfigurationAfterSavePlugin()` - Use this for plugins that must be executed after the data was saved to the database.

### Disconnect

In some cases, you need to do additional things before the Tenant gets disconnected from an App (configuration will be deleted).

You can add two plugins:

- `\Spryker\Zed\AppKernelExtension\Dependency\Plugin\ConfigurationBeforeDeletePluginInterface` - This one will be executed before the configuration is deleted from the database. 
- `\Spryker\Zed\AppKernelExtension\Dependency\Plugin\ConfigurationAfterDeletePluginInterface` - This one will be executed after the configuration was deleted from the database.

These plugins will be executed inside of the `\Spryker\Zed\AppKernel\Business\Deleter\ConfigDeleter::deleteConfig()` method. To prevent the further execution you have to throw an exception inside of your plugin to stop the deletion process. Please, provide a clear exception message to make it easy for anyone to fix the underlying issue.

The following methods can be used to attach your plugins:

- `\Pyz\Zed\AppKernel\AppKernelDependencyProvider::getConfigurationBeforeDeletePlugin()` - Use this for plugins that must be executed before the data gets deleted from the database. 
- `\Pyz\Zed\AppKernel\AppKernelDependencyProvider::getConfigurationAfterDeletePlugin()` - Use this for plugins that must be executed after the data was deleted from the database.

## Saving the configuration

Each App configuration differs from the other. We made it simple to store any configuration in the database by allowing to pass an array of the configuration to the AppConfigTransfer object. Inside of the AppKernel this array is converted into JSON and stored as such in the database.

```
<?php

$myAppConfigTransfer = new MyAppConfigTransfer();

$appConfigTransfer = new AppConfigTransfer();
$appConfigTransfer->setConfig($myAppConfigTransfer->toArray());

$appKernelFacade = new AppKernelFacade();
$appKernelFacade->saveConfig($appConfigTransfer);
```

## Getting the Configuration

Inside of your App you want to leverage your own Transfer object to work with the configuration. Since the configuration is store as JSON in the database we do the mapping magic inside of the AppKernel. You only need to call the AppKernelFacadeInterface::getConfig() with an AppConfigCriteriaTransfer and the Transfer object you want to populate with the stored configuration. The `AppKernelFacadeInterface::getConfig()` returns your passed TransferInterface populated with the config that was stored as JSON.

```
<?php

$myAppConfigTransfer = new MyAppConfigTransfer();
$appConfigCriteriaTransfer = new AppConfigCriteriaTransfer();
$appConfigCriteriaTransfer->setTenantIdentifier('some-tenant-identifier');

$appKernelFacade = new AppKernelFacade();
$myAppConfigTransfer = $appKernelFacade->getConfig($appConfigCriteriaTransfer, $myAppConfigTransfer);

$myAppConfigTransfer->getFoo();
```


## Summary

When you have done all the mentioned steps you can continue with developing the busines logic of your App. The code that integrates your App into ACP is ready to be used.
