---
title: Architecture performance guidelines
description: Learn about the bad and best architecture practices which can affect the performance of applications in the very end servers
last_updated: Nov 26, 2021
template: concept-topic-template
redirect_from:
  - /docs/scos/dev/guidelines/performance-guidelines/architecture-performance-guidelines.html
related:
  - title: General performance guidelines
    link: docs/scos/dev/guidelines/performance-guidelines/general-performance-guidelines.html
  - title: Frontend performance guidelines
    link: docs/scos/dev/guidelines/performance-guidelines/front-end-performance-guidelines.html
---

Performance shows the response of a system to carrying out certain actions for a certain period. Performance is an important quality attribute in each application architecture that can impact user experience behavior and business revenues. Therefore, we highly recommend following the best practices and avoiding performance drawbacks in the architecture design.

This article explains the bad and best architecture practices that can affect applications' performance in the very end servers.

## General performance challenges in architecture design

Below, you will find the most common architecture design mistakes and impediments that one makes to fulfill the business requirements, but that can also entail performance issues.

### Duplications of slow operations

Sometimes, because of business requirements, it’s mandatory to have a slow operation during one transaction. This slow part of functionality might be very small and hidden behind an API, but the usage of this API can go out of control.

Let's consider an example illustrating the impact of a bad architecture design with slow operations. Imagine you have a method called `caluculateDiscount()` that generates some discounts for cart items. However, each call of this method takes 100ms, which might be a proper response time for an API. Now think of another business requirement when you need to calculate the discount for 10 separated groups of items in the cart. In this case, you need to call the `caluculateDiscount()` method 10 times, leading to 1000ms (1 second), which already poses a performance problem.

### Duplications of database queries

During the project implementation, sometimes developers might execute similar queries that return the same result or subset of data from it in one transaction. Therefore, architects should ensure that the database interactions are set to the lowest possible number. They can achieve this by:

* Merging several queries into one query with a bigger result (unfiltered).
* Aggregating the duplicate query to one query and sharing the result with the stack of the code execution (memory).

{% info_block warningBox %}

Make sure you carefully check for memory leaks during the query optimizations, as the results will be bigger or shared in one transaction.

{% endinfo_block %}

### Optimistic vs. pessimistic locking

Sometimes, developers use explicit locks to prevent race conditions or other issues that impact performance because of the high traffic load. This happens because all requests need to wait for the lock, which turns the parallel request processing into sequential processing and can increase the response time of all the queued requests.

Some of the pessimistic locking use cases are:

- Concurrent session problems (Redis, File)
- Generating unique numbers (database)

To avoid performance issues, architects can recommend using optimistic locking with several different implementations according to the faced problems.

### Synchronous communications and 3rd party calls

Another architectural mistake is relying on a 3rd party response time to achieve promised performance for an application. Having a direct external call to a 3rd party organization during a transaction can make the performance unpredictable and impact the user experience.

We recommend architects fulfill the requirements by providing a different solution like asynchronous communication<!-- or pre/after indirect hooks that are not visible for the end users-->.

### Native array vs. DTO

During large-scale data processing operations, there can occur performance drawbacks when it comes to object creations, hydrations, and mappings in the process. Therefore, we highly recommend architects use native language data structure instead of objects if possible, as this can reduce more than 30%-50% of CPU loads in the long run.

## Performance optimization in the Spryker architecture

Below, you will find an analysis of the Spryker architecture and solutions for the most common performance challenges we had in several projects.

### Database queries in plugins

Spryker widely uses plugins to reduce module dependencies and to increase flexibility to make features work together smoothly. However, this can lead to some performance issues if there are database queries in each plugin. That's why it is essential to aggregate all queries to decrease the number of database operations.

Let's consider an example. Suppose there are 10 plugins for the cart feature to calculate items price, discount, tax, etc. Each plugin has a query to find a product by SKU per order item, which means the code will execute 10 same queries per each item in the cart.

So if there are 70 cart items, there will be 70 x 10 (plugins) = 700 same queries:

```sql
SELECT * FROM SPY_PRODUCT_ABSTRACT WHERE SKU = ?
->
Plugin 1. QUERY
Plugin 2. QUERY
Plugin 3. QUERY
Plugin 4. QUERY
Plugin n ....
```

You can solve this issue by:

- Using IN condition instead of = in query:

```sql
SELECT * FROM SPY_PRODUCT_ABSTRACT WHERE SKU IN (?,?,?,....)
```

- Running only 1 query and providing the result to other plugins:

```sql
Plugin 1. QUERY
Plugin 2. RESULT
Plugin 3. RESULT
Plugin 4. RESULT
Plugin n ...
```

### ORM vs PDO

Spryker uses Propel ORM as a database abstraction layer which allows to stay DBMS-agnostic and use its powerful tools for persisting and accessing data in a clean and readable way. But this causes some performance costs that can be especially noticeable when working with heavy data transfer operations like Data Import and Publish and Synchronization for big data volumes.

Performance is one of the key attributes when it comes to synchronous combinations. Therefore, as a rule of thumb, any database operations must be high performant and be executed fast. If ORM cannot guarantee the high-speed database operation because of the lack of features or complexity, one should avoid using it.

For example, to display products in the Spryker shop, we need to import and propagate data into several databases. For some projects, this is a cumbersome operation because of the large volume of data. Therefore, Spryker recommends not to use ORM for these operations, but choose other solutions instead, for example, CTE, PDO, etc.

For data import of large files, it's also important to use bulk processing. Therefore, consider importing data into the database with chunks of 1000+ elements. The same applies to triggering events. Using bulk processing saves a lot of time for communication with the database and queues.

For more information about improving data import performance, see [Data importer speed optimization](/docs/dg/dev/data-import/{{site.version}}/data-import-optimization-guidelines.html).

Features affected by the ORM approach:

- [Data import](/docs/dg/dev/data-import/{{site.version}}/data-import.html)
- [Publish and Synchronization](/docs/dg/dev/backend-development/data-manipulation/data-publishing/publish-and-synchronization.html)

### Database query optimization

Database queries are the slowest parts of each application. They have different dependencies such as database engines, hardware, configurations, etc. Spryker prevents any database execution for popular endpoints like Home, PDP, Search. However, this preventive measure is not avoidable for some endpoints, for example, Cart or Checkout. There are several ways to make sure such endpoints are handling the database queries most effectively in terms of performance:

- Cache result for the duplicate queries.
- Aggregate several queries to only one query if possible.
- Change single inserts to bulk inserts.
- Break down heavy or slow queries into smaller queries and use PHP native functionalities for result calculations (like sorting, group by, filtering, validations, etc.).

### Pagination

Ensure that data fetched from the database is paginated. Failing to do so with large datasets may lead to out-of-memory errors.

### Wildcards in Redis

Avoid using wildcards (*) in Redis, as they can significantly impact performance.

### RPC calls

We recommend to minimize the number of RPC calls, ideally having only one per page. A high volume of RPC calls can lead to severe performance issues.

### Disabling Propel instance pooling

Propel instance pooling is a  Propel feature that determines whether object instance pooling is enabled or disabled. Object instance pooling involves the reuse of previously created instances. Enabling instance pooling may introduce a potential issue related to PHP memory leaks, especially when executing console commands that involve querying a substantial number of entities.

If you encounter memory leak issues while running console commands, consider temporarily disabling instance pooling:

1. Before executing a memory-intensive script, disable instance pooling:
```php
\Propel\Runtime\Propel::disableInstancePooling();
```
2. After the memory-intensive script has been executed, reenable instance pooling:
```php
\Propel\Runtime\Propel::enableInstancePooling();
```

## Feature configurations

Spryker has different features and several configurable modules that need to be adjusted correctly to have the best performance and smooth execution in the applications.

### Publish and Synchronization

This feature is one of the most important infrastructure parts in Spryker. Therefore, the configurations must be set correctly for it.

#### Multiple publisher queues

Publishers use queues to propagate events and let workers consume them to provide necessary data for our frontend services. Since Spryker uses RabbitMQ as a default option, we recommend using multiple queues instead of one to spread loads between different queues. For more information about multiple publisher queues, see [Integrating multi-queue publish structure](/docs/dg/dev/integrate-and-configure/integrate-multi-queue-publish-structure.html).

#### Workers

The default Spryker configuration comes with one worker per publisher queue. Nevertheless, you can increase this configuration to the maximum number of CPUs for a specific queue if other queues do not receive any loads. For example:

```
Publisher.ProductAbstract 10000 msg/minute (2 workers)
Publisher.ProductConcrete 10000 msg/minute (2 workers)
Publisher.Translation 10 msg/minute (1 worker)
Publisher.Cms 5 msg/minute (1 worker)
....
-------------------------------------------------------
CPU: 4
```

#### Chunk size

Publishers use different chunks to consume messages from queues. Even though the optimal size of chunk heavily depends on each entity and the hardware, as a best practice, we recommend choosing one of these numbers:

- 500 (Default)
- 1000
- 1500
- 2000 (Max)

{% info_block warningBox %}

Carefully check for memory leaks when increasing chunks, as the messages will be bigger.

{% endinfo_block %}

#### Benchmark and profiling the queues

Spryker also recommends enabling the benchmark tests for each publisher queue and measuring processing time for the minimum chunk for each queue before deploying to production.

Example of benchmark for each queue:

```
time vendor/bin/console queue:task:start publisher.product_abstract // Ouput 30.00s
....
```

### Cart and Checkout plugins

As the Spryker boilerplate comes with most of the features enabled, make sure you clean up the unnecessary plugins from the Cart and Checkout plugin stack:

- [Cart plugins](https://github.com/spryker-shop/suite/blob/master/src/Pyz/Zed/Cart/CartDependencyProvider.php)

- [Checkout plugins](https://github.com/spryker-shop/suite/blob/master/src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php)

### Zed calls

Zed calls are necessary when it comes to executing a database-related operation like Cart and Checkout requests. As an RPC mechanism handles these calls, it is necessary to reduce the number of calls to maximum one call to Zed. You can achieve this by:

- Exporting necessary data, only product-related ones, from Zed to Redis at the pre-calculation phase with the help of Publish and Synchronization.
- Merging duplicate Zed requests to only one customer request (AddToCart + Validations + …).

{% info_block infoBox "Info" %}

Avoid making ZED calls within QueryExpanderPlugin (from Storage or Search).

{% endinfo_block %}

### OMS optimization

OMS processes are the template of the order fulfillment in Spryker. The first state of OMS processes, called the NEW state, plays an important role in the checkout process. Therefore, it is necessary to make sure you don't use unnecessary features when you don't need them, for example, Reservation or Timeout transitions.

One can avoid using the unnecessary transitions by:

- Removing the *Reservation* flag from the NEW and other steps in the OMS.
- Removing the *Timeout* transition from the NEW step in the OMS.

### Performance checklist

Make sure to check the following articles on how to optimize the performance of your application:

- [Performance guidelines](/docs/dg/dev/guidelines/performance-guidelines/performance-guidelines.html)
- [Data importer speed optimization](/docs/dg/dev/data-import/{{site.version}}/data-import-optimization-guidelines.html)
- [Integrating multi-queue publish structure](/docs/dg/dev/integrate-and-configure/integrate-multi-queue-publish-structure.html)
- [Performance testing in staging environments](/docs/ca/dev/performance-testing-in-staging-enivronments.html)

## Application performance and load tests

For the best performance, before going live, we highly recommend performing all the necessary tests, as well as run CI and Monitoring tools.

### Benchmark test

Each project must have its benchmark tests for the API and Frontend shops before going live. Having these tests in place ensures that the project follows the best performance state for each request. You can use any tools for this type of test, for example:

- Apache Benchmark
- Apache jMeter

### Load test

Every shop should always be ready for high traffic and serve as many users as possible, and at the same time, it's crucial to maintain the best performance. Therefore, we also recommend planning some stress tests with real data before going live. To achieve this, you can use the [load testing tool](https://github.com/spryker-sdk/load-testing) based on Gatling that Spryker provides for all projects.

### Monitoring and profiling

We strongly recommend our customers enable APM systems for their projects. Spryker supports [Newrelic](/docs/dg/dev/integrate-and-configure/configure-services.html#new-relic) as the default monitoring system.

### Performance CI

Performance CI plays a very important role for each project pipeline as it prevents new issues in the long term when it comes to feature development. To analyze your project's performance, you can use the [Benchmark](/docs/scos/dev/sdk/development-tools/performance-audit-tool-benchmark.html) tool.
