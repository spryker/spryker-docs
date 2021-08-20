---
title: Event
originalLink: https://documentation.spryker.com/v5/docs/event
originalArticleId: 7f49a0cb-a4cf-4f6c-a9f5-0859d04b2f8c
redirect_from:
  - /v5/docs/event
  - /v5/docs/en/event
---

The Event module implements an Observer pattern where you can add hooks (events) to your code and allow other modules to listen and react to those events.

There are two methods:

1. Traditional Synchronous where listeners are handled at the same time as they are dispatched
2. Asynchronous (Queueable) where events are put into a queue and handled later by some queue service.
