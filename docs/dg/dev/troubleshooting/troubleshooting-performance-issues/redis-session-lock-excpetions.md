---
title: Redis session lock
description: Redis Session Lock
template: troubleshooting-guide-template
redirect_from:
- /docs/scos/dev/troubleshooting/troubleshooting-performance-issues/redis-session-lock.html
last_updated: Sep 28, 2024
---

A session lock is necessary to prevent multiple processes belonging to a single user's session from accessing or modifying session data at the same time, ensuring data integrity and consistency. 
It helps avoid race conditions and data corruption in high-concurrency environments.
While a user's session is being accessed by a process, other processes of the same user's session can't access it; the session is *locked*.

The handler is configured with:

```php
// config/Shared/config_default.php
$config[SessionConstants::YVES_SESSION_SAVE_HANDLER] = SessionRedisConfig::SESSION_HANDLER_REDIS_LOCKING;
```
If a process can't lock the session, it tries to acquire it by using a *spinlock* strategy. 
It waits for 0.01 seconds by default and then retries acquiring a lock to the session. The retry timeout can be configured:
```php
// config/Shared/config_default.php
$config[SessionRedisConstants::LOCKING_RETRY_DELAY_MICROSECONDS] = 0;
```

These attempts continue until the timeout, which is 0.8 from `max_execution_time` by default. The timeout also can be configured:
```php
// config/Shared/config_default.php
$config[SessionRedisConstants::LOCKING_TIMEOUT_MILLISECONDS] = 0;
```

## Probable causes
Use cases:
- Users clicking fast, especially in the app that allows activating multiple parallel requests;
- Requests being interrupted (but lock stays) because of aborting the connection (network or manual intentional and unintentional act, aka clicking “Esc“ when page is loading);
- Long-running (or slow performing) concurrent requests that have to deal with the session;
- Bots, running many parallel requests;
- Intentional (D)Dos attacks;

## Symptoms

Some actions, parts of the website, or the entire website is slow. You may encounter 5XX errors, gateway timeouts, and customer-facing errors. 
Depending on the extent of the issue, the application might be partially or fully inaccessible to your customers.

Logs contain the following exceptions:
`Spryker\Shared\SessionRedis\Handler\Exception\LockCouldNotBeAcquiredException`

Using AWS Log Insights, you can search for this exception with the following query:

```bash
fields @timestamp, @message, @logStream, @log
| filter @message like /LockCouldNotBeAcquiredException/
| sort @timestamp desc
| limit 10000
```

Using NewRelic query:

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
  The process gets killed if it takes too long to finish. This make sure the application isn't “blocked” for too long in case a process can't complete successfully.
`memory_limit`
  The process gets killed if it consumes more memory than the memory limit configured for each PHP process.
`max_children`
  If a request comes in, and no workers are available, new children workers are spawned until the maximum number of children is reached. Once reached, the request lifetime counts down until timeout, waiting for a worker to become available.

### The scaling challenge

If your application heavily relies on information in Redis sessions, your PHP-FPM workers will regularly lock sessions. If they acquire information quickly and release the lock promptly, subsequent incoming requests find free workers that can acquire session locks again. However, if there're delays in session lock release, the session can remain locked for an extended period. For example, this can be caused by temporarily unavailable or delayed third-party systems used to synchronously retrieve session information; or by excessive GET/SET operations against Redis. New requests cause new child processes to spawn. If child workers also have to do the expensive session work, this quickly leads to the max children count being reached. At this point, service degradation is almost inevitable and the outcome depends on which timeout is reached first.

## Solution
Regularly scan your APM for Session Lock exceptions, as well as your application logs for warnings related to PHP max children count. The former provides definitive evidence that action is needed, while the latter shows that the PHP-FPM worker pool might not be keeping up with incoming requests and their average processing time. If your APM supports it, consider configuring alerts for these events.

### Increase php worker pool size
Ensure you have a sufficient pool of PHP-FPM workers defined. You can configure the php-fpm max_children count for each application part in your [deploy.yml](/docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file-reference.html#groups-applications) file.

### Optimize external calls
Evaluate if you can combine Redis operations—for example, by using MGET. In general, try to reduce Redis calls in sessions as much as possible. Work with asynchronous calls to external systems where possible and handle failures to reach them gracefully.

### Optimize timeouts
Work with short timeouts and avoid increasing them above industry standards or defaults. Setting a long `max_execution_time` may exacerbate the issue if a process can't finish successfully because of outages or other errors. It can quickly introduce a single point of failure to your application.

### Evalaute architecture performance guidelines
Explore [architecture performance guidelines](/docs/dg/dev/guidelines/performance-guidelines/architecture-performance-guidelines.html#general-performance-challenges-in-architecture-design) to improve the performance and responsiveness of your application. Ensuring requests are fulfilled as quickly as possible significantly enhances the application’s scalability.

### Leverage APIs
Headless scenarios aren't usually impacted by Session Locking challenges. Evaluate if you can adjust calls that would normally target Yves to target APIs instead.

### Not using locks

```php
// config/Shared/config_default.php
$config[SessionConstants::YVES_SESSION_SAVE_HANDLER] = SessionRedisConfig::SESSION_HANDLER_REDIS;
```
This approach optimistically assumes that there will be no concurrent requests from the client, which could otherwise cause session data inconsistencies. 
For instance, this could occur if products are added to the cart simultaneously from multiple browser tabs.

{% info_block warningBox "Disabling session locking" %}

Disabling session locking is possible but should only be done after thoroughly assessing the risks and implementing necessary safeguards.
For optimal performance, data integrity, and customer experience, we strongly recommend keeping session locks enabled and focusing on optimizing lock management and application performance.

{% endinfo_block %}

### Lock Time-to-Live Configuration

By default, the lock time-to-live (TTL) is set to `0` in the configuration, which means it will default to the PHP configuration value for `max_execution_time`, if it is set.
```php
// config/Shared/config_default.php
$config[SessionRedisConstants::LOCKING_LOCK_TTL_MILLISECONDS] = 0;
```
This configuration is based on the assumption that all PHP processes will terminate correctly, ensuring the lock is released as part of the process termination.

If there is a risk of PHP processes hanging or terminating unexpectedly, it is recommended to set the lock TTL in Redis to a value significantly lower than the maximum PHP execution time.

**Recommended Approach:**

Gradually decrease the lock TTL while monitoring the application's behavior:
```php
$config[SessionRedisConstants::LOCKING_LOCK_TTL_MILLISECONDS] = 20000; // 20000 → 10000 → 5000 → 3000 → 2000 → 1000
```
Reducing the lock TTL too much can result in side effects similar to having no lock at all. According to findings, issues with locks are more likely when dealing with asynchronous requests, especially those dependent on third-party services. The more such operations, and the slower they are, the higher the probability of lock contention.

For example, setting the lock TTL to 10 seconds might be sufficient to safely release the lock while maintaining data consistency. However, not all long-running blocking processes require such strict consistency, and not all can tolerate short lock durations. Therefore, the optimal lock TTL value should be determined based on the specific requirements of your application.

**In case of an increase of `max_execution_time`, it is highly recommended to also review this value.**

### Traffic control
To mitigate issues with session locks caused by high traffic or automated bot activity, you can use [AWS WAF Bot Control](https://docs.aws.amazon.com/waf/latest/developerguide/waf-bot-control.html).

