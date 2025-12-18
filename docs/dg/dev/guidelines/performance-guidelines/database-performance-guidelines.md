---
title: Database performance guidelines
description: Learn how to optimize database performance in Spryker applications through proper indexing, query optimization, and avoiding common database anti-patterns.
last_updated: Dec 16, 2025
template: concept-topic-template
related:
  - title: Architecture performance guidelines
    link: docs/dg/dev/guidelines/performance-guidelines/architecture-performance-guidelines.html
  - title: Batch processing of Propel entities
    link: docs/dg/dev/guidelines/performance-guidelines/performance-guidelines-batch-processing-propel-entities.html
  - title: General performance guidelines
    link: docs/dg/dev/guidelines/performance-guidelines/general-performance-guidelines.html
  - title: Data import optimization guidelines
    link: docs/dg/dev/data-import/latest/data-import-optimization-guidelines.html
---

Database operations are often the primary performance bottleneck in e-commerce applications. Poor database design, missing indexes, and inefficient queries can severely impact application performance, especially under high load. These guidelines help you identify and resolve common database performance issues in Spryker projects.

## Database indexes

Proper indexing is fundamental to database performance. Indexes dramatically speed up data retrieval but come with trade-offs in write performance and storage space.

### Understanding index usage

When a query runs without appropriate indexes, the database performs a full table scan—reading every row to find matches. For tables with millions of records, this becomes exponentially slower.

**Signs you need an index:**
- Slow queries on frequently accessed tables
- Full table scans in query execution plans
- High database CPU usage during peak traffic
- Queries filtering or joining on unindexed columns

### Creating effective indexes

**Index columns used in WHERE clauses:**

```php
// This query needs an index on spy_sales_order.order_reference
$order = SpySalesOrderQuery::create()
    ->filterByOrderReference($orderReference)
    ->findOne();
```

Add index in your Propel schema:

```xml
<table name="spy_sales_order">
    <column name="order_reference" type="VARCHAR" size="255"/>
    <index name="spy_sales_order-order_reference">
        <index-column name="order_reference"/>
    </index>
</table>
```

**Index foreign keys:**

Foreign keys used in JOINs must be indexed. Propel automatically creates indexes for foreign keys defined in schema, but custom foreign key columns need manual indexing:

```xml
<table name="spy_sales_order_item">
    <column name="fk_sales_order" type="INTEGER" required="true"/>
    <foreign-key foreignTable="spy_sales_order" name="spy_sales_order_item-fk_sales_order">
        <reference local="fk_sales_order" foreign="id_sales_order"/>
    </foreign-key>
    <!-- Index automatically created by Propel for foreign key -->
</table>
```

**Composite indexes for multiple conditions:**

When queries filter on multiple columns, create composite indexes:

```php
// Query filtering by store and status
$orders = SpySalesOrderQuery::create()
    ->filterByStore('DE')
    ->filterByFkOmsOrderStatus($statusId)
    ->find();
```

```xml
<index name="spy_sales_order-store-status">
    <index-column name="store"/>
    <index-column name="fk_oms_order_status"/>
</index>
```

{% info_block warningBox "Index column order matters" %}

In composite indexes, column order is critical. Place the most selective column (highest cardinality) first. For queries that filter on only the first column, the index can still be used.

{% endinfo_block %}

### Index anti-patterns

**Over-indexing:**

Too many indexes slow down INSERT, UPDATE, and DELETE operations. Each write operation must update all indexes on that table.

- Don't index every column "just in case"
- Remove unused indexes identified through database monitoring
- Avoid duplicate indexes (for example, separate indexes on columns A and B, plus a composite index on A+B)

**Indexing low-cardinality columns:**

Indexes on columns with few distinct values (for example, boolean flags, status with 3-4 values) are often inefficient:

```xml
<!-- Likely inefficient: only 2 possible values -->
<index name="spy_product-is_active">
    <index-column name="is_active"/>
</index>
```

Exception: Low-cardinality indexes can be useful when combined with high-cardinality columns in composite indexes.

### Monitoring index effectiveness

Use database query analysis tools to verify index usage:

**PostgreSQL:**

```sql
EXPLAIN ANALYZE
SELECT * FROM spy_sales_order
WHERE order_reference = 'DE--123';
```

Look for:
- `Index Scan` (good) vs `Seq Scan` (bad for large tables)
- Execution time and rows scanned

**MySQL:**

```sql
EXPLAIN
SELECT * FROM spy_sales_order
WHERE order_reference = 'DE--123';
```

Check the `type` column:
- `const`, `eq_ref`, `ref`: Using indexes efficiently
- `ALL`: Full table scan (needs optimization)

## Query optimization

Beyond indexes, query structure significantly impacts performance.

### Avoid SQL functions that prevent index usage

Using functions on indexed columns in WHERE clauses prevents index usage:

**Inefficient:**

```php
// DATE() function prevents index usage
$orders = SpySalesOrderQuery::create()
    ->where('DATE(created_at) = ?', '2025-01-15')
    ->find();
```

**Optimized:**

```php
// Use range comparison to leverage index
$orders = SpySalesOrderQuery::create()
    ->filterByCreatedAt(['min' => '2025-01-15 00:00:00', 'max' => '2025-01-15 23:59:59'])
    ->find();
```

**Other common function anti-patterns:**

- `LOWER(email) = 'user@example.com'` → Use case-insensitive collation or store lowercase
- `SUBSTRING(sku, 1, 3) = 'ABC'` → Use `LIKE 'ABC%'` or dedicated prefix column
- `YEAR(order_date) = 2025` → Use date range filtering

### Necessary JOINs and relationship loading

**The N+1 problem:**

Loading related entities in loops creates excessive queries. This is one of the most common performance issues:

```php
// ❌ Bad: N+1 queries
$orders = SpySalesOrderQuery::create()->find();
foreach ($orders as $order) {
    // Each iteration = 1 query
    $items = $order->getSpySalesOrderItems();
    foreach ($items as $item) {
        // Each iteration = 1 query per item
        $product = $item->getSpyProduct();
    }
}
// Total: 1 + N + (N * M) queries
```

**Solution: Use joinWith() to eager load relationships:**

```php
// ✅ Good: Single query with JOINs
$orders = SpySalesOrderQuery::create()
    ->joinWithSpySalesOrderItem()
    ->useSpySalesOrderItemQuery()
        ->joinWithSpyProduct()
    ->endUse()
    ->find();

foreach ($orders as $order) {
    $items = $order->getSpySalesOrderItems(); // Already loaded
    foreach ($items as $item) {
        $product = $item->getSpyProduct(); // Already loaded
    }
}
// Total: 1 query
```

For more details on batch processing and bulk operations, see [Batch processing of Propel entities](/docs/dg/dev/guidelines/performance-guidelines/performance-guidelines-batch-processing-propel-entities.html) and [Architecture performance guidelines](/docs/dg/dev/guidelines/performance-guidelines/architecture-performance-guidelines.html).

### GROUP BY and ORDER BY optimization

**GROUP BY performance:**

Grouping requires sorting data, which is expensive for large datasets:

```php
// Potentially slow on large tables
$orderCounts = SpySalesOrderQuery::create()
    ->groupByFkCustomer()
    ->withColumn('COUNT(*)', 'order_count')
    ->find();
```

**Optimizations:**

1. **Filter before grouping**: Reduce dataset size with WHERE clauses
2. **Index grouped columns**: Ensure columns in GROUP BY are indexed
3. **Pre-aggregate**: For frequently needed aggregations, maintain summary tables
4. **Limit grouped results**: Use HAVING to filter groups

**ORDER BY performance:**

Sorting large result sets is resource-intensive:

```php
// Expensive without proper index
$orders = SpySalesOrderQuery::create()
    ->orderByCreatedAt('DESC')
    ->find();
```

**Best practices:**

- Index columns used in ORDER BY
- Combine ORDER BY columns with WHERE clause columns in composite indexes
- Limit result set size before sorting
- For pagination, use cursor-based pagination instead of OFFSET

```php
// ✅ Good: Index-friendly pagination
$orders = SpySalesOrderQuery::create()
    ->filterByIdSalesOrder(['min' => $lastSeenId])
    ->orderByIdSalesOrder('ASC')
    ->limit(20)
    ->find();
```

## Controlling data volume

### Selecting only needed columns

Loading unnecessary columns wastes memory and network bandwidth:

```php
// ❌ Bad: Loads all columns including potentially large TEXT/BLOB fields
$products = SpyProductAbstractQuery::create()->find();

// ✅ Good: Select only needed columns
$products = SpyProductAbstractQuery::create()
    ->select(['IdProductAbstract', 'Sku', 'Attributes'])
    ->find();
```

**When to use select():**

- Reading thousands of records
- Tables with large TEXT, JSON, or BLOB columns
- Building API responses or exports
- Aggregation queries

### Limiting result sets

Always use pagination for user-facing queries:

```php
// ❌ Bad: Loading potentially millions of records
$allOrders = SpySalesOrderQuery::create()->find();

// ✅ Good: Paginate results
$orders = SpySalesOrderQuery::create()
    ->limit(50)
    ->offset($page * 50)
    ->find();
```

### Propel hydration and relationships

**Hydration overhead:**

Propel converts database rows into PHP objects (hydration). For large result sets, this consumes significant memory:

```php
// High memory usage: Creates PHP objects for all records
$orders = SpySalesOrderQuery::create()->find();

// Lower memory usage: Returns associative arrays
$orders = SpySalesOrderQuery::create()
    ->find(Propel::CONNECTION_READ)
    ->toArray();
```

**For bulk operations, use PDO directly:**

When processing tens of thousands of records, bypass Propel's ORM layer:

```php
// For data import/export or batch processing
$connection = Propel::getConnection();
$stmt = $connection->prepare('SELECT id_product, sku FROM spy_product WHERE is_active = 1');
$stmt->execute();

while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
    // Process row
}
```

See [Data import optimization guidelines](/docs/dg/dev/data-import/latest/data-import-optimization-guidelines.html) for comprehensive bulk processing strategies.

### Managing 1-to-Many and Many-to-Many relationships

**The aggregation problem:**

Loading all related records for many parent records causes memory issues:

```php
// ❌ Bad: Loads ALL items for ALL orders
$orders = SpySalesOrderQuery::create()
    ->joinWithSpySalesOrderItem()
    ->find();
// For 1000 orders with 10 items each = 10,000 item objects in memory
```

**Strategies:**

1. **Paginate parent records**: Process orders in batches
2. **Lazy load selectively**: Only load relationships when needed
3. **Count without loading**: Use `withColumn('COUNT(*)', 'item_count')` for counts
4. **Filter relationships**: Use `useXxxQuery()` to add conditions on related entities

```php
// Load only orders with specific item conditions
$orders = SpySalesOrderQuery::create()
    ->joinWithSpySalesOrderItem()
    ->useSpySalesOrderItemQuery()
        ->filterByFkOmsOrderItemStatus($statusId)
    ->endUse()
    ->find();
```

## Stored procedures

While stored procedures can improve performance by reducing network round trips, they introduce challenges in Spryker projects:

**Considerations:**

- **Portability**: Stored procedures are database-specific and complicate migrations between PostgreSQL and MySQL
- **Version control**: Harder to manage in git repositories alongside application code
- **Testing**: Difficult to unit test and mock in development environments
- **Debugging**: Limited debugging tools compared to PHP code
- **Deployment**: Require special deployment procedures and permissions

**Recommendations:**

1. **Avoid by default**: Prefer PHP-based solutions with proper query optimization
2. **Performance test thoroughly**: If using stored procedures, establish baselines:
   - Measure execution time under realistic load
   - Monitor database CPU and memory usage
   - Profile query counts and complexity
3. **Watch for hidden N+1 problems**: Ensure stored procedures don't execute hundreds/thousands of queries internally
4. **Document extensively**: Include performance benchmarks and maintenance procedures
5. **Have a migration path**: Plan how to refactor if performance degrades

**When stored procedures might be justified:**

- Complex aggregations requiring multiple passes over large datasets
- Legacy integration requirements
- Proven performance bottlenecks where all other optimizations have been exhausted

## Integer autoincrement ID overflow

PostgreSQL and MySQL use INTEGER types (32-bit) for autoincrement primary keys by default, which limits maximum values to approximately 2.1 billion. In high-transaction tables, this limit can be reached, causing application failures.

### Understanding the risk

High-volume tables at risk:
- `spy_sales_order_item` (one record per ordered product)
- `spy_oms_product_reservation` (order item state tracking)
- `spy_event_behavior_entity_change` (publish & sync events)
- `spy_queue` (message queue storage)
- Logging tables if stored in the database

### Symptoms of approaching overflow

When IDs approach 2,147,483,647:
- INSERT operations fail with "integer out of range" errors
- Application throws exceptions on order placement
- Queue processing stops
- New entity creation fails

### Prevention and remediation

For comprehensive solutions including migration to BIGINT and cleanup strategies, see [Database tables take up too much space or have ID overflow](/docs/dg/dev/troubleshooting/troubleshooting-general-technical-issues/database-tables-take-up-too-much-space-or-have-id-overflow.html#cause).

**Key preventive measures:**

1. **Use BIGINT for high-transaction tables**: When creating new tables or migrating existing ones
2. **Implement data retention policies**: Automatically purge old records from transient tables
3. **Monitor table growth rates**: Track ID increment velocity to predict overflow timeframes
4. **Regular capacity planning**: Review table sizes and ID usage quarterly

## Best practices summary

1. **Index strategically**: Create indexes on WHERE, JOIN, and ORDER BY columns, but avoid over-indexing
2. **Use eager loading**: Eliminate N+1 problems with `joinWith()` for related entities
3. **Avoid function anti-patterns**: Don't use SQL functions on indexed columns in WHERE clauses
4. **Limit data selection**: Use `select()` to load only needed columns and paginate results
5. **Batch write operations**: Use [ActiveRecordBatchProcessorTrait](/docs/dg/dev/guidelines/performance-guidelines/performance-guidelines-batch-processing-propel-entities.html) for bulk inserts/updates
6. **Optimize GROUP BY/ORDER BY**: Index grouped and sorted columns, filter before aggregating
7. **Monitor and test**: Use EXPLAIN ANALYZE to verify query performance
8. **Avoid stored procedures**: Unless thoroughly performance-tested and documented
9. **Monitor INT overflow**: Implement alerts and cleanup for high-transaction tables
10. **Use appropriate tools**: PDO for bulk processing, Propel for application logic

## Additional resources

- [Troubleshooting: N+1 problem](/docs/dg/dev/troubleshooting/troubleshooting-performance-issues/n+1-problem.html)
- [Data import optimization guidelines](/docs/dg/dev/data-import/latest/data-import-optimization-guidelines.html)
- [Propel documentation](http://propelorm.org/documentation/)
- [PostgreSQL Performance Tuning](https://www.postgresql.org/docs/current/performance-tips.html)
