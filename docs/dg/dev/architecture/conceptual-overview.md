---
title: Conceptual overview
description: Spryker is a Commerce Operating System composed of the following applications- Storefront (Yves), Backoffice (Zed), Storefront API (Glue).
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/conceptual-overview
originalArticleId: 92a95e93-3608-4a70-93be-cf6aec4f9017
redirect_from:
  - /docs/scos/dev/architecture/conceptual-overview.html
related:
  - title: Programming concepts
    link: docs/dg/dev/architecture/programming-concepts.html
  - title: Technology stack
    link: docs/dg/dev/architecture/technology-stack.html
  - title: Modules and layers
    link: docs/dg/dev/architecture/modules-and-application-layers.html
  - title: Code buckets
    link: docs/dg/dev/architecture/code-buckets.html
---

Spryker is a Commerce Operating System, mainly composed of several applications, such as Storefront (Yves), Back Office (Zed) and Storefront API (Glue).

* *Storefront*—Frontend-presentation layer for customers, provided by Yves Application Layer based on [Symfony Components](https://symfony.com/components).
* *Back Office*—an application that contains all business logic and the backend GUI, provided by Zed Application Layer, and also uses the Symfony Components.
* *Storefront API*—an application providing resources for customers' interaction, provided by the Glue Application Layer, and can work based on either REST or [JSON API convention](https://jsonapi.org/).

The following diagram shows the conceptual parts of the application and their connections:

![Spryker overview](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Architecture+Concepts/Conceptual+Overview/spryker-overview.png)

The Spryker OS provides the following Application Layers:

* [Yves](/docs/dg/dev/backend-development/yves/yves.html)—provides frontend functionality with the light-weight data access.
* [Zed](/docs/dg/dev/backend-development/zed/zed.html)—provides back office/backend functionality with complicated calculations.
* [Glue](/docs/dg/dev/glue-api/{{site.version}}/old-glue-infrastructure/glue-infrastructure.html)—provides infrastructure for API with the mixed data access.
* [Client](/docs/dg/dev/backend-development/client/client.html)—provides data access infrastructure.
* Shared—provides shared code abstractions to be used in other Application Layers of the same module.
* Service—provides infrastructure for the stateless operations, usually utils.

Application Layers structure supports you in a better conceptual decoupling and not always represent a bootstrapped Application.

{% info_block infoBox %}

See [Programming Concepts](/docs/dg/dev/architecture/programming-concepts.html) to learn about the Spryker building blocks contained in each of the Application Layers.

{% endinfo_block %}

## Application separation

Spryker architecture is designed with two main application layers that are separated from each other: frontend and backend. This architecture allows to connect any Storefront application with the Back Office application easily.

Along with the default frontend app that is provided out of the box, you can have any other frontend app you need for your business: a native app, Alexa Skill, an e-commerce bot, a dash button, or an IoT device.

The application separation brings three main benefits:

1. *Performance*. A frontend applications in Spryker uses a data storage separated from the backend one. It uses a blazing fast key-value storage while the backend uses a relational database. With this separation, it is way faster than using the traditional way of sharing one relational database for both applications.
2. *Scalability*. As frontends in Spryker have their own applications, storages, and deployments, scalability becomes easily achievable and given by the architecture. Spryker can be easily scaled out horizontally by simply just adding more instances with more storages without affecting the backend application and logic.
3. *Security*. Having two applications, accessing the backend relational database becomes a harder challenge for cyber attacks. The backend application also is usually hidden behind a firewall making the Commerce OS even more secured for different e-commerce applications.

## Data separation

Following the separation between frontend and backend, one of the main concepts in Spryker is the separation of data between the frontend and backend. As in any e-commerce shop system, there are always tons of data to persist and usually with relations between different data entities, for example, orders with products and customers. For managing such data relations, a relational database is needed. The backend manages your shop's data and its relations; thus it comes with a relational database.

### Storage

Frontend applications require de-normalized data in order to quickly be able to present them to the end users. By concept, the necessary data is pre-aggregated, de-normalized, and stored in key-value storage which can be quickly accessed by any Storefront application.

Key-value storages work like a hash-tables where retrieval time is faster compared to the complicated joins and queries in a relational database. For example, to render a product detail page, the system needs several pieces of information like the product title, description, attributes, images, and prices. Instead of the execution of time-consuming queries in the SQL database, all the data is placed in a few entries in the storage and can be loaded by a single lookup.

Redis is the default data storage in Spryker, but it can be easily replaced by other technologies, like MongoDB, Cassandra, or even a separate relational DB like PostgreSQL.

### Search

Search is an essential part of e-commerce shops. Spryker provides the most common in-shop search functionalities by utilizing and connecting to search engine technologies.

Search in Spryker follows the same data separation principle. All the relational data is stored in the relational database in the backend application and published to the Search database when additions, updates, or deletions occur on different data objects. Spryker OS ensures that data is always synced between its backend and frontend.

Spryker uses Elasticsearch by default, but you also can replace it with other search engine technologies.

## Synchronization

With data separation comes the question: how to sync data between both applications and make sure that the Search and Storage are always up-to-date? Spryker Commerce OS comes with a very performant solution that solves this challenge internally and out of the box. It is called Publish & Sync.

The idea behind this concept is that the necessary data (stored in the relational database) is being watched for changes (create, update, delete). When a change occurs, the relevant data gets published to the relevant place (Search and/or Storage). It is an eventually consistent method of providing data for the frontend.

For more details on how Publish & Sync works, see [Publish and Synchronization](/docs/dg/dev/backend-development/data-manipulation/data-publishing/publish-and-synchronization.html).

## Where to go from here?

* To know more about the application layers and how various functionality is encapsulated in modules, see [Modules and layers](/docs/dg/dev/architecture/modules-and-application-layers.html).
* To know more about the building blocks of Spryker, see [Programming Concepts](/docs/dg/dev/architecture/programming-concepts.html).
