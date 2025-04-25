---
title: Client
description: This document provides general information about the client part of the Yves applications layer and describes how to use it.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/client
originalArticleId: a959a1bf-affd-4959-8ed9-811583b5562f
redirect_from:
  - /docs/scos/dev/back-end-development/client/client.html
related:
  - title: Implementing a client
    link: docs/scos/dev/back-end-development/client/implement-a-client.html
  - title: Use and configuring Redis as a key-value storage
    link: docs/scos/dev/back-end-development/client/use-and-configure-redis-as-a-key-value-storage.html
---

This document provides general information about the client part of the Yves applications layer and describes how to use it.

{% info_block infoBox %}

To learn more about the Spryker applications and their layers, see [Conceptual Overview](/docs/dg/dev/architecture/conceptual-overview.html)

{% endinfo_block %}

## General information

End customers interact only with the frontend application. The frontend application needs to get data from the storage, send search requests to the search engine, and send the customer requests to the Commerce OS whenever needed, like adding to the cart, because the Commerce OS performs all the business logic.

The _client's_ job is to connect the frontend application to all of the surrounding resources needed for the frontend application to work. These resources include the Commerce OS, Storage, and Search. It also contains some other resources like Session and Queues.

For each of these resources, there is a client. So, it's not only one client, but many of them. Each one of them is responsible for a specific resource or functionality. Spryker, by default, is shipped with the following clients:

* SearchClient: to connect to Elasticsearch using its API.
* StorageClient: to connect to Redis using the Redis protocol; RESP.
* Commerce OS clients: every functional unit, a module as it's called in Spryker, has its client. For example, there are separated clients for the cart (CartClient), checkout (CheckoutClient), and customer (CustomerClient). The same applies to all the other modules in Spryker.

Commerce OS clients communicate with the Commerce OS using HTTP. They mainly perform RPCs (remote procedure calls) using HTTP POST requests with a serialized JSON payload. They also do all the necessary authorization and authentication between the two applications.
The client's purpose is to encapsulate the logic that runs the shop independent from the overlying application. So in case you want to use a different technology stack, you can reuse the client.

![Client Schematic](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Yves/Client/client-schematic.png)


## How to use a Client in Yves

The `getClient()` method in Yves

Spryker provides several clients. For example, there is a cart client which contains methods like `addItem()` or `removeItem()`. And there is a catalog client that handles query strings. In each module, you can access the related client with the `getClient()` method, which is available in controllers and plugins.

![Yves Get Client](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Yves/Client/yves-getclient.png)

The following example shows how the cart client is used inside the `CartController.` As you can see, the client uses [transfer objects](/docs/dg/dev/backend-development/data-manipulation/data-ingestion/structural-preparations/create-use-and-extend-the-transfer-objects.html) as an input parameter.

```php
<?php
namespace Pyz\Yves\Cart\Controller;

use Generated\Shared\Transfer\ItemTransfer;
use Pyz\Yves\Cart\Plugin\Provider\CartControllerProvider;
use Spryker\Yves\Kernel\Controller\AbstractController;
use Spryker\Client\Cart\CartClientInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;

/**
 * @method CartClientInterface getClient()
 */
class CartController extends AbstractController
{

    /**
     * @param string $sku
     * @param int $quantity
     * @param array $optionValueUsageIds
     *
     * @return RedirectResponse
     */
    public function addAction($sku, $quantity, $optionValueUsageIds = [])
    {
        // Get the client
        $cartClient = $this->getClient();

        // Build a transfer object
        $itemTransfer = new ItemTransfer();
        $itemTransfer->setId($sku);
        $itemTransfer->setQuantity($quantity);

        // Add the item:
        //  Behind this, there is a request to Zed.
        //  The response is stored in the session.
        $cartClient->addItem($itemTransfer);

        return $this->redirectResponseInternal(CartControllerProvider::ROUTE_CART);
    }
}
```

## Client execution time

You can do as many usages of the storage and search engine, but be aware that each call takes some time. There is a restriction for calls to Zed. Each call to Zed takes some time to start the application and perform the action. As a result, the execution time of Yves becomes slower.

| CLIENT        | AVERAGE EXECUTION TIME          |
| ------------- | --------------------------- |
| Zed           | 50 to 500 ms per request    |
| Elasticsearch | 1 to 10 ms per search query |
| Redis         | 0.1 to 1 ms per get()       |

The real execution time in your project depends on the environment, the performance of implementation, and the amount of stored data.

## Requests from Yves to Zed

The request from Yves to Zed involves two important classes:

* The *stub* represents the remote methods in the client.
* The *gateway controller* represents the entry point on the Zed side.

## Next step

To implement a client for your project, see [Implementing a client](/docs/dg/dev/backend-development/client/implement-a-client.html).
