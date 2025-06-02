---
title: Redis session lock
description: Handling sessions locks
template: troubleshooting-guide-template
last_updated: Sep 28, 2024
---

A session lock is used to prevent multiple processes belonging to a single user's session from accessing or modifying session data at the same time. This ensures data integrity and consistency, helps avoid race conditions and data corruption in high-concurrency environments.

While a user's session is being accessed by a process, other processes of the same user's session can't access it; the session is *locked*.

The handler is configured as follows:
```php
// config/Shared/config_default.php
$config[SessionConstants::YVES_SESSION_SAVE_HANDLER] = SessionRedisConfig::SESSION_HANDLER_REDIS_LOCKING;
```

If a process can't lock the session, it tries to acquire it by using a *spinlock* strategy. It waits for 0.01 seconds by default and then retries acquiring a lock to the session. The retry timeout is configured as follows:
```php
// config/Shared/config_default.php
$config[SessionRedisConstants::LOCKING_RETRY_DELAY_MICROSECONDS] = 50000; // only values greater than zero will be applied
```

These attempts continue until the timeout, which is 10 seconds by default or 80% of `max_execution_time` if it's set. The timeout is configured as follows:
```php
// config/Shared/config_default.php
$config[SessionRedisConstants::LOCKING_TIMEOUT_MILLISECONDS] = 10000; // only values greater than zero will be applied
```

## Situations that can cause session lock issues

- Users clicking fast, especially in the app that allows activating multiple parallel requests.
- Interrupted requests without respective lock released; caused by connection being aborted manually or because of network issues.
- Long-running or slow-performing concurrent requests that have to deal with the session.
- Bots running many parallel requests.
- DDoS or DoS attacks.

## Symptoms

Some actions, parts of the website, or the entire website is slow. You may encounter 5XX errors, gateway timeouts, and customer-facing errors.
Depending on the extent of the issue, the application's frontend might be partially or fully inaccessible.

Logs contain the following exceptions:
`Spryker\Shared\SessionRedis\Handler\Exception\LockCouldNotBeAcquiredException`

Using AWS Log Insights, you can search for this exception with the following query:

```bash
fields @timestamp, @message, @logStream, @log
| filter @message like /LockCouldNotBeAcquiredException/
| sort @timestamp desc
| limit 10000
```

Search for the exception using a NewRelic query:

```sql
SELECT duration, errorMessage FROM Transaction SINCE 7 days ago ORDER BY duration DESC LIMIT MAX;
```

## Redis session locking exceptions

Redis Session Locking exceptions are an application-level challenge that can be resolved on the project level because a universal solution doesn't exist.
It's impossible to mitigate `LockCouldNotBeAcquiredExecption` on the infrastructure level, for example, by increasing CPU or memory resources. To make sure an application reaches expected scaling targets, during performance and load testing, take into account the scaling challenges described in this document.

The following sections describe how requests are processed, how the Redis Session Locking mechanism is implemented, and under what circumstances scaling challenges can arise.

### php fpm worker configuration

When incoming requests come through the frontend application, PHP-FPM workers in a pool are available to handle them. These workers are allowed to try to fulfill the request within some constraints:
`max_execution_time`
  The process gets killed if it takes too long to finish. This make sure the application isn't "blocked" for too long in case a process can't complete successfully.
`memory_limit`
  The process gets killed if it consumes more memory than the memory limit configured for each PHP process.
`max_children`
  If a request comes in, and no workers are available, new children workers are spawned until the maximum number of children is reached. Once reached, the request lifetime counts down until timeout, waiting for a worker to become available.

### The scaling challenge

If your application heavily relies on information in Redis sessions, your PHP-FPM workers will regularly lock sessions. If they acquire information quickly and release the lock promptly, subsequent incoming requests find free workers that can acquire session locks again. However, if there're delays in session lock release, the session can remain locked for an extended period. For example, this can be caused by temporarily unavailable or delayed third-party systems used to synchronously retrieve session information; or by excessive GET/SET operations against Redis. New requests cause new child processes to spawn. If child workers also have to do the expensive session work, this quickly leads to the max children count being reached. At this point, service degradation is almost inevitable and the outcome depends on which timeout is reached first.

## Solution
Regularly scan your APM for Session Lock exceptions, as well as your application logs for warnings related to PHP max children count. The former provides definitive evidence that action is needed, while the latter shows that the PHP-FPM worker pool might not be keeping up with incoming requests and their average processing time. If your APM supports it, consider configuring alerts for these events.

### Upgrade to the latest version

1. Upgrade `spryker/session` to version `^4.17.0`.

2. Update `Pyz\Yves\EventDispatcher\EventDispatcherDependencyProvider` as follows:

```php
namespace Pyz\Yves\EventDispatcher;

use Spryker\Yves\Session\Plugin\EventDispatcher\SaveSessionEventDispatcherPlugin;

class EventDispatcherDependencyProvider extends SprykerEventDispatcherDependencyProvider
{
    protected function getEventDispatcherPlugins(): array
    {
        $plugins = [
            // ...
            new SaveSessionEventDispatcherPlugin(),
        ];

        return $plugins;
    }
```

### Increase php worker pool size
Ensure you have a sufficient pool of PHP-FPM workers defined. You can configure the php-fpm max_children count for each application part in your [deploy.yml](/docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file-reference.html#groups-applications) file.

### Optimize external calls
Evaluate if you can combine Redis operations—for example, by using MGET. In general, try to reduce Redis calls in sessions as much as possible. Work with asynchronous calls to external systems where possible and handle failures to reach them gracefully.

### Optimize timeouts
Work with short timeouts and avoid increasing them above industry standards or defaults. Setting a long `max_execution_time` may exacerbate the issue if a process can't finish successfully because of outages or other errors. It can quickly introduce a single point of failure to your application.

### Evalaute architecture performance guidelines
Explore [architecture performance guidelines](/docs/dg/dev/guidelines/performance-guidelines/architecture-performance-guidelines.html#general-performance-challenges-in-architecture-design) to improve the performance and responsiveness of your application. Ensuring requests are fulfilled as quickly as possible significantly enhances the application's scalability.

### Leverage APIs
Headless scenarios aren't usually impacted by Session Locking challenges. Evaluate if you can adjust calls that would normally target Yves to target APIs instead.

### Disabling session locking

You can disable session locking but only after thoroughly assessing the risks and implementing necessary safeguards. For optimal performance, data integrity, and customer experience, we strongly recommend keeping session locks enabled and focusing on optimizing lock management and application performance.

This approach optimistically assumes that there will be no concurrent requests from the client, which could otherwise cause session data inconsistencies. For example, this might occur if products are simultaneously added to cart from multiple browser tabs.

Session locking is disabled as follows:
```php
// config/Shared/config_default.php
$config[SessionConstants::YVES_SESSION_SAVE_HANDLER] = SessionRedisConfig::SESSION_HANDLER_REDIS;
```

### Configurable Session Lock Handler

Use `SessionRedisConfig::SESSION_HANDLER_CONFIGURABLE_REDIS_LOCKING`, which allows enabling or disabling Redis locking based on your configuration.

```bash
composer require spryker/session-redis:"^1.10.0" --update-with-dependencies
```

```php
namespace Pyz\Yves\Session;

use Spryker\Yves\Session\SessionDependencyProvider as SprykerSessionDependencyProvider;
use Spryker\Yves\SessionRedis\Plugin\Session\SessionHandlerRedisProviderPlugin;
use Spryker\Yves\SessionRedis\Plugin\Session\SessionHandlerConfigurableRedisLockingProviderPlugin;


class SessionDependencyProvider extends SprykerSessionDependencyProvider
{
    protected function getSessionHandlerPlugins(): array
    {
        return [
            new SessionHandlerRedisProviderPlugin(),
            new SessionHandlerConfigurableRedisLockingProviderPlugin(), // !!! replace `SessionHandlerRedisLockingProviderPlugin`
        ];
    }
}
```

**config/Shared/config_default.php**

```php
<?php

use Spryker\Shared\Session\SessionConstants;
use Spryker\Shared\SessionRedis\SessionRedisConfig;

// ---------- Session
$config[SessionConstants::YVES_SESSION_SAVE_HANDLER] = SessionRedisConfig::SESSION_HANDLER_CONFIGURABLE_REDIS_LOCKING;
$config[SessionRedisConstants::YVES_SESSION_TIME_TO_LIVE] = SessionConfig::SESSION_LIFETIME_1_HOUR;
```

```php
namespace Pyz\Yves\SessionRedis;

use Spryker\Yves\SessionRedis\Plugin\SessionRedisLockingExclusion\BotSessionRedisLockingExclusionConditionPlugin;
use Spryker\Yves\SessionRedis\Plugin\SessionRedisLockingExclusion\UrlSessionRedisLockingExclusionConditionPlugin;
use Spryker\Yves\SessionRedis\SessionRedisDependencyProvider as SprykerSessionRedisDependencyProvider;

class SessionRedisDependencyProvider extends SprykerSessionRedisDependencyProvider
{
    /**
     * @return array<\Spryker\Yves\SessionRedisExtension\Dependency\Plugin\SessionRedisLockingExclusionConditionPluginInterface>
     */
    protected function getSessionRedisLockingExclusionConditionPlugins(): array
    {
        return [
            new UrlSessionRedisLockingExclusionConditionPlugin(),
            new BotSessionRedisLockingExclusionConditionPlugin(),
        ];
    }
}
```

### Lock TTL configuration

Time-To-Live (TTL) parameter is a safeguard used to instruct Redis or other storage to remove the lock if an application wasn't able to do it.
- Application locks a session at the beginning of a request.
- Application unlocks a session at the end of a request as follows:
  - In a TERMINATE event after sending content, all versions.
  - In a RESPONSE event before sending content, newer versions.
- If a request fails with a fatal error or any other exception that results in those events not being triggered, Redis removes the lock based on the TTL parameter.
- If TTL is smaller than the execution time of a long-running request, Redis unlocks it before the app. If the TTL is bigger than the execution time, the app unlock it on event.

By default, TTL is 20000 (20 seconds) or equal to `max_execution_time` if it's set. If `max_execution_time` is set to 120 seconds, TTL is 120 seconds as well. TTL is configured as follows:
```php
// config/Shared/config_default.php
$config[SessionRedisConstants::LOCKING_LOCK_TTL_MILLISECONDS] = 10000; // only values greater than zero will be applied
```
{% info_block warningBox "" %}

Reducing the lock TTL too much can result in side effects similar to having no lock at all and should only be done after thoroughly assessing the risks.

{% endinfo_block %}

### Traffic control

To mitigate issues with session locks caused by high traffic or automated bot activity, you can use [AWS WAF Bot Control](https://docs.aws.amazon.com/waf/latest/developerguide/waf-bot-control.html).
