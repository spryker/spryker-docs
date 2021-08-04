---
title: Programming Concepts
originalLink: https://documentation.spryker.com/v4/docs/programming-concepts
redirect_from:
  - /v4/docs/programming-concepts
  - /v4/docs/en/programming-concepts
---

After covering the main architectural concepts of the Spryker’s Commerce OS, front-end, modularity, and the application and software layers, we will dive deeper inside these approaches and explain the main software and coding concepts in Spryker. There are the 7 main software concepts in Spryker.

1. **Facade**
Spryker *Facades* use the [Facade design pattern](https://en.wikipedia.org/wiki/Facade_pattern). They basically hide all the business logic of a module behind them and give a very simple and straightforward interface. Thus, the main API of a module is its Facade. Whenever you want to know what a module does, simply check its Facade interface.
Spryker’s Facades work as delegators, so they do not have any business logic in them. They simply delegate to the right model in order to handle the needed business logic. There is only one Facade for each module and it is located in the Business layer.

2. **Factory**
Spryker *Factories* follow the [Factory method pattern](https://en.wikipedia.org/wiki/Factory_method_pattern). They are simply the place where you instantiate objects. This means that in Spryker there are no “new” statements in the codebase outside the Factories. The only exception for that are data objects; data transfer objects and data entities. These two data objects can be instantiated anywhere. All the other objects are instantiated in the Factories. Thus, all object dependencies inside a module are injected in the Factories using Dependency Injection.
To isolate objects between the software layers in Spryker, every software layer in a module has its own Factory, except the Presentation layer as it does not have objects, only templates. So there are Persistence Factories, Business Factories, and Communication Factories. Glue, Client, and Service application layers have their own Factories as well. Yves can have a Factory when needed, however, it is not enforced by the Spryker architecture as in many cases it is not really needed for the front-end presentation logic.

3. **Query Container**
A *Query Container*, as the name suggests, is the place where all the database queries of a module exist. Query Containers have ready-built queries to get different data from the database in order to be used by different business logic as needed. Such a container is basically the main entry point of the Persistence Layer of a module. Every module has only one Query Container.

4. **Client**
The *Client* is the place where the implementation of the communication between the front-end application and all the surrounding resources is built. It acts similarly to a Facade where the Client interface shows all the possible functionalities the front-end can invoke. The Client also delegates all the actions to the right resources in order to get the needed responses to the front-end application.
The Client is not needed for every module, some modules have it and some do not. When there is communication between the front-end and a certain module, this module will then have a Client. There is one Client for each module. Sometimes, there are Clients that connect directly with an external resource. In this case, there is only a Client for this module, no Commerce OS nor front-end parts.

6. **Plugin**
The Plugin in Spryker is a way to extend certain functionality in a module, e.g. the Calculation stack when placing an order. The Calculation module is an abstract idea and should not depend on other modules in order to calculate the final price. Thus, it exposes an interface with the needed method to be implemented by other modules. Now, when there is another module involved in calculating the final price, it simply implements this interface and does the calculation internally in it. This implementation is called Plugin. This plugin along with others can then be injected into the Calculation module. In the end, the Calculation module calculates the final price by running the exposed method from all the injected plugins.
The idea of the Plugin is used in many different places in Spryker. It is a great way to extend functionality keeping the modularity and dependencies managed properly. A module can implement many different plugins and can have many different plugins injected into it. Plugins are located inside the Communication layer.

6. **Dependency Provider**
With modularity, it happens that different modules need functionalities from other modules. This builds dependencies between these modules, which is okay as long as the dependency makes sense. To provide the necessary functionality, the dependent module gets an object from the other module. As Facades are the main APIs of modules in Spryker, the dependent module gets the Facade of the other module. In some cases, a Client in a module needs another Client from another module. So, the dependent Client gets the Client object from the other module. To manage this kind of module-to-module dependencies, we use the *Dependency Provider*.
Dependency Provider is the place where the module-to-module dependencies are defined in a module. Every module has only one Dependency Provider per application layer when needed except the Shared layer. So, a module can have a Dependency Provider in the Commerce OS, another one in the front-end, and another one in Client.
The main difference between Factories and Dependency Providers is that Factories are responsible for in-module dependencies, while Dependency Providers are responsible for module-to-module dependencies.

7. **Transfer Object**
To manage data transfer between the front-end and the Commerce OS applications, and between module-to-module communication, we use Data Transfer Objects (DTOs) or *Transfer Objects*for short. A Transfer Object in Spryker is simply an object with getters, setters, and helper functions to make transferring data clear, yet simple to use.
Transfer Objects are defined as XML files. Every module can define its own Transfer Objects, or ever extend Transfer Objects from other modules when a dependency to that data is needed. These XML files are all merged and then transformed into auto-generated PHP objects.
Transfer Objects are a great way to represent data contracts between the Commerce OS and the front-end applications. It also represents data contracts between different modules. So, when any data is needed from a module, it is then clear what structure the data has and how to properly use it.
As both the Commerce OS and the front-end application should know about the structure of the Transfer Objects, the Shared application layer is where the Transfer Objects are located. Every module can have one or more Transfer Objects.

## Where to go from here?

* To find out how data flows are separated in Spryker Commerce OS, refer to [Commerce OS and Frontend Apps](/docs/scos/dev/developer-guides/202001.0/architecture-guide/commerce-os-and).
* If you would like to know more about the application layers and how various functionality is encapsulated in modules, see [Modularity and Shop Suite](/docs/scos/dev/developer-guides/202001.0/architecture-guide/modularity-and-).
