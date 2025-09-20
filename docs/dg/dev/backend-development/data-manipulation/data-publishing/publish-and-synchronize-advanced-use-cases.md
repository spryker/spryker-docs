---
title: "Publish and synchronize: Advanced use cases"
description: Data synchronization in Spryker ensures consistent, high-performance data exchange across Redis, Elasticsearch, and databases. Learn how to re-publish data, optimize imports, handle error queues, and reduce event load.
last_updated: Jun 16, 2021
template: howto-guide-template
---

Data synchronization is essential for maintaining consistency and enabling seamless data exchange in distributed systems. Spryker addresses these challenges through its Publish & Synchronize (P&S) mechanism. This guide explains how P&S works and explores common scenarios where manual intervention or configuration may be required.

## Repeated export: re-publishing or re-synchronize data

In Spryker, the Glue API and Yves retrieve product information from Redis and Elasticsearch. After a product catalog update, the storefront may occasionally display outdated data. This typically happens when Redis and Elasticsearch are out of sync. In this case, you can use repeated export to sync data.

Repeated export is also helpful in scenarios such as the following:

- Search index rebuilding

- Data model structure changes

- Data corruption or inconsistencies

- When making direct changes to product data (not recommended), such as listings, prices, or availability

To resolve this, you can re-export published data, or manually trigger data re-publication.

For detailed steps, see [Re-synchronization and re-generation](/docs/dg/dev/backend-development/data-manipulation/data-publishing/publish-and-synchronize-re-synchronization-and-re-generation).

## Replacing key-value storage with a database


P&S creates expected data duplication: the same data is stored both in the database and key-value storage. In high-load scenarios, like B2C, where there is usually a large number of customers, such data duplication is necessary to ensure performance when processing requests. In B2B, where there is normally a huge amount of data and a smaller number of customers, the duplication penalty might not be justified.

To address this, you can use the StorageDatabase module, which replaces Redis with a read-only database connection and reduces duplication for large datasets.

For more information, see [Bypass the key-value storage](/docs/dg/dev/backend-development/data-manipulation/data-publishing/specific-use-cases-and-problem-solving/bypass-the-key-value-storage).

## Manually triggering publish in data import

During data import, an entity is often saved in multiple stages. In the following example, an entity is saved three times:

1. To generate a unique identifier

2. To save dependent entities using the identifier

3. To save the main entity with the complete data

If you rely on automatic event triggering in this scenario, the publish event for the main entity may be processed multiple times, which can lead to redundant operations or data inconsistencies.

To avoid this issue, you can [disable automatic event triggering](/docs/dg/dev/data-import/latest/data-import-optimization-guidelines.html#rules-for-publish-and-synchronize) and trigger the publish event manually after the full entity data is saved:

```bash
$this->eventFacade->trigger($eventName, TransferInterface $transfer);
```

This ensures updated data is propagated to all relevant systems. For implementation details, see the following docs:

- [Re-synchronization and re-generation](/docs/dg/dev/backend-development/data-manipulation/data-publishing/publish-and-synchronize-re-synchronization-and-re-generation)

- [Publish and Synchronization](/docs/dg/dev/backend-development/data-manipulation/data-publishing/publish-and-synchronization)

- [Data import configuration - Data import optimization guidelines](/docs/dg/dev/data-import/latest/data-import-optimization-guidelines.html#rules-for-publish-and-synchronize)

## Troubleshooting failed messages in error queues

During high-volume operations or parallel data import, some messages may fail and be redirected to error queues. This is commonly caused by exceeding the maximum message size or not meeting data dependencies.


image-20240103-004529.png


Monitoring error queues is critical for identifying and resolving synchronization issues. For more details, see [Messages are moved to error queues](/docs/dg/dev/troubleshooting/troubleshooting-general-technical-issues/troubleshooting-rabbitmq/messages-are-moved-to-error-queues.html).

### Messages stuck without errors

Messages remain in the Ready state and are not processed, even though no errors appear in CloudWatch

This may indicate that the responsible queue worker has stopped or the queue is misconfigured.

Review the queue status and ensure that the worker is running. For troubleshooting, see [Messages are stuck without error notifications](/docs/dg/dev/troubleshooting/troubleshooting-general-technical-issues/troubleshooting-rabbitmq/messages-are-stuck-without-error-notifications).

### Messages in unacknowledged state

If messages are stuck in the Unacknowledged (Unacked) state, they may not be fully consumed or the worker may be encountering issues mid-processing.

image-20240103-004741.png

Investigate worker logs and system resource usage to resolve this. For troubleshooting, see [Messages are stuck in the Unacked state](/docs/dg/dev/troubleshooting/troubleshooting-general-technical-issues/troubleshooting-rabbitmq/messages-are-stuck-in-the-unacked-state).

### Disabling RabbitMQ consumers

To temporarily stop queue processing - for maintenance, debugging, or system updates - you can disable RabbitMQ consumers by turning off the associated Jenkins jobs.

image-20240103-155613.png

For more information, see the following docs:

- [Console commands](/docs/dg/dev/backend-development/console-commands/console-commands.html)

- [Cronjobs](/docs/dg/dev/backend-development/cronjobs/cronjobs.html)

### Adding more event listeners

When building features like customer notifications, use event subscribers rather than embedding listeners in product modules. This allows for centralized listener management and easier maintenance and scaling.

Register your subscriber in the `EventDependencyProvider` to activate it. For instructions, see [Listening to events]().

### Accessing all queues

After a large import, re-sync, or during troubleshooting, it can be helpful to view all queues at once and monitor their consumption and any errors.

To inspect queues, open RabbitMQ in your browser and log in with your credentials. RabbitMQ address is `http://queue.<context>.local:15672/`.

Replace `<context>` with `demoshop`, `suite`, `b2b`, `b2c`, `spryker` based on your environment.


![]


For more information on queues, see [Queue](/docs/dg/dev/backend-development/data-manipulation/queue/queue.html).

### Reducing the number of emitted events

Emitting too many events can result in unnecessary duplication and performance issues. To reduce event load:

Ensure that a single publish event is emitted for each create or update operation, such as creating or updating the product.

In bulk operations, trigger publish events only once, after the final batch operation.

This minimizes overhead and keeps event processing efficient. 























































