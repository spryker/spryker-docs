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

Some actions, parts of the website, or the entire website is slow. You may encounter 5XX errors, gateway timeouts, and customer-facing errors. Depending on the extent of the issue, your application might be partially or fully inaccessible to your customers.

Logs contain the following exceptions:
`Spryker\Shared\SessionRedis\Handler\Exception\LockCouldNotBeAcquiredException`

Using AWS Log Insight, you can search for this exception with the following query:

```bash
fields @timestamp, @message, @logStream, @log
| filter @message like /LockCouldNotBeAcquiredException/
| sort @timestamp desc
| limit 10000
```

## Cause

Redis Session Locking exceptions are an application-level challenge that can be resolved on the project level because a universal solution doesn't exist. For more information on the Session Locking mechanism, see [Locked sessions with Redis](/docs/dg/dev/backend-development/session-handlers.html#locked-sessions-with-redis).

The following sections describe how requests are processed, how the Redis Session Locking mechanism is implemented, and under what circumstances scaling challenges can arise.

### php fpm worker configuration

When incoming requests come through the frontend application, PHP-FPM workers in a pool are available to handle them. These workers are allowed to try to fulfill the request within some constraints:
`max_execution_time`
  The process gets killed if it takes too long to finish. This make sure the application isn't “blocked” for too long in case the process can't complete successfully.
`memory_limit`
  The process gets killed if it consumes more memory than the memory limit configured for each PHP process.
`max_children`
  If a request come in and no workers are available, new children workers are spawned until the maximum number of children is reached. Once reached, the request lifetime counts down until timeout, waiting for a worker to become available.

### Redis Session Locking

Redis session locking allows exclusive access to sessions, ensuring that information can be added to and read from them without risking integrity. While a session is being accessed by a process, other processes cannot access it; the session is “locked.” If a process cannot lock the session, it will use a “spinlock” strategy to try to acquire it. It waits for 0.01 seconds by default and then retries acquiring a lock to the session. These attempts continues until the timeout (default is 10 seconds). Sessions can be locked for a maximum of 20 seconds and will be released either when the session handler is destroyed or the session is explicitly unlocked.

### The Scaling Challenge:
If your application heavily relies on information in Redis sessions, your PHP-FPM workers will regularly lock sessions. If they perform their “work” quickly and release the lock promptly, subsequent incoming requests find free workers that can acquire session locks again. However, if there are delays in session lock release—for example, due to temporarily unavailable or delayed third-party systems you’re working with synchronously to retrieve session information, or excessive GET/SET operations against Redis—the session can remain locked for an extended period. New requests will cause new child processes to spawn that are not “busy.” If they also do expensive session work, this will quickly lead to the max children count to be reached upon which no new children will be spawned, but all php fpm workers will be "busy". At this point, service degradation is almost inevitable and the outcome will now depend on which timeout is reached first.

## Solution
You should regularly scan your APM for Session Lock exceptions, as well as your application logs for warnings related to PHP max children count. The former provides definitive evidence that action is needed, while the latter serves as an indicator that your PHP-FPM worker pool might not be “keeping up” with incoming requests and their average processing time. If your APM supports it, consider configuring alerts for these occurrences.

**Increase php worker pool size**
Ensure you have a sufficient pool of PHP-FPM workers defined. You can configure the php-fpm max_children count for each application part in your [deploy.yml](/docs/dg/dev/sdks/the-docker-sdk/deploy-file/deploy-file-reference.html#groups-applications) file.

**Optimize External Calls**
Evaluate whether you can combine Redis operations—for example, by using MGET. In general, try to reduce Redis calls in sessions as much as possible. Work with asynchronous calls to external systems where possible and handle failures to reach them gracefully.

**Optimize Timeouts**
Work with short timeouts and avoid increasing them above industry standards/defaults. Allowing long `max_execution_time` will exacerbate the issue if the process cannot finish successfully due to outages or other errors. It can quickly introduce a single point of failure to your application.

**Evalaute Architecture Perfromance Guidelines**
Explore these [guidelines](/docs/dg/dev/guidelines/performance-guidelines/architecture-performance-guidelines.html#general-performance-challenges-in-architecture-design) to improve the performance and responsiveness of your application. Ensuring requests are fulfilled as quickly as possible will significantly enhance your application’s scalability.

**Leverage APIs**
Headless scenarios are not normally impaced by Session Locking challenges. You can use this to your advantage and evaluate whether you can adjust calls that would normally target Yves and target APIs instead.
