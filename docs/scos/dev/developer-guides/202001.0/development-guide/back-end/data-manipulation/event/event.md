---
title: Event
originalLink: https://documentation.spryker.com/v4/docs/event
originalArticleId: da17b9ac-863b-48ac-b60a-05b5c80bcecd
redirect_from:
  - /v4/docs/event
  - /v4/docs/en/event
---

The Event module implements an Observer pattern where you can add hooks (events) to your code and allow other modules to listen and react to those events.

There are two methods:

1. Traditional Synchronous where listeners are handled at the same time as they are dispatched
2. Asynchronous (Queueable) where events are put into a queue and handled later by some queue service.
