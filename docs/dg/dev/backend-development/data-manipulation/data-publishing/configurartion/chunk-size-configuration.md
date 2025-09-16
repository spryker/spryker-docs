---
title: Chunk size configuration
description: Improve performance and stability in Spryker by using chunking for bulk operations. Configure chunk sizes for events and queues to optimize memory use, throughput, and resilience.
last_updated: Jun 16, 2025
template: howto-guide-template
---


Spryker uses chunking to manage large datasets during bulk operations, such as publishing events or sending messages to queues. Instead of sending all data at once, the system splits it into smaller chunks. This approach improves performance, reduces memory usage, and prevents timeouts or crashes during processing.

Chunking is primarily used in two scenarios:

- Event system: When triggering publish events

- Queue system: When sending messages to RabbitMQ or another queue provider

 
## Benefits of chunking

- Performance optimization: Processing multiple items in one go reduces the overhead associated with starting and stopping processes, establishing connections, or executing queries. This can lead to significantly higher throughput.

- Memory management: While processing more items at once might seem counterintuitive for memory, if done correctly–using batch inserts and updates, re-using database connections–it can be more memory-efficient than many individual operations. However, too large a chunk can cause memory exhaustion.

- Stability and resilience: In some cases, processing in smaller, manageable chunks can make the system more robust against transient errors or memory spikes, as a failure affects only a portion of the data, not the entire large dataset.


## Configure chunk size

Spryker provides constants to configure chunk sizes for different contexts, primarily for message queues and event processing.

### 1. Chunk size per queue

This configuration is used to define specific chunk sizes for different message queues. It's an associative array where keys are queue names and values are the desired integer chunk sizes.

You typically define or override this in your `config/Shared/config_default.php`.


```php
<?php
use Spryker\Shared\Queue\QueueConstants;
// ... other configurations
$config[QueueConstants::QUEUE_MESSAGE_CHUNK_SIZE_MAP] = [
    'publish' => 500, // Process 500 messages from 'order-create-queue' at once
    'publish.translation' => 100, 
    'publish.page_product_abstract' => 1000, 
    // Add more queue specific chunk sizes as needed
];
```

Queue names:


image-20250606-082702.png

For example, when a consumer runs for `publish`, it attempts to fetch and process up to 500 messages in a single execution cycle. This is useful when different queues contain messages of varying complexity or size, allowing for fine-grained control.

### 2. Event chunk size

This configuration defines a default or global chunk size for all event processing. Events in Spryker are often published to a queue and then processed by consumers that handle these events.

Similar to `QueueConstants`, this is typically set in `config/Shared/config_default.php`.


```php
<?php
use Spryker\Shared\Event\EventConstants;
// ... other configurations
// Defines the default chunk size for event processing if not overridden by a specific queue config
$config[EventConstants::EVENT_CHUNK] = 200;
```

This sets the number of events that a general event consumer will try to process in one go. If a specific event-related queue also has an entry in `QUEUE_MESSAGE_CHUNK_SIZE_MAP`, the more specific queue setting takes precedence for that particular queue.

## Calculate the right chunk size

There is no one-size-fits-all value. You should tune chunk size based on your system's parameters:

- Available memory
- CPU performance
- Storage and database latency
- Message size and complexity

### General guidelines

- Start with a safe value like `100-500`
- Monitor memory usage and processing time
- If memory usage is low and CPU idle, increase the chunk size
- If you hit memory limits or performance issues, reduce it

You can also profile processing time per chunk and adjust chunk size for maximum throughput without overloading the system.

### Default chunk size value

If no custom chunk size is defined, the system defaults to a chunk size of 500.

You can find the default values in the following constants within the core configuration:

```php
Spryker\Zed\Event\EventConfig::DEFAULT_EVENT_MESSAGE_CHUNK_SIZE
Spryker\Zed\Event\EventConfig::ENQUEUE_EVENT_MESSAGE_CHUNK_SIZE
```


