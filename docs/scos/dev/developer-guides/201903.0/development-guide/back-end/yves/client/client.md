---
title: Client
originalLink: https://documentation.spryker.com/v2/docs/client
redirect_from:
  - /v2/docs/client
  - /v2/docs/en/client
---

This article provides general information about the Client part of the Yves applications layer and describes how to use it. 

{% info_block infoBox %}
See [Conceptual Overview](/docs/scos/dev/developer-guides/201903.0/architecture-guide/concept-overvie
{% endinfo_block %} to learn more about the Spryker applications and their layers.)

## General Information
End customers interact only with the front-end application. The front-end application needs to get data from the Storage, send search requests to the search engine, and send the customer requests to the Commerce OS whenever needed, like adding to the cart, as all the business logic is performed in the Commerce OS.

The Client’s job is to connect the front-end application to all of the surrounding resources needed for the front-end application to work. This includes the Commerce OS, Storage, and Search. It also includes some other resources like Session and Queues.

For each of these resources, there is a Client. So, it is not only one Client, but many of them. Each one of them is responsible for a specific resource or functionality. Spryker, by default, is shipped with the following Clients:

* SearchClient: to connect to Elasticsearch using its API.
* StorageClient: to connect to Redis using the Redis protocol; RESP.
* Commerce OS Clients: every functional unit, module as its called in Spryker, has its own Client. For example, there are separated Clients for cart (CartClient), checkout (CheckoutClient), and customer (CustomerClient). The same applies to all the other modules in Spryker.

Commerce OS Clients communicate with the Commerce OS using HTTP. They mainly perform RPCs (remote procedure calls) using HTTP POST requests with a serialized JSON payload. They also do all the necessary authorization and authentication between the two applications.
The purpose of the Client is to encapsulate the logic which runs the shop independent from the overlying application. So in case you want to use a different technology stack, you can reuse the Client.
![Client Schematic](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Yves/Client/client-schematic.png){height="" width=""}


## How to use a Client in Yves

`getClient()` method in Yves

Spryker provides several clients. For instance there is a cart client which contains methods like `addItem()` or `removeItem()`. And there is a catalog client which handles query strings. In each module you can access the related client with the `getClient()` method which is available in controllers and plugins.
![Yves Get Client](https://spryker.s3.eu-central-1.amazonaws.com/docs/Developer+Guide/Yves/Client/yves-getclient.png){height="" width=""}

The following example shows the usage of the cart client inside the `CartController`. As you can see the Client uses [transfer objects](https://documentation.spryker.com/v2/docs/ht-use-transfer-objects-201903) as an input parameter.

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
You can do as many usages of the storage and search engine, but you should be aware that each call takes some time. There is a restriction for calls to Zed. Each Call to zed takes some time to start the application and perform the action. As a result the execution time of yves becomes slower.

| Client        | Avg execution time          |
| ------------- | --------------------------- |
| Zed           | 50 to 500 ms per request    |
| Elasticsearch | 1 to 10 ms per search query |
| Redis         | 0.1 to 1 ms per get()       |

The real execution time in your project depends on the environment, the performance of implementation and the amount of stored data.

## Requests from Yves to Zed
The request from Yves to Zed involves two important classes:

* The **stub** represents the remote methods in the Client.
* The **gateway controller** represents the entry point on Zed side.

## What's next?
To imlement a Client for your project, see [Implementing a Client](https://documentation.spryker.com/v2/docs/implementing-a-client ).

