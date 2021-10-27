---
title: Implementing a Client
description: This article describes how to implement the Client part of the Spryker Yves application layer.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/implementing-a-client
originalArticleId: 91c42163-d2e5-4782-88ad-ee6702f86af4
redirect_from:
  - /2021080/docs/implementing-a-client
  - /2021080/docs/en/implementing-a-client
  - /docs/implementing-a-client
  - /docs/en/implementing-a-client
  - /v6/docs/implementing-a-client
  - /v6/docs/en/implementing-a-client
  - /v5/docs/implementing-a-client
  - /v5/docs/en/implementing-a-client
  - /v4/docs/implementing-a-client
  - /v4/docs/en/implementing-a-client
  - /v3/docs/implementing-a-client
  - /v3/docs/en/implementing-a-client
  - /v2/docs/implementing-a-client
  - /v2/docs/en/implementing-a-client
  - /v1/docs/implementing-a-client
  - /v1/docs/en/implementing-a-client
---

This article describes how to implement [Client](/docs/scos/dev/back-end-development/client/client.html) part of the Spryker Yves application layer.

{% info_block infoBox %}
See [Conceptual Overview](/docs/scos/dev/architecture/conceptual-overview.html) to learn more about the Spryker applications and their layers.
{% endinfo_block %}

## How to implement a Client
All Clients have the same structure. There is always one class that represents the Client. This is quite close to the facades which we use in Zed. This class is the entry point, and it usually delegates to concrete implementations, that are placed in the optional subdirectories `Search`, `Session`, `Storage`, and `Zed`.

| Class                                          | Purpose                                                      |
| ---------------------------------------------- | ------------------------------------------------------------ |
| Pyz\Client\MyBundle\MyBundleClient             | The client’s entry point                                     |
| Pyz\Client\MyBundle\MyBundleDependencyProvider | A [dependency provider](/docs/scos/dev/back-end-development/data-manipulation/data-interaction/defining-the-module-dependencies-dependency-provider.html) to interact with other bundles |
| Pyz\Client\MyBundle\MyBundleFactory            | The client’s [factory](/docs/scos/dev/back-end-development/factory/factory.html) |
| Pyz\Client\MyBundle\Session\MyBundleSession    | A wrapper for the session                                    |
| Pyz\Client\MyBundle\Search\MyBundleSearch      | Contains search queries (e.g. Elasticsearch )                |
| Pyz\Client\MyBundle\Storage\MyBundleStorage    | Gets data from the storage (e.g. Redis)                      |
| Pyz\Client\MyBundle\Zed\MyBundleStub           | The stub connects to Zed’s corresponding gateway controller  |

When you implement a client you should have in mind, that the client does not know about Yves. So you should not use any class from Yves there otherwise you make the client non-reusable in a different context.

The client class uses the factory to create the other objects. These objects require a connecting client which they get injected in the factory. For this purpose the factory contains these prepared methods:

* createSessionClient()
* createZedRequestClient()
* createStorageClient()
* createSearchClient()
