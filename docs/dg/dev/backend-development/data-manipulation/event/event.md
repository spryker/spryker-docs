---
title: Event
description: Learn how to implement event-driven architecture in Spryker's backend, enabling efficient data manipulation and event handling for your ecommerce platform.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/event
originalArticleId: 3652cdfc-3b74-45bf-b9cf-307307bc9481
redirect_from:
  - /docs/scos/dev/back-end-development/data-manipulation/event/event.html
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
1. *Traditional Synchronous*: Listeners are handled at the same time as they are dispatched.
2. *Asynchronous (Queueable)*: Events are put into a queue and handled later by some queue service.
