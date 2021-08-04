---
title: Technology Stack
originalLink: https://documentation.spryker.com/v5/docs/technology-stack
redirect_from:
  - /v5/docs/technology-stack
  - /v5/docs/en/technology-stack
---

Spryker is an e-commerce Commerce OS developed in PHP, that promotes SOLID principles and clean code. It’s purpose is to facilitate rapid development in building a customized solution for an e-commerce business.

## Technologies Used

Spryker uses a set of well known tools:

* **Redis** 
  Redis is the most popular key-value database; the name is an abbreviation for Remote Dictionary Server. In Spryker it’s used as a client side data source for localized content. The Redis key-value database avoids the necessity of making queries to the SQL database that would come with a high cost. The data stored in Redis is kept in sync with the data stored in the SQL database through specialized cronjobs. Redis supports replication, so it’s a solution that enables scalability.
* **Elasticsearch**
  Elasticsearch is a distributed search engine that offers an easy to configure and integrate solution for making searches fast. The relevant search data is stored in a dedicated storage, so is similar to using Redis storage; it avoids making a costly query to the SQL database. The data stored in Elasticsearch is updated through cronjobs.
* **Symfony**
  Symfony is the leading PHP framework for creating MVC web applications. Spryker implements the model-view-controller design pattern with Symfony. MVC design pattern aims to separate the business logic from the view, making the source code easier to understand and maintain due to this separation.
* **Silex (deprecated)**
  Silex is a PHP micro-framework based on Symfony components; offers Twig - a fast and modern PHP templating engine.
  Please use Spryker Application and Application Plugins instead of Silex Application and Service Providers.
*  **Twig**
Twig - a fast and modern PHP templating engine.
* **Propel**
  Propel is an ORM library for PHP, offering an object-relational mapping toolkit. It’s part of the Symfony framework. Propel’s principal function is to provide mapping between database tables and PHP classes. Propel includes a source code generator for creating php classes based on the data model definition given through an XML file. The data model definition is independent of the database used, so Spryker provides a single interface that enables the access to different database management systems.
* **Jenkins** 
  Cronjobs can be easily configured in the jobs configuration file.
* **Database: MySQL or PostgreSQL**
  Spryker offers support for using either MySQL or PostgreSQL. This can be easily configured in the main configuration file.
