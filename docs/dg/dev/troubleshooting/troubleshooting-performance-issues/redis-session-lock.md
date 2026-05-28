---
title: Redis session lock
description: Understand and resolve Redis session lock issues in Spryker applications.
template: troubleshooting-guide-template
last_updated: May 28, 2026
redirect_from:
  - /docs/dg/dev/guidelines/performance-guidelines/session-locks.html
  - /docs/dg/dev/troubleshooting/troubleshooting-general-technical-issues/session-locking-issues.html
---

A session lock prevents multiple processes of a single user's session from accessing or modifying session data at the same time. This ensures data integrity and consistency and helps avoid race conditions and data corruption in high-concurrency environments.

While a user's session is being accessed by a process, other processes of the same user's session cannot access it—the session is *locked*.

## How session locking works

By default, Spryker uses a locking session handler:

```php
// config/Shared/config_default.php
$config[SessionConstants::YVES_SESSION_SAVE_HANDLER] = SessionRedisConfig::SESSION_HANDLER_REDIS_LOCKING;
```

If a process cannot lock the session, it uses a *spinlock* strategy: it waits and retries acquiring the lock. The default retry delay is 0.01 seconds:

```php
// config/Shared/config_default.php
$config[SessionRedisConstants::LOCKING_RETRY_DELAY_MICROSECONDS] = 50000; // only values greater than zero will be applied
```

Retry attempts continue until the timeout, which is 10 seconds by default, or 80% of `max_execution_time` if it is set:

```php
// config/Shared/config_default.php
$config[SessionRedisConstants::LOCKING_TIMEOUT_MILLISECONDS] = 10000; // only values greater than zero will be applied
```

The lock has a Time-To-Live (TTL) parameter that instructs Redis to remove the lock if the application cannot do it—for example, after a fatal error. The default TTL is 20000 ms (20 seconds), or equal to `max_execution_time` if it is set.

The lock lifecycle is as follows:
- The application locks the session at the beginning of a request.
- The application unlocks the session at the end of a request:
  - In a TERMINATE event after sending content, all versions.
  - In a RESPONSE event before sending content, newer versions.
- If a request fails with a fatal error or an exception that prevents those events from triggering, Redis removes the lock based on the TTL.
- If TTL is smaller than the execution time of a long-running request, Redis removes the lock before the application does.

```php
// config/Shared/config_default.php
$config[SessionRedisConstants::LOCKING_LOCK_TTL_MILLISECONDS] = 10000; // only values greater than zero will be applied
```

{% info_block warningBox "" %}

Reducing the lock TTL too much can result in side effects similar to having no lock at all. Only do this after thoroughly assessing the risks.

{% endinfo_block %}

## Causes

- Users clicking fast, especially in applications that allow multiple parallel requests.
- Interrupted requests without the lock being released—caused by the connection being aborted manually or by network issues.
- Long-running or slow-performing concurrent requests that access the session.
- Bots running many parallel requests.
- DDoS or DoS attacks.

## Symptoms

Some actions, parts of the website, or the entire website is slow. You may encounter 5XX errors, gateway timeouts, and customer-facing errors. Depending on the extent of the issue, the application's frontend may be partially or fully inaccessible.

Logs contain the following exception:

`Spryker\Shared\SessionRedis\Handler\Exception\LockCouldNotBeAcquiredException`

## Diagnose the issue

Search for the exception in AWS Log Insights:

```bash
fields @timestamp, @message, @logStream, @log
| filter @message like /LockCouldNotBeAcquiredException/
| sort @timestamp desc
| limit 10000
```

Search for the exception in New Relic:

```sql
SELECT duration, errorMessage FROM Transaction SINCE 7 days ago ORDER BY duration DESC LIMIT MAX;
```

Also monitor your application logs for warnings about the PHP `max_children` count. PHP-FPM workers operate under the following constraints:

- `max_execution_time`: the process is killed if it takes too long to finish.
- `memory_limit`: the process is killed if it consumes more memory than the configured limit.
- `max_children`: when no workers are available, new child workers are spawned until the maximum count is reached. After that, incoming requests wait for a free worker until they time out.

If your application heavily relies on Redis session data, workers regularly lock sessions. When there are delays in releasing those locks—for example, because of slow third-party calls or excessive Redis GET/SET operations—new requests trigger more child processes. If those child workers also perform expensive session work, the `max_children` limit is reached quickly, making service degradation almost inevitable.

Regularly scan your APM for session lock exceptions and your application logs for `max_children` warnings. If your APM supports it, configure alerts for these events.

## Solutions

Session lock exceptions are an application-level challenge without a universal solution. Increasing CPU or memory resources does not resolve `LockCouldNotBeAcquiredException`. Factor in these scaling challenges during performance and load testing.

### Upgrade to the latest version

1. Upgrade `spryker/session` to version `^4.17.0`.

2. Update `Pyz\Yves\EventDispatcher\EventDispatcherDependencyProvider`:

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

### Configure the session handler

Spryker provides three session handler options:

| Handler | Behavior |
|---|---|
| `SESSION_HANDLER_REDIS` | Does not lock sessions. |
| `SESSION_HANDLER_REDIS_LOCKING` | Locks all sessions for all requests. |
| `SESSION_HANDLER_CONFIGURABLE_REDIS_LOCKING` | Selectively bypasses locking based on plugins. The first plugin that returns `true` wins. |

#### Configurable session handler (recommended)

The configurable handler lets you disable session locking for specific request types—such as bot traffic or error pages—while keeping full locking for all other requests. This reduces the chance of negative effects from session locks without removing protection entirely.

To set up the configurable handler:

1. Ensure the `spryker/session-redis` module meets the required version:

```bash
composer require spryker/session-redis:"^1.11.2" --update-with-dependencies
```

2. Register exactly one session handling plugin in `SessionDependencyProvider`:

```php
...
use Spryker\Yves\SessionRedis\Plugin\Session\SessionHandlerConfigurableRedisLockingProviderPlugin;

class SessionDependencyProvider extends SprykerSessionDependencyProvider
{
    /**
     * Warning: Only one of the following Redis handler must be defined here:
     * - SessionHandlerRedisProviderPlugin
     * - SessionHandlerRedisLockingProviderPlugin
     * - SessionHandlerConfigurableRedisLockingProviderPlugin
     *
     * @return array<\Spryker\Yves\SessionExtension\Dependency\Plugin\SessionHandlerProviderPluginInterface>
     */
    protected function getSessionHandlerPlugins(): array
    {
        return [
            new SessionHandlerConfigurableRedisLockingProviderPlugin(),
        ];
    }
}
```

3. Enable the handler in the project configuration:

```php
// config/Shared/config_default.php
use Spryker\Shared\Session\SessionConstants;
use Spryker\Shared\SessionRedis\SessionRedisConfig;
...
$config[SessionConstants::YVES_SESSION_SAVE_HANDLER] = SessionRedisConfig::SESSION_HANDLER_CONFIGURABLE_REDIS_LOCKING;
```

4. Configure the exclusion condition plugins in `SessionRedisDependencyProvider`. Two plugins are available out of the box:

- `UrlSessionRedisLockingExclusionConditionPlugin`: checks for error and 404 pages.
- `BotSessionRedisLockingExclusionConditionPlugin`: checks the user-agent header for bot-related names.

You can also implement custom logic in a project-level plugin.

```php
namespace Pyz\Yves\SessionRedis;

...
use Spryker\Yves\SessionRedis\Plugin\SessionRedisLockingExclusion\BotSessionRedisLockingExclusionConditionPlugin;
use Spryker\Yves\SessionRedis\Plugin\SessionRedisLockingExclusion\UrlSessionRedisLockingExclusionConditionPlugin;
...

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

5. Configure the URL patterns and bot user-agent names to exclude from locking:

```php
namespace Pyz\Yves\SessionRedis;

class SessionRedisConfig extends \Spryker\Yves\SessionRedis\SessionRedisConfig
{
    public function getSessionRedisLockingExcludedUrlPatterns(): array
    {
        return [
            '/^.*\/error-page\/*.*$/',
            '/^.*\/health-check$/',
            '/\/[^\/]+\/[^\/]+\/search\?q=/',
            '/^\/$/',
            '/\/search\/suggestion\?q=/',
            // ..
        ];
    }

    public function getSessionRedisLockingExcludedBotUserAgents(): array
    {
        return [
            'Googlebot',
            'bingbot',
            'Baiduspider',
            // ...
        ];
    }
}
```

#### Disable session locking

You can disable session locking, but only after thoroughly assessing the risks and implementing necessary safeguards. This approach assumes there will be no concurrent requests from the same client, which could cause session data inconsistencies—for example, if products are simultaneously added to the cart from multiple browser tabs. For optimal performance, data integrity, and customer experience, we strongly recommend keeping session locks enabled and focusing on lock management and application performance instead.

```php
// config/Shared/config_default.php
$config[SessionConstants::YVES_SESSION_SAVE_HANDLER] = SessionRedisConfig::SESSION_HANDLER_REDIS;
```

### Optimize application performance

- **PHP-FPM worker pool size**: Ensure you have a sufficient pool of PHP-FPM workers. You can configure the `max_children` count for each application part in your [deploy.yml](/docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file-reference.html#groups-applications) file.
- **External calls**: Combine Redis operations where possible—for example, using MGET. Reduce Redis calls in sessions as much as possible. Use asynchronous calls to external systems and handle failures gracefully. See [Performance guidelines: External HTTP requests](/docs/dg/dev/guidelines/performance-guidelines/external-http-requests.html).
- **Timeouts**: Use short timeouts and avoid increasing them above industry standards or defaults. A long `max_execution_time` can worsen the issue if a process cannot finish successfully because of outages or errors, and can introduce a single point of failure.
- **Architecture**: See [Architecture performance guidelines](/docs/dg/dev/guidelines/performance-guidelines/architecture-performance-guidelines.html#general-performance-challenges-in-architecture-design) to improve the performance and responsiveness of your application. Fulfilling requests as quickly as possible significantly improves scalability.
- **APIs**: Headless scenarios are typically not affected by session locking challenges. Evaluate whether calls that would normally target Yves can target APIs instead.

### Control bot and crawler traffic

- **AWS WAF Bot Control**: Use [AWS WAF Bot Control](https://docs.aws.amazon.com/waf/latest/developerguide/waf-bot-control.html) to mitigate session lock issues caused by high traffic or automated bot activity.
- **Crawler Control**: Use [Crawler Control](/docs/pbc/all/miscellaneous/latest/crawler-control.html) to reduce server load by preventing bots from crawling useless URLs.
