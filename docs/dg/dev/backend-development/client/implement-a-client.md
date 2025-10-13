---
title: Implement a client
description: This document describes how to implement the Client part of the Spryker Yves application layer.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/implementing-a-client
originalArticleId: 91c42163-d2e5-4782-88ad-ee6702f86af4
redirect_from:
  - /docs/scos/dev/back-end-development/client/implement-a-client.html
related:
  - title: Client
    link: docs/scos/dev/back-end-development/client/client.html
  - title: Use and configure key-value storage (Redis or Valkey)
    link: docs/scos/dev/back-end-development/client/use-and-configure-redis-as-a-key-value-storage.html
---

This document describes how to implement a [client](/docs/dg/dev/backend-development/client/client.html) part of the Spryker Yves application layer.

{% info_block infoBox %}

To learn more about the Spryker applications and their layers, see [Conceptual overview](/docs/dg/dev/architecture/conceptual-overview.html)

{% endinfo_block %}

## How to implement a client

All clients have the same structure. There is always one class that represents a client. This is quite close to the facades which we use in Zed. This class is the entry point, and it usually delegates to concrete implementations placed in the optional subdirectories `Search`, `Session`, `Storage`, and `Zed`.

| CLASS   | PURPOSE  |
| ----------------- | ---------------- |
| Pyz\Client\MyBundle\MyBundleClient             | The Client's entry point.                                    |
| Pyz\Client\MyBundle\MyBundleDependencyProvider | A [dependency provider](/docs/dg/dev/backend-development/data-manipulation/data-interaction/define-module-dependencies-dependency-provider.html) to interact with other modules. |
| Pyz\Client\MyBundle\MyBundleFactory            | The Client's [factory](/docs/dg/dev/backend-development/factory/factory.html). |
| Pyz\Client\MyBundle\Session\MyBundleSession    | A wrapper for the session.                                    |
| Pyz\Client\MyBundle\Search\MyBundleSearch      | Contains search queries—for example, Elasticsearch ).                |
| Pyz\Client\MyBundle\Storage\MyBundleStorage    | Gets data from the storage—for example, Redis).                      |
| Pyz\Client\MyBundle\Zed\MyBundleStub           | The stub connects to Zed's corresponding gateway controller . |

{% info_block warningBox "Warning" %}

When you implement a client, the client does not know about Yves. Therefore, don't use any class from Yves there; otherwise, you make the client non-reusable in a different context.

{% endinfo_block %}

The client class uses a factory to create the other objects. These objects require a connecting client, which they get injected into the factory. For this purpose, the factory contains these prepared methods:

- `createSessionClient()`
- `createZedRequestClient()`
- `createStorageClient()`
- `createSearchClient()`
