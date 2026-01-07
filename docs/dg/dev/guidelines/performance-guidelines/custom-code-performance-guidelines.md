---
title: Custom code performance guidelines
description: Learn how to implement performant custom code in Spryker, including caching strategies, background processing, external system integration, and Quote calculator optimization.
last_updated: Dec 16, 2025
template: concept-topic-template
related:
  - title: General performance guidelines
    link: docs/dg/dev/guidelines/performance-guidelines/general-performance-guidelines.html
  - title: Architecture performance guidelines
    link: docs/dg/dev/guidelines/performance-guidelines/architecture-performance-guidelines.html
  - title: External HTTP requests
    link: docs/dg/dev/guidelines/performance-guidelines/external-http-requests.html
  - title: Key-Value storage performance guidelines
    link: docs/dg/dev/guidelines/performance-guidelines/key-value-storage-performance-guidelines.html
  - title: Database performance guidelines
    link: docs/dg/dev/guidelines/performance-guidelines/database-performance-guidelines.html
---

Custom code implementations are where many performance issues originate. While Spryker provides a performant foundation, custom features can introduce bottlenecks if not designed properly. These guidelines help you implement high-performance custom functionality in Spryker projects.

## Cache heavy logic appropriately

Caching is a powerful optimization tool, but choosing the right caching strategy and storage location is critical for performance and maintainability.

### Choosing cache storage

Different data types require different caching approaches:

**1. Key-Value storage (Redis or Valkey):**

**Best for:**
- Frequently accessed data needed across multiple requests
- Data that changes occasionally (minutes to hours)
- Small to medium-sized values (<1MB)
- Data needed by multiple application instances

**Example use cases:**
- Product prices and stock availability
- Customer session data
- API rate limiting counters
- Feature flags and configuration

```php
// ✅ Good: Cache frequently accessed product data
public function getProductData(string $sku): array
{
    $cacheKey = "product:data:{$sku}";
    $ttl = 3600; // 1 hour

    $data = $this->storageClient->get($cacheKey);
    if ($data === null) {
        $data = $this->fetchProductFromRemoteLocation($sku); // or heavy processing, e.g. images processing, etc
        $this->storageClient->setex($cacheKey, $ttl, json_encode($data));
        return $data;
    }

    return json_decode($data, true);
}
```

**2. Database tables (persistent cache):**

**Best for:**
- Pre-computed aggregations and reports
- Data that changes infrequently (hours to days)
- Large datasets that would exhaust memory cache
- Historical data requiring complex queries

**Example use cases:**
- Customer order statistics
- Inventory reservation tables
- Pre-calculated shipping rates

```php
// ✅ Good: Maintain aggregation table for complex calculations
public function updateCustomerOrderStatistics(int $customerId): void
{
    $stats = SpyCustomerStatisticsQuery::create()
        ->filterByFkCustomer($customerId)
        ->findOneOrCreate();

    $orderData = SpySalesOrderQuery::create()
        ->filterByFkCustomer($customerId)
        ->select(['TotalOrders', 'TotalSpent', 'AverageOrderValue'])
        ->withColumn('COUNT(*)', 'TotalOrders')
        ->withColumn('SUM(grand_total)', 'TotalSpent')
        ->withColumn('AVG(grand_total)', 'AverageOrderValue')
        ->findOne();

    $stats->fromArray($orderData);
    $stats->setUpdatedAt(new DateTime());
    $stats->save();
}
```

**3. Filesystem cache:**

Warning: it is important to remember that filesystem is NOT shared between services and containers! 
Each application (Yves, the Back Office, Glue, etc) and each container (even within the same application, for example Yves) has its own independent file system layer on top of base Docker image.

Using the [Flysystem](https://github.com/thephpleague/flysystem) abstraction layer (PHP library) - it is easy to store files on a remote shared locations, such as S3 buckets or similar cloud storages.

**Best for:**
- Generated assets (compiled CSS, optimized images)
- Large computed results that don't fit in memory
- Data that rarely changes (days to weeks)
- Static content that can be regenerated

**Example use cases:**
- Twig template compilation cache, generated during base Docker image build process
- Composer autoloader cache
- Generated configuration files
- Compiled translation files


### Cache invalidation strategies

**1. Time-based expiration (TTL):**

The simplest approach - cache expires after fixed time:

```php
// Good for data that becomes stale predictably
$this->storageClient->setex("prices:{$sku}", 300, $priceData); // 5 minutes
```

**Best for:**
- Data with predictable staleness tolerance
- External API responses
- Computed values without direct update triggers

**2. Event-driven invalidation:**

Invalidate cache when underlying data changes by explicitly removing stale cache record.

**Best for:**
- Data synchronized with database records
- Critical data requiring immediate consistency
- Cache that must reflect real-time changes

**3. Write-through cache:**

Update cache simultaneously with data update. We recommend updating cache only after the data is saved to prevent cases of cache reflecting not saved data.

```php
// ✅ Good: Update cache when writing data
public function updateProductPrice(string $sku, float $price): void
{
    // Update database
    $product = SpyProductQuery::create()
        ->filterBySku($sku)
        ->findOne();
    $product->setPrice($price);
    $product->save();

    // Update cache immediately
    $cacheKey = "product:price:{$sku}";
    $this->storageClient->setex($cacheKey, 3600, $price);
}
```

This example is simplified process of what Publish&Sync does, but omitting the queue system, in high-load environments this approach can also be benefitial for some entities.

**Best for:**
- Data requiring high read performance
- Frequently updated values
- Scenarios where cache misses are expensive

### Cache anti-patterns

**❌ Caching without expiration:**

```php
// Bad: Cached data never expires
$this->storageClient->set("user:preferences:{$userId}", $prefs);
```

**❌ Caching entire large objects:**

```php
// Bad: Caching 10MB order with all related data
$this->storageClient->set("order:full:{$id}", serialize($orderWithAllRelations));
```

**✅ Better: Cache specific attributes:**

```php
// Good: Cache only needed data
$orderSummary = [
    'id' => $order->getIdSalesOrder(),
    'total' => $order->getGrandTotal(),
    'status' => $order->getFkOmsOrderStatus(),
];
$this->storageClient->setex("order:summary:{$id}", 300, json_encode($orderSummary));
```

**❌ Over-caching rarely accessed data:**

```php
// Bad: Caching data accessed once per week
$this->storageClient->setex("admin:report:monthly", 86400, $hugeReport);
```

## Avoid heavy processing in web requests

Web requests must respond quickly—typically under 200-500ms (in some cases - up to 1s). Heavy processing operations should execute in background jobs to maintain user experience and system stability.

### Operations that belong in background jobs

**1. File processing:**

```php
// ❌ Bad: Process file upload during request
public function uploadProductImages(array $files): void
{
    foreach ($files as $file) {
        $image = $this->imageProcessor->resize($file, [800, 600]);
        $thumbnail = $this->imageProcessor->resize($file, [200, 200]);
        $this->imageProcessor->optimize($image);
        $this->imageProcessor->optimize($thumbnail);
        $this->saveToStorage($image, $thumbnail);
    }
}

// ✅ Good: Queue for background processing
public function uploadProductImages(array $files): void
{
    foreach ($files as $file) {
        $this->queueClient->sendMessage('image-processing', [
            'file_path' => $this->saveTemporaryFile($file),
            'product_id' => $this->getProductId(),
        ]);
    }
}
```

**2. PDF generation:**

```php
// ❌ Bad: Generate PDF synchronously
public function generateInvoicePdf(int $orderId): Response
{
    $pdf = $this->pdfGenerator->create($orderId); // Takes 5-10 seconds
    return new Response($pdf, 200, ['Content-Type' => 'application/pdf']);
}

// ✅ Good: Generate asynchronously, notify when ready
public function requestInvoicePdf(int $orderId): Response
{
    $this->queueClient->sendMessage('pdf-generation', ['order_id' => $orderId]);

    return new JsonResponse([
        'message' => 'PDF generation started',
        'status_url' => "/api/invoice/{$orderId}/status",
    ]);
}
```

**3. Email sending:**

```php
// ❌ Bad: Send emails synchronously
public function placeOrder(QuoteTransfer $quote): OrderTransfer
{
    $order = $this->createOrder($quote);

    // Blocks order placement for 2-5 seconds
    $this->emailService->sendOrderConfirmation($order);
    $this->emailService->sendInternalNotification($order);

    return $order;
}

// ✅ Good: Queue emails for background sending
public function placeOrder(QuoteTransfer $quote): OrderTransfer
{
    $order = $this->createOrder($quote);

    // Queue email events
    $this->eventFacade->trigger('Order.placed', $order);

    return $order;
}
```

**4. Data imports and synchronization:**

```php
// ❌ Bad: Import during admin action
public function importProductsAction(): Response
{
    $products = $this->fetchFromExternalSystem(); // 30+ seconds
    $this->importProducts($products);

    return new Response('Import completed');
}

// ✅ Good: Trigger background import job
public function importProductsAction(): Response
{
    $jobId = $this->scheduleImportJob('products');

    return new JsonResponse([
        'message' => 'Import job scheduled',
        'job_id' => $jobId,
        'status_url' => "/admin/import/status/{$jobId}",
    ]);
}
```

### Implementing background processing

**Using Spryker's Publish & Sync:**

```php
// Trigger event that will be processed by queue workers
$this->eventFacade->trigger(
    'Product.image.process', // example, non-existing event name
    (new EventEntityTransfer())
        ->setId($productId)
        ->setAdditionalValues(['file_path' => $filePath])
);
```

**Custom queue implementation:**

```php
// Send message to custom queue
$queueSendTransfer = new QueueSendMessageTransfer();
$queueSendTransfer->setBody(json_encode([
    'task' => 'process_image',
    'product_id' => $productId,
    'file_path' => $filePath,
]));

$this->queueClient->sendMessage('custom-processing', $queueSendTransfer);
```

**Worker processing:**

```php
// Queue worker processes messages
class ImageProcessingConsumer implements QueueMessageProcessorInterface
{
    public function processMessages(array $queueMessages): array
    {
        foreach ($queueMessages as $queueMessage) {
            $payload = json_decode($queueMessage->getBody(), true);

            try {
                $this->imageProcessor->process(
                    $payload['file_path'],
                    $payload['product_id']
                );
                $queueMessage->setAcknowledge(true);
            } catch (\Exception $e) {
                $queueMessage->setReject(true);
                $this->logger->error('Image processing failed', [
                    'error' => $e->getMessage(),
                    'payload' => $payload,
                ]);
            }
        }

        return $queueMessages;
    }
}
```

## Manage external system dependencies

External systems (ERP, SAP, warehouse management, payment gateways) often cannot scale at the same pace as web applications. Integration design must account for this disparity.

### The scalability mismatch problem

**Typical scenario:**

- Your Spryker shop: Handles 100 requests/second during peak
- External ERP system: Handles 10 requests/second max
- Real-time integration: Every order placement calls ERP

**Result:**
- ERP becomes bottleneck
- Order placement slows to ERP speed
- System failures when ERP is unreachable
- Cascading timeouts affect other operations

### Decoupling strategies

**1. Asynchronous integration with queues:**

```php
// ❌ Bad: Synchronous ERP call during checkout
public function placeOrder(QuoteTransfer $quote): OrderTransfer
{
    $order = $this->createOrder($quote);

    // Blocks for 2-5 seconds, fails if ERP is down
    $this->erpClient->createOrder($order);

    return $order;
}

// ✅ Good: Queue for background synchronization
public function placeOrder(QuoteTransfer $quote): OrderTransfer
{
    $order = $this->createOrder($quote);
    $order->setErpSyncStatus('pending');
    $order->save();

    // Queue for background processing
    $this->queueClient->sendMessage('erp-sync', [
        'order_id' => $order->getIdSalesOrder(),
        'action' => 'create_order',
    ]);

    return $order;
}
```

**2. Local replica/cache with periodic sync:**

```php
// ✅ Good: Maintain local cache of ERP data
public function getProductStock(string $sku): int
{
    // Read from local database, synced every 5 minutes
    $stock = SpyProductStockQuery::create()
        ->filterBySku($sku)
        ->findOne();

    return $stock ? $stock->getQuantity() : 0;
}

// Background job syncs stock from ERP
public function syncStockFromErp(): void
{
    $products = $this->erpClient->getAllProducts();

    foreach ($products as $productData) {
        $stock = SpyProductStockQuery::create()
            ->filterBySku($productData['sku'])
            ->findOneOrCreate();

        $stock->setQuantity($productData['stock']);
        $stock->setLastSyncedAt(new DateTime());
        $stock->save();
    }
}
```

**3. Circuit breaker pattern:**

Protect your application from external system failures:

```php
public function callExternalApi(string $endpoint, array $data): ?array
{
    $circuitBreakerKey = "circuit:breaker:{$endpoint}";
    $failureCount = (int) $this->storageClient->get($circuitBreakerKey);

    // If too many failures, don't even attempt
    if ($failureCount > 5) {
        $this->logger->warning("Circuit breaker OPEN for {$endpoint}");
        return null; // Or return cached/default data
    }

    try {
        $response = $this->httpClient->post($endpoint, $data);
        // Success: Reset failure count
        $this->storageClient->delete($circuitBreakerKey);
        return $response;

    } catch (\Exception $e) {
        // Failure: Increment counter with expiration
        $this->storageClient->setex($circuitBreakerKey, 300, $failureCount + 1);
        throw $e;
    }
}
```

Note: in this example circuit braker will automatically reset it's counter based on storage Time-To-Live timer, which in this case set to 300s (5 minutes). 
Meaning that (in this example) if there were 5 failed attempts - all the next attempts within those 5 minutes will be ignored/logged, but after that time - counter will be gone and system will try to perform external request again.

**4. Read-only integration for critical paths:**

This technique can help optimise heavy write logic. Queueing such events usually involve appropriate UI (user interface) to support that by asynchoneously checking the status of queued command/event.

```php
// ✅ Good: Real-time reads OK, writes are queued
public function checkProductAvailability(string $sku): bool
{
    // Real-time check acceptable for read operations
    try {
        return $this->warehouseClient->isAvailable($sku);
    } catch (\Exception $e) {
        // Fallback to cached data
        return $this->getCachedAvailability($sku);
    }
}

public function reserveStock(string $sku, int $quantity): void
{
    // Writes are queued, never block user
    $this->queueClient->sendMessage('stock-reservation', [
        'sku' => $sku,
        'quantity' => $quantity,
        'timestamp' => time(),
    ]);
}
```

## Optimize Quote calculator plugin stack

The Quote calculation plugin stack runs on every cart modification and checkout step. Heavy calculations here directly impact user experience and checkout conversion rates.

### Understanding the calculator stack

Spryker's calculation process executes a series of plugins in sequence:

```php
// Example plugin stack (simplified)
$calculatorPlugins = [
    new RemoveTotalsCalculatorPlugin(),
    new PriceCalculatorPlugin(),
    new ItemSubtotalAggregatorPlugin(),
    new ProductOptionPriceAggregatorPlugin(),
    new DiscountCalculationPlugin(),           // Can be expensive
    new ShipmentTotalCalculatorPlugin(),       // May call external APIs
    new TaxTotalCalculatorPlugin(),
    new MerchantCommissionCalculatorPlugin(),  // Can be expensive
    new GrandTotalCalculatorPlugin(),
];
```

Each plugin processes every item in the quote. For a cart with 100 items, inefficient plugins multiply the performance impact by 100×.

### Common performance anti-patterns

**1. External API calls per item:**

```php
// ❌ Bad: Custom shipping calculator calling API per item
class CustomShippingCalculatorPlugin extends AbstractPlugin implements CalculatorPluginInterface
{
    public function recalculate(QuoteTransfer $quoteTransfer): void
    {
        foreach ($quoteTransfer->getItems() as $item) {
            // API call for EACH item = disaster for large carts
            $shippingCost = $this->shippingApi->calculateCost(
                $item->getSku(),
                $item->getQuantity(),
                $quoteTransfer->getShippingAddress()
            );

            $expense = $this->createShippingExpense($shippingCost);
            $quoteTransfer->addExpense($expense);
        }
    }
}

// ✅ Good: Batch calculation for all items
class OptimizedShippingCalculatorPlugin extends AbstractPlugin implements CalculatorPluginInterface
{
    public function recalculate(QuoteTransfer $quoteTransfer): void
    {
        // Single API call with all items
        $itemData = array_map(function ($item) {
            return [
                'sku' => $item->getSku(),
                'quantity' => $item->getQuantity(),
                'weight' => $item->getWeight(),
            ];
        }, $quoteTransfer->getItems()->getArrayCopy());

        $shippingCost = $this->shippingApi->calculateBatchCost(
            $itemData,
            $quoteTransfer->getShippingAddress()
        );

        $expense = $this->createShippingExpense($shippingCost);
        $quoteTransfer->addExpense($expense);
    }
}
```

**2. Heavy database queries per item:**

```php
// ❌ Bad: Database query for each item
public function recalculate(QuoteTransfer $quoteTransfer): void
{
    foreach ($quoteTransfer->getItems() as $item) {
        // N+1 query problem
        $discountData = SpyDiscountQuery::create()
            ->filterBySku($item->getSku())
            ->filterByIsActive(true)
            ->find();

        $this->applyDiscounts($item, $discountData);
    }
}

// ✅ Good: Bulk load, then process
public function recalculate(QuoteTransfer $quoteTransfer): void
{
    $skus = array_map(fn($item) => $item->getSku(), $quoteTransfer->getItems()->getArrayCopy());

    // Single query for all items
    $discountData = SpyDiscountQuery::create()
        ->filterBySku_In($skus)
        ->filterByIsActive(true)
        ->find();

    $discountMap = [];
    foreach ($discountData as $discount) {
        $discountMap[$discount->getSku()][] = $discount;
    }

    foreach ($quoteTransfer->getItems() as $item) {
        $itemDiscounts = $discountMap[$item->getSku()] ?? [];
        $this->applyDiscounts($item, $itemDiscounts);
    }
}
```

**3. Complex calculations without caching:**

```php
// ❌ Bad: Expensive calculation per item without caching
public function recalculate(QuoteTransfer $quoteTransfer): void
{
    foreach ($quoteTransfer->getItems() as $item) {
        // Expensive calculation every time
        $customTax = $this->calculateComplexTaxRule(
            $item,
            $quoteTransfer->getBillingAddress(),
            $quoteTransfer->getShippingAddress()
        );

        $item->setTaxRate($customTax);
    }
}

// ✅ Good: Cache calculated values
public function recalculate(QuoteTransfer $quoteTransfer): void
{
    $cacheKey = $this->buildCacheKey($quoteTransfer);
    $cachedTaxRates = $this->cache->get($cacheKey);

    if ($cachedTaxRates === null) {
        $cachedTaxRates = $this->calculateTaxRatesForCart($quoteTransfer);
        $this->cache->set($cacheKey, $cachedTaxRates, 300); // 5 min TTL
    }

    foreach ($quoteTransfer->getItems() as $item) {
        $taxRate = $cachedTaxRates[$item->getSku()] ?? $this->defaultTaxRate;
        $item->setTaxRate($taxRate);
    }
}
``` 

Note: it is important to chose cache key carefully to avoid stale outdated data, but also to ensure cache could be re-used and not re-generated on every execution attempt.

### Best practices for calculator plugins

**1. Batch operations whenever possible:**

Process all items together instead of individually:

```php
public function recalculate(QuoteTransfer $quoteTransfer): void
{
    $items = $quoteTransfer->getItems()->getArrayCopy();

    // Batch database operations
    $this->loadProductDataBatch($items);

    // Batch external calls
    $externalData = $this->fetchExternalDataBatch($items);

    // Then iterate to apply calculations
    foreach ($items as $item) {
        $this->applyCalculation($item, $externalData[$item->getSku()]);
    }
}
```

**2. Move expensive calculations to pre-computation:**

For complex rules that don't change often, pre-compute and store:

```php
// Background job pre-computes discount eligibility
public function preComputeDiscountEligibility(): void
{
    $products = $this->getActiveProducts();

    foreach ($products as $product) {
        $eligibleDiscounts = $this->calculateEligibleDiscounts($product);

        $this->storageClient->setex(
            "discounts:eligible:{$product->getSku()}",
            3600,
            json_encode($eligibleDiscounts)
        );
    }
}

// Calculator plugin reads pre-computed data
public function recalculate(QuoteTransfer $quoteTransfer): void
{
    foreach ($quoteTransfer->getItems() as $item) {
        $eligible = $this->storageClient->get("discounts:eligible:{$item->getSku()}");
        if ($eligible) {
            $this->applyEligibleDiscounts($item, json_decode($eligible, true));
        }
    }
}
```

**3. Short-circuit expensive calculations:**

Skip unnecessary calculations when possible:

```php
public function recalculate(QuoteTransfer $quoteTransfer): void
{
    // Skip if no items need this calculation
    $itemsNeedingCalculation = array_filter(
        $quoteTransfer->getItems()->getArrayCopy(),
        fn($item) => $this->needsCustomCalculation($item)
    );

    if (empty($itemsNeedingCalculation)) {
        return; // Skip expensive operation
    }

    // Only process items that need it
    $this->performExpensiveCalculation($itemsNeedingCalculation);
}
```

**4. Profile calculator performance:**

Instrument plugins to identify bottlenecks:

```php
public function recalculate(QuoteTransfer $quoteTransfer): void
{
    $startTime = microtime(true);

    // Your calculation logic
    $this->performCalculations($quoteTransfer);

    $duration = (microtime(true) - $startTime) * 1000;

    if ($duration > 100) {
        $this->logger->warning('Slow calculator plugin', [
            'plugin' => get_class($this),
            'duration_ms' => $duration,
            'item_count' => $quoteTransfer->getItems()->count(),
        ]);
    }
}
```

## Best practices summary

### Caching

1. **Choose appropriate storage**: Redis for frequent access, database for aggregations, filesystem for assets
2. **Always set TTL**: Every cached item needs expiration strategy
3. **Implement invalidation**: Event-driven or write-through for critical data
4. **Monitor cache effectiveness**: Track hit rates and memory usage

### Background processing

1. **Queue heavy operations**: File processing, PDFs, emails, imports
2. **Use Publish & Sync**: Leverage Spryker's event-driven architecture
3. **Provide status endpoints**: Let users check async operation status
4. **Handle failures gracefully**: Implement retry logic and error notifications

### External systems

1. **Decouple with queues**: Never block web requests for external calls
2. **Maintain local cache**: Sync external data to local storage periodically
3. **Implement circuit breakers**: Protect against external system failures
4. **Monitor performance**: Track external call latency and failure rates

### Quote calculator

1. **Batch operations**: Process all items together, not individually
2. **Avoid per-item external calls**: Batch API calls for entire cart
3. **Pre-compute when possible**: Calculate complex rules in background
4. **Profile performance**: Identify and optimize slow calculator plugins
5. **Short-circuit logic**: Skip unnecessary calculations

## Additional resources

- [Publish and Synchronization](/docs/dg/dev/backend-development/data-manipulation/data-publishing/publish-and-synchronization.html)
- [Queue](/docs/dg/dev/backend-development/data-manipulation/queue/queue.html)
- [External HTTP requests](/docs/dg/dev/guidelines/performance-guidelines/external-http-requests.html)
- [Key-Value storage performance guidelines](/docs/dg/dev/guidelines/performance-guidelines/key-value-storage-performance-guidelines.html)
- [Database performance guidelines](/docs/dg/dev/guidelines/performance-guidelines/database-performance-guidelines.html)
