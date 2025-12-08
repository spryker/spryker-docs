---
title: Session locks
description: This guideline explains session locking mechanisms and how to optimize their performance impact in modern e-commerce applications.
last_updated: Nov 28, 2025
template: concept-topic-template
---

Session Locking mechanism is a standard way of ensuring atomic operations/access to a session object in e-commerce transactional environments. By default, Spryker uses a locking session handler that:

- locks a session before each request
- releases the lock at the end of each request, before sending content

It means that during such a request, parallel requests within the same session (authenticated customer or anonymous user) may be dependent on one another, so for example, second one will wait for the first one to complete. This is done to ensure transactional operations, such as add-to-cart, quote, or discount calculations, are correct at all times.

However, this introduces inefficiencies and slowness in modern applications when there are multiple async requests or a user actively browses the shop using multiple tabs.

## Optimize session locking

To decrease the potential performance impact from session locking, Spryker introduced a few simple but effective tools:

### Release lock early

`\Spryker\Yves\Session\EventSubscriber\OnKernelResponseEventSubscriber` plugin registered before `sendContent`.

### Define URLs and user-agents that do not require session lock

Define URLs and user-agents (bots) that do not require session lock behaviour.

To benefit from those features, a project must use a configurable session locker.

## Related documentation

For comprehensive information about session lock implementation, troubleshooting, and configuration options, see [Redis session lock](/docs/dg/dev/troubleshooting/troubleshooting-performance-issues/redis-session-lock.html).
