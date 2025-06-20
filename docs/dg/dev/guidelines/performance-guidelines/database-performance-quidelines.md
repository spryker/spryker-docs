---
title: Performance Guidance -  Batch Processing Traits in Propel ORM
description: Learn how to optimize Propel ORM performance using ActiveRecordBatchProcessorTrait and CascadeActiveRecordBatchProcessorTrait for efficient batch processing, reduced database load, and support for complex entity relationships. Includes usage examples and best practices.
last_updated: Jun 20, 2025
template: concept-topic-template
related:
  - title: General performance guidelines
    link: docs/dg/dev/guidelines/performance-guidelines/general-performance-guidelines.html
---

## Performance Guidance: Batch Processing Traits in Propel ORM

### Prerequirements
Update your Propel package to the: [spryker/propel:^3.45.0](https://github.com/spryker/propel/releases/tag/3.45.0)

### ActiveRecordBatchProcessorTrait
- This trait provides performance optimizations for database operations by allowing you to save Propel entities in batches.
- It enables saving multiple records in a single operation, helping to resolve the - https://docs.spryker.com/docs/dg/dev/troubleshooting/troubleshooting-performance-issues/n+1-problem.html
- It reduces database round trips and improves overall performance.

#### Basic Usage Example:
``` php
class EntityManager {
    use ActiveRecordBatchProcessorTrait;

    public function processItems(array $itemTransfers): void {
        // Load or create all entities at once
        $items = $this->findOrCreateEntities($itemTransfers);

        // Queue entities for batch processing
        foreach ($items as $item) {
            $this->persist($item);
        }

        // Save all collected entities in a single batch
        $this->commit();
    }
}
```
#### Key Methods:
- `persist($entity)`: Adds an entity to the batch queue. Handles separation for insert and update operations.
- `commit()`: Commits all queued entities to the database in a single batch.

### CascadeActiveRecordBatchProcessorTrait
- Extends `ActiveRecordBatchProcessorTrait` by adding recursive cascade-saving functionality for related entities. 
- Helps manage complex entity relationships during batch processing. 
- Works with `BatchEntityPostSaveInterface`, which enables organizing `postSave` events for related entities in a batch-safe manner.

#### Basic Usage Example:

```php
class AbstractSpySalesOrderItem extends BaseSpySalesOrderItem implements BatchEntityPostSaveInterface
{
    // properties re-declared protected to prevent their direct use from an entity
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
public function updateOrCreateSalesOrderItems(array $salesOrderItemsData): vois
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
```

Performs the following actions:
- Loads all required entities from the database in a single query.
- Creates or updates `salesOrderItem` entities in a single batch. 
- Creates related `OrderItemStateHistoryEntity` instances during the post-save process and saves them in a single operation after the main entity save is complete.

### BatchEntityHooksInterface
- Enables `postSave` hooks similar to publish-and-synchronize (P&S) events.
- Should be implemented for storage and search entities to ensure proper event handling during batch operations.

#### Basic Usage Example:

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
```
When saving the `SpyProductOfferStorage` entity using `ActiveRecordBatchProcessorTrait`, the P&S event is triggered after the batch save completes.

#### Limitations and Suggestions:
Limitations and Recommendations
1. **Entity ID Access**: The `ActiveRecordBatchProcessorTrait` does not return entity IDs after saving. If you need the ID, perform a separate database query.

2. **P&S Event Compatibility**: `ActiveRecordBatchProcessorTrait` does not trigger publish-and-synchronize events for storage or search entities. Always implement `BatchEntityHooksInterface` for each such entity.

3. **Memory Usage**: The `$entityList` property stores entities in memory. To avoid memory issues, keep batch sizes reasonable and call `commit()` periodically.

4. **Insert Limits**: The trait does not enforce a limit on the number of entities you can insert in one operation. However, databases have limits on payload size. Use sensible chunk sizes.

5. **Update Limits**: The default update limit is 200 entities per batch. This is defined by `ActiveRecordBatchProcessorTrait::UPDATE_CHUNK_SIZE`. You can override this limit by extending the trait in your `EntityManager`.
