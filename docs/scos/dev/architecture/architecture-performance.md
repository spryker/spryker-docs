---
title: Spryker Architecture Performance Guidelines
description: Learn about the bad and best architecture practices which can affect performance of applications in our very end servers
last_updated: Nov 26, 2021
template: concept-topic-template
---

Performance shows the response of the system to carrying out certain actions for a certain period. It is an important quality attribute in each application architecture that can impact the user experience behavior and business revenues. Therefore it’s highly recommended to follow the best practices and avoid performance drawbacks in the architecture design.

This article explains the bad and best architecture practices which can affect performance of applications in our very end servers.

## General performance challenges in architecture design
Below, you will find the most common architecture design mistakes and impediments that are made to fulfil the business requirements, but that can also entail performance issues.

### Duplications of slow operations
Sometimes, due to the business requirements, it’s mandatory to have a slow operation during one transaction. This slow part of functionally might be very small and hidden behind an API, but the usage of this API can go out of control.

Let's consider an example illustrating the impact of a bad architecture design with the slow operations. Imagine you have a method called `caluculateDiscount()` that generates some discounts for cart items. However, each call of this method takes 100ms, which might be a proper response time for an API. Now think of another business requirement which needs to calculate discount for 10 separated groups of items in cart. In this case, you need to call the `caluculateDiscount()` method 10 times, which can lead to 1000ms (1 second) and this already poses a performance problem.

### Duplications of database queries
During the project implementation, sometimes developers might execute similar queries that return the same result or subset of data from it in one transaction. Therefore, architects must make sure that the database interactions are set to the lowest possible number. They can achieve this by:

* Merging several queries to one query with a bigger result (unfiltered).
* Aggregating the duplicate query to one query and sharing the result with the stack of the code execution (memory).

{% info_block warningBox %}

Make sure you carefully check for memory leaks during the query optimizations as the results will be bigger or shared in one transaction.

{% endinfo_block %}


### Optimistic vs. pessimistic locking

Sometimes, developers use explicit locks to prevent race conditions or other issues, which can impact performance due to the high load of traffic. This happens because all requests need to wait for the lock, which turns the parallel request processing to sequential processing and can increase the response time of all the queued requests.

Some of the pessimistic locking use cases are:

- Concurrent session problems (Redis, File)
- Generating unique numbers (database)

To avoid performance issues, architects can recommend using optimistic locking with several different implementations according to the faced problems.

### Synchronous communications and 3rd party calls

Another architectural mistake is relying on a 3rd party response time to achieve promised performance for an application. Having a direct external call to a 3rd party organization during a transaction can make the performance unpredictable as well as impact the user experience.

We recommend architects to fulfil the requirements by providing a different solution like asynchronous communication or pre/after indirect hooks which are not visible for the end users.

### Native array vs. DTO
During the large scale data processing operations, there can occur performance drawbacks when it comes to object creations, hydrations, and mappings in the process. Therefore, architects are highly recommended to use native language data structure instead of objects if it’s possible, as this can reduce more than 30%-50% of CPU loads in the long run.

## Performance optimization in the Spryker architecture

This section provides analysis of the the Spryker architecture and explains solutions for the most common performance challenges that we had in several projects.

### Database queries in plugins
Spryker widely uses plugins to reduce module dependencies and increase flexibility to make features work together smoothly. However, this can lead to some performance issues if there are database queries in each plugin. That's why it is important to aggregate all queries to decrease the number of database operations.

Let's consider an example. Suppose there are 10 plugins for the cart feature to calculate items price, discount, tax, etc. Each plugin has a query to find product by SKU per order item, which means the code will execute 10 same queries per each item in cart.

So if there are 70 cart items, there will be 70 x 10 (plugins) = 700 same queries:

```
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
  
```
SELECT * FROM SPY_PRODUCT_ABSTRACT WHERE SKU IN (?,?,?,....)
```
- Running only 1 query and providing the result to other plugins:
  
```
Plugin 1. QUERY
Plugin 2. RESULT
Plugin 3. RESULT
Plugin 4. RESULT
Plugin n ...
```

### ORM vs PDO
Spryker uses Propel ORM to reduce the database complexity and low level interactions for developers. as this is very great abstraction and cleaner approach but developers need to be careful to not miss use the pattern so some specific places such as heavy data transfer operations like Data Import or P&S for big data.

Performance is one of the key attributes when it comes to synchronous combinations. Therefore, as a rule of thumb, any database operations must be high preferment and be executed fast. If ORM cannot guaranty the high speed database operation because of the lack of features or complexity, then it must be avoided.

For example, to display products in the Spryker shop, we need to import and propagate data into several databases. For some projects, this is a very heavy operation due to the big size of data. Therefore, Spryker recommends not to use ORM for these operations, but choose other solutions instead, for example, CTE, PDO, etc. For more information, see [Data Importer Speed Optimization | Spryker Documentation ](/docs/scos/dev/data-import/{{site.version}}/data-importer-speed-optimization.html).

Features affected by the ORM approach: 

- [Data import](/docs/scos/dev/sdk/data-import.html)
- [Publish and Synchronization](/docs/scos/dev/back-end-development/data-manipulation/data-publishing/publish-and-synchronization.html)

### Database query optimization
Database queries are slowest parts of each applications. They have different dependencies such as database engines, hardware, configurations, etc. Spryker prevents any database execution for popular endpoints like Home, PDP, Search. However, for some endpoints this preventive measure is not avoidable, for example, for Cart or Checkout. There are several ways to make sure these endpoints are handling the database queries most effectively in terms of performance:

- Cache result for the duplicate queries.
- Aggregate several queries to only one query when it’s possible.
- Change single inserts to bulk inserts.
- Break down heavy or slow queries to smaller queries and use PHP native functionalities for result calculations (like sorting, group by, filtering, validations, etc.).

## Feature configurations
Spryker has different features and several configurable modules that need to be adjusted correctly to have the best performance and smooth execution in the applications. 

### Publish and Synchronization
This feature is one of the most important infrastructure parts in Spryker, therefore it's crucial that the configurations are set correctly for it.

#### Multiple publisher queues
Publishers use queues to propagate events and let workers consume them to provide necessary data for our frontend services. Since Spryker uses RabbitMQ as a default option, it’s recommended to use multiple queues instead of one to spread loads between different queues. For more information about multiple publisher queues, see [Integrating multi-queue publish structure](/docs/scos/dev/technical-enhancement-integration-guides/integrating-multi-queue-publish-structure.html).

#### Workers
The default Spryker configuration comes with one worker per publisher queues. Nevertheless, you can increase this configuration to the maximum number of CPUs for a specific queue if other queues do not receive any loads. For example:

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
Publishers use different chunks to consume messages from queues, the best number is very dependent on each entity and the hardware, but as a best practice we recommend to choose one of these numbers:

- 500 (Default)
- 1000
- 1500 
- 2000 (Max)

{% info_block warningBox %}

Memory leaks must be carefully checked when increasing chunks, as the messages will be bigger.

{% endinfo_block %}


#### Benchmark and profiling the queues
Spryker also recommends enabling the benchmark tests for each publisher queue and measuring processing time for the minimum chunk for each queue before deployment to production.

Example of benchmark for each queue:

```
time vendor/bin/console queue:task:start publisher.product_abstract // Ouput 30.00s
....
```

### Cart and Checkout plugins
As the Spryker boilerplate comes with most of the features enabled, make sure you clean up the unnecessary plugins from the Cart and Checkout plugin stack:

- Cart plugins
[suite/CartDependencyProvider.php at master · spryker-shop/suite ](https://github.com/spryker-shop/suite/blob/master/src/Pyz/Zed/Cart/CartDependencyProvider.php)
 
- Checkout plugins
[suite/CheckoutDependencyProvider.php at master · spryker-shop/suite](https://github.com/spryker-shop/suite/blob/master/src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php)

### Zed Calls
Zed calls are necessary when it comes to executing a database-related operation like Cart and Checkout requests. As these calls are handled by an RPC mechanism, it is necessary to reduce the number of calls to maximum one call to Zed. You can achieve this by:

- Exporting necessary data, only product-related ones, from Zed to Redis at the pre-calculation phase with the help of Publish and Synchronization.
- Merging duplicate Zed requests to only one customer request (AddToCart + Validations + …).

### OMS optimization
OMS processes are the template of the order fulfillment at Spryker. The very first state of OMS processes which is called the NEW sate plays an important role in the checkout  process. Therefore, it is necessary to make sure we don't use unnecessary features when we don't need them, for example, Reservation or Timeout transitions.

One can avoid using the unnecessary transitions by: 

- Removing the *Reservation* flag from the NEW and other steps in the OMS.
- Removing the *Timeout* transition from the NEW step in the OMS.

### Performance checklist

Make sure to check the following articles on how to optimize performance of your application:

- [Performance guidelines](/docs/scos/dev/guidelines/performance-guidelines.html)
- [Data Importer Speed Optimization](/docs/scos/dev/data-import/202108.0/data-importer-speed-optimization.html)
- [Integrating multi-queue publish structure](/docs/scos/dev/technical-enhancement-integration-guides/integrating-multi-queue-publish-structure.html)
- [Performance testing in staging environments](/docs/cloud/dev/spryker-cloud-commerce-os/performance-testing.html)

## Application performance and load tests
For the best performance, before going live, it is highly recommended to perform all the necessary tests, as well as run CI and Monitoring tools.

### Benchmark test
Each project must have their own benchmark tests for the API and Frontend shops before going live. Having these tests in place, ensures that the project follows the best performance state for each request. You can use any tools for this type of tests, for example:

- Apache Benchmark 
- Apache jMeter

### Load test
Every shop should always be ready for high traffic and serving as many users as possible, and at the same time it's crucial to maintain the best performance. Therefore, we also recommend to plan some stress tests with real data before going live. To achieve use, you can use the [load testing tool](https://github.com/spryker-sdk/load-testing) based on Gatling that Spryker provides for all projects.

### Monitoring and profiling
We strongly recommend our customers to enable APM systems for their projects. Spryker supports [Newrelic](/docs/scos/dev/tutorials-and-howtos/advanced-tutorials/tutorial-new-relic-monitoring.html) as the default monitoring system.

### Performance CI
Performance CI plays a very important role for each project pipeline as it prevents new issues in the long term when it comes to features development. To analyze perofrmance of your project, you can use the [Benchmark](https://docs.spryker.com/docs/scos/dev/sdk/development-tools/performance-audit-tool-benchmark.html) tool.
