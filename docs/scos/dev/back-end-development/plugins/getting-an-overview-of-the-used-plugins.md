---
title: Getting an Overview of the Used Plugins
description: Plugin Overview gives you several ways of displaying plugin usages.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/plugin-overview
originalArticleId: b0e9b971-1bd5-433c-973f-e989820adeb4
redirect_from:
  - /2021080/docs/plugin-overview
  - /2021080/docs/en/plugin-overview
  - /docs/plugin-overview
  - /docs/en/plugin-overview
  - /v6/docs/plugin-overview
  - /v6/docs/en/plugin-overview
  - /v5/docs/plugin-overview
  - /v5/docs/en/plugin-overview
  - /v4/docs/plugin-overview
  - /v4/docs/en/plugin-overview
  - /v3/docs/plugin-overview
  - /v3/docs/en/plugin-overview
  - /v2/docs/plugin-overview
  - /v2/docs/en/plugin-overview
  - /v1/docs/plugin-overview
  - /v1/docs/en/plugin-overview
---

To be able to use a new feature projects most likely need to add some plugins to their `*DependencyProvider`. Currently, it is not easy for projects to integrate a new feature due to the difficulties in identifying to which *DependencyProvider plugin A* of *module B* can be added to bring *functionality X*.

To see which [Plugin](/docs/scos/dev/back-end-development/plugins/plugins.html) can be used in which `DependencyProvider` we added a feature called **Plugin Overview**. This feature gives you several ways of displaying our plugin usages. The feature brings a console command (`vendor/bin/console dev:plugin-usage:dump`) and a [GUI in Zed](https://zed.mysprykershop.com/development/dependency-provider-plugin-usage).

You can even download a .CSV file with all used plugins.

## Console Examples
### Show all
Print all used plugins by running the command without any argument or option.

This will search for all `DependencyProvider` in the project code and all used plugins in there. The header of the table is the `DepenencyProvider` in which the plugins are found.

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

### Show one module
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

### Show all of an application
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

The module option is very powerful and can be used in many ways. You can also use a placeholder (*) in the module option elements. The module option consists of three elements **Organization + Application + Module**.

<!-- Last review date: Feb 11, 2019 -->
