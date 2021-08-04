---
title: Conceptual Overview
originalLink: https://documentation.spryker.com/v5/docs/concept-overview
redirect_from:
  - /v5/docs/concept-overview
  - /v5/docs/en/concept-overview
---

Spryker is a Commerce Operating System, mainly composed of several applications, such as Storefront (Yves), Backoffice (Zed) and Storefront API (Glue).

* *Storefront* - Front-end-presentation layer for customers, provided by Yves Application Layer based on [Symfony Components](https://symfony.com/components).
* *Backoffice* - an application that contains all business logic and the backend GUI, provided by Zed Application Layer, and also uses the Symfony Components.
* *Storefront API*- an application providing resources for customers' interaction, provided by Glue Application Layer, based on [JSON API convention](https://jsonapi.org/).

The following diagram shows the conceptual parts of the application and their connections:
![Spryker overview](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Architecture+Concepts/Conceptual+Overview/spryker-overview.png){height="" width=""}

The Spryker OS provides the following Application Layers:

* [Yves](https://documentation.spryker.com/docs/en/about-yves) - provides frontend functionality with the light-weight data access.
* [Zed](https://documentation.spryker.com/docs/en/about-zed) - provides backoffice/backend functionality with heavy calculations.
* [Glue](https://documentation.spryker.com/docs/en/glue-infrastructure) - provides infrastructure for API with the mixed data access.
* [Client](https://documentation.spryker.com/docs/en/client) - provides data access infrastructure.
* Shared - provides shared code abstractions to be used in other Application Layers of the same module.
* Service - provides infrastructure for the stateless operations, usually utils.

Application Layers structure supports you in a better conceptual decoupling and not always represent a bootstraped Application.

{% info_block infoBox %}

See [Programming Concepts](https://documentation.spryker.com/docs/en/programming-concepts) to learn about the Spryker building blocks contained in each of the Application Layers.

{% endinfo_block %}

## Application Separation

Spryker architecture is designed with two main application layers that are separated from each other: front-end and back-end. This architecture allows to connect any Storefront application with the Backoffice application easily.

Along with the default front-end app that is provided out of the box, you can have any other front-end app you need for your business: a native app, Alexa Skill, an e-commerce bot, a dash button, or an IoT device.

The application separation brings 3 main benefits:

1. **Performance**: a front-end applications in Spryker uses a data storage separated from the back-end one. It uses a blazing fast key-value storage while the back-end uses a relational database. With this separation, it is way faster than using the traditional way of sharing one relational database for both applications.
2. **Scalability**: as front-ends in Spryker have their own applications, storages, and deployments, scalability becomes easily achievable and given by the architecture. Spryker can be easily scaled out horizontally by simply just adding more instances with more storages without affecting the back-end application and logic.
3. **Security**: having two applications, accessing the back-end relational database becomes a harder challenge for cyber attacks. The back-end application also is usually hidden behind a firewall making the Commerce OS even more secured for different e-commerce applications.

## Data Separation

Following the separation between front-end and back-end, one of the main concepts in Spryker is the separation of data between the front-end and back-end. As in any e-commerce shop system, there are always tons of data to persist and usually with relations between different data entities, e.g., orders with products and customers. For managing such data relations, a relational database is needed. The back-end manages your shop’s data and its relations; thus it comes with a relational database.

### Storage

The front-end application(s) require denormalized data in order to quickly be able to present them for the end users. By concept, the necessary data is pre-aggregated, denormalized, and stored in key-value storage which can be quickly accessed by any Storefront application.

Key-value storages works like a hash-tables where retrieval time is faster compared to the complicated joins and queries in a relational database. For example, to render a product detail page, the system needs several pieces of information like the product title, description, attributes, images, and prices. Instead of execution time-consuming queries in the SQL database, all the data is placed in a few entries in the storage and can be loaded by a single lookup. 

Redis is the default data storage in Spryker, but it can be easily replaced by other technologies, like MongoDB, Cassandra, or even a separate relational DB like PostgreSql.

### Search

Search is an essential part of e-commerce shops. Spryker provides the most common in-shop search functionalities by utilizing and connecting to search engine technologies.

Search in Spryker follows the same data separation principle. All the relational data is stored in the relational database in the back-end application and published to the Search database when additions, updates, or deletions occur on different data objects. Spryker OS ensures that data is always synced between its back-end and front-end.

Spryker uses Elasticsearch by default, but it's also possible replace it with other search engine technologies.

## Synchronization

With data separation comes the question: how to sync data between both applications and make sure that the Search and Storage are always up-to-date? Spryker Commerce OS comes with a very performant solution that solves this challenge internally and out-of-the-box. It is called Publish & Sync. 

The idea behind this concept is that the necessary data (stored in the relational database) is being watched for changes (create, update, delete). When a change occurs, the relevant data gets published to the relevant place (Search and/or Storage). It is an eventually consistent method of providing data for the front-end.

For more details on how Publish & Sync works, see [Publish and Synchronization ](https://documentation.spryker.com/docs/en/publish-and-synchronization).

## Where to go from here?

* If you would like to know more about the application layers and how various functionality is encapsulated in modules, see [Modularity and Shop Suite](https://documentation.spryker.com/docs/en/modularity-and-shop-suite).
* If you want to know more about the building blocks of Spryker, see [Programming Concepts](https://documentation.spryker.com/docs/en/programming-concepts).

