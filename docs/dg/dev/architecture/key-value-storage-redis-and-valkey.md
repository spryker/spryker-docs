---
title: "Key-value storage: Redis and Valkey"
description: This document explains the differences between Redis and Valkey, their compatibility, and the benefits of Valkey migration in Spryker Commerce OS.
last_updated: Dec 30, 2024
template: concept-topic-template
related:
  - title: Technology stack
    link: docs/dg/dev/architecture/technology-stack.html
  - title: Conceptual overview
    link: docs/dg/dev/architecture/conceptual-overview.html
---

Spryker uses key-value storage for caching and data storage to provide high-performance data access. Redis and Valkey are supported as key-value storage systems.

Key-value storage is a type of NoSQL database that stores data as key-value pairs. In Spryker, it's used as follows:

- A client-side data source for localized content such as translations and region-specific data
- A high-performance cache to reduce database queries and improve response times
- Storage for session data and temporary data structures
- A mechanism for data sync across distributed systems

The key-value database keeps data in sync with the SQL database through the [Publish & Synchronize](/docs/dg/dev/backend-development/data-manipulation/data-publishing/publish-and-synchronization.html) system and supports replication for scalability.


## Redis and Valkey

Redis is an open-source, in-memory data structure store used as a database, cache, and message broker.

Valkey is a high-performance data store forked from the Redis 7.2.4. It is a Linux Foundation project that maintains full compatibility with the Redis protocols and APIs. Valkey emerged as a response to the Redis's licensing changes and is backed by major technology companies including AWS, Google Cloud, Oracle, Snap Inc., OVH, and Percona.

For more information on Valkey benefits, see [Valkey Turns One: How the Community Fork Left Redis in the Dust](https://www.gomomento.com/blog/valkey-turns-one-how-the-community-fork-left-redis-in-the-dust/).


## Compatibility between Redis and Valkey

Valkey maintains 100% compatibility with the Redis protocols, APIs, and data structures:

- Existing Redis clients work seamlessly with Valkey
- Redis commands and syntax remain unchanged
- Data migration from the Redis to Valkey is straightforward
- Applications built for Redis require no code changes

In Spryker, configuration parameters maintain their Redis naming convention even when using Valkey. Example:

```php
// Configuration still uses REDIS naming for historical compatibility
$config[StorageConstants::STORAGE_REDIS_PROTOCOL] = 'tcp';
$config[StorageConstants::STORAGE_REDIS_HOST] = '127.0.0.1';
$config[StorageConstants::STORAGE_REDIS_PORT] = 6379;
```

This naming convention is preserved to ensure backward compatibility and avoid breaking changes in existing projects.

## Benefits of Valkey

Performance boost: Valkey introduces advanced multi-threading capabilities. In our internal tests, we've observed up to five times higher throughput for write operations with Valkey, alongside more stable latencies for other operations. This means data can be processed and served quicker, allowing your application to handle more simultaneous connections and deliver a faster experience, especially during peak traffic periods.

Enhanced scalability and reliability: With Valkey's improved cluster failover mechanisms and superior scaling capabilities, your project is better equipped to support larger workloads and complex use cases as your business grows.

Efficiency: Valkey is designed for better memory efficiency, which can contribute to optimized resource utilization and overall system performance.

## Redis versus Valkey

Redis 6.2 reached its end-of-life and it no longer receives security patches. Migrating to Valkey restores ongoing maintenance and vital security updates while offering a simple BSD 3 license. This contrasts with the Redis's more recent complex triple licensing model: RSALv2, SSPLv1, AGPLv3.

## Migration from Redis to Valkey

### Code references

Throughout Spryker's codebase, Redis is referenced in the following components:

- Configuration constants–for example, `StorageConstants::STORAGE_REDIS_*`
- Module names and class names
- Comments and documentation
- Method names and variable names

These naming conventions are intentionally preserved for backward compatibility. Whether you're using the Redis or Valkey as your underlying key-value store, Spryker application interfaces remain consistent.

### Data structure and operations

Both Redis and Valkey support the same data structures used by Spryker:

- Strings for simple key-value pairs
- Hashes for storing objects
- Lists for ordered collections
- Sets for unique collections
- Sorted sets for scored collections

All Redis commands used by Spryker, such as GET, SET, or MGET, work identically with Valkey.

### Migration considerations

- No application code changes required - Spryker applications function without modification.  
- Configuration remains the same - Use the existing Redis configuration parameters.  
- Data compatibility - You can load existing Redis data dumps into Valkey.  
- Monitoring and tooling - Most Redis monitoring tools are compatible with Valkey.  



