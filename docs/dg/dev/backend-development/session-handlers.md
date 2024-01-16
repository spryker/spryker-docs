---
title: Session handlers
description: We provide a number of session handlers to work with different storages- File, Couchbase, MySql, Redis, Redis (locking).
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/session-handlers
originalArticleId: 68ebf87c-9ddd-4b0a-8f81-93a229271e09
redirect_from:
  - /docs/scos/dev/back-end-development/session-handlers.html
related:
  - title: Session management
    link: docs/scos/dev/back-end-development/session-management.html
---

We provide a number of session handlers to work with different storages. By default, the demo-shop uses a locking Redis session handler for *Yves* and a non-locking Redis session handler for *Zed* in the development environment.

The following session handlers are currently available:

* File
* Couchbase
* MySql
* Redis
* Redis (locking)

You can easily create and add your own.

## Changing the session handler

Session handlers can be configured per environment using one of the configuration files in .`/config/Shared/.` It requires setting `\Spryker\Shared\Session\SessionConstants::YVES_SESSION_SAVE_HANDLER` to one of the supported session handlers:

* `\Spryker\Shared\SessionFile\SessionFileConfig::SESSION_HANDLER_FILE`
* `\Spryker\Shared\Session\SessionConfig::SESSION_HANDLER_COUCHBASE`
* `\Spryker\Shared\Session\SessionConfig::SESSION_HANDLER_MYSQL`
* `\Spryker\Shared\SessionRedis\SessionRedisConfig::SESSION_HANDLER_REDIS`
* `\Spryker\Shared\SessionRedis\SessionRedisConfig::SESSION_HANDLER_REDIS_LOCKING`

## Locked sessions with Redis

Redis doesn't support locking mechanisms for storage keys out of the box. We provide a dedicated session handler that adds a locking strategy and prevents concurrent access to session data. While this strategy ensures data integrity, it comes at a cost.

## Concurrent requests

The locking strategy acquires an exclusive lock on the session as soon as the session data is read. This happens for each request while the application is bootstrapping. Since only one request can hold a lock to the same session at a time, concurrent access to this session results in subsequent requests waiting to acquire a lock. This might not be desirable for concurrent AJAX requests that don't even require access to session data. To work around that issue, you can immediately close a session from a controller using [PHP's session_write_close()](http://php.net/manual/en/function.session-write-close.php). This immediately closes the session and releases the lock.

## Performance

Checking locks, setting locks, and removing locks require additional requests to Redis that might have an impact on performance. If performance is crucial, and session data integrity violations can be handled, our Redis session handler doesn't lock and doesn't bring the overhead of handling locks. However, we highly recommend using the locking Redis session handler to keep the integrity of session data.

## Using a cluster

The current locking strategy doesn't provide support for ensuring locks across a cluster of Redis nodes. Since Redis clusters for session storage are not very common and ensuring locks across a cluster involves even more requests to Redis, not yet supported.
