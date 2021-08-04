---
title: Commerce OS and Frontend Apps
originalLink: https://documentation.spryker.com/v3/docs/commerce-os-and-frontend-apps
redirect_from:
  - /v3/docs/commerce-os-and-frontend-apps
  - /v3/docs/en/commerce-os-and-frontend-apps
---

User front-ends are not anymore the same as we used to have 10 years ago. We used to have our desktop displays as the main front-end for different applications, so applications were designed for that desktop display only. In the last few years, many new different front-ends have been evolving rapidly from native apps on smartphones, tablets, and smartwatches to online bots and voice assistants. All of these mediums are recently being used in different e-commerce applications. Spryker’s unique architecture enables all of these front-ends no matter what the technology behind them is.

## Why Having Two Applications

To allow connecting any front-end application, or several ones at the same time, into the Spryker Commerce OS, Spryker architecture is designed with two main application layers: front-end and back-end.

Spryker is shipped with a default front-end application working as a web app called Shop App. Along with this app, you can have any other front-end app you need for your business: a native app, Alexa Skill, an e-commerce bot, a dash button, or an IoT device.

Not just that, having front-end and back-end applications brings 3 main other benefits:

1. **Performance**: a front-end application in Spryker uses a data storage separated from the back-end one. It uses a blazing fast key-value storage while the back-end uses a relational database. With this separation, it is way faster than using the traditional way of sharing one relational database for both applications.
2. **Scalability**: as front-ends in Spryker have their own applications, storages, and deployments, scalability becomes easily achievable and given by the architecture. Spryker can be easily scaled out horizontally by simply just adding more instances with more storages without affecting the back-end application and logic.
3. **Security**: having two applications, accessing the back-end relational database becomes a harder challenge for cyber attacks. The back-end application also is usually hidden behind a firewall making the Commerce OS even more secured for different e-commerce applications.

## Data Separation: Database & Storage

Following the separation between front-end and back-end, one of the main concepts in Spryker is the separation of data between the front-end and the Commerce OS. As in any e-commerce shop system, there are always tons of data to persist and usually with relations between different data entities, e.g. orders with products and customers. For managing such data relations, a relational database is needed. The Spryker Commerce OS manages your shop’s data and its relations, thus it comes with a relational database. It uses PostgreSQL as the default database, and also supports MySQL if you prefer using it.

On the other hand, the front-end application only reads static data in order to present to the end customers. The front-end application in Spryker gets all the data pre-aggregated and denormalized so that there is no need for any logic to manage data on the front-end side of the shop. For that, it uses a much faster data storage; a key-value storage. A key-value storage works like a hash-table where retrieval time is so fast compared to the complicated joins and queries in a relational database. For example, to render a product detail page the system needs several pieces of information like the product title, description, attributes, images, and prices. Istead of executing time-consuming queries in the SQL database, all the data is placed in a few entries in the storage and can be loaded by a single lookup.

Spryker uses Redis as the default data storage. It is called, simply: Storage. The reason behind the abstract name is that Spryker allows using any other data storage e.g. MongoDB, Cassandra, or again Postgres for the front-end side. Whatever your preference is, Spryker calls it Storage.

## Search

Search is an essential part of e-commerce shops. You cannot have a successful shop without having a good search solution. Spryker provides all in-shop search functionalities by utilizing and connecting to search engine technologies.

Spryker uses Elasticsearch by default. Search in Spryker is also simply called Search as you can connect or integrate any other search engine. Search in Spryker follows the same data separation principle. All the relational data is stored in the relational database in the back-end application and published to Elasticsearch when additions, updates, or deletions occur on different data objects. Spryker OS ensures that data is always synced between its back-end and front-end.

## Why Separating Storage & Search

Now the question comes, how the data is split between Storage and Search? All searchable data related to catalogs, categories, products, CMS pages, and blocks are exported as JSON documents and stored in the search engine (Elasticsearch by default). On the other hand, all static presentational data such as products, navigations, CMS pages and blocks, and translations are stored in the front-end’s Storage (Redis by default).

The reason behind this architecture is that Spryker focuses on the separation of concerns in the used technologies taking into consideration how every technology is meant to be used. After testing, we concluded that using Redis for static representational data boosts the shop performance as retrieving data using the Redis protocol is faster than calling Elasticsearch APIs to retrieve the same data. Thus, Storage and Search are separated.

However, there are some projects where Elasticsearch is used not only as a search engine but also as a storage for data. It depends on the projects’ different preferences on what technologies to use and scale. Following this approach, it is also correct and can work perfectly with the Spryker architecture.

## Synchronization

With data separation comes the question: how to sync data between both applications and make sure that the Storage is always up-to-date? Spryker Commerce OS comes with a very fast solution that solves this challenge internally and out-of-the-box. It is called Publish & Sync. Publish & Sync watches the data models and objects in the database and then triggers an update once the data object is modified, added to, or deleted from the database. This triggers an update to the Storage and Search directly and almost instantly, and ensures data is synced between the database, the Storage and Search all the time.

For more details on how Publish & Sync works, see [Publish and Synchronization ](/docs/scos/dev/developer-guides/202001.0/development-guide/back-end/data-manipulation/data-publishing/publish-and-syn).

## Connecting Front-end with Commerce OS: the Client

End customers interact only with the front-end application. The front-end application needs to get data from the Storage, send search requests to the search engine, and send the customer requests to the Commerce OS whenever needed, like adding to the cart, as all the business logic is performed in the Commerce OS.

The Client’s job is to connect the front-end application to all of the surrounding resources needed for the front-end application to work. This includes the Commerce OS, Storage, and Search. It also includes some other resources like Session and Queues.

For each of these resources, there is a Client. So, it is not only one Client, but many of them. Each one of them is responsible for a specific resource or functionality. Spryker, by default, is shipped with the following clients:

* SearchClient: to connect to Elasticsearch using its API.
* StorageClient: to connect to Redis using the Redis protocol; RESP.
* Commerce OS Clients: every functional unit, module as its called in Spryker, has its own client. For example, there are separated clients for cart (CartClient), checkout (CheckoutClient), and customer (CustomerClient). The same applies to all the other modules in Spryker.

Commerce OS clients communicate with the Commerce OS using HTTP. They mainly perform [RPCs](https://en.wikipedia.org/wiki/Remote_procedure_call) (remote procedure calls) using HTTP POST requests with a serialized JSON payload. They also do all the necessary authorization and authentication between the two applications.

## The Public API

Spryker Commerce OS owns its own public API. It connects the front-end application with all the surrounding resources. The main concept behind the public API is to package the Client with a RESTful API, so it can act as the public API for Spryker. As it uses the Client internally, the API allows you to RESTfully access all the resources you need either in the Commerce OS, Storage, or Search.

## Session

In your e-commerce shop, you, most probably, will need a session to store different kinds of data. Spryker comes with a session implementation that uses Redis by default. The Session uses another instance of Redis though, so the Storage data is separated from the Session. The Session also has its own Client that allows the front-end application to access the Session using the Redis protocol.

## Task Scheduling

Several operations in the Spryker Commerce OS need schedules, e.g. syncing data between the Commerce OS and the front-end applications, triggering timeout events for the order management system, or any command you add to your shop. To avoid having dependencies to cron jobs and their server deployments, Spryker uses Jenkins for task scheduling.

## Where to go from here?

* If you would like to know more about the application layers and how various functionality is encapsulated in modules, see [Modularity and Shop Suite](/docs/scos/dev/developer-guides/202001.0/architecture-guide/modularity-and-).
* If you want to know more about the building blocks of Spryker, see [Programming Concepts](/docs/scos/dev/developer-guides/202001.0/architecture-guide/programming-con).
