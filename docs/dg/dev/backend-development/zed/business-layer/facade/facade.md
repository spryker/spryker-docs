---
title: Facade
description: The facade acts as an internal API. The main responsibility of the facade is to hide the internal implementation.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/facade
originalArticleId: 4bd6f125-5262-400e-8552-91d1406d5054
redirect_from:
  - /docs/scos/dev/back-end-development/zed/business-layer/facade/facade.html
related:
  - title: A facade implementation
    link: docs/scos/dev/back-end-development/zed/business-layer/facade/a-facade-implementation.html
  - title: Facade use cases
    link: docs/dg/dev/backend-development/zed/business-layer/facade/facade-use-cases.html
  - title: Design by Contract (DBC) - Facade
    link: docs/scos/dev/back-end-development/zed/business-layer/facade/design-by-contract-dbc-facade.html
---

A *facade* acts as an internal API. The main responsibility of the facade is to hide the internal implementation.

Facades simply delegate calls to internal business models. Similar to a remote web service, the client should not care about how a specific task is done. This is also important for future updates of the core. As long as the contract of the facade is not broken, an update can be integrated without (too much) pain.

Spryker's facades are an implementation of the [facade pattern](https://en.wikipedia.org/wiki/Facade_pattern).

In Spryker, facades are the entry point into Zed's business layer. All the other models are behind the facade and must not be accessed directly.
![Facade](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Zed/Business+Layer/Facade/facade-as-internal-api.png)
