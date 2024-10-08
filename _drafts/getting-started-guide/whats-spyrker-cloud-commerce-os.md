---
title: What's Spryker Cloud Commerce OS
description: Learn about Spryker Cloud Commerce OS
last_updated: Aug 17, 2023
template: concept-topic-template
---

*Spryker Cloud Commerce OS (SCCOS)* is an e-commerce platform-as-a-service solution designed to provide businesses with the flexibility and efficiency needed to create a unique digital commerce experience. Built on a modular and layered architecture, it increases operational efficiency and lowers the total cost of ownership. This document provides an overview of the key features and benefits of SCCOS.

## Modular Architecture

The Spryker Commerce OS adopts a modular architecture, comprising over 750 different modules, with some being mandatory and others optional. This design allows you to create tailored solutions that match specific business needs.

![Modularity Image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/About+Spryker/modularity_transparent.png)

### Advantages of modular architecture

* **Selectivity**: Utilize only the modules you need, reducing redundant code.
* **Scalability**: Grow your project with the wide selection of available modules.
* **Flexibility**: Add, delete, and test new features without hindering your live shop.
* **Atomic Release Approach**: Each module is developed and released independently, ensuring backward compatibility.

[More on Spryker Modules](https://github.com/spryker)

## Layered Architecture

Layered Architecture in SCCOS allows for a clear division between your commercial offerings and sales channels, enabling greater flexibility and scalability. This architecture is organized into four distinct layers:

* **Presentation Layer**: Interfaces such as online stores, mobile apps, and other customer touchpoints.
* **Business Layer**: Responsible for business logic around products, pricing, stock, orders, merchandising and other related commercial subjects.
* **Communication Layer**: Connects the presentation to the business layer.
* **Persistence Layer**: Manages data storage, schemma and migration in appropriate data models within relational database management system.

![Layers Image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/About+Spryker/spryker_layers_s.png)

### Advantages of layered architecture

* **High Performance**: Long processes are isolated in specific layers, ensuring optimal performance of other layers (presentation)
* **Parallel Development**: Frontend and backend development can proceed simultaneously, speeding up implementation and testing.
* **Growth Focus**: Efforts can concentrate on improvement rather than makeshift solutions.
* **Flexibility**: Easy to modify, extend, or replace elements in presentation layer w.o. affecting business logic and vise-versa.

## Managed Cloud Platform

Spryker Cloud Commerce OS offers a managed cloud platform where the environments are fully managed by Spryker. This lets you achieve the following goals:

* **Focus on development**:  You concentrate on creating and refining your projects because you don't need to worry about managing environments.
* **Integrate seamlessly**: With CI/CD development workflows, you can achieve a streamlined development process.
* **Observability**: By leveraging APM solutions such as NewRelic and CloudWatch insides, you can watch, analyse and fix performance of your application
<!-- Additional details about the managed cloud platform will be added here once obtained from the experts. -->

## Customizable

Having modular and layered architecture lets you customize your project to meet specific requirements of your business and processes.

* **Adaptable Platform**: Spryker Cloud Commerce OS is suitable for a variety of e-commerce needs, accommodating various business operational models and industry verticals.
* **Vendor Logic Customisation**: Development teams can modify vendor-specific business logic provided out of the box leveraging Spryker's modular and layered architecture. This design allows for tailored adjustments to align with individual business requirements.
* **Smooth Integration**: Spryker's architecture facilitates seamless integration with pre-existing service eco-systems.
* **Iterative Development & Autonomy**: With Spryker, teams can benefit from the flexibility of an MVP approach, bringing their solutions fast to the market. They can start with essential features and integrations, and progressively introduce or remove functionalities, adjusting to evolving requirements.

<!-- Additional information on customization options will be included here after gathering the information from the relevant experts. -->
