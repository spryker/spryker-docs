---
title: Architectural intro
description: Introduction to Spryker architecture for third-party integrations.
last_updated: July 9, 2025
template: default

---

Spryker is an e-commerce Commerce OS developed in PHP, that promotes SOLID principles and clean code. Its purpose is to facilitate rapid development in building a customized solution for an e-commerce business.

Spryker uses a set of well-known tools:

- *Key-value store (Redis or Valkey)*. Spryker supports both Redis and Valkey as key-value storage solutions. Redis is a popular key-value database (Remote Dictionary Server), while Valkey is a high-performance, fully compatible alternative. In Spryker, key-value storage is used as a client-side data source for localized content. The key-value database avoids the necessity of making queries to the SQL database, which can come with a high cost. The data stored in the key-value storage is kept in sync with the data stored in the SQL database through specialized cronjobs. Both Redis and Valkey support replication, providing scalable solutions.
- *Elasticsearch*. Elasticsearch is a distributed search engine that offers an easy-to-configure and easy-to-integrate solution for making searches fast. The relevant search data is stored in dedicated storage, so is similar to using key-value store (Redis or Valkey); it avoids making a costly query to the SQL database. The data stored in Elasticsearch is updated through cronjobs.
- *Symfony*. Symfony is the leading PHP framework for creating MVC web applications. Spryker implements the model-view-controller design pattern with Symfony. MVC design pattern aims to separate the business logic from the view, making the source code easier to understand and maintain because of this separation.
- *Twig*. It is a fast and modern PHP templating engine.
- *Propel2*. It is an ORM library for PHP, offering an object-relational mapping toolkit. It's part of the Symfony framework. Propel's principal function is to provide the mapping between database tables and PHP classes. Propel includes a source code generator for creating PHP classes based on the data model definition given through an XML file. The data model definition is independent of the database used, so Spryker provides a single interface that enables access to different database management systems.
- *Jenkins*. Cronjobs can be easily configured in the jobs configuration file.
- *Database: MySQL, MariaDB*. Spryker supports MySQL, MariaDB. You can configure it in the main configuration file.

## Application separation

Spryker architecture is designed with two main application layers that are separated from each other: frontend and backend. This architecture allows to connect any Storefront application with the Back Office application easily.

Along with the default frontend app that is provided out of the box, you can have any other frontend app you need for your business: a native app, Alexa Skill, an e-commerce bot, a dash button, or an IoT device.

The application separation brings three main benefits:

1. *Performance*. A frontend applications in Spryker uses a data storage separated from the backend one. It uses a blazing fast key-value storage while the backend uses a relational database. With this separation, it's way faster than using the traditional way of sharing one relational database for both applications.
2. *Scalability*. As frontends in Spryker have their own applications, storages, and deployments, scalability becomes easily achievable and given by the architecture. Spryker can be easily scaled out horizontally by simply just adding more instances with more storages without affecting the backend application and logic.
3. *Security*. Having two applications, accessing the backend relational database becomes a harder challenge for cyber attacks. The backend application also is usually hidden behind a firewall making the Commerce OS even more secured for different e-commerce applications.


For comprehensive information about Spryker architecture, see [Architecture](/docs/dg/dev/architecture/architecture.html).
