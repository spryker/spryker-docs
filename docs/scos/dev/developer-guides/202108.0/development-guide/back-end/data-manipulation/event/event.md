---
title: Event
originalLink: https://documentation.spryker.com/2021080/docs/event
originalArticleId: 3652cdfc-3b74-45bf-b9cf-307307bc9481
redirect_from:
  - /2021080/docs/event
  - /2021080/docs/en/event
  - /docs/event
  - /docs/en/event
---

The Event module implements an Observer pattern where you can add hooks (events) to your code and allow other modules to listen and react to those events.

There are two methods:

1. Traditional Synchronous where listeners are handled at the same time as they are dispatched
2. Asynchronous (Queueable) where events are put into a queue and handled later by some queue service.
