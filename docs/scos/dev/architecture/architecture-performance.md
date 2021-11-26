---
title: Spryker Architecture Performance Guidelines
description: This article explains the bad and best architecture practices which can affect the performance of applications in our very end servers.
last_updated: Nov 26, 2021
template: concept-topic-template
---
## Preface

Performance shows the response of the system to performing certain actions for a certain period. It is an important quality of attribute in each application architecture and can easily impact the user experience behaviour and business revenues, therefore it’s very necessary to follow the best practices and avoid performance drawbacks in architecture design.

In this guideline we are going to explain the bad and best architecture practices which can affect the performance of applications in our very end servers.

## General Performance Challenges in Architecture Design
In this part you will find the most architecture design mistakes and impediments in order to fulfil the business requirements with losing the performance.

### Duplications of Slow Operations
Sometime it’s mandatory to have a slow operation during one transaction because of business requirements. This slow part of functionally might be very small and is hidden behind of an API but the usage of this API can go out of control.

Let’s take one example and explain the impact of a bad architecture design for this: 

Imagine you have a method which called caluculateDiscount() wants to generate some discounts for  a cart items, but this method for each time call takes 100ms and this might be a proper response time for an API. now think of another business requirement which needs to calculate discount for 10 separated group of Items in a cart. Therefore we need to call the caluculateDiscount() 10 times which can lead to 1000ms (1 sec) and this is now a performance problem.

### Duplications of Database Queries
During the project implementation it’s possible that developers execute similar queries which are returning same result or subset of data from it in one transaction. Architects must make sure that the database interactions set to the lowest possible number and this can be achievable by

Merging several queries to only one query with a bigger result (Unfiltered)

 Aggregate the duplicates query to one query and share the result to the stack of the code execution (Memory)

Memory leaks must be carefully checked during query optimizations as the results will be bigger or shared in one transaction.

### Optimistic vs. Pessimistic Locking
It’s very possible that developers use explicit locks to prevent the race conditions or other problems, but this can easily impact the performance in high load of traffic. All requests now needs to wait for the lock and this will turn the parallel request processing to Sequentional processing and can increase the response time of all queued requests.

Some of the Pessimistic locking use cases:

- Concurrent Session problems (Redis, File)
- Generate Unique Numbers (Database)

Architect can recommend to use Optimistics locking with several different implementations according to the problems.

### Synchronous Communications and 3rd Party Calls
Another mistake for architecture is to rely on the 3rd party response time in order to achieve a promised performances for the application. Having a direct external call to a 4rd party organisation during a transaction can make the performance unpredictable and will impact the user experience behaviour.

Architects needs to fulfil the requirements by providing a different solution like asynchronous communication or pre/after indirect hooks which are not visible for the end users.

### Native Array vs. DTO
During a large scale data processing operations, it’s possible to see the performance drawbacks when it comes to object creations, hydrations and mappings in the process. it’s very recommended that architects  use the native language data structure instead of objects if it’s possible, this can reduce more than 30%-50% of CPU loads in long run.

## Performance Optimization in Spryker Architecture
In this part we would like to analyse the Spryker architecture and find the solutions for the most performance challenges that we had in several projects.

### Database Queries in Plugins
Spryker uses widely plugins to reduce the module dependencies and increase the flexibility of making features working together, but this can easily lead to some performance issues if we have database queries in each plugin. This is very important to aggregate all queries to decrease the number of database operations.

Example:

We have 10 plugins for cart feature to calculate the items price, discount, tax, etc and each plugin has a query to find product by SKU per order item, it means, the code will execute 10 same queries per each item in cart

If the cart item are equal to 70, we will have 70 x 10 (Plugins) = 700 same queries 
SELECT * FROM SPY_PRODUCT_ABSTRACT WHERE SKU = ?
->
Plugin 1. QUERY
Plugin 2. QUERY
Plugin 3. QUERY
Plugin 4. QUERY
Plugin n ....

We can solve this wrong design by

Using IN condition instead of = in query

SELECT * FROM SPY_PRODUCT_ABSTRACT WHERE SKU IN (?,?,?,....)

Run only 1 query and provide the result to other plugins

Plugin 1. QUERY
Plugin 2. RESULT
Plugin 3. RESULT
Plugin 4. RESULT
Plugin n ...

### ORM vs PDO
Spryker uses Propel ORM to reduce the database complexity and low level interactions for the developers, as this is very great abstraction and cleaner approach but developers need to be careful to not miss use the pattern so some specific places such as heavy data transfer operations like Data Import or P&S for big data.

Performance is one of the key attributes when it comes to synchronous combinations, as rule of thumb any database operations here must be very high preferment and executes fast. If ORM cannot guaranty the high speed database operation because of lack of features or complexity, then this must be avoided.

Fo example to show the products in Spryker shop, we need to import and propagate data into several databases, and in some projects this is a very heavy operation as the size of the data is big therefore Spryker recommends to not use ORM for these operations and use other solutions like CTE, PDO, etc.

Affected features 

- Dataimport
- Publish and Synchronize

You can find more details here  https://docs.spryker.com/docs/scos/dev/data-import/202108.0/data-importer-speed-optimization.html

### Database Query Optimization
Database queries are the most slow parts of each applications, they have different dependencies such as database engines, hardware, configurations and etc. Spryker prevents any database execution for popular endpoints like Home, PDP, Search but for some this is not avoidable like Cart or Checkout. There are several ways to make sure these endpoints are handling the database queries in the best performance

- Cache the result for the duplicate queries 
- Aggregate several queries to only one query when it’s possible
- Change single inserts to bulk inserts
- Break down heavy or slow queries to smaller queries and use PHP native functionalities for result calculations (like sorting, group by, filtering, validations, ….)

## Feature Configurations
