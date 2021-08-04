---
title: Session Handlers
originalLink: https://documentation.spryker.com/v6/docs/session-handlers
redirect_from:
  - /v6/docs/session-handlers
  - /v6/docs/en/session-handlers
---

We provide a number of session handlers to work with different storages. By default, the demo-shop uses a locking Redis session handler for *Yves* and a non-locking Redis session handler for *Zed* in the development environment.

The following session handlers are currently available:

* File
* Couchbase
* MySql
* Redis
* Redis (locking)

You can easily create and add your own.

## Changing the Session Handler
Session handlers can be configured per environment using one of the configuration files in .`/config/Shared/.` It requires setting `\Spryker\Shared\Session\SessionConstants::YVES_SESSION_SAVE_HANDLER` to one of the supported session handlers:

* `\Spryker\Shared\SessionFile\SessionFileConfig::SESSION_HANDLER_FILE`

* `\Spryker\Shared\Session\SessionConfig::SESSION_HANDLER_COUCHBASE`

* `\Spryker\Shared\Session\SessionConfig::SESSION_HANDLER_MYSQL`

* `\Spryker\Shared\SessionRedis\SessionRedisConfig::SESSION_HANDLER_REDIS`

* `\Spryker\Shared\SessionRedis\SessionRedisConfig::SESSION_HANDLER_REDIS_LOCKING`

## Locked Sessions with Redis
Redis doesn't support locking mechanisms for storage keys out of the box. We provide a dedicated session handler that adds a locking strategy and prevents concurrent access to session data. While this strategy ensures data integrity, it comes at a cost.

## Concurrent Requests
The locking strategy will acquire an exclusive lock on the session as soon as the session data is read. This happens for each request while the application is bootstrapping. Since only one request can hold a lock to the same session at a time, concurrent access to this session will result in subsequent requests waiting to acquire a lock. This might not be desirable for concurrent AJAX requests that don't even require access to session data. To work around that issue it is possible to immediately close a session from a controller using [PHP's session_write_close()](http://php.net/manual/en/function.session-write-close.php). This will immediately close the session and release the lock.

## Performance
Checking locks, setting locks, and removing locks requires additional requests to Redis that might have an impact on performance. If performance is crucial and session data integrity violations can be handled, our Redis session handler doesn't lock and doesn't bring the overhead of handling locks. However, we highly recommend using the locking Redis session handler to keep the integrity of session data.

## Using a Cluster
The current locking strategy doesn't provide support for ensuring locks across a cluster of Redis nodes. Since Redis clusters for session storage are not very common and ensuring locks across a cluster involves even more requests to Redis, not yet supported.
