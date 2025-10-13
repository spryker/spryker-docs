---
title: Modules and application layers
description: Learn about the layers in the Spryker Commerce OS and how they are related with each other.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/modules-and-layers
originalArticleId: 2c4ec7d1-3056-4dc2-bc82-8865dfbc49de
redirect_from:
  - /docs/scos/dev/architecture/modules-and-application-layers.html
related:
  - title: Conceptual overview
    link: docs/dg/dev/architecture/conceptual-overview.html
  - title: Programming concepts
    link: docs/dg/dev/architecture/programming-concepts.html
  - title: Technology stack
    link: docs/dg/dev/architecture/technology-stack.html
  - title: Code buckets
    link: docs/dg/dev/architecture/code-buckets.html
---

At Spryker, we use modular programming and packaging principles for organizing functionalities into independent software packages – modules.
To establish a common infrastructure across all modules and to assist configurability, flexibility, agility, and modularity, the modules are divided into application layers according to the Spryker's application design concept. Each application layer is further divided into layers following the layered architecture pattern.

## Layers

Layers are not limited to any specific application layer. However, in practice, there is a specific set of layers used by each application layer.

The Spryker layer structure looks as follows:

![Application layers and layers](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Architecture+Concepts/Modules+and+layers/layers.png)

Each layer serves a single purpose inside an application layer.

### Persistence layer

The *Persistence* layer is responsible for defining and dealing with the database in a module. Database table schemas and query objects are defined in this layer. The Persistence layer cannot access any other layer above it.

### Business layer

All the business logic is implemented in the *Business* layer. It usually has several business models to serve the necessary functionality. The Business Layer is located directly above the Persistence layer, so it can access it for the read and write operations.

### Communication layer

The *Communication* layer is the entry point of a module. When a frontend application communicates with the Commerce OS, it accesses the Communication layer first. Then, depending on the request functionality, the request is passed further from the Communication layer.

The Communication Layer is located above the Business layer, so it can access all the business logic in a module. That's how the Communication layer invokes the right business logic when requested.

### Presentation layer

On the *Presentation* layer, the view-related content is implemented. To get the needed data, the layer sends requests to the Communication layer. Then, it shows the data using the templates.

## Modularity

Modularity in Spryker refers to the platform's design philosophy of breaking down the system into independent, reusable components or modules. Each module encapsulates specific functionality, such as cart management, product search, or checkout processes, letting developers build, customize, and scale e-commerce solutions with greater flexibility and efficiency.

The following are recommendations on splitting functionality into modules:

1. Identify core business capabilities. Each capability can be a candidate for a module. For example: Product, Cart, Checkout. Break down your application into these high-level domains and assign each to a module.
2. Follow the single-responsibility principle (SRP). Each module should have a single responsibility and focus on one specific functionality. Avoid creating monolithic modules that handle multiple unrelated tasks. This ensures that modules remain lightweight, reusable, and easy to maintain.
3. Group related features together. If some features are closely related, group them into a single module. However, ensure that the module doesn't become too large or violate the SRP.
4. Separate cross-cutting concerns, such as logging, authentication, or caching, into their own modules. This approach ensures that these concerns are reusable across multiple modules.
5. Clearly define the boundaries of each module to avoid tight coupling. Modules should communicate with each other through well-defined interfaces, such as Facade, Client, Service, or Plugin.
6. Organize modules by layers: Persistence, Business, Communication and Presentation.
7. Avoid over-modularization. While modularity is beneficial, over-modularization can lead to unnecessary complexity. Avoid creating too many small modules that perform trivial tasks. Instead, focus on creating modules that encapsulate meaningful and reusable functionality.
8. Each module should be independently testable. Write functional or API tests for each module to ensure it works as expected. Use Spryker's testing tools and frameworks to streamline this process.
9. Reuse and enhance existing modules. Before creating a new module, check if Spryker or its ecosystem already provides a module that meets your needs. Reusing existing modules saves time and ensures compatibility with the platform.

## Next steps

- To learn about the building blocks of Spryker, see [Programming concepts](/docs/dg/dev/architecture/programming-concepts.html).
- To learn about application layers, see [Concept overview](/docs/dg/dev/architecture/conceptual-overview.html).
- To learn about modular programming, see [Modular programming](https://en.wikipedia.org/wiki/Modular_programming).
- To learn about the layered architecture pattern, see [Multitier architecture](https://en.wikipedia.org/wiki/Multitier_architecture).
- To learn about packaging principles, see [Packaging principles](http://principles-wiki.net/collections:robert_c._martin_s_principle_collection).
- To learn about quality attributes, see [Quality attributes](https://en.wikipedia.org/wiki/List_of_system_quality_attributes).
- To learn about modularity, see [Software Modularity](https://www.modularmanagement.com/blog/software-modularity).
