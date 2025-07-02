---
title: Key-value storage - Redis and Valkey
description: This document explains the differences between Redis and Valkey, their compatibility, and the benefits of Valkey migration in Spryker Commerce OS.
last_updated: Dec 30, 2024
template: concept-topic-template
related:
  - title: Technology stack
    link: docs/dg/dev/architecture/technology-stack.html
  - title: Conceptual overview
    link: docs/dg/dev/architecture/conceptual-overview.html
---

Spryker Commerce OS uses a key-value storage system for caching and data storage to provide high-performance data access. This system has traditionally been based on Redis, but Spryker now supports both Redis and Valkey as compatible key-value storage solutions.

## What is key-value storage?

Key-value storage is a type of NoSQL database that stores data as key-value pairs. In Spryker, this storage system serves as:

- A client-side data source for localized content
- A high-performance cache to avoid costly SQL database queries
- Storage for session data and temporary data structures
- A mechanism for data synchronization across distributed systems

The key-value database keeps data in sync with the SQL database through specialized cronjobs and supports replication for scalability.

## Redis vs Valkey

### What is Redis?

Redis (Remote Dictionary Server) is an open-source, in-memory data structure store used as a database, cache, and message broker. It has been the traditional key-value storage solution in Spryker Commerce OS.

### What is Valkey?

Valkey is a high-performance data store forked from the Redis 7.2.4. It was created as a Linux Foundation project and maintains full compatibility with the Redis protocols and APIs. Valkey emerged as a response to the Redis's licensing changes and is backed by major technology companies including AWS, Google Cloud, Oracle, Snap Inc., OVH, and Percona.

### Compatibility between Redis and Valkey

**Full Protocol Compatibility**: Valkey maintains 100% compatibility with the Redis protocols, APIs, and data structures. This means:

- Existing Redis clients work seamlessly with Valkey
- Redis commands and syntax remain unchanged
- Data migration from the Redis to Valkey is straightforward
- Applications built for Redis require no code changes

**Configuration Compatibility**: In Spryker, configuration parameters maintain their Redis naming convention even when using Valkey. For example:

```php
// Configuration still uses REDIS naming for historical compatibility
$config[StorageConstants::STORAGE_REDIS_PROTOCOL] = 'tcp';
$config[StorageConstants::STORAGE_REDIS_HOST] = '127.0.0.1';
$config[StorageConstants::STORAGE_REDIS_PORT] = 6379;
```

This naming convention is preserved to ensure backward compatibility and avoid breaking changes in existing Spryker installations.

## Benefits of Valkey

### Performance Boost

Valkey introduces advanced multi-threading capabilities. In our internal tests, we've observed up to 5x higher throughput for write operations with Valkey, alongside more stable latencies for other operations. This means data can be processed and served quicker, allowing your application to handle more simultaneous connections and deliver a faster experience, especially during peak traffic periods.

### Enhanced Scalability & Reliability

With Valkey's improved cluster failover mechanisms and superior scaling capabilities, your Spryker platform will be even better equipped to support larger workloads and complex use cases as your business grows.

### Improved Efficiency

Valkey is designed for better memory efficiency, which can contribute to optimized resource utilization and overall system performance.

### Continued Security Patches, Simplified Licensing, and Strong Long-Term Support

The version of Redis currently in use (6.2) has reached its end-of-life, meaning it no longer receives security patches. Migrating to Valkey not only restores ongoing maintenance and vital security updates but also offers a clear and simple BSD 3 license. This contrasts with the Redis's more recent complex triple licensing model (RSALv2, SSPLv1, AGPLv3). Valkey is a Linux Foundation project and enjoys broad industry backing from major tech leaders including AWS, Google Cloud, Oracle, Snap Inc., OVH, and Percona, ensuring robust long-term support and continuous innovation. This move future-proofs a critical component of your infrastructure.

## Technical implementation in Spryker

### Code references

Throughout Spryker's codebase, you'll encounter references to "Redis" in:

- Configuration constants (e.g., `StorageConstants::STORAGE_REDIS_*`)
- Module names and class names
- Comments and documentation
- Method names and variable names

These naming conventions are intentionally preserved for backward compatibility. Whether you're using the Redis or Valkey as your underlying key-value store, the Spryker application interfaces remain consistent.

### Data structure and operations

Both Redis and Valkey support the same data structures used by Spryker:

- Strings for simple key-value pairs
- Hashes for storing objects
- Lists for ordered collections
- Sets for unique collections
- Sorted sets for scored collections

All Redis commands used by Spryker (GET, SET, HGET, HSET, LPUSH, LPOP, SADD, ZADD, etc.) work identically with Valkey.

### Migration considerations

When migrating from the Redis to Valkey:

1. **No application code changes required** - Spryker applications continue to work without modification
2. **Configuration remains the same** - Use existing Redis configuration parameters
3. **Data compatibility** - Existing Redis data dumps can be loaded into Valkey
4. **Monitoring and tooling** - Most Redis monitoring tools work with Valkey

## Additional resources

You can read about further Valkey benefits in this dedicated article: [Valkey Turns One: How the Community Fork Left Redis in the Dust](https://www.gomomento.com/blog/valkey-turns-one-how-the-community-fork-left-redis-in-the-dust/)

## Summary

Spryker Commerce OS supports both Redis and Valkey as key-value storage solutions. While maintaining full backward compatibility with the Redis, Valkey offers significant performance improvements, enhanced reliability, better licensing terms, and long-term support. The transition to Valkey is seamless due to its protocol-level compatibility with the Redis, ensuring that existing Spryker installations can benefit from these improvements without breaking changes.
