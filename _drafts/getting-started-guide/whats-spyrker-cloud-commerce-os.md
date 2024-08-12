---
title: What's Spryker Cloud Commerce OS
description: Learn about Spryker Cloud Commerce OS
last_updated: Aug 17, 2023
template: concept-topic-template
---

*Spryker Cloud Commerce OS (SCCOS or Spryker)* is an e-commerce platform-as-a-service solution designed to provide businesses with the flexibility and efficiency needed to create a unique digital commerce experience. Built on a modular and layered architecture, it increases operational efficiency and lowers the total cost of ownership. This document provides an overview of the key features and benefits of Spryker.

## Modular architecture

The Spryker Commerce OS adopts a modular architecture, comprising over 750 different modules, with some being mandatory and others optional. This design allows you to create tailored solutions that match specific business needs.

![Modularity Image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/About+Spryker/modularity_transparent.png)

### Advantages of modular architecture

* *Selectivity*: Use only the modules you need, reducing redundant code.
* *Scalability*: Grow your project with the wide selection of available modules.
* *Flexibility*: Add, delete, and test new features without hindering your live shop.
* *Atomic release approach*: Each module is developed and released independently, ensuring backward compatibility.

[For the full list of modules, see Spryker's GitHub](https://github.com/spryker).

## Layered architecture

Layered Architecture in SCCOS ensures a clear separation between commercial offerings and sales channels. This architecture is split into four different layers:

* **Presentation Layer**: Interfaces like online stores, mobile apps, etc.
* **Business Layer**: Contains products, pricing, stock, and commercial information.
* **Communication Layer**: Connects the presentation to the business layer.
* **Persistence Layer**: Manages data storage and processing.

![Layers Image](https://spryker.s3.eu-central-1.amazonaws.com/docs/About/About+Spryker/spryker_layers_s.png)

### Advantages of layered architecture

* **High Performance**: Long processes are confined to specific layers, ensuring optimal performance.
* **Parallel Development**: Frontend and backend development can occur simultaneously.
* **Growth Focus**: Efforts can concentrate on improvement rather than makeshift solutions.
* **Information Flexibility**: Easy to modify, extend, or replace essential information.

## Managed cloud platform

Spryker Cloud Commerce OS offers a managed cloud platform where the environments are fully managed by Spryker. This lets you achieve the following goals:

* Focus on development: Not having to manage your environments, you can concentrate on creating and refining your projects.
* Integrate seamlessly: With CI/CD development workflows, you can achieve a streamlined development process.
* Observability: By leveraging NewRelic APM and CloudWatch insides, you can monitor, analyze, and fix the performance of your applications.


## Customizable

Modular and layered architecture lets you customize your project to meet the requirements of your business and processes:

* Adaptable platform: SCCOS is suitable for a variety of e-commerce needs, accommodating various business operational models and industry verticals.

* Vendor logic customization: Development teams can modify vendor-specific business logic provided by default, leveraging Spryker's modular and layered architecture. This design allows for tailored adjustments to align with individual business requirements.

* Smooth integration: Spryker's architecture facilitates seamless integration with pre-existing service eco-systems.

* Iterative development and autonomy: Teams can benefit from the flexibility of an MVP approach, quickly bringing their solutions to the market. They can start with essential features and integrations, and progressively introduce or remove functionalities, adjusting to evolving requirements.
