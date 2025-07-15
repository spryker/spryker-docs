---
title: Technology stack
description: This document provides a general overview of the technologies used while developing Spryker Commerce OS.
last_updated: Jun 16, 2021
template: concept-topic-template
originalLink: https://documentation.spryker.com/2021080/docs/technology-stack
originalArticleId: 336a8382-fffd-426f-b752-df2ad2a3820a
redirect_from:
  - /docs/scos/dev/architecture/technology-stack.html
related:
  - title: Key-value storage - Redis and Valkey
    link: docs/dg/dev/architecture/key-value-storage-redis-valkey.html
  - title: Conceptual overview
    link: docs/dg/dev/architecture/conceptual-overview.html
  - title: Programming concepts
    link: docs/dg/dev/architecture/programming-concepts.html
  - title: Modules and layers
    link: docs/dg/dev/architecture/modules-and-application-layers.html
  - title: Code buckets
    link: docs/dg/dev/architecture/code-buckets.html
---

Spryker is an e-commerce Commerce OS developed in PHP, that promotes SOLID principles and clean code. Its purpose is to facilitate rapid development in building a customized solution for an e-commerce business.

Spryker uses a set of well-known tools:

- *Key-value store (Redis or Valkey)*. Spryker supports both Redis and Valkey as key-value storage solutions. Redis is a popular key-value database (Remote Dictionary Server), while Valkey is a high-performance, fully compatible alternative. In Spryker, key-value storage is used as a client-side data source for localized content. The key-value database avoids the necessity of making queries to the SQL database, which can come with a high cost. The data stored in the key-value storage is kept in sync with the data stored in the SQL database through specialized cronjobs. Both Redis and Valkey support replication, providing scalable solutions.
- *Elasticsearch*. Elasticsearch is a distributed search engine that offers an easy-to-configure and easy-to-integrate solution for making searches fast. The relevant search data is stored in dedicated storage, so is similar to using key-value store (Redis or Valkey); it avoids making a costly query to the SQL database. The data stored in Elasticsearch is updated through cronjobs.
- *Symfony*. Symfony is the leading PHP framework for creating MVC web applications. Spryker implements the model-view-controller design pattern with Symfony. MVC design pattern aims to separate the business logic from the view, making the source code easier to understand and maintain because of this separation.
- *Twig*. It is a fast and modern PHP templating engine.
- *Propel2*. It is an ORM library for PHP, offering an object-relational mapping toolkit. It's part of the Symfony framework. Propel's principal function is to provide the mapping between database tables and PHP classes. Propel includes a source code generator for creating PHP classes based on the data model definition given through an XML file. The data model definition is independent of the database used, so Spryker provides a single interface that enables access to different database management systems.
- *Jenkins*. Cronjobs can be easily configured in the jobs configuration file.
- *Database: MySQL, MariaDB, or PostgreSQL*. Spryker supports MySQL, MariaDB, or PostgreSQL. You can configure it in the main configuration file.
