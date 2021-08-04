---
title: About Facade
originalLink: https://documentation.spryker.com/v1/docs/facade
redirect_from:
  - /v1/docs/facade
  - /v1/docs/en/facade
---

The facade acts as an internal API. The main responsibility of the facade is to hide the internal implementation.

The simply only delegates the calls to internal business models. Similar to a remote web service, the client should not care about how a specific task is done. This is also important for future updates of the core. As long as the contract of the facade is not broken, an update can be integrated without (too much) pain.

Spryker’s facades are an implementation of the [Facade pattern](https://en.wikipedia.org/wiki/Facade_pattern).

In Spryker, the facades are the entry point into Zed’s business layer. All the other models are behind the facade and must not be accessed directly.
![Facade](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Zed/Business+Layer/Facade/facade-as-internal-api.png){height="" width=""}
