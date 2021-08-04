---
title: Modularity and Shop Suite
originalLink: https://documentation.spryker.com/v5/docs/modularity-and-shop-suite
redirect_from:
  - /v5/docs/modularity-and-shop-suite
  - /v5/docs/en/modularity-and-shop-suite
---

Everything built in Spryker is modular. Modular means that every shop functionality is built inside an independent software package. We call these software packages: modules. Every module in Spryker is a single functional unit that is responsible for only one thing. For instance, Spryker has a Checkout module which handles only checkout, and a Cart module that handles only cart functionality. The same applies to all the functionalities and capabilities Spryker has. Every module in that sense has its own name.

## Application Layers with Modules

Following this modularity and baring in mind having Commerce OS (Zed) and front-end applications (Yves), every module has a Commerce OS and front-end parts. The same thing also applies to the Client and the public API. For example, for the Cart module, you will find that inside the Commerce OS there is a module called Cart. Inside the Shop App, you will also find that there is a module called Cart, or CartPage. And in the Client, there is a module called Cart. It is basically the same module but in different application layers. There are 6 main application layers. A module can be used in all or some of them depending on the functionality the module is responsible for. Every application layer has its name which is also the namespace of the layer. The 6 application layers in Spryker are:

1. **Zed (~Commerce OS)** 
   The Commerce OS application layer. All the business logic, database operations, and the Backoffice are in this layer. It is basically the back-end application and logic.
2. **Yves (~Shop App)** 
   The front-end application layer. All the front-end presentation logic, templates, user experience logic, and interaction are in this layer.
3. **Public API** 
   The public API application layer. All the API object definitions and handling are located in this layer.
4. **Client** 
   The Client application layer. All the Client logic to connect the front-end application with the surrounding resources is in this layer.
5. **Shared** 
   This layer contains all the logic and structures that are shared between the Commerce OS and the front-end application. For instance, data transfer objects and module constants. As both applications should know about the data transfer structures and the constant values to communicate properly, the Shared layer is the place to host them. The same goes for all other shared things between the two applications.
6. **Service** 
   This layer acts as a library and contains all the logic that is repetitive between different modules and layers. For example, XML to JSON conversion logic. As this logic is used by different modules and layers, it is better not to repeat the code needed for it. The Service layer is where this logic resides.

## Inside Zed Layer

Let’s dig deeper inside Zed and see the structure of a module in it. The reason why we are diving deeper inside it is that the Commerce OS is the main application in Spryker and it has a specific architecture concept. A module in Zed consists of 4 main application layers. Each layer is responsible for handling one main purpose inside the module.

A module in the Commerce OS consists of 4 main software layers. Each layer is responsible for handling one main purpose inside the module.

1. **Persistence Layer** 
   This layer is responsible for defining and dealing with the database in a module. The database table schemas and query objects are defined in this layer. The Persistence layer is the lowest layer in the layer hierarchy. This means the Persistence layer cannot access any other layer above it.
2. **Business Layer** 
   This layer is where all the business logic of a module goes to. It is the most important layer of a module as all the actual functionality of the module is implemented here. It usually has several business models to serve the necessary functionality. The Business layer is located directly above the Persistence layer, so it can access it for reading from or writing to the database.
3. **Communication Layer** 
   This layer is the main entry point of a module. When a front-end application communicates with the Commerce OS, the Communication layer is accessed first. Then, the Communication layer directs the request depending on the requested functionality.
  The Communication layer is located directly above the Business layer, so it has access to all the business logic in a module. This is needed so the Communication layer invokes the right business logic when requested. The Communication layer also has read-only access to the Persistence layer in order to get data from the database without the need to pass by the Business layer in case there is no business logic needed in the request.
4. **Presentation Layer** 
   This layer is where the look and feel of the Backoffice are implemented. It only contains the templates of the Backoffice page of a module. The Presentation layer sends requests to the Communication layer in order to get the needed data. Then it shows the data using the templates.

Here is a graph that shows the 4 software layers in Zed Layer.
![Application layers](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Architecture+Concepts/Modularity+and+Shop+Suite/application-layers.png){height="" width=""}

On the other hand, the front-end architecture is fairly simple. It has routes, controllers, templates, and forms when needed. There are no software layers in the front-end application as there is no need for them and for the additional complexity.

The API, Client, Shared, and Service application layers have simply the logic to handle what is needed from them directly. There is no need for additional software layers as well.

## Where to go from here?

* To find out how data flows are separated in Spryker Commerce OS, refer to [Commerce OS and Frontend Apps](https://documentation.spryker.com/docs/en/commerce-os-and-frontend-apps).
* If you want to know more about the building blocks of Spryker, see [Programming Concepts](https://documentation.spryker.com/docs/en/programming-concepts).
