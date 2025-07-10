---
title: Performance Guidance -  Batch Processing Traits in Propel ORM
description: Learn how to optimize Propel ORM performance using ActiveRecordBatchProcessorTrait and CascadeActiveRecordBatchProcessorTrait for efficient batch processing, reduced database load, and support for complex entity relationships. Includes usage examples and best practices.
last_updated: Jun 20, 2025
template: concept-topic-template
related:
  - title: General performance guidelines
    link: docs/dg/dev/guidelines/performance-guidelines/general-performance-guidelines.html
---


## Prerequisites

[spryker/propel:^3.45.0](https://github.com/spryker/propel/releases/tag/3.45.0)

### ActiveRecordBatchProcessorTrait

ActiveRecordBatchProcessorTrait provides performance optimizations for database operations by enabling saving Propel entities in batches. This reduces database round trips improves overall performance, and solves the [N+1 problem](https://docs.spryker.com/docs/dg/dev/troubleshooting/troubleshooting-performance-issues/n+1-problem.html).

### Usage example

``` php
class EntityManager {
    use ActiveRecordBatchProcessorTrait;

    public function processItems(array $itemTransfers): void {

        $items = // Load or create all entities at once from database

        // Queue entities for batch processing
        foreach ($items as $item) {
            $this->persist($item);
        }

        // Save all collected entities in a single batch
        $this->commit();
    }
}
```

### Key methods

- `persist($entity)`: Adds an entity to the batch queue. Handles separation for insert and update operations.
- `commit()`: When this method is called, each type of database operation, such as insert and update, is executed within its own dedicated transaction:

For each failed operation, the corresponding transaction is rolled back, and an exception is thrown. This ensures data consistency and prevents partial writes in case of failure.

## CascadeActiveRecordBatchProcessorTrait

- Extends `ActiveRecordBatchProcessorTrait` by adding recursive cascade-saving functionality for related entities
- Helps manage complex entity relationships during batch processing
- Works with `BatchEntityPostSaveInterface`, which enables organizing `postSave` events for related entities in a batch-safe manner

### Usage example

```php
class AbstractSpySalesOrderItem extends BaseSpySalesOrderItem implements BatchEntityPostSaveInterface
{
    // properties re-declared protected to prevent their direct use out from an entity
    use CascadeActiveRecordBatchProcessorTrait {
        persist as protected;
        commit as protected;
        commitIdentical as protected;
    }
    public function batchPostSave(): void
    {
        if ($this->statusChanged && $this->getIdSalesOrderItem()) {
            /** @var \Orm\Zed\Sales\Persistence\SpySalesOrderItem $salesOrderItemEntity */
            $salesOrderItemEntity = $this;
            $omsOrderItemStateHistoryEntity = $this->createOmsOrderItemStateHistoryEntity();
            $omsOrderItemStateHistoryEntity->setOrderItem($salesOrderItemEntity);
            $omsOrderItemStateHistoryEntity->setFkOmsOrderItemState($this->getFkOmsOrderItemState());

            $this->sharedPersist($omsOrderItemStateHistoryEntity);
        }

        $this->statusChanged = false;
    }
}
```

With this implementation, the following code:

```php
class SalesEntityManager extends AbstractEntityManager implements SalesEntityManagerInterface
{
    public function updateOrCreateSalesOrderItems(array $salesOrderItemsData): void
    {
        // Use batch processor trait for efficient processing
        foreach ($salesOrderItemsData as $orderItemData) {
            // Find or create the sales order item
            $salesOrderItem = $this->findOrCreateSalesOrderItem($orderItemData);
    
            // Update item attributes
            $this->updateSalesOrderItemAttributes($salesOrderItem, $orderItemData);
    
            // Collect for batch processing
            $this->persist($salesOrderItem);
        }
    
        // Commit all collected items in a single batch operation
    $this->commit();
    }
}
```

Performs the following actions:
- Loads all required entities from the database in a single query.
- Creates or updates `salesOrderItem` entities in a single batch.
- Creates related `OrderItemStateHistoryEntity` instances during the post-save process execution (method `batchPostSave` declared by `BatchEntityPostSaveInterface`) and saves them in a single operation after the main entity save is complete.

## BatchEntityHooksInterface

BatchEntityHooksInterface enables `postSave` hooks, which are similar to publish and synchronize (P&S) events.

To ensure proper event handling during batch operations, the corresponding interface must be implemented for storage and search entities when used with `ActiveRecordBatchProcessorTrait` or `CascadeActiveRecordBatchProcessorTrait`. These traits don't automatically trigger P&S events for storage or search entities. Therefore, explicit implementation is required to handle such events correctly during batch processing.

### Usage example

```php
class AbstractSpyProductOfferStorage extends BaseSpyProductOfferStorage implements BatchEntityHooksInterface
{
    public function batchPreSaveHook(): void
    {
        if (method_exists($this, 'isSynchronizationEnabled') && $this->isSynchronizationEnabled()) {
            // synchronization behavior
            $this->setGeneratedKey();
            $this->setGeneratedKeyForMappingResource();
            $this->setGeneratedAliasKeys();
        }
    }

    public function batchPostSaveHook(): void
    {
        if (method_exists($this, 'isSynchronizationEnabled') && $this->isSynchronizationEnabled()) {
            // synchronization behavior
            $this->syncPublishedMessage();
            $this->syncPublishedMessageForMappingResource();
            $this->syncPublishedMessageForMappings();
        }
    }
```

When saving the `SpyProductOfferStorage` entity using `ActiveRecordBatchProcessorTrait`, the P&S event is triggered after the batch save completes.

## Limitations and Suggestions

- Entity ID access: `ActiveRecordBatchProcessorTrait` doesn't return entity IDs after saving. If you need the ID, perform a separate database query.

- Memory usage : The `$entityList` property stores entities in memory. To avoid memory issues, keep batch sizes reasonable and call `commit()` periodically.

- Insert limits : The trait doesn't enforce a limit on the number of entities you can insert in one operation. However, databases have limits on payload size. Use sensible chunk sizes.

- Update limits : The default update limit is 200 entities per batch. This is defined by `ActiveRecordBatchProcessorTrait::UPDATE_CHUNK_SIZE`. You can override this limit by extending the trait in your `EntityManager`.










































