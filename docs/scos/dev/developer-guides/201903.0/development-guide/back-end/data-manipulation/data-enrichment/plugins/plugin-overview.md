---
title: Getting an Overview of the Used Plugins
originalLink: https://documentation.spryker.com/v2/docs/plugin-overview
redirect_from:
  - /v2/docs/plugin-overview
  - /v2/docs/en/plugin-overview
---

To be able to use a new feature projects most likely need to add some plugins to their `*DependencyProvider`. Currently, it is not easy for projects to integrate a new feature due to the difficulties in identifying to which *DependencyProvider plugin A* of *module B* can be added to bring *functionality X*.

To see which [Plugin](/docs/scos/dev/developer-guides/201903.0/development-guide/back-end/data-manipulation/data-enrichment/plugin) can be used in which `DependencyProvider` we added a feature called **Plugin Overview**. This feature gives you several ways of displaying our plugin usages. The feature brings a console command (`vendor/bin/console dev:plugin-usage:dump`) and a [GUI in Zed](http://zed.de.suite-nonsplit.local/development/dependency-provider-plugin-usage).

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

<!-- Last review date: Feb 11, 2019 by René Klatt, Dmitry Beirak, Anastasija Datsun -->
