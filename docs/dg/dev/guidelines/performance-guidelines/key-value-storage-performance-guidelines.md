---
title: Key-Value storage performance guidelines
description: Learn how to optimize Redis/ValKey performance in Spryker applications by limiting operations, avoiding admin commands in runtime, and implementing proper caching strategies.
last_updated: Dec 16, 2025
template: concept-topic-template
related:
  - title: General performance guidelines
    link: docs/dg/dev/guidelines/performance-guidelines/general-performance-guidelines.html
  - title: Architecture performance guidelines
    link: docs/dg/dev/guidelines/performance-guidelines/architecture-performance-guidelines.html
  - title: Use Redis or ValKey as a KV Storage
    link: docs/dg/dev/backend-development/client/use-and-configure-redis-or-valkey-as-a-key-value-store.html
---

Redis and ValKey (Redis-compatible) serve as critical Key-Value storage components in Spryker's architecture, providing fast data access for frontend applications. However, improper usage patterns can create significant performance bottlenecks. These guidelines help you use Key-Value storage efficiently while maintaining application scalability.

## Understanding Key-Value storage in Spryker

Spryker's [architecture principle](/docs/dg/dev/guidelines/performance-guidelines/external-http-requests.html#spryker-architecture-principle-read-from-fast-storage) requires frontend applications (Yves, Glue, Merchant Portal) to read exclusively from fast storage like Redis/ValKey and Elasticsearch/OpenSearch. This design ensures:

- **Predictable performance**: Frontend response times independent of database load
- **Horizontal scalability**: Easy scaling without backend constraints
- **High availability**: Fast storage can be replicated and distributed

However, this architecture's performance depends entirely on proper Key-Value storage usage.

## Limit operations per page request

**The 10-20 operation rule:**

Each page request should perform a maximum of 10-30 Key-Value operations (not a strict rule, but just a suggestion). Exceeding this limit creates performance bottlenecks, even with Redis's sub-millisecond response times.

### Why this matters

Even with fast Key-Value storage:
- **Network latency accumulates**: 0.1ms per operation × 1000 operations = 100ms network time
- **Cloud environments add latency**: 1-3ms per operation is common in cloud setups
- **Connection pool exhaustion**: Too many operations consume available connections
- **CPU overhead**: Serialization/deserialization for each operation uses CPU cycles

**Example problem:**

```php
// ❌ Bad: 500+ Redis operations per request
foreach ($products as $product) {
    // Each product: 5 storage reads
    $price = $this->storageClient->get("price:{$product->getSku()}");
    $stock = $this->storageClient->get("stock:{$product->getSku()}");
    $description = $this->storageClient->get("description:{$product->getSku()}");
    $images = $this->storageClient->get("images:{$product->getSku()}");
    $reviews = $this->storageClient->get("reviews:{$product->getSku()}");
}
// 100 products × 5 operations = 500 operations
```

### Solutions

**1. Use batch operations (MGET):**

```php
// ✅ Good: Single batch operation
$keys = [];
foreach ($products as $product) {
    $keys[] = "product:{$product->getSku()}:complete";
}
$productData = $this->storageClient->getMulti($keys);
// 100 products = 1 operation (or a few if keys chunked)
```

**2. Store related data together:**

```php
// ❌ Bad: Multiple keys per entity
$this->storageClient->set("product:{$sku}:price", $price);
$this->storageClient->set("product:{$sku}:stock", $stock);
$this->storageClient->set("product:{$sku}:description", $description);

// ✅ Good: Single key with structured data
$productData = [
    'price' => $price,
    'stock' => $stock,
    'description' => $description,
    'images' => $images,
];
$this->storageClient->set("product:{$sku}", json_encode($productData));
```

**3. Leverage Spryker's storage cache mechanism:**

Spryker provides built-in storage caching that remembers GET operations within a single request and performs bulk MGET retrieval. See [Use and configure Key-Value storage cache](/docs/dg/dev/backend-development/client/use-and-configure-redis-or-valkey-as-a-key-value-store.html#use-and-configure-key-value-storage-cache).

**Enable StorageCacheEventDispatcherPlugin:**

```php
// src/Pyz/Yves/EventDispatcher/EventDispatcherDependencyProvider.php
protected function getEventDispatcherPlugins(): array
{
    return [
        new StorageCacheEventDispatcherPlugin(),
    ];
}
```

This plugin:
- Tracks all `get()` calls during request processing
- Performs a single `mget()` at the end of request to retrieve all needed keys
- Caches results in memory for the request duration
- Dramatically reduces network round trips

**4. Cache frequently accessed data in application memory:**

For data accessed multiple times per request:

```php
private array $cachedPrices = [];

public function getProductPrice(string $sku): ?float
{
    if (!isset($this->cachedPrices[$sku])) {
        $this->cachedPrices[$sku] = $this->storageClient->get("price:{$sku}");
    }
    return $this->cachedPrices[$sku];
}
```

### Monitoring operation counts

Optional. Track Key-Value operations per request in your APM tool:

```php
// Add instrumentation
$operationCount = 0;

// Wrapper around storage client
public function get(string $key)
{
    $this->operationCount++;
    if ($this->operationCount > 20) {
        $this->logger->warning("High storage operation count", [
            'count' => $this->operationCount,
            'url' => $this->request->getUri(),
        ]);
    }
    return $this->storageClient->get($key);
}
```

## Avoid admin operations in runtime production code

Certain Redis/ValKey operations are designed for administration and debugging, not for production request handling. Using these operations in runtime code causes severe performance degradation.

### Dangerous operations to avoid

**1. KEYS command:**

```php
// ❌ NEVER do this in production code
$allProductKeys = $this->storageClient->keys('product:*');
```

**Why it's dangerous:**
- **Blocks the entire Redis server**: KEYS is not incremental and scans all keys
- **O(N) complexity**: Performance degrades linearly with database size
- **Production incidents**: Causes request timeouts and cascading failures

**2. SCAN command:**

While better than KEYS, SCAN is still too slow for request-time operations:

```php
// ❌ Avoid in runtime code
$cursor = 0;
do {
    [$cursor, $keys] = $this->storageClient->scan($cursor, 'product:*');
    // Process keys
} while ($cursor !== 0);
```

**When SCAN is acceptable:**
- Background jobs (CLI context)
- Maintenance scripts
- Data migration tasks
- Debug/diagnostic tools (development only)

**3. Mass SET operations:**

Hundreds or thousands of SET operations in a single web request:

```php
// ❌ Bad: Mass updates in web request
foreach ($products as $product) {
    $this->storageClient->set("product:{$product->getSku()}", $data);
}
// 1000 products = 1000 SET operations
```

**Solution: Queue for background processing:**

```php
// ✅ Good: Queue mass updates
foreach ($products as $product) {
    $this->eventFacade->trigger(
        'Product.update',
        (new EventEntityTransfer())->setId($product->getIdProduct())
    );
}
// Publish & Sync handles storage updates in background
```

### Acceptable operations in runtime code

**Fast, operation-bounded commands:**

- `GET`, `MGET`: Reading single or multiple keys
- `SET`, `SETEX`: Writing single keys with expiration
- `HGET`, `HGETALL`: Reading hash fields (if hash is reasonably sized)

**Guidelines:**

- Operations should complete in <1ms
- Batch where possible (MGET, MSET, pipelines)
- Limit collection sizes (sets, hashes, sorted sets)
- Use background jobs for bulk operations

## Don't use Redis storage as a cache for everything

While Redis is often called a "cache," in Spryker's architecture it serves as primary storage for published data. Using it as a general-purpose cache without strategy leads to problems.

### Common anti-patterns

**1. Caching heavyweight objects without limits:**

```php
// ❌ Bad: Unbounded caching
public function getCustomerOrders(int $customerId): array
{
    $cacheKey = "customer:{$customerId}:orders:all";

    $orders = $this->storageClient->get($cacheKey);
    if ($orders === null) {
        $orders = $this->fetchAllOrdersFromDatabase($customerId);
        $this->storageClient->set($cacheKey, serialize($orders));
    }
    return unserialize($orders);
}
```

**Problems:**
- Memory grows unboundedly as customers place orders
- Serialized order arrays can be huge (MBs)
- No expiration = stale data forever
- Wastes memory on rarely accessed data

**2. Caching computed results without considering invalidation:**

```php
// ❌ Bad: Cache without expiration or invalidation strategy
$cacheKey = "report:sales:monthly:{$month}";
$report = $this->storageClient->get($cacheKey);
if ($report === null) {
    $report = $this->generateComplexReport($month);
    $this->storageClient->set($cacheKey, $report);
}
```

**What happens:**
- Current month's report is cached but never invalidates
- Data becomes stale as orders come in
- Cache grows indefinitely with historical reports

### Proper caching strategy

**1. Define TTL (Time To Live) for everything:**

```php
// ✅ Good: Explicit expiration
$ttl = 3600; // 1 hour
$this->storageClient->setex($cacheKey, $ttl, $data);
```

**TTL guidelines:**
- **Frequently changing data**: 1-5 minutes
- **Moderately stable data**: 10-60 minutes
- **Rarely changing data**: 1-24 hours
- **Static data**: Consider infinite (but with explicit invalidation)

**2. Implement cache size limits:**

```php
// ✅ Good: Limit cached items per key
public function getCachedRecentOrders(int $customerId): array
{
    $cacheKey = "customer:{$customerId}:orders:recent";

    $orders = $this->storageClient->get($cacheKey);
    if ($orders === null) {
        // Only cache last 10 orders, not all
        $orders = $this->fetchRecentOrders($customerId, limit: 10);
        $this->storageClient->setex($cacheKey, 300, serialize($orders));
    }
    return unserialize($orders);
}
```

**3. Evaluate cache value:**

Ask before caching:
- **How often is this data accessed?** (Don't cache rarely used data)
- **How expensive is recomputation?** (Cache expensive operations)
- **How large is the cached value?** (Avoid caching multi-MB objects)
- **How quickly does data become stale?** (Short TTL for fast-changing data)

**4. Monitor cache metrics:**

Track these metrics:
- **Memory usage**: Total Redis memory consumption
- **Eviction rate**: How often keys are evicted due to memory pressure
- **Hit rate**: Percentage of cache hits vs misses
- **Key count**: Total number of keys in Redis
- **Key size distribution**: Largest keys consuming memory

**Alert on:**
- Memory usage >80% of allocated space
- Eviction rate increasing significantly
- Hit rate dropping below 70-80%
- Unexpected key count growth

## Best practices summary

1. **Limit operations**: Maximum 10-20 Key-Value operations per web request
2. **Use batch operations**: MGET instead of multiple GET calls
3. **Enable storage cache**: Use Spryker's `StorageCacheEventDispatcherPlugin` in the selected applications
4. **Store related data together**: Reduce key count by grouping related attributes
5. **Never use KEYS in production**: Use indexed sets or background jobs
6. **Avoid mass SET operations**: Queue bulk updates for background processing
7. **Define TTL for cached data**: Everything cached should have expiration
8. **Monitor memory usage**: Alert on high memory and eviction rates
9. **Evaluate cache value**: Only cache frequently accessed, expensive-to-compute data

## Additional resources

- [Use and configure Redis or ValKey as Key-Value storage](/docs/dg/dev/backend-development/client/use-and-configure-redis-or-valkey-as-a-key-value-store.html)
- [External HTTP requests: Architecture principle](/docs/dg/dev/guidelines/performance-guidelines/external-http-requests.html#spryker-architecture-principle-read-from-fast-storage)
- [Redis Best Practices](https://redis.io/docs/latest/operate/oss_and_stack/management/optimization/)
- [Troubleshooting: External calls take a lot of time](/docs/dg/dev/troubleshooting/troubleshooting-performance-issues/external-calls-take-a-lot-of-time.html)
