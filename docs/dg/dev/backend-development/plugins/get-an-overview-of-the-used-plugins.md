---
title: Get an overview of the used plugins
description: Discover how to review and analyze the plugins used in your Spryker project. This guide provides insights into managing plugins for optimal backend performance.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/plugin-overview
originalArticleId: b0e9b971-1bd5-433c-973f-e989820adeb4
redirect_from:
  - /docs/scos/dev/back-end-development/plugins/get-an-overview-of-the-used-plugins.html
  - /docs/scos/dev/back-end-development/plugins/getting-an-overview-of-the-used-plugins.html
related:
  - title: Plugins
    link: docs/dg/dev/backend-development/plugins/plugins.html
---

To use a new feature projects most likely need to add some plugins to their `*DependencyProvider`. Currently, it is not easy for projects to integrate a new feature because of the difficulties in identifying to which *`DependencyProvider` plugin A* of *module B* can be added to bring *functionality X*.

To see which [Plugin](/docs/dg/dev/backend-development/plugins/plugins.html) can be used in which `DependencyProvider` we added a feature called **Plugin Overview**. This feature gives you several ways of displaying our plugin usages. The feature brings a console command (`vendor/bin/console dev:plugin-usage:dump`) and a [GUI in Zed](https://zed.mysprykershop.com/development/dependency-provider-plugin-usage).

You can even download a CSV file with all the used plugins.

## Display all used plugins

Print all used plugins by running the command without any argument or option.

This searches for all `DependencyProvider` plugins in the project code and all used plugins in there. The header of the table is `DepenencyProvider` in which the plugins are found.

```
$ vendor/bin/console dev:plugin-usage:dump
...
Pyz\Zed\User\UserDependencyProvider
Spryker\Zed\Acl\Communication\Plugin\GroupPlugin
Spryker\Zed\AgentGui\Communication\Plugin\UserAgentFormExpanderPlugin  
Spryker\Zed\AgentGui\Communication\Plugin\UserAgentTableConfigExpanderPlugin
Spryker\Zed\CustomerUserConnectorGui\Communication\Plugin\UserTableActionExpanderPlugin
...
```

## Display one module

Another way of execution is to add the "module" option which can be used to shrink the list to a more readable one.

```
$ vendor/bin/console dev:plugin-usage:dump User

Pyz\Zed\User\UserDependencyProvider  
Spryker\Zed\Acl\Communication\Plugin\GroupPlugin
Spryker\Zed\AgentGui\Communication\Plugin\UserAgentFormExpanderPlugin
Spryker\Zed\AgentGui\Communication\Plugin\UserAgentTableConfigExpanderPlugin
Spryker\Zed\AgentGui\Communication\Plugin\UserAgentTableDataExpanderPlugin
Spryker\Zed\CustomerUserConnectorGui\Communication\Plugin\UserTableActionExpanderPlugin
```

## Display all used plugins in applications

You can also print a list of used plugins in applications.

```
$ vendor/bin/console dev:plugin-usage:dump Pyz.Client.*
Pyz\Zed\User\UserDependencyProvider
Spryker\Zed\Acl\Communication\Plugin\GroupPlugin  
Spryker\Zed\AgentGui\Communication\Plugin\UserAgentFormExpanderPlugin  
Spryker\Zed\AgentGui\Communication\Plugin\UserAgentTableConfigExpanderPlugin
Spryker\Zed\AgentGui\Communication\Plugin\UserAgentTableDataExpanderPlugin
Spryker\Zed\CustomerUserConnectorGui\Communication\Plugin\UserTableActionExpanderPlugin
```

The module option is very powerful and can be used in many ways. You can also use a placeholder asterisk (`*`) in the module option elements. The module option consists of three elements: *Organization*, *Application*, and *Module*.
