---
title: Modules and layers
originalLink: https://documentation.spryker.com/v6/docs/modules-and-layers
redirect_from:
  - /v6/docs/modules-and-layers
  - /v6/docs/en/modules-and-layers
---

In Spryker, we use modular programming and packaging principles for organizing functionalities into independent software packages — modules. 
To establish a common infrastructure across all modules and to assist configurability, flexibility, agility, and modularity, the modules are divided into application layers according to the Spryker OS application design concept. Each application layer is further divided into layers following the layered architecture pattern.

This article describes the Spryker layers and their roles in the application layers.

## Layers

Layers are not limited to any specific application layer. In practice though, there is a specific set of layers utilized by each application layer.

The Spryker layer structure looks as follows:

![Application layers and layers](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Architecture+Concepts/Modules+and+layers/layers.png){height="" width=""}

Each layer is servers a single main purpose inside an application layer.

### Persistence layer
The persistence layer is responsible for defining and dealing with the database in a module. Database table schemas and query objects are defined in this layer. The Persistence layer cannot access any other layer above it.

### Business layer
All the business logic is implemented in the Business layer. It usually has several business models to serve the necessary functionality. The Business Layer is located directly above the Persistence layer, so it can access it for the read and write operations.

### Communication layer 
The Communication layer is the entry point of a module. When a front-end application communicates with the Commerce OS, it accesses the Communication layer first. Then, depending on the request funcitonality, the request is passed further from the Communication layer.

The Communication Layer is located above the Business layer, so it can access all the business logic in a module. That's how the Communication layer invokes the right business logic when requested.

### Presentation layer 
On the Presentation layer, the view related content is implemented. To get the needed data, the layer sends requests to the Communication layer. Then, it shows the data using the templates.

## Next steps

<!---* To learn how data flows are separated in Spryker Commerce OS, refer to [Commerce OS and frontend apps](https://documentation.spryker.com/docs/commerce-os-and-frontend-apps).-->
* To learn about the building blocks of Spryker, see [Programming concepts](https://documentation.spryker.com/docs/programming-concepts).
* To learn about Application layers, see [Concept overview](https://documentation.spryker.com/docs/concept-overview).
* To learn about modular programming, see [Modular programming](https://en.wikipedia.org/wiki/Modular_programming).
* To learn about the layered architecture pattern, see [Multitier architecture](https://en.wikipedia.org/wiki/Multitier_architecture).
* To learn about packaging principles, see [Packaging principles](http://principles-wiki.net/collections:robert_c._martin_s_principle_collection).
* To learn about quality attributes, see [Quality attributes](https://en.wikipedia.org/wiki/List_of_system_quality_attributes).
