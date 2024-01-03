  - /docs/scos/dev/back-end-development/data-manipulation/event/event.html
---
title: Event
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/event
originalArticleId: 3652cdfc-3b74-45bf-b9cf-307307bc9481
redirect_from:
  - /2021080/docs/event
  - /2021080/docs/en/event
  - /docs/event
  - /docs/en/event
  - /v6/docs/event
  - /v6/docs/en/event
  - /v5/docs/event
  - /v5/docs/en/event
  - /v4/docs/event
  - /v4/docs/en/event
  - /v3/docs/event
  - /v3/docs/en/event
  - /v2/docs/event
  - /v2/docs/en/event
  - /v1/docs/event
  - /v1/docs/en/event
related:
  - title: Add events
    link: docs/scos/dev/back-end-development/data-manipulation/event/add-events.html
  - title: Configure event queues
    link: docs/scos/dev/back-end-development/data-manipulation/event/configure-event-queues.html
  - title: Listen to events
    link: docs/scos/dev/back-end-development/data-manipulation/event/listen-to-events.html
---

The `Event` module implements an [observer pattern](https://en.wikipedia.org/wiki/Observer_pattern), where you can add hooks (events) to your code and allow other modules to listen and react to those events.

There are two methods:
1. _Traditional Synchronous_: Listeners are handled at the same time as they are dispatched.
2. _Asynchronous (Queueable)_: Events are put into a queue and handled later by some queue service. 
