---
title: Implementing a Client
originalLink: https://documentation.spryker.com/v2/docs/implementing-a-client
redirect_from:
  - /v2/docs/implementing-a-client
  - /v2/docs/en/implementing-a-client
---

This article describes how to implement [Client](/docs/scos/dev/developer-guides/201903.0/development-guide/back-end/yves/client/client) part of the Spryker Yves application layer.
{% info_block infoBox %}
See [Conceptual Overview](/docs/scos/dev/developer-guides/201903.0/architecture-guide/concept-overvie
{% endinfo_block %} to learn more about the Spryker applications and their layers.)
## How to implement a Client
All Clients have the same structure. There is always one class that represents the Client. This is quite close to the facades which we use in Zed. This class is the entry point, and it usually delegates to concrete implementations, that are placed in the optional subdirectories `Search`, `Session`, `Storage`, and `Zed`.

| Class                                          | Purpose                                                      |
| ---------------------------------------------- | ------------------------------------------------------------ |
| Pyz\Client\MyBundle\MyBundleClient             | The client’s entry point                                     |
| Pyz\Client\MyBundle\MyBundleDependencyProvider | A [dependency provider](/docs/scos/dev/developer-guides/201903.0/development-guide/back-end/data-manipulation/data-interaction/dependency-prov) to interact with other bundles |
| Pyz\Client\MyBundle\MyBundleFactory            | The client’s [factory](/docs/scos/dev/developer-guides/201903.0/development-guide/back-end/data-manipulation/data-enrichment/factory/factory) |
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

