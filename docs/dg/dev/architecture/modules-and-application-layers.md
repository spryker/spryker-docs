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

In Spryker, we use modular programming and packaging principles for organizing functionalities into independent software packages—modules.
To establish a common infrastructure across all modules and to assist configurability, flexibility, agility, and modularity, the modules are divided into application layers according to the Spryker OS application design concept. Each application layer is further divided into layers following the layered architecture pattern.

This document describes the Spryker layers and their roles in the application layers.

## Layers

Layers are not limited to any specific application layer. In practice, though, there is a specific set of layers utilized by each application layer.

The Spryker layer structure looks as follows:

![Application layers and layers](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Architecture+Concepts/Modules+and+layers/layers.png)

Each layer serves a single purpose inside an application layer.

### Persistence layer

The _Persistence_ layer is responsible for defining and dealing with the database in a module. Database table schemas and query objects are defined in this layer. The Persistence layer cannot access any other layer above it.

### Business layer

All the business logic is implemented in the _Business_ layer. It usually has several business models to serve the necessary functionality. The Business Layer is located directly above the Persistence layer, so it can access it for the read and write operations.

### Communication layer

The _Communication_ layer is the entry point of a module. When a frontend application communicates with the Commerce OS, it accesses the Communication layer first. Then, depending on the request functionality, the request is passed further from the Communication layer.

The Communication Layer is located above the Business layer, so it can access all the business logic in a module. That's how the Communication layer invokes the right business logic when requested.

### Presentation layer

On the _Presentation_ layer, the view-related content is implemented. To get the needed data, the layer sends requests to the Communication layer. Then, it shows the data using the templates.

## Next steps

* To learn about the building blocks of Spryker, see [Programming concepts](/docs/dg/dev/architecture/programming-concepts.html).
* To learn about application layers, see [Concept overview](/docs/dg/dev/architecture/conceptual-overview.html).
* To learn about modular programming, see [Modular programming](https://en.wikipedia.org/wiki/Modular_programming).
* To learn about the layered architecture pattern, see [Multitier architecture](https://en.wikipedia.org/wiki/Multitier_architecture).
* To learn about packaging principles, see [Packaging principles](http://principles-wiki.net/collections:robert_c._martin_s_principle_collection).
* To learn about quality attributes, see [Quality attributes](https://en.wikipedia.org/wiki/List_of_system_quality_attributes).
