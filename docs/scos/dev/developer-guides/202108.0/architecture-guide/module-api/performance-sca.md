---
title: Performance and Scalability
originalLink: https://documentation.spryker.com/2021080/docs/performance-scalability
redirect_from:
  - /2021080/docs/performance-scalability
  - /2021080/docs/en/performance-scalability
---

Spryker Commerce OS was built to enable the development of high-performance e-commerce applications that are able to support an extremely high number of unique visitors. However, no application can be both light and heavy at the same time.

Therefore, we have two applications: Yves and Zed. Both communicate with each other using remote procedure calls. Both use dedicated data stores, and therefore no cache is needed. Complex business logic operations are handled by the back-end application.

{% info_block infoBox "Fast execution time " %}
Depending on the server's performance, the execution time for the front-end application is around 50ms, which is fast enough to run any commerce application using a small infrastructure, even with a high amount of daily visitors.
{% endinfo_block %}

Scalability, as an integral part of the core architecture, is achieved by separating the front-end (Yves) and back-end (Zed) applications. A shared-nothing architecture ensures that every node of Yves has its own instance of the client-side data stores. New nodes can be easily added or removed ad hoc.

## Yves and Zed

{% info_block infoBox "Separation of Responsibilities " %}
The back end is only required for more complex business logic such as cart calculations and payments.
{% endinfo_block %}


### Yves
Yves is the slimline front-end application that gets its data from fast **Key-Value storage** like Redis, and a **Search storage** like Elasticsearch.

Yves is built on top of Symfony components and uses Twig as its templating engine. It has no connection to the database in Zed.

Some of the key features:

* Based on Symfony components
* Redis for storage
* Elasticsearch for full-text search and facet navigation
* Multi-language support
* Shared session storage
* SEO friendly

### Zed
Zed is more of a heavy-duty back-end application. Like Yves, it's built on top of Symfony components and uses Twig. The main purpose of Zed is to take care of business logic, persistent data, and to connect to external systems.

Some of the key features:

* Based on Symfony components
* MySQL, MariaDB, and PostgreSQL support
* UI framework
* Database schema management and migrations
* Advanced cron-job scheduling with Jenkins
* CLI tools
* OMS Code Management Tools
* Application Integrity Checks

## Data Synchronization

{% info_block infoBox "No full page cache problems " %}
Our front-end works without a full page cache. This allows continuous updates and avoids the problems of outdated product information – so tracking, stock information, and all the other details are always up to date.
{% endinfo_block %}

In order for Yves to display any data, the data has to be first aggregated and exported.

The synchronization happens in 3 steps:

* Touch
* Collect
* Export

Refer to Collector and Touch documentation for details.

