---
title: Architecture performance guidelines
description: Learn about the bad and best architecture practices which can affect the performance of applications in the very end servers
last_updated: Dec 8, 2025
template: concept-topic-template
redirect_from:
  - /docs/scos/dev/guidelines/performance-guidelines/architecture-performance-guidelines.html
related:
  - title: General performance guidelines
    link: docs/dg/dev/guidelines/performance-guidelines/general-performance-guidelines.html
  - title: Frontend performance guidelines
    link: docs/dg/dev/guidelines/performance-guidelines/front-end-performance-guidelines.html
---

Performance shows the response of a system to carrying out certain actions for a certain period. Performance is an important quality attribute in each application architecture that can impact user experience behavior and business revenues. Therefore, we highly recommend following the best practices and avoiding performance drawbacks in the architecture design.

This article explains the bad and best architecture practices that can affect applications' performance in the very end servers.

## Bulk Operations vs Individual Operations: Performance Best Practices

Bulk operations significantly reduce the number of database queries, method calls, and iterations, leading to better performance, reduced memory usage, and faster execution times.

### Database Operations

**Read operation**

```php
❌ Bad: N+1 Query Problem
// Fetching orders one by one - N+1 queries
$orderIds = [1, 2, 3, 4, 5];
$orders = [];

foreach ($orderIds as $orderId) {
    // Each iteration = 1 database query
    $order = SpySalesOrderQuery::create()
        ->filterByIdSalesOrder($orderId)
        ->findOne();
    $orders[] = $order;
}
// Total: 5 queries

✅ Good: Single Bulk Query

// Fetching all orders at once - 1 query
$orderIds = [1, 2, 3, 4, 5];

$orders = SpySalesOrderQuery::create()
    ->filterByIdSalesOrder_In($orderIds)
    ->find();
// Total: 1 query
```

**Example with Relations**

```php
// ❌ Bad: Loading items for each order separately
foreach ($orders as $order) {
    $items = SpySalesOrderItemQuery::create()
        ->filterByFkSalesOrder($order->getIdSalesOrder())
        ->find();
}
// Total: 1 + N queries

// ✅ Good: Using joinWithTable to load everything at once
$orders = SpySalesOrderQuery::create()
    ->filterByIdSalesOrder_In($orderIds)
    ->joinWithSpySalesOrderItem()
    ->find();
// Total: 1 query with all items hydrated
```

**Write operation**

```php
// ❌ Bad: Saving items separately
foreach ($salesOrderItems as $salesOrderItem) {
    // logic
    $salesOrderItem->save();
}
// Total: N queries

// ✅ Good: Using ActiveRecordBatchProcessorTrait to save everything at once
foreach ($salesOrderItems as $salesOrderItem) {
    $this->persist($salesOrderItem);
}
$this->commit();
// Total: 1 query with all items
```

For more information check - [Batch processing of Propel entities](/docs/dg/dev/guidelines/performance-guidelines/performance-guidelines-batch-processing-propel-entities.html).

#### ORM vs PDO

For more information about improving data import performance, see [Data importer speed optimization](/docs/dg/dev/data-import/{{site.version}}/data-import-optimization-guidelines.html).

Features affected by the ORM approach:

- [Data import](/docs/dg/dev/data-import/{{site.version}}/data-import.html)
- [Publish and Synchronization](/docs/dg/dev/backend-development/data-manipulation/data-publishing/publish-and-synchronization.html)

### Duplicated storage calls (storage calls in a loop)

In project implementations, developers sometimes introduce repeated storage calls inside loops. Each iteration of the loop then results in a new query to the storage, even though the required data could often be retrieved in a more optimized way. This creates a significant performance bottleneck because:

- Storage access is typically slower because of the network overhead on each trip to Redis/Valkey. Multiplying these calls by the number of loop iterations can lead to exponential slowdowns.
- High-frequency storage calls increase infrastructure load, leading to higher operational costs and degraded system responsiveness under load.
- Unnecessary roundtrips to storage delay the request–response cycle and negatively impact customer-facing performance metrics such as page load time and API latency.

To avoid these pitfalls, architects and developers should ensure storage interactions are minimized and structured efficiently. Best practices include:

- Batch retrieval: Fetch all required records in a single storage call before entering the loop.
- Indexing and pre-aggregation: Where possible, prepare optimized structures to avoid repeated lookups.

Bad practice – repeated storage calls inside the loop:

```php
foreach ($storageKeys as $storageKey) {
    $productData = $this->storageClient->get($storageKey);
    // Process $productData
}
```

In this example, every loop iteration triggers a new storage request, which can quickly become a performance bottleneck with larger datasets.

Recommended approach – batch retrieval and in-memory processing:

```php
$productsData = $this->storageClient->getMulti($storageKeys);

foreach ($productsData as $productData) {
    // Process $productData
}
```

By fetching all required records in a single call (with `\Spryker\Client\Storage\StorageClientInterface::getMulti`), the system significantly reduces storage interactions and improves performance. The retrieved data is stored in memory and reused during processing.

{% info_block warningBox %}

Always evaluate the size of batch requests and memory usage when removing storage calls from loops. While batching improves performance, overly large result sets can increase memory consumption and cause application instability.

{% endinfo_block %}

### Inefficient Redis Key Usage (Using REDIS KEYS)

A common performance issue in project implementations occurs when you misuse the Storage Client by dynamically constructing Redis keys or performing pattern-based lookups instead of relying on the standardized Storage structure that Publish and Synchronize generates.
Although Storage is optimized for fast, direct key access, using it with unpredictable or wildcard-style keys leads to expensive Redis operations that do not scale.

This behavior creates performance bottlenecks because:
- Wildcard key lookups (for example, querying "product:*" patterns) internally rely on Redis key scans, which block the Redis thread and slow down all Storage operations.
- Dynamically generated key patterns bypass the optimized Storage topology and force Redis to traverse large key spaces.
- Repeated pattern-matching calls significantly increase latency and infrastructure load, especially in high-traffic catalog or cart flows.

Using the Redis KEYS command in production is strongly discouraged because it forces Redis to scan the entire key space in a single blocking operation. Because Redis is single-threaded, this blocks all other Storage interactions until the scan completes and causes unpredictable latency spikes and degraded performance under load. Even moderately sized projects can experience severe slowdowns when you use the KEYS command repeatedly or within high-traffic code paths.

To avoid these pitfalls, always access Storage by using known, explicitly generated keys that Spryker synchronization data provides, and avoid interacting with raw Redis keys directly.

❌ Bad: Constructing Redis key patterns and scanning Storage

```php
// Do not scan Redis Storage keys
$keyPattern = sprintf('product_storage:*:%s', $locale);
$keys = $this->storageClient->getKeys($keyPattern); // Slow and dangerous

foreach ($keys as $key) {
    $data[] = $this->storageClient->get($key);
}
```

This pattern forces Redis to resolve wildcard expressions, which is slow, blocking, and not intended for runtime operations in Spryker applications.

✅ Good: Use synchronization keys or direct Storage identifiers

```php
// Use the synchronization key generated during Publish and Synchronize
$storageKeys = $this->generateKeyBatch($productIds);

$productsData = $this->storageClient->getMulti($storageKeys);

foreach ($productsData as $productData) {
// Process product data
}
```

By relying on generated synchronization keys and the `getMulti()` method, you ensure that Storage consumption is predictable and efficient and that Redis provides fast, direct key access without scanning.

{% info_block warningBox %}

Never rely on wildcard patterns or manually composed Redis keys. You must use deterministic synchronization keys for all Storage access in Spryker; otherwise, Storage performance degrades rapidly as the dataset grows.

{% endinfo_block %}

### Heavy Method Calls

❌ Bad: Multiple Individual Facade Calls

```php
// Processing items one by one
foreach ($saveOrderTransfer->getOrderItems() as $itemTransfer) {
    // Each iteration = separate facade call + potential DB query
    $this->omsFacade->triggerEventForOrderItem($itemTransfer->getIdSalesOrderItem());
}
// Total: N facade calls + N potential database operations
```

✅ Good: Single Bulk Facade Call

```php
// Collect all IDs first
$salesOrderItemIds = [];
foreach ($saveOrderTransfer->getOrderItems() as $itemTransfer) {
    $salesOrderItemIds[] = $itemTransfer->getIdSalesOrderItem();
}

// Single facade call with all IDs
$this->omsFacade->triggerEventForNewOrderItems($salesOrderItemIds);
// Total: 1 facade call + 1 optimized database operation
```

### Nested Foreach Loops

❌ Bad: Multiple Nested Loops with Individual Operations

```php
// Loading product data for each order item
foreach ($orders as $order) {
    foreach ($order->getItems() as $item) {
        // Each iteration = 1 query
        $product = SpyProductQuery::create()
            ->filterBySku($item->getSku())
            ->findOne();

        // Another query per item
        $stock = SpyStockQuery::create()
            ->filterByFkProduct($product->getIdProduct())
            ->findOne();
    }
}
// Total: (Orders × Items × 2) queries
```

✅ Good: Collect Data, Then Bulk Load

```php
// Step 1: Collect all SKUs
$skus = [];
foreach ($orders as $order) {
    foreach ($order->getItems() as $item) {
        $skus[] = $item->getSku();
    }
}

// Step 2: Bulk load products
$products = SpyProductQuery::create()
    ->filterBySku_In($skus)
    ->joinWithSpyStock()
    ->find();

// Step 3: Create lookup map
$productMap = [];
foreach ($products as $product) {
    $productMap[$product->getSku()] = $product;
}

// Step 4: Use the map
foreach ($orders as $order) {
    foreach ($order->getItems() as $item) {
        $product = $productMap[$item->getSku()] ?? null;
        $stock = $product?->getSpyStocks()->getFirst();
    }
}
// Total: 1 query
```

### When to Avoid Bulk Operations

1. **Memory constraints**: Loading thousands of records at once may cause memory issues
2. **Processing time limits**: Long-running bulk operations may hit execution timeouts
3. **Transaction isolation**: When you need separate transactions for error handling

Solution: Batch Processing

```php
// Process in chunks of 100
$orderIds = range(1, 1000);
$chunks = array_chunk($orderIds, 100);

foreach ($chunks as $chunk) {
    $orders = SpySalesOrderQuery::create()
        ->filterByIdSalesOrder_In($chunk)
        ->find();

    // Process this batch
    foreach ($orders as $order) {
        // ...
    }
}
// Total: 10 queries instead of 1000
```

### Optimistic vs. pessimistic locking

Sometimes, developers use explicit locks to prevent race conditions or other issues that impact performance because of the high traffic load. This happens because all requests need to wait for the lock, which turns the parallel request processing into sequential processing and can increase the response time of all the queued requests.

Some of the pessimistic locking use cases are:

- Concurrent session problems (Redis, File)
- Generating unique numbers (database)

To avoid performance issues, architects can recommend using optimistic locking with several different implementations according to the faced problems.

### Synchronous communications and third-party calls

Another architectural mistake is relying on a third-party response time to achieve promised performance for an application. Having a direct external call to a third-party organization during a transaction can make the performance unpredictable and impact the user experience.

We recommend architects fulfill the requirements by providing a different solution like asynchronous communication<!-- or pre/after indirect hooks that are not visible for the end users-->.

### Native array vs. DTO

During large-scale data processing operations, there can occur performance drawbacks when it comes to object creations, hydrations, and mappings in the process. Therefore, we highly recommend architects use native language data structure instead of objects if possible, as this can reduce more than 30%-50% of CPU loads in the long run.

## Performance optimization in the Spryker architecture

Below, you will find an analysis of the Spryker architecture and solutions for the most common performance challenges we had in several projects.

### Propel joinWith usage

Propel provides two methods for joining tables in queries: `joinTable()` and `joinWithTable()`. The key difference is that `joinWithTable()` hydrates related entities in a single query, significantly improving performance.

#### Performance Difference

- `joinTable()`: Adds a JOIN clause to the SQL query but does not hydrate the related objects. Results in N+1 queries if you access related data.
- `joinWithTable()`: Adds a JOIN clause AND hydrates the related objects in a single query, avoiding additional database calls.

#### Code Example

```php
// ❌ Bad: Using joinTable() - causes N+1 queries
$orders = SpySalesOrderQuery::create()
    ->joinSpySalesOrderItem()
    ->find();
foreach ($orders as $order) {
    // This triggers additional queries for each order
    $items = $order->getSpySalesOrderItems();
}
// ✅ Good: Using joinWithTable() - single query with hydration
$orders = SpySalesOrderQuery::create()
    ->joinWithSpySalesOrderItem()
    ->find();
foreach ($orders as $order) {
    // No additional queries - items already loaded
    $items = $order->getSpySalesOrderItems();
}
```

#### When NOT to Use `joinWithTable()`

1. **Large result sets with many related records**: Can consume excessive memory if each parent has many children.
2. **When you don't need the related data**: If you only need data from the main table, use `joinTable()` or avoid joins entirely.
3. **Multiple levels of deep joins**: Can create massive result sets and duplicate data.

```php
// ⚠️ Avoid: Deep joins with large datasets
$orders = SpySalesOrderQuery::create()
->joinWithSpySalesOrderItem()
->joinWithSpySalesOrderAddress()
->joinWithSpySalesOrderTotals()
->find(); // May load too much data
```

4. **When using aggregation**: For COUNT, SUM, etc., you typically only need joinTable().

```php
// ✅ Correct: Using joinTable() for counting
$count = SpySalesOrderQuery::create()
->joinSpySalesOrderItem()
->count();
```

#### Database queries in plugins

Spryker widely uses plugins to reduce module dependencies and to increase flexibility to make features work together smoothly. However, this can lead to some performance issues if there are database queries in each plugin. That's why it's essential to aggregate all queries to decrease the number of database operations.

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

### Internal Caching with Static Properties

**Why Use Internal Caching**
When multiple parts of your code call the same method that reads from the database, storing results in a static property eliminates redundant queries and processing within the same request lifecycle.

**Benefits**
- **Reduced database load**: Avoids duplicate queries in the same request
- **Faster execution**: Memory reads are orders of magnitude faster than database queries
- **Lower latency**: Especially beneficial when the same data is accessed multiple times

✅ Good: Internal Caching with Static Property

```php
     /**
     * @var array<int, EntityTransfer|null>
     */
    private static array $entityCache = [];

    public function getEntityById(int $id): ?EntityTransfer
    {
        // Check cache first
        if (isset(self::$entityCache[$id])) {
            return self::$entityCache[$id];
        }

        // Execute some logic, like read, calculate, etc.

        // Store in cache
        self::$entityCache[$id] = $entityTransfer;

        return $entityTransfer;
    }

    /**
     * Clear cache if needed (e.g., after updates)
     */
    public static function clearCache(): void
    {
        self::$entityCache = [];
    }
```

**Note:** Caching on the repository level is not always a good idea; the code above is just an example.

#### Advanced Example: Bulk Loading with Cache

❌ Bad: Loop Without Cache

```php
class OrderProcessor
{
    public function processOrders(array $orders): void
    {
        $productRepository = new ProductRepository();

        foreach ($orders as $order) {
            foreach ($order->getItems() as $item) {
                // Each item triggers a query, even for duplicate SKUs
                $product = $productRepository->getProductBySku($item->getSku());
                // Process product...
            }
        }
    }
}

// If 100 items have 10 unique SKUs: 100 queries
```

✅ Good: Bulk Load + Cache

```php
Class ProductRepository
{
    private static array $productCache = [];

    public function getProductsBySku(array $skus): array
    {
        $uncachedSkus = [];
        $results = [];

        // Step 1: Check which SKUs are not cached
        foreach ($skus as $sku) {
            if (isset(self::$productCache[$sku])) {
                $results[$sku] = self::$productCache[$sku];
            } else {
                $uncachedSkus[] = $sku;
            }
        }

        // Step 2: Bulk load uncached SKUs
        if (!empty($uncachedSkus)) {
            $productEntities = SpyProductQuery::create()
                ->filterBySku_In($uncachedSkus)
                ->find();

            foreach ($productEntities as $productEntity) {
                $productTransfer = $this->mapEntityToTransfer($productEntity);
                $sku = $productEntity->getSku();

                // Cache the result
                self::$productCache[$sku] = $productTransfer;
                $results[$sku] = $productTransfer;
            }

            // Cache null for missing SKUs
            foreach ($uncachedSkus as $sku) {
                if (!isset(self::$productCache[$sku])) {
                    self::$productCache[$sku] = null;
                    $results[$sku] = null;
                }
            }
        }

        return $results;
    }

    public function getProductBySku(string $sku): ?ProductTransfer
    {
        $products = $this->getProductsBySku([$sku]);
        return $products[$sku] ?? null;
    }
}

class OrderProcessor
{
    public function processOrders(array $orders): void
    {
        $productRepository = new ProductRepository();

        // Step 1: Collect all unique SKUs
        $allSkus = [];
        foreach ($orders as $order) {
            foreach ($order->getItems() as $item) {
                $allSkus[] = $item->getSku();
            }
        }
        $allSkus = array_unique($allSkus);

        // Step 2: Bulk load and cache all products
        $productRepository->getProductsBySku($allSkus);

        // Step 3: Process orders using cached data
        foreach ($orders as $order) {
            foreach ($order->getItems() as $item) {
                // Always served from cache
                $product = $productRepository->getProductBySku($item->getSku());
                // Process product...
            }
        }
    }
}

// If 100 items have 10 unique SKUs: 1 query
```

#### When NOT to Use Internal Caching

1. **Long-running processes (like P&S)**: Cache grows indefinitely (use chunking or periodic clearing)
2. **High memory usage**: Large objects cached thousands of times
3. **Stale data concerns**: When data changes frequently during request
4. **Multi-tenant applications**: Cache may leak data between tenants (use tenant-aware keys)

#### Best Practices

1. **Use typed arrays**: Document what's stored in the cache
2. **Cache null values**: Avoid repeated queries for missing data
3. **Clear cache after writes**: Prevent stale data
4. **Memory awareness**: Monitor cache size in production
5. **Create E2E and unit tests**: Before you apply any optimizations, create the necessary tests. This increases system stability and reduces the risk of introducing bugs.
6. **Use cache keys wisely**: Include tenant ID, locale, etc. if needed

```php
// ✅ Good: Tenant-aware cache key
private static array $cache = [];

public function getProduct(string $sku, int $tenantId): ?ProductTransfer
{
    $cacheKey = sprintf('%d:%s', $tenantId, $sku);

    if (isset(self::$cache[$cacheKey])) {
        return self::$cache[$cacheKey];
    }

    // Query and cache...
}
```

### Wildcards in the key-value store

Avoid using wildcards (*) in the key-value store, as they can significantly impact performance.

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

```text
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

```text
time vendor/bin/console queue:task:start publisher.product_abstract // Ouput 30.00s
....
```

### Cart and Checkout plugins

As the Spryker boilerplate comes with most of the features enabled, make sure you clean up the unnecessary plugins from the Cart and Checkout plugin stack:

- [Cart plugins](https://github.com/spryker-shop/suite/blob/master/src/Pyz/Zed/Cart/CartDependencyProvider.php)

- [Checkout plugins](https://github.com/spryker-shop/suite/blob/master/src/Pyz/Zed/Checkout/CheckoutDependencyProvider.php)

### Zed calls

Zed calls are necessary when it comes to executing a database-related operation like Cart and Checkout requests. As an RPC mechanism handles these calls, it's necessary to reduce the number of calls to maximum one call to Zed. You can achieve this by:

- Exporting necessary data, only product-related ones, from Zed to the key-value store (Redis or Valkey) at the pre-calculation phase with the help of Publish and Synchronization.
- Merging duplicate Zed requests to only one customer request (AddToCart + Validations + …).

{% info_block infoBox "" %}

Avoid making ZED calls within QueryExpanderPlugin (from Storage or Search).

{% endinfo_block %}

### OMS optimization

OMS processes are the template of the order fulfillment in Spryker. The first state of OMS processes, called the NEW state, plays an important role in the checkout process. So, make sure transitions related to unsused features are disabled, for example–Reservation or Timeout transitions.

You can avoid using the unnecessary transitions as follows:

- Remove the `Reservation` flag from the `NEW` and other steps in the OMS.
- Remove the `Timeout` transition from the `NEW` step in the OMS.

For more ways to optimize OMS, see [Slow checkout endpoint](/docs/pbc/all/order-management-system/{{site.version}}/base-shop/datapayload-conversion/state-machine/common-pitfalls-in-oms-design.html#slow-checkout-endpoint).

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

Performance CI plays a very important role for each project pipeline as it prevents new issues in the long term when it comes to feature development. To analyze your project's performance, you can use the [Benchmark](/docs/dg/dev/sdks/sdk/development-tools/benchmark-performance-audit-tool.html) tool.
