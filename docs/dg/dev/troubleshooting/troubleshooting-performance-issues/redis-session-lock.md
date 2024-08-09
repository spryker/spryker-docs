---
title: Redis session lock exceptions
description: Redis Session Lock Exceptions
template: troubleshooting-guide-template
redirect_from:
- /docs/scos/dev/troubleshooting/troubleshooting-performance-issues/redis-session-lock.html
last_updated: Aug 1, 2024
---

It's impossible to mitigate `LockCouldNotBeAcquiredExecption` exceptions on the infrastructure level, for example, by increasing CPU or memory resources. To make sure an application reaches expected scaling targets, during performance and load testing, take into account the scaling challenges described in this document.


## Symptoms

Some actions, parts of the website, or the entire website is slow. You may encounter 5XX errors, gateway timeouts, and customer-facing errors. Depending on the extent of the issue, the application might be partially or fully inaccessible to your customers.

Logs contain the following exceptions:
`Spryker\Shared\SessionRedis\Handler\Exception\LockCouldNotBeAcquiredException`

Using AWS Log Insights, you can search for this exception with the following query:

```bash
fields @timestamp, @message, @logStream, @log
| filter @message like /LockCouldNotBeAcquiredException/
| sort @timestamp desc
| limit 10000
```

## Redis session locking exceptions

Redis Session Locking exceptions are an application-level challenge that can be resolved on the project level because a universal solution doesn't exist. For more information on the Session Locking mechanism, see [Locked sessions with Redis](/docs/dg/dev/backend-development/session-handlers.html#locked-sessions-with-redis).

The following sections describe how requests are processed, how the Redis Session Locking mechanism is implemented, and under what circumstances scaling challenges can arise.

### php fpm worker configuration

When incoming requests come through the frontend application, PHP-FPM workers in a pool are available to handle them. These workers are allowed to try to fulfill the request within some constraints:
`max_execution_time`
  The process gets killed if it takes too long to finish. This make sure the application isn't “blocked” for too long in case a process can't complete successfully.
`memory_limit`
  The process gets killed if it consumes more memory than the memory limit configured for each PHP process.
`max_children`
  If a request comes in, and no workers are available, new children workers are spawned until the maximum number of children is reached. Once reached, the request lifetime counts down until timeout, waiting for a worker to become available.

### Redis session locking

Redis session locking allows exclusive access to sessions, ensuring that information can be added to and read from them without risking integrity. While a session is being accessed by a process, other processes can't access it; the session is *locked*. If a process can't lock the session, it tries to acquire it by using a *spinlock* strategy. It waits for 0.01 seconds by default and then retries acquiring a lock to the session. These attempts continue until the timeout, which is 10 seconds by default. A session can be locked for a maximum of 20 seconds and gets released when the session handler is destroyed or the session is explicitly unlocked.

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
