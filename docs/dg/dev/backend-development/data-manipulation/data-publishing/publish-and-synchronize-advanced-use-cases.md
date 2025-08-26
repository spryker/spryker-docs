---
title: "Publish and synchronize: Advanced use cases"
description: Data synchronization in Spryker ensures consistent, high-performance data exchange across Redis, Elasticsearch, and databases. Learn how to re-publish data, optimize imports, handle error queues, and reduce event load.
last_updated: Jun 16, 2021
template: howto-guide-template
---

Data synchronization is essential for maintaining consistency and enabling seamless data exchange in distributed systems. Spryker, a robust e-commerce platform, addresses these challenges through its Publish & Synchronize (P&S) mechanism. This guide explains how P&S works and explores common scenarios where manual intervention or configuration may be required.

## Repeated export: re-publishing or re-synchronize data

In Spryker, the Glue API and Yves retrieve product information from Redis and Elasticsearch. After a product catalog update, the storefront may occasionally display outdated data. This typically happens when Redis and Elasticsearch are out of sync.

Repeated export is also helpful in scenarios such as:

- Search index rebuilding

- Data model structure changes

- Data corruption or inconsistencies

- When making direct changes to product data (not recommended), such as listings, prices, or availability.

To resolve this, you can:

- Re-export published data, or

- Manually trigger data re-publication


For detailed steps, refer to the [Re-synchronization and re-generation](/docs/dg/dev/backend-development/data-manipulation/data-publishing/publish-and-synchronize-re-synchronization-and-re-generation).

## Replacing key-value storage with a database


Publish and Synchronize creates expected data duplication: the same data is stored both in the database and key-value storage. In high-load scenarios, like B2C, where there is usually a large number of customers, such data duplication is necessary to ensure performance when processing requests. In B2B, where there is normally a huge amount of data and a smaller number of customers, the duplication penalty is not justified.

To address this, you can use the StorageDatabase module, which:

- Replaces Redis with a read-only database connection

- Reduces duplication for large datasets

 


For more information, see [Bypass the key-value storage](/docs/dg/dev/backend-development/data-manipulation/data-publishing/bypass-the-key-value-storage).

## Manually triggering publish in data import

During data import, saving an entity often occurs in multiple stages. For example:

1. Save the entity to generate a unique identifier.

2. Save dependent entities using the identifier.

3. Save the main entity with the complete data.

If you rely on automatic event triggering in this scenario, the publish event for the main entity may be processed multiple times, which can lead to redundant operations or data inconsistencies.

To avoid this issue, you have a possibility to disable automatic event triggering - [Data import configuration - Data import optimization guidelines](/docs/dg/dev/data-import/latest/data-import-optimization-guidelines.html#rules-for-publish-and-synchronize) , and trigger the publish event manually after the full entity data is saved:


```
$this->eventFacade->trigger($eventName, TransferInterface $transfer);
```

This ensures updated data is propagated to all relevant systems. For implementation details, see:

[Re-synchronization and re-generation](/docs/dg/dev/backend-development/data-manipulation/data-publishing/publish-and-synchronize-re-synchronization-and-re-generation)

[Publish and Synchronization](/docs/dg/dev/backend-development/data-manipulation/data-publishing/publish-and-synchronization)

[Data import configuration - Data import optimization guidelines](/docs/dg/dev/data-import/latest/data-import-optimization-guidelines.html#rules-for-publish-and-synchronize)

## Troubleshooting failed messages in error queues

During high-volume operations or parallel data import, some messages may fail and be redirected to error queues. Common causes include:

Exceeding the maximum message size

Unmet data dependencies


image-20240103-004529.png
Monitoring error queues is critical for identifying and resolving synchronization issues. Learn more in [Messages are moved to error queues](/docs/dg/dev/troubleshooting/troubleshooting-general-technical-issues/troubleshooting-rabbitmq/messages-are-moved-to-error-queues.html)

### Messages stuck without errors
If messages remain in the Ready state and are not processed - even though no errors appear in CloudWatch - this may indicate that:

The responsible queue worker has stopped

The queue is misconfigured


Review the queue status and ensure that the worker is running. See Messages are stuck without error notifications | Spryker Documentation for troubleshooting steps.

### Messages in unacknowledged state

If messages are stuck in the Unacknowledged (Unacked) state:

They may not be fully consumed

The worker may be encountering issues mid-processing

image-20240103-004741.png
Investigate worker logs and system resource usage to resolve this. Refer to Messages are stuck in the Unacked state | Spryker Documentation  for more details.

### Disabling RabbitMQ consumers

To temporarily stop queue processing - for maintenance, debugging, or system updates - you can disable RabbitMQ consumers by turning off the associated Jenkins jobs.

image-20240103-155613.png

For more information, see:

[Console commands](/docs/dg/dev/backend-development/console-commands/console-commands.html)

[Cronjobs](/docs/dg/dev/backend-development/cronjobs/cronjobs.html)

### Adding more event Listeners

When building features like customer notifications, use event subscribers rather than embedding listeners in product modules. This allows:

Centralized listener management

Easier maintenance and scaling

 


Register your subscriber in the `EventDependencyProvider` to activate it. See [Listening to events]() for instructions.

### Accessing all queues

After a large import, re-sync, or during troubleshooting, it can be helpful to view all queues at once and monitor their consumption and any errors.

To inspect queues, open RabbitMQ in your browser and log in with your credentials. Navigate to: `http://queue.<context>.local:15672/`

Replace `<context>` with `demoshop`, `suite`, `b2b`, `b2c`, `spryker` based on your environment.

See [Queue](/docs/dg/dev/backend-development/data-manipulation/queue/queue.html) for more information.

### Reducing the number of emitted events

Emitting too many events can result in unnecessary duplication and performance issues. To reduce event load:

Ensure that a single publish event is emitted for each create or update operation (like creating or updating the product).

In bulk operations, trigger publish events only once, after the final batch operation.

This minimizes overhead and keeps event processing efficient. 























































