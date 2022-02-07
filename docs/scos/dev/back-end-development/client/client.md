---
title: Client
description: This article provides general information about the Client part of the Yves applications layer and describes how to use it.
last_updated: Jun 16, 2021
template: howto-guide-template
originalLink: https://documentation.spryker.com/2021080/docs/client
originalArticleId: a959a1bf-affd-4959-8ed9-811583b5562f
redirect_from:
  - /2021080/docs/client
  - /2021080/docs/en/client
  - /docs/client
  - /docs/en/client
  - /v6/docs/client
  - /v6/docs/en/client
  - /v5/docs/client
  - /v5/docs/en/client
  - /v4/docs/client
  - /v4/docs/en/client
  - /v3/docs/client
  - /v3/docs/en/client
  - /v2/docs/client
  - /v2/docs/en/client
  - /v1/docs/client
  - /v1/docs/en/client
---

This article provides general information about the Client part of the Yves applications layer and describes how to use it.

{% info_block infoBox %}

See [Conceptual Overview](/docs/scos/dev/architecture/conceptual-overview.html) to learn more about the Spryker applications and their layers.

{% endinfo_block %}

## General Information
End customers interact only with the front-end application. The front-end application needs to get data from the storage, send search requests to the search engine, and send the customer requests to the Commerce OS whenever needed, like adding to the cart, as the Commerce OS performs all the business logic.

The Client’s job is to connect the front-end application to all of the surrounding resources needed for the front-end application to work. These resources include the Commerce OS, Storage, and Search. It also contains some other resources like Session and Queues.

For each of these resources, there is a Client. So, it is not only one Client, but many of them. Each one of them is responsible for a specific resource or functionality. Spryker, by default, is shipped with the following Clients:

* SearchClient: to connect to Elasticsearch using its API.
* StorageClient: to connect to Redis using the Redis protocol; RESP.
* Commerce OS Clients: every functional unit, a module as it’s called in Spryker, has its Client. For example, there are separated Clients for cart (CartClient), checkout (CheckoutClient), and customer (CustomerClient). The same applies to all the other modules in Spryker.

Commerce OS Clients communicate with the Commerce OS using HTTP. They mainly perform RPCs (remote procedure calls) using HTTP POST requests with a serialized JSON payload. They also do all the necessary authorization and authentication between the two applications.
The ClientClient’s purpose is to encapsulate the logic that runs the shop independent from the overlying application. So in case you want to use a different technology stack, you can reuse the Client.
![Client Schematic](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Yves/Client/client-schematic.png)


## How to use a Client in Yves

`getClient()` method in Yves

Spryker provides several clients. For instance there is a cart client which contains methods like `addItem()` or `removeItem()`. And there is a catalog client that handles query strings. In each module, you can access the related Client with the `getClient()` method, which is available in controllers and plugins.
![Yves Get Client](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Yves/Client/yves-getclient.png)

The following example shows how the cart Client is used inside the `CartController.` As you can see, the Client uses [transfer objects](/docs/scos/dev/back-end-development/data-manipulation/data-ingestion/structural-preparations/creating-using-and-extending-the-transfer-objects.html) as an input parameter.

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
        //  Behind this there is a request to Zed.
        //  The response is stored in the session.
        $cartClient->addItem($itemTransfer);

        return $this->redirectResponseInternal(CartControllerProvider::ROUTE_CART);
    }
}
```

## Client Execution Time
You can do as many usages of the storage and search engine, but you should be aware that each call takes some time. There is a restriction for calls to Zed. Each Call to Zed takes some time to start the application and perform the action. As a result, the execution time of Yves becomes slower.

| Client        | Avg execution time          |
| ------------- | --------------------------- |
| Zed           | 50 to 500 ms per request    |
| Elasticsearch | 1 to 10 ms per search query |
| Redis         | 0.1 to 1 ms per get()       |

The real execution time in your project depends on the environment, the performance of implementation, and the amount of stored data.

## Requests from Yves to Zed
The request from Yves to Zed involves two important classes:

* The **stub** represents the remote methods in the Client.
* The **gateway controller** represents the entry point on the Zed side.

## What’s next?
To implement a Client for your project, see [Implementing a Client](/docs/scos/dev/back-end-development/client/implementing-a-client.html).
