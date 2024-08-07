---
title: Programming concepts
description: This dociment explains the main software and coding concepts used in Spryker.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/programming-concepts
originalArticleId: e72b4d76-638f-414d-8577-729b26de5909
redirect_from:
  - /docs/scos/dev/architecture/programming-concepts.html
related:
  - title: Conceptual overview
    link: docs/dg/dev/architecture/conceptual-overview.html
  - title: Technology stack
    link: docs/dg/dev/architecture/technology-stack.html
  - title: Modules and layers
    link: docs/dg/dev/architecture/modules-and-application-layers.html
  - title: Code buckets
    link: docs/dg/dev/architecture/code-buckets.html
---

Having covered the main architectural concepts of the Spryker Commerce OS, frontend, modularity, and the application and software layers, this document dives deeper into these approaches and explains the main software and coding concepts in Spryker. There are seven main software concepts in Spryker.

## Facade

Spryker *Facades* use the [Facade design pattern](https://en.wikipedia.org/wiki/Facade_pattern). They hide all the business logic of a module behind them and give a very simple and straightforward interface. Thus, the main API of a module is its Facade. When you want to find out what a module does, simply check its Facade interface.

Spryker's Facades work as delegators, so they do not have any business logic in them. They delegate to the right model in order to handle the needed business logic. There is only one Facade for each module, and it is located in the Business layer.

## Factory

Spryker *Factories* follow the [Factory method pattern](https://en.wikipedia.org/wiki/Factory_method_pattern). They are simply the place where you instantiate objects. This means that in Spryker there are no "new" statements in the codebase outside the Factories. The only exceptions are data objects, data transfer objects, and data entities. These data objects can be instantiated anywhere. Thus, all object dependencies inside a module are injected into the Factories using Dependency Injection.

To isolate objects between the software layers in Spryker, every software layer in a module has its own Factory. The only exception is that the Presentation layer does not have objects, only templates. So, there are Persistence Factories, Business Factories, and Communication Factories.

Glue, Client, and Service application layers have their own Factories as well. Yves can have a Factory when needed. However, it is not enforced by the Spryker architecture as, in many cases, it is not needed for the frontend presentation logic.

## Query Container

A *Query Container* is the place where all the database queries of a module are located. Query Containers have ready-built queries to get different data from the database to be used by different business logic. Such a container is the main entry point of the Persistence Layer of a module. Every module has a single Query Container.

## Client

A *Client* is a place where the implementation of the communication between the frontend application and all the surrounding resources is built. It acts similarly to a Facade where the Client interface shows all the possible functionalities the frontend can invoke. The Client also delegates all the actions to the right resources to get the needed responses to the frontend application.

The Client is not needed for every module: some modules have it, and some do not. When there is communication between the frontend and a module, the module has a Client. A module has a single Client. Sometimes, there are Clients that connect directly to an external resource. In this case, there is only a Client for this module but no Commerce OS or frontend parts.

## Plugin

In Spryker, a *Plugin* extends certain functionality in a module, like a Calculation stack when placing an order. The Calculation module is an abstract idea and should not depend on other modules to calculate the final price. Thus, it exposes an interface with the needed method to be implemented by other modules. When there is another module involved in calculating the final price, it implements this interface and does the calculation internally. This implementation is called Plugin. This Plugin, along with others, can then be injected into the Calculation module. In the end, the Calculation module calculates the final price by running the exposed method from all the injected Plugins.

Plugins are used in many different places in Spryker. It is a great way to extend functionality and properly manage the modularity and dependencies. A module can implement many different Plugins and can have many different plugins injected into it. Plugins are located inside the Communication layer.

## Dependency provider

With modularity, different modules need functionalities from other modules. This builds dependencies between modules, which is okay as long as the dependencies make sense. To allow for the necessary functionality, a dependent module gets an object from the other module. As Facades are the main APIs of modules in Spryker, the dependent module gets the Facade of the other module. In some cases, a Client in a module needs another Client from another module. So, the dependent Client gets the Client object from the other module. To manage this kind of module-to-module dependencies, we use *Dependency Providers*.

A _Dependency Provider_ is a place where the module-to-module dependencies are defined in a module. Every module has only one Dependency Provider per application layer, except the Shared layer. So, a module can have a Dependency Provider in the Commerce OS, another one in the front end, and another one in the Client.

The main difference between Factories and Dependency Providers is that Factories are responsible for in-module dependencies, while Dependency Providers are responsible for module-to-module dependencies.

## Transfer object

To manage data transfer between the frontend and the Commerce OS applications and between module-to-module communication, we use *Data Transfer Objects* (or Transfer Objects). In Spryker, a _Transfer Object_ is an object with getters, setters, and helper functions to make data transfers clear and simple to use.

Transfer Objects are defined as XML files. Every module can define its own Transfer Objects or extend Transfer Objects from other modules when a dependency to that data is needed. The XML files are merged and transformed into auto-generated PHP objects.

Transfer Objects are a great way to represent data contracts between the Commerce OS and frontend applications. It also represents data contracts between different modules. When any data is needed from a module, it is clear what structure the data has and how to properly use it.

As both the Commerce OS and the frontend application need to know about the structure of the Transfer Objects, they are located on the Shared application layer. Every module can have one or more Transfer Objects.

## Code structure

The code is divided into two parts:

1. The code of your current project is located in the `src/` directory. This is where you can do your implementations.
2. In the `vendor/spryker` and `vendor/spryker-shop` directories, you can find what we call a Spryker-core.

Directories:

|            PATH            |                           PURPOSE                            |
| ------------------------ | ---------------------------------------------------------- |
|      src/{Namespace}/      | Use this directory for developing. All the code for Yves and Zed is located here. |
|  vendor/spryker,  vendor/spryker-shop  | Contains the code of the Spryker-core. It follows the architectural rules used in the project's code. |
| vendor/{vendor}/{package}/ | All the other packages that are installed using composer install. |
|           data/            |  Log files and other temporary data.   |
|   public/Yves/index.php    |      Web-server entry point of the Storefront application.       |
|    public/Yves/assets/     |  Static files, such as CSS, JS, and assets, for the project's Yves.  |
|    public/Zed/index.php    |      Web-server entry point of the Back Office application.       |
|     public/Zed/assets/     |  Static files, such as CSS, JS, and assets, for the project's Zed.   |
|   public/Glue/index.php    |    Web-server entry point of the Storefront API application.     |

## Next steps

* To find out how data flows are separated in Spryker Commerce OS, see [Conceptual overview](/docs/dg/dev/architecture/conceptual-overview.html).
* To learn about application layers and how various functionality is encapsulated in modules, see [Modules and layers](/docs/dg/dev/architecture/modules-and-application-layers.html).
